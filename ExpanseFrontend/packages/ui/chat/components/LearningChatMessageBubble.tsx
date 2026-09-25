/**
 * LearningChatMessageBubble Component
 *
 * Individual chat message with optional markdown rendering and edit support
 */

"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Paper,
  Fade,
} from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import PersonIcon from "@mui/icons-material/Person"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import CheckIcon from "@mui/icons-material/Check"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined"
import RefreshIcon from "@mui/icons-material/Refresh"
import EditIcon from "@mui/icons-material/Edit"
import type { LearningChatMessageBubbleProps } from "../types"
import { LearningChatMarkdownRenderer } from "./LearningChatMarkdownRenderer"
import {
  LearningChatReactions,
  DEFAULT_REACTION_EMOJIS,
} from "./LearningChatReactions"
import { LearningChatHighlightedText } from "./LearningChatHighlightedText"

export const LearningChatMessageBubble: React.FC<
  LearningChatMessageBubbleProps
> = ({
  message,
  userAvatar,
  assistantAvatar,
  showTimestamp = false,
  enableMarkdown = true,
  showActions = true,
  onCopy,
  onFeedback,
  onRegenerate,
  onEdit,
  enableResend = true,
  isStreaming = false,
  enableReactions = false,
  reactionEmojis = DEFAULT_REACTION_EMOJIS,
  onReactionToggle,
  searchHighlights = [],
  isCurrentSearchMatch = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    onCopy?.(message.id)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFeedback = (type: "positive" | "negative") => {
    onFeedback?.(message.id, type)
  }

  const handleRegenerate = () => {
    onRegenerate?.(message.id)
  }

  const handleEdit = () => {
    onEdit?.(message.id)
  }

  const handleReactionToggle = (emoji: string) => {
    onReactionToggle?.(message.id, emoji)
  }

  const avatar = isUser ? userAvatar : assistantAvatar

  const defaultAvatar = isUser ? (
    <Avatar
      sx={{
        width: 32,
        height: 32,
        bgcolor: "secondary.main",
      }}
    >
      <PersonIcon sx={{ fontSize: 18 }} />
    </Avatar>
  ) : (
    <Avatar
      sx={{
        width: 32,
        height: 32,
        bgcolor: "primary.main",
      }}
    >
      <SmartToyIcon sx={{ fontSize: 18 }} />
    </Avatar>
  )

  const renderAvatar = () => {
    if (avatar) {
      if (React.isValidElement(avatar)) {
        return (
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: isUser ? "secondary.main" : "primary.main",
            }}
          >
            {avatar}
          </Avatar>
        )
      }
      return avatar
    }
    return defaultAvatar
  }

  return (
    <Box
      id={`message-${message.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 1.5,
        p: 1,
        "&:hover": {
          bgcolor: "action.hover",
          borderRadius: 2,
        },
      }}
    >
      {renderAvatar()}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
          maxWidth: "80%",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: isUser ? "primary.main" : "background.paper",
            color: isUser ? "primary.contrastText" : "text.primary",
            borderRadius: 2,
            borderTopLeftRadius: isUser ? 16 : 4,
            borderTopRightRadius: isUser ? 4 : 16,
            border: isUser ? "none" : 1,
            borderColor: isCurrentSearchMatch ? "warning.main" : "divider",
            boxShadow: isCurrentSearchMatch ? "0 0 0 2px" : "none",
            position: "relative",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        >
          {enableMarkdown && !isUser ? (
            <LearningChatMarkdownRenderer
              content={message.content}
              isStreaming={isStreaming}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {searchHighlights.length > 0 ? (
                <LearningChatHighlightedText
                  text={message.content}
                  highlights={searchHighlights}
                  isCurrentMatch={isCurrentSearchMatch}
                />
              ) : (
                message.content
              )}
              {isStreaming && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 8,
                    height: 16,
                    bgcolor: "text.primary",
                    ml: 0.5,
                    animation: "blink 1s infinite",
                    "@keyframes blink": {
                      "0%, 50%": { opacity: 1 },
                      "51%, 100%": { opacity: 0 },
                    },
                  }}
                />
              )}
            </Typography>
          )}
        </Paper>

        {/* Timestamp */}
        {showTimestamp && message.status === "complete" && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, px: 1 }}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        )}

        {/* Actions for assistant messages */}
        {showActions && !isUser && (
          <Fade in={isHovered && message.status === "complete"}>
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                mt: 0.5,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.2s",
              }}
            >
              <Tooltip title={copied ? "Copied!" : "Copy"}>
                <IconButton size="small" onClick={handleCopy}>
                  {copied ? (
                    <CheckIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <ContentCopyIcon sx={{ fontSize: 16 }} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Good response">
                <IconButton
                  size="small"
                  onClick={() => handleFeedback("positive")}
                >
                  <ThumbUpOutlinedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Bad response">
                <IconButton
                  size="small"
                  onClick={() => handleFeedback("negative")}
                >
                  <ThumbDownOutlinedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Regenerate">
                <IconButton size="small" onClick={handleRegenerate}>
                  <RefreshIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Fade>
        )}

        {/* Edit action for user messages */}
        {showActions && isUser && enableResend && (
          <Fade in={isHovered && message.status === "complete"}>
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                mt: 0.5,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.2s",
              }}
            >
              <Tooltip title="Edit and resend">
                <IconButton size="small" onClick={handleEdit}>
                  <EditIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Fade>
        )}

        {/* Reactions */}
        {enableReactions && message.status === "complete" && (
          <LearningChatReactions
            reactions={message.reactions}
            reactionEmojis={reactionEmojis}
            onReactionToggle={handleReactionToggle}
            showPicker={isHovered}
            size="small"
          />
        )}
      </Box>
    </Box>
  )
}

/** @deprecated Use LearningChatMessageBubble instead */
export const MessageBubble = LearningChatMessageBubble

export default LearningChatMessageBubble
