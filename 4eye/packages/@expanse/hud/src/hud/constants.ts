// =============================================================================
// HUD constants
// =============================================================================
//
// Cross-cutting numeric constants used by HUD chrome / tile primitives.
// Token-driven sizes (header height, action size, edge padding) live on
// `useHudBarSizes()` — only put values here that aren't responsive to
// the active breakpoint.

/**
 * Default width of the `MinimapDock` panel when docked top-right inside
 * `HudTopRow`. Used as the `minimap` inset claim so content can dodge
 * (or flow under) the dock.
 */
export const MINIMAP_DOCK_WIDTH = 300

/**
 * Vertical fade height applied at the top/bottom of `<TileContainer mode="scroll">`
 * so content gradually reveals/hides under the floating chrome instead of
 * popping at the safe-area edge.
 */
export const TILE_SCROLL_FADE_HEIGHT = 48
