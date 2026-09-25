"use client"

/**
 * DataChipOverlay — fixed bottom-center chip strip rendered above all
 * intro slides. Communicates the brand's three core gains:
 *   +Learning   +Engagement   +Mood
 *
 * Positioned BELOW the bottom action buttons (per design decision):
 * `bottom: env(safe-area-inset-bottom) + 16px` keeps it clear of the home
 * indicator on mobile while sitting under the action band on desktop.
 */

import { Box, Chip, Stack } from "@mui/material"

const CHIPS = [
  { label: "+Learning", color: "#5b9cff" },
  { label: "+Engagement", color: "#ff8a3d" },
  { label: "+Mood", color: "#5fd39a" },
] as const

export function DataChipOverlay() {
  return (
    <Box
      role="status"
      aria-label="Outcomes"
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <Stack direction="row" spacing={1.5}>
        {CHIPS.map((chip) => (
          <Chip
            key={chip.label}
            label={chip.label}
            sx={{
              fontWeight: 700,
              bgcolor: "background.paper",
              color: chip.color,
              border: `1px solid ${chip.color}33`,
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              backdropFilter: "blur(6px)",
              pointerEvents: "auto",
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}
