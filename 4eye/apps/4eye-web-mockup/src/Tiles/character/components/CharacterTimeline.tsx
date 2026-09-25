"use client";

/**
 * Character — Evolution Timeline.
 *
 * Chronological view of formative events: cold storage memories, significant
 * mid-term events, and character milestones, rendered as a vertical rail of
 * event cards. The merge itself lives in `model/timeline.ts` — this file is the
 * rendering, and takes entries as a prop so the Events lens can filter, sort
 * and group before handing them over.
 *
 * Two densities, because this component serves two very different slots:
 *
 *  - `compact` — the default, sized for a column inside `TwoColumn` on the
 *    Brain lens and the Human panel. Small type, valence dot, tags.
 *  - `comfortable` — the Events lens, where the timeline *is* the page. Larger
 *    type, an explicit depth badge, and the significance made visible instead
 *    of appearing only above 80.
 *
 * Callers that pass nothing get exactly the old behaviour.
 */

import * as React from "react";
import { Box, Chip, Stack, Tooltip, Typography, alpha } from "@mui/material";

import { useProfileStore } from "../store/CharacterProfileStore";
import { formatDate, relativeTimeLabel } from "../lib/time";
import { LearnedResult, hasLearnedResult, learnedToggleLabel } from "./shared/LearnedResult";
import {
  buildTimelineEntries,
  SOURCE_META,
  VALENCE_COLORS,
  VALENCE_META,
  type TimelineEntry,
} from "../model/timeline";
import { BRAIN_ACCENT, significanceBand, VALENCE_CHIP_BLURB } from "../theme/brainTokens";

export type TimelineDensity = "compact" | "comfortable";

/**
 * Type scale per density. Everything else is shared.
 *
 * `measure` caps the prose only, not the row: the Events lens is as wide as the
 * page, and summary text set across the whole of it runs past 100 characters a
 * line. Capping the row instead would strand the significance gutter, so the
 * row keeps the width and the sentence does not.
 */
const SCALE = {
  compact: { title: "0.7rem", summary: "0.68rem", meta: "0.58rem", gap: 1.5, pb: 2, measure: "none" },
  comfortable: { title: "0.82rem", summary: "0.76rem", meta: "0.64rem", gap: 2, pb: 2.5, measure: "68ch" },
} as const;

/* ──────────────────────────────────────────────────── significance */

/**
 * Significance as a bar rather than as a chip above 80.
 *
 * The old treatment showed a "90% sig" badge on major entries and nothing at
 * all otherwise, which made the weakest signal — absence — carry the most
 * common case. A short bar states the weight on every row and costs 34px.
 */
