/**
 * Map Grid and layout slot configuration types.
 */

import type { ReactNode } from "react"
import type { Position, NavigationMethod } from "./Position.types"
import type { TileConfig } from "./TileConfig.types"
import type { NavigationAnimationConfig, TileInteractionConfig } from "./NavigationAnimation.types"
import type { InputConfig } from "./InputConfig.types"
import type { RoutingConfig } from "./RoutingConfig.types"

/** Bar slot configuration */
export interface BarConfig {
  enabled: boolean
  /** Height in px (for top/bottom) */
  height?: number
  /** Width in px (for left/right) */
  width?: number
  sticky?: boolean
  collapsible?: boolean
  defaultCollapsed?: boolean
  content?: ReactNode
}

/** All layout slot configurations */
export interface LayoutSlotsConfig {
  top?: BarConfig
  bottom?: BarConfig
  left?: BarConfig
  right?: BarConfig
}

/** Map grid dimensions and behavior */
export interface MapGridDimensions {
  width: number
  height: number
  homePosition?: Position
  wrapAround?: boolean
}

/** Complete map grid navigation configuration */
export interface MapGridNavigationConfig {
  dimensions: MapGridDimensions
  tiles: readonly TileConfig[]
  /**
   * Optional human-readable labels for the categories used by tiles in
   * `tiles[].display.category`. Surfaced via `useNavigation().config` so
   * downstream UI (e.g. `useMinimapLegendItems`) can render legend
   * entries with friendly group names instead of raw category keys.
   *
   * When omitted, the legend falls back to neutral placeholders
   * (`Group A`, `Group B`, …) shown via tooltip on color swatches —
   * prefer that over premature semantic names that collide with tile
   * titles.
   *
   * Colors for each category are owned by the theme (see
   * `theme.components.ExpanseMinimapTile.categoryColors`); this map only
   * provides the display label half of the legend entry.
   *
   * @example
   * categoryLabels: {
   *   primary:   "Group A",
   *   secondary: "Group B",
   *   tertiary:  "Group C",
   * }
   */
  categoryLabels?: Record<string, string>
  routing?: RoutingConfig
  animation?: NavigationAnimationConfig
  tileInteraction?: TileInteractionConfig
  inputs?: InputConfig
  layout?: LayoutSlotsConfig

  onNavigate?: (from: Position, to: Position, method: NavigationMethod) => void
  onTileEnter?: (tile: TileConfig) => void
  onTileLeave?: (tile: TileConfig) => void
}


