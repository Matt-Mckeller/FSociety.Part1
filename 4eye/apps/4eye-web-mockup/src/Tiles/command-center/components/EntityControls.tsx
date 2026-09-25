"use client";

/**
 * Command Center — shared entity controls.
 *
 * Compact, accessible mutation affordances bound to {@link useCommandCenter}.
 * Display stays in the Entity-Tile pipeline; all editing happens here so the
 * live graph updates from one source of truth.
 */

import * as React from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import type { Entity, StatusValue } from "@4eye/types";
import { getTrait } from "@4eye/types";

import { useCommandCenter, type SprintLane } from "../store/CommandCenterProvider";
import { usePlanningColors } from "../../entity-tile/components/slot-visuals";

/* --------------------------------------------------------------- accessors */

export function statusOf(e: Entity): StatusValue {
  return getTrait(e.traits, "status")?.value ?? "idea";
}
export function weightOf(e: Entity): number {
  return getTrait(e.traits, "weight")?.value ?? 0;
}
export function depthOf(e: Entity): number | undefined {
  return getTrait(e.traits, "depth")?.value;
}
export function pointsOf(e: Entity): number | undefined {
  return getTrait(e.traits, "estimate")?.points;
}
export function dueOf(e: Entity): number | undefined {
  return getTrait(e.traits, "schedule")?.due;
}
export function summaryOf(e: Entity): string | undefined {
  const s = e.meta?.summary;
  return typeof s === "string" ? s : undefined;
}

const STATUS_OPTIONS: StatusValue[] = [
  "idea",
  "planned",
  "active",
  "blocked",
  "review",
  "done",
  "archived",
];

const STATUS_LABEL: Record<StatusValue, string> = {
  idea: "Idea",
  planned: "Planned",
  active: "Active",
  blocked: "Blocked",
  review: "Review",
  done: "Done",
  archived: "Archived",
};

/* ----------------------------------------------------------------- Status */

export function StatusControl({ entity }: { entity: Entity }) {
  const { setStatus } = useCommandCenter();
  const colors = usePlanningColors();
  const value = statusOf(entity);
  const dot = colors.status(value);

  return (
    <Select
      size="small"
      value={value}
      onChange={(e) => setStatus(entity.id, e.target.value as StatusValue)}
      aria-label={`Status for ${entity.name}`}
      sx={{
        height: 26,
        fontSize: 12,
        fontWeight: 700,
        color: "text.primary",
        bgcolor: alpha(dot, 0.1),
        "& .MuiOutlinedInput-notchedOutline": { borderColor: alpha(dot, 0.4) },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: dot },
        "& .MuiSelect-select": {
          py: 0.25,
          pl: 1,
          display: "flex",
          alignItems: "center",
          gap: 0.75,
        },
      }}
      renderValue={(v) => (
        <>
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: colors.status(v as StatusValue),
            }}
          />
          {STATUS_LABEL[v as StatusValue]}
        </>
      )}
    >
      {STATUS_OPTIONS.map((s) => (
        <MenuItem key={s} value={s} sx={{ fontSize: 12, fontWeight: 600, gap: 1 }}>
          <Box
            sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: colors.status(s) }}
          />
          {STATUS_LABEL[s]}
        </MenuItem>
      ))}
    </Select>
  );
}

/* ----------------------------------------------------------------- Weight */

export function WeightControl({
  entity,
  step = 5,
}: {
  entity: Entity;
  step?: number;
}) {
  const { setWeight } = useCommandCenter();
  const value = weightOf(entity);

  return (
    <Stack
      sx={{ flexDirection: "row", alignItems: "center", gap: 0.25 }}
      role="group"
      aria-label={`Weight for ${entity.name}`}
    >
      <IconButton
        size="small"
        color="primary"
        disabled={value <= 0}
        onClick={() => setWeight(entity.id, value - step)}
        aria-label="Decrease weight"
        sx={{ p: 0.25 }}
      >
        <RemoveIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 800,
          color: "text.primary",
          minWidth: 24,
          textAlign: "center",
        }}
      >
        {value}
      </Typography>
      <IconButton
        size="small"
        color="primary"
        disabled={value >= 100}
        onClick={() => setWeight(entity.id, value + step)}
        aria-label="Increase weight"
        sx={{ p: 0.25 }}
      >
        <AddIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Stack>
  );
}

/* ------------------------------------------------------------------ Depth */

export function DepthControl({ entity }: { entity: Entity }) {
  const { setDepth } = useCommandCenter();
  const value = depthOf(entity) ?? 1;

  return (
    <Stack
      sx={{ flexDirection: "row", alignItems: "center", gap: 0.25 }}
      role="group"
      aria-label={`Depth for ${entity.name}`}
    >
      <IconButton
        size="small"
        color="primary"
        disabled={value <= 1}
        onClick={() => setDepth(entity.id, value - 1)}
        aria-label="Decrease depth"
        sx={{ p: 0.25 }}
      >
        <RemoveIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 800,
          color: "text.primary",
          minWidth: 18,
          textAlign: "center",
        }}
      >
        {value}
      </Typography>
      <IconButton
        size="small"
        color="primary"
        disabled={value >= 7}
        onClick={() => setDepth(entity.id, value + 1)}
        aria-label="Increase depth"
        sx={{ p: 0.25 }}
      >
        <AddIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Stack>
  );
}

/* ------------------------------------------------------------------- Lane */

const LANES: { id: SprintLane; label: string }[] = [
  { id: "now", label: "Now" },
  { id: "next", label: "Next" },
  { id: "later", label: "Later" },
];

/** Now / Next / Later toggle for the rolling sprint board. */
export function LaneControl({
  entity,
  lane,
}: {
  entity: Entity;
  lane: SprintLane;
}) {
  const { setLane } = useCommandCenter();
  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      color="primary"
      value={lane}
      onChange={(_, v: SprintLane | null) => v && setLane(entity.id, v)}
      aria-label={`Sprint lane for ${entity.name}`}
      sx={{
        "& .MuiToggleButton-root": {
          textTransform: "none",
          fontWeight: 700,
          fontSize: 11,
          px: 1,
          py: 0.15,
          borderColor: "divider",
        },
      }}
    >
      {LANES.map((l) => (
        <ToggleButton key={l.id} value={l.id}>
          {l.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

/* --------------------------------------------------------------- Inspect */

/** Magnifier button that opens an entity in the Inspector. */
export function InspectButton({ entity }: { entity: Entity }) {
  const { inspect } = useCommandCenter();
  return (
    <Tooltip title="Inspect" arrow>
      <IconButton
        size="small"
        color="primary"
        onClick={() => inspect(entity.id)}
        aria-label={`Inspect ${entity.name}`}
        sx={{ p: 0.5 }}
      >
        <SearchRoundedIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Tooltip>
  );
}
