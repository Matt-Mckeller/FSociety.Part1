"use client";

/**
 * Send to 4eye chat — a decoupled hand-off mechanism.
 *
 * Plan §4.1 prefers a single "send to 4eye chat" button (like VS Code's
 * "send selection to chat") over embedding a chat panel per screen. This
 * module provides exactly that, with zero hard dependency on the chat
 * provider stack so it works standalone in Storybook:
 *
 *   - `useSendToChat()` returns `{ send, lastSent }`.
 *   - With NO provider, `send` dispatches a `window` CustomEvent
 *     (`4eye:chat:send`) and logs — enough to wire a listener later.
 *   - With `<SendToChatProvider handler={...}>`, the host app supplies a
 *     real handler (e.g. one that calls `useContextData().toggleContext`).
 *
 * The `SendToChatButton` is the single, reusable affordance dropped onto any
 * entity (scene, sequence, goal, report entity…).
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { IconButton, Tooltip } from "@mui/material";

import { BrandIcon } from "../components/BrandIcon";
import type { GlyphName } from "../components/brand-glyphs";

/** A single entity hand-off sent to the 4eye chat input context. */
export interface ChatHandoff {
  /** Entity kind — maps to a chat context slice (scene, animation, goal…). */
  kind: string;
  /** Stable entity id. */
  id: string;
  /** Human-readable label shown in chat context. */
  label: string;
  /** Optional one-line detail. */
  detail?: string;
  /** Optional glyph for display. */
  glyph?: GlyphName;
  /** Open extension payload (the full entity, etc.). */
  payload?: unknown;
}

export type SendToChatHandler = (item: ChatHandoff) => void;

interface SendToChatValue {
  send: SendToChatHandler;
  lastSent?: ChatHandoff;
}

const SendToChatContext = createContext<SendToChatValue | null>(null);

const CHAT_SEND_EVENT = "4eye:chat:send";

/** Default handler when no provider is present (Storybook / standalone). */
function defaultSend(item: ChatHandoff): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CHAT_SEND_EVENT, { detail: item }));
  }
  // eslint-disable-next-line no-console
  console.info("[send-to-chat]", item.kind, item.label, item);
}

export function SendToChatProvider({
  handler,
  children,
}: {
  /** Host-supplied handler; falls back to the window-event default. */
  handler?: SendToChatHandler;
  children: ReactNode;
}) {
  const [lastSent, setLastSent] = useState<ChatHandoff>();

  const send = useCallback<SendToChatHandler>(
    (item) => {
      (handler ?? defaultSend)(item);
      setLastSent(item);
    },
    [handler],
  );

  const value = useMemo<SendToChatValue>(
    () => ({ send, lastSent }),
    [send, lastSent],
  );

  return (
    <SendToChatContext.Provider value={value}>
      {children}
    </SendToChatContext.Provider>
  );
}

/**
 * Access the send-to-chat hand-off. Safe to call without a provider — it
 * falls back to the window-event default so components stay decoupled.
 */
export function useSendToChat(): SendToChatValue {
  const ctx = useContext(SendToChatContext);
  const [lastSent, setLastSent] = useState<ChatHandoff>();

  const fallbackSend = useCallback<SendToChatHandler>((item) => {
    defaultSend(item);
    setLastSent(item);
  }, []);

  return ctx ?? { send: fallbackSend, lastSent };
}

/** The single reusable "Send to 4eye chat" affordance. */
export function SendToChatButton({
  item,
  size = 24,
}: {
  item: ChatHandoff;
  size?: number;
}) {
  const { send } = useSendToChat();
  return (
    <Tooltip title="Send to 4eye chat" arrow>
      <IconButton
        size="small"
        aria-label={`Send ${item.label} to 4eye chat`}
        onClick={(e) => {
          e.stopPropagation();
          send(item);
        }}
        sx={{
          width: size,
          height: size,
          color: "#2c4f76",
          bgcolor: "#eef2f8",
          border: "1px solid #dfe7f1",
          borderRadius: 1.5,
          "&:hover": { bgcolor: "#e0e8f3", color: "#1a3658" },
        }}
      >
        <BrandIcon name="perspective" size={size * 0.62} />
      </IconButton>
    </Tooltip>
  );
}
