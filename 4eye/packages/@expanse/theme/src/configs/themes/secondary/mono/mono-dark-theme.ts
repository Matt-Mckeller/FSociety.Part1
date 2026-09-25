/**
 * Monochrome Dark Theme
 *
 * A sophisticated grayscale palette for mental health and wellness apps.
 * Dark mode: White/light primary colors on rich dark backgrounds.
 * 
 * Design Philosophy:
 * - Calming, non-distracting interface
 * - Elegant minimalism  
 * - Reduces eye strain in low light
 * - Focus on content over chrome
 */
import { Shadows } from "@mui/material"

// ============================================================================
// Color Constants (inverted from light theme)
// ============================================================================

/** Pure white - primary actions in dark mode */
export const MONO_WHITE = "#ffffff"
/** Off-white - secondary elements */
export const MONO_OFF_WHITE = "#f0f0f0"
/** Light gray - text, icons */
export const MONO_LIGHT = "#cccccc"
/** Medium gray - borders, dividers */
export const MONO_MEDIUM = "#888888"
/** Dark gray - disabled, hints */
export const MONO_DARK = "#555555"
/** Very dark gray - elevated surfaces */
export const MONO_CHARCOAL = "#2a2a2a"
/** Near black - paper surfaces */
export const MONO_PAPER = "#1a1a1a"
/** Pure black - default background */
export const MONO_BLACK = "#0d0d0d"

// Accent for success/error states (adjusted for dark mode)
export const MONO_SUCCESS_DARK = "#6bc962"
export const MONO_ERROR_DARK = "#e57373"
export const MONO_WARNING_DARK = "#ffd54f"
export const MONO_INFO_DARK = "#64b5f6"

// ============================================================================
// Dark Theme Palette
// ============================================================================

export const monoDarkThemePalette: any = {
  mode: "dark",
  background: {
    default: MONO_BLACK,
    paper: MONO_PAPER,
    transparent: `${MONO_BLACK}CC`,
    light: MONO_CHARCOAL,
    medium: MONO_DARK,
    dark: MONO_BLACK,
    backdrop: "#000000AA",
    offsetBG: MONO_CHARCOAL,
    contrastBG: MONO_WHITE,
  },
  action: {
    active: `${MONO_WHITE}8A`,
    hover: `${MONO_WHITE}0A`,
    hoverOpacity: 0.08,
    selected: `${MONO_WHITE}14`,
    selectedOpacity: 0.16,
    disabled: `${MONO_WHITE}42`,
    disabledBackground: `${MONO_WHITE}1F`,
    disabledOpacity: 0.38,
    focus: `${MONO_WHITE}1F`,
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
  common: {
    black: MONO_BLACK,
    white: MONO_WHITE,
    gray: MONO_MEDIUM,
  },
  primary: {
    highSaturation: MONO_WHITE,
    main: MONO_OFF_WHITE,
    dark: MONO_LIGHT,
    light: MONO_WHITE,
    contrastText: MONO_BLACK,
    extra1: MONO_MEDIUM,
    extra2: MONO_DARK,
  },
  secondary: {
    main: MONO_MEDIUM,
    light: MONO_LIGHT,
    dark: MONO_DARK,
    contrastText: MONO_BLACK,
  },
  tertiary: {
    main: MONO_DARK,
  },
  text: {
    primary: MONO_OFF_WHITE,
    secondary: MONO_MEDIUM,
    disabled: `${MONO_WHITE}42`,
  },
  divider: `${MONO_WHITE}12`,
  gradient: {
    primary: [
      { offset: 0, color: MONO_WHITE },
      { offset: 1, color: MONO_MEDIUM },
    ],
    background: [
      { offset: 0, color: MONO_BLACK },
      { offset: 1, color: MONO_CHARCOAL },
    ],
  },
  button: {
    textButtonColor: MONO_OFF_WHITE,
  },
  surface: {
    default: "#2a2a2a",
    elevated: "#3a3a3a",
    glass: "rgba(42, 42, 42, 0.85)",
    tinted: "rgba(42, 42, 42, 0.95)",
    border: "rgba(255, 255, 255, 0.12)",
  },
  error: {
    main: MONO_ERROR_DARK,
    light: "#ffcdd2",
    dark: "#b71c1c",
    contrastText: MONO_BLACK,
  },
  success: {
    main: MONO_SUCCESS_DARK,
    light: "#c8e6c9",
    dark: "#1b5e20",
    contrastText: MONO_BLACK,
  },
  warning: {
    main: MONO_WARNING_DARK,
    light: "#fff8e1",
    dark: "#f57f17",
    contrastText: MONO_BLACK,
  },
  info: {
    main: MONO_INFO_DARK,
    light: "#bbdefb",
    dark: "#0d47a1",
    contrastText: MONO_BLACK,
  },
}

// ============================================================================
// Dark Theme Shadows (minimal for flat aesthetic)
// ============================================================================

export const monoDarkEmptyShadowArray: Shadows = [
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
]

// ============================================================================
// Dark Theme Component Overrides
// ============================================================================

