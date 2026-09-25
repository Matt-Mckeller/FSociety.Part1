import type { LayoutConfiguration } from "./types"

/**
 * Default layout configuration
 */
export const DEFAULT_LAYOUT_CONFIG: LayoutConfiguration = {
  layoutType: "dashboard",
  minimalPreset: "clean",
  documentationPreset: "default",
  dashboardPreset: "default",
  fullScreenPreset: "immersive",
  minimap: {
    enabled: true,
    variant: "grid",
    size: "medium",
    position: "top-right",
    colorScheme: "default",
    showLabels: true,
  },
  showNavigationControls: true,
  barVisibility: {
    top: true,
    left: true,
    right: true,
    bottom: true,
  },
}
