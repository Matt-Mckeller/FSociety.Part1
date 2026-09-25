"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"
import type { HudChromeId } from "./HudChromeVisibilityProvider"

/**
 * Bottom-bar registry.
 *
 * The HUD's bottom chrome is a vertical stack of bars (e.g. the persistent
 * action OrbBar above the AIInputBar). Pages and features can push extra
 * bars into the stack from anywhere in the tree — e.g. a video page adding
 * a "video controls" bar — without prop-drilling through `FullHud`.
 *
 * Pattern intentionally mirrors {@link HudInsetsProvider} +
 * {@link HudChromeVisibilityProvider}: descendants register an entry by
 * stable `id`, the provider aggregates them, and the renderer (the
 * `BottomChromeStack` inside `FullHud`) reads the sorted list and renders
 * each `node` with a uniform inter-bar gap.
 */

export interface BottomBarEntry {
  /** Stable id used to update / unregister. */
  id: string
  /** Stack order — lower numbers render visually higher (further from the
   *  viewport bottom). Built-in defaults: orbs=10, ai-input=90. */
  order: number
  /** The bar's React node. */
  node: ReactNode
  /**
   * Optional shared chrome-visibility key. When set and the matching
   * `HudChromeId` is hidden via `useRegisterHudChromeHide`, this bar is
   * hidden too (and contributes nothing to the stack height).
   */
  hideKey?: HudChromeId
  /** Optional human label, surfaced by debug overlays. */
  label?: string
}

interface BottomBarsContextValue {
  entries: BottomBarEntry[]
  registerBar: (entry: BottomBarEntry) => void
  unregisterBar: (id: string) => void
}

const BottomBarsContext = createContext<BottomBarsContextValue | null>(null)

type Action =
  | { type: "register"; entry: BottomBarEntry }
  | { type: "unregister"; id: string }

function entryEqual(a: BottomBarEntry, b: BottomBarEntry): boolean {
  return (
    a.order === b.order &&
    a.node === b.node &&
    a.hideKey === b.hideKey &&
    a.label === b.label
  )
}

function reducer(
  state: Map<string, BottomBarEntry>,
  action: Action,
): Map<string, BottomBarEntry> {
  switch (action.type) {
    case "register": {
      const existing = state.get(action.entry.id)
      if (existing && entryEqual(existing, action.entry)) {
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

export interface BottomBarsProviderProps {
  children: ReactNode
}

/**
 * Provides the bottom-bars registry. Wrap the subtree containing
 * `BottomChromeStack` (or any custom renderer that calls `useBottomBars`).
 */
export function BottomBarsProvider({ children }: BottomBarsProviderProps) {
  const [entriesMap, dispatch] = useReducer(
    reducer,
    new Map<string, BottomBarEntry>(),
  )

  const registerBar = useCallback((entry: BottomBarEntry) => {
    dispatch({ type: "register", entry })
  }, [])

  const unregisterBar = useCallback((id: string) => {
    dispatch({ type: "unregister", id })
  }, [])

  const value = useMemo<BottomBarsContextValue>(() => {
    const entries = Array.from(entriesMap.values()).sort(
      (a, b) => a.order - b.order,
    )
    return { entries, registerBar, unregisterBar }
  }, [entriesMap, registerBar, unregisterBar])

  return (
    <BottomBarsContext.Provider value={value}>
      {children}
    </BottomBarsContext.Provider>
  )
}

/**
 * Read the sorted list of registered bottom bars (+ register/unregister
 * for advanced consumers). Returns an empty registry when no provider is
 * mounted, so renderers can be safely composed outside a HUD.
 */
export function useBottomBars(): BottomBarsContextValue {
  const ctx = useContext(BottomBarsContext)
  if (ctx) return ctx
  return {
    entries: [],
    registerBar: () => undefined,
    unregisterBar: () => undefined,
  }
}

export interface UseRegisterBottomBarOptions {
  id: string
  order: number
  node: ReactNode
  hideKey?: HudChromeId
  label?: string
  /** When false, the bar is unregistered (without unmounting the caller). */
  enabled?: boolean
}

/**
 * Register a bar into the HUD's bottom chrome stack for the lifetime of
 * the calling component.
 *
 * `node` should be a stable reference (wrap in `useMemo` if it depends on
 * frequently-changing values) to avoid re-registering on every parent
 * render.
 *
 * @example
 * ```tsx
 * const node = useMemo(() => <VideoControls />, [])
 * useRegisterBottomBar({
 *   id: "video-controls",
 *   order: 50, // between the default orbs (10) and ai input (90)
 *   node,
 * })
 * ```
 */
export function useRegisterBottomBar(opts: UseRegisterBottomBarOptions) {
  const { registerBar, unregisterBar } = useBottomBars()
  const enabled = opts.enabled !== false

  useEffect(() => {
    if (!enabled) {
      unregisterBar(opts.id)
      return
    }
    registerBar({
      id: opts.id,
      order: opts.order,
      node: opts.node,
      hideKey: opts.hideKey,
      label: opts.label,
    })
    return () => unregisterBar(opts.id)
  }, [
    enabled,
    opts.id,
    opts.order,
    opts.node,
    opts.hideKey,
    opts.label,
    registerBar,
    unregisterBar,
  ])
}
