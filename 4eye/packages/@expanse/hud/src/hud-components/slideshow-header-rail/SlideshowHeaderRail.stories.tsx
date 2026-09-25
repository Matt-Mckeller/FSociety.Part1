/**
 * SlideshowHeaderRail.stories.tsx
 *
 * Visual exploration for replacing the bottom-mounted SlideshowControls
 * bar with a 6-step rail mounted INSIDE the HUD's top-center
 * `CurrentLocationActionBar` (option 3 from the planning chat).
 *
 * This file is intentionally self-contained — nothing is exported from
 * the layout package. It's a design sandbox: inline STEPS, inline act
 * colors, inline icons, and five visual variants of the rail rendered
 * inside the same `ActionBar` shell the production header uses.
 *
 * Each variant exposes the same props so the same playback state
 * (active slide + countdown + play/pause) can be plugged into any of
 * them and compared side-by-side.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Box, Stack, Tooltip, Typography, alpha, keyframes } from "@mui/material"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import VisibilityIcon from "@mui/icons-material/Visibility"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import HubIcon from "@mui/icons-material/Hub"
import AppsIcon from "@mui/icons-material/Apps"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import ReplayIcon from "@mui/icons-material/Replay"
import { HUD_HEADER_BAR_SIZE } from "@expanse/brand-core"

import { ActionBar } from "../action-bars"

// =============================================================================
// Mock slideshow model (mirrors apps/4eye-web-mockup STEPS shape)
// =============================================================================

interface RailStep {
  id: string
  label: string
  /** Short label shown when there's no room for full text. */
  short: string
  color: string
  Icon: React.ComponentType<{ sx?: object }>
}

const ACT_COLORS = {
  promise: "#3b82f6",
  reach: "#22c55e",
  play: "#a855f7",
  reward: "#f97316",
} as const

const STEPS: RailStep[] = [
  { id: "hook",    label: "Hook",    short: "Hook", color: ACT_COLORS.promise, Icon: RocketLaunchIcon },
  { id: "promise", label: "Promise", short: "See",  color: ACT_COLORS.promise, Icon: VisibilityIcon },
  { id: "play",    label: "Play",    short: "Play", color: ACT_COLORS.play,    Icon: SportsEsportsIcon },
  { id: "reach",   label: "Reach",   short: "Reach",color: ACT_COLORS.reach,   Icon: HubIcon },
  { id: "catalog", label: "Catalog", short: "Apps", color: ACT_COLORS.reach,   Icon: AppsIcon },
  { id: "reward",  label: "Reward",  short: "Earn", color: ACT_COLORS.reward,  Icon: EmojiEventsIcon },
]

// Per-step durations (ms), aligned with prod SLIDE_DURATIONS_MS.
const DURATIONS = [2000, 3000, 3500, 5000, 3000, 2500]

// =============================================================================
// Shared playback hook — drives countdown + auto-advance for any variant
// =============================================================================

interface PlaybackState {
  activeIdx: number
  isPlaying: boolean
  /** 0..1 progress across the active slide's full duration. */
  progress: number
  durationMs: number
  next: () => void
  prev: () => void
  jump: (idx: number) => void
  togglePlay: () => void
}

