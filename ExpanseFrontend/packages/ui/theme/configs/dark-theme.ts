import { Palette } from "@mui/material/styles"
import { ExpanseComponentsThemeProps } from "../../../@types/expanse-theme"

const darkThemePalette: Palette = {
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
    active: "#0000008A",
    hover: "#0000000A",
    hoverOpacity: 0.04,
    selected: "#00000015",
    selectedOpacity: 0.08,
    // Todo: Is a transparent value wanted here?
    disabled: "#FFFFFF61", // alpha("#FFFFFF", 0.38),
    disabledBackground: "#FFFFFF21",
    disabledOpacity: 0.38,
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

export const expanseDarkComponents: ExpanseComponentsThemeProps = {
  ExpanseCharacter: {
    variants: {
      default: {
        headColor: darkThemePalette.primary.extra1 as string,
        limbColor: darkThemePalette.primary.extra1 as string,
        bodyColor: darkThemePalette.primary.extra2 as string,
      },
    },
  },
  ProgressBar: {
    variants: {
      default: {
        outerDecorativeLayerStrokeColor: "#CBB3DA",
        outerDecorativeLayerFillColor: darkThemePalette.primary.main,
        innerBackgroundLayerFillColor: darkThemePalette.background.default,
        innerProgressLayerFillColor: "#8400FF",
        textColor: darkThemePalette.common.white,
      },
      defaultFilled: {
        outerDecorativeLayerStrokeColor: "#8400FF",
        outerDecorativeLayerFillColor: darkThemePalette.background.default,
        innerBackgroundLayerFillColor: darkThemePalette.primary
          .extra2 as string,
        innerProgressLayerFillColor: "#8400FF",
        textColor: darkThemePalette.common.white,
      },
    },
  },
  Gem: {
    variants: {
      default: {
        strokeColor: darkThemePalette.common.white,
        fillColor: darkThemePalette.primary.light,
      },
      contrastBG: {
        strokeColor: darkThemePalette.common.white,
        fillColor: darkThemePalette.primary.light,
      },
    },
  },
  ExperienceIcon: {
    variants: {
      default: {
        fillColor: darkThemePalette.common.black,
      },
      contrast: {
        fillColor: darkThemePalette.common.white,
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
        outerBorderColor: darkThemePalette.primary.light,
        middleBorderColor: darkThemePalette.primary.main,
        innerBorderColor: darkThemePalette.primary.dark,
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
