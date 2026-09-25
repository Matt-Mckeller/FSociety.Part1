'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { 
      main: '#1565c0',
      light: '#1976d2',
      dark: '#0d47a1',
      contrastText: '#ffffff',
    },
    secondary: { 
      main: '#7c4dff',
      light: '#b388ff',
      dark: '#651fff',
    },
    success: { main: '#2e7d32', light: '#4caf50' },
    warning: { main: '#ed6c02', light: '#ff9800' },
    error: { main: '#d32f2f' },
    info: { main: '#0288d1' },
    background: { 
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    divider: '#e2e8f0',
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.25, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.3, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.35 },
    h5: { fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    caption: { fontSize: '0.75rem', lineHeight: 1.5, color: '#64748b' },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    ...Array(18).fill('0 25px 50px -12px rgb(0 0 0 / 0.25)'),
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        outlined: {
          borderColor: '#e2e8f0',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f1f5f9',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: '#334155',
            borderBottom: '2px solid #e2e8f0',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: '#fafbfc',
          },
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#e2e8f0',
          padding: '12px 16px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        outlined: {
          borderColor: '#cbd5e1',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        standardInfo: {
          backgroundColor: '#eff6ff',
          color: '#1e40af',
        },
        standardSuccess: {
          backgroundColor: '#f0fdf4',
          color: '#166534',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e2e8f0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          '&.Mui-selected': {
            backgroundColor: '#eff6ff',
            color: '#1565c0',
            '&:hover': {
              backgroundColor: '#dbeafe',
            },
          },
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
        },
      },
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
