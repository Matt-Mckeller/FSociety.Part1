'use client';

import { useRouter, useParams } from 'next/navigation';
import { Box, Container, Typography, Paper, Button, CircularProgress, Alert } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { ProtectedRoute } from '@/components/auth';
import { Navbar } from '@/components/layout';
import { useAuth } from '@expanse/auth';
import { useRoom, useUpdateRoomForm } from '@4eye/core';
import { RoomSettingsForm, InviteCodeCard, DangerZone } from '@/components/rooms';

function RoomDetailContent() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.id as string;
  const { user } = useAuth();

  const { room, isLoading, error: loadError } = useRoom(roomId);
  const isOwner = room?.createdById === user?.id;

  const {
    formData,
    updateField,
    validationErrors,
    isSubmitting,
    isDirty,
    error: formError,
    success,
    submit,
    handleRegenerateCode,
    handleDelete,
    clearMessages,
  } = useUpdateRoomForm(room ?? undefined);

  const handleSubmit = async () => {
    await submit();
  };

  const handleDeleteRoom = async () => {
    const deleted = await handleDelete();
    if (deleted) {
      router.push('/rooms');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!room) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Container maxWidth="tablet" sx={{ pt: 12 }}>
          <Alert severity="error">{loadError || 'Room not found'}</Alert>
        </Container>
      </Box>
    );
  }

  const error = loadError || formError;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="laptop" sx={{ pt: 12, pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{
            fontWeight: 600
          }}>
            {room.name}
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={() => router.push(`/rooms/${roomId}/live`)}
            disabled={!room.isActive}
          >
            Start Session
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={clearMessages}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={clearMessages}>
            {success}
          </Alert>
        )}

        {/* Invite Code Section */}
        <Box sx={{ mb: 3 }}>
          <InviteCodeCard
            inviteCode={room.inviteCode}
            isSubmitting={isSubmitting}
            showRegenerateButton={isOwner ?? false}
            onRegenerateCode={handleRegenerateCode}
          />
        </Box>

        {/* Settings Section */}
        {isOwner && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Room Settings
            </Typography>
            <RoomSettingsForm
              formData={formData}
              validationErrors={validationErrors}
              isSubmitting={isSubmitting}
              isDirty={isDirty}
              onFieldChange={updateField}
              onSubmit={handleSubmit}
            />
          </Paper>
        )}

        {/* Danger Zone */}
        {isOwner && (
          <DangerZone roomName={room.name} isSubmitting={isSubmitting} onDelete={handleDeleteRoom} />
        )}
      </Container>
    </Box>
  );
}

export default function RoomDetailPage() {
  return (
    <ProtectedRoute>
      <RoomDetailContent />
    </ProtectedRoute>
  );
}
