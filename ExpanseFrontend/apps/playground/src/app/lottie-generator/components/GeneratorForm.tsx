"use client"

import { useState } from "react"
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Typography,
  Alert,
  LinearProgress,
  Grid,
  Stack,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material"
import {
  AutoAwesome,
  Download,
  Save,
  PlayArrow,
  Refresh,
} from "@mui/icons-material"
import {
  generateLottieAnimation,
  EXAMPLE_PROMPTS,
} from "../utils/claudeGenerator"
import { saveLottieToFile, downloadLottieAnimation } from "../utils/fileSystem"
import type { GenerationOptions, LottieAnimation } from "../types"

interface GeneratorFormProps {
  onGenerate?: (animation: LottieAnimation) => void
}

export default function GeneratorForm({ onGenerate }: GeneratorFormProps) {
  const [description, setDescription] = useState("")
  const [options, setOptions] = useState<GenerationOptions>({
    width: 512,
    height: 512,
    duration: 3,
    frameRate: 60,
    style: "illustrated",
    complexity: "medium",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [streamedLength, setStreamedLength] = useState(0)
  const [generatedAnimation, setGeneratedAnimation] =
    useState<LottieAnimation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError("Please enter a description")
      return
    }

    setIsGenerating(true)
    setError(null)
    setSuccess(null)
    setProgress(0)
    setStreamedLength(0)
    setGeneratedAnimation(null)

    // Log generation start
    console.group("🚀 Lottie Generation Started")
    console.log("Description:", description)
    console.log("Options:", options)
    console.log("Timestamp:", new Date().toISOString())
    console.groupEnd()

    try {
      const result = await generateLottieAnimation(
        description,
        options,
        (text) => {
          setStreamedLength(text.length)
          // Estimate progress based on expected JSON size
          const estimatedProgress = Math.min((text.length / 8000) * 100, 95)
          setProgress(estimatedProgress)
        },
      )

      setProgress(100)

      if (result.success && result.animation) {
        setGeneratedAnimation(result.animation)
        onGenerate?.(result.animation)

        const successMsg =
          `✓ Generated animation with ${result.metadata?.layerCount} layers, ` +
          `${result.metadata?.shapeCount} shapes (${(result.metadata?.fileSize || 0 / 1024).toFixed(1)}KB)`

        setSuccess(successMsg)

        // Log success
        console.group("✅ Lottie Generation Complete")
        console.log("Animation Name:", result.animation.nm || "Untitled")
        console.log("Metadata:", result.metadata)
        console.log("Success:", successMsg)
        console.groupEnd()
      } else {
        const errorMsg = result.error || "Failed to generate animation"
        setError(errorMsg)
        console.error("❌ Generation Failed:", errorMsg)
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Unknown error occurred"
      console.error("❌ Generation Error:", err)
      setError(errorMsg)
    } finally {
      setIsGenerating(false)
      setProgress(0)
    }
  }

  const handleSaveToFile = async () => {
    if (!generatedAnimation) return

    setError(null)
    setSuccess(null)

    const result = await saveLottieToFile(generatedAnimation)

    if (result.success) {
      setSuccess(`✓ Saved to: ${result.path}`)
    } else {
      setError(`Failed to save: ${result.error}`)
    }
  }

  const handleDownload = () => {
    if (!generatedAnimation) return
    downloadLottieAnimation(generatedAnimation)
    setSuccess("✓ Downloaded to your Downloads folder")
  }

  const loadExample = (key: keyof typeof EXAMPLE_PROMPTS) => {
    setDescription(EXAMPLE_PROMPTS[key])
    setError(null)
  }

  const resetForm = () => {
    setDescription("")
    setGeneratedAnimation(null)
    setError(null)
    setSuccess(null)
    setStreamedLength(0)
  }

  return (
    <Stack spacing={3}>
      {/* Description Input */}
      <TextField
        name="description"
        label="Animation Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the animation you want to generate..."
        disabled={isGenerating}
        fullWidth
        variant="outlined"
      />

      {/* Example Prompts */}
      <Box>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          Quick Examples:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.keys(EXAMPLE_PROMPTS).map((key) => (
            <Chip
              key={key}
              label={key}
              onClick={() => loadExample(key as keyof typeof EXAMPLE_PROMPTS)}
              disabled={isGenerating}
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Options Grid */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Generation Options
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Width (px)"
                type="number"
                value={options.width}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    width: parseInt(e.target.value) || 512,
                  })
                }
                disabled={isGenerating}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Height (px)"
                type="number"
                value={options.height}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    height: parseInt(e.target.value) || 512,
                  })
                }
                disabled={isGenerating}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Duration (s)"
                type="number"
                value={options.duration}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    duration: parseInt(e.target.value) || 3,
                  })
                }
                disabled={isGenerating}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Frame Rate"
                type="number"
                value={options.frameRate}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    frameRate: parseInt(e.target.value) || 60,
                  })
                }
                disabled={isGenerating}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Style</InputLabel>
                <Select
                  value={options.style}
                  label="Style"
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      style: e.target.value as GenerationOptions["style"],
                    })
                  }
                  disabled={isGenerating}
                >
                  <MenuItem value="flat">Flat</MenuItem>
                  <MenuItem value="gradient">Gradient</MenuItem>
                  <MenuItem value="outlined">Outlined</MenuItem>
                  <MenuItem value="illustrated">Illustrated</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Complexity</InputLabel>
                <Select
                  value={options.complexity}
                  label="Complexity"
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      complexity: e.target
                        .value as GenerationOptions["complexity"],
                    })
                  }
                  disabled={isGenerating}
                >
                  <MenuItem value="simple">Simple</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="complex">Complex</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Button
        variant="contained"
        size="large"
        onClick={handleGenerate}
        disabled={isGenerating || !description.trim()}
        startIcon={<AutoAwesome />}
        fullWidth
      >
        {isGenerating ? "Generating..." : "Generate Animation"}
      </Button>

      {/* Progress */}
      {isGenerating && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Generating... ({streamedLength.toLocaleString()} characters)
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Paper>
      )}

      {/* Error Display */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Success Display */}
      {success && (
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {/* Action Buttons */}
      {generatedAnimation && (
        <Card variant="outlined" sx={{ bgcolor: "success.50" }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom color="success.main">
              ✓ Animation Generated Successfully
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                color="success"
                startIcon={<Save />}
                onClick={handleSaveToFile}
              >
                Save to Filesystem
              </Button>
              <Button
                variant="outlined"
                color="success"
                startIcon={<Download />}
                onClick={handleDownload}
              >
                Download JSON
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={resetForm}
              >
                New Animation
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  )
}
