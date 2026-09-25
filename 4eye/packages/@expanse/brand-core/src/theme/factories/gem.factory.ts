/**
 * Gem Theme Factory
 * 
 * Creates Gem component theme configuration from an MUI palette.
 */

import type { Palette } from "@mui/material/styles"
import type { GemThemeProps } from "../types"

/**
 * Creates a Gem theme configuration from the given palette.
 * 
 * @param palette - MUI Palette object to derive colors from
 * @returns GemThemeProps configuration
 * 
 * @example
 * ```ts
 * import { purpleLightPalette } from "@expanse/theme"
 * import { createGemConfig } from "@expanse/brand-core/theme"
 * 
 * const config = createGemConfig(purpleLightPalette)
 * ```
 */
export function createGemConfig(palette: Palette): GemThemeProps {
  const isDark = palette.mode === "dark"
  
  return {
    variants: {
      default: {
        strokeColor: isDark ? palette.common.white : palette.common.black,
        fillColor: palette.primary.light,
      },
      contrastBG: {
        strokeColor: isDark ? palette.common.white : palette.common.black,
        fillColor: isDark ? palette.primary.light : palette.common.white,
      },
    },
  }
}
