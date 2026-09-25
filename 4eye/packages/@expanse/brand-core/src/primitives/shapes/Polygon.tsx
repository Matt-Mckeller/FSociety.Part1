/**
 * Polygon Primitives
 *
 * Regular polygons (hexagon, pentagon) and star shapes.
 */

"use client"

import React, { useMemo } from "react"
import type { PolygonProps } from "../../types"
import { SHAPE_DEFAULTS } from "../../constants"
import { generatePolygonPath, generateStarPath } from "../../utils/geometry"

/**
 * Hexagon - 6 sided regular polygon
 */
export function Hexagon({
  id,
  className,
  style,
  centerX,
  centerY,
  radius,
  fill = "#ffffff",
  fillMode = "solid",
  gradientId,
  stroke,
  opacity = SHAPE_DEFAULTS.opacity,
  shadowFilterId,
  transform,
  transitionStyle,
  rotationOffset = 0,
}: PolygonProps) {
  const path = useMemo(
    () => generatePolygonPath(centerX, centerY, radius, 6, rotationOffset),
    [centerX, centerY, radius, rotationOffset],
  )

  const resolvedFill =
    fillMode === "gradient" && gradientId ? `url(#${gradientId})` : fill

  return (
    <path
      id={id}
      className={className}
      style={{ ...style, transition: transitionStyle }}
      d={path}
      fill={resolvedFill}
      opacity={opacity}
      transform={transform}
      filter={shadowFilterId ? `url(#${shadowFilterId})` : undefined}
      stroke={stroke?.color}
      strokeWidth={stroke?.width}
      strokeLinecap={stroke?.linecap}
      strokeLinejoin={stroke?.linejoin}
      strokeDasharray={stroke?.dasharray}
    />
  )
}

/**
 * Pentagon - 5 sided regular polygon
 */
export function Pentagon({
  id,
  className,
  style,
  centerX,
  centerY,
  radius,
  fill = "#ffffff",
  fillMode = "solid",
  gradientId,
  stroke,
  opacity = SHAPE_DEFAULTS.opacity,
  shadowFilterId,
  transform,
  transitionStyle,
  rotationOffset = 90, // Point up by default
}: PolygonProps) {
  const path = useMemo(
    () => generatePolygonPath(centerX, centerY, radius, 5, rotationOffset),
    [centerX, centerY, radius, rotationOffset],
  )

  const resolvedFill =
    fillMode === "gradient" && gradientId ? `url(#${gradientId})` : fill

  return (
    <path
      id={id}
      className={className}
      style={{ ...style, transition: transitionStyle }}
      d={path}
      fill={resolvedFill}
      opacity={opacity}
      transform={transform}
      filter={shadowFilterId ? `url(#${shadowFilterId})` : undefined}
      stroke={stroke?.color}
      strokeWidth={stroke?.width}
      strokeLinecap={stroke?.linecap}
      strokeLinejoin={stroke?.linejoin}
      strokeDasharray={stroke?.dasharray}
    />
  )
}

/**
 * Star - N-pointed star shape
 */
export function Star({
  id,
  className,
  style,
  centerX,
  centerY,
  radius,
  fill = "#ffffff",
  fillMode = "solid",
  gradientId,
  stroke,
  opacity = SHAPE_DEFAULTS.opacity,
  shadowFilterId,
  transform,
  transitionStyle,
  sides = 5, // Number of points
  rotationOffset = 90, // Top point up
  innerRadiusRatio = 0.5,
}: PolygonProps) {
  const path = useMemo(
    () =>
      generateStarPath(
        centerX,
        centerY,
        radius,
        innerRadiusRatio,
        sides,
        rotationOffset,
      ),
    [centerX, centerY, radius, innerRadiusRatio, sides, rotationOffset],
  )

  const resolvedFill =
    fillMode === "gradient" && gradientId ? `url(#${gradientId})` : fill

  return (
    <path
      id={id}
      className={className}
      style={{ ...style, transition: transitionStyle }}
      d={path}
      fill={resolvedFill}
      opacity={opacity}
      transform={transform}
      filter={shadowFilterId ? `url(#${shadowFilterId})` : undefined}
      stroke={stroke?.color}
      strokeWidth={stroke?.width}
      strokeLinecap={stroke?.linecap}
      strokeLinejoin={stroke?.linejoin}
      strokeDasharray={stroke?.dasharray}
    />
  )
}
