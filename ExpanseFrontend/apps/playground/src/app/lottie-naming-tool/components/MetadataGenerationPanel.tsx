/**
 * Metadata Generation Panel
 * UI for AI-powered metadata generation with editing capabilities
 */

"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Tooltip,
} from "@mui/material"
import {
  AutoAwesome as AiIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material"
import type { LottieData } from "../types/types"
import type { ExpanseLottieMetadata } from "expanse.dynamicAssets"

interface MetadataGenerationPanelProps {
  lottieJson?: LottieData
  fileName?: string
  onMetadataGenerated?: (metadata: ExpanseLottieMetadata) => void
  userProvidedMetadata?: {
    description?: string
    purpose?: string
    title?: string
  }
}

export function MetadataGenerationPanel({
  lottieJson,
  fileName,
  onMetadataGenerated,
  userProvidedMetadata,
}: MetadataGenerationPanelProps) {
  const [metadata, setMetadata] = useState<ExpanseLottieMetadata | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedName, setSelectedName] = useState<string>("")
  const [editingDescription, setEditingDescription] = useState(false)
  const [editedDescription, setEditedDescription] = useState("")

  const handleGenerateMetadataForLottie = async () => {
    if (!lottieJson || !fileName) {
      setError("Please upload a Lottie file first")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response: Response = await fetch(
        "/api/lottie-naming/generate-metadata",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lottieJson,
            fileName,
            userProvidedMetadata,
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to generate metadata")
      }

      const data = await response.json()
      const generatedMetadata = data.metadata as ExpanseLottieMetadata

      setMetadata(generatedMetadata)
      setSelectedName(
        generatedMetadata.animationName ||
          generatedMetadata.alternativeNames?.[0] ||
          "",
      )
      setEditedDescription(generatedMetadata.description)

      if (onMetadataGenerated) {
        onMetadataGenerated(generatedMetadata)
      }
    } catch (err) {
      console.error("Error generating metadata:", err)
      setError(
        err instanceof Error ? err.message : "Failed to generate metadata",
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveDescription = () => {
    if (metadata) {
      const updated = { ...metadata, description: editedDescription }
      setMetadata(updated)
      setEditingDescription(false)
      if (onMetadataGenerated) {
        onMetadataGenerated(updated)
      }
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (metadata) {
      const updated = {
        ...metadata,
        tags: metadata.tags.filter((tag) => tag !== tagToRemove),
      }
      setMetadata(updated)
      if (onMetadataGenerated) {
        onMetadataGenerated(updated)
      }
    }
  }

  const handleAddTag = (newTag: string) => {
    if (metadata && newTag.trim()) {
      const updated = {
        ...metadata,
        tags: [...metadata.tags, newTag.trim().toLowerCase()],
      }
      setMetadata(updated)
      if (onMetadataGenerated) {
        onMetadataGenerated(updated)
      }
    }
  }

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <AiIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h6">Animation Metadata</Typography>
      </Box>

      {!metadata && (
        <Button
          variant="contained"
          onClick={handleGenerateMetadataForLottie}
          disabled={isGenerating || !lottieJson}
          startIcon={isGenerating ? <CircularProgress size={20} /> : <AiIcon />}
          fullWidth
          sx={{ mb: 2 }}
        >
          {isGenerating
            ? "Generating Metadata with AI..."
            : "Generate Metadata with AI"}
        </Button>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {metadata && (
        <Box>
          {/* Suggested Names */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Suggested Names
              </Typography>
              <Tooltip title="Generate new suggestions">
                <IconButton
                  size="small"
                  onClick={handleGenerateMetadataForLottie}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <FormControl fullWidth>
              <RadioGroup
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
              >
                {/* Show animationName first, then alternativeNames */}
                {[
                  metadata.animationName,
                  ...(metadata.alternativeNames || []),
                ].map((name, index) => (
                  <FormControlLabel
                    key={index}
                    value={name}
                    control={<Radio size="small" />}
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: selectedName === name ? 600 : 400,
                        }}
                      >
                        {name} {index === 0 && "(Current)"}
                      </Typography>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Description */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Description
              </Typography>
              <IconButton
                size="small"
                onClick={() =>
                  editingDescription
                    ? handleSaveDescription()
                    : setEditingDescription(true)
                }
              >
                {editingDescription ? (
                  <CheckIcon fontSize="small" />
                ) : (
                  <EditIcon fontSize="small" />
                )}
              </IconButton>
            </Box>
            {editingDescription ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                variant="outlined"
                size="small"
              />
            ) : (
              <Typography variant="body2">{metadata.description}</Typography>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Purpose & Use Cases */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Context-Specific Use Cases
            </Typography>

            {metadata.contextSpecificMetadata &&
              Object.entries(metadata.contextSpecificMetadata).map(
                ([contextKey, contextData]) => (
                  <Box key={contextKey} sx={{ mb: 2 }}>
                    <Chip
                      label={contextKey}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1, textTransform: "capitalize" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, mb: 1, color: "primary.main" }}
                    >
                      {contextData.primary}
                    </Typography>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {contextData.useCaseExamples.map((useCase, index) => (
                        <li key={index}>
                          <Typography variant="body2">{useCase}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                ),
              )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Tags */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {metadata.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  onDelete={() => handleRemoveTag(tag)}
                />
              ))}
            </Box>
          </Box>

          {/* Info message about export */}
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Use the <strong>Export Panel</strong> below to export your
              animation with the complete Expanse Lottie schema.
            </Typography>
          </Alert>
        </Box>
      )}
    </Paper>
  )
}
