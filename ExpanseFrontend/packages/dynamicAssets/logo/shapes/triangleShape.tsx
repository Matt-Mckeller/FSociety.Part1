/**
 * Triangle Shape Renderer
 *
 * Renders an equilateral triangle for the main logo shape.
 */

import React from "react"
import type { ShapeRenderer, ShapeRenderResult, ShapeRenderContext } from "./types"
import {
  calculateTrianglePoints,
  calculateTriangleCentroid,
  formatPolygonPoints,
  generateRoundedTrianglePath,
} from "./types"

/** Default corner radius for triangle shape */
export const DEFAULT_TRIANGLE_CORNER_RADIUS = 0

/**
 * Render triangle shape for main logo and moon
 */
export const renderTriangleShape: ShapeRenderer = (
  context: ShapeRenderContext,
): ShapeRenderResult => {
  const {
    centerX,
    centerY,
    radius,
    fill,
    gradientId,
    shadowFilterId,
    triangleOrientation = "up",
    triangleCornerRadius = DEFAULT_TRIANGLE_CORNER_RADIUS,
    moonRadius,
    moonOffsetX,
    moonOffsetY,
    baseMoonCx,
    baseMoonCy,
  } = context

  const mainFill = gradientId ? `url(#${gradientId})` : fill
  const filterAttr = shadowFilterId ? `url(#${shadowFilterId})` : undefined

  // Calculate main triangle points
  const points = calculateTrianglePoints(centerX, centerY, radius, triangleOrientation)
  const centroid = calculateTriangleCentroid(points)

  // Use rounded path or polygon based on corner radius
  const mainShape = triangleCornerRadius > 0 ? (
    <path
      name="sphere"
      d={generateRoundedTrianglePath(points, triangleCornerRadius)}
      fill={mainFill}
      filter={filterAttr}
    />
  ) : (
    <polygon
      name="sphere"
      points={formatPolygonPoints(points)}
      fill={mainFill}
      filter={filterAttr}
    />
  )

  // Moon as small triangle with same orientation and proportional corner radius
  const moonCenterX = baseMoonCx + moonOffsetX
  const moonCenterY = baseMoonCy + moonOffsetY
  const moonPoints = calculateTrianglePoints(
    moonCenterX,
    moonCenterY,
    moonRadius,
    triangleOrientation,
  )
  // Scale corner radius proportionally to moon size
  const moonCornerRadius = triangleCornerRadius * (moonRadius / radius)

  const moonShape = moonCornerRadius > 0 ? (
    <path
      name="moon"
      d={generateRoundedTrianglePath(moonPoints, moonCornerRadius)}
      fill={fill}
    />
  ) : (
    <polygon
      name="moon"
      points={formatPolygonPoints(moonPoints)}
      fill={fill}
    />
  )

  // Mask shape (slightly larger for safety margin)
  // Calculate dynamic offset based on orbital center position
  const maskRadius = radius + 8
  const maskOffsetX = 39.509173  // Orbital center offset from shape center
  const maskOffsetY = 5.4736727
  const maskPoints = calculateTrianglePoints(
    centerX + maskOffsetX,
    centerY + maskOffsetY,
    maskRadius,
    triangleOrientation,
  )
  // Use larger corner radius for mask to ensure coverage
  const maskCornerRadius = triangleCornerRadius * 1.1

  const maskShape = maskCornerRadius > 0 ? (
    <path
      d={generateRoundedTrianglePath(maskPoints, maskCornerRadius)}
      fill="black"
    />
  ) : (
    <polygon
      points={formatPolygonPoints(maskPoints)}
      fill="black"
    />
  )

  return {
    mainShape,
    moonShape,
    pupilCenter: centroid,
    maskShape,
  }
}
