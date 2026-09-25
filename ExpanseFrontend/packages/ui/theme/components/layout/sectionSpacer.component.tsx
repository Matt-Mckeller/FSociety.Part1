"use client"
import { Box, spacing, useTheme } from "@mui/system"
import React from "react"

type SectionSpacerSize = "large" | "medium" | "small" | "xs"
export function SectionSpacer({
  size = "medium",
}: {
  size?: SectionSpacerSize
}) {
  const theme = useTheme()
  let spacingMultiplier = 16
  if (size === "medium") {
    spacingMultiplier = 32
  } else if (size === "large") {
    spacingMultiplier = 64
  } else if (size === "small") {
    spacingMultiplier = 16
  } else if (size === "xs") {
    spacingMultiplier = 8
  } else {
    throw new Error("Invalid size for section spacer")
  }
  return (
    <Box
      className="section-spacer"
      height={theme.spacing(spacingMultiplier)}
      width={1}
    />
  )
}
