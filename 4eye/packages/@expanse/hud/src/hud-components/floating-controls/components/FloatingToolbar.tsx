"use client"

import { Paper, type SxProps, type Theme } from "@mui/material"
import type { ReactNode } from "react"
import type { FloatingPosition } from "../types"

export interface FloatingToolbarProps {
  /** Position on screen */
  position?: FloatingPosition
  /** Z-index (default: 1300) */
  zIndex?: number
  /** Custom styles */
  sx?: SxProps<Theme>
  /** Content */
  children: ReactNode
}

/**
 * Get position styles based on position preset
 */
function getPositionStyles(position: FloatingPosition) {
  switch (position) {
    case "top-left":
      return { top: 16, left: 16 }
    case "top-center":
      return { top: 16, left: "50%", transform: "translateX(-50%)" }
    case "top-right":
      return { top: 16, right: 16 }
    case "bottom-left":
      return { bottom: 16, left: 16 }
    case "bottom-center":
      return { bottom: 16, left: "50%", transform: "translateX(-50%)" }
    case "bottom-right":
      return { bottom: 16, right: 16 }
  }
}

/**
 * Reusable floating toolbar container
 *
 * Provides consistent styling for floating UI controls:
 * - Glass-morphism effect
 * - Fixed positioning
 * - High z-index
 *
 * @example
 * ```tsx
 * <FloatingToolbar position="top-center">
 *   <IconButton>...</IconButton>
 *   <Chip label="Layout" />
 * </FloatingToolbar>
 * ```
 */
export function FloatingToolbar({
  position = "top-center",
  zIndex = 1300,
  sx,
  children,
}: FloatingToolbarProps) {
  const posStyles = getPositionStyles(position)

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        ...posStyles,
        zIndex,
        borderRadius: 3,
        bgcolor: "rgba(20, 28, 36, 0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
        px: 1,
        py: 0.5,
        ...sx,
      }}
    >
      {children}
    </Paper>
  )
}
