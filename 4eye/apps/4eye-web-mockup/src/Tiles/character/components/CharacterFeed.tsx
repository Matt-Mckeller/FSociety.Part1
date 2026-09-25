"use client";

/**
 * Character — Feed.
 *
 * Event log for the character: habits completed, consumables used, trait upgrades,
 * aura unlocks, buff expirations, and milestones. Newest events at top.
 * Reads from CharacterProfileStore.feedEvents.
 *
 * Long feeds stay capped with Show More — same pattern as equipment / perks —
 * so the Life lens stays readable and you can continue into the full log.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";

import { useProfileStore, type FeedEvent } from "../store/CharacterProfileStore";
import { relativeTime } from "../lib/time";
import { ShowMore, useCapped } from "./shared/ShowMore";

/* ──────────────────────────────────────────────────── helpers */

const TYPE_ICONS: Record<FeedEvent["type"], React.ReactNode> = {
  "habit-complete":      <LocalFireDepartmentRoundedIcon sx={{ fontSize: 13 }} />,
  "consumable-used":     <FlashOnRoundedIcon sx={{ fontSize: 13 }} />,
  "trait-upgrade":       <AutoAwesomeRoundedIcon sx={{ fontSize: 13 }} />,
  "aura-upgrade":        <AutoAwesomeRoundedIcon sx={{ fontSize: 13 }} />,
  "buff-gained":         <FlashOnRoundedIcon sx={{ fontSize: 13 }} />,
  "buff-expired":        <PsychologyRoundedIcon sx={{ fontSize: 13 }} />,
  "milestone":           <EmojiEventsRoundedIcon sx={{ fontSize: 13 }} />,
  "perspective-updated": <PsychologyRoundedIcon sx={{ fontSize: 13 }} />,
  "action-used":         <BoltRoundedIcon sx={{ fontSize: 13 }} />,
  "goal-progress":       <FlagRoundedIcon sx={{ fontSize: 13 }} />,
  "focus-changed":       <FlagRoundedIcon sx={{ fontSize: 13 }} />,
};

/* ──────────────────────────────────────────────────── feed item */

function FeedItem({ event }: { event: FeedEvent }) {
  const c = event.color ?? "#64748b";
  return (
    <Stack
      direction="row"
      sx={{
        gap: 1,
        py: 0.85,
        borderBottom: "1px solid",
        borderColor: "divider",
        alignItems: "flex-start",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Box
        sx={{
          mt: 0.2,
          width: 22,
          height: 22,
          borderRadius: "50%",
          bgcolor: alpha(c, 0.12),
          border: "1.5px solid",
          borderColor: alpha(c, 0.3),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: c,
          flexShrink: 0,
        }}
      >
        {event.emoji ? (
          <Typography sx={{ fontSize: "0.65rem", lineHeight: 1 }}>{event.emoji}</Typography>
        ) : (
          TYPE_ICONS[event.type]
        )}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, color: "text.primary", display: "block", lineHeight: 1.3 }}
        >
          {event.label}
        </Typography>
        {event.detail && (
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: "0.6rem", display: "block", lineHeight: 1.3 }}
          >
            {event.detail}
          </Typography>
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{ color: "text.disabled", fontSize: "0.58rem", flexShrink: 0, mt: 0.2 }}
      >
        {relativeTime(event.occurredAt)}
      </Typography>
    </Stack>
  );
}

/* ──────────────────────────────────────────────────── panel */

export function CharacterFeed({
  limit = 8,
  accent = "#64748b",
}: {
  limit?: number;
  /** Brand accent for the continue control. */
  accent?: string;
}) {
  const { state } = useProfileStore();
  const capped = useCapped(state.feedEvents, limit);

  if (state.feedEvents.length === 0) {
    return (
      <Box sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          No events yet. Complete habits or use consumables to generate activity.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {capped.items.map((e) => (
        <FeedItem key={e.id} event={e} />
      ))}
      <ShowMore capped={capped} accent={accent} noun="events" />
    </Box>
  );
}
