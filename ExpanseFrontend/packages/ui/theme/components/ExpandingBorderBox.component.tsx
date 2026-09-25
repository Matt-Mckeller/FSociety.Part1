"use client"

import { Box } from "@mui/system"
import { useTheme } from "@mui/material"
import { ReactNode } from "react"

export type ExpandingBorderBoxVariant = "default" | "subtle" | "primary" | "highContrast"

export const ExpandingBorderBox = ({
  children,
  largestBorderSize,
  variant = "default",
}: {
  children: ReactNode
  largestBorderSize: number
  variant?: ExpandingBorderBoxVariant
}) => {
  const theme = useTheme()

  // Get theme styles or use fallback for light/dark mode
  const themeStyles = theme.components?.ExpandingBorderBox?.variants?.[variant]
  const isDarkMode = theme.palette.mode === "dark"
  const fallbackStyles = {
    outerBorderColor: isDarkMode
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(0, 0, 0, 0.15)",
    middleBorderColor: isDarkMode
      ? "rgba(255, 255, 255, 0.45)"
      : "rgba(0, 0, 0, 0.45)",
    innerBorderColor: isDarkMode
      ? "rgba(255, 255, 255, 0.75)"
      : "rgba(0, 0, 0, 0.75)",
  }

  const { outerBorderColor, middleBorderColor, innerBorderColor } =
    themeStyles ?? fallbackStyles

  // Border sizing
  const border3Size = largestBorderSize
  const border2Size = border3Size / 2
  const border1Size = border2Size / 2
  const borderGapSize = (border3Size * 3) / 4
  const border1Radius = 10
  const border2Radius = 10
  const border3Radius = 10

  return (
    <Box
      id="border1-container"
      sx={{
        boxSizing: "border-box",
        border: `${border1Size}px solid ${outerBorderColor}`,
        borderRadius: border1Radius + "px",
        p: borderGapSize + "px",
        height: "100%",
        minHeight: "100%",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Box
        id="border2-container"
        sx={{
          boxSizing: "border-box",
          border: `${border2Size}px solid ${middleBorderColor}`,
          borderRadius: border2Radius + "px",
          p: borderGapSize + "px",
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          minHeight: "100%",
        }}
      >
        <Box
          id="border3-container-content"
          display="flex"
          sx={{
            boxSizing: "border-box",
            border: `${border3Size}px solid ${innerBorderColor}`,
            borderRadius: border3Radius + "px",
            height: "100%",
            minHeight: "100%",
            width: "100%",
            maxWidth: "100%",
            position: "relative",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
