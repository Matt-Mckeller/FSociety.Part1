"use client"
import { Box, useTheme } from "@mui/system"
import React from "react"

export type SectionSpacerSize = "large" | "medium" | "small" | "xs"

/**
 * SectionSpacer - Vertical spacing utility
 * 
 * Provides consistent vertical spacing between page sections.
 * 
 * Sizes:
 * - xs: 8 spacing units (default 24px)
 * - small: 16 spacing units (default 48px)
 * - medium: 32 spacing units (default 96px) [default]
 * - large: 64 spacing units (default 192px)
 */
export function SectionSpacer({
  size = "medium",
}: {
  size?: SectionSpacerSize
}) {
  const theme = useTheme()
  
  let spacingMultiplier = 32
  if (size === "large") {
    spacingMultiplier = 64
  } else if (size === "medium") {
    spacingMultiplier = 32
  } else if (size === "small") {
    spacingMultiplier = 16
  } else if (size === "xs") {
    spacingMultiplier = 8
  }

  return (
    <Box
      className="section-spacer"
      sx={{
        height: theme.spacing(spacingMultiplier),
        width: 1
      }} />
  );
}
