"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  LinearProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Paper,
  CircularProgress,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@mui/material"
import {
  ExpandMore,
  Lightbulb,
  AutoAwesome,
  Visibility,
  AutoFixHigh,
  Code,
  Close,
  Image as ImageIcon,
} from "@mui/icons-material"
import type { LottieAnimation } from "../types"
import {
  runComprehensiveAnalysis,
  generateAndApplyImprovements,
  type ComprehensiveAnalysis,
  type AnalysisProgress,
} from "../utils/comprehensiveAnalysis"

interface AnalysisCardProps {
  animation: LottieAnimation | null
  animationContext?: {
    description: string
    purpose?: string
    targetAudience?: string
  }
  onImprovedAnimation?: (improved: LottieAnimation) => void
}

export default function AnalysisCard({
  animation,
  animationContext,
  onImprovedAnimation,
}: AnalysisCardProps) {
  const [analysis, setAnalysis] = useState<ComprehensiveAnalysis | null>(null)
  const [improvedAnimation, setImprovedAnimation] =
    useState<LottieAnimation | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isImproving, setIsImproving] = useState(false)
  const [progress, setProgress] = useState<AnalysisProgress | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeProvider, setActiveProvider] = useState<
    "synthesis" | "claude" | "openai"
  >("synthesis")
  const [showRawData, setShowRawData] = useState(false)
  const [includeVisualAnalysis, setIncludeVisualAnalysis] = useState(false)

  const handleAnalyze = async () => {
    if (!animation) return

    setIsAnalyzing(true)
    setError(null)
    setProgress(null)

    // Log start of analysis to UI
    console.log("🚀 Starting AI Analysis...")
    console.log("Animation:", animation.nm || "Untitled")
    console.log(
      "Description:",
      animationContext?.description || "No description",
    )
    console.log(
      "Visual Analysis:",
      includeVisualAnalysis ? "Enabled" : "JSON Only",
    )

    try {
      const result = await runComprehensiveAnalysis(
        animation,
        {
          animationName: animation.nm || "Animation",
          description: animationContext?.description || "Lottie animation",
          purpose: animationContext?.purpose,
          targetAudience: animationContext?.targetAudience,
        },
        {
          useClaude: true,
          useOpenAI: true,
          includeVisualAnalysis,
          frameCount: 5,
        },
        (prog) => setProgress(prog),
      )
      setAnalysis(result)

      // Display success message in UI
      console.log("✅ Analysis Complete!")
      console.log("Check the Analysis tab to see detailed results.")
      console.log("All raw AI responses have been logged to the console above.")
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Analysis failed"
      setError(errorMsg)
      console.error("❌ Analysis Failed:", errorMsg)
    } finally {
      setIsAnalyzing(false)
      setProgress(null)
    }
  }

  const handleGenerateImprovement = async () => {
    if (!animation || !analysis) return

    setIsImproving(true)
    setError(null)

    console.log("🔧 Starting Improvement Generation...")
    console.log(
      "Applying",
      analysis.synthesis.prioritizedImprovements.length,
      "improvements",
    )

    try {
      const improved = await generateAndApplyImprovements(
        animation,
        analysis,
        (msg) => {
          console.log("Progress:", msg)
          setProgress({ stage: "improve", progress: 50, message: msg })
        },
      )
      setImprovedAnimation(improved)
      onImprovedAnimation?.(improved)

      console.log("✅ Improved Animation Generated Successfully!")
      console.log("Check the Preview tab to see the enhanced version.")
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Improvement generation failed"
      setError(errorMsg)
      console.error("❌ Improvement Generation Failed:", errorMsg)
    } finally {
      setIsImproving(false)
      setProgress(null)
    }
  }

  if (!animation) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography color="text.secondary" align="center">
            Generate an animation to see AI visual analysis
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Stack spacing={2}>
      {/* Analysis Trigger */}
      {!analysis && (
        <>
          <Tooltip title="Enable to capture and analyze rendered frames. Unchecked = JSON analysis only (faster, no CORS issues)">
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeVisualAnalysis}
                  onChange={(e) => setIncludeVisualAnalysis(e.target.checked)}
                  icon={<ImageIcon />}
                  checkedIcon={<ImageIcon color="primary" />}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" fontWeight="500">
                    Include Visual Frame Analysis
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Captures screenshots for deeper visual critique (optional)
                  </Typography>
                </Box>
              }
            />
          </Tooltip>

          <Button
            variant="contained"
            size="large"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            startIcon={
              isAnalyzing ? <CircularProgress size={20} /> : <Visibility />
            }
            fullWidth
          >
            {isAnalyzing
              ? "Analyzing..."
              : `Analyze with AI ${includeVisualAnalysis ? "(JSON + Visual)" : "(JSON Only)"}`}
          </Button>
        </>
      )}

      {/* Progress */}
      {progress && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body2" gutterBottom>
            {progress.message}
          </Typography>
          <LinearProgress variant="determinate" value={progress.progress} />
        </Paper>
      )}

      {/* Error Display */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Analysis Results */}
      {analysis && (
        <>
          {/* Synthesis Score */}
          <Card variant="outlined" sx={{ bgcolor: "primary.50" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <AutoAwesome sx={{ verticalAlign: "middle", mr: 1 }} />
                AI Visual Analysis Complete
              </Typography>
              <Box sx={{ my: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Design Effectiveness Score
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={analysis.synthesis.consensusScore}
                    sx={{ flex: 1, height: 12, borderRadius: 1 }}
                    color={
                      analysis.synthesis.consensusScore >= 70
                        ? "success"
                        : analysis.synthesis.consensusScore >= 50
                          ? "warning"
                          : "error"
                    }
                  />
                  <Typography variant="h4" fontWeight="bold">
                    {analysis.synthesis.consensusScore}
                  </Typography>
                </Box>
              </Box>
              <Alert severity="info" sx={{ mt: 2 }}>
                {analysis.synthesis.executiveSummary}
              </Alert>

              {/* View Raw Data Button */}
              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Button
                  size="small"
                  startIcon={<Code />}
                  onClick={() => setShowRawData(true)}
                  variant="outlined"
                >
                  View Raw AI Responses
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Provider Tabs */}
          <Card variant="outlined">
            <CardContent>
              <Tabs
                value={activeProvider}
                onChange={(_, v) => setActiveProvider(v)}
              >
                <Tab label="Synthesis" value="synthesis" />
                {analysis.claude && <Tab label="Claude" value="claude" />}
                {analysis.openai && <Tab label="OpenAI" value="openai" />}
              </Tabs>

              <Box sx={{ mt: 2 }}>
                {activeProvider === "synthesis" && (
                  <SynthesisView analysis={analysis} />
                )}
                {activeProvider === "claude" && analysis.claude && (
                  <ProviderView data={analysis.claude} provider="Claude" />
                )}
                {activeProvider === "openai" && analysis.openai && (
                  <ProviderView data={analysis.openai} provider="OpenAI" />
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Generate Improvement Button */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleGenerateImprovement}
            disabled={isImproving}
            startIcon={
              isImproving ? <CircularProgress size={20} /> : <AutoFixHigh />
            }
            fullWidth
          >
            {isImproving
              ? "Generating Improved Version..."
              : "Generate Improved Animation"}
          </Button>

          {improvedAnimation && (
            <Alert severity="success">
              ✓ Improved animation generated! Check the Preview tab to see the
              enhanced version.
            </Alert>
          )}
        </>
      )}

      {/* Raw Data Dialog */}
      <Dialog
        open={showRawData}
        onClose={() => setShowRawData(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Raw AI Analysis Data
          <IconButton
            onClick={() => setShowRawData(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {analysis && (
            <Stack spacing={3}>
              {/* Synthesis */}
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom color="primary">
                  🟣 Synthesis Data
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    fontSize: "0.75rem",
                    overflow: "auto",
                    maxHeight: "300px",
                    bgcolor: "grey.50",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  {JSON.stringify(analysis.synthesis, null, 2)}
                </Box>
              </Paper>

              {/* Claude */}
              {analysis.claude && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom color="primary">
                    🔵 Claude Analysis Data
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      fontSize: "0.75rem",
                      overflow: "auto",
                      maxHeight: "300px",
                      bgcolor: "grey.50",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    {JSON.stringify(analysis.claude, null, 2)}
                  </Box>
                </Paper>
              )}

              {/* OpenAI */}
              {analysis.openai && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom color="primary">
                    🟢 OpenAI Analysis Data
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      fontSize: "0.75rem",
                      overflow: "auto",
                      maxHeight: "300px",
                      bgcolor: "grey.50",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    {JSON.stringify(analysis.openai, null, 2)}
                  </Box>
                </Paper>
              )}

              {/* Frames Info */}
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom color="primary">
                  🖼️ Captured Frames
                </Typography>
                <Typography variant="body2">
                  Frames analyzed: {analysis.frames.length}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Frame data URLs omitted for brevity. Check console for full
                  frame data.
                </Typography>
              </Paper>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              console.log("📋 Full Analysis Data:", analysis)
              alert("Full analysis data logged to console!")
            }}
          >
            Log to Console
          </Button>
          <Button onClick={() => setShowRawData(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

// Synthesis View Component
function SynthesisView({ analysis }: { analysis: ComprehensiveAnalysis }) {
  const { synthesis } = analysis

  return (
    <Stack spacing={2}>
      {/* Prioritized Improvements */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle2">
            <Lightbulb sx={{ verticalAlign: "middle", mr: 0.5 }} />
            Priority Improvements ({synthesis.prioritizedImprovements.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {synthesis.prioritizedImprovements.map((imp, idx) => (
              <Paper key={idx} variant="outlined" sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Chip label={`#${imp.rank}`} size="small" color="primary" />
                  <Chip label={imp.category} size="small" variant="outlined" />
                  {imp.sources.length > 1 && (
                    <Chip label="Both AIs Agree" size="small" color="success" />
                  )}
                </Stack>
                <Typography variant="body2" fontWeight="600" gutterBottom>
                  {imp.change}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                  display="block"
                >
                  {imp.reasoning}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                  Expected: {imp.expectedImpact}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Consensus Insights */}
      {(synthesis.agreedStrengths.length > 0 ||
        synthesis.agreedIssues.length > 0) && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2">AI Consensus</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              {synthesis.agreedStrengths.length > 0 && (
                <Box>
                  <Typography
                    variant="caption"
                    color="success.main"
                    fontWeight="600"
                  >
                    Agreed Strengths
                  </Typography>
                  {synthesis.agreedStrengths.map((s, idx) => (
                    <Chip
                      key={idx}
                      label={s}
                      size="small"
                      color="success"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              )}
              {synthesis.agreedIssues.length > 0 && (
                <Box>
                  <Typography
                    variant="caption"
                    color="warning.main"
                    fontWeight="600"
                  >
                    Agreed Issues
                  </Typography>
                  {synthesis.agreedIssues.map((i, idx) => (
                    <Chip
                      key={idx}
                      label={i}
                      size="small"
                      color="warning"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
    </Stack>
  )
}

// Provider View Component
function ProviderView({ data, provider }: { data: any; provider: string }) {
  return (
    <Stack spacing={2}>
      {/* Scores */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          {provider} Scores
        </Typography>
        <Grid container spacing={1}>
          {Object.entries(data.designEffectiveness).map(([key, value]) => {
            if (key === "overall") return null
            return (
              <Grid item xs={6} key={key}>
                <ScoreChip label={key} score={value as number} max={100} />
              </Grid>
            )
          })}
        </Grid>
      </Paper>

      {/* Audience Impact */}
      {data.audienceImpact && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Audience Perception
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              <strong>First Impression:</strong>{" "}
              {data.audienceImpact.firstImpression}
            </Typography>
            <Typography variant="body2">
              <strong>Emotional Tone:</strong>{" "}
              {data.audienceImpact.emotionalTone}
            </Typography>
            <Typography variant="body2">
              <strong>Perceived Quality:</strong>{" "}
              <Chip
                label={data.audienceImpact.perceivedQuality}
                size="small"
                color={
                  data.audienceImpact.perceivedQuality === "premium"
                    ? "success"
                    : data.audienceImpact.perceivedQuality === "professional"
                      ? "primary"
                      : "default"
                }
              />
            </Typography>
          </Stack>
        </Paper>
      )}

      {/* Critiques */}
      {data.critiques && data.critiques.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2">Detailed Critiques</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              {data.critiques.map((c: any, idx: number) => (
                <Paper key={idx} variant="outlined" sx={{ p: 1.5 }}>
                  <Typography variant="body2" fontWeight="600">
                    {c.aspect}
                    <Chip label={c.impact} size="small" sx={{ ml: 1 }} />
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 0.5 }}
                  >
                    {c.suggestion}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
    </Stack>
  )
}

// Helper component
function ScoreChip({
  label,
  score,
  max,
}: {
  label: string
  score: number
  max: number
}) {
  const percentage = (score / max) * 100
  const color =
    percentage >= 70 ? "success" : percentage >= 50 ? "warning" : "error"

  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        textTransform="capitalize"
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{ flex: 1, height: 6, borderRadius: 1 }}
          color={color}
        />
        <Typography variant="caption" fontWeight="bold">
          {score}
        </Typography>
      </Box>
    </Paper>
  )
}
