/**
 * HudRailsAndNav.stories — Three layout variants exploring improved side-rail
 * button display and a unified realm+page nav bar in the header.
 *
 * Variant A — Labeled Rails
 *   Both side rails show icon + small label so users can identify actions
 *   without hovering. Header nav is unchanged.
 *
 * Variant B — Realm Nav Bar
 *   Side rails are unchanged (icon-only FABs). The header center bar merges
 *   realm switching + page navigation into one frosted pill:
 *     [🌐 Website ›] [│] [‹] [swatch] [page name] [›]
 *
 * Variant C — Full Integration (Implementation Target)
 *   Labeled rails + unified realm nav bar combined. This is the variant that
 *   is implemented in the live app.
 */

import React, { useCallback, useEffect, useRef, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  alpha,
  keyframes,
} from "@mui/material"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import VisibilityIcon from "@mui/icons-material/Visibility"
import SettingsIcon from "@mui/icons-material/Settings"
import PersonIcon from "@mui/icons-material/Person"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded"
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded"
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded"
import LayersRoundedIcon from "@mui/icons-material/LayersRounded"

import type { MapGridNavigationConfig } from "@expanse/map"
import { FullHud } from "../FullHud"
import { DEMO_TILE_PAGES } from "../../../hud-components/_demo"

// ─── Shared nav config ────────────────────────────────────────────────────────

const sampleConfig: MapGridNavigationConfig = {
  dimensions: {
    width: 4,
    height: 3,
    homePosition: { x: 0, y: 0 },
    wrapAround: false,
  },
  tiles: [
    {
      id: "home",
      position: { x: 0, y: 0 },
      seo: { title: "Home" },
      display: {
        label: "Home",
        category: "primary",
        colors: { inactive: "rgba(99,102,241,0.4)", active: "#6366f1" },
      },
    },
    {
      id: "explore",
      position: { x: 1, y: 0 },
      seo: { title: "Explore" },
      display: {
        label: "Explore",
        category: "primary",
        colors: { inactive: "rgba(99,102,241,0.4)", active: "#6366f1" },
      },
    },
    {
      id: "learn",
      position: { x: 2, y: 0 },
      seo: { title: "Learn" },
      display: {
        label: "Learn",
        category: "secondary",
        colors: { inactive: "rgba(34,197,94,0.4)", active: "#22c55e" },
      },
    },
    {
      id: "play",
      position: { x: 3, y: 0 },
      seo: { title: "Play" },
      display: {
        label: "Play",
        category: "secondary",
        colors: { inactive: "rgba(34,197,94,0.4)", active: "#22c55e" },
      },
    },
  ],
}

// =============================================================================
// Mock RealmLocationBar — for Storybook (no app-layer hooks)
// =============================================================================
//
// A self-contained visual mock of the combined realm+page nav bar. Uses static
// data so the story doesn't depend on app-level providers.

const doubleStrike = keyframes`
  0%   { background-position: -160% 50% }
  24%  { background-position: 240% 50%  }
  100% { background-position: 240% 50%  }
`

const ICE_VEIN_SX = {
  display: "inline-block",
  background:
    "linear-gradient(115deg, #dbeafe 0%, #e5e7eb 28%, #ffffff 33%, #dbeafe 38%, #dbeafe 50%, #ffffff 55%, #dbeafe 60%, #dbeafe 100%)",
  backgroundSize: "300% 100%",
  backgroundPosition: "-160% 50%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: `${doubleStrike} 7s ease-in-out infinite`,
  animationDelay: "8s",
} as const

type RealmKey = "website" | "app" | "technical"

const REALM_TABS: { id: RealmKey; label: string; Icon: React.ElementType }[] =
  [
    { id: "website", label: "Website", Icon: TravelExploreRoundedIcon },
    { id: "app", label: "App", Icon: RocketLaunchRoundedIcon },
    { id: "technical", label: "Technical", Icon: SchemaRoundedIcon },
  ]

