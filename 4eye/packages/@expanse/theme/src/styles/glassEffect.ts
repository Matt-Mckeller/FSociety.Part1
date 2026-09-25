/**
 * Common glass morphism effect styles
 * Provides frosted glass appearance with blur and transparency
 */

import type { SxProps, Theme } from "@mui/material"
import { alpha } from "@mui/material/styles"

/**
 * Glass effect configuration
 */
export interface GlassEffectOptions {
  /** Background color (default: rgba(20, 20, 30, 0.8)) */
  bgcolor?: string
  /** Backdrop blur amount in pixels (default: 10) */
  blur?: number
  /** Border color (default: divider) */
  borderColor?: "divider" | "primary" | "secondary" | string
  /** Show border (default: true) */
  showBorder?: boolean
}

/**
 * Theme-aware glass effect configuration
 */
export interface ThemeGlassEffectOptions {
  /** Backdrop blur amount in pixels (default: 12) */
  blur?: number
  /** Opacity of the background (0-1, default: 0.85) */
  opacity?: number
  /** Show border (default: true) */
  showBorder?: boolean
  /** Border opacity (0-1, default: 0.12) */
  borderOpacity?: number
  /** Intensity variant (default: 'medium') */
  intensity?: "low" | "medium" | "high"
}

/**
 * Create glass morphism effect styles
 * 
 * @param options - Glass effect configuration
 * @returns MUI sx props for glass effect
 * 
 * @example
 * ```tsx
 * <Box sx={glassEffect()}>
 *   Frosted glass content
 * </Box>
 * 
 * // Custom glass
 * <Box sx={glassEffect({ blur: 20, bgcolor: 'rgba(255,255,255,0.1)' })}>
 *   Light frosted glass
 * </Box>
 * ```
 */
export function glassEffect(options: GlassEffectOptions = {}): SxProps<Theme> {
  const {
    bgcolor = "rgba(20, 20, 30, 0.8)",
    blur = 10,
    borderColor = "divider",
    showBorder = true,
  } = options

  return {
    bgcolor,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`, // Safari support
    ...(showBorder && {
      border: "1px solid",
      borderColor,
    }),
  }
}

/**
 * Theme-aware glass effect that adapts to light/dark mode.
 * Uses the theme's background.paper color for proper contrast.
 * 
 * @param options - Theme-aware glass effect configuration
 * @returns MUI sx props function that receives theme
 * 
 * @example
 * ```tsx
 * // In a component
 * <Box sx={themeGlassEffect()}>
 *   Adapts to light/dark mode
 * </Box>
 * 
 * // High intensity (more opaque)
 * <Box sx={themeGlassEffect({ intensity: 'high' })}>
 *   More solid background
 * </Box>
 * ```
 */
export function themeGlassEffect(options: ThemeGlassEffectOptions = {}): SxProps<Theme> {
  const {
    blur = 12,
    opacity: customOpacity,
    showBorder = true,
    borderOpacity = 0.12,
    intensity = "medium",
  } = options

  // Intensity presets
  const intensityValues = {
    low: { opacity: 0.7, blur: 8 },
    medium: { opacity: 0.85, blur: 12 },
    high: { opacity: 0.92, blur: 16 },
  }

  const effectiveOpacity = customOpacity ?? intensityValues[intensity].opacity
  const effectiveBlur = blur ?? intensityValues[intensity].blur

  return (theme: Theme) => ({
    bgcolor: alpha(theme.palette.background.paper, effectiveOpacity),
    backdropFilter: `blur(${effectiveBlur}px)`,
    WebkitBackdropFilter: `blur(${effectiveBlur}px)`,
    color: theme.palette.text.primary,
    ...(showBorder && {
      border: "1px solid",
      borderColor: alpha(theme.palette.divider, borderOpacity),
    }),
  })
}

/**
 * Theme-aware button/control glass effect.
 * Provides good contrast for interactive elements.
 * Includes hover and disabled state styling.
 * 
 * @param options - Configuration options
 * @returns MUI sx props function that receives theme
 * 
 * @example
 * ```tsx
 * <IconButton sx={controlGlassEffect()}>
 *   <Icon />
 * </IconButton>
 * ```
 */
export function controlGlassEffect(options: ThemeGlassEffectOptions = {}): SxProps<Theme> {
  const {
    blur = 8,
    opacity: customOpacity,
    showBorder = true,
    borderOpacity = 0.2,
    intensity = "medium",
  } = options

  const intensityValues = {
    low: { opacity: 0.75, blur: 6 },
    medium: { opacity: 0.88, blur: 8 },
    high: { opacity: 0.95, blur: 10 },
  }

  const effectiveOpacity = customOpacity ?? intensityValues[intensity].opacity
  const effectiveBlur = blur ?? intensityValues[intensity].blur

  return (theme: Theme) => ({
    bgcolor: alpha(theme.palette.background.paper, effectiveOpacity),
    backdropFilter: `blur(${effectiveBlur}px)`,
    WebkitBackdropFilter: `blur(${effectiveBlur}px)`,
    border: showBorder ? "1px solid" : "none",
    borderColor: alpha(theme.palette.divider, borderOpacity),
    color: theme.palette.text.primary,
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: alpha(theme.palette.background.paper, Math.min(effectiveOpacity + 0.08, 1)),
      borderColor: alpha(theme.palette.primary.main, 0.4),
    },
    "&.Mui-disabled": {
      bgcolor: alpha(theme.palette.action.disabledBackground, effectiveOpacity * 0.6),
      color: theme.palette.text.disabled,
      borderColor: alpha(theme.palette.divider, borderOpacity * 0.5),
    },
  })
}
