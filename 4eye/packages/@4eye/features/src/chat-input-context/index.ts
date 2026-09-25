/**
 * @4eye/features/chat-input-context
 *
 * The composer. Combines Domain + Goals + Projects + ContextData
 * + AISettings + ContextActions + Profile into a single payload.
 */
export {
  ChatInputContextProvider,
  useChatInputContext,
} from "./ChatInputContext";
export {
  buildChatInputContext,
  summarizeChatInputContext,
  type ChatInputContextPayload,
  type ResolvedSelectedContext,
} from "./buildChatInputContext";
