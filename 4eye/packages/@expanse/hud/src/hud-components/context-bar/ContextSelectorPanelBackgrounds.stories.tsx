/**
 * ContextSelectorPanel — Sky / Higher-Level Background Variants
 *
 * Design exploration for the background of the dropdown selector panel
 * that drops from the HUD ContextBar. The brief: convey a "higher
 * level" / overhead feeling — light cloudy sky or starry night —
 * mostly a solid color with very subtle texture.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, IconButton, Typography } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"
import HubIcon from "@mui/icons-material/Hub"

// ─── Mock panel content ──────────────────────────────────────────────────────

interface MockItemProps {
  label: string
  accent: string
  textColor: string
  hoverBg: string
}

function MockItem({ label, accent, textColor, hoverBg }: MockItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 1,
        borderRadius: 1.5,
        cursor: "pointer",
        "&:hover": { bgcolor: hoverBg },
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1,
          bgcolor: `${accent}22`,
          border: `1px solid ${accent}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: accent, opacity: 0.85 }} />
      </Box>
      <Typography variant="body2" sx={{ color: textColor, fontSize: "0.8rem" }}>
        {label}
      </Typography>
    </Box>
  )
}

const MOCK_ITEMS = [
  { label: "Clarity & Resilience", accent: "#2563eb" },
  { label: "Build Daily Momentum", accent: "#0d9488" },
  { label: "Protect My Energy",    accent: "#7c3aed" },
]

// ─── Background presets ───────────────────────────────────────────────────────

interface Variant {
  name: string
  description: string
  /** Base solid for the panel. */
  base: string
  /** Optional layered gradients/textures stacked above the base. */
  texture?: string
  /** "light" base ⇒ dark text, "dark" base ⇒ light text. */
  tone: "light" | "dark"
}

// Subtle pinprick starfield (low-opacity dots, reads as texture not pattern).
const STARFIELD = [
  "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.55) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 28% 62%, rgba(255,255,255,0.40) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 47% 30%, rgba(255,255,255,0.50) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 63% 78%, rgba(255,255,255,0.35) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 78% 22%, rgba(255,255,255,0.55) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 88% 55%, rgba(255,255,255,0.30) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 35% 88%, rgba(255,255,255,0.40) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 8%  72%, rgba(255,255,255,0.30) 50%, transparent 51%)",
  "radial-gradient(1px 1px at 55% 10%, rgba(255,255,255,0.40) 50%, transparent 51%)",
].join(", ")

// Soft cloud puffs for sky variants.
const SOFT_CLOUDS = [
  "radial-gradient(ellipse 70% 35% at 20% 30%, rgba(255,255,255,0.45) 0%, transparent 60%)",
  "radial-gradient(ellipse 55% 28% at 75% 65%, rgba(255,255,255,0.35) 0%, transparent 60%)",
  "radial-gradient(ellipse 40% 22% at 50% 90%, rgba(255,255,255,0.25) 0%, transparent 60%)",
].join(", ")

export const PANEL_BG_VARIANTS: Variant[] = [
  {
    name: "Daylight Sky",
    description: "Light blue, mostly solid, with soft white cloud puffs. Bright, airy, overhead.",
    tone: "light",
    base: "#cfe3f3",
    texture: SOFT_CLOUDS,
  },
  {
    name: "Soft Cirrus",
    description: "Pale blue-white wash with the faintest suggestion of high cirrus. Very subtle.",
    tone: "light",
    base: "#e2edf6",
    texture: [
      "radial-gradient(ellipse 90% 25% at 30% 25%, rgba(255,255,255,0.55) 0%, transparent 70%)",
      "radial-gradient(ellipse 70% 20% at 70% 75%, rgba(255,255,255,0.40) 0%, transparent 70%)",
    ].join(", "),
  },
  {
    name: "Starry Night",
    description: "Deep navy, mostly solid, with a tiny scatter of pinprick stars.",
    tone: "dark",
    base: "#0f1a2e",
    texture: STARFIELD,
  },
  {
    name: "Dusk Horizon",
    description: "Twilight blue-violet with a faint top-light gradient and quiet stars.",
    tone: "dark",
    base: "#1a2542",
    texture: [
      "linear-gradient(180deg, rgba(120,150,210,0.18) 0%, rgba(120,150,210,0) 55%)",
      STARFIELD,
    ].join(", "),
  },
]

// ─── Panel shell mock ─────────────────────────────────────────────────────────

interface MockPanelProps {
  variant: Variant
  activeTab?: "domains" | "goals" | "projects"
}

