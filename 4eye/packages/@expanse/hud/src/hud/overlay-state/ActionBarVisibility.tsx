"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"

// =============================================================================
// ActionBarVisibility — global toggle for the HUD bottom action bars
// =============================================================================

export interface ActionBarVisibilityValue {
  /** Whether the bottom action bars are currently shown. */
  visible: boolean
  /** Toggle visible on/off. */
  toggle: () => void
  /** Set visibility explicitly. */
  setVisible: (v: boolean) => void
}

const ActionBarVisibilityContext = createContext<ActionBarVisibilityValue | null>(null)

export interface ActionBarVisibilityProviderProps {
  children: ReactNode
  /** Initial visibility state. @default true */
  defaultVisible?: boolean
}

/**
 * Provides a global visibility flag for the HUD bottom action bars.
 *
 * Mount this inside `FullHudProviders`. The toggle FAB in `HudLeftRail`
 * calls `toggle()`; action bar registrants can read `visible` via
 * `useActionBarVisibility()` and pass it as the `enabled` option to
 * `useRegisterBottomBar`.
 */
export function ActionBarVisibilityProvider({
  children,
  defaultVisible = true,
}: ActionBarVisibilityProviderProps) {
  const [visible, setVisibleState] = useState(defaultVisible)
  const toggle = useCallback(() => setVisibleState((v) => !v), [])
  const setVisible = useCallback((v: boolean) => setVisibleState(v), [])

  return (
    <ActionBarVisibilityContext.Provider value={{ visible, toggle, setVisible }}>
      {children}
    </ActionBarVisibilityContext.Provider>
  )
}

/**
 * Read the current bottom-action-bar visibility state and its toggle.
 *
 * Safe to call outside a provider — returns a stable "always visible"
 * fallback so components work in Storybook / tests without a provider.
 */
export function useActionBarVisibility(): ActionBarVisibilityValue {
  const ctx = useContext(ActionBarVisibilityContext)
  if (ctx) return ctx
  // Fallback: no provider → bars always visible, noop toggle.
  return { visible: true, toggle: () => undefined, setVisible: () => undefined }
}
