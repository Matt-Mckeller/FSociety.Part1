'use client'

import { useState, useCallback, useMemo, ReactNode } from 'react'
import { Box, useTheme } from '@mui/material'
import { ResourceGroup } from './ResourceGroup'
import { ResourceBar } from './ResourceBar'
import { useResourcePool, useResourceExpansion } from './useResourcePool'
import type { ResourceCategory, ResourceId } from './resourceTypes'
import { CinemaBarGroup, calculateCinemaBarGroupHeight } from '../CinemaBar'
import { CinemaFab } from '../CinemaFab'
import { useCinemaTheme, getShadowForPosition } from '../hooks/useCinemaTheme'

interface ResourceLayoutProps {
  children: ReactNode
  /** Initial resource values */
  initialValues?: Partial<Record<ResourceId, number>>
  /** Show FAB in bottom-right */
  showFab?: boolean
  /** FAB click handler */
  onFabClick?: () => void
  /** Color scheme for bars */
  colorScheme?: 'primary' | 'secondary' | 'neutral'
  /** Full screen mode */
  fullScreen?: boolean
}

const DEFAULT_BAR_CONFIG = {
  top: {
    primary: { height: 48, visible: true },
    secondary: { height: 24, visible: true },
  },
  bottom: {
    primary: { height: 48, visible: true },
    secondary: { height: 24, visible: true },
  },
}

const DEFAULT_SHADOWS = {
  enabled: true,
  direction: 'inward' as const,
  intensity: 'medium' as const,
}

/**
 * ResourceLayout - Layout with resource pool diamonds and bars
 * 
 * Features:
 * - Corner diamonds representing resource categories
 * - Click to expand and see individual resources
 * - Water-like fill effect with desaturation
 * - Fills toward screen center
 */
export function ResourceLayout({
  children,
  initialValues,
  showFab = true,
  onFabClick,
  colorScheme = 'primary',
  fullScreen = true,
}: ResourceLayoutProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  // Resource state management
  const { values, setValue, getCategoryAggregate } = useResourcePool({ initialValues })
  const { expandedCategory, toggleCategory, closeAll } = useResourceExpansion()

  // Theme colors
  const colors = useCinemaTheme({ colorScheme })

  // Diamond dimensions
  const diamondWidth = 120
  const diamondHeight = 60

  // Bar heights
  const topBarsHeight = calculateCinemaBarGroupHeight(DEFAULT_BAR_CONFIG.top, 0)
  const bottomBarsHeight = calculateCinemaBarGroupHeight(DEFAULT_BAR_CONFIG.bottom, 0)

  // Category assignments to positions
  const categoryPositions: Record<'top-left' | 'top-right' | 'bottom-left', ResourceCategory> = {
    'top-left': 'core',
    'top-right': 'emotional',
    'bottom-left': 'cognitive',
  }

  // Handle value changes from ResourceGroup
  const handleValueChange = useCallback((id: ResourceId, value: number) => {
    setValue(id, value)
  }, [setValue])

  // Handle click away from expanded groups
  const handleClickAway = useCallback(() => {
    closeAll()
  }, [closeAll])

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: fullScreen ? '100vh' : '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* Top Bars */}
      <Box sx={{ position: 'relative' }}>
        <CinemaBarGroup
          location="top"
          bars={DEFAULT_BAR_CONFIG.top}
          colors={colors.bars}
          shadows={DEFAULT_SHADOWS}
          barGap={0}
          isDark={isDark}
        />

        {/* Top-Left Resource Group */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 100,
          }}
        >
          <ResourceGroup
            category={categoryPositions['top-left']}
            position="top-left"
            values={values}
            diamondWidth={diamondWidth}
            diamondHeight={diamondHeight}
            isExpanded={expandedCategory === 'core'}
            onToggleExpand={() => toggleCategory('core')}
            onClickAway={expandedCategory === 'core' ? handleClickAway : undefined}
            onValueChange={handleValueChange}
          />
        </Box>

        {/* Top-Right Resource Group */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 100,
          }}
        >
          <ResourceGroup
            category={categoryPositions['top-right']}
            position="top-right"
            values={values}
            diamondWidth={diamondWidth}
            diamondHeight={diamondHeight}
            isExpanded={expandedCategory === 'emotional'}
            onToggleExpand={() => toggleCategory('emotional')}
            onClickAway={expandedCategory === 'emotional' ? handleClickAway : undefined}
            onValueChange={handleValueChange}
          />
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          overflow: 'auto',
          bgcolor: 'background.paper',
          boxShadow: getShadowForPosition('content', DEFAULT_SHADOWS, isDark),
        }}
      >
        {children}
      </Box>

      {/* Bottom Bars */}
      <Box sx={{ position: 'relative' }}>
        <CinemaBarGroup
          location="bottom"
          bars={DEFAULT_BAR_CONFIG.bottom}
          colors={colors.bars}
          shadows={DEFAULT_SHADOWS}
          barGap={0}
          isDark={isDark}
        />

        {/* Bottom-Left Resource Group */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            zIndex: 100,
          }}
        >
          <ResourceGroup
            category={categoryPositions['bottom-left']}
            position="bottom-left"
            values={values}
            diamondWidth={diamondWidth}
            diamondHeight={diamondHeight}
            isExpanded={expandedCategory === 'cognitive'}
            onToggleExpand={() => toggleCategory('cognitive')}
            onClickAway={expandedCategory === 'cognitive' ? handleClickAway : undefined}
            onValueChange={handleValueChange}
          />
        </Box>

        {/* Bottom-Right FAB */}
        {showFab && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              zIndex: 100,
            }}
          >
            <CinemaFab onClick={onFabClick} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ResourceLayout
