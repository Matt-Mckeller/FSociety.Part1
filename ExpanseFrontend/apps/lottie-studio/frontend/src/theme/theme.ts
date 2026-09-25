/**
 * MUI Theme Configuration for Lottie Studio
 */

'use client'

import { createTheme, ThemeOptions } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#a15bca',
      light: '#e1c2f5',
      dark: '#3c1a51',
    },
    secondary: {
      main: '#26A69A',
      light: '#4DB6AC',
      dark: '#00695C',
    },
    background: {
      default: '#1a1a2e',
      paper: '#16213e',
    },
    text: {
      primary: '#F9F5FF',
      secondary: '#A9A7AD',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
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
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(161, 91, 202, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
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
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: 24,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: 500,
        },
      },
    },
  },
}

export const theme = createTheme(themeOptions)
export default theme
