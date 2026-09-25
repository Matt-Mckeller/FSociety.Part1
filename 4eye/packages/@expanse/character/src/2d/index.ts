/**
 * Character Animation System (2D)
 *
 * A comprehensive system for the 2D character figure, poses and animations.
 *
 * ## Folder Structure
 *
 * - `figure/`    - The Character4eye figure component
 * - `animation/` - Animation hooks, runtime state, pose registry + types
 * - `geometry/`  - Coordinate types, dimensions, position + SVG path math
 * - `theming/`   - MUI theme bridge for character face/variants
 * - `anatomy/`   - Per-part anatomy registry
 * - `parts/`     - Eyes, straps, decorations, defs
 * - `profile/`   - ProfilePhoto / ProfileFrame avatar components
 * - `stories/`   - Storybook documentation and galleries
 */

// =============================================================================
// FIGURE COMPONENT
// =============================================================================

export {
  Character4eye,
  type Character4eyeProps,
  type Character4eyeVariant,
  type Character4eyeControls,
  type EyeDesign,
  type StrapStyle,
  type Character4eyeMood,
} from "./figure"

// =============================================================================
// PROFILE COMPONENTS
// =============================================================================

export {
  // ProfilePhoto
  ProfilePhoto,
  getViewBoxForZoom,
  type ProfilePhotoProps,
  type ProfileZoom,
  type ProfileBorder,
  type ViewBoxConfig,
  // ProfileFrame (Tiered Gamification Borders)
  ProfileFrame,
  TierBadge,
  TIER_NAMES,
  TIER_DESCRIPTIONS,
  TIER_CONFIGS,
  getTierDecorativePadding,
  type ProfileFrameProps,
  type TierLevel,
  type TierConfig,
  type ThemeColorKey,
} from "./profile"

// =============================================================================
// GEOMETRY (dimensions, positions, paths)
// =============================================================================

export {
  // Base configuration
  CHARACTER_BASE,
  DEFAULT_DIMENSIONS,
  CHARACTER_DISPLAY,
  // Dimension calculators
  calculateDimensions,
  calculateBodyPoints,
  calculateShoulderPoint,
  calculateHipPoint,
  // Geometry utilities
  rotatePointAround,
  getPointAtAngleAndDistance,
  // Types
  type CharacterDimensions,
  type CharacterDimensionOptions,
  type BodyPoints,
} from "./geometry"

// =============================================================================
// ANIMATION SYSTEM
// =============================================================================

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

// =============================================================================
// ANATOMY REGISTRY
// =============================================================================

export {
  useCharacterAnatomy,
  type CharacterAnatomy,
  type CharacterAnatomyMap,
  type CharacterPart,
} from "./anatomy"

// =============================================================================
// PRESETS
// =============================================================================

export { PRESETS, getPreset, getPresetNames, createPreset } from "./presets"
export type {
  PushingProgressPreset,
  PushPhaseConfig,
  WalkPhaseConfig,
  CelebrationPhaseConfig,
} from "./presets"

// =============================================================================
// TYPES
// =============================================================================

// Geometry & path types
export type {
  Point2D,
  ArcPoint,
  LimbPoints,
  LegPoints,
  PathCoordinates,
  ArcParameters,
  PathPointWithArc,
} from "./geometry"

// Pose types
export type { PoseId, CharacterPose, WalkingPose } from "./animation/poses"

// Animation types
export type {
  TransitionOptions,
  CharacterAnimationState,
  CelebrationConfig,
  PushingMood,
  ArmAnimationMode, // deprecated
  SecondaryAnimationConfig,
  PoseTransitionDefaults,
} from "./animation/types"

// =============================================================================
// UTILITIES
// =============================================================================

export { getCharacterPathData, calculatePositions } from "./geometry"
export {
  CharacterPositionContext,
  CharacterPositionProvider,
} from "./CharacterPositionContext"

// =============================================================================
// PERSONAS (preset Character4eye prop combinations)
// =============================================================================

export {
  CHARACTER_PERSONAS,
  type CharacterPersona,
  type PersonaKey,
} from "./personas"

// =============================================================================
// PUSHING PROGRESS (character pushing a progress bar)
// =============================================================================

export {
  PushingProgressCharacter,
  type PushingProgressCharacterProps,
  ProgressBar,
} from "./progress"

// =============================================================================
// MASCOT (landing-page character wrappers)
// =============================================================================

export {
  FourEyeMascot,
  type FourEyeMascotProps,
  type FourEyeMascotHandle,
  MascotSlot,
  type MascotSlotProps,
  HOME_MASCOT_SIZE,
} from "./mascot"
