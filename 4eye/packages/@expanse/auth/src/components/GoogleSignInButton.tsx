'use client';

import React from 'react';
import { Button, CircularProgress, SvgIcon, IconButton, Tooltip } from '@mui/material';

// Google "G" Logo SVG
function GoogleIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </SvgIcon>
  );
}

export interface GoogleSignInButtonProps {
  onSuccess: (idToken: string) => void;
  onError?: (error: Error) => void;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  variant?: 'button' | 'icon';
  iconSize?: number;
}

/**
 * Google Sign In Button
 * 
 * Uses Google Identity Services (GIS) library for authentication.
 * Requires NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable.
 * 
 * @param variant - 'button' for full-width button, 'icon' for circular icon
 */
export function GoogleSignInButton({
  onSuccess,
  onError,
  loading = false,
  disabled = false,
  text = 'Continue with Google',
  variant = 'button',
  iconSize = 48,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [gsiLoaded, setGsiLoaded] = React.useState(false);

  // Load Google Identity Services script
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if already loaded
    if (window.google?.accounts?.id) {
      setGsiLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGsiLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Google Identity Services');
      onError?.(new Error('Failed to load Google Sign In'));
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup not needed - script stays loaded
    };
  }, [onError]);

  const handleClick = React.useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured');
      onError?.(new Error('Google Sign In is not configured'));
      return;
    }

    if (!gsiLoaded || !window.google?.accounts?.id) {
      onError?.(new Error('Google Sign In is not ready'));
      return;
    }

    setIsLoading(true);

    // Initialize and prompt
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: { credential: string }) => {
        setIsLoading(false);
        if (response.credential) {
          onSuccess(response.credential);
        } else {
          onError?.(new Error('No credential received from Google'));
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // Show One Tap or popup
    window.google.accounts.id.prompt((notification: { isNotDisplayed: () => boolean; getNotDisplayedReason: () => string }) => {
      if (notification.isNotDisplayed()) {
        // Fall back to popup if One Tap not available
        setIsLoading(false);
        // Use OAuth2 popup flow as fallback
        const popup = window.open(
          `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/google/callback')}&response_type=token&scope=openid%20email%20profile`,
          'Google Sign In',
          'width=500,height=600'
        );
        
        if (!popup) {
          onError?.(new Error('Popup blocked - please allow popups for this site'));
        }
      }
    });
  }, [gsiLoaded, onSuccess, onError]);

  const showLoading = loading || isLoading;

  if (variant === 'icon') {
    return (
      <Tooltip title={text} arrow>
        <IconButton
          onClick={handleClick}
          disabled={disabled || showLoading || !gsiLoaded}
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
          }}
        >
          {showLoading ? (
            <CircularProgress size={24} />
          ) : (
            <GoogleIcon sx={{ fontSize: 24 }} />
          )}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={handleClick}
      disabled={disabled || showLoading || !gsiLoaded}
      startIcon={showLoading ? <CircularProgress size={20} /> : <GoogleIcon />}
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
      }}
    >
      {text}
    </Button>
  );
}

// Extend Window interface for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (callback?: (notification: {
            isNotDisplayed: () => boolean;
            getNotDisplayedReason: () => string;
          }) => void) => void;
          renderButton: (element: HTMLElement, config: object) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}
