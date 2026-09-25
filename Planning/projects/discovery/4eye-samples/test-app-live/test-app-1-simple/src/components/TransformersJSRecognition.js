import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import { pipeline } from '@xenova/transformers';

const TransformersJSRecognition = ({ onLog }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const recognizerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize the model
    const initModel = async () => {
      try {
        setIsModelLoading(true);
        onLog({ type: 'info', message: 'Loading Transformers.js model...' });
        
        // Use Whisper tiny model for faster loading
        recognizerRef.current = await pipeline(
          'automatic-speech-recognition',
          'Xenova/whisper-tiny.en',
          {
            progress_callback: (progress) => {
              if (progress.status === 'progress') {
                const percent = Math.round((progress.loaded / progress.total) * 100);
                setLoadingProgress(percent);
                onLog({ 
                  type: 'info', 
                  message: `Loading model: ${percent}%` 
                });
              }
            }
          }
        );
        
        setIsModelReady(true);
        setIsModelLoading(false);
        onLog({ type: 'info', message: 'Transformers.js model loaded successfully' });
      } catch (err) {
        setError(`Failed to load model: ${err.message}`);
        setIsModelLoading(false);
        onLog({ type: 'error', message: `Model loading error: ${err.message}` });
      }
    };

    initModel();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [onLog]);

  const startListening = async () => {
    if (!isModelReady) {
      setError('Model is not ready yet');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create audio context for processing
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      // Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        onLog({ type: 'info', message: 'Processing audio with Transformers.js...' });
        
        try {
          // Create audio blob
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          // Convert to array buffer
          const arrayBuffer = await audioBlob.arrayBuffer();
          
          // Decode audio data
          const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
          
          // Get audio data (mono channel)
          const audioData = audioBuffer.getChannelData(0);
          
          // Transcribe
          const result = await recognizerRef.current(audioData, {
            chunk_length_s: 30,
            stride_length_s: 5,
          });
          
          setTranscript(prev => prev + result.text + ' ');
          onLog({ 
            type: 'transcript', 
            message: result.text 
          });
        } catch (err) {
          setError(`Transcription error: ${err.message}`);
          onLog({ type: 'error', message: `Transcription error: ${err.message}` });
        }
        
        // Clean up
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsListening(true);
      setError(null);
      onLog({ type: 'info', message: 'Transformers.js recording started' });
    } catch (err) {
      setError(`Microphone access error: ${err.message}`);
      onLog({ type: 'error', message: `Microphone error: ${err.message}` });
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      onLog({ type: 'info', message: 'Transformers.js recording stopped' });
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        Transformers.js (Whisper)
        <Chip 
          label={isModelReady ? 'Ready' : isModelLoading ? 'Loading' : 'Not Ready'} 
          color={isModelReady ? 'success' : 'warning'} 
          size="small" 
        />
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        Client-side ML model using Whisper. Works offline after model loads. Processes audio in chunks.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {isModelLoading && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Loading model... {loadingProgress}%
          </Typography>
          <LinearProgress variant="determinate" value={loadingProgress} />
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MicIcon />}
          onClick={startListening}
          disabled={!isModelReady || isListening}
          fullWidth
        >
          Start Recording
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<StopIcon />}
          onClick={stopListening}
          disabled={!isListening}
          fullWidth
        >
          Stop & Transcribe
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isListening && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Recording... Click "Stop & Transcribe" when done
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 2, minHeight: 200, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle2" gutterBottom>
          Transcript:
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {transcript}
        </Typography>
        {!transcript && (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No transcript yet. Start recording to begin...
          </Typography>
        )}
      </Paper>

      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="caption">
          Note: Transformers.js processes audio after you stop recording, not in real-time.
        </Typography>
      </Alert>
    </Box>
  );
};

export default TransformersJSRecognition;