function SignificanceBar({ value, color }: { value: number; color: string }) {
  return (
    <Tooltip title={`Significance ${value} / 100`} arrow>
      <Stack direction="row" sx={{ alignItems: "center", gap: 0.6, flexShrink: 0 }}>
        <Box
          sx={{
            width: 34,
            height: 3,
            borderRadius: 999,
            bgcolor: alpha(color, 0.18),
            overflow: "hidden",
          }}
        >
          <Box sx={{ width: `${value}%`, height: "100%", borderRadius: 999, bgcolor: color }} />
        </Box>
        <Typography
          sx={{
            fontSize: "0.6rem",
            fontWeight: 800,
            color: alpha(color, 0.95),
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

/* ──────────────────────────────────────────────────── timeline entry */

export function TimelineNode({
  entry,
  isLast,
  density = "compact",
}: {
  entry: TimelineEntry;
  isLast: boolean;
  density?: TimelineDensity;
}) {
  const c = VALENCE_COLORS[entry.valence];
  const source = SOURCE_META[entry.source];
  const band = significanceBand(entry.significance);
  const dotSize = source.dotSize;
  const scale = SCALE[density];
  const roomy = density === "comfortable";
  const hasDepth = hasLearnedResult(entry);
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex", gap: scale.gap, position: "relative" }}>
      {/* Vertical line */}
      {!isLast && (
        <Box
          sx={{
            position: "absolute",
            left: dotSize / 2 - 1,
            top: dotSize,
            bottom: -8,
            width: 2,
            bgcolor: alpha("#64748b", 0.15),
          }}
        />
      )}

      {/* Dot — size carries depth, colour carries valence. */}
      <Tooltip title={`${source.label} — ${source.blurb}`} arrow placement="left">
        <Box
          sx={{
            mt: 0.25,
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor: alpha(c, 0.2),
            border: "2px solid",
            borderColor: c,
            boxShadow: entry.source === "cold" ? `0 0 10px ${alpha(c, 0.4)}` : "none",
            flexShrink: 0,
            zIndex: 1,
          }}
        />
      </Tooltip>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0, pb: scale.pb }}>
        <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1, mb: 0.35 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: scale.title,
                fontWeight: 800,
                color: entry.source === "cold" ? c : "text.primary",
                lineHeight: 1.35,
                display: "block",
              }}
            >
              {entry.title}
            </Typography>
          </Box>
          {/*
            Relative time reads at a glance; the absolute date is what you
            actually need when an entry says "6y ago" and you are trying to
            place it against something else. Tooltip rather than a second line.
          */}
          <Tooltip title={formatDate(entry.occurredAt)} arrow>
            <Typography
              sx={{
                color: "text.disabled",
                fontSize: scale.meta,
                flexShrink: 0,
                mt: 0.1,
                cursor: "default",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {relativeTimeLabel(entry.occurredAt)}
            </Typography>
          </Tooltip>
        </Stack>

        {entry.summary && (
          <Typography
            sx={{
              color: "text.secondary",
              display: "block",
              mb: 0.6,
              lineHeight: 1.5,
              fontSize: scale.summary,
              maxWidth: scale.measure,
            }}
          >
            {entry.summary}
          </Typography>
        )}

        <Stack direction="row" sx={{ gap: 0.5, flexWrap: "wrap", alignItems: "center" }}>
          {/*
            Depth is otherwise a 6px difference in dot diameter, which is not a
            distinction anyone reads. Named, it is the most useful sort in the
            list: "is this a thing that happened, or a thing that shaped me?"
          */}
          {roomy && (
            <Tooltip title={VALENCE_CHIP_BLURB[entry.valence]} arrow>
              <Chip
                label={VALENCE_META[entry.valence].label}
                size="small"
                sx={{
                  height: 17,
                  fontSize: scale.meta,
                  fontWeight: 800,
                  bgcolor: alpha(c, 0.09),
                  color: alpha(c, 0.95),
                  border: "1px solid",
                  borderColor: alpha(c, 0.25),
                  "& .MuiChip-label": { px: 0.7 },
                }}
              />
            </Tooltip>
          )}
          {roomy && (
            <Tooltip title={`${source.label} — ${source.blurb}`} arrow>
              <Chip
                label={source.label}
                size="small"
                sx={{
                  height: 17,
                  fontSize: scale.meta,
                  fontWeight: 800,
                  letterSpacing: 0.3,
                  bgcolor: alpha(BRAIN_ACCENT, 0.08),
                  color: alpha(BRAIN_ACCENT, 0.95),
                  border: "1px solid",
                  borderColor: alpha(BRAIN_ACCENT, 0.22),
                  "& .MuiChip-label": { px: 0.7 },
                }}
              />
            </Tooltip>
          )}
          {/* Compact keeps the old rule: a badge only where it is remarkable. */}
          {!roomy && entry.significance >= 80 && (
            <Tooltip title={band.blurb} arrow>
              <Chip
                label={`${band.rank10}/10`}
                size="small"
                sx={{
                  height: 16,
                  fontSize: scale.meta,
                  fontWeight: 700,
                  bgcolor: alpha(band.color, 0.1),
                  color: band.color,
                  "& .MuiChip-label": { px: 0.6 },
                }}
              />
            </Tooltip>
          )}
          {roomy && (
            <Tooltip title={band.blurb} arrow>
              <Chip
                label={`${band.rank10}/10 · ${band.label}`}
                size="small"
                sx={{
                  height: 17,
                  fontSize: scale.meta,
                  fontWeight: 800,
                  bgcolor: alpha(band.color, 0.1),
                  color: band.color,
                  border: "1px solid",
                  borderColor: alpha(band.color, 0.28),
                  "& .MuiChip-label": { px: 0.7 },
                }}
              />
            </Tooltip>
          )}
          {entry.tags?.map((tag) => (
            <Tooltip key={tag} title={`Tagged “${tag}” — filter the Events lens by this`} arrow>
              <Chip
                label={tag}
                size="small"
                sx={{
                  height: roomy ? 17 : 16,
                  fontSize: scale.meta,
                  fontWeight: 600,
                  bgcolor: alpha("#64748b", 0.06),
                  color: "text.secondary",
                  "& .MuiChip-label": { px: 0.6 },
                }}
              />
            </Tooltip>
          ))}
          {/*
            The lesson is the reason a formative event is on the timeline at
            all, so it gets an affordance here rather than only in Cold Storage.
          */}
          {hasDepth && (
            <Box
              component="button"
              type="button"
              onClick={() => setOpen((o) => !o)}
              sx={{
                border: 0,
                p: 0,
                m: 0,
                bgcolor: "transparent",
                font: "inherit",
                cursor: "pointer",
                fontSize: scale.meta,
                fontWeight: 800,
                color: alpha(c, 0.9),
                "&:hover": { textDecoration: "underline" },
                "&:focus-visible": { outline: `2px solid ${alpha(c, 0.6)}`, outlineOffset: 2 },
              }}
            >
              {learnedToggleLabel(open)}
            </Box>
          )}
          {roomy && (
            <Box sx={{ ml: "auto" }}>
              <SignificanceBar value={entry.significance} color={c} />
            </Box>
          )}
        </Stack>

        {open && (
          <Box sx={{ maxWidth: scale.measure }}>
            <LearnedResult entry={entry} color={c} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* ──────────────────────────────────────────────────── panel */

export function CharacterTimeline({
  entries,
  density = "compact",
  filterHint,
}: {
  /** Pre-filtered entries. Omitted, the component assembles the full timeline. */
  entries?: TimelineEntry[];
  density?: TimelineDensity;
  /** When set, shows that this rail is a filtered slice (e.g. Brain → recently learned). */
  filterHint?: string;
} = {}) {
  const { state } = useProfileStore();
  const assembled = React.useMemo(() => buildTimelineEntries(state.feedEvents), [state.feedEvents]);
  const list = entries ?? assembled;

  if (list.length === 0) {
    return (
      <Box sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          No timeline events yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 0.5 }}>
      {filterHint && (
        <Box
          sx={{
            mb: 1.25,
            px: 1,
            py: 0.7,
            borderRadius: 1.5,
            border: "1px solid",
            borderColor: alpha(BRAIN_ACCENT, 0.28),
            bgcolor: alpha(BRAIN_ACCENT, 0.06),
            display: "flex",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <Chip
            label="Filtered"
            size="small"
            sx={{
              height: 18,
              fontSize: "0.58rem",
              fontWeight: 800,
              bgcolor: alpha(BRAIN_ACCENT, 0.14),
              color: BRAIN_ACCENT,
              "& .MuiChip-label": { px: 0.7 },
            }}
          />
          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.35, fontWeight: 600 }}>
            {filterHint}
          </Typography>
        </Box>
      )}
      {list.map((entry, i) => (
        <TimelineNode key={entry.id} entry={entry} isLast={i === list.length - 1} density={density} />
      ))}
    </Box>
  );
}
