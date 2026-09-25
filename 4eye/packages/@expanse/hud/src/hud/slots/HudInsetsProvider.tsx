"use client"

import React, { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react"

/**
 * HUD inset registry.
 *
 * Each fixed/floating HUD chrome component (top bar, bottom bar, side rails,
 * minimap dock, etc.) registers the screen edge it occupies and how much
 * space it claims. The provider aggregates these per-edge as the **max** of
 * all registered entries, exposing a stable `insets` value that page content
 * can use to avoid being covered.
 *
 * The minimap is intentionally tracked as its own logical edge ("minimap")
 * rather than rolled into the top/right inset — its size is variable and
 * many consumers want content to flow under the frosted panel without
 * shrinking. Consumers that DO want the page to dodge the minimap can read
 * `minimap` and add it to their right inset manually.
 */

export type HudInsetEdge = "top" | "bottom" | "left" | "right" | "minimap"

export interface HudInsetEntry {
  /** Stable id used to update / unregister */
  id: string
  /** Which edge this entry claims */
  edge: HudInsetEdge
  /** Pixel size of the claim on that edge */
  size: number
  /** Optional human label, surfaced by the debug overlay */
  label?: string
}

interface HudInsets {
  top: number
  bottom: number
  left: number
  right: number
  minimap: number
}

const ZERO_INSETS: HudInsets = { top: 0, bottom: 0, left: 0, right: 0, minimap: 0 }

interface HudInsetsContextValue {
  insets: HudInsets
  entries: HudInsetEntry[]
  registerInset: (entry: HudInsetEntry) => void
  unregisterInset: (id: string) => void
}

const HudInsetsContext = createContext<HudInsetsContextValue | null>(null)

type Action =
  | { type: "register"; entry: HudInsetEntry }
  | { type: "unregister"; id: string }

function reducer(state: Map<string, HudInsetEntry>, action: Action): Map<string, HudInsetEntry> {
  switch (action.type) {
    case "register": {
      const existing = state.get(action.entry.id)
      if (
        existing &&
        existing.edge === action.entry.edge &&
        existing.size === action.entry.size &&
        existing.label === action.entry.label
      ) {
        return state
      }
      const next = new Map(state)
      next.set(action.entry.id, action.entry)
      return next
    }
    case "unregister": {
      if (!state.has(action.id)) return state
      const next = new Map(state)
      next.delete(action.id)
      return next
    }
    default:
      return state
  }
}

export interface HudInsetsProviderProps {
  children: ReactNode
}

/**
 * Provides the HUD inset registry. Wrap any subtree that contains HUD chrome
 * + content. Children read insets via `useHudInsets()` and register their own
 * via `useRegisterHudInset()`.
 */
export function HudInsetsProvider({ children }: HudInsetsProviderProps) {
  const [entriesMap, dispatch] = useReducer(reducer, new Map<string, HudInsetEntry>())

  const registerInset = useCallback((entry: HudInsetEntry) => {
    dispatch({ type: "register", entry })
  }, [])

  const unregisterInset = useCallback((id: string) => {
    dispatch({ type: "unregister", id })
  }, [])

  const value = useMemo<HudInsetsContextValue>(() => {
    const insets: HudInsets = { ...ZERO_INSETS }
    const entries: HudInsetEntry[] = []
    for (const entry of entriesMap.values()) {
      entries.push(entry)
      if (entry.size > insets[entry.edge]) {
        insets[entry.edge] = entry.size
      }
    }
    return { insets, entries, registerInset, unregisterInset }
  }, [entriesMap, registerInset, unregisterInset])

  return <HudInsetsContext.Provider value={value}>{children}</HudInsetsContext.Provider>
}

/**
 * Read aggregated HUD insets + the underlying entry list.
 *
 * Returns zero insets and an empty list when no provider is mounted, so the
 * hook is safe to call from components that may render outside a HUD.
 */
export function useHudInsets(): HudInsetsContextValue {
  const ctx = useContext(HudInsetsContext)
  if (ctx) return ctx
  return {
    insets: ZERO_INSETS,
    entries: [],
    registerInset: () => undefined,
    unregisterInset: () => undefined,
  }
}

/**
 * Register an inset claim for the lifetime of the calling component.
 * Pass `size: 0` (or `enabled: false`) to opt out without unmounting.
 *
 * @example
 * ```tsx
 * useRegisterHudInset({ id: "top-action-dock", edge: "top", size: 56 })
 * ```
 */
export function useRegisterHudInset(opts: {
  id: string
  edge: HudInsetEdge
  size: number
  label?: string
  enabled?: boolean
}) {
  const { registerInset, unregisterInset } = useHudInsets()
  const enabled = opts.enabled !== false && opts.size > 0

  React.useEffect(() => {
    if (!enabled) {
      unregisterInset(opts.id)
      return
    }
    registerInset({ id: opts.id, edge: opts.edge, size: opts.size, label: opts.label })
    return () => unregisterInset(opts.id)
  }, [enabled, opts.id, opts.edge, opts.size, opts.label, registerInset, unregisterInset])
}
