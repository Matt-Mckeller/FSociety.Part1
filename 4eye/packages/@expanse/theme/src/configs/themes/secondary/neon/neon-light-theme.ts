/**
 * Neon Light Theme - Electric Cyan/Electric Blue palette for light mode
 *
 * Light mode variant of the neon theme.
 * Uses darker accent colors for better contrast on light backgrounds.
 *
 * ## Color Philosophy
 * - Background: Light blue-tinted white - clean, modern
 * - Primary: Electric cyan (darker for contrast)
 * - Maintains the energetic neon aesthetic
 */

import {
  NEON_NAVY,
  NEON_CYAN,
  NEON_CYAN_DARK,
  NEON_MINT,
  NEON_PURPLE,
  NEON_CORAL,
  NEON_ORCHID,
} from "./neon-dark-theme"

// Re-export constants for convenience
export {
  NEON_NAVY,
  NEON_NAVY_PAPER,
  NEON_CYAN,
  NEON_CYAN_LIGHT,
  NEON_CYAN_DARK,
  NEON_MINT,
  NEON_PURPLE,
  NEON_PURPLE_LIGHT,
  NEON_CORAL,
  NEON_ORCHID,
  NEON_GLOW_OUTER,
  NEON_GLOW_CENTER,
  NEON_GLOW_INNER,
  NEON_CYAN_BG,
  NEON_MINT_BG,
  NEON_DEEP_BG,
  NEON_DEEP_MINT_BG,
} from "./neon-dark-theme"

// ============================================================
// LIGHT MODE SPECIFIC COLORS
// ============================================================

/** Light background - slight blue tint */
const NEON_LIGHT_BG = "#f0f8ff"
const NEON_LIGHT_PAPER = "#FFFFFF"
const NEON_LIGHT_OFFSET = "#e8f4fc"

// Darker cyan for light mode contrast
const NEON_CYAN_CONTRAST = "#00889a"

// ============================================================
// PALETTE
// ============================================================

export const neonLightPalette: any = {
  mode: "light",
  background: {
    default: NEON_LIGHT_BG,
    paper: NEON_LIGHT_PAPER,
    transparent: "#FFFFFFEE",
    card: NEON_LIGHT_PAPER,
    light: "#e8f4fc",
    medium: "#d0e8f4",
    dark: "#b0d0e4",
    backdrop: "#00000066",
    offsetBG: NEON_LIGHT_OFFSET,
    contrastBG: "#d8ecf8",
  },
  action: {
    active: `${NEON_CYAN_DARK}88`,
    hover: `${NEON_CYAN_DARK}10`,
    hoverOpacity: 0.06,
    selected: `${NEON_CYAN_DARK}18`,
    selectedOpacity: 0.10,
    disabled: "#00000040",
    disabledBackground: "#00000010",
    disabledOpacity: 0.38,
    focus: `${NEON_CYAN_DARK}20`,
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  common: {
    black: NEON_NAVY,
    white: "#FFFFFF",
    gray: "#708090",
  },
  primary: {
    highSaturation: "#00a8c4",
    main: NEON_CYAN_DARK, // Darker for light mode contrast
    dark: "#007a8f",
    light: NEON_CYAN,
    contrastText: "#FFFFFF",
    extra1: NEON_CYAN,
    extra2: "#0098b4",
  },
  secondary: {
    main: NEON_PURPLE,
    light: "#5c4d91",
    dark: "#1a0d4a",
    contrastText: "#FFFFFF",
  },
  tertiary: {
    main: "#00c896", // Darker mint for light mode
    light: NEON_MINT,
    dark: "#008866",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: NEON_NAVY,
    secondary: "#406070",
    disabled: "rgba(0, 0, 0, 0.45)",
  },
  divider: "rgba(0, 136, 154, 0.15)",
  gradient: {
    primary: [
      { offset: 0, color: "#FFFFFF" },
      { offset: 1, color: NEON_CYAN_DARK },
    ],
    background: [
      { offset: 0, color: NEON_LIGHT_BG },
      { offset: 0.5, color: "#e8f4fc" },
      { offset: 1, color: "#d8ecf8" },
    ],
    mint: [
      { offset: 0, color: "#FFFFFF" },
      { offset: 1, color: "#00c896" },
    ],
  },
  button: {
    textButtonColor: NEON_CYAN_CONTRAST,
  },
  surface: {
    default: "#F0F8FF",
    elevated: "#E0F0FF",
    glass: "rgba(240, 248, 255, 0.9)",
    tinted: "rgba(240, 248, 255, 0.95)",
    border: "rgba(0, 0, 0, 0.12)",
  },
  error: {
    main: "#dc2626",
    light: NEON_CORAL,
    dark: "#991b1b",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#00c896", // Darker mint
    light: NEON_MINT,
    dark: "#008866",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#d97706",
    light: "#f59e0b",
    dark: "#b45309",
    contrastText: "#FFFFFF",
  },
  info: {
    main: NEON_CYAN_DARK,
    light: NEON_CYAN,
    dark: "#007a8f",
    contrastText: "#FFFFFF",
  },
}

export const neonLightEmptyShadowArray: any = new Array(25).fill("none")

export { neonLightPalette as neonLightThemePalette }
