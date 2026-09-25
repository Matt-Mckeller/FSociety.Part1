import { Palette } from "@mui/material/styles"
import { ExpanseComponentsThemeProps } from "../../../@types/expanse-theme"

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

export const greenLightComponents: ExpanseComponentsThemeProps = {
  ExpanseCharacter: {
    variants: {
      default: {
        headColor: greenLightThemePalette.primary.light,
        limbColor: greenLightThemePalette.primary.light,
        bodyColor: greenLightThemePalette.primary.main,
      },
    },
  },
  ProgressBar: {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: "#388E3C",
        outerDecorativeLayerFillColor: greenLightThemePalette.primary.main,
        innerBackgroundLayerFillColor: greenLightThemePalette.common.white,
        innerProgressLayerFillColor: "#388E3C",
        textColor: greenLightThemePalette.common.black,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: greenLightThemePalette.primary.main,
        outerDecorativeLayerFillColor: greenLightThemePalette.common.white,
        innerBackgroundLayerFillColor: greenLightThemePalette.primary.main,
        innerProgressLayerFillColor: greenLightThemePalette.primary.main,
        textColor: greenLightThemePalette.common.white,
      },
    },
  },
  Gem: {
    variants: {
      default: {
        strokeColor: greenLightThemePalette.common.black,
        fillColor: greenLightThemePalette.primary.light,
      },
      contrastBG: {
        strokeColor: greenLightThemePalette.common.black,
        fillColor: greenLightThemePalette.common.white,
      },
    },
  },
  ExperienceIcon: {
    variants: {
      default: {
        fillColor: greenLightThemePalette.common.black,
      },
      contrast: {
        fillColor: greenLightThemePalette.common.white,
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
        outerBorderColor: greenLightThemePalette.primary.light,
        middleBorderColor: greenLightThemePalette.primary.main,
        innerBorderColor: greenLightThemePalette.primary.dark,
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
