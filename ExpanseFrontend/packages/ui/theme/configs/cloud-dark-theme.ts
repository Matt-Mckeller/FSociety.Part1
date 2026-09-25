/**
 * Cloud Theme - Electric Cyan/Electric Blue palette
 *
 * Inspired by the LighteningCloud graphic's color scheme.
 * Features a deep navy background with electric cyan accents.
 *
 * ## Color Philosophy
 * - Background: Deep navy (#1a1a2e) - "darkness" base
 * - Primary: Electric cyan (#00d4ff) - "light" accent
 * - Three-layer glow: Uses primary at varying opacities
 *
 * ## Key Points
 * - Perfect for vector graphics and illustrations
 * - High contrast for dramatic effects
 * - "Darkness to light" gradient theme
 */

import type { ExpanseComponentsThemeProps } from "../../../@types/expanse-theme"

// ============================================================
// COLOR CONSTANTS
// ============================================================

/** Deep navy - base background */
export const CLOUD_NAVY = "#1a1a2e"

/** Slightly lighter navy for paper/cards */
export const CLOUD_NAVY_PAPER = "#252542"

/** Electric cyan - primary accent */
export const CLOUD_CYAN = "#00d4ff"

/** Lighter cyan for highlights */
export const CLOUD_CYAN_LIGHT = "#33ddff"

/** Darker cyan for depth */
export const CLOUD_CYAN_DARK = "#00a0cc"

/** Deep purple undertone */
export const CLOUD_PURPLE = "#2d1b69"

/** Soft purple for secondary elements */
export const CLOUD_PURPLE_LIGHT = "#453a7d"

// Three-layer glow colors (opacity-based on cyan)
export const CLOUD_GLOW_OUTER = "rgba(0, 212, 255, 0.15)" // 15% - soft halo
export const CLOUD_GLOW_CENTER = "rgba(0, 212, 255, 0.40)" // 40% - transition
export const CLOUD_GLOW_INNER = "rgba(0, 212, 255, 0.85)" // 85% - sharp edge

// ============================================================
// PALETTE
// ============================================================

export const cloudDarkThemePalette: any = {
  mode: "dark",
  background: {
    default: CLOUD_NAVY,
    paper: CLOUD_NAVY_PAPER,
    transparent: `${CLOUD_NAVY}CC`,
    card: CLOUD_NAVY_PAPER,
    light: CLOUD_GLOW_OUTER, // Outer glow layer
    medium: CLOUD_GLOW_CENTER, // Center transition
    dark: CLOUD_GLOW_INNER, // Inner edge
    backdrop: "#00000099",
    offsetBG: CLOUD_NAVY_PAPER, // Toolbar backgrounds
    contrastBG: CLOUD_CYAN_LIGHT, // High contrast strokes
  },
  action: {
    active: `${CLOUD_CYAN}8A`,
    hover: `${CLOUD_CYAN}14`,
    hoverOpacity: 0.08,
    selected: `${CLOUD_CYAN}29`,
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: `${CLOUD_CYAN}1F`,
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  common: {
    black: "#010203",
    white: "#FFFFFF",
    gray: "#343434",
  },
  primary: {
    highSaturation: "#00e5ff",
    main: CLOUD_CYAN,
    light: CLOUD_CYAN_LIGHT,
    dark: CLOUD_CYAN_DARK,
    contrastText: CLOUD_NAVY,
    extra1: CLOUD_CYAN_LIGHT, // Character head/limbs
    extra2: CLOUD_CYAN_DARK, // Character body
  },
  secondary: {
    highSaturation: "#6a5acd",
    main: CLOUD_PURPLE_LIGHT,
    light: "#5c4d91",
    dark: CLOUD_PURPLE,
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.42)",
  },
  divider: "rgba(0, 212, 255, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: CLOUD_NAVY },
      { offset: 1, color: CLOUD_CYAN },
    ],
    background: [
      { offset: 0, color: CLOUD_NAVY },
      { offset: 1, color: CLOUD_PURPLE },
    ],
  },
  button: {
    textButtonColor: "#FFFFFF",
  },
  error: {
    highSaturation: "#ff4444",
    main: "#ff6b6b",
    light: "#ff8e8e",
    dark: "#cc4545",
    contrastText: "#FFFFFF",
  },
  success: {
    highSaturation: "#00c853",
    main: "#4caf50",
    light: "#80e27e",
    dark: "#087f23",
    contrastText: "#FFFFFF",
  },
  warning: {
    highSaturation: "#ff9100",
    main: "#ff9800",
    light: "#ffc947",
    dark: "#c66900",
    contrastText: CLOUD_NAVY,
  },
  info: {
    highSaturation: "#00b8d4",
    main: CLOUD_CYAN,
    light: CLOUD_CYAN_LIGHT,
    dark: CLOUD_CYAN_DARK,
    contrastText: CLOUD_NAVY,
  },
}

// ============================================================
// COMPONENT THEME PROPS
// ============================================================

export const cloudComponentsTheme: ExpanseComponentsThemeProps = {
  ExpanseCharacter: {
    variants: {
      default: {
        headColor: CLOUD_CYAN_LIGHT,
        limbColor: CLOUD_CYAN_LIGHT,
        bodyColor: CLOUD_CYAN_DARK,
      },
    },
  },
}

// ============================================================
// FULL THEME CONFIG (for createTheme)
// ============================================================

export const cloudThemeConfig = {
  palette: cloudDarkThemePalette,
  components: cloudComponentsTheme,
  shadows: new Array(25).fill("none") as any,
}

export default cloudThemeConfig
