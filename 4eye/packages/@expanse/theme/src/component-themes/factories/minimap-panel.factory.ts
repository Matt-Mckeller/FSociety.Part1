/**
 * MinimapPanel Factory
 *
 * Creates theme configuration for MinimapPanel from a MUI palette.
 *
 * The factory derives every value from palette tokens — no hardcoded hex.
 * The toggle button shares the same surface treatment (bgcolor/border/shadow)
 * as the panel so the morph from button → panel is visually continuous.
 *
 * Variants:
 * - default:  Light blur, subtle border (lightest presence)
 * - frosted:  Heavy blur, prominent border + shadow (current shipped look)
 * - solid:    Opaque, no blur (max readability / low-perf fallback)
 */

import { alpha } from "@mui/material/styles"
import type { Palette } from "@mui/material/styles"
import type { MinimapPanelThemeProps, MinimapPanelVariantProps } from "../types"

/**
 * Resolve the palette's "panel-dark" surface color — matches
 * `getPanelDarkColor` in the TripleLayerPill factory, so the dark
 * minimap variant shares the exact same fill as the CompactStatusBar.
 */
function getPanelDarkColor(palette: Palette): string {
  const bg = palette.background as unknown as Record<string, string | undefined>
  return bg.dark ?? bg.offsetBG ?? "#2C4F76"
}

/**
 * Create MinimapPanel theme configuration
 *
 * @param palette - MUI Palette object for deriving colors
 * @returns MinimapPanel theme props with all variant configurations
 */
