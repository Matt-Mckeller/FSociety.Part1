'use client';

import { useEffect } from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, CardActions } from '@mui/material';
import { AppShell, SlideRenderer, ActionBar, QuestPanel, ChatPanel } from '../components';
import { FeedbackInputBar } from '../components/feedback';
import { usePresentationStore } from '../store';
import { MOCK_PRESENTATIONS, getSlidesForPresentation } from '../lib/mockData';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Home() {
  const { presentation, setPresentation } = usePresentationStore();

  // Load intro presentation by default
  const loadPresentation = (id: string) => {
    const pres = MOCK_PRESENTATIONS.find((p) => p.id === id);
    if (pres) {
      const slides = getSlidesForPresentation(id);
      setPresentation(pres, slides);
    }
  };

  // If presentation is loaded, show the presentation view
  if (presentation) {
    return (
      <AppShell>
        <SlideRenderer />
        <ActionBar />
        <QuestPanel />
        <ChatPanel />
        <Box
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 16,
            zIndex: 1100,
          }}
        >
          <FeedbackInputBar />
        </Box>
      </AppShell>
    );
  }

  // Landing page - show available presentations
  return (
    <AppShell>
      <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Welcome to Expanse EDU
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          A gamified learning platform with AI-powered presentation
        </Typography>

        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          Available Presentations
        </Typography>

        <Stack spacing={2}>
          {MOCK_PRESENTATIONS.map((pres) => (
            <Card key={pres.id} sx={{ bgcolor: 'background.paper' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {pres.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pres.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {pres.slideIds.length} slides
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => loadPresentation(pres.id)}
                >
                  Start Learning
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MenuBookIcon />}
                  href="/docs"
                >
                  View Documentation
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Box>
    </AppShell>
  );
}
