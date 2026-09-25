/**
 * Gamified Desaturated Dark Theme
 * 
 * Japan-style soft palette - same hues as gamified but with reduced saturation
 * and softer contrasts. Elegant, calming, and refined.
 * 
 * Primary: Soft Cyan (#7ab8c8) - Calm, tech, zen
 * Secondary: Soft Mint (#8fcfb8) - Growth, nature, harmony
 */

const gamifiedDesaturatedDarkPalette: any = {
  mode: "dark",
  background: {
    default: "#1a2028", // Soft dark with slight warmth
    paper: "#252d38",
    transparent: "#1a2028DD",
    light: "#2d3844",
    medium: "#3d4854",
    dark: "#101418",
    backdrop: "#00000088",
    offsetBG: "#1f272f",
    contrastBG: "#2d3844",
  },
  action: {
    active: "#7ab8c870",
    hover: "#7ab8c812",
    hoverOpacity: 0.07,
    selected: "#7ab8c820",
    selectedOpacity: 0.12,
    disabled: "#FFFFFF35",
    disabledBackground: "#FFFFFF12",
    disabledOpacity: 0.35,
    focus: "#7ab8c825",
    focusOpacity: 0.15,
    activatedOpacity: 0.15,
  },
  common: {
    black: "#101418",
    white: "#f8f8f5",
    gray: "#4a5560",
  },
  primary: {
    // Soft Cyan - desaturated, calming
    highSaturation: "#88c4d4",
    main: "#7ab8c8",
    dark: "#4a7888",
    light: "#a8d4e0",
    contrastText: "#101418",
    extra1: "#88c8d8",
    extra2: "#6aa8b8",
  },
  secondary: {
    // Soft Mint - natural, harmonious
    main: "#8fcfb8",
    light: "#b0e0d0",
    dark: "#5a9080",
    contrastText: "#101418",
  },
  text: {
    primary: "#e8e8e5",
    secondary: "#a8b0b8",
    disabled: "rgba(232, 232, 229, 0.40)",
  },
  divider: "rgba(122, 184, 200, 0.15)",
  gradient: {
    primary: [
      { offset: 0, color: "#101418" },
      { offset: 1, color: "#7ab8c8" },
    ],
    background: [
      { offset: 0, color: "#1a2028" },
      { offset: 0.5, color: "#252d38" },
      { offset: 1, color: "#2d3844" },
    ],
    ability: [
      { offset: 0, color: "#7ab8c8" },
      { offset: 0.5, color: "#9a88b8" },
      { offset: 1, color: "#8fcfb8" },
    ],
  },
  button: {
    textButtonColor: "#7ab8c8",
  },
  surface: {
    default: "#181c20",
    elevated: "#202428",
    glass: "rgba(24, 28, 32, 0.85)",
    tinted: "rgba(24, 28, 32, 0.95)",
    border: "rgba(255, 255, 255, 0.1)",
  },
  error: {
    // Soft Coral
    main: "#d89090",
    light: "#e8a8a8",
    dark: "#a86060",
    contrastText: "#101418",
  },
  success: {
    // Soft Mint
    main: "#8fcfb8",
    light: "#b0e0d0",
    dark: "#5a9080",
    contrastText: "#101418",
  },
  warning: {
    // Soft Gold/Amber
    main: "#d8b888",
    light: "#e8d0a8",
    dark: "#a88858",
    contrastText: "#101418",
  },
  info: {
    // Soft Lavender
    main: "#9a88b8",
    light: "#b8a8d0",
    dark: "#6a5888",
    contrastText: "#f8f8f5",
  },
  // Desaturated game colors
  ability: {
    cyan: "#7ab8c8",
    mint: "#8fcfb8",
    purple: "#9a88b8",
    gold: "#d8b888",
    red: "#d89090",
    blue: "#88a0c8",
  },
}

const gamifiedDesaturatedDarkEmptyShadowArray: any = new Array(25).fill("none")

export { gamifiedDesaturatedDarkPalette, gamifiedDesaturatedDarkEmptyShadowArray }

