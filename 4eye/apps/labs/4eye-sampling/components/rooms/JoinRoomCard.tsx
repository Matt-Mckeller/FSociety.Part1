'use client';

import { Box, Typography, Paper, Button, Alert } from '@mui/material';
import { MeetingRoom } from '@mui/icons-material';

interface JoinRoomCardProps {
  roomName: string;
  description?: string;
  isActive: boolean;
  isAuthenticated: boolean;
  onJoin: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

export function JoinRoomCard({
  roomName,
  description,
  isActive,
  isAuthenticated,
  onJoin,
  onSignIn,
  onSignUp,
}: JoinRoomCardProps) {
  if (!isActive) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <MeetingRoom sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Room is Inactive
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            mb: 3
          }}>
          This room is currently not accepting new participants.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <MeetingRoom sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        {roomName}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: "text.secondary",
            mb: 3
          }}>
          {description}
        </Typography>
      )}
      {isAuthenticated ? (
        <Button variant="contained" size="large" fullWidth onClick={onJoin} sx={{ py: 1.5 }}>
          Join Session
        </Button>
      ) : (
        <>
          <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
            Sign in or create an account to join this room.
          </Alert>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" size="large" onClick={onSignIn}>
              Sign In
            </Button>
            <Button variant="outlined" size="large" onClick={onSignUp}>
              Create Account
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}

export function RoomNotFound({ onGoHome }: { onGoHome: () => void }) {
  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <MeetingRoom sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Room Not Found
      </Typography>
      <Typography
        sx={{
          color: "text.secondary",
          mb: 3
        }}>
        This invite link is invalid or has expired.
      </Typography>
      <Button variant="contained" onClick={onGoHome}>
        Go Home
      </Button>
    </Paper>
  );
}
