"use client";

/**
 * FullScreenMapView — full-screen HUD map experience.
 *
 * Mounts at HUD shell level (inside `FullHud`'s `NavigationProvider` and
 * `HudInsetsProvider`). Controlled by `isMapViewOpen` from `HudStateProvider`.
 *
 * Three columns inside the HUD safe rect:
 *   - left  (~22%) → `GuestExplorerPanel` (character + compass rings)
 *   - center (fill) → realm-scoped `MinimapFullView` grid + `MapActionBar`
 *   - right  (~30%) → `MapNextBestActions` + `MapContextPanel`
 *
 * Realm switching: the center column wraps `MinimapFullView` in its own
 * `NavigationProvider` when the selected realm differs from the current
 * route, reusing the existing provider otherwise.
 *
 * Z-ordering:
 *   - `MinimapDock` (collapsed):     Z_INDEX.OVERLAY_ZONES     (200)
 *   - Bottom chrome stack:           Z_INDEX.ACTION_BARS       (1100)
 *   - This view:                    Z_INDEX.FULL_MAP_VIEW     (1150)
 *   - HudTopRow + left/right rails:  Z_INDEX.PERSISTENT_RAILS  (1200)
 *
 * The bottom chrome stack sits *below* this view by design — the view's
 * `TileContainer` shrinks its bottom edge by the stack's live-measured
 * height (`insets.bottom`) so the two never overlap on screen.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme, Box } from "@mui/material";

import { NavigationProvider, NextRouterNavigationBridge, useNavigation } from "@expanse/map"
import {
  FullScreenHudOverlay,
  FULL_SCREEN_OVERLAY_CONTENT_Z,
  MinimapFullView,
  PlaceholderMapView,
  CardSkinProvider,
  MAP_CLOSE_GLYPH_MS,
} from "@expanse/hud"
import type { PlayerBlipVariant, MapGridNavigationConfig } from "@expanse/map"
import type { CardSkin, CardSkinConfig, CardSkinPreset } from "@expanse/hud"
import { WaterBackground } from "@expanse/brand-core";
import {
  REALMS,
  navConfigForRealm,
  type RealmKey,
} from "@4eye/web/lib/hud/realmRegistry";

import {
  useCloseMapView,
  useHudState,
  useMapDirectionFocus,
} from "./state";
import { MapSessionProviders } from "./MapSessionProviders";
import { useRealm } from "./useRealm";
import { MapSectionSwitcher, type MapSectionId } from "./MapSectionSwitcher";
import { MapContextPanel, MapSectionContent, MAP_PANEL_GUTTER } from "./MapContextPanel";
import { MapActionBar } from "./MapActionBar";
import { GuestExplorerPanel } from "./characterProfile";
import { MapScanOverlay } from "./MapScanOverlay";

// ─── Surface tokens ───────────────────────────────────────────────────────────

/**
 * Visual presets for the inner map surface. `paper` is the default per
 * the brand guidance: a clean white canvas that lets the
 * `CornerBracketFrame` diamond brackets and tile colors do the work.
 * `frost` keeps a hint of the prior frost-blue tint for moods that
 * want a cooler cast. `cloud` preserves the legacy heavy-blue surface.
 */
type MapSurface = "paper" | "frost" | "cloud";

const MAP_SURFACE_TOKENS: Record<MapSurface, { bg: string; shadow: string[] }> = {
  paper: {
    bg: "#FFFFFF",
    shadow: [
      "inset 0 24px 40px -16px rgba(15,23,42,0.06)",
      "inset 0 -16px 32px -16px rgba(15,23,42,0.05)",
      "inset 24px 0 32px -20px rgba(15,23,42,0.04)",
      "inset -24px 0 32px -20px rgba(15,23,42,0.04)",
    ],
  },
  frost: {
    bg: "#F2F8FF",
    shadow: [
      "inset 0 24px 40px -16px rgba(66,133,244,0.07)",
      "inset 0 -16px 32px -16px rgba(66,133,244,0.06)",
      "inset 24px 0 32px -20px rgba(66,133,244,0.04)",
      "inset -24px 0 32px -20px rgba(66,133,244,0.04)",
    ],
  },
  cloud: {
    bg: "#E8F4FF",
    shadow: [
      "inset 0 24px 40px -16px rgba(66,133,244,0.10)",
      "inset 0 -16px 32px -16px rgba(66,133,244,0.08)",
      "inset 24px 0 32px -20px rgba(66,133,244,0.06)",
      "inset -24px 0 32px -20px rgba(66,133,244,0.06)",
    ],
  },
};

