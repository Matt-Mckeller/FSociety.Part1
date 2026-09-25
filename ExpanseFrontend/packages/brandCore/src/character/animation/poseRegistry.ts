/**
 * Pose registry - central source of all character pose definitions.
 * Wraps existing calculatePositions.ts and adds new pose variants.
 */

import { calculatePositions } from "../calculatePositions"
import type {
  CharacterPose,
  PoseId,
  LimbPoints,
  LegPoints,
  PoseTransitionDefaults,
  Point2D,
} from "./types"

// Get base poses from existing system
const positions = calculatePositions()

/**
 * Convert existing pose format to standardized CharacterPose
 */
function convertToPose(
  head: { x: number; y: number },
  body: any[],
  leftArm: any[],
  rightArm: any[],
  leftLeg: any,
  rightLeg: any,
): CharacterPose {
  return {
    head,
    body: body as LimbPoints,
    leftArm: leftArm as LimbPoints,
    rightArm: rightArm as LimbPoints,
    // For walking poses, take the first frame; for static, use as-is
    leftLeg: (Array.isArray(leftLeg[0]) ? leftLeg[0] : leftLeg) as LegPoints,
    rightLeg: (Array.isArray(rightLeg[0])
      ? rightLeg[0]
      : rightLeg) as LegPoints,
  }
}

/**
 * Create a pushing pose variant with hands shifted vertically
 * @param yOffset - negative = hands up, positive = hands down
 */
function createPushingVariant(yOffset: number): CharacterPose {
  const base = positions.pushingRight
  const pose = convertToPose(
    base.head,
    base.body,
    base.leftArm,
    base.rightArm,
    base.leftLeg,
    base.rightLeg,
  )

  // Shift arm endpoint (hands) by yOffset
  return {
    ...pose,
    leftArm: [
      pose.leftArm[0],
      { x: pose.leftArm[1].x, y: pose.leftArm[1].y + yOffset * 0.5 },
      { x: pose.leftArm[2].x, y: pose.leftArm[2].y + yOffset },
    ] as LimbPoints,
    rightArm: [
      pose.rightArm[0],
      { x: pose.rightArm[1].x, y: pose.rightArm[1].y + yOffset * 0.5 },
      { x: pose.rightArm[2].x, y: pose.rightArm[2].y + yOffset },
    ] as LimbPoints,
  }
}

/**
 * Rotate a point around a center point by given degrees
 */
function rotatePoint(
  point: Point2D,
  center: Point2D,
  degrees: number,
): Point2D {
  const angle = (degrees * Math.PI) / 180
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const dx = point.x - center.x
  const dy = point.y - center.y
  return {
    x: center.x + dx * cos - dy * sin,
    y: center.y + dx * sin + dy * cos,
  }
}

/**
 * Create a forward lean pushing pose variant for effort animation.
 * Body rotates forward around hip, head follows, hands stay fixed on bar.
 * Creates natural "pushing with effort" appearance with arms angling up-right.
 *
 * @param leanDegrees - forward lean angle (positive = lean forward)
 */
