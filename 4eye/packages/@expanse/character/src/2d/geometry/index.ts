/**
 * Geometry Domain
 *
 * Everything spatial about the 2D character: coordinate primitives,
 * proportional dimensions, pose position math, and SVG path helpers.
 */

// Coordinate primitives
export type { Point2D, ArcPoint, LimbPoints, LegPoints } from "./points"

// SVG path types
export type { PathCoordinates, ArcParameters, PathPointWithArc } from "./path"

// Dimensions & proportions
export {
  CHARACTER_BASE,
  DEFAULT_DIMENSIONS,
  CHARACTER_DISPLAY,
  calculateDimensions,
  calculateBodyPoints,
  calculateShoulderPoint,
  calculateHipPoint,
  rotatePointAround,
  getPointAtAngleAndDistance,
} from "./dimensions"
export type {
  CharacterDimensions,
  CharacterDimensionOptions,
  BodyPoints,
} from "./dimensions"

// Pose position calculations
export { calculatePositions } from "./positions"
export type { BodyPartCoordinatesWithArc } from "./positions"

// SVG path helpers
export { getCharacterPathData } from "./pathHelper"
