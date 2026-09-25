import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

const ComparisonPanel = ({ webSpeechLogs, transformersLogs, onClearLogs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  const getLogTypeColor = (type) => {
    switch(type) {
      case 'transcript': return 'success';
      case 'error': return 'error';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const renderLogTable = (logs, title) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title} ({logs.length} entries)
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="120">Time</TableCell>
              <TableCell width="100">Type</TableCell>
              <TableCell>Message</TableCell>
              <TableCell width="100">Confidence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No logs yet. Start listening to see events...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={log.type} 
                      color={getLogTypeColor(log.type)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{log.message}</TableCell>
                  <TableCell>
                    {log.confidence ? (log.confidence * 100).toFixed(1) + '%' : '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderComparison = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Technology Comparison
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Feature</strong></TableCell>
              <TableCell><strong>Web Speech Recognition</strong></TableCell>
              <TableCell><strong>Transformers.js</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Real-time</TableCell>
              <TableCell>✅ Yes - streaming results</TableCell>
              <TableCell>❌ No - processes after recording</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Offline Support</TableCell>
              <TableCell>❌ No - requires internet</TableCell>
              <TableCell>✅ Yes - runs locally after model loads</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Browser Support</TableCell>
              <TableCell>⚠️ Limited - Chrome, Edge, Safari</TableCell>
              <TableCell>✅ Wide - any modern browser</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Setup Time</TableCell>
              <TableCell>✅ Instant</TableCell>
              <TableCell>⚠️ ~30-60s model download</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Accuracy</TableCell>
              <TableCell>⚠️ Good - varies by browser/accent</TableCell>
              <TableCell>✅ Excellent - Whisper model</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Resource Usage</TableCell>
              <TableCell>✅ Low - server-side processing</TableCell>
              <TableCell>⚠️ Higher - client-side ML</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Privacy</TableCell>
              <TableCell>⚠️ Audio sent to cloud</TableCell>
              <TableCell>✅ Fully local processing</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Confidence Scores</TableCell>
              <TableCell>✅ Yes</TableCell>
              <TableCell>❌ Not in basic usage</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Languages</TableCell>
              <TableCell>✅ Many languages</TableCell>
              <TableCell>⚠️ Model-dependent (English only for tiny)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cost</TableCell>
              <TableCell>✅ Free</TableCell>
              <TableCell>✅ Free</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Key Differences Summary
      </Typography>
      
      <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
        <Typography variant="subtitle2" gutterBottom>
          <strong>Web Speech Recognition - Best For:</strong>
        </Typography>
        <Typography variant="body2">
          • Real-time transcription needs<br/>
          • Quick setup and instant availability<br/>
          • When internet connection is reliable<br/>
          • Voice commands and live dictation
        </Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
        <Typography variant="subtitle2" gutterBottom>
          <strong>Transformers.js - Best For:</strong>
        </Typography>
        <Typography variant="body2">
          • Offline/privacy-sensitive applications<br/>
          • Higher accuracy requirements<br/>
          • Pre-recorded audio processing<br/>
          • When browser support for Web Speech API is lacking
        </Typography>
      </Paper>
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          Logs & Comparison
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onClearLogs}
          disabled={webSpeechLogs.length === 0 && transformersLogs.length === 0}
        >
          Clear All Logs
        </Button>
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label={`Web Speech (${webSpeechLogs.length})`} />
        <Tab label={`Transformers.js (${transformersLogs.length})`} />
        <Tab label="Comparison" />
      </Tabs>

      {activeTab === 0 && renderLogTable(webSpeechLogs, 'Web Speech Recognition Logs')}
      {activeTab === 1 && renderLogTable(transformersLogs, 'Transformers.js Logs')}
      {activeTab === 2 && renderComparison()}
    </Paper>
  );
};

export default ComparisonPanel;
