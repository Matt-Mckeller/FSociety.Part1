/**
 * Color Palettes for Lottie Theme Generation
 *
 * Extracted from /packages/ui/theme/configs/
 * These palettes are used by AI to generate contextually appropriate
 * color mappings for Lottie animation elements.
 */

export interface ColorPalette {
  /** Palette identifier (e.g., "blue-light", "purple-dark") */
  id: string
  /** Base color name */
  baseColor: "purple" | "blue" | "green" | "orange" | "red"
  /** Light or dark mode */
  mode: "light" | "dark"
  /** Human-readable name */
  name: string
  /** Color values for theme generation */
  colors: {
    /** Primary color - main brand color */
    primaryMain: string
    /** Primary dark - darker variant */
    primaryDark: string
    /** Primary light - lighter variant */
    primaryLight: string
    /** Primary high saturation - vivid variant */
    primaryHighSat: string
    /** Primary extra1 - additional variant */
    primaryExtra1?: string
    /** Primary extra2 - additional variant */
    primaryExtra2?: string
    /** Secondary main color */
    secondaryMain: string
    /** Secondary light */
    secondaryLight: string
    /** Secondary dark */
    secondaryDark: string
    /** Background default */
    backgroundDefault: string
    /** Background paper (cards, etc.) */
    backgroundPaper: string
    /** Text primary color */
    textPrimary: string
    /** Text secondary color */
    textSecondary: string
    /** Common black */
    black: string
    /** Common white */
    white: string
    /** Common gray */
    gray: string
    /** Gradient start color */
    gradientStart: string
    /** Gradient end color */
    gradientEnd: string
  }
}

/**
 * All available color palettes for theme generation
 */
