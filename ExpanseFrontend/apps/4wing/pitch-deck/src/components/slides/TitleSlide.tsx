'use client';

import { Box, Typography, Chip, Stack } from '@mui/material';
import SlideLayout from '../SlideLayout';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PsychologyIcon from '@mui/icons-material/Psychology';

export default function TitleSlide() {
  return (
    <SlideLayout background="default">
      <Box sx={{ textAlign: 'center', maxWidth: '960px', mx: 'auto', width: '100%' }}>
        {/* Company badge */}
        <Chip
          label="4wings"
          sx={{
            mb: 3,
            px: 2,
            py: 2.5,
            fontSize: '1rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(236, 72, 153, 0.12) 100%)',
            border: '1px solid rgba(124, 58, 237, 0.25)',
            color: 'primary.dark',
          }}
        />

        {/* Main title */}
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontSize: { xs: '2.25rem', md: '4rem', lg: '5rem' },
            background: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #EC4899 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Counsellor Support
        </Typography>

        {/* Tagline */}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: 'text.secondary',
            fontWeight: 400,
            fontSize: { xs: '1.1rem', md: '1.5rem' },
          }}
        >
          AI-powered counseling assistant with companion robot
        </Typography>

        {/* Icons */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <Box
            className="animate-float"
            sx={{
              p: 2.5,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(124, 58, 237, 0.04) 100%)',
              border: '1px solid rgba(124, 58, 237, 0.25)',
            }}
          >
            <PsychologyIcon sx={{ fontSize: 56, color: 'primary.main' }} />
          </Box>
          <Box
            className="animate-float"
            sx={{
              p: 2.5,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.04) 100%)',
              border: '1px solid rgba(236, 72, 153, 0.25)',
              animationDelay: '1s',
            }}
          >
            <SmartToyIcon sx={{ fontSize: 56, color: 'secondary.main' }} />
          </Box>
        </Stack>

        {/* Team */}
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 2 }}
        >
          Team
        </Typography>
        <Stack direction="row" spacing={3} justifyContent="center">
          {['Matthew McKeller', 'Wren Support', 'Mixed Berries'].map((name) => (
            <Chip
              key={name}
              label={name}
              variant="outlined"
              sx={{
                px: 1,
                borderColor: 'rgba(124, 58, 237, 0.25)',
                color: 'text.primary',
                fontSize: '0.95rem',
              }}
            />
          ))}
        </Stack>
      </Box>
    </SlideLayout>
  );
}
