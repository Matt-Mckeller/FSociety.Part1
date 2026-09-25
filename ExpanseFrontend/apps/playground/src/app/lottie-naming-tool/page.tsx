"use client"

/**
 * Lottie Naming Tool - Main Page Component
 */

import { useState } from "react"
import { Box, Container, Typography, Paper, Alert } from "@mui/material"
import {
  NamingToolState,
  CapturedFrame,
  ExportOptions,
  ComponentNode,
  AINamingResponse,
} from "./types/types"
import {
  FileUploadPanel,
  AnimationPreview,
  ElementTree,
  ClaudeResponsePanel,
  ValidationPanel,
  ExportPanel,
  MetadataGenerationPanel,
  ThemeGenerationPanel,
} from "./components"
import {
  findNodeByPath,
  applyNameSuggestionsToTree,
  extractComponents,
} from "./utils/componentWalker"
import { validateComponentTree } from "./utils/validation"
// Using unified AI service for Gemini operations
import { generateComponentNamesGemini } from "./services/ai"
// Legacy Claude service (will be migrated in future)
import {
  generateComponentNames,
  generateComponentNamesMultiPhase,
} from "./utils/ai"
import { createLogger } from "./utils/logger"
import {
  parseStreamingContent,
  extractProgressMessage,
} from "./utils/ai/progressiveParser"
import { exportAll } from "./utils/exportUtils"
import { ExpanseLottieMetadata } from "expanse.dynamicAssets"

