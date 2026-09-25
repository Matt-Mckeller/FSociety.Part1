"use client";
import React, { useEffect, useRef, useState } from "react"
import { FabClusterContext } from "./FabClusterContext"
import type { FabClusterContextValue, PanelId } from "./types"

/**
 * Builds the FabCluster context value (active panel, open/close, esc-to-close,
 * deferred-close timer). Shared by `HudFabPanelProvider` (HUD-wide single
 * active panel across multiple clusters) and `FabCluster` (local fallback
 * when no HUD-wide provider is mounted).
 */
export function useFabPanelState(): FabClusterContextValue {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const activeTriggerRef = useRef<HTMLElement | null>(null)

  const open = React.useCallback((id: PanelId) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setActivePanel(id)
  }, [])

  const close = React.useCallback((opts?: { immediate?: boolean }) => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
    if (opts?.immediate) {
      setActivePanel(null)
      closeTimerRef.current = null
    } else {
      closeTimerRef.current = window.setTimeout(() => {
        setActivePanel(null)
        closeTimerRef.current = null
      }, 140)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePanel !== null) {
        close({ immediate: true })
        activeTriggerRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activePanel, close])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  return React.useMemo(
    () => ({ activePanel, open, close, activeTriggerRef }),
    [activePanel, open, close],
  )
}

interface HudFabPanelProviderProps {
  children: React.ReactNode
}

/**
 * HUD-wide single-active-panel coordinator. Wrap the HUD chrome (rails,
 * docks, anything containing FabClusters) with this provider so that
 * opening a panel in one cluster automatically closes the panel in another.
 *
 * If a `FabCluster` is rendered without this provider in scope, it falls
 * back to providing its own local state — single-cluster behavior.
 */
export function HudFabPanelProvider({ children }: HudFabPanelProviderProps) {
  const value = useFabPanelState()
  return (
    <FabClusterContext.Provider value={value}>{children}</FabClusterContext.Provider>
  )
}
