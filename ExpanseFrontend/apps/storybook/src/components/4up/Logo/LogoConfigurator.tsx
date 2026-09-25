/**
 * LogoConfigurator Component
 * 
 * Interactive UI for configuring logo appearance
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Slider,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Grid,
  Paper,
  Divider,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Logo } from './Logo';
import { 
  defaultLogoConfig, 
  colorPresets, 
  opacityPresets, 
  overlapPresets, 
  ratioPresets,
} from './utils/logoConfig';
import type { LogoConfig, LogoShape, LogoConfiguratorProps } from './types';

export const LogoConfigurator: React.FC<LogoConfiguratorProps> = ({
  initialConfig = {},
  onChange,
  showExport = true,
}) => {
  const [config, setConfig] = useState<LogoConfig>({
    ...defaultLogoConfig,
    ...initialConfig,
  });

  const updateConfig = useCallback((partial: Partial<LogoConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...partial };
      return updated;
    });
  }, []);

  // Call onChange when config updates
  useEffect(() => {
    onChange?.(config);
  }, [config, onChange]);

  const handleExport = useCallback(() => {
    const json = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(json);
    alert('Config copied to clipboard!');
  }, [config]);

  const handleReset = useCallback(() => {
    setConfig(defaultLogoConfig);
  }, []);

  return (
    <Box sx={{ display: 'flex', gap: 4, p: 2, minHeight: '600px' }}>
      {/* Preview Panel */}
      <Paper 
        elevation={0} 
        sx={{ 
          flex: '0 0 400px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          borderRadius: 2,
          bgcolor: 'grey.100',
          position: 'sticky',
          top: 20,
          height: 'fit-content',
        }}
      >
        <Logo size={300} config={config} />
        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          {showExport && (
            <Button variant="outlined" size="small" onClick={handleExport}>
              Copy Config
            </Button>
          )}
          <Button variant="outlined" size="small" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Paper>

      {/* Controls Panel */}
      <Box sx={{ flex: 1, maxWidth: 500 }}>
        {/* Shape Selection */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold">Shape</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth size="small">
              <InputLabel>Base Shape</InputLabel>
              <Select
                value={config.shape}
                label="Base Shape"
                onChange={(e) => updateConfig({ shape: e.target.value as LogoShape })}
              >
                <MenuItem value="circle">Circle</MenuItem>
                <MenuItem value="square">Square</MenuItem>
                <MenuItem value="triangle">Triangle</MenuItem>
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        {/* Colors */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold">Colors</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1} sx={{ mb: 2 }}>
              {colorPresets.slice(0, 12).map((preset) => (
                <Grid size={{ xs: 3 }} key={preset.name}>
                  <Chip
                    label=""
                    size="small"
                    sx={{
                      bgcolor: preset.color,
                      width: '100%',
                      height: 24,
                      cursor: 'pointer',
                      border: config.fillColor === preset.color ? '2px solid #333' : 'none',
                    }}
                    onClick={() => updateConfig({ 
                      fillColor: preset.color, 
                      waveColor: preset.color 
                    })}
                  />
                </Grid>
              ))}
            </Grid>
            <TextField
              label="Fill Color"
              value={config.fillColor}
              onChange={(e) => updateConfig({ fillColor: e.target.value })}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Wave Color"
              value={config.waveColor}
              onChange={(e) => updateConfig({ waveColor: e.target.value })}
              fullWidth
              size="small"
            />
          </AccordionDetails>
        </Accordion>

        {/* Opacity */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold">Opacity</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">Presets</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {opacityPresets.map((preset) => (
                  <Chip
                    key={preset.name}
                    label={preset.name}
                    size="small"
                    onClick={() => updateConfig({
                      baseOpacity: preset.baseOpacity,
                      primaryOpacity: preset.primaryOpacity,
                      waveOpacity: preset.waveOpacity,
                    })}
                    variant={
                      config.baseOpacity === preset.baseOpacity &&
                      config.primaryOpacity === preset.primaryOpacity
                        ? 'filled'
                        : 'outlined'
                    }
                  />
                ))}
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography gutterBottom>Base Opacity: {config.baseOpacity.toFixed(2)}</Typography>
            <Slider
              value={config.baseOpacity}
              onChange={(_, v) => updateConfig({ baseOpacity: v as number })}
              min={0}
              max={1}
              step={0.01}
              size="small"
            />
            <Typography gutterBottom>Primary Opacity: {config.primaryOpacity.toFixed(2)}</Typography>
            <Slider
              value={config.primaryOpacity}
              onChange={(_, v) => updateConfig({ primaryOpacity: v as number })}
              min={0}
              max={1}
              step={0.01}
              size="small"
            />
            <Typography gutterBottom>Wave Opacity: {config.waveOpacity.toFixed(2)}</Typography>
            <Slider
              value={config.waveOpacity}
              onChange={(_, v) => updateConfig({ waveOpacity: v as number })}
              min={0}
              max={1}
              step={0.01}
              size="small"
            />
          </AccordionDetails>
        </Accordion>

        {/* Overlap */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold">Overlap</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">Presets</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {overlapPresets.map((preset) => (
                  <Chip
                    key={preset.name}
                    label={preset.name}
                    size="small"
                    onClick={() => updateConfig({
                      innerOverlap: preset.innerOverlap,
                      outerOverlap: preset.outerOverlap,
                    })}
                    variant={
                      config.innerOverlap === preset.innerOverlap &&
                      config.outerOverlap === preset.outerOverlap
                        ? 'filled'
                        : 'outlined'
                    }
                  />
                ))}
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography gutterBottom>Inner Overlap: {config.innerOverlap}%</Typography>
            <Slider
              value={config.innerOverlap}
              onChange={(_, v) => updateConfig({ innerOverlap: v as number })}
              min={0}
              max={100}
              step={1}
              size="small"
            />
            <Typography gutterBottom>Outer Overlap: {config.outerOverlap}%</Typography>
            <Slider
              value={config.outerOverlap}
              onChange={(_, v) => updateConfig({ outerOverlap: v as number })}
              min={0}
              max={100}
              step={1}
              size="small"
            />
          </AccordionDetails>
        </Accordion>

        {/* Ratios */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold">Size Ratios</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">Presets</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {ratioPresets.map((preset) => (
                  <Chip
                    key={preset.name}
                    label={preset.name}
                    size="small"
                    onClick={() => updateConfig({ scaleFactors: preset.scaleFactors })}
                    variant={
                      JSON.stringify(config.scaleFactors) === JSON.stringify(preset.scaleFactors)
                        ? 'filled'
                        : 'outlined'
                    }
                  />
                ))}
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Current: {config.scaleFactors.join(' : ')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Features */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold">Features</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Switch
                  checked={config.showBaseCircle}
                  onChange={(e) => updateConfig({ showBaseCircle: e.target.checked })}
                />
              }
              label="Show Base Circle"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={config.showWaves}
                  onChange={(e) => updateConfig({ showWaves: e.target.checked })}
                />
              }
              label="Show Sound Waves"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={config.showCenterHole}
                  onChange={(e) => updateConfig({ showCenterHole: e.target.checked })}
                />
              }
              label="Show Center Hole"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={config.showConnectorLines}
                  onChange={(e) => updateConfig({ showConnectorLines: e.target.checked })}
                />
              }
              label="Show Connector Lines"
            />
          </AccordionDetails>
        </Accordion>

        {/* Waves Settings */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold">Wave Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>Wave Count: {config.waveCount}</Typography>
            <Slider
              value={config.waveCount}
              onChange={(_, v) => updateConfig({ waveCount: v as number })}
              min={1}
              max={8}
              step={1}
              size="small"
            />
            <Typography gutterBottom>Wave Offset: {config.waveOffset.toFixed(2)}</Typography>
            <Slider
              value={config.waveOffset}
              onChange={(_, v) => updateConfig({ waveOffset: v as number })}
              min={0}
              max={50}
              step={1}
              size="small"
            />
            <Typography gutterBottom>Wave Spacing: {config.waveSpacing.toFixed(2)}</Typography>
            <Slider
              value={config.waveSpacing}
              onChange={(_, v) => updateConfig({ waveSpacing: v as number })}
              min={5}
              max={30}
              step={1}
              size="small"
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

LogoConfigurator.displayName = 'LogoConfigurator';

export default LogoConfigurator;
