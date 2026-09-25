/**
 * Neon Dark Theme - Electric Cyan/Electric Blue palette
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

// ============================================================
// COLOR CONSTANTS
// ============================================================

/** Deep navy - base background */
export const NEON_NAVY = "#1a1a2e"

/** Slightly lighter navy for paper/cards */
export const NEON_NAVY_PAPER = "#252542"

/** Electric cyan - primary accent */
export const NEON_CYAN = "#00d4ff"

/** Lighter cyan for highlights */
export const NEON_CYAN_LIGHT = "#33ddff"

/** Darker cyan for depth */
export const NEON_CYAN_DARK = "#00a0cc"

/** Mint glow - secondary accent */
export const NEON_MINT = "#6bffc3"

/** Deep purple undertone */
export const NEON_PURPLE = "#2d1b69"

/** Soft purple for secondary elements */
export const NEON_PURPLE_LIGHT = "#453a7d"

/** Coral accent */
export const NEON_CORAL = "#ff6b6b"

/** Orchid accent */
export const NEON_ORCHID = "#c792ea"

// Three-layer glow colors (opacity-based on cyan)
export const NEON_GLOW_OUTER = "rgba(0, 212, 255, 0.15)" // 15% - soft halo
export const NEON_GLOW_CENTER = "rgba(0, 212, 255, 0.40)" // 40% - transition
export const NEON_GLOW_INNER = "rgba(0, 212, 255, 0.85)" // 85% - sharp edge

// Background pairs (color + matching dark bg)
export const NEON_CYAN_BG = "#1a3a4a"
export const NEON_MINT_BG = "#1a4a3a"
export const NEON_DEEP_BG = "#0a1520"
export const NEON_DEEP_MINT_BG = "#0a2015"

// ============================================================
// PALETTE
// ============================================================

export const neonDarkPalette: any = {
  mode: "dark",
  background: {
    default: NEON_NAVY,
    paper: NEON_NAVY_PAPER,
    transparent: `${NEON_NAVY}CC`,
    card: NEON_NAVY_PAPER,
    light: NEON_GLOW_OUTER, // Outer glow layer
    medium: NEON_GLOW_CENTER, // Center transition
    dark: NEON_GLOW_INNER, // Inner edge
    backdrop: "#00000099",
    offsetBG: NEON_NAVY_PAPER, // Toolbar backgrounds
    contrastBG: NEON_CYAN_LIGHT, // High contrast strokes
  },
  action: {
    active: `${NEON_CYAN}8A`,
    hover: `${NEON_CYAN}14`,
    hoverOpacity: 0.08,
    selected: `${NEON_CYAN}29`,
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: `${NEON_CYAN}1F`,
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
    main: NEON_CYAN,
    light: NEON_CYAN_LIGHT,
    dark: NEON_CYAN_DARK,
    contrastText: NEON_NAVY,
    extra1: NEON_CYAN_LIGHT, // Character head/limbs
    extra2: NEON_CYAN_DARK, // Character body
  },
  secondary: {
    highSaturation: "#6a5acd",
    main: NEON_PURPLE_LIGHT,
    light: "#5c4d91",
    dark: NEON_PURPLE,
    contrastText: "#FFFFFF",
  },
  tertiary: {
    // Mint for growth/success accents
    main: NEON_MINT,
    light: "#8bffd3",
    dark: "#4bdfb3",
    contrastText: NEON_NAVY,
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.42)",
  },
  divider: "rgba(0, 212, 255, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: NEON_NAVY },
      { offset: 1, color: NEON_CYAN },
    ],
    background: [
      { offset: 0, color: NEON_NAVY },
      { offset: 1, color: NEON_PURPLE },
    ],
    mint: [
      { offset: 0, color: NEON_MINT },
      { offset: 1, color: NEON_CYAN },
    ],
  },
  button: {
    textButtonColor: "#FFFFFF",
  },
  surface: {
    default: "#252542",
    elevated: "#303050",
    glass: "rgba(37, 37, 66, 0.85)",
    tinted: "rgba(37, 37, 66, 0.95)",
    border: "rgba(0, 212, 255, 0.2)",
  },
  error: {
    highSaturation: "#ff4444",
    main: NEON_CORAL,
    light: "#ff8e8e",
    dark: "#cc4545",
    contrastText: "#FFFFFF",
  },
  success: {
    highSaturation: "#00c853",
    main: NEON_MINT,
    light: "#8bffd3",
    dark: "#4bdfb3",
    contrastText: NEON_NAVY,
  },
  warning: {
    highSaturation: "#ff9100",
    main: "#ff9800",
    light: "#ffc947",
    dark: "#c66900",
    contrastText: NEON_NAVY,
  },
  info: {
    highSaturation: "#00b8d4",
    main: NEON_CYAN,
    light: NEON_CYAN_LIGHT,
    dark: NEON_CYAN_DARK,
    contrastText: NEON_NAVY,
  },
}

export const neonDarkEmptyShadowArray: any = new Array(25).fill("none")

export { neonDarkPalette as neonDarkThemePalette }
