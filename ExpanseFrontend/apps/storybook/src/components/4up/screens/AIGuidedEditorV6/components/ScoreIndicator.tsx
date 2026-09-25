import { Box, Typography } from '@mui/material';
import { lightColors, getScoreColor } from '../constants';

interface ScoreIndicatorProps {
  score: number;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export function ScoreIndicator({ score, label, size = 'medium', showLabel = true }: ScoreIndicatorProps) {
  const dimensions = {
    small: { outer: 44, inner: 36, fontSize: '0.75rem', labelSize: '0.65rem' },
    medium: { outer: 64, inner: 52, fontSize: '1rem', labelSize: '0.7rem' },
    large: { outer: 84, inner: 68, fontSize: '1.25rem', labelSize: '0.75rem' },
  };
  
  const { outer, inner, fontSize, labelSize } = dimensions[size];
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * (inner / 2 - 3);
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{ position: 'relative', width: outer, height: outer }}>
        <svg width={outer} height={outer} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={outer / 2}
            cy={outer / 2}
            r={inner / 2 - 3}
            fill="none"
            stroke={lightColors.border}
            strokeWidth={size === 'small' ? 3 : 4}
          />
          <circle
            cx={outer / 2}
            cy={outer / 2}
            r={inner / 2 - 3}
            fill="none"
            stroke={color}
            strokeWidth={size === 'small' ? 3 : 4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize, fontWeight: 700, color, lineHeight: 1 }}>
            {score}
          </Typography>
        </Box>
      </Box>
      {showLabel && label && (
        <Typography sx={{ fontSize: labelSize, color: lightColors.text.secondary, fontWeight: 500 }}>
          {label}
        </Typography>
      )}
    </Box>
  );
}
