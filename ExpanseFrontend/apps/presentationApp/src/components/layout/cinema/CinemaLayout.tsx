'use client'

import { useMemo, useRef } from 'react'
import { Box, useTheme } from '@mui/material'
import { CinemaBarGroup, calculateCinemaBarGroupHeight } from './CinemaBar'
import { CinemaDiamond } from './CinemaDiamond'
import { CinemaFab } from './CinemaFab'
import { useCinemaTheme, getCinemaElevation } from './hooks/useCinemaTheme'
import type { 
  CinemaLayoutProps, 
  CinemaCornerPosition,
} from './types'

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

const DEFAULT_DIAMOND = {
  width: 120,
  height: 60,
}

const DEFAULT_SPACING = {
  barGap: 0,
  contentPadding: 0,
  diamondInset: 8,
}

const DEFAULT_SHADOWS = {
  enabled: true,
  direction: 'inward' as const,
  intensity: 'medium' as const,
}

const DEFAULT_FAB = {
  show: true,
  size: 56,
}

const DEFAULT_CORNERS: CinemaCornerPosition[] = ['top-left', 'top-right', 'bottom-left']

/**
 * CinemaLayout - A layout with elongated diamond corners, configurable bars, and FAB
 * 
 * Features:
 * - 2 bars at top (primary/secondary), 2 bars at bottom (mirrored)
 * - Elongated diamond corners with configurable aspect ratio
 * - Diamonds point toward screen center
 * - Toggleable shadows with direction control (inward/center)
 * - FAB in bottom-right corner
 * - Mode toggle: 'full' (bars + diamonds) or 'diamonds-only'
 */
