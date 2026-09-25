/**
 * DocumentationLayout Presets
 */

import type { LayoutPresetMap, DocumentationLayoutPreset } from "../types"

export const documentationLayoutPresets: LayoutPresetMap<DocumentationLayoutPreset> = {
  default: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 56,
      left: 56,
      right: 56,
    },
  },
  minimal: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: false,
    showRightBar: false,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 56,
    },
  },
  "sidebar-focus": {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    minimapPosition: "bottom-right",
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 56,
      left: 72,
      right: 72,
    },
  },
  clean: {
    showMinimap: false,
    showNavigationControls: false,
    showTopBar: true,
    showLeftBar: false,
    showRightBar: false,
    barSizes: {
      top: 56,
    },
  },
  reference: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: true,
    showBottomBar: false,
    minimapPosition: "top-left",
    navControlsPosition: "bottom-right",
    barSizes: {
      top: 48,
      left: 280, // Wide nav tree
      right: 240, // TOC sidebar
    },
    styles: {
      content: {
        maxWidth: "none", // Full width for dense content
      },
    },
  },
  tutorial: {
    showMinimap: true,
    showNavigationControls: true,
    showTopBar: true,
    showLeftBar: true,
    showRightBar: false,
    showBottomBar: true,
    minimapPosition: "top-right",
    navControlsPosition: "bottom-center",
    barSizes: {
      top: 56,
      left: 200, // Chapter navigation
      bottom: 64, // Progress bar and next/prev buttons
    },
    styles: {
      content: {
        maxWidth: "900px",
        margin: "0 auto",
      },
    },
  },
  blog: {
    showMinimap: false,
    showNavigationControls: false,
    showTopBar: true,
    showLeftBar: false,
    showRightBar: true,
    showBottomBar: false,
    minimapPosition: "top-right",
    barSizes: {
      top: 56,
      right: 200, // Related articles / TOC
    },
    styles: {
      root: {
        backgroundColor: "#fafafa",
      },
      content: {
        maxWidth: "720px",
        margin: "0 auto",
        padding: "48px 24px",
      },
    },
  },
}
