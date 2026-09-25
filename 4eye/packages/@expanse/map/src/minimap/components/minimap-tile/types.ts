import type { ComponentType } from "react"
import type { SxProps, Theme } from "@mui/material"
import type { MinimapTileVariant } from "@expanse/theme"

export interface MinimapTileProps {
  // ------ Visual ------
  /** Shape/decoration variant for this tile. @default "default" */
  variant?: MinimapTileVariant
  /** Tile width & height in pixels. @default 22 */
  size?: number
  /** Icon size in pixels. @default 14 */
  iconSize?: number

  // ------ Content ------
  /** Human-readable label (page title, section name, etc.) */
  label?: string
  /**
   * What the tile renders inside / under itself.
   * - `"iconOnly"` (default): icon chip only.
   * - `"iconAndLabel"`: chip + label rendered underneath.
   * - `"titleOnTile"`: icon AND label rendered inside the chip face.
   * @default "iconOnly"
   */
  content?: "iconOnly" | "iconAndLabel" | "titleOnTile"
  /** Category key used for color lookup. e.g. "Home", "Learning" */
  category?: string
  /**
   * Explicit inactive background color. Overrides category lookup.
   */
  color?: string
  /**
   * Ring color override. When set, replaces the category-derived border
   * so a chip can keep its fill and still contrast with a neighbor.
   */
  ringColor?: string
  /**
   * Open-fill chip with Expanse concentric rings. Used by Game / Soon.
   */
  chip?: "filled" | "outline"
  /** Icon component rendered inside the tile */
  icon?: ComponentType<{ sx?: object }>

  // ------ State ------
  /** Whether this tile represents the current navigation position */
  isActive?: boolean
  /** True when no TileConfig is defined for this grid position. */
  isEmpty?: boolean
  /** Render as non-interactive (no cursor, no hover). */
  disabled?: boolean

  // ------ Behavior ------
  /** Renders as an <a> element when provided. */
  href?: string
  /** Opens href in a new tab. */
  external?: boolean
  /** Click handler. Renders as <button> when provided (without href). */
  onClick?: () => void

  // ------ Animation ------
  /** Show a pulse-glow animation on the active tile. @default true */
  animateActive?: boolean
  /**
   * Background fill opacity for inactive tiles.
   * @default 0.5
   */
  inactiveColorOpacity?: number

  // ------ Navigation hints (active tile only) ------
  /**
   * Render directional chevrons around the active chip.
   * @default false
   */
  showNavigationChevrons?: boolean
  /** @default true */
  canMoveUp?: boolean
  /** @default true */
  canMoveDown?: boolean
  /** @default true */
  canMoveLeft?: boolean
  /** @default true */
  canMoveRight?: boolean
  /**
   * Which directional chevron receives emphasis (larger, animated pulse).
   * @default "up"
   */
  emphasisDirection?: "up" | "down" | "left" | "right" | null
  /**
   * Gap in px between adjacent tiles. Used to position chevrons halfway into
   * the inter-tile gap (chevron center = gapHalf from chip edge). Forwarded
   * from the parent grid. @default 3
   */
  tileGap?: number
  /**
   * Active colors of the four neighboring tiles.
   * Used to tint directional chevrons with a destination-color preview.
   * Undefined for any direction where no neighbor exists.
   */
  neighborColors?: { up?: string; down?: string; left?: string; right?: string }

  // ------ Tile State Indicators ------
  /**
   * Exploration progress: 0 = not visited, 1-99 = partial, 100 = complete.
   * Shows a progress badge in the top-right corner with tooltip.
   * @default undefined (no badge shown)
   */
  progressPercent?: number
  /**
   * Mark this tile as the recommended next destination. Renders a 4-corner
   * bracket frame with blink animation (amber/gold accent).
   * @default false
   */
  isRecommended?: boolean

  // ------ Theming ------
  /** Per-instance category color overrides. */
  categoryColors?: Record<string, string>

  // ------ Callbacks ------
  /** Called when hover enters/leaves. */
  onHoverChange?: (info: MinimapTileHoverInfo | null) => void

  // ------ Style ------
  sx?: SxProps<Theme>
}

/** Data passed to `onHoverChange` consumers */
export interface MinimapTileHoverInfo {
  label: string
  category?: string
  color: string
  icon?: ComponentType<{ sx?: object }>
}
