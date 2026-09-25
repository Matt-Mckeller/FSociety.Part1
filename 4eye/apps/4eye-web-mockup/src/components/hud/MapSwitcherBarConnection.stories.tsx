"use client";

/**
 * MapSwitcherBarConnection.stories — design explorations for visually
 * connecting the HUD top-center "context" bar with the MapSwitcher
 * realm-tab bar that sits directly below it.
 *
 * The two elements currently float independently. These 8 concepts span
 * the full spectrum from "barely connected" → "fully merged into one unit":
 *
 *  C1  Orbit        — baseline: two independent frosted pills, 8 px gap
 *  C2  Proximity    — 3 px gap + shared blue aura hints at parentage
 *  C3  Fused        — zero gap, flat inner edges, single compound shape
 *  C4  Stepped      — natural width hierarchy (narrow parent, wider child)
 *                     4 px gap — matches the reference sketch
 *  C5  Tower        — one rounded panel, two internal rows + divider
 *  C6  Badge        — realm bar is the base; context pill overlaps its
 *                     top edge like a label badge
 *  C7  Bridge       — narrow connector strip fills the gap between pills
 *  C8  Inline       — single horizontal bar: context + divider + realm chip
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

// =============================================================================
// Surface constants — exact frosted values from ActionBar's `frosted` variant
// =============================================================================

const FROSTED_BG = "rgba(0,0,0,0.78)";
const FROSTED_BORDER = "1px solid rgba(255,255,255,0.11)";
const FROSTED_BLUR = "blur(20px)";
const FROSTED_SHADOW = "0 8px 32px rgba(0,0,0,0.35)";
const FROSTED_RADIUS = 28;

const FROSTED = {
  bgcolor: FROSTED_BG,
  border: FROSTED_BORDER,
  backdropFilter: FROSTED_BLUR,
  boxShadow: FROSTED_SHADOW,
} as const;

// Realm tab colors
const ACTIVE_COLOR = "#93c5fd";
const INACTIVE_COLOR = "rgba(147,197,253,0.5)";

const REALM_TABS = [
  { id: "website", label: "Website", Icon: TravelExploreRoundedIcon },
  { id: "app", label: "App", Icon: RocketLaunchRoundedIcon },
  { id: "technical", label: "Technical", Icon: SchemaRoundedIcon },
] as const;

type RealmId = (typeof REALM_TABS)[number]["id"];

// =============================================================================
// Shared sub-components
// =============================================================================

/** The HUD top-center navigation pill — mirrors the `< Map >` reference sketch */
function MapContextBar({ sx }: { sx?: object }) {
  return (
    <Box
      sx={{
        ...FROSTED,
        borderRadius: FROSTED_RADIUS,
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 1.5,
        py: 0.875,
        ...sx,
      }}
    >
      <ChevronLeftRoundedIcon
        sx={{ fontSize: 15, color: "rgba(255,255,255,0.35)", cursor: "pointer" }}
      />
      {/* Blue map icon badge */}
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: 1,
          bgcolor: "#1d4ed8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <MapRoundedIcon sx={{ fontSize: 14, color: "#fff" }} />
      </Box>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 700,
          color: "rgba(255,255,255,0.9)",
          letterSpacing: 0.3,
          userSelect: "none",
        }}
      >
        Map
      </Typography>
      <ChevronRightRoundedIcon
        sx={{ fontSize: 15, color: "rgba(255,255,255,0.35)", cursor: "pointer" }}
      />
    </Box>
  );
}

