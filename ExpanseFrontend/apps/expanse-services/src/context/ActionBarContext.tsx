"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

// =============================================================================
// Types
// =============================================================================

export type ActionBarMode = "default" | "edit" | "select" | "view" | "hidden"

export interface ActionBarState {
  mode: ActionBarMode
  title?: string
  subtitle?: string
  actions?: ActionBarAction[]
}

export interface ActionBarAction {
  id: string
  icon: string
  label: string
  onClick: () => void
  disabled?: boolean
  badge?: number | string
}

export interface ActionBarContextType {
  // Bar states
  leftBar: ActionBarState
  rightBar: ActionBarState
  topBar: ActionBarState
  bottomBar: ActionBarState

  // Setters
  setLeftBar: (state: Partial<ActionBarState>) => void
  setRightBar: (state: Partial<ActionBarState>) => void
  setTopBar: (state: Partial<ActionBarState>) => void
  setBottomBar: (state: Partial<ActionBarState>) => void

  // Quick mode setters
  setLeftMode: (mode: ActionBarMode) => void
  setRightMode: (mode: ActionBarMode) => void
  setTopMode: (mode: ActionBarMode) => void
  setBottomMode: (mode: ActionBarMode) => void

  // Reset
  resetBars: () => void
}

// =============================================================================
// Context
// =============================================================================

const ActionBarContext = createContext<ActionBarContextType | null>(null)

// =============================================================================
// Hook
// =============================================================================

export function useActionBar(): ActionBarContextType {
  const context = useContext(ActionBarContext)
  if (!context) {
    throw new Error("useActionBar must be used within ActionBarProvider")
  }
  return context
}

// =============================================================================
// Provider
// =============================================================================

const DEFAULT_STATE: ActionBarState = {
  mode: "default",
}

interface ActionBarProviderProps {
  children: ReactNode
}

export function ActionBarProvider({ children }: ActionBarProviderProps) {
  const [leftBar, setLeftBarState] = useState<ActionBarState>(DEFAULT_STATE)
  const [rightBar, setRightBarState] = useState<ActionBarState>(DEFAULT_STATE)
  const [topBar, setTopBarState] = useState<ActionBarState>(DEFAULT_STATE)
  const [bottomBar, setBottomBarState] = useState<ActionBarState>(DEFAULT_STATE)

  const setLeftBar = useCallback((state: Partial<ActionBarState>) => {
    setLeftBarState((prev) => ({ ...prev, ...state }))
  }, [])

  const setRightBar = useCallback((state: Partial<ActionBarState>) => {
    setRightBarState((prev) => ({ ...prev, ...state }))
  }, [])

  const setTopBar = useCallback((state: Partial<ActionBarState>) => {
    setTopBarState((prev) => ({ ...prev, ...state }))
  }, [])

  const setBottomBar = useCallback((state: Partial<ActionBarState>) => {
    setBottomBarState((prev) => ({ ...prev, ...state }))
  }, [])

  const setLeftMode = useCallback((mode: ActionBarMode) => {
    setLeftBarState((prev) => ({ ...prev, mode }))
  }, [])

  const setRightMode = useCallback((mode: ActionBarMode) => {
    setRightBarState((prev) => ({ ...prev, mode }))
  }, [])

  const setTopMode = useCallback((mode: ActionBarMode) => {
    setTopBarState((prev) => ({ ...prev, mode }))
  }, [])

  const setBottomMode = useCallback((mode: ActionBarMode) => {
    setBottomBarState((prev) => ({ ...prev, mode }))
  }, [])

  const resetBars = useCallback(() => {
    setLeftBarState(DEFAULT_STATE)
    setRightBarState(DEFAULT_STATE)
    setTopBarState(DEFAULT_STATE)
    setBottomBarState(DEFAULT_STATE)
  }, [])

  const value: ActionBarContextType = {
    leftBar,
    rightBar,
    topBar,
    bottomBar,
    setLeftBar,
    setRightBar,
    setTopBar,
    setBottomBar,
    setLeftMode,
    setRightMode,
    setTopMode,
    setBottomMode,
    resetBars,
  }

  return (
    <ActionBarContext.Provider value={value}>
      {children}
    </ActionBarContext.Provider>
  )
}
