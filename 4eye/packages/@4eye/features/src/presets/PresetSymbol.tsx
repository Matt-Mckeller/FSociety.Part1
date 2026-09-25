"use client";

import { Box, Tooltip, Typography } from "@mui/material";
import type { SymbolColor, SymbolName } from "@4eye/types";
import { COLOR_MAP } from "@4eye/types";
import { Symbol } from "../symbols/Symbol";

/**
 * Layout variants for PresetSymbol.
 *
 * - ring     — single symbol inside a colored ring (default, matches simple presets)
 * - rosette  — center symbol + 2 satellite symbols at bottom corners
 * - stack    — 3 offset rings stacked diagonally (depth / deck feel)
 * - orbit    — center symbol + 4 micro-dots at N/E/S/W positions
 * - mosaic   — 2×2 grid of equal symbols (no outer ring)
 * - monogram — outer ring with 1–2 text initials instead of a symbol
 */
export type PresetVariant =
  | "ring"
  | "rosette"
  | "stack"
  | "orbit"
  | "mosaic"
  | "monogram";

export interface SatelliteSymbol {
  symbol: SymbolName;
  symbolColor: SymbolColor;
}

export interface PresetSymbolProps {
  symbol: SymbolName;
  symbolColor: SymbolColor;
  /** Total number of items in the preset recipe (shown as a badge on ring/monogram). */
  recipeSize?: number;
  size?: "sm" | "md" | "lg";
  /** Tooltip text — usually the preset name. */
  label?: string;
  onClick?: () => void;
  /** Layout variant. Defaults to "ring". */
  variant?: PresetVariant;
  /**
   * Secondary symbols used in rosette / orbit / mosaic / stack variants.
   * Falls back to repeating the main symbol if absent.
   */
  satellites?: SatelliteSymbol[];
  /** Text initials for the "monogram" variant (1–2 chars). Falls back to label[0..1]. */
  monogramText?: string;
}

const SIZE_MAP = {
  sm: { outer: 28, inner: 16, badge: 10, fontSize: 8, sat: 10, monoFont: 9 },
  md: { outer: 40, inner: 22, badge: 14, fontSize: 9, sat: 14, monoFont: 13 },
  lg: { outer: 56, inner: 30, badge: 18, fontSize: 10, sat: 20, monoFont: 18 },
};

// ─── Internal helpers ────────────────────────────────────────────────────────

function Badge({
  dim,
  hex,
  count,
}: {
  dim: (typeof SIZE_MAP)["md"];
  hex: string;
  count: number;
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: -4,
        right: -4,
        minWidth: dim.badge,
        height: dim.badge,
        px: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: hex,
        color: "white",
        borderRadius: dim.badge / 2,
        fontSize: dim.fontSize,
        fontWeight: 700,
        lineHeight: 1,
        border: "1.5px solid rgba(15,15,20,0.9)",
        zIndex: 2,
      }}
    >
      {count > 99 ? "99+" : count}
    </Box>
  );
}

function SatChip({
  sat,
  size,
  style,
}: {
  sat: SatelliteSymbol;
  size: number;
  style: React.CSSProperties;
}) {
  const satHex = COLOR_MAP[sat.symbolColor];
  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.5px solid ${satHex}`,
        bgcolor: `${satHex}22`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 4px ${satHex}44`,
        zIndex: 3,
        ...style,
      }}
    >
      <Symbol
        name={sat.symbol}
        color={sat.symbolColor}
        size={Math.round(size * 0.62)}
        variant="ghost"
      />
    </Box>
  );
}

// ─── Variant renderers ───────────────────────────────────────────────────────

