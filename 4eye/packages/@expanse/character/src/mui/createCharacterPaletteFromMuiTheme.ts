/**
 * MUI → Character Palette Adapter (WEB ONLY)
 * ==========================================
 * Reads the active MUI theme and produces a platform-neutral
 * {@link CharacterPalette}. This is the ONE place that touches MUI, keeping
 * the 2D/3D renderers theme-driven without coupling them to MUI (so the 3D
 * renderer still runs on React Native, which supplies its own palette).
 *
 * Color sourcing mirrors the existing 2D Character4eye:
 *   • If the theme registers `components.ExpanseCharacter.variants.default`
 *     (via @expanse/brand-core's factory), those head/body/limb colors win.
 *   • Otherwise we derive sensible colors straight from the standard MUI
 *     palette, so ANY themed app gets a properly-colored (non-black) 4eye.
 */

import type { Theme } from "@mui/material/styles"
import type { CharacterPalette } from "../core"

interface ExpanseCharacterVariant {
  headColor?: string
  bodyColor?: string
  limbColor?: string
  altColor?: string
  altLimbColor?: string
}

export function createCharacterPaletteFromMuiTheme(
  theme: Theme,
  options: { limbOpacity?: number } = {},
): CharacterPalette {
  const p = theme.palette
  // Optional brand-core character extension (present when its factory ran).
  const ext = (
    theme.components as
      | { ExpanseCharacter?: { variants?: { default?: ExpanseCharacterVariant } } }
      | undefined
  )?.ExpanseCharacter?.variants?.default

  const head = ext?.headColor ?? p.primary.light ?? p.primary.main
  const body = ext?.bodyColor ?? p.primary.main
  const limb = ext?.limbColor ?? p.primary.light ?? p.primary.main

  return {
    head,
    body,
    limb,
    limbOpacity: options.limbOpacity ?? 0.85,
    eyeGlow: p.info?.main ?? "#00d4ff",
    strap: p.primary.dark ?? body,
    accents: {
      primary: p.primary.main,
      secondary: p.secondary?.main ?? p.primary.dark ?? body,
      highlight: p.warning?.main ?? p.secondary?.light ?? "#ffd166",
      neutral: p.grey?.[500] ?? "#9aa7bd",
    },
  }
}
