'use client';

import { Box, Typography, IconButton, Tooltip, Chip, LinearProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LockIcon from '@mui/icons-material/Lock';
import { PyramidLayout } from './pyramid';
import { useUserStore, useUIStore, usePresentationStore } from '../../store';
import type { PyramidLayoutProps } from './pyramid';

interface PyramidAppShellProps extends Omit<PyramidLayoutProps, 'slots'> {
  /** Main content */
  children: React.ReactNode;
}

/**
 * Header content for the outer layer top slot
 */
function PyramidHeader() {
  const user = useUserStore((s) => s.user);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  if (!user) return null;

  const xpProgress = (user.xp % 1000) / 10;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        px: 2,
        color: 'white',
      }}
    >
      {/* Left: Menu + Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" sx={{ color: 'white' }} onClick={toggleSidebar}>
          <MenuIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #ffffff, #e0e0e0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Expanse EDU
        </Typography>
      </Box>

      {/* Center: XP Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem' }}>
          Lv.{user.level}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={xpProgress}
          sx={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.2)',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'white',
              borderRadius: 2,
            },
          }}
        />
      </Box>

      {/* Right: Coins + Settings */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          icon={<span style={{ fontSize: 12 }}>🪙</span>}
          label={user.coins}
          size="small"
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontSize: '0.7rem',
            height: 22,
          }}
        />
        <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <SettingsIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

/**
 * Left navigation for slide list
 */
function PyramidLeftNav() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const { slides, currentSlideIndex, completedSlides, goToSlide } = usePresentationStore();
  const user = useUserStore((s) => s.user);
  const userLevel = user?.level ?? 1;

  if (!sidebarOpen) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        p: 0.5,
        overflow: 'auto',
        height: '100%',
        color: 'white',
      }}
    >
      {slides.slice(0, 5).map((slide, index) => {
        const isLocked = slide.unlockLevel > userLevel;
        const isComplete = completedSlides.has(slide.id);
        const isCurrent = index === currentSlideIndex;

        return (
          <Tooltip key={slide.id} title={slide.name} placement="right">
            <IconButton
              size="small"
              onClick={() => !isLocked && goToSlide(index)}
              sx={{
                color: isCurrent ? 'white' : 'rgba(255,255,255,0.6)',
                bgcolor: isCurrent ? 'rgba(255,255,255,0.2)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)',
                },
              }}
            >
              {isLocked ? (
                <LockIcon fontSize="small" />
              ) : isComplete ? (
                <CheckCircleIcon fontSize="small" />
              ) : (
                <RadioButtonUncheckedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
}

/**
 * Action bar for the middle layer top slot
 */
function PyramidActionBar() {
  const { prevSlide, nextSlide, currentSlideIndex, slides } = usePresentationStore();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        height: '100%',
        color: 'white',
      }}
    >
      <IconButton
        size="small"
        onClick={prevSlide}
        disabled={currentSlideIndex === 0}
        sx={{ color: 'white', '&:disabled': { color: 'rgba(255,255,255,0.3)' } }}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', minWidth: 40, textAlign: 'center' }}>
        {currentSlideIndex + 1} / {slides.length || 1}
      </Typography>

      <IconButton
        size="small"
        onClick={nextSlide}
        disabled={currentSlideIndex >= slides.length - 1}
        sx={{ color: 'white', '&:disabled': { color: 'rgba(255,255,255,0.3)' } }}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>

      <Box sx={{ mx: 1, height: 16, borderLeft: '1px solid rgba(255,255,255,0.3)' }} />

      <Tooltip title="Play">
        <IconButton size="small" sx={{ color: 'white' }}>
          <PlayArrowIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share">
        <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

/**
 * Status bar for the middle layer bottom slot
 */
function PyramidStatusBar() {
  const togglePanel = useUIStore((s) => s.togglePanel);
  const panels = useUIStore((s) => s.panels);
  const { completedSlides, slides } = usePresentationStore();

  const progress = slides.length > 0 ? Math.round((completedSlides.size / slides.length) * 100) : 0;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        px: 2,
        color: 'white',
      }}
    >
      {/* Left: Progress */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem' }}>
          Progress: {progress}%
        </Typography>
      </Box>

      {/* Right: Panel toggles */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Chat">
          <IconButton
            size="small"
            onClick={() => togglePanel('chat')}
            sx={{
              color: panels.chat?.isOpen ? 'white' : 'rgba(255,255,255,0.6)',
            }}
          >
            <ChatIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Quests">
          <IconButton
            size="small"
            onClick={() => togglePanel('quests')}
            sx={{
              color: panels.quests?.isOpen ? 'white' : 'rgba(255,255,255,0.6)',
            }}
          >
            <AssignmentIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

/**
 * PyramidAppShell - Application shell using the PyramidLayout
 * 
 * Integrates the 3-layer pyramid layout with navigation, actions, and status areas.
 */
export function PyramidAppShell({ children, ...layoutProps }: PyramidAppShellProps) {
  return (
    <PyramidLayout
      {...layoutProps}
      slots={{
        header: <PyramidHeader />,
        leftNav: <PyramidLeftNav />,
        actionBar: <PyramidActionBar />,
        statusBar: <PyramidStatusBar />,
      }}
      corners={{
        show: true,
        size: 'medium',
        borderRadius: 12,
        animated: true,
      }}
      elevation="subtle"
    >
      {children}
    </PyramidLayout>
  );
}

export default PyramidAppShell;
