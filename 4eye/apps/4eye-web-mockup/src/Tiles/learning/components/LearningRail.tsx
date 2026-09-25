"use client";

/**
 * LearningRail — the session at its smallest, for the collapsed dock.
 *
 * The point of a minified panel is not that it takes less room; it is that it
 * still tells you something. A rail of unlabelled icons would fail that — you
 * would have to expand it to learn anything, which makes collapsing it pure
 * loss. So the rail carries the numbers that actually move during a session
 * (modality coverage, checklist progress, live APM) as rings, the chosen input
 * type as its own glyph, and the selected options as their initials. That is
 * the same bargain `SectionDisclosure` strikes with `meta` + `adornment`: a
 * collapsed row should say *what*, not only *how many*.
 *
 * Laid out either vertically (rail down the side of the workbench) or
 * horizontally (a strip above a full-width panel), because the three workbench
 * layouts need both and the content is identical.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";

import { useSurface } from "@4eye/web/components/surface";
import {
  LEARNING_INPUT_TYPE_META,
  LEARNING_OPTION_GROUP_LABEL,
} from "../model/types";
import { selectedOptions, stepPosition } from "../model/chatContext";
import { formatApm, formatLiteralApm, PACE_BAND_META } from "../model/apm";
import { useLearning } from "../store/LearningProvider";
import { InputTypeIcon } from "./InputTypeIcon";

/**
 * A ring rather than a bar: at 34px a bar is a smear, while a ring keeps its
 * proportion legible and leaves the middle free for the number itself.
 */
function MetricRing({
  value,
  label,
  caption,
  accent,
  size = 34,
}: {
  /** 0–1. */
  value: number;
  /** Rendered inside the ring — keep it to three or four characters. */
  label: string;
  /** Tooltip text; the ring is too small to caption in place. */
  caption: string;
  accent: string;
  size?: number;
}) {
  const surface = useSurface();
  const ink = surface.ink(accent);
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <Tooltip title={caption} arrow placement="left">
      <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <Box
          component="svg"
          viewBox={`0 0 ${size} ${size}`}
          sx={{ width: size, height: size, transform: "rotate(-90deg)" }}
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={alpha(accent, 0.2)}
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={ink}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - Math.min(1, Math.max(0, value)))}
            style={{ transition: "stroke-dashoffset 320ms ease" }}
          />
        </Box>
        <Typography
          aria-label={caption}
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: ink,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/** The chosen input type as its glyph — the one non-numeric fact worth the room. */
function InputGlyph({ accent }: { accent: string }) {
  const { session } = useLearning();
  const surface = useSurface();
  const type = session.inputType;
  const meta = type ? LEARNING_INPUT_TYPE_META[type] : undefined;
  const ink = surface.ink(accent);

  return (
    <Tooltip
      title={meta ? `Input: ${meta.label} — ${meta.blurb}` : "No input type chosen yet"}
      arrow
      placement="left"
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1.5,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          borderColor: meta ? alpha(accent, 0.4) : surface.dividerBorder,
          bgcolor: meta ? alpha(accent, 0.12) : "transparent",
          color: meta ? ink : surface.text.faint,
        }}
      >
        {meta ? (
          <InputTypeIcon name={meta.icon} sx={{ fontSize: 16 }} />
        ) : (
          <Typography sx={{ fontSize: 13, fontWeight: 800, lineHeight: 1 }}>–</Typography>
        )}
      </Box>
    </Tooltip>
  );
}

/**
 * Selected options as initials — S·A·C·C. Four letters carry the session's
 * whole personality in the width of one icon, and the tooltip spells them out.
 */
function OptionInitials({ accent, vertical }: { accent: string; vertical: boolean }) {
  const { session } = useLearning();
  const surface = useSurface();
  const opts = selectedOptions(session);
  if (opts.length === 0) return null;
  const ink = surface.ink(accent);

  return (
    <Tooltip
      title={opts
        .map((o) => `${LEARNING_OPTION_GROUP_LABEL[o.group]}: ${o.label}`)
        .join(" · ")}
      arrow
      placement={vertical ? "left" : "top"}
    >
      {/*
        Two columns when vertical rather than one. Four initials in a single
        column read as a stray stack of letters down the rail; a 2×2 block reads
        as one object, which is what it is.
      */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: vertical ? "repeat(2, 1fr)" : `repeat(${opts.length}, auto)`,
          justifyItems: "center",
          columnGap: 0.5,
          rowGap: 0.15,
          px: 0.5,
          py: 0.35,
          borderRadius: 1.5,
          bgcolor: surface.chipBg,
        }}
      >
        {opts.map((o) => (
          <Typography
            key={o.id}
            sx={{ fontSize: 9.5, fontWeight: 800, lineHeight: 1.25, color: ink }}
          >
            {o.label.charAt(0).toUpperCase()}
          </Typography>
        ))}
      </Box>
    </Tooltip>
  );
}

export interface LearningRailProps {
  accent: string;
  /** Stack downward (side rail) or across (strip above a wide panel). */
  orientation?: "vertical" | "horizontal";
}

export function LearningRail({ accent, orientation = "vertical" }: LearningRailProps) {
  const { session, progress, modalityCovered, modalityTotal } = useLearning();
  const vertical = orientation === "vertical";
  const { index, total } = stepPosition(session);

  return (
    <Stack
      sx={{
        flexDirection: vertical ? "column" : "row",
        alignItems: "center",
        gap: vertical ? 1 : 1.25,
      }}
    >
      <InputGlyph accent={accent} />
      <MetricRing
        value={modalityTotal === 0 ? 0 : modalityCovered / modalityTotal}
        label={`${modalityCovered}/${modalityTotal}`}
        caption={`${modalityCovered} of ${modalityTotal} learning modalities tagged`}
        accent={accent}
      />
      <MetricRing
        value={progress}
        label={`${Math.round(progress * 100)}%`}
        caption={
          total === 0
            ? "No steps in this session yet"
            : `Checklist — on step ${index} of ${total}`
        }
        accent={accent}
      />
      {session.throughput && (
        <MetricRing
          value={session.throughput.relative / 100}
          label={`${Math.round(session.throughput.apm)}`}
          caption={`Throughput — ${formatApm(session.throughput.apm)} · ${formatLiteralApm(session.throughput.literalApm)} · ${PACE_BAND_META[session.throughput.band].label}`}
          accent={PACE_BAND_META[session.throughput.band].color}
        />
      )}
      <OptionInitials accent={accent} vertical={vertical} />
    </Stack>
  );
}
