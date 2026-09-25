import { TypeBackground } from "@mui/material/styles"
import { ExpanseComponentsThemeProps } from "./expanse-theme"

declare module "@mui/material/styles" {
  interface Components extends ExpanseComponentsThemeProps {}
}
declare module "@mui/material/styles/createPalette" {
  export interface TypeBackground {
    default: string
    paper: string
    transparent: string
    card: string
    light: string
    medium: string
    dark: string
    backdrop: string
    // lightPrimary: string;
  }
  export interface PaletteOptions {
    gradient: {
      primary: { offset: number; color: string }[]
      background: { offset: number; color: string }[]
    }
    button: {
      textButtonColor: string
    }
  }
  export interface Palette {
    gradient: {
      primary: { offset: number; color: string }[]
      background: { offset: number; color: string }[]
    }
    button: {
      textButtonColor: string
    }
  }
  export interface CommonColors {
    gray: string
  }
  export interface PaletteColor {
    highSaturation: string
    extra1?: string
    extra2?: string
  }
  export interface PaletteColorOptions {
    highSaturation: string
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    cardTitle: any
    cardBody: any
    link: any
  }
}

declare module "@mui/material/styles/createTypography" {
  export interface TypographyOptions {
    link: any
    cardTitle: any
    cardBody: any
  }
}

declare module "@mui/material/styles/createPalette" {
  export interface TypeBackground {
    offsetBG: string
    contrastBG: string
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false // removes the `xs` breakpoint
    sm: false
    md: false
    lg: false
    xl: false
    zero: true
    mobileS: true
    mobileM: true
    mobileL: true
    tablet: true
    laptop: true
    laptopL: true
    desktop: true
    fourK: true
  }
}
