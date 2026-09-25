"use client"

/**
 * Enhanced Response Display Component
 * Displays ExpanseLottie schema analysis results with proper structure
 */

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material"
import {
  ExpandMore,
  Lightbulb,
  CheckCircle,
  ContentCopy,
  Check,
  AutoAwesome,
  Palette,
  Category,
  LayersOutlined,
} from "@mui/icons-material"
import { AINamingResponse } from "../types/types"
import MarkdownRenderer from "./MarkdownRenderer"

interface ResponseDisplayProps {
  response: AINamingResponse
  aiProvider: "claude" | "gemini"
}

export default function ResponseDisplay({
  response,
  aiProvider,
}: ResponseDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getProviderIcon = () => {
    return aiProvider === "gemini" ? "🤖" : "🧠"
  }

  const getProviderName = () => {
    return aiProvider === "gemini" ? "Gemini 2.5 Pro" : "Claude Sonnet 4.5"
  }

  // Count element groups for display
  const elementGroupCount = response.recommendations?.elementGroups
    ? Object.keys(response.recommendations.elementGroups.logicalGrouped || {})
        .length +
      Object.keys(response.recommendations.elementGroups.sharedColor || {})
        .length +
      Object.keys(response.recommendations.elementGroups.themingPriority || {})
        .length +
      Object.keys(response.recommendations.elementGroups.visualHierarchy || {})
        .length
    : 0

  return (
    <Stack spacing={3}>
      {/* Success Header */}
      <Card
        sx={{
          bgcolor: "success.50",
          border: "1px solid",
          borderColor: "success.main",
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <CheckCircle sx={{ fontSize: 40, color: "success.main" }} />
            <Box flex={1}>
              <Typography variant="h6" gutterBottom color="success.dark">
                Analysis Complete
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getProviderIcon()} {getProviderName()} has analyzed your
                animation and generated{" "}
                <strong>{Object.keys(response.elements || {}).length}</strong>{" "}
                name suggestions
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Chip
                label={`${Object.values(response.elements || {}).filter((s) => s.isThemeable).length} themeable`}
                color="primary"
                size="small"
              />
              <Chip
                label={`${elementGroupCount} groups`}
                color="secondary"
                size="small"
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Paper elevation={1} sx={{ p: 2, bgcolor: "grey.50" }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="primary.main" fontWeight={600}>
              {Object.keys(response.elements || {}).length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Elements Named
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="success.main" fontWeight={600}>
              {
                Object.values(response.elements || {}).filter(
                  (s) => s.isThemeable,
                ).length
              }
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Themeable Elements
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="warning.main" fontWeight={600}>
              {response.recommendations?.recommendedColorPalettes?.length || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Color Palettes
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Animation Description */}
      {response.description && (
        <Accordion defaultExpanded elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              bgcolor: "primary.50",
              borderBottom: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <AutoAwesome color="primary" />
              <Typography variant="h6" fontWeight={600} color="primary.dark">
                Animation Description
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Card variant="outlined" sx={{ bgcolor: "background.paper" }}>
              <CardContent>
                <MarkdownRenderer content={response.description} />
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Tags */}
      {response.tags && response.tags.length > 0 && (
        <Accordion elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              bgcolor: "info.50",
              borderBottom: "1px solid",
              borderColor: "info.main",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Category color="info" />
              <Typography variant="h6" fontWeight={600} color="info.dark">
                Tags
              </Typography>
              <Chip label={response.tags.length} size="small" color="info" />
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {response.tags.map((tag: string, i: number) => (
                <Chip key={i} label={tag} variant="outlined" color="info" />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Recommended Color Palettes */}
      {response.recommendations?.recommendedColorPalettes &&
        response.recommendations.recommendedColorPalettes.length > 0 && (
          <Accordion elevation={2}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                bgcolor: "secondary.50",
                borderBottom: "1px solid",
                borderColor: "secondary.main",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Palette color="secondary" />
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="secondary.dark"
                >
                  Recommended Color Palettes
                </Typography>
                <Chip
                  label={
                    response.recommendations.recommendedColorPalettes.length
                  }
                  size="small"
                  color="secondary"
                />
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              <Stack spacing={1}>
                {response.recommendations.recommendedColorPalettes.map(
                  (palette: string, i: number) => (
                    <Card
                      key={i}
                      variant="outlined"
                      sx={{ bgcolor: "background.paper", position: "relative" }}
                    >
                      <CardContent>
                        <Typography variant="body1">{palette}</Typography>
                        <Tooltip title="Copy to clipboard">
                          <IconButton
                            size="small"
                            sx={{ position: "absolute", top: 8, right: 8 }}
                            onClick={() => handleCopy(palette, i)}
                          >
                            {copiedIndex === i ? (
                              <Check fontSize="small" color="success" />
                            ) : (
                              <ContentCopy fontSize="small" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </CardContent>
                    </Card>
                  ),
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}

      {/* Element Groups */}
      {response.recommendations?.elementGroups && elementGroupCount > 0 && (
        <Accordion elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              bgcolor: "warning.50",
              borderBottom: "1px solid",
              borderColor: "warning.main",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <LayersOutlined color="warning" />
              <Typography variant="h6" fontWeight={600} color="warning.dark">
                Element Groups
              </Typography>
              <Chip label={elementGroupCount} size="small" color="warning" />
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/* Logical Groups */}
              {Object.entries(
                response.recommendations.elementGroups.logicalGrouped || {},
              ).length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    color="primary.main"
                  >
                    Logical Groups
                  </Typography>
                  <Stack spacing={1}>
                    {Object.entries(
                      response.recommendations.elementGroups.logicalGrouped,
                    ).map(([name, group]) => (
                      <Card key={name} variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {group.description}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            flexWrap="wrap"
                            gap={0.5}
                          >
                            {group.elements.map((el: string) => (
                              <Chip
                                key={el}
                                label={el}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Shared Color Groups */}
              {Object.entries(
                response.recommendations.elementGroups.sharedColor || {},
              ).length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    color="secondary.main"
                  >
                    Shared Color Groups
                  </Typography>
                  <Stack spacing={1}>
                    {Object.entries(
                      response.recommendations.elementGroups.sharedColor,
                    ).map(([name, group]) => (
                      <Card key={name} variant="outlined">
                        <CardContent>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography variant="subtitle2" fontWeight={600}>
                              {name}
                            </Typography>
                            <Chip
                              label={group.colorRelationship}
                              size="small"
                              color="secondary"
                            />
                          </Stack>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {group.description}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            flexWrap="wrap"
                            gap={0.5}
                          >
                            {group.elements.map((el: string) => (
                              <Chip
                                key={el}
                                label={el}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Theming Priority Groups */}
              {Object.entries(
                response.recommendations.elementGroups.themingPriority || {},
              ).length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    color="warning.main"
                  >
                    Theming Priority
                  </Typography>
                  <Stack spacing={1}>
                    {Object.entries(
                      response.recommendations.elementGroups.themingPriority,
                    ).map(([name, group]) => (
                      <Card key={name} variant="outlined">
                        <CardContent>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography variant="subtitle2" fontWeight={600}>
                              {name}
                            </Typography>
                            <Chip
                              label={group.priority.toUpperCase()}
                              size="small"
                              color={
                                group.priority === "high"
                                  ? "error"
                                  : group.priority === "medium"
                                    ? "warning"
                                    : "default"
                              }
                            />
                          </Stack>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {group.description}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            flexWrap="wrap"
                            gap={0.5}
                          >
                            {group.elements.map((el: string) => (
                              <Chip
                                key={el}
                                label={el}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Visual Hierarchy Groups */}
              {Object.entries(
                response.recommendations.elementGroups.visualHierarchy || {},
              ).length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    color="info.main"
                  >
                    Visual Hierarchy
                  </Typography>
                  <Stack spacing={1}>
                    {Object.entries(
                      response.recommendations.elementGroups.visualHierarchy,
                    ).map(([name, group]) => (
                      <Card key={name} variant="outlined">
                        <CardContent>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography variant="subtitle2" fontWeight={600}>
                              {name}
                            </Typography>
                            <Chip
                              label={group.hierarchy}
                              size="small"
                              color="info"
                            />
                          </Stack>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {group.description}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            flexWrap="wrap"
                            gap={0.5}
                          >
                            {group.elements.map((el: string) => (
                              <Chip
                                key={el}
                                label={el}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}

      {/* AI Context & Style Prompts */}
      {(response.recommendations?.optionalAiContext ||
        response.recommendations?.optionalAiStylePrompts) && (
        <Accordion elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              bgcolor: "grey.100",
              borderBottom: "1px solid",
              borderColor: "grey.400",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Lightbulb color="action" />
              <Typography variant="h6" fontWeight={600} color="text.secondary">
                AI Context & Style Prompts
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Stack spacing={2}>
              {response.recommendations?.optionalAiContext &&
                Object.entries(response.recommendations.optionalAiContext)
                  .length > 0 && (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Context
                    </Typography>
                    {Object.entries(
                      response.recommendations.optionalAiContext,
                    ).map(([key, value]) => (
                      <Card key={key} variant="outlined" sx={{ mb: 1 }}>
                        <CardContent>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {key}
                          </Typography>
                          <Typography variant="body2">{value}</Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}

              {response.recommendations?.optionalAiStylePrompts &&
                Object.entries(response.recommendations.optionalAiStylePrompts)
                  .length > 0 && (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Style Prompts
                    </Typography>
                    {Object.entries(
                      response.recommendations.optionalAiStylePrompts,
                    ).map(([key, value]) => (
                      <Card key={key} variant="outlined" sx={{ mb: 1 }}>
                        <CardContent>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {key}
                          </Typography>
                          <Typography variant="body2">{value}</Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Success Message */}
      <Alert severity="success" sx={{ mt: 2 }}>
        <Typography variant="body2">
          🎉 Your animation has been successfully analyzed! The element names
          are now available in the tree view on the left. You can review, edit,
          and approve the suggestions before exporting.
        </Typography>
      </Alert>
    </Stack>
  )
}
