"use client"
import React from "react"
import { Box, useTheme } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"

export interface DemoSurfaceProps {
  /** Content to display on the surface */
  children: React.ReactNode
  
  /**
   * Surface variant
   * - "default": Standard elevated surface with subtle shadow
   * - "contrast": Higher contrast surface for viewing dark components on light
   * - "dark": Dark surface for viewing light components
   * - "gradient": Gradient background for visual interest
   */
  variant?: "default" | "contrast" | "dark" | "gradient"
  
  /**
   * Padding size
   * @default "md"
   */
  padding?: "sm" | "md" | "lg" | "xl"
  
  /**
   * Border radius
   * @default 12
   */
  borderRadius?: number
  
  /**
   * Whether to center content
   * @default true
   */
  centered?: boolean
  
  /** Additional styles */
  sx?: SxProps<Theme>
}

const PADDING_MAP = {
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
}

/**
 * DemoSurface - Elevated surface for showcasing components
 * 
 * Provides a contrasting background surface for component demos,
 * particularly useful in Storybook to see ActionBars, buttons, etc.
 * 
 * @example
 * ```tsx
 * // Default elevated surface
 * <DemoSurface>
 *   <ActionBar variant="glass">...</ActionBar>
 * </DemoSurface>
 * 
 * // Dark surface for light components
 * <DemoSurface variant="dark">
 *   <ActionBar variant="glass">...</ActionBar>
 * </DemoSurface>
 * 
 * // Gradient for visual interest
 * <DemoSurface variant="gradient" padding="lg">
 *   <ActionButton icon={<PlayIcon />} />
 * </DemoSurface>
 * ```
 */
export function DemoSurface({
  children,
  variant = "default",
  padding = "md",
  borderRadius = 12,
  centered = true,
  sx,
}: DemoSurfaceProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === "dark"
  
  const getBackgroundStyles = (): SxProps<Theme> => {
    switch (variant) {
      case "contrast":
        return {
          bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"}`,
        }
      case "dark":
        return {
          bgcolor: isDark ? "#0a0a0f" : "#1a1a2e",
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)"}`,
        }
      case "gradient":
        return {
          background: isDark
            ? "linear-gradient(135deg, #1a1a2e 0%, #2d1f3d 50%, #1a2a3e 100%)"
            : "linear-gradient(135deg, #f5f5f7 0%, #e8e8ec 50%, #f0f4f8 100%)",
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
        }
      case "default":
      default:
        return {
          bgcolor: isDark ? "rgba(255, 255, 255, 0.03)" : "#fafafa",
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}`,
          boxShadow: isDark 
            ? "0 2px 8px rgba(0, 0, 0, 0.3)" 
            : "0 2px 8px rgba(0, 0, 0, 0.06)",
        }
    }
  }

  return (
    <Box
      sx={[
        {
          p: PADDING_MAP[padding],
          borderRadius: `${borderRadius}px`,
          display: centered ? "flex" : "block",
          alignItems: centered ? "center" : undefined,
          justifyContent: centered ? "center" : undefined,
          minHeight: 80,
        },
        getBackgroundStyles() as Record<string, unknown>,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  )
}
