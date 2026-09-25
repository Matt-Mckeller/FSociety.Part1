"use client";

import * as React from "react";
import { Box, useTheme } from "@mui/material";

/**
 * Single eye from the 4eye mark — shared HUD / permissions tab glyph.
 * Matches the almond eyes in {@link FourEyeMark}.
 */
export function FourEyeIcon({
  size = 16,
  title,
  color,
  gleam,
}: {
  size?: number;
  title?: string;
  /** Outer stroke / iris ring. Defaults to theme primary light. */
  color?: string;
  /** Pupil / inner gleam. Defaults to theme info. */
  gleam?: string;
}) {
  const theme = useTheme();
  const ink = color ?? theme.palette.primary.light ?? theme.palette.primary.main;
  const glow = gleam ?? theme.palette.info?.main ?? "#22d3ee";
  // ViewBox fits one almond eye tightly (cx=40, cy=24 in a 80×48 frame).
  const cx = 40;
  const cy = 24;
  const almond = (rx: number, ry: number) =>
    `M ${cx - rx} ${cy} Q ${cx} ${cy - ry} ${cx + rx} ${cy} Q ${cx} ${cy + ry} ${cx - rx} ${cy} Z`;

  return (
    <Box
      component="svg"
      viewBox="0 0 80 48"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      sx={{ width: size, height: size * (48 / 80), display: "block", flexShrink: 0 }}
    >
      {title ? <title>{title}</title> : null}
      <path d={almond(28, 16)} fill="none" stroke={ink} strokeWidth={2.1} strokeLinejoin="round" />
      <path d={almond(16, 9)} fill="none" stroke={glow} strokeWidth={1.5} opacity={0.9} />
      <circle cx={cx} cy={cy} r={5.4} fill="none" stroke={ink} strokeWidth={1.35} opacity={0.7} />
      <circle cx={cx} cy={cy} r={2.6} fill={glow} />
      <circle cx={cx + 1.4} cy={cy - 1.4} r={0.9} fill="#ffffff" opacity={0.85} />
    </Box>
  );
}

/**
 * Four nested-eye marks in a diamond — the 4eye held behind closed lids.
 * Cardinal eyes look back at the one logging in; the center is the portal in.
 */
export function FourEyeMark({
  size = 220,
  title = "4eye",
}: {
  size?: number;
  title?: string;
}) {
  const theme = useTheme();
  const rawId = React.useId().replace(/:/g, "");
  const glow = `fe-glow-${rawId}`;
  const ring = `fe-ring-${rawId}`;
  const eye = theme.palette.info?.main ?? "#22d3ee";
  const ink = theme.palette.primary.light ?? theme.palette.primary.main;

  return (
    <Box
      component="svg"
      viewBox="0 0 240 240"
      role="img"
      aria-label={title}
      sx={{
        width: size,
        height: size,
        display: "block",
        overflow: "visible",
        "@media (prefers-reduced-motion: reduce)": {
          "& .fe-pulse, & .fe-blink, & .fe-portal, & .fe-orbit": {
            animation: "none",
          },
        },
        "@keyframes fePulse": {
          "0%, 100%": { opacity: 0.22, transform: "scale(1)" },
          "50%": { opacity: 0.55, transform: "scale(1.04)" },
        },
        "@keyframes feBlink": {
          "0%, 82%, 100%": { transform: "scaleY(1)" },
          "86%": { transform: "scaleY(0.12)" },
          "90%": { transform: "scaleY(1)" },
        },
        "@keyframes fePortal": {
          "0%, 100%": { opacity: 0.7, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.28)" },
        },
        "@keyframes feOrbit": {
          "0%": { strokeDashoffset: 0 },
          "100%": { strokeDashoffset: -220 },
        },
        "& .fe-pulse": {
          transformOrigin: "120px 120px",
          animation: "fePulse 5.6s ease-in-out infinite",
        },
        "& .fe-blink": {
          transformOrigin: "center",
          animation: "feBlink 6.4s ease-in-out infinite",
        },
        "& .fe-portal": {
          transformOrigin: "120px 120px",
          animation: "fePortal 4.2s ease-in-out infinite",
        },
        "& .fe-orbit": {
          animation: "feOrbit 18s linear infinite",
        },
      }}
    >
      <title>{title}</title>
      <defs>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={eye} stopOpacity={0.85} />
          <stop offset="55%" stopColor={eye} stopOpacity={0.18} />
          <stop offset="100%" stopColor={eye} stopOpacity={0} />
        </radialGradient>
        <linearGradient id={ring} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={eye} stopOpacity={0.05} />
          <stop offset="50%" stopColor={eye} stopOpacity={0.7} />
          <stop offset="100%" stopColor={eye} stopOpacity={0.05} />
        </linearGradient>
      </defs>

      <circle className="fe-pulse" cx={120} cy={120} r={108} fill={`url(#${glow})`} />
      <circle
        className="fe-orbit"
        cx={120}
        cy={120}
        r={98}
        fill="none"
        stroke={`url(#${ring})`}
        strokeWidth={1.15}
        strokeDasharray="6 14"
        opacity={0.7}
      />
      <polygon
        points="120,44 196,120 120,196 44,120"
        fill="none"
        stroke={ink}
        strokeWidth={1.1}
        opacity={0.28}
      />

      <MarkEye cx={120} cy={52} color={ink} gleam={eye} delay="0s" />
      <MarkEye cx={188} cy={120} color={ink} gleam={eye} delay="0.45s" />
      <MarkEye cx={120} cy={188} color={ink} gleam={eye} delay="0.9s" />
      <MarkEye cx={52} cy={120} color={ink} gleam={eye} delay="1.35s" />

      <circle cx={120} cy={120} r={16} fill={`url(#${glow})`} />
      <circle cx={120} cy={120} r={11} fill="none" stroke={eye} strokeWidth={1.4} opacity={0.85} />
      <circle className="fe-portal" cx={120} cy={120} r={7} fill={eye} />
      <circle cx={123} cy={117} r={2.1} fill="#ffffff" opacity={0.9} />
    </Box>
  );
}

function MarkEye({
  cx,
  cy,
  color,
  gleam,
  delay,
}: {
  cx: number;
  cy: number;
  color: string;
  gleam: string;
  delay: string;
}) {
  const almond = (rx: number, ry: number) =>
    `M ${cx - rx} ${cy} Q ${cx} ${cy - ry} ${cx + rx} ${cy} Q ${cx} ${cy + ry} ${cx - rx} ${cy} Z`;

  return (
    <g
      className="fe-blink"
      style={{
        transformBox: "fill-box",
        transformOrigin: "center",
        animationDelay: delay,
      }}
    >
      <path d={almond(28, 16)} fill="none" stroke={color} strokeWidth={2.1} strokeLinejoin="round" />
      <path d={almond(16, 9)} fill="none" stroke={gleam} strokeWidth={1.5} opacity={0.9} />
      <circle cx={cx} cy={cy} r={5.4} fill="none" stroke={color} strokeWidth={1.35} opacity={0.7} />
      <circle cx={cx} cy={cy} r={2.6} fill={gleam} />
      <circle cx={cx + 1.4} cy={cy - 1.4} r={0.9} fill="#ffffff" opacity={0.85} />
    </g>
  );
}
