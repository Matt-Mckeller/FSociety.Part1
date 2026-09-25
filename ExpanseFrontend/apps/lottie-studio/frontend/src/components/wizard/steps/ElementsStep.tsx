/**
 * Elements Step Component
 *
 * Displays generated element names and allows user to review/edit.
 */

'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Tooltip,
  IconButton,
  Collapse,
} from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useMutation, gql } from '@apollo/client'

import { useLottieStudioStore } from '@/store/useLottieStudioStore'

const GENERATE_ELEMENTS = gql`
  mutation GenerateElements($animationId: ID!) {
    generateElements(animationId: $animationId) {
      id
      status
      elements {
        name
        path
        description
        originalColor
        elementType
        roleFunction
        visualLevel
        isThemeable
        tags
      }
    }
  }
`

export function ElementsStep() {
  const {
    currentAnimation,
    updateAnimationElements,
    goToNextStep,
    goToPreviousStep,
    markStepComplete,
    setIsProcessing,
    processingState,
    isProcessing,
  } = useLottieStudioStore()

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const [generateElements, { loading }] = useMutation(GENERATE_ELEMENTS)

  const elements = currentAnimation?.elements || []

  const handleGenerate = async () => {
    if (!currentAnimation?.id) return

    setError(null)
    setIsProcessing(true)

    try {
      const { data } = await generateElements({
        variables: { animationId: currentAnimation.id },
      })

      if (data?.generateElements?.elements) {
        updateAnimationElements(data.generateElements.elements)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate element names')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleContinue = () => {
    markStepComplete('elements')
    goToNextStep()
  }

  const toggleRow = (name: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(name)) {
      newExpanded.delete(name)
    } else {
      newExpanded.add(name)
    }
    setExpandedRows(newExpanded)
  }

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path)
  }

  const getTypeColor = (type: string | undefined) => {
    switch (type) {
      case 'fill':
        return 'primary'
      case 'stroke':
        return 'secondary'
      case 'gradient':
        return 'success'
      default:
        return 'default'
    }
  }

  const getRoleColor = (role: string | undefined) => {
    switch (role) {
      case 'primary_subject':
        return 'error'
      case 'background':
        return 'info'
      case 'decoration':
        return 'warning'
      default:
        return 'default'
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Element Naming
      </Typography>

      {elements.length === 0 && !isProcessing ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <AutoFixHighIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Generate Element Names
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            AI will analyze your animation structure and generate semantic, descriptive names
            for each themeable element.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerate}
            disabled={loading}
            startIcon={<AutoFixHighIcon />}
          >
            Generate Element Names
          </Button>
        </Box>
      ) : isProcessing ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress size={64} sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            {processingState?.message || 'Analyzing elements...'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This may take a minute for complex animations
          </Typography>
        </Box>
      ) : (
        <Box>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">
              Found {elements.length} themeable elements
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleGenerate}
              disabled={loading}
              startIcon={<AutoFixHighIcon />}
            >
              Regenerate
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width={40}></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Themeable</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {elements.map((element) => (
                  <>
                    <TableRow
                      key={element.name}
                      sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' } }}
                    >
                      <TableCell>
                        <IconButton size="small" onClick={() => toggleRow(element.name)}>
                          {expandedRows.has(element.name) ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {element.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={element.elementType || 'unknown'}
                          size="small"
                          color={getTypeColor(element.elementType) as any}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={element.roleFunction || 'unknown'}
                          size="small"
                          color={getRoleColor(element.roleFunction) as any}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {element.originalColor && (
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: element.originalColor,
                              borderRadius: 1,
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={element.isThemeable ? 'Yes' : 'No'}
                          size="small"
                          color={element.isThemeable ? 'success' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow key={`${element.name}-details`}>
                      <TableCell colSpan={6} sx={{ py: 0 }}>
                        <Collapse in={expandedRows.has(element.name)}>
                          <Box sx={{ py: 2, pl: 6 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {element.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                Path:
                              </Typography>
                              <code style={{ fontSize: 11 }}>{element.path}</code>
                              <Tooltip title="Copy path">
                                <IconButton size="small" onClick={() => copyPath(element.path)}>
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                            {element.tags && element.tags.length > 0 && (
                              <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {element.tags.map((tag: string) => (
                                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                                ))}
                              </Box>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={goToPreviousStep}>Back</Button>
        <Button
          variant="contained"
          onClick={handleContinue}
          disabled={elements.length === 0}
        >
          Continue to Themes
        </Button>
      </Box>
    </Box>
  )
}

export default ElementsStep
