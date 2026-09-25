/**
 * Ring Appearance Section
 * Controls for stroke width, opacity, and ring colors
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
} from "@mui/material"
import { ExpandMore as ExpandIcon } from "@mui/icons-material"
import { SliderWithInput } from "../inputs/SliderWithInput"
import { ColorPickerInput } from "../inputs/ColorPickerInput"
import { LogoConfig } from "../../types"

interface RingAppearanceSectionProps {
  config: LogoConfig
  onChange: (updates: Partial<LogoConfig>) => void
}

export function RingAppearanceSection({ config, onChange }: RingAppearanceSectionProps) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography fontWeight={600}>Ring Appearance</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* Stroke Width */}
        <SliderWithInput
          label="Stroke Width"
          value={config.ringStrokeWidth}
          onChange={(v) => onChange({ ringStrokeWidth: v })}
          min={1}
          max={16}
          step={0.5}
          defaultValue={4}
          unit="px"
        />

        {/* Opacity Mode */}
        <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
            Opacity Mode
          </Typography>
          <RadioGroup
            row
            value={config.opacityMode}
            onChange={(e) => onChange({ opacityMode: e.target.value as '1:2:3' | 'custom' })}
          >
            <FormControlLabel 
              value="1:2:3" 
              control={<Radio size="small" />} 
              label={
                <Box>
                  <Typography variant="body2">1:2:3 Scaling</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Inner 33%, Middle 67%, Outer 100%
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel value="custom" control={<Radio size="small" />} label="Custom" />
          </RadioGroup>
        </FormControl>

        {/* Base Opacity (for 1:2:3 mode) */}
        {config.opacityMode === '1:2:3' && (
          <SliderWithInput
            label="Base Opacity"
            value={config.baseOpacity}
            onChange={(v) => onChange({ baseOpacity: v })}
            min={0}
            max={1}
            step={0.05}
            defaultValue={1}
          />
        )}

        {/* Custom Opacities */}
        {config.opacityMode === 'custom' && (
          <>
            <SliderWithInput
              label="Inner Ring Opacity"
              value={config.customOpacities.inner}
              onChange={(v) => onChange({ 
                customOpacities: { ...config.customOpacities, inner: v } 
              })}
              min={0}
              max={1}
              step={0.05}
              defaultValue={0.33}
            />
            <SliderWithInput
              label="Middle Ring Opacity"
              value={config.customOpacities.middle}
              onChange={(v) => onChange({ 
                customOpacities: { ...config.customOpacities, middle: v } 
              })}
              min={0}
              max={1}
              step={0.05}
              defaultValue={0.67}
            />
            <SliderWithInput
              label="Outer Ring Opacity"
              value={config.customOpacities.outer}
              onChange={(v) => onChange({ 
                customOpacities: { ...config.customOpacities, outer: v } 
              })}
              min={0}
              max={1}
              step={0.05}
              defaultValue={1}
            />
          </>
        )}

        {/* Back Ring Opacity (for rings behind sphere) */}
        <SliderWithInput
          label="Back Ring Opacity"
          value={config.backRingOpacity}
          onChange={(v) => onChange({ backRingOpacity: v })}
          min={0}
          max={1}
          step={0.05}
          defaultValue={0.35}
        />

        {/* Arc Opacity (decorative arcs) */}
        <SliderWithInput
          label="Arc Opacity"
          value={config.arcOpacity}
          onChange={(v) => onChange({ arcOpacity: v })}
          min={0}
          max={1}
          step={0.05}
          defaultValue={0.34}
        />

        {/* Ring Color */}
        <FormControlLabel
          control={
            <Switch
              checked={config.useMainColorForRings}
              onChange={(e) => onChange({ useMainColorForRings: e.target.checked })}
              size="small"
            />
          }
          label="Use main fill color for rings"
          sx={{ mb: 2, ml: 0 }}
        />

        {!config.useMainColorForRings && (
          <ColorPickerInput
            label="Ring Color"
            value={config.ringColor}
            onChange={(v) => onChange({ ringColor: v })}
          />
        )}
      </AccordionDetails>
    </Accordion>
  )
}
