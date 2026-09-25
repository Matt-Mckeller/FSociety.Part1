/**
 * Floating Controls
 *
 * Floating UI components for layout configuration:
 * - FloatingToolbar: Reusable glassmorphism container
 * - LayoutTypeSwitcher: Quick layout type cycling
 * - MinimapToggle: Minimap visibility toggle
 * - SettingsButton: Floating action button for settings
 */

// Components
export { FloatingToolbar } from "./components/FloatingToolbar"
export type { FloatingToolbarProps } from "./components/FloatingToolbar"

export { LayoutTypeSwitcher } from "./components/LayoutTypeSwitcher"

export { MinimapToggle } from "./components/MinimapToggle"

export { SettingsButton } from "./components/SettingsButton"
export type { SettingsButtonProps } from "./components/SettingsButton"

// Types
export type {
  FloatingPosition,
  LayoutTypeSwitcherProps,
  MinimapToggleProps,
} from "./types"

// Constants
export { LAYOUT_TYPES, LAYOUT_LABELS, LAYOUT_COLORS } from "./constants"
