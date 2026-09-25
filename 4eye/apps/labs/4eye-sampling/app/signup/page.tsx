'use client';

import { useRouter } from 'next/navigation';
import { Box, Paper, CircularProgress } from '@mui/material';
import { SignupForm, useAuth } from '@expanse/auth';

export default function SignupPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

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
        <SignupForm
          onSuccess={() => router.push('/dashboard')}
          onLogin={() => router.push('/login')}
          onClose={() => router.push('/')}
          redirectTo="/dashboard"
        />
      </Paper>
    </Box>
  );
}
