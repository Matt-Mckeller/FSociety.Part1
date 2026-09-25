import type { SxProps, Theme } from "@mui/material"
import type { Direction } from "@expanse/map"
export type { IconComponent, IconLike } from "@expanse/ui"
import type { IconLike } from "@expanse/ui"

// =============================================================================
// Variant Types
// =============================================================================

/** Visual rendering style for navigation pad */
export type NavigationPadVariant = "default" | "hints" | "compact" | "expanded" | "hud"

/** Size presets for navigation pad */
export type NavigationPadSize = "small" | "medium" | "large"

/** Position when navigation pad is floating */
export type NavigationPadPosition =
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "inline"

// =============================================================================
// Component Props
// =============================================================================

/** Main navigation pad component props */
export interface NavigationPadProps {
  /** Visual rendering style */
  variant?: NavigationPadVariant
  /** Size preset */
  size?: NavigationPadSize
  /** Position when floating */
  position?: NavigationPadPosition
  /** Show keyboard hints (WASD or arrow keys) */
  showKeyboardHints?: boolean
  /** Show home button */
  showHome?: boolean
  /** Show back button */
  showBack?: boolean
  /** Disable all interactions */
  disabled?: boolean
  /** Enable high contrast mode for accessibility (WCAG AAA compliant) */
  highContrast?: boolean
  /** Custom icons */
  customIcons?: {
    up?: IconLike
    down?: IconLike
    left?: IconLike
    right?: IconLike
    home?: IconLike
    back?: IconLike
  }
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Variant Component Props
// =============================================================================

/** Props passed to variant implementations */
export interface NavigationPadVariantImplProps {
  /** Button size in pixels */
  buttonSize: number
  /** Icon size in pixels */
  iconSize: number
  /** Show home button */
  showHome: boolean
  /** Show back button */
  showBack: boolean
  /** Show keyboard hints */
  showKeyboardHints: boolean
  /** Disabled state */
  disabled: boolean
  /** Enable high contrast mode for accessibility */
  highContrast: boolean
  /** Custom icons */
  customIcons?: {
    up?: IconLike
    down?: IconLike
    left?: IconLike
    right?: IconLike
    home?: IconLike
    back?: IconLike
  }
  /** Navigate handler */
  onNavigate: (direction: Direction) => void
  /** Go home handler */
  onHome: () => void
  /** Go back handler */
  onBack: () => void
  /** Check if can navigate */
  canNavigate: (direction: Direction) => boolean
  /** Check if at home */
  isHome: boolean
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Size Presets
// =============================================================================

/** Size preset configurations */
export interface NavigationPadSizePreset {
  buttonSize: number
  iconSize: number
}

export const SIZE_PRESETS: Record<NavigationPadSize, NavigationPadSizePreset> = {
  small: { buttonSize: 32, iconSize: 16 },
  medium: { buttonSize: 44, iconSize: 24 },
  large: { buttonSize: 56, iconSize: 32 },
}

// =============================================================================
// Helper Icons
// =============================================================================

/** Direction type for icon components */
export type DirectionKey = "up" | "down" | "left" | "right" | "home" | "back"
