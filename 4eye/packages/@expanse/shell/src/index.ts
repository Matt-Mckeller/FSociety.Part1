// =============================================================================
// @expanse/shell — public API
// =============================================================================
//
// MAP for AI / new contributors. Where to look first:
//
//   src/map-and-navigation/   ← Map navigation engine + minimap + tiles + history
//                               Owns: position state, keyboard nav, URL sync,
//                               minimap, tile grid, browser history.
//                               Public surface: NavigationProvider, useNavigation,
//                               MapLayoutProvider, Minimap*, Tile*, NavigationHistory*.
//
//   src/hud/                  ← HUD chrome system (the floating UI on top of a tile)
//                               Owns: slot registries (insets, bottom bars, hints),
//                               rails, docks, renderers, FullHud composition,
//                               TileContainer / TilePageRouter / HudContentArea.
//                               Read this BEFORE adding any chrome-aware component.
//
//   src/hud-components/       ← HUD widgets (NavigationPad, ActionBar, Orbs,
//                               OrbBar, FloatingControls, ContextBar,
//                               CurrentLocationBar, NextBestAction, …).
//                               These are the leaf UI used inside hud/ slots.
//
//   src/core/providers/       ← LayoutProvider (loading + drawer state),
//                               LayoutConfigProvider, MapLayoutProvider re-export.
//                               Page-transition hooks: useLayoutTransition, usePageKey
//                               (used by templates/ only).
//
//   src/templates/            ← Legacy whole-page templates (FullScreenLayout,
//                               MinimalLayout, DocumentationLayout, etc.).
//                               Prefer composing hud/ + map-and-navigation/
//                               directly for new work.
//
//   src/primitives/           ← SectionSpacer, ExpanseLoadingSpinner, DemoSurface.
//                               Generic, NOT HUD- or navigation-aware.
//
//   src/components/           ← Generic page wrappers (PageContent, PlaceholderPage).
//
//   src/views/                ← Full-page views (SettingsPage,
//                               LayoutConfigurationPage).
//
// AI HINTS:
// - Anything that reads HUD insets (chrome-aware) → src/hud/
// - Anything that reads navigation position → src/map-and-navigation/navigation/
// - HUD widgets are PURE UI, they never own state — state lives in src/hud/
// - Apps import from "@expanse/shell" only; never deep-import.
// - When adding a new HUD slot/registry, mirror the pattern in
//   src/hud/registrations/ and re-export through src/hud/index.ts.
//
// =============================================================================

// -----------------------------------------------------------------------------
// Theme + utilities
// -----------------------------------------------------------------------------
// Theme tokens, style utilities, z-index, and component theme configs moved to
// @expanse/theme. Re-exported here transitionally for back-compat.
export * from "@expanse/theme";
export * from "@expanse/theme/styles";
export { renderIcon, mergeSx } from "./utils";
export type { IconComponent, IconLike } from "./utils";
export { Z_INDEX, getZIndex, relativeZIndex } from "@expanse/theme/constants";
export type { ZIndexLayer } from "@expanse/theme/constants";
// Shell extends ThemeMode to include "system" — override the theme's "light" | "dark" definition.
export type { ThemeMode, ThemePreset } from "./templates/types";

// -----------------------------------------------------------------------------
// Generic layout building blocks
// -----------------------------------------------------------------------------
// PageContent, PlaceholderPage (+ primitives & generic UI re-exported via @expanse/ui)
export * from "./components";
// SettingsPage, LayoutConfigurationPage
export * from "./views";

// -----------------------------------------------------------------------------
// Top-level providers
// -----------------------------------------------------------------------------
// LayoutProvider — global loading + drawer state.
// LayoutConfigProvider — runtime layout configuration (which bars are shown, etc.).
// useLayoutTransition, usePageKey — page-transition hooks used by templates.
export {
  LayoutProvider,
  LayoutContext,
  LayoutConfigProvider,
  useLayoutConfig,
  DEFAULT_LAYOUT_CONFIG,
  useLayoutTransition,
  usePageKey,
  useDrawerState,
  useLoadingState,
} from "./core/providers";
export type {
  NavControlsPosition,
  TransitionConfig,
} from "./core/providers";

// -----------------------------------------------------------------------------
// HUD system + widgets moved to @expanse/hud (P5).
// Import HUD chrome, widgets, and HUD-aware map views from "@expanse/hud".
//
// Map + navigation engine moved to @expanse/map (P4) — import the navigation
// API, minimap, tiles, history, infinite-grid, and MapLayoutProvider directly
// from "@expanse/map". They are no longer re-exported here.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Templates (legacy whole-page layouts)
// -----------------------------------------------------------------------------
// MinimalLayout, DocumentationLayout, FullScreenLayout, etc.
// Prefer composing hud/ + map-and-navigation/ directly for new pages.
export * from "./templates";

// -----------------------------------------------------------------------------
// Skeletons (structural building blocks used by templates)
// -----------------------------------------------------------------------------
// LayoutSkeleton, ChatSkeleton, FullbleedSkeleton — chrome scaffolding.
// BarSlotConfig — slot typing for LayoutSkeleton bars.
export * from "./skeletons";

// -----------------------------------------------------------------------------
// Hooks
// -----------------------------------------------------------------------------
export * from "./hooks";

// -----------------------------------------------------------------------------
// Accessibility (moved to @expanse/ui — re-exported transitionally)
// -----------------------------------------------------------------------------
export {
  navigationLabels,
  createNavigationAnnouncement,
  createMinimapTileLabel,
  getNavigationDirection,
  isActionKey,
  useFocusTrap,
  useFocusRestoration,
  useAnnouncer,
  useAccessibleNavigation,
  createSkipLinks,
  meetsContrastRatio,
} from "@expanse/ui";
export type {
  KeyboardKey,
  NavigationDirection,
  SkipLinkProps,
} from "@expanse/ui";

// -----------------------------------------------------------------------------
// Public types
// -----------------------------------------------------------------------------
// Layout context shape
export type {
  LayoutContextType,
  DrawerProps,
  LoadingSpinnerProps,
} from "./types";

// Layout configuration
export type {
  LayoutType,
  MinimapConfig,
  BarVisibilityConfig,
  LayoutConfiguration,
  LayoutConfigContextType,
} from "./core/providers";

// Map navigation types moved to @expanse/map (P4) — import Position, Direction,
// MapGridNavigationConfig, TileConfig, etc. directly from "@expanse/map".
