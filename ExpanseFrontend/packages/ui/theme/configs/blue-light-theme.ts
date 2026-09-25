// From google, probably needs tweaked some
// #4285f4
// #1a73e8

// rgb(240,142,177) #F08EB1
// rgb(191,4,91) #BF045B
// rgb(217,4,121) #D90479
// rgb(140,3,67) #8C0343
import { Palette } from "@mui/material/styles"
import { ExpanseComponentsThemeProps } from "../../../@types/expanse-theme"

export const blueLightThemePalette: Palette = {
  mode: "light",
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
    transparent: "#FFFFFFCC",
    light: "#F0F8FF", // A very light blue
    medium: "#939393",
    dark: "#2C4F76", // Darker blue similar to the dark purple
    backdrop: "#00000099",
    offsetBG: "#2C4F76",
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
    highSaturation: "#1E88E5", // A slightly more saturated blue
    main: "#4285f4",
    dark: "#1976D2",
    light: "#90CAF9",
    // Even lighter option #b8daf5
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#03A9F4", // A bright secondary blue
    light: "#29B6F6",
    dark: "#0288D1",
    contrastText: "#FFFFFF",
  },
  tertiary: {
    main: "#111B8B",
  },
  text: {
    primary: "#010203",
    secondary: "#707171",
    disabled: "rgba(0, 0, 0, 0.42)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#1A3C66" }, // A dark blue gradient start
      { offset: 1, color: "#ffffff" },
    ],
    background: [
      { offset: 0, color: "#1A3C66" },
      { offset: 1, color: "#ffffff" },
    ],
  },
  button: {
    textButtonColor: "#010203",
  },
  error: {
    main: "#f91a4b",
    light: "#fa5c7e",
    dark: "#540314",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#09C577",
    light: "#0FD870",
    dark: "#019247",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#01f203",
    light: "#01F203",
    dark: "#01F203",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#0102f3",
    light: "#0102f3",
    dark: "#0102f3",
  },
}

// Shadows and Expanse Components remain the same.
export const lightThemeShadows: any = [
  // ... (Shadows remain the same)
]

export const blueLightComponents: ExpanseComponentsThemeProps = {
  ExpanseCharacter: {
    variants: {
      default: {
        headColor: blueLightThemePalette.primary.light,
        limbColor: blueLightThemePalette.primary.light,
        bodyColor: blueLightThemePalette.primary.main,
      },
    },
  },
  ProgressBar: {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: "#00589F",
        outerDecorativeLayerFillColor: blueLightThemePalette.primary.main,
        innerBackgroundLayerFillColor: blueLightThemePalette.common.white,
        innerProgressLayerFillColor: "#00589F",
        textColor: blueLightThemePalette.common.black,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: blueLightThemePalette.primary.main,
        outerDecorativeLayerFillColor: blueLightThemePalette.common.white,
        innerBackgroundLayerFillColor: blueLightThemePalette.primary.main,
        innerProgressLayerFillColor: blueLightThemePalette.primary.main,
        textColor: blueLightThemePalette.common.white,
      },
    },
  },
  Gem: {
    variants: {
      default: {
        strokeColor: blueLightThemePalette.common.black,
        fillColor: blueLightThemePalette.primary.light,
      },
      contrastBG: {
        strokeColor: blueLightThemePalette.common.black,
        fillColor: blueLightThemePalette.common.white,
      },
    },
  },
  ExperienceIcon: {
    variants: {
      default: {
        fillColor: blueLightThemePalette.common.black,
      },
      contrast: {
        fillColor: blueLightThemePalette.common.white,
      },
    },
  },
  GameDrawer: {
    variants: {
      default: {
        width: 240,
      },
    },
  },
  ExpandingBorderBox: {
    variants: {
      default: {
        // Improved contrast: 25% → 50% → 85% opacity gradient
        outerBorderColor: "rgba(0, 0, 0, 0.25)",
        middleBorderColor: "rgba(0, 0, 0, 0.50)",
        innerBorderColor: "rgba(0, 0, 0, 0.85)",
      },
      subtle: {
        outerBorderColor: "rgba(0, 0, 0, 0.12)",
        middleBorderColor: "rgba(0, 0, 0, 0.22)",
        innerBorderColor: "rgba(0, 0, 0, 0.35)",
      },
      primary: {
        outerBorderColor: blueLightThemePalette.primary.light,
        middleBorderColor: blueLightThemePalette.primary.main,
        innerBorderColor: blueLightThemePalette.primary.dark,
      },
      highContrast: {
        // WCAG AA compliant: 40% → 65% → 95% for maximum accessibility
        outerBorderColor: "rgba(0, 0, 0, 0.40)",
        middleBorderColor: "rgba(0, 0, 0, 0.65)",
        innerBorderColor: "rgba(0, 0, 0, 0.95)",
      },
    },
  },
}
