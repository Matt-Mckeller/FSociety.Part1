import { Palette } from "@mui/material/styles"

export const greenLightThemePalette: any = {
  mode: "light",
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
    transparent: "#FFFFFFCC",
    card: "#FFFFFF",
    light: "#F1F8F4", // A very light green
    medium: "#939393",
    dark: "#1B5E20", // Dark green
    backdrop: "#00000099",
    offsetBG: "#1B5E20",
    contrastBG: "#010203",
  },
  action: {
    active: "#0000008A",
    hover: "#0000000A",
    hoverOpacity: 0.04,
    selected: "#00000015",
    selectedOpacity: 0.08,
    disabled: "#00000042",
    disabledBackground: "#0000001F",
    disabledOpacity: 0.4,
    focus: "#0000001F",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  common: {
    black: "#010203",
    white: "#FFFFFF",
    gray: "#343434",
  },
  primary: {
    highSaturation: "#2E7D32", // Deep green
    main: "#4CAF50", // Material UI Green
    dark: "#388E3C", // Dark green
    light: "#81C784", // Light green
    contrastText: "#FFFFFF",
  },
  secondary: {
    highSaturation: "#00796B",
    main: "#009688", // Teal secondary
    light: "#4DB6AC",
    dark: "#00695C",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#010203",
    secondary: "#707171",
    disabled: "rgba(0, 0, 0, 0.42)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#1B5E20" }, // Dark green gradient start
      { offset: 1, color: "#ffffff" },
    ],
    background: [
      { offset: 0, color: "#1B5E20" },
      { offset: 1, color: "#ffffff" },
    ],
  },
  button: {
    textButtonColor: "#010203",
  },
  surface: {
    default: "#F5F5F7",
    elevated: "#EBEBED",
    glass: "rgba(255, 255, 255, 0.9)",
    tinted: "rgba(255, 255, 255, 0.95)",
    border: "rgba(0, 0, 0, 0.12)",
  },
  error: {
    highSaturation: "#C62828",
    main: "#f91a4b",
    light: "#fa5c7e",
    dark: "#540314",
    contrastText: "#FFFFFF",
  },
  success: {
    highSaturation: "#2E7D32",
    main: "#09C577",
    light: "#0FD870",
    dark: "#019247",
    contrastText: "#FFFFFF",
  },
  warning: {
    highSaturation: "#F57C00",
    main: "#01f203",
    light: "#01F203",
    dark: "#01F203",
    contrastText: "#FFFFFF",
  },
  info: {
    highSaturation: "#1976D2",
    main: "#0102f3",
    light: "#0102f3",
    dark: "#0102f3",
    contrastText: "#FFFFFF",
  },
}

export const lightThemeShadows: any = []

