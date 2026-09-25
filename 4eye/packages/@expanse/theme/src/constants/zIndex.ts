/**
 * Z-Index Strategy for @expanse/theme
 * 
 * Centralized z-index values ensure consistent layering across the package.
 * These values are carefully chosen to integrate with MUI's z-index scale.
 * 
 * @see https://mui.com/material-ui/customization/z-index/
 * 
 * MUI Default Z-Index Reference:
 * - mobileStepper: 1000
 * - speedDial: 1050
 * - appBar: 1100
 * - drawer: 1200
 * - modal: 1300
 * - snackbar: 1400
 * - tooltip: 1500
 */

/**
 * Z-Index layers for layout components
 */
export const Z_INDEX = {
  /** Base content layer (tile/page content) */
  CONTENT: 0,

  /** Fixed position bars (top/bottom/left/right) */
  BARS: 100,

  /** Overlay zones (minimap, controls, floating elements) */
  OVERLAY_ZONES: 200,

  /** Action bars and navigation bars */
  ACTION_BARS: 1100,

  /**
   * MinimapFullView overlay — sits above page content + action bars but
   * below CHROME so the persistent FullHud chrome (top bar, AIInputBar)
   * stays interactive on top of the map view.
   */
  FULL_MAP_VIEW: 1150,

  /**
   * Persistent HUD chrome that must stay interactive above full-screen
   * overlays (FULL_MAP_VIEW, Scene Studio): HudTopRow, and the left/right
   * rails (game/settings/profile FABs + their flyout panels).
   */
  PERSISTENT_RAILS: 1200,

  /** Board chrome overlay (should be above most UI) */
  CHROME: 1400,

  /**
   * AIChatPanel when expanded to its hero state — sits above CHROME
   * (Phase 5 / sibling deliverable). Documented here so layering stays
   * explicit even before that component lands.
   */
  AI_CHAT_PANEL_EXPANDED: 1450,

  /** Backdrop/overlay layers */
  BACKDROP: 9999,

  // Reference values from MUI (for integration awareness)
  /** MUI Modal z-index (reference only, not used directly) */
  _MUI_MODAL: 1300,
  
  /** MUI Tooltip z-index (reference only, not used directly) */
  _MUI_TOOLTIP: 1500,
} as const

/**
 * Z-Index type for type safety
 */
export type ZIndexLayer = (typeof Z_INDEX)[keyof typeof Z_INDEX]

/**
 * Get z-index value by layer name
 * 
 * @param layer - The layer name
 * @returns The z-index value
 * 
 * @example
 * ```tsx
 * sx={{ zIndex: getZIndex('CHROME') }}
 * ```
 */
export function getZIndex(layer: keyof typeof Z_INDEX): number {
  return Z_INDEX[layer]
}

/**
 * Create a custom z-index relative to a base layer
 * 
 * @param layer - The base layer
 * @param offset - Offset from base layer (can be negative)
 * @returns The calculated z-index
 * 
 * @example
 * ```tsx
 * // One level above CHROME
 * sx={{ zIndex: relativeZIndex('CHROME', 1) }}
 * ```
 */
export function relativeZIndex(
  layer: keyof typeof Z_INDEX,
  offset: number
): number {
  return Z_INDEX[layer] + offset
}

export default Z_INDEX