function RingVariant({
  symbol,
  symbolColor,
  recipeSize,
  dim,
  hex,
  onClick,
}: {
  symbol: SymbolName;
  symbolColor: SymbolColor;
  recipeSize?: number;
  dim: (typeof SIZE_MAP)["md"];
  hex: string;
  onClick?: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      sx={{
        position: "relative",
        width: dim.outer,
        height: dim.outer,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: `2px solid ${hex}`,
        boxShadow: `0 0 0 1px ${hex}44, 0 0 8px ${hex}55`,
        bgcolor: `${hex}1a`,
        cursor: onClick ? "pointer" : "default",
        flexShrink: 0,
      }}
    >
      <Symbol name={symbol} color={symbolColor} size={dim.inner} variant="ghost" />
      {recipeSize !== undefined && recipeSize > 0 && (
        <Badge dim={dim} hex={hex} count={recipeSize} />
      )}
    </Box>
  );
}

function RosetteVariant({
  symbol,
  symbolColor,
  satellites,
  dim,
  hex,
  onClick,
}: {
  symbol: SymbolName;
  symbolColor: SymbolColor;
  satellites: SatelliteSymbol[];
  dim: (typeof SIZE_MAP)["md"];
  hex: string;
  onClick?: () => void;
}) {
  const sat0 = satellites[0] ?? { symbol, symbolColor };
  const sat1 = satellites[1] ?? sat0;
  // Satellites sit at bottom-left and bottom-right, half-overlapping the ring edge
  const offset = -Math.round(dim.sat / 2);

  return (
    <Box
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      sx={{
        position: "relative",
        width: dim.outer,
        height: dim.outer,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: `2px solid ${hex}`,
        boxShadow: `0 0 0 1px ${hex}44, 0 0 8px ${hex}55`,
        bgcolor: `${hex}1a`,
        cursor: onClick ? "pointer" : "default",
        flexShrink: 0,
      }}
    >
      <Symbol name={symbol} color={symbolColor} size={dim.inner} variant="ghost" />
      <SatChip
        sat={sat0}
        size={dim.sat}
        style={{ bottom: offset, left: offset }}
      />
      <SatChip
        sat={sat1}
        size={dim.sat}
        style={{ bottom: offset, right: offset }}
      />
    </Box>
  );
}

