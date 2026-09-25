/**
 * LearningChatTimeline Component
 *
 * A toggleable timeline sidebar showing chat history with categorized message labels
 * Supports LTR (left-positioned) and RTL (right-positioned) layouts
 * Includes time travel feature to revert to previous messages
 */

"use client"

import React, { useMemo, useState } from "react"
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Drawer,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from "@mui/lab"
import HistoryIcon from "@mui/icons-material/History"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import RestoreIcon from "@mui/icons-material/Restore"
import VisibilityIcon from "@mui/icons-material/Visibility"
import type { LearningChatTimelineProps } from "../types"

/**
 * Generates a short label (1-3 words) from message content
 */
const generateLabel = (
  content: string,
  role: "user" | "assistant" | "system",
): string => {
  // Remove markdown formatting
  const cleaned = content
    .replace(/```[\s\S]*?```/g, "[code]") // Replace code blocks
    .replace(/`[^`]+`/g, "[code]") // Replace inline code
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
    .replace(/\*([^*]+)\*/g, "$1") // Remove italic
    .replace(/#+\s*/g, "") // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Extract link text
    .replace(/[-*]\s+/g, "") // Remove list markers
    .trim()

  // Get first meaningful words
  const words = cleaned.split(/\s+/).filter((w) => w.length > 0)

  if (words.length === 0) {
    return role === "user" ? "Question" : "Response"
  }

  // For user messages, try to identify intent
  if (role === "user") {
    const firstWord = words[0].toLowerCase()
    if (
      [
        "what",
        "how",
        "why",
        "when",
        "where",
        "who",
        "can",
        "could",
        "would",
        "is",
        "are",
        "do",
        "does",
      ].includes(firstWord)
    ) {
      // It's a question - take first 3 meaningful words
      const meaningful = words.slice(0, 4).join(" ")
      if (meaningful.length > 25) {
        return words.slice(0, 2).join(" ") + "..."
      }
      return meaningful.length > 20
        ? meaningful.slice(0, 20) + "..."
        : meaningful
    }
  }

  // For assistant, look for key topics
  if (role === "assistant") {
    // Check for code explanation
    if (content.includes("```")) {
      return "Code Example"
    }
    // Check for list/features
    if (content.includes("- ") || content.includes("* ")) {
      return "Listed Items"
    }
  }

  // Default: first 2-3 words
  const label = words.slice(0, 3).join(" ")
  if (label.length > 20) {
    return words.slice(0, 2).join(" ") + "..."
  }
  return label
}

/**
 * Format timestamp for timeline display
 */
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export const LearningChatTimeline: React.FC<LearningChatTimelineProps> = ({
  messages,
  isOpen,
  onToggle,
  width = 240,
  onMessageClick,
  onRevert,
  enableTimeTravel = true,
}) => {
  const theme = useTheme()
  const isRtl = theme.direction === "rtl"
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
    messageId: string
  } | null>(null)

  const handleContextMenu = (event: React.MouseEvent, messageId: string) => {
    if (!enableTimeTravel) return
    event.preventDefault()
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      messageId,
    })
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  const handleRevert = () => {
    if (contextMenu) {
      onRevert?.(contextMenu.messageId)
      handleCloseContextMenu()
    }
  }

  const handleView = () => {
    if (contextMenu) {
      onMessageClick?.(contextMenu.messageId)
      handleCloseContextMenu()
    }
  }

  const timelineItems = useMemo(() => {
    return messages.map((message) => ({
      id: message.id,
      label: generateLabel(message.content, message.role),
      role: message.role,
      time: formatTime(message.timestamp),
      status: message.status,
    }))
  }, [messages])

  return (
    <Drawer
      anchor={isRtl ? "right" : "left"}
      open={isOpen}
      onClose={onToggle}
      variant="persistent"
      sx={{
        width: isOpen ? width : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          position: "relative",
          boxSizing: "border-box",
          borderRight: isRtl ? "none" : 1,
          borderLeft: isRtl ? 1 : "none",
          borderColor: "divider",
          bgcolor: "background.default",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.5,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HistoryIcon sx={{ fontSize: 20, color: "text.secondary" }} />
          <Typography variant="subtitle2" fontWeight={600}>
            History
          </Typography>
        </Box>
        <IconButton size="small" onClick={onToggle}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Timeline */}
      <Box sx={{ overflow: "auto", flex: 1, py: 1 }}>
        {messages.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", py: 4, px: 2 }}
          >
            No messages yet
          </Typography>
        ) : (
          <Timeline
            sx={{
              p: 0,
              m: 0,
              // Position timeline on the left (or right for RTL)
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                sx={{
                  minHeight: 60,
                  cursor: onMessageClick ? "pointer" : "default",
                  "&:hover": onMessageClick
                    ? {
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }
                    : undefined,
                }}
                onClick={() => onMessageClick?.(item.id)}
                onContextMenu={(e) => handleContextMenu(e, item.id)}
              >
                <TimelineSeparator>
                  <TimelineDot
                    color={item.role === "user" ? "secondary" : "primary"}
                    variant={
                      item.status === "streaming" ? "outlined" : "filled"
                    }
                    sx={{
                      my: 0,
                      boxShadow: "none",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.role === "user" ? (
                      <PersonIcon sx={{ fontSize: 14 }} />
                    ) : (
                      <SmartToyIcon sx={{ fontSize: 14 }} />
                    )}
                  </TimelineDot>
                  {index < timelineItems.length - 1 && (
                    <TimelineConnector sx={{ bgcolor: "divider" }} />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ py: 0.5, px: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{
                        lineHeight: 1.3,
                        color:
                          item.status === "error"
                            ? "error.main"
                            : "text.primary",
                        flex: 1,
                      }}
                    >
                      {item.label}
                    </Typography>
                    {enableTimeTravel && (
                      <Tooltip title="Revert to this point">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            onRevert?.(item.id)
                          }}
                          sx={{
                            opacity: 0,
                            transition: "opacity 0.2s",
                            ".MuiTimelineItem-root:hover &": { opacity: 1 },
                            p: 0.25,
                          }}
                        >
                          <RestoreIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {item.time}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </Box>

      {/* Context menu for time travel */}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View message</ListItemText>
        </MenuItem>
        {enableTimeTravel && (
          <MenuItem onClick={handleRevert}>
            <ListItemIcon>
              <RestoreIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Revert to this point</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Drawer>
  )
}

/**
 * Toggle button for the timeline - can be placed in LearningChatHeader
 */
export const LearningChatTimelineToggle: React.FC<{
  isOpen: boolean
  onToggle: () => void
}> = ({ isOpen, onToggle }) => {
  return (
    <Tooltip title={isOpen ? "Hide history" : "Show history"}>
      <IconButton size="small" onClick={onToggle}>
        <HistoryIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Tooltip>
  )
}

/** @deprecated Use LearningChatTimeline instead */
export const ChatTimeline = LearningChatTimeline

/** @deprecated Use LearningChatTimelineToggle instead */
export const ChatTimelineToggle = LearningChatTimelineToggle

export default LearningChatTimeline
