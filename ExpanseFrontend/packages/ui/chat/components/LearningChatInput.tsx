/**
 * LearningChatInput Component
 *
 * Text input with send button, suggested prompts, and message editing support
 */

"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  Box,
  TextField,
  IconButton,
  Chip,
  InputAdornment,
  Tooltip,
  Button,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import StopIcon from "@mui/icons-material/Stop"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import type { LearningChatInputProps } from "../types"

export const LearningChatInput: React.FC<LearningChatInputProps> = ({
  placeholder = "Type a message...",
  disabled = false,
  onSend,
  onStop,
  isLoading = false,
  suggestedPrompts = [],
  onSuggestionClick,
  editingContent,
  isEditing = false,
  onCancelEdit,
  sx,
}) => {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // When editing mode is activated, populate with the editing content
  useEffect(() => {
    if (isEditing && editingContent) {
      setValue(editingContent)
      inputRef.current?.focus()
    }
  }, [isEditing, editingContent])

  const handleSend = () => {
    if (value.trim() && !disabled && !isLoading) {
      onSend(value.trim())
      setValue("")
    }
  }

  const handleCancel = () => {
    setValue("")
    onCancelEdit?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    if (e.key === "Escape" && isEditing) {
      handleCancel()
    }
  }

  const handleSuggestionClick = (prompt: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(prompt)
    } else {
      setValue(prompt)
      inputRef.current?.focus()
    }
  }

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <Box sx={{ p: 2, borderTop: 1, borderColor: "divider", ...sx }}>
      {/* Editing indicator */}
      {isEditing && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
            px: 1,
            py: 0.5,
            bgcolor: "warning.light",
            borderRadius: 1,
          }}
        >
          <EditIcon sx={{ fontSize: 16 }} />
          <Box sx={{ flex: 1, fontSize: 14 }}>Editing message</Box>
          <IconButton size="small" onClick={handleCancel}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}

      {/* Suggested prompts */}
      {suggestedPrompts.length > 0 && !isLoading && !isEditing && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          {suggestedPrompts.map((prompt, index) => (
            <Chip
              key={index}
              label={prompt}
              variant="outlined"
              size="small"
              onClick={() => handleSuggestionClick(prompt)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Input field */}
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        maxRows={4}
        placeholder={isEditing ? "Edit your message..." : placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        InputProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "background.paper",
          },
          endAdornment: (
            <InputAdornment position="end">
              {isLoading ? (
                <Tooltip title="Stop generating">
                  <IconButton
                    onClick={onStop}
                    color="error"
                    sx={{
                      bgcolor: "error.main",
                      color: "error.contrastText",
                      "&:hover": {
                        bgcolor: "error.dark",
                      },
                    }}
                  >
                    <StopIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Send message">
                  <span>
                    <IconButton
                      onClick={handleSend}
                      disabled={!value.trim() || disabled}
                      color="primary"
                      sx={{
                        bgcolor: value.trim() ? "primary.main" : "transparent",
                        color: value.trim()
                          ? "primary.contrastText"
                          : "action.disabled",
                        "&:hover": {
                          bgcolor: value.trim()
                            ? "primary.dark"
                            : "transparent",
                        },
                        "&.Mui-disabled": {
                          bgcolor: "transparent",
                        },
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

/** @deprecated Use LearningChatInput instead */
export const ChatInput = LearningChatInput

export default LearningChatInput
