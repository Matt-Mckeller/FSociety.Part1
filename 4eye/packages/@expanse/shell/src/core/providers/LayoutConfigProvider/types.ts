import type {
  MinimapVariant,
  MinimapSize,
  MinimapPosition,
  MinimapColorScheme,
} from "@expanse/map"
import type {
  MinimalLayoutPreset,
  DocumentationLayoutPreset,
  DashboardLayoutPreset,
  FullScreenLayoutPreset,
} from "../../../templates/types"

// =============================================================================
// Configuration Types
// =============================================================================

/**
 * Available layout types
 */
export type LayoutType = "minimal" | "documentation" | "dashboard" | "fullscreen" | "panel"

/**
 * Minimap configuration
 */
export interface MinimapConfig {
  /** Show minimap */
  enabled: boolean
  /** Visual variant */
  variant: MinimapVariant
  /** Size preset */
  size: MinimapSize
  /** Position when floating */
  position: MinimapPosition
  /** Color scheme */
  colorScheme: MinimapColorScheme
  /** Show labels on hover */
  showLabels: boolean
}

/**
 * Bar visibility configuration
 */
export interface BarVisibilityConfig {
  top: boolean
  left: boolean
  right: boolean
  bottom: boolean
}

/**
 * Complete layout configuration
 */
export interface LayoutConfiguration {
  /** Current layout type */
  layoutType: LayoutType
  /** Preset for minimal layout */
  minimalPreset: MinimalLayoutPreset
  /** Preset for documentation layout */
  documentationPreset: DocumentationLayoutPreset
  /** Preset for dashboard layout */
  dashboardPreset: DashboardLayoutPreset
  /** Preset for fullscreen layout */
  fullScreenPreset: FullScreenLayoutPreset
  /** Minimap configuration */
  minimap: MinimapConfig
  /** Show navigation controls (arrow pad) */
  showNavigationControls: boolean
  /** Bar visibility overrides */
  barVisibility: BarVisibilityConfig
}

/**
 * Context type for layout configuration
 */
export interface LayoutConfigContextType {
  /** Current configuration */
  config: LayoutConfiguration
  /** Update entire configuration */
  setConfig: (config: LayoutConfiguration) => void
  /** Update specific field */
  updateConfig: <K extends keyof LayoutConfiguration>(
    key: K,
    value: LayoutConfiguration[K]
  ) => void
  /** Update minimap config */
  updateMinimapConfig: <K extends keyof MinimapConfig>(
    key: K,
    value: MinimapConfig[K]
  ) => void
  /** Update bar visibility */
  updateBarVisibility: <K extends keyof BarVisibilityConfig>(
    key: K,
    value: BarVisibilityConfig[K]
  ) => void
  /** Reset to default configuration */
  resetConfig: () => void
}
