'use client'

import React from 'react'
import { Button, SxProps, Theme, useTheme } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import AppleIcon from '@mui/icons-material/Apple'
import { AuthProvider, SocialAuthButtonProps } from '../../types/onboarding'

// Microsoft icon as SVG since MUI doesn't have one
const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="9" height="9" fill="#F25022" />
    <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
    <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
  </svg>
)

const PROVIDER_CONFIG: Record<AuthProvider, { label: string; icon: React.ReactNode; bgColor: string; hoverColor: string }> = {
  google: {
    label: 'Continue with Google',
    icon: <GoogleIcon />,
    bgColor: '#ffffff',
    hoverColor: '#f5f5f5',
  },
  microsoft: {
    label: 'Continue with Microsoft',
    icon: <MicrosoftIcon />,
    bgColor: '#ffffff',
    hoverColor: '#f5f5f5',
  },
  apple: {
    label: 'Continue with Apple',
    icon: <AppleIcon />,
    bgColor: '#000000',
    hoverColor: '#1a1a1a',
  },
  github: {
    label: 'Continue with GitHub',
    icon: <GitHubIcon />,
    bgColor: '#24292e',
    hoverColor: '#2f363d',
  },
}

const SIZE_CONFIG = {
  small: { height: 36, fontSize: '0.875rem', iconSize: 18 },
  medium: { height: 44, fontSize: '1rem', iconSize: 20 },
  large: { height: 52, fontSize: '1.125rem', iconSize: 24 },
}

export function SocialAuthButton({
  provider,
  onClick,
  disabled = false,
  loading = false,
  size = 'medium',
  fullWidth = true,
}: SocialAuthButtonProps) {
  const theme = useTheme()
  const config = PROVIDER_CONFIG[provider]
  const sizeConfig = SIZE_CONFIG[size]
  
  const isLightButton = provider === 'google' || provider === 'microsoft'
  
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick(provider)
    }
  }

  const sx: SxProps<Theme> = {
    height: sizeConfig.height,
    fontSize: sizeConfig.fontSize,
    backgroundColor: config.bgColor,
    color: isLightButton ? '#1f1f1f' : '#ffffff',
    border: isLightButton ? '1px solid #dadce0' : 'none',
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: 2,
    gap: 1.5,
    '&:hover': {
      backgroundColor: config.hoverColor,
    },
    '&:disabled': {
      opacity: 0.6,
    },
    '& .MuiButton-startIcon': {
      marginRight: 0,
    },
    '& .MuiButton-startIcon svg': {
      width: sizeConfig.iconSize,
      height: sizeConfig.iconSize,
    },
  }

  return (
    <Button
      variant="contained"
      startIcon={config.icon}
      onClick={handleClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      sx={sx}
      aria-label={config.label}
    >
      {loading ? 'Connecting...' : config.label}
    </Button>
  )
}
