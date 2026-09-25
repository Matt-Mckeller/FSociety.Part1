import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

/**
 * Position presets for floating toolbars
 */
export type FloatingPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

/**
 * Props for FloatingToolbar
 */
export interface FloatingToolbarProps {
  /** Position on screen */
  position?: FloatingPosition
  /** Z-index (default: 1300) */
  zIndex?: number
  /** Custom styles */
  sx?: SxProps<Theme>
  /** Content */
  children: ReactNode
}

/**
 * Props for LayoutTypeSwitcher
 */
export interface LayoutTypeSwitcherProps {
  /** Position on screen */
  position?: FloatingPosition
  /** Show as compact chip only (no arrows) */
  compact?: boolean
  /** Custom z-index */
  zIndex?: number
}

/**
 * Props for MinimapToggle
 */
export interface MinimapToggleProps {
  /** Position on screen */
  position?: FloatingPosition
  /** Custom z-index */
  zIndex?: number
}

/**
 * Props for SettingsButton
 */
export interface SettingsButtonProps {
  /** Position on screen */
  position?: FloatingPosition
  /** Custom z-index */
  zIndex?: number
  /** Click handler */
  onClick?: () => void
}
