'use client';

import { Box, Container, Typography, Paper, Button, Stack, Chip, Grid } from '@mui/material';
import { Check } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const individualPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for trying out 4eye',
    features: ['5 sessions/month', 'Basic transcription', '2 languages', 'Session summaries'],
    buttonText: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Plus',
    price: '$29.99',
    period: '/month',
    description: 'For dedicated learners',
    features: [
      '10 hours STT/month',
      'All languages',
      'Learning modes',
      'AI quizzes',
      'Visual generation',
    ],
    buttonText: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$59.99',
    period: '/month',
    description: 'For power users',
    features: [
      '25 hours STT/month',
      'Priority processing',
      'Advanced analytics',
      'API access',
      'Unlimited recordings',
    ],
    buttonText: 'Start Free Trial',
    highlighted: false,
  },
];

export function PricingSection() {
  const router = useRouter();

  return (
    <Box
      id="pricing"
      sx={{
        py: 10,
        bgcolor: 'grey.50',
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
          Simple, Transparent Pricing
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 6,
            maxWidth: 600,
            mx: 'auto'
          }}>
          Start free and upgrade as you grow. Organization plans available for teams.
        </Typography>

        <Grid container spacing={3} sx={{
          justifyContent: "center"
        }}>
          {individualPlans.map((plan) => (
            <Grid size={{ zero: 12, tablet: 6, laptop: 4 }} key={plan.name}>
              <Paper
                elevation={plan.highlighted ? 8 : 0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  border: plan.highlighted ? 'none' : '1px solid',
                  borderColor: 'divider',
                  position: 'relative',
                  bgcolor: plan.highlighted ? 'primary.main' : 'background.paper',
                  color: plan.highlighted ? 'white' : 'inherit',
                }}
              >
                {plan.highlighted && (
                  <Chip
                    label="Most Popular"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: 'secondary.main',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                )}

                <Typography variant="h5" gutterBottom sx={{
                  fontWeight: 600
                }}>
                  {plan.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                  <Typography variant="h3" sx={{
                    fontWeight: 700
                  }}>
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ ml: 0.5, opacity: 0.8 }}
                  >
                    {plan.period}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ mb: 3, opacity: 0.8 }}
                >
                  {plan.description}
                </Typography>

                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  {plan.features.map((feature) => (
                    <Box
                      key={feature}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <Check
                        sx={{
                          fontSize: 18,
                          color: plan.highlighted ? 'inherit' : 'primary.main',
                        }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  variant={plan.highlighted ? 'contained' : 'outlined'}
                  onClick={() => router.push('/signup')}
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    borderRadius: 2,
                    bgcolor: plan.highlighted ? 'white' : undefined,
                    color: plan.highlighted ? 'primary.main' : undefined,
                    '&:hover': plan.highlighted ? {
                      bgcolor: 'grey.100',
                    } : undefined,
                  }}
                >
                  {plan.buttonText}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mt: 4
          }}>
          Need more? Check out our{' '}
          <Typography
            component="a"
            href="/pricing"
            color="primary"
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            organization plans
          </Typography>{' '}
          starting at $99/month.
        </Typography>
      </Container>
    </Box>
  );
}
