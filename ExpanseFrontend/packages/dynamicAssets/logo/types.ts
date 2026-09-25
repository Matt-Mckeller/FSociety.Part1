/**
 * ExpanseLogo Types
 * 
 * Type definitions for the simplified ExpanseLogo component wrapper.
 */

import React from 'react'

/**
 * Named size presets for consistent logo sizing across the application.
 * Can also accept a number for custom pixel sizes.
 */
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number

/**
 * Theme variants for different backgrounds.
 * - 'auto': Detect from MUI theme context
 * - 'light': Light logo for dark backgrounds
 * - 'dark': Dark logo for light backgrounds
 * - 'brand': Brand colors
 */
export type LogoTheme = 'auto' | 'light' | 'dark' | 'brand'

/**
 * Rendering variant.
 * - '3d': Gradient lighting effects (default)
 * - 'flat': Solid colors, simpler rendering
 */
export type LogoVariant = '3d' | 'flat'

/**
 * Size preset mapping to pixel values.
 */
export const LOGO_SIZE_MAP: Record<string, number> = {
  xs: 16,   // Badges, inline text
  sm: 24,   // Navigation icons
  md: 48,   // Standard logo
  lg: 64,   // Hero sections
  xl: 96,   // Landing pages
  xxl: 128, // Splash screens
}

/**
 * Props for the simplified ExpanseLogo component.
 * 
 * @example
 * // Basic usage with size preset
 * <ExpanseLogo size="md" />
 * 
 * @example
 * // Custom pixel size
 * <ExpanseLogo size={72} />
 * 
 * @example
 * // Theme and variant
 * <ExpanseLogo size="lg" theme="light" variant="flat" />
 */
export interface ExpanseLogoProps {
  /**
   * Logo size - preset name or pixel value.
   * 
   * Presets:
   * - 'xs': 16px (badges, inline text)
   * - 'sm': 24px (navigation icons)
   * - 'md': 48px (standard logo) - default
   * - 'lg': 64px (hero sections)
   * - 'xl': 96px (landing pages)
   * - 'xxl': 128px (splash screens)
   * 
   * @default 'md'
   */
  size?: LogoSize

  /**
   * Theme variant for different backgrounds.
   * - 'auto': Detect from MUI theme (default)
   * - 'light': Light logo for dark backgrounds
   * - 'dark': Dark logo for light backgrounds
   * - 'brand': Brand colors
   * 
   * @default 'auto'
   */
  theme?: LogoTheme

  /**
   * Rendering style.
   * - '3d': Gradient lighting effects (default)
   * - 'flat': Solid colors, simpler rendering
   * 
   * @default '3d'
   */
  variant?: LogoVariant

  /**
   * Whether to show the moon element.
   * @default true
   */
  showMoon?: boolean

  /**
   * Whether to show the pupil/eye.
   * @default true
   */
  showEye?: boolean

  /**
   * CSS class name.
   */
  className?: string

  /**
   * Inline styles.
   */
  style?: React.CSSProperties

  /**
   * HTML id attribute.
   */
  id?: string
}
