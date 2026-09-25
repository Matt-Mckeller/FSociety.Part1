"use client"

import React from "react"
import { Box } from "@mui/material"

export interface TileRecommendedFrameProps {
  /** Tile size in px — used to scale the bracket corners. */
  size: number
}

/**
 * TileRecommendedFrame — 4-corner bracket spotlight for the recommended tile.
 *
 * Visual treatment:
 * - Thin animated corner marks fanning inward from each corner
 * - Amber/gold accent (#FFC857)
 * - Slow blink pulse (2.5s loop): scale + glow + opacity (0.85 → 1 → 0.85)
 * - Respects prefers-reduced-motion (static frame, no blink)
 *
 * Positioned absolutely, covering the entire tile chip with `inset: 0`.
 */
export function TileRecommendedFrame({ size }: TileRecommendedFrameProps) {
  // Bracket dimensions: scale with tile size, capped for readability
  const bracketLength = Math.min(size * 0.25, 16)
  const bracketThickness = 2

  return (
    <Box
      aria-label="Recommended next tile"
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 4,
        // Blink animation: scale + glow + opacity pulse
        animation: "tile-recommended-blink 2.5s ease-in-out infinite",
        "@keyframes tile-recommended-blink": {
          "0%, 100%": {
            opacity: 0.85,
            transform: "scale(1)",
            filter: "drop-shadow(0 0 4px rgba(255,200,87,0.5))",
          },
          "50%": {
            opacity: 1,
            transform: "scale(1.03)",
            filter: "drop-shadow(0 0 8px rgba(255,200,87,0.8))",
          },
        },
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
          opacity: 1,
          filter: "drop-shadow(0 0 4px rgba(255,200,87,0.6))",
        },
      }}
    >
      {/* Top-left corner */}
      <Box
        sx={{
          position: "absolute",
          top: -bracketThickness / 2,
          left: -bracketThickness / 2,
          width: bracketLength,
          height: bracketLength,
          borderTop: `${bracketThickness}px solid #FFC857`,
          borderLeft: `${bracketThickness}px solid #FFC857`,
          borderTopLeftRadius: 1,
        }}
      />

      {/* Top-right corner */}
      <Box
        sx={{
          position: "absolute",
          top: -bracketThickness / 2,
          right: -bracketThickness / 2,
          width: bracketLength,
          height: bracketLength,
          borderTop: `${bracketThickness}px solid #FFC857`,
          borderRight: `${bracketThickness}px solid #FFC857`,
          borderTopRightRadius: 1,
        }}
      />

      {/* Bottom-left corner */}
      <Box
        sx={{
          position: "absolute",
          bottom: -bracketThickness / 2,
          left: -bracketThickness / 2,
          width: bracketLength,
          height: bracketLength,
          borderBottom: `${bracketThickness}px solid #FFC857`,
          borderLeft: `${bracketThickness}px solid #FFC857`,
          borderBottomLeftRadius: 1,
        }}
      />

      {/* Bottom-right corner */}
      <Box
        sx={{
          position: "absolute",
          bottom: -bracketThickness / 2,
          right: -bracketThickness / 2,
          width: bracketLength,
          height: bracketLength,
          borderBottom: `${bracketThickness}px solid #FFC857`,
          borderRight: `${bracketThickness}px solid #FFC857`,
          borderBottomRightRadius: 1,
        }}
      />
    </Box>
  )
}
