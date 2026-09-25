"use client";

/**
 * Entity Tile — shared slot visuals (brand-themed).
 *
 * Small primitives that render a TileSlot's value per its `render` hint.
 * All color decisions derive from the active MUI theme so the planning surface
 * always speaks the brand's language (purple primary ramp, semantic status,
 * success/error from the palette). Intended to render on `background.paper`.
 *
 *   WeightMeter — 0–100 importance as a purple-graded bar.
 *   DepthDots   — 1–7 complexity as filled dots, light→dark purple.
 *   StatusBadge — lifecycle status chip in a themed, semantic color.
 *   usePlanningColors() — the single source of color truth.
 */

import * as React from "react";
import { Box, Chip, Stack, Tooltip, Typography, alpha, useTheme } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import {
  progressBands,
  versionState,
  type ProgressBands,
  type ProgressTrait,
} from "@4eye/types";

/**
 * Lifecycle status → themed color. Brand purple for in-flight work, semantic
 * palette colors for terminal/alert states, muted text for dormant states.
 */
export function statusColor(theme: Theme, status: string): string {
  const p = theme.palette;
  switch (status) {
    case "active":
      return p.primary.main; // brand purple — work in motion
    case "planned":
      return p.primary.light; // soft purple — queued
    case "blocked":
      return p.error.main; // red — needs unblocking
    case "review":
      return "#e0911f"; // amber — awaiting review (warning palette is unset)
    case "done":
      return p.success.main; // green — shipped
    case "idea":
    case "archived":
    default:
      return alpha(p.text.primary, 0.45); // muted — dormant
  }
}

/** Importance ramp: muted → light purple → brand purple → deep purple. */
export function weightColor(theme: Theme, weight: number): string {
  const p = theme.palette;
  if (weight >= 80) return p.primary.dark; // deepest — dominant
  if (weight >= 55) return p.primary.main; // brand — strong
  if (weight >= 30) return p.primary.light; // soft — moderate
  return alpha(p.text.primary, 0.4); // muted — minor
}

/** Theme-aware color helpers for non-component call sites (e.g. column dots). */
export function usePlanningColors() {
  const theme = useTheme();
  return React.useMemo(
    () => ({
      status: (s: string) => statusColor(theme, s),
      weight: (w: number) => weightColor(theme, w),
    }),
    [theme],
  );
}

/**
 * Static status palette retained for non-themed contexts. Prefer
 * {@link usePlanningColors} inside React components.
 */
export const STATUS_COLOR: Record<string, string> = {
  idea: "#9e9e9e",
  planned: "#a662d0",
  active: "#621890",
  blocked: "#f91a4b",
  review: "#e0911f",
  done: "#09c577",
  archived: "#9e9e9e",
};

export function WeightMeter({ weight, width = 72 }: { weight: number; width?: number }) {
  const theme = useTheme();
  const color = weightColor(theme, weight);
  const pct = Math.max(0, Math.min(100, weight));
  return (
    <Tooltip title={`Weight ${weight}/100 — importance`} arrow>
      <Stack spacing={0.75} sx={{ flexDirection: "row", alignItems: "center", flexShrink: 0 }}>
        <Box sx={{ width, height: 6, borderRadius: 3, bgcolor: alpha(color, 0.16), overflow: "hidden" }}>
          <Box
            sx={{
              width: `${pct}%`,
              height: "100%",
              borderRadius: 3,
              background: `linear-gradient(90deg, ${alpha(color, 0.7)}, ${color})`,
              transition: "width 200ms ease",
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color, minWidth: 22, textAlign: "right" }}>
          {weight}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

export function DepthDots({ depth, size = 7 }: { depth: number; size?: number }) {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const off = alpha(theme.palette.text.primary, 0.1);
  return (
    <Tooltip title={`Depth ${depth}/7 — complexity`} arrow>
      <Stack spacing={0.4} sx={{ flexDirection: "row", alignItems: "center", flexShrink: 0 }}>
        {[1, 2, 3, 4, 5, 6, 7].map((tier) => {
          const on = tier <= depth;
          return (
            <Box
              key={tier}
              sx={{
                width: size,
                height: size,
                borderRadius: "50%",
                bgcolor: on ? alpha(accent, 0.35 + tier * 0.09) : off,
                transition: "background-color 150ms ease",
              }}
            />
          );
        })}
      </Stack>
    </Tooltip>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const theme = useTheme();
  const color = statusColor(theme, status);
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        height: 20,
        bgcolor: alpha(color, 0.14),
        color,
        fontWeight: 700,
        fontSize: 10.5,
        letterSpacing: 0.2,
        textTransform: "capitalize",
        border: `1px solid ${alpha(color, 0.32)}`,
        "& .MuiChip-label": { px: 0.9 },
      }}
    />
  );
}

