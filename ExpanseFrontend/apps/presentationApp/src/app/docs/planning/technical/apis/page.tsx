import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Divider, Stack, Card, CardContent } from '@mui/material';

const apiEndpoints = [
  // Content APIs
  { method: 'GET', path: '/api/content/:blockId', description: 'Get content block with optional variant/locale params', status: 'planned' },
  { method: 'POST', path: '/api/content', description: 'Create new content block', status: 'planned' },
  { method: 'PUT', path: '/api/content/:blockId', description: 'Update content block', status: 'planned' },
  { method: 'POST', path: '/api/content/:blockId/variant', description: 'Create content variant (audience/accessibility/locale)', status: 'planned' },
  { method: 'GET', path: '/api/content/:blockId/versions', description: 'Get version history for content block', status: 'planned' },
  
  // Presentation APIs
  { method: 'GET', path: '/api/presentations', description: 'List all presentations', status: 'planned' },
  { method: 'GET', path: '/api/presentations/:id', description: 'Get presentation with slides', status: 'planned' },
  { method: 'GET', path: '/api/slides/:id', description: 'Get slide with all blocks', status: 'planned' },
  
  // AI Action APIs
  { method: 'POST', path: '/api/ai/transform', description: 'Transform content using AI (simplify, expand, etc.)', status: 'planned' },
  { method: 'POST', path: '/api/ai/generate', description: 'Generate content (examples, quiz, summary)', status: 'planned' },
  { method: 'POST', path: '/api/ai/chat', description: 'Contextual chat with AI assistant', status: 'planned' },
  
  // User APIs
  { method: 'GET', path: '/api/users/me', description: 'Get current user profile and progress', status: 'existing' },
  { method: 'PUT', path: '/api/users/me/preferences', description: 'Update user preferences', status: 'existing' },
  { method: 'GET', path: '/api/users/me/inventory', description: 'Get user inventory', status: 'existing' },
  
  // Quest APIs
  { method: 'GET', path: '/api/quests', description: 'List available quests', status: 'existing' },
  { method: 'POST', path: '/api/quests/:id/progress', description: 'Update quest progress', status: 'existing' },
  
  // Analytics APIs
  { method: 'POST', path: '/api/analytics/events', description: 'Track user events', status: 'planned' },
  { method: 'GET', path: '/api/analytics/session/:id', description: 'Get session analytics', status: 'planned' },
  
  // Feedback APIs
  { method: 'POST', path: '/api/feedback', description: 'Submit content feedback', status: 'planned' },
  { method: 'GET', path: '/api/feedback/aggregate/:slideId', description: 'Get aggregated feedback for slide', status: 'planned' },
];

const websocketEvents = [
  { event: 'presentation:join', direction: 'Client → Server', description: 'Join a presentation session' },
  { event: 'presentation:leave', direction: 'Client → Server', description: 'Leave a presentation session' },
  { event: 'slide:changed', direction: 'Server → Client', description: 'Presenter changed current slide' },
  { event: 'feedback:submitted', direction: 'Client → Server', description: 'User submitted quick feedback' },
  { event: 'feedback:aggregated', direction: 'Server → Client', description: 'Aggregated feedback for presenter' },
  { event: 'user:joined', direction: 'Server → Client', description: 'New user joined session' },
  { event: 'user:left', direction: 'Server → Client', description: 'User left session' },
];

const methodColors: Record<string, string> = {
  GET: '#22c55e',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  DELETE: '#ef4444',
};

export default function APIsPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          APIs
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Backend API endpoints and WebSocket events for the PresentationApp.
        </Typography>
      </Box>

      {/* REST API */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        REST API Endpoints
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600, width: 80 }}>Method</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Path</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 90 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiEndpoints.map((endpoint, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Chip 
                    label={endpoint.method} 
                    size="small" 
                    sx={{ 
                      bgcolor: `${methodColors[endpoint.method]}15`,
                      color: methodColors[endpoint.method],
                      fontWeight: 600,
                      fontFamily: 'monospace',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                  {endpoint.path}
                </TableCell>
                <TableCell sx={{ fontSize: '0.875rem' }}>{endpoint.description}</TableCell>
                <TableCell>
                  <Chip 
                    label={endpoint.status} 
                    size="small"
                    sx={{ 
                      fontSize: '0.7rem',
                      bgcolor: endpoint.status === 'existing' ? '#dcfce7' : '#fef3c7',
                      color: endpoint.status === 'existing' ? '#166534' : '#92400e',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* WebSocket Events */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        WebSocket Events
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Real-time events for presenter mode and live collaboration.
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Event</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 150 }}>Direction</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {websocketEvents.map((event) => (
              <TableRow key={event.event}>
                <TableCell>
                  <code style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>
                    {event.event}
                  </code>
                </TableCell>
                <TableCell sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                  {event.direction}
                </TableCell>
                <TableCell>{event.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
