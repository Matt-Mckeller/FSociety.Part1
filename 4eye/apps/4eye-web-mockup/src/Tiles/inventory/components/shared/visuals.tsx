"use client";

/** Shared brand-themed visuals for the Inventory tile. */

import * as React from "react";
import { Box, Chip, Typography, alpha, useTheme } from "@mui/material";
import type { Theme } from "@mui/material";
import { ITEM_ICONS, type ItemIconKey } from "@4eye/icons";

import type { Rarity, SymbolColor } from "../../model/types";
import { RARITY_LABEL } from "../../model/types";

/**
 * Rarity → a palette anchor. Common/uncommon lean on neutral + primary; the
 * higher tiers use the brand `secondary` and a fixed amber/gold for legendary
 * (theme warning/info are broken placeholders, so we avoid them).
 */
const LEGENDARY = "#e0911f";

export function rarityColor(theme: Theme, rarity: Rarity): string {
  switch (rarity) {
    case "legendary":
      return LEGENDARY;
    case "epic":
      return theme.palette.secondary.main;
    case "rare":
      return theme.palette.primary.main;
    case "uncommon":
      return theme.palette.success.main;
    case "common":
    default:
      return theme.palette.text.secondary;
  }
}

const ACCENT_HEX: Record<SymbolColor, string> = {
  red: "#e5484d",
  blue: "#3b82f6",
  green: "#30a46c",
  amber: "#e0911f",
  purple: "#8b5cf6",
  teal: "#14b8a6",
  pink: "#e93d82",
  slate: "#64748b",
};

export function accentHex(accent?: SymbolColor): string {
  return accent ? ACCENT_HEX[accent] : ACCENT_HEX.slate;
}

export function RarityChip({ rarity }: { rarity: Rarity }) {
  const theme = useTheme();
  const c = rarityColor(theme, rarity);
  return (
    <Chip
      size="small"
      label={RARITY_LABEL[rarity]}
      sx={{
        height: 20,
        fontSize: 11,
        fontWeight: 700,
        color: c,
        bgcolor: alpha(c, 0.12),
        border: `1px solid ${alpha(c, 0.4)}`,
      }}
    />
  );
}

/** A compact rarity indicator dot — used on cards to keep them clean. */
export function RarityDot({ rarity, size = 8 }: { rarity: Rarity; size?: number }) {
  const theme = useTheme();
  const c = rarityColor(theme, rarity);
  return (
    <Box
      component="span"
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: c,
        boxShadow: `0 0 0 2px ${alpha(c, 0.25)}`,
        flexShrink: 0,
      }}
    />
  );
}

/** A square glyph tile tinted by the item accent + rarity ring. */
export function ItemGlyph({
  label,
  kind,
  accent,
  rarity,
  size = 48,
}: {
  label: string;
  kind?: ItemIconKey;
  accent?: SymbolColor;
  rarity: Rarity;
  size?: number;
}) {
  const theme = useTheme();
  const a = accentHex(accent);
  const ring = rarityColor(theme, rarity);
  const Icon = kind ? ITEM_ICONS[kind] : undefined;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 1.5,
        display: "grid",
        placeItems: "center",
        bgcolor: alpha(a, 0.16),
        border: `2px solid ${alpha(ring, 0.55)}`,
        color: a,
        fontWeight: 800,
        fontSize: size * 0.4,
        flexShrink: 0,
      }}
    >
      {Icon ? <Icon size={Math.round(size * 0.58)} /> : label.slice(0, 1).toUpperCase()}
    </Box>
  );
}

export function Empty({ label }: { label: string }) {
  return (
    <Box
      sx={{
        py: 6,
        textAlign: "center",
        color: "text.secondary",
        border: (t) => `1px dashed ${alpha(t.palette.text.primary, 0.18)}`,
        borderRadius: 2,
      }}
    >
      <Typography variant="body2">{label}</Typography>
    </Box>
  );
}
