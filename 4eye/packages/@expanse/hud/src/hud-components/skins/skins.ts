/**
 * Unified Skin System for Spatial Bars
 * 
 * Provides comprehensive visual customization for SpatialBar family:
 * - SpatialBar (base component)
 * - Toolbar (radio behavior variant)
 * - SettingsBar (checkbox behavior variant)
 * - ActionDock (corner-positioned variant)
 *
 * Modular design:
 * - Shape: Border radius and form factor
 * - Surface: Background treatment (glass, frosted, solid, etc.)
 * - Border: Edge definition and prominence
 * - Elevation: Shadow and depth
 */

import type { Theme, SxProps } from "@mui/material"

// Surface palette type (augmented in @expanse/theme)
interface SurfacePalette {
  default: string
  elevated: string
  glass: string
  tinted: string
  border: string
}

/** Get surface palette from theme (type-safe accessor) */
function getSurface(theme: Theme): SurfacePalette {
  return (theme.palette as unknown as { surface: SurfacePalette }).surface
}

// =============================================================================
// Shape Types
// =============================================================================

/**
 * Shape defines the border radius and overall form factor
 */
export type BarShape = 
  | 'pill'      // Full rounded ends (28px) - Default, friendly & modern
  | 'rounded'   // Medium rounded corners (12px) - Balanced, professional
  | 'soft'      // Subtle rounded corners (6px) - Subtle, minimal
  | 'square'    // Sharp 90° corners (0px) - Technical, precise
  | 'capsule'   // Elongated pill (16px) - Specialized layouts

/**
 * Border radius values for each shape
 */
export const SHAPE_RADIUS: Record<BarShape, number> = {
  pill: 28,
  rounded: 12,
  soft: 6,
  square: 0,
  capsule: 16,
}

// =============================================================================
// Surface Types
// =============================================================================

/**
 * Surface treatment defines background appearance and material
 */
export type BarSurface = 
  | 'glass'     // Translucent frosted glass with blur - Default
  | 'frosted'   // Heavy blur, less transparency - Strong hierarchy
  | 'solid'     // Opaque, no blur - Maximum contrast
  | 'tinted'    // Slight transparency, no blur - Subtle overlay
  | 'outline'   // Transparent with border - Minimal, lightweight
  | 'minimal'   // No background - Content-first

/**
 * Surface configuration details
 */
export interface SurfaceConfig {
  /** Background opacity (0-1) */
  opacity: number
  /** Backdrop blur amount in pixels */
  blur?: number
  /** Whether to show a border by default */
  defaultBorder: boolean
}

/**
 * Surface configurations
 */
export const SURFACE_CONFIG: Record<BarSurface, SurfaceConfig> = {
  glass: { opacity: 0.95, blur: 8, defaultBorder: true },
  frosted: { opacity: 0.85, blur: 12, defaultBorder: true },
  solid: { opacity: 1, blur: 0, defaultBorder: false },
  tinted: { opacity: 0.95, blur: 0, defaultBorder: true },
  outline: { opacity: 0, blur: 0, defaultBorder: true },
  minimal: { opacity: 0, blur: 0, defaultBorder: false },
}

// =============================================================================
// Border Types
// =============================================================================

/**
 * Border prominence and style
 */
export type BarBorder = 
  | 'none'        // No border
  | 'subtle'      // Gentle separation - 1px, low opacity
  | 'normal'      // Standard border - 1px, medium opacity
  | 'prominent'   // Strong definition - 2px, high opacity
  | 'accent'      // Highlighted border - 2px, theme color

/**
 * Border configuration details
 */
export interface BorderConfig {
  /** Border width in pixels */
  width: number
  /** Opacity for light mode (0-1) */
  opacityLight: number
  /** Opacity for dark mode (0-1) */
  opacityDark: number
  /** Whether to use theme accent color */
  useAccent: boolean
}

/**
 * Border configurations
 */
