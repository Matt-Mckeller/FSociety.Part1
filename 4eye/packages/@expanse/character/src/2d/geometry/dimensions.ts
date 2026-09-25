/**
 * Character Dimensions Configuration
 * ==================================
 * Single source of truth for all character proportions and calculations.
 *
 * ## Design System
 *
 * All character proportions derive from `headSize` as the base unit.
 * This creates consistent scaling and maintains visual harmony.
 *
 * ### Proportional Ratios (relative to headSize = 33)
 *
 * ```
 *         HEAD (1×)
 *           ○         ← headSize = 33
 *          ─┼─        ← neckGap = headSize × 0.15 ≈ 5
 *         / | \
 *        /  │  \      ← arms = headSize × 2 = 66
 *           │
 *           │         ← body = headSize × 3 = 99
 *           │
 *          / \
 *         /   \       ← legs = headSize × 3 = 99
 *        /     \
 * ```
 *
 * ### Stroke Width Hierarchy
 *
 * ```
 * Body:  headSize × 0.787 ≈ 26   (widest - main trunk)
 * Legs:  bodyStroke × 0.5 ≈ 13   (medium - supporting limbs)
 * Arms:  bodyStroke / 3   ≈ 8.67 (thinnest - delicate limbs)
 * ```
 *
 * ### Attachment Points
 *
 * Arms and legs attach relative to the body origin point:
 * - Shoulders: body[0].y - bodyStrokeWidth/2 + armStrokeWidth
 * - Hips: body[0].y + bodyLength (bottom of body stroke)
 *
 * The `armXOverlap` creates slight overlap so arms visually connect
 * to the body stroke rather than floating beside it.
 */

import type { Point2D } from "./points"

// =============================================================================
// BASE CONFIGURATION
// =============================================================================

/**
 * Core character proportions.
 * All derived values calculate from these ratios.
 */
export const CHARACTER_BASE = {
  /** Base unit - all proportions derive from this */
  headSize: 33,

  /** Proportional multipliers relative to headSize */
  proportions: {
    /** Arm length = headSize × 2 = 66 */
    armLength: 2.0,
    /** Body length = headSize × 3 = 99 */
    bodyLength: 3.0,
    /** Leg length = headSize × 3 = 99 */
    legLength: 3.0,
    /**
     * Gap between head and body top.
     * 0.15 is a middle ground - allows for slight bob animation.
     * Range in animations: 0.1 (compressed) to 0.2 (stretched)
     */
    neckGapRatio: 0.15,
  },

  /** Stroke widths as ratios */
  strokeRatios: {
    /** Body stroke = headSize × 0.787 ≈ 26 */
    body: 0.787,
    /** Arm stroke = bodyStroke / 3 (calculated from body) */
    armDivisor: 3,
    /** Leg stroke = bodyStroke / 2 (calculated from body) */
    legDivisor: 2,
  },

  /** Attachment and spacing */
  attachment: {
    /** Arms overlap body edge by armStroke / 6 for visual connection */
    armOverlapDivisor: 6,
    /** Small gap correction to prevent visual seams at leg join */
    legGapCorrection: 0.1,
  },

  /** Default container padding */
  containerPadding: {
    x: 100,
    y: 0,
  },
} as const

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface CharacterDimensions {
  // Base measurements
  headLength: number
  armLength: number
  bodyLength: number
  legLength: number
  neckGap: number

  // Stroke widths
  bodyStrokeWidth: number
  armStrokeWidth: number
  legStrokeWidth: number

  // Attachment offsets
  armXOverlap: number
  legGapCorrection: number

  // Character bounding box (without padding)
  characterWidth: number
  characterHeight: number

  // Container (with padding)
  containerPaddingX: number
  containerPaddingY: number
  containerWidth: number
  containerHeight: number

  // Positioning
  centerX: number

  // Animation factors
  xLegMovementFactor: number
}

