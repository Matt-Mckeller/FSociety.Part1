/**
 * LearningChat Component Types
 *
 * TypeScript interfaces for the learning chat AI system
 */

import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

// ============================================
// Message Types
// ============================================

export type MessageRole = "user" | "assistant" | "system"
export type MessageStatus = "pending" | "streaming" | "complete" | "error"

export interface MessageReaction {
  emoji: string
  count: number
  userReacted: boolean
}

export interface LearningChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  status: MessageStatus
  reactions?: MessageReaction[]
  metadata?: Record<string, unknown>
}

/** @deprecated Use LearningChatMessage instead */
export type ChatMessage = LearningChatMessage

// ============================================
// Event Types
// ============================================

export type LearningChatEventType =
  | "action" // User clicks an action button
  | "suggestion" // AI suggests an action
  | "feedback" // User provides feedback (thumbs up/down)
  | "copy" // User copies content
  | "retry" // User requests retry
  | "stop" // User stops generation
  | "clear" // User clears chat
  | "thumbsUp" // Positive feedback
  | "thumbsDown" // Negative feedback
  | "regenerate" // User wants to regenerate response
  | "revert" // User reverts to a previous message (time travel)
  | "edit" // User edits a message
  | "resend" // User resends an edited message
  | "reaction" // User adds/removes a reaction

/** @deprecated Use LearningChatEventType instead */
export type ChatEventType = LearningChatEventType

export interface LearningChatEvent {
  type: LearningChatEventType
  messageId: string
  payload?: Record<string, unknown>
  timestamp: Date
}

/** @deprecated Use LearningChatEvent instead */
export type ChatEvent = LearningChatEvent

export interface LearningChatAction {
  id: string
  label: string
  icon?: ReactNode
  variant?: "text" | "outlined" | "contained"
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info"
  onClick?: (message: LearningChatMessage) => void
}

/** @deprecated Use LearningChatAction instead */
export type ChatAction = LearningChatAction

// ============================================
// Streaming Types
// ============================================

export interface StreamToken {
  content: string
  done: boolean
}

export interface StreamOptions {
  onToken?: (token: string) => void
  onComplete?: (fullContent: string) => void
  onError?: (error: Error) => void
}

// ============================================
// Configuration Types
// ============================================

export type LearningChatVariant =
  | "floating"
  | "sidebar"
  | "fullscreen"
  | "embedded"
export type LearningChatPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"

/** @deprecated Use LearningChatVariant instead */
export type ChatVariant = LearningChatVariant
/** @deprecated Use LearningChatPosition instead */
export type ChatPosition = LearningChatPosition

export interface LearningChatConfig {
  /** Visual variant of the chat interface */
  variant: LearningChatVariant
  /** Position for floating variant */
  position?: LearningChatPosition
  /** Title shown in header */
  title?: string
  /** Subtitle or description */
  subtitle?: string
  /** Placeholder text for input */
  placeholder?: string
  /** Initial greeting message from AI */
  welcomeMessage?: string
  /** Avatar for AI messages */
  assistantAvatar?: React.ReactNode
  /** Avatar for user messages */
  userAvatar?: React.ReactNode
  /** Show timestamp on messages */
  showTimestamps?: boolean
  /** Enable markdown rendering */
  enableMarkdown?: boolean
  /** Enable code syntax highlighting */
  enableCodeHighlight?: boolean
  /** Show copy button for code blocks */
  showCopyCode?: boolean
  /** Custom actions for messages */
  messageActions?: LearningChatAction[]
  /** Suggested prompts to show initially */
  suggestedPrompts?: string[]
  /** Max height for embedded/sidebar variants */
  maxHeight?: string | number
  /** Width for sidebar variant */
  sidebarWidth?: string | number
  /** Enable time travel (revert to previous messages) */
  enableTimeTravel?: boolean
  /** Enable editing and resending user messages */
  enableResend?: boolean
}

/** @deprecated Use LearningChatConfig instead */
export type ChatConfig = LearningChatConfig

// ============================================
// Hook Types
// ============================================

export interface UseLearningChatOptions {
  /** Initial messages to populate the chat */
  initialMessages?: LearningChatMessage[]
  /** Handler for sending messages - should return a stream or complete response */
  onSend?: (
    message: string,
    history: LearningChatMessage[],
  ) => Promise<AsyncIterable<StreamToken> | string>
  /** Handler for chat events */
  onEvent?: (event: LearningChatEvent) => void
  /** Auto-scroll to bottom on new messages */
  autoScroll?: boolean
  /** Enable time travel (revert to previous messages) */
  enableTimeTravel?: boolean
  /** Enable editing and resending user messages */
  enableResend?: boolean
}

/** @deprecated Use UseLearningChatOptions instead */
export type UseChatOptions = UseLearningChatOptions