export const BORDER_CONFIG: Record<BarBorder, BorderConfig> = {
  none: { width: 0, opacityLight: 0, opacityDark: 0, useAccent: false },
  subtle: { width: 1, opacityLight: 0.08, opacityDark: 0.1, useAccent: false },
  normal: { width: 1, opacityLight: 0.15, opacityDark: 0.2, useAccent: false },
  prominent: { width: 2, opacityLight: 0.35, opacityDark: 0.4, useAccent: false },
  accent: { width: 2, opacityLight: 1, opacityDark: 1, useAccent: true },
}

// =============================================================================
// Elevation Types
// =============================================================================

/**
 * Shadow and depth options
 */
export type BarElevation = 
  | 'none'      // Flat, no shadow - elevation 0
  | 'low'       // Subtle lift - elevation 2
  | 'medium'    // Standard depth - elevation 4
  | 'high'      // Prominent float - elevation 8
  | 'glow'      // Colored glow effect - custom shadow

/**
 * MUI elevation values
 */
export const ELEVATION_VALUE: Record<BarElevation, number> = {
  none: 0,
  low: 2,
  medium: 4,
  high: 8,
  glow: 0, // Uses custom box-shadow instead
}

// =============================================================================
// Skin Configuration
// =============================================================================

/**
 * Complete skin configuration for spatial bars
 * Modular design allows independent control of each aspect
 */
export interface BarSkinConfig {
  /** Shape and border radius */
  shape?: BarShape
  
  /** Surface treatment (background style) */
  surface?: BarSurface
  
  /** Border configuration */
  border?: BarBorder
  
  /** Shadow/elevation */
  elevation?: BarElevation
  
  /** Custom overrides for fine-grained control */
  custom?: {
    /** Custom background color (overrides surface default) */
    bgcolor?: string
    /** Custom blur amount in pixels */
    blur?: number
    /** Custom border radius (number or CSS string) */
    borderRadius?: number | string
    /** Custom box shadow */
    boxShadow?: string
  }
}

/**
 * Preset skin names for quick, common configurations
 */
export type BarSkinPreset = 
  | 'default'        // Standard glass pill
  | 'minimal'        // No background, simple
  | 'solid-pro'      // Professional solid bar
  | 'frosted-float'  // Heavy blur, elevated
  | 'outlined'       // Transparent with border
  | 'technical'      // Sharp, precise aesthetic

/**
 * Main skin type - can be either a preset name or a custom configuration
 * Used by SpatialBar, Toolbar, SettingsBar, and ActionDock
 */
export type BarSkin = BarSkinPreset | BarSkinConfig

// =============================================================================
// Preset Configurations
// =============================================================================

/**
 * Pre-configured skins for common use cases
 */
