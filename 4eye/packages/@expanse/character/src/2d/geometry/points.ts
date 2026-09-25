/**
 * Geometric Type Definitions
 *
 * Base types for coordinate systems and point structures
 * used throughout the character animation system.
 */

/**
 * A 2D point with x and y coordinates.
 * The fundamental building block for all character positioning.
 */
export interface Point2D {
  x: number
  y: number
}

/**
 * Extended point with optional SVG arc parameters.
 * Used for curved limb paths (particularly legs).
 *
 * SVG Arc Command: A rx ry rotation large-arc-flag sweep-flag x y
 */
export interface ArcPoint extends Point2D {
  /** Radius for the arc curve */
  arcRadius?: number
  /** 0 = smaller arc, 1 = larger arc */
  arcLargeFlag?: 0 | 1
  /** 0 = counter-clockwise, 1 = clockwise */
  arcSweepFlag?: 0 | 1
}

/**
 * A set of 3 points defining a straight limb segment.
 * Used for arms and the body (start → mid → end).
 *
 * - [0]: Start/attachment point (shoulder/hip)
 * - [1]: Mid point (elbow/knee region)
 * - [2]: End point (hand/foot)
 */
export type LimbPoints = [Point2D, Point2D, Point2D]

/**
 * A set of 3 arc points for curved limb paths.
 * Used for legs which may have bent/curved shapes.
 *
 * The arc parameters allow for smooth curved leg animations
 * during walking and other dynamic poses.
 */
export type LegPoints = [ArcPoint, ArcPoint, ArcPoint]
