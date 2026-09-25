'use client';

import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import {
  Stop,
  Pause,
  PlayArrow,
  Mic,
  MicOff,
  FiberManualRecord,
} from '@mui/icons-material';

type SessionState = 'idle' | 'recording' | 'paused' | 'ended';

interface SessionControlsProps {
  sessionState: SessionState;
  isRecording: boolean;
  isMuted: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
  onToggleMute: () => void;
}

export function SessionControls({
  sessionState,
  isRecording,
  isMuted,
  onStart,
  onPause,
  onResume,
  onEnd,
  onToggleMute,
}: SessionControlsProps) {
  if (sessionState === 'idle') {
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<FiberManualRecord sx={{ color: 'error.main' }} />}
        onClick={onStart}
      >
        Start Recording
      </Button>
    );
  }

  if (sessionState === 'ended') {
    return (
      <Button
        variant="outlined"
        onClick={onStart}
      >
        Start New Session
      </Button>
    );
  }

  return (
    <Stack direction="row" spacing={1} sx={{
      alignItems: "center"
    }}>
      <Tooltip title={isMuted ? 'Unmute microphone' : 'Mute microphone'}>
        <IconButton
          onClick={onToggleMute}
          color={isMuted ? 'error' : 'default'}
          sx={{ 
            bgcolor: isMuted ? 'error.light' : 'action.hover',
            '&:hover': {
              bgcolor: isMuted ? 'error.main' : 'action.selected',
            },
          }}
        >
          {isMuted ? <MicOff /> : <Mic />}
        </IconButton>
      </Tooltip>
      {sessionState === 'recording' ? (
        <Button
          variant="outlined"
          startIcon={<Pause />}
          onClick={onPause}
        >
          Pause
        </Button>
      ) : (
        <Button
          variant="outlined"
          startIcon={<PlayArrow />}
          onClick={onResume}
        >
          Resume
        </Button>
      )}
      <Button
        variant="contained"
        color="error"
        startIcon={<Stop />}
        onClick={onEnd}
      >
        End Session
      </Button>
    </Stack>
  );
}
