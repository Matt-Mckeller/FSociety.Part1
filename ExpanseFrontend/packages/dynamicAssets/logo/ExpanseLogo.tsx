/**
 * ExpanseLogo - The Official Expanse Logo Component
 *
 * A simplified wrapper around ExpanseLogoV3 that provides the "perfect" logo
 * with all refined settings baked in. Use this for most logo needs.
 *
 * @example
 * // Basic usage
 * import { ExpanseLogo } from 'expanse.dynamicAssets/logo'
 *
 * <ExpanseLogo size="md" />
 * <ExpanseLogo size={48} />
 * <ExpanseLogo size="lg" theme="light" />
 *
 * @example
 * // For full customization, use ExpanseLogoV3 directly
 * import { ExpanseLogoV3_3D } from 'expanse.dynamicAssets/logo'
 */

"use client"
import React from "react"
import { useTheme } from "@mui/system"
import { ExpanseLogoV3_3D, ExpanseLogoV3 } from "./ExpanseLogoV3.component"
import type { ExpanseLogoProps, LogoTheme } from "./types"
import { LOGO_SIZE_MAP } from "./types"

/**
 * Refined logo settings - the "perfect" configuration from Logo Designer.
 * These settings have been carefully tuned for the ideal logo appearance.
 */
const REFINED_SETTINGS = {
  // Ring geometry
  ringExtent: "innerArc" as const,
  mirroredRings: true,
  showPrimaryRings: false,
  orbitalRotation: -33,

  // Ring appearance
  backRingOpacity: 0.28,
  arcOpacity: 0.21,
  showArcSegments: true,

  // Arc colors (gradient effect: dark → light)
  arc1Color: "#666666",
  arc2Color: "#888888",
  arc3Color: "#aaaaaa",

  // Eye/Pupil settings
  eyeMode: true,
  pupilDirection: 240, // Looking at moon
  pupilOffset: 0.12, // Slight offset toward moon
  pupilSize: 0.28, // 28% of sphere
  pupilContrast: 0.71,
  pupilColor: "#1a1a1a",
  pupilInnerColor: "#f5f5f5",
  pupilInnerSize: 0.6,

  // Moon
  showMoon: true,
} as const

/**
 * Theme color configurations for different backgrounds.
 */
const THEME_CONFIGS: Record<
  Exclude<LogoTheme, "auto">,
  {
    fill: string
    orbitalFill: string
    ringFill: string
    pupilColor?: string
    pupilInnerColor?: string
  }
> = {
  dark: {
    fill: "#1a1a2e",
    orbitalFill: "#1a1a2e",
    ringFill: "#1a1a2e",
  },
  light: {
    fill: "#f5f5f5",
    orbitalFill: "#ffffff",
    ringFill: "#ffffff",
    pupilColor: "#1a1a2e",
    pupilInnerColor: "#f5f5f5",
  },
  brand: {
    fill: "#1a1a2e",
    orbitalFill: "#1a1a2e",
    ringFill: "#1a1a2e",
  },
}

/**
 * ExpanseLogo - The official Expanse logo component.
 *
 * This is a simplified wrapper around ExpanseLogoV3 that provides the
 * "perfect" logo with all refined settings baked in. For most use cases,
 * you only need to specify the size.
 *
 * @param props - Component props
 * @returns The Expanse logo SVG
 *
 * @example
 * // Size presets
 * <ExpanseLogo size="xs" />  // 16px - badges
 * <ExpanseLogo size="sm" />  // 24px - navigation
 * <ExpanseLogo size="md" />  // 48px - standard (default)
 * <ExpanseLogo size="lg" />  // 64px - hero sections
 * <ExpanseLogo size="xl" />  // 96px - landing pages
 * <ExpanseLogo size="xxl" /> // 128px - splash screens
 *
 * @example
 * // Custom pixel size
 * <ExpanseLogo size={72} />
 *
 * @example
 * // Theme variants
 * <ExpanseLogo size="lg" theme="dark" />   // For light backgrounds
 * <ExpanseLogo size="lg" theme="light" />  // For dark backgrounds
 * <ExpanseLogo size="lg" theme="auto" />   // Detect from MUI theme
 *
 * @example
 * // Flat variant (no gradients)
 * <ExpanseLogo size="md" variant="flat" />
 *
 * @example
 * // Without moon or eye
 * <ExpanseLogo size="md" showMoon={false} />
 * <ExpanseLogo size="md" showEye={false} />
 */
export const ExpanseLogo: React.FC<ExpanseLogoProps> = ({
  size = "md",
  theme = "auto",
  variant = "3d",
  showMoon = true,
  showEye = true,
  className,
  style,
  id,
}) => {
  // Resolve theme from MUI if 'auto'
  const muiTheme = useTheme()
  const resolvedTheme: Exclude<LogoTheme, "auto"> =
    theme === "auto"
      ? muiTheme?.palette?.mode === "dark"
        ? "light"
        : "dark"
      : theme

  // Resolve size to pixels
  const sizeInPx =
    typeof size === "number" ? size : LOGO_SIZE_MAP[size] || LOGO_SIZE_MAP.md

  // Select component based on variant
  const LogoComponent = variant === "3d" ? ExpanseLogoV3_3D : ExpanseLogoV3

  // Get theme-specific colors
  const themeConfig = THEME_CONFIGS[resolvedTheme]

  // Build props, merging theme colors with refined settings
  const logoProps = {
    // ID
    id,

    // Size
    height: sizeInPx,

    // Theme colors
    fill: themeConfig.fill,
    orbitalFill: themeConfig.orbitalFill,
    ringFill: themeConfig.ringFill,

    // Refined settings
    ...REFINED_SETTINGS,

    // Theme-specific pupil colors (if different from defaults)
    ...(themeConfig.pupilColor && { pupilColor: themeConfig.pupilColor }),
    ...(themeConfig.pupilInnerColor && {
      pupilInnerColor: themeConfig.pupilInnerColor,
    }),

    // Props overrides
    showMoon,
    eyeMode: showEye,
  }

  return (
    <LogoComponent
      {...logoProps}
      // Wrap in span for className/style support (SVG doesn't support className in all cases)
    />
  )
}

ExpanseLogo.displayName = "ExpanseLogo"

export default ExpanseLogo
