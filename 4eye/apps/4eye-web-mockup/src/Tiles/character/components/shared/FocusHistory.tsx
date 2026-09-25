"use client";

/**
 * FocusHistory — the revision log for one slot (or one item in a slot).
 *
 * This is "what I was pointed at", not the character feed. Old values stay.
 */

import { Box, Stack, Typography } from "@mui/material";

import { relativeTime } from "../../lib/time";
import { FOCUS_SLOT_LABEL, type FocusRevision, type FocusSlot } from "../../model/today";

export function FocusHistory({
  revisions,
  slot,
  itemId,
  empty = "No changes recorded yet.",
}: {
  revisions: readonly FocusRevision[];
  slot: FocusSlot;
  itemId?: string;
  empty?: string;
}) {
  const rows = revisions.filter((r) => r.slot === slot && (itemId == null || r.itemId === itemId));
  if (rows.length === 0) {
    return (
      <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic" }}>
        {empty}
      </Typography>
    );
  }

  return (
    <Stack sx={{ gap: 0.65 }}>
      <Typography
        sx={{
          fontSize: "0.58rem",
          fontWeight: 800,
          letterSpacing: "0.1em",
          color: "text.disabled",
        }}
      >
        {FOCUS_SLOT_LABEL[slot].toUpperCase()} HISTORY
      </Typography>
      {rows.slice(0, 8).map((r) => (
        <Box key={r.id}>
          <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, lineHeight: 1.3 }}>
            {r.to || "—"}
          </Typography>
          <Typography sx={{ fontSize: "0.58rem", color: "text.secondary", lineHeight: 1.35 }}>
            {r.from ? `${r.from} → ` : "added "}
            {r.to || "removed"}
            {r.reason ? ` · ${r.reason}` : ""}
            {" · "}
            {relativeTime(r.at)}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
