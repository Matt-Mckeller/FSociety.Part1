'use client'

import { useMemo, useId } from 'react'
import { Box, Tooltip } from '@mui/material'
import type { ResourceShapeProps, ResourceShapeType } from './resourceTypes'
import { getResourceColor, RESOURCE_LABELS } from './resourceTypes'

/**
 * Get SVG path/shape for different shape types
 */
function getShapePath(type: ResourceShapeType, size: number): string {
  const half = size / 2
  const padding = 2

  switch (type) {
    case 'diamond':
      return `${half},${padding} ${size - padding},${half} ${half},${size - padding} ${padding},${half}`
    case 'circle':
      // Return empty - we'll use a circle element instead
      return ''
    case 'square':
      return `${padding},${padding} ${size - padding},${padding} ${size - padding},${size - padding} ${padding},${size - padding}`
    case 'triangle':
      return `${half},${padding} ${size - padding},${size - padding} ${padding},${size - padding}`
    default:
      return `${half},${padding} ${size - padding},${half} ${half},${size - padding} ${padding},${half}`
  }
}

/**
 * ResourceShape - Small shape for expanded resource display
 */
export function ResourceShape({
  resourceId,
  value,
  max = 100,
  shape = 'diamond',
  size = 32,
  color,
  showPercentage = false,
  isHovered = false,
  isActive = false,
  alwaysSaturated = false,
  animationDuration = 300,
  animationDelay = 0,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ResourceShapeProps) {
  const uniqueId = useId()
  const gradientId = `shape-gradient-${uniqueId}`
  const clipId = `shape-clip-${uniqueId}`

  // Get color
  const colorConfig = useMemo(() => {
    if (color) {
      return { primary: color, secondary: color, glow: `${color}66` }
    }
    return getResourceColor(resourceId)
  }, [color, resourceId])

  // Calculate fill percentage
  const fillPercent = Math.max(0, Math.min(100, (value / max) * 100))

  // Is saturated
  const isSaturated = alwaysSaturated || isHovered || isActive

  // Shape points
  const points = useMemo(() => getShapePath(shape, size), [shape, size])

  // Label
  const label = RESOURCE_LABELS[resourceId]

  return (
    <Tooltip title={`${label}: ${Math.round(fillPercent)}%`} placement="top">
      <Box
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{
          position: 'relative',
          width: size,
          height: size,
          cursor: 'pointer',
          filter: isSaturated ? 'saturate(1) brightness(1)' : 'saturate(0.35) brightness(0.85)',
          transition: `filter ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out, opacity ${animationDuration}ms ease-out`,
          transitionDelay: `${animationDelay}ms`,
          transform: 'scale(1)',
          '&:hover': {
            filter: 'saturate(1) brightness(1.1)',
            transform: 'scale(1.15)',
          },
        }}
      >
        <Box
          component="svg"
          viewBox={`0 0 ${size} ${size}`}
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        >
          <defs>
            {/* Linear gradient for fill (bottom to top) */}
            <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={colorConfig.primary} stopOpacity={0.9} />
              <stop offset={`${fillPercent}%`} stopColor={colorConfig.secondary} stopOpacity={0.7} />
              <stop offset={`${fillPercent}%`} stopColor="transparent" stopOpacity={0} />
              <stop offset="100%" stopColor="transparent" stopOpacity={0} />
            </linearGradient>

            {/* Clip path for shape */}
            {shape === 'circle' ? (
              <clipPath id={clipId}>
                <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} />
              </clipPath>
            ) : (
              <clipPath id={clipId}>
                <polygon points={points} />
              </clipPath>
            )}
          </defs>

          {/* Background shape (outline) */}
          {shape === 'circle' ? (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 2}
              fill="transparent"
              stroke={colorConfig.primary}
              strokeWidth={1.5}
              opacity={0.5}
            />
          ) : (
            <polygon
              points={points}
              fill="transparent"
              stroke={colorConfig.primary}
              strokeWidth={1.5}
              opacity={0.5}
            />
          )}

          {/* Filled portion */}
          <g clipPath={`url(#${clipId})`}>
            <rect
              x={0}
              y={size * (1 - fillPercent / 100)}
              width={size}
              height={size * (fillPercent / 100) + 1}
              fill={colorConfig.primary}
              opacity={0.7}
              style={{
                transition: `y ${animationDuration}ms ease-out, height ${animationDuration}ms ease-out`,
              }}
            />
          </g>

          {/* Glow on active */}
          {isActive && shape === 'circle' ? (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 2}
              fill="transparent"
              stroke={colorConfig.glow}
              strokeWidth={4}
              opacity={0.5}
              filter="blur(2px)"
            />
          ) : isActive ? (
            <polygon
              points={points}
              fill="transparent"
              stroke={colorConfig.glow}
              strokeWidth={4}
              opacity={0.5}
              filter="blur(2px)"
            />
          ) : null}

          {/* Percentage text */}
          {showPercentage && (
            <text
              x={size / 2}
              y={size / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={size / 4}
              fontWeight={600}
              style={{
                textShadow: '0 1px 2px rgba(0,0,0,0.7)',
              }}
            >
              {Math.round(fillPercent)}
            </text>
          )}
        </Box>
      </Box>
    </Tooltip>
  )
}

export default ResourceShape
