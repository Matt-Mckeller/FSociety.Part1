'use client';

import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

export interface SocialAuthDividerProps {
  /** Text to display (legacy mode without children) */
  text?: string;
  /** Children to wrap with divider lines on either side */
  children?: React.ReactNode;
}

/**
 * Divider component for social auth section
 * 
 * Without children: Displays ————— or —————
 * With children: Displays ————— [children] —————
 */
export function SocialAuthDivider({ text = 'or', children }: SocialAuthDividerProps) {
  // New mode: wrap children with divider lines on either side
  if (children) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: '100%',
          my: 4
        }}>
        <Divider sx={{ flex: 1 }} />
        {children}
        <Divider sx={{ flex: 1 }} />
      </Box>
    );
  }

  // Legacy mode: text divider
  return (
    <Divider sx={{ my: 3 }}>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          px: 2,
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: 0.5
        }}>
        {text}
      </Typography>
    </Divider>
  );
}
