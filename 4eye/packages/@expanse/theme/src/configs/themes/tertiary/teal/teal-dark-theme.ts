import { Palette } from "@mui/material/styles"

export const tealDarkThemePalette: any = {
  mode: "dark",
  background: {
    default: "#263237",
    paper: "#FFFFFF",
    transparent: "#FFFFFFCC",
    card: "#FFFFFF",
    light: "#F7F3F9",
    medium: "#939393",
    dark: "#434343",
    backdrop: "#00000099",
    offsetBG: "#EAEAEA",
    contrastBG: "#E0F2F1", // Light teal tint
  },
  action: {
    active: "#FFFFFF8A",
    hover: "#FFFFFF0A",
    hoverOpacity: 0.04,
    selected: "#FFFFFF15",
    selectedOpacity: 0.08,
    disabled: "#FFFFFF61",
    disabledBackground: "#FFFFFF21",
    disabledOpacity: 0.38,
    focus: "#FFFFFF1F",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  common: {
    black: "#010203",
    white: "#FFFFFF",
    gray: "#343434",
  },
  primary: {
    highSaturation: "#26A69A", // Material Teal 400
    main: "#4DB6AC", // Material Teal 300 - lighter for dark mode
    dark: "#00897B", // Material Teal 600
    light: "#B2DFDB", // Material Teal 100
    contrastText: "#FFFFFF",
    extra1: "#80CBC4", // Material Teal 200 - for character head/limbs
    extra2: "#4DB6AC", // Material Teal 300 - for character body
  },
  secondary: {
    highSaturation: "#00ACC1",
    main: "#4DD0E1", // Cyan 300
    light: "#80DEEA",
    dark: "#00838F",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#E0F2F1", // Light teal-tinted text
    secondary: "#A9A7AD",
    disabled: "rgba(255, 255, 255, 0.42)",
  },
  divider: "rgba(207, 216, 220, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#004D40" }, // Material Teal 900
      { offset: 1, color: "#00897B" }, // Material Teal 600
    ],
    background: [
      { offset: 0, color: "#004D40" },
      { offset: 1, color: "#00897B" },
    ],
  },
  button: {
    textButtonColor: "#E0F2F1",
  },
  surface: {
    default: "#1a2d2d",
    elevated: "#243a3a",
    glass: "rgba(26, 45, 45, 0.85)",
    tinted: "rgba(26, 45, 45, 0.95)",
    border: "rgba(255, 255, 255, 0.12)",
  },
  error: {
    highSaturation: "#D32F2F",
    main: "#FFCDD2",
    light: "#FFEBEE",
    dark: "#B71C1C",
    contrastText: "#FFFFFF",
  },
  success: {
    highSaturation: "#388E3C",
    main: "#81C784",
    light: "#C8E6C9",
    dark: "#1B5E20",
    contrastText: "#FFFFFF",
  },
  warning: {
    highSaturation: "#F57C00",
    main: "#FFD54F",
    light: "#FFF9C4",
    dark: "#FF6F00",
    contrastText: "#FFFFFF",
  },
  info: {
    highSaturation: "#1976D2",
    main: "#81D4FA",
    light: "#B3E5FC",
    dark: "#0277BD",
    contrastText: "#FFFFFF",
  },
}

export const darkThemeEmptyShadowArray: any = new Array(25).fill("none")

