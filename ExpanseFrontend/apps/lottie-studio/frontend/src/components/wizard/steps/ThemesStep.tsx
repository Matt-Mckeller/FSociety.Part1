/**
 * Themes Step Component
 *
 * Allows users to select color palettes and generate themes.
 */

'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Checkbox,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Divider,
} from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PaletteIcon from '@mui/icons-material/Palette'
import { useMutation, gql } from '@apollo/client'

import { useLottieStudioStore } from '@/store/useLottieStudioStore'
import { ColorPalette } from '@shared/types'

// Predefined color palettes
const AVAILABLE_PALETTES: ColorPalette[] = [
  {
    id: 'purple-light',
    baseColor: 'purple',
    mode: 'light',
    name: 'Purple Light',
    colors: {
      primaryMain: '#a15bca',
      primaryDark: '#3c1a51',
      primaryLight: '#e1c2f5',
      primaryHighSat: '#9a1de7',
      primaryExtra1: '#D09FEF',
      primaryExtra2: '#A059C9',
      secondaryMain: '#e0c9ee',
      secondaryLight: '#D90479',
      secondaryDark: '#8C0343',
      backgroundDefault: '#FFFFFF',
      backgroundPaper: '#FFFFFF',
      textPrimary: '#010203',
      textSecondary: '#707171',
      black: '#010203',
      white: '#FFFFFF',
      gray: '#343434',
      gradientStart: '#3c1a51',
      gradientEnd: '#FFFFFF',
    },
  },
  {
    id: 'purple-dark',
    baseColor: 'purple',
    mode: 'dark',
    name: 'Purple Dark',
    colors: {
      primaryMain: '#a15bca',
      primaryDark: '#3c1a51',
      primaryLight: '#e1c2f5',
      primaryHighSat: '#9a1de7',
      primaryExtra1: '#D09FEF',
      primaryExtra2: '#A059C9',
      secondaryMain: '#e0c9ee',
      secondaryLight: '#D90479',
      secondaryDark: '#8C0343',
      backgroundDefault: '#263237',
      backgroundPaper: '#FFFFFF',
      textPrimary: '#F9F5FF',
      textSecondary: '#A9A7AD',
      black: '#010203',
      white: '#FFFFFF',
      gray: '#343434',
      gradientStart: '#14091b',
      gradientEnd: '#FFFFFF',
    },
  },
  {
    id: 'blue-light',
    baseColor: 'blue',
    mode: 'light',
    name: 'Blue Light',
    colors: {
      primaryMain: '#4285f4',
      primaryDark: '#1976D2',
      primaryLight: '#90CAF9',
      primaryHighSat: '#1E88E5',
      secondaryMain: '#03A9F4',
      secondaryLight: '#29B6F6',
      secondaryDark: '#0288D1',
      backgroundDefault: '#FFFFFF',
      backgroundPaper: '#FFFFFF',
      textPrimary: '#010203',
      textSecondary: '#707171',
      black: '#010203',
      white: '#FFFFFF',
      gray: '#343434',
      gradientStart: '#1A3C66',
      gradientEnd: '#FFFFFF',
    },
  },
  {
    id: 'blue-dark',
    baseColor: 'blue',
    mode: 'dark',
    name: 'Blue Dark',
    colors: {
      primaryMain: '#2196F3',
      primaryDark: '#1565C0',
      primaryLight: '#BBDEFB',
      primaryHighSat: '#1976D2',
      primaryExtra1: '#90CAF9',
      primaryExtra2: '#64B5F6',
      secondaryMain: '#03A9F4',
      secondaryLight: '#29B6F6',
      secondaryDark: '#0288D1',
      backgroundDefault: '#263237',
      backgroundPaper: '#FFFFFF',
      textPrimary: '#E8F5FE',
      textSecondary: '#A9A7AD',
      black: '#010203',
      white: '#FFFFFF',
      gray: '#343434',
      gradientStart: '#0D47A1',
      gradientEnd: '#1E88E5',
    },
  },
  {
    id: 'green-light',
    baseColor: 'green',
    mode: 'light',
    name: 'Green Light',
    colors: {
      primaryMain: '#4CAF50',
      primaryDark: '#388E3C',
      primaryLight: '#A5D6A7',
      primaryHighSat: '#2E7D32',
      primaryExtra1: '#81C784',
      primaryExtra2: '#66BB6A',
      secondaryMain: '#26A69A',
      secondaryLight: '#4DB6AC',
      secondaryDark: '#00695C',
      backgroundDefault: '#FFFFFF',
      backgroundPaper: '#FFFFFF',
      textPrimary: '#010203',
      textSecondary: '#707171',
      black: '#010203',
      white: '#FFFFFF',
      gray: '#343434',
      gradientStart: '#1B5E20',
      gradientEnd: '#FFFFFF',
    },
  },
  {
    id: 'green-dark',
    baseColor: 'green',
    mode: 'dark',
    name: 'Green Dark',
    colors: {
      primaryMain: '#66BB6A',
      primaryDark: '#388E3C',
      primaryLight: '#A5D6A7',
      primaryHighSat: '#2E7D32',
      primaryExtra1: '#81C784',
      primaryExtra2: '#66BB6A',
      secondaryMain: '#26A69A',
      secondaryLight: '#4DB6AC',
      secondaryDark: '#00695C',
      backgroundDefault: '#263237',
      backgroundPaper: '#FFFFFF',
      textPrimary: '#E8F5E9',
      textSecondary: '#A9A7AD',
      black: '#010203',
      white: '#FFFFFF',
      gray: '#343434',
      gradientStart: '#1B5E20',
      gradientEnd: '#43A047',
    },
  },
]

