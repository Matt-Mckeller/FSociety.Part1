import { Palette } from "@mui/material/styles"
import { ExpanseComponentsThemeProps } from "../../../@types/expanse-theme"

export const redDarkThemePalette: any = {
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
    contrastBG: "#FCE4EC", // Light red tint
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
    highSaturation: "#D32F2F", // Material Red 700
    main: "#EF5350", // Material Red 400 - lighter for dark mode
    dark: "#C62828", // Material Red 800
    light: "#FFCDD2", // Material Red 100
    contrastText: "#FFFFFF",
    extra1: "#EF9A9A", // Material Red 200 - for character head/limbs
    extra2: "#E57373", // Material Red 300 - for character body
  },
  secondary: {
    highSaturation: "#C2185B",
    main: "#F48FB1", // Material Pink 200
    light: "#F8BBD9",
    dark: "#AD1457",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#FCE4EC", // Light pink-tinted text
    secondary: "#A9A7AD",
    disabled: "rgba(255, 255, 255, 0.42)",
  },
  divider: "rgba(207, 216, 220, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#4D0F0F" }, // Dark red gradient start
      { offset: 1, color: "#C62828" }, // Lighter red gradient end
    ],
    background: [
      { offset: 0, color: "#4D0F0F" },
      { offset: 1, color: "#C62828" },
    ],
  },
  button: {
    textButtonColor: "#FCE4EC",
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

export const redDarkComponents: ExpanseComponentsThemeProps = {
  ExpanseCharacter: {
    variants: {
      default: {
        headColor: redDarkThemePalette.primary.extra1 as string,
        limbColor: redDarkThemePalette.primary.extra1 as string,
        bodyColor: redDarkThemePalette.primary.extra2 as string,
      },
    },
  },
  ProgressBar: {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: "#EF9A9A", // Light red stroke
        outerDecorativeLayerFillColor: redDarkThemePalette.primary.main,
        innerBackgroundLayerFillColor: redDarkThemePalette.background.default,
        innerProgressLayerFillColor: "#FFCDD2", // Very light red
        textColor: redDarkThemePalette.common.white,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: "#FFCDD2",
        outerDecorativeLayerFillColor: redDarkThemePalette.background.default,
        innerBackgroundLayerFillColor: redDarkThemePalette.primary
          .extra2 as string,
        innerProgressLayerFillColor: "#FFCDD2",
        textColor: redDarkThemePalette.common.white,
      },
    },
  },
  Gem: {
    variants: {
      default: {
        strokeColor: redDarkThemePalette.common.white,
        fillColor: redDarkThemePalette.primary.light,
      },
      contrastBG: {
        strokeColor: redDarkThemePalette.common.white,
        fillColor: redDarkThemePalette.primary.light,
      },
    },
  },
  ExperienceIcon: {
    variants: {
      default: {
        fillColor: redDarkThemePalette.common.black,
      },
      contrast: {
        fillColor: redDarkThemePalette.common.white,
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
        outerBorderColor: "rgba(255, 255, 255, 0.25)",
        middleBorderColor: "rgba(255, 255, 255, 0.50)",
        innerBorderColor: "rgba(255, 255, 255, 0.85)",
      },
      subtle: {
        outerBorderColor: "rgba(255, 255, 255, 0.12)",
        middleBorderColor: "rgba(255, 255, 255, 0.22)",
        innerBorderColor: "rgba(255, 255, 255, 0.35)",
      },
      primary: {
        outerBorderColor: redDarkThemePalette.primary.light,
        middleBorderColor: redDarkThemePalette.primary.main,
        innerBorderColor: redDarkThemePalette.primary.dark,
      },
      highContrast: {
        outerBorderColor: "rgba(255, 255, 255, 0.40)",
        middleBorderColor: "rgba(255, 255, 255, 0.65)",
        innerBorderColor: "rgba(255, 255, 255, 0.95)",
      },
    },
  },
}
