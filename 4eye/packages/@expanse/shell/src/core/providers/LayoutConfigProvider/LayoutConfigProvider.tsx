"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type {
  LayoutConfiguration,
  LayoutConfigContextType,
  MinimapConfig,
  BarVisibilityConfig,
} from "./types"
import { DEFAULT_LAYOUT_CONFIG } from "./defaults"

// =============================================================================
// Context
// =============================================================================

export const LayoutConfigContext = createContext<LayoutConfigContextType | undefined>(undefined)

// =============================================================================
// Provider
// =============================================================================

const STORAGE_KEY = "expanse-layout-config"

export interface LayoutConfigProviderProps {
  children: ReactNode
  /** Initial configuration (optional) */
  initialConfig?: Partial<LayoutConfiguration>
  /** Disable localStorage persistence */
  disablePersistence?: boolean
}

export function LayoutConfigProvider({
  children,
  initialConfig,
  disablePersistence = false,
}: LayoutConfigProviderProps) {
  const [config, setConfigState] = useState<LayoutConfiguration>(() => {
    // Try to load from localStorage
    if (!disablePersistence && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          return { ...DEFAULT_LAYOUT_CONFIG, ...parsed, ...initialConfig }
        }
      } catch (error) {
        console.error("Failed to load layout config from localStorage:", error)
      }
    }

    return { ...DEFAULT_LAYOUT_CONFIG, ...initialConfig }
  })

  // Persist to localStorage on change
  useEffect(() => {
    if (!disablePersistence && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
      } catch (error) {
        console.error("Failed to save layout config to localStorage:", error)
      }
    }
  }, [config, disablePersistence])

  const setConfig = (newConfig: LayoutConfiguration) => {
    setConfigState(newConfig)
  }

  const updateConfig = <K extends keyof LayoutConfiguration>(
    key: K,
    value: LayoutConfiguration[K]
  ) => {
    setConfigState((prev) => ({ ...prev, [key]: value }))
  }

  const updateMinimapConfig = <K extends keyof MinimapConfig>(
    key: K,
    value: MinimapConfig[K]
  ) => {
    setConfigState((prev) => ({
      ...prev,
      minimap: { ...prev.minimap, [key]: value },
    }))
  }

  const updateBarVisibility = <K extends keyof BarVisibilityConfig>(
    key: K,
    value: BarVisibilityConfig[K]
  ) => {
    setConfigState((prev) => ({
      ...prev,
      barVisibility: { ...prev.barVisibility, [key]: value },
    }))
  }

  const resetConfig = () => {
    setConfigState({ ...DEFAULT_LAYOUT_CONFIG, ...initialConfig })
  }

  const value: LayoutConfigContextType = {
    config,
    setConfig,
    updateConfig,
    updateMinimapConfig,
    updateBarVisibility,
    resetConfig,
  }

  return (
    <LayoutConfigContext.Provider value={value}>{children}</LayoutConfigContext.Provider>
  )
}

// =============================================================================
// Hook
// =============================================================================

/**
 * Access layout configuration
 */
export function useLayoutConfig(): LayoutConfigContextType {
  const context = useContext(LayoutConfigContext)
  if (!context) {
    throw new Error("useLayoutConfig must be used within LayoutConfigProvider")
  }
  return context
}
