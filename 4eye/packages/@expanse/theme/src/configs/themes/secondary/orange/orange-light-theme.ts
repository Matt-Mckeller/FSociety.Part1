import { Palette } from "@mui/material/styles"

export const orangeLightThemePalette: any = {
  mode: "light",
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
    transparent: "#FFFFFFCC",
    card: "#FFFFFF",
    light: "#FFF8F0", // A very light orange/cream
    medium: "#939393",
    dark: "#8B4513", // Saddle brown
    backdrop: "#00000099",
    offsetBG: "#8B4513",
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
    highSaturation: "#FF6F00", // Deep orange
    main: "#FF9800", // Material UI Orange
    dark: "#E65100", // Dark orange
    light: "#FFB74D", // Light orange
    contrastText: "#FFFFFF",
  },
  secondary: {
    highSaturation: "#E64A19",
    main: "#FF5722", // Deep orange secondary
    light: "#FF8A65",
    dark: "#E64A19",
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
      { offset: 0, color: "#E65100" },
      { offset: 1, color: "#ffffff" },
    ],
    background: [
      { offset: 0, color: "#E65100" },
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

