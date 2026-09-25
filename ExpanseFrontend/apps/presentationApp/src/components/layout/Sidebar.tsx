'use client';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LockIcon from '@mui/icons-material/Lock';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { usePresentationStore, useUserStore, useUIStore } from '../../store';
import type { Slide } from '../../types';

export function Sidebar() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const togglePanel = useUIStore((s) => s.togglePanel);
  const panels = useUIStore((s) => s.panels);
  const { slides, currentSlideIndex, completedSlides, goToSlide } =
    usePresentationStore();
  const user = useUserStore((s) => s.user);

  const userLevel = user?.level ?? 1;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 240 : 60,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          top: 64, // Below header
          height: 'calc(100% - 64px)',
          transition: 'width 0.2s',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Slide Navigation */}
      {sidebarOpen && (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            SLIDES
          </Typography>
        </Box>
      )}

      <List sx={{ flex: 1, overflow: 'auto' }}>
        {slides.map((slide, index) => {
          const isLocked = slide.unlockLevel > userLevel;
          const isComplete = completedSlides.has(slide.id);
          const isCurrent = index === currentSlideIndex;

          return (
            <SlideItem
              key={slide.id}
              slide={slide}
              index={index}
              isLocked={isLocked}
              isComplete={isComplete}
              isCurrent={isCurrent}
              collapsed={!sidebarOpen}
              onClick={() => !isLocked && goToSlide(index)}
            />
          );
        })}
      </List>

      <Divider />

      {/* Panel Toggles */}
      <Box sx={{ p: 1 }}>
        <Tooltip title="Chat" placement="right">
          <IconButton
            onClick={() => togglePanel('chat')}
            color={panels.chat?.isOpen ? 'primary' : 'default'}
          >
            <ChatIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Quests" placement="right">
          <IconButton
            onClick={() => togglePanel('quests')}
            color={panels.quests?.isOpen ? 'primary' : 'default'}
          >
            <AssignmentIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Progress */}
      {sidebarOpen && slides.length > 0 && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            Progress
          </Typography>
          <Chip
            label={`${completedSlides.size} / ${slides.length}`}
            size="small"
            color="success"
            sx={{ ml: 1 }}
          />
        </Box>
      )}
    </Drawer>
  );
}

interface SlideItemProps {
  slide: Slide;
  index: number;
  isLocked: boolean;
  isComplete: boolean;
  isCurrent: boolean;
  collapsed: boolean;
  onClick: () => void;
}

function SlideItem({
  slide,
  index,
  isLocked,
  isComplete,
  isCurrent,
  collapsed,
  onClick,
}: SlideItemProps) {
  const icon = isLocked ? (
    <LockIcon fontSize="small" color="disabled" />
  ) : isComplete ? (
    <CheckCircleIcon fontSize="small" color="success" />
  ) : (
    <RadioButtonUncheckedIcon fontSize="small" color="action" />
  );

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={onClick}
        disabled={isLocked}
        selected={isCurrent}
        sx={{
          minHeight: 40,
          px: collapsed ? 2 : 2.5,
          justifyContent: collapsed ? 'center' : 'initial',
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: collapsed ? 0 : 2,
            justifyContent: 'center',
          }}
        >
          {collapsed ? (
            <Tooltip title={slide.name} placement="right">
              <Box>{icon}</Box>
            </Tooltip>
          ) : (
            icon
          )}
        </ListItemIcon>
        {!collapsed && (
          <ListItemText
            primary={slide.name}
            primaryTypographyProps={{
              variant: 'body2',
              sx: {
                fontWeight: isCurrent ? 600 : 400,
                color: isLocked ? 'text.disabled' : 'text.primary',
              },
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
}
