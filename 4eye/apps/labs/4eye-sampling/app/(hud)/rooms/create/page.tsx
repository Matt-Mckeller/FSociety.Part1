'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Paper, Alert } from '@mui/material';
import { ProtectedRoute } from '@/components/auth';
import { Navbar } from '@/components/layout';
import { useRooms, useCreateRoomForm } from '@4eye/core';
import { CreateRoomForm } from '@/components/rooms';

function CreateRoomContent() {
  const router = useRouter();
  const { error: contextError } = useRooms();
  const { formData, updateField, validationErrors, isSubmitting, submit, cancel } =
    useCreateRoomForm();

  const handleSubmit = async () => {
    const room = await submit();
    if (room) {
      router.push(`/rooms/${room.id}`);
    }
  };

  const handleCancel = () => {
    cancel();
    router.push('/rooms');
  };

  const error = contextError;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="tablet" sx={{ pt: 12, pb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: 600
        }}>
          Create Room
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            mb: 3
          }}>
          Set up a new room for hosting learning sessions.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <CreateRoomForm
            formData={formData}
            validationErrors={validationErrors}
            isSubmitting={isSubmitting}
            onFieldChange={updateField}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default function CreateRoomPage() {
  return (
    <ProtectedRoute>
      <CreateRoomContent />
    </ProtectedRoute>
  );
}
