/**
 * Common elevation and shadow styles
 * Provides consistent elevation effects across components
 */

import type { SxProps, Theme } from "@mui/material"

/**
 * Elevation level (aligned with Material Design)
 */
export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24

/**
 * Elevation direction
 */
export type ElevationDirection = "all" | "horizontal" | "vertical"

/**
 * Get elevation box-shadow value
 * 
 * @param level - Elevation level (0-24)
 * @param direction - Shadow direction
 * @returns Shadow string
 * 
 * @example
 * ```tsx
 * <Box sx={{ boxShadow: getElevation(4) }}>
 *   Elevated content
 * </Box>
 * ```
 */
export function getElevation(
  level: ElevationLevel,
  direction: ElevationDirection = "all"
): string {
  // Material Design elevation shadows
  const elevations: Record<ElevationLevel, string> = {
    0: "none",
    1: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    2: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    3: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
    4: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    6: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
    8: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    12: "0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)",
    16: "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)",
    24: "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
  }

  const shadow = elevations[level]

  // Adjust shadow based on direction
  if (direction === "horizontal") {
    return shadow.replace(/0px (\d+)px/g, "$1px 0px");
  } else if (direction === "vertical") {
    return shadow.replace(/(\d+)px 0px/g, "0px $1px");
  }

  return shadow
}

/**
 * Create elevation styles
 * 
 * @param level - Elevation level
 * @param direction - Shadow direction
 * @returns MUI sx props with elevation
 * 
 * @example
 * ```tsx
 * <Box sx={elevation(4)}>Elevated</Box>
 * <Box sx={elevation(8, 'horizontal')}>Side elevated</Box>
 * ```
 */
export function elevation(
  level: ElevationLevel,
  direction: ElevationDirection = "all"
): SxProps<Theme> {
  return {
    boxShadow: getElevation(level, direction),
  }
}

/**
 * Subtle elevation (level 1)
 */
export function subtleElevation(direction?: ElevationDirection): SxProps<Theme> {
  return elevation(1, direction)
}

/**
 * Medium elevation (level 4)
 */
export function mediumElevation(direction?: ElevationDirection): SxProps<Theme> {
  return elevation(4, direction)
}

/**
 * Strong elevation (level 8)
 */
export function strongElevation(direction?: ElevationDirection): SxProps<Theme> {
  return elevation(8, direction)
}

/**
 * Maximum elevation (level 24)
 */
export function maxElevation(direction?: ElevationDirection): SxProps<Theme> {
  return elevation(24, direction)
}