export interface CharacterDimensionOptions {
  /** Override head size (default: 33) */
  headSize?: number
  /** Override container padding X (default: 100) */
  containerPaddingX?: number
  /** Override container padding Y (default: 0) */
  containerPaddingY?: number
  /** Override neck gap ratio for animations (default: 0.15) */
  neckGapRatio?: number
}

// =============================================================================
// CALCULATION FUNCTIONS
// =============================================================================

/**
 * Calculate all character dimensions from base config.
 *
 * @param options - Optional overrides for specific values
 * @returns Complete dimensions object with all calculated values
 *
 * @example
 * // Default dimensions
 * const dims = calculateDimensions()
 *
 * @example
 * // Smaller character
 * const smallDims = calculateDimensions({ headSize: 20 })
 *
 * @example
 * // Animation frame with compressed neck
 * const compressed = calculateDimensions({ neckGapRatio: 0.1 })
 */
export function calculateDimensions(
  options: CharacterDimensionOptions = {},
): CharacterDimensions {
  const {
    headSize = CHARACTER_BASE.headSize,
    containerPaddingX = CHARACTER_BASE.containerPadding.x,
    containerPaddingY = CHARACTER_BASE.containerPadding.y,
    neckGapRatio = CHARACTER_BASE.proportions.neckGapRatio,
  } = options

  const { proportions, strokeRatios, attachment } = CHARACTER_BASE

  // Calculate lengths from proportions
  const headLength = headSize
  const armLength = headSize * proportions.armLength
  const bodyLength = headSize * proportions.bodyLength
  const legLength = headSize * proportions.legLength
  const neckGap = headSize * neckGapRatio

  // Calculate stroke widths
  const bodyStrokeWidth = headSize * strokeRatios.body
  const armStrokeWidth = bodyStrokeWidth / strokeRatios.armDivisor
  const legStrokeWidth = bodyStrokeWidth / strokeRatios.legDivisor

  // Calculate attachment offsets
  const armXOverlap = armStrokeWidth / attachment.armOverlapDivisor
  const legGapCorrection = attachment.legGapCorrection

  // Calculate character bounding box (without padding)
  const characterWidth = bodyStrokeWidth + armStrokeWidth + armXOverlap * 2
  const characterHeight =
    headLength +
    neckGap +
    bodyLength +
    legLength +
    bodyStrokeWidth / 2 +
    legStrokeWidth / 2

  // Calculate container dimensions (with padding)
  const containerWidth = characterWidth + containerPaddingX * 2
  const containerHeight = characterHeight + containerPaddingY * 2

  // Calculate center position
  const centerX = characterWidth / 2 + containerPaddingX

  // Animation factor for leg movement
  const xLegMovementFactor = bodyStrokeWidth / 3

  return {
    headLength,
    armLength,
    bodyLength,
    legLength,
    neckGap,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
    armXOverlap,
    legGapCorrection,
    characterWidth,
    characterHeight,
    containerPaddingX,
    containerPaddingY,
    containerWidth,
    containerHeight,
    centerX,
    xLegMovementFactor,
  }
}

/**
 * Pre-calculated default dimensions for common use cases.
 * Use these when you don't need custom sizing.
 */
export const DEFAULT_DIMENSIONS = calculateDimensions()

/**
 * Display-only subset of dimensions for rendering components.
 * Used by AnimatedCharacter and similar display-only components.
 */
export const CHARACTER_DISPLAY = {
  containerWidth: DEFAULT_DIMENSIONS.containerWidth,
  containerHeight: DEFAULT_DIMENSIONS.containerHeight,
  headLength: DEFAULT_DIMENSIONS.headLength,
  bodyStrokeWidth: DEFAULT_DIMENSIONS.bodyStrokeWidth,
  armStrokeWidth: DEFAULT_DIMENSIONS.armStrokeWidth,
  legStrokeWidth: DEFAULT_DIMENSIONS.legStrokeWidth,
} as const

