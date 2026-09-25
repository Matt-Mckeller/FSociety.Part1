/**
 * Orb Color Utilities
 *
 * Functions for manipulating orb colors, generating gradients,
 * and creating theme-aware color variants.
 */

/**
 * Parse a hex color to RGB components
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

/**
 * Create rgba string from hex and alpha
 */
export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(128, 128, 128, ${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Darken a hex color by a percentage
 */
export function darkenHex(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const factor = 1 - percent / 100;
  return rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
}

/**
 * Lighten a hex color by a percentage
 */
export function lightenHex(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const factor = percent / 100;
  return rgbToHex(
    rgb.r + (255 - rgb.r) * factor,
    rgb.g + (255 - rgb.g) * factor,
    rgb.b + (255 - rgb.b) * factor
  );
}

/**
 * Increase saturation of a hex color
 */
export function saturateHex(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  // Convert to HSL
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Increase saturation
  s = Math.min(1, s * (1 + percent / 100));

  // Convert back to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return rgbToHex(
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
  );
}

/**
 * Color config for different modes and variants
 */
export interface OrbColorConfig {
  /** Background color with alpha */
  bg: string;
  /** Border color with alpha */
  border: string;
  /** Glow/shadow color with alpha */
  glow: string;
  /** Text/icon color */
  text: string;
}

/**
 * Opacity presets for different modes
 * Light mode uses higher opacities for better visibility/vibrancy
 */
export const OPACITY_PRESETS = {
  dark: {
    bgBase: 0.35,
    bgGlass: 0.25,
    bgOverlap: 0.55,
    borderBase: 0.6,
    glowBase: 0.5,
    glowIntense: 0.7,
  },
  light: {
    // Higher opacities for light mode - more vibrant/visible
    bgBase: 0.35,
    bgGlass: 0.28,
    bgOverlap: 0.50,
    borderBase: 0.60,
    glowBase: 0.45,
    glowIntense: 0.65,
  },
} as const;

/**
 * Generate orb color config from a base color
 */
export function generateOrbColors(
  baseColor: string,
  mode: "dark" | "light",
  options?: {
    variant?: "glass" | "solid" | "glow" | "pulse" | "outline" | "overlap" | "float";
    vibrant?: boolean;
  }
): OrbColorConfig {
  const opacities = OPACITY_PRESETS[mode];
  const variant = options?.variant || "glass";
  const vibrant = options?.vibrant || false;

  // Vibrant mode boosts all opacities
  const boostFactor = vibrant ? 1.4 : 1;

  let bgOpacity: number;
  switch (variant) {
    case "overlap":
      bgOpacity = opacities.bgOverlap * boostFactor;
      break;
    case "solid":
      bgOpacity = 0.95;
      break;
    case "glass":
    default:
      bgOpacity = opacities.bgGlass * boostFactor;
      break;
  }

  const borderOpacity = opacities.borderBase * boostFactor;
  const glowOpacity =
    variant === "glow" || variant === "pulse" || variant === "float"
      ? opacities.glowIntense * boostFactor
      : opacities.glowBase;

  return {
    bg: hexToRgba(baseColor, Math.min(bgOpacity, 0.95)),
    border: hexToRgba(baseColor, Math.min(borderOpacity, 0.9)),
    glow: hexToRgba(baseColor, Math.min(glowOpacity, 0.85)),
    text: mode === "dark" ? "#ffffff" : "#1a1a1a",
  };
}

/**
 * Blend two colors with a ratio
 */
export function blendColors(color1: string, color2: string, ratio: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1;

  return rgbToHex(
    rgb1.r * (1 - ratio) + rgb2.r * ratio,
    rgb1.g * (1 - ratio) + rgb2.g * ratio,
    rgb1.b * (1 - ratio) + rgb2.b * ratio
  );
}

/**
 * Create a gradient string from multiple colors
 */
export function createGradient(
  colors: string[],
  direction: string = "135deg"
): string {
  const stops = colors.map((color, i) => {
    const position = (i / (colors.length - 1)) * 100;
    return `${color} ${position}%`;
  });
  return `linear-gradient(${direction}, ${stops.join(", ")})`;
}
