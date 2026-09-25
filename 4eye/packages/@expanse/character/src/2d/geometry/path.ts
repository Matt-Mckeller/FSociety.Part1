/**
 * SVG Path Type Definitions
 *
 * Types for SVG path construction, particularly
 * for character limb rendering with arc support.
 */

/**
 * Basic path coordinate - simple x/y position.
 * Used as input for path construction functions.
 */
export type PathCoordinates = {
  x: number
  y: number
}

/**
 * SVG arc command parameters.
 * Used for curved path segments (legs during walking).
 *
 * Reference: SVG Arc Command
 * A rx ry x-axis-rotation large-arc-flag sweep-flag x y
 */
export type ArcParameters = {
  /** Radius of the arc curve */
  arcRadius?: number
  /** Direction of arc sweep: 0 = counter-clockwise, 1 = clockwise */
  arcSweepFlag?: number
  /** Arc size: 0 = smaller, 1 = larger */
  arcLargeFlag?: number
}

/**
 * Path coordinate with optional arc parameters.
 * Combines position with curve control.
 */
export type PathPointWithArc = PathCoordinates & ArcParameters
