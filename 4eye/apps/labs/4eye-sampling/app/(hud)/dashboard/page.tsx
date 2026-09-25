'use client';

import { Box, Typography, Button, Paper, Avatar, Divider } from '@mui/material';
import { Person, ExitToApp, Business, Group } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@expanse/auth';
import { ProtectedRoute } from '@/components/auth';

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<ExitToApp />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            src={user?.avatarUrl}
            sx={{ width: 64, height: 64 }}
          >
            {user?.name?.charAt(0) || <Person />}
          </Avatar>
          <Box>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              {user?.email}
            </Typography>
            <Typography variant="caption" color="primary">
              {user?.role}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </Typography>
          {user?.emailVerifiedAt && (
            <Typography variant="body2" sx={{
              color: "success.main"
            }}>
              Email verified
            </Typography>
          )}
        </Box>
      </Paper>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3 }}>
        <Paper
          sx={{
            p: 3,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
          onClick={() => router.push('/organizations')}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Business color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Organizations</Typography>
              <Typography variant="body2" sx={{
                color: "text.secondary"
              }}>
                Manage your organizations and teams
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper
          sx={{
            p: 3,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
          onClick={() => router.push('/rooms')}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Group color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Rooms</Typography>
              <Typography variant="body2" sx={{
                color: "text.secondary"
              }}>
                Join or create learning sessions
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
