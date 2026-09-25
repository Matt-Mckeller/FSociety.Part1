'use client'

import { memo, ReactNode } from 'react'
import { Box, ButtonBase, alpha } from '@mui/material'
import { getCinemaElevation } from './hooks/useCinemaTheme'

export interface CinemaFabProps {
  /** Size in pixels (default 56) */
  size?: number
  /** FAB content (icon) */
  children?: ReactNode
  /** Click handler */
  onClick?: () => void
  /** Background color */
  backgroundColor?: string
  /** Text/icon color */
  textColor?: string
  /** Custom shadow */
  shadow?: string
  /** Whether FAB is visible */
  show?: boolean
}

/**
 * Floating Action Button for CinemaLayout
 * Positioned in the bottom-right corner
 */
export const CinemaFab = memo(function CinemaFab({
  size = 56,
  children,
  onClick,
  backgroundColor = '#9c27b0',
  textColor = '#ffffff',
  shadow,
  show = true,
}: CinemaFabProps) {
  if (!show) return null

  const defaultShadow = `0 6px 16px ${alpha(backgroundColor, 0.4)}`

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor,
        color: textColor,
        boxShadow: shadow ?? defaultShadow,
        zIndex: getCinemaElevation('fab'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: `0 8px 20px ${alpha(backgroundColor, 0.5)}`,
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }}
    >
      {children || (
        <Box
          component="svg"
          viewBox="0 0 24 24"
          sx={{
            width: size * 0.5,
            height: size * 0.5,
            fill: 'currentColor',
          }}
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </Box>
      )}
    </ButtonBase>
  )
})

export default CinemaFab
