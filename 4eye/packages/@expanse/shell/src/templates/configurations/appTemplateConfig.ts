/**
 * AppLayout Presets
 */

import type { LayoutPresetMap, AppLayoutPreset } from "../types"

export const appLayoutPresets: LayoutPresetMap<AppLayoutPreset> = {
  default: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    showBottomBar: true,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-right",
    barSizes: {
      top: 64,
      bottom: 56,
      left: 240,
      right: 320,
    },
  },
  "sidebar-collapsed": {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    showBottomBar: true,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-right",
    barSizes: {
      top: 64,
      bottom: 56,
      left: 64,
      right: 320,
    },
  },
  "mobile-optimized": {
    showMinimap: false,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: true,
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 56,
      bottom: 64,
    },
  },
}
