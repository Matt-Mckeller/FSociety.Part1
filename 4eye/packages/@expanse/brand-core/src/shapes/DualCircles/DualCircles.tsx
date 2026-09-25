/**
 * DualCircles - Pair of overlapping circles (filled + stroke)
 *
 * Originally: DualCircleGroup1
 * Migration from: packages/dynamicAssets/shapes/DualCircleGroup1.tsx
 */

"use client"

import React from "react"
import { useTheme } from "@mui/system"
import { useBrandContext } from "../../context/BrandContext"

// Configuration constants (from shape.config)
const angleInDegrees = 180 - 33
const angleInRadians = (angleInDegrees * Math.PI) / 180
const filledCircle1Radius = 14.87
const strokeCircle1Radius = 22.31
const circle1OffsetX = (filledCircle1Radius / 2) * Math.cos(angleInRadians)
const circle1OffsetY = (filledCircle1Radius / 2) * Math.sin(angleInRadians)

type FillVersionOptions = "white" | "background" | "primary" | "custom"
type StrokeVersionOptions = "white" | "contrastBG" | "background" | "custom"

export interface DualCirclesProps {
  id?: string
  /** Radius of the stroke circle */
  strokeCircleRadius?: number
  /** Radius of the filled circle */
  filledCircleRadius?: number
  /** Fill color preset or custom */
  fillVersion?: FillVersionOptions
  /** Stroke color preset or custom */
  strokeVersion?: StrokeVersionOptions
  /** Custom fill color (overrides fillVersion) */
  fillColor?: string
  /** Custom stroke color (overrides strokeVersion) */
  strokeColor?: string
  /** Center X coordinate (default: 0, set to viewBox center for proper display) */
  centerX?: number
  /** Center Y coordinate (default: 0, set to viewBox center for proper display) */
  centerY?: number
  /** Custom class name */
  className?: string
  /** Custom styles */
  style?: React.CSSProperties
}

export function DualCircles({
  id,
  filledCircleRadius = filledCircle1Radius,
  strokeCircleRadius = strokeCircle1Radius,
  fillVersion = "primary",
  strokeVersion = "background",
  fillColor: customFillColor,
  strokeColor: customStrokeColor,
  centerX = 0,
  centerY = 0,
  className,
  style,
}: DualCirclesProps) {
  const theme = useTheme()
  const { resolveColor } = useBrandContext()

  // Resolve fill color
  let fillColor = customFillColor
  if (!fillColor) {
    switch (fillVersion) {
      case "background":
        fillColor = theme.palette.background.default
        break
      case "white":
        fillColor = theme.palette.common.white
        break
      case "primary":
      default:
        fillColor = resolveColor("primaryColor")
        break
    }
  }

  // Resolve stroke color
  let strokeColor = customStrokeColor
  if (!strokeColor) {
    switch (strokeVersion) {
      case "white":
        strokeColor = theme.palette.common.white
        break
      case "contrastBG":
        strokeColor = theme.palette.background?.contrastBG
        break
      case "background":
      default:
        strokeColor = theme.palette.background.default
        break
    }
  }

  return (
    <g
      transform={`translate(${centerX}, ${centerY}) rotate(180)`}
      id={id}
      className={className}
      style={style}
    >
      {/* Stroke circle */}
      <circle
        cx="0"
        cy="0"
        r={filledCircleRadius}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
      />
      {/* Filled circle */}
      <circle
        cx={circle1OffsetX - strokeCircle1Radius / 2}
        cy={circle1OffsetY + strokeCircleRadius / 2}
        r={strokeCircleRadius}
        fill={fillColor}
      />
    </g>
  )
}
