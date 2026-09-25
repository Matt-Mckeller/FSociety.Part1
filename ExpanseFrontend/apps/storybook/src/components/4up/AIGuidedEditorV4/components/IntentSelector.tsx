import { Box, Typography, Chip } from '@mui/material';
import { CONTENT_INTENTS, lightColors } from '../constants';
import type { ContentIntent, IntentScores } from '../types';

interface IntentSelectorProps {
  selectedIntent: ContentIntent | null;
  intentScores: IntentScores[];
  onSelectIntent: (intent: ContentIntent) => void;
}

export function IntentSelector({
  selectedIntent,
  intentScores,
  onSelectIntent,
}: IntentSelectorProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5, color: lightColors.text.primary, fontWeight: 600 }}>
        Content Intent
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {CONTENT_INTENTS.map((intent) => {
          const isSelected = selectedIntent === intent.id;
          const scoreData = intentScores.find((s) => s.intent === intent.id);
          return (
            <Chip
              key={intent.id}
              icon={intent.icon as React.ReactElement}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {intent.label}
                  {scoreData && (
                    <Box
                      component="span"
                      sx={{
                        ml: 0.5,
                        px: 0.75,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        bgcolor: isSelected ? 'rgba(255,255,255,0.25)' : `${intent.color}22`,
                        color: isSelected ? 'inherit' : intent.color,
                      }}
                    >
                      {scoreData.score}
                    </Box>
                  )}
                </Box>
              }
              onClick={() => onSelectIntent(intent.id)}
              sx={{
                cursor: 'pointer',
                bgcolor: isSelected ? intent.color : lightColors.paper,
                color: isSelected ? '#fff' : lightColors.text.primary,
                border: `2px solid ${isSelected ? intent.color : lightColors.border}`,
                fontWeight: 500,
                '&:hover': {
                  bgcolor: isSelected ? intent.color : lightColors.paperHover,
                  borderColor: intent.color,
                },
                '& .MuiChip-icon': {
                  color: isSelected ? '#fff' : intent.color,
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