// ─── Props ───────────────────────────────────────────────────────────────────

export interface FullScreenMapViewProps {
  /** Inner map surface preset. Defaults to white (`paper`). */
  mapSurface?: MapSurface;
  /** Destination of the right-column Play CTA. */
  playCtaHref?: string;
  /** Hide the Play CTA entirely (e.g. inside a story or alternate shell). */
  showPlayCta?: boolean;
  /**
   * Background color for the right info panel. Defaults to `#FFFFFF`.
   * Use a dark value (e.g. `#1e293b`) in Storybook to preview the
   * glass-card variant where frosted cards read at full contrast.
   */
  rightPanelBg?: string;
  /**
   * Visual style of the player location blip on the active tile.
   * @default "targetLock"
   */
  playerBlipVariant?: PlayerBlipVariant;
  /**
   * Grid coords of the destination tile (renders a destination dot +
   * biases the origin beacon rings toward it).
   */
  destinationPosition?: { x: number; y: number };
  /**
   * Per-tile visit progress, keyed `"x,y"`, value 0–1.
   * Shown in the destination dot progress ring.
   */
  tileProgress?: Record<string, number>;
  /**
   * Visual skin applied to the NBA direction cards in the right panel.
   * Accepts a preset id (e.g. `"paperInk/clean"`), a full
   * `CardSkin` record, or an anonymous `CardSkinConfig`. Defaults to
   * the production paper-ink skin.
   */
  cardSkin?: CardSkinPreset | CardSkin | CardSkinConfig;
  /**
   * Whether to render the Goals / Features / Problems accordion sections
   * below the NBA cards. Defaults to `false`.
   */
  showContextSections?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Render-less helper that watches the active nav position and calls
 * `onNavigate` whenever it changes (i.e. a tile was clicked). Skips
 * the initial mount so clicking to *open* the map doesn't immediately
 * close it.
 */
function CloseOnNavigate({ onNavigate }: { onNavigate: () => void }) {
  const { position } = useNavigation();
  const initialPositionRef = useRef({ x: position.x, y: position.y });

  useEffect(() => {
    if (
      position.x === initialPositionRef.current.x &&
      position.y === initialPositionRef.current.y
    ) {
      return;
    }
    onNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position.x, position.y]);
  return null;
}

// ─── Realm nav scope ──────────────────────────────────────────────────────────

interface RealmNavScopeProps {
  config: MapGridNavigationConfig;
  router: ReturnType<typeof useRouter>;
  pathname: string | null;
  onNavigate: () => void;
  children: ReactNode;
}

/**
 * Mounts a dedicated `NavigationProvider` for a realm whose map differs from
 * the current route, bridging it to the Next router and closing the map view
 * when a tile is navigated. Used for cross-realm map previews.
 */
function RealmNavScope({ config, router, pathname, onNavigate, children }: RealmNavScopeProps) {
  return (
    <NavigationProvider config={config}>
      <NextRouterNavigationBridge router={router} pathname={pathname ?? undefined} />
      <CloseOnNavigate onNavigate={onNavigate} />
      {children}
    </NavigationProvider>
  );
}

// ─── Realm map content ───────────────────────────────────────────────────────

interface RealmMapContentProps {
  activeMap: RealmKey;
  currentRealm: RealmKey;
  isMapViewOpen: boolean;
  close: () => void;
  router: ReturnType<typeof useRouter>;
  pathname: string | null;
  emphasisDirection: ReturnType<typeof useMapDirectionFocus>["selected"];
  playerBlipVariant: PlayerBlipVariant;
  destinationPosition?: FullScreenMapViewProps["destinationPosition"];
  tileProgress?: FullScreenMapViewProps["tileProgress"];
  handlePlayDemo?: () => void;
}

/**
 * Renders the correct `MinimapFullView` for the active realm.
 *
 * - no nav config (e.g. `technical`) → `PlaceholderMapView`
 * - any mapped realm                  → wraps in a `RealmNavScope` with the
 *                                       target realm's nav config + router bridge
 */
function RealmMapContent({
  activeMap,
  currentRealm,
  isMapViewOpen,
  close,
  router,
  pathname,
  emphasisDirection,
  playerBlipVariant,
  destinationPosition,
  tileProgress,
  handlePlayDemo,
}: RealmMapContentProps) {
  const commonMapProps = {
    open: isMapViewOpen,
    onOpenChange: (open: boolean) => { if (!open) close(); },
    onExit: close,
    title: null,
    flat: true,
    showLegend: false,
    tileContent: "titleOnTile" as const,
    tileVariant: "circular" as const,
    minTileSize: 56,
    ...REALMS[activeMap].mapSizing,
    emphasisDirection,
    topChromeInset: 0,
    leftChromeInset: 0,
    rightChromeInset: 0,
    bottomChromeInset: 0,
    playerBlipVariant,
    ...(destinationPosition !== undefined ? { destinationPosition } : {}),
    ...(tileProgress !== undefined ? { tileProgress } : {}),
    sx: { bgcolor: "transparent" },
  };

  const navConfig = navConfigForRealm(activeMap);

  // Realm with no grid yet → placeholder.
  if (navConfig === null) {
    return <PlaceholderMapView mapKey={activeMap} label={REALMS[activeMap].label} />;
  }

  const mapContent = (
    <>
      <MapActionBar onPlayDemo={handlePlayDemo} />
      <MinimapFullView {...commonMapProps} />
    </>
  );

  // Always scope the full-map surface to an explicit provider bridge so tile
  // clicks route consistently across realms (including app-realm self-nav).
  return (
    <RealmNavScope config={navConfig} router={router} pathname={pathname} onNavigate={close}>
      {mapContent}
    </RealmNavScope>
  );
}

// ─── Map view body ───────────────────────────────────────────────────────────

interface MapViewBodyProps {
  mapSurface: MapSurface;
  playCtaHref: string;
  showPlayCta: boolean;
  rightPanelBg: string;
  playerBlipVariant: PlayerBlipVariant;
  destinationPosition?: FullScreenMapViewProps["destinationPosition"];
  tileProgress?: FullScreenMapViewProps["tileProgress"];
  cardSkin?: FullScreenMapViewProps["cardSkin"];
  showContextSections?: FullScreenMapViewProps["showContextSections"];
}

function MapViewBody({
  mapSurface,
  playCtaHref,
  showPlayCta,
  rightPanelBg,
  playerBlipVariant,
  destinationPosition,
  tileProgress,
  cardSkin,
  showContextSections,
}: MapViewBodyProps) {
  const { isMapViewOpen, isMapViewClosing } = useHudState();
  const close = useCloseMapView();
  const { activeMap, currentRealm } = useRealm();
  const router = useRouter();
  const pathname = usePathname();
  const { selected: emphasisDirection } = useMapDirectionFocus();
  const theme = useTheme();
  const surface = MAP_SURFACE_TOKENS[mapSurface];

  // Active right-panel section, controlled by the MapSectionSwitcher pill.
  const [activeSection, setActiveSection] = useState<MapSectionId>("explore");

  const handlePlayDemo = showPlayCta
    ? () => { close(); router.push(playCtaHref); }
    : undefined;

  return (
    <FullScreenHudOverlay
      open={isMapViewOpen}
      background={<WaterBackground />}
      surfaceBg={surface.bg}
      overflow="visible"
      cornerBracket={{ lengthPct: 28, active: isMapViewOpen && !isMapViewClosing }}
      sx={{
        opacity: isMapViewClosing ? 0 : 1,
        transition: `opacity ${MAP_CLOSE_GLYPH_MS}ms ease`,
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      {/* Scan sweep — weighted-random horizontal wave */}
      <MapScanOverlay
        active={isMapViewOpen}
        color={theme.palette.primary.main}
        sx={{ zIndex: FULL_SCREEN_OVERLAY_CONTENT_Z }}
      />

      {/* ── Top strip: section switcher ───────────────────────
          Realm identity now lives solely in the consolidated
          RealmLocationBar (HUD top-row center slot) — see
          RegisterRealmLocationBar in HudShell.tsx.

          The switcher is right-aligned on `MAP_PANEL_GUTTER` so its right
          edge lines up with the right panel's card stack below it, and
          the strip carries enough vertical padding to clear the HUD
          top-row chrome that floats just above this overlay's edge. */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          minHeight: 44,
          px: MAP_PANEL_GUTTER,
          py: 1,
          gap: 1,
          background: "linear-gradient(to bottom, rgba(59,130,246,0.05) 0%, transparent 100%)",
          position: "relative",
          zIndex: FULL_SCREEN_OVERLAY_CONTENT_Z,
        }}
      >
        {/* Section switcher */}
        <Box sx={{ flex: "0 0 auto" }}>
          <MapSectionSwitcher
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </Box>
      </Box>

      {/* Horizontal gradient divider */}
      <Box
        sx={{
          flexShrink: 0,
          height: "1px",
          zIndex: FULL_SCREEN_OVERLAY_CONTENT_Z,
          background: `linear-gradient(to right, transparent 0%, ${theme.palette.primary.main}55 25%, ${theme.palette.primary.main}88 50%, ${theme.palette.primary.main}55 75%, transparent 100%)`,
          "@keyframes dividerPulse": {
            "0%, 100%": { opacity: 0.9 },
            "50%": { opacity: 0.3 },
          },
          animation: isMapViewOpen ? "dividerPulse 2.8s ease-in-out infinite" : "none",
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      />

      {/* ── Content row ────────────────────────────────────────── */}
      <Box sx={{ flex: 1, minHeight: 0, display: "flex" }}>

        {/* Left column: character figure + compass rings (~22%) */}
        <GuestExplorerPanel onSeeDemo={handlePlayDemo} />

        {/* Center: realm map grid (flex-fill) */}
        <Box
          sx={{
            flex: "1 1 0%",
            minWidth: 0,
            minHeight: 0,
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <RealmMapContent
            activeMap={activeMap}
            currentRealm={currentRealm}
            isMapViewOpen={isMapViewOpen}
            close={close}
            router={router}
            pathname={pathname}
            emphasisDirection={emphasisDirection}
            playerBlipVariant={playerBlipVariant}
            destinationPosition={destinationPosition}
            tileProgress={tileProgress}
            handlePlayDemo={handlePlayDemo}
          />
        </Box>

        {/* Vertical gradient divider — map | right panel */}
        <Box
          sx={{
            width: "1px",
            alignSelf: "stretch",
            flexShrink: 0,
            zIndex: FULL_SCREEN_OVERLAY_CONTENT_Z,
            background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.primary.main}55 25%, ${theme.palette.primary.main}88 50%, ${theme.palette.primary.main}55 75%, transparent 100%)`,
            "@keyframes vDividerPulse": {
              "0%, 100%": { opacity: 0.9 },
              "50%": { opacity: 0.3 },
            },
            animation: isMapViewOpen ? "vDividerPulse 2.8s ease-in-out infinite" : "none",
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        />

        {/* Right column: role/goal + NBA cards + accordions (~30%) */}
        <Box
          sx={{
            flex: "0 0 30%",
            minWidth: 280,
            maxWidth: 420,
            position: "relative",
            zIndex: FULL_SCREEN_OVERLAY_CONTENT_Z,
            display: "flex",
            flexDirection: "column",
            bgcolor: rightPanelBg,
            color: "text.primary",
            overflowY: "auto",
          }}
        >
          <CardSkinProvider skin={cardSkin}>
            {/* Top-aligned group — the section header starts on the same
                baseline as the left panel's character block and the map
                grid, so the three columns read as one row. Sections own
                their horizontal padding (MAP_PANEL_GUTTER); this wrapper
                only owns the vertical rhythm between them. */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                pt: 3,
                pb: 3,
              }}
            >
              <MapSectionContent section={activeSection} onNavigateToTile={() => close()} />
              <MapContextPanel showContextSections={showContextSections} />
            </Box>
          </CardSkinProvider>
        </Box>

      </Box>
    </FullScreenHudOverlay>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export function FullScreenMapView({
  mapSurface = "paper",
  playCtaHref = "/appRealm/dashboard",
  showPlayCta = true,
  rightPanelBg = "#FFFFFF",
  playerBlipVariant = "targetLock",
  destinationPosition,
  tileProgress,
  cardSkin,
  showContextSections = false,
}: FullScreenMapViewProps = {}) {
  return (
    <MapSessionProviders>
      <MapViewBody
        mapSurface={mapSurface}
        playCtaHref={playCtaHref}
        showPlayCta={showPlayCta}
        rightPanelBg={rightPanelBg}
        playerBlipVariant={playerBlipVariant}
        destinationPosition={destinationPosition}
        tileProgress={tileProgress}
        cardSkin={cardSkin}
        showContextSections={showContextSections}
      />
    </MapSessionProviders>
  );
}

export default FullScreenMapView;
