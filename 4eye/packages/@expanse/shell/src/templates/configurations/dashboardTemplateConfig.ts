/**
 * DashboardLayout Presets
 */

import type { LayoutPresetMap, DashboardLayoutPreset } from "../types"

export const dashboardLayoutPresets: LayoutPresetMap<DashboardLayoutPreset> = {
  default: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    showBottomBar: true,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 64,
      bottom: 48,
      left: 64,
      right: 64,
    },
  },
  "focus-mode": {
    showMinimap: false,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: true,
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 64,
      bottom: 48,
    },
  },
  compact: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    showBottomBar: false,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 48,
      left: 48,
      right: 48,
    },
  },
  executive: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: false,
    showBottomBar: false,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-right",
    barSizes: {
      top: 72,
      left: 240, // Wide nav for KPI categories
    },
    styles: {
      root: {
        backgroundColor: "#f8f9fa",
      },
      content: {
        padding: "32px",
      },
    },
  },
  operational: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    showBottomBar: true,
    minimapPosition: "top-left",
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 56,
      left: 200, // System navigation
      right: 280, // Real-time alerts/logs
      bottom: 40, // Status bar
    },
    styles: {
      content: {
        padding: "16px",
      },
    },
  },
  analytics: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    showBottomBar: false,
    minimapPosition: "bottom-right",
    navControlsPosition: "bottom-left",
    barSizes: {
      top: 64,
      left: 280, // Filters and data controls
      right: 320, // Charts configuration
    },
    styles: {
      content: {
        padding: "24px",
        backgroundColor: "#fff",
      },
    },
  },
}
