'use client';

import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import SlideLayout from '../SlideLayout';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CloudIcon from '@mui/icons-material/Cloud';

const techStack = [
  {
    category: 'Frontend',
    icon: <CodeIcon />,
    color: '#3B82F6',
    items: ['Next.js', 'React', 'MUI', 'Apollo Client'],
  },
  {
    category: 'Backend',
    icon: <StorageIcon />,
    color: '#10B981',
    items: ['Nest.js', 'GraphQL', 'PostgreSQL', 'Redis'],
  },
  {
    category: 'AI / ML',
    icon: <PsychologyIcon />,
    color: '#8B5CF6',
    items: ['GPT-5 / Claude', 'Whisper v3', 'MediaPipe', 'Custom Models'],
  },
  {
    category: 'Infrastructure',
    icon: <CloudIcon />,
    color: '#EC4899',
    items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions'],
  },
];

export default function TechnologySlide() {
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
          Technology Stack
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}
        >
          Built with modern, scalable technologies
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ maxWidth: 960, mb: 3, width: '100%' }}>
        {techStack.map((stack, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: '100%',
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  border: `1px solid ${stack.color}50`,
                  boxShadow: `0 20px 40px ${stack.color}20`,
                },
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${stack.color}20`,
                    color: stack.color,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {stack.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {stack.category}
                </Typography>
                <Stack spacing={1}>
                  {stack.items.map((item, i) => (
                    <Chip
                      key={i}
                      label={item}
                      size="small"
                      sx={{
                        background: 'rgba(0, 0, 0, 0.04)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        color: 'text.primary',
                        fontSize: '0.8rem',
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Architecture diagram */}
      <Card
        sx={{
          maxWidth: 960,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(124, 58, 237, 0.15)',
          p: 2,
        }}
      >
        <Typography
          component="pre"
          sx={{
            fontFamily: 'monospace',
            fontSize: { xs: '0.6rem', md: '0.85rem' },
            color: 'text.primary',
            textAlign: 'center',
            lineHeight: 1.8,
            overflow: 'auto',
          }}
        >
{`┌─────────────┐                        ┌─────────────┐
│   Robot     │───────────────────────▶│   Backend   │
│ (mic + cam) │                        │  (Nest.js)  │
└─────────────┘                        └──────┬──────┘
                                              │ GraphQL
              ┌─────────────┐                 │
              │   App UI    │─────────────────┤
              │  (Next.js)  │                 │
              └─────────────┘                 │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
             ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
             │  Whisper    │           │  GPT-5 /    │           │  Database   │
             │   (STT)     │           │   Claude    │           │ (PostgreSQL)│
             └─────────────┘           └─────────────┘           └─────────────┘`}
        </Typography>
      </Card>
    </SlideLayout>
  );
}