export function CinemaLayout({
  children,
  mode = 'full',
  diamond: customDiamond,
  corners: cornerConfig,
  bars: customBars,
  shadows: customShadows,
  barColors,
  fab: customFab,
  slots = {},
  spacing: customSpacing,
  colorScheme = 'primary',
  fullScreen = true,
}: CinemaLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  // Merge configurations
  const bars = useMemo(() => ({
    top: {
      primary: { ...DEFAULT_BAR_CONFIG.top.primary, ...customBars?.top?.primary },
      secondary: { ...DEFAULT_BAR_CONFIG.top.secondary, ...customBars?.top?.secondary },
    },
    bottom: {
      primary: { ...DEFAULT_BAR_CONFIG.bottom.primary, ...customBars?.bottom?.primary },
      secondary: { ...DEFAULT_BAR_CONFIG.bottom.secondary, ...customBars?.bottom?.secondary },
    },
  }), [customBars])

  const diamond = useMemo(() => ({
    ...DEFAULT_DIAMOND,
    ...customDiamond,
  }), [customDiamond])

  const spacing = useMemo(() => ({
    ...DEFAULT_SPACING,
    ...customSpacing,
  }), [customSpacing])

  const shadows = useMemo(() => ({
    ...DEFAULT_SHADOWS,
    ...customShadows,
  }), [customShadows])

  const fab = useMemo(() => ({
    ...DEFAULT_FAB,
    ...customFab,
  }), [customFab])

  const cornerPositions = cornerConfig?.positions ?? DEFAULT_CORNERS
  const showCorners = cornerConfig?.show !== false
  const animatedCorners = cornerConfig?.animated !== false
  const diamondColorsEnabled = cornerConfig?.colors?.enabled !== false

  // Get theme colors
  const colors = useCinemaTheme({ colorScheme, barColors })

  // Calculate bar group heights for diamond sizing
  const topBarsHeight = calculateCinemaBarGroupHeight(bars.top, spacing.barGap)
  const bottomBarsHeight = calculateCinemaBarGroupHeight(bars.bottom, spacing.barGap)
  
  // Diamond height should span the bar group height (or use configured height)
  const diamondHeight = mode === 'full' 
    ? Math.max(topBarsHeight, bottomBarsHeight, diamond.height)
    : diamond.height
  
  // Maintain aspect ratio
  const aspectRatio = diamond.width / diamond.height
  const diamondWidth = diamondHeight * aspectRatio

  const showBars = mode === 'full'

  // Common diamond props
  const getDiamondProps = (position: CinemaCornerPosition) => ({
    position,
    width: diamondWidth,
    height: diamondHeight,
    strokeColor: colors.diamonds.stroke,
    gradientColors: diamondColorsEnabled ? {
      edge: cornerConfig?.colors?.edge ?? colors.diamonds.edge,
      center: cornerConfig?.colors?.center ?? colors.diamonds.center,
    } : undefined,
    fillEnabled: diamondColorsEnabled,
    strokeWidth: 3,
    animated: animatedCorners,
  })

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
          <CinemaBarGroup
            location="top"
            bars={bars.top}
            colors={colors.bars}
            shadows={shadows}
            barGap={spacing.barGap}
            slots={{
              primary: slots.topPrimary,
              secondary: slots.topSecondary,
            }}
            isDark={isDark}
          />
          
          {/* Top Corner Diamonds */}
          {showCorners && (
            <>
              {cornerPositions.includes('top-left') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: spacing.diamondInset,
                    transform: 'translateY(-50%)',
                    zIndex: getCinemaElevation('fab'),
                  }}
                >
                  <CinemaDiamond {...getDiamondProps('top-left')} />
                </Box>
              )}
              {cornerPositions.includes('top-right') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: spacing.diamondInset,
                    transform: 'translateY(-50%)',
                    zIndex: getCinemaElevation('fab'),
                  }}
                >
                  <CinemaDiamond {...getDiamondProps('top-right')} />
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
          zIndex: getCinemaElevation('content'),
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: colors.content.background,
            boxShadow: shadows.enabled ? colors.content.shadow : 'none',
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
                    zIndex: getCinemaElevation('fab'),
                  }}
                >
                  <CinemaDiamond {...getDiamondProps('top-left')} />
                </Box>
              )}
              {cornerPositions.includes('top-right') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: spacing.diamondInset,
                    right: spacing.diamondInset,
                    zIndex: getCinemaElevation('fab'),
                  }}
                >
                  <CinemaDiamond {...getDiamondProps('top-right')} />
                </Box>
              )}
              {cornerPositions.includes('bottom-left') && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: spacing.diamondInset,
                    left: spacing.diamondInset,
                    zIndex: getCinemaElevation('fab'),
                  }}
                >
                  <CinemaDiamond {...getDiamondProps('bottom-left')} />
                </Box>
              )}
              {cornerPositions.includes('bottom-right') && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: spacing.diamondInset,
                    right: spacing.diamondInset,
                    zIndex: getCinemaElevation('fab'),
                  }}
                >
                  <CinemaDiamond {...getDiamondProps('bottom-right')} />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Bottom Bars */}
      {showBars && (
        <Box sx={{ position: 'relative' }}>
          <CinemaBarGroup
            location="bottom"
            bars={bars.bottom}
            colors={colors.bars}
            shadows={shadows}
            barGap={spacing.barGap}
            slots={{
              primary: slots.bottomPrimary,
              secondary: slots.bottomSecondary,
            }}
            isDark={isDark}
          />
          
          {/* Bottom Corner Diamonds */}
          {showCorners && (
            <>
              {cornerPositions.includes('bottom-left') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: spacing.diamondInset,
                    transform: 'translateY(-50%)',
                    zIndex: getCinemaElevation('fab'),
                  }}
                >
                  <CinemaDiamond {...getDiamondProps('bottom-left')} />
                </Box>
              )}
              {cornerPositions.includes('bottom-right') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: spacing.diamondInset,
                    transform: 'translateY(-50%)',
                    zIndex: getCinemaElevation('fab'),
                  }}
                >
                  <CinemaDiamond {...getDiamondProps('bottom-right')} />
                </Box>
              )}
            </>
          )}
          
          {/* FAB */}
          <CinemaFab
            show={fab.show}
            size={fab.size}
            onClick={fab.onClick}
            backgroundColor={colors.fab.background}
            textColor={colors.fab.text}
          >
            {fab.children}
          </CinemaFab>
        </Box>
      )}

      {/* FAB for diamonds-only mode */}
      {mode === 'diamonds-only' && fab.show && (
        <CinemaFab
          show={fab.show}
          size={fab.size}
          onClick={fab.onClick}
          backgroundColor={colors.fab.background}
          textColor={colors.fab.text}
        >
          {fab.children}
        </CinemaFab>
      )}
    </Box>
  )
}

export default CinemaLayout
