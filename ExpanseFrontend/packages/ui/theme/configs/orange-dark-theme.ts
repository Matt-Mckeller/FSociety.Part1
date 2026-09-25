import { Palette } from "@mui/material/styles"
import { ExpanseComponentsThemeProps } from "../../../@types/expanse-theme"

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

export const orangeDarkComponents: ExpanseComponentsThemeProps = {
  ExpanseCharacter: {
    variants: {
      default: {
        headColor: orangeDarkThemePalette.primary.extra1 as string,
        limbColor: orangeDarkThemePalette.primary.extra1 as string,
        bodyColor: orangeDarkThemePalette.primary.extra2 as string,
      },
    },
  },
  ProgressBar: {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: "#FFB74D",
        outerDecorativeLayerFillColor: orangeDarkThemePalette.primary.main,
        innerBackgroundLayerFillColor:
          orangeDarkThemePalette.background.default,
        innerProgressLayerFillColor: "#FFCC80",
        textColor: orangeDarkThemePalette.common.white,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: "#FFCC80",
        outerDecorativeLayerFillColor:
          orangeDarkThemePalette.background.default,
        innerBackgroundLayerFillColor: orangeDarkThemePalette.primary
          .extra2 as string,
        innerProgressLayerFillColor: "#FFCC80",
        textColor: orangeDarkThemePalette.common.white,
      },
    },
  },
  Gem: {
    variants: {
      default: {
        strokeColor: orangeDarkThemePalette.common.white,
        fillColor: orangeDarkThemePalette.primary.light,
      },
      contrastBG: {
        strokeColor: orangeDarkThemePalette.common.white,
        fillColor: orangeDarkThemePalette.primary.light,
      },
    },
  },
  ExperienceIcon: {
    variants: {
      default: {
        fillColor: orangeDarkThemePalette.common.black,
      },
      contrast: {
        fillColor: orangeDarkThemePalette.common.white,
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
        outerBorderColor: orangeDarkThemePalette.primary.light,
        middleBorderColor: orangeDarkThemePalette.primary.main,
        innerBorderColor: orangeDarkThemePalette.primary.dark,
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
