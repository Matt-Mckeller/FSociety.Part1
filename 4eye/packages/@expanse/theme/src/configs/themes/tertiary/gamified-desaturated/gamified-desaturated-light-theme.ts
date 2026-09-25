/**
 * Gamified Desaturated Light Theme
 * 
 * Japan-style soft palette for light mode - same hues as gamified but with
 * reduced saturation and softer warm tones. Elegant, calming, paper-like.
 * 
 * Primary: Soft Cyan (#4a8898) - Calm, zen, water
 * Secondary: Soft Mint (#5a9888) - Growth, bamboo, harmony
 */

const gamifiedDesaturatedLightPalette: any = {
  mode: "light",
  background: {
    default: "#f8f5f0", // Warm paper-like off-white
    paper: "#FFFEFA",
    transparent: "#f8f5f0EE",
    light: "#f0ebe5",
    medium: "#e8e0d8",
    dark: "#d8cfc5",
    backdrop: "#00000055",
    offsetBG: "#f4f0ea",
    contrastBG: "#e8e4de",
  },
  action: {
    active: "#4a889870",
    hover: "#4a88980D",
    hoverOpacity: 0.05,
    selected: "#4a889815",
    selectedOpacity: 0.08,
    disabled: "#00000035",
    disabledBackground: "#0000000D",
    disabledOpacity: 0.35,
    focus: "#4a889818",
    focusOpacity: 0.10,
    activatedOpacity: 0.10,
  },
  common: {
    black: "#2a2520",
    white: "#FFFEFA",
    gray: "#8a8078",
  },
  primary: {
    // Soft Cyan - muted, refined
    highSaturation: "#5898a8",
    main: "#4a8898",
    dark: "#3a6870",
    light: "#7ab0c0",
    contrastText: "#FFFEFA",
    extra1: "#5a98a8",
    extra2: "#407888",
  },
  secondary: {
    // Soft Mint/Sage
    main: "#5a9888",
    light: "#8ab8a8",
    dark: "#3a6858",
    contrastText: "#FFFEFA",
  },
  text: {
    primary: "#2a2520",
    secondary: "#5a554d",
    disabled: "rgba(42, 37, 32, 0.40)",
  },
  divider: "rgba(74, 136, 152, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#f8f5f0" },
      { offset: 1, color: "#4a8898" },
    ],
    background: [
      { offset: 0, color: "#f8f5f0" },
      { offset: 0.5, color: "#f0ebe5" },
      { offset: 1, color: "#e8e0d8" },
    ],
    ability: [
      { offset: 0, color: "#4a8898" },
      { offset: 0.5, color: "#7a6888" },
      { offset: 1, color: "#5a9888" },
    ],
  },
  button: {
    textButtonColor: "#3a6870",
  },
  surface: {
    default: "#F8F8F5",
    elevated: "#EFEFE8",
    glass: "rgba(248, 248, 245, 0.9)",
    tinted: "rgba(248, 248, 245, 0.95)",
    border: "rgba(0, 0, 0, 0.1)",
  },
  error: {
    // Soft Rose
    main: "#b87070",
    light: "#d09090",
    dark: "#885050",
    contrastText: "#FFFEFA",
  },
  success: {
    // Soft Sage
    main: "#5a9888",
    light: "#8ab8a8",
    dark: "#3a6858",
    contrastText: "#FFFEFA",
  },
  warning: {
    // Soft Ochre
    main: "#b89058",
    light: "#d0a878",
    dark: "#886838",
    contrastText: "#FFFEFA",
  },
  info: {
    // Soft Wisteria
    main: "#7a6888",
    light: "#9a88a8",
    dark: "#5a4868",
    contrastText: "#FFFEFA",
  },
  // Desaturated game colors for light mode
  ability: {
    cyan: "#4a8898",
    mint: "#5a9888",
    purple: "#7a6888",
    gold: "#b89058",
    red: "#b87070",
    blue: "#5878a0",
  },
}

const gamifiedDesaturatedLightEmptyShadowArray: any = new Array(25).fill("none")

export { gamifiedDesaturatedLightPalette, gamifiedDesaturatedLightEmptyShadowArray }