export const PRESET_SKINS: Record<BarSkinPreset, BarSkinConfig> = {
  'default': {
    shape: 'pill',
    surface: 'glass',
    border: 'subtle',
    elevation: 'medium',
  },
  'minimal': {
    shape: 'rounded',
    surface: 'minimal',
    border: 'none',
    elevation: 'none',
  },
  'solid-pro': {
    shape: 'rounded',
    surface: 'solid',
    border: 'normal',
    elevation: 'low',
  },
  'frosted-float': {
    shape: 'pill',
    surface: 'frosted',
    border: 'subtle',
    elevation: 'high',
  },
  'outlined': {
    shape: 'soft',
    surface: 'outline',
    border: 'prominent',
    elevation: 'none',
  },
  'technical': {
    shape: 'square',
    surface: 'solid',
    border: 'accent',
    elevation: 'low',
  },
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Resolve a skin (preset or custom) to a full BarSkinConfig configuration
 */
export function resolveSkin(skin: BarSkin | undefined): BarSkinConfig {
  // Handle undefined - use default
  if (!skin) {
    return PRESET_SKINS.default
  }
  
  // Handle preset name
  if (typeof skin === 'string') {
    return PRESET_SKINS[skin]
  }
  
  // Handle custom skin - merge with defaults
  const defaults = PRESET_SKINS.default
  return {
    shape: skin.shape ?? defaults.shape,
    surface: skin.surface ?? defaults.surface,
    border: skin.border ?? defaults.border,
    elevation: skin.elevation ?? defaults.elevation,
    custom: skin.custom,
  }
}

/**
 * Get surface styles based on surface type and color mode
 */
export function getSurfaceStyles(
  surface: BarSurface,
  colorMode: 'light' | 'dark',
  theme: Theme,
  customBgcolor?: string,
  customBlur?: number
): SxProps<Theme> {
  const config = SURFACE_CONFIG[surface]
  const surfacePalette = getSurface(theme)
  
  // Use theme surface colors - glass has alpha baked in, others are solid
  let baseColor: string
  switch (surface) {
    case 'glass':
    case 'frosted':
      baseColor = surfacePalette.glass
      break
    case 'solid':
      baseColor = surfacePalette.default
      break
    case 'tinted':
      baseColor = surfacePalette.tinted
      break
    case 'outline':
    case 'minimal':
      baseColor = 'transparent'
      break
    default:
      baseColor = surfacePalette.glass
  }
  
  const bgcolor = customBgcolor || baseColor
  const blur = customBlur ?? config.blur ?? 0
  
  const styles: SxProps<Theme> = {
    bgcolor,
  }
  
  // Add backdrop filter for blur
  if (blur > 0) {
    styles.backdropFilter = `blur(${blur}px)`
    styles.WebkitBackdropFilter = `blur(${blur}px)`
  }
  
  return styles
}

/**
 * Get border styles based on border type and color mode
 */
export function getBorderStyles(
  border: BarBorder,
  colorMode: 'light' | 'dark',
  theme: Theme
): SxProps<Theme> {
  const config = BORDER_CONFIG[border]
  
  if (config.width === 0) {
    return { border: 'none' }
  }
  
  const surfacePalette = getSurface(theme)
  
  // Use theme surface border or accent color
  const borderColor = config.useAccent
    ? theme.palette.primary.main
    : surfacePalette.border
  
  return {
    border: `${config.width}px solid`,
    borderColor,
  }
}

/**
 * Get complete skin styles by combining all aspects
 */
export function getSkinStyles(
  skin: BarSkin | undefined,
  colorMode: 'light' | 'dark',
  theme: Theme
): {
  sx: SxProps<Theme>
  elevation: number
  borderRadius: number | string
} {
  const resolved = resolveSkin(skin)
  const shape = resolved.shape ?? 'pill'
  const surface = resolved.surface ?? 'glass'
  const border = resolved.border ?? 'subtle'
  const elevation = resolved.elevation ?? 'medium'
  
  // Combine styles
  const surfaceStyles = getSurfaceStyles(
    surface,
    colorMode,
    theme,
    resolved.custom?.bgcolor,
    resolved.custom?.blur
  )
  
  const borderStyles = getBorderStyles(border, colorMode, theme)
  
  // Get border radius
  const borderRadius = resolved.custom?.borderRadius ?? SHAPE_RADIUS[shape]
  
  // Get elevation value
  const elevationValue = ELEVATION_VALUE[elevation]
  
  // Build combined sx styles (using any to avoid complex SxProps type inference issues)
  const combinedSx: any = {
    ...surfaceStyles,
    ...borderStyles,
  }
  
  // Handle glow elevation (custom shadow)
  if (elevation === 'glow') {
    const glowColor = theme.palette.primary.main
    combinedSx.boxShadow = `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`
  } else if (resolved.custom?.boxShadow) {
    combinedSx.boxShadow = resolved.custom.boxShadow
  }
  
  return {
    sx: combinedSx as SxProps<Theme>,
    elevation: elevationValue,
    borderRadius,
  }
}
