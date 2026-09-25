"use client"

import { Box, Typography, Chip } from "@mui/material"
import GridViewIcon from "@mui/icons-material/GridView"
import { type Position, getPageConfigFromPosition } from "@/types/grid"

interface PlaceholderPageProps {
  position: Position
}

export function PlaceholderPage({ position }: PlaceholderPageProps) {
  const config = getPageConfigFromPosition(position)

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `
          radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%",
        p: 4,
      }}
    >
      <GridViewIcon sx={{ fontSize: 64, color: "text.disabled", mb: 3 }} />

      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "text.secondary",
          textAlign: "center",
        }}
      >
        {config?.title ?? `Grid Cell`}
      </Typography>

      <Chip
        label={`Position: (${position.x}, ${position.y})`}
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <Typography
        variant="body1"
        color="text.disabled"
        sx={{ textAlign: "center", maxWidth: 400 }}
      >
        {config?.description ??
          "This grid cell is available for future features."}
      </Typography>
    </Box>
  )
}

export default PlaceholderPage
