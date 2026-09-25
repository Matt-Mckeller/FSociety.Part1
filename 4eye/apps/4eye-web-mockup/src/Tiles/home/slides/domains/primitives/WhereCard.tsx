"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useRef, type ComponentType, type SVGProps } from "react";
import { TripleLayerPill } from "@expanse/brand-core";

import { strokesFromHex } from "./WherePill";
import { useResizeObserver } from "@4eye/web/hooks/dom";

/**
 * Height the card animates *to* from the chip's PILL_H (96px).
 * Tall enough for label + 1-line description + 1-line example without
 * crowding the icon at the top.
 */
export const CARD_H = 188;

export interface WhereCardProps {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  hex: string;
  description: string;
  example: string;
  /** Class applied to the outer wrapper — used by GSAP selectors. */
  className?: string;
}

/**
 * WhereCard — expanded form of `WherePill`. Same icon + label header as
 * the pill, plus a short description and a tiny example beneath. Designed
 * to crossfade in over the pill while the cell wrapper grows from
 * `PILL_H` → `CARD_H`, so the morph reads as the chip "opening up".
 */
export function WhereCard({
  label,
  Icon,
  hex,
  description,
  example,
  className = "where-card",
}: WhereCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { width: w, height: h } = useResizeObserver(wrapRef);
  const s = strokesFromHex(hex);

  return (
    <Box
      ref={wrapRef}
      className={className}
      sx={{
        position: "absolute",
        inset: 0,
        isolation: "isolate",
        filter: `drop-shadow(0 6px 18px ${s.shadow})`,
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      {w > 0 && h > 0 && (
        <TripleLayerPill
          width={w}
          height={h}
          preset="1-2-3_xs"
          fill={isDark ? "rgba(0,0,0,0.03)" : s.body}
          outerStroke={s.outer}
          centerStroke={s.center}
          innerStroke={s.inner}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
        />
      )}
      <Stack
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          height: "100%",
          px: 2,
          py: 2,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          backgroundColor: isDark ? "rgba(0,0,0,0.02)" : s.body,
          borderRadius: 4,
          textAlign: "center"
        }}>
        <Box
          sx={{
            width: 36,
            height: 36,
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
          <Icon style={{ fontSize: 18 }} />
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.07em",
            lineHeight: 1.2,
            color: isDark ? "common.white" : "text.primary",
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.82rem",
            lineHeight: 1.3,
            color: isDark ? "rgba(255,255,255,0.86)" : "text.primary",
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontStyle: "italic",
            fontSize: "0.72rem",
            lineHeight: 1.3,
            color: isDark ? "rgba(255,255,255,0.6)" : "text.secondary",
          }}
        >
          {example}
        </Typography>
      </Stack>
    </Box>
  );
}
