import { Typography, Paper, Box, Chip, Stack, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import SyncIcon from '@mui/icons-material/Sync';
import MouseIcon from '@mui/icons-material/Mouse';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import WifiIcon from '@mui/icons-material/Wifi';
import Link from 'next/link';

const collaborationFeatures = [
  { 
    icon: <SyncIcon />, 
    title: 'Presenter Mode Sync', 
    description: "Presenter's current slide is broadcast to all connected audience members via WebSocket; audience views update automatically",
    color: '#3b82f6'
  },
  { 
    icon: <ScreenShareIcon />, 
    title: 'Screen Sharing', 
    description: 'Presenter can share their current view with the audience in real time',
    color: '#10b981'
  },
  { 
    icon: <MouseIcon />, 
    title: 'Live Cursor Sharing', 
    description: 'Enableable/disableable live cursor positions visible to other participants, showing where the presenter is focused',
    color: '#8b5cf6'
  },
  { 
    icon: <ThumbsUpDownIcon />, 
    title: 'Audience Reactions', 
    description: 'Real-time feedback aggregation displayed to presenter (e.g., "73% say I Get It")',
    color: '#f59e0b'
  },
];

const techStack = [
  { tech: 'WebSockets', description: 'Low-latency bidirectional communication', provider: 'NestJS Gateway' },
  { tech: 'Socket.io', description: 'Real-time event handling with fallbacks', provider: 'Socket.io Adapter' },
  { tech: 'Pub/Sub', description: 'Scalable message broadcasting', provider: 'Redis (optional)' },
];

export default function CollaborationPage() {
  return (
    <>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ 
          p: 1.5, 
          borderRadius: 2, 
          bgcolor: '#10b98115',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <GroupsIcon sx={{ fontSize: 32, color: '#10b981' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ mb: 0.5 }}>Collaboration & Screen Sharing</Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time presenter-audience interaction powered by WebSockets
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture */}
      <Paper variant="outlined" sx={{ 
        p: 2.5, 
        mb: 4, 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderLeft: '4px solid #10b981',
        borderRadius: 2
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          📦 Module & Architecture
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip label="Presenter Mode" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#10b98120', fontWeight: 500 }} />
          <Chip label="WebSocket System" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#3b82f620', fontWeight: 500 }} />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          <strong>React Context:</strong>
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="CollaborationContext" size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderColor: '#10b981', color: '#10b981' }} />
          <Chip label="PresenterModeContext" size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderColor: '#3b82f6', color: '#3b82f6' }} />
          <Chip label="WebSocketContext" size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderColor: '#8b5cf6', color: '#8b5cf6' }} />
        </Stack>
      </Paper>

      {/* Key Features */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        ✨ Collaboration Features
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {collaborationFeatures.map((feature) => (
          <Grid item xs={12} sm={6} key={feature.title}>
            <Card variant="outlined" sx={{ 
              height: '100%', 
              borderLeft: `3px solid ${feature.color}`,
              transition: 'all 0.2s',
              '&:hover': { boxShadow: 2, transform: 'translateY(-2px)' }
            }}>
              <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 1.5, 
                  bgcolor: `${feature.color}15`,
                  color: feature.color,
                  display: 'flex'
                }}>
                  {feature.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Technology Stack */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <WifiIcon sx={{ color: '#10b981' }} /> Technology Stack
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Technology</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Purpose</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Provider</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {techStack.map((row) => (
              <TableRow key={row.tech} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                <TableCell>
                  <Chip 
                    label={row.tech} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#10b98115', 
                      color: '#059669',
                      fontWeight: 600,
                      fontFamily: 'monospace'
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.description}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{row.provider}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Audience Reactions Detail */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        📊 Audience Feedback Aggregation
      </Typography>
      <Paper variant="outlined" sx={{ p: 2.5, mb: 4, borderRadius: 2 }}>
        <Typography variant="body1" paragraph>
          Real-time feedback is collected from audience members and aggregated for the presenter to see:
        </Typography>
        <Box sx={{ 
          p: 2, 
          bgcolor: '#f8fafc', 
          borderRadius: 2, 
          border: '1px solid #e2e8f0',
          fontFamily: 'monospace'
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Example display:</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip label="✅ 73% - I Get It" color="success" size="small" />
            <Chip label="🤔 18% - Need Help" color="warning" size="small" />
            <Chip label="❌ 9% - Lost" color="error" size="small" />
          </Box>
        </Box>
      </Paper>

      {/* Related Features */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        🔗 Related Features
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/docs/features/presentation" style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 }
            }}>
              <Typography variant="subtitle2" color="primary">Presentation System →</Typography>
              <Typography variant="caption" color="text.secondary">
                Slides and viewing modes for collaboration
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/docs/features/feedback" style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 }
            }}>
              <Typography variant="subtitle2" color="primary">Feedback System →</Typography>
              <Typography variant="caption" color="text.secondary">
                User input actions and audience reactions
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/docs/features/chat" style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 }
            }}>
              <Typography variant="subtitle2" color="primary">Chat System →</Typography>
              <Typography variant="caption" color="text.secondary">
                Real-time messaging between participants
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
