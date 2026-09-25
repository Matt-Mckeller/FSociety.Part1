/**
 * Character Animation System
 * 
 * Provides smooth GSAP-powered transitions between character poses
 * and support for layered secondary animations.
 * 
 * @example
 * ```tsx
 * import { useCharacterAnimation, AnimatedCharacter, POSES } from './animation'
 * 
 * function MyComponent() {
 *   const { state, transitionToPose, startWalking } = useCharacterAnimation()
 *   
 *   const handleStartPush = () => {
 *     transitionToPose('pushingRight', { duration: 0.4 })
 *     startWalking()
 *   }
 *   
 *   return <AnimatedCharacter animationState={state} />
 * }
 * ```
 */

// Types
export type {
  Point2D,
  ArcPoint,
  LimbPoints,
  LegPoints,
  CharacterPose,
  WalkingPose,
  PoseId,
  ArmAnimationMode,
  SecondaryAnimationConfig,
  TransitionOptions,
  CharacterAnimationState,
  PoseTransitionDefaults,
  CelebrationConfig,
} from './types'

// Pose registry
export {
  POSES,
  WALKING_CYCLES,
  DEFAULT_TRANSITIONS,
  getTransitionDefaults,
  CHARACTER_DISPLAY,
  // Skeletal attachment helpers
  getHeadAttachment,
  getShoulderAttachment,
  getHipAttachment,
  getPoseAttachmentConfig,
  translateLimb,
  getAttachmentDelta,
} from './poseRegistry'

// Animation hook
export {
  useCharacterAnimation,
  type UseCharacterAnimationOptions,
  type UseCharacterAnimationReturn,
} from './useCharacterAnimation'

// Components
export { AnimatedCharacter } from './AnimatedCharacter'
