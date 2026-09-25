/**
 * Slot ordering constants for HUD registries.
 *
 * Order = z-position in the bottom-chrome stack (lower number renders
 * higher / further from the viewport bottom). Custom bars can slot in
 * between built-ins by picking an integer in the gap (e.g. video
 * controls at order ~50 sits between orbs (10) and the AI input (90)).
 */
export const DEFAULT_BOTTOM_BAR_ORDER = {
  orbs: 10,
  aiInput: 90,
} as const
