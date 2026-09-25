'use client';

import React from 'react';
import { Button, CircularProgress, SvgIcon, Tooltip, IconButton } from '@mui/material';

// Apple Logo SVG
function AppleIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export interface AppleSignInButtonProps {
  onSuccess: (idToken: string, nonce: string) => void;
  onError?: (error: Error) => void;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  variant?: 'button' | 'icon';
  iconSize?: number;
}

/**
 * Apple Sign In Button
 * 
 * Note: Apple Sign In backend is not yet implemented.
 * This button is currently disabled with a tooltip explaining the status.
 * 
 * @param variant - 'button' for full-width button, 'icon' for circular icon
 */
export function AppleSignInButton({
  onSuccess,
  onError,
  loading = false,
  disabled = false,
  text = 'Continue with Apple',
  variant = 'button',
  iconSize = 48,
}: AppleSignInButtonProps) {
  // Apple Sign In is not yet implemented on the backend
  const isImplemented = false;

  const handleClick = React.useCallback(() => {
    if (!isImplemented) {
      onError?.(new Error('Apple Sign In is coming soon'));
      return;
    }
    
    // TODO: Implement Apple Sign In when backend is ready
    // 1. Generate nonce
    // 2. Load Apple JS SDK
    // 3. Initialize with client ID and redirect URI
    // 4. Handle response with idToken and nonce
  }, [isImplemented, onError]);

  if (variant === 'icon') {
    const iconButton = (
      <IconButton
        onClick={handleClick}
        disabled={disabled || loading || !isImplemented}
        sx={{
          width: iconSize,
          height: iconSize,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          '&:hover': {
            borderColor: 'text.secondary',
            backgroundColor: 'action.hover',
          },
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <AppleIcon sx={{ fontSize: 24 }} />
        )}
      </IconButton>
    );

    return (
      <Tooltip title={isImplemented ? text : 'Apple Sign In coming soon'} arrow>
        <span>{iconButton}</span>
      </Tooltip>
    );
  }

  const button = (
    <Button
      fullWidth
      variant="outlined"
      onClick={handleClick}
      disabled={disabled || loading || !isImplemented}
      startIcon={loading ? <CircularProgress size={20} /> : <AppleIcon />}
      sx={{
        borderColor: 'divider',
        color: 'text.primary',
        backgroundColor: 'background.paper',
        textTransform: 'none',
        fontWeight: 500,
        py: 1.5,
        borderRadius: 2,
        '&:hover': {
          borderColor: 'text.secondary',
          backgroundColor: 'action.hover',
        },
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      }}
    >
      {text}
    </Button>
  );

  if (!isImplemented) {
    return (
      <Tooltip title="Apple Sign In coming soon" arrow>
        <span style={{ width: '100%' }}>{button}</span>
      </Tooltip>
    );
  }

  return button;
}
