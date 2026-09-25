/**
 * Eye & Lighting Section
 * Controls for eye mode, pupil appearance, and lighting direction
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
import {
  ExpandMore as ExpandIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material"
import { SliderWithInput } from "../inputs/SliderWithInput"
import { ColorPickerInput } from "../inputs/ColorPickerInput"
import { LogoConfig } from "../../types"
import { PUPIL_GAZE_DIRECTIONS } from "expanse.dynamicAssets/logo"

interface EyeLightingSectionProps {
  config: LogoConfig
  onChange: (updates: Partial<LogoConfig>) => void
}

export function EyeLightingSection({
  config,
  onChange,
}: EyeLightingSectionProps) {
  // Handle gaze preset changes
  const handleGazePresetChange = (
    _: React.MouseEvent<HTMLElement>,
    preset: string | null,
  ) => {
    if (!preset) return

    if (preset === "custom") {
      onChange({ pupilGazePreset: "custom" })
    } else {
      const direction =
        PUPIL_GAZE_DIRECTIONS[preset as keyof typeof PUPIL_GAZE_DIRECTIONS]
      onChange({
        pupilGazePreset: preset as "moon" | "1-oclock" | "custom",
        pupilDirection: direction,
      })
    }
  }

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography fontWeight={600}>Eye & Lighting</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* Eye Mode Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={config.eyeMode}
              onChange={(e) => onChange({ eyeMode: e.target.checked })}
              size="small"
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {config.eyeMode ? (
                <Visibility fontSize="small" />
              ) : (
                <VisibilityOff fontSize="small" />
              )}
              <Box>
                <Typography variant="body2">Eye Mode</Typography>
                <Typography variant="caption" color="text.secondary">
                  Add pupil to the planet sphere
                </Typography>
              </Box>
            </Box>
          }
          sx={{ mb: 2, alignItems: "flex-start", ml: 0 }}
        />

        {/* Eye Mode Controls */}
        {config.eyeMode && (
          <Box
            sx={{
              pl: 2,
              borderLeft: "2px solid",
              borderColor: "divider",
              ml: 1,
              mb: 2,
            }}
          >
            {/* Gaze Direction Presets */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 1, display: "block" }}
            >
              Gaze Direction
            </Typography>
            <ToggleButtonGroup
              value={config.pupilGazePreset}
              exclusive
              onChange={handleGazePresetChange}
              size="small"
              sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}
            >
              <ToggleButton value="moon" sx={{ textTransform: "none" }}>
                At Moon
              </ToggleButton>
              <ToggleButton value="1-oclock" sx={{ textTransform: "none" }}>
                1 O&apos;Clock
              </ToggleButton>
              <ToggleButton value="custom" sx={{ textTransform: "none" }}>
                Custom
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Custom Angle (when preset is 'custom') */}
            {config.pupilGazePreset === "custom" && (
              <SliderWithInput
                label="Gaze Angle"
                value={config.pupilDirection}
                onChange={(v) => onChange({ pupilDirection: v })}
                min={0}
                max={360}
                step={5}
                unit="°"
              />
            )}

            {/* Pupil Offset */}
            <SliderWithInput
              label="Pupil Offset"
              value={config.pupilOffset}
              onChange={(v) => onChange({ pupilOffset: v })}
              min={0}
              max={0.6}
              step={0.05}
            />

            {/* Pupil Size */}
            <SliderWithInput
              label="Pupil Size"
              value={config.pupilSize}
              onChange={(v) => onChange({ pupilSize: v })}
              min={0.1}
              max={0.5}
              step={0.05}
            />

            {/* Pupil Contrast */}
            <SliderWithInput
              label="Pupil Contrast"
              value={config.pupilContrast}
              onChange={(v) => onChange({ pupilContrast: v })}
              min={0.3}
              max={1}
              step={0.05}
            />

            {/* Pupil Outer Color (Border/Iris) */}
            <ColorPickerInput
              label="Pupil Outer Color"
              value={config.pupilColor}
              onChange={(v) => onChange({ pupilColor: v })}
            />

            {/* Pupil Inner Color (Core) */}
            <ColorPickerInput
              label="Pupil Inner Color"
              value={config.pupilInnerColor}
              onChange={(v) => onChange({ pupilInnerColor: v })}
            />

            {/* Pupil Inner Size (adjusts border thickness) */}
            <SliderWithInput
              label="Inner Size"
              value={config.pupilInnerSize}
              onChange={(v) => onChange({ pupilInnerSize: v })}
              min={0.3}
              max={0.95}
              step={0.05}
            />
          </Box>
        )}

        {/* Lighting Section */}
        <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>
          Lighting
        </Typography>

        {/* Light Direction */}
        <SliderWithInput
          label="Light Direction"
          value={config.lightDirection}
          onChange={(v) => onChange({ lightDirection: v })}
          min={0}
          max={360}
          step={15}
          unit="°"
        />

        {/* Highlight Intensity */}
        <SliderWithInput
          label="Highlight Intensity"
          value={config.highlightIntensity}
          onChange={(v) => onChange({ highlightIntensity: v })}
          min={0}
          max={0.4}
          step={0.05}
        />
      </AccordionDetails>
    </Accordion>
  )
}
