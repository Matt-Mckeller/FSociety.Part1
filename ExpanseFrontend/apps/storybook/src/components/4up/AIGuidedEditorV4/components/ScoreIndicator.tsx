import { Box, Typography } from '@mui/material';
import { lightColors, getScoreColor } from '../constants';

interface ScoreIndicatorProps {
  score: number;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export function ScoreIndicator({ 
  score, 
  label, 
  size = 'medium',
  showLabel = true,
}: ScoreIndicatorProps) {
  const sizeMap = {
    small: { container: 44, font: 'body2' as const },
    medium: { container: 60, font: 'h6' as const },
    large: { container: 80, font: 'h5' as const },
  };

  const { container, font } = sizeMap[size];
  const color = getScoreColor(score);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          width: container,
          height: container,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(${color} ${score * 3.6}deg, ${lightColors.border} 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <Box
            sx={{
              width: '78%',
              height: '78%',
              borderRadius: '50%',
              bgcolor: lightColors.paper,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant={font} fontWeight={700} color={lightColors.text.primary}>
              {score}
            </Typography>
          </Box>
        </Box>
      </Box>
      {showLabel && label && (
        <Typography 
          variant="caption" 
          sx={{ mt: 0.5, display: 'block', color: lightColors.text.secondary, fontWeight: 500 }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}
