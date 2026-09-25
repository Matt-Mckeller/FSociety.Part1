"use client"

import React, { ReactNode } from "react"
import type { MapGridNavigationConfig, Position } from "../navigation/types"
import { NavigationProvider } from "../navigation/providers/NavigationProvider"
import { TileProvider } from "../tiles/providers/TileProvider"

// =============================================================================
// Types
// =============================================================================

/**
 * Combined layout configuration for map grid layouts
 * 
 * A "Map Grid" is the spatial navigation surface for the site/app.
 * Think of it like a game map - tiles are positioned in 2D space.
 */
export interface MapLayoutConfig {
  /** Map grid navigation configuration */
  grid: MapGridNavigationConfig
  
  /** Initial position */
  initialPosition?: Position
}

/**
 * MapLayoutProvider props
 */
export interface MapLayoutProviderProps {
  /** Layout configuration */
  config: MapLayoutConfig
  
  /** Children */
  children: ReactNode
}

// =============================================================================
// Provider
// =============================================================================

/**
 * MapLayoutProvider
 * 
 * Composes all providers needed for a map grid layout:
 * - NavigationProvider (position state, navigation actions, keyboard input)
 * - TileProvider (tile hover state)
 * 
 * This is the recommended provider for map grid layouts.
 * 
 * @example
 * ```tsx
 * const config: MapLayoutConfig = {
 *   grid: {
 *     dimensions: { width: 9, height: 9 },
 *     tiles: [...],
 *   },
 * }
 * 
 * <MapLayoutProvider config={config}>
 *   <App />
 * </MapLayoutProvider>
 * ```
 * 
 * Then use hooks inside:
 * ```tsx
 * const { position, navigate, currentTile, config } = useNavigation()
 * const { isHovered } = useTileGrid()
 * ```
 */
export function MapLayoutProvider({
  config,
  children,
}: MapLayoutProviderProps) {
  return (
    <NavigationProvider 
      config={config.grid} 
      initialPosition={config.initialPosition}
    >
      <TileProvider>
        {children}
      </TileProvider>
    </NavigationProvider>
  )
}

export default MapLayoutProvider
