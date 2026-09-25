'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Link,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { EmailInput } from '@expanse/ui';
import { useForgotPasswordForm } from '../hooks';

export interface ForgotPasswordFormProps {
  onSuccess?: (email: string) => void;
  onBackToLogin?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  showTitle?: boolean;
}

export function ForgotPasswordForm({
  onSuccess,
  onBackToLogin,
  onCancel,
  onClose,
  showTitle = true,
}: ForgotPasswordFormProps) {
  // Use the form hook for all state management and logic
  const form = useForgotPasswordForm({ onSuccess });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit();
  };

  // Success state - show confirmation message
  if (form.submitted) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Password reset instructions sent!
        </Alert>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          If an account exists for <strong>{form.email}</strong>, you will receive
          an email with instructions to reset your password.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          Please check your inbox and spam folder.
        </Typography>
        {onBackToLogin && (
          <Button
            variant="contained"
            onClick={onBackToLogin}
            sx={{ mt: 2 }}
          >
            Back to Sign In
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
            Forgot Password?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mt: 1,
              fontSize: '1.05rem'
            }}>
            Don&apos;t worry, we&apos;ve got you. Enter your email and we&apos;ll help you reset it.
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
            mb: 3,
            width: "100%"
          }}>
          <EmailInput
            value={form.email}
            onChange={form.updateEmail}
            error={!!form.validation.getError('email')}
            helperText={form.validation.getError('email')}
            autoFocus
            disabled={form.isSubmitting}
          />
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
            disabled={form.isSubmitting}
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
          disabled={form.isSubmitting}
        >
          {form.isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </Box>
      {/* Footer Link */}
      {onBackToLogin && (
        <Box
          sx={{
            textAlign: "center",
            width: "100%"
          }}>
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={onBackToLogin}
            underline="hover"
            sx={{ cursor: 'pointer' }}
          >
            Back to Sign In
          </Link>
        </Box>
      )}
    </Box>
  );
}
