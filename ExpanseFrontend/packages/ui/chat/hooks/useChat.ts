/**
 * useLearningChat Hook
 *
 * Manages chat state with streaming, time travel, and resend support
 */

"use client"

import { useState, useCallback, useRef } from "react"
import type {
  LearningChatMessage,
  LearningChatEvent,
  LearningChatEventType,
  UseLearningChatOptions,
  UseLearningChatReturn,
  StreamToken,
} from "../types"

const generateId = () => Math.random().toString(36).substring(2, 11)

export const useLearningChat = (
  options: UseLearningChatOptions = {},
): UseLearningChatReturn => {
  const {
    initialMessages = [],
    onSend,
    onEvent,
    autoScroll = true,
    enableTimeTravel = true,
    enableResend = true,
  } = options

  const [messages, setMessages] =
    useState<LearningChatMessage[]>(initialMessages)
  const [isGenerating, setIsGenerating] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const addMessage = useCallback(
    (message: Omit<LearningChatMessage, "id" | "timestamp">) => {
      const newMessage: LearningChatMessage = {
        ...message,
        id: generateId(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      return newMessage.id
    },
    [],
  )

  const updateMessage = useCallback(
    (id: string, updates: Partial<LearningChatMessage>) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg)),
      )
    },
    [],
  )

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isGenerating) return

      // Add user message
      const userMessageId = addMessage({
        role: "user",
        content: content.trim(),
        status: "complete",
      })

      if (!onSend) {
        // If no onSend handler, just add a placeholder response
        addMessage({
          role: "assistant",
          content:
            "I'm a demo assistant. Connect me to a backend to get real responses!",
          status: "complete",
        })
        return
      }

      setIsGenerating(true)
      abortControllerRef.current = new AbortController()

      // Add assistant message placeholder
      const assistantMessageId = addMessage({
        role: "assistant",
        content: "",
        status: "streaming",
      })

      try {
        const response = await onSend(content, messages)

        if (typeof response === "string") {
          // Non-streaming response
          updateMessage(assistantMessageId, {
            content: response,
            status: "complete",
          })
        } else {
          // Streaming response
          let fullContent = ""

          for await (const token of response) {
            if (abortControllerRef.current?.signal.aborted) {
              break
            }

            fullContent += token.content
            updateMessage(assistantMessageId, {
              content: fullContent,
              status: token.done ? "complete" : "streaming",
            })

            if (token.done) {
              break
            }
          }

          updateMessage(assistantMessageId, {
            content: fullContent,
            status: "complete",
          })
        }
      } catch (error) {
        console.error("Chat error:", error)
        updateMessage(assistantMessageId, {
          content: "Sorry, an error occurred. Please try again.",
          status: "error",
        })
      } finally {
        setIsGenerating(false)
        abortControllerRef.current = null
      }
    },
    [messages, isGenerating, onSend, addMessage, updateMessage],
  )

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsGenerating(false)

      // Mark the last streaming message as complete
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1]
        if (lastMessage?.status === "streaming") {
          return prev.map((msg, i) =>
            i === prev.length - 1
              ? { ...msg, status: "complete" as const }
              : msg,
          )
        }
        return prev
      })
    }
  }, [])

  const retryLastMessage = useCallback(async () => {
    if (isGenerating) return

    // Find the last user message
    const lastUserMessageIndex = [...messages]
      .reverse()
      .findIndex((msg) => msg.role === "user")

    if (lastUserMessageIndex === -1) return

    const actualIndex = messages.length - 1 - lastUserMessageIndex
    const lastUserMessage = messages[actualIndex]

    // Remove messages after the last user message
    setMessages((prev) => prev.slice(0, actualIndex + 1))

    // Resend the message
    if (onSend) {
      setIsGenerating(true)
      abortControllerRef.current = new AbortController()

      const assistantMessageId = addMessage({
        role: "assistant",
        content: "",
        status: "streaming",
      })

      try {
        const response = await onSend(
          lastUserMessage.content,
          messages.slice(0, actualIndex),
        )

        if (typeof response === "string") {
          updateMessage(assistantMessageId, {
            content: response,
            status: "complete",
          })
        } else {
          let fullContent = ""

          for await (const token of response) {
            if (abortControllerRef.current?.signal.aborted) {
              break
            }

            fullContent += token.content
            updateMessage(assistantMessageId, {
              content: fullContent,
              status: token.done ? "complete" : "streaming",
            })

            if (token.done) {
              break
            }
          }

          updateMessage(assistantMessageId, {
            content: fullContent,
            status: "complete",
          })
        }
      } catch (error) {
        console.error("Retry error:", error)
        updateMessage(assistantMessageId, {
          content: "Sorry, an error occurred. Please try again.",
          status: "error",
        })
      } finally {
        setIsGenerating(false)
        abortControllerRef.current = null
      }
    }
  }, [messages, isGenerating, onSend, addMessage, updateMessage])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const triggerEvent = useCallback(
    (
      type: LearningChatEventType,
      messageId: string,
      payload?: Record<string, unknown>,
    ) => {
      const event: LearningChatEvent = {
        type,
        messageId,
        payload,
        timestamp: new Date(),
      }
      onEvent?.(event)
    },
    [onEvent],
  )

  /**
   * Get messages up to (and including) a specific message ID
   * Useful for time travel preview
   */
  const getMessagesUntil = useCallback(
    (messageId: string): LearningChatMessage[] => {
      const messageIndex = messages.findIndex((msg) => msg.id === messageId)
      if (messageIndex === -1) return messages
      return messages.slice(0, messageIndex + 1)
    },
    [messages],
  )

  /**
   * Revert to a specific message (time travel)
   * Removes all messages after the specified message
   */
  const revertToMessage = useCallback(
    (messageId: string) => {
      if (!enableTimeTravel) return

      const messageIndex = messages.findIndex((msg) => msg.id === messageId)
      if (messageIndex === -1) return

      setMessages((prev) => prev.slice(0, messageIndex + 1))
      triggerEvent("revert", messageId)
    },
    [messages, enableTimeTravel, triggerEvent],
  )

  /**
   * Edit a user message and resend it
   * Reverts to before the message, then sends new content
   */
  const editAndResend = useCallback(
    async (messageId: string, newContent: string) => {
      if (!enableResend || isGenerating) return

      const messageIndex = messages.findIndex((msg) => msg.id === messageId)
      if (messageIndex === -1) return

      const originalMessage = messages[messageIndex]
      if (originalMessage.role !== "user") return

      // Remove this message and all after it
      const previousMessages = messages.slice(0, messageIndex)
      setMessages(previousMessages)

      triggerEvent("edit", messageId, {
        originalContent: originalMessage.content,
        newContent,
      })

      // Now send the new message
      const userMessageId = addMessage({
        role: "user",
        content: newContent.trim(),
        status: "complete",
      })

      if (!onSend) {
        addMessage({
          role: "assistant",
          content:
            "I'm a demo assistant. Connect me to a backend to get real responses!",
          status: "complete",
        })
        return
      }

      setIsGenerating(true)
      abortControllerRef.current = new AbortController()

      const assistantMessageId = addMessage({
        role: "assistant",
        content: "",
        status: "streaming",
      })

      try {
        const response = await onSend(newContent, previousMessages)

        if (typeof response === "string") {
          updateMessage(assistantMessageId, {
            content: response,
            status: "complete",
          })
        } else {
          let fullContent = ""

          for await (const token of response) {
            if (abortControllerRef.current?.signal.aborted) {
              break
            }

            fullContent += token.content
            updateMessage(assistantMessageId, {
              content: fullContent,
              status: token.done ? "complete" : "streaming",
            })

            if (token.done) {
              break
            }
          }

          updateMessage(assistantMessageId, {
            content: fullContent,
            status: "complete",
          })
        }
      } catch (error) {
        console.error("Edit and resend error:", error)
        updateMessage(assistantMessageId, {
          content: "Sorry, an error occurred. Please try again.",
          status: "error",
        })
      } finally {
        setIsGenerating(false)
        abortControllerRef.current = null
      }
    },
    [
      messages,
      isGenerating,
      enableResend,
      onSend,
      addMessage,
      updateMessage,
      triggerEvent,
    ],
  )

  /**
   * Toggle a reaction on a message
   * Adds the reaction if not present, removes if user already reacted
   */
  const toggleReaction = useCallback(
    (messageId: string, emoji: string) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id !== messageId) return msg

          const existingReactions = msg.reactions || []
          const reactionIndex = existingReactions.findIndex(
            (r) => r.emoji === emoji,
          )

          let newReactions

          if (reactionIndex === -1) {
            // Add new reaction
            newReactions = [
              ...existingReactions,
              { emoji, count: 1, userReacted: true },
            ]
          } else {
            const existingReaction = existingReactions[reactionIndex]
            if (existingReaction.userReacted) {
              // Remove user's reaction
              if (existingReaction.count <= 1) {
                // Remove reaction entirely if count would be 0
                newReactions = existingReactions.filter(
                  (r) => r.emoji !== emoji,
                )
              } else {
                // Decrement count
                newReactions = existingReactions.map((r) =>
                  r.emoji === emoji
                    ? { ...r, count: r.count - 1, userReacted: false }
                    : r,
                )
              }
            } else {
              // Add user's reaction to existing
              newReactions = existingReactions.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, userReacted: true }
                  : r,
              )
            }
          }

          return { ...msg, reactions: newReactions }
        }),
      )

      triggerEvent("reaction", messageId, { emoji })
    },
    [triggerEvent],
  )

  /**
   * Get reactions for a specific message
   */
  const getReactions = useCallback(
    (messageId: string) => {
      const message = messages.find((msg) => msg.id === messageId)
      return message?.reactions || []
    },
    [messages],
  )

  return {
    messages,
    isGenerating,
    sendMessage,
    stopGeneration,
    retryLastMessage,
    clearMessages,
    addMessage: (msg) => {
      addMessage(msg)
    },
    triggerEvent,
    revertToMessage,
    editAndResend,
    getMessagesUntil,
    toggleReaction,
    getReactions,
  }
}

/** @deprecated Use useLearningChat instead */
export const useChat = useLearningChat

export default useLearningChat
