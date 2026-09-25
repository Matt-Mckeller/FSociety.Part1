/**
 * ContextBar — Selection Indicator Variants
 *
 * Design exploration for showing how many goals/projects are selected
 * directly on the AiChat header ContextBar, without requiring the user
 * to open the dropdown panel.
 *
 * Each story renders the same three tabs (Domains / Goals / Projects)
 * with a different indicator treatment beneath each label, against the
 * same bar visual so they can be compared side-by-side.
 *
 * The mock pill in this file is a faithful approximation of the real
 * ContextBar visuals (frosted glass + pill border + icon-label-right
 * buttons). It is purposely a mock — the indicator strip lives below
 * each button and needs per-button positioning, so we draw it directly
 * here rather than threading it through the ContextBar primitive.
 *
 * Goals (blue) / Projects (purple) caps = 3.
 * Domains is single-select, so no indicator is shown for it.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, Stack, Typography } from "@mui/material"
import HubIcon from "@mui/icons-material/Hub"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"

// =============================================================================
// Tokens
// =============================================================================

const ACCENTS = {
  domain: "#22c55e",   // current domain color (mock — real bar reads from useDomain)
  goals: "#3b82f6",    // blue
  projects: "#a855f7", // purple
}

const MAX = 3

// =============================================================================
// Mock pill bar
// =============================================================================

interface TabSpec {
  id: "domains" | "goals" | "projects"
  label: string
  icon: React.ReactNode
  accent: string
  selectedCount: number
}

interface MockBarProps {
  tabs: TabSpec[]
  active: TabSpec["id"]
  /** Render under each button, given the tab spec. Return null to omit. */
  renderIndicator: (tab: TabSpec) => React.ReactNode
}

function MockBar({ tabs, active, renderIndicator }: MockBarProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        height: 44,
        px: 0.75,
        borderRadius: 999,
        background: "rgba(20,20,28,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <Box
            key={tab.id}
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              height: 36,
              px: 1.5,
              mx: 0.25,
              borderRadius: 999,
              color: isActive ? "#fff" : "rgba(255,255,255,0.78)",
              background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
              cursor: "pointer",
              transition: "background 120ms",
              "&:hover": {
                background: isActive
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.06)",
              },
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                "& svg": { fontSize: 18 },
                color: isActive ? tab.accent : "inherit",
              }}
            >
              {tab.icon}
            </Box>
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, letterSpacing: 0.2 }}
            >
              {tab.label}
            </Typography>
            {/* Indicator strip — positioned absolutely so the button
                height stays constant and the pill geometry is unaffected. */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                bottom: -2,
                transform: "translateX(-50%)",
                pointerEvents: "none",
              }}
            >
              {renderIndicator(tab)}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

// =============================================================================
// Indicator renderers
// =============================================================================

/** A — Three monochrome dots (filled / outline). Neutral, unobtrusive. */
function ThreeDotsMono({ selectedCount, id }: TabSpec) {
  if (id === "domains") return null
  return (
    <Box sx={{ display: "inline-flex", gap: 0.5 }}>
      {Array.from({ length: MAX }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background:
              i < selectedCount
                ? "rgba(255,255,255,0.85)"
                : "transparent",
            border: "1px solid rgba(255,255,255,0.45)",
          }}
        />
      ))}
    </Box>
  )
}

/** B — Three accent-colored dots. Each tab carries its own hue. */
function ThreeDotsAccent({ selectedCount, accent, id }: TabSpec) {
  if (id === "domains") return null
  return (
    <Box sx={{ display: "inline-flex", gap: 0.5 }}>
      {Array.from({ length: MAX }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: i < selectedCount ? accent : "transparent",
            border: `1px solid ${i < selectedCount ? accent : "rgba(255,255,255,0.35)"}`,
            boxShadow:
              i < selectedCount ? `0 0 6px ${accent}66` : "none",
          }}
        />
      ))}
    </Box>
  )
}

/** C — Three little rounded segments (chiclets). More architectural. */
function ThreeSegments({ selectedCount, accent, id }: TabSpec) {
  if (id === "domains") return null
  return (
    <Box sx={{ display: "inline-flex", gap: 0.5 }}>
      {Array.from({ length: MAX }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 12,
            height: 3,
            borderRadius: 1.5,
            background:
              i < selectedCount ? accent : "rgba(255,255,255,0.18)",
            boxShadow:
              i < selectedCount ? `0 0 6px ${accent}66` : "none",
          }}
        />
      ))}
    </Box>
  )
}

/** D — Single underline that fills like a progress bar. Most minimal. */
function UnderlineProgress({ selectedCount, accent, id }: TabSpec) {
  if (id === "domains") return null
  const pct = (selectedCount / MAX) * 100
  return (
    <Box
      sx={{
        width: 44,
        height: 2,
        borderRadius: 1,
        background: "rgba(255,255,255,0.15)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: `${pct}%`,
          height: "100%",
          background: accent,
          boxShadow: `0 0 6px ${accent}aa`,
          transition: "width 200ms ease-out",
        }}
      />
    </Box>
  )
}

