/**
 * LearningChatReactions Component
 *
 * Display and manage emoji reactions on chat messages
 */

"use client"

import React, { useState } from "react"
import { Box, Chip, IconButton, Popover, Tooltip, Fade } from "@mui/material"
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined"
import type { MessageReaction } from "../types"

/** Default emoji reactions */
export const DEFAULT_REACTION_EMOJIS = ["👍", "❤️", "😂", "🤔", "👏", "🎉"]

export interface LearningChatReactionsProps {
  /** Current reactions on the message */
  reactions?: MessageReaction[]
  /** Available reaction emojis */
  reactionEmojis?: string[]
  /** Handler when a reaction is toggled */
  onReactionToggle?: (emoji: string) => void
  /** Whether the reaction picker should be visible */
  showPicker?: boolean
  /** Size variant */
  size?: "small" | "medium"
}

export const LearningChatReactions: React.FC<LearningChatReactionsProps> = ({
  reactions = [],
  reactionEmojis = DEFAULT_REACTION_EMOJIS,
  onReactionToggle,
  showPicker = true,
  size = "small",
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePicker = () => {
    setAnchorEl(null)
  }

  const handleReactionClick = (emoji: string) => {
    onReactionToggle?.(emoji)
    handleClosePicker()
  }

  const hasReactions = reactions.length > 0

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 0.5,
        mt: hasReactions ? 0.5 : 0,
      }}
    >
      {/* Existing reactions */}
      {reactions.map((reaction) => (
        <Tooltip
          key={reaction.emoji}
          title={reaction.userReacted ? "Remove reaction" : "Add reaction"}
        >
          <Chip
            label={`${reaction.emoji} ${reaction.count}`}
            size={size}
            variant={reaction.userReacted ? "filled" : "outlined"}
            onClick={() => onReactionToggle?.(reaction.emoji)}
            sx={{
              cursor: "pointer",
              bgcolor: reaction.userReacted ? "primary.light" : "transparent",
              borderColor: reaction.userReacted ? "primary.main" : "divider",
              color: reaction.userReacted
                ? "primary.contrastText"
                : "text.primary",
              "&:hover": {
                bgcolor: reaction.userReacted ? "primary.main" : "action.hover",
              },
              fontSize: size === "small" ? "0.75rem" : "0.875rem",
              height: size === "small" ? 24 : 28,
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        </Tooltip>
      ))}

      {/* Add reaction button */}
      {showPicker && (
        <>
          <Tooltip title="Add reaction">
            <IconButton
              size={size}
              onClick={handleOpenPicker}
              sx={{
                opacity: hasReactions ? 1 : 0.6,
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <AddReactionOutlinedIcon
                sx={{ fontSize: size === "small" ? 16 : 20 }}
              />
            </IconButton>
          </Tooltip>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePicker}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            TransitionComponent={Fade}
          >
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                p: 1,
                bgcolor: "background.paper",
              }}
            >
              {reactionEmojis.map((emoji) => {
                const existingReaction = reactions.find(
                  (r) => r.emoji === emoji,
                )
                const isSelected = existingReaction?.userReacted ?? false

                return (
                  <Tooltip key={emoji} title={isSelected ? "Remove" : "React"}>
                    <IconButton
                      size="small"
                      onClick={() => handleReactionClick(emoji)}
                      sx={{
                        fontSize: "1.25rem",
                        bgcolor: isSelected ? "primary.light" : "transparent",
                        "&:hover": {
                          bgcolor: isSelected ? "primary.main" : "action.hover",
                          transform: "scale(1.2)",
                        },
                        transition: "transform 0.1s ease-in-out",
                      }}
                    >
                      {emoji}
                    </IconButton>
                  </Tooltip>
                )
              })}
            </Box>
          </Popover>
        </>
      )}
    </Box>
  )
}

export default LearningChatReactions
