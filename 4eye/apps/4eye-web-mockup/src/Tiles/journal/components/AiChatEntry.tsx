"use client";

/**
 * AiChatEntry — transcript view for `kind === "ai-chat"` entries. Shows the
 * conversation as bubbles and an input that appends the user turn plus a
 * mocked assistant reply (no network — V1 mockup of the AI action).
 */

import * as React from "react";
import { Box, IconButton, Stack, TextField, Typography, alpha } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import type { ChatTurn, JournalEntry } from "../model/types";
import { useJournal } from "../store/JournalProvider";

/** Deterministic stand-in for a model reply. Swap for a real call later. */
function mockReply(prompt: string): string {
  const topic = prompt.replace(/[?.!]+$/, "").trim();
  return `Here's the short version: ${topic ? `"${topic}"` : "that"} comes down to a few core ideas. Want me to go deeper, give an example, or quiz you on it?`;
}

function Bubble({ turn }: { turn: ChatTurn }) {
  const isUser = turn.role === "user";
  return (
    <Stack direction="row" sx={{ justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <Box
        sx={{
          maxWidth: "80%",
          px: 1.5,
          py: 1,
          borderRadius: 2,
          bgcolor: isUser ? "primary.main" : (t) => alpha(t.palette.text.primary, 0.06),
          color: isUser ? "primary.contrastText" : "text.primary",
        }}
      >
        <Typography variant="body2" sx={{ lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
          {turn.text}
        </Typography>
      </Box>
    </Stack>
  );
}

export function AiChatEntry({ entry }: { entry: JournalEntry }) {
  const { appendChatTurn } = useJournal();
  const [draft, setDraft] = React.useState("");
  const chat = entry.chat ?? [];

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = Date.now();
    appendChatTurn(entry.id, { role: "user", text, at: now });
    setDraft("");
    // Mocked assistant reply on the next tick.
    window.setTimeout(() => {
      appendChatTurn(entry.id, { role: "assistant", text: mockReply(text), at: Date.now() });
    }, 350);
  };

  return (
    <Stack sx={{ flex: 1, minHeight: 0, gap: 1 }}>
      <Stack sx={{ flex: 1, minHeight: 0, overflowY: "auto", gap: 1, pr: 0.5 }}>
        {chat.length === 0 ? (
          <Typography variant="body2" sx={{ color: "text.disabled", fontStyle: "italic", textAlign: "center", mt: 2 }}>
            Start the conversation below.
          </Typography>
        ) : (
          chat.map((turn, i) => <Bubble key={i} turn={turn} />)
        )}
      </Stack>
      <Stack direction="row" sx={{ gap: 1, alignItems: "flex-end" }}>
        <TextField
          fullWidth
          size="small"
          multiline
          maxRows={4}
          placeholder="Ask anything…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <IconButton color="primary" onClick={send} disabled={!draft.trim()}>
          <SendRoundedIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
