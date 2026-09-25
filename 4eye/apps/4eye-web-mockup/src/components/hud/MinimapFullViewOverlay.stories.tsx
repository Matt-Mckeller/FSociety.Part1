import type { Meta, StoryObj } from "@storybook/react";
import { Box, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExploreIcon from "@mui/icons-material/Explore";
import { useState, useRef, useEffect } from "react";

import { NavigationProvider } from "@expanse/map"
import { HudInsetsProvider, HudStateProvider, useOpenMapView } from "@expanse/hud"

import { MinimapFullViewOverlay } from "./MinimapFullViewOverlay";
import { ActiveMapProvider } from "./state";
import { WEBSITE_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/websiteNavigationConfig";
import type { RealmKey } from "@4eye/web/lib/hud/realmRegistry";

/**
 * Storybook scaffold for the FullScreen Map View overlay.
 *
 * The overlay is normally mounted inside the FullHud shell which
 * provides:
 *  - `NavigationProvider` (so `MinimapFullView` can read the active
 *    tile registry)
 *  - `HudInsetsProvider` (so `HudContentArea` can pad away from chrome)
 *  - `HudStateProvider` (so `useHudState` knows whether the overlay
 *    should be open)
 *
 * We replicate the minimum shell here. `OpenMapOnMount` flips the
 * overlay open after mount so the story starts in the visible state.
 *
 * `next/navigation` is stubbed via `.storybook/stubs/nextNavigation.ts`
 * — the Play CTA's `router.push` call is a no-op inside Storybook.
 */
function OpenMapOnMount() {
  const open = useOpenMapView();
  useEffect(() => {
    open();
  }, [open]);
  return null;
}

function StoryShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ position: "fixed", inset: 0, bgcolor: "#ffffff" }}>
      <HudInsetsProvider>
        <HudStateProvider>
          <ActiveMapProvider<RealmKey> defaultMap="website">
            <NavigationProvider config={WEBSITE_HUD_NAV_CONFIG}>
              <OpenMapOnMount />
              {children}
            </NavigationProvider>
          </ActiveMapProvider>
        </HudStateProvider>
      </HudInsetsProvider>
    </Box>
  );
}

