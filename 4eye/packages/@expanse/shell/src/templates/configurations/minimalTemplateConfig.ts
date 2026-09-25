/**
 * MinimalLayout Presets
 */

import type { LayoutPresetMap, MinimalLayoutPreset } from "../types"

export const minimalLayoutPresets: LayoutPresetMap<MinimalLayoutPreset> = {
  clean: {
    showMinimap: false,
    showNavigationControls: false,
    showTopBar: false,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: false,
  },
  "floating-controls": {
    showMinimap: true,
    showNavigationControls: true,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    showTopBar: false,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: false,
    styles: {
      root: {
        backgroundColor: "transparent",
      },
    },
  },
  "bottom-controls": {
    showMinimap: true,
    showNavigationControls: false,
    minimapPosition: "bottom-right",
    showTopBar: false,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: true,
    barSizes: {
      bottom: 60,
    },
  },
  gaming: {
    showMinimap: true,
    showNavigationControls: true,
    minimapPosition: "top-left",
    navControlsPosition: "bottom-right",
    showTopBar: false,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: false,
    styles: {
      root: {
        backgroundColor: "#000",
      },
      content: {
        opacity: 1,
      },
    },
  },
  presentation: {
    showMinimap: true,
    showNavigationControls: true,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    showTopBar: false,
    showLeftBar: false,
    showRightBar: true, // Speaker notes
    showBottomBar: true, // Progress bar
    barSizes: {
      right: 280,
      bottom: 48,
    },
    styles: {
      root: {
        backgroundColor: "#1a1a1a",
      },
    },
  },
  kiosk: {
    showMinimap: true,
    showNavigationControls: true,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    showTopBar: true,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: true,
    barSizes: {
      top: 80,
      bottom: 96, // Large touch-friendly controls
    },
    styles: {
      root: {
        backgroundColor: "#f5f5f5",
      },
    },
  },
}
