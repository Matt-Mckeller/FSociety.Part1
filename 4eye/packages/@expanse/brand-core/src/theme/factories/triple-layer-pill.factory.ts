/**
 * TripleLayerPill Theme Factory
 *
 * Creates TripleLayerPill component theme configuration from an MUI palette.
 *
 * Variants:
 *  - default : HUD chrome — primary halo on a solid neutral panel-dark fill
 *              (matches `palette.background.dark`, the same chrome used by
 *              minimap / dock headers). Use as the everyday HUD pill.
 *  - quiet   : Recessed — primary halo on a dark `bg.dark → bg.medium`
 *              gradient pill. Use when the pill should sit one layer
 *              behind the foreground.
 *  - primary : Brand-loud — solid `palette.primary.main` fill. Use for
 *              hero CTAs and stand-alone gameplay surfaces.
 *  - ghost   : Absolute-minimum neutral chrome — no brand color, no fill,
 *              just hairline neutral strokes. Use when the pill must
 *              disappear into the layout.
 */

import { alpha } from "@mui/material/styles"
import type { Palette } from "@mui/material/styles"
import type { TripleLayerPillThemeProps } from "../types"

/**
 * Resolve the palette's "panel-dark" surface color. Falls back through the
 * extended bg fields, then to a neutral mid-dark gray.
 */
function getPanelDarkColor(palette: Palette): string {
  const bg = palette.background as unknown as Record<string, string | undefined>
  return bg.dark ?? bg.offsetBG ?? "#434343"
}

/**
 * Build a dark gradient string anchored on the palette's dark/medium
 * background tokens. Falls back to a fixed cyan/indigo gradient if no
 * extended bg colors are set.
 */
function buildDarkGradientFill(palette: Palette): string {
  const bg = palette.background as unknown as Record<string, string | undefined>
  const dark = bg.dark ?? "#0a1f2e"
  const medium = bg.medium ?? "#142b3f"
  return `linear-gradient(135deg, ${dark} 0%, ${medium} 100%)`
}

/**
 * Creates a TripleLayerPill theme configuration from the given palette.
 */
export function createTripleLayerPillConfig(
  palette: Palette,
): TripleLayerPillThemeProps {
  const primary = palette.primary.main
  const text = palette.text.primary

  return {
    variants: {
      // ----------------------------------------------------------------
      // default — HUD chrome: primary halo on solid panel-dark fill
      // ----------------------------------------------------------------
      default: {
        outerStrokeColor: alpha(primary, 0.2),
        centerStrokeColor: alpha(primary, 0.5),
        innerStrokeColor: primary,
        innerFillColor: getPanelDarkColor(palette),
        contentColor: palette.primary.contrastText,
        inactiveOpacity: 0.5,
        inactiveSaturation: 0.4,
      },

      // ----------------------------------------------------------------
      // quiet — recessed: primary halo on dark gradient pill
      // ----------------------------------------------------------------
      quiet: {
        outerStrokeColor: alpha(primary, 0.18),
        centerStrokeColor: alpha(primary, 0.4),
        innerStrokeColor: alpha(primary, 0.85),
        innerFillColor: buildDarkGradientFill(palette),
        contentColor: palette.primary.contrastText,
        inactiveOpacity: 0.45,
        inactiveSaturation: 0.5,
      },

      // ----------------------------------------------------------------
      // primary — brand-loud: solid primary fill
      // ----------------------------------------------------------------
      primary: {
        outerStrokeColor: alpha(primary, 0.18),
        centerStrokeColor: alpha(primary, 0.4),
        innerStrokeColor: alpha(primary, 0.85),
        innerFillColor: primary,
        contentColor: palette.primary.contrastText,
        inactiveOpacity: 0.45,
        inactiveSaturation: 0.5,
      },

      // ----------------------------------------------------------------
      // ghost — neutral chrome, no halo, no brand color
      // ----------------------------------------------------------------
      ghost: {
        outerStrokeColor: alpha(text, 0.08),
        centerStrokeColor: alpha(text, 0.2),
        innerStrokeColor: alpha(text, 0.45),
        innerFillColor: "transparent",
        contentColor: palette.text.secondary,
        inactiveOpacity: 0.4,
        inactiveSaturation: 1, // already neutral, no saturation change needed
      },
    },
  }
}
