import { createTheme, alpha } from "@mui/material/styles"

/**
 * Demonstration theme — purple and gray, aligned with the profile page.
 * Export names stay stable so existing slides and diagrams keep compiling.
 */
export const gamingColors = {
  neonCyan: "#a662d0",
  neonPink: "#8a8490",
  neonPurple: "#621890",
  neonBlue: "#707171",
  neonGreen: "#9a92a3",

  darkBg: "#16141a",
  cardBg: "#221c28",
  surfaceBg: "#1b1720",

  textPrimary: "#f4f2f6",
  textSecondary: "#a8a4ad",
  textMuted: "#707171",

  success: "#8d8794",
  warning: "#9a92a3",
  error: "#8a8490",
  info: "#a662d0",
}

export const gamingTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: gamingColors.neonPurple,
      light: gamingColors.neonCyan,
      dark: "#3e105c",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: gamingColors.textMuted,
      light: gamingColors.textSecondary,
      dark: "#434343",
      contrastText: "#FFFFFF",
    },
    background: {
      default: gamingColors.darkBg,
      paper: gamingColors.cardBg,
    },
    text: {
      primary: gamingColors.textPrimary,
      secondary: gamingColors.textSecondary,
    },
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: "3.25rem",
      fontWeight: 600,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.25,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.4rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.15rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1.15rem",
      lineHeight: 1.65,
    },
    body2: {
      fontSize: "0.95rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
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

const wash = (color: string) =>
  `linear-gradient(160deg, ${gamingColors.darkBg} 0%, ${alpha(color, 0.12)} 100%)`

export const slideStyles = {
  gradients: {
    reframe: wash(gamingColors.neonPurple),
    story: wash(gamingColors.textMuted),
    insight: wash(gamingColors.neonCyan),
    transformation: wash(gamingColors.neonPurple),
    title: `linear-gradient(160deg, ${gamingColors.surfaceBg} 0%, ${gamingColors.darkBg} 100%)`,
    summary: wash(gamingColors.neonCyan),
  },
  glowEffects: {
    cyan: "none",
    pink: "none",
    purple: "none",
    subtle: "none",
  },
  borders: {
    neon: `1px solid ${alpha(gamingColors.neonPurple, 0.35)}`,
    neonStrong: `1px solid ${gamingColors.neonPurple}`,
    subtle: `1px solid ${alpha(gamingColors.textMuted, 0.25)}`,
  },
  iconColors: {
    reframe: gamingColors.neonPurple,
    story: gamingColors.textSecondary,
    analogy: gamingColors.neonCyan,
    insight: gamingColors.neonCyan,
    callout: gamingColors.neonPurple,
    transformation: gamingColors.neonPurple,
    vulnerability: gamingColors.neonCyan,
    credentials: gamingColors.textSecondary,
    context: gamingColors.textSecondary,
    implementation: gamingColors.textSecondary,
    ambition: gamingColors.neonPurple,
    list: gamingColors.neonCyan,
    meta: gamingColors.textMuted,
  },
}
