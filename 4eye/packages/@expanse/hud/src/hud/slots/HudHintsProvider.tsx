"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

// =============================================================================
// Types
// =============================================================================

/**
 * Individual hint kinds that can be shown alongside HUD action buttons.
 * Multiple hints can be active simultaneously (e.g. labels AND hotkeys).
 *
 * Components that participate (SettingsBar's hint toggle, NavigationBar,
 * OrbBar, ContextBar, etc.) read the active set to decide what to render.
 */
export type HudHint = "labels" | "hotkeys"

export const ALL_HUD_HINTS: readonly HudHint[] = ["labels", "hotkeys"]

export interface HudHintsContextValue {
  /** Currently active hint kinds. Empty array == nothing extra shown. */
  hints: HudHint[]
  /** Convenience query — is this kind active? */
  hasHint: (kind: HudHint) => boolean
  /** Replace the active set wholesale. */
  setHints: (next: HudHint[]) => void
  /** Add or remove a single hint kind. */
  toggleHint: (kind: HudHint) => void
}

// =============================================================================
// Context
// =============================================================================

const HudHintsContext = createContext<HudHintsContextValue | undefined>(undefined)

// =============================================================================
// Provider
// =============================================================================

export interface HudHintsProviderProps {
  children: ReactNode
  /** Initial active hint kinds (uncontrolled). @default [] */
  defaultHints?: HudHint[]
  /** Controlled active hint kinds */
  hints?: HudHint[]
  /** Called when the active hint set changes */
  onHintsChange?: (hints: HudHint[]) => void
}

function dedupe(hints: HudHint[]): HudHint[] {
  // Preserve canonical order so consumers get a stable array shape.
  return ALL_HUD_HINTS.filter((h) => hints.includes(h))
}

export function HudHintsProvider({
  children,
  defaultHints = [],
  hints: controlled,
  onHintsChange,
}: HudHintsProviderProps) {
  const [internal, setInternal] = useState<HudHint[]>(() => dedupe(defaultHints))
  const isControlled = controlled !== undefined
  const hints = isControlled ? dedupe(controlled!) : internal

  const setHints = useCallback(
    (next: HudHint[]) => {
      const normalized = dedupe(next)
      if (!isControlled) setInternal(normalized)
      onHintsChange?.(normalized)
    },
    [isControlled, onHintsChange]
  )

  const toggleHint = useCallback(
    (kind: HudHint) => {
      const next = hints.includes(kind)
        ? hints.filter((h) => h !== kind)
        : [...hints, kind]
      setHints(next)
    },
    [hints, setHints]
  )

  const hasHint = useCallback((kind: HudHint) => hints.includes(kind), [hints])

  const value = useMemo(
    () => ({ hints, hasHint, setHints, toggleHint }),
    [hints, hasHint, setHints, toggleHint]
  )

  return (
    <HudHintsContext.Provider value={value}>{children}</HudHintsContext.Provider>
  )
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Read the current HUD hint set from context.
 *
 * Returns a safe inert fallback when used outside a `HudHintsProvider`,
 * so leaf components can opt-in without breaking unprovided trees.
 */
export function useHudHints(): HudHintsContextValue {
  const ctx = useContext(HudHintsContext)
  if (ctx) return ctx
  return {
    hints: [],
    hasHint: () => false,
    setHints: () => undefined,
    toggleHint: () => undefined,
  }
}

/** Whether a real `HudHintsProvider` wraps the current tree. */
export function useHasHudHintsProvider(): boolean {
  return useContext(HudHintsContext) !== undefined
}