function StackVariant({
  symbol,
  symbolColor,
  satellites,
  dim,
  hex,
  onClick,
}: {
  symbol: SymbolName;
  symbolColor: SymbolColor;
  satellites: SatelliteSymbol[];
  dim: (typeof SIZE_MAP)["md"];
  hex: string;
  onClick?: () => void;
}) {
  const backColor =
    COLOR_MAP[(satellites[1] ?? { symbolColor }).symbolColor as SymbolColor] ?? hex;
  const midColor =
    COLOR_MAP[(satellites[0] ?? { symbolColor }).symbolColor as SymbolColor] ?? hex;
  const shift = Math.round(dim.outer * 0.13);

  return (
    <Box
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      sx={{
        position: "relative",
        width: dim.outer + shift * 2,
        height: dim.outer + shift,
        display: "inline-flex",
        alignItems: "flex-end",
        cursor: onClick ? "pointer" : "default",
        flexShrink: 0,
      }}
    >
      {/* Back ring */}
      <Box
        sx={{
          position: "absolute",
          left: shift * 2,
          top: 0,
          width: dim.outer,
          height: dim.outer,
          borderRadius: "50%",
          border: `2px solid ${backColor}66`,
          bgcolor: `${backColor}0d`,
        }}
      />
      {/* Mid ring */}
      <Box
        sx={{
          position: "absolute",
          left: shift,
          top: shift * 0.6,
          width: dim.outer,
          height: dim.outer,
          borderRadius: "50%",
          border: `2px solid ${midColor}99`,
          bgcolor: `${midColor}14`,
        }}
      />
      {/* Front ring (fully rendered) */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: shift,
          width: dim.outer,
          height: dim.outer,
          borderRadius: "50%",
          border: `2px solid ${hex}`,
          boxShadow: `0 0 0 1px ${hex}44, 0 0 8px ${hex}55`,
          bgcolor: `${hex}1a`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Symbol name={symbol} color={symbolColor} size={dim.inner} variant="ghost" />
      </Box>
    </Box>
  );
}

function OrbitVariant({
  symbol,
  symbolColor,
  satellites,
  dim,
  hex,
  onClick,
}: {
  symbol: SymbolName;
  symbolColor: SymbolColor;
  satellites: SatelliteSymbol[];
  dim: (typeof SIZE_MAP)["md"];
  hex: string;
  onClick?: () => void;
}) {
  const dotSize = Math.max(6, Math.round(dim.outer * 0.2));
  const orbitR = Math.round(dim.outer / 2) + Math.round(dotSize / 2) - 2;
  const totalSize = dim.outer + dotSize * 2;
  // 4 cardinal directions: top, right, bottom, left
  const positions: Array<{ top: number; left: number }> = [
    { top: 0, left: Math.round(totalSize / 2 - dotSize / 2) },
    { top: Math.round(totalSize / 2 - dotSize / 2), left: totalSize - dotSize },
    { top: totalSize - dotSize, left: Math.round(totalSize / 2 - dotSize / 2) },
    { top: Math.round(totalSize / 2 - dotSize / 2), left: 0 },
  ];

  return (
    <Box
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      sx={{
        position: "relative",
        width: totalSize,
        height: totalSize,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        flexShrink: 0,
      }}
    >
      {/* Center ring */}
      <Box
        sx={{
          width: dim.outer,
          height: dim.outer,
          borderRadius: "50%",
          border: `2px solid ${hex}`,
          boxShadow: `0 0 0 1px ${hex}44, 0 0 8px ${hex}55`,
          bgcolor: `${hex}1a`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Symbol name={symbol} color={symbolColor} size={dim.inner} variant="ghost" />
      </Box>
      {/* Orbital dots */}
      {positions.map((pos, i) => {
        const sat = satellites[i % satellites.length] ?? {
          symbol,
          symbolColor,
        };
        const satHex = COLOR_MAP[sat.symbolColor];
        return (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              bgcolor: satHex,
              boxShadow: `0 0 4px ${satHex}`,
              opacity: 0.85,
            }}
          />
        );
      })}
    </Box>
  );
}

function MosaicVariant({
  symbol,
  symbolColor,
  satellites,
  dim,
  onClick,
}: {
  symbol: SymbolName;
  symbolColor: SymbolColor;
  satellites: SatelliteSymbol[];
  dim: (typeof SIZE_MAP)["md"];
  onClick?: () => void;
}) {
  const cellSize = Math.round(dim.outer * 0.52);
  const gap = 2;
  const totalSize = cellSize * 2 + gap;

  // Fill 4 cells from satellites (or repeat main symbol)
  const cells: SatelliteSymbol[] = [
    { symbol, symbolColor },
    satellites[0] ?? { symbol, symbolColor },
    satellites[1] ?? satellites[0] ?? { symbol, symbolColor },
    satellites[2] ?? satellites[1] ?? satellites[0] ?? { symbol, symbolColor },
  ];

  return (
    <Box
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      sx={{
        display: "inline-grid",
        gridTemplateColumns: `repeat(2, ${cellSize}px)`,
        gap: `${gap}px`,
        width: totalSize,
        height: totalSize,
        borderRadius: Math.round(cellSize * 0.35),
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        flexShrink: 0,
      }}
    >
      {cells.map((cell, i) => {
        const cellHex = COLOR_MAP[cell.symbolColor];
        return (
          <Box
            key={i}
            sx={{
              width: cellSize,
              height: cellSize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: `${cellHex}1a`,
              border: `1px solid ${cellHex}44`,
              borderRadius: Math.round(cellSize * 0.25),
            }}
          >
            <Symbol
              name={cell.symbol}
              color={cell.symbolColor}
              size={Math.round(cellSize * 0.62)}
              variant="ghost"
            />
          </Box>
        );
      })}
    </Box>
  );
}

function MonogramVariant({
  symbolColor,
  monogramText,
  recipeSize,
  dim,
  hex,
  onClick,
}: {
  symbolColor: SymbolColor;
  monogramText: string;
  recipeSize?: number;
  dim: (typeof SIZE_MAP)["md"];
  hex: string;
  onClick?: () => void;
}) {
  const text = monogramText.slice(0, 2).toUpperCase();
  return (
    <Box
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      sx={{
        position: "relative",
        width: dim.outer,
        height: dim.outer,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: `2px solid ${hex}`,
        boxShadow: `0 0 0 1px ${hex}44, 0 0 8px ${hex}55`,
        bgcolor: `${hex}1a`,
        cursor: onClick ? "pointer" : "default",
        flexShrink: 0,
      }}
    >
      <Typography
        sx={{
          color: hex,
          fontWeight: 800,
          fontSize: dim.monoFont,
          lineHeight: 1,
          userSelect: "none",
          letterSpacing: text.length > 1 ? "-0.04em" : 0,
        }}
      >
        {text}
      </Typography>
      {recipeSize !== undefined && recipeSize > 0 && (
        <Badge dim={dim} hex={hex} count={recipeSize} />
      )}
    </Box>
  );
}

// ─── Public component ────────────────────────────────────────────────────────

/**
 * PresetSymbol — the "complex symbol" used to represent a Preset.
 *
 * Supports 6 visual layout variants:
 *   ring     — single symbol inside colored ring (default)
 *   rosette  — center + 2 satellite chips at bottom corners
 *   stack    — 3 depth-offset rings (deck feel)
 *   orbit    — center + 4 micro-dots at cardinal positions
 *   mosaic   — 2×2 grid of equal-size symbols
 *   monogram — colored ring with 1–2 text initials
 */
export function PresetSymbol({
  symbol,
  symbolColor,
  recipeSize,
  size = "md",
  label,
  onClick,
  variant = "ring",
  satellites = [],
  monogramText,
}: PresetSymbolProps) {
  const dim = SIZE_MAP[size];
  const hex = COLOR_MAP[symbolColor];

  let inner: React.ReactElement;

  switch (variant) {
    case "rosette":
      inner = (
        <RosetteVariant
          symbol={symbol}
          symbolColor={symbolColor}
          satellites={satellites}
          dim={dim}
          hex={hex}
          onClick={onClick}
        />
      );
      break;
    case "stack":
      inner = (
        <StackVariant
          symbol={symbol}
          symbolColor={symbolColor}
          satellites={satellites}
          dim={dim}
          hex={hex}
          onClick={onClick}
        />
      );
      break;
    case "orbit":
      inner = (
        <OrbitVariant
          symbol={symbol}
          symbolColor={symbolColor}
          satellites={satellites.length > 0 ? satellites : [{ symbol, symbolColor }]}
          dim={dim}
          hex={hex}
          onClick={onClick}
        />
      );
      break;
    case "mosaic":
      inner = (
        <MosaicVariant
          symbol={symbol}
          symbolColor={symbolColor}
          satellites={satellites}
          dim={dim}
          onClick={onClick}
        />
      );
      break;
    case "monogram": {
      const text =
        monogramText ?? (label ? label.slice(0, 2) : symbol.slice(0, 2));
      inner = (
        <MonogramVariant
          symbolColor={symbolColor}
          monogramText={text}
          recipeSize={recipeSize}
          dim={dim}
          hex={hex}
          onClick={onClick}
        />
      );
      break;
    }
    default:
      inner = (
        <RingVariant
          symbol={symbol}
          symbolColor={symbolColor}
          recipeSize={recipeSize}
          dim={dim}
          hex={hex}
          onClick={onClick}
        />
      );
  }

  if (label) {
    return (
      <Tooltip title={label} arrow>
        {inner}
      </Tooltip>
    );
  }
  return inner;
}
