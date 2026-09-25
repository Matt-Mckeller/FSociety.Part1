/**
 * Character animation components and utilities
 */

// Static character components
export { CharacterForwardStanding } from "./CharacterForwardStanding"
export type { CharacterForwardStandingProps } from "./CharacterForwardStanding"
export { CharacterLeftStanding } from "./CharacterLeftStanding"
export { CharacterRightStanding } from "./CharacterRightStanding"
export type { CharacterSideStandingProps } from "./CharacterLeftStanding"
export { CharacterCelebration1 } from "./CharacterCelebration1"
export { CharacterCelebration2 } from "./CharacterCelebration2"
export type { CharacterCelebrationProps } from "./CharacterCelebration1"

// Character variants
export { ContactUsCharacter } from "./ContactUsCharacter"
export type { ContactUsCharacterProps } from "./ContactUsCharacter"
export { ContactUsCharacterUnified } from "./ContactUsCharacterUnified"
export type { ContactUsCharacterUnifiedProps } from "./ContactUsCharacterUnified"

// Configuration system
export {
  CHARACTER_BASE,
  DEFAULT_DIMENSIONS,
  CHARACTER_DISPLAY,
  calculateDimensions,
  calculateBodyPoints,
  calculateShoulderPoint,
  calculateHipPoint,
  rotatePointAround,
  getPointAtAngleAndDistance,
} from "./config"
export type {
  CharacterDimensions,
  CharacterDimensionOptions,
  BodyPoints,
} from "./config"

// Components - re-exported from components folder
export { PushingProgressCharacter } from "../components/PushingProgress"
export type { PushingProgressCharacterProps } from "../components/PushingProgress"

// Animation system
export { useCharacterAnimation } from "./animation/useCharacterAnimation"
export type {
  UseCharacterAnimationOptions,
  UseCharacterAnimationReturn,
} from "./animation/useCharacterAnimation"
export { AnimatedCharacter } from "./animation/AnimatedCharacter"
export {
  POSES,
  WALKING_CYCLES,
  getTransitionDefaults,
} from "./animation/poseRegistry"

// Presets
export { PRESETS, getPreset, getPresetNames, createPreset } from "./presets"
export type {
  PushingProgressPreset,
  PushPhaseConfig,
  WalkPhaseConfig,
  CelebrationPhaseConfig,
} from "./presets"

// Types
export type {
  CharacterPose,
  CharacterAnimationState,
  PoseId,
  PushingMood,
  ArmAnimationMode, // deprecated
  CelebrationConfig,
  TransitionOptions,
  SecondaryAnimationConfig,
  Point2D,
  ArcPoint,
  LimbPoints,
  LegPoints,
} from "./animation/types"

// Static characters
export { CharacterForwardStanding } from "./CharacterForwardStanding"
export { CharacterLeftStanding } from "./CharacterLeftStanding"
export { CharacterRightStanding } from "./CharacterRightStanding"
export { CharacterCelebration1 } from "./CharacterCelebration1"
export { CharacterCelebration2 } from "./CharacterCelebration2"
export { CharacterAll } from "./CharacterAll"
