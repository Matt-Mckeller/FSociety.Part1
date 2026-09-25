/**
 * Character Type Definitions
 *
 * Central export point for all character system types.
 * Organized by domain for easier scanning and import.
 */

// Geometry - coordinate systems and point structures
export type { Point2D, ArcPoint, LimbPoints, LegPoints } from "./geometry"

// Poses - character position snapshots
export type { PoseId, CharacterPose, WalkingPose } from "./pose"

// Animation - transitions, state, and configuration
export type {
  TransitionOptions,
  PoseTransitionDefaults,
  CharacterAnimationState,
  CelebrationConfig,
  PushingMood,
  ArmAnimationMode,
  SecondaryAnimationConfig,
} from "./animation"

// Path - SVG path construction types
export type { PathCoordinates, ArcParameters, PathPointWithArc } from "./path"
