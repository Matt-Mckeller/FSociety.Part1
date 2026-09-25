/**
 * Ring Geometry Section
 * Controls for ring extent, rotation, spacing, and mirroring
 */

"use client"

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  Chip,
} from "@mui/material"
import { ExpandMore as ExpandIcon } from "@mui/icons-material"
import { SliderWithInput } from "../inputs/SliderWithInput"
import { LogoConfig, EXTENT_DESCRIPTIONS } from "../../types"
import { RingExtent, RING_EXTENT_PRESETS } from "expanse.dynamicAssets/logo"

interface RingGeometrySectionProps {
  config: LogoConfig
  onChange: (updates: Partial<LogoConfig>) => void
}

const EXTENT_OPTIONS: RingExtent[] = ['compact', 'innerArc', 'arcCenter', 'outerArc', 'moonCenter']

const ROTATION_MARKS = [
  { value: -90, label: '-90°' },
  { value: -33, label: '-33°' },
  { value: 0, label: '0°' },
  { value: 33, label: '+33°' },
  { value: 90, label: '+90°' },
]

export function RingGeometrySection({ config, onChange }: RingGeometrySectionProps) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography fontWeight={600}>Ring Geometry</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* Extent Mode Toggle */}
        <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
            Extent Mode
          </Typography>
          <RadioGroup
            row
            value={config.extentMode}
            onChange={(e) => onChange({ extentMode: e.target.value as 'preset' | 'custom' })}
          >
            <FormControlLabel value="preset" control={<Radio size="small" />} label="Preset" />
            <FormControlLabel value="custom" control={<Radio size="small" />} label="Custom" />
          </RadioGroup>
        </FormControl>

        {/* Preset Selector */}
        {config.extentMode === 'preset' && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel size="small">Ring Extent</InputLabel>
            <Select
              value={config.ringExtent}
              label="Ring Extent"
              size="small"
              onChange={(e) => onChange({ ringExtent: e.target.value as RingExtent })}
            >
              {EXTENT_OPTIONS.map((extent) => (
                <MenuItem key={extent} value={extent}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" fontWeight={500}>
                      {extent}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {EXTENT_DESCRIPTIONS[extent]}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Custom Extent Sliders */}
        {config.extentMode === 'custom' && (
          <>
            <SliderWithInput
              label="Outer Rx (semi-major)"
              value={config.customRx}
              onChange={(v) => onChange({ customRx: v })}
              min={100}
              max={300}
              step={1}
              defaultValue={123}
              unit="px"
            />
            <SliderWithInput
              label="Outer Ry (semi-minor)"
              value={config.customRy}
              onChange={(v) => onChange({ customRy: v })}
              min={10}
              max={150}
              step={0.25}
              defaultValue={30.75}
              unit="px"
              disabled={config.circular}
            />
          </>
        )}

        {/* Circular Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={config.circular}
              onChange={(e) => onChange({ circular: e.target.checked })}
              size="small"
            />
          }
          label={
            <Box>
              <Typography variant="body2">Circular Rings</Typography>
              <Typography variant="caption" color="text.secondary">
                Make ry = rx for perfect circles
              </Typography>
            </Box>
          }
          sx={{ mb: 2, alignItems: 'flex-start', ml: 0 }}
        />

        {/* Rotation Slider */}
        <SliderWithInput
          label="Rotation"
          value={config.orbitalRotation}
          onChange={(v) => onChange({ orbitalRotation: v })}
          min={-90}
          max={90}
          step={1}
          defaultValue={-33}
          unit="°"
          marks={ROTATION_MARKS}
        />

        {/* Primary Rings */}
        <FormControlLabel
          control={
            <Switch
              checked={config.showPrimaryRings}
              onChange={(e) => onChange({ showPrimaryRings: e.target.checked })}
              size="small"
            />
          }
          label={
            <Box>
              <Typography variant="body2">Primary Rings (Left)</Typography>
              <Typography variant="caption" color="text.secondary">
                Show original ring set
              </Typography>
            </Box>
          }
          sx={{ mb: 2, alignItems: 'flex-start', ml: 0 }}
        />

        {/* Mirrored Rings */}
        <FormControlLabel
          control={
            <Switch
              checked={config.mirroredRings}
              onChange={(e) => onChange({ mirroredRings: e.target.checked })}
              size="small"
            />
          }
          label={
            <Box>
              <Typography variant="body2">Mirrored Rings (Right)</Typography>
              <Typography variant="caption" color="text.secondary">
                Show mirrored ring set
              </Typography>
            </Box>
          }
          sx={{ mb: 2, alignItems: 'flex-start', ml: 0 }}
        />

        {/* Mirrored Angle */}
        {config.mirroredRings && (
          <>
            <FormControlLabel
              control={
                <Switch
                  checked={config.autoMirrorAngle}
                  onChange={(e) => onChange({ 
                    autoMirrorAngle: e.target.checked,
                    mirroredRotation: e.target.checked ? -config.orbitalRotation : config.mirroredRotation
                  })}
                  size="small"
                />
              }
              label="Auto-mirror angle"
              sx={{ mb: 1, ml: 0 }}
            />
            {!config.autoMirrorAngle && (
              <SliderWithInput
                label="Mirror Rotation"
                value={config.mirroredRotation}
                onChange={(v) => onChange({ mirroredRotation: v })}
                min={-90}
                max={90}
                step={1}
                defaultValue={33}
                unit="°"
              />
            )}
            {config.autoMirrorAngle && (
              <Chip
                label={`Mirror angle: ${-config.orbitalRotation}°`}
                size="small"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}
          </>
        )}

        {/* Ring Spacing */}
        <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
            Ring Spacing
          </Typography>
          <RadioGroup
            row
            value={config.ringSpacing}
            onChange={(e) => onChange({ ringSpacing: e.target.value as 'proportional' | 'fixed' })}
          >
            <FormControlLabel value="proportional" control={<Radio size="small" />} label="Proportional" />
            <FormControlLabel value="fixed" control={<Radio size="small" />} label="Fixed Gap" />
          </RadioGroup>
        </FormControl>

        {config.ringSpacing === 'fixed' && (
          <>
            <SliderWithInput
              label="Gap 1 (Inner↔Middle)"
              value={config.fixedGap1}
              onChange={(v) => onChange({ fixedGap1: v })}
              min={2}
              max={24}
              step={1}
              defaultValue={8}
              unit="px"
            />
            <SliderWithInput
              label="Gap 2 (Middle↔Outer)"
              value={config.fixedGap2}
              onChange={(v) => onChange({ fixedGap2: v })}
              min={2}
              max={24}
              step={1}
              defaultValue={8}
              unit="px"
            />
          </>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
