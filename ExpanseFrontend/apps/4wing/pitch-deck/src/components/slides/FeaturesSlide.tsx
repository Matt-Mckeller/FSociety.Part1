'use client';

import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import SlideLayout from '../SlideLayout';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ChatIcon from '@mui/icons-material/Chat';
import MoodIcon from '@mui/icons-material/Mood';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SosIcon from '@mui/icons-material/Sos';

const counselorFeatures = [
  {
    icon: <RecordVoiceOverIcon />,
    title: 'Live Transcription',
    description: 'Real-time speech-to-text with speaker identification',
  },
  {
    icon: <NotificationsActiveIcon />,
    title: 'Smart Alerts',
    description: 'Escalation risk detection and missed cue notifications',
  },
  {
    icon: <AutoAwesomeIcon />,
    title: 'AI Suggestions',
    description: 'Context-aware response and technique recommendations',
  },
  {
    icon: <SummarizeIcon />,
    title: 'Auto Summaries',
    description: 'Session summaries with clinical notes and action items',
  },
];

const clientFeatures = [
  {
    icon: <ChatIcon />,
    title: 'AI Companion',
    description: 'Empathetic conversational support between sessions',
  },
  {
    icon: <MoodIcon />,
    title: 'Mood Tracking',
    description: 'Daily check-ins with trend visualization',
  },
  {
    icon: <AssignmentIcon />,
    title: 'Homework',
    description: 'Task tracking with counselor-assigned activities',
  },
  {
    icon: <SosIcon />,
    title: 'Crisis Support',
    description: 'One-tap access to hotlines and grounding tools',
  },
];

export default function FeaturesSlide() {
  return (
    <SlideLayout>
      <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
        <Typography
          variant="h2"
          sx={{
            mb: 1.5,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          Core Features
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}
        >
          Powerful tools for both counselors and clients
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ maxWidth: 960, width: '100%' }}>
        {/* Counselor Side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Chip
              label="For Counselors"
              sx={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            />
          </Box>
          <Stack spacing={1.5}>
            {counselorFeatures.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  background: 'rgba(124, 58, 237, 0.08)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                  boxShadow: '0 2px 12px rgba(124, 58, 237, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(124, 58, 237, 0.15)',
                    transform: 'translateX(8px)',
                    boxShadow: '0 4px 20px rgba(124, 58, 237, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ py: 1.5, px: 2 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1.5,
                        background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontSize: '0.95rem', fontWeight: 600, mb: 0.25 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Client Side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Chip
              label="For Clients"
              sx={{
                background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            />
          </Box>
          <Stack spacing={1.5}>
            {clientFeatures.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  background: 'rgba(236, 72, 153, 0.08)',
                  border: '1px solid rgba(236, 72, 153, 0.2)',
                  boxShadow: '0 2px 12px rgba(236, 72, 153, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(236, 72, 153, 0.15)',
                    transform: 'translateX(8px)',
                    boxShadow: '0 4px 20px rgba(236, 72, 153, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ py: 1.5, px: 2 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1.5,
                        background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontSize: '0.95rem', fontWeight: 600, mb: 0.25 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </SlideLayout>
  );
}