export default function LottieNamingTool() {
  const logger = createLogger("LOTTIE_NAMING_TOOL")
  const [state, setState] = useState<NamingToolState>({
    visionMode: false,
    expandedPaths: new Set(),
    isGenerating: false,
    isExporting: false,
    useMultiPhase: true, // Default to multi-phase for large animation support
    aiProvider: "gemini", // Default to Gemini for 2M context window
    testingMode: false, // Default to real API calls
  })

  const handleStateUpdate = (updates: Partial<NamingToolState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const handleMetadataChange = (
    field: "name" | "description" | "purpose",
    value: string,
  ) => {
    if (!state.uploadContext) return

    const updatedContext = {
      ...state.uploadContext,
      [field]: value,
    }

    handleStateUpdate({ uploadContext: updatedContext })
  }

  // Helper to update tree nodes
  const updateTreeNode = (
    tree: ComponentNode[],
    path: string,
    updates: Partial<ComponentNode>,
  ): ComponentNode[] => {
    return tree.map((node) => {
      if (node.path === path) {
        return { ...node, ...updates }
      }
      if (node.children.length > 0) {
        return {
          ...node,
          children: updateTreeNode(node.children, path, updates),
        }
      }
      return node
    })
  }

  const handleNameChange = (path: string, newName: string) => {
    if (!state.componentTree) return

    const updatedTree = updateTreeNode(state.componentTree, path, {
      suggestedName: newName,
      approved: false,
    })

    handleStateUpdate({ componentTree: updatedTree })
  }

  const handleApprove = (path: string) => {
    if (!state.componentTree) return

    const updatedTree = updateTreeNode(state.componentTree, path, {
      approved: true,
    })

    handleStateUpdate({ componentTree: updatedTree })
  }

  const handleValidate = () => {
    if (!state.componentTree || !state.uploadContext) return

    const report = validateComponentTree(
      state.componentTree,
      state.uploadContext.name,
    )

    handleStateUpdate({ validationReport: report })
  }

  const handleGenerate = async () => {
    if (!state.lottieData || !state.uploadContext || !state.componentTree)
      return

    handleStateUpdate({
      isGenerating: true,
      error: undefined,
      streamingText: "",
      analysisProgress: 0,
      currentPhase: "initialization",
      progressMessage: "🚀 Starting analysis...",
    })

    try {
      // Check if we're in testing mode
      if (state.testingMode) {
        logger.info(
          "Using testing mode - loading test data",
          {
            animationName: state.uploadContext.name,
          },
          "handle_generate",
        )

        // Import test data dynamically
        const { rocketLaunchTestResponse } = await import(
          "./testData/rocketLaunchTestData"
        )

        // Simulate streaming for realistic UX
        handleStateUpdate({
          streamingText: "Loading test data...",
          analysisProgress: 50,
          currentPhase: "naming",
          progressMessage: "Using test data...",
        })

        // Small delay to simulate processing
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const updatedTree = applyNameSuggestionsToTree(
          state.componentTree!,
          rocketLaunchTestResponse.elements,
        )

        // Log the full test response for debugging
        logger.info(
          "Test data response details",
          {
            elementsCount: Object.keys(rocketLaunchTestResponse.elements)
              .length,
            sampleNames: Object.keys(rocketLaunchTestResponse.elements).slice(
              0,
              3,
            ),
            fullResponse: rocketLaunchTestResponse,
          },
          "testing_mode_response",
        )

        handleStateUpdate({
          aiNamingResponse: rocketLaunchTestResponse,
          componentTree: updatedTree,
          isGenerating: false,
          analysisProgress: 100,
          currentPhase: "completed",
          progressMessage: "✅ Analysis complete! (Testing Mode)",
        })

        return
      }

      // Real AI processing
      // Choose AI provider and mode
      let generateFunction

      if (state.aiProvider === "gemini") {
        // Gemini has 2M context - no chunking needed!
        generateFunction = generateComponentNamesGemini
      } else {
        // Claude - choose between simple and multi-phase based on feature flag
        generateFunction = state.useMultiPhase
          ? generateComponentNamesMultiPhase
          : generateComponentNames
      }

      const response = await generateFunction(
        {
          animationName: state.uploadContext.name,
          description: state.uploadContext.description,
          purpose: state.uploadContext.purpose,
          lottieData: state.lottieData, // Send the whole Lottie JSON
          visionMode: state.visionMode,
          frames: state.capturedFrames,
        },
        (text) => {
          // Parse streaming content progressively
          const parseResult = parseStreamingContent(text)
          const progressMessage = extractProgressMessage(text)

          handleStateUpdate({
            streamingText: text,
            analysisProgress: parseResult.progress,
            progressMessage,
            currentPhase: parseResult.partialResponse
              ? "naming"
              : state.currentPhase,
          })

          // If we have a complete response, apply it immediately
          if (parseResult.isComplete && parseResult.partialResponse) {
            logger.debug(
              "Streaming response complete",
              {
                elementsCount: parseResult.partialResponse.elements
                  ? Object.keys(parseResult.partialResponse.elements).length
                  : 0,
                sampleNames: parseResult.partialResponse.elements
                  ? Object.keys(parseResult.partialResponse.elements).slice(
                      0,
                      3,
                    )
                  : [],
              },
              "streaming_response",
            )

            const updatedTree = applyNameSuggestionsToTree(
              state.componentTree!,
              parseResult.partialResponse.elements!,
            )

            // Combine metadata with streaming elements
            const streamingFullResponse: AINamingResponse =
              state.metadataResponse
                ? {
                    ...state.metadataResponse,
                    elements: parseResult.partialResponse.elements!,
                  }
                : {
                    animationName: state.uploadContext?.name || "Unknown",
                    description: state.uploadContext?.description || "",
                    tags: [],
                    recommendations: {
                      recommendedColorPalettes: [],
                      elementGroups: {
                        logicalGrouped: {},
                        sharedColor: {},
                        themingPriority: {},
                        visualHierarchy: {},
                      },
                      optionalAiContext: {},
                      optionalAiStylePrompts: {},
                    },
                    elements: parseResult.partialResponse.elements!,
                  }

            handleStateUpdate({
              aiNamingResponse: streamingFullResponse,
              componentTree: updatedTree,
            })
          }
        },
      )

      // Final response processing (fallback for non-streaming responses)
      if (!state.aiNamingResponse) {
        console.log("DEBUG: Final AI response:", response)
        console.log(
          "DEBUG: Elements from AI:",
          response.elements ? Object.keys(response.elements).length : 0,
        )
        console.log(
          "DEBUG: Sample element names:",
          response.elements ? Object.keys(response.elements).slice(0, 3) : [],
        )

        const updatedTree = applyNameSuggestionsToTree(
          state.componentTree,
          response.elements,
        )

        // Combine metadata with elements to form full ExpanseLottie response
        const fullResponse: AINamingResponse = state.metadataResponse
          ? { ...state.metadataResponse, elements: response.elements }
          : {
              animationName: state.uploadContext?.name || "Unknown",
              description: state.uploadContext?.description || "",
              tags: [],
              recommendations: {
                recommendedColorPalettes: [],
                elementGroups: {
                  logicalGrouped: {},
                  sharedColor: {},
                  themingPriority: {},
                  visualHierarchy: {},
                },
                optionalAiContext: {},
                optionalAiStylePrompts: {},
              },
              elements: response.elements,
            }

        handleStateUpdate({
          aiNamingResponse: fullResponse,
          componentTree: updatedTree,
        })
      }

      handleStateUpdate({
        isGenerating: false,
        analysisProgress: 100,
        currentPhase: "completed",
        progressMessage: "✅ Analysis complete!",
      })
    } catch (error) {
      handleStateUpdate({
        error:
          error instanceof Error ? error.message : "Failed to generate names",
        isGenerating: false,
        analysisProgress: 0,
        currentPhase: "error",
        progressMessage: "❌ Analysis failed",
      })
    }
  }

  const handleExport = async (options: ExportOptions) => {
    if (!state.lottieData || !state.uploadContext) return

    // Need elements from AI response
    const elements = state.aiNamingResponse?.elements
    if (!elements || Object.keys(elements).length === 0) {
      handleStateUpdate({
        error: "No AI naming response available. Please generate names first.",
      })
      return
    }

    handleStateUpdate({ isExporting: true, error: undefined })

    try {
      await exportAll(
        state.uploadContext.name,
        state.lottieData,
        elements,
        state.metadataResponse, // Pass metadata from metadata analysis
        options,
        state.validationReport,
        state.lottieSource, // Pass source info for proper export location
      )

      handleStateUpdate({ isExporting: false })
    } catch (error) {
      handleStateUpdate({
        error:
          error instanceof Error ? error.message : "Failed to export files",
        isExporting: false,
      })
    }
  }

  const hasUploadedFile = !!state.lottieData

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          AI-Powered Lottie Naming Tool
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload Lottie animations, analyze structure with Claude AI, and
          generate semantic names for theme-based color mapping
        </Typography>
      </Box>

      {/* Error Display */}
      {state.error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => handleStateUpdate({ error: undefined })}
        >
          {state.error}
        </Alert>
      )}

      {/* Upload Panel */}
      {!hasUploadedFile && (
        <FileUploadPanel
          onUpload={(context, lottieData, animationContext) => {
            handleStateUpdate({
              uploadContext: context,
              lottieData,
              animationContext,
              componentTree: animationContext.components,
              // Track source for proper export location
              lottieSource: context.sourcePath
                ? {
                    type: "existing",
                    directoryPath: context.sourcePath,
                  }
                : {
                    type: "uploaded",
                  },
            })
          }}
          onError={(error) => handleStateUpdate({ error })}
        />
      )}

      {/* Main Content - After Upload */}
      {hasUploadedFile && (
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Left Column - Preview & Tree */}
          <Box
            sx={{
              flex: "0 0 450px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Paper elevation={2} sx={{ p: 2 }}>
              <AnimationPreview
                lottieData={state.lottieData!}
                animationContext={state.animationContext}
                visionMode={state.visionMode}
                onVisionModeChange={(enabled: boolean) =>
                  handleStateUpdate({ visionMode: enabled })
                }
                onFramesCaptured={(frames: CapturedFrame[]) =>
                  handleStateUpdate({ capturedFrames: frames })
                }
                onError={(error: string) => handleStateUpdate({ error })}
              />
            </Paper>

            <Paper elevation={2} sx={{ p: 2, flex: 1, overflow: "hidden" }}>
              <ElementTree
                tree={state.componentTree || []}
                expandedPaths={state.expandedPaths}
                selectedPath={state.selectedComponent}
                onExpand={(path: string) => {
                  const newPaths = new Set(state.expandedPaths)
                  if (newPaths.has(path)) {
                    newPaths.delete(path)
                  } else {
                    newPaths.add(path)
                  }
                  handleStateUpdate({ expandedPaths: newPaths })
                }}
                onSelect={(path: string) =>
                  handleStateUpdate({ selectedComponent: path })
                }
                onNameChange={handleNameChange}
                onApprove={handleApprove}
                onExpandNamed={() => {
                  // Expand all nodes with AI-suggested names and their parents
                  const newPaths = new Set<string>()
                  const expandNodeAndParents = (
                    nodes: ComponentNode[],
                    parentPaths: string[] = [],
                  ) => {
                    nodes.forEach((node) => {
                      const currentPaths = [...parentPaths, node.path]
                      if (node.suggestedName) {
                        // Add this node and all its parents
                        currentPaths.forEach((p) => newPaths.add(p))
                      }
                      if (node.children.length > 0) {
                        expandNodeAndParents(node.children, currentPaths)
                      }
                    })
                  }
                  expandNodeAndParents(state.componentTree || [])
                  handleStateUpdate({ expandedPaths: newPaths })
                }}
                onCollapseAll={() => {
                  handleStateUpdate({ expandedPaths: new Set() })
                }}
              />
            </Paper>
          </Box>

          {/* Right Column - AI Response & Actions */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}
          >
            {/* Metadata Generation Panel */}
            <MetadataGenerationPanel
              lottieJson={state.lottieData}
              fileName={state.uploadContext?.name}
              userProvidedMetadata={{
                title: state.uploadContext?.name,
                description: state.uploadContext?.description,
                purpose: state.uploadContext?.purpose,
              }}
              onMetadataGenerated={(metadata: ExpanseLottieMetadata) => {
                console.log("Metadata generated:", metadata)
                // Update state with generated metadata
                handleStateUpdate({
                  metadataResponse: metadata, // Store the full metadata for export
                  uploadContext: {
                    ...state.uploadContext!,
                    name:
                      metadata.animationName ||
                      metadata.alternativeNames?.[0] ||
                      "Unknown",
                    description: metadata.description,
                    purpose:
                      metadata.contextSpecificMetadata?.education?.primary ||
                      metadata.description,
                  },
                })
              }}
            />

            <Paper elevation={2} sx={{ p: 2 }}>
              <ClaudeResponsePanel
                response={state.aiNamingResponse}
                isStreaming={state.isGenerating}
                streamingText={state.streamingText}
                onGenerate={handleGenerate}
                useMultiPhase={state.useMultiPhase}
                onToggleMultiPhase={(enabled) =>
                  handleStateUpdate({ useMultiPhase: enabled })
                }
                aiProvider={state.aiProvider}
                onChangeAIProvider={(provider) =>
                  handleStateUpdate({ aiProvider: provider })
                }
                testingMode={state.testingMode}
                onToggleTestingMode={(enabled) =>
                  handleStateUpdate({ testingMode: enabled })
                }
                analysisProgress={state.analysisProgress}
                currentPhase={state.currentPhase}
                progressMessage={state.progressMessage}
                animationName={state.uploadContext?.name || ""}
                animationDescription={state.uploadContext?.description || ""}
                animationPurpose={state.uploadContext?.purpose || ""}
                onMetadataChange={handleMetadataChange}
              />
            </Paper>

            <Paper elevation={2} sx={{ p: 2 }}>
              <ValidationPanel
                report={state.validationReport}
                onValidate={handleValidate}
              />
            </Paper>

            <Paper elevation={2} sx={{ p: 2 }}>
              <ExportPanel
                lottieData={state.lottieData}
                componentTree={state.componentTree}
                screenshotPath={state.screenshotPath}
                validationReport={state.validationReport}
                isExporting={state.isExporting}
                onExport={handleExport}
              />
            </Paper>

            {/* Theme Generation Panel - Available after AI naming */}
            {state.aiNamingResponse && (
              <Paper elevation={2} sx={{ p: 2 }}>
                <ThemeGenerationPanel
                  animationName={state.uploadContext?.name}
                  schema={
                    state.metadataResponse && state.aiNamingResponse?.elements
                      ? {
                          ...state.metadataResponse,
                          elements: state.aiNamingResponse.elements,
                        }
                      : undefined
                  }
                  lottieJson={state.lottieData}
                  lottieSource={state.lottieSource}
                  isExporting={state.isExporting}
                />
              </Paper>
            )}
          </Box>
        </Box>
      )}
    </Container>
  )
}
