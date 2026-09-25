'use client';

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Chip,
  Stack,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { ConfigurablePanel } from './ConfigurablePanel';
import { useQuestStore, useUIStore, useUserStore } from '../../store';

export function QuestPanel() {
  const panels = useUIStore((s) => s.panels);
  const togglePanel = useUIStore((s) => s.togglePanel);
  const quests = useQuestStore((s) => s.quests);
  const progress = useQuestStore((s) => s.progress);
  const addXp = useUserStore((s) => s.addXp);
  const addCoins = useUserStore((s) => s.addCoins);
  const completeQuest = useQuestStore((s) => s.completeQuest);

  const isOpen = panels.quests?.isOpen ?? false;

  const handleClaim = (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest) return;
    
    addXp(quest.rewardXp);
    addCoins(quest.rewardCoins);
    completeQuest(questId);
  };

  return (
    <ConfigurablePanel
      id="quests"
      title="🎯 Quests"
      position="right"
      isOpen={isOpen}
      onClose={() => togglePanel('quests')}
    >
      <List disablePadding>
        {quests.map((quest) => {
          const questProgress = progress.find((p) => p.questId === quest.id);
          const currentProgress = questProgress?.progress ?? 0;
          const isComplete = questProgress?.isComplete ?? false;
          const progressPercent = Math.min(
            100,
            (currentProgress / quest.criteria.target) * 100
          );
          const isReady = progressPercent >= 100 && !isComplete;

          return (
            <ListItem
              key={quest.id}
              sx={{
                flexDirection: 'column',
                alignItems: 'stretch',
                py: 2,
                px: 0,
                borderBottom: 1,
                borderColor: 'divider',
                opacity: isComplete ? 0.5 : 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                  {isComplete ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <RadioButtonUncheckedIcon color="action" fontSize="small" />
                  )}
                </ListItemIcon>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ textDecoration: isComplete ? 'line-through' : 'none' }}
                  >
                    {quest.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {quest.description}
                  </Typography>
                </Box>
              </Box>

              {/* Progress bar */}
              {!isComplete && (
                <Box sx={{ ml: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {currentProgress} / {quest.criteria.target}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                      <Chip
                        label={`+${quest.rewardXp} XP`}
                        size="small"
                        sx={{ height: 16, fontSize: 10 }}
                      />
                      <Chip
                        label={`+${quest.rewardCoins} 🪙`}
                        size="small"
                        sx={{ height: 16, fontSize: 10 }}
                      />
                    </Stack>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercent}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'action.hover',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: isReady ? 'success.main' : 'primary.main',
                      },
                    }}
                  />
                  
                  {/* Claim button */}
                  {isReady && (
                    <Chip
                      label="Claim Reward!"
                      color="success"
                      size="small"
                      onClick={() => handleClaim(quest.id)}
                      sx={{ mt: 1, cursor: 'pointer' }}
                    />
                  )}
                </Box>
              )}
            </ListItem>
          );
        })}
      </List>
    </ConfigurablePanel>
  );
}
