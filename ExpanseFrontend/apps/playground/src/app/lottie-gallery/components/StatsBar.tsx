/**
 * Stats Bar Component
 * Shows animation count and statistics
 */

"use client"

import { Box, Typography, Paper } from "@mui/material"

interface StatsBarProps {
  filteredCount: number
  showPending: boolean
  totalCount?: number
}

export function StatsBar({
  filteredCount,
  showPending,
  totalCount = 0,
}: StatsBarProps) {
  const statsText = `Showing ${filteredCount} of ${totalCount} animations`

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Typography variant="body1" fontWeight={500} textAlign="center">
        {statsText}
      </Typography>
    </Paper>
  )
}
