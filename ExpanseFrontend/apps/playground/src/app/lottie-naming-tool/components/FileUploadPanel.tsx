"use client"

/**
 * File Upload Panel Component - Enhanced with drag-drop and pre-populated selection
 */

import { useState, useRef, ChangeEvent, useEffect, DragEvent } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Autocomplete,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
  IconButton,
  Collapse,
} from "@mui/material"
import {
  CloudUpload as UploadIcon,
  FilePresent,
  CheckCircle,
  Close,
  Category,
  Refresh,
} from "@mui/icons-material"
import {
  UploadContext,
  LottieData,
  AnimationContext,
  ComponentNode,
} from "../types/types"
import {
  parseLottieJSON,
  validateLottieJSON,
  getAnimationMetadata,
} from "../utils/lottieParser"
import {
  extractComponents,
  buildComponentTree,
  getSmartExpandedPaths,
} from "../utils/componentWalker"
import {
  getAvailableLotties,
  loadLottieData,
  LottieRegistryItem,
} from "../utils/lottieRegistry"

interface FileUploadPanelProps {
  onUpload: (
    context: UploadContext,
    lottieData: LottieData,
    animationContext: AnimationContext,
  ) => void
  onError: (error: string) => void
}

export default function FileUploadPanel({
  onUpload,
  onError,
}: FileUploadPanelProps) {
  const [availableLotties, setAvailableLotties] = useState<
    LottieRegistryItem[]
  >([])
  const [selectedLottie, setSelectedLottie] =
    useState<LottieRegistryItem | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadMode, setUploadMode] = useState<"select" | "upload">("select")
  const [fileValidation, setFileValidation] = useState<{
    valid: boolean
    message: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load available lotties on mount
  useEffect(() => {
    getAvailableLotties().then(setAvailableLotties)
  }, [])

  const processLottieData = async (
    lottieData: any,
    fileName: string,
    contextOverride?: Partial<UploadContext>,
  ) => {
    try {
      // Validate
      const validation = validateLottieJSON(lottieData)
      if (!validation.valid) {
        setFileValidation({
          valid: false,
          message: validation.error || "Invalid Lottie JSON",
        })
        onError(validation.error || "Invalid Lottie JSON")
        return
      }

      setFileValidation({ valid: true, message: "Valid Lottie file!" })

      // Parse
      const parsedData = parseLottieJSON(lottieData)
      const metadata = getAnimationMetadata(parsedData)

      // Extract components
      const components = extractComponents(parsedData)
      const componentTree = buildComponentTree(components)
      console.log({ fileUploadComponentTree: componentTree })

      // Create contexts - use provided name or derive from file
      const animationName =
        contextOverride?.name || fileName.replace(".json", "")
      const uploadContext: UploadContext = {
        name: animationName,
        description: contextOverride?.description,
        purpose: contextOverride?.purpose,
      }

      const animationContext: AnimationContext = {
        ...uploadContext,
        components: componentTree,
        lottieData: parsedData,
        totalFrames: metadata.totalFrames,
        frameRate: metadata.frameRate,
        duration: metadata.duration,
      }

      onUpload(uploadContext, parsedData, animationContext)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? `Failed to parse file: ${error.message}`
          : "Failed to parse Lottie JSON file"
      setFileValidation({ valid: false, message: errorMessage })
      onError(errorMessage)
    }
  }

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const json = JSON.parse(text)
      await processLottieData(json, file.name)
    } catch (error) {
      const errorMessage = "Failed to read file"
      setFileValidation({ valid: false, message: errorMessage })
      onError(errorMessage)
    }
  }

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".json")) {
      const errorMessage = "Please upload a JSON file"
      setFileValidation({ valid: false, message: errorMessage })
      onError(errorMessage)
      return
    }

    try {
      const text = await file.text()
      const json = JSON.parse(text)
      await processLottieData(json, file.name)
    } catch (error) {
      const errorMessage = "Failed to read file"
      setFileValidation({ valid: false, message: errorMessage })
      onError(errorMessage)
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleLottieSelect = async (
    _event: any,
    value: LottieRegistryItem | null,
  ) => {
    setSelectedLottie(value)
    if (value) {
      // Try to load the lottie data
      const data = await loadLottieData(value)
      if (data) {
        await processLottieData(data, value.name + ".json", {
          name: value.name,
          description: value.description,
          sourcePath: value.directoryPath, // Pass the directory path for exports
        })
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {/* Mode Selector */}
      <Box sx={{ mb: 3, display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant={uploadMode === "select" ? "contained" : "outlined"}
          onClick={() => setUploadMode("select")}
          startIcon={<Category />}
        >
          Select Existing
        </Button>
        <Button
          variant={uploadMode === "upload" ? "contained" : "outlined"}
          onClick={() => setUploadMode("upload")}
          startIcon={<UploadIcon />}
        >
          Upload New
        </Button>
      </Box>

      {/* Pre-populated Lottie Selection */}
      {uploadMode === "select" && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Select Existing Lottie
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose from {availableLotties.length} available animations
            </Typography>

            <Autocomplete
              options={availableLotties}
              getOptionLabel={(option) => option.displayName}
              groupBy={(option) => option.category}
              value={selectedLottie}
              onChange={handleLottieSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Lotties"
                  placeholder="Type to search by name, category, or tags..."
                  helperText="Search by name, category, or tags"
                />
              )}
              renderOption={(props, option) => {
                const { key, ...otherProps } = props
                return (
                  <Box component="li" key={key} {...otherProps}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">
                        {option.displayName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.description}
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {option.tags
                          ?.slice(0, 3)
                          .map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{ mr: 0.5, height: 20 }}
                            />
                          ))}
                      </Box>
                    </Box>
                  </Box>
                )
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* File Upload Section */}
      {uploadMode === "upload" && (
        <Card>
          <CardContent>
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              sx={{
                p: 4,
                border: "2px dashed",
                borderColor: isDragging ? "primary.main" : "divider",
                borderRadius: 2,
                bgcolor: isDragging ? "action.hover" : "transparent",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onClick={handleUploadClick}
            >
              <UploadIcon
                sx={{
                  fontSize: 64,
                  color: isDragging ? "primary.main" : "text.secondary",
                  mb: 2,
                }}
              />

              <Typography variant="h5" gutterBottom>
                {isDragging ? "Drop file here" : "Upload Lottie Animation"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Drag & drop a Lottie JSON file here, or click to select
              </Typography>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
            </Box>

            {/* File Validation Feedback */}
            <Collapse in={!!fileValidation}>
              <Alert
                severity={fileValidation?.valid ? "success" : "error"}
                icon={fileValidation?.valid ? <CheckCircle /> : undefined}
                sx={{ mt: 2 }}
                action={
                  <IconButton
                    size="small"
                    onClick={() => setFileValidation(null)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                }
              >
                {fileValidation?.message}
              </Alert>
            </Collapse>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}
