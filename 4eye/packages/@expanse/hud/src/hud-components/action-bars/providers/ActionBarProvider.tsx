"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  ReactNode,
} from "react"
import {
  ActionBarState,
  ActionBarAction,
  ActionBarInstanceState,
  initialActionBarState,
  actionBarReducer,
  actionBarActions,
} from "../state"
import type {
  ActionBarConfig,
  ActionBarItem,
  ActionBarAnchor,
  ActionBarPosition,
  ActionBarPreset,
} from "../types"

// =============================================================================
// Context Value Type
// =============================================================================

export interface ActionBarContextValue {
  /** Current state */
  state: ActionBarState
  
  /** Dispatch an action */
  dispatch: React.Dispatch<ActionBarAction>
  
  /** Register a bar */
  registerBar: (config: ActionBarConfig) => void
  
  /** Unregister a bar */
  unregisterBar: (id: string) => void
  
  /** Update a bar */
  updateBar: (id: string, updates: Partial<ActionBarConfig>) => void
  
  /** Set bar items */
  setBarItems: (id: string, items: ActionBarItem[]) => void
  
  /** Set bar visibility */
  setBarVisibility: (id: string, visible: boolean) => void
  
  /** Toggle bar visibility */
  toggleBarVisibility: (id: string) => void
  
  /** Set bar collapsed state */
  setBarCollapsed: (id: string, collapsed: boolean) => void
  
  /** Toggle bar collapsed state */
  toggleBarCollapsed: (id: string) => void
  
  /** Get bar by ID */
  getBar: (id: string) => ActionBarInstanceState | undefined
  
  /** Get bars at anchor */
  getBarsAtAnchor: (anchor: ActionBarAnchor) => ActionBarInstanceState[]
  
  /** Check if any bar exists at anchor */
  hasBarAtAnchor: (anchor: ActionBarAnchor) => boolean
}

// =============================================================================
// Context
// =============================================================================

const ActionBarContext = createContext<ActionBarContextValue | null>(null)

// =============================================================================
// Provider Props
// =============================================================================

export interface ActionBarProviderProps {
  children: ReactNode
  /** Initial bars to register */
  initialBars?: ActionBarConfig[]
}

// =============================================================================
// Provider Component
// =============================================================================

/**
 * ActionBar Provider
 * 
 * Manages global state for action bars. Provides context for registering,
 * updating, and querying action bars throughout the application.
 * 
 * @example
 * ```tsx
 * <ActionBarProvider>
 *   <App />
 * </ActionBarProvider>
 * ```
 * 
 * With initial bars:
 * ```tsx
 * <ActionBarProvider initialBars={[topBar, bottomBar]}>
 *   <App />
 * </ActionBarProvider>
 * ```
 */
export function ActionBarProvider({
  children,
  initialBars = [],
}: ActionBarProviderProps) {
  // Initialize state with initial bars
  const initialState = useMemo(() => {
    let state = initialActionBarState
    for (const bar of initialBars) {
      state = actionBarReducer(state, actionBarActions.registerBar(bar))
    }
    return state
  }, []) // Only compute once
  
  const [state, dispatch] = useReducer(actionBarReducer, initialState)
  
  // Action helpers
  const registerBar = useCallback((config: ActionBarConfig) => {
    dispatch(actionBarActions.registerBar(config))
  }, [])
  
  const unregisterBar = useCallback((id: string) => {
    dispatch(actionBarActions.unregisterBar(id))
  }, [])
  
  const updateBar = useCallback((id: string, updates: Partial<ActionBarConfig>) => {
    dispatch(actionBarActions.updateBar(id, updates))
  }, [])
  
  const setBarItems = useCallback((id: string, items: ActionBarItem[]) => {
    dispatch(actionBarActions.setBarItems(id, items))
  }, [])
  
  const setBarVisibility = useCallback((id: string, visible: boolean) => {
    dispatch(actionBarActions.setBarVisibility(id, visible))
  }, [])
  
  const toggleBarVisibility = useCallback((id: string) => {
    const bar = state.bars[id]
    if (bar) {
      dispatch(actionBarActions.setBarVisibility(id, !bar.isVisible))
    }
  }, [state.bars])
  
  const setBarCollapsed = useCallback((id: string, collapsed: boolean) => {
    dispatch(actionBarActions.setBarCollapsed(id, collapsed))
  }, [])
  
  const toggleBarCollapsed = useCallback((id: string) => {
    const bar = state.bars[id]
    if (bar) {
      dispatch(actionBarActions.setBarCollapsed(id, !bar.isCollapsed))
    }
  }, [state.bars])
  
  // Query helpers
  const getBar = useCallback((id: string) => {
    return state.bars[id]
  }, [state.bars])
  
  const getBarsAtAnchor = useCallback((anchor: ActionBarAnchor) => {
    return state.barsByAnchor[anchor]
      .map(id => state.bars[id])
      .filter((bar): bar is ActionBarInstanceState => bar !== undefined)
  }, [state.bars, state.barsByAnchor])
  
  const hasBarAtAnchor = useCallback((anchor: ActionBarAnchor) => {
    return state.barsByAnchor[anchor].length > 0
  }, [state.barsByAnchor])
  
  // Context value
  const value = useMemo<ActionBarContextValue>(() => ({
    state,
    dispatch,
    registerBar,
    unregisterBar,
    updateBar,
    setBarItems,
    setBarVisibility,
    toggleBarVisibility,
    setBarCollapsed,
    toggleBarCollapsed,
    getBar,
    getBarsAtAnchor,
    hasBarAtAnchor,
  }), [
    state,
    registerBar,
    unregisterBar,
    updateBar,
    setBarItems,
    setBarVisibility,
    toggleBarVisibility,
    setBarCollapsed,
    toggleBarCollapsed,
    getBar,
    getBarsAtAnchor,
    hasBarAtAnchor,
  ])
  
  return (
    <ActionBarContext.Provider value={value}>
      {children}
    </ActionBarContext.Provider>
  )
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Access ActionBar context
 * 
 * @throws Error if used outside of ActionBarProvider
 */
export function useActionBars(): ActionBarContextValue {
  const context = useContext(ActionBarContext)
  if (!context) {
    throw new Error("useActionBars must be used within ActionBarProvider")
  }
  return context
}

/**
 * Access a specific bar by ID
 */
export function useBar(id: string): ActionBarInstanceState | undefined {
  const { getBar } = useActionBars()
  return getBar(id)
}

/**
 * Access bars at a specific anchor
 */
export function useBarsAtAnchor(anchor: ActionBarAnchor): ActionBarInstanceState[] {
  const { getBarsAtAnchor } = useActionBars()
  return getBarsAtAnchor(anchor)
}
