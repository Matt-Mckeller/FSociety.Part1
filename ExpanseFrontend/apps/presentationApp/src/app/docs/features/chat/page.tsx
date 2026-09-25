import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box, Stack, Card, CardContent, Grid } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Link from 'next/link';

const chatVariants = [
  { variant: 'Presenter / Audience', icon: '🎤', status: 'Active', description: 'Real-time chat showing current conversation and presenter details' },
  { variant: 'AI (multiple variants)', icon: '🤖', status: 'Planned', description: 'AI-powered chat assistants for learning support' },
  { variant: 'Learning Specialist / Human Tutor', icon: '👨‍🏫', status: 'Planned', description: 'Connect with human experts for personalized help' },
  { variant: 'Team Chat', icon: '👥', status: 'Planned', description: 'Team communication channel for collaborative learning' },
];

const chatFeatures = [
  { icon: <ToggleOnIcon />, title: 'Toggle Panel', description: 'Toggleable via action icons in the UI toolbar', color: '#3b82f6' },
  { icon: <RecordVoiceOverIcon />, title: 'Real-time Messages', description: 'WebSocket-powered instant message delivery', color: '#10b981' },
  { icon: <SmartToyIcon />, title: 'AI Integration', description: 'Placeholder for multiple AI assistant variants', color: '#8b5cf6' },
  { icon: <GroupIcon />, title: 'Multi-participant', description: 'Support for presenter-audience and team conversations', color: '#f59e0b' },
];

export default function ChatPage() {
  return (
    <>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ 
          p: 1.5, 
          borderRadius: 2, 
          bgcolor: '#3b82f615',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ChatIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ mb: 0.5 }}>Chat System</Typography>
          <Typography variant="body1" color="text.secondary">
            VS Code-style embedded chat panel with multiple conversation modes
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture */}
      <Paper variant="outlined" sx={{ 
        p: 2.5, 
        mb: 4, 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderLeft: '4px solid #3b82f6',
        borderRadius: 2
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          📦 Module & Architecture
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip label="Chat System" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#3b82f620', fontWeight: 500 }} />
          <Chip label="Panel System" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#10b98120', fontWeight: 500 }} />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          <strong>React Context:</strong>
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="ChatContext" size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderColor: '#3b82f6', color: '#3b82f6' }} />
          <Chip label="AIResponseContext" size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderColor: '#8b5cf6', color: '#8b5cf6' }} />
          <Chip label="WebSocketContext" size="small" variant="outlined" sx={{ fontSize: '0.75rem', borderColor: '#10b981', color: '#10b981' }} />
        </Stack>
      </Paper>

      {/* Chat Features */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        ✨ Key Features
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {chatFeatures.map((feature) => (
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

      {/* Chat Variants Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        💬 Chat Variants
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Variant</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 100 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chatVariants.map((row) => (
              <TableRow key={row.variant} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography component="span" sx={{ fontSize: 18 }}>{row.icon}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.variant}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: row.status === 'Active' ? '#10b98120' : '#94a3b820',
                      color: row.status === 'Active' ? '#059669' : '#64748b',
                      fontWeight: 500,
                      fontSize: '0.75rem'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{row.description}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* VS Code Comparison */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        🔧 Design Inspiration
      </Typography>
      <Paper variant="outlined" sx={{ p: 2.5, mb: 4, borderRadius: 2 }}>
        <Typography variant="body1" paragraph sx={{ mb: 2 }}>
          The chat system is modeled after <strong>VS Code&apos;s AI chat panel</strong>, providing a familiar 
          interface for developers and learners alike.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Side Panel" size="small" variant="outlined" />
          <Chip label="Toggleable" size="small" variant="outlined" />
          <Chip label="Scrollable History" size="small" variant="outlined" />
          <Chip label="Input at Bottom" size="small" variant="outlined" />
        </Box>
      </Paper>

      {/* Related Features */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        🔗 Related Features
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/docs/features/panels" style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 }
            }}>
              <Typography variant="subtitle2" color="primary">Panel System →</Typography>
              <Typography variant="caption" color="text.secondary">
                Chat panel configuration and toggle behavior
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/docs/features/ai-actions" style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 }
            }}>
              <Typography variant="subtitle2" color="primary">AI Actions →</Typography>
              <Typography variant="caption" color="text.secondary">
                AI-powered actions that integrate with chat
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/docs/features/collaboration" style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ 
              p: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: 1 }
            }}>
              <Typography variant="subtitle2" color="primary">Collaboration →</Typography>
              <Typography variant="caption" color="text.secondary">
                WebSocket-powered real-time communication
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
