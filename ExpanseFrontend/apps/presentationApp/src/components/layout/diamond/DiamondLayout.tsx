'use client'

import { useMemo, useRef } from 'react'
import { Box } from '@mui/material'
import { DiamondBarGroup, calculateBarGroupHeight } from './DiamondBar'
import { DiamondCorners } from './DiamondCorner'
import { useDiamondTheme, getElevationLevelStyles } from './hooks/useDiamondTheme'
import type { 
  DiamondLayoutProps, 
  DiamondCornerPosition,
  DIAMOND_DEFAULTS 
} from './types'

const DEFAULT_BAR_CONFIG = {
  topBar1: { height: 40, elevation: 1 as const, visible: true },
  topBar2: { height: 36, elevation: 2 as const, visible: true },
  bottomBar1: { height: 36, elevation: 2 as const, visible: true },
  bottomBar2: { height: 40, elevation: 1 as const, visible: true },
}

const DEFAULT_SPACING = {
  barGap: 0,
  contentPadding: 0,
  diamondInset: 0,
}

const DEFAULT_CORNERS: DiamondCornerPosition[] = ['top-left', 'top-right', 'bottom-left']

/**
 * DiamondLayout - A layout with stacked horizontal bars and corner diamonds
 * 
 * Features:
 * - 2 bars at top, 2 bars at bottom
 * - Corner diamonds spanning the full height of bar pairs
 * - Center content with highest elevation
 * - Mode toggle: 'full' (bars + diamonds) or 'diamonds-only'
 */
