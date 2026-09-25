"use client"

import React, { useMemo, type ReactNode } from "react"
import type {
  MapGridNavigationConfig,
  Position,
  NavigationHook,
} from "../types"
import { DEFAULT_INPUT_CONFIG } from "../types"
import { NavigationContext } from "../contexts/NavigationContext"
import { HudInputContext, useCreateHudInputValue } from "../contexts/HudInputContext"
import {
  useNavigationState,
  useNavigationActions,
  useKeyboardNavigation,
  useRouteSync,
  useSEOSync,
} from "../hooks"

// =============================================================================
// Types
// =============================================================================

export interface NavigationProviderProps {
  /** Map grid navigation configuration */
  config: MapGridNavigationConfig
  /** Initial position (defaults to config.dimensions.homePosition) */
  initialPosition?: Position
  /** Children */
  children: ReactNode
}

// =============================================================================
// Provider
// =============================================================================

/**
 * NavigationProvider
 *
 * Single source of truth for map-grid navigation state, keyboard input,
 * URL synchronisation, and SEO metadata. Exposes its value through the
 * generic `NavigationContext` — consumers read it via `useNavigation()`.
 *
 * @example
 * ```tsx
 * const config: MapGridNavigationConfig = {
 *   dimensions: { width: 9, height: 9 },
 *   tiles: [...],
 * };
 *
 * <NavigationProvider config={config}>
 *   <App />
 * </NavigationProvider>
 * ```
 */
export function NavigationProvider({
  config,
  initialPosition,
  children,
}: NavigationProviderProps) {
  const gridConfig = config.dimensions

  // Merge input config with defaults
  const inputConfig = useMemo(
    () => ({
      keyboard: { ...DEFAULT_INPUT_CONFIG.keyboard, ...config.inputs?.keyboard },
      buttons: { ...DEFAULT_INPUT_CONFIG.buttons, ...config.inputs?.buttons },
      minimap: { ...DEFAULT_INPUT_CONFIG.minimap, ...config.inputs?.minimap },
      touch: { ...DEFAULT_INPUT_CONFIG.touch, ...config.inputs?.touch },
      scroll: { ...DEFAULT_INPUT_CONFIG.scroll, ...config.inputs?.scroll },
    }),
    [config.inputs]
  )

  // Core state management
  const state = useNavigationState({ config, initialPosition })

  // Navigation actions
  const actions = useNavigationActions({
    position: state.position,
    setPosition: state.setPosition,
    pushHistory: state.pushHistory,
    popHistory: state.popHistory,
    clearForwardHistory: state.clearForwardHistory,
    pushForwardHistory: state.pushForwardHistory,
    popForwardHistory: state.popForwardHistory,
    homePosition: state.homePosition,
    gridConfig: {
      width: gridConfig.width,
      height: gridConfig.height,
      wrapAround: gridConfig.wrapAround,
    },
    getTileAt: state.getTileAt,
    isValidPosition: state.isValidPosition,
    currentTile: state.currentTile,
    lastNavigationMethod: state.lastNavigationMethod,
    config,
  })

  // HUD input stack — lets surfaces (e.g. home slideshow) register handlers
  // that get first crack at keyboard events before the default grid nav.
  const hudInput = useCreateHudInputValue()

  // Keyboard input handling
  useKeyboardNavigation({
    inputConfig,
    navigate: actions.navigate,
    goHome: actions.goHome,
    goBack: actions.goBack,
    canNavigate: actions.canNavigate,
    hudInput,
  })

  // URL synchronization
  useRouteSync({
    position: state.position,
    currentTile: state.currentTile,
    routing: config.routing,
  })

  // SEO metadata synchronization
  useSEOSync({ currentTile: state.currentTile })

  const isHome =
    state.position.x === state.homePosition.x &&
    state.position.y === state.homePosition.y

  const value = useMemo<NavigationHook>(
    () => ({
      // Position State
      position: state.position,
      gridSize: { width: gridConfig.width, height: gridConfig.height },
      homePosition: state.homePosition,
      config,

      // Navigation Actions
      navigate: actions.navigate,
      navigateTo: actions.navigateTo,
      goHome: actions.goHome,
      goBack: actions.goBack,
      goForward: actions.goForward,

      // History availability (for HUD chrome)
      canGoBack: state.history.length > 0,
      canGoForward: state.forwardHistory.length > 0,

      // Query Helpers
      canNavigate: actions.canNavigate,
      isValidPosition: state.isValidPosition,
      isHome,

      // Tile Info
      currentTile: state.currentTile,
      getTileAt: state.getTileAt,

      // Mode
      navigationStyle: state.navigationStyle,
      setNavigationStyle: state.setNavigationStyle,
      gridEnabled: true,
    }),
    [
      state.position,
      gridConfig.width,
      gridConfig.height,
      state.homePosition,
      config,
      actions.navigate,
      actions.navigateTo,
      actions.goHome,
      actions.goBack,
      actions.goForward,
      actions.canNavigate,
      state.history.length,
      state.forwardHistory.length,
      state.isValidPosition,
      isHome,
      state.currentTile,
      state.getTileAt,
      state.navigationStyle,
      state.setNavigationStyle,
    ]
  )

  return (
    <NavigationContext.Provider value={value}>
      <HudInputContext.Provider value={hudInput}>
        {children}
      </HudInputContext.Provider>
    </NavigationContext.Provider>
  )
}
