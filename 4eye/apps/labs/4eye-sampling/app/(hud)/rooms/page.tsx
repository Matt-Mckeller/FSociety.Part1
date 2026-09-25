'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Fab, CircularProgress, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';
import { ProtectedRoute } from '@/components/auth';
import { Navbar } from '@/components/layout';
import { useRooms } from '@4eye/core';
import { RoomList } from '@/components/rooms';

function RoomsContent() {
  const router = useRouter();
  const { rooms, isLoading, error } = useRooms();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="laptop" sx={{ pt: 12, pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{
            fontWeight: 600
          }}>
            My Rooms
          </Typography>
        </Box>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load rooms: {error}
          </Alert>
        )}

        {!isLoading && !error && (
          <RoomList rooms={rooms} onRoomClick={(room) => router.push(`/rooms/${room.id}`)} />
        )}

        <Fab
          color="primary"
          aria-label="create room"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={() => router.push('/rooms/create')}
        >
          <Add />
        </Fab>
      </Container>
    </Box>
  );
}

export default function RoomsPage() {
  return (
    <ProtectedRoute>
      <RoomsContent />
    </ProtectedRoute>
  );
}
