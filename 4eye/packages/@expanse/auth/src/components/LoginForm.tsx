'use client';

import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Link,
  IconButton,
  Slide,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EmailInput, PasswordInput } from '@expanse/ui';
import { useLoginForm, type LoginStep } from '../hooks';
import { GoogleSignInButton } from './GoogleSignInButton';
import { AppleSignInButton } from './AppleSignInButton';
import { SocialAuthDivider } from './SocialAuthDivider';

export type { LoginStep };

export interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onSignup?: () => void;
  onClose?: () => void;
  showTitle?: boolean;
  showSocialAuth?: boolean;
  redirectTo?: string;
}

export function LoginForm({
  onSuccess,
  onForgotPassword,
  onSignup,
  onClose,
  showTitle = true,
  showSocialAuth = true,
  redirectTo,
}: LoginFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the form hook for all state management and logic
  const form = useLoginForm({ onSuccess, redirectTo });

  // Destructure for convenience
  const {
    state,
    emailErrors,
    passwordErrors,
    error,
    isLoading,
    updateEmail,
    updatePassword,
    continueToPassword,
    submitPassword,
    back,
    notYou,
    handleGoogleSuccess,
    handleAppleSuccess,
    handleOAuthError,
  } = form;

  // Determine if we should show social hint
  const showSocialHint = state.isReturningUser && state.lastLogin &&
    (state.lastLogin.method === 'google' || state.lastLogin.method === 'apple');
  const highlightedProvider = showSocialHint ? state.lastLogin?.method : null;

  return (
    <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }} ref={containerRef}>
      {/* Close Button */}
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' },
            zIndex: 1,
          }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      )}
      {/* Step 1: Email */}
      {state.step === 'email' && (
        <Slide
          direction={state.slideDirection === 'left' ? 'right' : 'left'}
          in={state.step === 'email'}
          appear={false}
          timeout={250}
        >
          <Box
            component="form"
            onSubmit={continueToPassword}
            sx={{ width: '100%' }}
          >
            {/* Header */}
            {showTitle && (
              <Box
                sx={{
                  textAlign: "center",
                  mb: 4
                }}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{ fontSize: '1.5rem', fontWeight: 500 }}
                >
                  {state.isReturningUser ? 'Welcome Back' : 'Sign In'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    mt: 1,
                    fontSize: '1.05rem'
                  }}>
                  Sign in to your 4eye.ai account
                </Typography>
              </Box>
            )}

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2.5 }}>
                {error.message}
              </Alert>
            )}

            {/* Social Hint for returning users */}
            {showSocialHint && (
              <Alert severity="info" sx={{ mb: 2.5 }}>
                You last signed in with {highlightedProvider === 'google' ? 'Google' : 'Apple'}
              </Alert>
            )}

            {/* Social Auth */}
            {showSocialAuth && (
              <SocialAuthDivider>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2
                    }}>
                    <Box sx={highlightedProvider === 'google' ? {
                      borderRadius: '50%',
                      boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
                    } : undefined}>
                      <GoogleSignInButton
                        onSuccess={handleGoogleSuccess}
                        onError={handleOAuthError}
                        loading={state.oauthLoading === 'google'}
                        disabled={isLoading}
                        variant="icon"
                        iconSize={40}
                      />
                    </Box>
                    <Box sx={highlightedProvider === 'apple' ? {
                      borderRadius: '50%',
                      boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
                    } : undefined}>
                      <AppleSignInButton
                        onSuccess={handleAppleSuccess}
                        onError={handleOAuthError}
                        loading={state.oauthLoading === 'apple'}
                        disabled={isLoading}
                        variant="icon"
                        iconSize={40}
                      />
                    </Box>
                  </Box>
              </SocialAuthDivider>
            )}

            {/* Email Field */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column"
              }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  mb: 2
                }}>
                Enter your school or personal email
              </Typography>
              <Box
                sx={{
                  mb: 3,
                  width: "100%"
                }}>
                <EmailInput
                  value={state.email}
                  onChange={updateEmail}
                  error={!!emailErrors.getError('email')}
                  helperText={emailErrors.getError('email')}
                  autoFocus={!state.isReturningUser}
                  disabled={isLoading}
                />
              </Box>
            </Box>

            {/* Continue Button */}
            <Box
              sx={{
                width: "100%",
                mb: 3
              }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Continue'
                )}
              </Button>
            </Box>

            {/* Footer Links */}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: onSignup && state.isReturningUser ? 'space-between' : onSignup ? 'center' : 'center',
                alignItems: "center"
              }}>
              {onSignup && (
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={onSignup}
                  underline="hover"
                  sx={{ cursor: 'pointer' }}
                >
                  New here? Create Account
                </Link>
              )}
              {state.isReturningUser && (
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={notYou}
                  underline="hover"
                  sx={{ cursor: 'pointer', color: 'text.secondary' }}
                >
                  Not you?
                </Link>
              )}
            </Box>
          </Box>
        </Slide>
      )}
      {/* Step 2: Password */}
      {state.step === 'password' && (
        <Slide
          direction={state.slideDirection === 'left' ? 'left' : 'right'}
          in={state.step === 'password'}
          timeout={250}
        >
          <Box
            component="form"
            onSubmit={submitPassword}
            sx={{ width: '100%' }}
          >
            {/* Back + Header */}
            <Box sx={{
              mb: 4
            }}>
              <IconButton
                onClick={back}
                sx={{ mb: 1, ml: -1, color: 'text.secondary' }}
                aria-label="Back"
              >
                <ArrowBackIcon />
              </IconButton>
              {showTitle && (
                <Box sx={{
                  textAlign: "center"
                }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{ fontSize: '1.5rem', fontWeight: 500 }}
                  >
                    Welcome Back
                  </Typography>
                  <Chip
                    label={state.email}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              )}
            </Box>

            {/* Social Hint from auth method check */}
            {state.authMethodResult?.hint && (
              <Alert severity="info" sx={{ mb: 2.5 }}>
                {state.authMethodResult.hint}
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2.5 }}>
                {error.message}
              </Alert>
            )}

            {/* Password Field */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column"
              }}>
              <Box
                sx={{
                  mb: 3,
                  width: "100%"
                }}>
                <PasswordInput
                  value={state.password}
                  onChange={updatePassword}
                  error={!!passwordErrors.getError('password')}
                  helperText={passwordErrors.getError('password')}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </Box>
            </Box>

            {/* Sign In Button */}
            <Box
              sx={{
                width: "100%",
                mb: 3
              }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Box>

            {/* Footer Links */}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center"
              }}>
              {onForgotPassword && (
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={onForgotPassword}
                  underline="hover"
                  sx={{ cursor: 'pointer' }}
                >
                  Forgot Password?
                </Link>
              )}
            </Box>
          </Box>
        </Slide>
      )}
      {/* Step 3: SSO Redirect */}
      {state.step === 'sso-redirect' && (
        <Slide
          direction="left"
          in={state.step === 'sso-redirect'}
          timeout={250}
        >
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              py: 6,
            }}
          >
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{
              color: "text.secondary"
            }}>
              Redirecting to your school&apos;s login...
            </Typography>
          </Box>
        </Slide>
      )}
    </Box>
  );
}
