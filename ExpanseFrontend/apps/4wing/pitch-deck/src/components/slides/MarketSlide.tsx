'use client';

import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import SlideLayout from '../SlideLayout';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const marketData = [
  {
    label: 'TAM',
    title: 'Total Addressable Market',
    value: '$500B+',
    description: 'Global mental health market by 2030',
    color: '#7C3AED',
  },
  {
    label: 'SAM',
    title: 'Serviceable Addressable Market',
    value: '$50B',
    description: 'Digital mental health & counseling tools',
    color: '#EC4899',
  },
  {
    label: 'SOM',
    title: 'Serviceable Obtainable Market',
    value: '$500M',
    description: 'AI-assisted counseling in US & Canada',
    color: '#10B981',
  },
];

const trends = [
  'Mental health awareness at all-time high',
  'Telehealth adoption accelerated post-pandemic',
  'AI acceptance in healthcare growing rapidly',
  'Counselor shortage creating demand for tools',
];

export default function MarketSlide() {
  return (
    <SlideLayout background="dark">
      <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
        <Typography
          variant="h2"
          sx={{
            mb: 1.5,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          Market Opportunity
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}
        >
          A massive and growing market
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ maxWidth: 960, mb: 3, width: '100%' }}>
        {marketData.map((item, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card
              sx={{
                height: '100%',
                background: '#FFFFFF',
                border: `2px solid ${item.color}30`,
                boxShadow: `0 4px 20px ${item.color}12`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px ${item.color}25`,
                },
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Chip
                  label={item.label}
                  sx={{
                    mb: 1.5,
                    background: `${item.color}30`,
                    color: item.color,
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: item.color,
                    mb: 0.5,
                  }}
                >
                  {item.value}
                </Typography>
                <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, fontSize: '0.95rem' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Market trends */}
      <Card
        sx={{
          maxWidth: 800,
          width: '100%',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <TrendingUpIcon sx={{ color: 'success.main', fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Market Tailwinds
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {trends.map((trend, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body1">
                    {trend}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </SlideLayout>
  );
}
