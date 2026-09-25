import { Palette } from "@mui/material/styles"

export const orangeDarkThemePalette: any = {
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
    contrastBG: "#FFF8F0",
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
    highSaturation: "#FF6F00",
    main: "#FFA726", // Lighter orange for dark mode
    dark: "#EF6C00",
    light: "#FFB74D",
    contrastText: "#FFFFFF",
    extra1: "#FFB74D",
    extra2: "#FF9800",
  },
  secondary: {
    highSaturation: "#E64A19",
    main: "#FF7043",
    light: "#FF8A65",
    dark: "#D84315",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#FFF8F0", // Light cream text
    secondary: "#A9A7AD",
    disabled: "rgba(255, 255, 255, 0.42)",
  },
  divider: "rgba(207, 216, 220, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#BF360C" }, // Dark orange gradient start
      { offset: 1, color: "#FF6F00" }, // Lighter orange gradient end
    ],
    background: [
      { offset: 0, color: "#BF360C" },
      { offset: 1, color: "#FF6F00" },
    ],
  },
  button: {
    textButtonColor: "#FFF8F0",
  },
  surface: {
    default: "#2d2820",
    elevated: "#3a3428",
    glass: "rgba(45, 40, 32, 0.85)",
    tinted: "rgba(45, 40, 32, 0.95)",
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

