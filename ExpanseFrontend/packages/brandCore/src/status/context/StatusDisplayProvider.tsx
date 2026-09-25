"use client"

import { useMemo, type ReactNode } from "react"
import { StatusDisplayContext, type StatusDisplayContextValue } from "./StatusDisplayContext"
import type { ExpandingBarVisualState } from "../../display/ExpandingBar"

export interface StatusDisplayProviderProps {
  children: ReactNode
  /** Bar height in pixels */
  barHeight?: number
  /** Visual state for primary bar */
  visualState?: ExpandingBarVisualState
  /** Visual state for secondary bars (collapsed state) */
  secondaryVisualState?: ExpandingBarVisualState
  /** Whether user is hovering */
  isHovered?: boolean
  /** Whether the display is expanded */
  isExpanded?: boolean
  /** Whether expansion is enabled */
  expandable?: boolean
  /** Shadow intensity for click feedback */
  shadowIntensity?: number
  /** Click handler */
  onClick?: () => void
  /** Enable ripple effect */
  enableRipple?: boolean
}

/**
 * Provider for status display context
 *
 * Wraps status bar components to provide shared state:
 * - barHeight: Consistent height across all bars
 * - visualState: Current visual state (active/hovered/inactive)
 * - isExpanded: Whether secondary bars are visible
 * - expandable: Whether expansion is enabled
 *
 * @example
 * ```tsx
 * <StatusDisplayProvider
 *   barHeight={28}
 *   visualState="active"
 *   isExpanded={true}
 * >
 *   <ProfileIconStatusBarSimple />
 *   <CurrencyStatusBarSimple />
 *   <ProgressStatusBar />
 * </StatusDisplayProvider>
 * ```
 */
export function StatusDisplayProvider({
  children,
  barHeight = 28,
  visualState = "active",
  secondaryVisualState = visualState,
  isHovered = false,
  isExpanded = true,
  expandable = false,
  shadowIntensity = 0,
  onClick,
  enableRipple = false,
}: StatusDisplayProviderProps) {
  const value = useMemo<StatusDisplayContextValue>(
    () => ({
      barHeight,
      visualState,
      secondaryVisualState,
      isHovered,
      isExpanded,
      expandable,
      shadowIntensity,
      onClick,
      enableRipple,
    }),
    [
      barHeight,
      visualState,
      secondaryVisualState,
      isHovered,
      isExpanded,
      expandable,
      shadowIntensity,
      onClick,
      enableRipple,
    ]
  )

  return (
    <StatusDisplayContext.Provider value={value}>
      {children}
    </StatusDisplayContext.Provider>
  )
}