/** The realm tab bar — three frosted tabs with active highlight */
function RealmTabBar({ active = "website", sx }: { active?: RealmId; sx?: object }) {
  return (
    <Box
      sx={{
        ...FROSTED,
        borderRadius: FROSTED_RADIUS,
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        px: 0.5,
        py: 0.5,
        ...sx,
      }}
    >
      {REALM_TABS.map(({ id, label, Icon }) => {
        const isActive = id === active;
        return (
          <Box
            key={id}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              px: 1.25,
              py: 0.625,
              borderRadius: 20,
              bgcolor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
              cursor: "pointer",
              transition: "background 150ms",
            }}
          >
            <Icon
              sx={{
                fontSize: 16,
                color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
              }}
            />
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                letterSpacing: 0.3,
                userSelect: "none",
              }}
            >
              {label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

// =============================================================================
// Concept implementations
// =============================================================================

/**
 * C1 — Orbit (baseline)
 * Two independent frosted pills with an 8 px gap.
 * No visual relationship beyond shared chrome style.
 */
function C1Orbit() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
      <MapContextBar />
      <RealmTabBar />
    </Box>
  );
}

/**
 * C2 — Proximity
 * 3 px gap. A shared diffuse blue aura sits behind both pills,
 * hinting that they belong to the same logical group.
 */
function C2Proximity() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
        position: "relative",
        // Shared aura — soft blue radial glow behind both pills
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "-10px -12px",
          borderRadius: "36px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.22) 0%, transparent 72%)",
          pointerEvents: "none",
        },
      }}
    >
      <MapContextBar />
      <RealmTabBar />
    </Box>
  );
}

/**
 * C3 — Fused Compound
 * Zero gap. The context bar gets flat bottom corners; the realm bar
 * gets flat top corners. They share the same FROSTED surface and a
 * single 1px inner divider — reads as one compound shape.
 */
function C3FusedCompound() {
  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "stretch" }}>
      <MapContextBar
        sx={{
          justifyContent: "center",
          borderRadius: `${FROSTED_RADIUS}px ${FROSTED_RADIUS}px 0 0`,
          borderBottomColor: "transparent",
          boxShadow: "none",
        }}
      />
      {/* 1px shared divider */}
      <Box sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
      <RealmTabBar
        sx={{
          borderRadius: `0 0 ${FROSTED_RADIUS}px ${FROSTED_RADIUS}px`,
          borderTopColor: "transparent",
          boxShadow: FROSTED_SHADOW,
        }}
      />
    </Box>
  );
}

/**
 * C4 — Stepped Hierarchy  (matches reference sketch)
 * Natural width difference does the work: the context bar is narrow
 * (~140 px for "< Map >") while the realm bar is wide (~320 px for
 * three tabs). A 4 px gap lets both breathe while the size contrast
 * signals parent → child. A subtle 1 px vertical connector stroke
 * at the center emphasises the relationship.
 */
function C4Stepped() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        position: "relative",
      }}
    >
      <MapContextBar sx={{ zIndex: 2 }} />
      {/* Connector stub */}
      <Box
        sx={{
          width: "1px",
          height: "8px",
          bgcolor: "rgba(255,255,255,0.18)",
          flexShrink: 0,
          zIndex: 1,
        }}
      />
      <RealmTabBar sx={{ zIndex: 2 }} />
    </Box>
  );
}

/**
 * C5 — Tower Panel
 * A single rounded container houses both rows with an inner divider.
 * Maximum cohesion — the two elements are literally one chrome unit.
 */
