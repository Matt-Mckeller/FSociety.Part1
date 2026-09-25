"use client";

/**
 * PipelinePanelStack — gradient flat tiles with lego studs.
 *
 * Same stacked-layer family as Audience / CoinStack, but the faces are
 * square plates: a vertical blue gradient, a thin bottom lip, and 2×2
 * studs on the exposed top brick. Lower bricks hide their studs under
 * the plate above — the way real stacked tiles / legos read.
 */

import { useId } from "react";
import { Box } from "@mui/material";

const MAX_VISIBLE = 4;
const TILE_W = 22;
const TILE_H = 13;
const RX = 2.4;
const STEP = 10;
const LIP = 2.2;
const PAD_X = 5;
const PAD_TOP = 6;
const PAD_BOTTOM = 5;
const STUD_R = 1.55;
const STUD_DX = 4.15;
const STUD_DY = 3.35;

const GRADIENT = {
  top: "#7dd3fc",
  mid: "#3b82f6",
  deep: "#1d4ed8",
  lip: "#1e3a8a",
} as const;

function mixHex(hex: string, into: string, t: number): string {
  const a = parseInt(hex.slice(1), 16);
  const b = parseInt(into.slice(1), 16);
  const ch = (shift: number) => {
    const av = (a >> shift) & 0xff;
    const bv = (b >> shift) & 0xff;
    return Math.round(av + (bv - av) * t);
  };
  const r = ch(16);
  const g = ch(8);
  const bl = ch(0);
  return `#${((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1)}`;
}

function withAlpha(hex: string, a: number): string {
  const n = Math.round(Math.min(1, Math.max(0, a)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${n}`;
}

export function PipelinePanelStack({
  filled = 0,
  colors,
  size = 36,
}: {
  /** How many plates are seated. Ghost plates fill out the stack. */
  filled?: number;
  /** Per-layer colors (flow display). Falls back to the blue gradient. */
  colors?: string[];
  size?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const visibleFilled = Math.min(colors?.length ?? filled, MAX_VISIBLE);
  const layerCount = Math.max(visibleFilled, 3);
  const vbW = TILE_W + PAD_X * 2;
  const vbH = PAD_TOP + TILE_H + (layerCount - 1) * STEP + PAD_BOTTOM;
  const cx = vbW / 2;
  const gradId = `pipe-tile-${uid}`;

  const layers = Array.from({ length: layerCount }, (_, fromTop) => {
    const y = PAD_TOP + fromTop * STEP;
    const isFilled = fromTop < visibleFilled;
    const color = colors?.[fromTop];
    const t = layerCount === 1 ? 0 : fromTop / (layerCount - 1);
    return {
      y,
      fromTop,
      isTop: fromTop === 0,
      isFilled,
      color,
      depth: t,
    };
  });

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${vbW} ${vbH}`}
      sx={{ width: size, height: "auto", display: "block", overflow: "visible" }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GRADIENT.top} />
          <stop offset="48%" stopColor={GRADIENT.mid} />
          <stop offset="100%" stopColor={GRADIENT.deep} />
        </linearGradient>
      </defs>

      {layers
        .slice()
        .reverse()
        .map(({ y, fromTop, isTop, isFilled, color, depth }) => {
          const x = cx - TILE_W / 2;
          const face = color
            ? isFilled
              ? color
              : withAlpha(color, 0.22)
            : isFilled
              ? `url(#${gradId})`
              : withAlpha(GRADIENT.mid, 0.18);
          const lip = color
            ? mixHex(color, "#0b1224", isFilled ? 0.45 : 0.7)
            : isFilled
              ? mixHex(GRADIENT.deep, GRADIENT.lip, depth)
              : withAlpha(GRADIENT.lip, 0.28);
          const sheen = isFilled ? withAlpha("#ffffff", isTop ? 0.28 : 0.12) : withAlpha("#ffffff", 0.06);
          const stroke = isFilled ? withAlpha("#0b1224", 0.45) : withAlpha(GRADIENT.mid, 0.35);

          return (
            <g key={`tile-${fromTop}`}>
              <rect x={x} y={y} width={TILE_W} height={TILE_H} rx={RX} fill={lip} />
              <rect
                x={x}
                y={y}
                width={TILE_W}
                height={TILE_H - LIP}
                rx={RX}
                fill={face}
                stroke={stroke}
                strokeWidth="0.7"
              />
              <rect
                x={x + 1.2}
                y={y + 0.7}
                width={TILE_W - 2.4}
                height={2.1}
                rx={1}
                fill={sheen}
              />
              {isTop && (
                <g>
                  {[-STUD_DX, STUD_DX].flatMap((dx) =>
                    [0, STUD_DY].map((dy) => {
                      const scx = cx + dx;
                      const studY = y + 4.05 + dy;
                      return (
                        <g key={`stud-${dx}-${dy}`}>
                          <circle
                            cx={scx}
                            cy={studY + 0.45}
                            r={STUD_R}
                            fill={isFilled ? withAlpha("#0b1224", 0.35) : withAlpha(GRADIENT.deep, 0.2)}
                          />
                          <circle
                            cx={scx}
                            cy={studY}
                            r={STUD_R}
                            fill={
                              isFilled
                                ? color
                                  ? mixHex(color, "#ffffff", 0.28)
                                  : GRADIENT.top
                                : withAlpha(GRADIENT.top, 0.35)
                            }
                            stroke={isFilled ? withAlpha("#ffffff", 0.55) : withAlpha(GRADIENT.top, 0.4)}
                            strokeWidth="0.45"
                          />
                          <ellipse
                            cx={scx - 0.35}
                            cy={studY - 0.45}
                            rx={0.7}
                            ry={0.45}
                            fill={withAlpha("#ffffff", isFilled ? 0.7 : 0.25)}
                          />
                        </g>
                      );
                    }),
                  )}
                </g>
              )}
            </g>
          );
        })}
    </Box>
  );
}
