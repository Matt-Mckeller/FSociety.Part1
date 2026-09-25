/**
 * StoryWrapper - Background wrapper for Storybook stories
 *
 * Applies the theme's background color and text color to the story viewport.
 * Uses full viewport height to ensure theme background fills the panel.
 *
 * @example
 * ```tsx
 * // Default - uses theme background
 * <StoryWrapper>
 *   <MyComponent />
 * </StoryWrapper>
 *
 * // Override background for specific story needs
 * <StoryWrapper bgOverride="#1a1a2e">
 *   <DarkModeOnlyComponent />
 * </StoryWrapper>
 * ```
 */

import React from "react"
import { Box } from "@mui/material"
import { useTheme } from "@mui/material/styles"

export interface StoryWrapperProps {
  children: React.ReactNode
  /**
   * Override the background color.
   * Use for stories that need a specific background regardless of theme mode.
   * @example "#ffffff" for always white, "#1a1a2e" for always dark
   */
  bgOverride?: string
  /**
   * Override padding (default: 2 = 16px)
   */
  padding?: number | string
}

/**
 * Wrapper that applies theme background and text colors to stories.
 * Ensures stories render on the correct background for their theme mode.
 */
export function StoryWrapper({ children, bgOverride, padding = 2 }: StoryWrapperProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: bgOverride ?? theme.palette.background.default,
        color: theme.palette.text.primary,
        p: padding,
      }}
    >
      {children}
    </Box>
  )
}
