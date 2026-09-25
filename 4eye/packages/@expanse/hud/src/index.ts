// =============================================================================
// @expanse/hud — HUD chrome, widgets, map-aware views, and HUD templates
// =============================================================================
// Extracted from @expanse/shell (P5). Depends on @expanse/shell (primitives,
// theme, utils, constants) and @expanse/map (navigation engine + minimap).

// -----------------------------------------------------------------------------
// HUD system (slot registries + built-in registrations)
// -----------------------------------------------------------------------------
export * from "./hud"

// -----------------------------------------------------------------------------
// HUD widgets (leaf UI placed inside HUD slots)
// -----------------------------------------------------------------------------
export * from "./hud-components/action-bars"
export * from "./hud-components/orb-bar"
export * from "./hud-components/orbs"
export * from "./hud-components/primitives"
export * from "./hud-components/skins"
export * from "./hud-components/current-location-bar"
export * from "./hud-components/next-best-action"
export * from "./hud-components/slideshow-header-rail"
export * from "./hud-components/map-overlay"
export * from "./hud-components/context-bar"
export * from "./hud-components/navigation-pad"
export * from "./hud-components/floating-controls"
export * from "./hud-components/ai-settings-panel"

// -----------------------------------------------------------------------------
// HUD-aware map views (depend on hud slots + widgets + @expanse/map)
// -----------------------------------------------------------------------------
export { MinimapPanel } from "./map-views/minimap/MinimapPanel"
export type {
  MinimapPanelProps,
  MinimapPanelTileVariant,
} from "./map-views/minimap/MinimapPanel"
export { MinimapDock } from "./map-views/minimap/MinimapDock"
export type {
  MinimapDockProps,
  MinimapDockPosition,
} from "./map-views/minimap/MinimapDock"
export { MinimapFullView } from "./map-views/minimap-full/MinimapFullView"
export type { MinimapFullViewProps } from "./map-views/minimap-full/MinimapFullView"

// -----------------------------------------------------------------------------
// HUD templates (composed full-page HUD layouts)
// -----------------------------------------------------------------------------
export * from "./templates"
