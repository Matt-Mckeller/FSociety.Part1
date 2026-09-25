'use client'

import { useMemo, useId } from 'react'
import { Box, Tooltip } from '@mui/material'
import type { ResourceBarProps } from './resourceTypes'
import { getResourceColor, RESOURCE_LABELS } from './resourceTypes'

/**
 * ResourceBar - Fillable bar segment for resource display
 */
export function ResourceBar({
  resourceId,
  value,
  max = 100,
  fillDirection = 'left-to-right',
  width,
  height,
  color,
  showPercentage = false,
  isHovered = false,
  isActive = false,
  alwaysSaturated = false,
  animationDuration = 300,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ResourceBarProps) {
  const uniqueId = useId()
  const gradientId = `bar-gradient-${uniqueId}`

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

  // Label
  const label = RESOURCE_LABELS[resourceId]

  // Get fill styles based on direction
  const fillStyles = useMemo(() => {
    const baseStyles = {
      position: 'absolute' as const,
      transition: `all ${animationDuration}ms ease-out`,
      background: `linear-gradient(90deg, ${colorConfig.secondary} 0%, ${colorConfig.primary} 50%, ${colorConfig.secondary} 100%)`,
    }

    switch (fillDirection) {
      case 'left-to-right':
        return {
          ...baseStyles,
          left: 0,
          top: 0,
          bottom: 0,
          width: `${fillPercent}%`,
        }
      case 'right-to-left':
        return {
          ...baseStyles,
          right: 0,
          top: 0,
          bottom: 0,
          width: `${fillPercent}%`,
        }
      case 'center-out':
        return {
          ...baseStyles,
          left: `${50 - fillPercent / 2}%`,
          top: 0,
          bottom: 0,
          width: `${fillPercent}%`,
        }
      case 'edges-in':
        // Two fills from edges meeting in center
        return {
          ...baseStyles,
          left: 0,
          top: 0,
          bottom: 0,
          width: `${fillPercent / 2}%`,
          // We'll add a second element for the right side
        }
      default:
        return {
          ...baseStyles,
          left: 0,
          top: 0,
          bottom: 0,
          width: `${fillPercent}%`,
        }
    }
  }, [fillDirection, fillPercent, colorConfig, animationDuration])

  return (
    <Tooltip title={`${label}: ${Math.round(fillPercent)}%`} placement="top">
      <Box
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{
          position: 'relative',
          width,
          height,
          cursor: 'pointer',
          filter: isSaturated ? 'saturate(1) brightness(1)' : 'saturate(0.35) brightness(0.85)',
          transition: `filter ${animationDuration}ms ease-out`,
          borderRadius: height / 4,
          overflow: 'hidden',
          bgcolor: 'rgba(0,0,0,0.2)',
          border: `1px solid ${colorConfig.primary}40`,
          '&:hover': {
            filter: 'saturate(1) brightness(1.05)',
          },
        }}
      >
        {/* Fill */}
        <Box sx={fillStyles} />

        {/* Second fill for edges-in mode */}
        {fillDirection === 'edges-in' && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: `${fillPercent / 2}%`,
              transition: `all ${animationDuration}ms ease-out`,
              background: `linear-gradient(90deg, ${colorConfig.secondary} 0%, ${colorConfig.primary} 50%, ${colorConfig.secondary} 100%)`,
            }}
          />
        )}

        {/* Wave effect at fill line */}
        {fillDirection !== 'edges-in' && fillDirection !== 'center-out' && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 4,
              ...(fillDirection === 'left-to-right' 
                ? { left: `calc(${fillPercent}% - 2px)` }
                : { right: `calc(${fillPercent}% - 2px)` }
              ),
              background: `linear-gradient(to bottom, transparent, ${colorConfig.primary}, transparent)`,
              opacity: 0.8,
              transition: `all ${animationDuration}ms ease-out`,
            }}
          />
        )}

        {/* Glow on active */}
        {isActive && (
          <Box
            sx={{
              position: 'absolute',
              inset: -2,
              borderRadius: height / 4 + 2,
              border: `2px solid ${colorConfig.glow}`,
              filter: 'blur(2px)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Percentage text */}
        {showPercentage && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: Math.min(height * 0.6, 14),
              fontWeight: 600,
              textShadow: '0 1px 2px rgba(0,0,0,0.7)',
              pointerEvents: 'none',
            }}
          >
            {Math.round(fillPercent)}%
          </Box>
        )}
      </Box>
    </Tooltip>
  )
}

export default ResourceBar
