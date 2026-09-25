/**
 * FloatingToolbar Factory
 *
 * Creates theme configuration for FloatingToolbar component from a palette.
 * FloatingToolbar provides a floating action bar with glass-morphism styling.
 */

import type { Palette } from "@mui/material/styles"
import type { FloatingToolbarThemeProps } from "../types"

/**
 * Create FloatingToolbar theme configuration
 *
 * @param palette - MUI Palette object for deriving colors
 * @returns FloatingToolbar theme props with default and high contrast variants
 */
export function createFloatingToolbarConfig(palette: Palette): FloatingToolbarThemeProps {
  const isDark = palette.mode === "dark"

  // Chrome base colors
  const chromeDefault = isDark ? "rgba(38, 50, 55, 0.92)" : "rgba(255, 255, 255, 0.92)"
  const borderBase = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"

  return {
    variants: {
      default: {
        bgColor: chromeDefault,
        borderColor: borderBase,
        blur: 12,
        opacity: 0.92,
      },
      highContrast: {
        bgColor: palette.background.default,
        borderColor: palette.text.primary,
        blur: 0,
        opacity: 1,
      },
    },
  }
}
