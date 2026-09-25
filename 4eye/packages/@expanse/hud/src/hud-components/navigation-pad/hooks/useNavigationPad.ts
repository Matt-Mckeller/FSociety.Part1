"use client";
import { useCallback } from "react"
import { useNavigation } from "@expanse/map"
import type { Direction } from "@expanse/map"
import type { NavigationPadSizePreset, NavigationPadSize } from "../types"
import { SIZE_PRESETS } from "../types"

// =============================================================================
// Hook Return Type
// =============================================================================

export interface UseNavigationPadReturn {
  /** Navigate in direction */
  onNavigate: (direction: Direction) => void
  /** Go to home page */
  onHome: () => void
  /** Go back to previous page */
  onBack: () => void
  /** Check if can navigate in direction */
  canNavigate: (direction: Direction) => boolean
  /** Check if at home page */
  isHome: boolean
  /** Size configuration */
  sizeConfig: NavigationPadSizePreset
}

// =============================================================================
// Hook
// =============================================================================

/**
 * Shared hook for NavigationPad variants.
 * Provides navigation handlers, state checks, and size configuration.
 * 
 * @example
 * ```tsx
 * const navPad = useNavigationPad("medium")
 * 
 * <IconButton onClick={() => navPad.onNavigate("up")} disabled={!navPad.canNavigate("up")}>
 *   <ArrowUpIcon />
 * </IconButton>
 * ```
 */
export function useNavigationPad(size: NavigationPadSize = "medium"): UseNavigationPadReturn {
  const { navigate, canNavigate, goHome, goBack, position, isHome } = useNavigation()

  // Size configuration
  const sizeConfig = SIZE_PRESETS[size]

  // Navigate in direction
  const handleNavigate = useCallback(
    (direction: Direction) => {
      if (canNavigate(direction)) {
        navigate(direction)
      }
    },
    [navigate, canNavigate]
  )

  // Go home
  const handleHome = useCallback(() => {
    goHome()
  }, [goHome])

  // Go back
  const handleBack = useCallback(() => {
    goBack()
  }, [goBack])

  return {
    onNavigate: handleNavigate,
    onHome: handleHome,
    onBack: handleBack,
    canNavigate,
    isHome,
    sizeConfig,
  }
}
