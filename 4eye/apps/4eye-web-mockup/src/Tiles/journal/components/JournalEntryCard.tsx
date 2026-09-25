"use client";

/** A single entry row in the journal list rail. */

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha } from "@mui/material";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import type { JournalEntry } from "../model/types";
import { kindColor, kindIcon } from "./kindIcon";

/** Strip markdown noise for a one-line preview. */
function plainPreview(body: string): string {
  return body
    .replace(/[#>*_`~\-\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function JournalEntryCard({
  entry,
  active,
  onClick,
}: {
  entry: JournalEntry;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = kindIcon(entry.kind);
  const color = kindColor(entry.kind);
  const preview = entry.kind === "ai-chat" && entry.chat?.length
    ? entry.chat[entry.chat.length - 1].text
    : plainPreview(entry.body);

  return (
    <Box
      onClick={onClick}
      role="button"
      sx={{
        p: 1.25,
        borderRadius: 2,
        cursor: "pointer",
        border: "1px solid",
        borderColor: active ? "primary.main" : "divider",
        bgcolor: active ? (t) => alpha(t.palette.primary.main, 0.06) : "transparent",
        transition: "all 120ms ease",
        "&:hover": { borderColor: "primary.light", bgcolor: "action.hover" },
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", gap: 0.75, mb: 0.25 }}>
        <Icon sx={{ fontSize: 16, color }} />
        <Typography
          variant="body2"
          sx={{ fontWeight: 700, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {entry.title || "Untitled"}
        </Typography>
        {entry.pinned && <PushPinRoundedIcon sx={{ fontSize: 13, color: "text.disabled" }} />}
      </Stack>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {preview || "Empty"}
      </Typography>
      <Stack direction="row" sx={{ alignItems: "center", gap: 0.5, mt: 0.5, flexWrap: "wrap" }}>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {timeAgo(entry.updatedAt)}
        </Typography>
        {entry.tags.slice(0, 2).map((t) => (
          <Chip key={t} label={t} size="small" sx={{ height: 18, fontSize: 10 }} />
        ))}
      </Stack>
    </Box>
  );
}
