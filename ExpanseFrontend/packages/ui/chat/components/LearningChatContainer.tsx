/**
 * LearningChatContainer Component
 *
 * Main container that composes all chat sub-components
 * Supports multiple layout variants: floating, sidebar, fullscreen, embedded
 * Includes time travel, message resend, reactions, and search capabilities
 */

"use client"

import React, { useCallback, useState, useRef, useEffect } from "react"
import { Box, Paper, useTheme } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"
import type { LearningChatContainerProps, LearningChatConfig } from "../types"
import { LearningChatHeader } from "./LearningChatHeader"
import { LearningChatMessageList } from "./LearningChatMessageList"
import { LearningChatInput } from "./LearningChatInput"
import { LearningChatTimeline } from "./LearningChatTimeline"
import { LearningChatSearch } from "./LearningChatSearch"
import { useLearningChat } from "../hooks/useChat"
import { useMessageSearch } from "../hooks/useMessageSearch"

const variantStyles: Record<LearningChatConfig["variant"], SxProps<Theme>> = {
  floating: {
    position: "fixed",
    bottom: 24,
    right: 24,
    width: 400,
    maxWidth: "calc(100vw - 48px)",
    height: 600,
    maxHeight: "calc(100vh - 48px)",
    borderRadius: 3,
    boxShadow: 8,
    zIndex: 1300,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  sidebar: {
    width: 380,
    height: "100%",
    borderRadius: 0,
    borderLeft: 1,
    borderColor: "divider",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  fullscreen: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    borderRadius: 0,
    zIndex: 1400,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  embedded: {
    width: "100%",
    height: "100%",
    minHeight: 400,
    borderRadius: 2,
    border: 1,
    borderColor: "divider",
    display: "flex",
    flexDirection: "row", // Changed to row to support timeline
    overflow: "hidden",
  },
}

export const LearningChatContainer: React.FC<LearningChatContainerProps> = ({
  config = {},
  initialMessages = [],
  onSend,
  onEvent,
  onClose,
  onMinimize,
  onExpand,
  header = {},
  input = {},
  showHeader = true,
  showInput = true,
  showTimeline = false,
  enableTimeTravel = true,
  enableResend = true,
  enableReactions = false,
  reactionEmojis,
  enableSearch = true,
  isOpen = true,
  isMinimized = false,
  sx,
  children,
}) => {
  const theme = useTheme()
  const [isTimelineOpen, setIsTimelineOpen] = useState(showTimeline)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState("")
  const messageListRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const chatConfig: LearningChatConfig = {
    variant: "embedded",
    ...config,
  }

  const {
    messages,
    isGenerating,
    sendMessage,
    stopGeneration,
    clearMessages,
    triggerEvent,
    revertToMessage,
    editAndResend,
    toggleReaction,
  } = useLearningChat({
    initialMessages,
    onSend,
    onEvent,
    enableTimeTravel,
    enableResend,
  })

  // Search functionality
  const search = useMessageSearch({ messages })

  // Keyboard shortcut for search (Ctrl/Cmd+F)
  useEffect(() => {
    if (!enableSearch) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault()
        search.openSearch()
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("keydown", handleKeyDown)
      return () => container.removeEventListener("keydown", handleKeyDown)
    }
    return undefined
  }, [enableSearch, search])

  const handleClear = useCallback(() => {
    clearMessages()
    search.closeSearch()
    triggerEvent("clear", "")
  }, [clearMessages, search, triggerEvent])

  const handleCopy = useCallback(
    (messageId: string) => {
      triggerEvent("copy", messageId)
    },
    [triggerEvent],
  )

  const handleFeedback = useCallback(
    (messageId: string, type: "positive" | "negative") => {
      triggerEvent(type === "positive" ? "thumbsUp" : "thumbsDown", messageId)
    },
    [triggerEvent],
  )

  const handleRegenerate = useCallback(
    (messageId: string) => {
      triggerEvent("regenerate", messageId)
    },
    [triggerEvent],
  )

  const handleTimelineToggle = useCallback(() => {
    setIsTimelineOpen((prev) => !prev)
  }, [])

  const handleTimelineMessageClick = useCallback(
    (messageId: string) => {
      // Scroll to the message in the message list
      const messageElement = document.getElementById(`message-${messageId}`)
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: "smooth", block: "center" })
        // Brief highlight effect
        messageElement.style.backgroundColor = theme.palette.action.selected
        setTimeout(() => {
          messageElement.style.backgroundColor = ""
        }, 1500)
      }
    },
    [theme],
  )

  const handleTimelineRevert = useCallback(
    (messageId: string) => {
      if (enableTimeTravel) {
        revertToMessage(messageId)
      }
    },
    [enableTimeTravel, revertToMessage],
  )

  const handleEdit = useCallback(
    (messageId: string) => {
      if (!enableResend) return
      const message = messages.find((m) => m.id === messageId)
      if (message && message.role === "user") {
        setEditingMessageId(messageId)
        setEditingContent(message.content)
      }
    },
    [messages, enableResend],
  )

  const handleCancelEdit = useCallback(() => {
    setEditingMessageId(null)
    setEditingContent("")
  }, [])

  const handleSendOrEdit = useCallback(
    async (content: string) => {
      if (editingMessageId) {
        await editAndResend(editingMessageId, content)
        setEditingMessageId(null)
        setEditingContent("")
      } else {
        await sendMessage(content)
      }
    },
    [editingMessageId, editAndResend, sendMessage],
  )

  const baseStyles = variantStyles[chatConfig.variant]

  // For floating variant, handle minimized state
  if (chatConfig.variant === "floating" && isMinimized) {
    return (
      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 400,
          maxWidth: "calc(100vw - 48px)",
          borderRadius: 3,
          zIndex: 1300,
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={onExpand}
      >
        <LearningChatHeader
          {...header}
          showMinimize={false}
          showClose={false}
          showExpand={true}
          onExpand={onExpand}
        />
      </Paper>
    )
  }

  // Don't render if closed (for floating variant)
  if (chatConfig.variant === "floating" && !isOpen) {
    return null
  }

  return (
    <Paper
      ref={containerRef}
      tabIndex={-1}
      elevation={chatConfig.variant === "floating" ? 8 : 0}
      sx={[
        baseStyles as Record<string, unknown>,
        { bgcolor: "background.paper", outline: "none" },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {/* Timeline - left side (or right for RTL) */}
      <LearningChatTimeline
        messages={messages}
        isOpen={isTimelineOpen}
        onToggle={handleTimelineToggle}
        onMessageClick={handleTimelineMessageClick}
        onRevert={handleTimelineRevert}
        enableTimeTravel={enableTimeTravel}
      />

      {/* Main chat area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0, // Prevent flex item from overflowing
          position: "relative",
        }}
      >
        {showHeader && (
          <LearningChatHeader
            {...header}
            showClose={
              chatConfig.variant === "floating" ||
              chatConfig.variant === "fullscreen"
            }
            showMinimize={chatConfig.variant === "floating"}
            showExpand={chatConfig.variant === "floating"}
            showClear={true}
            showTimeline={true}
            isTimelineOpen={isTimelineOpen}
            showSearch={enableSearch}
            onClose={onClose}
            onMinimize={onMinimize}
            onExpand={onExpand}
            onClear={handleClear}
            onTimelineToggle={handleTimelineToggle}
            onSearchToggle={search.openSearch}
          />
        )}

        {/* Search overlay */}
        {enableSearch && (
          <LearningChatSearch
            isOpen={search.isSearching}
            query={search.query}
            onQueryChange={search.setQuery}
            onClose={search.closeSearch}
            onNext={search.goToNext}
            onPrevious={search.goToPrevious}
            currentIndex={search.currentIndex}
            totalMatches={search.totalMatches}
          />
        )}

        <Box
          ref={messageListRef}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {children || (
            <LearningChatMessageList
              messages={messages}
              isTyping={isGenerating}
              onCopy={handleCopy}
              onFeedback={handleFeedback}
              onRegenerate={handleRegenerate}
              onEdit={handleEdit}
              enableResend={enableResend}
              enableReactions={enableReactions}
              reactionEmojis={reactionEmojis}
              onReactionToggle={toggleReaction}
              getSearchHighlights={search.getHighlightRanges}
              currentSearchMatchId={search.currentMatch?.messageId}
            />
          )}
        </Box>

        {showInput && (
          <LearningChatInput
            {...input}
            onSend={handleSendOrEdit}
            isLoading={isGenerating}
            onStop={stopGeneration}
            editingContent={editingContent}
            isEditing={!!editingMessageId}
            onCancelEdit={handleCancelEdit}
          />
        )}
      </Box>
    </Paper>
  )
}

/** @deprecated Use LearningChatContainer instead */
export const ChatContainer = LearningChatContainer

export default LearningChatContainer