// =============================================================================
// ATTACHMENT POINT CALCULATIONS
// =============================================================================

export interface BodyPoints {
  start: Point2D // Top of body (shoulder level)
  mid: Point2D // Middle of body
  end: Point2D // Bottom of body (hip level)
}

/**
 * Calculate body attachment points from head position.
 *
 * The body starts below the head with a neck gap, and the stroke
 * is vertically centered on the path.
 */
export function calculateBodyPoints(
  headCenterX: number,
  headTopY: number,
  dims: CharacterDimensions = DEFAULT_DIMENSIONS,
): BodyPoints {
  const { headLength, neckGap, bodyStrokeWidth, bodyLength } = dims

  const bodyStartY = headTopY + headLength + neckGap + bodyStrokeWidth / 2

  return {
    start: { x: headCenterX, y: bodyStartY },
    mid: { x: headCenterX, y: bodyStartY + bodyLength / 2 },
    end: { x: headCenterX, y: bodyStartY + bodyLength },
  }
}

/**
 * Calculate arm shoulder attachment point from body position.
 *
 * Arms attach at the top of the body with slight overlap for visual connection.
 * @param side - 'left' (-1) or 'right' (+1)
 */
export function calculateShoulderPoint(
  bodyStartPoint: Point2D,
  side: "left" | "right",
  dims: CharacterDimensions = DEFAULT_DIMENSIONS,
): Point2D {
  const { bodyStrokeWidth, armStrokeWidth, armXOverlap } = dims
  const sideMultiplier = side === "right" ? 1 : -1

  return {
    x: bodyStartPoint.x + sideMultiplier * (bodyStrokeWidth / 2 + armXOverlap),
    y: bodyStartPoint.y - bodyStrokeWidth / 2 + armStrokeWidth,
  }
}

/**
 * Calculate leg hip attachment point from body position.
 *
 * Legs attach at the bottom of the body, with a small gap correction
 * to prevent visual seams.
 * @param side - 'left' (-1) or 'right' (+1)
 */
export function calculateHipPoint(
  bodyStartPoint: Point2D,
  side: "left" | "right",
  dims: CharacterDimensions = DEFAULT_DIMENSIONS,
): Point2D {
  const { legStrokeWidth, bodyLength, legGapCorrection } = dims
  const sideMultiplier = side === "right" ? 1 : -1

  return {
    x:
      bodyStartPoint.x +
      sideMultiplier * (legStrokeWidth / 2 - legGapCorrection),
    y: bodyStartPoint.y + bodyLength,
  }
}

// =============================================================================
// ROTATION UTILITIES
// =============================================================================

/**
 * Rotate a point around a center point by given degrees.
 * Used for pose transformations (pushing, celebration, etc.)
 *
 * @param point - Point to rotate
 * @param center - Center of rotation
 * @param degrees - Rotation angle (positive = clockwise)
 */
export function rotatePointAround<T extends Point2D>(
  point: T,
  center: Point2D,
  degrees: number,
): T {
  const angle = (degrees * Math.PI) / 180
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const dx = point.x - center.x
  const dy = point.y - center.y
  return {
    ...point,
    x: center.x + dx * cos + dy * sin,
    y: center.y - dx * sin + dy * cos,
  }
}

/**
 * Get a point at a given angle and distance from a center.
 * Used for calculating arm/leg segment positions.
 *
 * @param center - Starting point
 * @param angleDegrees - Angle from horizontal (0 = right, 90 = down)
 * @param distance - Distance from center
 */
export function getPointAtAngleAndDistance(
  center: Point2D,
  angleDegrees: number,
  distance: number,
): Point2D {
  const angleRadians = (angleDegrees * Math.PI) / 180
  return {
    x: center.x + Math.cos(angleRadians) * distance,
    y: center.y + Math.sin(angleRadians) * distance,
  }
}
