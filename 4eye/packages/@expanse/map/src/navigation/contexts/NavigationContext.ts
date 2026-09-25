"use client"

import { createContext, useContext } from "react"
import type { NavigationHook } from '../types'

/**
 * Generic Navigation Context
 * 
 * This is the preferred context for accessing navigation.
 * It provides a consistent interface regardless of the underlying
 * navigation adapter (Board, Standard, Mobile).
 * 
 * Currently powered by GridNavigation, but the adapter pattern
 * allows swapping implementations without changing consumer code.
 */
export const NavigationContext = createContext<NavigationHook | null>(null)

/**
 * Access navigation state and actions
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { position, navigate, currentTile } = useNavigation();
 *   return <div>At ({position.x}, {position.y})</div>;
 * }
 * ```
 * 
 * @throws Error if used outside of NavigationProvider
 */
export function useNavigation(): NavigationHook {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
