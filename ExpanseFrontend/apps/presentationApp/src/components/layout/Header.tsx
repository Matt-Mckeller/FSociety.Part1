'use client';

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import BackpackIcon from '@mui/icons-material/Backpack';
import { useUserStore, useUIStore } from '../../store';

export function Header() {
  const user = useUserStore((s) => s.user);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  if (!user) return null;

  const xpProgress = (user.xp % 1000) / 10; // Progress to next level (0-100)

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
      elevation={0}
    >
      <Toolbar sx={{ gap: 2 }}>
        {/* Menu toggle */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleSidebar}
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #90caf9, #ce93d8)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Expanse EDU
        </Typography>

        <Box sx={{ flex: 1 }} />

        {/* XP Bar */}
        <Tooltip title={`${user.xp} XP (Level ${user.level})`}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 150 }}>
            <Typography variant="caption" color="text.secondary">
              Lv.{user.level}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={xpProgress}
              sx={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'success.main',
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </Tooltip>

        {/* Coins */}
        <Chip
          icon={<span style={{ fontSize: 16 }}>🪙</span>}
          label={user.coins}
          size="small"
          sx={{
            bgcolor: 'action.hover',
            fontWeight: 600,
          }}
        />

        {/* Inventory */}
        <Tooltip title="Inventory">
          <IconButton color="inherit" size="small">
            <BackpackIcon />
          </IconButton>
        </Tooltip>

        {/* Settings */}
        <Tooltip title="Settings">
          <IconButton color="inherit" size="small">
            <SettingsIcon />
          </IconButton>
        </Tooltip>

        {/* Profile */}
        <Tooltip title={user.displayName}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: 14,
            }}
          >
            {user.displayName.charAt(0)}
          </Avatar>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
