'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        pt: 8, // Account for fixed navbar
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="laptop">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { zero: '2.5rem', tablet: '3.5rem', laptop: '4rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 3,
              background: 'linear-gradient(135deg, #1976D2 0%, #4285f4 50%, #1E88E5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Learn Better.
            <br />
            Understand Everything.
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              fontSize: { zero: '1.1rem', laptop: '1.25rem' },
              lineHeight: 1.6
            }}>
            AI-powered learning that transforms any audio into personalized learning experiences.
            Transcription. Translation. Quizzes. Visual learning. Any language. Any level.
          </Typography>

          <Stack
            direction={{ zero: 'column', tablet: 'row' }}
            spacing={2}
            sx={{
              justifyContent: "center"
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/signup')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              See How It Works
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
