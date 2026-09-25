"use client"

import React from "react"
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import type { SettingsSection } from "../../SettingsPage/SettingsPage"
import type { LayoutType } from "../../../core/providers"
import type {
  MinimalLayoutPreset,
  DocumentationLayoutPreset,
  DashboardLayoutPreset,
  FullScreenLayoutPreset,
} from "../../../templates/types"

interface LayoutTypeSectionProps {
  layoutType: LayoutType
  minimalPreset: MinimalLayoutPreset
  documentationPreset: DocumentationLayoutPreset
  dashboardPreset: DashboardLayoutPreset
  fullScreenPreset: FullScreenLayoutPreset
  onLayoutTypeChange: (value: LayoutType) => void
  onMinimalPresetChange: (value: MinimalLayoutPreset) => void
  onDocumentationPresetChange: (value: DocumentationLayoutPreset) => void
  onDashboardPresetChange: (value: DashboardLayoutPreset) => void
  onFullScreenPresetChange: (value: FullScreenLayoutPreset) => void
}

export function useLayoutTypeSection({
  layoutType,
  minimalPreset,
  documentationPreset,
  dashboardPreset,
  fullScreenPreset,
  onLayoutTypeChange,
  onMinimalPresetChange,
  onDocumentationPresetChange,
  onDashboardPresetChange,
  onFullScreenPresetChange,
}: LayoutTypeSectionProps): SettingsSection {
  return {
    id: "layout-type",
    title: "Layout Type & Preset",
    description: "Choose the base layout and its visual preset",
    content: (
      <Stack spacing={3}>
        {/* Layout Type Selector */}
        <FormControl fullWidth>
          <FormLabel>Layout Type</FormLabel>
          <Select
            value={layoutType}
            onChange={(e) => onLayoutTypeChange(e.target.value as LayoutType)}
            size="small"
          >
            <MenuItem value="minimal">
              <Box>
                <Typography variant="body2" sx={{
                  fontWeight: "bold"
                }}>Minimal Layout</Typography>
                <Typography variant="caption" sx={{
                  color: "text.secondary"
                }}>Cleanest possible, content-first</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="documentation">
              <Box>
                <Typography variant="body2" sx={{
                  fontWeight: "bold"
                }}>Documentation Layout</Typography>
                <Typography variant="caption" sx={{
                  color: "text.secondary"
                }}>Clean, minimal style for docs/marketing</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="dashboard">
              <Box>
                <Typography variant="body2" sx={{
                  fontWeight: "bold"
                }}>Dashboard Layout</Typography>
                <Typography variant="caption" sx={{
                  color: "text.secondary"
                }}>Rich dashboard with all controls</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="fullscreen">
              <Box>
                <Typography variant="body2" sx={{
                  fontWeight: "bold"
                }}>Full Screen Layout</Typography>
                <Typography variant="caption" sx={{
                  color: "text.secondary"
                }}>Full viewport with configurable overlays</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="panel">
              <Box>
                <Typography variant="body2" sx={{
                  fontWeight: "bold"
                }}>Panel Layout</Typography>
                <Typography variant="caption" sx={{
                  color: "text.secondary"
                }}>Flex-based slots for split-screen/embedded</Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>

        {/* Minimal Preset */}
        {layoutType === "minimal" && (
          <FormControl fullWidth>
            <FormLabel>Minimal Layout Preset</FormLabel>
            <RadioGroup
              value={minimalPreset}
              onChange={(e) => onMinimalPresetChange(e.target.value as MinimalLayoutPreset)}
            >
              <FormControlLabel value="clean" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Clean</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>No controls, just content</Typography>
                </Box>
              } />
              <FormControlLabel value="floating-controls" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Floating Controls</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Subtle floating minimap + nav</Typography>
                </Box>
              } />
              <FormControlLabel value="bottom-controls" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Bottom Controls</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Controls docked at bottom</Typography>
                </Box>
              } />
            </RadioGroup>
          </FormControl>
        )}

        {/* Documentation Preset */}
        {layoutType === "documentation" && (
          <FormControl fullWidth>
            <FormLabel>Documentation Layout Preset</FormLabel>
            <RadioGroup
              value={documentationPreset}
              onChange={(e) => onDocumentationPresetChange(e.target.value as DocumentationLayoutPreset)}
            >
              <FormControlLabel value="default" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Default</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Top bar + both sidebars + minimap + controls</Typography>
                </Box>
              } />
              <FormControlLabel value="minimal" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Minimal</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Just top bar + minimap</Typography>
                </Box>
              } />
              <FormControlLabel value="sidebar-focus" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Sidebar Focus</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Emphasized sidebars for navigation</Typography>
                </Box>
              } />
              <FormControlLabel value="clean" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Clean</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Top bar only, no sidebars</Typography>
                </Box>
              } />
            </RadioGroup>
          </FormControl>
        )}

        {/* Dashboard Preset */}
        {layoutType === "dashboard" && (
          <FormControl fullWidth>
            <FormLabel>Dashboard Layout Preset</FormLabel>
            <RadioGroup
              value={dashboardPreset}
              onChange={(e) => onDashboardPresetChange(e.target.value as DashboardLayoutPreset)}
            >
              <FormControlLabel value="default" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Default</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>All bars visible, minimap top-right</Typography>
                </Box>
              } />
              <FormControlLabel value="focus-mode" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Focus Mode</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Hide sidebars, show top/bottom only</Typography>
                </Box>
              } />
              <FormControlLabel value="compact" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Compact</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Smaller bars, more content space</Typography>
                </Box>
              } />
            </RadioGroup>
          </FormControl>
        )}

        {/* Full Screen Preset */}
        {layoutType === "fullscreen" && (
          <FormControl fullWidth>
            <FormLabel>Full Screen Layout Preset</FormLabel>
            <RadioGroup
              value={fullScreenPreset}
              onChange={(e) => onFullScreenPresetChange(e.target.value as FullScreenLayoutPreset)}
            >
              <FormControlLabel value="immersive" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Immersive</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Clean full-screen, floating controls</Typography>
                </Box>
              } />
              <FormControlLabel value="symbol-grid" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Symbol Grid</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Symbol-grid style with chat zone</Typography>
                </Box>
              } />
              <FormControlLabel value="gaming" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Gaming</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Compact HUD-style controls</Typography>
                </Box>
              } />
              <FormControlLabel value="presentation" control={<Radio />} label={
                <Box>
                  <Typography variant="body2">Presentation</Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>Minimal UI for focus</Typography>
                </Box>
              } />
            </RadioGroup>
          </FormControl>
        )}
      </Stack>
    ),
  };
}
