'use client';

import {
  Box,
  Paper,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { ACTION_BARS, getActionBar } from '../../lib/actions';
import { useUIStore, useUserStore, useQuestStore } from '../../store';
import type { Action } from '../../types';

export function ActionBar() {
  const activeBarId = useUIStore((s) => s.activeActionBar);
  const setActiveBar = useUIStore((s) => s.setActiveActionBar);
  const cooldowns = useUIStore((s) => s.cooldowns);
  const setCooldown = useUIStore((s) => s.setCooldown);
  const user = useUserStore((s) => s.user);
  const spendCoins = useUserStore((s) => s.spendCoins);
  const updateProgress = useQuestStore((s) => s.updateProgress);
  
  const [actionResult, setActionResult] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const activeBar = getActionBar(activeBarId);

  const handleAction = async (action: Action) => {
    // Check cooldown
    const cooldownEnd = cooldowns[action.id];
    if (cooldownEnd && Date.now() < cooldownEnd) {
      setActionResult({ message: 'Action is on cooldown!', type: 'error' });
      return;
    }

    // Check and spend resources
    if (action.resourceCost > 0) {
      const success = spendCoins(action.resourceCost);
      if (!success) {
        setActionResult({ message: 'Not enough coins!', type: 'error' });
        return;
      }
    }

    // Set cooldown
    if (action.cooldownMs > 0) {
      setCooldown(action.id, Date.now() + action.cooldownMs);
    }

    // Update quest progress
    updateProgress('q2', 1);

    // Simulate AI action (in real app, this would call the backend)
    setActionResult({ 
      message: `🎯 ${action.name}: ${action.description}`, 
      type: 'success' 
    });
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        p: 1,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 4,
        zIndex: 1000,
        maxWidth: 'calc(100vw - 300px)',
      }}
      elevation={8}
    >
      {/* Bar Selector Tabs */}
      <Tabs
        value={activeBarId}
        onChange={(_, newValue) => setActiveBar(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 36,
          '& .MuiTab-root': {
            minHeight: 36,
            minWidth: 'auto',
            px: 1.5,
          },
        }}
      >
        {ACTION_BARS.map((bar) => (
          <Tab
            key={bar.id}
            value={bar.id}
            label={
              <Tooltip title={bar.name}>
                <span>{bar.icon}</span>
              </Tooltip>
            }
          />
        ))}
      </Tabs>

      {/* Actions */}
      {activeBar && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {activeBar.name} Actions
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            {activeBar.actions.map((action) => (
              <ActionButton
                key={action.id}
                action={action}
                cooldownEnd={cooldowns[action.id]}
                coins={user?.coins ?? 0}
                onClick={() => handleAction(action)}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Action Result Snackbar */}
      <Snackbar
        open={!!actionResult}
        autoHideDuration={3000}
        onClose={() => setActionResult(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={actionResult?.type || 'info'}
          onClose={() => setActionResult(null)}
          sx={{ width: '100%' }}
        >
          {actionResult?.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

// === ACTION BUTTON ===

interface ActionButtonProps {
  action: Action;
  cooldownEnd?: number;
  coins: number;
  onClick: () => void;
}

function ActionButton({ action, cooldownEnd, coins, onClick }: ActionButtonProps) {
  const [cooldownProgress, setCooldownProgress] = useState(0);
  const [remainingMs, setRemainingMs] = useState(0);

  // Update cooldown progress
  useEffect(() => {
    if (!cooldownEnd) {
      setCooldownProgress(0);
      setRemainingMs(0);
      return;
    }

    const updateCooldown = () => {
      const now = Date.now();
      const remaining = Math.max(0, cooldownEnd - now);
      const total = action.cooldownMs;
      const progress = ((total - remaining) / total) * 100;
      
      setCooldownProgress(Math.min(100, progress));
      setRemainingMs(remaining);
    };

    updateCooldown();
    const interval = setInterval(updateCooldown, 100);
    return () => clearInterval(interval);
  }, [cooldownEnd, action.cooldownMs]);

  const isOnCooldown = remainingMs > 0;
  const canAfford = coins >= action.resourceCost;
  const isDisabled = isOnCooldown || !canAfford;

  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {action.name}
          </Typography>
          <Typography variant="caption">{action.description}</Typography>
          {action.resourceCost > 0 && (
            <Typography variant="caption" display="block" color="warning.light">
              Cost: {action.resourceCost} 🪙
            </Typography>
          )}
          {action.cooldownMs > 0 && (
            <Typography variant="caption" display="block">
              Cooldown: {action.cooldownMs / 1000}s
            </Typography>
          )}
        </Box>
      }
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClick}
          disabled={isDisabled}
          sx={{
            width: 48,
            height: 48,
            bgcolor: isOnCooldown ? 'action.disabled' : 'action.hover',
            borderRadius: 2,
            fontSize: 20,
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              bgcolor: 'action.selected',
            },
          }}
        >
          {action.icon}
          
          {/* Cooldown overlay */}
          {isOnCooldown && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                bgcolor: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" fontWeight={600}>
                {Math.ceil(remainingMs / 1000)}
              </Typography>
            </Box>
          )}
        </IconButton>

        {/* Cost badge */}
        {action.resourceCost > 0 && (
          <Chip
            label={action.resourceCost}
            size="small"
            sx={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              height: 16,
              fontSize: 10,
              bgcolor: canAfford ? 'warning.dark' : 'error.dark',
              '& .MuiChip-label': { px: 0.5 },
            }}
          />
        )}

        {/* Cooldown progress bar */}
        {isOnCooldown && (
          <LinearProgress
            variant="determinate"
            value={cooldownProgress}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              borderRadius: '0 0 8px 8px',
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
}
