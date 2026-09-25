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

/**
 * Center-content registry.
 *
 * The HUD's top-center slot is normally a `CurrentLocationActionBar` showing
 * back / page-icon / forward. Some pages need to inject their own content
 * there (e.g. a slideshow's step rail) without prop-drilling through
 * `FullHud`. This registry mirrors the {@link BottomBarsProvider} pattern:
 * descendants register an entry by stable `id`, the renderer (the HUD's
 * top row) reads the highest-priority entry and renders its `node` in
 * place of the default location bar contents.
 *
 * Only one entry "wins" — the one with the highest `priority`. Ties break
 * by registration order (last-registered wins), which lets a transient
 * overlay (e.g. map view) override a page-level rail without unmounting it.
 */

export interface CenterContentEntry {
  /** Stable id used to update / unregister. */
  id: string
  /**
   * Higher wins. Suggested ranges:
   *   - 10  : page-level (e.g. slideshow rail on Home)
   *   - 50  : transient overlays (e.g. map full-view "Map · close")
   *   - 100 : modal-like screen takeovers
   */
  priority: number
  /** The React node rendered inside the location bar pill. */
  node: ReactNode
  /** Optional human label, surfaced by debug overlays. */
  label?: string
}

interface CenterContentContextValue {
  /** All entries sorted by priority desc; consumers usually take `[0]`. */
  entries: CenterContentEntry[]
  registerEntry: (entry: CenterContentEntry) => void
  unregisterEntry: (id: string) => void
}

const CenterContentContext = createContext<CenterContentContextValue | null>(
  null,
)

type Action =
  | { type: "register"; entry: CenterContentEntry; seq: number }
  | { type: "unregister"; id: string }

interface State {
  // Map preserves insertion order for stable tie-breaking by `seq`.
  byId: Map<string, CenterContentEntry & { seq: number }>
}

function entryEqual(
  a: CenterContentEntry,
  b: CenterContentEntry,
): boolean {
  return (
    a.priority === b.priority && a.node === b.node && a.label === b.label
  )
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "register": {
      const existing = state.byId.get(action.entry.id)
      if (existing && entryEqual(existing, action.entry)) {
        return state
      }
      const next = new Map(state.byId)
      next.set(action.entry.id, { ...action.entry, seq: action.seq })
      return { byId: next }
    }
    case "unregister": {
      if (!state.byId.has(action.id)) return state
      const next = new Map(state.byId)
      next.delete(action.id)
      return { byId: next }
    }
    default:
      return state
  }
}

export interface CenterContentProviderProps {
  children: ReactNode
}

/**
 * Provides the top-center content registry. Wrap the subtree that renders
 * the HUD top row (or any custom consumer of `useCenterContent`).
 */
export function CenterContentProvider({
  children,
}: CenterContentProviderProps) {
  const [state, dispatch] = useReducer(reducer, { byId: new Map() })

  // Monotonic registration counter for tie-breaking when priorities match.
  const seqRef = React.useRef(0)

  const registerEntry = useCallback((entry: CenterContentEntry) => {
    seqRef.current += 1
    dispatch({ type: "register", entry, seq: seqRef.current })
  }, [])

  const unregisterEntry = useCallback((id: string) => {
    dispatch({ type: "unregister", id })
  }, [])

  const value = useMemo<CenterContentContextValue>(() => {
    const entries = Array.from(state.byId.values()).sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority
      // Higher seq (registered later) wins on tie.
      return b.seq - a.seq
    })
    return { entries, registerEntry, unregisterEntry }
  }, [state, registerEntry, unregisterEntry])

  return (
    <CenterContentContext.Provider value={value}>
      {children}
    </CenterContentContext.Provider>
  )
}

/**
 * Read the sorted list of registered center-content entries (+ register /
 * unregister for advanced consumers). Returns an empty registry when no
 * provider is mounted so renderers compose safely outside a HUD.
 */
export function useCenterContent(): CenterContentContextValue {
  const ctx = useContext(CenterContentContext)
  if (ctx) return ctx
  return {
    entries: [],
    registerEntry: () => undefined,
    unregisterEntry: () => undefined,
  }
}

export interface UseRegisterCenterContentOptions {
  id: string
  priority: number
  node: ReactNode
  label?: string
  /** When false, the entry is unregistered (without unmounting caller). */
  enabled?: boolean
}

/**
 * Register a node into the HUD's top-center slot for the lifetime of
 * the calling component. `node` should be a stable reference (wrap in
 * `useMemo` if it depends on frequently-changing values) to avoid
 * re-registering on every parent render.
 */
export function useRegisterCenterContent(
  options: UseRegisterCenterContentOptions,
): void {
  const { id, priority, node, label, enabled = true } = options
  const { registerEntry, unregisterEntry } = useCenterContent()

  useEffect(() => {
    if (!enabled) {
      unregisterEntry(id)
      return
    }
    registerEntry({ id, priority, node, label })
    return () => unregisterEntry(id)
  }, [id, priority, node, label, enabled, registerEntry, unregisterEntry])
}