const GENERATE_THEMES = gql`
  mutation GenerateThemes($animationId: ID!, $input: GenerateThemesInput!) {
    generateThemes(animationId: $animationId, input: $input) {
      id
      status
      themes {
        themeId
        name
        description
        baseColor
        mode
        colorsJson
        skippedElements
        reasoning
      }
    }
  }
`

export function ThemesStep() {
  const {
    currentAnimation,
    selectedPalettes,
    setSelectedPalettes,
    updateAnimationThemes,
    goToNextStep,
    goToPreviousStep,
    markStepComplete,
    setIsProcessing,
    processingState,
    isProcessing,
    generatedThemes,
  } = useLottieStudioStore()

  const [error, setError] = useState<string | null>(null)

  const [generateThemes, { loading }] = useMutation(GENERATE_THEMES)

  const togglePalette = (palette: ColorPalette) => {
    if (selectedPalettes.some((p) => p.id === palette.id)) {
      setSelectedPalettes(selectedPalettes.filter((p) => p.id !== palette.id))
    } else {
      setSelectedPalettes([...selectedPalettes, palette])
    }
  }

  const handleGenerate = async () => {
    if (!currentAnimation?.id || selectedPalettes.length === 0) return

    setError(null)
    setIsProcessing(true)

    try {
      const { data } = await generateThemes({
        variables: {
          animationId: currentAnimation.id,
          input: {
            palettes: selectedPalettes.map((p) => ({
              id: p.id,
              baseColor: p.baseColor,
              mode: p.mode,
              name: p.name,
              colors: p.colors,
            })),
            allowCreativeColors: true,
          },
        },
      })

      if (data?.generateThemes?.themes) {
        updateAnimationThemes(data.generateThemes.themes)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate themes')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleContinue = () => {
    markStepComplete('themes')
    goToNextStep()
  }

  const isPaletteSelected = (palette: ColorPalette) =>
    selectedPalettes.some((p) => p.id === palette.id)

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Theme Generation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select color palettes to generate themed versions of your animation.
        Each palette will create a unique theme with AI-optimized color mappings.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Palette Selection */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Select Palettes ({selectedPalettes.length} selected)
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {AVAILABLE_PALETTES.map((palette) => (
          <Grid item xs={12} sm={6} md={4} key={palette.id}>
            <Card
              sx={{
                border: isPaletteSelected(palette)
                  ? '2px solid'
                  : '2px solid transparent',
                borderColor: isPaletteSelected(palette)
                  ? 'primary.main'
                  : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              <CardActionArea onClick={() => togglePalette(palette)}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Checkbox
                      checked={isPaletteSelected(palette)}
                      sx={{ p: 0, mr: 1 }}
                    />
                    <Typography variant="subtitle1" fontWeight={500}>
                      {palette.name}
                    </Typography>
                    <Chip
                      label={palette.mode}
                      size="small"
                      sx={{ ml: 'auto' }}
                      color={palette.mode === 'dark' ? 'default' : 'primary'}
                      variant="outlined"
                    />
                  </Box>

                  {/* Color preview */}
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: palette.colors.primaryMain,
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: palette.colors.primaryDark,
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: palette.colors.primaryLight,
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: palette.colors.secondaryMain,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Generate Button */}
      {!isProcessing && generatedThemes.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerate}
            disabled={selectedPalettes.length === 0 || loading}
            startIcon={<AutoFixHighIcon />}
          >
            Generate {selectedPalettes.length} Theme{selectedPalettes.length !== 1 ? 's' : ''}
          </Button>
          {selectedPalettes.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Select at least one palette to continue
            </Typography>
          )}
        </Box>
      )}

      {/* Processing State */}
      {isProcessing && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress size={64} sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            {processingState?.message || 'Generating themes...'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Generating 1 theme at a time for maximum quality
          </Typography>
        </Box>
      )}

      {/* Generated Themes Display */}
      {generatedThemes.length > 0 && !isProcessing && (
        <Box sx={{ mb: 4 }}>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              <CheckCircleIcon sx={{ color: 'success.main', mr: 1, verticalAlign: 'middle' }} />
              Generated {generatedThemes.length} Themes
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleGenerate}
              disabled={selectedPalettes.length === 0}
              startIcon={<AutoFixHighIcon />}
            >
              Regenerate
            </Button>
          </Box>

          <Grid container spacing={2}>
            {generatedThemes.map((theme) => (
              <Grid item xs={12} sm={6} key={theme.themeId}>
                <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PaletteIcon sx={{ mr: 1, color: theme.baseColor }} />
                      <Typography variant="subtitle1" fontWeight={500}>
                        {theme.name}
                      </Typography>
                      <Chip
                        label={theme.mode}
                        size="small"
                        sx={{ ml: 'auto' }}
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {theme.description}
                    </Typography>
                    {theme.reasoning && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic' }}>
                        {theme.reasoning}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={goToPreviousStep}>Back</Button>
        <Button
          variant="contained"
          onClick={handleContinue}
          disabled={generatedThemes.length === 0}
        >
          Continue to Export
        </Button>
      </Box>
    </Box>
  )
}

export default ThemesStep
