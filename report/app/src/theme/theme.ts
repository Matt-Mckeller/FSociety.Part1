import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#be3030',
      dark: '#880E4F',
      light: '#E57373',
    },
    secondary: {
      main: '#B71C1C',
    },
    background: {
      default: '#f8f6f3',  // Warm off-white background
      paper: '#ffffff',    // Pure white for cards/papers
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555555',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});
