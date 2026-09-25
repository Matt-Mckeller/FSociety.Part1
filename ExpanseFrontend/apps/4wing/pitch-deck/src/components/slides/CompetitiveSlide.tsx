'use client';

import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import SlideLayout from '../SlideLayout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const competitors = [
  {
    name: 'Counsellor Support',
    us: true,
    features: {
      inSession: true,
      betweenSession: true,
      robot: true,
      realTimeAI: true,
      summaries: true,
      clientApp: true,
    },
  },
  {
    name: 'Traditional EHR',
    us: false,
    features: {
      inSession: false,
      betweenSession: false,
      robot: false,
      realTimeAI: false,
      summaries: false,
      clientApp: false,
    },
  },
  {
    name: 'Therapy Apps',
    us: false,
    features: {
      inSession: false,
      betweenSession: true,
      robot: false,
      realTimeAI: false,
      summaries: false,
      clientApp: true,
    },
  },
  {
    name: 'AI Note-takers',
    us: false,
    features: {
      inSession: true,
      betweenSession: false,
      robot: false,
      realTimeAI: false,
      summaries: true,
      clientApp: false,
    },
  },
];

const featureLabels = {
  inSession: 'In-Session Support',
  betweenSession: 'Between-Session Care',
  robot: 'Companion Robot',
  realTimeAI: 'Real-time AI Alerts',
  summaries: 'Auto Summaries',
  clientApp: 'Client Mobile App',
};

const advantages = [
  {
    title: 'End-to-End Solution',
    description: 'No one else combines in-session AI with between-session client care',
  },
  {
    title: 'Non-Intrusive Hardware',
    description: 'Robot reduces discomfort of recording, improving session quality',
  },
  {
    title: 'Privacy-First Design',
    description: 'HIPAA-compliant with granular consent controls',
  },
];

export default function CompetitiveSlide() {
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
          Competitive Advantage
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}
        >
          The only complete solution for modern counseling
        </Typography>
      </Box>

      {/* Comparison table */}
      <Card
        sx={{
          maxWidth: 800,
          width: '100%',
          mb: 3,
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          overflow: 'auto',
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ minWidth: 700 }}>
            {/* Header */}
            <Grid container sx={{ mb: 2, pb: 2, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <Grid size={{ xs: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Feature
                </Typography>
              </Grid>
              {competitors.map((comp, i) => (
                <Grid size={{ xs: 2 }} key={i} sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: comp.us ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {comp.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* Rows */}
            {Object.entries(featureLabels).map(([key, label]) => (
              <Grid container key={key} sx={{ py: 1.5, alignItems: 'center' }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="body2">{label}</Typography>
                </Grid>
                {competitors.map((comp, i) => (
                  <Grid size={{ xs: 2 }} key={i} sx={{ textAlign: 'center' }}>
                    {comp.features[key as keyof typeof comp.features] ? (
                      <CheckCircleIcon
                        sx={{
                          color: comp.us ? '#10B981' : '#6B7280',
                          fontSize: 22,
                        }}
                      />
                    ) : (
                      <CancelIcon sx={{ color: '#374151', fontSize: 22 }} />
                    )}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Key advantages */}
      <Grid container spacing={3} sx={{ maxWidth: 900 }}>
        {advantages.map((adv, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'white',
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>
                  {adv.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {adv.description}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </SlideLayout>
  );
}
