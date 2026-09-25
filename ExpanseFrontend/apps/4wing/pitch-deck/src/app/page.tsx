'use client';

import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Box, Typography, Chip, IconButton, Stack, Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import slides
import {
  TitleSlide,
  ProblemSlide,
  SolutionSlide,
  HowItWorksSlide,
  FeaturesSlide,
  RobotSlide,
  TechnologySlide,
  MarketSlide,
  BusinessModelSlide,
  TeamSlide,
  CompetitiveSlide,
  CTASlide,
} from '@/components/slides';

const slides = [
  { component: TitleSlide, title: 'Title' },
  { component: ProblemSlide, title: 'Problem' },
  { component: SolutionSlide, title: 'Solution' },
  { component: HowItWorksSlide, title: 'How It Works' },
  { component: FeaturesSlide, title: 'Features' },
  { component: RobotSlide, title: 'Robot' },
  { component: TechnologySlide, title: 'Technology' },
  { component: MarketSlide, title: 'Market' },
  { component: BusinessModelSlide, title: 'Business Model' },
  { component: CompetitiveSlide, title: 'Competitive' },
  { component: TeamSlide, title: 'Team' },
  { component: CTASlide, title: 'The Ask' },
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isAutoplay) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsAutoplay(!isAutoplay);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Header with slide counter */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Chip
          label="4wings"
          sx={{
            background: 'rgba(124, 58, 237, 0.12)',
            border: '1px solid rgba(124, 58, 237, 0.25)',
            color: 'primary.dark',
            fontWeight: 600,
          }}
        />
      </Box>

      {/* Slide counter */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 120,
          zIndex: 100,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontFamily: 'monospace',
          }}
        >
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </Typography>
      </Box>

      {/* Autoplay toggle */}
      <Tooltip title={isAutoplay ? 'Stop autoplay' : 'Start autoplay (8s)'}>
        <IconButton
          onClick={toggleAutoplay}
          sx={{
            position: 'fixed',
            top: 14,
            right: 60,
            zIndex: 100,
            color: isAutoplay ? 'primary.main' : 'text.secondary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {isAutoplay ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Tooltip>

      {/* Fullscreen toggle */}
      <IconButton
        onClick={toggleFullscreen}
        sx={{
          position: 'fixed',
          top: 14,
          right: 20,
          zIndex: 100,
          color: 'text.secondary',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Mousewheel, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        mousewheel={{ sensitivity: 1 }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={600}
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // Start with autoplay disabled
          swiper.autoplay.stop();
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        style={{ height: '100%' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <slide.component />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Keyboard hint */}
      <Box className="keyboard-hint">
        <Box className="key">←</Box>
        <Box className="key">→</Box>
      </Box>

      {/* Slide title indicator */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 80,
          left: 30,
          zIndex: 100,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontSize: '0.7rem',
          }}
        >
          {slides[currentSlide]?.title}
        </Typography>
      </Box>
    </Box>
  );
}
