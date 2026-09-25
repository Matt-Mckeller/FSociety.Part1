'use client';

import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import SlideLayout from '../SlideLayout';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const models = [
  {
    icon: <PersonIcon sx={{ fontSize: 40 }} />,
    title: 'Practitioner License',
    price: '$99/mo',
    description: 'Per counselor seat',
    features: ['In-person mode', 'Unlimited sessions', 'AI summaries', 'Alerts'],
    color: '#7C3AED',
    recommended: false,
  },
  {
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    title: 'Clinic License',
    price: '$499/mo',
    description: 'Up to 10 counselors',
    features: ['All practitioner features', 'Admin dashboard', 'Analytics', 'Priority support'],
    color: '#EC4899',
    recommended: true,
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    title: 'Client Subscription',
    price: '$19/mo',
    description: 'Per client (Connected mode)',
    features: ['AI companion', 'Mood tracking', 'Homework', 'Crisis support'],
    color: '#10B981',
    recommended: false,
  },
];

const revenueStreams = [
  { stream: 'B2B SaaS (Clinics & Practices)', percentage: 60 },
  { stream: 'B2C Subscriptions (Clients)', percentage: 25 },
  { stream: 'Robot Hardware', percentage: 10 },
  { stream: 'Enterprise / EHR Integration', percentage: 5 },
];

export default function BusinessModelSlide() {
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
          Business Model
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}
        >
          Multiple revenue streams for sustainable growth
        </Typography>
      </Box>

      {/* Pricing tiers */}
      <Grid container spacing={2.5} sx={{ maxWidth: 960, mb: 3, width: '100%' }}>
        {models.map((model, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card
              sx={{
                height: '100%',
                background: model.recommended
                  ? '#FFFFFF'
                  : '#FFFFFF',
                border: model.recommended
                  ? `2px solid ${model.color}`
                  : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: model.recommended
                  ? `0 8px 32px ${model.color}25`
                  : '0 4px 20px rgba(0, 0, 0, 0.06)',
                position: 'relative',
                overflow: 'visible',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: model.recommended
                    ? `0 16px 48px ${model.color}30`
                    : '0 12px 32px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              {model.recommended && (
                <Chip
                  label="Most Popular"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: model.color,
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              )}
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box sx={{ color: model.color, mb: 2 }}>
                  {model.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {model.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: model.color,
                    mb: 0.5,
                  }}
                >
                  {model.price}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  {model.description}
                </Typography>
                <Stack spacing={1.5} alignItems="flex-start">
                  {model.features.map((feature, i) => (
                    <Box
                      key={i}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: model.color,
                        }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Revenue breakdown */}
      <Card
        sx={{
          maxWidth: 700,
          width: '100%',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <AttachMoneyIcon sx={{ color: 'success.main', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Revenue Mix (Target Year 3)
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {revenueStreams.map((item, index) => (
              <Box key={index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{item.stream}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.percentage}%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(124, 58, 237, 0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: `${item.percentage}%`,
                      height: '100%',
                      borderRadius: 4,
                      background: 'linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </SlideLayout>
  );
}
