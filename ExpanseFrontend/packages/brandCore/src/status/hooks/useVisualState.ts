import { useMemo } from "react"
import type { ExpandingBarVisualState } from "../../display/ExpandingBar"
import type { StatusBarDisplayState } from "../types/status.types"

export interface UseVisualStateOptions {
  /** Display state from props */
  displayState: StatusBarDisplayState
  /** Whether user is hovering */
  isHovered: boolean
  /** Whether currently expanded (for expandable components) */
  isExpanded?: boolean
  /** Whether expansion is enabled */
  expandable?: boolean
}

/**
 * Hook for mapping display state to ExpandingBar visual state
 *
 * Maps the component's display state and interaction state
 * to the appropriate visual state for the ExpandingBar component.
 *
 * @example
 * ```tsx
 * const visualState = useVisualState({
 *   displayState: "active",
 *   isHovered: true,
 * })
 * // Returns "hovered"
 * ```
 */
export function useVisualState({
  displayState,
  isHovered,
  isExpanded = true,
  expandable = false,
}: UseVisualStateOptions): ExpandingBarVisualState {
  return useMemo(() => {
    // For secondary/expandable bars that are collapsed
    if (expandable && !isExpanded) {
      return "inactive"
    }

    // Inactive state
    if (displayState === "inactive") {
      return isHovered ? "hovered" : "inactive"
    }

    // Interactive state (semi-transparent until hovered)
    if (displayState === "interactive") {
      return isHovered ? "hovered" : "inactive"
    }

    // Active state
    if (isHovered) {
      return "hovered"
    }

    return "active"
  }, [displayState, isHovered, isExpanded, expandable])
}

/**
 * Get visual state for secondary bars in expandable mode
 */
export function useSecondaryVisualState(
  displayState: StatusBarDisplayState,
  isHovered: boolean,
  isExpanded: boolean,
  expandable: boolean
): ExpandingBarVisualState {
  return useMemo(() => {
    if (expandable && !isExpanded) {
      return "inactive"
    }
    return useVisualState({ displayState, isHovered, isExpanded, expandable })
  }, [displayState, isHovered, isExpanded, expandable])
}
