/**
 * @expanse/brand-core Theme Factories
 * 
 * Factory functions for creating component theme configurations from MUI palettes.
 */

export { createProgressBarConfig } from "./progress-bar.factory"
export { createGemConfig } from "./gem.factory"
export { createExperienceIconConfig } from "./experience-icon.factory"
export { createExpanseCharacterConfig } from "./expanse-character.factory"
export { createExpandingBorderBoxConfig } from "./expanding-border-box.factory"
export { createTripleLayerPillConfig } from "./triple-layer-pill.factory"

/**
 * Aggregate factory — returns all brand-core component theme extensions for
 * a given palette. Consumers (apps, sibling packages' storybooks) should call
 * this and spread it into their MUI theme `components` block, so the full
 * brand-core component contract is registered with one call.
 */
import type { Palette } from "@mui/material/styles"
import { createProgressBarConfig as _pb } from "./progress-bar.factory"
import { createGemConfig as _gem } from "./gem.factory"
import { createExperienceIconConfig as _exp } from "./experience-icon.factory"
import { createExpanseCharacterConfig as _char } from "./expanse-character.factory"
import { createExpandingBorderBoxConfig as _ebb } from "./expanding-border-box.factory"
import { createTripleLayerPillConfig as _tlp } from "./triple-layer-pill.factory"

export function createBrandCoreExtensions(palette: Palette) {
  return {
    ProgressBar: _pb(palette),
    Gem: _gem(palette),
    ExperienceIcon: _exp(palette),
    ExpanseCharacter: _char(palette),
    ExpandingBorderBox: _ebb(palette),
    TripleLayerPill: _tlp(palette),
  }
}