function C5Tower() {
  return (
    <Box
      sx={{
        ...FROSTED,
        borderRadius: "20px",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        gap: 0,
      }}
    >
      {/* Context row */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.5,
          py: 1,
        }}
      >
        <ChevronLeftRoundedIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.35)" }} />
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: 1,
            bgcolor: "#1d4ed8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapRoundedIcon sx={{ fontSize: 14, color: "#fff" }} />
        </Box>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: 0.3 }}>
          Map
        </Typography>
        <ChevronRightRoundedIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.35)" }} />
      </Box>
      {/* Inner divider */}
      <Box sx={{ width: "100%", height: "1px", bgcolor: "rgba(255,255,255,0.09)" }} />
      {/* Realm row */}
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0, px: 0.5, py: 0.625 }}>
        {REALM_TABS.map(({ id, label, Icon }) => {
          const isActive = id === "website";
          return (
            <Box
              key={id}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.25,
                py: 0.5,
                borderRadius: 20,
                bgcolor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                cursor: "pointer",
              }}
            >
              <Icon sx={{ fontSize: 15, color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR }} />
              <Typography
                sx={{ fontSize: 12, fontWeight: isActive ? 700 : 500, color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR, letterSpacing: 0.3 }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/**
 * C6 — Badge Float
 * The realm bar is the base (wider, more prominent). The context pill
 * overlaps its top edge by ~14 px, like a title badge capping a panel.
 * Depth is enforced by a heavier box-shadow on the floating badge.
 */
function C6BadgeFloat() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Realm bar — sits lower, slightly wider feel from the padding */}
      <RealmTabBar sx={{ mt: "20px" }} />
      {/* Context badge — absolute, centered, overlapping the top of the realm bar */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <MapContextBar
          sx={{
            boxShadow: "0 4px 20px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        />
      </Box>
    </Box>
  );
}

/**
 * C7 — Bridge Connector
 * A narrow centered strip fills the gap between the two pills, visually
 * linking them without merging. The strip shares the same FROSTED surface
 * and picks up the same border on its sides (no top/bottom border so the
 * join is seamless).
 */
function C7BridgeConnector() {
  const BRIDGE_W = 24; // px — narrower than either pill

  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <MapContextBar sx={{ borderRadius: `${FROSTED_RADIUS}px` }} />
      {/* Bridge strip — no top or bottom border so it blends with the pills */}
      <Box
        sx={{
          width: `${BRIDGE_W}px`,
          height: "10px",
          bgcolor: FROSTED_BG,
          borderLeft: FROSTED_BORDER,
          borderRight: FROSTED_BORDER,
          // Subtle inner glow to read as depth, not gap
          boxShadow: `inset 0 0 4px rgba(59,130,246,0.12)`,
        }}
      />
      <RealmTabBar />
    </Box>
  );
}

/**
 * C8 — Inline Row
 * A single horizontal pill hosts both the map context (left) and the
 * active realm chip (right), separated by a 1 px divider. The realm chip
 * has an expand chevron — tapping it would reveal the full tab picker
 * (a dropdown or animated width expansion). Maximum compactness.
 */
function C8InlineRow() {
  return (
    <Box
      sx={{
        ...FROSTED,
        borderRadius: FROSTED_RADIUS,
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        px: 0.5,
        py: 0.5,
      }}
    >
      {/* Context section */}
      <Box
        sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.25, py: 0.5 }}
      >
        <ChevronLeftRoundedIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }} />
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: 0.75,
            bgcolor: "#1d4ed8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapRoundedIcon sx={{ fontSize: 13, color: "#fff" }} />
        </Box>
        <Typography
          sx={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: 0.3 }}
        >
          Map
        </Typography>
        <ChevronRightRoundedIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }} />
      </Box>
      {/* Divider */}
      <Box sx={{ width: "1px", height: 20, bgcolor: "rgba(255,255,255,0.12)", mx: 0.25 }} />
      {/* Active realm chip */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          px: 1.25,
          py: 0.5,
          borderRadius: 20,
          bgcolor: "rgba(255,255,255,0.09)",
          cursor: "pointer",
        }}
      >
        <TravelExploreRoundedIcon sx={{ fontSize: 16, color: ACTIVE_COLOR }} />
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: ACTIVE_COLOR, letterSpacing: 0.3 }}>
          Website
        </Typography>
        <KeyboardArrowDownRoundedIcon
          sx={{ fontSize: 14, color: "rgba(255,255,255,0.38)" }}
        />
      </Box>
    </Box>
  );
}

// =============================================================================
// Concept gallery
// =============================================================================

type ConceptDef = {
  id: string;
  title: string;
  subtitle: string;
  Component: () => React.ReactElement;
};

