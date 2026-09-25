/**
 * Animation Type Definitions
 *
 * Types for animation configuration, transitions,
 * and runtime animation state.
 */

import type { Point2D, LimbPoints, LegPoints } from "./geometry"
import type { PoseId } from "./pose"

// =============================================================================
// TRANSITION CONFIGURATION
// =============================================================================

/**
 * Options for transitioning between poses.
 * Controls the timing and easing of pose changes.
 */
export interface TransitionOptions {
  /** Duration in seconds (default: 0.3) */
  duration?: number
  /** GSAP easing string (default: 'power2.out') */
  ease?: string
  /** Delay before starting (default: 0) */
  delay?: number
  /** Callback when transition completes */
  onComplete?: () => void
  /** Per-limb timing overrides for staggered animations */
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
 * Default transition settings by pose pair.
 * Defines optimal timing for specific pose transitions.
 */
export interface PoseTransitionDefaults {
  from: PoseId
  to: PoseId
  duration: number
  ease: string
  limbTimings?: TransitionOptions["limbTimings"]
}

// =============================================================================
// ANIMATION STATE
// =============================================================================

/**
 * Current animation state exposed by useCharacterAnimation hook.
 * Contains interpolated positions during transitions.
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

// =============================================================================
// CELEBRATION CONFIGURATION
// =============================================================================

/**
 * Configuration for celebration animation sequence.
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

// =============================================================================
// MOOD & BEHAVIOR
// =============================================================================

/**
 * Pushing mood - emotional state during push phase.
 * Affects body language, pacing, and secondary animations.
 */
export type PushingMood =
  | "steady" // Calm, confident push - minimal secondary motion
  | "determined" // Focused intensity - slight forward lean, firm positioning
  | "eager" // Excited, energetic - faster pace, bouncy feel
  | "struggling" // Tired, effortful - slower pace, occasional strain
  | "casual" // Relaxed, easy - loose body language, gentle sway

/**
 * @deprecated Use PushingMood instead
 */
export type ArmAnimationMode = "hands" | "effort" | "none"

// =============================================================================
// SECONDARY ANIMATIONS
// =============================================================================

/**
 * Configuration for a secondary animation overlay.
 * Used for continuous animations like hand gestures or breathing.
 */
export interface SecondaryAnimationConfig {
  name: string
  /** Which body part to animate */
  target: "leftArm" | "rightArm" | "leftLeg" | "rightLeg"
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
