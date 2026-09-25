/**
 * @expanse/theme - Font Metadata
 *
 * This module exports font metadata for use in applications.
 * The actual font files are in the adjacent `font/` directory.
 *
 * Usage varies by platform:
 * - Next.js: Use `next/font/local` with paths to font files
 * - React Native: Copy fonts to assets/fonts/ and load with expo-font
 * - Other web: Create @font-face CSS using these metadata values
 *
 * @see ./README.md for detailed usage examples
 */

/**
 * CSS font-family declaration for Xpens font.
 * Includes system-ui fallback for graceful degradation.
 */
export const fontFamily = {
  /** Primary brand font with fallbacks */
  xpens: '"Xpens", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  /** Just the font name (for @font-face declarations) */
  xpensName: 'Xpens',
} as const;

/**
 * Font weight name to numeric value mapping.
 * Matches CSS font-weight specification.
 */
export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

export type FontWeight = keyof typeof fontWeights;
export type FontWeightValue = (typeof fontWeights)[FontWeight];

/**
 * Font file definitions with weight and style information.
 * Useful for programmatic @font-face generation or next/font/local config.
 */
export const fontFiles = [
  // Thin (100)
  { file: 'Xpens-Thin.ttf', weight: 100, style: 'normal' },
  { file: 'Xpens-ThinItalic.ttf', weight: 100, style: 'italic' },
  // Extra Light (200)
  { file: 'Xpens-ExtraLight.ttf', weight: 200, style: 'normal' },
  { file: 'Xpens-ExtraLightItalic.ttf', weight: 200, style: 'italic' },
  // Light (300)
  { file: 'Xpens-Light.ttf', weight: 300, style: 'normal' },
  { file: 'Xpens-LightItalic.ttf', weight: 300, style: 'italic' },
  // Regular (400)
  { file: 'Xpens-Regular.ttf', weight: 400, style: 'normal' },
  { file: 'Xpens-Italic.ttf', weight: 400, style: 'italic' },
  // Medium (500)
  { file: 'Xpens-Medium.ttf', weight: 500, style: 'normal' },
  { file: 'Xpens-MediumItalic.ttf', weight: 500, style: 'italic' },
  // Semi Bold (600)
  { file: 'Xpens-SemiBold.ttf', weight: 600, style: 'normal' },
  { file: 'Xpens-SemiBoldItalic.ttf', weight: 600, style: 'italic' },
  // Bold (700)
  { file: 'Xpens-Bold.ttf', weight: 700, style: 'normal' },
  { file: 'Xpens-BoldItalic.ttf', weight: 700, style: 'italic' },
  // Extra Bold (800)
  { file: 'Xpens-ExtraBold.ttf', weight: 800, style: 'normal' },
  { file: 'Xpens-ExtraBoldItalic.ttf', weight: 800, style: 'italic' },
  // Black (900)
  { file: 'Xpens-Black.ttf', weight: 900, style: 'normal' },
  { file: 'Xpens-BlackItalic.ttf', weight: 900, style: 'italic' },
] as const;

export type FontFile = (typeof fontFiles)[number];

/**
 * Commonly used font subsets for optimized loading.
 * Apps can load just these weights for faster initial load.
 */
export const fontSubsets = {
  /** Minimal: Regular and Bold only */
  minimal: fontFiles.filter(
    (f) => f.style === 'normal' && (f.weight === 400 || f.weight === 700)
  ),
  /** Standard: Regular, Medium, SemiBold, Bold (normal only) */
  standard: fontFiles.filter(
    (f) => f.style === 'normal' && [400, 500, 600, 700].includes(f.weight)
  ),
  /** Full: All weights, normal only (no italics) */
  fullNormal: fontFiles.filter((f) => f.style === 'normal'),
  /** Complete: All weights and styles */
  complete: fontFiles,
} as const;

/**
 * Path to font directory relative to this package.
 * Useful for constructing paths in build tools.
 */
export const fontDirectory = '../font' as const;
