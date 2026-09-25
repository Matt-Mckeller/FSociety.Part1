import { createTheme } from '@mui/material/styles';
import { eyeColors, eyeRadii } from './theme';

/** Flatten MUI Paper/Card elevation so nested V6 surfaces don’t cast stacked shadows. */
export const v7FlatTheme = createTheme({
  typography: {
    fontFamily: 'inherit',
  },
  shape: {
    borderRadius: eyeRadii.sm,
  },
  palette: {
    primary: { main: eyeColors.accent },
    secondary: { main: eyeColors.secondary },
    text: {
      primary: eyeColors.text.primary,
      secondary: eyeColors.text.secondary,
    },
    divider: eyeColors.border,
    background: {
      default: eyeColors.background,
      paper: eyeColors.paper,
    },
  },
  shadows: Array(25).fill('none') as unknown as import('@mui/material/styles').Shadows,
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          border: `1px solid ${eyeColors.border}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          '&:last-child': { paddingBottom: 16 },
        },
      },
    },
  },
});

/**
 * CSS guard for inline shadows on FeedbackScreens / V6 cards, plus quieter nested
 * layering (one border language, no stacked elevation glow).
 */
export const v7FlatSx = {
  '& .MuiPaper-root, & .MuiCard-root, & .MuiChip-root, & .MuiButton-root': {
    boxShadow: 'none !important',
    backgroundImage: 'none !important',
  },
  '& .MuiCard-root': {
    border: `1px solid ${eyeColors.border}`,
    borderRadius: `${eyeRadii.md}px`,
  },
  /* Nested surfaces: same border language, no “card inside card” glow */
  '& .MuiPaper-root .MuiPaper-root, & .MuiCard-root .MuiPaper-root': {
    boxShadow: 'none !important',
    backgroundImage: 'none !important',
    border: `1px solid ${eyeColors.border} !important`,
    borderRadius: `${eyeRadii.sm}px`,
  },
  '& .MuiCardContent-root': {
    padding: '16px !important',
    '&:last-child': { paddingBottom: '16px !important' },
  },
  /* Empty nodes left after emoji strip */
  '& .MuiTypography-root:empty': {
    display: 'none',
  },
} as const;
