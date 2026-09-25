"use client"

/**
 * Validation Panel Component
 */

import {
  Box,
  Typography,
  Button,
  Alert,
  Stack,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import {
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Verified,
} from "@mui/icons-material"
import { ValidationReport } from "../types/types"
import { getStatusColor, getSeverityColor } from "../utils/validation"

interface ValidationPanelProps {
  report?: ValidationReport
  onValidate: () => void
}

export default function ValidationPanel({
  report,
  onValidate,
}: ValidationPanelProps) {
  if (!report) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Validation
        </Typography>
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Validate naming completeness and quality
          </Typography>
          <Button variant="outlined" onClick={onValidate} sx={{ mt: 1 }}>
            Run Validation
          </Button>
        </Box>
      </Box>
    )
  }

  const { summary, issues } = report
  const errorCount = issues.filter((i) => i.severity === "error").length
  const warningCount = issues.filter((i) => i.severity === "warning").length
  const infoCount = issues.filter((i) => i.severity === "info").length

  const statusIcon =
    summary.overallStatus === "PASS" ? (
      <CheckCircle sx={{ color: getStatusColor("PASS") }} />
    ) : summary.overallStatus === "WARNING" ? (
      <Warning sx={{ color: getStatusColor("WARNING") }} />
    ) : (
      <ErrorIcon sx={{ color: getStatusColor("FAIL") }} />
    )

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Validation</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={onValidate}
          startIcon={<Verified />}
        >
          Re-validate
        </Button>
      </Box>

      {/* Status Overview */}
      <Alert
        severity={
          summary.overallStatus === "PASS"
            ? "success"
            : summary.overallStatus === "WARNING"
              ? "warning"
              : "error"
        }
        icon={statusIcon}
        sx={{ mb: 2 }}
      >
        <Typography variant="body2" fontWeight={600}>
          {summary.overallStatus === "PASS"
            ? "Validation Passed"
            : summary.overallStatus === "WARNING"
              ? "Validation Passed with Warnings"
              : "Validation Failed"}
        </Typography>
        <Typography variant="caption">
          {errorCount > 0 && `${errorCount} errors`}
          {warningCount > 0 &&
            ` ${errorCount > 0 ? "· " : ""}${warningCount} warnings`}
          {infoCount > 0 &&
            ` ${errorCount > 0 || warningCount > 0 ? "· " : ""}${infoCount} info`}
        </Typography>
      </Alert>

      {/* Completion Progress */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            Themeable Components
          </Typography>
          <Typography variant="caption" fontWeight={600}>
            {summary.completionRate}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={summary.completionRate}
          sx={{ height: 8, borderRadius: 1 }}
        />
        <Typography variant="caption" color="text.secondary">
          {summary.themeableNamed} of {summary.themeableTotal} named
        </Typography>
      </Box>

      {/* Statistics */}
      <Stack direction="row" spacing={1} mb={2}>
        <Chip
          label={`Layers: ${summary.layersNamed}/${summary.layersTotal}`}
          size="small"
          variant="outlined"
        />
        <Chip
          label={`Generic: ${summary.genericNamesFound}`}
          size="small"
          variant="outlined"
          color={summary.genericNamesFound > 0 ? "warning" : "default"}
        />
      </Stack>

      {/* Issues List */}
      {issues.length > 0 && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Issues ({issues.length})
          </Typography>
          <List dense sx={{ maxHeight: 300, overflow: "auto" }}>
            {issues.slice(0, 20).map((issue, i) => (
              <ListItem
                key={i}
                sx={{
                  borderLeft: 3,
                  borderColor: getSeverityColor(issue.severity),
                  mb: 1,
                  bgcolor: "grey.50",
                }}
              >
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={issue.severity}
                        size="small"
                        sx={{
                          bgcolor: getSeverityColor(issue.severity),
                          color: "white",
                          fontSize: "0.7rem",
                          height: 20,
                        }}
                      />
                      <Typography variant="body2">{issue.message}</Typography>
                    </Stack>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {issue.path}
                      </Typography>
                      {issue.suggestion && (
                        <Typography
                          variant="caption"
                          display="block"
                          color="primary"
                        >
                          → {issue.suggestion}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
            {issues.length > 20 && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ pl: 2 }}
              >
                ... and {issues.length - 20} more issues
              </Typography>
            )}
          </List>
        </Box>
      )}
    </Box>
  )
}
