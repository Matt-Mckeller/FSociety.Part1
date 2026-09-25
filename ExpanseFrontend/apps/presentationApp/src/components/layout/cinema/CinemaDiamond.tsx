'use client'

import { memo, useMemo } from 'react'
import { Box } from '@mui/material'
import type { CinemaDiamondProps, CinemaCornerPosition } from './types'

/**
 * Creates an SVG path for a diamond (elongated rhombus)
 * Points: top, right, bottom, left (clockwise from top)
 * 
 * @param width - Total width of the diamond
 * @param height - Total height of the diamond
 * @param strokeWidth - Stroke width for inset calculation
 */
function createDiamondPath(width: number, height: number, strokeWidth: number): string {
  const inset = strokeWidth / 2
  const halfWidth = width / 2
  const halfHeight = height / 2
  
  // Center point is (halfWidth, halfHeight)
  // Points go: top center, right center, bottom center, left center
  return `
    M ${halfWidth} ${inset}
    L ${width - inset} ${halfHeight}
    L ${halfWidth} ${height - inset}
    L ${inset} ${halfHeight}
    Z
  `
}

/**
 * Get unique gradient ID for each corner
 */
function getGradientId(position: CinemaCornerPosition): string {
  return `cinema-diamond-gradient-${position}`
}

/**
 * Get rotation angle to point diamond toward screen center
 * Each corner diamond rotates to have its point face inward
 */
function getRotationForPosition(position: CinemaCornerPosition): number {
  switch (position) {
    case 'top-left':
      return 45  // Point toward bottom-right (center)
    case 'top-right':
      return 135 // Point toward bottom-left (center)
    case 'bottom-left':
      return -45 // Point toward top-right (center)
    case 'bottom-right':
      return -135 // Point toward top-left (center)
    default:
      return 0
  }
}

/**
 * Diamond corner decoration component
 * Renders an elongated diamond shape pointing toward screen center
 * with optional gradient fill or outline-only mode
 */
export const CinemaDiamond = memo(function CinemaDiamond({
  position,
  width,
  height,
  strokeColor,
  gradientColors,
  fillEnabled = true,
  strokeWidth,
  animated = false,
}: CinemaDiamondProps) {
  const path = useMemo(
    () => createDiamondPath(width, height, strokeWidth),
    [width, height, strokeWidth]
  )

  const gradientId = getGradientId(position)
  const rotation = getRotationForPosition(position)

  // Determine fill color - either gradient or transparent
  const fillValue = fillEnabled && gradientColors 
    ? `url(#${gradientId})` 
    : 'transparent'

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${width} ${height}`}
      sx={{
        width,
        height,
        pointerEvents: 'none',
        overflow: 'visible',
        transform: `rotate(${rotation}deg)`,
        ...(animated && {
          animation: 'diamondFadeIn 0.5s ease-out',
          '@keyframes diamondFadeIn': {
            from: {
              opacity: 0,
              transform: `rotate(${rotation}deg) scale(0.7)`,
            },
            to: {
              opacity: 1,
              transform: `rotate(${rotation}deg) scale(1)`,
            },
          },
        }),
      }}
    >
      {fillEnabled && gradientColors && (
        <defs>
          <radialGradient 
            id={gradientId} 
            cx="50%" 
            cy="50%" 
            r="70%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor={gradientColors.center} />
            <stop offset="100%" stopColor={gradientColors.edge} />
          </radialGradient>
        </defs>
      )}
      <path
        d={path}
        fill={fillValue}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Box>
  )
})

/**
 * Props for CinemaDiamonds container
 */
interface CinemaDiamondsProps {
  positions: CinemaCornerPosition[]
  width: number
  height: number
  strokeColor: string
  gradientColors?: {
    edge: string
    center: string
  }
  fillEnabled?: boolean
  strokeWidth: number
  animated?: boolean
  show?: boolean
}

/**
 * Render multiple diamonds based on configuration
 */
export function CinemaDiamonds({
  positions,
  width,
  height,
  strokeColor,
  gradientColors,
  fillEnabled = true,
  strokeWidth,
  animated = false,
  show = true,
}: CinemaDiamondsProps) {
  if (!show) return null

  return (
    <>
      {positions.map((position) => (
        <CinemaDiamond
          key={position}
          position={position}
          width={width}
          height={height}
          strokeColor={strokeColor}
          gradientColors={gradientColors}
          fillEnabled={fillEnabled}
          strokeWidth={strokeWidth}
          animated={animated}
        />
      ))}
    </>
  )
}

export default CinemaDiamond
