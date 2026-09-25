'use client';

import { Box, Paper, Typography, Fade, IconButton, Chip, Stack } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ContentBlockRenderer } from './ContentBlock';
import { usePresentationStore, useUserStore, useQuestStore } from '../../store';
import { getBlocksForSlide } from '../../lib/mockData';
import { useEffect } from 'react';

export function SlideRenderer() {
  const { slides, currentSlideIndex, nextSlide, prevSlide, markSlideComplete } =
    usePresentationStore();
  const user = useUserStore((s) => s.user);
  const addXp = useUserStore((s) => s.addXp);
  const updateProgress = useQuestStore((s) => s.updateProgress);

  const currentSlide = slides[currentSlideIndex];

  // Mark slide as viewed and update quest progress
  useEffect(() => {
    if (currentSlide) {
      markSlideComplete(currentSlide.id);
      addXp(10); // XP for viewing slide
      updateProgress('q1', 1); // Update "View slides" quest
    }
  }, [currentSlide?.id]);

  if (!currentSlide) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography color="text.secondary">No slides loaded</Typography>
      </Box>
    );
  }

  const blocks = getBlocksForSlide(currentSlide.id);
  const isLocked = currentSlide.unlockLevel > (user?.level ?? 1);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* Slide header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight={600}>
          {currentSlide.name}
        </Typography>
        <Chip
          label={`${currentSlideIndex + 1} / ${slides.length}`}
          size="small"
          variant="outlined"
        />
      </Stack>

      {/* Slide content */}
      <Fade in key={currentSlide.id}>
        <Paper
          sx={{
            p: 4,
            minHeight: 400,
            bgcolor: 'background.paper',
          }}
          elevation={0}
        >
          {isLocked ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
                gap: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                🔒 Locked
              </Typography>
              <Typography color="text.secondary">
                Reach level {currentSlide.unlockLevel} to unlock this slide
              </Typography>
            </Box>
          ) : (
            <Stack spacing={4}>
              {blocks.map((block) => (
                <ContentBlockRenderer key={block.id} block={block} />
              ))}
            </Stack>
          )}
        </Paper>
      </Fade>

      {/* Navigation */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        <IconButton
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          sx={{
            bgcolor: 'action.hover',
            '&:hover': { bgcolor: 'action.selected' },
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {slides.map((_, idx) => (
            <Box
              key={idx}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: idx === currentSlideIndex ? 'primary.main' : 'action.hover',
                transition: 'background-color 0.2s',
              }}
            />
          ))}
        </Box>

        <IconButton
          onClick={nextSlide}
          disabled={currentSlideIndex === slides.length - 1}
          sx={{
            bgcolor: 'action.hover',
            '&:hover': { bgcolor: 'action.selected' },
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
