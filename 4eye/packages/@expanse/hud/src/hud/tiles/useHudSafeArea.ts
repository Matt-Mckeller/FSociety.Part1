"use client"

import { useHudInsets } from "../slots"

export interface HudSafeArea {
  /** Pixels reserved by the top chrome (status + context bars). */
  top: number
  /** Pixels reserved by the bottom chrome (FAB cluster, AI input, panels). */
  bottom: number
  /** Pixels reserved by the left rail. */
  left: number
  /** Pixels reserved by right-edge chrome (does NOT include the minimap). */
  right: number
  /**
   * Pixels claimed by the floating minimap dock. Tracked separately so
   * consumers can decide whether to dodge it or let content flow under.
   */
  minimap: number
}

/**
 * Read the aggregated HUD insets as a stable object. Single source of
 * truth for any component (FAB, banner, modal, embedded widget) that
 * needs to position itself relative to the visible safe area.
 *
 * Replaces app-local hardcoded padding tokens — those drift when chrome
 * changes; this hook reflects what's actually registered.
 *
 * @example
 * ```tsx
 * const { bottom } = useHudSafeArea()
 * return <Fab sx={{ position: "fixed", bottom: bottom + 16, right: 16 }} />
 * ```
 */
export function useHudSafeArea(): HudSafeArea {
  const { insets } = useHudInsets()
  return insets
}
