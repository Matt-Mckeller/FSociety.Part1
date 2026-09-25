"use client"

import React from "react"
import { Box, type SxProps, type Theme } from "@mui/material"
import type { ReactNode } from "react"

export interface ContentAreaProps {
  /** Content to render */
  children: ReactNode
  /** Padding from bars */
  padding: {
    top: number
    bottom: number
    left: number
    right: number
  }
  /** Custom styles */
  sx?: SxProps<Theme>
  /** Minimum size constraints */
  minSize?: {
    width?: number
    height?: number
  }
}

/**
 * ContentArea - Main content area with padding from bars
 * 
 * Fills remaining space after accounting for fixed bars.
 * Uses absolute positioning to create a perfect fit.
 */
export function ContentArea({ children, padding, sx, minSize }: ContentAreaProps) {
  return (
    <Box
      component="main"
      data-content-area
      sx={{
        position: "absolute",
        top: padding.top,
        bottom: padding.bottom,
        left: padding.left,
        right: padding.right,
        overflow: "hidden",
        minWidth: minSize?.width,
        minHeight: minSize?.height,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
