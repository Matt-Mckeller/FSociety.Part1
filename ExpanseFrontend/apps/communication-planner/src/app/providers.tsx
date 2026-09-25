"use client"

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  alpha,
} from "@mui/material/styles"
import { CssBaseline } from "@mui/material"

// Expanse-style monochrome color palette
const colors = {
  primary: {
    main: "#621890", // Expanse purple
    light: "#a662d0",
    dark: "#3e105c",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#434343", // Neutral gray
    light: "#707171",
    dark: "#1a1a1a",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#ed6c02",
    light: "#ff9800",
    dark: "#e65100",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#d32f2f",
    light: "#ef5350",
    dark: "#c62828",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#0288d1",
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: "#FFFFFF",
  },
}

const theme = createTheme({
  palette: {
    mode: "light",
    ...colors,
    background: {
      default: "#F7F3F9", // Expanse light background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#010203",
      secondary: "#707171",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 600, letterSpacing: "-0.02em" },
    h2: { fontWeight: 600, letterSpacing: "-0.01em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.12)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
