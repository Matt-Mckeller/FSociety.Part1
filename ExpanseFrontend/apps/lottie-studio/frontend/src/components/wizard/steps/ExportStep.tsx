/**
 * Export Step Component
 *
 * Allows users to export generated files (schema, component, themes).
 */

'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  CircularProgress,
  Alert,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CodeIcon from '@mui/icons-material/Code'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useMutation, gql } from '@apollo/client'

import { useLottieStudioStore } from '@/store/useLottieStudioStore'

const EXPORT_ANIMATION = gql`
  mutation ExportAnimation($animationId: ID!, $options: ExportOptionsInput) {
    exportAnimation(animationId: $animationId, options: $options) {
      success
      files {
        filename
        path
        content
        type
      }
      errors
    }
  }
`

interface ExportFile {
  filename: string
  path: string
  content: string
  type: string
}

export function ExportStep() {
  const {
    currentAnimation,
    goToPreviousStep,
    markStepComplete,
    generatedThemes,
  } = useLottieStudioStore()

  const [exportOptions, setExportOptions] = useState({
    includeSchema: true,
    includeComponent: true,
    includeThemeConfigs: true,
    includeThemesRegistry: true,
    includeLottieJson: true,
  })
  const [exportedFiles, setExportedFiles] = useState<ExportFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [expandedFile, setExpandedFile] = useState<string | false>(false)

  const [exportAnimation, { loading }] = useMutation(EXPORT_ANIMATION)

  const handleExport = async () => {
    if (!currentAnimation?.id) return

    setError(null)

    try {
      const { data } = await exportAnimation({
        variables: {
          animationId: currentAnimation.id,
          options: exportOptions,
        },
      })

      if (data?.exportAnimation?.success) {
        setExportedFiles(data.exportAnimation.files)
        markStepComplete('export')
      } else {
        setError(data?.exportAnimation?.errors?.join(', ') || 'Export failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export files')
    }
  }

  const handleDownloadFile = (file: ExportFile) => {
    const blob = new Blob([file.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadAll = async () => {
    // Dynamic import for JSZip to avoid SSR issues
    const JSZip = (await import('jszip')).default
    const FileSaver = (await import('file-saver')).default

    const zip = new JSZip()

    exportedFiles.forEach((file) => {
      zip.file(file.path, file.content)
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    const animationName = currentAnimation?.metadata?.animationName || currentAnimation?.name || 'animation'
    FileSaver.saveAs(blob, `${animationName}-export.zip`)
  }

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'SCHEMA':
        return '📋'
      case 'COMPONENT':
        return '⚛️'
      case 'THEME_CONFIGS':
        return '🎨'
      case 'THEMES_REGISTRY':
        return '📦'
      case 'LOTTIE_JSON':
        return '✨'
      default:
        return '📄'
    }
  }

  const metadata = currentAnimation?.metadata
  const elements = currentAnimation?.elements || []

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Export Files
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Generate and download the processed animation files for your project.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Summary Card */}
      <Card sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Export Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary">Animation Name</Typography>
              <Typography fontWeight={500}>{metadata?.animationName || currentAnimation?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary">Elements</Typography>
              <Chip label={elements.length} size="small" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary">Themes</Typography>
              <Chip label={generatedThemes.length} size="small" color="primary" />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Export Options */}
      {exportedFiles.length === 0 && (
        <Card sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Export Options
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeSchema}
                    onChange={(e) =>
                      setExportOptions((prev) => ({ ...prev, includeSchema: e.target.checked }))
                    }
                  />
                }
                label="Schema file (.expanse-lottie.ts)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeComponent}
                    onChange={(e) =>
                      setExportOptions((prev) => ({ ...prev, includeComponent: e.target.checked }))
                    }
                  />
                }
                label="React component (.tsx)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeThemeConfigs}
                    onChange={(e) =>
                      setExportOptions((prev) => ({ ...prev, includeThemeConfigs: e.target.checked }))
                    }
                  />
                }
                label="Theme configuration files"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeThemesRegistry}
                    onChange={(e) =>
                      setExportOptions((prev) => ({ ...prev, includeThemesRegistry: e.target.checked }))
                    }
                  />
                }
                label="Themes registry file"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeLottieJson}
                    onChange={(e) =>
                      setExportOptions((prev) => ({ ...prev, includeLottieJson: e.target.checked }))
                    }
                  />
                }
                label="Lottie JSON file"
              />
            </FormGroup>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleExport}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <DownloadIcon />}
              >
                {loading ? 'Generating...' : 'Generate Export Files'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Exported Files */}
      {exportedFiles.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              <CheckCircleIcon sx={{ color: 'success.main', mr: 1, verticalAlign: 'middle' }} />
              Generated Files ({exportedFiles.length})
            </Typography>
            <Button
              variant="contained"
              onClick={handleDownloadAll}
              startIcon={<DownloadIcon />}
            >
              Download All (.zip)
            </Button>
          </Box>

          {exportedFiles.map((file) => (
            <Accordion
              key={file.path}
              expanded={expandedFile === file.path}
              onChange={(_, expanded) => setExpandedFile(expanded ? file.path : false)}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Typography>{getFileTypeIcon(file.type)}</Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2">{file.filename}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {file.path}
                    </Typography>
                  </Box>
                  <Chip label={file.type} size="small" variant="outlined" />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                  <Button
                    size="small"
                    onClick={() => handleDownloadFile(file)}
                    startIcon={<DownloadIcon />}
                  >
                    Download
                  </Button>
                </Box>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto',
                    maxHeight: 400,
                    fontSize: 12,
                    fontFamily: 'monospace',
                  }}
                >
                  {file.content}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}

          <Divider sx={{ my: 3 }} />

          <Alert severity="success" icon={<CheckCircleIcon />}>
            <Typography variant="subtitle2">Export Complete!</Typography>
            <Typography variant="body2">
              Your animation has been processed and all files are ready for download.
              Copy these files to your project's Lottie directory.
            </Typography>
          </Alert>
        </Box>
      )}

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={goToPreviousStep}>Back</Button>
        <Button
          variant="outlined"
          onClick={() => {
            // Reset and start over
            window.location.reload()
          }}
        >
          Process Another Animation
        </Button>
      </Box>
    </Box>
  )
}

export default ExportStep
