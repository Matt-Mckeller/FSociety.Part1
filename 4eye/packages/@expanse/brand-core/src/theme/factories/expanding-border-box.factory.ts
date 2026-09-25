/**
 * ExpandingBorderBox Theme Factory
 * 
 * Creates ExpandingBorderBox component theme configuration from an MUI palette.
 */

import type { Palette } from "@mui/material/styles"
import type { ExpandingBorderBoxThemeProps } from "../types"

/**
 * Creates an ExpandingBorderBox theme configuration from the given palette.
 * 
 * @param palette - MUI Palette object to derive colors from
 * @returns ExpandingBorderBoxThemeProps configuration
 * 
 * @example
 * ```ts
 * import { purpleLightPalette } from "@expanse/theme"
 * import { createExpandingBorderBoxConfig } from "@expanse/brand-core/theme"
 * 
 * const config = createExpandingBorderBoxConfig(purpleLightPalette)
 * ```
 */
export function createExpandingBorderBoxConfig(palette: Palette): ExpandingBorderBoxThemeProps {
  const isDark = palette.mode === "dark"
  
  // Use rgba with white for dark mode, black for light mode
  const baseColor = isDark ? "255, 255, 255" : "0, 0, 0"
  
  return {
    variants: {
      default: {
        // Improved contrast: 25% → 50% → 85% opacity gradient
        outerBorderColor: `rgba(${baseColor}, 0.25)`,
        middleBorderColor: `rgba(${baseColor}, 0.50)`,
        innerBorderColor: `rgba(${baseColor}, 0.85)`,
      },
      subtle: {
        outerBorderColor: `rgba(${baseColor}, 0.12)`,
        middleBorderColor: `rgba(${baseColor}, 0.22)`,
        innerBorderColor: `rgba(${baseColor}, 0.35)`,
      },
      primary: {
        outerBorderColor: palette.primary.light,
        middleBorderColor: palette.primary.main,
        innerBorderColor: palette.primary.dark,
      },
      highContrast: {
        // WCAG AA compliant: 40% → 65% → 95% for maximum accessibility
        outerBorderColor: `rgba(${baseColor}, 0.40)`,
        middleBorderColor: `rgba(${baseColor}, 0.65)`,
        innerBorderColor: `rgba(${baseColor}, 0.95)`,
      },
    },
  }
}
