'use client';

import {
  Box,
  Tooltip,
  IconButton,
  Chip,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import { useSessionStore } from '../../store';
import type { FeedbackType } from '../../types';

interface ReactionButton {
  type: FeedbackType;
  icon: string;
  label: string;
}

const REACTIONS: ReactionButton[] = [
  { type: 'confused', icon: '😕', label: "I'm Confused" },
  { type: 'understand', icon: '✅', label: 'I Get It' },
  { type: 'slow-down', icon: '🐢', label: 'Slow Down' },
  { type: 'speed-up', icon: '🐇', label: 'Speed Up' },
  { type: 'like', icon: '❤️', label: 'Like' },
  { type: 'thumbs-up', icon: '👍', label: 'Thumbs Up' },
  { type: 'thumbs-down', icon: '👎', label: 'Thumbs Down' },
];

interface FeedbackInputBarProps {
  showAggregation?: boolean;
}

export function FeedbackInputBar({ showAggregation = false }: FeedbackInputBarProps) {
  const [lastReaction, setLastReaction] = useState<string | null>(null);
  const addReaction = useSessionStore((s) => s.addReaction);
  const reactions = useSessionStore((s) => s.reactions);

  const handleReaction = (type: FeedbackType, label: string) => {
    addReaction(type);
    setLastReaction(label);
    
    // Auto-hide snackbar
    setTimeout(() => setLastReaction(null), 2000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        p: 1,
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      {REACTIONS.map(({ type, icon, label }) => (
        <Tooltip key={type} title={label}>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={() => handleReaction(type, label)}
              sx={{
                fontSize: 20,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              {icon}
            </IconButton>
            
            {/* Aggregation badge (for presenter view) */}
            {showAggregation && reactions[type] > 0 && (
              <Chip
                label={reactions[type]}
                size="small"
                sx={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  height: 18,
                  fontSize: 10,
                  bgcolor: 'primary.main',
                  '& .MuiChip-label': { px: 0.5 },
                }}
              />
            )}
          </Box>
        </Tooltip>
      ))}

      {/* Reaction confirmation */}
      <Snackbar
        open={!!lastReaction}
        message={`Sent: ${lastReaction}`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}
