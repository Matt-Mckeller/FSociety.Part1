'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Stack,
  Chip,
} from '@mui/material';
import {
  Stop,
  Pause,
  PlayArrow,
  Mic,
  MicOff,
  Settings,
  ArrowBack,
  Translate,
} from '@mui/icons-material';
import { ProtectedRoute } from '@/components/auth';
import { Navbar } from '@/components/layout';
import { useAuth } from '@expanse/auth';
import { useRoom } from '@4eye/core';
import { AudioCapture } from '@/components/sessions/AudioCapture';
import { TranscriptDisplay } from '@/components/sessions/TranscriptDisplay';
import { SessionControls } from '@/components/sessions/SessionControls';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ height: '100%' }}
    >
      {value === index && children}
    </Box>
  );
}

type SessionState = 'idle' | 'recording' | 'paused' | 'ended';

function LiveSessionContent() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.id as string;
  const { user } = useAuth();

  const { room, isLoading, error: loadError } = useRoom(roomId);
  const isOwner = room?.createdById === user?.id;

  // Session state
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [transcriptId, setTranscriptId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // UI state
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Transcript state
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);

  const handleStartSession = async () => {
    try {
      setError(null);
      // TODO: Create session via GraphQL mutation
      // For now, simulate session start
      setSessionState('recording');
      setIsRecording(true);
      console.log('Starting session for room:', roomId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start session');
    }
  };

  const handlePauseSession = () => {
    setSessionState('paused');
    setIsRecording(false);
  };

  const handleResumeSession = () => {
    setSessionState('recording');
    setIsRecording(true);
  };

  const handleEndSession = async () => {
    try {
      setError(null);
      setSessionState('ended');
      setIsRecording(false);
      // TODO: End session via GraphQL mutation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end session');
    }
  };

  const handleAudioData = async (audioBlob: Blob) => {
    // TODO: Send audio to backend for transcription
    console.log('Received audio blob:', audioBlob.size, 'bytes');
  };

  const handleTranscriptUpdate = (segment: TranscriptSegment) => {
    setSegments((prev) => [...prev, segment]);
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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      {/* Header with session controls */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          position: 'sticky',
          top: 64,
          zIndex: 100,
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="laptopL" sx={{ py: 2 }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <Stack direction="row" spacing={2} sx={{
              alignItems: "center"
            }}>
              <IconButton onClick={() => router.push(`/rooms/${roomId}`)} size="small">
                <ArrowBack />
              </IconButton>
              <Box>
                <Typography variant="h6" sx={{
                  fontWeight: 600
                }}>
                  {room.name}
                </Typography>
                <Stack direction="row" spacing={1} sx={{
                  alignItems: "center"
                }}>
                  <Chip
                    size="small"
                    label={sessionState === 'idle' ? 'Ready' : sessionState === 'recording' ? 'Recording' : sessionState === 'paused' ? 'Paused' : 'Ended'}
                    color={sessionState === 'recording' ? 'error' : sessionState === 'paused' ? 'warning' : 'default'}
                    sx={{ textTransform: 'capitalize' }}
                  />
                  {isRecording && (
                    <Typography variant="caption" sx={{
                      color: "text.secondary"
                    }}>
                      {segments.length} segments
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Stack>

            <SessionControls
              sessionState={sessionState}
              isRecording={isRecording}
              isMuted={isMuted}
              onStart={handleStartSession}
              onPause={handlePauseSession}
              onResume={handleResumeSession}
              onEnd={handleEndSession}
              onToggleMute={() => setIsMuted(!isMuted)}
            />
          </Stack>
        </Container>
      </Paper>
      {/* Error display */}
      {error && (
        <Container maxWidth="laptopL" sx={{ pt: 2 }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Container>
      )}
      {/* Main content area */}
      <Container maxWidth="laptopL" sx={{ flex: 1, py: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, height: 'calc(100vh - 220px)' }}>
          {/* Left panel: Transcript */}
          <Paper 
            sx={{ 
              flex: 2, 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
                <Tab label="Transcript" />
                <Tab 
                  label="Translations" 
                  icon={<Translate fontSize="small" />} 
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <TranscriptDisplay 
                segments={segments} 
                isLive={sessionState === 'recording'}
              />
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography
                sx={{
                  color: "text.secondary",
                  p: 2
                }}>
                Translation view coming soon...
              </Typography>
            </TabPanel>
          </Paper>

          {/* Right panel: Audio meter & settings */}
          <Paper sx={{ flex: 1, p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Audio Input
            </Typography>
            
            <AudioCapture
              isActive={isRecording && !isMuted}
              onAudioData={handleAudioData}
            />

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" gutterBottom>
                Session Settings
              </Typography>
              <Typography variant="body2" sx={{
                color: "text.secondary"
              }}>
                Language: Auto-detect
              </Typography>
              <Typography variant="body2" sx={{
                color: "text.secondary"
              }}>
                Provider: OpenAI Whisper
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

// Export the transcript segment type for use in child components
export interface TranscriptSegment {
  id: string;
  sequenceIndex: number;
  startTimeMs: number;
  endTimeMs: number;
  text: string;
  speakerLabel?: string;
  confidence?: number;
  isFinal: boolean;
}

export default function LiveSessionPage() {
  return (
    <ProtectedRoute>
      <LiveSessionContent />
    </ProtectedRoute>
  );
}
