'use client';

import {
  Box,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { PanelPosition } from '../../types';

interface ConfigurablePanelProps {
  id: string;
  title: string;
  position: PanelPosition;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  height?: number;
}

export function ConfigurablePanel({
  id,
  title,
  position,
  isOpen,
  onClose,
  children,
  width = 320,
  height = 300,
}: ConfigurablePanelProps) {
  const isVertical = position === 'left' || position === 'right';

  const positionStyles = {
    left: { left: 60, top: 64, bottom: 0 },
    right: { right: 0, top: 64, bottom: 0 },
    top: { left: 0, right: 0, top: 64 },
    bottom: { left: 0, right: 0, bottom: 0 },
  };

  return (
    <Collapse
      in={isOpen}
      orientation={isVertical ? 'horizontal' : 'vertical'}
      sx={{
        position: 'fixed',
        zIndex: 1200,
        ...positionStyles[position],
      }}
    >
      <Paper
        sx={{
          width: isVertical ? width : '100%',
          height: isVertical ? '100%' : height,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          borderRadius: 0,
          borderLeft: position === 'right' ? 1 : 0,
          borderRight: position === 'left' ? 1 : 0,
          borderTop: position === 'bottom' ? 1 : 0,
          borderBottom: position === 'top' ? 1 : 0,
          borderColor: 'divider',
        }}
        elevation={4}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            {title}
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>{children}</Box>
      </Paper>
    </Collapse>
  );
}