function createForwardLeanPushingVariant(leanDegrees: number): CharacterPose {
  const base = positions.pushingRight
  const pose = convertToPose(
    base.head,
    base.body,
    base.leftArm,
    base.rightArm,
    base.leftLeg,
    base.rightLeg,
  )

  // Pivot point is the hip (body[2])
  const pivot = pose.body[2]

  // Rotate body points around hip
  const rotatedBody: LimbPoints = [
    rotatePoint(pose.body[0], pivot, leanDegrees),
    rotatePoint(pose.body[1], pivot, leanDegrees),
    pose.body[2], // Hip stays fixed
  ]

  // Rotate head around hip
  const rotatedHead = rotatePoint(pose.head, pivot, leanDegrees)

  // Rotate arm shoulder points (follow body rotation)
  const leftShoulderRotated = rotatePoint(pose.leftArm[0], pivot, leanDegrees)
  const rightShoulderRotated = rotatePoint(pose.rightArm[0], pivot, leanDegrees)

  // Hands stay fixed at bar position
  const leftHand = pose.leftArm[2]
  const rightHand = pose.rightArm[2]

  // Calculate elbow position to connect shoulder to hand
  // Position elbow below the midpoint to create "up and to the right" forearm angle
  const leftMid = {
    x: (leftShoulderRotated.x + leftHand.x) / 2,
    y: (leftShoulderRotated.y + leftHand.y) / 2,
  }
  const rightMid = {
    x: (rightShoulderRotated.x + rightHand.x) / 2,
    y: (rightShoulderRotated.y + rightHand.y) / 2,
  }

  // Push elbow down and slightly back to create upward forearm angle
  // This makes the arm look more natural for pushing
  const elbowDropY = 8 + leanDegrees * 0.5 // More drop when leaning more
  const elbowBackX = -3 // Slight backward offset

  const leftElbow: Point2D = {
    x: leftMid.x + elbowBackX,
    y: leftMid.y + elbowDropY,
  }
  const rightElbow: Point2D = {
    x: rightMid.x + elbowBackX,
    y: rightMid.y + elbowDropY,
  }

  return {
    head: rotatedHead,
    body: rotatedBody,
    leftArm: [leftShoulderRotated, leftElbow, leftHand] as LimbPoints,
    rightArm: [rightShoulderRotated, rightElbow, rightHand] as LimbPoints,
    leftLeg: pose.leftLeg,
    rightLeg: pose.rightLeg,
  }
}

/**
 * Create a pushing pose variant for effort animation (legacy - vertical bob)
 * Elbows move up to compensate for body bobbing - hands stay exactly stationary
 * @param elbowOffset - how much elbows bend up (negative = up)
 * @deprecated Use createForwardLeanPushingVariant instead
 */
function createEffortPushingVariant(elbowOffset: number): CharacterPose {
  const base = positions.pushingRight
  const pose = convertToPose(
    base.head,
    base.body,
    base.leftArm,
    base.rightArm,
    base.leftLeg,
    base.rightLeg,
  )

  // Elbows bend up, hands stay at EXACT same position (0% offset)
  return {
    ...pose,
    leftArm: [
      pose.leftArm[0],
      { x: pose.leftArm[1].x, y: pose.leftArm[1].y + elbowOffset },
      pose.leftArm[2], // Hands don't move
    ] as LimbPoints,
    rightArm: [
      pose.rightArm[0],
      { x: pose.rightArm[1].x, y: pose.rightArm[1].y + elbowOffset },
      pose.rightArm[2], // Hands don't move
    ] as LimbPoints,
  }
}

/**
 * Create celebration anticipation pose - slight crouch before jump
 * Body compresses, knees bend, arms prepare
 */