export function DiamondLayout({
  children,
  mode = 'full',
  bars: customBars,
  slots = {},
  corners: cornerConfig,
  spacing: customSpacing,
  elevation = 'subtle',
  colorScheme = 'primary',
  fullScreen = true,
}: DiamondLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Merge configurations
  const bars = useMemo(() => ({
    topBar1: { ...DEFAULT_BAR_CONFIG.topBar1, ...customBars?.topBar1 },
    topBar2: { ...DEFAULT_BAR_CONFIG.topBar2, ...customBars?.topBar2 },
    bottomBar1: { ...DEFAULT_BAR_CONFIG.bottomBar1, ...customBars?.bottomBar1 },
    bottomBar2: { ...DEFAULT_BAR_CONFIG.bottomBar2, ...customBars?.bottomBar2 },
  }), [customBars])

  const spacing = useMemo(() => ({
    ...DEFAULT_SPACING,
    ...customSpacing,
  }), [customSpacing])

  const cornerPositions = cornerConfig?.positions ?? DEFAULT_CORNERS
  const showCorners = cornerConfig?.show !== false
  const animatedCorners = cornerConfig?.animated !== false

  // Get theme colors
  const colors = useDiamondTheme({ colorScheme })
  const contentElevation = getElevationLevelStyles(3)

  // Calculate diamond size (spans full height of both bars)
  const topBarsHeight = calculateBarGroupHeight(
    { bar1: bars.topBar1, bar2: bars.topBar2 },
    spacing.barGap
  )
  const bottomBarsHeight = calculateBarGroupHeight(
    { bar1: bars.bottomBar1, bar2: bars.bottomBar2 },
    spacing.barGap
  )
  
  // Diamond size - use the larger of top or bottom bar heights
  const diamondSize = mode === 'full' 
    ? Math.max(topBarsHeight, bottomBarsHeight, 60)
    : 60 // Fixed size for diamonds-only mode

  const showBars = mode === 'full'

  return (
    <Box
      ref={containerRef}
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
      {showBars && (
        <Box sx={{ position: 'relative' }}>
          <DiamondBarGroup
            location="top"
            bars={{
              bar1: {
                visible: bars.topBar1.visible ?? true,
                height: bars.topBar1.height ?? 40,
                elevation: bars.topBar1.elevation ?? 1,
              },
              bar2: {
                visible: bars.topBar2.visible ?? true,
                height: bars.topBar2.height ?? 36,
                elevation: bars.topBar2.elevation ?? 2,
              },
            }}
            colors={colors.bars}
            barGap={spacing.barGap}
            slots={{
              bar1: slots.topBar1,
              bar2: slots.topBar2,
            }}
          />
          
          {/* Top Corner Diamonds */}
          {showCorners && (
            <>
              {cornerPositions.includes('top-left') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: spacing.diamondInset,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 100,
                  }}
                >
                  <DiamondCorners
                    positions={['top-left']}
                    size={diamondSize}
                    strokeColor={colors.diamonds.stroke}
                    gradientColors={{
                      edge: colors.diamonds.edge,
                      center: colors.diamonds.center,
                    }}
                    strokeWidth={3}
                    animated={animatedCorners}
                  />
                </Box>
              )}
              {cornerPositions.includes('top-right') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: spacing.diamondInset,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 100,
                  }}
                >
                  <DiamondCorners
                    positions={['top-right']}
                    size={diamondSize}
                    strokeColor={colors.diamonds.stroke}
                    gradientColors={{
                      edge: colors.diamonds.edge,
                      center: colors.diamonds.center,
                    }}
                    strokeWidth={3}
                    animated={animatedCorners}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      )}

      {/* Content Area */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'stretch',
          padding: `${spacing.contentPadding}px`,
          zIndex: contentElevation.zIndex,
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: colors.content.background,
            boxShadow: colors.content.shadow,
            borderRadius: mode === 'diamonds-only' ? 2 : 0,
            overflow: 'auto',
            position: 'relative',
          }}
        >
          {children}
          
          {/* Diamonds-only mode corners */}
          {mode === 'diamonds-only' && showCorners && (
            <>
              {cornerPositions.includes('top-left') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: spacing.diamondInset,
                    left: spacing.diamondInset,
                    zIndex: 100,
                  }}
                >
                  <DiamondCorners
                    positions={['top-left']}
                    size={diamondSize}
                    strokeColor={colors.diamonds.stroke}
                    gradientColors={{
                      edge: colors.diamonds.edge,
                      center: colors.diamonds.center,
                    }}
                    strokeWidth={3}
                    animated={animatedCorners}
                  />
                </Box>
              )}
              {cornerPositions.includes('top-right') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: spacing.diamondInset,
                    right: spacing.diamondInset,
                    zIndex: 100,
                  }}
                >
                  <DiamondCorners
                    positions={['top-right']}
                    size={diamondSize}
                    strokeColor={colors.diamonds.stroke}
                    gradientColors={{
                      edge: colors.diamonds.edge,
                      center: colors.diamonds.center,
                    }}
                    strokeWidth={3}
                    animated={animatedCorners}
                  />
                </Box>
              )}
              {cornerPositions.includes('bottom-left') && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: spacing.diamondInset,
                    left: spacing.diamondInset,
                    zIndex: 100,
                  }}
                >
                  <DiamondCorners
                    positions={['bottom-left']}
                    size={diamondSize}
                    strokeColor={colors.diamonds.stroke}
                    gradientColors={{
                      edge: colors.diamonds.edge,
                      center: colors.diamonds.center,
                    }}
                    strokeWidth={3}
                    animated={animatedCorners}
                  />
                </Box>
              )}
              {cornerPositions.includes('bottom-right') && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: spacing.diamondInset,
                    right: spacing.diamondInset,
                    zIndex: 100,
                  }}
                >
                  <DiamondCorners
                    positions={['bottom-right']}
                    size={diamondSize}
                    strokeColor={colors.diamonds.stroke}
                    gradientColors={{
                      edge: colors.diamonds.edge,
                      center: colors.diamonds.center,
                    }}
                    strokeWidth={3}
                    animated={animatedCorners}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Bottom Bars */}
      {showBars && (
        <Box sx={{ position: 'relative' }}>
          <DiamondBarGroup
            location="bottom"
            bars={{
              bar1: {
                visible: bars.bottomBar1.visible ?? true,
                height: bars.bottomBar1.height ?? 36,
                elevation: bars.bottomBar1.elevation ?? 2,
              },
              bar2: {
                visible: bars.bottomBar2.visible ?? true,
                height: bars.bottomBar2.height ?? 40,
                elevation: bars.bottomBar2.elevation ?? 1,
              },
            }}
            colors={colors.bars}
            barGap={spacing.barGap}
            slots={{
              bar1: slots.bottomBar1,
              bar2: slots.bottomBar2,
            }}
          />
          
          {/* Bottom Corner Diamonds */}
          {showCorners && (
            <>
              {cornerPositions.includes('bottom-left') && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: spacing.diamondInset,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 100,
                  }}
                >
                  <DiamondCorners
                    positions={['bottom-left']}
                    size={diamondSize}
                    strokeColor={colors.diamonds.stroke}
                    gradientColors={{
                      edge: colors.diamonds.edge,
                      center: colors.diamonds.center,
                    }}
                    strokeWidth={3}
                    animated={animatedCorners}
                  />
                </Box>
              )}
              {cornerPositions.includes('bottom-right') && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: spacing.diamondInset,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 100,
                  }}
                >
                  <DiamondCorners
                    positions={['bottom-right']}
                    size={diamondSize}
                    strokeColor={colors.diamonds.stroke}
                    gradientColors={{
                      edge: colors.diamonds.edge,
                      center: colors.diamonds.center,
                    }}
                    strokeWidth={3}
                    animated={animatedCorners}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  )
}

export default DiamondLayout
