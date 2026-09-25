/**
 * HierarchyExplainer - Visual guide to the game-themed planning hierarchy
 * Shows Legend → Campaign ⇊ Storyline → Quest → Objective → Action flow
 * Note: Storylines can belong to multiple Campaigns (many-to-many relationship)
 */
import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  alpha,
  Tooltip,
  Chip,
  Divider,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"

import { useGameData } from "../hooks"
import { legendData } from "../contexts/StrategicContext"
import type { Legend } from "../types"

const legend = legendData.legend as Legend

interface HierarchyLevel {
  id: string
  gameTitle: string
  standardTitle: string
  icon: string
  color: string
  bgColor: string
  description: string
  example: string
  count: number
  activeCount?: number
  timeframe: string
  note?: string
  relationship?: "one-to-many" | "many-to-many"
}

export function HierarchyExplainer() {
  const {
    campaigns,
    storylines: questlines,
    quests,
    objectives,
  } = useGameData()
  const [expanded, setExpanded] = useState(false)

  const hierarchyLevels: HierarchyLevel[] = [
    {
      id: "legend",
      gameTitle: "Legend",
      standardTitle: "Vision / North Star",
      icon: "�",
      color: "#4338CA",
      bgColor: "#E0E7FF",
      description:
        'Your ultimate long-term vision. The grand narrative that drives everything. The "why" behind all efforts.',
      example: legend.title,
      count: 1,
      timeframe: "Lifetime",
      relationship: "one-to-many",
    },
    {
      id: "campaign",
      gameTitle: "Campaign",
      standardTitle: "Business / Strategic Initiative",
      icon: "⚔️",
      color: "#6D28D9",
      bgColor: "#EDE9FE",
      description:
        "A business or major strategic initiative. Each Campaign represents a distinct business front or revenue stream.",
      example: campaigns[0]?.title || "Education Business",
      count: campaigns.length,
      activeCount: campaigns.filter((c) => c.status === "in-progress").length,
      timeframe: "3-12 months",
      relationship: "many-to-many",
    },
    {
      id: "storyline",
      gameTitle: "Storyline",
      standardTitle: "Project / Product",
      icon: "📖",
      color: "#0F766E",
      bgColor: "#CCFBF1",
      description:
        "Products or major projects. Can span across multiple Campaigns simultaneously.",
      example: questlines[0]?.name || "4Eye",
      count: questlines.length,
      activeCount: questlines.filter((q) => q.status === "in-progress").length,
      timeframe: "1-6 months",
      note: "⟷ Storylines can belong to multiple Campaigns",
      relationship: "one-to-many",
    },
    {
      id: "quest",
      gameTitle: "Quest",
      standardTitle: "Epic / Major Deliverable",
      icon: "🎯",
      color: "#C2410C",
      bgColor: "#FFEDD5",
      description:
        "Major deliverables with clear outcomes. The significant milestones you're working toward.",
      example: quests[0]?.title || "4Eye MVP Definition",
      count: quests.length,
      activeCount: quests.filter((q) => q.status === "in-progress").length,
      timeframe: "1-4 weeks",
      relationship: "one-to-many",
    },
    {
      id: "objective",
      gameTitle: "Objective",
      standardTitle: "Task",
      icon: "✅",
      color: "#047857",
      bgColor: "#D1FAE5",
      description:
        "Specific work items to complete. The concrete actions that move quests forward.",
      example: objectives[0]?.title || "Set up AI training pipeline",
      count: objectives.length,
      activeCount: objectives.filter((o) => o.status === "in-progress").length,
      timeframe: "1-3 days",
      relationship: "one-to-many",
    },
    {
      id: "action",
      gameTitle: "Action",
      standardTitle: "Sub-task",
      icon: "⚡",
      color: "#1D4ED8",
      bgColor: "#DBEAFE",
      description:
        "Atomic steps within objectives. The smallest trackable unit of work.",
      example: "Configure API endpoints",
      count: 0,
      timeframe: "Hours",
    },
  ]

  return (
    <Card
      sx={{
        mb: 4,
        background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
        border: "2px solid #4338CA",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ pb: expanded ? 3 : "16px !important" }}>
        {/* Header - Always visible */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                boxShadow: "0 4px 16px rgba(245, 158, 11, 0.4)",
              }}
            >
              🗺️
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#F8FAFC",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                Quest Hierarchy Guide
                <Tooltip title="Learn how the game-themed planning system works">
                  <HelpOutlineIcon
                    sx={{ fontSize: 18, color: "#A5B4FC", opacity: 0.8 }}
                  />
                </Tooltip>
              </Typography>
              <Typography variant="body2" sx={{ color: "#C7D2FE" }}>
                {expanded
                  ? "Understanding your planning structure from vision to action"
                  : "Click to explore the Legend → Campaign ↔ Storyline → Quest → Objective flow"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Mini preview when collapsed */}
            {!expanded && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 0.75,
                  alignItems: "center",
                }}
              >
                {hierarchyLevels.slice(0, 5).map((level, idx) => (
                  <Box
                    key={level.id}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Tooltip title={level.gameTitle}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          bgcolor: level.bgColor,
                          border: `2px solid ${level.color}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.95rem",
                          boxShadow: `0 2px 8px ${alpha(level.color, 0.3)}`,
                        }}
                      >
                        {level.icon}
                      </Box>
                    </Tooltip>
                    {idx < 4 && (
                      <Box
                        sx={{ mx: 0.5, display: "flex", alignItems: "center" }}
                      >
                        {idx === 1 ? (
                          <KeyboardDoubleArrowRightIcon
                            sx={{ fontSize: 18, color: "#A5B4FC" }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 12,
                              height: 2,
                              bgcolor: "#6366F1",
                              borderRadius: 1,
                            }}
                          />
                        )}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
            <IconButton size="small" sx={{ color: "#E0E7FF" }}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>

        {/* Expanded Content */}
        <Collapse in={expanded}>
          <Box sx={{ mt: 3 }}>
            {/* Terminology Legend */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                flexWrap: "wrap",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: alpha("#1E1B4B", 0.6),
                border: "1px solid #4338CA",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label="🎮 Game Term"
                  size="small"
                  sx={{
                    bgcolor: "#7C3AED",
                    color: "#FFFFFF",
                    fontWeight: 700,
                  }}
                />
                <Typography variant="body2" sx={{ color: "#A5B4FC" }}>
                  =
                </Typography>
                <Chip
                  label="📋 Standard Term"
                  size="small"
                  sx={{
                    bgcolor: "#475569",
                    color: "#F1F5F9",
                    fontWeight: 600,
                  }}
                />
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "#4338CA" }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <KeyboardDoubleArrowDownIcon
                  sx={{ fontSize: 18, color: "#A5B4FC" }}
                />
                <Typography variant="body2" sx={{ color: "#C7D2FE" }}>
                  Many-to-many (can belong to multiple)
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ArrowDownwardIcon sx={{ fontSize: 18, color: "#A5B4FC" }} />
                <Typography variant="body2" sx={{ color: "#C7D2FE" }}>
                  One-to-many relationship
                </Typography>
              </Box>
            </Box>

            {/* Hierarchy Levels */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {hierarchyLevels.map((level, index) => (
                <Box key={level.id}>
                  {/* Level Card */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2.5,
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: level.bgColor,
                      border: `2px solid ${level.color}`,
                      position: "relative",
                      transition: "all 0.2s ease",
                      boxShadow: `0 4px 12px ${alpha(level.color, 0.2)}`,
                      "&:hover": {
                        transform: "translateX(6px)",
                        boxShadow: `0 6px 20px ${alpha(level.color, 0.35)}`,
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: "#FFFFFF",
                        border: `3px solid ${level.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.75rem",
                        flexShrink: 0,
                        boxShadow: `0 2px 8px ${alpha(level.color, 0.25)}`,
                      }}
                    >
                      {level.icon}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 0.75,
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: level.color,
                          }}
                        >
                          {level.gameTitle}
                        </Typography>
                        <Chip
                          label={level.standardTitle}
                          size="small"
                          sx={{
                            bgcolor: alpha(level.color, 0.15),
                            color: level.color,
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            border: `1px solid ${alpha(level.color, 0.4)}`,
                          }}
                        />
                        <Chip
                          label={`⏱ ${level.timeframe}`}
                          size="small"
                          sx={{
                            bgcolor: "#FFFFFF",
                            color: "#1F2937",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            height: 22,
                            border: "1px solid #D1D5DB",
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#1F2937",
                          mb: 1.25,
                          fontWeight: 500,
                          lineHeight: 1.5,
                        }}
                      >
                        {level.description}
                      </Typography>

                      {/* Note for many-to-many relationships */}
                      {level.note && (
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.75,
                            bgcolor: alpha(level.color, 0.15),
                            border: `2px dashed ${level.color}`,
                            borderRadius: 1.5,
                            px: 1.5,
                            py: 0.75,
                            mb: 1.25,
                          }}
                        >
                          <KeyboardDoubleArrowDownIcon
                            sx={{ fontSize: 18, color: level.color }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: level.color,
                              fontWeight: 700,
                            }}
                          >
                            {level.note}
                          </Typography>
                        </Box>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Example */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#374151",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              fontSize: "0.65rem",
                            }}
                          >
                            Example:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#1F2937",
                              fontWeight: 600,
                              bgcolor: "#FFFFFF",
                              px: 1.25,
                              py: 0.5,
                              borderRadius: 1,
                              border: `1px solid ${alpha(level.color, 0.4)}`,
                              fontSize: "0.8rem",
                            }}
                          >
                            {level.example}
                          </Typography>
                        </Box>

                        {/* Stats */}
                        {level.count > 0 && (
                          <Chip
                            label={
                              level.activeCount !== undefined
                                ? `${level.activeCount} active / ${level.count} total`
                                : `${level.count} total`
                            }
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              bgcolor: "#FFFFFF",
                              color: "#1F2937",
                              border: `1px solid ${alpha(level.color, 0.5)}`,
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* Connector Arrow */}
                  {index < hierarchyLevels.length - 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 0.75,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: 3,
                            height: 16,
                            background: `linear-gradient(${level.color}, ${hierarchyLevels[index + 1].color})`,
                            borderRadius: 2,
                          }}
                        />
                        {/* Show different arrow for many-to-many vs one-to-many */}
                        {level.relationship === "many-to-many" ? (
                          <KeyboardDoubleArrowDownIcon
                            sx={{
                              fontSize: 24,
                              color: hierarchyLevels[index + 1].color,
                              mt: -0.5,
                              filter: `drop-shadow(0 2px 4px ${alpha(hierarchyLevels[index + 1].color, 0.4)})`,
                            }}
                          />
                        ) : (
                          <ArrowDownwardIcon
                            sx={{
                              fontSize: 22,
                              color: hierarchyLevels[index + 1].color,
                              mt: -0.25,
                              filter: `drop-shadow(0 2px 4px ${alpha(hierarchyLevels[index + 1].color, 0.4)})`,
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            {/* Footer Tips */}
            <Divider sx={{ my: 3, borderColor: "#4338CA" }} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: "#D1FAE5",
                  border: "2px solid #047857",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "#047857",
                    mb: 0.75,
                    fontSize: "0.95rem",
                  }}
                >
                  💡 Work Top-Down
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#065F46", fontWeight: 500 }}
                >
                  Start with your Legend, focus on active Campaigns, break
                  Quests into Objectives.
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: "#DBEAFE",
                  border: "2px solid #1D4ED8",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "#1D4ED8",
                    mb: 0.75,
                    fontSize: "0.95rem",
                  }}
                >
                  🎮 XP System
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#1E40AF", fontWeight: 500 }}
                >
                  Complete Objectives for XP. Finish Quests for bonus XP. Level
                  up your journey!
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: "#EDE9FE",
                  border: "2px solid #6D28D9",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "#6D28D9",
                    mb: 0.75,
                    fontSize: "0.95rem",
                  }}
                >
                  📖 Flexible Storylines
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#5B21B6", fontWeight: 500 }}
                >
                  Storylines can serve multiple Campaigns. e.g., "4Eye" supports
                  both Education & Marketing.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}
