"use client";
/**
 * ActionBar Surface Context
 *
 * Provides surface color mode information to child ActionButton components.
 * This allows ActionButtons to automatically adapt their icon/text colors
 * based on the ActionBar's surface appearance (dark glass vs transparent).
 */

import { createContext, useContext } from "react"

export interface ActionBarSurfaceContextValue {
  /**
   * The effective color mode for content on this surface.
   * - "dark": Surface is dark, use light icons/text
   * - "light": Surface is light/transparent, use dark icons/text
   */
  surfaceColorMode: "dark" | "light"
}

/**
 * Context for ActionBar surface color mode
 *
 * Child ActionButton components use this context to:
 * - Automatically determine icon/text colors based on surface
 * - Override "auto" colorMode with the actual surface mode
 */
export const ActionBarSurfaceContext = createContext<ActionBarSurfaceContextValue | null>(null)

ActionBarSurfaceContext.displayName = "ActionBarSurfaceContext"

/**
 * Hook to access ActionBar surface context
 * Returns null if not within an ActionBar
 */
export function useActionBarSurface(): ActionBarSurfaceContextValue | null {
  return useContext(ActionBarSurfaceContext)
}
