/**
 * BorderArc Primitive
 *
 * Arc segment for decorative borders around shapes.
 * Supports both filled (V4 original paths) and stroke styles.
 */

"use client"

import React, { useMemo } from "react"
import type { BorderArcProps } from "../../types"
import { ARC_DEFAULTS, V4_FILLED_ARC_PATHS } from "../../constants"
import { generateStrokeArcPath } from "../../utils/geometry"

/**
 * Single arc segment
 */
export function BorderArc({
  id,
  className,
  style,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  arcStyle = ARC_DEFAULTS.style,
  strokeWidth = ARC_DEFAULTS.strokeWidth,
  color = "#ffffff",
  opacity = ARC_DEFAULTS.opacity,
  pathData,
  transitionStyle,
}: BorderArcProps) {
  // Generate stroke path if needed
  const strokePath = useMemo(
    () => generateStrokeArcPath(centerX, centerY, radius, startAngle, endAngle),
    [centerX, centerY, radius, startAngle, endAngle],
  )

  const baseStyle: React.CSSProperties = {
    ...(typeof style === "object" ? style : {}),
    transition: transitionStyle,
  }

  // Use filled path if provided (V4 compatibility)
  if (arcStyle === "filled" && pathData) {
    return (
      <path
        id={id}
        className={className}
        style={baseStyle}
        d={pathData}
        fill={color}
        opacity={opacity}
      />
    )
  }

  // Stroke style
  return (
    <path
      id={id}
      className={className}
      style={baseStyle}
      d={strokePath}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill="none"
      opacity={opacity}
    />
  )
}

/**
 * Arc presets - convenience components for the original logo arcs
 * (Previously named V4Arc1/2/3, renamed for clarity)
 */
export function Arc1({
  color = "#ffffff",
  opacity = 0.21,
  ...props
}: Omit<
  BorderArcProps,
  "centerX" | "centerY" | "radius" | "startAngle" | "endAngle" | "arcStyle"
>) {
  return (
    <BorderArc
      centerX={0}
      centerY={0}
      radius={0}
      startAngle={0}
      endAngle={0}
      arcStyle="filled"
      pathData={V4_FILLED_ARC_PATHS.arc1}
      color={color}
      opacity={opacity}
      {...props}
    />
  )
}

export function Arc2({
  color = "#ffffff",
  opacity = 0.33,
  ...props
}: Omit<
  BorderArcProps,
  "centerX" | "centerY" | "radius" | "startAngle" | "endAngle" | "arcStyle"
>) {
  return (
    <BorderArc
      centerX={0}
      centerY={0}
      radius={0}
      startAngle={0}
      endAngle={0}
      arcStyle="filled"
      pathData={V4_FILLED_ARC_PATHS.arc2}
      color={color}
      opacity={opacity}
      {...props}
    />
  )
}

export function Arc3({
  color = "#ffffff",
  opacity = 0,
  ...props
}: Omit<
  BorderArcProps,
  "centerX" | "centerY" | "radius" | "startAngle" | "endAngle" | "arcStyle"
>) {
  return (
    <BorderArc
      centerX={0}
      centerY={0}
      radius={0}
      startAngle={0}
      endAngle={0}
      arcStyle="filled"
      pathData={V4_FILLED_ARC_PATHS.arc3}
      color={color}
      opacity={opacity}
      {...props}
    />
  )
}

/**
 * BorderArcs group - renders all V4 arcs together
 */
export interface BorderArcsGroupProps {
  /** Fill color */
  color?: string
  /** Opacity for arc 1 */
  arc1Opacity?: number
  /** Opacity for arc 2 */
  arc2Opacity?: number
  /** Opacity for arc 3 */
  arc3Opacity?: number
  /** Override arc 3 opacity when interacting */
  interactiveOpacity?: number
  /** Is currently interacting */
  isInteracting?: boolean
  /** Transition style */
  transitionStyle?: string
  /** CSS class name */
  className?: string
}

export function BorderArcsGroup({
  color = "#ffffff",
  arc1Opacity = 0.21,
  arc2Opacity = 0.33,
  arc3Opacity = 0,
  interactiveOpacity = 0.45,
  isInteracting = false,
  transitionStyle = "opacity 0.2s ease-in-out",
  className,
}: BorderArcsGroupProps) {
  return (
    <g name="border-arcs" className={className}>
      <Arc1
        color={color}
        opacity={arc1Opacity}
        transitionStyle={transitionStyle}
      />
      <Arc2
        color={color}
        opacity={arc2Opacity}
        transitionStyle={transitionStyle}
      />
      <Arc3
        color={color}
        opacity={isInteracting ? interactiveOpacity : arc3Opacity}
        transitionStyle={transitionStyle}
      />
    </g>
  )
}

/**
 * @deprecated Use Arc1 instead
 */
export const V4Arc1 = Arc1

/**
 * @deprecated Use Arc2 instead
 */
export const V4Arc2 = Arc2

/**
 * @deprecated Use Arc3 instead
 */
export const V4Arc3 = Arc3
