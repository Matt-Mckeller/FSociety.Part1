/**
 * GameDrawer Factory
 *
 * Creates theme configuration for GameDrawer component from a palette.
 * GameDrawer is a simple component with just width configuration.
 */

import type { Palette } from "@mui/material/styles"
import type { GameDrawerThemeProps } from "../types"

/**
 * Create GameDrawer theme configuration
 *
 * @param _palette - MUI Palette object (unused, for interface consistency)
 * @returns GameDrawer theme props with default width
 */
export function createGameDrawerConfig(_palette: Palette): GameDrawerThemeProps {
  return {
    variants: {
      default: {
        width: 240,
      },
    },
  }
}
