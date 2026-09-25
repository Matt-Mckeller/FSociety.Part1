"use client";

/**
 * Seeding — shared visual vocabulary.
 *
 * Tiny, reusable primitives that make edge metadata readable at a glance:
 *   - WeightMeter: 0–100 importance as a color-graded bar (+ optional value).
 *   - DepthDots:   1–7 treatment depth as filled dots, light→dark.
 *   - StatusBadge: draft / sequence / live with a consistent color.
 *   - statusColor / weightColor: the single source of color truth.
 *
 * Keep all seeding color decisions here so every surface stays consistent.
 */

import * as React from "react";
import { Box, Chip, Stack, Tooltip, Typography, alpha } from "@mui/material";

import {
  DEPTH_TIERS,
  STATUS_LABEL,
  type ProjectMedium,
  type SeedStatus,
} from "../model/types";
import { BrandIcon } from "./BrandIcon";
import type { GlyphName } from "./brand-glyphs";

// ── Color truth ──────────────────────────────────────────────────────────────
export const STATUS_COLOR: Record<SeedStatus, string> = {
  draft: "#9e9e9e", // gray  — not yet promoted
  sequence: "#1976d2", // blue — assembled into a sequence
  live: "#2e7d32", // green — shipped
};

/** Importance color ramp: low gray → mid blue → high green. */
export function weightColor(weight: number): string {
  if (weight >= 85) return "#2e7d32"; // green — dominant
  if (weight >= 60) return "#1976d2"; // blue  — strong
  if (weight >= 35) return "#f59e0b"; // amber — moderate
  return "#9e9e9e"; // gray  — minor
}

// ── WeightMeter ──────────────────────────────────────────────────────────────
export function WeightMeter({
  weight,
  width = 64,
  showValue = true,
  label,
}: {
  weight: number;
  width?: number;
  showValue?: boolean;
  /** Context for the tooltip suffix (e.g. "importance", "priority"). */
  label?: string;
}) {
  const color = weightColor(weight);
  const suffix = label ? ` — ${label}` : "";
  return (
    <Tooltip title={`Weight ${weight} / 100${suffix}`} arrow>
      <Stack
        spacing={0.75}
        sx={{ flexDirection: "row", alignItems: "center", flexShrink: 0 }}
      >
        <Box
          sx={{
            width,
            height: 6,
            borderRadius: 3,
            bgcolor: alpha(color, 0.18),
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${Math.max(0, Math.min(100, weight))}%`,
              height: "100%",
              borderRadius: 3,
              bgcolor: color,
              transition: "width 200ms ease",
            }}
          />
        </Box>
        {showValue && (
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color, minWidth: 22, textAlign: "right" }}
          >
            {weight}
          </Typography>
        )}
      </Stack>
    </Tooltip>
  );
}

// ── DepthDots ────────────────────────────────────────────────────────────────
export function DepthDots({ depth, size = 7 }: { depth: number; size?: number }) {
  return (
    <Tooltip
      title={`Depth ${depth}/7 · ${DEPTH_TIERS[depth] ?? depth} — treatment elaborateness`}
      arrow
    >
      <Stack
        spacing={0.4}
        sx={{ flexDirection: "row", alignItems: "center", flexShrink: 0 }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((tier) => {
          const on = tier <= depth;
          // light→dark ramp as depth increases
          const shade = 20 + tier * 9; // 29%..83% lightness inverse
          return (
            <Box
              key={tier}
              sx={{
                width: size,
                height: size,
                borderRadius: "50%",
                bgcolor: on ? `hsl(210 45% ${70 - shade / 2}%)` : "#e8e8e8",
                transition: "background-color 150ms ease",
              }}
            />
          );
        })}
      </Stack>
    </Tooltip>
  );
}

// ── StatusBadge ──────────────────────────────────────────────────────────────
const STATUS_HINT: Record<SeedStatus, string> = {
  draft: "Draft — not yet assembled into a sequence",
  sequence: "In Sequence — staged, awaiting promotion to live",
  live: "Live — shipped into the canonical cut",
};

export function StatusBadge({
  status,
  showLabel = true,
}: {
  status: SeedStatus;
  /** When false, renders a compact dot-style badge. @default true */
  showLabel?: boolean;
}) {
  const color = STATUS_COLOR[status];
  return (
    <Tooltip title={STATUS_HINT[status]} arrow>
      <Chip
        label={showLabel ? STATUS_LABEL[status] : ""}
        size="small"
        sx={{
          height: 20,
          bgcolor: alpha(color, 0.16),
          color,
          fontWeight: 700,
          fontSize: 10.5,
          letterSpacing: 0.2,
          border: `1px solid ${alpha(color, 0.35)}`,
          "& .MuiChip-label": { px: showLabel ? 0.9 : 0.4 },
        }}
      />
    </Tooltip>
  );
}

// ── InfoChip — reusable chip + tooltip + optional glyph ───────────────────────
export interface InfoChipProps {
  label: React.ReactNode;
  tooltip: React.ReactNode;
  /** Brand glyph rendered as a leading icon. */
  glyph?: GlyphName;
  /** Accent color for text, glyph, border, and wash. @default "#2c4f76" */
  color?: string;
  /** Chip height. @default 20 */
  size?: number;
}

/**
 * The canonical compact metadata pill: glyph + label, always tooltip-backed.
 * Use everywhere a small fact needs a hover explanation (status, medium,
 * counts, weights). Keeps density high while staying discoverable.
 */
export function InfoChip({
  label,
  tooltip,
  glyph,
  color = "#2c4f76",
  size = 20,
}: InfoChipProps) {
  return (
    <Tooltip title={tooltip} arrow>
      <Stack
        spacing={0.5}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          height: size,
          px: 0.85,
          borderRadius: size / 2,
          bgcolor: alpha(color, 0.1),
          border: `1px solid ${alpha(color, 0.3)}`,
          color,
          cursor: "default",
          flexShrink: 0,
          maxWidth: "100%",
        }}
      >
        {glyph && (
          <Box sx={{ display: "inline-flex", flexShrink: 0 }}>
            <BrandIcon name={glyph} size={Math.round(size * 0.62)} />
          </Box>
        )}
        <Typography
          component="span"
          sx={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: 0.2,
            lineHeight: 1,
            textTransform: "capitalize",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

// ── MediumChip — project medium (animation / video / image / audio) ───────────
const MEDIUM_META: Record<
  ProjectMedium,
  { glyph: GlyphName; color: string; hint: string }
> = {
  animation: {
    glyph: "animation",
    color: "#7c3aed",
    hint: "Animation — frame sequences built in the gallery app",
  },
  video: { glyph: "sequence", color: "#1976d2", hint: "Video — live-action or rendered footage" },
  image: { glyph: "scene", color: "#2e7d32", hint: "Image — single still frames" },
  audio: { glyph: "perspective", color: "#f59e0b", hint: "Audio — sound, score, or voice" },
};

export function MediumChip({ medium, size = 20 }: { medium: ProjectMedium; size?: number }) {
  const meta = MEDIUM_META[medium];
  return (
    <InfoChip
      label={medium}
      tooltip={meta.hint}
      glyph={meta.glyph}
      color={meta.color}
      size={size}
    />
  );
}
