/**
 * Layout Template Configurations
 *
 * Pre-defined configuration sets for each layout template.
 */

// Individual configuration files
export { minimalLayoutPresets } from "./minimalTemplateConfig"
export { documentationLayoutPresets } from "./documentationTemplateConfig"
export { dashboardLayoutPresets } from "./dashboardTemplateConfig"
export { appLayoutPresets } from "./appTemplateConfig"
export { marketingLayoutPresets } from "./marketingTemplateConfig"
export { fullScreenLayoutPresets } from "./fullscreenTemplateConfig"

// Re-export types for convenience
export type {
  LayoutPresetConfig,
  LayoutPresetMap,
  MinimalLayoutPreset,
  DocumentationLayoutPreset,
  DashboardLayoutPreset,
  AppLayoutPreset,
  MarketingLayoutPreset,
  FullScreenLayoutPreset,
} from "../types"

import type { LayoutPresetConfig } from "../types"
import { minimalLayoutPresets } from "./minimalTemplateConfig"
import { documentationLayoutPresets } from "./documentationTemplateConfig"
import { dashboardLayoutPresets } from "./dashboardTemplateConfig"
import { appLayoutPresets } from "./appTemplateConfig"
import { marketingLayoutPresets } from "./marketingTemplateConfig"
import { fullScreenLayoutPresets } from "./fullscreenTemplateConfig"

/**
 * Central registry of all preset configurations
 */
export const presetRegistry = {
  minimal: minimalLayoutPresets,
  documentation: documentationLayoutPresets,
  dashboard: dashboardLayoutPresets,
  app: appLayoutPresets,
  marketing: marketingLayoutPresets,
  fullScreen: fullScreenLayoutPresets,
} as const

/**
 * Get preset configuration by layout type and preset name
 */
export function getPresetConfig<T extends keyof typeof presetRegistry>(
  layoutType: T,
  presetName: string
): LayoutPresetConfig | null {
  const presets = presetRegistry[layoutType]
  return (presets as any)[presetName] || null
}
