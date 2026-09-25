import { Box, Chip, Typography, Tooltip } from '@mui/material';
import { lightColors, CONTENT_INTENTS } from '../constants';
import type { ContentIntent } from '../types';

interface IntentSelectorProps {
  selectedIntent: ContentIntent | null;
  onSelectIntent: (intent: ContentIntent) => void;
  compact?: boolean;
}

export function IntentSelector({ selectedIntent, onSelectIntent, compact = false }: IntentSelectorProps) {
  return (
    <Box>
      {!compact && (
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: lightColors.text.primary, fontWeight: 600 }}>
          🎯 Content Intent
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
        {CONTENT_INTENTS.map((intent) => {
          const isSelected = selectedIntent === intent.id;
          return (
            <Tooltip key={intent.id} title={intent.description} arrow>
              <Chip
                icon={<Box sx={{ display: 'flex', color: 'inherit' }}>{intent.icon}</Box>}
                label={intent.label}
                onClick={() => onSelectIntent(intent.id)}
                size={compact ? 'small' : 'medium'}
                sx={{
                  cursor: 'pointer',
                  bgcolor: isSelected ? lightColors.primary : lightColors.paper,
                  color: isSelected ? 'white' : lightColors.text.primary,
                  border: `2px solid ${isSelected ? lightColors.primary : lightColors.border}`,
                  fontWeight: 500,
                  '& .MuiChip-icon': {
                    color: isSelected ? 'white' : lightColors.text.secondary,
                  },
                  '&:hover': {
                    bgcolor: isSelected ? lightColors.primaryHover : lightColors.paperHover,
                    borderColor: isSelected ? lightColors.primaryHover : lightColors.primary,
                  },
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