function createCelebrationAnticipation(): CharacterPose {
  const base = positions.celebration2
  const pose = convertToPose(
    base.head,
    base.body,
    base.leftArm,
    base.rightArm,
    base.leftLeg,
    base.rightLeg,
  )

  // Compress body - lower the head and upper body
  const crouchAmount = 8
  return {
    head: { x: pose.head.x, y: pose.head.y + crouchAmount },
    body: [
      { x: pose.body[0].x, y: pose.body[0].y + crouchAmount },
      { x: pose.body[1].x, y: pose.body[1].y + crouchAmount * 0.5 },
      pose.body[2], // Hip stays anchored
    ] as LimbPoints,
    // Arms lower and closer to body - preparing to swing up
    leftArm: [
      { x: pose.leftArm[0].x, y: pose.leftArm[0].y + crouchAmount },
      { x: pose.leftArm[0].x - 15, y: pose.leftArm[0].y + 30 },
      { x: pose.leftArm[0].x - 25, y: pose.leftArm[0].y + 55 },
    ] as LimbPoints,
    rightArm: [
      { x: pose.rightArm[0].x, y: pose.rightArm[0].y + crouchAmount },
      { x: pose.rightArm[0].x + 15, y: pose.rightArm[0].y + 30 },
      { x: pose.rightArm[0].x + 25, y: pose.rightArm[0].y + 55 },
    ] as LimbPoints,
    // Legs bend - knees move outward
    leftLeg: [
      pose.leftLeg[0],
      {
        x: pose.leftLeg[0].x - 15,
        y: pose.leftLeg[1].y - 10,
        arcRadius: 40,
        arcSweepFlag: 1,
        arcLargeFlag: 0,
      },
      {
        x: pose.leftLeg[2].x - 5,
        y: pose.leftLeg[2].y + crouchAmount,
        arcRadius: 40,
        arcSweepFlag: 1,
        arcLargeFlag: 0,
      },
    ] as LegPoints,
    rightLeg: [
      pose.rightLeg[0],
      {
        x: pose.rightLeg[0].x + 15,
        y: pose.rightLeg[1].y - 10,
        arcRadius: 40,
        arcSweepFlag: 0,
        arcLargeFlag: 0,
      },
      {
        x: pose.rightLeg[2].x + 5,
        y: pose.rightLeg[2].y + crouchAmount,
        arcRadius: 40,
        arcSweepFlag: 0,
        arcLargeFlag: 0,
      },
    ] as LegPoints,
  }
}

/**
 * Create celebration apex pose - peak of celebratory jump
 * Both arms raised high in V shape, legs tucked
 */
function createCelebrationApex(): CharacterPose {
  const base = positions.facingForward
  const pose = convertToPose(
    base.head,
    base.body,
    base.leftArm,
    base.rightArm,
    base.leftLeg,
    base.rightLeg,
  )

  // At apex, body is straight and arms are in triumphant V
  return {
    head: pose.head,
    body: pose.body,
    // Both arms raised in symmetric V shape
    leftArm: [
      pose.leftArm[0], // Shoulder
      { x: pose.leftArm[0].x - 25, y: pose.leftArm[0].y - 30 }, // Elbow up-left
      { x: pose.leftArm[0].x - 45, y: pose.leftArm[0].y - 55 }, // Hand high up-left
    ] as LimbPoints,
    rightArm: [
      pose.rightArm[0], // Shoulder
      { x: pose.rightArm[0].x + 25, y: pose.rightArm[0].y - 30 }, // Elbow up-right
      { x: pose.rightArm[0].x + 45, y: pose.rightArm[0].y - 55 }, // Hand high up-right
    ] as LimbPoints,
    // Legs tucked - bent at knees, feet lifted
    // Left leg bends outward-left with consistent clockwise arcs
    leftLeg: [
      pose.leftLeg[0], // Hip
      {
        x: pose.leftLeg[0].x - 18,
        y: pose.leftLeg[0].y + 40,
        arcRadius: 45,
        arcSweepFlag: 1,
        arcLargeFlag: 0,
      },
      {
        x: pose.leftLeg[0].x - 8,
        y: pose.leftLeg[0].y + 65,
        arcRadius: 35,
        arcSweepFlag: 1,
        arcLargeFlag: 0,
      },
    ] as LegPoints,
    // Right leg bends outward-right with consistent counter-clockwise arcs
    rightLeg: [
      pose.rightLeg[0], // Hip
      {
        x: pose.rightLeg[0].x + 18,
        y: pose.rightLeg[0].y + 40,
        arcRadius: 45,
        arcSweepFlag: 0,
        arcLargeFlag: 0,
      },
      {
        x: pose.rightLeg[0].x + 8,
        y: pose.rightLeg[0].y + 65,
        arcRadius: 35,
        arcSweepFlag: 0,
        arcLargeFlag: 0,
      },
    ] as LegPoints,
  }
}

