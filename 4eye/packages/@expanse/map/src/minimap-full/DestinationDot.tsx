"use client"

import React from "react"
import { Box, Tooltip, useTheme } from "@mui/material"

export interface DestinationDotProps {
  /** Pixel X of the anchor (below destination tile chip centre, horizontally). */
  x: number
  /** Pixel Y of the anchor (below destination tile chip bottom edge). */
  y: number
  /** Tile chip size in px (reserved for future scaling). */
  tileSize: number
  /** Accent color for the progress ring and dot. @default theme.palette.primary.main */
  color?: string
  /**
   * Tile visit progress, 0–1.
   * - `0`         → dim outline only (unvisited)
   * - `0.01–0.99` → partial clockwise arc + accent dot
   * - `1`         → full gold ring + gold dot
   * @default 0
   */
  progress?: number
  /** Tile label shown in the hover tooltip. */
  label?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG progress arc
// ─────────────────────────────────────────────────────────────────────────────

function ProgressArc({
  radius,
  progress,
  color,
  completeColor,
  strokeWidth = 1.5,
}: {
  radius: number
  progress: number
  color: string
  completeColor: string
  strokeWidth?: number
}) {
  const size        = (radius + strokeWidth) * 2
  const cx          = radius + strokeWidth
  const cy          = radius + strokeWidth
  const circumference = 2 * Math.PI * radius
  const isComplete  = progress >= 1
  const arcColor    = isComplete ? completeColor : color

  return (
    <svg
      style={{
        position: "absolute",
        top: -(radius + strokeWidth),
        left: -(radius + strokeWidth),
        overflow: "visible",
        pointerEvents: "none",
      }}
      width={size}
      height={size}
    >
      {/* Dim background track */}
      <circle
        cx={cx} cy={cy} r={radius}
        fill="none"
        stroke={`${color}25`}
        strokeWidth={strokeWidth}
      />
      {/* Clockwise progress fill — starts from the top (rotate −90°) */}
      {progress > 0 && (
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke={arcColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - Math.min(progress, 1))}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: `${cx}px ${cy}px`,
          }}
        />
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Static "where you're heading" marker for the full-screen minimap.
 *
 * Shows a progress ring (SVG arc, 0–100%) and a small dot. Hovering reveals
 * a tooltip with the tile label and visit percentage. No radar pulse —
 * the origin dot (`PlayerLocationBlip`) owns all the animation energy.
 *
 * Position the anchor Y below the destination tile's chip bottom edge,
 * centred horizontally — same offset formula as `PlayerLocationBlip`.
 */
export function DestinationDot({
  x,
  y,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tileSize: _tileSize,
  color,
  progress = 0,
  label,
}: DestinationDotProps) {
  const theme = useTheme()
  const accentColor = color ?? theme.palette.primary.main
  // Amber warning role — themed per hue so "100% visited" stays visually
  // distinct from the accent color instead of a standalone hardcoded hex.
  const completeColor = theme.palette.warning.main

  const dotR       = 3
  const ringR      = dotR + 4
  const isComplete  = progress >= 1
  const hasProgress = progress > 0
  const dotColor   = isComplete ? completeColor : hasProgress ? accentColor : `${accentColor}55`

  const tooltipTitle = label
    ? `${label} — ${Math.round(Math.min(progress, 1) * 100)}% visited`
    : `${Math.round(Math.min(progress, 1) * 100)}% visited`

  return (
    <Tooltip title={tooltipTitle} placement="bottom" arrow>
      <Box
        sx={{
          position: "absolute",
          left: x,
          top: y,
          width: 0,
          height: 0,
          overflow: "visible",
          zIndex: 19,
          pointerEvents: "auto",
          cursor: "default",
        }}
      >
        <ProgressArc radius={ringR} progress={progress} color={accentColor} completeColor={completeColor} />

        <Box
          sx={{
            position: "absolute",
            width: dotR * 2,
            height: dotR * 2,
            top: -dotR,
            left: -dotR,
            borderRadius: "50%",
            bgcolor: dotColor,
            boxShadow: isComplete
              ? `0 0 5px 2px ${completeColor}80`
              : hasProgress
              ? `0 0 4px 1px ${accentColor}60`
              : "none",
            "@keyframes targetDestDotPop": {
              "0%":   { transform: "scale(0)",   opacity: 0   },
              "70%":  { transform: "scale(1.4)", opacity: 0.8 },
              "100%": { transform: "scale(1.0)", opacity: 1   },
            },
            animation: "targetDestDotPop 0.4s ease-out forwards",
          }}
        />
      </Box>
    </Tooltip>
  )
}
