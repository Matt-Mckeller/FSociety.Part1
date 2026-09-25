/**
 * ExperienceIcon Theme Factory
 * 
 * Creates ExperienceIcon component theme configuration from an MUI palette.
 */

import type { Palette } from "@mui/material/styles"
import type { ExperienceIconThemeProps } from "../types"

/**
 * Creates an ExperienceIcon theme configuration from the given palette.
 * 
 * @param palette - MUI Palette object to derive colors from
 * @returns ExperienceIconThemeProps configuration
 * 
 * @example
 * ```ts
 * import { purpleLightPalette } from "@expanse/theme"
 * import { createExperienceIconConfig } from "@expanse/brand-core/theme"
 * 
 * const config = createExperienceIconConfig(purpleLightPalette)
 * ```
 */
export function createExperienceIconConfig(palette: Palette): ExperienceIconThemeProps {
  return {
    variants: {
      default: {
        fillColor: palette.common.black,
      },
      contrast: {
        fillColor: palette.common.white,
      },
    },
  }
}
