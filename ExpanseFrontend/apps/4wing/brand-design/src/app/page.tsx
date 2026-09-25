'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Slider,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  Button,
  Chip,
  Stack,
  Divider,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Character, { CharacterConfig, defaultCharacterConfig } from '@/components/Character';
import Logo, { LogoConfig, defaultLogoConfig } from '@/components/Logo';
import DownloadIcon from '@mui/icons-material/Download';
import PaletteIcon from '@mui/icons-material/Palette';
import FaceIcon from '@mui/icons-material/Face';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Color presets
const colorPresets = [
  { name: 'Purple (Primary)', main: '#7C3AED', light: '#A78BFA', dark: '#5B21B6' },
  { name: 'Pink', main: '#EC4899', light: '#F472B6', dark: '#BE185D' },
  { name: 'Blue', main: '#3B82F6', light: '#60A5FA', dark: '#2563EB' },
  { name: 'Teal', main: '#14B8A6', light: '#5EEAD4', dark: '#0D9488' },
  { name: 'Green', main: '#10B981', light: '#34D399', dark: '#059669' },
  { name: 'Orange', main: '#F59E0B', light: '#FBBF24', dark: '#D97706' },
  { name: 'Indigo', main: '#6366F1', light: '#A5B4FC', dark: '#4338CA' },
  { name: 'Rose', main: '#F43F5E', light: '#FB7185', dark: '#BE123C' },
];

