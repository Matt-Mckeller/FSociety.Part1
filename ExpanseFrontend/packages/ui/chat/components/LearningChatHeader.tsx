/**
 * LearningChatHeader Component
 *
 * Header for the learning chat interface with title and controls
 */

"use client"

import React from "react"
import { Box, Typography, IconButton, Avatar, Tooltip } from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import CloseIcon from "@mui/icons-material/Close"
import MinimizeIcon from "@mui/icons-material/Minimize"
import OpenInFullIcon from "@mui/icons-material/OpenInFull"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import HistoryIcon from "@mui/icons-material/History"
import SearchIcon from "@mui/icons-material/Search"
import type { LearningChatHeaderProps } from "../types"

export const LearningChatHeader: React.FC<LearningChatHeaderProps> = ({
  title = "AI Assistant",
  subtitle,
  avatar,
  showClose = false,
  showMinimize = false,
  showExpand = false,
  showClear = true,
  showTimeline = false,
  isTimelineOpen = false,
  showSearch = false,
  onClose,
  onMinimize,
  onExpand,
  onClear,
  onTimelineToggle,
  onSearchToggle,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {/* Timeline toggle button - left side */}
        {showTimeline && (
          <Tooltip title={isTimelineOpen ? "Hide history" : "Show history"}>
            <IconButton
              size="small"
              onClick={onTimelineToggle}
              sx={{
                bgcolor: isTimelineOpen ? "action.selected" : "transparent",
                mr: 0.5,
              }}
            >
              <HistoryIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {avatar || (
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "primary.main",
            }}
          >
            <SmartToyIcon />
          </Avatar>
        )}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 0.5 }}>
        {showSearch && (
          <Tooltip title="Search (Ctrl+F)">
            <IconButton size="small" onClick={onSearchToggle}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {showClear && (
          <Tooltip title="Clear chat">
            <IconButton size="small" onClick={onClear}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {showExpand && (
          <Tooltip title="Expand">
            <IconButton size="small" onClick={onExpand}>
              <OpenInFullIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {showMinimize && (
          <Tooltip title="Minimize">
            <IconButton size="small" onClick={onMinimize}>
              <MinimizeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {showClose && (
          <Tooltip title="Close">
            <IconButton size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}

/** @deprecated Use LearningChatHeader instead */
export const ChatHeader = LearningChatHeader

export default LearningChatHeader
