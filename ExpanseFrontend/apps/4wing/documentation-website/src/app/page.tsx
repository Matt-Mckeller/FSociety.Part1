'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoodIcon from '@mui/icons-material/Mood';
import SpaIcon from '@mui/icons-material/Spa';
import WarningIcon from '@mui/icons-material/Warning';

const team = ['Matthew McKeller', 'Wren Support', 'Mixed Berries'];

const modes = [
  {
    name: 'In-Person',
    user: 'Counselor',
    description: 'Robot captures session; AI assists via screen (silent)',
    icon: <PersonIcon />,
    color: '#7C3AED',
  },
  {
    name: 'At-Home (Connected)',
    user: 'Client',
    description: 'Support between sessions with a real counselor',
    icon: <HomeWorkIcon />,
    color: '#EC4899',
  },
  {
    name: 'At-Home (Independent)',
    user: 'Individual',
    description: 'Standalone AI companion, no counselor required',
    icon: <SelfImprovementIcon />,
    color: '#10B981',
  },
];

const inPersonFeatures = [
  { icon: <MicIcon />, text: 'Robot captures audio/video silently' },
  { icon: <ChatIcon />, text: 'AI assists counselor via app screen only' },
  { icon: <AssignmentIcon />, text: 'Live transcription with speaker labels' },
  { icon: <WarningIcon />, text: 'Real-time alerts (escalation, missed cues)' },
  { icon: <ChatIcon />, text: 'AI response suggestions (on screen)' },
  { icon: <AssignmentIcon />, text: 'Session summaries generated post-session' },
];

const connectedFeatures = [
  { icon: <ChatIcon />, text: 'AI companion chat (conversational support)' },
  { icon: <AssignmentIcon />, text: 'Session recaps from counselor' },
  { icon: <AssignmentIcon />, text: 'Homework tracking and reminders' },
  { icon: <MoodIcon />, text: 'Daily mood check-ins (shared with counselor)' },
  { icon: <SpaIcon />, text: 'Coping tools (breathing, grounding)' },
  { icon: <WarningIcon />, text: 'Crisis resources' },
];

const independentFeatures = [
  { icon: <ChatIcon />, text: 'AI companion chat (primary feature)' },
  { icon: <MoodIcon />, text: 'Self-guided mood check-ins' },
  { icon: <AssignmentIcon />, text: 'Reflection journal' },
  { icon: <SpaIcon />, text: 'Coping tools (breathing, grounding)' },
  { icon: <WarningIcon />, text: 'Crisis resources' },
  { icon: <PersonIcon />, text: 'No counselor integration' },
];

const users = [
  { user: 'Counselor', modes: 'In-Person', role: 'Real-time guidance, post-session insights' },
  { user: 'Client', modes: 'Connected', role: 'Recaps, homework, between-session support' },
  { user: 'Individual', modes: 'Independent', role: 'Standalone AI companion support' },
  { user: 'Admin', modes: 'All', role: 'Analytics, training management' },
];

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" gutterBottom>
          Counsellor Support
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontWeight: 400 }}>
          AI-powered counseling assistant with companion robot
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
          {team.map((name) => (
            <Chip key={name} label={name} variant="outlined" color="primary" size="small" />
          ))}
        </Box>
      </Box>

      {/* Vision */}
      <Paper
        sx={{
          p: 4,
          mb: 6,
          background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Vision
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.95 }}>
          Heal people. Improve mental health. Enable growth. Improve learning.
        </Typography>
      </Paper>

      {/* Concept */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Concept
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
          AI app + companion robot that supports mental health through three modes:
        </Typography>
        <Box component="ol" sx={{ pl: 3, '& li': { mb: 1 } }}>
          <li>
            <Typography>
              Assists counselors during live sessions (robot captures silently; AI assists via screen)
            </Typography>
          </li>
          <li>
            <Typography>Supports clients between counseling sessions</Typography>
          </li>
          <li>
            <Typography>Provides standalone AI companionship for independent users</Typography>
          </li>
        </Box>
      </Box>

      {/* Product Modes */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Product Modes
        </Typography>
        <Grid container spacing={3}>
          {modes.map((mode) => (
            <Grid size={{ xs: 12, md: 4 }} key={mode.name}>
              <Card sx={{ height: '100%', borderTop: `4px solid ${mode.color}` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: mode.color }}>
                    {mode.icon}
                    <Typography variant="h5" fontWeight={600}>
                      {mode.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={mode.user}
                    size="small"
                    sx={{ mb: 2, backgroundColor: `${mode.color}20`, color: mode.color }}
                  />
                  <Typography color="text.secondary">{mode.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* In-Person Mode */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom color="primary">
          In-Person Mode
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          For counselors during live sessions with clients. Robot is passive—never speaks or interrupts.
        </Typography>
        <Grid container spacing={2}>
          {inPersonFeatures.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
                <Box sx={{ color: 'primary.main' }}>{feature.icon}</Box>
                <Typography>{feature.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Connected Mode */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#EC4899' }}>
          At-Home (Connected) Mode
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          For clients who attend real counseling sessions. Used between appointments.
        </Typography>
        <Grid container spacing={2}>
          {connectedFeatures.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
                <Box sx={{ color: '#EC4899' }}>{feature.icon}</Box>
                <Typography>{feature.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Independent Mode */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#10B981' }}>
          At-Home (Independent) Mode
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          For individuals without a counselor. Standalone AI mental health companion.
        </Typography>
        <Grid container spacing={2}>
          {independentFeatures.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
                <Box sx={{ color: '#10B981' }}>{feature.icon}</Box>
                <Typography>{feature.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Users Table */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Modes</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.user}>
                  <TableCell>
                    <Typography fontWeight={600}>{row.user}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={row.modes} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{row.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Footer */}
      <Paper sx={{ p: 3, textAlign: 'center', mb: 4 }}>
        <Typography variant="h6" color="primary">
          🏆 Goal: Win the hackathon
        </Typography>
      </Paper>
    </Container>
  );
}
