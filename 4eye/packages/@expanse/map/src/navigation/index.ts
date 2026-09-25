/**
 * Navigation Module
 *
 * Map-grid navigation state management.
 *
 * Primary API:
 * - NavigationProvider — wraps your tree, owns position/keyboard/URL state
 * - useNavigation     — read state + dispatch actions inside the tree
 *
 * UI components (NavigationPad, ActionBar, Minimap, etc.) and layout
 * templates (DashboardLayout, FullScreenLayout, etc.) live in `../layout/`.
 */

// Provider and hook
export {
  NavigationProvider,
} from "./providers/NavigationProvider"

export type {
  NavigationProviderProps,
} from "./providers/NavigationProvider"

export {
  NavigationContext,
  useNavigation,
} from "./contexts/NavigationContext"

// HUD Input Stack (keyboard handler chain)
export {
  HudInputContext,
  HudInputProvider,
  useRegisterHudInput,
} from "./contexts/HudInputContext"
export type {
  HudInputContextValue,
  HudInputEvent,
  HudInputHandler,
} from "./contexts/HudInputContext"

// Utility functions (for custom navigation implementations)
export * from "./utils"

// Navigation hooks (for building custom providers)
export * from "./hooks"

// All navigation types (position, tile, animation, input, routing, grid, hook)
export * from "./types"

// Next.js router bridges (position ↔ URL synchronisation)
export * from "./bridges"
