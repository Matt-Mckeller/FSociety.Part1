/**
 * Input configuration types for the grid navigation system.
 */

/** Keyboard key binding configuration */
export interface KeyBindings {
  up?: string[]
  down?: string[]
  left?: string[]
  right?: string[]
  home?: string[]
  back?: string[]
}

/** Keyboard input configuration */
export interface KeyboardInputConfig {
  enabled: boolean
  bindings?: KeyBindings
  /** Don't navigate when focus is in input fields (default: true) */
  respectFocus?: boolean
}

export type ButtonPosition = "bottom-right" | "bottom-center" | "bottom-left" | "custom"
export type ButtonStyle = "arrows" | "dpad" | "minimal"

/** Button input configuration */
export interface ButtonInputConfig {
  enabled: boolean
  position?: ButtonPosition
  style?: ButtonStyle
}

/** Minimap input configuration */
export interface MinimapInputConfig {
  enabled: boolean
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "inline"
  size?: "small" | "medium" | "large"
  showOnHover?: boolean
}

export type TouchZone = "edges" | "everywhere" | "disabled"

/** Touch input configuration */
export interface TouchInputConfig {
  enabled: boolean
  swipeThreshold?: number
  zones?: TouchZone
}

export type ScrollMode = "content-only" | "edge-navigate"

/** Scroll input configuration */
export interface ScrollInputConfig {
  mode: ScrollMode
  edgeThreshold?: number
}

/** Combined input configuration */
export interface InputConfig {
  keyboard?: KeyboardInputConfig
  buttons?: ButtonInputConfig
  minimap?: MinimapInputConfig
  touch?: TouchInputConfig
  scroll?: ScrollInputConfig
}

// =============================================================================
// Defaults
// =============================================================================

export const DEFAULT_KEY_BINDINGS: Required<KeyBindings> = {
  up: ["ArrowUp", "w", "W"],
  down: ["ArrowDown", "s", "S"],
  left: ["ArrowLeft", "a", "A"],
  right: ["ArrowRight", "d", "D"],
  home: ["h", "H"],
  back: ["Backspace"],
}

export const DEFAULT_INPUT_CONFIG: Required<InputConfig> = {
  keyboard: { enabled: true, respectFocus: true },
  buttons: { enabled: true, position: "bottom-right", style: "dpad" },
  minimap: { enabled: true, position: "top-right", size: "medium" },
  touch: { enabled: true, swipeThreshold: 50, zones: "edges" },
  scroll: { mode: "content-only" },
}
