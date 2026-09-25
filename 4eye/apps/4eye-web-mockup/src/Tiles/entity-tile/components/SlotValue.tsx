"use client";

/**
 * Entity Tile — Slot renderer.
 *
 * Renders a single TileSlot value according to its `render` hint. Shared by
 * every display component so all tiles speak the same visual language.
 */

import * as React from "react";
import { Stack, Typography } from "@mui/material";
import type { TileSlot } from "@4eye/types";

import {
  DepthDots,
  StatusBadge,
  ValueBadge,
  WeightMeter,
  formatDate,
} from "./slot-visuals";

export function SlotValue({ slot }: { slot: TileSlot }) {
  const { value, render } = slot;

  switch (render) {
    case "meter":
      return <WeightMeter weight={Number(value ?? 0)} />;
    case "dots":
      return <DepthDots depth={Number(value ?? 0)} />;
    case "badge":
      return typeof value === "string" &&
        ["idea", "planned", "active", "blocked", "review", "done", "archived"].includes(value) ? (
        <StatusBadge status={value} />
      ) : (
        <ValueBadge value={value ?? "—"} />
      );
    case "date":
      return <Typography variant="caption" sx={{ fontWeight: 600 }}>{formatDate(Number(value))}</Typography>;
    case "text":
    default:
      return (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {value ?? "—"}
        </Typography>
      );
  }
}

export function SlotRow({ slot }: { slot: TileSlot }) {
  return (
    <Stack
      spacing={1}
      sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
    >
      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
        {slot.label ?? slot.key}
      </Typography>
      <SlotValue slot={slot} />
    </Stack>
  );
}
