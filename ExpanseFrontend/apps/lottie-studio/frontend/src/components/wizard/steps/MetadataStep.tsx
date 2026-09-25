/**
 * Metadata Step Component
 *
 * Displays generated metadata and allows user to review/edit.
 */

'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import EditIcon from '@mui/icons-material/Edit'
import { useMutation, useSubscription, gql } from '@apollo/client'

import { useLottieStudioStore } from '@/store/useLottieStudioStore'

const GENERATE_METADATA = gql`
  mutation GenerateMetadata($animationId: ID!) {
    generateMetadata(animationId: $animationId) {
      id
      name
      status
      metadata {
        animationName
        alternativeNames
        description
        tags
      }
    }
  }
`

const PROCESSING_PROGRESS = gql`
  subscription ProcessingProgress($animationId: ID!) {
    processingProgress(animationId: $animationId) {
      phase
      progress
      message
    }
  }
`

export function MetadataStep() {
  const {
    currentAnimation,
    updateAnimationMetadata,
    goToNextStep,
    goToPreviousStep,
    markStepComplete,
    setIsProcessing,
    setProcessingState,
    processingState,
    isProcessing,
  } = useLottieStudioStore()

  const [isEditing, setIsEditing] = useState(false)
  const [editedMetadata, setEditedMetadata] = useState({
    animationName: '',
    description: '',
    tags: [] as string[],
  })
  const [error, setError] = useState<string | null>(null)

  const [generateMetadata, { loading }] = useMutation(GENERATE_METADATA)

  // Subscribe to progress updates
  useSubscription(PROCESSING_PROGRESS, {
    variables: { animationId: currentAnimation?.id },
    skip: !currentAnimation?.id || !isProcessing,
    onData: ({ data }) => {
      if (data.data?.processingProgress) {
        setProcessingState(data.data.processingProgress)
      }
    },
  })

  const metadata = currentAnimation?.metadata

  useEffect(() => {
    if (metadata) {
      setEditedMetadata({
        animationName: metadata.animationName || '',
        description: metadata.description || '',
        tags: metadata.tags || [],
      })
    }
  }, [metadata])

  const handleGenerate = async () => {
    if (!currentAnimation?.id) return

    setError(null)
    setIsProcessing(true)

    try {
      const { data } = await generateMetadata({
        variables: { animationId: currentAnimation.id },
      })

      if (data?.generateMetadata?.metadata) {
        updateAnimationMetadata(data.generateMetadata.metadata)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate metadata')
    } finally {
      setIsProcessing(false)
      setProcessingState(null)
    }
  }

  const handleContinue = () => {
    markStepComplete('metadata')
    goToNextStep()
  }

  const handleTagAdd = (tag: string) => {
    if (tag && !editedMetadata.tags.includes(tag)) {
      setEditedMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    setEditedMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }))
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Animation Metadata
      </Typography>

      {!metadata && !isProcessing ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <AutoFixHighIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Generate AI Metadata
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            Let AI analyze your animation and generate descriptive metadata including
            naming, description, and tags.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerate}
            disabled={loading}
            startIcon={<AutoFixHighIcon />}
          >
            Generate Metadata
          </Button>
        </Box>
      ) : isProcessing ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress size={64} sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            {processingState?.message || 'Analyzing animation...'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {processingState?.phase || 'initialization'}
          </Typography>
        </Box>
      ) : (
        <Box>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Generated Metadata Display */}
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Generated Metadata</Typography>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Done Editing' : 'Edit'}
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {isEditing ? (
              <Stack spacing={3}>
                <TextField
                  label="Animation Name"
                  value={editedMetadata.animationName}
                  onChange={(e) =>
                    setEditedMetadata((prev) => ({ ...prev, animationName: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Description"
                  value={editedMetadata.description}
                  onChange={(e) =>
                    setEditedMetadata((prev) => ({ ...prev, description: e.target.value }))
                  }
                  fullWidth
                  multiline
                  rows={3}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {editedMetadata.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleTagRemove(tag)}
                        size="small"
                      />
                    ))}
                  </Stack>
                  <TextField
                    size="small"
                    placeholder="Add tag..."
                    sx={{ mt: 1 }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleTagAdd((e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                  />
                </Box>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="h6">{metadata?.animationName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography>{metadata?.description}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {metadata?.tags?.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                </Box>
                {metadata?.alternativeNames && metadata.alternativeNames.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Alternative Names
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {metadata.alternativeNames.map((name) => (
                        <Chip key={name} label={name} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Stack>
            )}
          </Paper>

          {/* Regenerate Button */}
          <Box sx={{ mb: 4 }}>
            <Button
              variant="outlined"
              onClick={handleGenerate}
              disabled={loading}
              startIcon={<AutoFixHighIcon />}
            >
              Regenerate Metadata
            </Button>
          </Box>
        </Box>
      )}

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={goToPreviousStep}>Back</Button>
        <Button
          variant="contained"
          onClick={handleContinue}
          disabled={!metadata}
        >
          Continue to Elements
        </Button>
      </Box>
    </Box>
  )
}

export default MetadataStep
