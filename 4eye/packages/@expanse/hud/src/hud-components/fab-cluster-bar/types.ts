import type React from "react"
import type { ActionButtonSize } from "../action-button/types"

export type PanelId = string

export interface FabClusterContextValue {
  activePanel: PanelId | null
  open: (id: PanelId) => void
  close: (opts?: { immediate?: boolean }) => void
  activeTriggerRef: React.MutableRefObject<HTMLElement | null>
}

export interface FabTriggerProps {
  /** Unique id that identifies which panel this trigger owns */
  id: PanelId
  icon: React.ReactNode
  label: string
  /** Content to render in the slideout panel when this trigger is active. Omit for action-only FABs. */
  panel?: React.ReactNode
  /**
   * Size of the round FAB trigger button in pixels. Inner ActionButton
   * picks the closest discrete size token. Default: 40 (md).
   */
  size?: number
  /**
   * Override the inner ActionButton size token directly. If provided,
   * `size` is still used for the outer wrapper dimensions.
   */
  innerButtonSize?: ActionButtonSize
  /**
   * Which side of the FAB the panel pops out toward.
   * - `"right"` (default): panel sits to the right of the FAB. Use on
   *   left-edge rails so the panel opens toward screen interior.
   * - `"left"`: panel sits to the left of the FAB. Use on right-edge
   *   rails so the panel opens toward screen interior instead of off
   *   the side of the viewport.
   * @default "right"
   */
  panelSide?: "left" | "right"
  /**
   * Whether to render the translucent circle + border + shadow chrome around
   * the icon. Pass `"none"` for the right-rail profile FAB where the mascot
   * itself provides the visual affordance and the chrome adds unwanted glow.
   * @default "default"
   */
  chrome?: "default" | "none"
  /**
   * Click handler for action-only FABs (no panel).
   * When provided, the inner button fires this on click.
   * For panel-based FABs, omit this — hover/focus controls the panel.
   */
  onClick?: () => void
  /**
   * Explicit active/on visual state for action-only FABs.
   * Ignored for panel FABs (panel presence drives visual state automatically).
   */
  active?: boolean
  /**
   * When `"always"`, a small text label is rendered below the FAB circle so
   * users can read each button without hovering. Increases the total click
   * target height. Has no effect on `chrome="none"` triggers.
   * @default "none"
   */
  labelMode?: "none" | "always"
  /**
   * Chrome outline shape. `"square"` matches the app's Spellbook-style
   * rail pills (small border radius) for visual consistency across rail
   * buttons; `"circle"` is the original pill shape.
   * @default "circle"
   */
  shape?: "circle" | "square"
  /**
   * Solid/gradient background for the chrome, overriding the default
   * translucent primary-tint fill. Use to give a trigger its own
   * branded accent (e.g. matching the Spellbook rail item).
   */
  background?: string
}
