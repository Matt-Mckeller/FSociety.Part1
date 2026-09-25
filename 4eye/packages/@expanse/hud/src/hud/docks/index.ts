// Main Component
export { ActionDock } from "./ActionDock"

// Types
export type {
  ActionDockProps,
  ActionDockPosition,
  ActionDockCorner,
  ActionDockEdge,
} from "./types"

// Helper functions
export { isDockCorner, isDockEdge, getDockEdge } from "./types"

// Button for use in ActionDock (re-exported from shared)
export { HudButton as ActionDockButton } from "../../hud-components/primitives/HudButton"
export type { HudButtonProps as ActionDockButtonProps } from "../../hud-components/primitives/HudButton"
