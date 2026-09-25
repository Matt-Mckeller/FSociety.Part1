"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useRef, type ComponentType, type SVGProps } from "react";
import { TripleLayerPill } from "@expanse/brand-core";
import { useResizeWidth } from "@4eye/web/hooks/dom";

// ── per-place neon stroke palette (matches MenuOrbList tone approach) ────────
type Rgb = readonly [number, number, number];
const rgb = (hex: string): Rgb => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
] as const;
const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r},${g},${b},${a})`;

// Higher-contrast palette: solid light body (no transparent body that
// disappears against white pages), stronger stroke, deeper shadow.
export const strokesFromHex = (hex: string) => {
  const base = rgb(hex);
  return {
    outer: rgba(base, 0.28),
    center: rgba(base, 0.55),
    inner: rgba(base, 1),
    chip: rgba(base, 0.22),
    // Solid paper-tone body so the pill reads as a discrete object on
    // white backgrounds (per project storybook bg conventions).
    body: "#f5f5f5",
    bodyH: "#eef2ee",
    shadow: `${hex}66`,
  };
};

// Taller "egg/orb" silhouette — vertical pill that puts the icon over
// the label with breathing room. Bumped from 96 → 140 to feel more like
// an egg/orb than a flat chip; the TripleLayerPill renders as a tall
// capsule at this aspect, which reads as an egg in context.
export const PILL_H = 140;

export interface WherePillProps {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  hex: string;
  /** Class applied to the outer wrapper — used by GSAP selectors. Defaults to "where-pill". */
  className?: string;
}

export function WherePill({ label, Icon, hex, className = "where-pill" }: WherePillProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const width = useResizeWidth(wrapRef);
  const s = strokesFromHex(hex);

  return (
    <Box
      ref={wrapRef}
      className={className}
      sx={{
        position: "relative",
        height: PILL_H,
        width: "100%",
        isolation: "isolate",
        filter: `drop-shadow(0 4px 14px ${s.shadow})`,
        transition: "transform 160ms ease, filter 160ms ease",
        "&:hover": {
          transform: "translateY(-3px)",
          filter: `drop-shadow(0 8px 20px ${s.shadow})`,
        },
        cursor: "default",
      }}
    >
      {width > 0 && (
        <TripleLayerPill
          width={width}
          height={PILL_H}
          preset="1-2-3_xs"
          fill={isDark ? "rgba(0,0,0,0.25)" : s.body}
          outerStroke={s.outer}
          centerStroke={s.center}
          innerStroke={s.inner}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
        />
      )}
      <Stack
        spacing={1.25}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          height: "100%",
          px: 1.5,

          // No backdrop-filter / no body fill — the TripleLayerPill below
          // already renders the solid paper-tone fill, so layering another
          // bg over it just dulled the stroke contrast.
          borderRadius: `${PILL_H / 2}px`
        }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: s.chip,
            color: hex,
            flexShrink: 0,
          }}
        >
          {/* @ts-expect-error MUI icon compat */}
          <Icon style={{ fontSize: 22 }} />
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.07em",
            textAlign: "center",
            lineHeight: 1.2,
            color: isDark ? "common.white" : "text.primary",
          }}
        >
          {label}
        </Typography>
      </Stack>
    </Box>
  );
}
