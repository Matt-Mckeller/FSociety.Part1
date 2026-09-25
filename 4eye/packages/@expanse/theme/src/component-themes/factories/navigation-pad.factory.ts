/**
 * NavigationPad Factory
 *
 * Creates theme configuration for NavigationPad component from a palette.
 * NavigationPad shows directional navigation buttons with glass-morphism style.
 */

import type { Palette } from "@mui/material/styles"
import type { NavigationPadThemeProps } from "../types"

/**
 * Create NavigationPad theme configuration
 *
 * @param palette - MUI Palette object for deriving colors
 * @returns NavigationPad theme props with default and high contrast variants
 */
export function createNavigationPadConfig(palette: Palette): NavigationPadThemeProps {
  const isDark = palette.mode === "dark"

  // Chrome base color - use paper background with transparency
  const chromeBase = isDark ? "rgba(38, 50, 55, 0.88)" : "rgba(255, 255, 255, 0.88)"
  const chromeHover = isDark ? "rgba(38, 50, 55, 0.95)" : "rgba(255, 255, 255, 0.95)"
  const disabledBg = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"
  const borderBase = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"
  const disabledText = isDark ? "rgba(255, 255, 255, 0.38)" : "rgba(0, 0, 0, 0.38)"

  return {
    variants: {
      default: {
        buttonBgColor: chromeBase,
        buttonHoverBgColor: chromeHover,
        buttonDisabledBgColor: disabledBg,
        borderColor: borderBase,
        borderHoverColor: palette.primary.main,
        arrowColor: palette.primary.main,
        disabledColor: disabledText,
        blur: 8,
        opacity: 0.88,
      },
      highContrast: {
        buttonBgColor: palette.background.default,
        buttonHoverBgColor: palette.background.default,
        buttonDisabledBgColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
        borderColor: palette.text.primary,
        borderHoverColor: palette.primary.light,
        arrowColor: palette.text.primary,
        disabledColor: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
        blur: 0,
        opacity: 1,
      },
    },
  }
}
