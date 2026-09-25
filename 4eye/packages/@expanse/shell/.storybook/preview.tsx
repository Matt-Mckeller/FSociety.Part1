/**
 * @expanse/shell Storybook Preview
 *
 * Uses shared @expanse/storybook-config for consistent toolbar and theme handling.
 * Adds layout component theme extensions via factory.
 * Includes full i18n support (locale, timezone, currency, direction).
 */

import type { Preview } from "@storybook/react"
import type { Palette } from "@mui/material/styles"
import type { ExpanseTheme, ThemeMode } from "@expanse/theme"
import {
  createPreviewConfig,
  globalTypes,
  parameters as sharedParameters,
} from "@expanse/storybook-config"

// Import layout factory functions
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

// Import brand-core factory functions (needed for status bars used in HUD presets)
import {
  createProgressBarConfig,
  createGemConfig,
  createExperienceIconConfig,
  createExpanseCharacterConfig,
  createExpandingBorderBoxConfig,
  createTripleLayerPillConfig,
} from "@expanse/brand-core"

// Import type augmentation
import "@expanse/theme/component-themes/augmentation"

// ============================================================
// LAYOUT COMPONENT EXTENSIONS
// ============================================================

/**
 * Create layout component extensions from palette
 */
function createLayoutExtensions(palette: Palette): Record<string, unknown> {
  return {
    // Layout components
    ExpanseActionOrb: createActionOrbConfig(palette),
    ExpanseGameDrawer: createGameDrawerConfig(palette),
    ExpanseNavigationPad: createNavigationPadConfig(palette),
    ExpanseBoardChrome: createBoardChromeConfig(palette),
    ExpanseFloatingToolbar: createFloatingToolbarConfig(palette),
    ExpanseTile: createTileConfig(palette),
    ExpanseMinimapTile: createMinimapTileConfig(palette),
    ExpanseMinimapPanel: createMinimapPanelConfig(palette),
    // Brand-core components (consumed by HUD presets via brand-core status bars)
    // NOTE: keys are unprefixed (ProgressBar, Gem, ExperienceIcon...) — see
    // BrandCoreComponentsThemeProps in @expanse/brand-core/theme/types.
    ProgressBar: createProgressBarConfig(palette),
    Gem: createGemConfig(palette),
    ExperienceIcon: createExperienceIconConfig(palette),
    ExpanseCharacter: createExpanseCharacterConfig(palette),
    ExpandingBorderBox: createExpandingBorderBoxConfig(palette),
    TripleLayerPill: createTripleLayerPillConfig(palette),
  }
}

/**
 * Extension factory for storybook-config
 */
function layoutExtensionFactory(
  palette: Palette,
  _color: ExpanseTheme,
  _mode: ThemeMode
): Record<string, unknown> {
  return createLayoutExtensions(palette)
}

// ============================================================
// PREVIEW CONFIGURATION
// ============================================================

const preview: Preview = createPreviewConfig({
  extensionFactory: layoutExtensionFactory,
  includeI18n: true, // layout uses i18n features
})

export default preview
