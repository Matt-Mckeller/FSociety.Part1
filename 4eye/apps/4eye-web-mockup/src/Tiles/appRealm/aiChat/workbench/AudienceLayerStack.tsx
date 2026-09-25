"use client";

/**
 * AudienceLayerStack — who else we are targeting and trying to fit in.
 *
 * Same disc-stack family as the coin stack, but the top face is a hollow
 * ring with people around it. The hole is the point: the cursor lives on
 * Aim. This is the surrounding room. Empty reads as a fit-ring waiting
 * to be filled — never a dash.
 */

import { Box, Tooltip, Typography, alpha } from "@mui/material";
import { AUDIENCE_CAST_META } from "@4eye/types";
import { ENTITY_ICONS } from "@4eye/features";
import type { SymbolColor, SymbolName } from "@4eye/types";

import { useSurface } from "@4eye/web/components/surface";

export interface AudienceLayer {
  id: string;
  name: string;
  symbol?: SymbolName;
  symbolColor?: SymbolColor;
}

const MAX_VISIBLE = 5;
const DISC_RX = 20;
const DISC_RY = 7;
const STEP = 11;
const PAD_X = 4;
const PAD_TOP = 10;
const PAD_BOTTOM = 8;

export function AudienceLayerStack({
  items,
  onOpen,
  compact = false,
}: {
  items: AudienceLayer[];
  onOpen?: () => void;
  compact?: boolean;
}) {
  const surface = useSurface();
  const AudiencesIcon = ENTITY_ICONS.audiences;
  const accent = AUDIENCE_CAST_META.color;
  const empty = items.length === 0;
  const visible = items.slice(0, MAX_VISIBLE);
  const overflow = Math.max(0, items.length - visible.length);
  const layerCount = Math.max(visible.length, compact ? 2 : 3);
  const vbH = PAD_TOP + DISC_RY + (layerCount - 1) * STEP + PAD_BOTTOM;
  const vbW = (DISC_RX + PAD_X) * 2;

  const layers = Array.from({ length: layerCount }, (_, i) => {
    const fromTop = i;
    const item = visible[fromTop];
    const cy = PAD_TOP + fromTop * STEP;
    return { item, cy, fromTop, isTop: fromTop === 0 };
  });

  const title = empty
    ? AUDIENCE_CAST_META.hint
    : items.map((a) => a.name).join(" · ");

  return (
    <Tooltip title={title} arrow placement="left">
      <Box
        role={onOpen ? "button" : undefined}
        tabIndex={onOpen ? 0 : undefined}
        onClick={onOpen}
        onKeyDown={
          onOpen
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen();
                }
              }
            : undefined
        }
        aria-label={
          empty
            ? "Who else — no audience yet. Click to fit someone in."
            : `${items.length} who else`
        }
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.55,
          width: compact ? 58 : 64,
          minHeight: compact ? 152 : 168,
          py: 1,
          px: 0.4,
          borderRadius: "10px",
          border: empty ? "1px dashed" : "1px solid",
          borderColor: empty ? alpha(accent, 0.32) : alpha(accent, 0.38),
          bgcolor: empty ? "transparent" : alpha(accent, 0.08),
          cursor: onOpen ? "pointer" : "default",
          "&:hover": onOpen
            ? { bgcolor: alpha(accent, empty ? 0.06 : 0.14), borderColor: accent }
            : undefined,
          "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 2 },
        }}
      >
        <AudiencesIcon
          sx={{ fontSize: compact ? 16 : 18, color: empty ? alpha(accent, 0.55) : accent }}
        />
        <Typography
          sx={{
            fontSize: 7.5,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: empty ? alpha(accent, 0.7) : surface.ink(accent),
            lineHeight: 1.15,
            textAlign: "center",
          }}
        >
          Who else
        </Typography>

        <Box
          component="svg"
          viewBox={`0 0 ${vbW} ${vbH}`}
          sx={{ width: "100%", flex: 1, minHeight: compact ? 64 : 72, display: "block" }}
          aria-hidden
        >
          {layers
            .slice()
            .reverse()
            .map(({ item, cy, fromTop, isTop }) => {
              const filled = Boolean(item) && !empty;
              const fill = filled ? accent : alpha(accent, 0.22);
              const face = filled
                ? alpha(accent, isTop ? 0.95 : 0.55 - fromTop * 0.08)
                : alpha(accent, isTop ? 0.16 : 0.1);
              const cx = vbW / 2;
              const ring = alpha(accent, empty ? 0.45 : 0.95);
              return (
                <g key={item?.id ?? `ghost-${fromTop}`}>
                  <ellipse cx={cx} cy={cy + DISC_RY * 0.55} rx={DISC_RX} ry={DISC_RY} fill={alpha(fill, 0.35)} />
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={DISC_RX}
                    ry={DISC_RY}
                    fill={face}
                    stroke={alpha(accent, filled ? 0.7 : 0.38)}
                    strokeWidth="0.8"
                  />
                  {isTop && (
                    <g>
                      {/* Hollow center — the cursor is not here. */}
                      <ellipse
                        cx={cx}
                        cy={cy}
                        rx={7.2}
                        ry={2.6}
                        fill="none"
                        stroke={ring}
                        strokeWidth="1.15"
                      />
                      <circle cx={cx} cy={cy - 5.4} r="1.55" fill={ring} />
                      <circle cx={cx - 8.4} cy={cy + 0.15} r="1.25" fill={ring} opacity="0.85" />
                      <circle cx={cx + 8.4} cy={cy + 0.15} r="1.25" fill={ring} opacity="0.85" />
                    </g>
                  )}
                </g>
              );
            })}
        </Box>

        {empty ? (
          <Typography
            sx={{
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: alpha(accent, 0.72),
              fontStyle: "italic",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            fit in
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 800,
              color: surface.ink(accent),
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {items.length}
            {overflow > 0 ? "+" : ""}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
}
