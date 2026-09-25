'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const counselorScreens = [
  { screen: 'Login', purpose: 'Auth (email/SSO)' },
  { screen: 'Dashboard', purpose: 'Schedule, alerts, stats' },
  { screen: 'Live Session', purpose: 'Transcript, AI suggestions, notes' },
  { screen: 'Session Review', purpose: 'Summary, export, client recap preview' },
  { screen: 'Settings', purpose: 'Preferences, integrations' },
];

const clientScreens = [
  { screen: 'Login', purpose: 'Auth (email/magic link)' },
  { screen: 'Home', purpose: 'Check-in prompt, mood trends, quick actions' },
  { screen: 'Chat', purpose: 'AI companion conversation' },
  { screen: 'My Recaps', purpose: 'Session summaries from counselor' },
  { screen: 'Recap Detail', purpose: 'Takeaways, action items, progress' },
  { screen: 'Homework', purpose: 'Action items from counselor' },
  { screen: 'Check-in', purpose: 'Mood/progress prompts (shared with counselor)' },
  { screen: 'Journal', purpose: 'Voice/text entries' },
  { screen: 'Coping Tools', purpose: 'Breathing, grounding, meditation' },
  { screen: 'Crisis', purpose: 'Hotlines, emergency contacts' },
];

const individualScreens = [
  { screen: 'Login', purpose: 'Auth (email/magic link)' },
  { screen: 'Home', purpose: 'Check-in prompt, mood trends, quick actions' },
  { screen: 'Chat', purpose: 'AI companion conversation (primary feature)' },
  { screen: 'Check-in', purpose: 'Self-guided mood/progress prompts' },
  { screen: 'Journal', purpose: 'Voice/text entries' },
  { screen: 'Coping Tools', purpose: 'Breathing, grounding, meditation' },
  { screen: 'Crisis', purpose: 'Hotlines, emergency contacts' },
];

const adminScreens = [
  { screen: 'Dashboard', purpose: 'Org stats, alert log, counselor overview' },
  { screen: 'Counselor Detail', purpose: 'Performance, session history, compliance' },
];

const counselorScreenDetails = [
  {
    name: 'Dashboard',
    details: ["Today's schedule, recent alerts, quick stats, start session button"],
  },
  {
    name: 'Live Session',
    details: [
      'Left: real-time transcript with speaker labels',
      'Right: alert feed + AI response suggestions',
      'Bottom: quick notes, timer, end session',
      'AI suggestions appear inline, counselor can tap to expand',
    ],
  },
  {
    name: 'Session Review',
    details: ['AI summary (editable), key moments, alerts log, export options'],
  },
];

const userFlows = [
  {
    user: 'Counselor',
    mode: 'In-Person',
    color: '#7C3AED',
    flow: ['Dashboard', 'Start Session', 'Consent', 'Live Session', 'End', 'Review', 'Send Recap'],
  },
  {
    user: 'Client',
    mode: 'Connected',
    color: '#EC4899',
    flow: ['Login', 'Home', 'Check-in or Recaps', 'Detail', 'Chat', '(Reflect)'],
  },
  {
    user: 'Individual',
    mode: 'Independent',
    color: '#10B981',
    flow: ['Login', 'Home', 'Chat', 'Check-in', 'Journal', 'Coping Tools'],
  },
  {
    user: 'Admin',
    mode: 'All',
    color: '#6B7280',
    flow: ['Dashboard', 'Alert Log', 'Detail', '(Flag)'],
  },
];

function ScreenTable({
  screens,
  title,
  color,
}: {
  screens: { screen: string; purpose: string }[];
  title: string;
  color: string;
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Screen</TableCell>
              <TableCell>Purpose</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {screens.map((row) => (
              <TableRow key={row.screen}>
                <TableCell>
                  <Typography fontWeight={500}>{row.screen}</Typography>
                </TableCell>
                <TableCell>{row.purpose}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default function ScreensPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom>
        Screens
      </Typography>

      {/* Counselor App */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom color="primary">
          Counselor App (In-Person Mode)
        </Typography>
        <ScreenTable screens={counselorScreens} title="Screens" color="#7C3AED" />

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Screen Details
        </Typography>
        {counselorScreenDetails.map((screen) => (
          <Card key={screen.name} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {screen.name}
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {screen.details.map((detail, index) => (
                  <li key={index}>
                    <Typography variant="body2" color="text.secondary">
                      {detail}
                    </Typography>
                  </li>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Client App */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#EC4899' }}>
          Client App (At-Home Connected Mode)
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          For clients who have a real counselor - between-session support.
        </Typography>
        <ScreenTable screens={clientScreens} title="Screens" color="#EC4899" />
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Individual App */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#10B981' }}>
          Individual App (At-Home Independent Mode)
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          For users without a counselor - standalone AI companion.
        </Typography>
        <ScreenTable screens={individualScreens} title="Screens" color="#10B981" />
        <Paper sx={{ p: 2, backgroundColor: '#F3F4F6', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Note: No Recaps or Homework screens (no counselor integration).
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Admin Portal */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom color="text.secondary">
          Admin Portal (P2)
        </Typography>
        <ScreenTable screens={adminScreens} title="Screens" color="#6B7280" />
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* User Flows */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          User Flows
        </Typography>
        {userFlows.map((flow) => (
          <Card key={flow.user} sx={{ mb: 3, borderLeft: `4px solid ${flow.color}` }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  {flow.user}
                </Typography>
                <Chip
                  label={flow.mode}
                  size="small"
                  sx={{ backgroundColor: `${flow.color}20`, color: flow.color }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                {flow.flow.map((step, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label={step} size="small" variant="outlined" />
                    {index < flow.flow.length - 1 && (
                      <ArrowForwardIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    )}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
