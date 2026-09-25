'use client'

import { useMemo, useId } from 'react'
import { Box } from '@mui/material'
import type { ResourceDiamondProps, ResourceCategory } from './resourceTypes'
import { RESOURCE_COLORS, CATEGORY_CONFIGS, RESOURCE_LABELS, getResourceColor } from './resourceTypes'

/**
 * Get rotation angle so diamond points toward screen center
 * The "pointing" tip should face the center of the screen
 */
function getRotationForPosition(position: ResourceDiamondProps['position']): number {
  // Diamond has 4 points. With rotation, one point faces the center.
  // At 0° rotation, the RIGHT point faces right.
  // We want the point facing screen center:
  switch (position) {
    case 'top-left': return 135     // Right point rotated to face bottom-right (center)
    case 'top-right': return -135   // Right point rotated to face bottom-left (center)
    case 'bottom-left': return 45   // Right point rotated to face top-right (center)
    case 'bottom-right': return -45 // Right point rotated to face top-left (center)
    default: return 0
  }
}

/**
 * Get fill gradient direction based on position
 * Fill should grow FROM the outer screen corner TOWARD the center
 * Returns the angle for a linear gradient (in degrees)
 */
function getFillGradientAngle(position: ResourceDiamondProps['position']): number {
  // Gradient angle: 0deg = bottom to top, 90deg = left to right
  // We want fill to start at outer corner and grow toward center
  switch (position) {
    case 'top-left': return 135     // Fill from top-left toward bottom-right
    case 'top-right': return -135   // Fill from top-right toward bottom-left (225deg)
    case 'bottom-left': return 45   // Fill from bottom-left toward top-right
    case 'bottom-right': return -45 // Fill from bottom-right toward top-left (315deg)
    default: return 0
  }
}

/**
 * ResourceDiamond - Diamond-shaped resource pool with water fill effect
 */
export function ResourceDiamond({
  resourceId,
  value,
  max = 100,
  position,
  width,
  height,
  category,
  isExpanded = false,
  isHovered = false,
  isActive = false,
  alwaysSaturated = false,
  showPercentage = true,
  animationDuration = 300,
  onClick,
  onToggleExpand,
  onMouseEnter,
  onMouseLeave,
  resources = [],
}: ResourceDiamondProps) {
  const uniqueId = useId()
  const gradientId = `resource-gradient-${uniqueId}`
  const clipId = `resource-clip-${uniqueId}`

  // Get color from category or specific resource
  const colorConfig = useMemo(() => {
    if (resourceId) {
      return getResourceColor(resourceId)
    }
    // Use category primary color
    const categoryConfig = CATEGORY_CONFIGS[category]
    return {
      primary: categoryConfig.primaryColor,
      secondary: categoryConfig.primaryColor,
      glow: `${categoryConfig.primaryColor}66`,
    }
  }, [resourceId, category])

  // Calculate fill percentage
  const fillPercent = Math.max(0, Math.min(100, (value / max) * 100))
  
  // Diamond points (relative to width/height)
  const points = useMemo(() => {
    const cx = width / 2
    const cy = height / 2
    return `${cx},2 ${width - 2},${cy} ${cx},${height - 2} 2,${cy}`
  }, [width, height])

  // Is saturated (hovered or active)
  const isSaturated = alwaysSaturated || isHovered || isActive || isExpanded

  // Rotation for pointing toward center
  const rotation = getRotationForPosition(position)

  // Fill gradient angle
  const fillAngle = getFillGradientAngle(position)

  // Label
  const label = resourceId ? RESOURCE_LABELS[resourceId] : CATEGORY_CONFIGS[category].label

  return (
    <Box
      onClick={onClick ?? onToggleExpand}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        position: 'relative',
        width,
        height,
        cursor: 'pointer',
        filter: isSaturated ? 'saturate(1) brightness(1)' : 'saturate(0.3) brightness(0.8)',
        transition: `filter ${animationDuration}ms ease-out`,
        '&:hover': {
          filter: 'saturate(1) brightness(1)',
        },
      }}
    >
      <Box
        component="svg"
        viewBox={`0 0 ${width} ${height}`}
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <defs>
          {/* Linear gradient for diagonal fill toward center */}
          <linearGradient
            id={gradientId}
            gradientTransform={`rotate(${fillAngle}, 0.5, 0.5)`}
          >
            {/* Transparent at outer edge (start), solid at center-facing edge */}
            <stop offset="0%" stopColor={colorConfig.primary} stopOpacity={0} />
            <stop offset={`${Math.max(0, fillPercent - 20)}%`} stopColor={colorConfig.primary} stopOpacity={0} />
            <stop offset={`${fillPercent}%`} stopColor={colorConfig.secondary} stopOpacity={0.8} />
            <stop offset="100%" stopColor={colorConfig.primary} stopOpacity={0.9} />
          </linearGradient>

          {/* Diamond clip path */}
          <clipPath id={clipId}>
            <polygon points={points} />
          </clipPath>
        </defs>

        {/* Background diamond (outline) */}
        <polygon
          points={points}
          fill="transparent"
          stroke={colorConfig.primary}
          strokeWidth={2}
          opacity={0.5}
        />

        {/* Filled portion - covers full diamond, gradient creates fill effect */}
        <g clipPath={`url(#${clipId})`}>
          {/* Water fill with animated gradient */}
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={`url(#${gradientId})`}
            style={{
              transition: `fill ${animationDuration}ms ease-out`,
            }}
          />
        </g>

        {/* Glow effect when active */}
        {(isActive || isExpanded) && (
          <polygon
            points={points}
            fill="transparent"
            stroke={colorConfig.glow}
            strokeWidth={6}
            opacity={0.5}
            filter="blur(4px)"
          />
        )}

        {/* Percentage text (counter-rotate to stay upright) */}
        {showPercentage && isSaturated && (
          <text
            x={width / 2}
            y={height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={14}
            fontWeight={600}
            style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              transform: `rotate(${-rotation}deg)`,
              transformOrigin: `${width / 2}px ${height / 2}px`,
            }}
          >
            {Math.round(fillPercent)}%
          </text>
        )}
      </Box>

      {/* Expansion indicator */}
      {isExpanded && (
        <Box
          sx={{
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `6px solid ${colorConfig.primary}`,
          }}
        />
      )}
    </Box>
  )
}

export default ResourceDiamond
