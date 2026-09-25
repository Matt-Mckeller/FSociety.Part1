/**
 * Animation configuration types for the grid navigation system.
 */

/** Animation type options */
export type AnimationType = "fade" | "slide" | "scale" | "zoom" | "none"

/** Single animation configuration */
export interface AnimationConfig {
  /** Animation type */
  type: AnimationType
  /** Duration in milliseconds */
  duration: number
  /** GSAP easing string */
  easing?: string
}

/** Slide-specific animation configuration */
export interface SlideAnimationConfig extends AnimationConfig {
  type: "slide"
  /** 'natural' follows travel direction, 'fixed' always same direction */
  slideDirection?: "natural" | "fixed"
}

/** Complete navigation animation configuration */
export interface NavigationAnimationConfig {
  /** Default animation for all navigation types */
  default: AnimationConfig
  /** Animation for adjacent navigation (one step) */
  adjacent?: AnimationConfig | SlideAnimationConfig
  /** Animation for direct jumps (minimap click, navigateTo) */
  directJump?: AnimationConfig
  /** Animation when going home */
  goHome?: AnimationConfig
}

/** Tile interaction animation configuration */
export interface TileInteractionConfig {
  hover: {
    scale: number
    duration: number
    shadow?: boolean
    showLabel?: boolean
  }
  active: {
    scale: number
    ringWidth?: number
    ringColor?: string
    pulseAnimation?: boolean
  }
  disabled: {
    opacity: number
    cursor: string
  }
}

// =============================================================================
// Defaults
// =============================================================================

export const DEFAULT_ANIMATION_CONFIG: NavigationAnimationConfig = {
  default: { type: "fade", duration: 200 },
  adjacent: { type: "fade", duration: 200 },
  directJump: { type: "fade", duration: 300 },
  goHome: { type: "scale", duration: 250 },
}

export const DEFAULT_TILE_INTERACTION: TileInteractionConfig = {
  hover: { scale: 1.1, duration: 200, shadow: true, showLabel: true },
  active: { scale: 1.0, ringWidth: 2, pulseAnimation: false },
  disabled: { opacity: 0.5, cursor: "not-allowed" },
}
