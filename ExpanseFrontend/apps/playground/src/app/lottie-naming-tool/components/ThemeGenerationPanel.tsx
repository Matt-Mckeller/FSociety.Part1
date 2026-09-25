"use client"

/**
 * Theme Generation Panel Component
 *
 * Provides UI for generating AI-powered color themes for Lottie animations.
 * Uses the theme generation service to create TypeScript theme files.
 */

import { useState, useCallback } from "react"
import {
  Box,
  Typography,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Alert,
  LinearProgress,
  Chip,
  Paper,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import {
  Palette as PaletteIcon,
  ExpandMore,
  AutoAwesome,
  Code,
} from "@mui/icons-material"
import type {
  ExpanseLottie,
  ExpanseLottieMetadata,
} from "expanse.dynamicAssets"
import {
  generateThemes,
  generateAllThemeFiles,
  generateConsolidatedThemesFile,
  generateComponentFileContent,
  generateRegistryEntrySnippet,
  generateAnimationThemesFileContent,
  getAnimationThemesFilename,
  COLOR_PALETTES,
  BASE_COLORS,
  type ThemeGenerationProgress,
  type ThemeGenerationResult,
  type ColorPalette,
} from "../services/theme"

interface ThemeGenerationPanelProps {
  /** Animation name */
  animationName?: string
  /** ExpanseLottie schema */
  schema?: ExpanseLottie
  /** Original Lottie JSON */
  lottieJson?: any
  /** Callback when themes are generated */
  onThemesGenerated?: (result: ThemeGenerationResult) => void
  /** Whether parent is exporting */
  isExporting?: boolean
  /** Source info for filesystem export */
  lottieSource?: {
    type: "uploaded" | "existing"
    directoryPath?: string
  }
}

export default function ThemeGenerationPanel({
  animationName,
  schema,
  lottieJson,
  onThemesGenerated,
  isExporting,
  lottieSource,
}: ThemeGenerationPanelProps) {
  // State
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState<ThemeGenerationProgress | null>(null)
  const [result, setResult] = useState<ThemeGenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [variant, setVariant] = useState("default")
  const [selectedColors, setSelectedColors] = useState<Set<string>>(
    new Set(BASE_COLORS),
  )
  const [generateComponent, setGenerateComponent] = useState(true)
  const [allowCreativeColors, setAllowCreativeColors] = useState(true)
  const [registrySnippet, setRegistrySnippet] = useState<string | null>(null)
  const [themesFileContent, setThemesFileContent] = useState<string | null>(
    null,
  )

  // Can we generate?
  const canGenerate =
    !!animationName && !!schema && !!lottieJson && !isGenerating

  // Toggle color selection
  const toggleColor = useCallback((color: string) => {
    setSelectedColors((prev) => {
      const next = new Set(prev)
      if (next.has(color)) {
        next.delete(color)
      } else {
        next.add(color)
      }
      return next
    })
  }, [])

  // Handle generate
  const handleGenerate = useCallback(async () => {
    if (!animationName || !schema || !lottieJson) return

    setIsGenerating(true)
    setError(null)
    setResult(null)
    setRegistrySnippet(null)

    try {
      // Get selected palettes
      const palettes = COLOR_PALETTES.filter((p) =>
        selectedColors.has(p.baseColor),
      )

      if (palettes.length === 0) {
        throw new Error("Please select at least one color palette")
      }

      // Generate themes
      const genResult = await generateThemes({
        animationName,
        schema,
        lottieJson,
        palettes,
        variant,
        allowCreativeColors,
        onProgress: setProgress,
      })

      setResult(genResult)

      // Generate registry snippet (legacy - for manual registration)
      const themeIds = genResult.themes.map((t) => t.palette.id)
      const snippet = generateRegistryEntrySnippet(animationName, [variant], {
        [variant]: themeIds,
      })
      setRegistrySnippet(snippet)

      // Generate .themes.ts file content (for auto-registration)
      const themesContent = generateAnimationThemesFileContent(
        animationName,
        [variant],
        { [variant]: themeIds },
      )
      setThemesFileContent(themesContent)

      // Callback
      onThemesGenerated?.(genResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate themes")
    } finally {
      setIsGenerating(false)
    }
  }, [
    animationName,
    schema,
    lottieJson,
    selectedColors,
    variant,
    allowCreativeColors,
    onThemesGenerated,
  ])

  // Handle export to filesystem
  const handleExport = useCallback(async () => {
    if (!result || !lottieSource?.directoryPath || !animationName) return

    try {
      const files: Array<{
        filename: string
        content: string
        subdirectory?: string
      }> = []

      // Add consolidated themes file with all theme color configs
      const consolidatedThemesContent = generateConsolidatedThemesFile(
        animationName,
        result,
      )
      files.push({
        filename: `${animationName}.theme-configs.ts`,
        content: consolidatedThemesContent,
        subdirectory: "",
      })

      // Add component file if requested
      if (generateComponent) {
        files.push({
          filename: `${animationName}.tsx`,
          content: generateComponentFileContent(animationName),
          subdirectory: "",
        })
      }

      // Add auto-registration file for theming/animations/
      // This registers the animation with lottieThemeRegistry
      if (themesFileContent) {
        files.push({
          filename: getAnimationThemesFilename(animationName),
          content: themesFileContent,
          // Export to theming/animations/ directory for auto-registration
          subdirectory: "../../theming/animations",
        })
      }

      // Export via API
      const response = await fetch("/api/lotties/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          directoryPath: lottieSource.directoryPath,
          files: files.map((f) => ({
            filename: f.filename,
            content: f.content,
            subdirectory: f.subdirectory || undefined,
          })),
        }),
      })

      const apiResult = await response.json()
      if (!apiResult.success) {
        throw new Error(apiResult.error)
      }

      // Show success
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export files")
    }
  }, [
    result,
    lottieSource,
    generateComponent,
    animationName,
    themesFileContent,
  ])

  // Handle download as consolidated themes file
  const handleDownload = useCallback(async () => {
    if (!result || !animationName) return

    try {
      // Generate consolidated themes file
      const themesContent = generateConsolidatedThemesFile(
        animationName,
        result,
      )

      // Download as single consolidated file
      const blob = new Blob([themesContent], { type: "text/typescript" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${animationName}.theme-configs.ts`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download files")
    }
  }, [result, animationName])

  // Calculate progress percentage
  const progressPercent = progress
    ? (progress.currentThemeIndex / progress.totalThemes) * 100
    : 0

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <AutoAwesome color="primary" />
        AI Theme Generation
      </Typography>

      {!canGenerate && !result && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Complete element naming first to enable theme generation
        </Alert>
      )}

      {canGenerate && !result && (
        <>
          {/* Color Selection */}
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Select Color Palettes
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
          >
            {BASE_COLORS.map((color) => (
              <Chip
                key={color}
                label={color.charAt(0).toUpperCase() + color.slice(1)}
                onClick={() => toggleColor(color)}
                color={selectedColors.has(color) ? "primary" : "default"}
                variant={selectedColors.has(color) ? "filled" : "outlined"}
                sx={{
                  textTransform: "capitalize",
                  borderColor: getColorValue(color),
                  ...(selectedColors.has(color) && {
                    bgcolor: getColorValue(color),
                  }),
                }}
              />
            ))}
          </Stack>

          {/* Variant Name */}
          <TextField
            label="Theme Variant"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            helperText="e.g., default, minimal, vibrant"
          />

          {/* Generate Component Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={generateComponent}
                onChange={(e) => setGenerateComponent(e.target.checked)}
              />
            }
            label={
              <Box>
                <Typography variant="body2">
                  Generate React Component
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Creates {animationName}.tsx using createLottieComponent
                  factory
                </Typography>
              </Box>
            }
            sx={{ mb: 2 }}
          />

          {/* Allow Creative Colors Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={allowCreativeColors}
                onChange={(e) => setAllowCreativeColors(e.target.checked)}
              />
            }
            label={
              <Box>
                <Typography variant="body2">
                  Allow Creative Color Freedom
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Let AI venture outside palettes for better visual results
                </Typography>
              </Box>
            }
            sx={{ mb: 2 }}
          />

          {/* Info */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Will generate {selectedColors.size * 2} theme files (
              {selectedColors.size} colors × 2 modes)
            </Typography>
          </Alert>

          {/* Generate Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={<PaletteIcon />}
            onClick={handleGenerate}
            disabled={!canGenerate || selectedColors.size === 0}
          >
            Generate Themes with AI
          </Button>
        </>
      )}

      {/* Progress */}
      {isGenerating && progress && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {progress.message}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            {progress.currentThemeIndex} / {progress.totalThemes} themes
          </Typography>
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Results */}
      {result && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Generated {result.themes.length} theme files!
          </Alert>

          {/* Generated Files Preview */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>
                Generated Files (
                {result.themes.length + (generateComponent ? 1 : 0)})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                {result.themes.map((theme) => (
                  <Chip
                    key={theme.themeId}
                    label={`themes/${variant}/${theme.palette.id}.ts`}
                    size="small"
                    icon={<PaletteIcon />}
                  />
                ))}
                {generateComponent && (
                  <Chip
                    label={`${animationName}.tsx`}
                    size="small"
                    icon={<Code />}
                    color="secondary"
                  />
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* .themes.ts File for Auto-Registration */}
          {themesFileContent && animationName && (
            <Accordion defaultExpanded sx={{ mt: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>
                  Auto-Registration File (
                  {getAnimationThemesFilename(animationName)})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Alert severity="info" sx={{ mb: 1 }}>
                  This file will be exported to theming/animations/ for
                  auto-registration
                </Alert>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: "grey.900",
                    overflow: "auto",
                    maxHeight: 250,
                  }}
                >
                  <Typography
                    component="pre"
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      color: "grey.300",
                      m: 0,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {themesFileContent}
                  </Typography>
                </Paper>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Registry Snippet (Legacy) */}
          {registrySnippet && (
            <Accordion sx={{ mt: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>
                  Legacy: Registry Entry (manual registration)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: "grey.900",
                    overflow: "auto",
                    maxHeight: 200,
                  }}
                >
                  <Typography
                    component="pre"
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      color: "grey.300",
                      m: 0,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {registrySnippet}
                  </Typography>
                </Paper>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Export Button (if filesystem export available) */}
          {lottieSource?.type === "existing" && lottieSource.directoryPath && (
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              onClick={handleExport}
              disabled={isExporting}
            >
              Export to {lottieSource.directoryPath.split("/").pop()}
            </Button>
          )}

          {/* Download Button (for uploaded files or as alternative) */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            onClick={handleDownload}
          >
            Export Themes
          </Button>

          {/* Regenerate Button */}
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => {
              setResult(null)
              setRegistrySnippet(null)
              setThemesFileContent(null)
            }}
          >
            Generate Different Themes
          </Button>
        </Box>
      )}
    </Box>
  )
}

/**
 * Get a representative color value for a base color
 */
function getColorValue(baseColor: string): string {
  const colorMap: Record<string, string> = {
    purple: "#a15bca",
    blue: "#2196F3",
    green: "#4CAF50",
    orange: "#FF9800",
    red: "#E53935",
  }
  return colorMap[baseColor] || "#666"
}
