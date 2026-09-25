"use client";
import { useReducer, useCallback, useEffect, useMemo } from "react"
import { expansionReducer, createInitialExpansionState } from "../reducers"
import type { ExpansionTrigger } from "../types/expansion.types"

export interface UseExpansionOptions {
  /** Initial expanded state (for uncontrolled mode) */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Callback when expanded changes */
  onExpandedChange?: (expanded: boolean) => void
  /** How expansion is triggered */
  trigger?: ExpansionTrigger
  /** Whether expansion functionality is enabled */
  enabled?: boolean
}

export interface UseExpansionReturn {
  /** Current expanded state */
  isExpanded: boolean
  /** Whether user is hovering */
  isHovered: boolean
  /** Whether currently animating */
  isAnimating: boolean
  /** Animation direction: 1=expanding, -1=collapsing, 0=idle */
  animationDirection: 1 | -1 | 0
  /** Expand the display */
  expand: () => void
  /** Collapse the display */
  collapse: () => void
  /** Toggle expanded state */
  toggle: () => void
  /** Event handlers for container */
  handlers: {
    onMouseEnter: () => void
    onMouseLeave: () => void
    onClick: () => void
  }
  /** Mark animation as complete */
  onAnimationComplete: () => void
}

/**
 * Hook for managing expansion state and interactions
 *
 * Supports both controlled and uncontrolled modes:
 * - Uncontrolled: Set `defaultExpanded` and internal state is used
 * - Controlled: Set `expanded` and `onExpandedChange` for external control
 *
 * @example
 * ```tsx
 * // Uncontrolled with hover trigger
 * const { isExpanded, handlers } = useExpansion({
 *   defaultExpanded: false,
 *   trigger: "hover",
 *   enabled: true,
 * })
 *
 * // Controlled with click trigger
 * const [expanded, setExpanded] = useState(false)
 * const { handlers } = useExpansion({
 *   expanded,
 *   onExpandedChange: setExpanded,
 *   trigger: "click",
 *   enabled: true,
 * })
 * ```
 */
export function useExpansion({
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  trigger = "hover",
  enabled = true,
}: UseExpansionOptions = {}): UseExpansionReturn {
  const isControlled = controlledExpanded !== undefined

  const [state, dispatch] = useReducer(
    expansionReducer,
    defaultExpanded,
    createInitialExpansionState
  )

  // Sync controlled state
  useEffect(() => {
    if (isControlled && controlledExpanded !== state.isExpanded) {
      dispatch({ type: "SET_EXPANDED", payload: controlledExpanded })
    }
  }, [isControlled, controlledExpanded, state.isExpanded])

  const isExpanded = isControlled ? controlledExpanded : state.isExpanded

  const expand = useCallback(() => {
    if (!enabled) return
    if (!isControlled) {
      dispatch({ type: "EXPAND" })
    }
    onExpandedChange?.(true)
  }, [enabled, isControlled, onExpandedChange])

  const collapse = useCallback(() => {
    if (!enabled) return
    if (!isControlled) {
      dispatch({ type: "COLLAPSE" })
    }
    onExpandedChange?.(false)
  }, [enabled, isControlled, onExpandedChange])

  const toggle = useCallback(() => {
    if (!enabled) return
    const newValue = !isExpanded
    if (!isControlled) {
      dispatch({ type: "TOGGLE" })
    }
    onExpandedChange?.(newValue)
  }, [enabled, isExpanded, isControlled, onExpandedChange])

  const onMouseEnter = useCallback(() => {
    dispatch({ type: "HOVER_START" })
    if (enabled && trigger === "hover") {
      expand()
    }
  }, [enabled, trigger, expand])

  const onMouseLeave = useCallback(() => {
    dispatch({ type: "HOVER_END" })
    if (enabled && trigger === "hover") {
      collapse()
    }
  }, [enabled, trigger, collapse])

  const onClick = useCallback(() => {
    if (enabled && trigger === "click") {
      toggle()
    }
  }, [enabled, trigger, toggle])

  const onAnimationComplete = useCallback(() => {
    dispatch({ type: "ANIMATION_END" })
  }, [])

  const handlers = useMemo(
    () => ({
      onMouseEnter,
      onMouseLeave,
      onClick,
    }),
    [onMouseEnter, onMouseLeave, onClick]
  )

  return {
    isExpanded,
    isHovered: state.isHovered,
    isAnimating: state.isAnimating,
    animationDirection: state.animationDirection,
    expand,
    collapse,
    toggle,
    handlers,
    onAnimationComplete,
  }
}
