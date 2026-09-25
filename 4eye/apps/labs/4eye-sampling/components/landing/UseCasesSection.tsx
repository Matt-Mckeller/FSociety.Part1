'use client';

import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { SchoolOutlined, BusinessOutlined, ChurchOutlined, PersonOutlined } from '@mui/icons-material';

const useCases = [
  {
    icon: SchoolOutlined,
    title: 'Education',
    description:
      'Lectures, classrooms, tutoring — with auto-generated quizzes, study guides, and comprehension checks.',
    color: '#4285f4',
  },
  {
    icon: BusinessOutlined,
    title: 'Professional',
    description:
      'Conferences, training, meetings — with action items, key decisions, and follow-up reminders.',
    color: '#1E88E5',
  },
  {
    icon: ChurchOutlined,
    title: 'Religious',
    description:
      'Sermons, study groups, religious education — with cross-faith comparison and scripture references.',
    color: '#1976D2',
  },
  {
    icon: PersonOutlined,
    title: 'Personal Learning',
    description:
      'Podcasts, videos, self-study — build your knowledge base and track your learning journey.',
    color: '#90CAF9',
  },
];

export function UseCasesSection() {
  return (
    <Box
      id="use-cases"
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
          Built for Every Learning Context
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
          From classrooms to boardrooms, 4eye adapts to how you learn.
        </Typography>

        <Grid container spacing={4}>
          {useCases.map((useCase) => (
            <Grid size={{ zero: 12, tablet: 6 }} key={useCase.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 3,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    bgcolor: useCase.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <useCase.icon sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="h5" gutterBottom sx={{
                    fontWeight: 600
                  }}>
                    {useCase.title}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: "text.secondary"
                  }}>
                    {useCase.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
