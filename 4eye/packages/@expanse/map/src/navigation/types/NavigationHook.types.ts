/**
 * Navigation hook interface — the return type of useNavigation.
 */

import type { Direction, NavigationStyle, Position } from "./Position.types"
import type { TileConfig } from "./TileConfig.types"
import type { MapGridNavigationConfig } from "./MapGridNavigation.types"

export interface NavigationHook {
  // Position State
  position: Position
  gridSize: { width: number; height: number }
  homePosition: Position
  config: MapGridNavigationConfig

  // Navigation Actions
  navigate: (direction: Direction) => void
  navigateTo: (x: number, y: number) => void
  goHome: () => void
  goBack: () => void
  goForward: () => void

  /** True when `goBack()` would change position */
  canGoBack: boolean
  /** True when `goForward()` would change position */
  canGoForward: boolean

  // Query Helpers
  canNavigate: (direction: Direction) => boolean
  isValidPosition: (x: number, y: number) => boolean
  isHome: boolean

  // Tile Info
  currentTile: TileConfig | null
  getTileAt: (x: number, y: number) => TileConfig | null

  // Mode
  navigationStyle: NavigationStyle
  setNavigationStyle: (style: NavigationStyle) => void
  gridEnabled: boolean
}