export interface UseLearningChatReturn {
  /** Current messages in the chat */
  messages: LearningChatMessage[]
  /** Whether AI is currently generating a response */
  isGenerating: boolean
  /** Send a new user message */
  sendMessage: (content: string) => Promise<void>
  /** Stop the current generation */
  stopGeneration: () => void
  /** Retry the last message */
  retryLastMessage: () => Promise<void>
  /** Clear all messages */
  clearMessages: () => void
  /** Add a message programmatically */
  addMessage: (message: Omit<LearningChatMessage, "id" | "timestamp">) => void
  /** Trigger a chat event */
  triggerEvent: (
    type: LearningChatEventType,
    messageId: string,
    payload?: Record<string, unknown>,
  ) => void
  /** Revert to a specific message (time travel) - removes all messages after it */
  revertToMessage: (messageId: string) => void
  /** Edit and resend a user message - reverts to that message and sends new content */
  editAndResend: (messageId: string, newContent: string) => Promise<void>
  /** Get messages up to a specific point (for time travel preview) */
  getMessagesUntil: (messageId: string) => LearningChatMessage[]
  /** Toggle a reaction on a message */
  toggleReaction: (messageId: string, emoji: string) => void
  /** Get reactions for a message */
  getReactions: (messageId: string) => MessageReaction[]
}

/** @deprecated Use UseLearningChatReturn instead */
export type UseChatReturn = UseLearningChatReturn

// ============================================
// Component Props Types
// ============================================

export interface LearningChatContainerProps {
  /** Configuration options */
  config?: Partial<LearningChatConfig>
  /** Handler for sending messages */
  onSend?: (
    message: string,
    history: LearningChatMessage[],
  ) => Promise<AsyncIterable<StreamToken> | string>
  /** Handler for chat events */
  onEvent?: (event: LearningChatEvent) => void
  /** Initial messages */
  initialMessages?: LearningChatMessage[]
  /** Handler when close is clicked */
  onClose?: () => void
  /** Handler when minimize is clicked */
  onMinimize?: () => void
  /** Handler when expand is clicked */
  onExpand?: () => void
  /** Header configuration */
  header?: Omit<
    LearningChatHeaderProps,
    | "onClose"
    | "onMinimize"
    | "onExpand"
    | "onClear"
    | "onTimelineToggle"
    | "isTimelineOpen"
    | "showTimeline"
    | "onSearchToggle"
    | "showSearch"
  >
  /** Input configuration */
  input?: Omit<LearningChatInputProps, "onSend" | "onStop" | "isLoading">
  /** Whether to show header */
  showHeader?: boolean
  /** Whether to show input */
  showInput?: boolean
  /** Whether to show timeline (initially) */
  showTimeline?: boolean
  /** Enable time travel from timeline */
  enableTimeTravel?: boolean
  /** Enable editing and resending user messages */
  enableResend?: boolean
  /** Enable reactions on messages */
  enableReactions?: boolean
  /** Available reaction emojis (defaults to common set) */
  reactionEmojis?: string[]
  /** Enable search functionality (Ctrl/Cmd+F) */
  enableSearch?: boolean
  /** Whether chat is open (for floating variant) */
  isOpen?: boolean
  /** Whether chat is minimized (for floating variant) */
  isMinimized?: boolean
  /** Custom className */
  className?: string
  /** Custom styles */
  sx?: SxProps<Theme>
  /** Custom children to replace default message list */
  children?: ReactNode
}

/** @deprecated Use LearningChatContainerProps instead */
export type ChatContainerProps = LearningChatContainerProps

export interface LearningChatHeaderProps {
  /** Title shown in header */
  title?: string
  /** Subtitle or description */
  subtitle?: string
  /** Avatar element */
  avatar?: ReactNode
  /** Show close button */
  showClose?: boolean
  /** Show minimize button */
  showMinimize?: boolean
  /** Show expand button */
  showExpand?: boolean
  /** Show clear button */
  showClear?: boolean
  /** Show timeline toggle button */
  showTimeline?: boolean
  /** Whether timeline is currently open */
  isTimelineOpen?: boolean
  /** Show search button */
  showSearch?: boolean
  /** Handler when close is clicked */
  onClose?: () => void
  /** Handler when minimize is clicked */
  onMinimize?: () => void
  /** Handler when expand is clicked */
  onExpand?: () => void
  /** Handler when clear is clicked */
  onClear?: () => void
  /** Handler when timeline toggle is clicked */
  onTimelineToggle?: () => void
  /** Handler when search is clicked */
  onSearchToggle?: () => void
  /** Custom styles */
  sx?: SxProps<Theme>
}

/** @deprecated Use LearningChatHeaderProps instead */
export type ChatHeaderProps = LearningChatHeaderProps

