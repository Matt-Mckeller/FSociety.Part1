import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import WebSpeechRecognition from './components/WebSpeechRecognition';
import TransformersJSRecognition from './components/TransformersJSRecognition';
import ComparisonPanel from './components/ComparisonPanel';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [webSpeechLogs, setWebSpeechLogs] = useState([]);
  const [transformersLogs, setTransformersLogs] = useState([]);

  const addWebSpeechLog = (log) => {
    setWebSpeechLogs(prev => [...prev, { timestamp: new Date(), ...log }]);
  };

  const addTransformersLog = (log) => {
    setTransformersLogs(prev => [...prev, { timestamp: new Date(), ...log }]);
  };

  const clearLogs = () => {
    setWebSpeechLogs([]);
    setTransformersLogs([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Audio Transcription Test
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary">
            Compare Web Speech Recognition API vs Transformers.js
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <WebSpeechRecognition onLog={addWebSpeechLog} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <TransformersJSRecognition onLog={addTransformersLog} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <ComparisonPanel
              webSpeechLogs={webSpeechLogs}
              transformersLogs={transformersLogs}
              onClearLogs={clearLogs}
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
