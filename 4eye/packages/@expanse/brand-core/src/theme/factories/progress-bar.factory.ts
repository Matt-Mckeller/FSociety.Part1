/**
 * ProgressBar Theme Factory
 * 
 * Creates ProgressBar component theme configuration from an MUI palette.
 */

import type { Palette } from "@mui/material/styles"
import type { ProgressBarThemeProps } from "../types"

/**
 * Creates a ProgressBar theme configuration from the given palette.
 * 
 * @param palette - MUI Palette object to derive colors from
 * @returns ProgressBarThemeProps configuration
 * 
 * @example
 * ```ts
 * import { purpleLightPalette } from "@expanse/theme"
 * import { createProgressBarConfig } from "@expanse/brand-core/theme"
 * 
 * const config = createProgressBarConfig(purpleLightPalette)
 * ```
 */
export function createProgressBarConfig(palette: Palette): ProgressBarThemeProps {
  const isDark = palette.mode === "dark"
  
  return {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: palette.primary.light,
        outerDecorativeLayerFillColor: palette.primary.main,
        innerBackgroundLayerFillColor: isDark 
          ? palette.background.default 
          : palette.common.white,
        innerProgressLayerFillColor: isDark 
          ? palette.primary.main 
          : palette.tertiary?.main ?? palette.primary.light,
        textColor: isDark 
          ? palette.common.white 
          : palette.common.black,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: palette.primary.main,
        outerDecorativeLayerFillColor: isDark 
          ? palette.background.default 
          : palette.common.white,
        innerBackgroundLayerFillColor: palette.primary.extra2 as string ?? palette.primary.dark,
        innerProgressLayerFillColor: palette.primary.main,
        textColor: isDark 
          ? palette.common.white 
          : palette.common.white,
      },
    },
  }
}
