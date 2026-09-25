'use client';

import { Box, Typography, Grid, Card, CardContent, Chip, Stack } from '@mui/material';
import SlideLayout from '../SlideLayout';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const modes = [
  {
    icon: <PersonIcon sx={{ fontSize: 32 }} />,
    title: 'In-Person Mode',
    subtitle: 'For Counselors',
    description: 'Robot captures sessions silently while AI assists the counselor via screen in real-time.',
    features: [
      'Live transcription',
      'AI response suggestions',
      'Real-time alerts',
      'Session summaries',
    ],
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
  },
  {
    icon: <HomeIcon sx={{ fontSize: 32 }} />,
    title: 'Connected Mode',
    subtitle: 'For Clients',
    description: 'Between-session support for clients who attend real counseling. AI companion with counselor oversight.',
    features: [
      'AI companion chat',
      'Session recaps',
      'Homework tracking',
      'Mood check-ins',
    ],
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
  },
  {
    icon: <SelfImprovementIcon sx={{ fontSize: 32 }} />,
    title: 'Independent Mode',
    subtitle: 'For Individuals',
    description: 'Standalone AI mental health companion for those without access to traditional counseling.',
    features: [
      'AI companion chat',
      'Self-guided check-ins',
      'Reflection journal',
      'Coping tools',
    ],
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
];

export default function HowItWorksSlide() {
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
          How It Works
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}
        >
          Three modes for different users and contexts
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ maxWidth: 960, width: '100%' }}>
        {modes.map((mode, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card
              sx={{
                height: '100%',
                background: '#FFFFFF',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.4s ease',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  border: `1px solid ${mode.color}50`,
                  boxShadow: `0 16px 40px ${mode.color}18`,
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                {/* Icon */}
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: mode.gradient,
                    mb: 2,
                    boxShadow: `0 8px 20px ${mode.color}35`,
                    color: 'white',
                  }}
                >
                  {mode.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{ mb: 0.5, fontWeight: 700, fontSize: '1.15rem' }}
                >
                  {mode.title}
                </Typography>
                <Chip
                  label={mode.subtitle}
                  size="small"
                  sx={{
                    mb: 1.5,
                    background: `${mode.color}20`,
                    color: mode.color,
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 2, minHeight: 48, fontSize: '0.8rem' }}
                >
                  {mode.description}
                </Typography>

                {/* Features */}
                <Stack spacing={0.75}>
                  {mode.features.map((feature, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: mode.color,
                        }}
                      />
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </SlideLayout>
  );
}
