"use client";

/**
 * Command Center — SWOT view.
 *
 * The four-quadrant SWOT matrix. Strengths carry dual overall/current power
 * meters and sort by power; the other quadrants list impact-graded items.
 * Split out of the former combined Compass view; rendered inside the Compass
 * tabbed section alongside Strategic Focus, Goals, and Lenses.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";

import { GLOBAL_SWOT, type SwotItem } from "../../store/strategy-data";
import { COLOR_MAP } from "@4eye/types";
import { SwotGlyph } from "../planning-glyphs";
import { Panel } from "./shared";

const IMPACT_DOT: Record<SwotItem["impact"], number> = { high: 1, medium: 0.6, low: 0.35 };

/**
 * Compact dual power readout for a strength: a labelled mini-meter. Handles
 * `Infinity` (boundless) by filling the bar and showing ∞.
 */
function PowerMeter({ label, value, tone }: { label: string; value: number; tone: string }) {
  const boundless = !Number.isFinite(value);
  const pct = boundless ? 100 : Math.max(0, Math.min(100, value));
  return (
    <Tooltip
      title={`${label} power — ${boundless ? "boundless (∞)" : `${value}/100`}`}
      arrow
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 8.5,
            fontWeight: 800,
            letterSpacing: 0.3,
            textTransform: "uppercase",
            color: "text.disabled",
          }}
        >
          {label}
        </Typography>
        <Box sx={{ width: 38, height: 5, borderRadius: 3, bgcolor: alpha(tone, 0.16), overflow: "hidden" }}>
          <Box
            sx={{
              width: `${pct}%`,
              height: "100%",
              borderRadius: 3,
              background: `linear-gradient(90deg, ${alpha(tone, 0.6)}, ${tone})`,
            }}
          />
        </Box>
        <Typography sx={{ fontSize: 10, fontWeight: 800, color: tone, minWidth: 14 }}>
          {boundless ? "∞" : value}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

function SwotQuadrant({
  title,
  items,
  tone,
  /** Strengths carry overall/current power; show the dual meters when present. */
  nowTone,
}: {
  title: string;
  items: SwotItem[];
  tone: string;
  nowTone?: string;
}) {
  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(tone, 0.3),
        bgcolor: alpha(tone, 0.05),
        minHeight: 0,
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: 800, color: tone, letterSpacing: 0.4, textTransform: "uppercase" }}
      >
        {title}
      </Typography>
      <Stack spacing={0.75} sx={{ mt: 0.75 }}>
        {items.map((it) => (
          <Stack key={it.id} sx={{ flexDirection: "row", alignItems: "flex-start", gap: 0.75 }}>
            <Box
              sx={{
                mt: 0.6,
                width: 7,
                height: 7,
                borderRadius: "50%",
                flexShrink: 0,
                bgcolor: alpha(tone, IMPACT_DOT[it.impact]),
              }}
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
                {it.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                {it.description}
              </Typography>
              {it.note && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 0.25, fontStyle: "italic", color: alpha(tone, 0.9) }}
                >
                  {it.note}
                </Typography>
              )}
              {it.overallPower != null && (
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1.25, mt: 0.5, flexWrap: "wrap" }}
                >
                  <PowerMeter label="Overall" value={it.overallPower} tone={tone} />
                  {it.currentPower != null && (
                    <PowerMeter label="Now" value={it.currentPower} tone={nowTone ?? tone} />
                  )}
                </Stack>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export function SwotView() {
  // Strengths sort by overall power (primary), breaking ties on current power
  // (secondary). Infinity floats the boundless strength to the top.
  const strengths = React.useMemo(
    () =>
      [...GLOBAL_SWOT.strengths].sort(
        (a, b) =>
          (b.overallPower ?? 0) - (a.overallPower ?? 0) ||
          (b.currentPower ?? 0) - (a.currentPower ?? 0),
      ),
    [],
  );

  return (
    <Panel
      title={`SWOT · ${GLOBAL_SWOT.title}`}
      fill
      glyph={
        <Box sx={{ color: "primary.main", display: "flex" }}>
          <SwotGlyph size={18} />
        </Box>
      }
    >
      <Box
        sx={{
          display: "grid",
          gap: 1.25,
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        }}
      >
        <SwotQuadrant
          title="Strengths"
          items={strengths}
          tone={COLOR_MAP.green}
          nowTone={COLOR_MAP.blue}
        />
        <SwotQuadrant title="Weaknesses" items={GLOBAL_SWOT.weaknesses} tone={COLOR_MAP.red} />
        <SwotQuadrant title="Opportunities" items={GLOBAL_SWOT.opportunities} tone={COLOR_MAP.blue} />
        <SwotQuadrant title="Threats" items={GLOBAL_SWOT.threats} tone={COLOR_MAP.amber} />
      </Box>
    </Panel>
  );
}
