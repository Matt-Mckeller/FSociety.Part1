/**
 * Monochrome Light Theme
 *
 * A sophisticated grayscale palette for mental health and wellness apps.
 * Light mode: Charcoal/black primary colors on clean white backgrounds.
 * 
 * Design Philosophy:
 * - Calming, non-distracting interface
 * - Elegant minimalism
 * - Focus on content over chrome
 * - Accessibility-first contrast ratios
 */

// ============================================================================
// Color Constants
// ============================================================================

/** Pure black */
export const MONO_BLACK = "#000000"
/** Rich charcoal - primary actions */
export const MONO_CHARCOAL = "#1a1a1a"
/** Dark gray - secondary elements */
export const MONO_DARK = "#333333"
/** Medium gray - borders, dividers */
export const MONO_MEDIUM = "#666666"
/** Light gray - disabled, hints */
export const MONO_LIGHT = "#999999"
/** Very light gray - backgrounds */
export const MONO_PALE = "#e5e5e5"
/** Off-white - paper surfaces */
export const MONO_PAPER = "#fafafa"
/** Pure white - default background */
export const MONO_WHITE = "#ffffff"

// Accent for success/error states (kept subtle)
export const MONO_SUCCESS = "#2d5a27"
export const MONO_ERROR = "#8b2635"
export const MONO_WARNING = "#7a5c00"
export const MONO_INFO = "#1a4a5c"

// ============================================================================
// Light Theme Palette
// ============================================================================

export const monoLightThemePalette: any = {
  mode: "light",
  background: {
    default: MONO_WHITE,
    paper: MONO_PAPER,
    transparent: `${MONO_WHITE}CC`,
    light: "#f5f5f5",
    medium: MONO_PALE,
    dark: MONO_DARK,
    backdrop: "#00000066",
    offsetBG: MONO_PALE,
    contrastBG: MONO_CHARCOAL,
  },
  action: {
    active: `${MONO_BLACK}8A`,
    hover: `${MONO_BLACK}0A`,
    hoverOpacity: 0.04,
    selected: `${MONO_BLACK}14`,
    selectedOpacity: 0.08,
    disabled: `${MONO_BLACK}42`,
    disabledBackground: `${MONO_BLACK}1F`,
    disabledOpacity: 0.38,
    focus: `${MONO_BLACK}1F`,
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  common: {
    black: MONO_BLACK,
    white: MONO_WHITE,
    gray: MONO_MEDIUM,
  },
  primary: {
    highSaturation: MONO_BLACK,
    main: MONO_CHARCOAL,
    dark: MONO_BLACK,
    light: MONO_DARK,
    contrastText: MONO_WHITE,
    extra1: MONO_MEDIUM,
    extra2: MONO_LIGHT,
  },
  secondary: {
    main: MONO_MEDIUM,
    light: MONO_LIGHT,
    dark: MONO_DARK,
    contrastText: MONO_WHITE,
  },
  tertiary: {
    main: MONO_LIGHT,
  },
  text: {
    primary: MONO_CHARCOAL,
    secondary: MONO_MEDIUM,
    disabled: `${MONO_BLACK}42`,
  },
  divider: `${MONO_BLACK}12`,
  gradient: {
    primary: [
      { offset: 0, color: MONO_CHARCOAL },
      { offset: 1, color: MONO_MEDIUM },
    ],
    background: [
      { offset: 0, color: MONO_WHITE },
      { offset: 1, color: MONO_PALE },
    ],
  },
  button: {
    textButtonColor: MONO_CHARCOAL,
  },
  surface: {
    default: "#F5F5F5",
    elevated: "#EBEBEB",
    glass: "rgba(245, 245, 245, 0.9)",
    tinted: "rgba(245, 245, 245, 0.95)",
    border: "rgba(0, 0, 0, 0.12)",
  },
  error: {
    main: MONO_ERROR,
    light: "#c9a0a6",
    dark: "#5c1a24",
    contrastText: MONO_WHITE,
  },
  success: {
    main: MONO_SUCCESS,
    light: "#a3c9a0",
    dark: "#1e3d1a",
    contrastText: MONO_WHITE,
  },
  warning: {
    main: MONO_WARNING,
    light: "#c9b366",
    dark: "#4d3a00",
    contrastText: MONO_WHITE,
  },
  info: {
    main: MONO_INFO,
    light: "#7ab3c9",
    dark: "#0d2730",
    contrastText: MONO_WHITE,
  },
}

// ============================================================================
// Light Theme Shadows (minimal for flat aesthetic)
// ============================================================================

export const monoLightEmptyShadowArray: any = new Array(25).fill("none")

// ============================================================================
// Light Theme Component Overrides
// ============================================================================

