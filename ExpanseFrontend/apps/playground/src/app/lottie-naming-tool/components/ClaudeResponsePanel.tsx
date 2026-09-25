"use client"

/**
 * Claude Response Panel with Enhanced Streaming and Response Display
 */

import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Stack,
  Paper,
  IconButton,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import { AutoAwesome, Settings } from "@mui/icons-material"
import { AINamingResponse } from "../types/types"
import StreamingDisplay from "./StreamingDisplay"
import ResponseDisplay from "./ResponseDisplay"

interface ClaudeResponsePanelProps {
  response?: AINamingResponse
  isStreaming: boolean
  streamingText?: string
  onGenerate: () => void
  useMultiPhase?: boolean
  onToggleMultiPhase?: (enabled: boolean) => void
  aiProvider?: "claude" | "gemini"
  onChangeAIProvider?: (provider: "claude" | "gemini") => void
  testingMode?: boolean
  onToggleTestingMode?: (enabled: boolean) => void
  analysisProgress?: number
  currentPhase?: string
  progressMessage?: string
  // Metadata fields
  animationName?: string
  animationDescription?: string
  animationPurpose?: string
  onMetadataChange?: (
    field: "name" | "description" | "purpose",
    value: string,
  ) => void
}

export default function ClaudeResponsePanel({
  response,
  isStreaming,
  streamingText,
  onGenerate,
  useMultiPhase = false,
  onToggleMultiPhase,
  aiProvider = "gemini",
  onChangeAIProvider,
  testingMode = false,
  onToggleTestingMode,
  analysisProgress = 0,
  currentPhase = "",
  progressMessage = "",
  animationName = "",
  animationDescription = "",
  animationPurpose = "",
  onMetadataChange,
}: ClaudeResponsePanelProps) {
  return (
    <Box>
      {/* Animation Metadata Section */}
      {onMetadataChange && (
        <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Animation Details
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2, display: "block" }}
          >
            These details help AI generate better semantic names for your
            animation elements
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Animation Name"
              placeholder="e.g., RocketLaunch"
              value={animationName}
              onChange={(e) => onMetadataChange("name", e.target.value)}
              size="small"
              fullWidth
              helperText="PascalCase name for the animation"
            />
            <TextField
              label="Description"
              placeholder="Brief description of the animation"
              value={animationDescription}
              onChange={(e) => onMetadataChange("description", e.target.value)}
              size="small"
              fullWidth
              multiline
              rows={2}
              helperText="What does this animation show or do?"
            />
            <TextField
              label="Purpose"
              placeholder="How will this animation be used?"
              value={animationPurpose}
              onChange={(e) => onMetadataChange("purpose", e.target.value)}
              size="small"
              fullWidth
              helperText="Context for where/how this will be used"
            />
          </Stack>
        </Paper>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <AutoAwesome color="primary" />
          AI Analysis with{" "}
          {aiProvider === "gemini" ? "Gemini 2.5 Pro" : "Claude Sonnet 4.5"}
        </Typography>
        {!isStreaming && (
          <Stack direction="row" spacing={2} alignItems="center">
            {onChangeAIProvider && (
              <ToggleButtonGroup
                value={aiProvider}
                exclusive
                onChange={(_, value) => value && onChangeAIProvider(value)}
                size="small"
              >
                <ToggleButton value="gemini">
                  <Tooltip title="Gemini 2.5 Pro - 1M token context with extended thinking">
                    <span>🤖 Gemini 2.5</span>
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="claude">
                  <Tooltip title="Claude Sonnet 4 - 200k token context with multi-phase chunking">
                    <span>🧠 Claude</span>
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            {onToggleMultiPhase && aiProvider === "claude" && (
              <Tooltip
                title={
                  useMultiPhase
                    ? "Multi-Phase: Automatically chunks large animations (>195k tokens) into manageable pieces. Required for animations over 200k tokens."
                    : "Simple Mode: Sends entire animation in one request. Only works for small animations (<195k tokens)."
                }
              >
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Settings />}
                  onClick={() => onToggleMultiPhase(!useMultiPhase)}
                  color={useMultiPhase ? "primary" : "inherit"}
                >
                  {useMultiPhase ? "Multi-Phase (Recommended)" : "Simple"}
                </Button>
              </Tooltip>
            )}
            {onToggleTestingMode && (
              <Tooltip
                title={
                  testingMode
                    ? "Testing Mode: Use cached AI responses for faster development. No real API calls."
                    : "Live Mode: Make real API calls to AI services."
                }
              >
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Settings />}
                  onClick={() => onToggleTestingMode(!testingMode)}
                  color={testingMode ? "secondary" : "inherit"}
                >
                  {testingMode ? "🧪 Testing Mode" : "🚀 Live Mode"}
                </Button>
              </Tooltip>
            )}
            <Button
              variant="contained"
              startIcon={<AutoAwesome />}
              onClick={onGenerate}
              disabled={isStreaming}
              size="large"
            >
              {testingMode ? "Generate Names (Test)" : "Generate Names"}
            </Button>
          </Stack>
        )}
      </Box>

      {/* Enhanced Streaming Display */}
      {isStreaming && (
        <StreamingDisplay
          isStreaming={isStreaming}
          streamingText={streamingText}
          aiProvider={aiProvider}
          analysisProgress={analysisProgress}
          currentPhase={currentPhase}
          progressMessage={progressMessage}
        />
      )}

      {/* Empty State */}
      {!response && !isStreaming && (
        <Paper
          elevation={0}
          sx={{
            textAlign: "center",
            py: 6,
            px: 3,
            bgcolor: "grey.50",
            borderRadius: 2,
          }}
        >
          <AutoAwesome sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Generate AI-Powered Component Names
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {aiProvider === "gemini" ? "Gemini" : "Claude"} will analyze your
            animation structure and suggest semantic, descriptive names
            following the [Purpose][Location][Detail] naming pattern
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AutoAwesome />}
            onClick={onGenerate}
          >
            Start Analysis
          </Button>
        </Paper>
      )}

      {/* Enhanced Response Display */}
      {response && !isStreaming && (
        <ResponseDisplay response={response} aiProvider={aiProvider} />
      )}
    </Box>
  )
}
