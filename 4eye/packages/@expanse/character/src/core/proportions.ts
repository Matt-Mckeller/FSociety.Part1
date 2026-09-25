/**
 * Character Proportions — Platform-Neutral Source of Truth
 * ========================================================
 * Pure math, zero rendering dependencies (no MUI, no DOM, no Three.js).
 * Both the 2D SVG renderer and the 3D R3F renderer derive their geometry
 * from these exact values so the two stay dimensionally identical.
 *
 * Mirrors the canonical ratios from the original
 * `@expanse/brand-core/character/config/characterDimensions.ts`, lifted here
 * so React Native can consume them without pulling in any web-only code.
 *
 * All proportions derive from `headSize` (base unit = 33).
 */

/** Core character proportions. All derived values calculate from these ratios. */
export const CHARACTER_BASE = {
  /** Base unit — all proportions derive from this. */
  headSize: 33,

  /** Proportional multipliers relative to headSize. */
  proportions: {
    /** Arm length = headSize × 2 = 66 */
    armLength: 2.0,
    /** Body length = headSize × 3 = 99 */
    bodyLength: 3.0,
    /** Leg length = headSize × 3 = 99 */
    legLength: 3.0,
    /** Gap between head and body top (0.15 default; 0.1–0.2 in animations). */
    neckGapRatio: 0.15,
  },

  /** Stroke widths as ratios. */
  strokeRatios: {
    /** Body stroke = headSize × 0.787 ≈ 26 */
    body: 0.787,
    /** Arm stroke = bodyStroke / 3 ≈ 8.67 */
    armDivisor: 3,
    /** Leg stroke = bodyStroke / 2 ≈ 13 */
    legDivisor: 2,
  },

  /** Attachment and spacing. */
  attachment: {
    /** Arms overlap body edge by armStroke / 6 for visual connection. */
    armOverlapDivisor: 6,
    /** Small gap correction to prevent visual seams at leg join. */
    legGapCorrection: 0.1,
  },
} as const

export interface CharacterProportions {
  headLength: number
  armLength: number
  bodyLength: number
  legLength: number
  neckGap: number
  bodyStrokeWidth: number
  armStrokeWidth: number
  legStrokeWidth: number
  armXOverlap: number
}

export interface ProportionOptions {
  /** Override head size (default: 33). */
  headSize?: number
  /** Override neck gap ratio for animation frames (default: 0.15). */
  neckGapRatio?: number
}

/**
 * Compute the canonical character proportions from the base ratios.
 * Identical math to the brand-core 2D system so 2D and 3D match exactly.
 */
export function calculateProportions(
  options: ProportionOptions = {},
): CharacterProportions {
  const {
    headSize = CHARACTER_BASE.headSize,
    neckGapRatio = CHARACTER_BASE.proportions.neckGapRatio,
  } = options

  const { proportions, strokeRatios, attachment } = CHARACTER_BASE

  const headLength = headSize
  const armLength = headSize * proportions.armLength
  const bodyLength = headSize * proportions.bodyLength
  const legLength = headSize * proportions.legLength
  const neckGap = headSize * neckGapRatio

  const bodyStrokeWidth = headSize * strokeRatios.body
  const armStrokeWidth = bodyStrokeWidth / strokeRatios.armDivisor
  const legStrokeWidth = bodyStrokeWidth / strokeRatios.legDivisor

  const armXOverlap = armStrokeWidth / attachment.armOverlapDivisor

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
  }
}

/** Pre-computed default proportions (headSize = 33). */
export const DEFAULT_PROPORTIONS = calculateProportions()
