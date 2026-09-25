/**
 * Character System Type Definitions
 *
 * Re-exports from organized types/ folder.
 * Import from here or directly from './types/' for same result.
 *
 * @see ./types/geometry.ts - Point2D, ArcPoint, LimbPoints, LegPoints
 * @see ./types/pose.ts - PoseId, CharacterPose, WalkingPose
 * @see ./types/animation.ts - TransitionOptions, CharacterAnimationState, etc.
 * @see ./types/path.ts - PathCoordinates, ArcParameters
 */

export type {
  // Geometry
  Point2D,
  ArcPoint,
  LimbPoints,
  LegPoints,
  // Poses
  PoseId,
  CharacterPose,
  WalkingPose,
  // Animation
  TransitionOptions,
  PoseTransitionDefaults,
  CharacterAnimationState,
  CelebrationConfig,
  PushingMood,
  ArmAnimationMode,
  SecondaryAnimationConfig,
  // Path
  PathCoordinates,
  ArcParameters,
  PathPointWithArc,
} from "./types/index"

/**
 * Character state enum for StaticCharacter component
 * @deprecated Use PoseId string type instead
 */
export enum CharacterState {
  forwardStanding = "forwardStanding",
  rightPushing = "pushingRight",
  leftStanding = "leftStanding",
  rightStanding = "rightStanding",
  celebration1 = "celebration1",
  celebration2 = "celebration2",
}
