/**
 * Gamified Light Theme
 * 
 * Vibrant game-inspired colors adapted for light mode.
 * Uses slightly darker accent colors for better contrast on light backgrounds.
 * 
 * Primary: Electric Cyan (#00b8d4) - Energy, tech, action
 * Secondary: Mint (#00c896) - Growth, healing, success
 */

const gamifiedLightPalette: any = {
  mode: "light",
  background: {
    default: "#f0f8ff", // Light blue-tinted white
    paper: "#FFFFFF",
    transparent: "#FFFFFFEE",
    light: "#e8f4fc",
    medium: "#d0e8f4",
    dark: "#b0d0e4",
    backdrop: "#00000066",
    offsetBG: "#e0f0fa",
    contrastBG: "#d8ecf8",
  },
  action: {
    active: "#00b8d488",
    hover: "#00b8d410",
    hoverOpacity: 0.06,
    selected: "#00b8d418",
    selectedOpacity: 0.10,
    disabled: "#00000040",
    disabledBackground: "#00000010",
    disabledOpacity: 0.38,
    focus: "#00b8d420",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  common: {
    black: "#0a1520",
    white: "#FFFFFF",
    gray: "#708090",
  },
  primary: {
    // Electric Cyan (darker for light mode contrast)
    highSaturation: "#00a8c4",
    main: "#00b8d4",
    dark: "#007a8f",
    light: "#4dd0e8",
    contrastText: "#FFFFFF",
    extra1: "#00c8e4",
    extra2: "#0098b4",
  },
  secondary: {
    // Mint (slightly darker for light mode)
    main: "#00c896",
    light: "#4dddb4",
    dark: "#008866",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#0a1520",
    secondary: "#406070",
    disabled: "rgba(0, 0, 0, 0.45)",
  },
  divider: "rgba(0, 184, 212, 0.15)",
  gradient: {
    primary: [
      { offset: 0, color: "#FFFFFF" },
      { offset: 1, color: "#00b8d4" },
    ],
    background: [
      { offset: 0, color: "#f0f8ff" },
      { offset: 0.5, color: "#e8f4fc" },
      { offset: 1, color: "#d8ecf8" },
    ],
    ability: [
      { offset: 0, color: "#00b8d4" },
      { offset: 0.5, color: "#7c4dff" },
      { offset: 1, color: "#00c896" },
    ],
  },
  button: {
    textButtonColor: "#00889a",
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
    light: "#ef4444",
    dark: "#991b1b",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#00c896",
    light: "#4dddb4",
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
    main: "#7c4dff",
    light: "#9e7dff",
    dark: "#5b21b6",
    contrastText: "#FFFFFF",
  },
  // Game-specific colors (darker for light mode)
  ability: {
    cyan: "#00b8d4",
    mint: "#00c896",
    purple: "#7c4dff",
    gold: "#d97706",
    red: "#dc2626",
    blue: "#2563eb",
  },
}

const gamifiedLightEmptyShadowArray: any = new Array(25).fill("none")

export { gamifiedLightPalette, gamifiedLightEmptyShadowArray }

