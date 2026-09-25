import { Box, Typography } from '@mui/material';
import { feedbackColors, getScoreColor } from '../constants';

interface ScoreRingProps {
  score: number;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const DIMENSIONS = {
  small: { outer: 44, inner: 36, fontSize: '0.75rem', labelSize: '0.65rem', stroke: 3 },
  medium: { outer: 64, inner: 52, fontSize: '1rem', labelSize: '0.7rem', stroke: 4 },
  large: { outer: 88, inner: 72, fontSize: '1.35rem', labelSize: '0.75rem', stroke: 5 },
};

export function ScoreRing({
  score,
  label,
  size = 'medium',
  showLabel = true,
}: ScoreRingProps) {
  const { outer, inner, fontSize, labelSize, stroke } = DIMENSIONS[size];
  const color = getScoreColor(score);
  const radius = inner / 2 - stroke;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{ position: 'relative', width: outer, height: outer }}>
        <svg width={outer} height={outer} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={outer / 2}
            cy={outer / 2}
            r={radius}
            fill="none"
            stroke={feedbackColors.border}
            strokeWidth={stroke}
          />
          <circle
            cx={outer / 2}
            cy={outer / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
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
        <Typography
          sx={{
            fontSize: labelSize,
            color: feedbackColors.text.secondary,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}
