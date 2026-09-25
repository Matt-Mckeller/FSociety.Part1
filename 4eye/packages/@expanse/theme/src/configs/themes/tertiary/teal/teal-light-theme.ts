import { Palette } from "@mui/material/styles"

export const tealLightThemePalette: any = {
  mode: "light",
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
    transparent: "#FFFFFFCC",
    card: "#FFFFFF",
    light: "#E0F2F1", // Material Teal 50
    medium: "#939393",
    dark: "#004D40", // Material Teal 900
    backdrop: "#00000099",
    offsetBG: "#004D40",
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
    highSaturation: "#009688", // Material Teal 500
    main: "#00897B", // Material Teal 600
    dark: "#00695C", // Material Teal 800
    light: "#4DB6AC", // Material Teal 300
    contrastText: "#FFFFFF",
  },
  secondary: {
    highSaturation: "#0097A7",
    main: "#00BCD4", // Cyan - complement to teal
    light: "#4DD0E1",
    dark: "#00838F",
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
      { offset: 0, color: "#004D40" }, // Material Teal 900
      { offset: 1, color: "#ffffff" },
    ],
    background: [
      { offset: 0, color: "#004D40" },
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
    main: "#FF9800",
    light: "#FFB74D",
    dark: "#F57C00",
    contrastText: "#FFFFFF",
  },
  info: {
    highSaturation: "#1976D2",
    main: "#2196F3",
    light: "#64B5F6",
    dark: "#1976D2",
    contrastText: "#FFFFFF",
  },
}

export const lightThemeShadows: any = []

