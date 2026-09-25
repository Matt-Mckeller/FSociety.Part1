/**
 * ActionOrb Factory
 *
 * Creates theme configuration for the ActionOrb component from a palette.
 * ActionOrb is a small round/pill action button used on HUDs and orb bars.
 *
 * Variants control only the *surface skin*:
 * - glass   : Semi-transparent fill with blur (default)
 * - solid   : Opaque fill, no blur, subtle drop shadow
 * - glow    : Animated glow halo around the orb
 * - pulse   : Outward pulsing ring animation
 * - outline : Transparent open fill with Expanse 1:2:3 concentric rings;
 *             fills on hover. Same recipe as TripleLayerPill `ghost`.
 * - float   : Levitating (Y up-down) + pulsing ring — attention-seeking CTA state
 *
 * All variants reference `"palette"` for bg/border so the orb's resolved
 * `color` prop (cyan, mint, ai, primary, etc.) drives the actual hue. Themes
 * may override individual variants with literal CSS values to break out of
 * the palette-driven default (e.g. an `outline` that always uses the page
 * accent regardless of orb color).
 */

import type { Palette } from "@mui/material/styles"
import type { ActionOrbThemeProps } from "../types"

/**
 * Create ActionOrb theme configuration.
 *
 * @param palette - MUI Palette object (reserved for future light/dark tweaks)
 * @returns ActionOrb theme props with all variant skins
 */
export function createActionOrbConfig(palette: Palette): ActionOrbThemeProps {
  const isDark = palette.mode === "dark"

  const restShadow = isDark
    ? "0 4px 12px rgba(0, 0, 0, 0.3)"
    : "0 4px 12px rgba(0, 0, 0, 0.18)"
  const hoverShadow = isDark
    ? "0 6px 16px rgba(0, 0, 0, 0.4)"
    : "0 6px 16px rgba(0, 0, 0, 0.25)"
  const solidShadow = isDark
    ? "0 2px 8px rgba(0, 0, 0, 0.2)"
    : "0 2px 8px rgba(0, 0, 0, 0.12)"

  return {
    variants: {
      glass: {
        bgcolor: "palette",
        border: "palette",
        backdropFilter: "blur(8px)",
        boxShadow: restShadow,
        hoverBoxShadow: hoverShadow,
        animation: "none",
      },
      solid: {
        bgcolor: "palette",
        border: "palette",
        backdropFilter: "none",
        boxShadow: solidShadow,
        hoverBoxShadow: solidShadow,
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
      float: {
        bgcolor: "palette",
        border: "palette",
        backdropFilter: "blur(8px)",
        boxShadow: "none",
        hoverBoxShadow: "none",
        animation: "float",
      },
    },
  }
}
