'use client'

import { Box, Slider, Switch, FormControlLabel, Typography, ToggleButton, ToggleButtonGroup, Checkbox, Paper, Divider } from '@mui/material'
import type { LayoutControlsProps, DiamondLayoutMode, DiamondCornerPosition, SpacingConfig } from './types'

interface LayoutControlsPanelProps extends LayoutControlsProps {
  position?: 'left' | 'right' | 'floating'
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

/**
 * LayoutControls - Interactive control panel for DiamondLayout
 * 
 * Provides sliders and toggles for:
 * - Mode (full / diamonds-only)
 * - Spacing (barGap, contentPadding, diamondInset)
 * - Visibility per bar
 * - Corner toggles
 */
export function LayoutControls({
  mode,
  onModeChange,
  spacing,
  onSpacingChange,
  corners,
  onCornersChange,
  visibility,
  onVisibilityChange,
  position = 'right',
  collapsed = false,
}: LayoutControlsPanelProps) {
  const handleSpacingChange = (key: keyof SpacingConfig) => (_: Event, value: number | number[]) => {
    onSpacingChange?.({
      ...spacing,
      [key]: value as number,
    })
  }

  const handleCornerToggle = (corner: DiamondCornerPosition) => () => {
    const currentCorners = corners ?? ['top-left', 'top-right', 'bottom-left']
    const newCorners = currentCorners.includes(corner)
      ? currentCorners.filter(c => c !== corner)
      : [...currentCorners, corner]
    onCornersChange?.(newCorners)
  }

  const handleVisibilityChange = (key: keyof typeof visibility) => () => {
    onVisibilityChange?.({
      ...visibility,
      [key]: !visibility?.[key],
    })
  }

  if (collapsed) {
    return null
  }

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
        width: 280,
        maxHeight: '80vh',
        overflow: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 2,
        zIndex: 1000,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Layout Controls
        </Typography>

        {/* Mode Toggle */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Display Mode
          </Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, newMode) => newMode && onModeChange?.(newMode as DiamondLayoutMode)}
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
              max={20}
              step={1}
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
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibility?.topBar1 ?? true}
                    onChange={handleVisibilityChange('topBar1')}
                    size="small"
                  />
                }
                label="Top Bar 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibility?.topBar2 ?? true}
                    onChange={handleVisibilityChange('topBar2')}
                    size="small"
                  />
                }
                label="Top Bar 2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibility?.bottomBar1 ?? true}
                    onChange={handleVisibilityChange('bottomBar1')}
                    size="small"
                  />
                }
                label="Bottom Bar 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibility?.bottomBar2 ?? true}
                    onChange={handleVisibilityChange('bottomBar2')}
                    size="small"
                  />
                }
                label="Bottom Bar 2"
              />
            </Box>
          </>
        )}

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
              width: 120,
              height: 100,
              mx: 'auto',
              my: 2,
            }}
          >
            {/* Top-left */}
            <Box
              onClick={handleCornerToggle('top-left')}
              sx={{
                width: 32,
                height: 32,
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
            
            {/* Top spacer */}
            <Box />
            
            {/* Top-right */}
            <Box
              onClick={handleCornerToggle('top-right')}
              sx={{
                width: 32,
                height: 32,
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
                width: 32,
                height: 32,
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
            
            {/* Bottom spacer */}
            <Box />
            
            {/* Bottom-right */}
            <Box
              onClick={handleCornerToggle('bottom-right')}
              sx={{
                width: 32,
                height: 32,
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

export default LayoutControls
