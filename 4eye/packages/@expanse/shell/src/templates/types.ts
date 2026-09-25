/**
 * Layout Template Types
 * 
 * Organized type exports - now split into sub-modules for better organization
 */

// Re-export all types for backward compatibility
export {
  type ThemeMode,
  type ThemePreset,
} from "./types/theme"

export {
  type MinimalLayoutPreset,
  type DocumentationLayoutPreset,
  type DashboardLayoutPreset,
  type AppLayoutPreset,
  type MarketingLayoutPreset,
  type FullScreenLayoutPreset,
  type LayoutPresetConfig,
  type LayoutPresetMap,
} from "./types/presets"

