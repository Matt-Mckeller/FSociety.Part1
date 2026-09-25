"use client"

/**
 * Export Panel Component
 */

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material"
import { Download, CheckCircle } from "@mui/icons-material"
import {
  LottieData,
  ComponentNode,
  ValidationReport,
  ExportOptions,
} from "../types/types"

interface ExportPanelProps {
  lottieData?: LottieData
  componentTree?: ComponentNode[]
  screenshotPath?: string
  validationReport?: ValidationReport
  isExporting: boolean
  onExport: (options: ExportOptions) => void
}

export default function ExportPanel({
  lottieData,
  componentTree,
  validationReport,
  isExporting,
  onExport,
}: ExportPanelProps) {
  const [options, setOptions] = useState<ExportOptions>({
    includeJSON: true,
    includeScreenshots: false,
    includeThemeableLayoutConfig: true, // Unified Schema .ts file
    minifyJSON: false, // Default to pretty-printed for readability
  })

  const canExport = !!lottieData && !!componentTree

  const namedCount = componentTree ? countNamedComponents(componentTree) : 0

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Export
      </Typography>

      {!canExport && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Upload an animation and generate names before exporting
        </Alert>
      )}

      {canExport && (
        <>
          {namedCount > 0 && (
            <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 2 }}>
              <Typography variant="body2">
                Ready to export with {namedCount} named components
              </Typography>
            </Alert>
          )}

          {/* Simplified Export Options */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Export Options
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={options.includeJSON}
                  onChange={(e) =>
                    setOptions({ ...options, includeJSON: e.target.checked })
                  }
                />
              }
              label={
                <Box>
                  <Typography variant="body2">Renamed Lottie JSON</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {`{animationName}_ExpanseLottie.json - Animation with semantic names applied`}
                  </Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={options.includeThemeableLayoutConfig}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      includeThemeableLayoutConfig: e.target.checked,
                    })
                  }
                />
              }
              label={
                <Box>
                  <Typography variant="body2">
                    Expanse Lottie (TypeScript)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {`{animationName}.expanse-lottie.ts - Complete theming configuration`}
                  </Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={options.minifyJSON}
                  onChange={(e) =>
                    setOptions({ ...options, minifyJSON: e.target.checked })
                  }
                  disabled={!options.includeJSON}
                />
              }
              label={
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2">Minify JSON Output</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Compact format for smaller file size (optional)
                  </Typography>
                </Box>
              }
            />
          </Stack>

          {/* Export Button */}
          <Button
            variant="contained"
            color="success"
            fullWidth
            size="large"
            startIcon={<Download />}
            onClick={() => onExport(options)}
            disabled={isExporting || namedCount === 0}
          >
            {isExporting ? "Exporting..." : "Export All Files"}
          </Button>

          {validationReport && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block", textAlign: "center" }}
            >
              Validation report will be included
            </Typography>
          )}
        </>
      )}
    </Box>
  )
}

function countNamedComponents(tree: ComponentNode[]): number {
  let count = 0

  function walk(nodes: ComponentNode[]) {
    nodes.forEach((node) => {
      if (node.suggestedName || node.currentName) count++
      if (node.children.length > 0) walk(node.children)
    })
  }

  walk(tree)
  return count
}
