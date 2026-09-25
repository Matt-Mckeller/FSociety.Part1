import { Palette } from "@mui/material/styles"

export const greenDarkThemePalette: any = {
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
    contrastBG: "#F1F8F4",
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
    highSaturation: "#2E7D32",
    main: "#66BB6A", // Lighter green for dark mode
    dark: "#388E3C",
    light: "#A5D6A7",
    contrastText: "#FFFFFF",
    extra1: "#81C784",
    extra2: "#66BB6A",
  },
  secondary: {
    highSaturation: "#00796B",
    main: "#26A69A",
    light: "#4DB6AC",
    dark: "#00695C",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#E8F5E9", // Light green text
    secondary: "#A9A7AD",
    disabled: "rgba(255, 255, 255, 0.42)",
  },
  divider: "rgba(207, 216, 220, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#1B5E20" }, // Dark green gradient start
      { offset: 1, color: "#43A047" }, // Lighter green gradient end
    ],
    background: [
      { offset: 0, color: "#1B5E20" },
      { offset: 1, color: "#43A047" },
    ],
  },
  button: {
    textButtonColor: "#E8F5E9",
  },
  surface: {
    default: "#1e2d20",
    elevated: "#283a2a",
    glass: "rgba(30, 45, 32, 0.85)",
    tinted: "rgba(30, 45, 32, 0.95)",
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

