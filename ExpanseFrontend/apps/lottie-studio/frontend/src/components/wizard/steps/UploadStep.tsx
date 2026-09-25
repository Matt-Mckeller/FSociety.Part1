/**
 * Upload Step Component
 *
 * Allows users to upload Lottie JSON files and provide optional hints
 * for AI processing.
 */

'use client'

import { useState, useCallback, useRef } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Alert,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useMutation, gql } from '@apollo/client'
import dynamic from 'next/dynamic'

import { useLottieStudioStore } from '@/store/useLottieStudioStore'

// Dynamic import for Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const UPLOAD_ANIMATION = gql`
  mutation UploadAnimation($input: UploadAnimationInput!) {
    uploadAnimation(input: $input) {
      id
      name
      status
    }
  }
`

export function UploadStep() {
  const {
    lottieJson,
    setLottieJson,
    setCurrentAnimation,
    goToNextStep,
    markStepComplete,
  } = useLottieStudioStore()

  const [hints, setHints] = useState({
    name: '',
    description: '',
    purpose: '',
    tags: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploadAnimation, { loading }] = useMutation(UPLOAD_ANIMATION)

  const handleFileLoad = useCallback(
    (content: string, fileName: string) => {
      try {
        const json = JSON.parse(content)

        // Basic validation
        if (!json.v || !json.layers) {
          throw new Error('Invalid Lottie JSON: missing required fields (v, layers)')
        }

        setLottieJson(json)
        setError(null)

        // Auto-fill name from file or animation name
        if (!hints.name) {
          const name = json.nm || fileName.replace('.json', '')
          setHints((prev) => ({ ...prev, name }))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse JSON file')
      }
    },
    [setLottieJson, hints.name]
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        handleFileLoad(content, file.name)
      }
      reader.readAsText(file)
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file && file.name.endsWith('.json')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          handleFileLoad(content, file.name)
        }
        reader.readAsText(file)
      }
    },
    [handleFileLoad]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleContinue = async () => {
    if (!lottieJson) return

    try {
      const { data } = await uploadAnimation({
        variables: {
          input: {
            json: JSON.stringify(lottieJson),
            name: hints.name || undefined,
            hints: {
              name: hints.name || undefined,
              description: hints.description || undefined,
              purpose: hints.purpose || undefined,
              tags: hints.tags ? hints.tags.split(',').map((t) => t.trim()) : undefined,
            },
          },
        },
      })

      setCurrentAnimation(data.uploadAnimation)
      markStepComplete('upload')
      goToNextStep()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload animation')
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Upload Lottie Animation
      </Typography>

      {/* Drop Zone */}
      <Paper
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        sx={{
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isDragging
            ? 'rgba(161, 91, 202, 0.1)'
            : 'rgba(255, 255, 255, 0.02)',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.light',
            backgroundColor: 'rgba(161, 91, 202, 0.05)',
          },
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {lottieJson ? (
          <Box>
            <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Animation Loaded!
            </Typography>
            <Box
              sx={{
                width: 200,
                height: 200,
                mx: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Lottie animationData={lottieJson} loop autoplay />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Click to upload a different file
            </Typography>
          </Box>
        ) : (
          <Box>
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Drop your Lottie JSON file here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse
            </Typography>
          </Box>
        )}
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Optional Hints */}
      {lottieJson && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Optional Hints for AI
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Provide hints to help the AI better understand your animation. These are
            optional but can improve naming and theming quality.
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Animation Name"
              value={hints.name}
              onChange={(e) => setHints((prev) => ({ ...prev, name: e.target.value }))}
              fullWidth
              placeholder="e.g., RocketLaunch, CelebrationConfetti"
            />
            <TextField
              label="Description"
              value={hints.description}
              onChange={(e) => setHints((prev) => ({ ...prev, description: e.target.value }))}
              fullWidth
              multiline
              rows={2}
              placeholder="What does this animation depict?"
            />
            <TextField
              label="Purpose"
              value={hints.purpose}
              onChange={(e) => setHints((prev) => ({ ...prev, purpose: e.target.value }))}
              fullWidth
              placeholder="e.g., Loading indicator, Success feedback, Hero illustration"
            />
            <TextField
              label="Tags (comma-separated)"
              value={hints.tags}
              onChange={(e) => setHints((prev) => ({ ...prev, tags: e.target.value }))}
              fullWidth
              placeholder="e.g., celebration, confetti, party, colorful"
            />
          </Stack>
        </Box>
      )}

      {/* Continue Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleContinue}
          disabled={!lottieJson || loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Uploading...' : 'Continue to Metadata'}
        </Button>
      </Box>
    </Box>
  )
}

export default UploadStep
