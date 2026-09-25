'use client'

import { memo, ReactNode } from 'react'
import { Box } from '@mui/material'
import { getCinemaElevation, getShadowForPosition } from './hooks/useCinemaTheme'
import type { CinemaBarProps, CinemaBarPosition, ShadowConfig, CinemaBarPairConfig } from './types'

/**
 * Individual bar component for CinemaLayout
 */
export const CinemaBar = memo(function CinemaBar({
  position,
  height,
  backgroundColor,
  textColor,
  shadow = 'none',
  children,
}: CinemaBarProps) {
  const isPrimary = position.includes('primary')
  
  return (
    <Box
      data-bar={position}
      sx={{
        width: '100%',
        height,
        backgroundColor,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        zIndex: getCinemaElevation(isPrimary ? 'primary' : 'secondary'),
        boxShadow: shadow,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {children}
    </Box>
  )
})

/**
 * Props for CinemaBarGroup
 */
interface CinemaBarGroupProps {
  location: 'top' | 'bottom'
  bars: CinemaBarPairConfig
  colors: {
    primary: { background: string; text: string }
    secondary: { background: string; text: string }
  }
  shadows: ShadowConfig
  barGap?: number
  slots?: {
    primary?: ReactNode
    secondary?: ReactNode
  }
  isDark?: boolean
}

/**
 * Bar group component for top or bottom bars
 * Top: primary then secondary (thick on outside)
 * Bottom: secondary then primary (thick on outside)
 */
export function CinemaBarGroup({
  location,
  bars,
  colors,
  shadows,
  barGap = 0,
  slots,
  isDark = false,
}: CinemaBarGroupProps) {
  // Determine bar positions
  const primaryPosition: CinemaBarPosition = location === 'top' ? 'top-primary' : 'bottom-primary'
  const secondaryPosition: CinemaBarPosition = location === 'top' ? 'top-secondary' : 'bottom-secondary'
  
  // Get shadows for each bar
  const primaryShadow = getShadowForPosition(primaryPosition, shadows, isDark)
  const secondaryShadow = getShadowForPosition(secondaryPosition, shadows, isDark)
  
  // Order bars: top = primary first, bottom = secondary first (mirror)
  const orderedBars = location === 'top'
    ? [
      { 
        key: 'primary',
        visible: bars.primary.visible, 
        height: bars.primary.height, 
        position: primaryPosition,
        colors: colors.primary,
        shadow: primaryShadow,
        slot: slots?.primary,
      },
      { 
        key: 'secondary',
        visible: bars.secondary.visible, 
        height: bars.secondary.height, 
        position: secondaryPosition,
        colors: colors.secondary,
        shadow: secondaryShadow,
        slot: slots?.secondary,
      },
    ]
    : [
      { 
        key: 'secondary',
        visible: bars.secondary.visible, 
        height: bars.secondary.height, 
        position: secondaryPosition,
        colors: colors.secondary,
        shadow: secondaryShadow,
        slot: slots?.secondary,
      },
      { 
        key: 'primary',
        visible: bars.primary.visible, 
        height: bars.primary.height, 
        position: primaryPosition,
        colors: colors.primary,
        shadow: primaryShadow,
        slot: slots?.primary,
      },
    ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${barGap}px`,
        flexShrink: 0,
      }}
    >
      {orderedBars.map((bar) => 
        bar.visible && (
          <CinemaBar
            key={bar.key}
            position={bar.position}
            height={bar.height}
            backgroundColor={bar.colors.background}
            textColor={bar.colors.text}
            shadow={bar.shadow}
          >
            {bar.slot}
          </CinemaBar>
        )
      )}
    </Box>
  )
}

/**
 * Calculate total height of visible bars in a group
 */
export function calculateCinemaBarGroupHeight(
  bars: CinemaBarPairConfig,
  barGap: number
): number {
  const visibleBars = [
    bars.primary.visible ? bars.primary : null,
    bars.secondary.visible ? bars.secondary : null,
  ].filter(Boolean) as Array<{ height: number }>
  
  if (visibleBars.length === 0) return 0
  
  const totalHeight = visibleBars.reduce((sum, bar) => sum + bar.height, 0)
  const gaps = (visibleBars.length - 1) * barGap
  
  return totalHeight + gaps
}

export default CinemaBar