function usePlayback(): PlaybackState {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const startedAtRef = useRef<number>(performance.now())
  const rafRef = useRef<number | null>(null)
  const durationMs = DURATIONS[activeIdx] ?? 2500

  // Reset progress whenever the slide or play state changes.
  useEffect(() => {
    startedAtRef.current = performance.now()
    setProgress(0)
  }, [activeIdx, isPlaying])

  // RAF loop while playing.
  useEffect(() => {
    if (!isPlaying) return
    const tick = () => {
      const elapsed = performance.now() - startedAtRef.current
      const p = Math.min(1, elapsed / durationMs)
      setProgress(p)
      if (p >= 1) {
        // advance, with wrap so the demo loops
        setActiveIdx((i) => (i + 1) % STEPS.length)
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [isPlaying, durationMs, activeIdx])

  return {
    activeIdx,
    isPlaying,
    progress,
    durationMs,
    next: () => setActiveIdx((i) => Math.min(STEPS.length - 1, i + 1)),
    prev: () => setActiveIdx((i) => Math.max(0, i - 1)),
    jump: (idx) => setActiveIdx(idx),
    togglePlay: () => setIsPlaying((p) => !p),
  }
}

// =============================================================================
// Shared types for variants
// =============================================================================

interface RailProps {
  steps: RailStep[]
  state: PlaybackState
}

// =============================================================================
// Variant A — Connected segments (continuous progress bar broken into 6)
// =============================================================================
//
// All 6 acts touch as one continuous strip. Active segment is brighter
// and fills with a left-to-right progress wash. Reads as "one journey,
// six chapters." No icons by default to keep the strip clean.
//
function RailSegments({ steps, state }: RailProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        height: 28,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
        minWidth: 360,
      }}
    >
      {steps.map((s, i) => {
        const visited = i < state.activeIdx
        const active = i === state.activeIdx
        const fill = active ? state.progress : visited ? 1 : 0
        return (
          <Tooltip key={s.id} title={s.label}>
            <Box
              role="button"
              aria-label={s.label}
              onClick={() => state.jump(i)}
              sx={{
                position: "relative",
                flex: 1,
                cursor: "pointer",
                bgcolor: alpha(s.color, active ? 0.35 : visited ? 0.55 : 0.18),
                transition: "background-color 200ms ease",
                "&:hover": { bgcolor: alpha(s.color, 0.5) },
                "&::after": active
                  ? {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      width: `${fill * 100}%`,
                      bgcolor: s.color,
                      transition: "width 80ms linear",
                    }
                  : undefined,
              }}
            />
          </Tooltip>
        )
      })}
    </Box>
  )
}

// =============================================================================
// Variant A2 — Connected segments WITH icons (slightly tighter width)
// =============================================================================
//
// Same continuous-strip personality as A, but each segment now carries
// its step icon centered in the cell. The progress wash slides under
// the icon (icon stays white-on-color throughout the fill, fading to
// faint white-on-faint-color when upcoming). Width drops from
// `minWidth: 360` to `minWidth: 300` and segments are a touch shorter
// (height 26) so the icon-bearing strip doesn't feel chunky next to
// the back/forward chevrons.
//
function RailSegmentsWithIcons({ steps, state }: RailProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        height: 26,
        borderRadius: 13,
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
        minWidth: 300,
      }}
    >
      {steps.map((s, i) => {
        const visited = i < state.activeIdx
        const active = i === state.activeIdx
        const fill = active ? state.progress : visited ? 1 : 0
        // Icon color: white once the cell is "lit" (visited or active),
        // dimmed white for upcoming cells.
        const iconColor =
          active || visited ? "#fff" : alpha("#fff", 0.55)
        return (
          <Tooltip key={s.id} title={s.label}>
            <Box
              role="button"
              aria-label={s.label}
              aria-current={active ? "step" : undefined}
              onClick={() => state.jump(i)}
              sx={{
                position: "relative",
                flex: 1,
                minWidth: 36,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(s.color, active ? 0.35 : visited ? 0.55 : 0.18),
                transition: "background-color 200ms ease",
                "&:hover": { bgcolor: alpha(s.color, 0.5) },
              }}
            >
              {/* Progress fill — sits behind the icon */}
              {active && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: `${fill * 100}%`,
                    bgcolor: s.color,
                    transition: "width 80ms linear",
                    pointerEvents: "none",
                  }}
                />
              )}
              {/* Icon on top */}
              <s.Icon
                sx={{
                  position: "relative",
                  fontSize: 16,
                  color: iconColor,
                  zIndex: 1,
                  transition: "color 200ms ease",
                }}
              />
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

// =============================================================================
// Variant B — Discrete pills, active expands with label + countdown bar
// =============================================================================
//
// At rest each step is a small icon-only pill in its act color. The
// active step expands to ~140px and shows label + a thin progress bar
// underneath. Most "page identity" of any variant.
//
function RailPillsExpanding({ steps, state }: RailProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {steps.map((s, i) => {
        const active = i === state.activeIdx
        const visited = i < state.activeIdx
        return (
          <Tooltip key={s.id} title={active ? "" : s.label}>
            <Box
              role="button"
              aria-label={s.label}
              aria-current={active ? "step" : undefined}
              onClick={() => state.jump(i)}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                height: 32,
                px: active ? 1.25 : 0.75,
                minWidth: active ? 140 : 32,
                borderRadius: 16,
                cursor: "pointer",
                color: active ? "#fff" : visited ? alpha("#fff", 0.85) : alpha("#fff", 0.55),
                bgcolor: active
                  ? s.color
                  : visited
                    ? alpha(s.color, 0.35)
                    : alpha("#fff", 0.06),
                boxShadow: active ? `0 0 0 1px ${alpha("#fff", 0.25)}` : "none",
                transition:
                  "min-width 220ms cubic-bezier(.2,.8,.2,1), padding 220ms, background-color 180ms",
                "&:hover": {
                  bgcolor: active ? s.color : alpha(s.color, 0.5),
                },
                overflow: "hidden",
              }}
            >
              <s.Icon sx={{ fontSize: 18, color: "inherit", flexShrink: 0 }} />
              {active && (
                <Typography
                  variant="caption"
                  noWrap
                  sx={{ fontWeight: 700, color: "inherit", letterSpacing: 0.3 }}
                >
                  {s.label}
                </Typography>
              )}
              {active && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    height: 2,
                    width: `${state.progress * 100}%`,
                    bgcolor: alpha("#fff", 0.85),
                    transition: "width 80ms linear",
                  }}
                />
              )}
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

// =============================================================================
// Variant C — Dots on a spine, active dot ringed with countdown
// =============================================================================
//
// Most minimal. Six small filled dots on a thin line. Active dot is
// larger and wrapped in an SVG ring that drains over the slide
// duration. Best for when the header must stay visually quiet.
//
function CountdownRing({ size, color, progress }: { size: number; color: string; progress: number }) {
  const stroke = 2
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={alpha("#fff", 0.18)}
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - progress)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 80ms linear" }}
      />
    </svg>
  )
}

