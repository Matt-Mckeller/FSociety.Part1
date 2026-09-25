/**
 * Shape Renderers Index
 *
 * Exports all shape rendering utilities for ExpanseLogo V4.
 */

export * from "./types"
export { renderCircleShape } from "./circleShape"
export { renderSquareShape, DEFAULT_SQUARE_CORNER_RADIUS } from "./squareShape"
export { renderTriangleShape, DEFAULT_TRIANGLE_CORNER_RADIUS } from "./triangleShape"

import type { LogoShape, ShapeRenderer } from "./types"
import { renderCircleShape } from "./circleShape"
import { renderSquareShape } from "./squareShape"
import { renderTriangleShape } from "./triangleShape"

/**
 * Map of shape types to their renderers
 */
export const SHAPE_RENDERERS: Record<LogoShape, ShapeRenderer> = {
  circle: renderCircleShape,
  square: renderSquareShape,
  triangle: renderTriangleShape,
}

/**
 * Get the appropriate shape renderer for a given shape type
 */
export function getShapeRenderer(shape: LogoShape): ShapeRenderer {
  return SHAPE_RENDERERS[shape]
}

/**
 * Shape configuration defaults
 */
export const SHAPE_DEFAULTS: Record<LogoShape, { showArcs: boolean }> = {
  circle: { showArcs: true },
  square: { showArcs: true },
  triangle: { showArcs: false }, // Arcs don't fit triangle geometry well
}

/**
 * Size adjustment factors for each shape
 * Square corners are same distance from center as circle edges (1/√2)
 */
export const SHAPE_SIZE_ADJUSTMENTS: Record<LogoShape, number> = {
  circle: 1.0,
  square: 1 / Math.sqrt(2),  // ≈ 0.7071 - corners match circle edge distance
  triangle: 1.0,
}
