"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Box, useTheme } from "@mui/material"

// ─────────────────────────────────────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────────────────────────────────────

/** Visual variant — currently `"targetLock"` (two-phase crosshair → beacon). */
export type PlayerBlipVariant = "targetLock"

export interface PlayerLocationBlipProps {
  /** Pixel X of the anchor (below active tile chip center, horizontally). */
  x: number
  /** Pixel Y of the anchor (below active tile chip bottom edge). */
  y: number
  /** Tile chip size in px — scales the crosshair brackets and beacon rings. */
  tileSize: number
  /**
   * Primary accent color (used for the intro crosshair).
   * @default theme.palette.primary.main
   */
  color?: string
  /**
   * Pixel coordinates of the destination dot on the same grid container.
   * When provided, the locked-state beacon rings are clipped to a ±70°
   * sector pointing toward this position. When absent, rings are omnidirectional.
   */
  destinationPx?: { x: number; y: number }
  /**
   * When this value changes the intro animation re-plays after a short
   * travel-animation delay. Typically `"${position.x},${position.y}"`.
   */
  triggerKey?: string | number
  /** Duration of the Target Lock intro animation in ms. @default 1100 */
  lockDuration?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** How long the dot slides to a new tile before the intro re-plays (ms). */
const TRAVEL_DURATION_MS = 450
const TRAVEL_EASING = "cubic-bezier(0.34,1.56,0.64,1)"

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CSS `clip-path: polygon(...)` string for a sector centred at angle
 * `thetaRad` (screen coords: 0 = right, π/2 = down) ±`halfAngleDeg`.
 * Percentages are relative to a box whose centre = 50% 50%.
 */
function sectorClipPath(thetaRad: number, halfAngleDeg = 70, numPoints = 12): string {
  const halfRad = (halfAngleDeg * Math.PI) / 180
  const pts = ["50% 50%"]
  for (let i = 0; i <= numPoints; i++) {
    const a = thetaRad - halfRad + (2 * halfRad * i) / numPoints
    pts.push(`${(50 + 50 * Math.cos(a)).toFixed(2)}% ${(50 + 50 * Math.sin(a)).toFixed(2)}%`)
  }
  return `polygon(${pts.join(", ")})`
}

// ─────────────────────────────────────────────────────────────────────────────
// Zero-size absolute anchor with optional travel transition
// ─────────────────────────────────────────────────────────────────────────────

function BlipAnchor({
  x,
  y,
  children,
  enableTransition,
}: {
  x: number
  y: number
  children: React.ReactNode
  enableTransition?: boolean
}) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        left: x,
        top: y,
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 20,
        overflow: "visible",
        ...(enableTransition && {
          transition: `left ${TRAVEL_DURATION_MS}ms ${TRAVEL_EASING}, top ${TRAVEL_DURATION_MS}ms ${TRAVEL_EASING}`,
        }),
      }}
    >
      {children}
    </Box>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 1 — Target Lock (crosshair sweep-in)
// ─────────────────────────────────────────────────────────────────────────────

