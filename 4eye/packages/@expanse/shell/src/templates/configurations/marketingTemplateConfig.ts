/**
 * MarketingLayout Presets
 */

import type { LayoutPresetMap, MarketingLayoutPreset } from "../types"

export const marketingLayoutPresets: LayoutPresetMap<MarketingLayoutPreset> = {
  hero: {
    showMinimap: false,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: false,
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 72,
    },
    styles: {
      root: {
        background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 100%)",
      },
    },
  },
  storytelling: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: false,
    showRightBar: false,
    showBottomBar: false,
    minimapPosition: "bottom-right",
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 64,
    },
  },
  comparison: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    showBottomBar: false,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 64,
      left: 48,
      right: 48,
    },
  },
}
