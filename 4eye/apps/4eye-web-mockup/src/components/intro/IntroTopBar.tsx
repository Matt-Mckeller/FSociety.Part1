"use client"

/**
 * IntroTopBar — C10 Stepped: connector stub + slide-progress pill.
 *
 * Sits just below the HUD topRow (RealmLocationBar). The 1 px × 10 px
 * stub creates a visual thread between the two, making the dots pill read
 * as a subordinate child of the realm bar above it.
 *
 * Layout (top → bottom):
 *   ─────────────────────────────────────  ← bottom edge of HUD topRow
 *        │   (1 px × 10 px stub)
 *   [ ← ● ● ○ ○ → ]  (frosted dots pill)
 */

import { Box } from "@mui/material"
import { IntroProgressBar } from "./IntroProgressBar"

export function IntroTopBar() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/* Connector stub linking the HUD topRow above to the dots pill */}
      <Box
        sx={{
          width: "1px",
          height: "10px",
          bgcolor: "rgba(255,255,255,0.2)",
          flexShrink: 0,
        }}
      />

      {/* Slide-progress dots + arrows */}
      <IntroProgressBar />
    </Box>
  )
}