export interface LearningChatInputProps {
  /** Placeholder text */
  placeholder?: string
  /** Whether input is disabled */
  disabled?: boolean
  /** Handler when message is sent */
  onSend: (message: string) => void
  /** Handler to stop generation */
  onStop?: () => void
  /** Whether AI is currently generating */
  isLoading?: boolean
  /** Suggested prompts */
  suggestedPrompts?: string[]
  /** Handler when suggestion is clicked */
  onSuggestionClick?: (prompt: string) => void
  /** Pre-filled content for editing */
  editingContent?: string
  /** Whether in edit mode */
  isEditing?: boolean
  /** Cancel edit mode */
  onCancelEdit?: () => void
  /** Custom styles */
  sx?: SxProps<Theme>
}

/** @deprecated Use LearningChatInputProps instead */
export type ChatInputProps = LearningChatInputProps

export interface LearningChatMessageListProps {
  /** Messages to display */
  messages: LearningChatMessage[]
  /** Whether AI is typing */
  isTyping?: boolean
  /** Avatar for user messages */
  userAvatar?: ReactNode
  /** Avatar for assistant messages */
  assistantAvatar?: ReactNode
  /** Show message actions on hover */
  showActions?: boolean
  /** Handler when copy is clicked */
  onCopy?: (messageId: string) => void
  /** Handler when feedback is given */
  onFeedback?: (messageId: string, type: "positive" | "negative") => void
  /** Handler when regenerate is clicked */
  onRegenerate?: (messageId: string) => void
  /** Handler when edit is clicked (for user messages) */
  onEdit?: (messageId: string) => void
  /** Enable resend for user messages */
  enableResend?: boolean
  /** Enable reactions on messages */
  enableReactions?: boolean
  /** Available reaction emojis */
  reactionEmojis?: string[]
  /** Handler when a reaction is toggled */
  onReactionToggle?: (messageId: string, emoji: string) => void
  /** Get search highlights for a message */
  getSearchHighlights?: (messageId: string) => Array<{ start: number; end: number }>
  /** Current search match message ID */
  currentSearchMatchId?: string | null
  /** Custom styles */
  sx?: SxProps<Theme>
}

/** @deprecated Use LearningChatMessageListProps instead */
export type MessageListProps = LearningChatMessageListProps

export interface LearningChatMessageBubbleProps {
  message: LearningChatMessage
  /** Avatar for user messages */
  userAvatar?: ReactNode
  /** Avatar for assistant messages */
  assistantAvatar?: ReactNode
  /** Show timestamp */
  showTimestamp?: boolean
  /** Enable markdown rendering */
  enableMarkdown?: boolean
  /** Show actions on hover */
  showActions?: boolean
  /** Handler when copy is clicked */
  onCopy?: (messageId: string) => void
  /** Handler when feedback is given */
  onFeedback?: (messageId: string, type: "positive" | "negative") => void
  /** Handler when regenerate is clicked */
  onRegenerate?: (messageId: string) => void
  /** Handler when edit is clicked (for user messages) */
  onEdit?: (messageId: string) => void
  /** Enable resend for user messages */
  enableResend?: boolean
  /** Is this message currently streaming */
  isStreaming?: boolean
  /** Enable reactions on this message */
  enableReactions?: boolean
  /** Available reaction emojis */
  reactionEmojis?: string[]
  /** Handler when a reaction is toggled */
  onReactionToggle?: (messageId: string, emoji: string) => void
  /** Search highlight ranges for this message */
  searchHighlights?: Array<{ start: number; end: number }>
  /** Whether this message contains the current search match */
  isCurrentSearchMatch?: boolean
}

/** @deprecated Use LearningChatMessageBubbleProps instead */
export type MessageBubbleProps = LearningChatMessageBubbleProps

export interface LearningChatTypingIndicatorProps {
  /** Size of the dots */
  size?: number
  /** Color of the dots */
  color?: string
  /** Custom styles */
  sx?: SxProps<Theme>
}

/** @deprecated Use LearningChatTypingIndicatorProps instead */
export type TypingIndicatorProps = LearningChatTypingIndicatorProps

export interface LearningChatMarkdownRendererProps {
  /** Markdown content to render */
  content: string
  /** Custom styles */
  sx?: SxProps<Theme>
}

/** @deprecated Use LearningChatMarkdownRendererProps instead */
export type MarkdownRendererProps = LearningChatMarkdownRendererProps

export interface LearningChatTimelineProps {
  /** Messages to display in timeline */
  messages: LearningChatMessage[]
  /** Whether the timeline drawer is open */
  isOpen: boolean
  /** Handler to toggle the timeline */
  onToggle: () => void
  /** Width of the timeline drawer */
  width?: number
  /** Handler when a message is clicked in the timeline */
  onMessageClick?: (messageId: string) => void
  /** Handler when revert is clicked (time travel) */
  onRevert?: (messageId: string) => void
  /** Enable time travel feature */
  enableTimeTravel?: boolean
}

/** @deprecated Use LearningChatTimelineProps instead */
export type ChatTimelineProps = LearningChatTimelineProps
