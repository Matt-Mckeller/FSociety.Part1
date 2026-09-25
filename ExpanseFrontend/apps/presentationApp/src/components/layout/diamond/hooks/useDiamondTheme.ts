'use client'

import { useMemo } from 'react'
import { useTheme, alpha } from '@mui/material'
import type { DiamondThemeColors } from '../types'

interface UseDiamondThemeOptions {
  colorScheme?: 'primary' | 'secondary' | 'gradient'
}

/**
 * Hook to get diamond layout theme colors based on MUI theme
 */
export function useDiamondTheme(options: UseDiamondThemeOptions = {}): DiamondThemeColors {
  const { colorScheme = 'primary' } = options
  const theme = useTheme()

  const colors = useMemo((): DiamondThemeColors => {
    const palette = theme.palette

    switch (colorScheme) {
      case 'secondary':
        return {
          bars: {
            level1: {
              background: alpha(palette.secondary.dark, 0.9),
              text: palette.secondary.contrastText,
            },
            level2: {
              background: palette.secondary.main,
              text: palette.secondary.contrastText,
            },
          },
          content: {
            background: palette.background.paper,
            shadow: '0 8px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
          },
          diamonds: {
            edge: palette.secondary.dark,
            center: palette.secondary.light,
            stroke: palette.secondary.dark,
          },
        }

      case 'gradient':
        return {
          bars: {
            level1: {
              background: alpha(palette.primary.dark, 0.9),
              text: palette.primary.contrastText,
            },
            level2: {
              background: palette.secondary.main,
              text: palette.secondary.contrastText,
            },
          },
          content: {
            background: palette.background.paper,
            shadow: '0 8px 32px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)',
          },
          diamonds: {
            edge: palette.primary.dark,
            center: palette.secondary.light,
            stroke: palette.primary.dark,
          },
        }

      case 'primary':
      default:
        return {
          bars: {
            level1: {
              background: alpha(palette.primary.dark, 0.9),
              text: palette.primary.contrastText,
            },
            level2: {
              background: palette.primary.main,
              text: palette.primary.contrastText,
            },
          },
          content: {
            background: palette.background.paper,
            shadow: '0 8px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
          },
          diamonds: {
            edge: palette.primary.dark,
            center: palette.primary.light,
            stroke: palette.primary.dark,
          },
        }
    }
  }, [colorScheme, theme.palette])

  return colors
}

/**
 * Get elevation styles for different levels
 */
export function getElevationLevelStyles(level: 1 | 2 | 3) {
  switch (level) {
    case 1:
      return {
        boxShadow: 'none',
        zIndex: 10,
      }
    case 2:
      return {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 20,
      }
    case 3:
      return {
        boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 30,
      }
    default:
      return {
        boxShadow: 'none',
        zIndex: 10,
      }
  }
}
