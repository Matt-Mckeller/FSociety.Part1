/**
 * Shared visual constants for every side-rail action button (Game,
 * Spellbook, Pipeline, Profile, Settings). One family: same size,
 * same dark-glass fill, same shadow, same inter-button gap — so the
 * rail reads as a tightly coupled column instead of mixed chrome.
 */

/** Face size (px) for square rail buttons. */
export const RAIL_PILL_SIZE = 44

/** Vertical gap between every rail action button. Matches FabCluster. */
export const RAIL_ITEM_GAP = 6

/** MUI `borderRadius` theme units for square rail buttons (`theme.shape` × 2). */
export const RAIL_PILL_RADIUS = 2

/** Shared dark-glass gradient base for built-in and registered rail buttons. */
export const RAIL_PILL_BACKGROUND =
  "linear-gradient(135deg, #0d1117 0%, #161b22 55%, #0d1117 100%)"

export const RAIL_PILL_SHADOW = "0 2px 8px rgba(0,0,0,0.35)"
export const RAIL_PILL_SHADOW_ACTIVE = "0 0 0 2px rgba(255,255,255,0.35)"
