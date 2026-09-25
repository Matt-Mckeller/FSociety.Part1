'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PasswordInput } from '@expanse/ui';
import { useResetPasswordForm } from '../hooks';

export interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
  onBackToLogin?: () => void;
  onClose?: () => void;
  showTitle?: boolean;
}

export function ResetPasswordForm({
  token,
  onSuccess,
  onBackToLogin,
  onClose,
  showTitle = true,
}: ResetPasswordFormProps) {
  // Use the form hook for all state management and logic
  const form = useResetPasswordForm({ token, onSuccess });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit();
  };

  // Success state
  if (form.submitted) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Password reset successful!
        </Alert>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          Your password has been updated. You can now sign in with your new password.
        </Typography>
        {onBackToLogin && (
          <Button
            variant="contained"
            onClick={onBackToLogin}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        )}
      </Box>
    );
  }

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
            Reset Password
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mt: 1,
              fontSize: '1.05rem'
            }}>
            Create a new secure password for your account
          </Typography>
        </Box>
      )}
      {/* Error Alert */}
      {form.error && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {form.error.message}
        </Alert>
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
          <PasswordInput
            value={form.formData.password}
            onChange={(v) => form.updateField('password', v)}
            error={!!form.validation.getError('password')}
            helperText={form.validation.getError('password')}
            showRequirements
            autoComplete="new-password"
            label="New Password"
            disabled={form.isSubmitting}
          />
        </Box>
        <Box
          sx={{
            mb: 3,
            width: "100%"
          }}>
          <PasswordInput
            value={form.formData.confirmPassword}
            onChange={(v) => form.updateField('confirmPassword', v)}
            error={!!form.validation.getError('confirmPassword')}
            helperText={form.validation.getError('confirmPassword')}
            autoComplete="new-password"
            label="Confirm Password"
            disabled={form.isSubmitting}
          />
        </Box>
      </Box>
      {/* Submit Action */}
      <Box sx={{
        width: "100%"
      }}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={form.isSubmitting}
        >
          {form.isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Reset Password'
          )}
        </Button>
      </Box>
    </Box>
  );
}
