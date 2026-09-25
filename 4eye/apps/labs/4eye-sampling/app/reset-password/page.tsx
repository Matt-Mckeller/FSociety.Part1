'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, JSX } from 'react';
import { Box, Paper, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { ResetPasswordForm } from '@expanse/auth';

function ResetPasswordContent(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSuccess = () => {
    // Form shows success message internally with sign-in button
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  const handleClose = () => {
    router.push('/');
  };

  // Invalid or missing token state
  if (!token) {
    return (
      <Box sx={{
        textAlign: "center"
      }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Invalid password reset link
        </Alert>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          This password reset link is invalid or has expired.
          Please request a new password reset.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => router.push('/forgot-password')}
          >
            Request New Link
          </Button>
          <Button
            variant="contained"
            onClick={handleBackToLogin}
          >
            Back to Sign In
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <ResetPasswordForm
      token={token}
      onSuccess={handleSuccess}
      onBackToLogin={handleBackToLogin}
      onClose={handleClose}
    />
  );
}

export default function ResetPasswordPage(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { zero: 3, tablet: 5 },
          maxWidth: 480,
          width: '100%',
          borderRadius: 3,
        }}
      >
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </Paper>
    </Box>
  );
}
