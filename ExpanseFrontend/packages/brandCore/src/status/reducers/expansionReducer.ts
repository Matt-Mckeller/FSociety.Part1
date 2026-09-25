import type { ExpansionState, ExpansionAction } from "../types/expansion.types"

/**
 * Initial state factory for expansion reducer
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
 * Reducer for managing expansion state
 *
 * Handles expand/collapse logic with animation tracking.
 * Supports both controlled and uncontrolled modes.
 */
export function expansionReducer(
  state: ExpansionState,
  action: ExpansionAction
): ExpansionState {
  switch (action.type) {
    case "EXPAND":
      if (state.isExpanded) return state
      return {
        ...state,
        isExpanded: true,
        animationDirection: 1,
        isAnimating: true,
      }

    case "COLLAPSE":
      if (!state.isExpanded) return state
      return {
        ...state,
        isExpanded: false,
        animationDirection: -1,
        isAnimating: true,
      }

    case "TOGGLE":
      return {
        ...state,
        isExpanded: !state.isExpanded,
        animationDirection: state.isExpanded ? -1 : 1,
        isAnimating: true,
      }

    case "SET_EXPANDED":
      if (state.isExpanded === action.payload) return state
      return {
        ...state,
        isExpanded: action.payload,
        animationDirection: action.payload ? 1 : -1,
        isAnimating: true,
      }

    case "HOVER_START":
      return { ...state, isHovered: true }

    case "HOVER_END":
      return { ...state, isHovered: false }

    case "ANIMATION_START":
      return {
        ...state,
        isAnimating: true,
        animationDirection: action.payload.direction,
      }

    case "ANIMATION_END":
      return {
        ...state,
        isAnimating: false,
        animationDirection: 0,
      }

    default:
      return state
  }
}
