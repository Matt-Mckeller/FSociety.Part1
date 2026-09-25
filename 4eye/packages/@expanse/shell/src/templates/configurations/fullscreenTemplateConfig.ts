/**
 * FullScreenLayout Presets
 */

import type { LayoutPresetMap, FullScreenLayoutPreset } from "../types"

export const fullScreenLayoutPresets: LayoutPresetMap<FullScreenLayoutPreset> = {
  immersive: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: false,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: false,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    styles: {
      root: {
        backgroundColor: "#14141a",
      },
      content: {
        padding: 0,
      },
    },
  },
  "symbol-grid": {
    showMinimap: true,
    showNavigationControls: false,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    showBottomBar: false, // Replaced by chat zone
    minimapPosition: "top-left",
    barSizes: {
      top: 56,
      left: 56,
      right: 56,
    },
    styles: {
      root: {
        backgroundColor: "#0a0a0f",
      },
      content: {
        padding: "16px",
      },
    },
  },
  gaming: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: false,
    minimapPosition: "bottom-right",
    navControlsPosition: "bottom-left",
    barSizes: {
      top: 48,
    },
    styles: {
      root: {
        backgroundColor: "#000000",
      },
      content: {
        padding: 0,
      },
    },
  },
  presentation: {
    showMinimap: false,
    showNavigationControls: false,
    showTopBar: false,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: false,
    styles: {
      root: {
        backgroundColor: "#000000",
      },
      content: {
        padding: "32px",
      },
    },
  },
}
