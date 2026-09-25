/**
 * ActionOrb style helpers.
 *
 * Resolves the surface skin for an orb by reading
 * `theme.components.ExpanseActionOrb.variants[variant]` first, falling back
 * to a baked-in default that mirrors the legacy hardcoded behaviour.
 *
 * Maps the symbolic `animation: "glow" | "pulse" | "none"` field to actual
 * MUI keyframe objects so the variant theme contract stays declarative.
 */

import { keyframes } from "@mui/material"
import type { Theme } from "@mui/material/styles"
import type { SxProps } from "@mui/material"
import type { OrbVariant } from "./types"
import type { OrbColorConfig } from "./orbColors"
import {
  brandConcentricRing,
  brandRingScale,
  type ActionOrbThemeProps,
  type ActionOrbVariantProps,
} from "@expanse/theme"

// ---- Keyframes (defined once per module) -----------------------------------

export const orbPulseKeyframes = keyframes`
  0%   { box-shadow: 0 0 0 0 var(--orb-glow-color); }
  70%  { box-shadow: 0 0 0 12px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
`

export const orbGlowKeyframes = keyframes`
  0%, 100% { box-shadow: 0 0 15px var(--orb-glow-color); }
  50%      { box-shadow: 0 0 25px var(--orb-glow-color), 0 0 35px var(--orb-glow-color); }
`

/**
 * Gentle vertical float (levitate up-and-down). Pairs with orbPulseKeyframes
 * in the 'float' variant to create the combined attention-seeking animation.
 */
export const orbLevitateKeyframes = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
`

// ---- Fallback variant table -------------------------------------------------

/**
 * Default variant skins applied when `theme.components.ExpanseActionOrb` is
 * not registered. Mirror of `createActionOrbConfig` output for a dark palette.
 */
const FALLBACK_VARIANTS: Record<OrbVariant, ActionOrbVariantProps> = {
  float: {
    bgcolor: "palette",
    border: "palette",
    backdropFilter: "blur(8px)",
    boxShadow: "none",
    hoverBoxShadow: "none",
    animation: "float",
  },
  glass: {
    bgcolor: "palette",
    border: "palette",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    hoverBoxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
    animation: "none",
  },
  solid: {
    bgcolor: "palette",
    border: "palette",
    backdropFilter: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    hoverBoxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    animation: "none",
  },
  glow: {
    bgcolor: "palette",
    border: "palette",
    backdropFilter: "blur(8px)",
    boxShadow: "none",
    hoverBoxShadow: "none",
    animation: "glow",
  },
  pulse: {
    bgcolor: "palette",
    border: "palette",
    backdropFilter: "blur(8px)",
    boxShadow: "none",
    hoverBoxShadow: "none",
    animation: "pulse",
  },
  outline: {
    bgcolor: "transparent",
    border: "palette",
    backdropFilter: "none",
    boxShadow: "none",
    hoverBoxShadow: "none",
    animation: "none",
  },
}

/**
 * Pull the variant config from the theme, with sensible fallbacks.
 */
export function resolveOrbVariantConfig(
  theme: Theme,
  variant: OrbVariant,
): ActionOrbVariantProps {
  const themeVariants = (
    theme.components as { ExpanseActionOrb?: ActionOrbThemeProps } | undefined
  )?.ExpanseActionOrb?.variants
  return themeVariants?.[variant] ?? FALLBACK_VARIANTS[variant]
}

/**
 * Translate the `"palette"` sentinel to the orb's resolved bg color.
 * For `solid`, force the alpha component to 0.95 to match legacy behaviour.
 */
function resolveBgcolor(
  bgcolor: ActionOrbVariantProps["bgcolor"],
  colors: OrbColorConfig,
  variant: OrbVariant,
): string {
  if (bgcolor !== "palette") return bgcolor
  if (variant === "solid") return colors.bg.replace(/[\d.]+\)$/, "0.95)");
  return colors.bg
}

function resolveBorder(
  border: ActionOrbVariantProps["border"],
  colors: OrbColorConfig,
  variant: OrbVariant,
): string {
  if (border !== "palette") return border
  if (variant === "outline") return "none"
  return `1px solid ${colors.border}`
}

function resolveAnimation(
  animation: ActionOrbVariantProps["animation"],
): string | undefined {
  if (animation === "glow") return `${orbGlowKeyframes} 2s ease-in-out infinite`
  if (animation === "pulse") return `${orbPulseKeyframes} 2s ease-out infinite`
  if (animation === "float")
    // Levitate (3 s, slow ease) + glow halo (2 s, breathe) + pulse ring (2 s, snappy).
    // Three separate animations with offset durations keep the motion organic.
    return [
      `${orbLevitateKeyframes} 3s ease-in-out infinite`,
      `${orbGlowKeyframes} 2s ease-in-out infinite`,
      `${orbPulseKeyframes} 2s ease-out infinite`,
    ].join(", ")
  return undefined
}

// ---- Public: build the IconButton sx ---------------------------------------

export interface BuildOrbSxOptions {
  theme: Theme
  variant: OrbVariant
  colors: OrbColorConfig
  width: number | "auto"
  height: number
  paddingX: number
  paddingY: number
  borderRadius: string
  outerTransform: string | undefined
  diamond: boolean
}

/**
 * Compose the full IconButton sx for one orb. Pulls all skin values from
 * the resolved theme variant and assembles them with the layout dimensions.
 */
export function buildOrbSx(opts: BuildOrbSxOptions): SxProps<Theme> {
  const {
    theme,
    variant,
    colors,
    width,
    height,
    paddingX,
    paddingY,
    borderRadius,
    outerTransform,
    diamond,
  } = opts

  const cfg = resolveOrbVariantConfig(theme, variant)
  const bgcolor = resolveBgcolor(cfg.bgcolor, colors, variant)
  const border = resolveBorder(cfg.border, colors, variant)
  const animation = resolveAnimation(cfg.animation)
  const outlineRing =
    variant === "outline"
      ? brandConcentricRing(colors.border, { scale: brandRingScale(height) })
      : null

  // Outline hover fills with the palette bg; otherwise restore-on-hover the
  // resting bg so MUI's :hover focus ring doesn't blow it away.
  const hoverBgcolor = variant === "outline" ? colors.bg : bgcolor

  const minWidth = typeof width === "number" ? width : height

  return {
    width,
    height,
    minWidth,
    px: paddingX,
    py: paddingY,
    borderRadius,
    transform: outerTransform,
    transition: "all 0.2s ease",
    bgcolor,
    border: outlineRing?.border ?? border,
    backdropFilter: cfg.backdropFilter === "none" ? undefined : cfg.backdropFilter,
    boxShadow:
      outlineRing?.boxShadow ??
      (cfg.boxShadow === "none" ? undefined : cfg.boxShadow),
    animation,
    "--orb-glow-color": colors.glow,
    "&:hover:not(:disabled)": {
      transform: diamond ? "rotate(45deg) scale(1.1)" : "scale(1.1)",
      bgcolor: hoverBgcolor,
      boxShadow:
        outlineRing?.boxShadow ??
        (cfg.hoverBoxShadow === "none" ? undefined : cfg.hoverBoxShadow),
    },
    "&:disabled": { opacity: 0.5 },
  }
}
