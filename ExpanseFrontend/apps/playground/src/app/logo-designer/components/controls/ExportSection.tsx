/**
 * Export Section
 * Copy code, SVG, and save presets
 */

"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
} from "@mui/material"
import {
  ExpandMore as ExpandIcon,
  ContentCopy as CopyIcon,
  Code as CodeIcon,
  Image as SvgIcon,
  Download as DownloadIcon,
  Save as SaveIcon,
  Compare as CompareIcon,
} from "@mui/icons-material"
import { LogoConfig, Preset } from "../../types"
import { configToCode, getFullCodeSnippet, extractSVG, downloadSVG, copyToClipboard } from "../../utils/configUtils"

interface ExportSectionProps {
  config: LogoConfig
  previewContainerId: string
  onSavePreset: (name: string, description?: string) => Preset
  onToggleCompare: () => void
  compareMode: boolean
}

export function ExportSection({
  config,
  previewContainerId,
  onSavePreset,
  onToggleCompare,
  compareMode,
}: ExportSectionProps) {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [presetName, setPresetName] = useState('')
  const [presetDescription, setPresetDescription] = useState('')
  const [showCode, setShowCode] = useState(false)

  const handleCopyProps = async () => {
    const code = configToCode(config)
    const success = await copyToClipboard(code)
    setSnackbar({
      open: true,
      message: success ? 'Props copied to clipboard!' : 'Failed to copy',
      severity: success ? 'success' : 'error',
    })
  }

  const handleCopyFullCode = async () => {
    const code = getFullCodeSnippet(config)
    const success = await copyToClipboard(code)
    setSnackbar({
      open: true,
      message: success ? 'Code copied with import!' : 'Failed to copy',
      severity: success ? 'success' : 'error',
    })
  }

  const handleCopySVG = async () => {
    const svg = extractSVG(previewContainerId)
    if (svg) {
      const success = await copyToClipboard(svg)
      setSnackbar({
        open: true,
        message: success ? 'SVG copied to clipboard!' : 'Failed to copy',
        severity: success ? 'success' : 'error',
      })
    } else {
      setSnackbar({
        open: true,
        message: 'Could not extract SVG',
        severity: 'error',
      })
    }
  }

  const handleDownloadSVG = () => {
    const svg = extractSVG(previewContainerId)
    if (svg) {
      downloadSVG(svg)
      setSnackbar({
        open: true,
        message: 'SVG downloaded!',
        severity: 'success',
      })
    }
  }

  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSavePreset(presetName.trim(), presetDescription.trim() || undefined)
      setSaveDialogOpen(false)
      setPresetName('')
      setPresetDescription('')
      setSnackbar({
        open: true,
        message: 'Preset saved!',
        severity: 'success',
      })
    }
  }

  const codeSnippet = getFullCodeSnippet(config)

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography fontWeight={600}>Export</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Copy Buttons */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CodeIcon />}
              onClick={handleCopyProps}
            >
              Copy Props
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CopyIcon />}
              onClick={handleCopyFullCode}
            >
              Copy with Import
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<SvgIcon />}
              onClick={handleCopySVG}
            >
              Copy SVG
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadSVG}
            >
              Download SVG
            </Button>
          </Box>

          {/* Save & Compare */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => setSaveDialogOpen(true)}
            >
              Save Preset
            </Button>
            <Button
              variant={compareMode ? 'contained' : 'outlined'}
              size="small"
              color={compareMode ? 'secondary' : 'primary'}
              startIcon={<CompareIcon />}
              onClick={onToggleCompare}
            >
              {compareMode ? 'Exit Compare' : 'Compare'}
            </Button>
          </Box>

          {/* Code Preview Toggle */}
          <Button
            variant="text"
            size="small"
            onClick={() => setShowCode(!showCode)}
            sx={{ mb: 1 }}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </Button>

          {showCode && (
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                backgroundColor: 'grey.900',
                overflow: 'auto',
                maxHeight: 200,
              }}
            >
              <Typography
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: 'grey.100',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              >
                {codeSnippet}
              </Typography>
            </Paper>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Save Preset Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Save Preset</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Preset Name"
            fullWidth
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
          />
          <TextField
            label="Description (optional)"
            fullWidth
            multiline
            rows={2}
            value={presetDescription}
            onChange={(e) => setPresetDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSavePreset} variant="contained" disabled={!presetName.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
