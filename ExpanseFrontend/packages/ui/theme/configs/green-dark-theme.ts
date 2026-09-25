import { Palette } from "@mui/material/styles"
import { ExpanseComponentsThemeProps } from "../../../@types/expanse-theme"

export const greenDarkThemePalette: any = {
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
    contrastBG: "#F1F8F4",
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
    highSaturation: "#2E7D32",
    main: "#66BB6A", // Lighter green for dark mode
    dark: "#388E3C",
    light: "#A5D6A7",
    contrastText: "#FFFFFF",
    extra1: "#81C784",
    extra2: "#66BB6A",
  },
  secondary: {
    highSaturation: "#00796B",
    main: "#26A69A",
    light: "#4DB6AC",
    dark: "#00695C",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#E8F5E9", // Light green text
    secondary: "#A9A7AD",
    disabled: "rgba(255, 255, 255, 0.42)",
  },
  divider: "rgba(207, 216, 220, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#1B5E20" }, // Dark green gradient start
      { offset: 1, color: "#43A047" }, // Lighter green gradient end
    ],
    background: [
      { offset: 0, color: "#1B5E20" },
      { offset: 1, color: "#43A047" },
    ],
  },
  button: {
    textButtonColor: "#E8F5E9",
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

export const greenDarkComponents: ExpanseComponentsThemeProps = {
  ExpanseCharacter: {
    variants: {
      default: {
        headColor: greenDarkThemePalette.primary.extra1 as string,
        limbColor: greenDarkThemePalette.primary.extra1 as string,
        bodyColor: greenDarkThemePalette.primary.extra2 as string,
      },
    },
  },
  ProgressBar: {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: "#81C784",
        outerDecorativeLayerFillColor: greenDarkThemePalette.primary.main,
        innerBackgroundLayerFillColor: greenDarkThemePalette.background.default,
        innerProgressLayerFillColor: "#A5D6A7",
        textColor: greenDarkThemePalette.common.white,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: "#A5D6A7",
        outerDecorativeLayerFillColor: greenDarkThemePalette.background.default,
        innerBackgroundLayerFillColor: greenDarkThemePalette.primary
          .extra2 as string,
        innerProgressLayerFillColor: "#A5D6A7",
        textColor: greenDarkThemePalette.common.white,
      },
    },
  },
  Gem: {
    variants: {
      default: {
        strokeColor: greenDarkThemePalette.common.white,
        fillColor: greenDarkThemePalette.primary.light,
      },
      contrastBG: {
        strokeColor: greenDarkThemePalette.common.white,
        fillColor: greenDarkThemePalette.primary.light,
      },
    },
  },
  ExperienceIcon: {
    variants: {
      default: {
        fillColor: greenDarkThemePalette.common.black,
      },
      contrast: {
        fillColor: greenDarkThemePalette.common.white,
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
        outerBorderColor: greenDarkThemePalette.primary.light,
        middleBorderColor: greenDarkThemePalette.primary.main,
        innerBorderColor: greenDarkThemePalette.primary.dark,
      },
      highContrast: {
        // WCAG AA compliant: 40% → 65% → 95% for maximum accessibility
        outerBorderColor: "rgba(255, 255, 255, 0.40)",
        middleBorderColor: "rgba(255, 255, 255, 0.65)",
        innerBorderColor: "rgba(255, 255, 255, 0.95)",
      },
    },
  },
}