const CONCEPTS: ConceptDef[] = [
  {
    id: "c1",
    title: "C1 — Orbit",
    subtitle: "Baseline: two fully independent frosted pills, 8 px gap. No visual link.",
    Component: C1Orbit,
  },
  {
    id: "c2",
    title: "C2 — Proximity",
    subtitle: "3 px gap + shared diffuse blue aura — suggests parentage without touching.",
    Component: C2Proximity,
  },
  {
    id: "c3",
    title: "C3 — Fused Compound",
    subtitle: "Flat inner corners, zero gap, 1 px inner divider — one compound shape.",
    Component: C3FusedCompound,
  },
  {
    id: "c4",
    title: "C4 — Stepped (reference image)",
    subtitle: "Natural width contrast + 8 px connector stub. Narrow parent / wide child.",
    Component: C4Stepped,
  },
  {
    id: "c5",
    title: "C5 — Tower Panel",
    subtitle: "Both rows inside a single rounded container with an inner rule.",
    Component: C5Tower,
  },
  {
    id: "c6",
    title: "C6 — Badge Float",
    subtitle: "Context pill overlaps the realm bar's top edge like a floating title badge.",
    Component: C6BadgeFloat,
  },
  {
    id: "c7",
    title: "C7 — Bridge Connector",
    subtitle: "A narrow frosted strip fills the gap — connected but not merged.",
    Component: C7BridgeConnector,
  },
  {
    id: "c8",
    title: "C8 — Inline Row",
    subtitle: "Single horizontal bar: context + divider + active realm chip (expand affordance).",
    Component: C8InlineRow,
  },
];

// Shared dark tile-grid backdrop to simulate the map overlay environment
function ConceptCard({ title, subtitle, Component }: ConceptDef) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
        bgcolor: "#0c1220",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.12) 0%, transparent 70%)",
      }}
    >
      {/* Mock map area */}
      <Box
        sx={{
          position: "relative",
          height: 200,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          pt: 4.5,
        }}
      >
        {/* Tile grid */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: "3px",
            p: "6px",
            opacity: 0.22,
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                borderRadius: "3px",
                bgcolor:
                  i === 7 || i === 8 || i === 13 || i === 14
                    ? "rgba(59,130,246,0.5)"
                    : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </Box>
        {/* Corner bracket (top-left) */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            width: 18,
            height: 18,
            borderTop: "2px solid rgba(99,160,255,0.45)",
            borderLeft: "2px solid rgba(99,160,255,0.45)",
            borderRadius: "2px 0 0 0",
          }}
        />
        {/* Corner bracket (top-right) */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 18,
            height: 18,
            borderTop: "2px solid rgba(99,160,255,0.45)",
            borderRight: "2px solid rgba(99,160,255,0.45)",
            borderRadius: "0 2px 0 0",
          }}
        />
        {/* The concept itself */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Component />
        </Box>
      </Box>
      {/* Label */}
      <Box
        sx={{
          px: 2.5,
          py: 1.75,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Typography
          sx={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", letterSpacing: 0.2 }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.38)", mt: 0.5, lineHeight: 1.5 }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

function BarConnectionGallery() {
  return (
    <Box sx={{ p: 5, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 800,
          color: "#0f172a",
          letterSpacing: -0.5,
          mb: 0.75,
        }}
      >
        Bar Connection Concepts
      </Typography>
      <Typography sx={{ fontSize: 14, color: "#64748b", mb: 4, maxWidth: 560 }}>
        8 concepts for visually connecting the HUD top-center context bar
        (
        <Box component="code" sx={{ fontSize: 12, bgcolor: "#e2e8f0", px: 0.75, py: 0.25, borderRadius: 1 }}>
          {"< Map >"}
        </Box>
        ) with the realm-selector pill (
        <Box component="code" sx={{ fontSize: 12, bgcolor: "#e2e8f0", px: 0.75, py: 0.25, borderRadius: 1 }}>
          Website / App / Technical
        </Box>
        ) beneath it.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 3,
        }}
      >
        {CONCEPTS.map((c) => (
          <ConceptCard key={c.id} {...c} />
        ))}
      </Box>
    </Box>
  );
}

// =============================================================================
// Story meta + export
// =============================================================================

const meta: Meta = {
  title: "HUD / Map / BarConnection",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
};

export default meta;

export const Gallery: StoryObj = {
  name: "Connection Concepts",
  render: () => <BarConnectionGallery />,
};

// =============================================================================
// Intro Progress concepts — Row 1: RealmLocationBar  Row 2: ← [dots] →
// =============================================================================

const SLIDE_COUNT = 4;

/**
 * Mock of the RealmLocationBar pill as it appears in the HUD top-center slot.
 * Shows the realm prefix (dialpad + rocket + "App ›") and the page nav
 * (‹ [swatch] AI Chat ›) separated by a 1 px divider.
 */
function IntroRealmBar() {
  return (
    <Box
      sx={{
        ...FROSTED,
        borderRadius: FROSTED_RADIUS,
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        px: 0.75,
        py: 0.5,
        height: 36,
      }}
    >
      {/* Realm prefix */}
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: "3px", pr: 0.75 }}>
        <DialpadRoundedIcon sx={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }} />
        <RocketLaunchRoundedIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }} />
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#dbeafe", letterSpacing: 0.4 }}>
          App
        </Typography>
        <ChevronRightRoundedIcon sx={{ fontSize: 11, color: "rgba(255,255,255,0.5)", mx: "-2px" }} />
      </Box>

      {/* Divider */}
      <Box sx={{ width: "1px", height: 18, bgcolor: "rgba(255,255,255,0.18)", mx: 0.5, flexShrink: 0 }} />

      {/* Page nav */}
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0 }}>
        <ChevronLeftRoundedIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.3)", cursor: "pointer" }} />
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: 0.75,
            bgcolor: "#6366f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: 0.25,
          }}
        >
          <SmartToyRoundedIcon sx={{ fontSize: 14, color: "#fff" }} />
        </Box>
        <Typography sx={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: 0.2, px: 0.5 }}>
          AI Chat
        </Typography>
        <ChevronRightRoundedIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.3)", cursor: "pointer" }} />
      </Box>
    </Box>
  );
}

