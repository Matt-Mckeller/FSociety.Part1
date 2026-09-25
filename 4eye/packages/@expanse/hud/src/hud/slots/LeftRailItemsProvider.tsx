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
 * Left-rail items registry.
 *
 * The HUD's left rail (`HudLeftRail`) is anchored by built-in chrome
 * (the game `FabTrigger` and action-bar toggle). Pages and features can
 * push additional vertically-stacked items _below_ the built-in chrome
 * — e.g. AI Chat pushing a `PipelineLayerRail` showing the active
 * prompt-processing layers — without forking `HudLeftRail`.
 *
 * Pattern intentionally mirrors {@link BottomBarsProvider}. Descendants
 * register an entry by stable `id`, the provider aggregates them sorted
 * by `order`, and `HudLeftRail` reads the sorted list and renders each
 * `node` with a uniform inter-item gap.
 *
 * `order` convention: lower numbers render visually higher (closer to
 * the built-in game trigger). The built-in chrome occupies an implicit
 * `order < 0` slot.
 */

export interface LeftRailItemEntry {
  /** Stable id used to update / unregister. */
  id: string
  /** Stack order — lower renders higher (closer to the game trigger). */
  order: number
  /** The item's React node. */
  node: ReactNode
  /**
   * Optional shared chrome-visibility key. When set and the matching
   * `HudChromeId` is hidden via `useRegisterHudChromeHide`, this item
   * is hidden too.
   */
  hideKey?: HudChromeId
  /** Optional human label, surfaced by debug overlays. */
  label?: string
}

interface LeftRailItemsContextValue {
  entries: LeftRailItemEntry[]
  registerItem: (entry: LeftRailItemEntry) => void
  unregisterItem: (id: string) => void
}

const LeftRailItemsContext = createContext<LeftRailItemsContextValue | null>(
  null,
)

type Action =
  | { type: "register"; entry: LeftRailItemEntry }
  | { type: "unregister"; id: string }

function entryEqual(a: LeftRailItemEntry, b: LeftRailItemEntry): boolean {
  return (
    a.order === b.order &&
    a.node === b.node &&
    a.hideKey === b.hideKey &&
    a.label === b.label
  )
}

function reducer(
  state: Map<string, LeftRailItemEntry>,
  action: Action,
): Map<string, LeftRailItemEntry> {
  switch (action.type) {
    case "register": {
      const existing = state.get(action.entry.id)
      if (existing && entryEqual(existing, action.entry)) return state
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

export interface LeftRailItemsProviderProps {
  children: ReactNode
}

/**
 * Provides the left-rail items registry. Wrap the subtree containing
 * `HudLeftRail` (or any renderer that calls `useLeftRailItems`).
 */
export function LeftRailItemsProvider({ children }: LeftRailItemsProviderProps) {
  const [entriesMap, dispatch] = useReducer(
    reducer,
    new Map<string, LeftRailItemEntry>(),
  )

  const registerItem = useCallback((entry: LeftRailItemEntry) => {
    dispatch({ type: "register", entry })
  }, [])

  const unregisterItem = useCallback((id: string) => {
    dispatch({ type: "unregister", id })
  }, [])

  const value = useMemo<LeftRailItemsContextValue>(() => {
    const entries = Array.from(entriesMap.values()).sort(
      (a, b) => a.order - b.order,
    )
    return { entries, registerItem, unregisterItem }
  }, [entriesMap, registerItem, unregisterItem])

  return (
    <LeftRailItemsContext.Provider value={value}>
      {children}
    </LeftRailItemsContext.Provider>
  )
}

/**
 * Read the sorted list of registered left-rail items. Returns an empty
 * registry when no provider is mounted (safe outside a HUD).
 */
export function useLeftRailItems(): LeftRailItemsContextValue {
  const ctx = useContext(LeftRailItemsContext)
  if (ctx) return ctx
  return {
    entries: [],
    registerItem: () => undefined,
    unregisterItem: () => undefined,
  }
}

export interface UseRegisterLeftRailItemOptions {
  id: string
  order: number
  node: ReactNode
  hideKey?: HudChromeId
  label?: string
  /** When false, the item is unregistered (without unmounting the caller). */
  enabled?: boolean
}

/**
 * Register an item into the HUD's left rail for the lifetime of the
 * calling component.
 *
 * `node` should be a stable reference (wrap in `useMemo` if it depends
 * on frequently-changing values) to avoid re-registering on every parent
 * render.
 *
 * @example
 * ```tsx
 * const node = useMemo(() => <PipelineLayerRail />, [])
 * useRegisterLeftRailItem({
 *   id: "ai-chat-pipeline-rail",
 *   order: 12, // sits below the Spellbook rail
 *   node,
 * })
 * ```
 */
export function useRegisterLeftRailItem(opts: UseRegisterLeftRailItemOptions) {
  const { registerItem, unregisterItem } = useLeftRailItems()
  const enabled = opts.enabled !== false

  useEffect(() => {
    if (!enabled) {
      unregisterItem(opts.id)
      return
    }
    registerItem({
      id: opts.id,
      order: opts.order,
      node: opts.node,
      hideKey: opts.hideKey,
      label: opts.label,
    })
    return () => unregisterItem(opts.id)
  }, [
    enabled,
    opts.id,
    opts.order,
    opts.node,
    opts.hideKey,
    opts.label,
    registerItem,
    unregisterItem,
  ])
}