/** E — Mini glyph row: shows actual selected items as tiny chips.
 *  Falls back to outline placeholders for empty slots. */
function MiniGlyphs({ selectedCount, accent, id }: TabSpec) {
  if (id === "domains") return null
  // Mock glyph labels — first letter of imagined selected items.
  const glyphs =
    id === "goals"
      ? ["F", "R", "C"].slice(0, selectedCount)
      : ["A", "L", "X"].slice(0, selectedCount)
  return (
    <Box sx={{ display: "inline-flex", gap: 0.5 }}>
      {Array.from({ length: MAX }).map((_, i) => {
        const filled = i < selectedCount
        return (
          <Box
            key={i}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 700,
              color: filled ? "#fff" : "rgba(255,255,255,0.35)",
              background: filled ? accent : "transparent",
              border: `1px solid ${filled ? accent : "rgba(255,255,255,0.35)"}`,
            }}
          >
            {filled ? glyphs[i] : ""}
          </Box>
        )
      })}
    </Box>
  )
}

// =============================================================================
// Sample state
// =============================================================================

const TABS_DEFAULT: TabSpec[] = [
  { id: "domains", label: "Work", icon: <HubIcon />, accent: ACCENTS.domain, selectedCount: 1 },
  { id: "goals", label: "Goals", icon: <TrackChangesIcon />, accent: ACCENTS.goals, selectedCount: 2 },
  { id: "projects", label: "Projects", icon: <FolderSpecialIcon />, accent: ACCENTS.projects, selectedCount: 1 },
]

const STATES: Array<{ label: string; goals: number; projects: number }> = [
  { label: "Empty (0/0)", goals: 0, projects: 0 },
  { label: "Partial (2/1)", goals: 2, projects: 1 },
  { label: "Full (3/3)", goals: 3, projects: 3 },
]

function withState(g: number, p: number): TabSpec[] {
  return TABS_DEFAULT.map((t) =>
    t.id === "goals"
      ? { ...t, selectedCount: g }
      : t.id === "projects"
      ? { ...t, selectedCount: p }
      : t,
  )
}

// =============================================================================
// Story scaffold
// =============================================================================

interface VariantBlockProps {
  title: string
  description: string
  render: (tab: TabSpec) => React.ReactNode
}

function VariantBlock({ title, description, render }: VariantBlockProps) {
  return (
    <Stack spacing={1.5}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Box>
      <Stack spacing={2}>
        {STATES.map((s) => (
          <Stack
            key={s.label}
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center"
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                width: 110,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.label}
            </Typography>
            <MockBar
              tabs={withState(s.goals, s.projects)}
              active="goals"
              renderIndicator={render}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

// =============================================================================
// Meta
// =============================================================================

const meta: Meta = {
  title: "Layout Systems/HUD Components/ContextBar/Selection Indicator Variants",
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
}

export default meta
type Story = StoryObj

// =============================================================================
// Stories
// =============================================================================

/** Side-by-side comparison of all five variants at three selection states. */
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={5} sx={{ p: 2, maxWidth: 720 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Selection indicators
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
          Show how many goals / projects are selected without opening the
          panel. Domains is single-select so it has no indicator. Each row
          below renders the same three tabs (Domains / Goals / Projects)
          at a different selection state.
        </Typography>
      </Box>

      <VariantBlock
        title="A — Three dots (monochrome)"
        description="Three small circles per tab. Filled = selected, outline = remaining. Most subtle."
        render={ThreeDotsMono}
      />
      <VariantBlock
        title="B — Three dots (accent color)"
        description="Same as A but tinted with each tab's accent (blue / purple). Stronger visual identity per tab."
        render={ThreeDotsAccent}
      />
      <VariantBlock
        title="C — Three segments (chiclets)"
        description="Short rounded rectangles instead of dots. More architectural / linear feel."
        render={ThreeSegments}
      />
      <VariantBlock
        title="D — Underline progress"
        description="Single thin bar that fills proportionally. Most minimal; loses the discrete N/3 read."
        render={UnderlineProgress}
      />
      <VariantBlock
        title="E — Mini glyph row"
        description="Tiny initial-letter chips for each selected item. Most informative; busiest."
        render={MiniGlyphs}
      />
    </Stack>
  ),
}

/** Each variant with the bar in isolation, on a darker context background
 *  so you can preview how it reads against a real glass HUD scene. */
export const VariantsOnGlass: Story = {
  render: () => (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
      }}
    >
      <Stack spacing={4}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
          Same bars on a dark scene (closer to the real HUD context).
        </Typography>
        {[
          { name: "A — Mono dots", r: ThreeDotsMono },
          { name: "B — Accent dots", r: ThreeDotsAccent },
          { name: "C — Segments", r: ThreeSegments },
          { name: "D — Underline progress", r: UnderlineProgress },
          { name: "E — Mini glyphs", r: MiniGlyphs },
        ].map(({ name, r }) => (
          <Stack key={name} spacing={1}>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}
            >
              {name}
            </Typography>
            <MockBar
              tabs={withState(2, 1)}
              active="goals"
              renderIndicator={r}
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  ),
}
