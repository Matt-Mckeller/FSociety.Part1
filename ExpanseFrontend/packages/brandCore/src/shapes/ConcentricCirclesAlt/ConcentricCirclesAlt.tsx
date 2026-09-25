/**
 * ConcentricCirclesAlt - Alternative three-layer concentric circle container
 *
 * Originally: ExpandingCircleContainerV2
 * Migration from: packages/dynamicAssets/shapes/ExpandingCircleContainerV2.tsx
 *
 * Differences from ConcentricCircles:
 * - 1 outer stroke, 2 middle stroke, 3 inner stroke (inverted)
 * - Different default colors (black/white theme)
 */

"use client"

import React from "react"
import { useTheme } from "@mui/material/styles"

export interface ConcentricCirclesAltProps {
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

export function ConcentricCirclesAlt({
  children,
  outerCircleColor,
  middleCircleColor,
  innerCircleColor,
  middleBackground,
  width = "100%",
  height = "100%",
  className,
  style,
}: ConcentricCirclesAltProps) {
  const theme = useTheme()

  const viewBoxWidth = 100
  const viewBoxHeight = 100

  // Layer sizing: 1 outer stroke, 2 middle stroke, 3 inner stroke, remainder inner circle
  const borderScaleFactor = 2
  const outerCircleStrokeWidth = 1 * borderScaleFactor
  const outerCircleRadius = 50 - outerCircleStrokeWidth / 2

  // Middle layer created by gap between outer circle fill and inner circle stroke
  const middleLayerRadius = 2 * borderScaleFactor
  const innerCircleStrokeWidth = 3 * borderScaleFactor

  // Inner circle radius is just a background
  const innerCircleRadius =
    outerCircleRadius - innerCircleStrokeWidth / 2 - middleLayerRadius

  // Default colors (black/white theme)
  const resolvedOuterColor = outerCircleColor || theme.palette.common.black
  const resolvedMiddleColor = middleCircleColor || theme.palette.common.white
  const resolvedInnerColor = innerCircleColor || theme.palette.common.black
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
        strokeWidth={outerCircleStrokeWidth}
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
