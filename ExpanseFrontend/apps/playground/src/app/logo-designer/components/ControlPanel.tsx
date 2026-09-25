/**
 * Control Panel
 * Sidebar container with all control sections
 */

"use client"

import { Box, Button, Tooltip, IconButton, Divider, Typography } from "@mui/material"
import { Undo as UndoIcon, Redo as RedoIcon, Refresh as ResetIcon } from "@mui/icons-material"
import { RingGeometrySection } from "./controls/RingGeometrySection"
import { RingAppearanceSection } from "./controls/RingAppearanceSection"
import { LogoElementsSection, PreviewSettingsSection } from "./controls/LogoElementsSection"
import { EyeLightingSection } from "./controls/EyeLightingSection"
import { SizePreviewSection } from "./controls/SizePreviewSection"
import { ExportSection } from "./controls/ExportSection"
import { PresetGallery } from "./presets/PresetGallery"
import { LogoConfig, Preset } from "../types"

interface ControlPanelProps {
  config: LogoConfig
  presets: Preset[]
  compareMode: boolean
  canUndo: boolean
  canRedo: boolean
  previewContainerId: string
  onConfigChange: (updates: Partial<LogoConfig>) => void
  onReset: () => void
  onUndo: () => void
  onRedo: () => void
  onLoadPreset: (preset: Preset) => void
  onSavePreset: (name: string, description?: string) => Preset
  onDeletePreset: (id: string) => void
  onToggleCompare: () => void
  onComparePreset: (id: string) => void
}

export function ControlPanel({
  config,
  presets,
  compareMode,
  canUndo,
  canRedo,
  previewContainerId,
  onConfigChange,
  onReset,
  onUndo,
  onRedo,
  onLoadPreset,
  onSavePreset,
  onDeletePreset,
  onToggleCompare,
  onComparePreset,
}: ControlPanelProps) {
  return (
    <Box
      sx={{
        width: 360,
        height: '100%',
        backgroundColor: 'background.paper',
        borderLeft: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Controls
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Undo (Cmd+Z)">
            <span>
              <IconButton size="small" onClick={onUndo} disabled={!canUndo}>
                <UndoIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Redo (Cmd+Shift+Z)">
            <span>
              <IconButton size="small" onClick={onRedo} disabled={!canRedo}>
                <RedoIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Reset to defaults">
            <IconButton size="small" onClick={onReset}>
              <ResetIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 1,
        }}
      >
        {/* Ring Geometry */}
        <RingGeometrySection config={config} onChange={onConfigChange} />

        {/* Ring Appearance */}
        <RingAppearanceSection config={config} onChange={onConfigChange} />

        {/* Logo Elements */}
        <LogoElementsSection config={config} onChange={onConfigChange} />

        {/* Eye & Lighting */}
        <EyeLightingSection config={config} onChange={onConfigChange} />

        {/* Preview Settings */}
        <PreviewSettingsSection config={config} onChange={onConfigChange} />

        {/* Size Previews */}
        <SizePreviewSection config={config} />

        <Divider sx={{ my: 1 }} />

        {/* Export */}
        <ExportSection
          config={config}
          previewContainerId={previewContainerId}
          onSavePreset={onSavePreset}
          onToggleCompare={onToggleCompare}
          compareMode={compareMode}
        />

        {/* Presets */}
        <PresetGallery
          presets={presets}
          onLoadPreset={onLoadPreset}
          onDeletePreset={onDeletePreset}
          onComparePreset={onComparePreset}
          compareMode={compareMode}
        />
      </Box>
    </Box>
  )
}
