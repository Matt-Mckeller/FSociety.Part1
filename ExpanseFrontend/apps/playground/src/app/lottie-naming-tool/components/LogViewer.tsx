"use client"

/**
 * Log Viewer Component
 * Displays logs and provides AI analysis capabilities
 */

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Divider,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material"
import {
  ExpandMore,
  Download,
  Refresh,
  Analytics,
  BugReport,
  Timeline,
  Speed,
} from "@mui/icons-material"
import { createLogger } from "../utils/logger"

interface LogStats {
  totalLogs: number
  logLevels: Record<string, number>
  operations: Record<string, number>
  sessionDuration: number
}

interface AISummary {
  sessionId: string
  summary: string
  timestamp: string
}

export default function LogViewer() {
  const [sessionId, setSessionId] = useState("")
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const logger = createLogger("LOG_VIEWER")

  // Generate test logs
  const generateTestLogs = () => {
    logger.info(
      "Test log generation started",
      { test: true },
      "test_generation",
    )

    // Simulate AI interactions
    logger.aiRequest(
      "claude",
      "generateNames",
      { animationName: "TestAnimation" },
      new Date(),
    )
    logger.aiResponse("claude", "generateNames", { success: true }, 2500, true)

    // Simulate animation analysis
    logger.animationLoad("TestAnimation", 1024000, 25)
    logger.animationAnalysis("TestAnimation", "VISUAL_ANALYSIS", 50, {
      frames: 5,
    })
    logger.componentNaming("TestAnimation", 25, 15)

    // Simulate performance logging
    logger.performance("total_operation", 5000, {
      breakdown: { ai: 3000, processing: 2000 },
    })

    // Simulate errors
    logger.error(
      "Test error occurred",
      new Error("Simulated error for testing"),
      "test_operation",
    )

    logger.info(
      "Test log generation completed",
      { test: true },
      "test_generation",
    )
  }

  // Fetch AI summary
  const fetchAISummary = async () => {
    if (!sessionId.trim()) {
      setError("Please enter a session ID")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `/api/logs?sessionId=${encodeURIComponent(sessionId)}`,
      )

      if (!response.ok) {
        if (response.status === 404) {
          setError("Session not found")
        } else {
          setError("Failed to fetch session data")
        }
        return
      }

      const data = await response.json()
      setAiSummary(data)
      logger.info("AI summary fetched", { sessionId }, "fetch_summary")
    } catch (error) {
      setError("Network error occurred")
      logger.error(
        "Failed to fetch AI summary",
        error as Error,
        "fetch_summary",
      )
    } finally {
      setLoading(false)
    }
  }

  // Download logs
  const downloadLogs = () => {
    logger.exportLogs()
  }

  // Clear logs
  const clearLogs = () => {
    logger.clearLogs()
    logger.info("Logs cleared", {}, "clear_logs")
  }

  // Force flush logs
  const flushLogs = async () => {
    await logger.forceFlush()
    logger.info("Logs flushed to backend", {}, "flush_logs")
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Log Viewer & AI Analysis
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        View and analyze logs from the Lottie Naming Tool. Logs are
        automatically sent to the backend and saved to the project logs
        directory (/logs/lottie-naming-tool/) for AI analysis.
      </Typography>

      {/* Test Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Test Controls
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
            <Button
              variant="contained"
              startIcon={<BugReport />}
              onClick={generateTestLogs}
            >
              Generate Test Logs
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={downloadLogs}
            >
              Download Logs
            </Button>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={flushLogs}
            >
              Flush to Backend
            </Button>
            <Button variant="outlined" color="warning" onClick={clearLogs}>
              Clear Logs
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Session Analysis */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Session Analysis
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <TextField
              label="Session ID"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            />
            <Button
              variant="contained"
              startIcon={<Analytics />}
              onClick={fetchAISummary}
              disabled={loading}
            >
              {loading ? "Loading..." : "Analyze Session"}
            </Button>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Fetching session data...
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* AI Summary Display */}
      {aiSummary && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              AI Analysis Summary
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Session: {aiSummary.sessionId} | Generated:{" "}
              {new Date(aiSummary.timestamp).toLocaleString()}
            </Typography>

            <Paper sx={{ p: 2, mt: 2, bgcolor: "grey.50" }}>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  margin: 0,
                }}
              >
                {aiSummary.summary}
              </pre>
            </Paper>
          </CardContent>
        </Card>
      )}

      {/* Log Statistics */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Session Statistics
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary.main" fontWeight={600}>
                {logger.getBatchSize()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Pending Logs
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main" fontWeight={600}>
                Active
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Session Status
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="info.main" fontWeight={600}>
                Auto
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Flush Mode
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Information Panel */}
      <Accordion sx={{ mt: 3 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Timeline color="info" />
            <Typography variant="h6">How the Logging System Works</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                📤 Backend Integration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Logs are automatically batched and sent to the backend API
                endpoint (/api/logs) every 5 seconds or when the batch reaches
                10 entries.
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                💾 File System Storage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The backend saves logs to the project logs directory
                (/logs/lottie-naming-tool/) with automatic rotation, cleanup,
                and AI-readable formatting for analysis.
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                🤖 AI Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Each session generates an AI-readable summary with statistics,
                performance metrics, and insights for optimization.
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                🔄 Automatic Cleanup
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Log files are automatically rotated when they exceed 10MB and
                old files are cleaned up to prevent disk space issues.
              </Typography>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
