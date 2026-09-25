"use client"

import { createContext, useContext } from "react"
import type { ExpandingBarVisualState } from "../../display/ExpandingBar"

/**
 * Context value for status display components
 */
export interface StatusDisplayContextValue {
  /** Current bar height in pixels */
  barHeight: number
  /** Visual state for all bars */
  visualState: ExpandingBarVisualState
  /** Secondary visual state (for expandable bars when collapsed) */
  secondaryVisualState: ExpandingBarVisualState
  /** Whether user is hovering over the display */
  isHovered: boolean
  /** Whether the display is expanded */
  isExpanded: boolean
  /** Whether expansion is enabled */
  expandable: boolean
  /** Shadow intensity (0-1) for click feedback */
  shadowIntensity: number
  /** Click handler for ripple-enabled bars */
  onClick?: () => void
  /** Enable ripple effect on click */
  enableRipple: boolean
}

/**
 * Default context value
 */
const defaultContextValue: StatusDisplayContextValue = {
  barHeight: 28,
  visualState: "active",
  secondaryVisualState: "active",
  isHovered: false,
  isExpanded: true,
  expandable: false,
  shadowIntensity: 0,
  enableRipple: false,
}

/**
 * Context for sharing display state across status bar components
 *
 * Provides common props like barHeight and visualState to child bars
 * without prop drilling.
 */
export const StatusDisplayContext = createContext<StatusDisplayContextValue>(defaultContextValue)

/**
 * Hook to access status display context
 *
 * @throws Error if used outside StatusDisplayProvider
 *
 * @example
 * ```tsx
 * const { barHeight, visualState } = useStatusDisplayContext()
 * ```
 */
export function useStatusDisplayContext(): StatusDisplayContextValue {
  const context = useContext(StatusDisplayContext)
  if (!context) {
    throw new Error(
      "useStatusDisplayContext must be used within a StatusDisplayProvider"
    )
  }
  return context
}