/** The slide progress dots + arrows, live with `activeSlide` state. */
function IntroDots({
  active,
  total,
  onBack,
  onForward,
  onDot,
}: {
  active: number;
  total: number;
  onBack: () => void;
  onForward: () => void;
  onDot: (i: number) => void;
}) {
  const canBack = active > 0;
  const canForward = active < total - 1;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 0.75,
        height: 32,
      }}
    >
      <IconButton
        size="small"
        disabled={!canBack}
        onClick={onBack}
        sx={{
          p: 0.5,
          color: canBack ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
          "&.Mui-disabled": { color: "rgba(255,255,255,0.2)" },
          transition: "color 150ms",
        }}
      >
        <ArrowBackIosNewRoundedIcon sx={{ fontSize: 11 }} />
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, px: 0.25 }}>
        {Array.from({ length: total }).map((_, i) => (
          <Box
            key={i}
            onClick={() => onDot(i)}
            sx={{
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 3,
              flexShrink: 0,
              bgcolor: i === active ? "#3b82f6" : "rgba(255,255,255,0.28)",
              cursor: i === active ? "default" : "pointer",
              transition: "width 280ms cubic-bezier(0.4,0,0.2,1), background-color 200ms",
              "&:hover": i !== active ? { bgcolor: "rgba(255,255,255,0.52)" } : {},
            }}
          />
        ))}
      </Box>

      <IconButton
        size="small"
        disabled={!canForward}
        onClick={onForward}
        sx={{
          p: 0.5,
          color: canForward ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
          "&.Mui-disabled": { color: "rgba(255,255,255,0.2)" },
          transition: "color 150ms",
        }}
      >
        <ArrowForwardIosRoundedIcon sx={{ fontSize: 11 }} />
      </IconButton>
    </Box>
  );
}

// -----------------------------------------------------------------------------

/**
 * C9 — Intro: Tower (2-row unified panel)
 *
 * RealmLocationBar and slide progress live inside a single frosted container
 * separated by an inner rule. Maximum cohesion — the bar reads as one HUD
 * unit with two stacked functions. The narrower progress row (bottom) sits
 * visually subordinate to the wider realm+page nav row (top).
 */
