'use client';

import { useMemo } from 'react';
import { useTheme, alpha } from '@mui/material';
import type { PyramidThemeColors, ColorScheme } from '../types';

interface UsePyramidThemeOptions {
  colorScheme?: ColorScheme;
}

/**
 * Hook to get pyramid layout theme colors based on MUI theme
 */
export function usePyramidTheme(options: UsePyramidThemeOptions = {}): PyramidThemeColors {
  const { colorScheme = 'primary' } = options;
  const theme = useTheme();

  const colors = useMemo((): PyramidThemeColors => {
    const palette = theme.palette;

    switch (colorScheme) {
      case 'secondary':
        return {
          outer: {
            stroke: palette.secondary.dark,
            fill: palette.secondary.main,
          },
          middle: {
            stroke: palette.secondary.main,
            fill: palette.secondary.light,
          },
          inner: {
            stroke: palette.secondary.light,
            fill: alpha(palette.secondary.light, 0.3),
          },
          content: {
            background: palette.background.paper,
          },
          corners: {
            stroke: palette.secondary.dark,
            fill: palette.secondary.main,
          },
        };

      case 'gradient':
        // Create a gradient-like effect using primary and secondary
        return {
          outer: {
            stroke: palette.primary.dark,
            fill: palette.primary.main,
          },
          middle: {
            stroke: palette.secondary.main,
            fill: palette.secondary.light,
          },
          inner: {
            stroke: palette.primary.light,
            fill: alpha(palette.primary.light, 0.2),
          },
          content: {
            background: palette.background.paper,
          },
          corners: {
            stroke: palette.primary.dark,
            fill: alpha(palette.primary.main, 0.8),
          },
        };

      case 'primary':
      default:
        return {
          outer: {
            stroke: palette.primary.dark,
            fill: palette.primary.main,
          },
          middle: {
            stroke: palette.primary.main,
            fill: palette.primary.light,
          },
          inner: {
            stroke: palette.primary.light,
            fill: alpha(palette.primary.light, 0.3),
          },
          content: {
            background: palette.background.paper,
          },
          corners: {
            stroke: palette.primary.dark,
            fill: palette.primary.main,
          },
        };
    }
  }, [colorScheme, theme.palette]);

  return colors;
}

/**
 * Get elevation shadow styles
 */
export function getElevationStyles(elevation: 'flat' | 'subtle' | 'pronounced') {
  switch (elevation) {
    case 'flat':
      return {
        boxShadow: 'none',
        filter: 'none',
      };
    case 'subtle':
      return {
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
      };
    case 'pronounced':
      return {
        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
      };
    default:
      return {
        boxShadow: 'none',
        filter: 'none',
      };
  }
}
