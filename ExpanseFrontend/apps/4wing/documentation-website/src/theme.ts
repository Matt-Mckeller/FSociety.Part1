'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7C3AED', // Purple 600
      light: '#A78BFA', // Purple 400
      dark: '#5B21B6', // Purple 800
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#EC4899', // Pink 500
      light: '#F472B6', // Pink 400
      dark: '#BE185D', // Pink 700
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937', // Gray 800
      secondary: '#6B7280', // Gray 500
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#1F2937',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#1F2937',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1F2937',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1F2937',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#1F2937',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#1F2937',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 16px',
        },
        containedPrimary: {
          boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
          borderRadius: 16,
          border: '1px solid #F3F4F6',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#F9FAFB',
          color: '#374151',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1F2937',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #E5E7EB',
        },
      },
    },
  },
});

export default theme;
