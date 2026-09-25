"use client";

import { useEffect, useRef } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { animate } from "animejs";
import { ShapeChip, SHAPE_CHIP_SIZE, type ChipShape } from "@expanse/brand-core";
import { COLOR_MAP, type SymbolColor, type SymbolName } from "@4eye/types";
import { SoftGoalGlyph } from "./SoftGoalGlyph";

export interface SymbolEntry {
  symbol: SymbolName;
  symbolColor: SymbolColor;
  /** Optional name shown on hover (e.g. goal word). */
  label?: string;
}

const SLOT_GAP = 3;
const CHIP_BIG_W = SHAPE_CHIP_SIZE.big.w;
const CHIP_SMALL_W = SHAPE_CHIP_SIZE.small.w;
export const SLOT_W_BIG = CHIP_BIG_W * 3 + (3 - 1) * SLOT_GAP;
export const SLOT_W_SMALL = CHIP_SMALL_W * 3 + (3 - 1) * SLOT_GAP;

/**
 * MorphingTabContent — composite content for a Goals / Acting-as tab.
 *
 *   empty    : [KindIcon] [label]
 *   selected : [KindIcon] [BIG filled shape chips]
 */
export function MorphingTabContent({
  KindIcon,
  label,
  selected,
  max,
  shape = "triangle",
  compact = false,
  glyphColor,
}: {
  KindIcon: React.ComponentType<{ sx?: object }>;
  label: string;
  selected: SymbolEntry[];
  max: number;
  shape?: ChipShape;
  compact?: boolean;
  glyphColor?: SymbolColor;
}) {
  const isSelected = selected.length > 0;
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<boolean | null>(null);

  useEffect(() => {
    const stripEl = stripRef.current;
    const labelEl = compact ? null : labelRef.current;
    if (!stripEl) return;
    const prev = prevRef.current;
    prevRef.current = isSelected;

    if (prev === null) {
      if (labelEl) {
        labelEl.style.opacity = isSelected ? "0" : "1";
        labelEl.style.transform = isSelected ? "translateY(-4px)" : "translateY(0px)";
      }
      stripEl.style.opacity = isSelected ? "1" : "0";
      stripEl.style.transform = isSelected
        ? "translateY(0px) scale(1)"
        : "translateY(4px) scale(0.55)";
      return;
    }
    if (prev === isSelected) return;

    if (isSelected) {
      if (labelEl) {
        animate(labelEl, { opacity: [1, 0], translateY: [0, -4], duration: 180, ease: "out(2)" });
      }
      animate(stripEl, {
        opacity: [0, 1],
        translateY: [4, 0],
        scale: [0.55, 1],
        duration: 260,
        ease: "outBack(1.4)",
      });
    } else {
      if (labelEl) {
        animate(labelEl, { opacity: [0, 1], translateY: [-4, 0], duration: 220, ease: "out(2)" });
      }
      animate(stripEl, {
        opacity: [1, 0],
        translateY: [0, 4],
        scale: [1, 0.55],
        duration: 180,
        ease: "out(2)",
      });
    }
  }, [isSelected, compact]);

  const slotW = compact ? SLOT_W_SMALL : SLOT_W_BIG;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: compact ? 0.75 : 1,
        height: 24,
      }}
    >
      <KindIcon sx={{ fontSize: 18 }} />
      <Box
        sx={{
          position: "relative",
          width: slotW,
          height: 24,
          flexShrink: 0,
        }}
      >
        {!compact && (
          <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", pointerEvents: "none" }}>
            <Typography
              ref={labelRef}
              component="span"
              variant="caption"
              sx={{ fontWeight: 600, lineHeight: 1, whiteSpace: "nowrap", willChange: "opacity, transform" }}
            >
              {label}
            </Typography>
          </Box>
        )}

        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <Box
            ref={stripRef}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: `${SLOT_GAP}px`,
              willChange: "opacity, transform",
              transformOrigin: "left center",
              pointerEvents: isSelected ? "auto" : "none",
            }}
          >
            {Array.from({ length: max }).map((_, i) => {
              const entry = selected[i];
              if (!entry) return <Box key={i} sx={{ width: 0, height: 0 }} />;
              const hex = COLOR_MAP[entry.symbolColor];
              const glyphSize = compact ? SHAPE_CHIP_SIZE.small.glyphSize : SHAPE_CHIP_SIZE.big.glyphSize;
              const chip = (
                <ShapeChip
                  filled
                  shape={shape}
                  hex={hex}
                  scale={compact ? "small" : "big"}
                  glyph={
                    <SoftGoalGlyph
                      symbol={entry.symbol}
                      color={glyphColor ?? entry.symbolColor}
                      size={glyphSize}
                    />
                  }
                />
              );
              return entry.label ? (
                <Tooltip key={i} title={entry.label} arrow>
                  <Box sx={{ display: "inline-flex", lineHeight: 0 }}>{chip}</Box>
                </Tooltip>
              ) : (
                <Box key={i} sx={{ display: "inline-flex", lineHeight: 0 }}>
                  {chip}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function DomainTabContent({
  DomainIcon,
  label,
  compact = false,
}: {
  DomainIcon: React.ComponentType<{ sx?: object }>;
  label: string;
  compact?: boolean;
}) {
  const slotW = compact ? SLOT_W_SMALL : SLOT_W_BIG;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: compact ? 0.75 : 1,
        height: 24,
      }}
    >
      <DomainIcon sx={{ fontSize: 18 }} />
      <Box
        sx={{
          position: "relative",
          width: slotW,
          height: 24,
          flexShrink: 0,
        }}
      >
        {!compact && (
          <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", pointerEvents: "none" }}>
            <Typography
              component="span"
              variant="caption"
              sx={{
                fontWeight: 600,
                lineHeight: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: slotW,
              }}
            >
              {label}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
