/**
 * Named Anchors — Platform-Neutral
 * =================================
 * Logical attachment points on the character. Both renderers resolve these
 * to concrete coordinates (2D: SVG x/y; 3D: Vector3 in local model space),
 * so attachments (hats, badges, eyes, straps) reference a stable name rather
 * than hard-coded numbers.
 *
 * Positions are computed from the shared {@link calculateProportions} output,
 * keeping 2D and 3D attachment placement in lockstep regardless of head shape.
 */

import { calculateProportions, type ProportionOptions } from "./proportions"

/** Stable anchor names available on every 4eye, independent of silhouette. */
export const ANCHORS = [
  "headTop", // crown of the head — hats, antenna
  "headCenter", // geometric center of the head — eye, forehead mark
  "leftEye", // primary eye placement (single-eye design uses this)
  "rightEye", // secondary eye placement (dual-eye designs)
  "strapLeft", // where the strap wraps on the left
  "strapRight", // where the strap wraps on the right
  "chest", // center of the body trunk — badges
  "leftShoulder",
  "rightShoulder",
  "leftHip",
  "rightHip",
] as const

export type AnchorName = (typeof ANCHORS)[number]

/** A 2D anchor coordinate, origin at the head center. */
export interface AnchorPoint2D {
  x: number
  y: number
}

/**
 * Resolve all anchor coordinates in a head-centered local space (y-down to
 * match SVG; the 3D renderer flips y when mapping to world space).
 *
 * Anchors derive from the head's bounding circle and the trunk geometry, so
 * they are silhouette-independent: swapping the head shape does not move them.
 */
export function resolveAnchors(
  options: ProportionOptions = {},
): Record<AnchorName, AnchorPoint2D> {
  const p = calculateProportions(options)
  const headRadius = p.headLength / 2

  const headCenterY = 0
  const headTopY = headCenterY - headRadius
  const bodyTopY = headCenterY + headRadius + p.neckGap
  const bodyBottomY = bodyTopY + p.bodyLength
  const halfBody = p.bodyStrokeWidth / 2

  return {
    headTop: { x: 0, y: headTopY },
    headCenter: { x: 0, y: headCenterY },
    leftEye: { x: 0, y: headCenterY },
    rightEye: { x: 0, y: headCenterY },
    strapLeft: { x: -headRadius, y: headCenterY },
    strapRight: { x: headRadius, y: headCenterY },
    chest: { x: 0, y: (bodyTopY + bodyBottomY) / 2 },
    leftShoulder: { x: -halfBody, y: bodyTopY },
    rightShoulder: { x: halfBody, y: bodyTopY },
    leftHip: { x: -halfBody, y: bodyBottomY },
    rightHip: { x: halfBody, y: bodyBottomY },
  }
}