/* ------------------------------------------------------------- progress */

/** Band colors: done = shipped (green), planned = committed (brand), ideas = horizon. */
function progressColors(theme: Theme) {
  return {
    done: theme.palette.success.main,
    planned: theme.palette.primary.main,
    ideas: alpha(theme.palette.text.primary, 0.14),
    track: alpha(theme.palette.text.primary, 0.08),
  };
}

/**
 * Color a version milestone by the band its position falls in, so the badge
 * matches the bar underneath it: green if already shipped (within done),
 * brand-purple if within committed/planned scope, muted if in the open horizon.
 */
function milestoneColor(theme: Theme, at: number, b: ProgressBands): string {
  const c = progressColors(theme);
  if (at <= b.done) return c.done;
  if (at <= b.done + b.planned) return c.planned;
  return alpha(theme.palette.text.primary, 0.55);
}

/** Tooltip body shared by both meters: the done/planned/ideas breakdown + version. */
function progressSummary(progress: ProgressTrait): string {
  const b = progressBands(progress);
  const { current, next } = versionState(progress);
  const parts = [`Done ${Math.round(b.done)}%`];
  if (b.planned > 0) parts.push(`planned ${Math.round(b.planned)}%`);
  if (b.ideas > 0) parts.push(`ideas ${Math.round(b.ideas)}%`);
  let line = parts.join(" · ");
  if (current) line += ` — currently ${current.label}`;
  if (next) line += `, ${next.label} at ${next.at}%`;
  return line;
}

/**
 * ProgressOrb — compact circular completion indicator for list rows. A ring
 * filled to the done %, with the number at its center. Deliberately minimal:
 * hover reveals the full done/planned/ideas + version breakdown.
 */
