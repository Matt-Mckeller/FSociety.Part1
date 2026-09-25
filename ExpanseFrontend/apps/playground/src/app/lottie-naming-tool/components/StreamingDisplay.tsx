"use client"

/**
 * Enhanced Streaming Display Component
 * Provides better user feedback during AI analysis with progress tracking
 */

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
  Paper,
  Chip,
  Stack,
  Alert,
  Fade,
} from "@mui/material"
import {
  AutoAwesome,
  Visibility,
  Timeline,
  Lightbulb,
  CheckCircle,
  Error,
} from "@mui/icons-material"
import MarkdownRenderer from "./MarkdownRenderer"

interface StreamingDisplayProps {
  isStreaming: boolean
  streamingText?: string
  aiProvider: "claude" | "gemini"
  analysisProgress?: number
  currentPhase?: string
  progressMessage?: string
  onComplete?: () => void
}

interface AnalysisPhase {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  status: "pending" | "active" | "completed" | "error"
}

export default function StreamingDisplay({
  isStreaming,
  streamingText = "",
  aiProvider,
  analysisProgress = 0,
  currentPhase = "",
  progressMessage = "",
  onComplete,
}: StreamingDisplayProps) {
  const [phases, setPhases] = useState<AnalysisPhase[]>([
    {
      id: "initialization",
      name: "Initializing Analysis",
      description: "Preparing animation data for AI processing",
      icon: <AutoAwesome />,
      status: "pending",
    },
    {
      id: "visual",
      name: "Visual Analysis",
      description: "Analyzing animation frames and visual elements",
      icon: <Visibility />,
      status: "pending",
    },
    {
      id: "structure",
      name: "Structure Analysis",
      description: "Examining component hierarchy and relationships",
      icon: <Timeline />,
      status: "pending",
    },
    {
      id: "naming",
      name: "Name Generation",
      description: "Generating semantic names and recommendations",
      icon: <Lightbulb />,
      status: "pending",
    },
  ])

  const [internalCurrentPhase, setInternalCurrentPhase] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [parsedContent, setParsedContent] = useState<{
    phase: string
    content: string
    isJson: boolean
  } | null>(null)

  // Parse streaming content to detect phases and progress
  useEffect(() => {
    if (!streamingText) return

    const text = streamingText.toLowerCase()

    // Detect current phase based on content
    if (
      text.includes("phase 1") ||
      text.includes("visual analysis") ||
      text.includes("analyzing visual")
    ) {
      setInternalCurrentPhase("visual")
      setProgress(25)
      updatePhaseStatus("visual", "active")
    } else if (
      text.includes("phase 2") ||
      text.includes("structure") ||
      text.includes("component")
    ) {
      setInternalCurrentPhase("structure")
      setProgress(50)
      updatePhaseStatus("visual", "completed")
      updatePhaseStatus("structure", "active")
    } else if (
      text.includes("generating") ||
      text.includes("name") ||
      text.includes("suggestion")
    ) {
      setInternalCurrentPhase("naming")
      setProgress(50)
      updatePhaseStatus("structure", "completed")
      updatePhaseStatus("naming", "active")
    } else if (
      text.includes("complete") ||
      text.includes("done") ||
      text.includes("finished")
    ) {
      setInternalCurrentPhase("completed")
      setProgress(100)
      updatePhaseStatus("naming", "completed")
    }

    // Parse content to determine if it's JSON or readable text
    const isJson =
      text.includes("{") && text.includes("}") && text.includes("element_names")
    const isReadableText =
      text.includes("phase") ||
      text.includes("analysis") ||
      text.includes("processing")

    if (isReadableText && !isJson) {
      setParsedContent({
        phase: internalCurrentPhase,
        content: streamingText,
        isJson: false,
      })
    } else if (isJson) {
      // Try to extract readable parts from JSON
      try {
        const jsonMatch = streamingText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const jsonStr = jsonMatch[0]
          const parsed = JSON.parse(jsonStr)

          if (parsed.element_names && parsed.element_names.length > 0) {
            setParsedContent({
              phase: "naming",
              content: `Generated ${parsed.element_names.length} name suggestions...`,
              isJson: false,
            })
          }
        }
      } catch (e) {
        // Still parsing JSON, show progress
        setParsedContent({
          phase: internalCurrentPhase,
          content: "Processing AI response...",
          isJson: false,
        })
      }
    }
  }, [streamingText, internalCurrentPhase])

  const updatePhaseStatus = (
    phaseId: string,
    status: AnalysisPhase["status"],
  ) => {
    setPhases((prev) =>
      prev.map((phase) =>
        phase.id === phaseId ? { ...phase, status } : phase,
      ),
    )
  }

  const getPhaseIcon = (phase: AnalysisPhase) => {
    switch (phase.status) {
      case "completed":
        return <CheckCircle color="success" />
      case "active":
        return <CircularProgress size={20} />
      case "error":
        return <Error color="error" />
      default:
        return phase.icon
    }
  }

  const getPhaseColor = (phase: AnalysisPhase) => {
    switch (phase.status) {
      case "completed":
        return "success"
      case "active":
        return "primary"
      case "error":
        return "error"
      default:
        return "default"
    }
  }

  if (!isStreaming) return null

  return (
    <Paper elevation={2} sx={{ p: 3, bgcolor: "grey.50" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <CircularProgress size={24} sx={{ mr: 2 }} />
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {aiProvider === "gemini" ? "Gemini" : "Claude"} is analyzing your
            animation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This may take a few moments depending on animation complexity
          </Typography>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ mb: 3 }}>
        <LinearProgress
          variant="determinate"
          value={analysisProgress}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: "grey.200",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {analysisProgress}% complete
          </Typography>
          {progressMessage && (
            <Typography variant="caption" color="primary" fontWeight={500}>
              {progressMessage}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Analysis Phases */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        {phases.map((phase) => (
          <Fade key={phase.id} in={true} timeout={300}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                bgcolor:
                  phase.status === "active" ? "primary.50" : "transparent",
                border: phase.status === "active" ? 1 : 0,
                borderColor: "primary.main",
                transition: "all 0.3s ease",
              }}
            >
              <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                {getPhaseIcon(phase)}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight={phase.status === "active" ? 600 : 500}
                >
                  {phase.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {phase.description}
                </Typography>
              </Box>
              <Chip
                label={phase.status}
                size="small"
                color={getPhaseColor(phase)}
                variant={phase.status === "active" ? "filled" : "outlined"}
              />
            </Box>
          </Fade>
        ))}
      </Stack>

      {/* Streaming Content Display */}
      {parsedContent && (
        <Fade in={true} timeout={500}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" fontWeight={600} color="primary">
                {parsedContent.phase === "visual" && "🎨 Visual Analysis"}
                {parsedContent.phase === "structure" && "📊 Structure Analysis"}
                {parsedContent.phase === "naming" && "💡 Name Generation"}
                {parsedContent.phase === "completed" && "✅ Analysis Complete"}
              </Typography>
            </Box>

            {parsedContent.isJson ? (
              <Typography variant="body2" color="text.secondary">
                {parsedContent.content}
              </Typography>
            ) : (
              <Box sx={{ maxHeight: 200, overflow: "auto" }}>
                <MarkdownRenderer content={parsedContent.content} compact />
              </Box>
            )}
          </Paper>
        </Fade>
      )}

      {/* Raw streaming text (fallback) */}
      {streamingText && !parsedContent && (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            maxHeight: 300,
            overflow: "auto",
            bgcolor: "background.paper",
            fontFamily: "monospace",
            fontSize: "0.875rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          <MarkdownRenderer content={streamingText} compact />
        </Paper>
      )}

      {/* Completion Message */}
      {progress === 100 && (
        <Fade in={true} timeout={1000}>
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Analysis complete! Your component names are ready for review.
            </Typography>
          </Alert>
        </Fade>
      )}
    </Paper>
  )
}
