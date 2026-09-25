'use client'

import { Box, Slider, Switch, FormControlLabel, Typography, ToggleButton, ToggleButtonGroup, Checkbox, Paper, Divider, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import type { 
  CinemaControlsProps, 
  CinemaLayoutMode, 
  CinemaCornerPosition, 
  CinemaSpacingConfig,
  CinemaVisibilityConfig,
  ShadowConfig,
  ShadowDirection,
  BarColorPresetName,
} from './types'

interface CinemaControlsPanelProps extends CinemaControlsProps {
  position?: 'left' | 'right' | 'floating'
  collapsed?: boolean
}

/**
 * CinemaControls - Interactive control panel for CinemaLayout
 * 
 * Provides controls for:
 * - Mode (full / diamonds-only)
 * - Diamond aspect ratio and color toggle
 * - Bar visibility and height ratio
 * - Shadows (toggle + direction)
 * - FAB toggle
 * - Corner toggles
 */
export function CinemaControls({
  mode,
  onModeChange,
  diamond,
  onDiamondChange,
  diamondColors,
  onDiamondColorsChange,
  shadows,
  onShadowsChange,
  barColors,
  onBarColorsChange,
  spacing,
  onSpacingChange,
  corners,
  onCornersChange,
  visibility,
  onVisibilityChange,
  position = 'right',
  collapsed = false,
}: CinemaControlsPanelProps) {
  const handleSpacingChange = (key: keyof CinemaSpacingConfig) => (_: Event, value: number | number[]) => {
    onSpacingChange?.({
      ...spacing,
      [key]: value as number,
    })
  }

  const handleDiamondAspectRatio = (_: Event, value: number | number[]) => {
    const ratio = value as number
    const baseHeight = 60
    onDiamondChange?.({
      width: baseHeight * ratio,
      height: baseHeight,
    })
  }

  const handleDiamondColorToggle = () => {
    onDiamondColorsChange?.({
      ...diamondColors,
      enabled: !diamondColors.enabled,
    })
  }

  const handleCornerToggle = (corner: CinemaCornerPosition) => () => {
    const currentCorners = corners ?? ['top-left', 'top-right', 'bottom-left']
    const newCorners = currentCorners.includes(corner)
      ? currentCorners.filter(c => c !== corner)
      : [...currentCorners, corner]
    onCornersChange?.(newCorners)
  }

  const handleVisibilityChange = (key: keyof CinemaVisibilityConfig) => () => {
    onVisibilityChange?.({
      ...visibility,
      [key]: !visibility?.[key],
    })
  }

  const handleShadowToggle = () => {
    onShadowsChange?.({
      ...shadows,
      enabled: !shadows.enabled,
    })
  }

  const handleShadowDirection = (_: React.MouseEvent, newDirection: ShadowDirection | null) => {
    if (newDirection) {
      onShadowsChange?.({
        ...shadows,
        direction: newDirection,
      })
    }
  }

  const handleShadowSizing = (key: 'blur' | 'spread' | 'offset') => (_: Event, value: number | number[]) => {
    onShadowsChange?.({
      ...shadows,
      [key]: value as number,
    })
  }

  const handleShadowIntensity = (_: React.MouseEvent, intensity: 'subtle' | 'medium' | 'strong' | null) => {
    if (intensity) {
      onShadowsChange?.({
        ...shadows,
        intensity,
      })
    }
  }

  const handleBarColorMode = (_: React.MouseEvent, mode: 'theme' | 'preset' | null) => {
    if (mode) {
      onBarColorsChange?.({
        ...barColors,
        mode,
        preset: mode === 'preset' ? (barColors.preset ?? 'primary') : barColors.preset,
      })
    }
  }

  const handleBarColorPreset = (event: { target: { value: string } }) => {
    onBarColorsChange?.({
      ...barColors,
      mode: 'preset',
      preset: event.target.value as BarColorPresetName,
    })
  }

  if (collapsed) {
    return null
  }

  const aspectRatio = diamond.width / diamond.height

  const panelStyles = {
    left: { left: 16, top: '50%', transform: 'translateY(-50%)' },
    right: { right: 16, top: '50%', transform: 'translateY(-50%)' },
    floating: { right: 16, bottom: 16 },
  }

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        ...panelStyles[position],
        width: 300,
        maxHeight: '85vh',
        overflow: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 2,
        zIndex: 1000,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Cinema Layout Controls
        </Typography>

        {/* Mode Toggle */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Display Mode
          </Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, newMode) => newMode && onModeChange?.(newMode as CinemaLayoutMode)}
            size="small"
            fullWidth
          >
            <ToggleButton value="full">
              Full Layout
            </ToggleButton>
            <ToggleButton value="diamonds-only">
              Diamonds Only
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Diamond Shape */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Diamond Shape
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" display="block">
              Aspect Ratio: {aspectRatio.toFixed(1)}:1
            </Typography>
            <Slider
              value={aspectRatio}
              onChange={handleDiamondAspectRatio}
              min={1}
              max={4}
              step={0.5}
              marks={[
                { value: 1, label: '1:1' },
                { value: 2, label: '2:1' },
                { value: 3, label: '3:1' },
                { value: 4, label: '4:1' },
              ]}
              size="small"
            />
          </Box>
          
          {/* Preview shape */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              my: 2,
            }}
          >
            <Box
              component="svg"
              viewBox={`0 0 ${diamond.width} ${diamond.height}`}
              sx={{
                width: Math.min(diamond.width, 100),
                height: Math.min(diamond.height, 50),
                opacity: 0.8,
                transform: 'rotate(45deg)',
              }}
            >
              <polygon
                points={`${diamond.width / 2},2 ${diamond.width - 2},${diamond.height / 2} ${diamond.width / 2},${diamond.height - 2} 2,${diamond.height / 2}`}
                fill={diamondColors.enabled ? 'currentColor' : 'transparent'}
                opacity={0.3}
                stroke="currentColor"
                strokeWidth={2}
              />
            </Box>
          </Box>

          {/* Diamond Color Toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={diamondColors.enabled}
                onChange={handleDiamondColorToggle}
                size="small"
              />
            }
            label="Enable diamond fill"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Bar Colors */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Bar Colors
          </Typography>
          
          <ToggleButtonGroup
            value={barColors.mode}
            exclusive
            onChange={handleBarColorMode}
            size="small"
            fullWidth
            sx={{ mb: 2 }}
          >
            <ToggleButton value="theme">Theme</ToggleButton>
            <ToggleButton value="preset">Preset</ToggleButton>
          </ToggleButtonGroup>
          
          {barColors.mode === 'preset' && (
            <FormControl fullWidth size="small">
              <InputLabel>Preset</InputLabel>
              <Select
                value={barColors.preset ?? 'primary'}
                onChange={handleBarColorPreset}
                label="Preset"
              >
                <MenuItem value="primary">Primary (Blue)</MenuItem>
                <MenuItem value="secondary">Secondary (Purple)</MenuItem>
                <MenuItem value="neutral">Neutral (Gray)</MenuItem>
                <MenuItem value="monochrome">Monochrome (B&W)</MenuItem>
                <MenuItem value="accent">Accent (Red)</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Shadow Controls */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Shadows
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={shadows.enabled}
                onChange={handleShadowToggle}
                size="small"
              />
            }
            label="Enable shadows"
          />
          
          {shadows.enabled && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                Shadow Direction
              </Typography>
              <ToggleButtonGroup
                value={shadows.direction}
                exclusive
                onChange={handleShadowDirection}
                size="small"
                fullWidth
              >
                <ToggleButton value="inward">
                  Inward
                </ToggleButton>
                <ToggleButton value="center">
                  Center
                </ToggleButton>
                <ToggleButton value="none">
                  None
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {shadows.direction === 'inward' 
                  ? 'Bars cast shadow toward content'
                  : shadows.direction === 'center'
                    ? 'All shadows point toward screen center'
                    : 'No bar shadows'}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                  Intensity
                </Typography>
                <ToggleButtonGroup
                  value={shadows.intensity ?? 'medium'}
                  exclusive
                  onChange={handleShadowIntensity}
                  size="small"
                  fullWidth
                >
                  <ToggleButton value="subtle">Subtle</ToggleButton>
                  <ToggleButton value="medium">Medium</ToggleButton>
                  <ToggleButton value="strong">Strong</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" display="block">
                  Blur: {shadows.blur ?? 12}px
                </Typography>
                <Slider
                  value={shadows.blur ?? 12}
                  onChange={handleShadowSizing('blur')}
                  min={0}
                  max={32}
                  step={2}
                  size="small"
                />
              </Box>
              
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" display="block">
                  Spread: {shadows.spread ?? 0}px
                </Typography>
                <Slider
                  value={shadows.spread ?? 0}
                  onChange={handleShadowSizing('spread')}
                  min={-8}
                  max={16}
                  step={2}
                  size="small"
                />
              </Box>
              
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" display="block">
                  Offset: {shadows.offset ?? 4}px
                </Typography>
                <Slider
                  value={shadows.offset ?? 4}
                  onChange={handleShadowSizing('offset')}
                  min={0}
                  max={16}
                  step={2}
                  size="small"
                />
              </Box>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Spacing Controls */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Spacing
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" display="block">
              Bar Gap: {spacing?.barGap ?? 0}px
            </Typography>
            <Slider
              value={spacing?.barGap ?? 0}
              onChange={handleSpacingChange('barGap')}
              min={0}
              max={16}
              step={2}
              disabled={mode === 'diamonds-only'}
              size="small"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" display="block">
              Content Padding: {spacing?.contentPadding ?? 0}px
            </Typography>
            <Slider
              value={spacing?.contentPadding ?? 0}
              onChange={handleSpacingChange('contentPadding')}
              min={0}
              max={48}
              step={4}
              size="small"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" display="block">
              Diamond Inset: {spacing?.diamondInset ?? 0}px
            </Typography>
            <Slider
              value={spacing?.diamondInset ?? 0}
              onChange={handleSpacingChange('diamondInset')}
              min={0}
              max={100}
              step={4}
              size="small"
            />
          </Box>
        </Box>

        {mode === 'full' && (
          <>
            <Divider sx={{ my: 2 }} />

            {/* Bar Visibility */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Bar Visibility
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visibility?.topPrimary ?? true}
                      onChange={handleVisibilityChange('topPrimary')}
                      size="small"
                    />
                  }
                  label="Top Primary"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visibility?.topSecondary ?? true}
                      onChange={handleVisibilityChange('topSecondary')}
                      size="small"
                    />
                  }
                  label="Top Secondary"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visibility?.bottomSecondary ?? true}
                      onChange={handleVisibilityChange('bottomSecondary')}
                      size="small"
                    />
                  }
                  label="Bottom Secondary"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visibility?.bottomPrimary ?? true}
                      onChange={handleVisibilityChange('bottomPrimary')}
                      size="small"
                    />
                  }
                  label="Bottom Primary"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
                />
              </Box>
            </Box>
          </>
        )}

        <Divider sx={{ my: 2 }} />

        {/* FAB Toggle */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={visibility?.fab ?? true}
                onChange={handleVisibilityChange('fab')}
                size="small"
              />
            }
            label="Show FAB"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Corner Toggles */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Corner Diamonds
          </Typography>
          
          {/* Visual corner picker */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gridTemplateRows: 'auto 1fr auto',
              gap: 1,
              width: 140,
              height: 100,
              mx: 'auto',
              my: 2,
            }}
          >
            {/* Top-left */}
            <Box
              onClick={handleCornerToggle('top-left')}
              sx={{
                width: 40,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                bgcolor: corners?.includes('top-left') ? 'primary.main' : 'grey.300',
                color: corners?.includes('top-left') ? 'white' : 'grey.600',
                borderRadius: 1,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: corners?.includes('top-left') ? 'primary.dark' : 'grey.400',
                },
              }}
            >
              ◇
            </Box>
            
            <Box />
            
            {/* Top-right */}
            <Box
              onClick={handleCornerToggle('top-right')}
              sx={{
                width: 40,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                bgcolor: corners?.includes('top-right') ? 'primary.main' : 'grey.300',
                color: corners?.includes('top-right') ? 'white' : 'grey.600',
                borderRadius: 1,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: corners?.includes('top-right') ? 'primary.dark' : 'grey.400',
                },
              }}
            >
              ◇
            </Box>
            
            {/* Middle spacers */}
            <Box />
            <Box 
              sx={{ 
                border: '2px dashed', 
                borderColor: 'grey.300', 
                borderRadius: 1,
              }} 
            />
            <Box />
            
            {/* Bottom-left */}
            <Box
              onClick={handleCornerToggle('bottom-left')}
              sx={{
                width: 40,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                bgcolor: corners?.includes('bottom-left') ? 'primary.main' : 'grey.300',
                color: corners?.includes('bottom-left') ? 'white' : 'grey.600',
                borderRadius: 1,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: corners?.includes('bottom-left') ? 'primary.dark' : 'grey.400',
                },
              }}
            >
              ◇
            </Box>
            
            <Box />
            
            {/* Bottom-right */}
            <Box
              onClick={handleCornerToggle('bottom-right')}
              sx={{
                width: 40,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                bgcolor: corners?.includes('bottom-right') ? 'primary.main' : 'grey.300',
                color: corners?.includes('bottom-right') ? 'white' : 'grey.600',
                borderRadius: 1,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: corners?.includes('bottom-right') ? 'primary.dark' : 'grey.400',
                },
              }}
            >
              ◇
            </Box>
          </Box>
          
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
            Click corners to toggle
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default CinemaControls
