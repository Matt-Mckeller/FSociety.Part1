'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
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
import CheckIcon from '@mui/icons-material/Check';

const priorityColors: Record<string, string> = {
  P0: '#10B981',
  P1: '#F59E0B',
  P2: '#6B7280',
};

const features = [
  { feature: 'Live Transcription', priority: 'P0', inPerson: true, connected: false, independent: false },
  { feature: 'Session Summaries', priority: 'P0', inPerson: true, connected: false, independent: false },
  { feature: 'Counselor Alerts', priority: 'P0', inPerson: true, connected: false, independent: false },
  { feature: 'AI Response Suggestions', priority: 'P0', inPerson: true, connected: false, independent: false },
  { feature: 'AI Companion Chat', priority: 'P0', inPerson: false, connected: true, independent: true },
  { feature: 'Session Recaps', priority: 'P0', inPerson: false, connected: true, independent: false },
  { feature: 'Homework Tracking', priority: 'P1', inPerson: false, connected: true, independent: false },
  { feature: 'Guided Check-ins', priority: 'P0', inPerson: false, connected: true, independent: true },
  { feature: 'Reflection Journal', priority: 'P1', inPerson: false, connected: true, independent: true },
  { feature: 'Coping Tools', priority: 'P1', inPerson: false, connected: true, independent: true },
  { feature: 'Crisis Resources', priority: 'P0', inPerson: false, connected: true, independent: true },
  { feature: 'Nonverbal Analysis', priority: 'P2', inPerson: true, connected: false, independent: false },
];

const inPersonDetailed = [
  {
    name: 'Live Transcription',
    priority: 'P0',
    details: [
      'Real-time speech-to-text during counseling sessions',
      'Speaker diarization (distinguish counselor vs client)',
      'Timestamp markers for key moments',
      'Editable by counselor post-session',
    ],
  },
  {
    name: 'Session Summaries',
    priority: 'P0',
    details: [
      'Auto-generated after session ends',
      'Counselor view: Full context, clinical notes, observations',
      'Client view: Takeaways, action items, encouragement',
      'Export options: PDF, email, integration with EHR',
    ],
  },
  {
    name: 'Counselor Alerts',
    priority: 'P0',
    details: [
      'Subtle, non-intrusive notifications during session',
      'Escalation risk (distress indicators)',
      'Missed therapeutic opportunities',
      'Session time reminders',
      'Configurable sensitivity levels',
    ],
  },
  {
    name: 'AI Response Suggestions',
    priority: 'P0',
    details: [
      'Real-time suggestions for counselor responses',
      'Context-aware based on conversation flow',
      'Therapeutic technique recommendations',
      'Learns from counselor preferences over time',
    ],
  },
  {
    name: 'Nonverbal Analysis',
    priority: 'P2',
    details: [
      'Video-based emotion detection',
      'Body language interpretation',
      'Engagement level tracking',
      'Requires explicit consent and additional hardware',
    ],
  },
];

const connectedDetailed = [
  {
    name: 'AI Companion Chat',
    priority: 'P0',
    details: [
      'Conversational AI for between-session support',
      'Empathetic, supportive responses',
      'Remembers context from previous conversations and sessions',
      'Can guide through coping exercises',
      'Escalates to crisis resources when needed',
      'Summarizes conversations for counselor review (with consent)',
    ],
  },
  {
    name: 'Guided Check-ins',
    priority: 'P0',
    details: [
      'Daily or weekly mood prompts',
      'Progress questions tied to session goals',
      'Trend visualization over time',
      'Shared with counselor (with consent)',
    ],
  },
  {
    name: 'Client Recaps',
    priority: 'P0',
    details: [
      'Personalized summary for client growth',
      'Key takeaways and homework/action items',
      'Progress tracking over multiple sessions',
      'Delivered via app or email',
    ],
  },
  {
    name: 'Homework Tracking',
    priority: 'P1',
    details: [
      'Action items assigned by counselor',
      'Completion tracking with reminders',
      'Notes and reflections per task',
      'Progress visible to counselor',
    ],
  },
];

const sharedFeatures = [
  {
    name: 'Reflection Journal',
    priority: 'P1',
    details: [
      'Voice or text journal entries',
      'AI-summarized for patterns',
      'Private by default, shareable with counselor',
      'Prompt suggestions based on session themes',
    ],
  },
  {
    name: 'Coping Tools',
    priority: 'P1',
    details: [
      'Guided breathing exercises',
      'Grounding techniques (5-4-3-2-1, etc.)',
      'Meditation/mindfulness audio',
      'Personalized based on client preferences',
    ],
  },
  {
    name: 'Crisis Resources',
    priority: 'P0',
    details: [
      'One-tap access to crisis hotlines',
      'Emergency contact quick-dial',
      'Grounding exercises for acute distress',
      'Location-aware resource suggestions',
    ],
  },
];

function FeatureCard({
  name,
  priority,
  details,
}: {
  name: string;
  priority: string;
  details: string[];
}) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            {name}
          </Typography>
          <Chip
            label={priority}
            size="small"
            sx={{ backgroundColor: priorityColors[priority], color: 'white' }}
          />
        </Box>
        <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 0.5 } }}>
          {details.map((detail, index) => (
            <li key={index}>
              <Typography variant="body2" color="text.secondary">
                {detail}
              </Typography>
            </li>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function FeaturesPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom>
        Core Features
      </Typography>

      {/* Priority Legend */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Priority Legend
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label="P0" size="small" sx={{ backgroundColor: '#10B981', color: 'white' }} />
            <Typography variant="body2">Must have for MVP / hackathon demo</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label="P1" size="small" sx={{ backgroundColor: '#F59E0B', color: 'white' }} />
            <Typography variant="body2">Important, build if time permits</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label="P2" size="small" sx={{ backgroundColor: '#6B7280', color: 'white' }} />
            <Typography variant="body2">Future enhancement</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Feature Summary Table */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Feature Summary
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Feature</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="center">In-Person</TableCell>
                <TableCell align="center">Connected</TableCell>
                <TableCell align="center">Independent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell>
                    <Typography fontWeight={500}>{row.feature}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.priority}
                      size="small"
                      sx={{ backgroundColor: priorityColors[row.priority], color: 'white' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {row.inPerson && <CheckIcon sx={{ color: '#7C3AED' }} />}
                  </TableCell>
                  <TableCell align="center">
                    {row.connected && <CheckIcon sx={{ color: '#EC4899' }} />}
                  </TableCell>
                  <TableCell align="center">
                    {row.independent && <CheckIcon sx={{ color: '#10B981' }} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* In-Person Mode Features */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom color="primary">
          In-Person Mode Features
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Robot is passive—captures audio/video silently, never speaks or interrupts.
        </Typography>
        <Grid container spacing={3}>
          {inPersonDetailed.map((feature) => (
            <Grid size={{ xs: 12, md: 6 }} key={feature.name}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Connected Mode Features */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#EC4899' }}>
          At-Home (Connected) Mode Features
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          For clients who attend real counseling sessions. Used between appointments.
        </Typography>
        <Grid container spacing={3}>
          {connectedDetailed.map((feature) => (
            <Grid size={{ xs: 12, md: 6 }} key={feature.name}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Shared Features */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#10B981' }}>
          Shared At-Home Features
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Available in both Connected and Independent modes.
        </Typography>
        <Grid container spacing={3}>
          {sharedFeatures.map((feature) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={feature.name}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
