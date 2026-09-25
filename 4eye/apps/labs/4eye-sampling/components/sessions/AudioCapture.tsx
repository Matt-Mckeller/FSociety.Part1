'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, Alert, LinearProgress, Stack } from '@mui/material';
import { Mic, MicOff, VolumeUp } from '@mui/icons-material';

interface AudioCaptureProps {
  isActive: boolean;
  onAudioData: (audioBlob: Blob) => void;
  /** Interval in ms to chunk audio (default: 5000ms) */
  chunkIntervalMs?: number;
  /** MIME type for recording (default: webm) */
  mimeType?: string;
}

interface AudioState {
  isInitialized: boolean;
  hasPermission: boolean;
  error: string | null;
  audioLevel: number;
}

/**
 * Audio Capture Component
 * 
 * Captures audio from the user's microphone using the MediaRecorder API.
 * Provides visual feedback with an audio level meter and handles permissions.
 */
export function AudioCapture({
  isActive,
  onAudioData,
  chunkIntervalMs = 5000,
  mimeType = 'audio/webm;codecs=opus',
}: AudioCaptureProps) {
  const [audioState, setAudioState] = useState<AudioState>({
    isInitialized: false,
    hasPermission: false,
    error: null,
    audioLevel: 0,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Initialize audio context and request permissions
  const initializeAudio = useCallback(async () => {
    try {
      // Check if we have a supported MIME type
      let actualMimeType = mimeType;
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        // Fallback MIME types
        const fallbacks = ['audio/webm', 'audio/mp4', 'audio/ogg'];
        actualMimeType = fallbacks.find(t => MediaRecorder.isTypeSupported(t)) || '';
        if (!actualMimeType) {
          throw new Error('No supported audio format found');
        }
      }

      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        },
      });
      streamRef.current = stream;

      // Create audio context for level monitoring
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Create MediaRecorder
      const recorder = new MediaRecorder(stream, {
        mimeType: actualMimeType,
      });
      mediaRecorderRef.current = recorder;

      // Handle data available
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      recorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: actualMimeType });
          onAudioData(blob);
          chunksRef.current = [];
        }
      };

      setAudioState({
        isInitialized: true,
        hasPermission: true,
        error: null,
        audioLevel: 0,
      });

    } catch (err) {
      const isPermissionDenied = 
        err instanceof DOMException && 
        (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError');

      setAudioState(prev => ({
        ...prev,
        isInitialized: true,
        hasPermission: false,
        error: isPermissionDenied 
          ? 'Microphone access was denied. Please allow microphone access to record.'
          : `Failed to initialize audio: ${err instanceof Error ? err.message : 'Unknown error'}`,
      }));
    }
  }, [mimeType, onAudioData]);

  // Monitor audio levels
  const updateAudioLevel = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average volume
    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const normalized = Math.min(average / 128, 1);

    setAudioState(prev => ({ ...prev, audioLevel: normalized }));

    if (isActive) {
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    }
  }, [isActive]);

  // Initialize on mount
  useEffect(() => {
    initializeAudio();

    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [initializeAudio]);

  // Start/stop recording based on isActive
  useEffect(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || !audioState.hasPermission) return;

    if (isActive && recorder.state === 'inactive') {
      // Start recording with chunking
      recorder.start(chunkIntervalMs);
      updateAudioLevel();
    } else if (!isActive && recorder.state === 'recording') {
      recorder.stop();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, [isActive, audioState.hasPermission, chunkIntervalMs, updateAudioLevel]);

  // Update audio level when active
  useEffect(() => {
    if (isActive && audioState.hasPermission) {
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, audioState.hasPermission, updateAudioLevel]);

  if (audioState.error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {audioState.error}
      </Alert>
    );
  }

  if (!audioState.isInitialized) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{
          color: "text.secondary"
        }}>
          Initializing audio...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {/* Microphone status */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          mb: 2
        }}>
        {isActive ? (
          <Mic color="primary" fontSize="small" />
        ) : (
          <MicOff color="disabled" fontSize="small" />
        )}
        <Typography variant="body2" color={isActive ? 'primary' : 'text.secondary'}>
          {isActive ? 'Listening...' : 'Microphone inactive'}
        </Typography>
      </Stack>
      {/* Audio level meter */}
      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            mb: 0.5
          }}>
          <VolumeUp fontSize="small" color="action" />
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            Audio Level
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={audioState.audioLevel * 100}
          sx={{
            height: 8,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: audioState.audioLevel > 0.7 ? 'error.main' : 
                       audioState.audioLevel > 0.4 ? 'warning.main' : 'success.main',
              transition: 'transform 0.1s linear',
            },
          }}
        />
      </Box>
      {/* Level indicator bars */}
      <Stack direction="row" spacing={0.5} sx={{ height: 40, alignItems: 'flex-end' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: `${Math.max(10, (i < audioState.audioLevel * 16 ? (0.5 + Math.random() * 0.5) : 0.1) * 100)}%`,
              bgcolor: i < audioState.audioLevel * 16 
                ? (i > 10 ? 'error.main' : i > 6 ? 'warning.main' : 'success.main')
                : 'grey.300',
              borderRadius: 0.5,
              transition: 'height 0.05s ease-out, background-color 0.1s',
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