function RailDotsSpine({ steps, state }: RailProps) {
  return (
    <Box sx={{ position: "relative", display: "flex", alignItems: "center", height: 28, px: 1 }}>
      <Box
        sx={{
          position: "absolute",
          left: 12,
          right: 12,
          top: "50%",
          height: 2,
          bgcolor: alpha("#fff", 0.18),
          borderRadius: 1,
          transform: "translateY(-50%)",
        }}
      />
      <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: 2.5 }}>
        {steps.map((s, i) => {
          const active = i === state.activeIdx
          const visited = i < state.activeIdx
          if (active) {
            return (
              <Box
                key={s.id}
                role="button"
                aria-label={s.label}
                aria-current="step"
                onClick={() => state.jump(i)}
                sx={{ position: "relative", width: 22, height: 22, cursor: "pointer" }}
              >
                <CountdownRing size={22} color={s.color} progress={state.progress} />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 5,
                    borderRadius: "50%",
                    bgcolor: s.color,
                  }}
                />
              </Box>
            )
          }
          return (
            <Tooltip key={s.id} title={s.label}>
              <Box
                role="button"
                aria-label={s.label}
                onClick={() => state.jump(i)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  cursor: "pointer",
                  bgcolor: visited ? s.color : alpha("#fff", 0.35),
                  transition: "transform 150ms",
                  "&:hover": { transform: "scale(1.3)" },
                }}
              />
            </Tooltip>
          )
        })}
      </Box>
    </Box>
  )
}

