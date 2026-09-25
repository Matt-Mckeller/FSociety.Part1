'use client'

import { memo } from 'react'
import { Box } from '@mui/material'
import { getElevationLevelStyles } from './hooks/useDiamondTheme'
import type { DiamondBarProps, BarPosition } from './types'

/**
 * Default heights for each bar position
 */
const DEFAULT_HEIGHTS: Record<BarPosition, number> = {
  'top-1': 40,
  'top-2': 36,
  'bottom-1': 36,
  'bottom-2': 40,
}

/**
 * Horizontal bar component for DiamondLayout
 */
export const DiamondBar = memo(function DiamondBar({
  position,
  elevation,
  height,
  backgroundColor,
  textColor,
  children,
}: DiamondBarProps) {
  const barHeight = height ?? DEFAULT_HEIGHTS[position]
  const elevationStyles = getElevationLevelStyles(elevation)

  return (
    <Box
      data-bar={position}
      sx={{
        width: '100%',
        height: barHeight,
        backgroundColor,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        ...elevationStyles,
      }}
    >
      {children}
    </Box>
  )
})

/**
 * Bar group component for top or bottom bars
 */
export function DiamondBarGroup({
  location,
  bars,
  colors,
  barGap = 0,
  slots,
}: {
  location: 'top' | 'bottom'
  bars: {
    bar1: { visible: boolean; height: number; elevation: 1 | 2 }
    bar2: { visible: boolean; height: number; elevation: 1 | 2 }
  }
  colors: {
    level1: { background: string; text: string }
    level2: { background: string; text: string }
  }
  barGap?: number
  slots?: {
    bar1?: React.ReactNode
    bar2?: React.ReactNode
  }
}) {
  const position1: BarPosition = location === 'top' ? 'top-1' : 'bottom-1'
  const position2: BarPosition = location === 'top' ? 'top-2' : 'bottom-2'

  // Order: for top, bar1 then bar2; for bottom, bar1 then bar2
  const orderedBars = location === 'top'
    ? [
      { ...bars.bar1, position: position1, slot: slots?.bar1, colors: colors.level1 },
      { ...bars.bar2, position: position2, slot: slots?.bar2, colors: colors.level2 },
    ]
    : [
      { ...bars.bar1, position: position1, slot: slots?.bar1, colors: colors.level2 },
      { ...bars.bar2, position: position2, slot: slots?.bar2, colors: colors.level1 },
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
      {orderedBars.map((bar, index) => 
        bar.visible && (
          <DiamondBar
            key={bar.position}
            position={bar.position}
            elevation={bar.elevation}
            height={bar.height}
            backgroundColor={bar.colors.background}
            textColor={bar.colors.text}
          >
            {bar.slot}
          </DiamondBar>
        )
      )}
    </Box>
  )
}

/**
 * Calculate total height of visible bars in a group
 */
export function calculateBarGroupHeight(
  bars: {
    bar1: { visible: boolean; height: number }
    bar2: { visible: boolean; height: number }
  },
  barGap: number
): number {
  const visibleBars = [bars.bar1, bars.bar2].filter(b => b.visible)
  if (visibleBars.length === 0) return 0
  
  const totalHeight = visibleBars.reduce((sum, bar) => sum + bar.height, 0)
  const gaps = (visibleBars.length - 1) * barGap
  
  return totalHeight + gaps
}
