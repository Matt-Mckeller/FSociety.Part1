"use client";

/**
 * SquareTileGrid — compact square tiles with an optional check affordance and a
 * shared expansion drawer.
 *
 * Habits and active buffs were both full-width stacked rows: a habit list of
 * eight took eight rows of vertical space to say eight short things, and buffs
 * repeated the pattern immediately below. As squares they read as a set you can
 * scan, and the detail that justified the rows moves into an expansion that
 * only one tile uses at a time.
 *
 * One drawer, not one per tile: expanding a second tile collapses the first, so
 * the grid never grows by more than one detail row however many tiles there are.
 *
 * The check target is deliberately its own hit area in the corner rather than
 * the whole tile — tapping a habit to read it should not complete it.
 */

import * as React from "react";
import { Box, Collapse, Stack, Tooltip, Typography, alpha } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export interface SquareTile {
  id: string;
  label: string;
  /** Emoji or short glyph shown at the centre of the tile. */
  glyph: React.ReactNode;
  color: string;
  /** Renders the check corner when defined. */
  done?: boolean;
  /** Omit to make the tile read-only (buffs are not completable). */
  onToggle?: () => void;
  /** Small caption under the label — streak, time remaining, modifier summary. */
  meta?: string;
  /** Shown in the shared drawer when this tile is expanded. */
  detail?: React.ReactNode;
  /** Separate hit target on the glyph — cycle view without expanding the tile. */
  onGlyphClick?: (e: React.MouseEvent) => void;
  /** Tooltip when hovering the glyph hit target. */
  glyphHint?: string;
}

