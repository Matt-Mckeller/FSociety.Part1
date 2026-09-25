'use client'

import { useMemo } from 'react'
import { useTheme, alpha } from '@mui/material'
import type { ShadowDirection, ShadowConfig, CinemaBarPosition, BarColorConfig, BarColorPresetName } from '../types'

interface UseCinemaThemeOptions {
  colorScheme?: 'primary' | 'secondary' | 'neutral'
  barColors?: BarColorConfig
}

interface CinemaThemeColors {
  bars: {
    primary: { background: string; text: string }
    secondary: { background: string; text: string }
  }
  content: {
    background: string
    shadow: string
  }
  diamonds: {
    edge: string
    center: string
    stroke: string
  }
  fab: {
    background: string
    hover: string
    text: string
    shadow: string
  }
}

/**
 * Get bar colors for a specific preset
 */
function getBarColorsForPreset(
  preset: BarColorPresetName,
  theme: ReturnType<typeof useTheme>,
  isDark: boolean
): CinemaThemeColors['bars'] {
  switch (preset) {
    case 'secondary': {
      const color = theme.palette.secondary.main
      const colorDark = theme.palette.secondary.dark
      const colorLight = theme.palette.secondary.light
      return {
        primary: {
          background: isDark ? colorDark : color,
          text: theme.palette.getContrastText(isDark ? colorDark : color),
        },
        secondary: {
          background: isDark ? alpha(color, 0.7) : colorLight,
          text: theme.palette.getContrastText(isDark ? alpha(color, 0.7) : colorLight),
        },
      }
    }
    case 'neutral': {
      return {
        primary: {
          background: isDark ? theme.palette.grey[800] : theme.palette.grey[700],
          text: theme.palette.common.white,
        },
        secondary: {
          background: isDark ? theme.palette.grey[700] : theme.palette.grey[400],
          text: isDark ? theme.palette.common.white : theme.palette.grey[900],
        },
      }
    }
    case 'monochrome': {
      return {
        primary: {
          background: isDark ? theme.palette.common.white : theme.palette.common.black,
          text: isDark ? theme.palette.common.black : theme.palette.common.white,
        },
        secondary: {
          background: isDark ? theme.palette.grey[300] : theme.palette.grey[800],
          text: isDark ? theme.palette.common.black : theme.palette.common.white,
        },
      }
    }
    case 'accent': {
      // Use error color as accent for high contrast
      const color = theme.palette.error.main
      const colorDark = theme.palette.error.dark
      const colorLight = theme.palette.error.light
      return {
        primary: {
          background: isDark ? colorDark : color,
          text: theme.palette.getContrastText(isDark ? colorDark : color),
        },
        secondary: {
          background: isDark ? alpha(color, 0.7) : colorLight,
          text: theme.palette.getContrastText(isDark ? alpha(color, 0.7) : colorLight),
        },
      }
    }
    case 'primary':
    default: {
      const color = theme.palette.primary.main
      const colorDark = theme.palette.primary.dark
      const colorLight = theme.palette.primary.light
      return {
        primary: {
          background: isDark ? colorDark : color,
          text: theme.palette.getContrastText(isDark ? colorDark : color),
        },
        secondary: {
          background: isDark ? alpha(color, 0.7) : colorLight,
          text: theme.palette.getContrastText(isDark ? alpha(color, 0.7) : colorLight),
        },
      }
    }
  }
}

/**
 * Get theme colors for CinemaLayout based on color scheme
 */
export function useCinemaTheme({ colorScheme = 'primary', barColors }: UseCinemaThemeOptions): CinemaThemeColors {
  const theme = useTheme()
  
  return useMemo(() => {
    const isDark = theme.palette.mode === 'dark'
    
    const primaryColor = theme.palette[colorScheme].main
    const primaryDark = theme.palette[colorScheme].dark
    const primaryLight = theme.palette[colorScheme].light
    
    // Determine bar colors based on config
    let bars: CinemaThemeColors['bars']
    if (barColors?.mode === 'preset' && barColors.preset) {
      bars = getBarColorsForPreset(barColors.preset, theme, isDark)
    } else {
      // Default theme mode - use colorScheme
      bars = {
        primary: {
          background: isDark ? primaryDark : primaryColor,
          text: theme.palette.getContrastText(isDark ? primaryDark : primaryColor),
        },
        secondary: {
          background: isDark ? alpha(primaryColor, 0.7) : primaryLight,
          text: theme.palette.getContrastText(isDark ? alpha(primaryColor, 0.7) : primaryLight),
        },
      }
    }
    
    return {
      bars,
      content: {
        background: theme.palette.background.paper,
        shadow: theme.shadows[8],
      },
      diamonds: {
        edge: isDark ? primaryDark : primaryColor,
        center: isDark ? primaryLight : alpha(primaryLight, 0.9),
        stroke: isDark ? alpha(theme.palette.common.white, 0.2) : alpha(theme.palette.common.black, 0.1),
      },
      fab: {
        background: theme.palette.secondary.main,
        hover: theme.palette.secondary.dark,
        text: theme.palette.secondary.contrastText,
        shadow: theme.shadows[6],
      },
    }
  }, [theme, colorScheme, barColors])
}

/**
 * Shadow intensity multipliers
 */
const SHADOW_INTENSITY = {
  subtle: 0.1,
  medium: 0.2,
  strong: 0.35,
}

/**
 * Get box-shadow string based on position and direction
 */
export function getShadowForPosition(
  position: CinemaBarPosition | 'content',
  config: ShadowConfig,
  isDark: boolean = false
): string {
  if (!config.enabled || config.direction === 'none') {
    return 'none'
  }
  
  const intensity = SHADOW_INTENSITY[config.intensity ?? 'medium']
  const color = isDark ? `rgba(0,0,0,${intensity + 0.1})` : `rgba(0,0,0,${intensity})`
  const blur = config.blur ?? 12
  const spread = config.spread ?? 0
  const offsetBase = config.offset ?? 4
  
  // Determine shadow direction based on position and setting
  let yOffset: number
  
  if (config.direction === 'inward') {
    // Shadows point toward content center
    switch (position) {
      case 'top-primary':
      case 'top-secondary':
        yOffset = offsetBase  // Shadow points down (toward content)
        break
      case 'bottom-primary':
      case 'bottom-secondary':
        yOffset = -offsetBase // Shadow points up (toward content)
        break
      case 'content':
        yOffset = 0  // Content doesn't cast shadow in inward mode
        return 'none'
      default:
        yOffset = 0
    }
  } else {
    // 'center' - shadows all point toward screen center (down)
    switch (position) {
      case 'top-primary':
      case 'top-secondary':
        yOffset = offsetBase  // Shadow points down
        break
      case 'bottom-primary':
      case 'bottom-secondary':
        yOffset = offsetBase  // Shadow also points down (toward center)
        break
      case 'content':
        yOffset = offsetBase
        break
      default:
        yOffset = 0
    }
  }
  
  return `0 ${yOffset}px ${blur}px ${spread}px ${color}`
}

/**
 * Get z-index levels for elevation hierarchy
 */
export function getCinemaElevation(level: 'primary' | 'secondary' | 'content' | 'fab'): number {
  const levels = {
    primary: 10,
    secondary: 20,
    content: 30,
    fab: 100,
  }
  return levels[level]
}

export default useCinemaTheme
