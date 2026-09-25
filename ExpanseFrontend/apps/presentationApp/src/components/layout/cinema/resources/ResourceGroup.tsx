'use client'

import { useState, useCallback, useMemo } from 'react'
import { Box, Collapse, ClickAwayListener } from '@mui/material'
import { ResourceDiamond } from './ResourceDiamond'
import { ResourceShape } from './ResourceShape'
import type { 
  ResourceCategory, 
  ResourceValue, 
  ResourceShapeType,
  ResourceId 
} from './resourceTypes'
import { CATEGORY_CONFIGS, getResourcesForCategory } from './resourceTypes'

interface ResourceGroupProps {
  /** Category for this resource group */
  category: ResourceCategory
  /** Position in layout */
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** Resource values */
  values: Record<ResourceId, number>
  /** Diamond dimensions */
  diamondWidth: number
  diamondHeight: number
  /** Size of expanded shapes */
  expandedShapeSize?: number
  /** Is this group currently expanded */
  isExpanded?: boolean
  /** Called when expansion state should change */
  onToggleExpand?: () => void
  /** Called when clicking outside */
  onClickAway?: () => void
  /** Called when a resource value changes */
  onValueChange?: (id: ResourceId, value: number) => void
}

// Shape types to cycle through for variety
const SHAPE_CYCLE: ResourceShapeType[] = ['circle', 'diamond', 'square', 'triangle']

/**
 * Get expansion direction based on position
 */
function getExpansionDirection(position: ResourceGroupProps['position']): 'right' | 'left' | 'down' | 'up' {
  switch (position) {
    case 'top-left': return 'right'
    case 'top-right': return 'left'
    case 'bottom-left': return 'right'
    case 'bottom-right': return 'left'
    default: return 'right'
  }
}

/**
 * ResourceGroup - Diamond with expandable child resources
 */
export function ResourceGroup({
  category,
  position,
  values,
  diamondWidth,
  diamondHeight,
  expandedShapeSize = 36,
  isExpanded = false,
  onToggleExpand,
  onClickAway,
  onValueChange,
}: ResourceGroupProps) {
  const [hoveredResource, setHoveredResource] = useState<ResourceId | null>(null)

  // Get resources for this category
  const resources = useMemo(() => {
    return getResourcesForCategory(category)
  }, [category])

  // Calculate aggregate value (average of all resources)
  const aggregateValue = useMemo(() => {
    const total = resources.reduce((sum, id) => sum + (values[id] ?? 0), 0)
    return Math.round(total / resources.length)
  }, [resources, values])

  // Primary resource (first in category, used for diamond display)
  const primaryResource = resources[0]

  // Expansion direction
  const expansionDirection = getExpansionDirection(position)

  // Handle mouse events
  const handleMouseEnter = useCallback((id: ResourceId) => {
    setHoveredResource(id)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredResource(null)
  }, [])

  // Container styles based on position
  const containerStyles = useMemo(() => {
    const base = {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    }

    switch (expansionDirection) {
      case 'right':
        return { ...base, flexDirection: 'row' as const }
      case 'left':
        return { ...base, flexDirection: 'row-reverse' as const }
      case 'down':
        return { ...base, flexDirection: 'column' as const }
      case 'up':
        return { ...base, flexDirection: 'column-reverse' as const }
      default:
        return base
    }
  }, [expansionDirection])

  const content = (
    <Box sx={containerStyles}>
      {/* Primary Diamond */}
      <ResourceDiamond
        resourceId={primaryResource}
        value={aggregateValue}
        position={position}
        width={diamondWidth}
        height={diamondHeight}
        category={category}
        isExpanded={isExpanded}
        isHovered={hoveredResource === primaryResource}
        onToggleExpand={onToggleExpand}
        onMouseEnter={() => handleMouseEnter(primaryResource)}
        onMouseLeave={handleMouseLeave}
      />

      {/* Expanded Resources */}
      <Collapse 
        in={isExpanded} 
        orientation={expansionDirection === 'right' || expansionDirection === 'left' ? 'horizontal' : 'vertical'}
        timeout={300}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: expansionDirection === 'right' || expansionDirection === 'left' ? 'row' : 'column',
            gap: 0.75,
            p: 0.5,
          }}
        >
          {resources.map((resourceId, index) => (
            <ResourceShape
              key={resourceId}
              resourceId={resourceId}
              value={values[resourceId] ?? 0}
              shape={SHAPE_CYCLE[index % SHAPE_CYCLE.length]}
              size={expandedShapeSize}
              isHovered={hoveredResource === resourceId}
              animationDelay={index * 50}
              onMouseEnter={() => handleMouseEnter(resourceId)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onValueChange?.(resourceId, ((values[resourceId] ?? 0) + 10) % 110)}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  )

  // Wrap in ClickAwayListener if expanded
  if (isExpanded && onClickAway) {
    return (
      <ClickAwayListener onClickAway={onClickAway}>
        {content}
      </ClickAwayListener>
    )
  }

  return content
}

export default ResourceGroup