function Tile({
  tile,
  expanded,
  onExpand,
  tileScale = 1,
}: {
  tile: SquareTile;
  expanded: boolean;
  onExpand: () => void;
  tileScale?: number;
}) {
  const c = tile.color;
  const checkable = typeof tile.onToggle === "function";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: 2,
        border: "1.5px solid",
        borderColor: expanded ? alpha(c, 0.65) : tile.done ? alpha(c, 0.4) : "divider",
        bgcolor: tile.done ? alpha(c, 0.1) : "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.25,
        p: 0.5,
        cursor: "pointer",
        transition: "border-color .15s ease, background-color .15s ease",
        "&:hover": { borderColor: alpha(c, 0.55), bgcolor: alpha(c, 0.06) },
        "&:focus-visible": { outline: `2px solid ${c}`, outlineOffset: 2 },
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${tile.label}${tile.meta ? `, ${tile.meta}` : ""}`}
      onClick={onExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
    >
      {checkable && (
        <Tooltip title={tile.done ? "Completed" : `Mark ${tile.label} done`} arrow>
          <Box
            role="checkbox"
            aria-checked={Boolean(tile.done)}
            aria-label={`Mark ${tile.label} done`}
            tabIndex={0}
            // Its own hit area: reading a habit should not complete it.
            onClick={(e) => {
              e.stopPropagation();
              tile.onToggle?.();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                tile.onToggle?.();
              }
            }}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 17,
              height: 17,
              borderRadius: "50%",
              border: "2px solid",
              borderColor: tile.done ? c : alpha(c, 0.4),
              bgcolor: tile.done ? c : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .15s ease",
              "&:hover": { borderColor: c },
              "&:focus-visible": { outline: `2px solid ${c}`, outlineOffset: 2 },
            }}
          >
            {tile.done && <CheckRoundedIcon sx={{ fontSize: 12, color: "#fff" }} />}
          </Box>
        </Tooltip>
      )}

      <Tooltip title={tile.glyphHint ?? ""} arrow disableHoverListener={!tile.glyphHint}>
        <Box
          sx={{
            fontSize: `${1.15 * tileScale}rem`,
            lineHeight: 1,
            color: c,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: `${1.15 * tileScale}rem`,
            ...(tile.onGlyphClick
              ? {
                  cursor: "pointer",
                  borderRadius: 1,
                  "&:hover": { bgcolor: alpha(c, 0.08) },
                }
              : {}),
          }}
          onClick={
            tile.onGlyphClick
              ? (e) => {
                  e.stopPropagation();
                  tile.onGlyphClick?.(e);
                }
              : undefined
          }
          onKeyDown={
            tile.onGlyphClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    tile.onGlyphClick?.(e as unknown as React.MouseEvent);
                  }
                }
              : undefined
          }
          {...(tile.onGlyphClick ? { role: "button", tabIndex: 0 } : {})}
        >
          {tile.glyph}
        </Box>
      </Tooltip>
      <Typography
        sx={{
          fontSize: `${0.56 * tileScale}rem`,
          fontWeight: 800,
          letterSpacing: 0.2,
          textAlign: "center",
          lineHeight: 1.15,
          color: tile.done ? c : "text.secondary",
          px: 0.25,
        }}
      >
        {tile.label}
      </Typography>
      {tile.meta && (
        <Typography sx={{ fontSize: `${0.5 * tileScale}rem`, fontWeight: 700, color: "text.secondary", lineHeight: 1 }}>
          {tile.meta}
        </Typography>
      )}
    </Box>
  );
}

export interface SquareTileGridProps {
  tiles: SquareTile[];
  /** Minimum tile width; the grid auto-fills to fit. */
  minTile?: number;
  /** Grid gap in theme spacing units. */
  gap?: number;
  /** Scales label/meta typography inside tiles (1 = default). */
  tileScale?: number;
  /** Optional heading row rendered above the grid. */
  header?: React.ReactNode;
  /**
   * Controlled expansion id. When set with {@link onExpandedChange}, the parent
   * owns which tile is open — used by Status Targets so Mood/Auras/Gear/Buffs
   * share one HUD host across several grids.
   */
  expandedId?: string | null;
  onExpandedChange?: (id: string | null) => void;
  /**
   * When false, the inline detail drawer is omitted so a parent can render a
   * larger HUD Display instead.
   */
  showDrawer?: boolean;
}

export function SquareTileGrid({
  tiles,
  minTile = 68,
  gap = 0.75,
  tileScale = 1,
  header,
  expandedId: controlledId,
  onExpandedChange,
  showDrawer = true,
}: SquareTileGridProps) {
  const [uncontrolledId, setUncontrolledId] = React.useState<string | null>(null);
  const controlled = typeof onExpandedChange === "function";
  const expandedId = controlled ? (controlledId ?? null) : uncontrolledId;
  const setExpandedId = (next: string | null) => {
    if (controlled) onExpandedChange?.(next);
    else setUncontrolledId(next);
  };
  const expanded = tiles.find((t) => t.id === expandedId) ?? null;

  return (
    <Box>
      {header}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${minTile}px, 1fr))`,
          gap,
        }}
      >
        {tiles.map((t) => (
          <Tile
            key={t.id}
            tile={t}
            expanded={expandedId === t.id}
            onExpand={() => setExpandedId(expandedId === t.id ? null : t.id)}
            tileScale={tileScale}
          />
        ))}
      </Box>

      {/* One shared drawer — the grid never grows by more than a single row. */}
      {showDrawer && (
        <Collapse in={Boolean(expanded)} unmountOnExit>
          {expanded && (
            <Box
              sx={{
                mt: 1,
                p: 1.25,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: alpha(expanded.color, 0.35),
                bgcolor: alpha(expanded.color, 0.05),
              }}
            >
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                <Box sx={{ fontSize: "0.95rem", lineHeight: 1, color: expanded.color }}>{expanded.glyph}</Box>
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 800, color: expanded.color }}>
                  {expanded.label}
                </Typography>
                {expanded.meta && (
                  <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, color: "text.secondary" }}>
                    {expanded.meta}
                  </Typography>
                )}
              </Stack>
              {expanded.detail}
            </Box>
          )}
        </Collapse>
      )}
    </Box>
  );
}
