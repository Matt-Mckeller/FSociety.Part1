import {
  MixinsOptions,
  TypographyVariantsOptions,
  BreakpointsOptions,
  Theme,
  Components,
  Palette,
  alpha,
  lighten,
} from "@mui/material/styles"
import { AppBarHeight } from "./theme-constants"

export const spacing = 3

export const typography: TypographyVariantsOptions = {
  htmlFontSize: 16,
  fontSize: 16,
  fontFamily: ["Xpens", "Roboto", "sans-serif"].join(","),
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  h1: {
    fontWeight: 500,
    fontSize: "3rem",
    lineHeight: 1.167,
    letterSpacing: "normal",
    // letterSpacing: '-0.01562em',
  },
  h2: {
    fontWeight: 500,
    fontSize: "2rem",
    lineHeight: "2rem",
    letterSpacing: "normal",
  },
  h3: {
    fontWeight: 500,
    fontSize: "1.5rem",
    lineHeight: 1.167,
    letterSpacing: "normal",
  },
  h4: {
    fontWeight: 400,
    fontSize: "1.23rem",
    lineHeight: 1.235,
    letterSpacing: "normal",
  },
  h5: {
    fontWeight: 400,
    fontSize: "1.1rem",
    lineHeight: 1.334,
    letterSpacing: "0em",
  },
  h6: {
    fontWeight: 500,
    fontSize: "1.1rem",
    lineHeight: 1.6,
    letterSpacing: "normal",
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.0,
    letterSpacing: "normal",
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: "0.875rem",
    lineHeight: 0.875,
    letterSpacing: "normal",
  },
  body1: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.5,
    letterSpacing: "0.01007em",
  },
  body2: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.5,
    letterSpacing: "0.01007em",
  },
  link: {
    fontSize: 1.2,
  },
  button: {
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
  },
  caption: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
  },
  overline: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 2.66,
    letterSpacing: "0.08333em",
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1,
  },
  cardBody: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.2,
    letterSpacing: "0.00938em",
  },
  dialogTitle: {
    fontWeight: 500,
    fontSize: "2rem",
    lineHeight: 1,
  },
}

export const breakpoints: BreakpointsOptions = {
  values: {
    zero: 0,
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 1200,
    fourK: 2560,
    // xs: 0,
    // sm: 600,
    // md: 900,
    // lg: 1200,
    // xl: 1536,
  },
}

export const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
}

export const mixins: MixinsOptions = {
  // Just global css
  toolbar: {
    minHeight: 56,
    height: 56,
    maxHeight: 56,
    "@media(min - width: 0px)": {
      "@media(orientation: landscape)": {
        minHeight: 56,
        height: 56,
        maxHeight: 56,
      },
    },
    "@media(min - width: 600px)": {
      minHeight: 56,
      height: 56,
      maxHeight: 56,
    },
  },
}

const getTableStyles = (palette: Palette) => {
  if (palette.mode === "dark") {
    return {
      border: `1px solid ${alpha(palette.text.primary, 0.3)}`,
      ".MuiTableCell-root": {
        borderColor: palette.text.primary,
      },
      ".MuiTableHead-root": {
        borderColor: palette.text.primary,
      },
    }
  }
  return {}
}

export const getComponents: (
  palette: Palette,
  shadows: any,
  expanseComponents: Record<string, unknown>,
) => Components<Omit<Theme, "components">> = (
  palette,
  shadows,
  expanseComponents,
) => ({
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: palette.background.default,
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: "text.primary",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "7px",
        boxShadow: "",
        // backgroundImage:
        //   palette.mode === "dark"
        //     ? "linear-gradient(rgba(255,255,255, 0.05), rgba(255,255,255, 0.05))"
        //     : null,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: shadows[1],
        height: AppBarHeight,
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        backgroundColor: palette.background.default,
        padding: "0 24px",
        minHeight: AppBarHeight,
        flexGrow: 1,
        borderBottom:
          palette.mode === "dark"
            ? `1px solid ${alpha(palette.text.primary, 0.3)}`
            : "none",
        // backgroundImage: palette.mode === 'dark' ? 'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1))' : 'none',
      },
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        "&.MuiToggleButton-standard": {
          color: palette.text.primary,
          border: `1px solid ${alpha(palette.text.primary, 0.3)}`,
          "&:not(.Mui-selected)": {
            color: alpha(palette.text.primary, 0.8),
            "&:hover": {
              backgroundColor: alpha(palette.primary.main, 1),
              color: palette.primary.contrastText,
            },
          },
          "&.Mui-selected": {
            backgroundColor: palette.primary.main,
            color: palette.primary.contrastText,
            boxShadow: shadows[1],
          },
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: {},
      scrollPaper: {},
      scrollBody: {},
      paper: {
        borderRadius: "20px",
      },
    },
  },
  MuiLink: {
    defaultProps: {
      color: "text.primary",
    },
    styleOverrides: {
      root: {
        textShadow: "none",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
  MuiTable: {
    styleOverrides: {
      root: getTableStyles(palette),
    },
  },
  ...expanseComponents,
})
