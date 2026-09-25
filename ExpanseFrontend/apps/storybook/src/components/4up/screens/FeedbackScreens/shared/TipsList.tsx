import { Box, Chip, Stack, Typography, Button } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { feedbackColors, PRIORITY_COLORS } from '../constants';
import type { ImprovementTip } from '../types';

interface TipsListProps {
  tips: ImprovementTip[];
  maxItems?: number;
  title?: string;
  actionable?: boolean;
  dismissedIds?: string[];
  onApply?: (tip: ImprovementTip) => void;
  onDismiss?: (tip: ImprovementTip) => void;
}

export function TipsList({
  tips,
  maxItems = 6,
  title = 'Improvement tips',
  actionable = false,
  dismissedIds = [],
  onApply,
  onDismiss,
}: TipsListProps) {
  const items = tips.filter((t) => !dismissedIds.includes(t.id)).slice(0, maxItems);

  if (items.length === 0) {
    return (
      <Box>
        <Typography variant="subtitle2" fontWeight={700} color={feedbackColors.text.primary} sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color={feedbackColors.text.secondary}>
          No improvement tips right now.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="subtitle2" fontWeight={700} color={feedbackColors.text.primary} sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Stack spacing={1}>
        {items.map((tip) => (
          <Box
            key={tip.id}
            sx={{
              p: actionable ? 1.5 : 0,
              borderRadius: actionable ? 1.5 : 0,
              border: actionable ? `1px solid ${feedbackColors.border}` : 'none',
              bgcolor: actionable ? feedbackColors.paper : 'transparent',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <LightbulbOutlinedIcon
                sx={{ color: PRIORITY_COLORS[tip.priority], fontSize: 18, mt: 0.15 }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" color={feedbackColors.text.primary}>
                  {tip.text}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.75, mt: 0.75, flexWrap: 'wrap' }}>
                  <Chip
                    label={tip.priority}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      bgcolor: `${PRIORITY_COLORS[tip.priority]}18`,
                      color: PRIORITY_COLORS[tip.priority],
                    }}
                  />
                  <Chip
                    label={tip.source}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.65rem',
                      textTransform: 'capitalize',
                      bgcolor: feedbackColors.paperHover,
                      color: feedbackColors.text.secondary,
                    }}
                  />
                </Box>
                {actionable && (
                  <Box sx={{ display: 'flex', gap: 1, mt: 1.25 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => onApply?.(tip)}
                      sx={{
                        textTransform: 'none',
                        bgcolor: feedbackColors.primary,
                        '&:hover': { bgcolor: feedbackColors.primaryHover },
                        boxShadow: 'none',
                      }}
                    >
                      Apply
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => onDismiss?.(tip)}
                      sx={{ textTransform: 'none', color: feedbackColors.text.secondary }}
                    >
                      Dismiss
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
