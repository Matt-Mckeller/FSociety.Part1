"use client"
import React, { createContext, useMemo } from "react"
import type { LayoutContextType } from "../../../types"
import { useLoadingState, useDrawerState } from "../../"

/**
 * Layout context for global layout state
 */
export const LayoutContext = createContext<LayoutContextType | null>(null)

/**
 * LayoutProvider - Provides global layout state management
 *
 * Manages:
 * - Loading spinner (process ID queue)
 * - Drawer state (side navigation)
 */
export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { drawerOpen, setDrawerOpen } = useDrawerState()
  const {
    addLoadingProcessID,
    removeLoadingProcessID,
    loading,
    currentLoadingProcessIDs,
  } = useLoadingState()

  const value = useMemo<LayoutContextType>(
    () => ({
      // Loading
      loading,
      currentLoadingProcessIDs,
      addLoadingProcessID,
      removeLoadingProcessID,

      // Drawer
      drawerOpen,
      setDrawerOpen,
    }),
    [
      loading,
      currentLoadingProcessIDs,
      drawerOpen,
    ]
  )

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}
