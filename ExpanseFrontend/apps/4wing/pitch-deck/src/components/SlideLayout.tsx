'use client';

import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

interface SlideLayoutProps {
  children: ReactNode;
  background?: 'default' | 'gradient' | 'dark' | 'accent';
  centered?: boolean;
  fullWidth?: boolean;
}

const backgrounds = {
  default: 'transparent',
  gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.04) 0%, rgba(236, 72, 153, 0.04) 100%)',
  dark: 'linear-gradient(180deg, #F3F4F6 0%, #E5E7EB 100%)',
  accent: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
};

export default function SlideLayout({
  children,
  background = 'default',
  centered = true,
  fullWidth = false,
}: SlideLayoutProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        justifyContent: 'center',
        background: backgrounds[background],
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, md: 5 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '-15%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth={fullWidth ? false : 'lg'}
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: centered ? 'center' : 'flex-start',
          justifyContent: 'center',
          height: '100%',
          maxHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 80px)' },
          overflow: 'hidden',
        }}
      >
        <Box className="slide-content" sx={{ 
          width: '100%', 
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: centered ? 'center' : 'flex-start',
        }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
