"use client"
import React from "react"

import { useTheme } from "@mui/material/styles"

export const ExpandingCircleContainer = ({
  children,
  outerCircleColor,
  middleCircleColor,
  innerCircleColor,
  middleBackground,
  width = "100%",
  height = "100%",
}: {
  children?: React.ReactNode
  outerCircleColor?: string
  middleCircleColor?: string
  innerCircleColor?: string
  middleBackground?: string
  width?: string
  height?: string
}) => {
  const theme = useTheme()

  const viewBoxWidth = 100
  const viewBoxHeight = 100
  // Goal: 3 outer circle, 2 middle stroke, 1 outer stroke, remainder inner circle
  const borderScaleFactor = 2
  const outerCircleStroke = 3 * borderScaleFactor
  const outerCircleRadius = 50 - outerCircleStroke / 2
  // the middle layer is created by the gap between outer circle fill and inner circle stroke
  const middleLayerRadius = 2 * borderScaleFactor

  const innerCircleStrokeWidth = 1 * borderScaleFactor

  const innerCircleRadius =
    outerCircleRadius - innerCircleStrokeWidth * 2 - middleLayerRadius // 2x stroke when compared with radius for calculations

  outerCircleColor = outerCircleColor || theme.palette.primary.dark
  middleCircleColor = middleCircleColor || theme.palette.primary.main
  innerCircleColor = innerCircleColor || theme.palette.primary.light

  middleBackground = middleBackground || theme.palette.background.default

  return (
    <svg
      id="svg-layer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      overflow="visible"
      width={width}
      height={height}
    >
      <circle
        cx={"50"}
        cy="50"
        data-id="outer-circle"
        r={outerCircleRadius}
        fill={middleCircleColor}
        stroke={outerCircleColor}
        strokeWidth={outerCircleStroke}
      />
      <circle
        cx="50"
        cy="50"
        data-id="inner-circle"
        r={innerCircleRadius}
        fill={middleBackground}
        stroke={innerCircleColor}
        strokeWidth={innerCircleStrokeWidth}
      ></circle>
      <foreignObject x="0" y="0" width="100" height="100">
        {children}
      </foreignObject>
    </svg>
  )
}
