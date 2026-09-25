'use client';

import { Box, Typography, Stack, Chip } from '@mui/material';
import SlideLayout from '../SlideLayout';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function SolutionSlide() {
  return (
    <SlideLayout background="gradient">
      <Box sx={{ textAlign: 'center', maxWidth: 960, mx: 'auto', width: '100%' }}>
        <Chip
          icon={<AutoAwesomeIcon />}
          label="Our Solution"
          sx={{
            mb: 2,
            px: 1.5,
            background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: 600,
            '& .MuiChip-icon': { color: 'white' },
          }}
        />

        <Typography
          variant="h2"
          sx={{
            mb: 1.5,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          AI + Companion Robot
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: 'text.secondary',
            fontWeight: 400,
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            maxWidth: 700,
            mx: 'auto',
          }}
        >
          Augmenting counselors with real-time AI assistance while providing
          clients continuous support between sessions
        </Typography>

        {/* Visual representation */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          {/* AI Brain */}
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)',
              border: '2px solid rgba(124, 58, 237, 0.3)',
              boxShadow: '0 10px 40px rgba(124, 58, 237, 0.15)',
            }}
          >
            <PsychologyIcon sx={{ fontSize: 80, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              AI Intelligence
            </Typography>
          </Box>

          {/* Plus sign */}
          <Typography
            variant="h2"
            sx={{
              color: 'text.secondary',
              fontWeight: 300,
            }}
          >
            +
          </Typography>

          {/* Robot */}
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0.05) 100%)',
              border: '2px solid rgba(236, 72, 153, 0.3)',
              boxShadow: '0 10px 40px rgba(236, 72, 153, 0.15)',
            }}
          >
            <SmartToyIcon sx={{ fontSize: 80, color: 'secondary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Companion Robot
            </Typography>
          </Box>

          {/* Equals sign */}
          <Typography
            variant="h2"
            sx={{
              color: 'text.secondary',
              fontWeight: 300,
            }}
          >
            =
          </Typography>

          {/* Heart/Result */}
          <Box
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 10px 40px rgba(16, 185, 129, 0.15)',
            }}
          >
            <FavoriteIcon sx={{ fontSize: 80, color: 'success.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Better Outcomes
            </Typography>
          </Box>
        </Stack>

        {/* Key benefits */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          justifyContent="center"
        >
          {[
            'Real-time counselor support',
            'Between-session care',
            'Passive & non-intrusive',
          ].map((benefit) => (
            <Chip
              key={benefit}
              label={benefit}
              sx={{
                px: 2,
                py: 2.5,
                fontSize: '1rem',
                background: 'rgba(124, 58, 237, 0.08)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
                color: 'text.primary',
              }}
            />
          ))}
        </Stack>
      </Box>
    </SlideLayout>
  );
}
