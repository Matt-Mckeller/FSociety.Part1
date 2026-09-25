'use client'

import { memo, useMemo } from 'react'
import { Box } from '@mui/material'
import type { DiamondCornerProps, DiamondCornerPosition } from './types'

/**
 * Creates an SVG path for a diamond (rotated square)
 * Points: top, right, bottom, left (clockwise from top)
 */
function createDiamondPath(size: number, strokeWidth: number): string {
  const inset = strokeWidth / 2
  const half = size / 2
  
  return `
    M ${half} ${inset}
    L ${size - inset} ${half}
    L ${half} ${size - inset}
    L ${inset} ${half}
    Z
  `
}

/**
 * Get unique gradient ID for each corner
 */
function getGradientId(position: DiamondCornerPosition): string {
  return `diamond-gradient-${position}`
}

/**
 * Get position styles for absolute positioning
 */
function getPositionStyles(
  position: DiamondCornerPosition,
  size: number,
  inset: number
): React.CSSProperties {
  const halfSize = size / 2
  
  switch (position) {
    case 'top-left':
      return {
        top: -inset,
        left: -halfSize + inset,
      }
    case 'top-right':
      return {
        top: -inset,
        right: -halfSize + inset,
      }
    case 'bottom-left':
      return {
        bottom: -inset,
        left: -halfSize + inset,
      }
    case 'bottom-right':
      return {
        bottom: -inset,
        right: -halfSize + inset,
      }
    default:
      return {}
  }
}

/**
 * Diamond corner decoration component
 * Renders a rotated square with radial gradient (dark edges → light center)
 */
export const DiamondCorner = memo(function DiamondCorner({
  position,
  size,
  strokeColor,
  gradientColors,
  strokeWidth,
  animated = false,
}: DiamondCornerProps) {
  const path = useMemo(
    () => createDiamondPath(size, strokeWidth),
    [size, strokeWidth]
  )

  const gradientId = getGradientId(position)
  const positionStyles = useMemo(
    () => getPositionStyles(position, size, 0),
    [position, size]
  )

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${size} ${size}`}
      sx={{
        position: 'absolute',
        width: size,
        height: size,
        pointerEvents: 'none',
        overflow: 'visible',
        ...positionStyles,
        ...(animated && {
          animation: 'diamondFadeIn 0.5s ease-out',
          '@keyframes diamondFadeIn': {
            from: {
              opacity: 0,
              transform: 'scale(0.7) rotate(-10deg)',
            },
            to: {
              opacity: 1,
              transform: 'scale(1) rotate(0deg)',
            },
          },
        }),
      }}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={gradientColors.center} />
          <stop offset="100%" stopColor={gradientColors.edge} />
        </radialGradient>
      </defs>
      <path
        d={path}
        fill={`url(#${gradientId})`}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Box>
  )
})

/**
 * Render multiple diamond corners based on configuration
 */
export function DiamondCorners({
  positions,
  size,
  strokeColor,
  gradientColors,
  strokeWidth,
  animated = false,
  show = true,
}: {
  positions: DiamondCornerPosition[]
  size: number
  strokeColor: string
  gradientColors: {
    edge: string
    center: string
  }
  strokeWidth: number
  animated?: boolean
  show?: boolean
}) {
  if (!show) return null

  return (
    <>
      {positions.map((position) => (
        <DiamondCorner
          key={position}
          position={position}
          size={size}
          strokeColor={strokeColor}
          gradientColors={gradientColors}
          strokeWidth={strokeWidth}
          animated={animated}
        />
      ))}
    </>
  )
}
