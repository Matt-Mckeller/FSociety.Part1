"use client"

import React from "react"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
} from "@mui/material"
import type { SettingsSection } from "../../SettingsPage/SettingsPage"
import type {
  MinimapVariant,
  MinimapSize,
  MinimapPosition,
  MinimapColorScheme,
} from "@expanse/map"

interface MinimapConfig {
  enabled: boolean
  variant: MinimapVariant
  size: MinimapSize
  position: MinimapPosition
  colorScheme: MinimapColorScheme
  showLabels: boolean
}

interface MinimapSectionProps {
  enabled: boolean
  variant: MinimapVariant
  size: MinimapSize
  position: MinimapPosition
  colorScheme: MinimapColorScheme
  showLabels: boolean
  onUpdate: <K extends keyof MinimapConfig>(key: K, value: MinimapConfig[K]) => void
}

export function useMinimapSection({
  enabled,
  variant,
  size,
  position,
  colorScheme,
  showLabels,
  onUpdate,
}: MinimapSectionProps): SettingsSection {
  return {
    id: "minimap",
    title: "Minimap Configuration",
    description: "Customize the minimap appearance and behavior",
    content: (
      <Stack spacing={3}>
        <FormControlLabel
          control={
            <Switch
              checked={enabled}
              onChange={(e) => onUpdate("enabled", e.target.checked)}
            />
          }
          label="Show Minimap"
        />

        {enabled && (
          <>
            <FormControl fullWidth>
              <FormLabel>Visual Variant</FormLabel>
              <Select
                value={variant}
                onChange={(e) => onUpdate("variant", e.target.value as MinimapVariant)}
                size="small"
              >
                <MenuItem value="grid">Grid (lines between tiles)</MenuItem>
                <MenuItem value="dots">Dots (circular indicators)</MenuItem>
                <MenuItem value="blocks">Blocks (solid squares)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Size</FormLabel>
              <RadioGroup
                row
                value={size}
                onChange={(e) => onUpdate("size", e.target.value as MinimapSize)}
              >
                <FormControlLabel value="small" control={<Radio />} label="Small" />
                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="large" control={<Radio />} label="Large" />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Position</FormLabel>
              <Select
                value={position}
                onChange={(e) => onUpdate("position", e.target.value as MinimapPosition)}
                size="small"
              >
                <MenuItem value="top-right">Top Right</MenuItem>
                <MenuItem value="top-left">Top Left</MenuItem>
                <MenuItem value="bottom-right">Bottom Right</MenuItem>
                <MenuItem value="bottom-left">Bottom Left</MenuItem>
                <MenuItem value="inline">Inline (not floating)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Color Scheme</FormLabel>
              <Select
                value={colorScheme}
                onChange={(e) => onUpdate("colorScheme", e.target.value as MinimapColorScheme)}
                size="small"
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="monochrome">Monochrome</MenuItem>
                <MenuItem value="vibrant">Vibrant</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={showLabels}
                  onChange={(e) => onUpdate("showLabels", e.target.checked)}
                />
              }
              label="Show tile labels on hover"
            />
          </>
        )}
      </Stack>
    ),
  }
}
