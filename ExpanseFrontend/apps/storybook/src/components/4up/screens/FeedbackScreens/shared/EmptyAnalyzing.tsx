import { Box, LinearProgress, Typography } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { feedbackColors } from '../constants';

interface EmptyAnalyzingProps {
  mode: 'analyzing' | 'empty';
  message?: string;
}

export function EmptyAnalyzing({ mode, message }: EmptyAnalyzingProps) {
  if (mode === 'analyzing') {
    return (
      <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
        <HourglassTopIcon sx={{ color: feedbackColors.primary, fontSize: 32, mb: 1.5 }} />
        <Typography variant="subtitle1" fontWeight={600} color={feedbackColors.text.primary} sx={{ mb: 1 }}>
          Analyzing content…
        </Typography>
        <Typography variant="body2" color={feedbackColors.text.secondary} sx={{ mb: 2 }}>
          {message ?? 'Scoring goals, audience fit, platforms, tone, and tips.'}
        </Typography>
        <LinearProgress
          sx={{
            maxWidth: 240,
            mx: 'auto',
            borderRadius: 1,
            bgcolor: feedbackColors.border,
            '& .MuiLinearProgress-bar': { bgcolor: feedbackColors.primary },
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
      <InboxOutlinedIcon sx={{ color: feedbackColors.text.muted, fontSize: 32, mb: 1.5 }} />
      <Typography variant="subtitle1" fontWeight={600} color={feedbackColors.text.primary} sx={{ mb: 0.5 }}>
        No feedback yet
      </Typography>
      <Typography variant="body2" color={feedbackColors.text.secondary}>
        {message ?? 'Run analysis or enable feedback options to see results here.'}
      </Typography>
    </Box>
  );
}
