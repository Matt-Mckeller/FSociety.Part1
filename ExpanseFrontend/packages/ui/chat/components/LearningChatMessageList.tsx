/**
 * LearningChatMessageList Component
 *
 * Scrollable list of chat messages with edit support
 */

"use client"

import React, { useRef, useEffect } from "react"
import { Box } from "@mui/material"
import { LearningChatMessageBubble } from "./LearningChatMessageBubble"
import { LearningChatTypingIndicator } from "./LearningChatTypingIndicator"
import { DEFAULT_REACTION_EMOJIS } from "./LearningChatReactions"
import type { LearningChatMessageListProps } from "../types"

export const LearningChatMessageList: React.FC<
  LearningChatMessageListProps
> = ({
  messages,
  isTyping = false,
  userAvatar,
  assistantAvatar,
  showActions = true,
  onCopy,
  onFeedback,
  onRegenerate,
  onEdit,
  enableResend = true,
  enableReactions = false,
  reactionEmojis = DEFAULT_REACTION_EMOJIS,
  onReactionToggle,
  getSearchHighlights,
  currentSearchMatchId,
  sx,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  return (
    <Box
      ref={containerRef}
      sx={{
        flexGrow: 1,
        overflow: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        ...sx,
      }}
    >
      {messages.map((message) => (
        <LearningChatMessageBubble
          key={message.id}
          message={message}
          userAvatar={userAvatar}
          assistantAvatar={assistantAvatar}
          showActions={showActions}
          onCopy={onCopy}
          onFeedback={onFeedback}
          onRegenerate={onRegenerate}
          onEdit={onEdit}
          enableResend={enableResend}
          isStreaming={message.status === "streaming"}
          enableReactions={enableReactions}
          reactionEmojis={reactionEmojis}
          onReactionToggle={onReactionToggle}
          searchHighlights={getSearchHighlights?.(message.id) ?? []}
          isCurrentSearchMatch={currentSearchMatchId === message.id}
        />
      ))}
      {isTyping && messages[messages.length - 1]?.status !== "streaming" && (
        <LearningChatTypingIndicator />
      )}
      <div ref={bottomRef} />
    </Box>
  )
}

/** @deprecated Use LearningChatMessageList instead */
export const MessageList = LearningChatMessageList

export default LearningChatMessageList