function RealmLabel({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <Typography
      component="span"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      sx={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.4,
        lineHeight: 1,
        cursor: "pointer",
        userSelect: "none",
        transition: "opacity 180ms ease",
        ...(active
          ? ICE_VEIN_SX
          : {
              color: "rgba(255,255,255,0.55)",
              "&:hover": { color: "rgba(255,255,255,0.85)" },
            }),
      }}
    >
      {label}
    </Typography>
  )
}

function SmallChevron({ dim = false }: { dim?: boolean }) {
  return (
    <ChevronRightRoundedIcon
      sx={{
        fontSize: 11,
        color: "#ffffff",
        opacity: dim ? 0.3 : 0.65,
        flexShrink: 0,
        mx: "-2px",
      }}
    />
  )
}

function MockRealmLocationBar() {
  const [activeRealm, setActiveRealm] = useState<RealmKey>("website")
  const [expanded, setExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const activeTab = REALM_TABS.find((t) => t.id === activeRealm)!
  const ActiveIcon = activeTab.Icon

  useEffect(() => {
    if (!expanded) return
    const onDown = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return
      setExpanded(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [expanded])

  const handleSelect = useCallback((id: RealmKey) => {
    setActiveRealm(id)
    setExpanded(false)
  }, [])

  // Frosted pill styles
  const pillBg = {
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.78) 0%, rgba(30,41,59,0.72) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.14)",
    boxShadow:
      "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        ...pillBg,
        display: "inline-flex",
        alignItems: "center",
        height: 44,
        borderRadius: 999,
        px: 1,
        gap: 0,
      }}
    >
      {/* Realm icon (always visible) */}
      <ActiveIcon
        sx={{ fontSize: 14, color: "rgba(255,255,255,0.8)", flexShrink: 0, mx: 0.5 }}
      />

      {/* Collapsible realm selector */}
      {!expanded ? (
        <Box
          onClick={() => setExpanded(true)}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
            cursor: "pointer",
            pr: 0.5,
            transition: "opacity 120ms ease",
          }}
        >
          <RealmLabel label={activeTab.label} active onClick={() => setExpanded(true)} />
          <SmallChevron />
        </Box>
      ) : (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
            pr: 0.5,
            transition: "opacity 120ms ease",
          }}
        >
          {REALM_TABS.map((tab, i) => (
            <Box
              key={tab.id}
              sx={{ display: "inline-flex", alignItems: "center", gap: "2px" }}
            >
              {i > 0 && <SmallChevron dim />}
              <RealmLabel
                label={tab.label}
                active={tab.id === activeRealm}
                onClick={() => handleSelect(tab.id)}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Vertical divider */}
      <Box
        sx={{
          width: "1px",
          height: 18,
          bgcolor: "rgba(255,255,255,0.18)",
          flexShrink: 0,
          mx: 0.75,
        }}
      />

      {/* Page nav — back */}
      <Tooltip title="Back">
        <IconButton
          size="small"
          disabled
          sx={{ color: alpha("#fff", 0.35), p: 0.5, "&.Mui-disabled": { color: alpha("#fff", 0.35) } }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 13 }} />
        </IconButton>
      </Tooltip>

      {/* Page swatch */}
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 0.75,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#6366f1",
          mx: 0.5,
          flexShrink: 0,
        }}
      >
        <HomeRoundedIcon sx={{ fontSize: 18, color: "#fff" }} />
      </Box>

      {/* Page name */}
      <Typography
        variant="caption"
        noWrap
        sx={{
          fontWeight: 600,
          color: "common.white",
          fontSize: 11,
          letterSpacing: 0.2,
          userSelect: "none",
          maxWidth: 80,
          mx: 0.5,
        }}
      >
        Home
      </Typography>

      {/* Page nav — forward */}
      <Tooltip title="Forward">
        <IconButton
          size="small"
          sx={{ color: "rgba(255,255,255,0.75)", p: 0.5 }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

// =============================================================================
// Mock rail button (for overlay annotations in the screenshots)
// =============================================================================

function MockFabButton({
  icon,
  label,
  showLabel,
  size = 40,
}: {
  icon: React.ReactNode
  label: string
  showLabel?: boolean
  size?: number
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: showLabel ? 0.5 : 0,
      }}
    >
      <Tooltip title={showLabel ? "" : label} placement="right">
        <Box
          sx={{
            width: size,
            height: size,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha("#6366f1", 0.12),
            border: `1px solid ${alpha("#6366f1", 0.3)}`,
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            color: alpha("#ffffff", 0.75),
            "&:hover": {
              bgcolor: alpha("#6366f1", 0.22),
              color: "#ffffff",
            },
            transition: "all 180ms ease",
          }}
        >
          {icon}
        </Box>
      </Tooltip>
      {showLabel && (
        <Typography
          sx={{
            fontSize: 9,
            fontWeight: 600,
            lineHeight: 1,
            color: alpha("#ffffff", 0.55),
            letterSpacing: 0.3,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  )
}

// =============================================================================
// Annotation card — explains what's different in each variant
// =============================================================================

function AnnotationCard({
  variant,
  title,
  bullets,
}: {
  variant: "A" | "B" | "C"
  title: string
  bullets: string[]
}) {
  const colors: Record<"A" | "B" | "C", { bg: string; border: string; badge: string }> = {
    A: { bg: "#f0fdf4", border: "#86efac", badge: "#22c55e" },
    B: { bg: "#eff6ff", border: "#93c5fd", badge: "#3b82f6" },
    C: { bg: "#faf5ff", border: "#c4b5fd", badge: "#8b5cf6" },
  }
  const c = colors[variant]
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        bgcolor: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 2,
        px: 2.5,
        py: 1.5,
        minWidth: 340,
        maxWidth: 480,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        pointerEvents: "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            bgcolor: c.badge,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
            {variant}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>
          {title}
        </Typography>
      </Box>
      {bullets.map((b) => (
        <Typography
          key={b}
          sx={{ fontSize: 11, color: "#475569", lineHeight: 1.6, display: "flex", gap: 0.75 }}
        >
          <span style={{ opacity: 0.5 }}>•</span> {b}
        </Typography>
      ))}
    </Box>
  )
}

// =============================================================================
// Meta
// =============================================================================

const meta: Meta = {
  title: "Layout Systems/HUD/Rails and Nav",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
}
export default meta
type Story = StoryObj

// =============================================================================
// Variant A — Labeled Rails
// =============================================================================

export const VariantA_LabeledRails: Story = {
  name: "A — Labeled Rails",
  render: () => (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
      <FullHud
        navigationConfig={sampleConfig}
        pages={DEMO_TILE_PAGES}
        initialLabelsVisible
      />
      <AnnotationCard
        variant="A"
        title="Labeled Rails"
        bullets={[
          "Each FAB button now shows a small label below the icon circle",
          "Left rail: 'Game Bar' + 'Show Bars' — readable without hover",
          "Right rail: 'Profile' + 'Settings' — always visible",
          "Panel hover-expand behavior is unchanged",
          "Header center: standard page nav (unchanged)",
        ]}
      />
    </Box>
  ),
}

// =============================================================================
// Variant B — Realm Nav Bar
// =============================================================================

export const VariantB_RealmNavBar: Story = {
  name: "B — Realm Nav Bar",
  render: () => (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* FullHud renders its own top row — we overlay the mock realm bar on top
          to show what it will look like. The actual implementation registers it
          via useRegisterCenterContent inside the HUD provider tree. */}
      <FullHud
        navigationConfig={sampleConfig}
        pages={DEMO_TILE_PAGES}
      />

      {/* Overlay the mock realm bar at top-center to show the intended design */}
      <Box
        sx={{
          position: "fixed",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9998,
          pointerEvents: "auto",
        }}
      >
        <MockRealmLocationBar />
      </Box>

      <AnnotationCard
        variant="B"
        title="Realm Nav Bar (center header)"
        bullets={[
          "Header center merges realm selection + page nav into one frosted pill",
          "Left zone: realm icon + label + › chevron (click to expand all realms)",
          "Expanded: Website › App › Technical — click any to switch realm",
          "Right zone: ‹ [page swatch] [page name] › (standard page nav)",
          "Side rails: unchanged (icon-only FABs)",
        ]}
      />
    </Box>
  ),
}

// =============================================================================
// Variant C — Full Integration
// =============================================================================

export const VariantC_FullIntegration: Story = {
  name: "C — Full Integration ⭐",
  render: () => (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
      <FullHud
        navigationConfig={sampleConfig}
        pages={DEMO_TILE_PAGES}
        initialLabelsVisible
      />

      {/* Overlay the mock realm bar to show the combined result */}
      <Box
        sx={{
          position: "fixed",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9998,
          pointerEvents: "auto",
        }}
      >
        <MockRealmLocationBar />
      </Box>

      <AnnotationCard
        variant="C"
        title="Full Integration — Labeled Rails + Realm Nav Bar"
        bullets={[
          "Both improvements combined — this is the implemented variant",
          "Left + right rails show labeled FABs (Game Bar, Show Bars, Profile, Settings)",
          "Header: realm switcher + page nav in a single frosted pill",
          "Users can identify all HUD actions at a glance, no hover required",
          "Realm switching is always one click away from the header bar",
        ]}
      />
    </Box>
  ),
}

// =============================================================================
// Side-by-side comparison panel (static, no interactivity)
// =============================================================================

export const SideBySideComparison: Story = {
  name: "Side-by-Side Comparison",
  parameters: {
    layout: "padded",
    backgrounds: { default: "light-grey", values: [{ name: "light-grey", value: "#f1f5f9" }] },
  },
  render: () => {
    const PILL_DEMO = (showLabel: boolean) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: "rgba(15,23,42,0.85)",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        <MockFabButton
          icon={<SportsEsportsIcon sx={{ fontSize: 20 }} />}
          label="Game Bar"
          showLabel={showLabel}
        />
        <MockFabButton
          icon={<VisibilityIcon sx={{ fontSize: 20 }} />}
          label="Show Bars"
          showLabel={showLabel}
        />
      </Box>
    )

    const RIGHT_RAIL = (showLabel: boolean) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: "rgba(15,23,42,0.85)",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        <MockFabButton
          icon={<PersonIcon sx={{ fontSize: 20 }} />}
          label="Profile"
          showLabel={showLabel}
        />
        <MockFabButton
          icon={<SettingsIcon sx={{ fontSize: 20 }} />}
          label="Settings"
          showLabel={showLabel}
        />
      </Box>
    )

    const NAV_PILL = (showRealm: boolean) => (
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          height: 44,
          px: 1.25,
          borderRadius: 999,
          gap: 0.5,
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.78) 0%, rgba(30,41,59,0.72) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        }}
      >
        {showRealm && (
          <>
            <TravelExploreRoundedIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }} />
            <Typography sx={{ ...ICE_VEIN_SX, fontSize: 11, fontWeight: 700, letterSpacing: 0.4, lineHeight: 1 }}>
              Website
            </Typography>
            <SmallChevron />
            <Box sx={{ width: 1, height: 18, bgcolor: "rgba(255,255,255,0.18)", mx: 0.5 }} />
          </>
        )}
        <ArrowBackIosNewIcon sx={{ fontSize: 13, color: alpha("#fff", 0.35) }} />
        <Box
          sx={{
            width: 28, height: 28, borderRadius: 0.75,
            display: "flex", alignItems: "center", justifyContent: "center",
            bgcolor: "#6366f1", mx: 0.5,
          }}
        >
          <HomeRoundedIcon sx={{ fontSize: 18, color: "#fff" }} />
        </Box>
        <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: 0.2, mr: 0.5 }}>
          Home
        </Typography>
        <ArrowForwardIosIcon sx={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }} />
      </Box>
    )

    const CompareCard = ({
      variant,
      title,
      leftRailDemo,
      navDemo,
      rightRailDemo,
    }: {
      variant: "A" | "B" | "C"
      title: string
      leftRailDemo: React.ReactNode
      navDemo: React.ReactNode
      rightRailDemo: React.ReactNode
    }) => {
      const colors: Record<"A" | "B" | "C", string> = {
        A: "#22c55e",
        B: "#3b82f6",
        C: "#8b5cf6",
      }
      return (
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            border: `1px solid ${alpha(colors[variant], 0.25)}`,
            bgcolor: "#ffffff",
            boxShadow: `0 4px 20px ${alpha(colors[variant], 0.08)}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
            <Box
              sx={{
                width: 28, height: 28, borderRadius: "50%",
                bgcolor: colors[variant],
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: "#ffffff" }}>{variant}</Typography>
            </Box>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{title}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              bgcolor: "#0f172a",
              borderRadius: 2,
              p: 3,
              position: "relative",
            }}
          >
            {/* Left rail */}
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              {leftRailDemo}
            </Box>

            {/* Center nav */}
            <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
              {navDemo}
            </Box>

            {/* Right rail */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {rightRailDemo}
            </Box>

            {/* Screen edge labels */}
            <Typography
              sx={{
                position: "absolute", left: 8, top: "50%", transform: "translateY(-50%) rotate(-90deg)",
                fontSize: 9, fontWeight: 700, color: alpha("#ffffff", 0.2), letterSpacing: 1,
                textTransform: "uppercase", whiteSpace: "nowrap",
              }}
            >
              LEFT RAIL
            </Typography>
            <Typography
              sx={{
                position: "absolute", right: 8, top: "50%", transform: "translateY(-50%) rotate(90deg)",
                fontSize: 9, fontWeight: 700, color: alpha("#ffffff", 0.2), letterSpacing: 1,
                textTransform: "uppercase", whiteSpace: "nowrap",
              }}
            >
              RIGHT RAIL
            </Typography>
          </Box>
        </Box>
      )
    }

    return (
      <Box sx={{ p: 4, maxWidth: 880, mx: "auto" }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
            HUD Rails + Nav — Layout Variants
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6 }}>
            Three approaches to improving HUD discoverability. Each builds on the last.
            Variant C is the implementation target — see the live stories for interactive previews.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 3 }}>
          <CompareCard
            variant="A"
            title="Labeled Rails — visible labels on all FAB buttons"
            leftRailDemo={PILL_DEMO(true)}
            navDemo={NAV_PILL(false)}
            rightRailDemo={RIGHT_RAIL(true)}
          />
          <CompareCard
            variant="B"
            title="Realm Nav Bar — realm switcher in center header"
            leftRailDemo={PILL_DEMO(false)}
            navDemo={NAV_PILL(true)}
            rightRailDemo={RIGHT_RAIL(false)}
          />
          <CompareCard
            variant="C"
            title="Full Integration — labeled rails + realm nav bar ⭐"
            leftRailDemo={PILL_DEMO(true)}
            navDemo={NAV_PILL(true)}
            rightRailDemo={RIGHT_RAIL(true)}
          />
        </Box>

        <Box
          sx={{
            mt: 3, p: 2, bgcolor: alpha("#8b5cf6", 0.06),
            border: "1px solid", borderColor: alpha("#8b5cf6", 0.2),
            borderRadius: 2,
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#5b21b6", fontWeight: 600, lineHeight: 1.6 }}>
            <LayersRoundedIcon sx={{ fontSize: 14, verticalAlign: "text-bottom", mr: 0.5 }} />
            Variant C is implemented in the live app. Open the individual variant stories above to
            interact with the labeled rails and the realm switching pill in a full HUD context.
          </Typography>
        </Box>
      </Box>
    )
  },
}
