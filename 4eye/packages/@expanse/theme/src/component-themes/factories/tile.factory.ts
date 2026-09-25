/**
 * Tile Factory
 *
 * Creates theme configuration for Tile component from a palette.
 * Tile is a selectable grid element used in board-style interfaces.
 */

import type { Palette } from "@mui/material/styles"
import type { TileThemeProps } from "../types"

/**
 * Create Tile theme configuration
 *
 * @param palette - MUI Palette object for deriving colors
 * @returns Tile theme props with default and high contrast variants
 */
export function createTileConfig(palette: Palette): TileThemeProps {
  const isDark = palette.mode === "dark"

  const borderBase = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"

  return {
    variants: {
      default: {
        bgColor: palette.background.default,
        borderColor: borderBase,
        activeBorderColor: palette.primary.main,
      },
      highContrast: {
        bgColor: palette.background.default,
        borderColor: palette.text.primary,
        activeBorderColor: palette.primary.light,
      },
    },
  }
}
