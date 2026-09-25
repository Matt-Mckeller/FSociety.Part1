"use client";

/**
 * HistoryTimeline — renders an entity's version history (audit log) as a
 * compact vertical timeline. Newest first. Each event shows a branded glyph,
 * a summary, the actor, and a relative timestamp; goal-directed events link
 * back to the goal they targeted.
 */

import { useState } from "react";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";

import type { ChangeEvent, ChangeKind, Goal } from "../model/types";
import { BrandIcon } from "./BrandIcon";
import type { GlyphName } from "./brand-glyphs";

const BRAND_FONT = "Xpens, Roboto, sans-serif";

const KIND_GLYPH: Record<ChangeKind, GlyphName> = {
  created: "seed",
  edited: "prompt",
  promoted: "promote",
  "goal-linked": "link",
  "goal-tuned": "goal",
  generated: "generate",
};

const KIND_COLOR: Record<ChangeKind, string> = {
  created: "#64748b",
  edited: "#2c4f76",
  promoted: "#2e7d32",
  "goal-linked": "#7c3aed",
  "goal-tuned": "#1976d2",
  generated: "#d97706",
};

/** "3m ago", "2h ago", "5d ago" — tiny relative formatter. */
function relative(at: string): string {
  const diff = Date.now() - new Date(at).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.round(hr / 24);
  return `${d}d ago`;
}

export interface HistoryTimelineProps {
  history?: ChangeEvent[];
  goals?: Goal[];
  /** Cap the number of entries shown (newest kept). */
  max?: number;
  /** Collapse entries beyond this many behind a "show earlier" toggle. @default 4 */
  collapseAfter?: number;
}

export function HistoryTimeline({
  history,
  goals,
  max,
  collapseAfter = 4,
}: HistoryTimelineProps) {
  const [expanded, setExpanded] = useState(false);
  const events = [...(history ?? [])].reverse();
  const capped = max ? events.slice(0, max) : events;
  const collapsible = capped.length > collapseAfter;
  const shown = collapsible && !expanded ? capped.slice(0, collapseAfter) : capped;
  const hiddenCount = capped.length - shown.length;

  if (capped.length === 0) {
    return (
      <Typography variant="body2" color="text.disabled">
        No history yet — actions you take will be recorded here.
      </Typography>
    );
  }

  return (
    <Stack spacing={0}>
      {shown.map((e, i) => {
        const goal = e.goalId
          ? goals?.find((g) => g.id === e.goalId)
          : undefined;
        const color = KIND_COLOR[e.kind];
        const isLast = i === shown.length - 1 && hiddenCount === 0;
        return (
          <Stack key={e.id} spacing={1} sx={{ flexDirection: "row" }}>
            {/* Rail: node + connector */}
            <Stack
              spacing={0}
              sx={{ alignItems: "center", width: 24, flexShrink: 0 }}
            >
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  bgcolor: color,
                  border: "1.5px solid",
                  borderColor: color,
                  boxShadow: `0 0 0 2px ${color}22`,
                }}
              >
                <BrandIcon name={KIND_GLYPH[e.kind]} size={12} color="#fff" />
              </Box>
              {!isLast && (
                <Box sx={{ flex: 1, width: 2, bgcolor: "#d3d9e2", my: 0.25 }} />
              )}
            </Stack>

            {/* Body */}
            <Box sx={{ pb: isLast ? 0 : 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: BRAND_FONT,
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#1f2937",
                  lineHeight: 1.3,
                }}
              >
                {e.summary}
              </Typography>
              <Stack
                spacing={0.6}
                sx={{ flexDirection: "row", alignItems: "center", mt: 0.1 }}
              >
                <Typography variant="caption" sx={{ color: "#64748b", fontSize: 11 }}>
                  {e.actor}
                </Typography>
                <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "#cbd2dc" }} />
                <Tooltip title={new Date(e.at).toLocaleString()} arrow>
                  <Typography variant="caption" sx={{ color: "#64748b", fontSize: 11 }}>
                    {relative(e.at)}
                  </Typography>
                </Tooltip>
                {goal && (
                  <>
                    <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "#cbd2dc" }} />
                    <Stack
                      spacing={0.4}
                      sx={{ flexDirection: "row", alignItems: "center", color }}
                    >
                      {goal.glyph && <BrandIcon name={goal.glyph} size={12} />}
                      <Typography variant="caption" sx={{ color, fontSize: 11, fontWeight: 600 }}>
                        {goal.title}
                      </Typography>
                    </Stack>
                  </>
                )}
              </Stack>
            </Box>
          </Stack>
        );
      })}

      {collapsible && (
        <Button
          size="small"
          onClick={() => setExpanded((v) => !v)}
          startIcon={<BrandIcon name="history" size={13} />}
          sx={{
            alignSelf: "flex-start",
            ml: 3.5,
            mt: 0.25,
            textTransform: "none",
            fontFamily: BRAND_FONT,
            fontWeight: 600,
            fontSize: 11.5,
            color: "#2c4f76",
            minHeight: 0,
            py: 0.25,
          }}
        >
          {expanded
            ? "Show less"
            : `Show ${hiddenCount} earlier change${hiddenCount === 1 ? "" : "s"}`}
        </Button>
      )}
    </Stack>
  );
}
