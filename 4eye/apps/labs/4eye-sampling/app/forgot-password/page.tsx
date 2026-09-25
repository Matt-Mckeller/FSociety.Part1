'use client';

import { useRouter } from 'next/navigation';
import { Box, Paper } from '@mui/material';
import { ForgotPasswordForm } from '@expanse/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSuccess = () => {
    // Form shows success message internally, no navigation needed
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  const handleClose = () => {
    router.push('/');
  };

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
        <ForgotPasswordForm
          onSuccess={handleSuccess}
          onBackToLogin={handleBackToLogin}
          onClose={handleClose}
        />
      </Paper>
    </Box>
  );
}
