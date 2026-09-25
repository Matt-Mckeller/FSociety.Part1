/**
 * @expanse/brand-core Storybook Preview
 *
 * Uses shared @expanse/storybook-config for consistent toolbar and theme handling.
 * Adds brand-core component theme extensions via factory.
 */

import type { Preview } from "@storybook/react"
import type { Palette } from "@mui/material/styles"
import type { ExpanseTheme, ThemeMode } from "@expanse/theme"
import { NEON_NAVY, NEON_PURPLE } from "@expanse/theme"
import {
  createPreviewConfig,
  themeGlobalTypes,
  parameters as sharedParameters,
} from "@expanse/storybook-config"

// Import brand-core factory functions
import {
  createProgressBarConfig,
  createGemConfig,
  createExperienceIconConfig,
  createExpanseCharacterConfig,
  createExpandingBorderBoxConfig,
  createTripleLayerPillConfig,
} from "../src/theme/factories"

// Import type augmentation
import "../src/theme/augmentation"

// ============================================================
// BRAND-CORE COMPONENT EXTENSIONS
// ============================================================

/**
 * Base component extensions from factories
 */
function createBrandCoreExtensionsBase(palette: Palette) {
  return {
    ProgressBar: createProgressBarConfig(palette),
    Gem: createGemConfig(palette),
    ExperienceIcon: createExperienceIconConfig(palette),
    ExpanseCharacter: createExpanseCharacterConfig(palette),
    ExpandingBorderBox: createExpandingBorderBoxConfig(palette),
    TripleLayerPill: createTripleLayerPillConfig(palette),
  }
}

type ComponentExtensionOverrides = Partial<ReturnType<typeof createBrandCoreExtensionsBase>>

/**
 * Theme-specific overrides for components
 * Example: Neon theme uses custom glow colors for Gem
 */
const THEME_OVERRIDES: Partial<Record<ExpanseTheme, Record<ThemeMode, ComponentExtensionOverrides>>> = {
  neon: {
    dark: {
      Gem: {
        variants: {
          default: { strokeColor: "#00d4ff", fillColor: NEON_PURPLE },
          contrastBG: { strokeColor: "#00d4ff", fillColor: NEON_NAVY },
        },
      },
    },
    light: {
      Gem: {
        variants: {
          default: { strokeColor: NEON_NAVY, fillColor: "#00d4ff" },
        },
      },
    },
  },
}

/**
 * Deep merge base extensions with overrides
 */
function mergeExtensions(
  base: ReturnType<typeof createBrandCoreExtensionsBase>,
  overrides?: ComponentExtensionOverrides
) {
  if (!overrides) return base

  return Object.keys(base).reduce((acc, key) => {
    const componentKey = key as keyof typeof base
    const baseConfig = base[componentKey]
    const overrideConfig = overrides[componentKey]

    if (overrideConfig) {
      acc[componentKey] = {
        ...baseConfig,
        variants: {
          ...(baseConfig as any).variants,
          ...(overrideConfig as any).variants,
        },
      } as any
    } else {
      acc[componentKey] = baseConfig
    }
    return acc
  }, {} as typeof base)
}

/**
 * Extension factory for storybook-config
 * Creates brand-core extensions with theme-specific overrides
 */
function brandCoreExtensionFactory(
  palette: Palette,
  color: ExpanseTheme,
  mode: ThemeMode
): Record<string, unknown> {
  const base = createBrandCoreExtensionsBase(palette)
  const overrides = THEME_OVERRIDES[color]?.[mode]
  return mergeExtensions(base, overrides)
}

// ============================================================
// PREVIEW CONFIGURATION
// ============================================================

const preview: Preview = createPreviewConfig({
  extensionFactory: brandCoreExtensionFactory,
  includeI18n: false, // brand-core doesn't need i18n
  additionalParameters: {
    backgrounds: {
      default: "theme",
      values: [
        { name: "theme", value: "transparent" },
        { name: "neon-dark", value: NEON_NAVY },
        { name: "neon-gradient", value: `linear-gradient(135deg, ${NEON_NAVY} 0%, ${NEON_PURPLE} 100%)` },
        { name: "white", value: "#ffffff" },
        { name: "light-gray", value: "#f5f5f5" },
        { name: "dark", value: "#121212" },
      ],
    },
  },
})

export default preview
