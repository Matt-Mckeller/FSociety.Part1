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

const WebSpeechRecognition = ({ onLog }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      onLog({ 
        type: 'error', 
        message: 'Web Speech Recognition API not supported in this browser' 
      });
      return;
    }

    // Initialize recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      onLog({ type: 'info', message: 'Web Speech Recognition started' });
      setError(null);
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + ' ';
          onLog({ 
            type: 'transcript', 
            message: transcript,
            confidence: event.results[i][0].confidence 
          });
        } else {
          interim += transcript;
        }
      }

      if (final) {
        setTranscript(prev => prev + final);
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      const errorMsg = `Error: ${event.error}`;
      setError(errorMsg);
      onLog({ type: 'error', message: errorMsg });
      setIsListening(false);
    };

    recognition.onend = () => {
      onLog({ type: 'info', message: 'Web Speech Recognition ended' });
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onLog]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript('');
        setInterimTranscript('');
      } catch (err) {
        setError(err.message);
        onLog({ type: 'error', message: err.message });
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        Web Speech Recognition API
        <Chip 
          label={isSupported ? 'Supported' : 'Not Supported'} 
          color={isSupported ? 'success' : 'error'} 
          size="small" 
        />
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        Browser-native speech recognition API. Works online and provides real-time results.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MicIcon />}
          onClick={startListening}
          disabled={!isSupported || isListening}
          fullWidth
        >
          Start Listening
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<StopIcon />}
          onClick={stopListening}
          disabled={!isListening}
          fullWidth
        >
          Stop
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isListening && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Listening... Speak into your microphone
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 2, minHeight: 200, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle2" gutterBottom>
          Transcript:
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {transcript}
          {interimTranscript && (
            <span style={{ color: '#999' }}>{interimTranscript}</span>
          )}
        </Typography>
        {!transcript && !interimTranscript && (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No transcript yet. Start listening to begin...
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default WebSpeechRecognition;
