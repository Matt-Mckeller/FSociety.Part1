'use client';

import { Box } from '@mui/material';
import Character, { CharacterConfig, defaultCharacterConfig } from './Character';

export interface LogoConfig {
  // Character
  characterConfig: CharacterConfig;
  characterScale: number;
  
  // Text
  showText: boolean;
  textColor: string;
  textSize: number;
  textWeight: number;
  textSpacing: number;
  
  // Layout
  layout: 'horizontal' | 'vertical' | 'icon-only';
  gap: number;
  
  // Tagline
  showTagline: boolean;
  taglineText: string;
  taglineColor: string;
  taglineSize: number;
  
  // Background
  showBackground: boolean;
  backgroundColor: string;
  backgroundRadius: number;
  backgroundPadding: number;
}

export const defaultLogoConfig: LogoConfig = {
  characterConfig: {
    ...defaultCharacterConfig,
    bodyWidth: 120,
    bodyHeight: 140,
    eyeSize: 24,
    eyeSpacing: 32,
    pupilSize: 10,
    smileWidth: 30,
    smileHeight: 12,
    wingSize: 35,
    showAntenna: true,
  },
  characterScale: 1,
  
  showText: true,
  textColor: '#111827',
  textSize: 48,
  textWeight: 800,
  textSpacing: -2,
  
  layout: 'horizontal',
  gap: 20,
  
  showTagline: true,
  taglineText: 'Counsellor Support',
  taglineColor: '#4B5563',
  taglineSize: 14,
  
  showBackground: false,
  backgroundColor: '#FFFFFF',
  backgroundRadius: 24,
  backgroundPadding: 32,
};

interface LogoProps {
  config: LogoConfig;
}

export default function Logo({ config }: LogoProps) {
  const {
    characterConfig,
    characterScale,
    showText,
    textColor,
    textSize,
    textWeight,
    textSpacing,
    layout,
    gap,
    showTagline,
    taglineText,
    taglineColor,
    taglineSize,
    showBackground,
    backgroundColor,
    backgroundRadius,
    backgroundPadding,
  } = config;

  const isVertical = layout === 'vertical';
  const isIconOnly = layout === 'icon-only';

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        gap: `${gap}px`,
      }}
    >
      {/* Character */}
      <Character 
        config={characterConfig} 
        scale={characterScale} 
      />

      {/* Text */}
      {showText && !isIconOnly && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isVertical ? 'center' : 'flex-start',
            gap: '4px',
          }}
        >
          {/* Main Logo Text */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              fontFamily: '"Inter", sans-serif',
              fontWeight: textWeight,
              fontSize: `${textSize}px`,
              letterSpacing: `${textSpacing}px`,
              color: textColor,
              lineHeight: 1,
            }}
          >
            {/* The "4" with gradient */}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              4
            </Box>
            <Box component="span">wings</Box>
          </Box>

          {/* Tagline */}
          {showTagline && (
            <Box
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: `${taglineSize}px`,
                color: taglineColor,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              {taglineText}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );

  if (showBackground) {
    return (
      <Box
        sx={{
          backgroundColor,
          borderRadius: `${backgroundRadius}px`,
          padding: `${backgroundPadding}px`,
          display: 'inline-flex',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
}
