'use client';

import { Box } from '@mui/material';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useUIStore } from '../../store';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* Header */}
      <Header />

      {/* Main content area */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
            ml: sidebarOpen ? '240px' : '60px',
            transition: 'margin-left 0.2s',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
