import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

/**
 * Shape options for action orbs
 */
export type OrbShape = "circle" | "square" | "diamond" | "hexagon" | "pill";

/**
 * Size options for orbs
 */
export type OrbSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Visual variant for orbs
 */
export type OrbVariant = "glass" | "solid" | "glow" | "pulse" | "outline" | "float";

/**
 * Preset color options
 */
export type OrbColor = 
  | "default" 
  | "ai" 
  | "primary" 
  | "success" 
  | "warning" 
  | "danger" 
  | "cyan"      // Electric/tech feel - #00d4ff
  | "mint"      // Fresh/growth feel - #6bffc3
  | "custom";

/**
 * Theme presets for orbs
 * - gamified: Vibrant ability colors with strong contrast
 * - gamified-desaturated: Same hues, softer/pastel (Japan-style palette)
 */
export type OrbThemePreset = "gamified" | "gamified-desaturated";

/**
 * Hotkey display style options
 */
export type HotkeyDisplayStyle = 
  | "none"       // No hotkey shown
  | "badge"      // Small corner badge (top-right)
  | "overlay"    // Centered letter on orb (semi-transparent bg)
  | "underline"  // Key shown below orb
  | "ring";      // Key in outer ring segment

/**
 * Position mode for single orbs
 */
export type OrbPositionMode = "free" | "fixed";

/**
 * Pattern presets for orb clusters
 */
export type OrbPattern =
  | "corners" // 4 corners of container
  | "bottom-arc" // Arc at bottom
  | "top-arc" // Arc at top
  | "left-stack" // Vertical stack on left
  | "right-stack" // Vertical stack on right
  | "radial" // Circle around center
  | "diagonal-tl" // Diagonal from top-left
  | "diagonal-tr" // Diagonal from top-right
  | "bottom-row" // Horizontal row at bottom
  | "custom"; // User-defined positions

/**
 * Color mode for light/dark themes
 */
export type OrbColorMode = "dark" | "light" | "auto";

/**
 * Individual orb item config for clusters
 */
