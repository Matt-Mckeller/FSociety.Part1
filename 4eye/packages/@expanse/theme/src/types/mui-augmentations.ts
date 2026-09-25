/**
 * MUI Module Augmentations
 * 
 * Extends MUI's type system with Expanse customizations:
 * - Palette: adds custom background, gradient, button colors
 * - Typography: adds custom variants (link, cardTitle, etc.)
 * - Breakpoints: replaces default with granular breakpoint system
 * 
 * Note: Component augmentations are now in their respective packages:
 * - @expanse/brand-core/theme/augmentation
 * - @expanse/theme/component-themes/augmentation
 */

/**
 * Extended Palette interface with custom properties
 * Adds background variations, gradient support, and custom button colors
 */
declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string
    paper: string
    transparent?: string
    card?: string
    light?: string
    medium?: string
    dark?: string
    backdrop?: string
    offsetBG?: string
    contrastBG?: string
  }

  interface CommonColors {
    black: string
    white: string
    gray: string
  }

  interface PaletteColor {
    main: string
    light: string
    dark: string
    contrastText: string
    highSaturation?: string
    extra1?: string
    extra2?: string
  }

  interface Palette {
    // Tertiary color (optional third brand color)
    tertiary?: {
      main: string
    }

    // Gradient definitions for backgrounds and effects
    gradient: {
      primary: Array<{ offset: number; color: string }>
      background: Array<{ offset: number; color: string }>
    }

    // Custom button colors
    button: {
      textButtonColor: string
    }

    // Surface colors for elevated UI elements (ActionBar, panels, etc.)
    surface: {
      /** Default surface color - solid panels */
      default: string
      /** Elevated surface - higher panels, cards */
      elevated: string
      /** Glass effect background (includes alpha) */
      glass: string
      /** Tinted surface - subtle overlay with slight transparency */
      tinted: string
      /** Surface border color */
      border: string
    }
  }

  interface PaletteOptions {
    tertiary?: {
      main?: string
    }

    gradient?: {
      primary?: Array<{ offset: number; color: string }>
      background?: Array<{ offset: number; color: string }>
    }

    button?: {
      textButtonColor?: string
    }

    surface?: {
      default?: string
      elevated?: string
      glass?: string
      tinted?: string
      border?: string
    }
  }
}

/**
 * Extended Typography with custom variants
 */
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    link: true
    cardTitle: true
    cardBody: true
    dialogTitle: true
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariantsOptions {
    link: any
    cardTitle: any
    cardBody: any
    dialogTitle: any
  }
  interface TypographyVariants {
    link: any
    cardTitle: any
    cardBody: any
    dialogTitle: any
  }
}

/**
 * Extended breakpoints for more granular responsive design
 * Replaces default xs/sm/md/lg/xl with device-specific breakpoints
 */
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false
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

// Ensures this file is treated as a module so the `declare module` blocks above
// perform type augmentation (merge) rather than ambient module replacement.
export {}