// =============================================================================
// Variant D — Underline tabs (icons in a row, sliding act-colored underline)
// =============================================================================
//
// Flat icon row, no chrome around items. A single underline element
// slides to the active position and fills with a countdown wash. Most
// "navigational" feel — closest cousin to a desktop tab strip.
//
function RailUnderlineTabs({ steps, state }: RailProps) {
  const itemWidth = 44
  return (
    <Box sx={{ position: "relative", display: "flex", alignItems: "center", height: 32 }}>
      {steps.map((s, i) => {
        const active = i === state.activeIdx
        return (
          <Tooltip key={s.id} title={s.label}>
            <Box
              role="button"
              aria-label={s.label}
              aria-current={active ? "step" : undefined}
              onClick={() => state.jump(i)}
              sx={{
                width: itemWidth,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: active ? s.color : alpha("#fff", 0.65),
                transition: "color 150ms",
                "&:hover": { color: alpha("#fff", 0.95) },
              }}
            >
              <s.Icon sx={{ fontSize: 20 }} />
            </Box>
          </Tooltip>
        )
      })}
      {/* Sliding underline track */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 3,
          width: itemWidth,
          borderRadius: 2,
          transform: `translateX(${state.activeIdx * itemWidth}px)`,
          transition: "transform 320ms cubic-bezier(.2,.8,.2,1)",
          bgcolor: alpha("#fff", 0.15),
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${state.progress * 100}%`,
            bgcolor: STEPS[state.activeIdx].color,
            transition: "width 80ms linear",
          }}
        />
      </Box>
    </Box>
  )
}

// =============================================================================
// Variant E — Stacked cards (icon-on-color tile per step, label under active)
// =============================================================================
//
// Each step is a small rounded tile filled with its act color (faded
// when not active). Most game-like / dashboard feel. Active tile lifts
// slightly and shows the label below as a caption.
//
const cardLift = keyframes`
  from { transform: translateY(2px); opacity: 0.6; }
  to   { transform: translateY(0);  opacity: 1; }
`

function RailStackedCards({ steps, state }: RailProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.5, pb: 0.25 }}>
      {steps.map((s, i) => {
        const active = i === state.activeIdx
        const visited = i < state.activeIdx
        return (
          <Tooltip key={s.id} title={active ? "" : s.label}>
            <Box
              role="button"
              aria-label={s.label}
              aria-current={active ? "step" : undefined}
              onClick={() => state.jump(i)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transform: active ? "translateY(-2px)" : "translateY(0)",
                transition: "transform 180ms",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 30,
                  height: 30,
                  borderRadius: 1.25,
                  bgcolor: active
                    ? s.color
                    : visited
                      ? alpha(s.color, 0.55)
                      : alpha("#fff", 0.08),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: active ? "#fff" : alpha("#fff", 0.85),
                  boxShadow: active ? `0 4px 10px ${alpha(s.color, 0.45)}` : "none",
                  overflow: "hidden",
                  "&:hover": { bgcolor: active ? s.color : alpha(s.color, 0.45) },
                }}
              >
                <s.Icon sx={{ fontSize: 18 }} />
                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: 2,
                      width: `${state.progress * 100}%`,
                      bgcolor: alpha("#fff", 0.9),
                      transition: "width 80ms linear",
                    }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  height: 12,
                  mt: 0.25,
                  display: "flex",
                  alignItems: "center",
                  visibility: active ? "visible" : "hidden",
                  animation: active ? `${cardLift} 200ms ease both` : undefined,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontSize: 9, lineHeight: 1, color: "#fff", fontWeight: 700, letterSpacing: 0.4 }}
                >
                  {s.label.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

// =============================================================================
// Header shell — wraps a rail in a CurrentLocationActionBar-shaped pill
// =============================================================================
//
// Mimics the production HUD header so each variant is judged in the
// real context (back/forward chevrons + frosted pill, top-center).
//
function HeaderPill({
  children,
  state,
  withChevrons = true,
  withTransport = false,
}: {
  children: React.ReactNode
  state: PlaybackState
  withChevrons?: boolean
  withTransport?: boolean
}) {
  return (
    <ActionBar
      variant="frosted"
      shape="pill"
      thickness={{ pixels: HUD_HEADER_BAR_SIZE.desktop }}
      orientation="horizontal"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 0.75,
          height: "100%",
          color: "#fff",
        }}
      >
        {withChevrons && (
          <Tooltip title="Back">
            <Box
              role="button"
              onClick={state.prev}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                cursor: "pointer",
                color: alpha("#fff", state.activeIdx === 0 ? 0.3 : 0.85),
                "&:hover": { color: "#fff" },
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
            </Box>
          </Tooltip>
        )}
        <Box sx={{ px: 0.5 }}>{children}</Box>
        {withTransport && (
          <Tooltip title={state.isPlaying ? "Pause" : "Play"}>
            <Box
              role="button"
              onClick={state.togglePlay}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                cursor: "pointer",
                color: alpha("#fff", 0.9),
                "&:hover": { color: "#fff" },
              }}
            >
              {state.isPlaying ? (
                <PauseIcon sx={{ fontSize: 16 }} />
              ) : state.activeIdx === STEPS.length - 1 ? (
                <ReplayIcon sx={{ fontSize: 16 }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 16 }} />
              )}
            </Box>
          </Tooltip>
        )}
        {withChevrons && (
          <Tooltip title="Forward">
            <Box
              role="button"
              onClick={state.next}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                cursor: "pointer",
                color: alpha(
                  "#fff",
                  state.activeIdx === STEPS.length - 1 ? 0.3 : 0.85,
                ),
                "&:hover": { color: "#fff" },
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
            </Box>
          </Tooltip>
        )}
      </Box>
    </ActionBar>
  )
}

// =============================================================================
// Stage — faux HUD viewport, dark background to read the frosted pill
// =============================================================================

function Stage({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: 220,
        borderRadius: 2,
        // Slightly dark gradient to simulate "over content" — the
        // production HUD sits over rich page content so the frosted
        // pill never lives on pure white.
        background:
          "linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)",
        overflow: "hidden",
        p: 3,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          top: 8,
          left: 12,
          color: alpha("#fff", 0.5),
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>{children}</Box>
    </Box>
  )
}

// =============================================================================
// Single-variant demo — shared between stories
// =============================================================================

function VariantDemo({
  label,
  Variant,
  withTransport = false,
}: {
  label: string
  Variant: React.ComponentType<RailProps>
  withTransport?: boolean
}) {
  const state = usePlayback()
  return (
    <Stage label={label}>
      <HeaderPill state={state} withTransport={withTransport}>
        <Variant steps={STEPS} state={state} />
      </HeaderPill>
    </Stage>
  )
}

// =============================================================================
// Storybook meta
// =============================================================================

const meta: Meta = {
  title: "Layout Systems/HUD Components/Slideshow Header Rail (exploration)",
  parameters: {
    layout: "padded",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
    docs: {
      description: {
        component:
          "Visual exploration of mounting the slideshow nav inside the HUD top-center header (option 3 from planning). Five variants share the same playback state so progress, jumping, and play/pause behave identically across them.",
      },
    },
  },
}
export default meta
type Story = StoryObj

// =============================================================================
// Stories — one per variant
// =============================================================================

export const A_ConnectedSegments: Story = {
  render: () => (
    <VariantDemo label="A · Connected segments" Variant={RailSegments} />
  ),
}

export const A2_ConnectedSegmentsWithIcons: Story = {
  render: () => (
    <VariantDemo
      label="A2 · Connected segments + icons (tighter)"
      Variant={RailSegmentsWithIcons}
    />
  ),
}

export const B_ExpandingPills: Story = {
  render: () => (
    <VariantDemo label="B · Expanding pills" Variant={RailPillsExpanding} />
  ),
}

export const C_DotsSpine: Story = {
  render: () => <VariantDemo label="C · Dots on spine" Variant={RailDotsSpine} />,
}

export const D_UnderlineTabs: Story = {
  render: () => (
    <VariantDemo label="D · Underline tabs" Variant={RailUnderlineTabs} />
  ),
}

export const E_StackedCards: Story = {
  render: () => (
    <VariantDemo label="E · Stacked cards" Variant={RailStackedCards} />
  ),
}

// =============================================================================
// Comparison story — all 5 stacked, sharing the same playback clock
// =============================================================================

export const ShowcaseAllVariants: Story = {
  render: () => {
    const state = usePlayback()
    const variants: Array<[string, React.ComponentType<RailProps>, boolean?]> = [
      ["A · Connected segments", RailSegments],
      ["A2 · Connected segments + icons", RailSegmentsWithIcons],
      ["B · Expanding pills", RailPillsExpanding],
      ["C · Dots on spine", RailDotsSpine, true /* show transport */],
      ["D · Underline tabs", RailUnderlineTabs],
      ["E · Stacked cards", RailStackedCards],
    ]
    return (
      <Stack spacing={2}>
        {variants.map(([label, V, transport]) => (
          <Stage key={label} label={label}>
            <HeaderPill state={state} withTransport={Boolean(transport)}>
              <V steps={STEPS} state={state} />
            </HeaderPill>
          </Stage>
        ))}
      </Stack>
    )
  },
}

// =============================================================================
// Hybrid layout — chevrons hijacked to step slides, no inline transport
// =============================================================================
//
// Same as the variant stories but with a caption explaining that on
// Home the back/forward chevrons would step SLIDES (option 1 + 3
// hybrid) — the only "transport" surface needed.
//
export const Hybrid_ChevronsAsSlideNav: Story = {
  render: () => {
    const state = usePlayback()
    return (
      <Stack spacing={1}>
        <Typography variant="body2" sx={{
          color: "text.secondary"
        }}>
          On Home, the header chevrons drive <strong>slides</strong>, not page
          history. No play button needed — clicking the active pill toggles
          auto-advance.
        </Typography>
        <Stage label="Hybrid · expanding pills + chevron slide nav">
          <HeaderPill state={state}>
            <RailPillsExpanding steps={STEPS} state={state} />
          </HeaderPill>
        </Stage>
      </Stack>
    );
  },
}
