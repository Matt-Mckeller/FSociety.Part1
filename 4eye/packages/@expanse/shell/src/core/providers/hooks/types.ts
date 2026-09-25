/**
 * Layout hook types
 */

// Re-export MinimapPosition from canonical source to avoid duplication
export type { MinimapPosition } from "@expanse/map"

export type NavControlsPosition = "bottom-center" | "bottom-left" | "bottom-right"

export interface TransitionConfig {
  /** Transition type */
  type?: "fade" | "slide" | "slide-fade" | "none"
  /** Duration in ms */
  duration?: number
  /** Enable scale animation */
  withScale?: boolean
}
