/**
 * GSAP animation configuration
 */
export interface AnimationConfig {
  /** Duration for expand animation in seconds */
  expandDuration: number
  /** Duration for collapse animation in seconds */
  collapseDuration: number
  /** Delay between bars appearing in seconds */
  staggerDelay: number
  /** GSAP easing for expand */
  easeExpand: string
  /** GSAP easing for collapse */
  easeCollapse: string
}

/**
 * Extended animation config for ProfileStatusDisplay
 * Includes additional fill/color animation settings
 */
export interface ProfileAnimationConfig extends AnimationConfig {
  /** Initial fill opacity when expanding (0-1) */
  startingFillOpacity: number
  /** Initial color progress when expanding (0-1) */
  startingColorProgress: number
}

/**
 * Default animation configuration
 */
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  expandDuration: 0.18,
  collapseDuration: 0.12,
  staggerDelay: 0.08,
  easeExpand: "power2.out",
  easeCollapse: "power2.in",
}

/**
 * Profile-specific animation configuration
 */
export const PROFILE_ANIMATION_CONFIG: ProfileAnimationConfig = {
  expandDuration: 0.18,
  collapseDuration: 0.12,
  staggerDelay: 0.12,
  easeExpand: "power2.out",
  easeCollapse: "power2.in",
  startingFillOpacity: 0.33,
  startingColorProgress: 0.33,
}

/**
 * State for individual bar animations
 */
export interface BarAnimationState {
  /** Current opacity (0-1) */
  opacity: number
  /** For profile bars: color progress (0-1, 0=lighter, 1=final) */
  colorProgress?: number
  /** Whether the bar is visible */
  visible: boolean
}

/**
 * CSS transition timing for opacity changes
 * Uses Material Design easing curves
 */
export const CSS_EASING = {
  expand: "cubic-bezier(0.4, 0, 0.2, 1)",
  collapse: "cubic-bezier(0.4, 0, 0.2, 1)",
}

export const OPACITY_TRANSITION_MS = 180
