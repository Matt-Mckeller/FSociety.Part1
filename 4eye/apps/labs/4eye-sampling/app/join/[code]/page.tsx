'use client';

import { useRouter, useParams } from 'next/navigation';
import { Box, Container, CircularProgress } from '@mui/material';
import { Navbar, Footer } from '@/components/layout';
import { useRoomByInviteCode } from '@4eye/core';
import { useAuth } from '@expanse/auth';
import { JoinRoomCard, RoomNotFound } from '@/components/rooms';

export default function JoinRoomPage() {
  const router = useRouter();
  const params = useParams();
  const inviteCode = params.code as string;
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const { room, isLoading, error } = useRoomByInviteCode(inviteCode);

  if (isLoading || authLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !room) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Container maxWidth="tablet" sx={{ pt: 12 }}>
          <RoomNotFound onGoHome={() => router.push('/')} />
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="tablet" sx={{ pt: 12, pb: 4 }}>
        <JoinRoomCard
          roomName={room.name}
          description={room.description ?? undefined}
          isActive={room.isActive}
          isAuthenticated={isAuthenticated}
          onJoin={() => router.push(`/rooms/${room.id}/live`)}
          onSignIn={() => router.push(`/login?redirect=/join/${inviteCode}`)}
          onSignUp={() => router.push(`/signup?redirect=/join/${inviteCode}`)}
        />
      </Container>
      <Footer />
    </Box>
  );
}