/**
 * All available poses indexed by ID
 */
export const POSES: Record<PoseId, CharacterPose> = {
  facingForward: convertToPose(
    positions.facingForward.head,
    positions.facingForward.body,
    positions.facingForward.leftArm,
    positions.facingForward.rightArm,
    positions.facingForward.leftLeg,
    positions.facingForward.rightLeg,
  ),

  pushingRight: convertToPose(
    positions.pushingRight.head,
    positions.pushingRight.body,
    positions.pushingRight.leftArm,
    positions.pushingRight.rightArm,
    positions.pushingRight.leftLeg,
    positions.pushingRight.rightLeg,
  ),

  pushingRightHandsUp: createPushingVariant(-12),

  pushingRightHandsDown: createPushingVariant(12),

  // Effort pose: elbows bent up to compensate for body bob (hands stay stationary)
  pushingRightEffortUp: createEffortPushingVariant(-8),

  // Forward lean pose: body leans forward, arms angle up-right (effort effect)
  pushingRightLeanForward: createForwardLeanPushingVariant(6),

  walkingRight: convertToPose(
    positions.walkingRight.head,
    positions.walkingRight.body,
    positions.walkingRight.leftArm,
    positions.walkingRight.rightArm,
    positions.walkingRight.leftLeg,
    positions.walkingRight.rightLeg,
  ),

  celebration2: convertToPose(
    positions.celebration2.head,
    positions.celebration2.body,
    positions.celebration2.leftArm,
    positions.celebration2.rightArm,
    positions.celebration2.leftLeg,
    positions.celebration2.rightLeg,
  ),

  // Celebration anticipation - crouch before jump
  celebrationAnticipation: createCelebrationAnticipation(),

  // Celebration apex - peak of jump with arms raised
  celebrationApex: createCelebrationApex(),
}

/**
 * Walking leg cycle keyframes for poses that support walking
 */
export const WALKING_CYCLES: Partial<
  Record<PoseId, { leftLeg: LegPoints[]; rightLeg: LegPoints[] }>
> = {
  pushingRight: {
    leftLeg: positions.pushingRight.leftLeg as unknown as LegPoints[],
    rightLeg: positions.pushingRight.rightLeg as unknown as LegPoints[],
  },
  walkingRight: {
    leftLeg: positions.walkingRight.leftLeg as unknown as LegPoints[],
    rightLeg: positions.walkingRight.rightLeg as unknown as LegPoints[],
  },
}

/**
 * Default transition configurations between poses
 */
export const DEFAULT_TRANSITIONS: PoseTransitionDefaults[] = [
  {
    from: "facingForward",
    to: "pushingRight",
    duration: 0.4,
    ease: "power2.inOut",
    limbTimings: {
      body: { duration: 0.3 },
      leftArm: { delay: 0.1 },
      rightArm: { delay: 0.1 },
    },
  },
  {
    from: "pushingRight",
    to: "walkingRight",
    duration: 0.3,
    ease: "power1.out",
  },
  {
    from: "walkingRight",
    to: "celebration2",
    duration: 0.5,
    ease: "power2.out",
  },
  {
    from: "celebration2",
    to: "facingForward",
    duration: 0.4,
    ease: "power1.inOut",
  },
]

/**
 * Get transition defaults for a specific pose change
 */
export function getTransitionDefaults(
  from: PoseId,
  to: PoseId,
): PoseTransitionDefaults | undefined {
  return DEFAULT_TRANSITIONS.find((t) => t.from === from && t.to === to)
}

/**
 * Character display properties from existing system
 */
export const CHARACTER_DISPLAY = {
  containerPaddingX: positions.containerPaddingX,
  containerPaddingY: positions.containerPaddingY,
  containerWidth: positions.containerWidth,
  containerHeight: positions.containerHeight,
  headLength: positions.headLength,
  bodyStrokeWidth: positions.bodyStrokeWidth,
  armStrokeWidth: positions.armStrokeWidth,
  legStrokeWidth: positions.legStrokeWidth,
}

