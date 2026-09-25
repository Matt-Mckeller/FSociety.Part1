"use client"

/**
 * ColorBadge Component
 * Displays color information for themeable elements
 * - Solid colors: Show hex code with swatch
 * - Gradients: Show stop count with preview, expandable for details
 */

import { useState } from "react"
import {
  Box,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
  IconButton,
} from "@mui/material"
import { Palette, Gradient, Close } from "@mui/icons-material"
import { GradientColorStop, isGradientColor } from "../types/types"

interface ColorBadgeProps {
  originalColor: string | GradientColorStop[] | null | undefined
  size?: "small" | "medium"
}

export default function ColorBadge({
  originalColor,
  size = "small",
}: ColorBadgeProps) {
  const [gradientDialogOpen, setGradientDialogOpen] = useState(false)

  // No color
  if (!originalColor) {
    return null
  }

  // Gradient color
  if (isGradientColor(originalColor)) {
    const stopCount = originalColor.length

    return (
      <>
        <Tooltip title="Click to view gradient details">
          <Chip
            icon={<Gradient />}
            label={`${stopCount} stops`}
            size={size}
            onClick={() => setGradientDialogOpen(true)}
            sx={{
              bgcolor: "primary.50",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "primary.100",
              },
            }}
          />
        </Tooltip>

        <Dialog
          open={gradientDialogOpen}
          onClose={() => setGradientDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Gradient />
            Gradient Details ({stopCount} color stops)
            <Box flex={1} />
            <IconButton
              size="small"
              onClick={() => setGradientDialogOpen(false)}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              {/* Gradient Preview */}
              <Box
                sx={{
                  height: 60,
                  borderRadius: 1,
                  background: `linear-gradient(to right, ${originalColor.map((stop) => `${stop.color} ${stop.offset * 100}%`).join(", ")})`,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />

              {/* Color Stops */}
              {originalColor.map((stop, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: "grey.50",
                  }}
                >
                  {/* Color Swatch */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: stop.color,
                      border: "1px solid",
                      borderColor: "divider",
                      flexShrink: 0,
                    }}
                  />

                  {/* Details */}
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight={600}>
                      Stop {index + 1}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {stop.color}
                    </Typography>
                  </Box>

                  {/* Offset */}
                  <Chip
                    label={`${(stop.offset * 100).toFixed(0)}%`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              ))}
            </Stack>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Solid color
  const hexColor = originalColor as string

  return (
    <Tooltip title={hexColor}>
      <Chip
        icon={
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              bgcolor: hexColor,
              border: "1px solid",
              borderColor: "divider",
            }}
          />
        }
        label={hexColor}
        size={size}
        sx={{
          bgcolor: "grey.50",
          fontFamily: "monospace",
          fontSize: size === "small" ? "0.7rem" : "0.8rem",
        }}
      />
    </Tooltip>
  )
}
