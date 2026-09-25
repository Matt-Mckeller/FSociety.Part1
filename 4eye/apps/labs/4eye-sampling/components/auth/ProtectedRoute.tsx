'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '@expanse/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'MEMBER' | 'ADMIN';
}

export function ProtectedRoute({ children, requiredRole = 'MEMBER' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && requiredRole === 'ADMIN' && user?.role !== 'ADMIN') {
      router.push('/'); // Redirect non-admins
    }
  }, [isLoading, isAuthenticated, requiredRole, user, router]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole === 'ADMIN' && user?.role !== 'ADMIN') {
    return null;
  }

  return <>{children}</>;
}
