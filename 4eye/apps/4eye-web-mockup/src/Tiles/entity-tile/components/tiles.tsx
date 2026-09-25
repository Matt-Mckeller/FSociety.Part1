"use client";

/**
 * Entity Tile — display components.
 *
 * Each consumes a TileSpec and renders a different presentation. They are
 * registered by tile `type` in registry.ts; <TileRenderer> dispatches to them.
 *
 *   summary  → compact HUD card
 *   detail   → full Inspector/Focus body
 *   metric   → metrics-only strip
 *   list     → header + child tiles
 *   generated→ data-only generated spec (renders as a card, provenance shown)
 */

import * as React from "react";
import { Box, Button, Divider, Paper, Stack, Tooltip, Typography, alpha } from "@mui/material";
import type { TileSpec } from "@4eye/types";
import { Symbol, SYMBOL_ICONS } from "@4eye/features";
import type { SymbolColor, SymbolName } from "@4eye/types";

import { SlotRow, SlotValue } from "./SlotValue";

export interface TileComponentProps {
  spec: TileSpec;
  /** Host handler for declarative actions (intent → effect). */
  onAction?: (intent: string, spec: TileSpec) => void;
  /** Renderer passed down so list tiles can render children. */
  renderChild?: (child: TileSpec) => React.ReactNode;
}

/** Brand-themed card surface. Subtle border + hover lift toward the primary. */
const CARD_SX = {
  position: "relative",
  p: 1.5,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  transition: "border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
  "&:hover": {
    borderColor: (t: import("@mui/material/styles").Theme) =>
      alpha(t.palette.primary.main, 0.4),
    boxShadow: (t: import("@mui/material/styles").Theme) =>
      `0 6px 20px ${alpha(t.palette.primary.main, 0.12)}`,
  },
} as const;

function Header({ spec }: { spec: TileSpec }) {
  const isSymbolName = spec.symbol != null && spec.symbol in SYMBOL_ICONS;
  return (
    <Stack spacing={1} sx={{ flexDirection: "row", alignItems: "center" }}>
      {isSymbolName ? (
        <Tooltip title="Set your own icon to personalize this item" arrow placement="top">
          <span>
            <Symbol
              name={spec.symbol as SymbolName}
              color={(spec.symbolColor as SymbolColor) ?? "slate"}
              size={24}
            />
          </span>
        </Tooltip>
      ) : spec.symbol ? (
        <Tooltip title="Set your own icon to personalize this item" arrow placement="top">
          <Typography sx={{ fontSize: 18, lineHeight: 1 }}>{spec.symbol}</Typography>
        </Tooltip>
      ) : null}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, flex: 1, color: "text.primary" }}>
        {spec.title ?? spec.entityId}
      </Typography>
    </Stack>
  );
}

function Actions({ spec, onAction }: TileComponentProps) {
  if (!spec.actions?.length) return null;
  return (
    <Stack spacing={1} sx={{ flexDirection: "row", flexWrap: "wrap" }}>
      {spec.actions.map((a) => (
        <Button
          key={a.id}
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => onAction?.(a.intent, spec)}
          sx={{ textTransform: "none", borderRadius: 1.5, fontWeight: 700 }}
        >
          {a.label}
        </Button>
      ))}
    </Stack>
  );
}

/** summary — compact card with a metric strip. */
export function SummaryTile({ spec, onAction }: TileComponentProps) {
  return (
    <Paper elevation={0} sx={{ ...CARD_SX, minWidth: 240 }}>
      <Stack spacing={1.25}>
        <Header spec={spec} />
        <Stack spacing={1} sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
          {spec.slots.map((s) => (
            <SlotValue key={s.key} slot={s} />
          ))}
        </Stack>
        <Actions spec={spec} onAction={onAction} />
      </Stack>
    </Paper>
  );
}

/** detail — Inspector/Focus body: labelled rows + actions. */
export function DetailTile({ spec, onAction }: TileComponentProps) {
  return (
    <Paper elevation={0} sx={{ ...CARD_SX, minWidth: 320 }}>
      <Stack spacing={1.5}>
        <Header spec={spec} />
        <Divider />
        <Stack spacing={1}>
          {spec.slots.map((s) => (
            <SlotRow key={s.key} slot={s} />
          ))}
        </Stack>
        <Divider />
        <Actions spec={spec} onAction={onAction} />
      </Stack>
    </Paper>
  );
}

/** metric — just the metrics, no chrome. */
export function MetricTile({ spec }: TileComponentProps) {
  return (
    <Stack spacing={1.5} sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
      {spec.slots.map((s) => (
        <Stack key={s.key} spacing={0.25}>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
            {s.label ?? s.key}
          </Typography>
          <SlotValue slot={s} />
        </Stack>
      ))}
    </Stack>
  );
}

/** list — header + child tiles (Epics-per-Entity). */
export function ListTile({ spec, renderChild }: TileComponentProps) {
  return (
    <Paper elevation={0} sx={{ ...CARD_SX, minWidth: 280 }}>
      <Stack spacing={1.25}>
        <Header spec={spec} />
        <Divider />
        <Stack spacing={1}>
          {(spec.children ?? []).map((c) => (
            <Box key={c.entityId}>{renderChild?.(c)}</Box>
          ))}
          {!spec.children?.length && (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              No items.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

/** generated — DATA-ONLY spec (no executed code). Shows provenance. */
export function GeneratedTile(props: TileComponentProps) {
  const { spec } = props;
  return (
    <Box>
      {spec.generatedFrom && (
        <Typography
          variant="caption"
          sx={{ display: "block", color: "text.secondary", fontStyle: "italic", mb: 0.5 }}
        >
          Generated from: “{spec.generatedFrom}”
        </Typography>
      )}
      {/* Generated tiles reuse the standard summary presentation — the AI only
          produces validated DATA (TileSpec), never executable components. */}
      <SummaryTile {...props} />
    </Box>
  );
}