export function createMinimapPanelConfig(palette: Palette): MinimapPanelThemeProps {
  const isDark = palette.mode === "dark"

  // ---------------------------------------------------------------
  // Shared tokens — derived from palette so they track theme changes
  // ---------------------------------------------------------------

  // Surface — adaptive panel chrome.
  // NOTE: We deliberately do NOT use `palette.background.paper` because many
  // themes in this project intentionally set paper to "#FFFFFF" even in dark
  // mode (cards-on-dark brand aesthetic). For a floating HUD panel we need a
  // surface that genuinely adapts to mode, so we derive from common.black /
  // common.white at high alpha to read as a frosted "glass" surface.
  const surfaceBg = isDark
    ? alpha(palette.common.black, 0.78)   // Dark glass on dark page
    : alpha(palette.common.white, 0.94)   // Light glass on light page

  const surfaceBgSolid = isDark
    ? palette.common.black
    : palette.common.white

  // Outer border — strong enough to act as the divide from the page
  // (per UX direction: borders > shadow as the primary divider)
  const outerBorderColor = isDark
    ? alpha(palette.common.white, 0.20)
    : alpha(palette.common.black, 0.30)

  // Section dividers + preview/badge borders — softer than outer border
  // but still clearly visible
  const dividerColor = isDark
    ? alpha(palette.common.white, 0.12)
    : alpha(palette.common.black, 0.15)

  // Badge bg — neutral chip, blends with the panel
  const badgeBgcolor = isDark
    ? alpha(palette.common.white, 0.15)
    : alpha(palette.common.black, 0.08)

  const badgeBorderColor = isDark
    ? alpha(palette.common.white, 0.20)
    : alpha(palette.common.black, 0.12)

  // Legend swatch border — softest of all, just a hairline edge
  const legendSwatchBorderColor = isDark
    ? alpha(palette.common.white, 0.15)
    : alpha(palette.common.black, 0.10)

  // Unified shadow — matches the frosted ActionBar variant for HUD coherence
  const unifiedShadow = `0 8px 32px ${alpha(palette.common.black, 0.35)}`

  // Hover state for the toggle button — barely lifts the surface
  const toggleHoverBg = isDark
    ? alpha(palette.common.white, 0.08)
    : alpha(palette.common.white, 1)

  // ---------------------------------------------------------------
  // Variant: frosted (current shipped look — DEFAULT for component)
  // ---------------------------------------------------------------

  const frostedVariant: MinimapPanelVariantProps = {
    bgcolor: surfaceBg,
    border: `1px solid ${outerBorderColor}`,
    borderRadius: 8,
    backdropFilter: "blur(12px)",
    boxShadow: unifiedShadow,

    dividerColor,
    previewBgcolor: palette.action.hover,
    previewBorder: `1px solid ${dividerColor}`,
    badgeBgcolor,
    badgeBorder: `1px solid ${badgeBorderColor}`,
    legendSwatchBorder: `1px solid ${legendSwatchBorderColor}`,

    toggleBgcolor: surfaceBg,
    toggleHoverBgcolor: toggleHoverBg,
    toggleBorder: `1px solid ${outerBorderColor}`,
    toggleBoxShadow: unifiedShadow,
  }

  // ---------------------------------------------------------------
  // Variant: default (lighter chrome)
  // ---------------------------------------------------------------

  const defaultBorder = isDark
    ? alpha(palette.common.white, 0.15)
    : alpha(palette.common.black, 0.20)
  const defaultShadow = `0 4px 16px ${alpha(palette.common.black, 0.20)}`

  const defaultVariant: MinimapPanelVariantProps = {
    bgcolor: surfaceBg,
    border: `1px solid ${defaultBorder}`,
    borderRadius: 8,
    backdropFilter: "blur(8px)",
    boxShadow: defaultShadow,

    dividerColor,
    previewBgcolor: palette.action.hover,
    previewBorder: `1px solid ${dividerColor}`,
    badgeBgcolor,
    badgeBorder: `1px solid ${badgeBorderColor}`,
    legendSwatchBorder: `1px solid ${legendSwatchBorderColor}`,

    toggleBgcolor: surfaceBg,
    toggleHoverBgcolor: toggleHoverBg,
    toggleBorder: `1px solid ${defaultBorder}`,
    toggleBoxShadow: defaultShadow,
  }

  // ---------------------------------------------------------------
  // Variant: solid (opaque, no blur)
  // ---------------------------------------------------------------

  const solidVariant: MinimapPanelVariantProps = {
    bgcolor: surfaceBgSolid,
    border: `1px solid ${outerBorderColor}`,
    borderRadius: 8,
    backdropFilter: "none",
    boxShadow: unifiedShadow,

    dividerColor,
    previewBgcolor: palette.action.hover,
    previewBorder: `1px solid ${dividerColor}`,
    badgeBgcolor,
    badgeBorder: `1px solid ${badgeBorderColor}`,
    legendSwatchBorder: `1px solid ${legendSwatchBorderColor}`,

    toggleBgcolor: surfaceBgSolid,
    toggleHoverBgcolor: isDark ? palette.action.hover : palette.background.paper,
    toggleBorder: `1px solid ${outerBorderColor}`,
    toggleBoxShadow: unifiedShadow,
  }

  // ---------------------------------------------------------------
  // Variant: dark (panel-blue surface matching CompactStatusBar fill)
  // ---------------------------------------------------------------

  const panelDark = getPanelDarkColor(palette)
  const contentWhite = palette.primary.contrastText  // "#FFFFFF"

  const darkVariant: MinimapPanelVariantProps = {
    bgcolor: panelDark,
    border: `1px solid ${alpha(contentWhite, 0.20)}`,
    borderRadius: 8,
    backdropFilter: "blur(12px)",
    boxShadow: unifiedShadow,

    dividerColor: alpha(contentWhite, 0.15),
    previewBgcolor: alpha(palette.common.black, 0.20),
    previewBorder: `1px solid ${alpha(contentWhite, 0.12)}`,
    badgeBgcolor: alpha(contentWhite, 0.12),
    badgeBorder: `1px solid ${alpha(contentWhite, 0.15)}`,
    legendSwatchBorder: `1px solid ${alpha(contentWhite, 0.12)}`,

    toggleBgcolor: panelDark,
    toggleHoverBgcolor: alpha(contentWhite, 0.08),
    toggleBorder: `1px solid ${alpha(contentWhite, 0.20)}`,
    toggleBoxShadow: unifiedShadow,

    contentColor: contentWhite,
    secondaryContentColor: alpha(contentWhite, 0.60),
  }

  return {
    variants: {
      default: defaultVariant,
      frosted: frostedVariant,
      solid: solidVariant,
      dark: darkVariant,
    },
  }
}
