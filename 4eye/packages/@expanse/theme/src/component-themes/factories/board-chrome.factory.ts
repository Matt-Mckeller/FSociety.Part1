/**
 * BoardChrome Factory
 *
 * Creates theme configuration for BoardChrome component from a palette.
 * BoardChrome provides overlay chrome elements with glass-morphism styling.
 */

import type { Palette } from "@mui/material/styles"
import type { BoardChromeThemeProps } from "../types"

/**
 * Create BoardChrome theme configuration
 *
 * @param palette - MUI Palette object for deriving colors
 * @returns BoardChrome theme props with default, minimal, and high contrast variants
 */
export function createBoardChromeConfig(palette: Palette): BoardChromeThemeProps {
  const isDark = palette.mode === "dark"

  // Chrome base colors
  const chromeDefault = isDark ? "rgba(38, 50, 55, 0.92)" : "rgba(255, 255, 255, 0.92)"
  const chromeMinimal = isDark ? "rgba(38, 50, 55, 0.75)" : "rgba(255, 255, 255, 0.75)"
  const borderBase = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"
  const borderMinimal = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"

  return {
    variants: {
      default: {
        overlayBgColor: chromeDefault,
        borderColor: borderBase,
        blur: 12,
        opacity: 0.92,
      },
      minimal: {
        overlayBgColor: chromeMinimal,
        borderColor: borderMinimal,
        blur: 8,
        opacity: 0.75,
      },
      highContrast: {
        overlayBgColor: palette.background.default,
        borderColor: palette.text.primary,
        blur: 0,
        opacity: 1,
      },
    },
  }
}
