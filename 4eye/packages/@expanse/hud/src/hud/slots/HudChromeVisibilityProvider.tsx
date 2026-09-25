"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"

/**
 * HUD chrome visibility registry.
 *
 * Some routes / flows want to temporarily hide pieces of the shared HUD
 * chrome (e.g. the bottom AI input bar during the home slideshow until the
 * final reward step). Rather than threading props through every shared
 * surface, descendants register a *hide claim* against named chrome ids.
 *
 * The provider aggregates: a chrome id is hidden if **any** active
 * registration lists it. Empty `hide: []` is a no-op (so callers can pass
 * conditional arrays without having to add/remove the registration on every
 * state change).
 *
 * Pattern intentionally mirrors {@link HudInsetsProvider} — same id-keyed
 * registry, same effect-based useRegister hook, same "no provider →
 * default" fallback.
 */

/**
 * Named pieces of HUD chrome that can be conditionally hidden.
 * Extend the union as new chrome surfaces opt in.
 *
 * - `aiInputBar`     just the bottom AI input bar (orbs stay visible)
 * - `bottomOrbBar`   just the bottom orb bar (AI input stays visible)
 * - `bottomChrome`   the entire bottom stack (orb bar + AI input bar)
 * - `topRow`         the top fixed row (status bar + ContextBar + minimap)
 * - `leftRail`       the persistent left rail (game / settings FAB cluster)
 * - `rightRail`      the persistent right rail (profile FAB cluster)
 */
export type HudChromeId =
  | "aiInputBar"
  | "bottomOrbBar"
  | "bottomChrome"
  | "topRow"
  | "leftRail"
  | "rightRail"

export interface HudChromeHideEntry {
  /** Stable id used to update / unregister */
  id: string
  /** Chrome ids this consumer wants hidden. Empty array = no-op. */
  hide: HudChromeId[]
  /** Optional human label, surfaced by debug overlays */
  label?: string
}

export type HudChromeHidden = Record<HudChromeId, boolean>

const ALL_CHROME_IDS: HudChromeId[] = [
  "aiInputBar",
  "bottomOrbBar",
  "bottomChrome",
  "topRow",
  "leftRail",
  "rightRail",
]

const NONE_HIDDEN: HudChromeHidden = ALL_CHROME_IDS.reduce((acc, id) => {
  acc[id] = false
  return acc
}, {} as HudChromeHidden)

interface HudChromeVisibilityContextValue {
  hidden: HudChromeHidden
  entries: HudChromeHideEntry[]
  registerHide: (entry: HudChromeHideEntry) => void
  unregisterHide: (id: string) => void
}

const HudChromeVisibilityContext =
  createContext<HudChromeVisibilityContextValue | null>(null)

type Action =
  | { type: "register"; entry: HudChromeHideEntry }
  | { type: "unregister"; id: string }

function entryEqual(a: HudChromeHideEntry, b: HudChromeHideEntry): boolean {
  if (a.label !== b.label) return false
  if (a.hide.length !== b.hide.length) return false
  for (let i = 0; i < a.hide.length; i++) {
    if (a.hide[i] !== b.hide[i]) return false
  }
  return true
}

function reducer(
  state: Map<string, HudChromeHideEntry>,
  action: Action,
): Map<string, HudChromeHideEntry> {
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

export interface HudChromeVisibilityProviderProps {
  children: ReactNode
}

/**
 * Provides the HUD chrome-visibility registry. Wrap any subtree containing
 * the chrome whose visibility may be toggled by descendants.
 */
export function HudChromeVisibilityProvider({
  children,
}: HudChromeVisibilityProviderProps) {
  const [entriesMap, dispatch] = useReducer(
    reducer,
    new Map<string, HudChromeHideEntry>(),
  )

  const registerHide = useCallback((entry: HudChromeHideEntry) => {
    dispatch({ type: "register", entry })
  }, [])

  const unregisterHide = useCallback((id: string) => {
    dispatch({ type: "unregister", id })
  }, [])

  const value = useMemo<HudChromeVisibilityContextValue>(() => {
    const hidden: HudChromeHidden = { ...NONE_HIDDEN }
    const entries: HudChromeHideEntry[] = []
    for (const entry of entriesMap.values()) {
      entries.push(entry)
      for (const chromeId of entry.hide) {
        hidden[chromeId] = true
      }
    }
    return { hidden, entries, registerHide, unregisterHide }
  }, [entriesMap, registerHide, unregisterHide])

  return (
    <HudChromeVisibilityContext.Provider value={value}>
      {children}
    </HudChromeVisibilityContext.Provider>
  )
}

/**
 * Read aggregated chrome-hidden flags + the underlying registration list.
 *
 * Returns "nothing hidden" when no provider is mounted, so the hook is
 * safe to call from chrome components that may render outside a HUD.
 */
export function useHudChromeVisibility(): HudChromeVisibilityContextValue {
  const ctx = useContext(HudChromeVisibilityContext)
  if (ctx) return ctx
  return {
    hidden: NONE_HIDDEN,
    entries: [],
    registerHide: () => undefined,
    unregisterHide: () => undefined,
  }
}

/**
 * Register a chrome-hide claim for the lifetime of the calling component.
 * Pass an empty `hide: []` (or `enabled: false`) to opt out without
 * unmounting.
 *
 * @example
 * ```tsx
 * useRegisterHudChromeHide({
 *   id: "home-slideshow-hide-ai",
 *   hide: activeIdx === finalIdx ? [] : ["aiInputBar"],
 *   label: "Hidden during home slideshow",
 * })
 * ```
 */
export function useRegisterHudChromeHide(opts: {
  id: string
  hide: HudChromeId[]
  label?: string
  enabled?: boolean
}) {
  const { registerHide, unregisterHide } = useHudChromeVisibility()
  const enabled = opts.enabled !== false && opts.hide.length > 0
  // Stable join key so the effect doesn't refire on identity-only changes.
  const hideKey = opts.hide.join("|")

  React.useEffect(() => {
    if (!enabled) {
      unregisterHide(opts.id)
      return
    }
    registerHide({ id: opts.id, hide: opts.hide, label: opts.label })
    return () => unregisterHide(opts.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, opts.id, hideKey, opts.label, registerHide, unregisterHide])
}
