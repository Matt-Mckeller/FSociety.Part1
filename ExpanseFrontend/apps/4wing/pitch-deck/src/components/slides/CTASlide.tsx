'use client';

import { Box, Typography, Grid, Card, CardContent, Stack, Chip, Button } from '@mui/material';
import SlideLayout from '../SlideLayout';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';

const askItems = [
  {
    amount: '$500K',
    purpose: 'Seed Round',
    details: 'Product development, team expansion, pilot programs',
    color: '#7C3AED',
  },
];

const milestones = [
  { phase: 'Now', milestone: 'MVP & Hackathon Demo' },
  { phase: 'Q2 2026', milestone: 'Pilot with 5 counselors' },
  { phase: 'Q3 2026', milestone: 'Beta launch, 50 users' },
  { phase: 'Q4 2026', milestone: 'Public launch, Series A' },
];

const visionPoints = [
  'Heal people',
  'Improve mental health',
  'Enable growth',
  'Improve learning',
];

export default function CTASlide() {
  return (
    <SlideLayout background="accent">
      <Box sx={{ textAlign: 'center', maxWidth: 960, mx: 'auto', width: '100%' }}>
        <RocketLaunchIcon sx={{ fontSize: 56, mb: 2, color: 'rgba(255,255,255,0.9)' }} />

        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
            color: 'white',
          }}
        >
          Join Us in Transforming Mental Healthcare
        </Typography>

        {/* Vision */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 4 }}
        >
          {visionPoints.map((point, i) => (
            <Chip
              key={i}
              label={point}
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                py: 2.5,
                px: 1,
              }}
            />
          ))}
        </Stack>

        {/* The Ask */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          {askItems.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 5 }} key={index}>
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: 'white',
                      mb: 1,
                    }}
                  >
                    {item.amount}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}
                  >
                    {item.purpose}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {item.details}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Roadmap */}
        <Card
          sx={{
            mb: 4,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <CardContent sx={{ py: 2 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={0}
              justifyContent="space-around"
              divider={
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    width: 60,
                    height: 2,
                    background: 'rgba(255,255,255,0.3)',
                    alignSelf: 'center',
                  }}
                />
              }
            >
              {milestones.map((item, index) => (
                <Box key={index} sx={{ textAlign: 'center', py: 1 }}>
                  <Chip
                    label={item.phase}
                    size="small"
                    sx={{
                      mb: 1,
                      background: index === 0 ? 'white' : 'rgba(255,255,255,0.2)',
                      color: index === 0 ? '#7C3AED' : 'white',
                      fontWeight: 700,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    {item.milestone}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Contact */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            startIcon={<EmailIcon />}
            sx={{
              background: 'white',
              color: '#7C3AED',
              fontWeight: 700,
              px: 4,
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            hello@4wings.ai
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<LanguageIcon />}
            sx={{
              borderColor: 'rgba(255,255,255,0.5)',
              color: 'white',
              fontWeight: 600,
              px: 4,
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            4wings.ai
          </Button>
        </Stack>
      </Box>
    </SlideLayout>
  );
}