function CrosshairLockOn({ tileSize, color }: { tileSize: number; color: string }) {
  const half = Math.max(20, Math.round(tileSize * 0.56))
  const arm  = Math.max(7,  Math.round(half * 0.38))

  return (
    <Box
      sx={{
        position: "absolute",
        width: half * 2,
        height: half * 2,
        top: -half,
        left: -half,
        transformOrigin: "center center",
        "@keyframes targetLockSweep": {
          "0%":   { transform: "scale(1.9)", opacity: 0.3 },
          "65%":  { transform: "scale(1.0)", opacity: 1   },
          "100%": { transform: "scale(1.0)", opacity: 1   },
        },
        animation: "targetLockSweep 1.1s cubic-bezier(0.22,1,0.36,1) forwards",
      }}
    >
      {/* TL */}
      <Box sx={{ position: "absolute", top: 0, left: 0, width: arm, height: arm, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
      {/* TR */}
      <Box sx={{ position: "absolute", top: 0, right: 0, width: arm, height: arm, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
      {/* BR */}
      <Box sx={{ position: "absolute", bottom: 0, right: 0, width: arm, height: arm, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
      {/* BL */}
      <Box sx={{ position: "absolute", bottom: 0, left: 0, width: arm, height: arm, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />

      {/* Center cross — blazes at sweep peak, then fades */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "@keyframes targetLockCrossFlash": {
            "0%":   { opacity: 0 },
            "58%":  { opacity: 1 },
            "100%": { opacity: 0 },
          },
          animation: "targetLockCrossFlash 1.1s ease-in-out forwards",
        }}
      >
        <Box sx={{ position: "absolute", width: 1.5, height: 10, bgcolor: color }} />
        <Box sx={{ position: "absolute", width: 10,  height: 1.5, bgcolor: color }} />
      </Box>
    </Box>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 2 — Directional Beacon (P4-style rings + amber dot)
// ─────────────────────────────────────────────────────────────────────────────

function DirectionalBeacon({
  tileSize,
  destinationPx,
  selfPx,
  lockedColor,
}: {
  tileSize: number
  destinationPx?: { x: number; y: number }
  selfPx: { x: number; y: number }
  lockedColor: string
}) {
  const dotR       = 4
  const maxR       = Math.max(28, Math.round(tileSize * 1.5))
  const containerR = Math.round(maxR * 1.15)

  const clipPath = useMemo(() => {
    if (!destinationPx) return "none"
    const dx = destinationPx.x - selfPx.x
    const dy = destinationPx.y - selfPx.y
    if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return "none"
    return sectorClipPath(Math.atan2(dy, dx), 70, 12)
  }, [destinationPx, selfPx])

  return (
    <>
      {/* Ring container — sector-clipped when destination is known */}
      <Box
        sx={{
          position: "absolute",
          width: containerR * 2,
          height: containerR * 2,
          top: -containerR,
          left: -containerR,
          clipPath,
          pointerEvents: "none",
        }}
      >
        {([0, 350] as const).map((delay, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: maxR * 2,
              height: maxR * 2,
              top: containerR - maxR,
              left: containerR - maxR,
              borderRadius: "50%",
              border: `1px solid ${lockedColor}`,
              boxShadow: `0 0 8px 1px ${lockedColor}30`,
              transformOrigin: "center center",
              "@keyframes targetBeaconRing": {
                "0%":   { transform: "scale(0)",    opacity: 0    },
                "3.6%": {                            opacity: 0.65 },
                "45%":  { transform: "scale(1.08)", opacity: 0    },
                "100%": { transform: "scale(1.08)", opacity: 0    },
              },
              animation: `targetBeaconRing 5.5s ease-out ${delay}ms infinite`,
              "@media (prefers-reduced-motion: reduce)": { display: "none" },
            }}
          />
        ))}
      </Box>

      {/* Amber dot — pops in on lock */}
      <Box
        sx={{
          position: "absolute",
          width: dotR * 2,
          height: dotR * 2,
          top: -dotR,
          left: -dotR,
          borderRadius: "50%",
          bgcolor: lockedColor,
          boxShadow: `0 0 6px 3px ${lockedColor}90`,
          "@keyframes targetBeaconDotPop": {
            "0%":   { transform: "scale(0)",    opacity: 0 },
            "70%":  { transform: "scale(1.35)", opacity: 1 },
            "100%": { transform: "scale(1.0)",  opacity: 1 },
          },
          animation: "targetBeaconDotPop 0.35s ease-out forwards",
        }}
      />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Two-phase "you are here" indicator for the full-screen minimap.
 *
 * **Phase 1 — Target Lock**: Corner brackets sweep in from 1.9× tile size
 * to tight around the chip, centre cross blazes then fades (1.1 s, one-shot).
 *
 * **Phase 2 — Beacon**: Amber glowing dot + P4-style double-pulse rings
 * (ba-dum, 5.5 s cycle). When `destinationPx` is provided, the rings are
 * sector-clipped toward the destination (±70°), visually "pointing at" the
 * next tile.
 *
 * The anchor slides smoothly between tiles via CSS `transition` when
 * `triggerKey` changes (spring easing, 450 ms). The intro re-plays after
 * the travel animation completes.
 *
 * Place the anchor Y **below** the active tile's chip bottom edge (not at
 * the chip centre). Pass `triggerKey` as `"${position.x},${position.y}"`.
 */
export function PlayerLocationBlip({
  x,
  y,
  tileSize,
  color,
  destinationPx,
  triggerKey,
  lockDuration = 1100,
}: PlayerLocationBlipProps) {
  const theme = useTheme()
  const accentColor = color ?? theme.palette.primary.main
  // Amber warning role — themed per hue instead of a standalone hardcoded
  // hex, so the "target lock" beacon stays visually distinct from whatever
  // the theme's primary accent is (used for the intro crosshair above).
  const lockedColor = theme.palette.warning.main

  const [phase, setPhase] = useState<"intro" | "locked">("intro")
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      // First mount: intro plays immediately
      isFirstRender.current = false
      const t = setTimeout(() => setPhase("locked"), lockDuration)
      return () => clearTimeout(t)
    }
    // Subsequent tile changes: keep beacon while dot travels, then re-intro
    setPhase("locked")
    const t1 = setTimeout(() => setPhase("intro"),  TRAVEL_DURATION_MS)
    const t2 = setTimeout(() => setPhase("locked"), TRAVEL_DURATION_MS + lockDuration)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  // triggerKey is the only value that should restart this sequence
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerKey])

  return (
    <BlipAnchor x={x} y={y} enableTransition>
      {phase === "intro" && (
        <CrosshairLockOn tileSize={tileSize} color={accentColor} />
      )}
      {phase === "locked" && (
        <DirectionalBeacon
          tileSize={tileSize}
          destinationPx={destinationPx}
          selfPx={{ x, y }}
          lockedColor={lockedColor}
        />
      )}
    </BlipAnchor>
  )
}
