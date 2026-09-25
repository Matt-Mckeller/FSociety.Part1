'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export function CTASection() {
  const router = useRouter();

  return (
    <Box
      sx={{
        py: 10,
        background: 'linear-gradient(135deg, #1976D2 0%, #4285f4 50%, #1E88E5 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth="laptop">
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 2,
            fontSize: { zero: '1.75rem', laptop: '2.5rem' }
          }}>
          Ready to transform how you learn?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 4,
            opacity: 0.9,
            maxWidth: 500,
            mx: 'auto'
          }}>
          Join thousands of learners who are getting more from every lesson, lecture, and conversation.
        </Typography>
        <Stack direction="row" spacing={2} sx={{
          justifyContent: "center"
        }}>
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
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Get Started Free
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
