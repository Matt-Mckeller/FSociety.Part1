/**
 * Tile configuration types for the grid navigation system.
 */

import type { ComponentType } from "react"
import type { Position } from "./Position.types"

/**
 * Grouping key for a tile, used for legend grouping and category color lookup.
 *
 * The three canonical keys (`"primary" | "secondary" | "tertiary"`) get
 * autocomplete and pair with `MapGridNavigationConfig.categoryLabels`, but any
 * string is accepted so existing configs can use friendly labels directly
 * (e.g. `"Home"`, `"Learning"`, `"Social"`).
 */
export type TileCategory = "primary" | "secondary" | "tertiary" | (string & {})

/** SEO configuration for a tile */
export interface TileSEOConfig {
  /** Page title (document.title, og:title) */
  title: string
  /** Meta description */
  description?: string
  /** Meta keywords */
  keywords?: string[]
  /** Open Graph image URL */
  ogImage?: string
}

/** Visual display configuration for a tile */
export interface TileDisplayConfig {
  /** Short label shown on minimap/grid */
  label: string
  /** Icon component to display */
  icon?: ComponentType<{ className?: string }>
  /** Color states */
  colors: {
    /** Default tile color when not active */
    inactive: string
    /** Color when this is the current position */
    active: string
    /** Color on hover (defaults to lighten active) */
    hover?: string
  }
  /** Category for grouping tiles */
  category?: TileCategory
  /**
   * Optional ring on the minimap chip. With {@link chip} `"outline"`, this
   * is the Expanse 1:2:3 concentric-ring ink. Filled chips ignore it.
   */
  ring?: string
  /**
   * `"outline"` — open fill + brand concentric rings (Game / Soon shoulders).
   * `"filled"` (default) — category swatch fill.
   */
  chip?: "filled" | "outline"
}

/** Behavioral configuration for a tile */
export interface TileBehaviorConfig {
  /** Tile exists but cannot be navigated to */
  disabled?: boolean
  /** Tile not shown in minimap */
  hidden?: boolean
  /** External URL - opens in new tab */
  external?: string
}

/** Complete tile configuration */
export interface TileConfig {
  /** Grid position */
  position: Position
  /** Unique identifier */
  id: string
  /** SEO and meta tag configuration */
  seo: TileSEOConfig
  /** Custom URL path (e.g., "/settings"). If undefined, uses grid position */
  url?: string
  /** Visual display configuration */
  display: TileDisplayConfig
  /** Behavioral configuration */
  behavior?: TileBehaviorConfig
}
