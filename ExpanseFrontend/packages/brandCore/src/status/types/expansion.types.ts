import type { StatusBarExpansionDirection, ExpansionBehavior } from "./status.types"

/**
 * Expansion trigger method
 */
export type ExpansionTrigger = "hover" | "click"

/**
 * Expansion state for useReducer
 */
export interface ExpansionState {
  /** Whether currently expanded */
  isExpanded: boolean
  /** Whether user is hovering */
  isHovered: boolean
  /** Whether actively animating */
  isAnimating: boolean
  /** Animation direction (1 = expanding, -1 = collapsing) */
  animationDirection: 1 | -1 | 0
}

/**
 * Actions for expansion reducer
 */
export type ExpansionAction =
  | { type: "EXPAND" }
  | { type: "COLLAPSE" }
  | { type: "TOGGLE" }
  | { type: "SET_EXPANDED"; payload: boolean }
  | { type: "HOVER_START" }
  | { type: "HOVER_END" }
  | { type: "ANIMATION_START"; payload: { direction: 1 | -1 } }
  | { type: "ANIMATION_END" }

/**
 * Initial state factory
 */
export const createInitialExpansionState = (
  defaultExpanded = false
): ExpansionState => ({
  isExpanded: defaultExpanded,
  isHovered: false,
  isAnimating: false,
  animationDirection: 0,
})

/**
 * Options for expansion hook
 */
export interface UseExpansionOptions {
  /** Initial expanded state */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Callback when expanded changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Expansion trigger method */
  trigger?: ExpansionTrigger
  /** Whether expansion is enabled */
  enabled?: boolean
}

/**
 * Options for calculating expansion layout
 */
export interface ExpansionLayoutOptions {
  /** Direction of expansion */
  direction: StatusBarExpansionDirection
  /** Behavior affecting layout */
  behavior: ExpansionBehavior
  /** Gap between bars in theme units */
  gap: number
  /** Number of bars */
  barCount: number
  /** Height of each bar */
  barHeight: number
}
