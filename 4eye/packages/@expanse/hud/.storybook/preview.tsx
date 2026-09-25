/**
 * @expanse/hud Storybook Preview
 *
 * Mirrors @expanse/shell's preview: shared @expanse/storybook-config plus the
 * layout component theme extensions (HUD widgets rely on layout's MUI theme
 * augmentation + factories). Includes full i18n support.
 */

import type { Preview } from "@storybook/react"
import type { Palette } from "@mui/material/styles"
import type { ExpanseTheme, ThemeMode } from "@expanse/theme"
import {
  createPreviewConfig,
  globalTypes,
  parameters as sharedParameters,
} from "@expanse/storybook-config"

// Layout factory functions (theme component extensions)
import {
  createActionOrbConfig,
  createGameDrawerConfig,
  createNavigationPadConfig,
  createBoardChromeConfig,
  createFloatingToolbarConfig,
  createTileConfig,
  createMinimapTileConfig,
  createMinimapPanelConfig,
} from "@expanse/theme/component-themes/factories"

// Brand-core factory functions (status bars used in HUD presets)
import {
  createProgressBarConfig,
  createGemConfig,
  createExperienceIconConfig,
  createExpanseCharacterConfig,
  createExpandingBorderBoxConfig,
  createTripleLayerPillConfig,
} from "@expanse/brand-core"

// Layout type augmentation (registers component theme props)
import "@expanse/theme/component-themes/augmentation"

function createLayoutExtensions(palette: Palette): Record<string, unknown> {
  return {
    ExpanseActionOrb: createActionOrbConfig(palette),
    ExpanseGameDrawer: createGameDrawerConfig(palette),
    ExpanseNavigationPad: createNavigationPadConfig(palette),
    ExpanseBoardChrome: createBoardChromeConfig(palette),
    ExpanseFloatingToolbar: createFloatingToolbarConfig(palette),
    ExpanseTile: createTileConfig(palette),
    ExpanseMinimapTile: createMinimapTileConfig(palette),
    ExpanseMinimapPanel: createMinimapPanelConfig(palette),
    ProgressBar: createProgressBarConfig(palette),
    Gem: createGemConfig(palette),
    ExperienceIcon: createExperienceIconConfig(palette),
    ExpanseCharacter: createExpanseCharacterConfig(palette),
    ExpandingBorderBox: createExpandingBorderBoxConfig(palette),
    TripleLayerPill: createTripleLayerPillConfig(palette),
  }
}

function layoutExtensionFactory(
  palette: Palette,
  _color: ExpanseTheme,
  _mode: ThemeMode
): Record<string, unknown> {
  return createLayoutExtensions(palette)
}

const preview: Preview = createPreviewConfig({
  extensionFactory: layoutExtensionFactory,
  includeI18n: true,
})

export default preview
