'use client';

import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#EC4899',
      light: '#F472B6',
      dark: '#BE185D',
      contrastText: '#FFFFFF',
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
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4.5rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1.375rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1.25rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #FAFBFC 0%, #F3F4F6 50%, #EDE9FE 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '14px 28px',
          fontSize: '1.125rem',
        },
        sizeLarge: {
          padding: '18px 36px',
          fontSize: '1.25rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: alpha('#FFFFFF', 0.9),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha('#7C3AED', 0.12)}`,
          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
