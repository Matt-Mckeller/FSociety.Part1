'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Link,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { EmailInput, PasswordInput, NameInput } from '@expanse/ui';
import { useSignupForm } from '../hooks';
import { GoogleSignInButton } from './GoogleSignInButton';
import { AppleSignInButton } from './AppleSignInButton';
import { SocialAuthDivider } from './SocialAuthDivider';

export interface SignupFormProps {
  onSuccess?: () => void;
  onLogin?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  showTitle?: boolean;
  showSocialAuth?: boolean;
  redirectTo?: string;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
}

export function SignupForm({
  onSuccess,
  onLogin,
  onCancel,
  onClose,
  showTitle = true,
  showSocialAuth = true,
  redirectTo,
  privacyPolicyUrl = '/privacy',
  termsOfServiceUrl = '/terms',
}: SignupFormProps) {
  // Use the form hook for all state management and logic
  const form = useSignupForm({ onSuccess, redirectTo });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit();
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.updateField('agreedToTerms', event.target.checked);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', position: 'relative' }}>
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
          }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      )}
      {/* Page Header */}
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
            Create Account
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mt: 1,
              fontSize: '1.05rem'
            }}>
            Join 4eye.ai today
          </Typography>
        </Box>
      )}
      {/* Error Alert */}
      {form.error && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {form.error.message}
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
              <GoogleSignInButton
                onSuccess={form.handleGoogleSuccess}
                onError={form.handleOAuthError}
                loading={form.oauthLoading === 'google'}
                disabled={form.isLoading}
                variant="icon"
                iconSize={40}
              />
              <AppleSignInButton
                onSuccess={form.handleAppleSuccess}
                onError={form.handleOAuthError}
                loading={form.oauthLoading === 'apple'}
                disabled={form.isLoading}
                variant="icon"
                iconSize={40}
              />
            </Box>
        </SocialAuthDivider>
      )}
      {/* Form Fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}>
        <Box
          sx={{
            mb: 2.5,
            width: "100%"
          }}>
          <NameInput
            value={form.formData.name}
            onChange={(v) => form.updateField('name', v)}
            error={!!form.validation.getError('name')}
            helperText={form.validation.getError('name')}
            autoFocus
            disabled={form.isLoading}
          />
        </Box>
        <Box
          sx={{
            mb: 2.5,
            width: "100%"
          }}>
          <EmailInput
            value={form.formData.email}
            onChange={(v) => form.updateField('email', v)}
            error={!!form.validation.getError('email')}
            helperText={form.validation.getError('email')}
            disabled={form.isLoading}
          />
        </Box>
        <Box
          sx={{
            mb: 3,
            width: "100%"
          }}>
          <PasswordInput
            value={form.formData.password}
            onChange={(v) => form.updateField('password', v)}
            error={!!form.validation.getError('password')}
            helperText={form.validation.getError('password')}
            showRequirements
            autoComplete="new-password"
            disabled={form.isLoading}
          />
        </Box>
        <Box
          sx={{
            mb: 3,
            width: "100%"
          }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.formData.agreedToTerms}
                onChange={handleTermsChange}
                disabled={form.isLoading}
                size="small"
              />
            }
            label={
              <Typography variant="body2" sx={{
                color: "text.secondary"
              }}>
                I agree to the{' '}
                <Link href={termsOfServiceUrl} target="_blank" rel="noopener" underline="hover">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href={privacyPolicyUrl} target="_blank" rel="noopener" underline="hover">
                  Privacy Policy
                </Link>
              </Typography>
            }
          />
          {form.termsError && (
            <FormHelperText error sx={{ ml: 4 }}>
              {form.termsError}
            </FormHelperText>
          )}
        </Box>
      </Box>
      {/* Submit Actions */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          mb: 3
        }}>
        {onCancel && (
          <Button
            fullWidth
            variant="outlined"
            onClick={onCancel}
            disabled={form.isLoading}
            sx={{
              color: 'text.primary',
              borderColor: 'divider',
              opacity: 0.6,
              '&:hover': { opacity: 1, borderColor: 'text.primary' },
            }}
          >
            Cancel
          </Button>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={form.isLoading}
        >
          {form.isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Create Account'
          )}
        </Button>
      </Box>
      {/* Footer Link */}
      {onLogin && (
        <Box
          sx={{
            textAlign: "center",
            width: "100%"
          }}>
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={onLogin}
            underline="hover"
            sx={{ cursor: 'pointer' }}
          >
            Already have an account? Sign In
          </Link>
        </Box>
      )}
    </Box>
  );
}
