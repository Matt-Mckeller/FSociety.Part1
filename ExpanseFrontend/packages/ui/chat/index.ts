/**
 * LearningChat Component Library
 *
 * A comprehensive, backend-agnostic chat UI component system
 * supporting streaming responses, markdown rendering, time travel,
 * message editing, reactions, and multiple layout variants.
 */

// Components
export {
  LearningChatContainer,
  LearningChatHeader,
  LearningChatInput,
  LearningChatTimeline,
  LearningChatTimelineToggle,
  LearningChatMessageList,
  LearningChatMessageBubble,
  LearningChatTypingIndicator,
  LearningChatMarkdownRenderer,
  LearningChatReactions,
  LearningChatSearch,
  LearningChatHighlightedText,
  DEFAULT_REACTION_EMOJIS,
  // Deprecated aliases
  ChatContainer,
  ChatHeader,
  ChatInput,
  ChatTimeline,
  ChatTimelineToggle,
  MessageList,
  MessageBubble,
  TypingIndicator,
  MarkdownRenderer,
} from "./components"

// Hooks
export { useLearningChat, useChat, useMessageSearch } from "./hooks"
export type { SearchMatch, UseMessageSearchOptions, UseMessageSearchReturn } from "./hooks"

// Types
export type {
  MessageRole,
  MessageStatus,
  MessageReaction,
  LearningChatMessage,
  ChatMessage,
  LearningChatEventType,
  ChatEventType,
  LearningChatEvent,
  ChatEvent,
  LearningChatAction,
  ChatAction,
  StreamToken,
  StreamOptions,
  LearningChatConfig,
  ChatConfig,
  UseLearningChatOptions,
  UseChatOptions,
  UseLearningChatReturn,
  UseChatReturn,
  LearningChatContainerProps,
  ChatContainerProps,
  LearningChatHeaderProps,
  ChatHeaderProps,
  LearningChatInputProps,
  ChatInputProps,
  LearningChatMessageListProps,
  MessageListProps,
  LearningChatMessageBubbleProps,
  MessageBubbleProps,
  LearningChatTypingIndicatorProps,
  TypingIndicatorProps,
  LearningChatMarkdownRendererProps,
  MarkdownRendererProps,
  LearningChatTimelineProps,
  ChatTimelineProps,
} from "./types"