// ============================================================================
// SKELETAL ATTACHMENT SYSTEM
// ============================================================================

/**
 * Constants for calculating attachment points.
 * These are derived from the same values used in calculatePositions.ts
 */
const headLength = positions.headLength
const bodyStrokeWidth = positions.bodyStrokeWidth
const armStrokeWidth = positions.armStrokeWidth
const legStrokeWidth = positions.legStrokeWidth
const neckGap = headLength * 0.2
const armXOverlap = armStrokeWidth / 6

/**
 * Calculate where the head should be attached relative to the body.
 * Head center is positioned above body[0] with a neck gap.
 */
export function getHeadAttachment(body: LimbPoints): Point2D {
  return {
    x: body[0].x,
    y: body[0].y - bodyStrokeWidth / 2 - neckGap - headLength / 2,
  }
}

/**
 * Calculate where a shoulder (arm start point) should attach to the body.
 * Shoulders attach at body[0] with horizontal offset.
 */
export function getShoulderAttachment(
  body: LimbPoints,
  side: "left" | "right",
): Point2D {
  const bodyTop = body[0]
  const shoulderOffsetX =
    (bodyStrokeWidth / 2 + armXOverlap) * (side === "left" ? -1 : 1)
  const shoulderOffsetY = -bodyStrokeWidth / 2 + armStrokeWidth
  return {
    x: bodyTop.x + shoulderOffsetX,
    y: bodyTop.y + shoulderOffsetY,
  }
}

/**
 * Calculate where a hip (leg start point) should attach to the body.
 * Hips attach at body[2] (bottom of torso) with horizontal offset.
 */
export function getHipAttachment(
  body: LimbPoints,
  side: "left" | "right",
): Point2D {
  const bodyBottom = body[2]
  const hipOffsetX =
    (legStrokeWidth / 2) * (side === "left" ? -1 : 1) +
    (side === "left" ? 0.1 : -0.1)
  return {
    x: bodyBottom.x + hipOffsetX,
    y: bodyBottom.y,
  }
}

/**
 * Configuration for how limbs attach in different poses.
 * Some poses (like pushing) merge the shoulder attachment points.
 */
export interface AttachmentConfig {
  /** Whether arms use separate shoulder points or merge to a single point */
  shoulderMode: "separate" | "merged"
  /** For merged mode: offset of the merged shoulder from body[0] */
  mergedShoulderOffset?: Point2D
}

/**
 * Get attachment configuration for a specific pose
 */
export function getPoseAttachmentConfig(poseId: PoseId): AttachmentConfig {
  switch (poseId) {
    case "pushingRight":
    case "pushingRightHandsUp":
    case "pushingRightHandsDown":
    case "walkingRight":
      // In pushing/walking poses, both arms share a merged shoulder point
      // The merged point is calculated from the rotated body position
      return {
        shoulderMode: "merged",
        // We'll calculate the actual merged point from the current pose
      }
    case "facingForward":
    case "celebration2":
    default:
      return { shoulderMode: "separate" }
  }
}

/**
 * Translate all points in a limb by a delta (used to enforce attachment)
 */
export function translateLimb<T extends Point2D>(
  limb: T[],
  delta: Point2D,
): T[] {
  return limb.map((p) => ({
    ...p,
    x: p.x + delta.x,
    y: p.y + delta.y,
  })) as T[]
}

/**
 * Calculate the delta needed to attach a limb to its expected attachment point.
 * Returns the offset needed to move limb[0] to expectedAttachment.
 */
export function getAttachmentDelta(
  limbStart: Point2D,
  expectedAttachment: Point2D,
): Point2D {
  return {
    x: expectedAttachment.x - limbStart.x,
    y: expectedAttachment.y - limbStart.y,
  }
}