// Character variations
const characterVariations: { name: string; config: Partial<CharacterConfig> }[] = [
  { name: 'Default', config: {} },
  { name: 'Minimal', config: { showWings: false, showAntenna: false, showStatusLight: false } },
  { name: 'Compact', config: { bodyWidth: 160, bodyHeight: 180, showWings: false } },
  { name: 'Excited', config: { expression: 'excited', eyeSize: 40 } },
  { name: 'Calm', config: { expression: 'calm', showStatusLight: false } },
  { name: 'Curious', config: { expression: 'curious' } },
  { name: 'Big Eyes', config: { eyeSize: 45, pupilSize: 18 } },
  { name: 'Wide Body', config: { bodyWidth: 240, bodyRoundness: 60 } },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function BrandDesignPage() {
  const [tabValue, setTabValue] = useState(0);
  const [characterConfig, setCharacterConfig] = useState<CharacterConfig>(defaultCharacterConfig);
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(defaultLogoConfig);

  const updateCharacter = (updates: Partial<CharacterConfig>) => {
    setCharacterConfig(prev => ({ ...prev, ...updates }));
  };

  const updateLogo = (updates: Partial<LogoConfig>) => {
    setLogoConfig(prev => ({ ...prev, ...updates }));
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    updateCharacter({
      bodyColor: preset.main,
      bodyColorLight: preset.light,
      bodyColorDark: preset.dark,
      wingColor: preset.light,
      antennaColor: preset.light,
    });
  };

  const applyVariation = (variation: typeof characterVariations[0]) => {
    setCharacterConfig({ ...defaultCharacterConfig, ...variation.config });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ mb: 1, fontWeight: 800 }}>
          <Box component="span" sx={{ 
            background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            4wings
          </Box>
          {' '}Brand Design
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create and customize the logo and robot character for Counsellor Support
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} centered>
          <Tab icon={<FaceIcon />} label="Character Designer" />
          <Tab icon={<AutoAwesomeIcon />} label="Logo Designer" />
          <Tab icon={<PaletteIcon />} label="Variations Gallery" />
        </Tabs>
      </Box>

      {/* Character Designer Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          {/* Preview */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%', minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Character config={characterConfig} scale={1.2} />
                <Typography variant="caption" color="text.secondary">
                  {characterConfig.bodyWidth}×{characterConfig.bodyHeight}px • 
                  {characterConfig.showWings ? ' Wings' : ''} 
                  {characterConfig.showAntenna ? ' Ears' : ''}
                  {characterConfig.showStatusLight ? ' Status' : ''}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Controls */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                {/* Color Presets */}
                <Typography variant="h6" gutterBottom>Color Presets</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                  {colorPresets.map((preset) => (
                    <Chip
                      key={preset.name}
                      label={preset.name}
                      onClick={() => applyColorPreset(preset)}
                      sx={{
                        background: `linear-gradient(135deg, ${preset.light} 0%, ${preset.main} 100%)`,
                        color: '#fff',
                        fontWeight: 600,
                        '&:hover': { opacity: 0.9 },
                      }}
                    />
                  ))}
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Body Settings */}
                <Typography variant="h6" gutterBottom>Body</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption">Width: {characterConfig.bodyWidth}</Typography>
                    <Slider
                      value={characterConfig.bodyWidth}
                      min={120}
                      max={300}
                      onChange={(_, v) => updateCharacter({ bodyWidth: v as number })}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption">Height: {characterConfig.bodyHeight}</Typography>
                    <Slider
                      value={characterConfig.bodyHeight}
                      min={140}
                      max={350}
                      onChange={(_, v) => updateCharacter({ bodyHeight: v as number })}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption">Roundness: {characterConfig.bodyRoundness}</Typography>
                    <Slider
                      value={characterConfig.bodyRoundness}
                      min={20}
                      max={80}
                      onChange={(_, v) => updateCharacter({ bodyRoundness: v as number })}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Eyes Settings */}
                <Typography variant="h6" gutterBottom>Eyes & Expression</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption">Eye Size: {characterConfig.eyeSize}</Typography>
                    <Slider
                      value={characterConfig.eyeSize}
                      min={20}
                      max={60}
                      onChange={(_, v) => updateCharacter({ eyeSize: v as number })}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption">Eye Spacing: {characterConfig.eyeSpacing}</Typography>
                    <Slider
                      value={characterConfig.eyeSpacing}
                      min={30}
                      max={80}
                      onChange={(_, v) => updateCharacter({ eyeSpacing: v as number })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Expression</InputLabel>
                      <Select
                        value={characterConfig.expression}
                        label="Expression"
                        onChange={(e) => updateCharacter({ expression: e.target.value as CharacterConfig['expression'] })}
                      >
                        <MenuItem value="happy">Happy 😊</MenuItem>
                        <MenuItem value="calm">Calm 😌</MenuItem>
                        <MenuItem value="curious">Curious 🤔</MenuItem>
                        <MenuItem value="excited">Excited 😄</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Features */}
                <Typography variant="h6" gutterBottom>Features</Typography>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={characterConfig.showWings}
                          onChange={(e) => updateCharacter({ showWings: e.target.checked })}
                        />
                      }
                      label="Wings"
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={characterConfig.showAntenna}
                          onChange={(e) => updateCharacter({ showAntenna: e.target.checked })}
                        />
                      }
                      label="Ears"
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={characterConfig.showStatusLight}
                          onChange={(e) => updateCharacter({ showStatusLight: e.target.checked })}
                        />
                      }
                      label="Status Light"
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={characterConfig.eyeGlow}
                          onChange={(e) => updateCharacter({ eyeGlow: e.target.checked })}
                        />
                      }
                      label="Eye Glow"
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={characterConfig.animate}
                          onChange={(e) => updateCharacter({ animate: e.target.checked })}
                        />
                      }
                      label="Animate"
                    />
                  </Grid>
                </Grid>

                {characterConfig.showWings && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption">Wing Size: {characterConfig.wingSize}</Typography>
                    <Slider
                      value={characterConfig.wingSize}
                      min={30}
                      max={100}
                      onChange={(_, v) => updateCharacter({ wingSize: v as number })}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Logo Designer Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={4}>
          {/* Preview */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ minHeight: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
              <Logo config={logoConfig} />
              
              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Chip label={logoConfig.layout} variant="outlined" />
                <Chip label={logoConfig.showTagline ? 'With Tagline' : 'No Tagline'} variant="outlined" />
              </Box>
            </Card>
          </Grid>

          {/* Controls */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                {/* Layout */}
                <Typography variant="h6" gutterBottom>Layout</Typography>
                <ToggleButtonGroup
                  value={logoConfig.layout}
                  exclusive
                  onChange={(_, v) => v && updateLogo({ layout: v })}
                  sx={{ mb: 3 }}
                  fullWidth
                >
                  <ToggleButton value="horizontal">Horizontal</ToggleButton>
                  <ToggleButton value="vertical">Vertical</ToggleButton>
                  <ToggleButton value="icon-only">Icon Only</ToggleButton>
                </ToggleButtonGroup>

                <Divider sx={{ my: 3 }} />

                {/* Text Settings */}
                <Typography variant="h6" gutterBottom>Text</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={logoConfig.showText}
                          onChange={(e) => updateLogo({ showText: e.target.checked })}
                        />
                      }
                      label="Show Text"
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={logoConfig.showTagline}
                          onChange={(e) => updateLogo({ showTagline: e.target.checked })}
                        />
                      }
                      label="Show Tagline"
                    />
                  </Grid>
                </Grid>

                {logoConfig.showText && (
                  <>
                    <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                      Text Size: {logoConfig.textSize}px
                    </Typography>
                    <Slider
                      value={logoConfig.textSize}
                      min={24}
                      max={72}
                      onChange={(_, v) => updateLogo({ textSize: v as number })}
                    />
                  </>
                )}

                {logoConfig.showTagline && (
                  <TextField
                    fullWidth
                    size="small"
                    label="Tagline"
                    value={logoConfig.taglineText}
                    onChange={(e) => updateLogo({ taglineText: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                )}

                <Divider sx={{ my: 3 }} />

                {/* Character Scale */}
                <Typography variant="h6" gutterBottom>Character</Typography>
                <Typography variant="caption">Scale: {logoConfig.characterScale.toFixed(1)}x</Typography>
                <Slider
                  value={logoConfig.characterScale}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onChange={(_, v) => updateLogo({ characterScale: v as number })}
                />

                <Typography variant="caption">Gap: {logoConfig.gap}px</Typography>
                <Slider
                  value={logoConfig.gap}
                  min={0}
                  max={60}
                  onChange={(_, v) => updateLogo({ gap: v as number })}
                />

                <Divider sx={{ my: 3 }} />

                {/* Background */}
                <Typography variant="h6" gutterBottom>Background</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={logoConfig.showBackground}
                      onChange={(e) => updateLogo({ showBackground: e.target.checked })}
                    />
                  }
                  label="Show Background"
                />

                {logoConfig.showBackground && (
                  <>
                    <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                      Padding: {logoConfig.backgroundPadding}px
                    </Typography>
                    <Slider
                      value={logoConfig.backgroundPadding}
                      min={16}
                      max={64}
                      onChange={(_, v) => updateLogo({ backgroundPadding: v as number })}
                    />
                    <Typography variant="caption">Radius: {logoConfig.backgroundRadius}px</Typography>
                    <Slider
                      value={logoConfig.backgroundRadius}
                      min={0}
                      max={48}
                      onChange={(_, v) => updateLogo({ backgroundRadius: v as number })}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Variations Gallery Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" sx={{ mb: 3 }}>Character Variations</Typography>
        <Grid container spacing={3}>
          {characterVariations.map((variation) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={variation.name}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  border: '2px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 30px rgba(124, 58, 237, 0.15)',
                  },
                }}
                onClick={() => applyVariation(variation)}
              >
                <Character
                  config={{ ...defaultCharacterConfig, ...variation.config, animate: false }}
                  scale={0.5}
                />
                <Typography variant="subtitle2" fontWeight={600}>
                  {variation.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Typography variant="h5" sx={{ mb: 3 }}>Color Variations</Typography>
        <Grid container spacing={3}>
          {colorPresets.map((preset) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={preset.name}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  border: '2px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: preset.main,
                    boxShadow: `0 8px 30px ${preset.main}25`,
                  },
                }}
                onClick={() => {
                  applyColorPreset(preset);
                  setTabValue(0);
                }}
              >
                <Character
                  config={{
                    ...defaultCharacterConfig,
                    bodyColor: preset.main,
                    bodyColorLight: preset.light,
                    bodyColorDark: preset.dark,
                    wingColor: preset.light,
                    antennaColor: preset.light,
                    animate: false,
                  }}
                  scale={0.5}
                />
                <Typography variant="subtitle2" fontWeight={600}>
                  {preset.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Typography variant="h5" sx={{ mb: 3 }}>Logo Layouts</Typography>
        <Grid container spacing={4}>
          {(['horizontal', 'vertical', 'icon-only'] as const).map((layout) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={layout}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 250,
                  gap: 2,
                  border: '2px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 30px rgba(124, 58, 237, 0.15)',
                  },
                }}
                onClick={() => {
                  updateLogo({ layout });
                  setTabValue(1);
                }}
              >
                <Logo
                  config={{
                    ...defaultLogoConfig,
                    layout,
                    characterScale: layout === 'icon-only' ? 0.8 : 0.6,
                    characterConfig: {
                      ...defaultLogoConfig.characterConfig,
                      animate: false,
                    },
                  }}
                />
                <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 2, textTransform: 'capitalize' }}>
                  {layout.replace('-', ' ')}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Container>
  );
}
