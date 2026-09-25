'use client'

import React from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { SocialAuthButton } from './SocialAuthButton'
import { AuthProvider, SocialAuthButtonsProps } from '../../types/onboarding'

const DEFAULT_PROVIDERS: AuthProvider[] = ['google', 'microsoft', 'apple', 'github']

export function SocialAuthButtons({
  providers = DEFAULT_PROVIDERS,
  onProviderClick,
  disabled = false,
  loading = false,
  size = 'medium',
  showDivider = true,
  dividerText = 'or',
}: SocialAuthButtonsProps) {
  const handleProviderClick = (provider: AuthProvider) => {
    if (onProviderClick) {
      onProviderClick(provider)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={1.5}>
        {providers.map((provider) => (
          <SocialAuthButton
            key={provider}
            provider={provider}
            onClick={handleProviderClick}
            disabled={disabled}
            loading={loading}
            size={size}
            fullWidth
          />
        ))}
      </Stack>
      
      {showDivider && (
        <Divider sx={{ my: 3 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ px: 2, textTransform: 'uppercase', fontSize: '0.75rem' }}
          >
            {dividerText}
          </Typography>
        </Divider>
      )}
    </Box>
  )
}
