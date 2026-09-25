/**
 * Pose Type Definitions
 *
 * Types for defining character poses - complete snapshots
 * of the character's body position at a given moment.
 */

import type { Point2D, LimbPoints, LegPoints } from "../geometry/points"

/**
 * All available pose identifiers.
 * Each represents a named position the character can assume.
 */
export type PoseId =
  | "facingForward"
  | "pushingRight"
  | "pushingRightHandsUp"
  | "pushingRightHandsDown"
  | "pushingRightEffortUp"
  | "pushingRightEffort"
  | "walkingRight"
  | "celebration"
  | "celebrationAnticipation"
  | "celebrationApex"

/**
 * Complete definition of a character pose.
 * Contains all body part positions needed to render the character.
 *
 * Each pose is a snapshot - the complete state of the character
 * at a single moment in time.
 */
export interface CharacterPose {
  /** Head center position */
  head: Point2D
  /** Body positions [top, middle, bottom] */
  body: LimbPoints
  /** Left arm positions [shoulder, elbow, hand] */
  leftArm: LimbPoints
  /** Right arm positions [shoulder, elbow, hand] */
  rightArm: LimbPoints
  /** Left leg positions with arc data */
  leftLeg: LegPoints
  /** Right leg positions with arc data */
  rightLeg: LegPoints
}

/**
 * Pose with walking cycle keyframes for legs.
 * Extends CharacterPose with animation frame data.
 */
export interface WalkingPose extends CharacterPose {
  /** Frame sequences for leg animation during walking */
  legCycleFrames: {
    leftLeg: LegPoints[]
    rightLeg: LegPoints[]
  }
}
