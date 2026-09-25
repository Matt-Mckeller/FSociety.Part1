"use client";

import { Box, ButtonBase, Typography, alpha } from "@mui/material";
import type { ComponentType } from "react";
import { CountBadge } from "@expanse/ui";
import { Symbol } from "@4eye/features";
import type { SymbolColor, SymbolName } from "@4eye/types";

import { useSurface } from "@4eye/web/components/surface";

/** Compact symbol descriptor for the bottom-left selection cluster. */
export interface NavTileSymbol {
  symbol: SymbolName;
  symbolColor: SymbolColor;
}

export interface AiChatNavTile {
  id: string;
  label: string;
  description: string;
  Icon: ComponentType;
  color: string;
  /** Optional badge count (e.g. selected entities). */
  badge?: number;
  /**
   * Optional list of selected-entity symbols to display as a small
   * cluster in the bottom-left of the tile. Up to `MAX_VISIBLE_SYMBOLS`
   * are rendered; overflow is implied by the count badge.
   */
  selectedSymbols?: NavTileSymbol[];
  /** Muted chrome — the tile is visible but not ready to use. */
  disabled?: boolean;
}

interface AiChatGridNavProps {
  tiles: AiChatNavTile[];
  activeTileId: string | null;
  onSelectTile: (id: string) => void;
}

const MAX_VISIBLE_SYMBOLS = 3;

/**
 * AiChatGridNav — full-width 6-column tile grid.
 *
 * Each tile shows the kind icon + label, with a centered avatar-style
 * stack of up to three selected-entity symbols below the label
 * (layout V1) and a top-right `CountBadge` (fixed accent) for the
 * total selection. Each symbol chip uses the tile's accent color for
 * its border/background while the inner icon keeps the entity's own
 * symbol color, so the cluster reads as "this kind, these entities".
 * Empty selections render the tile cleanly with no decoration.
 */
export function AiChatGridNav({ tiles, activeTileId, onSelectTile }: AiChatGridNavProps) {
  const surface = useSurface();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${tiles.length}, 1fr)`,
        gap: 0.75,
        p: 0.75,
        bgcolor: surface.chromeBg,
        borderRadius: 2,
        border: "1px solid",
        borderColor: surface.dividerBorder,
        flexShrink: 0,
      }}
    >
      {tiles.map((tile) => {
        const active = activeTileId === tile.id;
        const Icon = tile.Icon as ComponentType<{ sx?: object }>;
        const symbols = tile.selectedSymbols ?? [];
        const visibleSymbols = symbols.slice(0, MAX_VISIBLE_SYMBOLS);
        const overflow = symbols.length - visibleSymbols.length;
        const count = tile.badge ?? 0;
        const ink = surface.ink(tile.color);
        const muted = Boolean(tile.disabled);
        return (
          <ButtonBase
            key={tile.id}
            onClick={() => onSelectTile(tile.id)}
            aria-disabled={muted}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.25,
              p: 0.75,
              minHeight: 58,
              borderRadius: 1.5,
              position: "relative",
              border: "1px solid",
              borderColor: active ? alpha(tile.color, muted ? 0.35 : 0.8) : surface.dividerBorder,
              bgcolor: active ? alpha(tile.color, muted ? 0.05 : 0.1) : surface.chipBg,
              opacity: muted ? 0.5 : 1,
              transition: "all 120ms ease",
              "&:hover": {
                bgcolor: alpha(tile.color, muted ? 0.06 : 0.08),
                borderColor: alpha(tile.color, muted ? 0.3 : 0.55),
              },
            }}
          >
            <Icon
              sx={{
                fontSize: 20,
                color: muted ? surface.text.faint : active ? ink : surface.text.md,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: muted ? surface.text.faint : active ? ink : surface.text.hi,
                lineHeight: 1.1,
                textAlign: "center",
              }}
            >
              {tile.label}
            </Typography>

            {/* V1 — selected-entity avatar stack (centered, below label).
                Chips sit side-by-side normally; once there are 5+
                selections we collapse to an overlapping avatar stack
                so the cluster stays compact. Each chip keeps the
                entity's own border + icon color but the background is
                tinted with the tile's accent so the icon blends into
                the kind's color as a softer secondary tone. */}
            {visibleSymbols.length > 0 && (() => {
              const overlap = symbols.length >= 5;
              return (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: overlap ? 0 : 0.5,
                    "& > *": overlap ? { ml: -0.75 } : undefined,
                    "& > *:first-of-type": overlap ? { ml: 0 } : undefined,
                  }}
                >
                  {visibleSymbols.map((s, i) => (
                    <Box
                      key={i}
                      sx={{
                        outline: overlap
                          ? `2px solid ${alpha(tile.color, 0.35)}`
                          : "none",
                        borderRadius: 0.75,
                        display: "inline-flex",
                        backdropFilter: overlap ? "blur(2px)" : undefined,
                      }}
                    >
                      <Symbol
                        name={s.symbol}
                        color={s.symbolColor}
                        size={20}
                        variant="filled"
                        sx={{ borderRadius: 0.75 }}
                      />
                    </Box>
                  ))}
                  {overflow > 0 && (
                    <Box
                      sx={{
                        ml: 0.5,
                        color: ink,
                        fontWeight: 700,
                        fontSize: 10,
                        lineHeight: 1,
                      }}
                    >
                      +{overflow}
                    </Box>
                  )}
                </Box>
              );
            })()}

            {/* Top-right count badge (fixed accent color). */}
            {count > 0 && (
              <Box sx={{ position: "absolute", top: 4, right: 4 }}>
                <CountBadge
                  count={count}
                  tier="fixed"
                  accent={ink}
                  size="xs"
                />
              </Box>
            )}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
