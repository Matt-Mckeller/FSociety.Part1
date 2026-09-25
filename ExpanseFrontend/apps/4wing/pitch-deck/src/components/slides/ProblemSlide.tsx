'use client';

import { Box, Typography, Grid, Card, CardContent, Stack } from '@mui/material';
import SlideLayout from '../SlideLayout';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const problems = [
  {
    icon: <WarningAmberIcon sx={{ fontSize: 36 }} />,
    stat: '1 in 5',
    title: 'Mental Health Crisis',
    description: 'Adults experience mental illness annually, but most go untreated',
    color: '#EF4444',
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 36 }} />,
    stat: '50%',
    title: 'Counselor Burnout',
    description: 'of mental health professionals report high levels of burnout',
    color: '#F59E0B',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 36 }} />,
    stat: '6 weeks',
    title: 'Average Wait Time',
    description: 'to see a mental health professional in many areas',
    color: '#EC4899',
  },
  {
    icon: <TrendingDownIcon sx={{ fontSize: 36 }} />,
    stat: '70%',
    title: 'Limited Follow-up',
    description: 'of clients receive no support between counseling sessions',
    color: '#8B5CF6',
  },
];

export default function ProblemSlide() {
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
          The Problem
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 650, mx: 'auto', fontSize: { xs: '0.95rem', md: '1.1rem' } }}
        >
          Mental healthcare is broken—counselors are overwhelmed, and clients lack support between sessions
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ maxWidth: 960, width: '100%' }}>
        {problems.map((problem, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: '100%',
                background: '#FFFFFF',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  border: `1px solid ${problem.color}50`,
                  boxShadow: `0 12px 30px ${problem.color}18`,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 2.5, px: 2 }}>
                <Box
                  sx={{
                    mb: 1,
                    color: problem.color,
                  }}
                >
                  {problem.icon}
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: problem.color,
                    mb: 0.5,
                  }}
                >
                  {problem.stat}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 0.5, fontWeight: 600, fontSize: '0.9rem' }}
                >
                  {problem.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
                >
                  {problem.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          mt: 4,
          py: 1.5,
          px: 3,
          borderRadius: 2,
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
        }}
      >
        <WarningAmberIcon sx={{ color: '#EF4444' }} />
        <Typography variant="body1" sx={{ color: '#DC2626' }}>
          Without intervention, mental health outcomes continue to decline
        </Typography>
      </Stack>
    </SlideLayout>
  );
}
