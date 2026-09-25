// Main component
export { ActionBar } from "./components/ActionBar"
export { ActionBarLayered } from "./components/ActionBarLayered"

// Pre-wired HUD panel bars (for use as FabTrigger panel props)
export { GameActionBar, GAME_ITEMS } from "./components/GameActionBar"
export type { GameActionBarProps } from "./components/GameActionBar"
export { SettingsActionBar } from "./components/SettingsActionBar"
export type { } from "./components/SettingsActionBar"
export { MenuOrbList, MENU_ORB_PX } from "./components/MenuOrbList"
export type { MenuOrbListProps, MenuOrbItem, MenuOrbTone } from "./components/MenuOrbList"

// Types - ActionBar (simplified container)
export type {
  ActionBarProps,
  ActionBarLength,
  ActionBarThickness,
  ActionBarAlignment,
  ActionBarOrientation,
  ActionBarVariant,
  ActionBarShape,
  // New types
  ActionBarShapeConfig,
  ActionBarAsymmetricShape,
  ActionBarEdgeShape,
  ActionBarColorMode,
  ActionBarGradient,
  ActionBarGradientDirection,
  ActionBarGradientPreset,
  ActionBarAttachedEdge,
  ActionBarAttachedConfig,
  ActionBarLayerConfig,
  // Triple-layer types
  TripleLayerPreset,
  TripleLayerColorPreset,
  TripleLayerFillMode,
} from "./types/ActionBar.types"

export { 
  ACTION_BAR_THICKNESS_PX,
  ACTION_BAR_SHAPE_RADIUS,
  ACTION_BAR_EDGE_SHAPE_RADIUS,
  DEFAULT_THICKNESS,
  // Triple-layer constants
  TRIPLE_LAYER_STROKE_WIDTHS,
  TRIPLE_LAYER_OPACITIES,
  // Helpers
  resolveActionBarThickness,
  resolveActionBarShape,
  resolveActionBarAttached,
  resolveActionBarGradient,
} from "./types/ActionBar.types"

// Types - Position system (still available for NavBar)
export type {
  ActionBarAnchor,
  ActionBarLayer,
  ActionBarStretch,
  ActionBarPosition,
  ActionBarPreset,
  ActionBarItem,
  NavItem,
  MenuGroupItem,
  ActionBarSkin,
  ActionBarSize,
  ActionBarConfig,
} from "./types/ActionBarPosition.types"

export {
  ACTION_BAR_PRESETS,
  resolveActionBarPosition,
  ACTION_BAR_SIZE_PX,
  resolveActionBarSize,
  ALL_ANCHORS,
  getAnchorFromPosition,
} from "./types/ActionBarPosition.types"

// Types - NavBar
export type {
  NavItemResolveStrategy,
  NavBarConfig,
  NavBarProps,
  NavItemProps,
} from "./types/NavBar.types"

// Context - Surface color mode for child ActionButtons
export {
  ActionBarSurfaceContext,
  useActionBarSurface,
  type ActionBarSurfaceContextValue,
} from "./context"

// Hook - NavBar only (old useActionBar removed with new architecture)
export { useNavBar } from "./hooks/useNavBar"
export type { UseNavBarReturn } from "./hooks/useNavBar"

// NavBar variant (still uses the old position system)
export { NavBar } from "./variants/NavBar"

// NOTE: ActionBarSimple, ActionBarRich, ActionBarCollapsible were removed.
// Use ActionBar + ActionGroup + ActionButton instead for new implementations.

// Simple orientation-aware bar
export { SimpleBar } from "./components/SimpleBar"
export type { SimpleBarProps, SimpleBarItem, SimpleBarEdge } from "./components/SimpleBar"

// Resolvers - for deriving nav items from grid config
export {
  resolveNavItems,
  parseNavItemResolverOptions,
  // Utilities
  isLeftOfCenter,
  isRightOfCenter,
  distanceFromCenter,
  getGridCenter,
  filterValidTiles,
  convertTileToNavItem,
  convertTilesToNavItems,
  sortByProximity,
  limitItems,
} from "./resolvers"

export type {
  NavItemGroups,
  NavItemResolverOptions,
  NavItemResolverMode,
  NavItemResolverInput,
} from "./resolvers"
