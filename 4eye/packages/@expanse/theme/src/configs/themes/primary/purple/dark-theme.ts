import { Palette } from "@mui/material/styles"


const darkThemePalette: any = {
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
    active: "#FFFFFFB3", // White 70% - visible on dark backgrounds
    hover: "#FFFFFF14", // White 8%
    hoverOpacity: 0.08,
    selected: "#FFFFFF29", // White 16%
    selectedOpacity: 0.16,
    disabled: "#FFFFFF61", // White 38%
    disabledBackground: "#FFFFFF1F", // White 12%
    disabledOpacity: 0.38,
    focus: "#FFFFFF1F", // White 12%
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
  common: {
    black: "#010203",
    white: "#FFFFFF",
    gray: "#343434",
  },

  primary: {
    // alternative option I like a lot: #784af4 // slightly less contrast though
    // Todo is high and low saturation wanted here?
    highSaturation: "#9a1de7", // rgbToHex(hslToRgb("hsl(277, 81, 51)")),
    // lowSaturation: rgbToHex(hslToRgb('hsl(277, 31, 33)')),
    //  May want to add mroe blue here #A059FF
    main: "#a15bca", // rgbToHex(hslToRgb("hsl(278, 51, 57.5)")),
    // partialTransparency: alpha(rgbToHex(hslToRgb('hsl(277, 54, 50)')), 0.77),
    dark: "#3c1a51", // rgbToHex(hslToRgb("hsl(277, 51, 21)")),
    // light: '#9966cc', // hsl(270, 50, 60)
    light: "#e1c2f5", // rgbToHex(hslToRgb("hsl(277, 71, 86)")), // hsl(270, 50, 60)
    contrastText: "#FFFFFF",
    extra1: "#D09FEF", // wanted additional slight variants, used for character on dark mode
    extra2: "#A059C9", // wanted additional slight variants, used for character on dark mode
    // extra1: "#8D53DE", // wanted additional slight variants, used for character on dark mode
    // extra2: "#8400FF", // wanted additional slight variants, used for character on dark mode
    // liked color for text as a reference?: #a898be
  },
  secondary: {
    // todo: Decide on secondary colors, placeholders
    main: "#e0c9ee", // rgbToHex(hslToRgb("hsl(277, 51, 86)"))
    light: "#D90479",
    dark: "#8C0343",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#F9F5FF",
    secondary: "#A9A7AD", // darken("#F9F5FF", 0.32), // approximately, slightly adjusted
    disabled: "rgba(255, 255, 255, 0.42)",
  },
  divider: "rgba(239, 255, 233, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#14091b" }, // rgbToHex(hslToRgb("hsl(277, 51, 7)"))
      { offset: 1, color: "#ffffff" },
    ],
    background: [
      { offset: 0, color: "#14091b" }, // rgbToHex(hslToRgb("hsl(277, 51, 7)"))
      { offset: 1, color: "#ffffff" },
    ],
  },
  button: {
    textButtonColor: "#F9F5FF",
  },
  surface: {
    default: "#2a323c",
    elevated: "#343e4a",
    glass: "rgba(42, 50, 60, 0.85)",
    tinted: "rgba(42, 50, 60, 0.95)",
    border: "rgba(255, 255, 255, 0.12)",
  },
  error: {
    main: "#fdb0c0", //rgbToHex(hslToRgb("hsl(347, 94, 84)")),
    light: "#fed2dc", //rgbToHex(hslToRgb("hsl(347, 94, 91)")),
    dark: "#a30527", //rgbToHex(hslToRgb("hsl(347, 94, 33)")),
    contrastText: "#FFFFFF",
  },
  success: {
    // Todo: still needs verified
    main: "#09C577",
    light: "#0FD870",
    dark: "#019247",
    contrastText: "#FFFFFF",
  },
  warning: {
    // Todo: Unset / unused, optional orange: #F57C0F
    main: "#010203",
    light: "#010203",
    dark: "#010203",
    contrastText: "#FFFFFF",
  },
  info: {
    // Note: placeholder values, currently unused
    main: "#e9d8f3", // rgbToHex(hslToRgb("hsl(277, 51, 90)"))
    light: "#010203",
    dark: "#010203",
  },
}

// Transparency in shadows
const darkThemeEmptyShadowArray: any = new Array(25).fill("none")

export { darkThemePalette, darkThemeEmptyShadowArray }