export interface OrbItem {
  /** Unique identifier */
  id: string;
  /** Icon to display */
  icon: ReactNode;
  /** Accessible label */
  label: string;
  /** Color preset or custom color */
  color?: OrbColor | string;
  /** Whether this orb is disabled */
  disabled?: boolean;
  /** Badge content (number or string) */
  badge?: number | string;
  /** Hotkey to display (e.g., "Q", "1") */
  hotkey?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Size configurations in pixels.
 *
 * - `button`     : circle / square diameter (== height for pill).
 * - `icon`       : glyph width/height inside the orb.
 * - `pillWidth`  : fixed total width when the orb is rendered as a label
 *                  pill (right-pill or oval-below modes). Sized to fit a
 *                  ~10-character label without truncation; the orb stretches
 *                  to this width rather than shrinking to fit the text.
 */
export const ORB_SIZES: Record<
  OrbSize,
  { button: number; icon: number; pillWidth: number }
> = {
  xs: { button: 40, icon: 18, pillWidth: 96 },
  sm: { button: 48, icon: 22, pillWidth: 120 },
  md: { button: 56, icon: 26, pillWidth: 164 },
  lg: { button: 64, icon: 30, pillWidth: 168 },
  xl: { button: 72, icon: 34, pillWidth: 200 },
};

/**
 * Color presets for orbs
 */
export const ORB_COLORS: Record<
  OrbColor,
  { dark: { bg: string; border: string; glow: string }; light: { bg: string; border: string; glow: string } }
> = {
  default: {
    dark: {
      bg: "rgba(60, 60, 60, 0.95)",
      border: "rgba(255, 255, 255, 0.15)",
      glow: "rgba(255, 255, 255, 0.2)",
    },
    light: {
      bg: "rgba(240, 240, 240, 0.95)",
      border: "rgba(0, 0, 0, 0.1)",
      glow: "rgba(0, 0, 0, 0.1)",
    },
  },
  ai: {
    dark: {
      bg: "rgba(139, 92, 246, 0.3)",
      border: "rgba(139, 92, 246, 0.5)",
      glow: "rgba(139, 92, 246, 0.4)",
    },
    light: {
      bg: "rgba(139, 92, 246, 0.15)",
      border: "rgba(139, 92, 246, 0.4)",
      glow: "rgba(139, 92, 246, 0.3)",
    },
  },
  primary: {
    dark: {
      bg: "rgba(59, 130, 246, 0.3)",
      border: "rgba(59, 130, 246, 0.5)",
      glow: "rgba(59, 130, 246, 0.4)",
    },
    light: {
      bg: "rgba(59, 130, 246, 0.15)",
      border: "rgba(59, 130, 246, 0.4)",
      glow: "rgba(59, 130, 246, 0.3)",
    },
  },
  success: {
    dark: {
      bg: "rgba(34, 197, 94, 0.3)",
      border: "rgba(34, 197, 94, 0.5)",
      glow: "rgba(34, 197, 94, 0.4)",
    },
    light: {
      bg: "rgba(34, 197, 94, 0.15)",
      border: "rgba(34, 197, 94, 0.4)",
      glow: "rgba(34, 197, 94, 0.3)",
    },
  },
  warning: {
    dark: {
      bg: "rgba(245, 158, 11, 0.3)",
      border: "rgba(245, 158, 11, 0.5)",
      glow: "rgba(245, 158, 11, 0.4)",
    },
    light: {
      bg: "rgba(245, 158, 11, 0.15)",
      border: "rgba(245, 158, 11, 0.4)",
      glow: "rgba(245, 158, 11, 0.3)",
    },
  },
  danger: {
    dark: {
      bg: "rgba(239, 68, 68, 0.3)",
      border: "rgba(239, 68, 68, 0.5)",
      glow: "rgba(239, 68, 68, 0.4)",
    },
    light: {
      bg: "rgba(239, 68, 68, 0.15)",
      border: "rgba(239, 68, 68, 0.4)",
      glow: "rgba(239, 68, 68, 0.3)",
    },
  },
  cyan: {
    // Electric/tech cyan - #00d4ff
    dark: {
      bg: "rgba(0, 212, 255, 0.3)",
      border: "rgba(0, 212, 255, 0.5)",
      glow: "rgba(0, 212, 255, 0.4)",
    },
    light: {
      bg: "rgba(0, 212, 255, 0.15)",
      border: "rgba(0, 212, 255, 0.4)",
      glow: "rgba(0, 212, 255, 0.3)",
    },
  },
  mint: {
    // Fresh/growth mint - #6bffc3
    dark: {
      bg: "rgba(107, 255, 195, 0.3)",
      border: "rgba(107, 255, 195, 0.5)",
      glow: "rgba(107, 255, 195, 0.4)",
    },
    light: {
      bg: "rgba(107, 255, 195, 0.15)",
      border: "rgba(107, 255, 195, 0.4)",
      glow: "rgba(107, 255, 195, 0.3)",
    },
  },
  custom: {
    dark: {
      bg: "rgba(60, 60, 60, 0.95)",
      border: "rgba(255, 255, 255, 0.15)",
      glow: "rgba(255, 255, 255, 0.2)",
    },
    light: {
      bg: "rgba(240, 240, 240, 0.95)",
      border: "rgba(0, 0, 0, 0.1)",
      glow: "rgba(0, 0, 0, 0.1)",
    },
  },
};

/**
 * Props for single ActionOrb component
 */
export interface ActionOrbProps {
  /** Icon to display */
  icon: ReactNode;
  /** Accessible label */
  label: string;
  /** Shape of the orb */
  shape?: OrbShape;
  /** Size of the orb */
  size?: OrbSize;
  /** Visual variant */
  variant?: OrbVariant;
  /** Color preset or custom hex color */
  color?: OrbColor | string;
  /** Color mode (dark/light/auto) - auto uses MUI theme */
  colorMode?: OrbColorMode;
  /** Position mode */
  positionMode?: OrbPositionMode;
  /** X position (when positionMode="free") */
  x?: number;
  /** Y position (when positionMode="free") */
  y?: number;
  /** Whether the orb is disabled */
  disabled?: boolean;
  /** Badge content */
  badge?: number | string;
  /** Hotkey to display (e.g., "Q", "1", "Shift+E") */
  hotkey?: string;
  /** How to display the hotkey */
  hotkeyDisplay?: HotkeyDisplayStyle;
  /**
   * Render the label text inline inside the orb (next to the icon).
   * When true, the orb auto-widens to fit the label and the hover
   * tooltip is suppressed (the label is already visible).
   * @default false
   */
  showInlineLabel?: boolean;
  /**
   * Where the inline label appears relative to the icon.
   * Only applies when showInlineLabel is true.
   * - "right" (default): icon | label side-by-side (pill chip)
   * - "below": label beneath icon (taller orb)
   */
  labelPosition?: "right" | "below";
  /** Enable vibrant mode for enhanced saturation/contrast */
  vibrant?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom styles */
  sx?: SxProps<Theme>;
}

/**
 * Props for OrbCluster component
 */
export interface OrbClusterProps {
  /** Array of orb items to display */
  items: OrbItem[];
  /** Pattern preset for positioning */
  pattern?: OrbPattern;
  /** Default size for all orbs */
  size?: OrbSize;
  /** Default shape for all orbs */
  shape?: OrbShape;
  /** Default variant for all orbs */
  variant?: OrbVariant;
  /** Color mode */
  colorMode?: OrbColorMode;
  /** How to display hotkeys for all orbs */
  hotkeyDisplay?: HotkeyDisplayStyle;
  /** Render every orb's label inline inside the orb. @default false */
  showInlineLabel?: boolean;
  /** Where the inline label sits relative to the icon. @default "right" */
  labelPosition?: "right" | "below";
  /** Enable vibrant mode for enhanced colors */
  vibrant?: boolean;
  /** Enable overlapping mode (orbs overlap each other) */
  overlapping?: boolean;
  /** Overlap percentage when overlapping=true (0-50) */
  overlapPercent?: number;
  /** Whether to use responsive sizing */
  responsive?: boolean;
  /** Spacing between orbs (in pixels) */
  spacing?: number;
  /** Whether cluster is collapsed */
  collapsed?: boolean;
  /** Handler for collapse toggle */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Custom positions (when pattern="custom") */
  customPositions?: Array<{ x: number; y: number }>;
  /** Container width (for pattern calculations) */
  containerWidth?: number;
  /** Container height (for pattern calculations) */
  containerHeight?: number;
  /** Custom styles */
  sx?: SxProps<Theme>;
}
