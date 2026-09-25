"use client";

import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import type { OrbColor, OrbColorMode, OrbVariant } from "./types";
import { generateOrbColors, hexToRgba, type OrbColorConfig } from "./orbColors";

/**
 * Ability color palette from gamified themes.
 * Maps orb color names to theme palette keys.
 */
export interface AbilityPalette {
  cyan: string;
  mint: string;
  purple: string;
  gold: string;
  red: string;
  blue: string;
}

/**
 * Extended MUI palette with ability colors
 */
interface ExtendedPalette {
  ability?: AbilityPalette;
  primary: { main: string; light: string; dark: string };
  secondary: { main: string };
  success: { main: string };
  warning: { main: string };
  error: { main: string };
  info: { main: string };
  mode: "light" | "dark";
}

/**
 * Map of OrbColor to the corresponding theme palette key
 */
const ORB_TO_PALETTE_MAP: Record<Exclude<OrbColor, "custom">, string> = {
  default: "default",
  ai: "ability.purple",
  primary: "primary.main",
  success: "success.main",
  warning: "warning.main",
  danger: "error.main",
  cyan: "ability.cyan",
  mint: "ability.mint",
};

/**
 * Fallback colors when theme doesn't have ability palette
 */
const FALLBACK_ABILITY_COLORS: AbilityPalette = {
  cyan: "#00d4ff",
  mint: "#6bffc3",
  purple: "#8B5CF6",
  gold: "#F59E0B",
  red: "#EF4444",
  blue: "#3B82F6",
};

/**
 * Get a value from a nested object path
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

/**
 * Options for useOrbColors hook
 */
export interface UseOrbColorsOptions {
  /** Color preset or custom hex */
  color: OrbColor | string;
  /** Force specific color mode */
  colorMode?: OrbColorMode;
  /** Visual variant affects opacity */
  variant?: OrbVariant;
  /** Enable vibrant mode for higher saturation */
  vibrant?: boolean;
}

/**
 * Return type for useOrbColors hook
 */
export interface UseOrbColorsReturn {
  /** Generated color config */
  colors: OrbColorConfig;
  /** Current color mode (resolved auto) */
  mode: "light" | "dark";
  /** The base hex color being used */
  baseColor: string;
  /** Whether ability palette is available */
  hasAbilityPalette: boolean;
}

/**
 * Hook to get orb colors from the current MUI theme.
 *
 * Uses the `ability` palette from gamified themes when available,
 * falls back to standard colors otherwise.
 *
 * @example
 * ```tsx
 * const { colors, mode } = useOrbColors({
 *   color: "cyan",
 *   variant: "glow",
 *   colorMode: "auto",
 * });
 * ```
 */
export function useOrbColors(options: UseOrbColorsOptions): UseOrbColorsReturn {
  const theme = useTheme();
  const palette = theme.palette as unknown as ExtendedPalette;

  return useMemo(() => {
    const { color, colorMode = "auto", variant = "glass", vibrant = false } = options;

    // Determine effective color mode
    const mode: "light" | "dark" =
      colorMode === "auto" ? palette.mode : colorMode;

    // Get ability palette (gamified themes have this)
    const ability = palette.ability || FALLBACK_ABILITY_COLORS;
    const hasAbilityPalette = !!palette.ability;

    // Resolve base color
    let baseColor: string;

    if (color === "custom" || color.startsWith("#") || color.startsWith("rgb")) {
      // Custom color - use directly
      baseColor = color.startsWith("#") ? color : "#808080";
    } else if (color === "default") {
      // Default - use neutral gray
      baseColor = mode === "dark" ? "#606060" : "#a0a0a0";
    } else if (color in ORB_TO_PALETTE_MAP) {
      const paletteKey = ORB_TO_PALETTE_MAP[color as Exclude<OrbColor, "custom">];

      if (paletteKey.startsWith("ability.")) {
        const abilityKey = paletteKey.split(".")[1] as keyof AbilityPalette;
        baseColor = ability[abilityKey];
      } else {
        const resolved = getNestedValue(palette as unknown as Record<string, unknown>, paletteKey);
        baseColor = typeof resolved === "string" ? resolved : FALLBACK_ABILITY_COLORS.blue;
      }
    } else {
      baseColor = "#808080";
    }

    // Generate color config with enhanced light mode colors
    const colors = generateOrbColors(baseColor, mode, { variant, vibrant });

    return {
      colors,
      mode,
      baseColor,
      hasAbilityPalette,
    };
  }, [
    options.color,
    options.colorMode,
    options.variant,
    options.vibrant,
    palette.mode,
    palette.ability,
    palette.primary?.main,
    palette.success?.main,
    palette.warning?.main,
    palette.error?.main,
    palette.info?.main,
  ]);
}

/**
 * Hook to get the full ability palette from theme
 */
export function useAbilityPalette(): AbilityPalette {
  const theme = useTheme();
  const palette = theme.palette as unknown as ExtendedPalette;
  return palette.ability || FALLBACK_ABILITY_COLORS;
}

/**
 * Hook to check if current theme is gamified
 */
export function useIsGamifiedTheme(): boolean {
  const theme = useTheme();
  const palette = theme.palette as unknown as ExtendedPalette;
  return !!palette.ability;
}
