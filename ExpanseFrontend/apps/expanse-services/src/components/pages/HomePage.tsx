"use client"

import { Box, Typography } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"

export function HomePage() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        p: 4,
      }}
    >
      <HomeIcon sx={{ fontSize: 80, color: "primary.main", mb: 3 }} />
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.5rem", md: "4rem" },
          fontWeight: 800,
          mb: 2,
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        Expanse Services
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{ mb: 4, textAlign: "center", maxWidth: 600 }}
      >
        Grid-based navigation system for exploring Expanse features
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.1)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Use <strong>Arrow Keys</strong> or <strong>WASD</strong> to navigate
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.1)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Press <strong>Escape</strong> to go back
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