function C9IntroTower() {
  const [active, setActive] = useState(1);
  return (
    <Box
      sx={{
        ...FROSTED,
        borderRadius: "20px",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Row 1: RealmLocationBar */}
      <IntroRealmBar />

      {/* Inner divider */}
      <Box sx={{ width: "100%", height: "1px", bgcolor: "rgba(255,255,255,0.09)", flexShrink: 0 }} />

      {/* Row 2: slide progress */}
      <IntroDots
        active={active}
        total={SLIDE_COUNT}
        onBack={() => setActive((p) => Math.max(0, p - 1))}
        onForward={() => setActive((p) => Math.min(SLIDE_COUNT - 1, p + 1))}
        onDot={setActive}
      />
    </Box>
  );
}

/**
 * C10 — Intro: Stepped (separate pills, connector stub)
 *
 * The RealmLocationBar pill (wider) sits on top; the narrower slide-progress
 * pill hangs below it, linked by an 8 px connector stub at the center.
 * Width contrast reinforces the parent→child hierarchy. Both pills use the
 * same frosted surface so they read as a family.
 */
function C10IntroStepped() {
  const [active, setActive] = useState(1);
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        position: "relative",
      }}
    >
      {/* Top pill: realm + page nav */}
      <Box sx={{ ...FROSTED, borderRadius: FROSTED_RADIUS, zIndex: 2 }}>
        <IntroRealmBar />
      </Box>

      {/* Connector stub */}
      <Box
        sx={{
          width: "1px",
          height: "10px",
          bgcolor: "rgba(255,255,255,0.18)",
          flexShrink: 0,
          zIndex: 1,
        }}
      />

      {/* Bottom pill: slide progress */}
      <Box
        sx={{
          ...FROSTED,
          borderRadius: FROSTED_RADIUS,
          zIndex: 2,
        }}
      >
        <IntroDots
          active={active}
          total={SLIDE_COUNT}
          onBack={() => setActive((p) => Math.max(0, p - 1))}
          onForward={() => setActive((p) => Math.min(SLIDE_COUNT - 1, p + 1))}
          onDot={setActive}
        />
      </Box>
    </Box>
  );
}

/**
 * C11 — Intro: Fused 2-row (flat-edge join, zero gap)
 *
 * Like C3 Fused Compound but scoped to the intro use-case. The realm
 * bar gets flat bottom corners; the progress bar gets flat top corners.
 * A single 1 px rule divides them. The result is one compound pill where
 * each row has its own visual weight without any gap or connector.
 */
function C11IntroFused() {
  const [active, setActive] = useState(1);
  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "stretch" }}>
      {/* Top: realm + page nav */}
      <Box
        sx={{
          ...FROSTED,
          borderRadius: `${FROSTED_RADIUS}px ${FROSTED_RADIUS}px 0 0`,
          borderBottomColor: "transparent",
          boxShadow: "none",
        }}
      >
        <IntroRealmBar />
      </Box>

      {/* 1px shared divider */}
      <Box sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

      {/* Bottom: slide progress */}
      <Box
        sx={{
          ...FROSTED,
          borderRadius: `0 0 ${FROSTED_RADIUS}px ${FROSTED_RADIUS}px`,
          borderTopColor: "transparent",
          boxShadow: FROSTED_SHADOW,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IntroDots
          active={active}
          total={SLIDE_COUNT}
          onBack={() => setActive((p) => Math.max(0, p - 1))}
          onForward={() => setActive((p) => Math.min(SLIDE_COUNT - 1, p + 1))}
          onDot={setActive}
        />
      </Box>
    </Box>
  );
}

/**
 * C12 — Intro: Proximity (aura link, 3 px gap)
 *
 * Two independent frosted pills 3 px apart, sharing a diffuse blue aura.
 * The lightest possible connection — both bars keep their full roundness
 * and can animate independently. Good for a subtle "these belong together"
 * signal without structural commitment.
 */
function C12IntroProximity() {
  const [active, setActive] = useState(1);
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "-10px -14px",
          borderRadius: "36px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.2) 0%, transparent 72%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ ...FROSTED, borderRadius: FROSTED_RADIUS }}>
        <IntroRealmBar />
      </Box>
      <Box sx={{ ...FROSTED, borderRadius: FROSTED_RADIUS }}>
        <IntroDots
          active={active}
          total={SLIDE_COUNT}
          onBack={() => setActive((p) => Math.max(0, p - 1))}
          onForward={() => setActive((p) => Math.min(SLIDE_COUNT - 1, p + 1))}
          onDot={setActive}
        />
      </Box>
    </Box>
  );
}

