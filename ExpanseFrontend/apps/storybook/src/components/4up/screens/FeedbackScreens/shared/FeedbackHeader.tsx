import type { ReactNode } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { feedbackColors } from '../constants';
import type { FeedbackScreenStatus } from '../types';

interface FeedbackHeaderProps {
  title: string;
  subtitle?: string;
  status?: FeedbackScreenStatus;
  endAdornment?: ReactNode;
}

export function FeedbackHeader({
  title,
  subtitle,
  status = 'ready',
  endAdornment,
}: FeedbackHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2,
        mb: 2.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
        <AutoAwesomeIcon sx={{ color: feedbackColors.primary, mt: 0.35 }} />
        <Box>
          <Typography variant="h6" fontWeight={700} color={feedbackColors.text.primary} sx={{ lineHeight: 1.2 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color={feedbackColors.text.secondary} sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        {status === 'analyzing' && (
          <Chip
            label="Analyzing…"
            size="small"
            sx={{
              bgcolor: feedbackColors.primaryLight,
              color: feedbackColors.primary,
              fontWeight: 600,
            }}
          />
        )}
        {endAdornment}
      </Box>
    </Box>
  );
}
