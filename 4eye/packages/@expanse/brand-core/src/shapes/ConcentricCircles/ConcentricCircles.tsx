/**
 * ConcentricCircles - Three-layer concentric circle container
 *
 * Originally: ExpandingCircleContainer
 * Migration from: packages/dynamicAssets/shapes/ExpandingCircleContainer.tsx
 */

"use client"

import React from "react"
import { useTheme } from "@mui/material/styles"

export interface ConcentricCirclesProps {
  /** Content to render in center */
  children?: React.ReactNode
  /** Outer circle color */
  outerCircleColor?: string
  /** Middle layer color */
  middleCircleColor?: string
  /** Inner circle stroke color */
  innerCircleColor?: string
  /** Middle layer background color */
  middleBackground?: string
  /** SVG width */
  width?: string
  /** SVG height */
  height?: string
  /** Custom class name */
  className?: string
  /** Custom styles */
  style?: React.CSSProperties
}

export function ConcentricCircles({
  children,
  outerCircleColor,
  middleCircleColor,
  innerCircleColor,
  middleBackground,
  width = "100%",
  height = "100%",
  className,
  style,
}: ConcentricCirclesProps) {
  const theme = useTheme()

  const viewBoxWidth = 100
  const viewBoxHeight = 100

  // Layer sizing: 3 outer circle, 2 middle stroke, 1 inner stroke, remainder inner circle
  const borderScaleFactor = 2
  const outerCircleStroke = 3 * borderScaleFactor
  const outerCircleRadius = 50 - outerCircleStroke / 2

  // Middle layer created by gap between outer circle fill and inner circle stroke
  const middleLayerRadius = 2 * borderScaleFactor
  const innerCircleStrokeWidth = 1 * borderScaleFactor
  const innerCircleRadius =
    outerCircleRadius - innerCircleStrokeWidth * 2 - middleLayerRadius

  // Default colors
  const resolvedOuterColor = outerCircleColor || theme.palette.primary.dark
  const resolvedMiddleColor = middleCircleColor || theme.palette.primary.main
  const resolvedInnerColor = innerCircleColor || theme.palette.primary.light
  const resolvedMiddleBackground =
    middleBackground || theme.palette.background.default

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      overflow="visible"
      width={width}
      height={height}
      className={className}
      style={style}
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        data-id="outer-circle"
        r={outerCircleRadius}
        fill={resolvedMiddleColor}
        stroke={resolvedOuterColor}
        strokeWidth={outerCircleStroke}
      />

      {/* Inner circle */}
      <circle
        cx="50"
        cy="50"
        data-id="inner-circle"
        r={innerCircleRadius}
        fill={resolvedMiddleBackground}
        stroke={resolvedInnerColor}
        strokeWidth={innerCircleStrokeWidth}
      />

      {/* Content container */}
      <foreignObject x="0" y="0" width="100" height="100">
        {children}
      </foreignObject>
    </svg>
  )
}