function MockPanel({ variant, activeTab = "goals" }: MockPanelProps) {
  const isLight = variant.tone === "light"
  const headingColor    = isLight ? "rgba(20,30,50,0.70)" : "rgba(255,255,255,0.65)"
  const subheadingColor = isLight ? "rgba(20,30,50,0.55)" : "rgba(255,255,255,0.45)"
  const itemTextColor   = isLight ? "rgba(20,30,50,0.85)" : "rgba(255,255,255,0.85)"
  const dividerColor    = isLight ? "rgba(20,30,50,0.10)" : "rgba(255,255,255,0.08)"
  const closeColor      = isLight ? "rgba(20,30,50,0.55)" : "rgba(255,255,255,0.55)"
  const hoverBg         = isLight ? "rgba(20,30,50,0.06)" : "rgba(255,255,255,0.06)"
  const borderColor     = isLight ? "rgba(20,30,50,0.12)" : "rgba(255,255,255,0.10)"

  const panelBg = variant.texture
    ? `${variant.texture}, ${variant.base}`
    : variant.base

  const titles    = { domains: "Domain", goals: "Goals", projects: "Projects" }
  const subtitles = { domains: "Active domain", goals: "Select up to 3", projects: "Select a project" }

  return (
    <Box sx={{ width: 360 }}>
      {/* Simulated ContextBar pill the panel attaches to */}
      <Box
        sx={{
          display: "inline-flex",
          gap: 0,
          bgcolor: "rgba(20,20,28,0.88)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderBottom: "none",
          borderRadius: "10px 10px 0 0",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {(["domains", "goals", "projects"] as const).map((tab) => {
          const Icon = tab === "domains" ? HubIcon : tab === "goals" ? TrackChangesIcon : FolderSpecialIcon
          const isActive = tab === activeTab
          return (
            <Box
              key={tab}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                px: 1,
                py: 0.75,
                borderRight: tab !== "projects" ? "1px solid rgba(255,255,255,0.06)" : "none",
                bgcolor: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                cursor: "pointer",
              }}
            >
              <Icon sx={{ fontSize: 14, color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }} />
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.7rem",
                  color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                  textTransform: "capitalize",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {tab}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {/* The panel itself */}
      <Box
        sx={{
          background: panelBg,
          border: `1px solid ${borderColor}`,
          borderTop: "none",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 1,
            borderBottom: `1px solid ${dividerColor}`,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="overline" sx={{ color: headingColor, letterSpacing: 1.5, lineHeight: 1.2 }}>
              {titles[activeTab]}
            </Typography>
            <Typography variant="caption" sx={{ display: "block", color: subheadingColor, lineHeight: 1.2 }}>
              {subtitles[activeTab]}
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: closeColor }}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Items */}
        <Box sx={{ p: 1 }}>
          {MOCK_ITEMS.map((item) => (
            <MockItem
              key={item.label}
              label={item.label}
              accent={item.accent}
              textColor={itemTextColor}
              hoverBg={hoverBg}
            />
          ))}
        </Box>
      </Box>

      {/* Variant label */}
      <Box sx={{ mt: 1.5, textAlign: "center" }}>
        <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.8rem" }}>
          {variant.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.40)",
            fontSize: "0.7rem",
            display: "block",
            mt: 0.25,
            maxWidth: 320,
            mx: "auto",
          }}
        >
          {variant.description}
        </Typography>
      </Box>
    </Box>
  )
}

function AllVariants() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        p: 4,
        background: [
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(88,28,135,0.18) 0%, transparent 70%)",
          "radial-gradient(ellipse 60% 40% at 20% 100%, rgba(30,64,175,0.12) 0%, transparent 60%)",
          "rgba(10, 10, 14, 1)",
        ].join(", "),
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: "rgba(255,255,255,0.35)", letterSpacing: 2, mb: 2, fontSize: "0.65rem" }}
      >
        Context Selector Panel — Sky / Higher-Level Backgrounds
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 5, alignItems: "start" }}>
        {PANEL_BG_VARIANTS.map((v) => (
          <MockPanel key={v.name} variant={v} />
        ))}
      </Box>
    </Box>
  )
}

const meta: Meta = {
  title: "HudComponents/ContextBar/SelectorPanelBackgrounds",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "space",
      values: [{ name: "space", value: "rgba(10,10,14,1)" }],
    },
    docs: {
      description: {
        component:
          "Sky / starfield background variants for the ContextSelectorPanel. " +
          "Goal: convey a higher-level / overhead feel with subtle texture on a mostly solid base.",
      },
    },
  },
}

export default meta

export const AllVariantsGrid: StoryObj = { name: "All Variants", render: () => <AllVariants /> }

const single = (v: Variant): StoryObj => ({
  render: () => (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10,10,14,1)",
      }}
    >
      <MockPanel variant={v} />
    </Box>
  ),
})

export const DaylightSky: StoryObj = { name: "Daylight Sky", ...single(PANEL_BG_VARIANTS[0]) }
export const SoftCirrus: StoryObj  = { name: "Soft Cirrus",  ...single(PANEL_BG_VARIANTS[1]) }
export const StarryNight: StoryObj = { name: "Starry Night", ...single(PANEL_BG_VARIANTS[2]) }
export const DuskHorizon: StoryObj = { name: "Dusk Horizon", ...single(PANEL_BG_VARIANTS[3]) }
