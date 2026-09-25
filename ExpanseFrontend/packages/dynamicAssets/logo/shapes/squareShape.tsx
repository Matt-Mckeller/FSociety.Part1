/**
 * Square Shape Renderer
 *
 * Renders a rounded square/rectangle for the main logo shape.
 */

import React from "react"
import type { ShapeRenderer, ShapeRenderResult, ShapeRenderContext } from "./types"

/** Default corner radius for square shape */
export const DEFAULT_SQUARE_CORNER_RADIUS = 20

/**
 * Render square shape for main logo and moon
 */
export const renderSquareShape: ShapeRenderer = (
  context: ShapeRenderContext,
): ShapeRenderResult => {
  const {
    centerX,
    centerY,
    radius,
    fill,
    gradientId,
    shadowFilterId,
    squareCornerRadius = DEFAULT_SQUARE_CORNER_RADIUS,
    moonRadius,
    moonOffsetX,
    moonOffsetY,
    baseMoonCx,
    baseMoonCy,
  } = context

  const mainFill = gradientId ? `url(#${gradientId})` : fill
  const filterAttr = shadowFilterId ? `url(#${shadowFilterId})` : undefined

  // Adjust radius so square corners are same distance from center as circle edge
  // Square corner distance = side/2 * √2, so to match circle: adjustedRadius * √2 = radius
  const sizeAdjustment = 1 / Math.sqrt(2)  // ≈ 0.7071
  const adjustedRadius = radius * sizeAdjustment
  
  // Main square dimensions
  const size = adjustedRadius * 2
  const x = centerX - adjustedRadius
  const y = centerY - adjustedRadius

  const mainShape = (
    <rect
      name="sphere"
      x={x}
      y={y}
      width={size}
      height={size}
      rx={squareCornerRadius}
      ry={squareCornerRadius}
      fill={mainFill}
      filter={filterAttr}
    />
  )

  // Moon as small rounded square
  const moonSize = moonRadius * 2
  const moonCornerRadius = Math.max(3, squareCornerRadius * (moonRadius / radius))
  const moonX = baseMoonCx + moonOffsetX - moonRadius
  const moonY = baseMoonCy + moonOffsetY - moonRadius

  const moonShape = (
    <rect
      name="moon"
      x={moonX}
      y={moonY}
      width={moonSize}
      height={moonSize}
      rx={moonCornerRadius}
      ry={moonCornerRadius}
      fill={fill}
    />
  )

  // Mask shape (slightly larger for safety margin)
  const maskMargin = 6
  const maskSize = size + maskMargin * 2
  const maskX = x - maskMargin + 39.509173
  const maskY = y - maskMargin + 5.4736727
  const maskCornerRadius = squareCornerRadius + maskMargin

  const maskShape = (
    <rect
      x={maskX}
      y={maskY}
      width={maskSize}
      height={maskSize}
      rx={maskCornerRadius}
      ry={maskCornerRadius}
      fill="black"
    />
  )

  return {
    mainShape,
    moonShape,
    pupilCenter: { x: centerX, y: centerY },
    maskShape,
  }
}
