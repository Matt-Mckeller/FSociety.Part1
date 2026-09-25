"use client"

import type { SxProps, Theme } from "@mui/material"

/**
 * Merge multiple SxProps into a single SxProps array.
 * Handles undefined values and ensures proper typing.
 * 
 * @example
 * ```tsx
 * <Box sx={mergeSx(baseStyles, conditionalStyles, propSx)} />
 * ```
 */
export function mergeSx(
  ...styles: (SxProps<Theme> | undefined | false | null)[]
): SxProps<Theme> {
  return styles.filter(Boolean) as SxProps<Theme>
}

export default mergeSx