export function ProgressOrb({
  progress,
  size = 28,
}: {
  progress: ProgressTrait;
  size?: number;
}) {
  const theme = useTheme();
  const c = progressColors(theme);
  const b = progressBands(progress);
  const done = Math.round(b.done);
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (b.done / 100) * circ;

  return (
    <Tooltip title={progressSummary(progress)} arrow>
      <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <Box
          component="svg"
          width={size}
          height={size}
          sx={{ display: "block", transform: "rotate(-90deg)" }}
        >
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={c.track} strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={c.done}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ - dash}`}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: 9, fontWeight: 800, color: "text.primary", lineHeight: 1 }}>
            {done}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
}

/**
 * VersionTimeline — detailed progress view for the expanded inspector card.
 * A tall labeled bar (done/planned/ideas), version ticks with labels, a
 * legend, and a list of versions (reached vs upcoming) with their notes.
 */
export function VersionTimeline({ progress }: { progress: ProgressTrait }) {
  const theme = useTheme();
  const c = progressColors(theme);
  const b = progressBands(progress);
  const { ordered, current } = versionState(progress);

  const legend: { label: string; value: number; color: string }[] = [
    { label: "Done", value: b.done, color: c.done },
    { label: "Planned", value: b.planned, color: alpha(c.planned, 0.55) },
    { label: "Ideas", value: b.ideas, color: c.ideas },
  ];

  return (
    <Stack spacing={1.25}>
      {/* tall bar with version ticks + labels */}
      <Box sx={{ pt: 2.25, pb: 0.25 }}>
        <Box
          sx={{
            position: "relative",
            height: 12,
            borderRadius: 4,
            bgcolor: c.track,
            overflow: "visible",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0, borderRadius: 4, overflow: "hidden", display: "flex" }}>
            <Box sx={{ width: `${b.done}%`, height: "100%", bgcolor: c.done }} />
            <Box sx={{ width: `${b.planned}%`, height: "100%", bgcolor: alpha(c.planned, 0.55) }} />
            <Box
              sx={{
                width: `${b.ideas}%`,
                height: "100%",
                backgroundImage: `repeating-linear-gradient(45deg, ${c.ideas}, ${c.ideas} 3px, transparent 3px, transparent 6px)`,
              }}
            />
          </Box>
          {ordered.map((m) => {
            const reached = m.at <= b.done;
            const mColor = milestoneColor(theme, m.at, b);
            return (
              <Box
                key={m.label}
                sx={{
                  position: "absolute",
                  top: -3,
                  bottom: -3,
                  left: `${m.at}%`,
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: "100%",
                    mb: 0.25,
                    fontSize: 9.5,
                    fontWeight: 800,
                    letterSpacing: 0.3,
                    whiteSpace: "nowrap",
                    color: mColor,
                  }}
                >
                  {m.label}
                </Typography>
                <Box
                  sx={{
                    width: "2px",
                    height: "100%",
                    bgcolor: reached ? alpha(theme.palette.common.white, 0.9) : alpha(theme.palette.text.primary, 0.4),
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* legend */}
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1.5 }}>
        {legend.map((l) => (
          <Stack key={l.label} sx={{ flexDirection: "row", alignItems: "center", gap: 0.6 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "3px",
                bgcolor: l.color,
                ...(l.label === "Ideas" && {
                  backgroundImage: `repeating-linear-gradient(45deg, ${c.ideas}, ${c.ideas} 2px, transparent 2px, transparent 4px)`,
                  border: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
                }),
              }}
            />
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
              {l.label} {Math.round(l.value)}%
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* version list */}
      {ordered.length > 0 && (
        <Stack spacing={0.5} sx={{ mt: 0.25 }}>
          {ordered.map((m) => {
            const reached = m.at <= b.done;
            const isCurrent = current?.label === m.label;
            const mColor = milestoneColor(theme, m.at, b);
            return (
              <Stack
                key={m.label}
                sx={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1.5,
                  bgcolor: isCurrent ? alpha(mColor, 0.1) : "transparent",
                  border: "1px solid",
                  borderColor: isCurrent ? alpha(mColor, 0.3) : "transparent",
                }}
              >
                <Chip
                  size="small"
                  label={m.label}
                  sx={{
                    height: 18,
                    fontSize: 10,
                    fontWeight: 800,
                    bgcolor: alpha(mColor, 0.16),
                    color: mColor,
                    "& .MuiChip-label": { px: 0.75 },
                  }}
                />
                <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", minWidth: 30, mt: 0.15 }}>
                  {m.at}%
                </Typography>
                <Typography variant="caption" sx={{ color: reached ? "text.primary" : "text.secondary", flex: 1, mt: 0.15 }}>
                  {m.note ?? (reached ? "Reached" : "Upcoming")}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}

export function ValueBadge({ value }: { value: React.ReactNode }) {
  const theme = useTheme();
  const color = theme.palette.primary.main;
  return (
    <Chip
      label={value}
      size="small"
      sx={{
        height: 20,
        bgcolor: alpha(color, 0.1),
        color,
        fontWeight: 700,
        fontSize: 10.5,
        border: `1px solid ${alpha(color, 0.28)}`,
      }}
    />
  );
}

export function formatDate(ts: number): string {
  try {
    return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return String(ts);
  }
}
