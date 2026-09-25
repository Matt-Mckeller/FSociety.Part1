import { Palette } from "@mui/material/styles"
import { ExpanseComponentsThemeProps } from "../../../@types/expanse-theme"

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

export const tealLightComponents: ExpanseComponentsThemeProps = {
  ExpanseCharacter: {
    variants: {
      default: {
        headColor: tealLightThemePalette.primary.light,
        limbColor: tealLightThemePalette.primary.light,
        bodyColor: tealLightThemePalette.primary.main,
      },
    },
  },
  ProgressBar: {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: "#00695C", // Material Teal 800
        outerDecorativeLayerFillColor: tealLightThemePalette.primary.main,
        innerBackgroundLayerFillColor: tealLightThemePalette.common.white,
        innerProgressLayerFillColor: "#00695C",
        textColor: tealLightThemePalette.common.black,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: tealLightThemePalette.primary.main,
        outerDecorativeLayerFillColor: tealLightThemePalette.common.white,
        innerBackgroundLayerFillColor: tealLightThemePalette.primary.main,
        innerProgressLayerFillColor: tealLightThemePalette.primary.main,
        textColor: tealLightThemePalette.common.white,
      },
    },
  },
  Gem: {
    variants: {
      default: {
        strokeColor: tealLightThemePalette.common.black,
        fillColor: tealLightThemePalette.primary.light,
      },
      contrastBG: {
        strokeColor: tealLightThemePalette.common.black,
        fillColor: tealLightThemePalette.common.white,
      },
    },
  },
  ExperienceIcon: {
    variants: {
      default: {
        fillColor: tealLightThemePalette.common.black,
      },
      contrast: {
        fillColor: tealLightThemePalette.common.white,
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
        outerBorderColor: tealLightThemePalette.primary.light,
        middleBorderColor: tealLightThemePalette.primary.main,
        innerBorderColor: tealLightThemePalette.primary.dark,
      },
      highContrast: {
        outerBorderColor: "rgba(0, 0, 0, 0.40)",
        middleBorderColor: "rgba(0, 0, 0, 0.65)",
        innerBorderColor: "rgba(0, 0, 0, 0.95)",
      },
    },
  },
}
