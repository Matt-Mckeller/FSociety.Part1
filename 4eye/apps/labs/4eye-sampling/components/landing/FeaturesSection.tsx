'use client';

import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import {
  Mic,
  Translate,
  School,
  Psychology,
  Quiz,
  Article,
  Image,
  PlayCircle,
} from '@mui/icons-material';

const features = [
  {
    icon: Mic,
    title: 'Live Transcription',
    description: 'Real-time speech to text with high accuracy using advanced AI models.',
  },
  {
    icon: Translate,
    title: 'Instant Translation',
    description: '50+ languages instantly. Follow along in your native language.',
  },
  {
    icon: School,
    title: 'Reading Levels',
    description: 'Content adapted to Child, Standard, or Academic comprehension levels.',
  },
  {
    icon: Psychology,
    title: 'Learning Modes',
    description: 'Triadic understanding, visual learning, and knowledge web mapping.',
  },
  {
    icon: Quiz,
    title: 'AI Quizzes',
    description: 'Auto-generated exercises and tests for active recall and retention.',
  },
  {
    icon: Article,
    title: 'Summaries & Recaps',
    description: 'Key points, highlights, and structured notes after every session.',
  },
  {
    icon: Image,
    title: 'Visual Generation',
    description: 'AI-generated images to aid comprehension and memory retention.',
  },
  {
    icon: PlayCircle,
    title: 'Recordings',
    description: 'Save, replay, and study anytime. Your learning, on your schedule.',
  },
];

export function FeaturesSection() {
  return (
    <Box
      id="features"
      sx={{
        py: 10,
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="desktop">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 2,
            fontSize: { zero: '2rem', laptop: '2.5rem' }
          }}>
          Everything You Need to Learn Better
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 6,
            maxWidth: 600,
            mx: 'auto'
          }}>
          Powerful AI features that transform how you understand and retain information.
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid size={{ zero: 12, tablet: 6, laptop: 3 }} key={feature.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(66, 133, 244, 0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <feature.icon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{
                  fontWeight: 600
                }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{
                  color: "text.secondary"
                }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
