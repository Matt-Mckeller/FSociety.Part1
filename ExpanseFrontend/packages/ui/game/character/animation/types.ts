/**
 * Type definitions for the character animation system.
 * These types define poses, transitions, and animation configurations.
 */

export interface Point2D {
  x: number
  y: number
}

export interface ArcPoint extends Point2D {
  arcRadius?: number
  arcLargeFlag?: 0 | 1
  arcSweepFlag?: 0 | 1
}

/**
 * A set of 3 points defining a limb (start, mid, end)
 */
export type LimbPoints = [Point2D, Point2D, Point2D]

/**
 * A set of 3 arc points for legs (which use SVG arc commands)
 */
export type LegPoints = [ArcPoint, ArcPoint, ArcPoint]

/**
 * Complete definition of a character pose.
 * All body parts are defined as coordinate arrays.
 */
export interface CharacterPose {
  head: Point2D
  body: LimbPoints
  leftArm: LimbPoints
  rightArm: LimbPoints
  leftLeg: LegPoints
  rightLeg: LegPoints
}

/**
 * Pose with walking cycle keyframes for legs
 */
export interface WalkingPose extends CharacterPose {
  legCycleFrames: {
    leftLeg: LegPoints[]
    rightLeg: LegPoints[]
  }
}

/**
 * All available pose identifiers
 */
export type PoseId = 
  | 'facingForward'
  | 'pushingRight'
  | 'pushingRightHandsUp'
  | 'pushingRightHandsDown'
  | 'pushingRightEffortUp'
  | 'pushingRightLeanForward'
  | 'walkingRight'
  | 'celebration2'
  | 'celebrationAnticipation'
  | 'celebrationApex'

/**
 * Configuration for celebration animation
 */
export interface CelebrationConfig {
  /** Jump height in pixels (default: 71) */
  jumpHeight?: number
  /** Total celebration duration in seconds (default: 1.0) */
  duration?: number
  /** Whether to include anticipation crouch (default: true) */
  includeAnticipation?: boolean
  /** Number of bounces after landing (default: 1) */
  bounces?: number
}

/**
 * Arm animation mode during pushing
 */
export type ArmAnimationMode = 'hands' | 'effort' | 'none'

/**
 * Configuration for a secondary animation (e.g., hands oscillating)
 */
export interface SecondaryAnimationConfig {
  name: string
  /** Which body part to animate */
  target: 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg'
  /** Array of keyframe positions to cycle through */
  keyframes: LimbPoints[] | LegPoints[]
  /** Duration of one complete cycle in seconds */
  duration: number
  /** Number of repeats (-1 for infinite) */
  repeat: number
  /** Whether to reverse on alternate cycles */
  yoyo: boolean
  /** Easing function name */
  ease?: string
}

/**
 * Options for transitioning between poses
 */
export interface TransitionOptions {
  /** Duration in seconds */
  duration?: number
  /** GSAP easing string */
  ease?: string
  /** Callback when transition completes */
  onComplete?: () => void
  /** Per-limb timing overrides */
  limbTimings?: {
    head?: { delay?: number; duration?: number; ease?: string }
    body?: { delay?: number; duration?: number; ease?: string }
    leftArm?: { delay?: number; duration?: number; ease?: string }
    rightArm?: { delay?: number; duration?: number; ease?: string }
    leftLeg?: { delay?: number; duration?: number; ease?: string }
    rightLeg?: { delay?: number; duration?: number; ease?: string }
  }
}

/**
 * Current animation state exposed by the hook
 */
export interface CharacterAnimationState {
  /** Current interpolated head position */
  head: Point2D
  /** Current interpolated body points */
  body: LimbPoints
  /** Current interpolated left arm points */
  leftArm: LimbPoints
  /** Current interpolated right arm points */
  rightArm: LimbPoints
  /** Current interpolated left leg points */
  leftLeg: LegPoints
  /** Current interpolated right leg points */
  rightLeg: LegPoints
  /** Current pose identifier */
  currentPose: PoseId
  /** Whether a transition is in progress */
  isTransitioning: boolean
  /** Active secondary animation names */
  activeSecondaryAnimations: string[]
}

/**
 * Default transition timings for common pose changes
 */
export interface PoseTransitionDefaults {
  from: PoseId
  to: PoseId
  duration: number
  ease: string
  limbTimings?: TransitionOptions['limbTimings']
}
