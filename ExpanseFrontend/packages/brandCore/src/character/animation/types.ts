/**
 * Animation Type Definitions
 *
 * Re-exports from central types/ folder for backward compatibility.
 * New code should import from '../types/' directly.
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
} from "../types/index"
