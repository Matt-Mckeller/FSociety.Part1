"use client";

/**
 * MinimapFullViewOverlay — top-level overlay that mounts the
 * `MinimapFullView` from `@expanse/shell` when `state.isMapViewOpen`
 * is true.
 *
 * Lives at the HUD shell level so it sits inside the FullHud's
 * `NavigationProvider` (sharing the marketing nav config) and inside
 * `HudInsetsProvider` (so it can read live HUD chrome insets).
 *
 * Layout: a flat 2-column row inside the HUD safe rect.
 *   - left  (~65%) → `MinimapFullView` (no internal chrome insets — the
 *                    overlay's outer Box already pads away from the HUD)
 *   - right (~35%) → `RoleGoalSelector`, separated by a single
 *                    `borderLeft: divider` (no card, no shadow — flat).
 *
 * Z-ordering:
 *   - `MinimapDock` (collapsed):   Z_INDEX.OVERLAY_ZONES (200)
 *   - This overlay:                Z_INDEX.FULL_MAP_VIEW  (1150)
 *   - Persistent FullHud chrome:   Z_INDEX.CHROME         (1400)
 */

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";

import { NavigationProvider, NextRouterNavigationBridge, useNavigation } from "@expanse/map"
import { Z_INDEX } from "@expanse/theme"
import { HudContentArea, MinimapFullView, TileContainer, CardSkinProvider } from "@expanse/hud"
import type { PlayerBlipVariant } from "@expanse/map"
import type { CardSkin, CardSkinConfig, CardSkinPreset } from "@expanse/hud"
import { CornerBracketFrame, WaterBackground } from "@expanse/brand-core";
import { APP_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/appNavigationConfig";
import { WEBSITE_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/websiteNavigationConfig";
import { realmForPathname } from "@4eye/web/lib/hud/realmRegistry";

import {
  useCloseMapView,
  useHudState,
  useActiveMap,
  useMapDirectionFocus,
} from "./state";
import { MapSessionProviders } from "./MapSessionProviders";
import type { ActiveMapKey } from "./mapContent/types";
import { PlaceholderMapView } from "@expanse/hud"
import { MapSwitcher } from "./MapSwitcher";
import { MapSectionSwitcher, type MapSectionId } from "./MapSectionSwitcher";
import { MapContextPanel, MapSectionContent } from "./MapContextPanel";
import { MapActionBar } from "./MapActionBar";
import { GuestExplorerPanel } from "./characterProfile";
import { MapScanOverlay } from "./MapScanOverlay";

/**
 * Visual presets for the inner map surface. `paper` is the default per
 * the brand guidance: a clean white canvas that lets the
 * `CornerBracketFrame` diamond brackets and tile colors do the work.
 * `frost` keeps a hint of the prior frost-blue tint for moods that
 * want a cooler cast. `cloud` preserves the legacy heavy-blue surface.
 */
type MapSurface = "paper" | "frost" | "cloud";

const MAP_SURFACE_TOKENS: Record<
  MapSurface,
  { bg: string; shadow: string[] }
> = {
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

export interface MinimapFullViewOverlayProps {
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
   * Grid coords of the destination tile (renders a destination dot + biases
   * the origin beacon rings toward it).
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
}

// ScanBeam has been replaced by MapScanOverlay + scanWaves.ts + useScanCycle.ts.

export function MinimapFullViewOverlay({
  mapSurface = "paper",
  playCtaHref = "/appRealm/dashboard",
  showPlayCta = true,
  rightPanelBg = "#FFFFFF",
  playerBlipVariant = "targetLock",
  destinationPosition,
  tileProgress,
  cardSkin,
}: MinimapFullViewOverlayProps = {}) {
  return (
    <MapSessionProviders>
      <OverlayBody
        mapSurface={mapSurface}
        playCtaHref={playCtaHref}
        showPlayCta={showPlayCta}
        rightPanelBg={rightPanelBg}
        playerBlipVariant={playerBlipVariant}
        destinationPosition={destinationPosition}
        tileProgress={tileProgress}
        cardSkin={cardSkin}
      />
    </MapSessionProviders>
  );
}

/**
 * Mounts inside the app-realm NavigationProvider. Watches for position
 * changes (i.e. a tile was clicked / navigated to) and calls `onNavigate`
 * to close the overlay so the page underneath becomes visible.
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

function OverlayBody({
  mapSurface,
  playCtaHref,
  showPlayCta,
  rightPanelBg,
  playerBlipVariant,
  destinationPosition,
  tileProgress,
  cardSkin,
}: Required<Omit<MinimapFullViewOverlayProps, "destinationPosition" | "tileProgress" | "cardSkin">> & Pick<MinimapFullViewOverlayProps, "destinationPosition" | "tileProgress" | "cardSkin">) {
  const { isMapViewOpen } = useHudState();
  const close = useCloseMapView();
  const { activeMap } = useActiveMap<ActiveMapKey>();
  const router = useRouter();
  const pathname = usePathname();
  const { selected: emphasisDirection } = useMapDirectionFocus();
  const theme = useTheme();
  const surface = MAP_SURFACE_TOKENS[mapSurface];

  // Active right-panel section, controlled by the MapSectionSwitcher pill.
  const [activeSection, setActiveSection] = useState<MapSectionId>("explore");

  const handlePlayDemo = showPlayCta
    ? () => {
        close();
        router.push(playCtaHref);
      }
    : undefined;

  if (!isMapViewOpen) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: Z_INDEX.FULL_MAP_VIEW,
        // Transparent — the dark surface paints only inside the safe
        // rect below so HUD rails (z-index 1100) remain visible in
        // their edge strips. Pointer events disabled here so clicks
        // outside the safe rect can still reach the rails.
        bgcolor: "transparent",
        pointerEvents: "none",
        // Must be visible so CornerBracketFrame halos that straddle the
        // inner Box edge can bleed into the inset strips.
        overflow: "visible",
      }}
    >
      {/* HudContentArea handles top/left/right insets (clears HUD
          chrome rails). TileContainer mode="fit" handles the bottom
          inset (clears the FullHud bottom chrome stack). Together
          they replace the manual `pt/pl/pr/pb = insets.*` padding
          this overlay used to do by hand. */}
      <HudContentArea sx={{ overflow: "visible" }}>
        <TileContainer mode="fit">
          {/* Inner safe-rect frame: solid panel-blue base with the
              brand `WaterBackground` (drifting film grain) painted
              inside. Inset shadow stack makes the map read as recessed
              under the corner-bracket frame. CornerBracketFrame anchors
              its inward-fanning brackets here. */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              // Surface preset (default `paper` = white per spec).
              bgcolor: surface.bg,
              color: "text.primary",
              pointerEvents: "auto",
              overflow: "visible",
            }}
          >
            {/* Animated water backdrop. */}
            <WaterBackground />

            {/* V06 corner brackets — single 1px stroke, no blur. */}
            <CornerBracketFrame
              variant="single"
              lengthPct={28}
              thickness={1}
              inset={0}
              color={theme.palette.primary.main}
              placement="inner"
              animateOnMount
              active={isMapViewOpen}
              sx={{ zIndex: 10 }}
            />

            {/* Scan sweep — weighted-random horizontal wave, starts after 4 s then cycles every 30 s. */}
            <MapScanOverlay active={isMapViewOpen} color={theme.palette.primary.main} sx={{ zIndex: 11 }} />

            {/* ── Top strip: identity · realm · section ─────────────────────
                Three-zone flex row. Left: Guest Explorer role badge.
                Center: MapSwitcher (realm picker).
                Right: MapSectionSwitcher (right-panel section picker). */}
            <Box
              sx={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 0.75,
                gap: 1,
                background:
                  "linear-gradient(to bottom, rgba(59,130,246,0.05) 0%, transparent 100%)",
                position: "relative",
                zIndex: 11,
              }}
            >
              {/* Left: Guest Explorer identity badge */}
              <Box sx={{ flex: "0 0 auto" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1.25,
                    py: 0.45,
                    borderRadius: 999,
                    bgcolor: "#eef2ff",
                    border: "1px solid rgba(99,102,241,0.18)",
                    userSelect: "none",
                  }}
                >
                  <ExploreIcon sx={{ fontSize: 13, color: "#6366f1", opacity: 0.8 }} />
                  <Typography
                    sx={{
                      color: "#6366f1",
                      fontWeight: 700,
                      fontSize: "0.62rem",
                      letterSpacing: "0.02em",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Guest Explorer
                  </Typography>
                </Box>
              </Box>

              {/* Center: realm switcher */}
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <MapSwitcher />
              </Box>

              {/* Right: section switcher */}
              <Box sx={{ flex: "0 0 auto" }}>
                <MapSectionSwitcher
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              </Box>
            </Box>
            {/* Horizontal gradient divider — primary-blue fade edge-to-edge */}
            <Box
              sx={{
                flexShrink: 0,
                height: "1px",
                zIndex: 11,
                background: `linear-gradient(to right, transparent 0%, ${theme.palette.primary.main}55 25%, ${theme.palette.primary.main}88 50%, ${theme.palette.primary.main}55 75%, transparent 100%)`,
                "@keyframes dividerPulse": {
                  "0%, 100%": { opacity: 0.9 },
                  "50%": { opacity: 0.3 },
                },
                animation: isMapViewOpen
                  ? "dividerPulse 2.8s ease-in-out infinite"
                  : "none",
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            />

            {/* ── Content row: character panel + map column + right panel ── */}
            <Box sx={{ flex: 1, minHeight: 0, display: "flex" }}>

              {/* Left column: player character + profile stats (~22%) */}
              <GuestExplorerPanel onSeeDemo={handlePlayDemo} />

              {/* Map column — flex-fills the remaining space */}
              <Box
                sx={{
                  flex: "1 1 0%",
                  minWidth: 0,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {(() => {
                  const currentRealm = realmForPathname(pathname);
                  if (activeMap === currentRealm) {
                    return (
                      <>
                        <MapActionBar onPlayDemo={handlePlayDemo} />
                        <MinimapFullView
                          open={isMapViewOpen}
                          onOpenChange={(open) => {
                            if (!open) close();
                          }}
                          onExit={close}
                          title={null}
                          flat
                          showLegend
                          tileContent="titleOnTile"
                          tileVariant="circular"
                          minTileSize={56}
                          emphasisDirection={emphasisDirection}
                          topChromeInset={0}
                          leftChromeInset={0}
                          rightChromeInset={0}
                          bottomChromeInset={0}
                          playerBlipVariant={playerBlipVariant}
                          {...(destinationPosition !== undefined ? { destinationPosition } : {})}
                          {...(tileProgress !== undefined ? { tileProgress } : {})}
                          sx={{ bgcolor: "transparent" }}
                        />
                      </>
                    );
                  }
                  if (activeMap === "app") {
                    return (
                      <NavigationProvider config={APP_HUD_NAV_CONFIG}>
                        <NextRouterNavigationBridge router={router} pathname={pathname} />
                        <CloseOnNavigate onNavigate={close} />
                        <MapActionBar onPlayDemo={handlePlayDemo} />
                        <MinimapFullView
                          open={isMapViewOpen}
                          onOpenChange={(open) => {
                            if (!open) close();
                          }}
                          onExit={close}
                          title={null}
                          flat
                          showLegend
                          tileContent="titleOnTile"
                          tileVariant="circular"
                          minTileSize={56}
                          emphasisDirection={emphasisDirection}
                          topChromeInset={0}
                          leftChromeInset={0}
                          rightChromeInset={0}
                          bottomChromeInset={0}
                          playerBlipVariant={playerBlipVariant}
                          {...(destinationPosition !== undefined ? { destinationPosition } : {})}
                          {...(tileProgress !== undefined ? { tileProgress } : {})}
                          sx={{ bgcolor: "transparent" }}
                        />
                      </NavigationProvider>
                    );
                  }
                  if (activeMap === "website") {
                    return (
                      <NavigationProvider config={WEBSITE_HUD_NAV_CONFIG}>
                        <NextRouterNavigationBridge router={router} pathname={pathname} />
                        <CloseOnNavigate onNavigate={close} />
                        <MapActionBar onPlayDemo={handlePlayDemo} />
                        <MinimapFullView
                          open={isMapViewOpen}
                          onOpenChange={(open) => {
                            if (!open) close();
                          }}
                          onExit={close}
                          title={null}
                          flat
                          showLegend
                          tileContent="titleOnTile"
                          tileVariant="circular"
                          minTileSize={56}
                          emphasisDirection={emphasisDirection}
                          topChromeInset={0}
                          leftChromeInset={0}
                          rightChromeInset={0}
                          bottomChromeInset={0}
                          playerBlipVariant={playerBlipVariant}
                          {...(destinationPosition !== undefined ? { destinationPosition } : {})}
                          {...(tileProgress !== undefined ? { tileProgress } : {})}
                          sx={{ bgcolor: "transparent" }}
                        />
                      </NavigationProvider>
                    );
                  }
                  return (
                    <PlaceholderMapView
                      mapKey={activeMap}
                      label="Technical"
                    />
                  );
                })()}
              </Box>

              {/* Vertical gradient divider — map | right panel */}
              <Box
                sx={{
                  width: "1px",
                  alignSelf: "stretch",
                  flexShrink: 0,
                  zIndex: 11,
                  background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.primary.main}55 25%, ${theme.palette.primary.main}88 50%, ${theme.palette.primary.main}55 75%, transparent 100%)`,
                  "@keyframes vDividerPulse": {
                    "0%, 100%": { opacity: 0.9 },
                    "50%": { opacity: 0.3 },
                  },
                  animation: isMapViewOpen
                    ? "vDividerPulse 2.8s ease-in-out infinite"
                    : "none",
                  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                }}
              />
              {/* Right column (~30%) — role/goal + NBA cards + accordions.
                  Content is grouped as a single flex column and centered
                  vertically so the cards sit flush against the map's
                  visual midpoint (flex justifyContent center). */}
              <Box
                sx={{
                  flex: "0 0 30%",
                  minWidth: 280,
                  maxWidth: 420,
                  position: "relative",
                  zIndex: 11,
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: rightPanelBg,
                  color: "text.primary",
                  overflowY: "auto",
                }}
              >
                <CardSkinProvider skin={cardSkin}>
                  {/* Center-aligned group — NBA cards + role selector +
                      accordions packed together, centered vertically.
                      minHeight:"100%" ensures the box fills the panel when
                      content is short (so justify-content:center works) but
                      can grow beyond 100% when content is tall, so the
                      outer overflowY:auto scroll always starts at the top
                      and every item is reachable. */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      minHeight: "100%",
                      py: 2,
                    }}
                  >
                    <MapSectionContent section={activeSection} onNavigateToTile={() => close()} />
                    {/* Sections own their own gutter (MAP_PANEL_GUTTER), so
                        this stack only owns the vertical rhythm. */}
                    <MapContextPanel />
                  </Box>
                </CardSkinProvider>
              </Box>

            </Box>
          </Box>
        </TileContainer>
      </HudContentArea>
    </Box>
  );
}

export default MinimapFullViewOverlay;
