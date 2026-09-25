import { createTheme, alpha } from "@mui/material/styles"

// Color palette with good contrast for light mode
const colors = {
  primary: {
    main: "#6B21A8", // Deep purple - WCAG AA compliant
    light: "#9333EA",
    dark: "#4C1D95",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#0891B2", // Teal
    light: "#22D3EE",
    dark: "#0E7490",
  },
  success: {
    main: "#059669", // Green - good contrast
    light: "#10B981",
    dark: "#047857",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#D97706", // Amber - good contrast
    light: "#F59E0B",
    dark: "#B45309",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#DC2626", // Red
    light: "#EF4444",
    dark: "#B91C1C",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#0284C7", // Blue
    light: "#0EA5E9",
    dark: "#0369A1",
    contrastText: "#FFFFFF",
  },
}

export const theme = createTheme({
  palette: {
    mode: "light",
    ...colors,
    background: {
      default: "#EDE9FE", // Light purple tint for visual distinction
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A", // Slate 900 - high contrast
      secondary: "#475569", // Slate 600
    },
    divider: "#E2E8F0", // Slate 200
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: "2.25rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "0.9375rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
    },
    overline: {
      fontSize: "0.6875rem",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          border: "1px solid rgba(107, 33, 168, 0.15)",
          backgroundImage: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "20px",
          "&:last-child": {
            paddingBottom: "20px",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "0.75rem",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#E2E8F0",
        },
        bar: {
          borderRadius: 8,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.9375rem",
          minHeight: 48,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: "3px 3px 0 0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
  },
})

// Export helper for stat card backgrounds with good contrast
export const statCardStyles = {
  primary: {
    bg: alpha(colors.primary.main, 0.08),
    accent: colors.primary.main,
    text: colors.primary.dark,
  },
  warning: {
    bg: alpha(colors.warning.main, 0.08),
    accent: colors.warning.main,
    text: colors.warning.dark,
  },
  info: {
    bg: alpha(colors.info.main, 0.08),
    accent: colors.info.main,
    text: colors.info.dark,
  },
  success: {
    bg: alpha(colors.success.main, 0.08),
    accent: colors.success.main,
    text: colors.success.dark,
  },
}

// Semantic colors for quest statuses
export const questStatusColors = {
  concept: {
    main: "#64748B", // Slate
    light: "#94A3B8",
    bg: alpha("#64748B", 0.1),
  },
  planning: {
    main: colors.info.main,
    light: colors.info.light,
    bg: alpha(colors.info.main, 0.1),
  },
  "in-progress": {
    main: colors.primary.main,
    light: colors.primary.light,
    bg: alpha(colors.primary.main, 0.1),
  },
  done: {
    main: colors.success.main,
    light: colors.success.light,
    bg: alpha(colors.success.main, 0.1),
  },
  cancelled: {
    main: colors.error.main,
    light: colors.error.light,
    bg: alpha(colors.error.main, 0.1),
  },
  blocked: {
    main: colors.error.main,
    light: colors.error.light,
    bg: alpha(colors.error.main, 0.1),
  },
  "on-hold": {
    main: colors.warning.main,
    light: colors.warning.light,
    bg: alpha(colors.warning.main, 0.1),
  },
} as const

// Category colors (for P/D/O system)
export const categoryColors = {
  planning: {
    main: "#3B82F6", // Blue
    light: "#60A5FA",
    bg: alpha("#3B82F6", 0.1),
  },
  development: {
    main: "#8B5CF6", // Purple
    light: "#A78BFA",
    bg: alpha("#8B5CF6", 0.1),
  },
  operations: {
    main: "#10B981", // Green
    light: "#34D399",
    bg: alpha("#10B981", 0.1),
  },
} as const

// Priority colors
export const priorityColors = {
  high: {
    main: colors.error.main,
    light: colors.error.light,
    bg: alpha(colors.error.main, 0.1),
  },
  medium: {
    main: colors.warning.main,
    light: colors.warning.light,
    bg: alpha(colors.warning.main, 0.1),
  },
  low: {
    main: colors.info.main,
    light: colors.info.light,
    bg: alpha(colors.info.main, 0.1),
  },
} as const
