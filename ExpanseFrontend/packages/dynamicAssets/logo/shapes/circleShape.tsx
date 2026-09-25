/**
 * Circle Shape Renderer
 *
 * Renders the default circular logo shape (matches V3 behavior).
 */

import React from "react"
import type { ShapeRenderer, ShapeRenderResult, ShapeRenderContext } from "./types"

/**
 * Render circle shape for main logo and moon
 */
export const renderCircleShape: ShapeRenderer = (
  context: ShapeRenderContext,
): ShapeRenderResult => {
  const {
    centerX,
    centerY,
    radius,
    fill,
    gradientId,
    shadowFilterId,
    moonRadius,
    moonOffsetX,
    moonOffsetY,
    baseMoonCx,
    baseMoonCy,
  } = context

  const mainFill = gradientId ? `url(#${gradientId})` : fill
  const filterAttr = shadowFilterId ? `url(#${shadowFilterId})` : undefined

  const mainShape = (
    <circle
      name="sphere"
      r={radius}
      cx={centerX}
      cy={centerY}
      fill={mainFill}
      filter={filterAttr}
    />
  )

  const moonShape = (
    <circle
      name="moon"
      r={moonRadius}
      cx={baseMoonCx + moonOffsetX}
      cy={baseMoonCy + moonOffsetY}
      fill={fill}
    />
  )

  // Mask shape (slightly larger for safety margin in ring clipping)
  const maskRadius = radius + 6
  const maskShape = (
    <circle
      r={maskRadius}
      cx={centerX + 39.509173} // Account for group transform
      cy={centerY + 5.4736727}
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
