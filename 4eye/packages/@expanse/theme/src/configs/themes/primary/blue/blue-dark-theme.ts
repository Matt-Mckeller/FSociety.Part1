import { Palette } from "@mui/material/styles"


export const blueDarkThemePalette: any = {
  mode: "dark",
  background: {
    default: "#263237",
    paper: "#FFFFFF",
    transparent: "#FFFFFFCC",
    light: "#F7F3F9",
    medium: "#939393",
    dark: "#434343",
    backdrop: "#00000099",
    offsetBG: "#EAEAEA",
    contrastBG: "#F9F5FF",
  },
  action: {
    active: "#FFFFFF8A", // Adjusted for dark background
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
    highSaturation: "#1976D2",
    main: "#2196F3",
    dark: "#1565C0",
    light: "#BBDEFB",
    contrastText: "#FFFFFF",
    extra1: "#90CAF9",
    extra2: "#64B5F6",
  },
  secondary: {
    main: "#03A9F4",
    light: "#29B6F6",
    dark: "#0288D1",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#E8F5FE", // Light blue text
    secondary: "#A9A7AD",
    disabled: "rgba(255, 255, 255, 0.42)",
  },
  divider: "rgba(207, 216, 220, 0.12)", // Light gray divider
  gradient: {
    primary: [
      { offset: 0, color: "#0D47A1" }, // Dark blue gradient start
      { offset: 1, color: "#1E88E5" }, // Lighter blue gradient end
    ],
    background: [
      { offset: 0, color: "#0D47A1" },
      { offset: 1, color: "#1E88E5" },
    ],
  },
  button: {
    textButtonColor: "#E8F5FE",
  },
  surface: {
    default: "#1a2433",
    elevated: "#243040",
    glass: "rgba(26, 36, 51, 0.85)",
    tinted: "rgba(26, 36, 51, 0.95)",
    border: "rgba(255, 255, 255, 0.12)",
  },
  error: {
    main: "#FFCDD2", // Light red for errors
    light: "#FFEBEE",
    dark: "#B71C1C",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#81C784", // Light green for success
    light: "#C8E6C9",
    dark: "#1B5E20",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#FFD54F", // Light yellow for warnings
    light: "#FFF9C4",
    dark: "#FF6F00",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#81D4FA", // Light blue for info
    light: "#B3E5FC",
    dark: "#0277BD",
  },
}

export const darkThemeEmptyShadowArray: any = new Array(25).fill("none")
