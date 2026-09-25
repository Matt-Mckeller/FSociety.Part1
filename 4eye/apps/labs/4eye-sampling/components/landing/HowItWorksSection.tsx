'use client';

import { Box, Container, Typography, Paper, Stack } from '@mui/material';

const steps = [
  {
    number: '01',
    title: 'Record or Join',
    description: 'Start a recording or join a live session. Works with any audio source.',
  },
  {
    number: '02',
    title: 'Real-time Transcript',
    description: 'Get instant transcription in your preferred language and reading level.',
  },
  {
    number: '03',
    title: 'AI Learning Aids',
    description: 'AI generates summaries, quizzes, visual aids, and key takeaways.',
  },
  {
    number: '04',
    title: 'Master the Content',
    description: 'Use active recall exercises and spaced repetition to truly learn.',
  },
];

export function HowItWorksSection() {
  return (
    <Box
      id="how-it-works"
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
          How It Works
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 8,
            maxWidth: 600,
            mx: 'auto'
          }}>
          From audio to understanding in four simple steps.
        </Typography>

        <Stack
          direction={{ zero: 'column', laptop: 'row' }}
          spacing={3}
          sx={{ position: 'relative' }}
        >
          {/* Connection line for desktop */}
          <Box
            sx={{
              display: { zero: 'none', laptop: 'block' },
              position: 'absolute',
              top: 48,
              left: '12%',
              right: '12%',
              height: 2,
              bgcolor: 'primary.light',
              zIndex: 0,
            }}
          />

          {steps.map((step) => (
            <Paper
              key={step.number}
              elevation={0}
              sx={{
                flex: 1,
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative',
                zIndex: 1,
                bgcolor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  color="white"
                  sx={{
                    fontWeight: 700
                  }}
                >
                  {step.number}
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom sx={{
                fontWeight: 600
              }}>
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{
                color: "text.secondary"
              }}>
                {step.description}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
