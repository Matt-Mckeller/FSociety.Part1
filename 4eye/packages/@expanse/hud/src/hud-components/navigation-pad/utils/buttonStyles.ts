"use client"

import { alpha, type Theme } from "@mui/material"

/**
 * Color type for navigation pad buttons
 */
export type NavPadButtonColor = "primary" | "secondary" | "warning"

/**
 * Options for generating navigation pad button styles
 */
export interface NavPadButtonStyleOptions {
  buttonSize: number
  highContrast: boolean
  isEnabled: boolean
  colorType?: NavPadButtonColor
}

/**
 * Generates theme-aware button styles for NavigationPad
 * Supports both default and high-contrast modes for accessibility
 * 
 * @param theme - MUI theme object
 * @param options - Style options
 * @returns SxProps compatible style object
 */
export function getNavPadButtonStyles(theme: Theme, options: NavPadButtonStyleOptions) {
  const { buttonSize, highContrast, isEnabled, colorType = "primary" } = options
  
  const colors = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    warning: theme.palette.warning,
  }
  const color = colors[colorType]
  
  if (highContrast) {
    // WCAG AAA compliant styles (7:1 contrast ratio)
    return {
      width: buttonSize,
      height: buttonSize,
      bgcolor: theme.palette.background.paper,
      border: "2px solid",
      borderColor: theme.palette.mode === "light" 
        ? theme.palette.common.black 
        : theme.palette.common.white,
      color: isEnabled 
        ? (theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white)
        : theme.palette.text.disabled,
      "&:hover": {
        bgcolor: theme.palette.mode === "light" 
          ? alpha(theme.palette.common.black, 0.08)
          : alpha(theme.palette.common.white, 0.15),
        borderColor: color.dark,
      },
      "&.Mui-disabled": {
        bgcolor: alpha(theme.palette.action.disabledBackground, 0.3),
        color: theme.palette.text.disabled,
        borderColor: theme.palette.divider,
      },
      "&:focus-visible": {
        outline: `3px solid ${color.main}`,
        outlineOffset: 2,
      },
      transition: "all 0.2s ease",
    }
  }
  
  // Default styles with glass morphism effect - improved contrast
  return {
    width: buttonSize,
    height: buttonSize,
    bgcolor: alpha(theme.palette.background.paper, 0.92),
    backdropFilter: "blur(12px)",
    border: "1px solid",
    borderColor: alpha(theme.palette.divider, 0.25),
    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.08)}`,
    // Stronger color for better contrast
    color: isEnabled 
      ? (theme.palette.mode === "light" 
          ? theme.palette.primary.dark  // Darker in light mode
          : theme.palette.primary.light) // Lighter in dark mode
      : theme.palette.text.disabled,
    "&:hover": {
      bgcolor: alpha(theme.palette.background.paper, 0.98),
      borderColor: alpha(color.main, 0.5),
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
    "&.Mui-disabled": {
      bgcolor: alpha(theme.palette.action.disabledBackground, 0.5),
      color: theme.palette.text.disabled,
      boxShadow: "none",
    },
    "&:focus-visible": {
      outline: `2px solid ${color.main}`,
      outlineOffset: 2,
    },
    transition: "all 0.15s ease",
  }
}

/**
 * Options for generating keyboard hint styles
 */
export interface NavPadHintStyleOptions {
  highContrast: boolean
  isEnabled: boolean
}

/**
 * Generates theme-aware styles for keyboard hint labels
 * 
 * @param theme - MUI theme object
 * @param options - Style options
 * @returns SxProps compatible style object
 */
export function getNavPadHintStyles(theme: Theme, options: NavPadHintStyleOptions) {
  const { highContrast, isEnabled } = options
  
  if (highContrast) {
    return {
      fontSize: 10,
      color: isEnabled 
        ? (theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white)
        : theme.palette.text.disabled,
      fontWeight: 700,
      bgcolor: theme.palette.background.paper,
      px: 0.75,
      py: 0.25,
      borderRadius: 0.5,
      border: "2px solid",
      borderColor: theme.palette.mode === "light" 
        ? theme.palette.common.black 
        : theme.palette.common.white,
    }
  }
  
  return {
    fontSize: 10,
    color: isEnabled ? theme.palette.text.secondary : theme.palette.text.disabled,
    fontWeight: 600,
    bgcolor: alpha(theme.palette.background.paper, 0.8),
    px: 0.75,
    py: 0.25,
    borderRadius: 0.5,
    border: "1px solid",
    borderColor: alpha(theme.palette.divider, 0.2),
  }
}
