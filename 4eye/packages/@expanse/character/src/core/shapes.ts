/**
 * Part Shape Tokens — Platform-Neutral Vocabulary
 * ================================================
 * A shape token is a renderer-agnostic name for a part silhouette. Each
 * renderer resolves the same token its own way:
 *   - 2D (SVG):   token → an <svg> element / path
 *   - 3D (Three): token → a geometry (sphere, box, extruded shape, …)
 *
 * The token only changes the OUTLINE of a part. All anchors, proportions,
 * eye placement, and strap wrapping reference the part's bounding
 * circle/center, so any head shape combines cleanly with any eye + strap
 * in both 2D and 3D, and joints never break.
 */

/** Swappable head silhouettes (v1 set). */
export const HEAD_SHAPES = [
  "circle", // default — Sphere in 3D
  "triangle",
  "square",
  "diamond",
  "shield",
  "capsule",
  "heart",
  "present",
] as const

export type HeadShape = (typeof HEAD_SHAPES)[number]

/** Swappable body silhouettes (reserved for a later pass; circle = default trunk). */
export const BODY_SHAPES = ["circle", "square", "capsule"] as const
export type BodyShape = (typeof BODY_SHAPES)[number]

/** Swappable limb silhouettes (reserved for a later pass; circle = default capsule limb). */
export const LIMB_SHAPES = ["circle", "square", "capsule"] as const
export type LimbShape = (typeof LIMB_SHAPES)[number]

/** The full set of shape tokens that describe a character's silhouette. */
export interface CharacterShapes {
  head: HeadShape
  body: BodyShape
  limbs: LimbShape
}

/** Default silhouette: the classic round 4eye. */
export const DEFAULT_SHAPES: CharacterShapes = {
  head: "circle",
  body: "circle",
  limbs: "circle",
}