export const COLOR_PALETTES: ColorPalette[] = [
  // ========== PURPLE ==========
  {
    id: "purple-light",
    baseColor: "purple",
    mode: "light",
    name: "Purple Light",
    colors: {
      primaryMain: "#a15bca",
      primaryDark: "#3c1a51",
      primaryLight: "#e1c2f5",
      primaryHighSat: "#9a1de7",
      primaryExtra1: "#D09FEF",
      primaryExtra2: "#A059C9",
      secondaryMain: "#e0c9ee",
      secondaryLight: "#D90479",
      secondaryDark: "#8C0343",
      backgroundDefault: "#FFFFFF",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#010203",
      textSecondary: "#707171",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#3c1a51",
      gradientEnd: "#FFFFFF",
    },
  },
  {
    id: "purple-dark",
    baseColor: "purple",
    mode: "dark",
    name: "Purple Dark",
    colors: {
      primaryMain: "#a15bca",
      primaryDark: "#3c1a51",
      primaryLight: "#e1c2f5",
      primaryHighSat: "#9a1de7",
      primaryExtra1: "#D09FEF",
      primaryExtra2: "#A059C9",
      secondaryMain: "#e0c9ee",
      secondaryLight: "#D90479",
      secondaryDark: "#8C0343",
      backgroundDefault: "#263237",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#F9F5FF",
      textSecondary: "#A9A7AD",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#14091b",
      gradientEnd: "#FFFFFF",
    },
  },

  // ========== BLUE ==========
  {
    id: "blue-light",
    baseColor: "blue",
    mode: "light",
    name: "Blue Light",
    colors: {
      primaryMain: "#4285f4",
      primaryDark: "#1976D2",
      primaryLight: "#90CAF9",
      primaryHighSat: "#1E88E5",
      secondaryMain: "#03A9F4",
      secondaryLight: "#29B6F6",
      secondaryDark: "#0288D1",
      backgroundDefault: "#FFFFFF",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#010203",
      textSecondary: "#707171",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#1A3C66",
      gradientEnd: "#FFFFFF",
    },
  },
  {
    id: "blue-dark",
    baseColor: "blue",
    mode: "dark",
    name: "Blue Dark",
    colors: {
      primaryMain: "#2196F3",
      primaryDark: "#1565C0",
      primaryLight: "#BBDEFB",
      primaryHighSat: "#1976D2",
      primaryExtra1: "#90CAF9",
      primaryExtra2: "#64B5F6",
      secondaryMain: "#03A9F4",
      secondaryLight: "#29B6F6",
      secondaryDark: "#0288D1",
      backgroundDefault: "#263237",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#E8F5FE",
      textSecondary: "#A9A7AD",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#0D47A1",
      gradientEnd: "#1E88E5",
    },
  },

  // ========== GREEN ==========
  {
    id: "green-light",
    baseColor: "green",
    mode: "light",
    name: "Green Light",
    colors: {
      primaryMain: "#4CAF50",
      primaryDark: "#388E3C",
      primaryLight: "#A5D6A7",
      primaryHighSat: "#2E7D32",
      primaryExtra1: "#81C784",
      primaryExtra2: "#66BB6A",
      secondaryMain: "#26A69A",
      secondaryLight: "#4DB6AC",
      secondaryDark: "#00695C",
      backgroundDefault: "#FFFFFF",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#010203",
      textSecondary: "#707171",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#1B5E20",
      gradientEnd: "#FFFFFF",
    },
  },
  {
    id: "green-dark",
    baseColor: "green",
    mode: "dark",
    name: "Green Dark",
    colors: {
      primaryMain: "#66BB6A",
      primaryDark: "#388E3C",
      primaryLight: "#A5D6A7",
      primaryHighSat: "#2E7D32",
      primaryExtra1: "#81C784",
      primaryExtra2: "#66BB6A",
      secondaryMain: "#26A69A",
      secondaryLight: "#4DB6AC",
      secondaryDark: "#00695C",
      backgroundDefault: "#263237",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#E8F5E9",
      textSecondary: "#A9A7AD",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#1B5E20",
      gradientEnd: "#43A047",
    },
  },

  // ========== ORANGE ==========
  {
    id: "orange-light",
    baseColor: "orange",
    mode: "light",
    name: "Orange Light",
    colors: {
      primaryMain: "#FF9800",
      primaryDark: "#EF6C00",
      primaryLight: "#FFB74D",
      primaryHighSat: "#FF6F00",
      primaryExtra1: "#FFB74D",
      primaryExtra2: "#FF9800",
      secondaryMain: "#FF7043",
      secondaryLight: "#FF8A65",
      secondaryDark: "#D84315",
      backgroundDefault: "#FFFFFF",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#010203",
      textSecondary: "#707171",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#BF360C",
      gradientEnd: "#FFFFFF",
    },
  },
  {
    id: "orange-dark",
    baseColor: "orange",
    mode: "dark",
    name: "Orange Dark",
    colors: {
      primaryMain: "#FFA726",
      primaryDark: "#EF6C00",
      primaryLight: "#FFB74D",
      primaryHighSat: "#FF6F00",
      primaryExtra1: "#FFB74D",
      primaryExtra2: "#FF9800",
      secondaryMain: "#FF7043",
      secondaryLight: "#FF8A65",
      secondaryDark: "#D84315",
      backgroundDefault: "#263237",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#FFF8F0",
      textSecondary: "#A9A7AD",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#BF360C",
      gradientEnd: "#FF6F00",
    },
  },

  // ========== RED ==========
  {
    id: "red-light",
    baseColor: "red",
    mode: "light",
    name: "Red Light",
    colors: {
      primaryMain: "#E53935",
      primaryDark: "#B71C1C",
      primaryLight: "#EF9A9A",
      primaryHighSat: "#D32F2F",
      secondaryMain: "#FF1744",
      secondaryLight: "#FF5252",
      secondaryDark: "#B71C1C",
      backgroundDefault: "#FFFFFF",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#010203",
      textSecondary: "#707171",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#4D0F0F",
      gradientEnd: "#FFFFFF",
    },
  },
  {
    id: "red-dark",
    baseColor: "red",
    mode: "dark",
    name: "Red Dark",
    colors: {
      primaryMain: "#be3030",
      primaryDark: "#880E4F",
      primaryLight: "#E57373",
      primaryHighSat: "#B71C1C",
      secondaryMain: "#FF1744",
      secondaryLight: "#FF5252",
      secondaryDark: "#B71C1C",
      backgroundDefault: "#FFFFFF",
      backgroundPaper: "#FFFFFF",
      textPrimary: "#010203",
      textSecondary: "#707171",
      black: "#010203",
      white: "#FFFFFF",
      gray: "#343434",
      gradientStart: "#4D0F0F",
      gradientEnd: "#FFFFFF",
    },
  },
]

/**
 * Get palette by ID
 */
export function getPaletteById(id: string): ColorPalette | undefined {
  return COLOR_PALETTES.find((p) => p.id === id)
}

/**
 * Get all palettes for a base color
 */
export function getPalettesByBaseColor(baseColor: string): ColorPalette[] {
  return COLOR_PALETTES.filter((p) => p.baseColor === baseColor)
}

/**
 * Get all palettes for a mode
 */
export function getPalettesByMode(mode: "light" | "dark"): ColorPalette[] {
  return COLOR_PALETTES.filter((p) => p.mode === mode)
}

/**
 * Base colors available for theme generation
 */
export const BASE_COLORS = ["purple", "blue", "green", "orange", "red"] as const
export type BaseColor = (typeof BASE_COLORS)[number]

/**
 * Generate palette summary for AI prompts
 */
export function formatPaletteForPrompt(palette: ColorPalette): string {
  const { colors } = palette
  return `${palette.name} (${palette.id}):
  Primary: main=${colors.primaryMain}, light=${colors.primaryLight}, dark=${colors.primaryDark}
  Secondary: main=${colors.secondaryMain}, light=${colors.secondaryLight}
  Background: default=${colors.backgroundDefault}, paper=${colors.backgroundPaper}
  Text: primary=${colors.textPrimary}, secondary=${colors.textSecondary}
  Accents: white=${colors.white}, black=${colors.black}, gray=${colors.gray}`
}