// =============================================================================
// Intro concepts gallery
// =============================================================================

type IntroConcept = {
  id: string;
  title: string;
  subtitle: string;
  Component: () => React.ReactElement;
};

const INTRO_CONCEPTS: IntroConcept[] = [
  {
    id: "c9",
    title: "C9 — Tower (unified panel)",
    subtitle: "Single frosted container, two rows + inner rule. Maximum cohesion. Realm bar on top, progress below.",
    Component: C9IntroTower,
  },
  {
    id: "c10",
    title: "C10 — Stepped (connector stub)",
    subtitle: "Two separate pills — realm bar (wider) above, progress pill (narrower) below, linked by an 8 px stub.",
    Component: C10IntroStepped,
  },
  {
    id: "c11",
    title: "C11 — Fused 2-row (flat-edge join)",
    subtitle: "Zero gap, flat inner corners, shared 1 px divider. One compound pill — no connector needed.",
    Component: C11IntroFused,
  },
  {
    id: "c12",
    title: "C12 — Proximity (aura only)",
    subtitle: "Two fully independent pills 3 px apart with a shared blue glow. Each bar can animate independently.",
    Component: C12IntroProximity,
  },
];

/** Same dark tile-grid card used by the main gallery, reused for parity. */
function IntroConceptCard({ title, subtitle, Component }: IntroConcept) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
        bgcolor: "#0c1220",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.12) 0%, transparent 70%)",
      }}
    >
      {/* Mock map / slide area — simulates the intro overlay */}
      <Box
        sx={{
          position: "relative",
          height: 220,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          pt: 3.5,
        }}
      >
        {/* HUD topRow strip */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 40,
            bgcolor: "rgba(0,0,0,0.55)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>
            HUD topRow
          </Typography>
        </Box>

        {/* Slide content placeholder */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            top: 40,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: "3px",
            p: "6px",
            opacity: 0.1,
          }}
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <Box key={i} sx={{ borderRadius: "3px", bgcolor: "rgba(255,255,255,0.12)" }} />
          ))}
        </Box>

        {/* The concept itself — positioned just below topRow */}
        <Box sx={{ position: "relative", zIndex: 2, mt: "4px" }}>
          <Component />
        </Box>
      </Box>

      {/* Label */}
      <Box sx={{ px: 2.5, py: 1.75, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", letterSpacing: 0.2 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.38)", mt: 0.5, lineHeight: 1.5 }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

function IntroProgressGallery() {
  return (
    <Box sx={{ p: 5, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: -0.5, mb: 0.75 }}>
        Intro Progress Bar — 2-Row Concepts
      </Typography>
      <Typography sx={{ fontSize: 14, color: "#64748b", mb: 1, maxWidth: 600 }}>
        How to combine the{" "}
        <Box component="code" sx={{ fontSize: 12, bgcolor: "#e2e8f0", px: 0.75, py: 0.25, borderRadius: 1 }}>
          RealmLocationBar
        </Box>{" "}
        (HUD top-center, always visible) with the{" "}
        <Box component="code" sx={{ fontSize: 12, bgcolor: "#e2e8f0", px: 0.75, py: 0.25, borderRadius: 1 }}>
          IntroProgressBar
        </Box>{" "}
        (← dots →) during the intro presentation.
      </Typography>
      <Typography sx={{ fontSize: 13, color: "#94a3b8", mb: 4, maxWidth: 600 }}>
        Dots are interactive — click to jump slides. The{" "}
        <Box component="span" sx={{ color: "#3b82f6", fontWeight: 700 }}>active dot</Box> expands
        to a pill shape; inactive dots are 6 px circles.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 3,
        }}
      >
        {INTRO_CONCEPTS.map((c) => (
          <IntroConceptCard key={c.id} {...c} />
        ))}
      </Box>
    </Box>
  );
}

export const IntroProgress: StoryObj = {
  name: "Intro Progress Concepts",
  render: () => <IntroProgressGallery />,
};
