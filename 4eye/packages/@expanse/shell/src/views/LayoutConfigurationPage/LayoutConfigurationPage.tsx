"use client"

import React from "react"
import { Box, Stack, Chip, Typography } from "@mui/material"
import { useLayoutConfig } from '../../core/providers'
import { SettingsPage, type SettingsSection } from "../SettingsPage/SettingsPage"
import {
  useLayoutTypeSection,
  useMinimapSection,
  useNavControlsSection,
  useBarVisibilitySection,
  useActionsSection,
} from "./sections"

/**
 * Layout Configuration Page
 *
 * Comprehensive settings UI for configuring layout behavior, presets,
 * minimap options, and bar visibility.
 *
 * @example
 * ```tsx
 * import { LayoutConfigurationPage, LayoutConfigProvider } from '@expanse/shell';
 *
 * function SettingsRoute() {
 *   return (
 *     <LayoutConfigProvider>
 *       <LayoutConfigurationPage />
 *     </LayoutConfigProvider>
 *   );
 * }
 * ```
 */
export function LayoutConfigurationPage() {
  const {
    config,
    updateConfig,
    updateMinimapConfig,
    updateBarVisibility,
    resetConfig,
  } = useLayoutConfig()

  // Build sections using hooks
  const layoutSection = useLayoutTypeSection({
    layoutType: config.layoutType,
    minimalPreset: config.minimalPreset,
    documentationPreset: config.documentationPreset,
    dashboardPreset: config.dashboardPreset,
    fullScreenPreset: config.fullScreenPreset,
    onLayoutTypeChange: (v) => updateConfig("layoutType", v),
    onMinimalPresetChange: (v) => updateConfig("minimalPreset", v),
    onDocumentationPresetChange: (v) => updateConfig("documentationPreset", v),
    onDashboardPresetChange: (v) => updateConfig("dashboardPreset", v),
    onFullScreenPresetChange: (v) => updateConfig("fullScreenPreset", v),
  })

  const minimapSection = useMinimapSection({
    enabled: config.minimap.enabled,
    variant: config.minimap.variant,
    size: config.minimap.size,
    position: config.minimap.position,
    colorScheme: config.minimap.colorScheme,
    showLabels: config.minimap.showLabels,
    onUpdate: updateMinimapConfig,
  })

  const navControlsSection = useNavControlsSection({
    showNavigationControls: config.showNavigationControls,
    onToggle: (v) => updateConfig("showNavigationControls", v),
  })

  const barVisibilitySection = useBarVisibilitySection({
    top: config.barVisibility.top,
    left: config.barVisibility.left,
    right: config.barVisibility.right,
    bottom: config.barVisibility.bottom,
    onUpdate: updateBarVisibility,
  })

  const actionsSection = useActionsSection({
    onReset: resetConfig,
  })

  const sections: SettingsSection[] = [
    layoutSection,
    minimapSection,
    navControlsSection,
    barVisibilitySection,
    actionsSection,
  ]

  return (
    <Box>
      {/* Current Config Summary */}
      <Box sx={{ mb: 4, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Current Configuration
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap sx={{
          flexWrap: "wrap"
        }}>
          <Chip label={`Layout: ${config.layoutType}`} size="small" color="primary" />
          <Chip
            label={`Minimap: ${config.minimap.enabled ? config.minimap.variant : "off"}`}
            size="small"
          />
          <Chip
            label={`Nav Controls: ${config.showNavigationControls ? "on" : "off"}`}
            size="small"
          />
        </Stack>
      </Box>
      {/* Settings Sections */}
      <SettingsPage title="Layout Configuration" sections={sections} maxWidth="md" />
    </Box>
  );
}
