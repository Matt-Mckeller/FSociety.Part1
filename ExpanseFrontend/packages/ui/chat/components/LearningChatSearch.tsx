/**
 * LearningChatSearch Component
 *
 * Instant search bar with keyboard navigation and live highlighting
 */

"use client"

import React, { useRef, useEffect, useCallback } from "react"
import {
  Box,
  InputBase,
  IconButton,
  Typography,
  Paper,
  Fade,
  Chip,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

export interface LearningChatSearchProps {
  /** Whether search is open */
  isOpen: boolean
  /** Current search query */
  query: string
  /** Handle query change */
  onQueryChange: (query: string) => void
  /** Close search */
  onClose: () => void
  /** Go to next match */
  onNext: () => void
  /** Go to previous match */
  onPrevious: () => void
  /** Current match index (0-based) */
  currentIndex: number
  /** Total matches */
  totalMatches: number
}

export const LearningChatSearch: React.FC<LearningChatSearchProps> = ({
  isOpen,
  query,
  onQueryChange,
  onClose,
  onNext,
  onPrevious,
  currentIndex,
  totalMatches,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure element is mounted
      const timer = setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 50)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [isOpen])

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (e.shiftKey) {
          onPrevious()
        } else {
          onNext()
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        onNext()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        onPrevious()
      }
    },
    [onClose, onNext, onPrevious],
  )

  if (!isOpen) return null

  const hasResults = totalMatches > 0
  const hasQuery = query.length > 0

  return (
    <Fade in={isOpen}>
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          left: 8,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.75,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: 1,
          borderColor: hasQuery && !hasResults ? "warning.main" : "divider",
        }}
      >
        <SearchIcon
          sx={{
            color: hasQuery && !hasResults ? "warning.main" : "action.active",
            fontSize: 20,
          }}
        />

        <InputBase
          inputRef={inputRef}
          placeholder="Search messages... (Enter for next, Esc to close)"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            flex: 1,
            fontSize: "0.875rem",
            "& input": {
              p: 0,
            },
          }}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />

        {/* Results indicator */}
        {hasQuery && (
          <Chip
            size="small"
            label={
              hasResults
                ? `${currentIndex + 1} of ${totalMatches}`
                : "No matches"
            }
            color={hasResults ? "primary" : "warning"}
            variant={hasResults ? "filled" : "outlined"}
            sx={{
              height: 24,
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          />
        )}

        {/* Navigation arrows */}
        {hasResults && (
          <Box sx={{ display: "flex", gap: 0.25 }}>
            <IconButton
              size="small"
              onClick={onPrevious}
              title="Previous (Shift+Enter or ↑)"
              sx={{ p: 0.5 }}
            >
              <KeyboardArrowUpIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={onNext}
              title="Next (Enter or ↓)"
              sx={{ p: 0.5 }}
            >
              <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        )}

        {/* Close button */}
        <IconButton
          size="small"
          onClick={onClose}
          title="Close (Esc)"
          sx={{ p: 0.5 }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Paper>
    </Fade>
  )
}

export default LearningChatSearch
