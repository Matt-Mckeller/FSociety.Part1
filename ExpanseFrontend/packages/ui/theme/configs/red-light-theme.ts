import { Palette, PaletteColor } from "@mui/material/styles"
import { ExpanseComponentsThemeProps } from "../../../@types/expanse-theme"
import { PaletteAugmentColorOptions } from "@mui/material/styles/createPalette"

export const redLightThemePalette: Palette = {
  mode: "light",
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
    transparent: "#FFFFFFCC",
    light: "#FCE4EC",
    medium: "#939393",
    dark: "#880E4F",
    backdrop: "#00000099",
    offsetBG: "#880E4F",
    contrastBG: "#010203",
    card: "",
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
  // Similar structure, only the color values in primary, secondary and background are changed.
  //   primary: {
  //     highSaturation: "#D32F2F",
  //     main: "#C62828",
  //     dark: "#B71C1C",
  //     light: "#E57373",
  //     contrastText: "#FFFFFF",
  //   },
  primary: {
    highSaturation: "#B71C1C", // Deep crimson, high saturation
    main: "#be3030", // Slightly lighter crimson
    dark: "#880E4F", // Darker crimson
    light: "#E57373", // Light crimson

    // Even lighter option #f7a3a3
    contrastText: "#FFFFFF",
    // rgb(154 6 6)
  },
  //   primary: {
  //     highSaturation: "#D32F2F", // Brick red, high saturation
  //     main: "#E53935", // Lighter brick red
  //     dark: "#B71C1C", // Darker brick red
  //     light: "#EF9A9A", // Light brick red
  //     contrastText: "#FFFFFF",
  //   },
  secondary: {
    main: "#FF1744",
    light: "#FF5252",
    dark: "#B71C1C",
    contrastText: "#FFFFFF",
    highSaturation: "",
  },
  text: {
    primary: "#010203",
    secondary: "#707171",
    disabled: "rgba(0, 0, 0, 0.42)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  gradient: {
    primary: [
      { offset: 0, color: "#4D0F0F" }, // Dark red gradient
      { offset: 1, color: "#ffffff" },
    ],
    background: [
      { offset: 0, color: "#4D0F0F" },
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
    highSaturation: "",
  },
  success: {
    main: "#09C577",
    light: "#0FD870",
    dark: "#019247",
    contrastText: "#FFFFFF",
    highSaturation: "",
  },
  warning: {
    main: "#01f203",
    light: "#01F203",
    dark: "#01F203",
    contrastText: "#FFFFFF",
    highSaturation: "",
  },
  info: {
    main: "#0102f3",
    light: "#0102f3",
    dark: "#0102f3",
    contrastText: "#FFFFFF",
    highSaturation: "",
  },
  contrastThreshold: 0,
  tonalOffset: 0,
  grey: undefined,
  getContrastText: function (background: string): string {
    throw new Error("Function not implemented.")
  },
  augmentColor: function (options: PaletteAugmentColorOptions): PaletteColor {
    throw new Error("Function not implemented.")
  },
}

export const lightThemeShadows: any = [
  // ... (Shadows remain the same)
]

export const redLightComponents: ExpanseComponentsThemeProps = {
  ExpanseCharacter: {
    variants: {
      default: {
        headColor: redLightThemePalette.primary.light,
        limbColor: redLightThemePalette.primary.light,
        bodyColor: redLightThemePalette.primary.main,
      },
    },
  },
  ProgressBar: {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: "#9A0606", // Darkened light red
        outerDecorativeLayerFillColor: redLightThemePalette.primary.main,
        innerBackgroundLayerFillColor: redLightThemePalette.common.white,
        innerProgressLayerFillColor: "#9A0606", // Darkened light red
        textColor: redLightThemePalette.common.black,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: redLightThemePalette.primary.main,
        outerDecorativeLayerFillColor: redLightThemePalette.common.white,
        innerBackgroundLayerFillColor: redLightThemePalette.primary.main,
        innerProgressLayerFillColor: redLightThemePalette.primary.main,
        textColor: redLightThemePalette.common.white,
      },
    },
  },
  Gem: {
    variants: {
      default: {
        strokeColor: redLightThemePalette.common.black,
        fillColor: redLightThemePalette.primary.light,
      },
      contrastBG: {
        strokeColor: redLightThemePalette.common.black,
        fillColor: redLightThemePalette.common.white,
      },
    },
  },
  ExperienceIcon: {
    variants: {
      default: {
        fillColor: redLightThemePalette.common.black,
      },
      contrast: {
        fillColor: redLightThemePalette.common.white,
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
        outerBorderColor: redLightThemePalette.primary.light,
        middleBorderColor: redLightThemePalette.primary.main,
        innerBorderColor: redLightThemePalette.primary.dark,
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
