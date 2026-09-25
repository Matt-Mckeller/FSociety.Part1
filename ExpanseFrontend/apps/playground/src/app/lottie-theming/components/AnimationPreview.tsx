"use client"

import React from "react"
import {
  Box,
  Paper,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material"

interface AnimationPreviewProps {
  children: React.ReactNode
  title?: string
  description?: string
  size?: "small" | "medium" | "large"
  loading?: boolean
  showBorder?: boolean
}

/**
 * Animation Preview Component
 *
 * Reusable container for displaying Lottie animations with consistent styling
 */
export function AnimationPreview({
  children,
  title,
  description,
  size = "medium",
  loading = false,
  showBorder = true,
}: AnimationPreviewProps) {
  const theme = useTheme()

  const sizeMap = {
    small: { width: 300, height: 300 },
    medium: { width: 400, height: 400 },
    large: { width: 600, height: 600 },
  }

  const dimensions = sizeMap[size]

  return (
    <Box>
      {title && (
        <Typography variant="h6" gutterBottom align="center">
          {title}
        </Typography>
      )}

      {description && (
        <Typography
          variant="body2"
          paragraph
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          {description}
        </Typography>
      )}

      <Paper
        elevation={showBorder ? 2 : 0}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: dimensions.height,
          maxWidth: dimensions.width,
          mx: "auto",
          p: 3,
          borderRadius: 2,
          background:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.02)"
              : "rgba(0, 0, 0, 0.01)",
          border: showBorder ? `1px solid ${theme.palette.divider}` : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </Box>
        )}
      </Paper>
    </Box>
  )
}