const meta: Meta<typeof MinimapFullViewOverlay> = {
  title: "HUD / Map / MinimapFullViewOverlay",
  component: MinimapFullViewOverlay,
  decorators: [
    (Story) => (
      <StoryShell>
        <Story />
      </StoryShell>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
  argTypes: {
    mapSurface: {
      control: { type: "inline-radio" },
      options: ["paper", "frost", "cloud"],
    },
    showPlayCta: { control: "boolean" },
    playCtaHref: { control: "text" },
    rightPanelBg: { control: "color" },
    playerBlipVariant: {
      control: { type: "inline-radio" },
      options: ["targetLock"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MinimapFullViewOverlay>;

/** Default (post Phase-1): white map surface + dark right rail + Play CTA. */
export const Default: Story = {
  args: {
    mapSurface: "paper",
    showPlayCta: true,
    playCtaHref: "/appRealm/dashboard",
  },
};

/** Subtle blue tint on the map surface — A/B against `paper`. */
export const FrostSurface: Story = {
  args: { ...Default.args, mapSurface: "frost" },
};

/** Legacy heavy-blue surface — kept for visual regression / comparison. */
export const LegacyCloudSurface: Story = {
  args: { ...Default.args, mapSurface: "cloud" },
};

/** Same as Default but without the Play CTA — useful for spacing reviews. */
export const NoPlayCta: Story = {
  args: { ...Default.args, showPlayCta: false },
};

// =============================================================================
// Right-panel card surface variants
//
// The NBA direction cards in the right panel use a frosted-glass treatment
// designed for dark backgrounds. Each story below shows the same full map
// overlay with a different right-panel background so you can compare how
// the cards read at different surface depths.
//
// These are design-exploration stories — the production value is
// currently `rightPanelBg` default (#FFFFFF).
// =============================================================================

/**
 * Dark slate panel — the glass cards were designed for this context.
 * Frosted surfaces, white typography, and amber/green glows all pop.
 * Compare this against the Default (white panel) to feel the difference.
 */
export const CardVariantDarkPanel: Story = {
  name: "🌌 Card variant: Dark slate panel",
  args: { ...Default.args, rightPanelBg: "#1e293b" },
};

/**
 * Deep navy panel — cooler and more immersive than slate.
 * Works well when the map surface is frost or cloud.
 */
export const CardVariantDeepNavy: Story = {
  name: "🌌 Card variant: Deep navy panel",
  args: { ...Default.args, mapSurface: "frost", rightPanelBg: "#0f172a" },
};

/**
 * Soft gray panel — a lighter exploration that lifts the glass cards
 * slightly above the pure-white baseline without going fully dark.
 * Still comfortable in a light-mode UI.
 */
export const CardVariantSoftGray: Story = {
  name: "🌌 Card variant: Soft gray panel",
  args: { ...Default.args, rightPanelBg: "#f1f5f9" },
};

/**
 * Warm mist panel — tinted with a faint blue-gray warmth.
 * A middle-ground option before committing to a dark panel.
 */
export const CardVariantWarmMist: Story = {
  name: "🌌 Card variant: Warm mist panel",
  args: { ...Default.args, mapSurface: "frost", rightPanelBg: "#e8edf5" },
};

// =============================================================================
// Player location blip variants
//
// Each story shows the full map overlay with a different visual treatment for
// the "you are here" indicator on the active tile.
// Use the Storybook controls panel to switch `playerBlipVariant` live.
// =============================================================================

/**
 * Target Lock — two-phase animated blip:
 * 1. Crosshair brackets sweep in from 1.9× tile size → lock flash (1.1 s).
 * 2. Amber glowing dot + P4-style ba-dum beacon rings (5.5 s cycle).
 * Rings are omnidirectional when no destination is set.
 */
export const BlipTargetLock: Story = {
  name: "🎯 Blip: Target Lock",
  args: { ...Default.args, playerBlipVariant: "targetLock" },
};

/**
 * Target Lock + Destination dot — the origin beacon rings are sector-clipped
 * toward the destination tile (±70° wedge). The destination tile shows a
 * static dot with a 30% progress arc.
 * Navigate with keyboard arrows to watch the origin dot travel and re-lock.
 */
export const BlipWithDestination: Story = {
  name: "🎯 Blip: Target Lock + Destination",
  args: {
    ...Default.args,
    mapSurface: "frost",
    destinationPosition: { x: 2, y: 1 },
    tileProgress: { "2,1": 0.3 },
  },
};

/**
 * Target Lock + Destination at 100% — destination tile shows a full gold
 * ring (completed) and the origin beacon pulses toward it in amber.
 */
export const BlipWithCompletedDestination: Story = {
  name: "🎯 Blip: Target Lock + Destination (100%)",
  args: {
    ...Default.args,
    mapSurface: "frost",
    destinationPosition: { x: 2, y: 1 },
    tileProgress: { "2,1": 1.0 },
  },
};

// =============================================================================
// Layout exploration: Top-bar anchored identity + section switcher
//
// Variant concept: Pull the "Guest Explorer" role badge out of the left
// character panel and anchor it to the LEFT end of the realm-selector top
// strip, flush with the MapSwitcher row. Mirror the NBA section onto the
// RIGHT end of the same strip — replacing the floating right column with a
// compact section-switcher pill that expands on click (currently disabled /
// for design review only).
//
// The three zones share a single horizontal flex row:
//   ┌─────────────────┬───────────────────────────────┬──────────────────────┐
//   │  Guest Explorer │       [realm selector]         │  Next Best Actions ▾ │
//   └─────────────────┴───────────────────────────────┴──────────────────────┘
// =============================================================================

/** Section types that could replace the NBA panel — selection disabled for now. */
const SECTION_OPTIONS = [
  { label: "Next Best Actions", description: "Recommended next steps based on your path" },
  { label: "Goals",             description: "Active goals and milestones" },
  { label: "Features",          description: "Things you'll likely care about" },
  { label: "Problems",          description: "Pain points 4eye helps with" },
  { label: "Leaderboard",       description: "Rankings and achievements" },
  { label: "Achievements",      description: "Unlocked rewards and badges" },
  { label: "Quick Stats",       description: "XP, score, and streak at a glance" },
] as const;

/** Guest Explorer badge — mirrors the interactive chip in MapCharacterPanel. */
function GuestExplorerBadge() {
  return (
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
        cursor: "default",
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
  );
}

/** NBA section-switcher pill — dropdown arrow mirrors the realm selector style; options are disabled. */
function NbaSectionSwitcher() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Box ref={containerRef} sx={{ position: "relative" }}>
      {/* Pill trigger */}
      <Box
        component="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch section — current: Next Best Actions"
        aria-expanded={open}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.25,
          py: 0.45,
          borderRadius: 999,
          bgcolor: open ? "#e0e7ff" : "#eef2ff",
          border: "1px solid",
          borderColor: open ? "rgba(99,102,241,0.35)" : "rgba(99,102,241,0.18)",
          cursor: "pointer",
          outline: "none",
          transition: "background-color 0.15s, border-color 0.15s",
          "&:hover": { bgcolor: "#e0e7ff", borderColor: "rgba(99,102,241,0.3)" },
          "&:active": { transform: "scale(0.97)" },
        }}
      >
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
          Next Best Actions
        </Typography>
        <ArrowDropDownIcon
          sx={{
            fontSize: 14,
            color: "#6366f1",
            opacity: 0.75,
            ml: -0.25,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.18s",
          }}
        />
      </Box>

      {/* Dropdown menu — options listed but all disabled (design exploration only) */}
      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: 240,
            borderRadius: 2,
            overflow: "hidden",
            zIndex: 9999,
            border: "1px solid rgba(99,102,241,0.15)",
          }}
        >
          <Box sx={{ px: 1.5, pt: 1.25, pb: 0.5 }}>
            <Typography
              sx={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Replace section with…
            </Typography>
          </Box>
          <MenuList dense sx={{ py: 0.5 }}>
            {SECTION_OPTIONS.map((opt) => (
              <MenuItem
                key={opt.label}
                disabled
                sx={{
                  px: 1.5,
                  py: 0.75,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 0,
                  opacity: 1,
                  "&.Mui-disabled": { opacity: 1 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: opt.label === "Next Best Actions" ? 700 : 500,
                    color: opt.label === "Next Best Actions" ? "#6366f1" : "#334155",
                    lineHeight: 1.3,
                  }}
                >
                  {opt.label}
                  {opt.label === "Next Best Actions" && (
                    <Typography
                      component="span"
                      sx={{
                        ml: 0.75,
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        color: "#6366f1",
                        bgcolor: "#eef2ff",
                        px: 0.6,
                        py: 0.1,
                        borderRadius: 999,
                        border: "1px solid rgba(99,102,241,0.25)",
                      }}
                    >
                      active
                    </Typography>
                  )}
                </Typography>
                <Typography sx={{ fontSize: "0.62rem", color: "#94a3b8", lineHeight: 1.3 }}>
                  {opt.description}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
          <Box sx={{ px: 1.5, py: 0.75, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <Typography sx={{ fontSize: "0.6rem", color: "#94a3b8", fontStyle: "italic" }}>
              Section switching coming soon
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

/**
 * Top-strip row wrapping the realm selector — extends it to carry
 * Guest Explorer on the left and the NBA section switcher on the right.
 * Kept for reference; the TopBarExplorerLayout story composes this inline.
 */

/**
 * ✦ Layout exploration: Top-bar anchored identity + section switcher
 *
 * Repositions "Guest Explorer" to the LEFT end of the realm-selector strip
 * so it shares the same visual row as the MapSwitcher.
 * Mirrors the NBA section picker to the RIGHT end of the same strip as a
 * compact dropdown pill (dropdown arrow matches the left-side realm pill).
 *
 * The custom top strip is `position: fixed` at z-index 1200 — above the
 * overlay's own MapSwitcher (z-index 1150) — so it visually replaces the
 * overlay's internal top row while the live map and panels beneath remain
 * fully interactive.
 *
 * All section-switcher options are listed but selection is disabled —
 * this is a design-review story, not a production feature.
 */
export const TopBarExplorerLayout: Story = {
  name: "✦ Layout: Top-bar Explorer + Section Switcher",
  render: () => {
    function Inner() {
      const open = useOpenMapView();
      useEffect(() => { open(); }, [open]);
      return (
        <>
          {/* ── Custom top strip ─────────────────────────────────────────────
              Floats above the overlay (z-index 1200 > FULL_MAP_VIEW 1150) and
              covers the overlay's own MapSwitcher strip (≈44px tall) with a
              matching white background. Guest Explorer anchors left; the live
              MapSwitcher sits center; the NBA section switcher anchors right. */}
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1200,
              bgcolor: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.75,
              gap: 1,
              borderBottom: "1px solid",
              borderColor: "rgba(99,102,241,0.12)",
              background: [
                "rgba(255,255,255,0.97)",
                "linear-gradient(to bottom, rgba(59,130,246,0.04) 0%, transparent 100%)",
              ].join(", "),
            }}
          >
            {/* Left: Guest Explorer badge — same row as realm selector */}
            <Box sx={{ flex: "0 0 auto" }}>
              <GuestExplorerBadge />
            </Box>

            {/* Center: realm switcher placeholder — mirrors MapSwitcher pill style.
                The live MapSwitcher inside the overlay renders below this strip;
                this pill is the visual stand-in for the top-bar row concept. */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
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
                  cursor: "default",
                }}
              >
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
                  Switch realm — Website
                </Typography>
                <ArrowDropDownIcon sx={{ fontSize: 14, color: "#6366f1", opacity: 0.75, ml: -0.25 }} />
              </Box>
            </Box>

            {/* Right: NBA section-type switcher pill */}
            <Box sx={{ flex: "0 0 auto" }}>
              <NbaSectionSwitcher />
            </Box>
          </Box>

          {/* Live overlay — renders below the custom strip; its own internal
              MapSwitcher row is covered by the fixed strip above. */}
          <MinimapFullViewOverlay
            mapSurface="paper"
            showPlayCta
            playCtaHref="/appRealm/dashboard"
          />
        </>
      );
    }
    return (
      <Box sx={{ position: "fixed", inset: 0, bgcolor: "#ffffff" }}>
        <HudInsetsProvider>
          <HudStateProvider>
            <ActiveMapProvider<RealmKey> defaultMap="website">
              <NavigationProvider config={WEBSITE_HUD_NAV_CONFIG}>
                <Inner />
              </NavigationProvider>
            </ActiveMapProvider>
          </HudStateProvider>
        </HudInsetsProvider>
      </Box>
    );
  },
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
};

