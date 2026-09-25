/**
 * ExpanseCharacter Theme Factory
 * 
 * Creates ExpanseCharacter component theme configuration from an MUI palette.
 */

import type { Palette } from "@mui/material/styles"
import type { ExpanseCharacterThemeProps } from "../types"

/**
 * Creates an ExpanseCharacter theme configuration from the given palette.
 * 
 * @param palette - MUI Palette object to derive colors from
 * @returns ExpanseCharacterThemeProps configuration
 * 
 * @example
 * ```ts
 * import { purpleLightPalette } from "@expanse/theme"
 * import { createExpanseCharacterConfig } from "@expanse/brand-core/theme"
 * 
 * const config = createExpanseCharacterConfig(purpleLightPalette)
 * ```
 */
export function createExpanseCharacterConfig(palette: Palette): ExpanseCharacterThemeProps {
  const isDark = palette.mode === "dark"
  
  return {
    variants: {
      default: {
        headColor: isDark 
          ? (palette.primary.extra1 as string ?? palette.primary.light)
          : palette.primary.light,
        limbColor: isDark 
          ? (palette.primary.extra1 as string ?? palette.primary.light)
          : palette.primary.light,
        bodyColor: isDark 
          ? (palette.primary.extra2 as string ?? palette.primary.dark)
          : palette.primary.main,
        altLimbColor: palette.secondary?.main,
        altColor: palette.secondary?.light,
        face: {
          mouthStrokeColor: palette.text.primary,
          eyePrimaryColor: palette.common.white,
          eyeSecondaryColor: palette.common.black,
        },
      },
    },
  }
}
