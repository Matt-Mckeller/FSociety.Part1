"use client"

import React, { useEffect, useRef, useState } from "react"
import { Box, Tooltip, alpha, keyframes } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

/**
 * SlideshowHeaderRail
 * ===================
 *
 * Compact slideshow nav meant to live INSIDE the HUD's top-center
 * `CurrentLocationActionBar` (via its `centerContentOverride` slot,
 * typically wired through the `CenterContentProvider` registry).
 *
 * Layout:  [back]  • • (O) • •  [forward]
 *
 * A windowed row of dots, centered on the active step (clamped at the
 * ends). Past dots are tinted with their step color at low alpha;
 * upcoming dots are tinted even lower. The active dot is enlarged and
 * wrapped in an SVG countdown ring driven by `progress` (0..1). Click
 * any visible dot to jump (`onJump`); chevrons step ±1
 * (`onPrev` / `onNext`) and disable at the edges.
 *
 * Auto-advance is intentionally NOT a concern of this component —
 * `progress` is fed in by the host and is purely visual. The host
 * decides whether reaching 1.0 means "advance now," "wait for the
 * user," or anything in between.
 *
 * One-shot chevron pulse:
 *   On mount, both chevrons play a single attention pulse so first-time
 *   users notice them as the manual-advance affordance. The pulse runs
 *   once and never repeats. Disable with `pulseChevronsOnMount={false}`.
 */

export interface SlideshowHeaderRailStep {
  /** Stable id (used as React key, also for `aria-label` fallback). */
  id: string
  /** Human label — shown in tooltips and used as `aria-label`. */
  label: string
  /** Dot color when active / visited (tinted via alpha when not active). */
  color: string
}

export interface SlideshowHeaderRailProps {
  steps: ReadonlyArray<SlideshowHeaderRailStep>
  /** Index of the active step, 0-based. */
  activeIdx: number
  /** Active-step progress fill, clamped to [0, 1]. */
  progress: number
  onJump: (idx: number) => void
  onPrev: () => void
  onNext: () => void
  /** @default true */
  pulseChevronsOnMount?: boolean
  /**
   * Maximum number of dots rendered at once. The window slides so the
   * active dot stays centered when possible (clamped at the ends).
   * Set to `Infinity` to always render every step.
   * @default 3
   */
  maxVisibleDots?: number
}

// One-shot pulse: gentle scale + brightness flash, runs once then settles.
const chevronPulse = keyframes`
  0%   { transform: scale(1);   filter: brightness(1); }
  20%  { transform: scale(1.18); filter: brightness(1.6); }
  40%  { transform: scale(1);   filter: brightness(1); }
  60%  { transform: scale(1.12); filter: brightness(1.4); }
  100% { transform: scale(1);   filter: brightness(1); }
`

const PULSE_MS = 1400

export function SlideshowHeaderRail({
  steps,
  activeIdx,
  progress,
  onJump,
  onPrev,
  onNext,
  pulseChevronsOnMount = true,
  maxVisibleDots = 3,
}: SlideshowHeaderRailProps) {
  const safeProgress = Math.max(0, Math.min(1, progress))
  const lastIdx = steps.length - 1
  const canPrev = activeIdx > 0
  const canNext = activeIdx < lastIdx

  // Compute the visible window of dots, centered on activeIdx when possible
  // and clamped at the ends. If maxVisibleDots >= total, show everything.
  const windowSize = Math.max(1, Math.min(maxVisibleDots, steps.length))
  const half = Math.floor(windowSize / 2)
  const rawStart = activeIdx - half
  const maxStart = Math.max(0, steps.length - windowSize)
  const windowStart = Math.max(0, Math.min(rawStart, maxStart))
  const visibleSteps = steps.slice(windowStart, windowStart + windowSize)

  // Run the chevron attention pulse exactly once after mount, then turn it
  // off so the icons sit still for the rest of the session.
  const [pulsing, setPulsing] = useState<boolean>(pulseChevronsOnMount)
  const didPulseRef = useRef<boolean>(false)
  useEffect(() => {
    if (!pulseChevronsOnMount || didPulseRef.current) return
    didPulseRef.current = true
    const t = window.setTimeout(() => setPulsing(false), PULSE_MS + 50)
    return () => window.clearTimeout(t)
  }, [pulseChevronsOnMount])

  const chevronAnimation = pulsing
    ? `${chevronPulse} ${PULSE_MS}ms ease-in-out 1`
    : "none"

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        height: "100%",
        px: 0.25,
      }}
    >
      <ChevronButton
        direction="prev"
        disabled={!canPrev}
        onClick={onPrev}
        animation={chevronAnimation}
      />

      <Box
        role="group"
        aria-label="Slide progress"
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 28,
          px: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {visibleSteps.map((s, localIdx) => {
            const i = windowStart + localIdx
            const active = i === activeIdx
            const visited = i < activeIdx
            if (active) {
              return (
                <Box
                  key={s.id}
                  role="button"
                  aria-label={s.label}
                  aria-current="step"
                  onClick={() => onJump(i)}
                  sx={{
                    position: "relative",
                    width: 22,
                    height: 22,
                    cursor: "pointer",
                  }}
                >
                  <CountdownRing size={22} color={s.color} progress={safeProgress} />
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
                  onClick={() => onJump(i)}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    cursor: "pointer",
                    bgcolor: visited
                      ? alpha(s.color, 0.55)
                      : alpha(s.color, 0.22),
                    transition: "transform 150ms, background-color 200ms",
                    "&:hover": {
                      transform: "scale(1.3)",
                      bgcolor: visited
                        ? alpha(s.color, 0.75)
                        : alpha(s.color, 0.4),
                    },
                  }}
                />
              </Tooltip>
            )
          })}
        </Box>
      </Box>

      <ChevronButton
        direction="next"
        disabled={!canNext}
        onClick={onNext}
        animation={chevronAnimation}
      />
    </Box>
  )
}

// ---------------------------------------------------------------------------
// Internal: countdown ring around the active dot
// ---------------------------------------------------------------------------

interface CountdownRingProps {
  size: number
  color: string
  progress: number
}

function CountdownRing({ size, color, progress }: CountdownRingProps) {
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

// ---------------------------------------------------------------------------
// Internal: single chevron control with the one-shot pulse animation
// ---------------------------------------------------------------------------

interface ChevronButtonProps {
  direction: "prev" | "next"
  disabled: boolean
  onClick: () => void
  animation: string
}

function ChevronButton({
  direction,
  disabled,
  onClick,
  animation,
}: ChevronButtonProps) {
  const Icon = direction === "prev" ? ArrowBackIosNewIcon : ArrowForwardIosIcon
  const label = direction === "prev" ? "Previous slide" : "Next slide"
  return (
    <Tooltip title={disabled ? "" : label}>
      <Box
        role="button"
        aria-label={label}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: "50%",
          cursor: disabled ? "default" : "pointer",
          color: disabled ? alpha("#fff", 0.3) : alpha("#fff", 0.85),
          transition: "color 150ms",
          animation: disabled ? "none" : animation,
          transformOrigin: "center",
          "&:hover": { color: disabled ? alpha("#fff", 0.3) : "#fff" },
        }}
      >
        <Icon sx={{ fontSize: 14 }} />
      </Box>
    </Tooltip>
  )
}
