/**
 * Logo Elements Section
 * Controls for moon, arc segments, and fill colors
 */

"use client"

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { ExpandMore as ExpandIcon } from "@mui/icons-material"
import { ColorPickerInput } from "../inputs/ColorPickerInput"
import { SliderWithInput } from "../inputs/SliderWithInput"
import { LogoConfig, BACKGROUND_PRESETS } from "../../types"

interface LogoElementsSectionProps {
  config: LogoConfig
  onChange: (updates: Partial<LogoConfig>) => void
}

export function LogoElementsSection({
  config,
  onChange,
}: LogoElementsSectionProps) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography fontWeight={600}>Logo Elements</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* Show Moon */}
        <FormControlLabel
          control={
            <Switch
              checked={config.showMoon}
              onChange={(e) => onChange({ showMoon: e.target.checked })}
              size="small"
            />
          }
          label={
            <Box>
              <Typography variant="body2">Show Moon</Typography>
              <Typography variant="caption" color="text.secondary">
                Lower left orbiting circle
              </Typography>
            </Box>
          }
          sx={{ mb: 2, alignItems: "flex-start", ml: 0 }}
        />

        {/* Moon Controls - shown when moon is enabled */}
        {config.showMoon && (
          <Box
            sx={{
              pl: 2,
              mb: 2,
              borderLeft: "2px solid",
              borderColor: "divider",
            }}
          >
            <SliderWithInput
              label="Moon Size (%)"
              value={config.moonSizePercent}
              onChange={(v) => onChange({ moonSizePercent: v })}
              min={10}
              max={60}
              step={1}
            />
            <SliderWithInput
              label="Moon X Offset"
              value={config.moonOffsetX}
              onChange={(v) => onChange({ moonOffsetX: v })}
              min={-50}
              max={50}
              step={5}
            />
            <SliderWithInput
              label="Moon Y Offset"
              value={config.moonOffsetY}
              onChange={(v) => onChange({ moonOffsetY: v })}
              min={-50}
              max={50}
              step={5}
            />
          </Box>
        )}

        {/* Show Arc Segments */}
        <FormControlLabel
          control={
            <Switch
              checked={config.showArcSegments}
              onChange={(e) => onChange({ showArcSegments: e.target.checked })}
              size="small"
            />
          }
          label={
            <Box>
              <Typography variant="body2">Show Arc Segments</Typography>
              <Typography variant="caption" color="text.secondary">
                Original decorative arc bands
              </Typography>
            </Box>
          }
          sx={{ mb: 2, alignItems: "flex-start", ml: 0 }}
        />

        {/* Arc Color Controls - only show when arc segments are enabled */}
        {config.showArcSegments && (
          <Box
            sx={{
              pl: 2,
              borderLeft: "2px solid",
              borderColor: "divider",
              ml: 1,
              mb: 2,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 1, display: "block" }}
            >
              Arc Colors (leave blank to use Ring Color)
            </Typography>
            <ColorPickerInput
              label="Arc 1 Color"
              value={config.arc1Color || ""}
              onChange={(v) => onChange({ arc1Color: v || undefined })}
            />
            <ColorPickerInput
              label="Arc 2 Color"
              value={config.arc2Color || ""}
              onChange={(v) => onChange({ arc2Color: v || undefined })}
            />
            <ColorPickerInput
              label="Arc 3 Color"
              value={config.arc3Color || ""}
              onChange={(v) => onChange({ arc3Color: v || undefined })}
            />
          </Box>
        )}

        {/* Use 3D Version */}
        <FormControlLabel
          control={
            <Switch
              checked={config.use3D}
              onChange={(e) => onChange({ use3D: e.target.checked })}
              size="small"
            />
          }
          label={
            <Box>
              <Typography variant="body2">3D Rendering</Typography>
              <Typography variant="caption" color="text.secondary">
                Gradients, shadows, and highlights
              </Typography>
            </Box>
          }
          sx={{ mb: 3, alignItems: "flex-start", ml: 0 }}
        />

        {/* Main Fill Color */}
        <ColorPickerInput
          label="Main Fill Color"
          value={config.mainFill}
          onChange={(v) => onChange({ mainFill: v })}
        />
      </AccordionDetails>
    </Accordion>
  )
}

/**
 * Preview Settings Section
 * Background color and preview size
 */
interface PreviewSettingsSectionProps {
  config: LogoConfig
  onChange: (updates: Partial<LogoConfig>) => void
}

export function PreviewSettingsSection({
  config,
  onChange,
}: PreviewSettingsSectionProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography fontWeight={600}>Preview Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* Background Presets */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500, mb: 1 }}
        >
          Background
        </Typography>
        <ToggleButtonGroup
          value={config.backgroundColor}
          exclusive
          onChange={(_, value) => value && onChange({ backgroundColor: value })}
          size="small"
          sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}
        >
          {BACKGROUND_PRESETS.map((preset) => (
            <ToggleButton
              key={preset.value}
              value={preset.value}
              sx={{
                px: 1.5,
                py: 0.5,
                textTransform: "none",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: preset.value,
                  borderRadius: 0.5,
                  border: "1px solid",
                  borderColor: "divider",
                  mr: 1,
                }}
              />
              {preset.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Custom Background */}
        <ColorPickerInput
          label="Custom Background"
          value={config.backgroundColor}
          onChange={(v) => onChange({ backgroundColor: v })}
        />
      </AccordionDetails>
    </Accordion>
  )
}
