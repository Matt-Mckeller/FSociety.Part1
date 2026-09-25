import { Box, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { feedbackColors } from '../constants';

interface StrengthsListProps {
  strengths: string[];
  maxItems?: number;
  title?: string;
}

export function StrengthsList({
  strengths,
  maxItems = 5,
  title = 'Strengths',
}: StrengthsListProps) {
  const items = strengths.slice(0, maxItems);

  if (items.length === 0) return null;

  return (
    <Box>
      <Typography
        variant="subtitle2"
        fontWeight={700}
        color={feedbackColors.text.primary}
        sx={{ mb: 1 }}
      >
        {title}
      </Typography>
      <Stack spacing={0.85}>
        {items.map((strength) => (
          <Box key={strength} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <CheckCircleIcon sx={{ color: feedbackColors.success, fontSize: 16, mt: 0.25 }} />
            <Typography variant="body2" color={feedbackColors.text.primary}>
              {strength}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
