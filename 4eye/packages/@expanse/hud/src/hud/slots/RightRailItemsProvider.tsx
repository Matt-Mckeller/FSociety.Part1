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
 * Right-rail items registry.
 *
 * The HUD's right rail (`HudRightRail`) is anchored by built-in chrome
 * (the profile and settings `FabTrigger`s). Pages and features can push
 * additional vertically-stacked items _below_ that cluster — e.g. AI Chat
 * pushing a speed-dial of chat actions — without forking `HudRightRail`.
 *
 * Pattern intentionally mirrors {@link LeftRailItemsProvider}. Descendants
 * register an entry by stable `id`, the provider aggregates them sorted
 * by `order`, and `HudRightRail` reads the sorted list and renders each
 * `node` with a uniform inter-item gap.
 *
 * `order` convention: lower numbers render visually higher (closer to
 * the built-in profile cluster). The built-in chrome occupies an implicit
 * `order < 0` slot.
 */

export interface RightRailItemEntry {
  /** Stable id used to update / unregister. */
  id: string
  /** Stack order — lower renders higher (closer to the profile cluster). */
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

interface RightRailItemsContextValue {
  entries: RightRailItemEntry[]
  registerItem: (entry: RightRailItemEntry) => void
  unregisterItem: (id: string) => void
}

const RightRailItemsContext = createContext<RightRailItemsContextValue | null>(
  null,
)

type Action =
  | { type: "register"; entry: RightRailItemEntry }
  | { type: "unregister"; id: string }

function entryEqual(a: RightRailItemEntry, b: RightRailItemEntry): boolean {
  return (
    a.order === b.order &&
    a.node === b.node &&
    a.hideKey === b.hideKey &&
    a.label === b.label
  )
}

function reducer(
  state: Map<string, RightRailItemEntry>,
  action: Action,
): Map<string, RightRailItemEntry> {
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

export interface RightRailItemsProviderProps {
  children: ReactNode
}

/**
 * Provides the right-rail items registry. Wrap the subtree containing
 * `HudRightRail` (or any renderer that calls `useRightRailItems`).
 */
export function RightRailItemsProvider({ children }: RightRailItemsProviderProps) {
  const [entriesMap, dispatch] = useReducer(
    reducer,
    new Map<string, RightRailItemEntry>(),
  )

  const registerItem = useCallback((entry: RightRailItemEntry) => {
    dispatch({ type: "register", entry })
  }, [])

  const unregisterItem = useCallback((id: string) => {
    dispatch({ type: "unregister", id })
  }, [])

  const value = useMemo<RightRailItemsContextValue>(() => {
    const entries = Array.from(entriesMap.values()).sort(
      (a, b) => a.order - b.order,
    )
    return { entries, registerItem, unregisterItem }
  }, [entriesMap, registerItem, unregisterItem])

  return (
    <RightRailItemsContext.Provider value={value}>
      {children}
    </RightRailItemsContext.Provider>
  )
}

/**
 * Read the sorted list of registered right-rail items. Returns an empty
 * registry when no provider is mounted (safe outside a HUD).
 */
export function useRightRailItems(): RightRailItemsContextValue {
  const ctx = useContext(RightRailItemsContext)
  if (ctx) return ctx
  return {
    entries: [],
    registerItem: () => undefined,
    unregisterItem: () => undefined,
  }
}

export interface UseRegisterRightRailItemOptions {
  id: string
  order: number
  node: ReactNode
  hideKey?: HudChromeId
  label?: string
  /** When false, the item is unregistered (without unmounting the caller). */
  enabled?: boolean
}

/**
 * Register an item into the HUD's right rail for the lifetime of the
 * calling component.
 *
 * `node` should be a stable reference (wrap in `useMemo` if it depends
 * on frequently-changing values) to avoid re-registering on every parent
 * render.
 *
 * @example
 * ```tsx
 * const node = useMemo(() => <ChatActionFab items={items} />, [items])
 * useRegisterRightRailItem({
 *   id: "ai-chat-actions",
 *   order: 10, // sits just below the built-in profile cluster
 *   node,
 * })
 * ```
 */
export function useRegisterRightRailItem(opts: UseRegisterRightRailItemOptions) {
  const { registerItem, unregisterItem } = useRightRailItems()
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
