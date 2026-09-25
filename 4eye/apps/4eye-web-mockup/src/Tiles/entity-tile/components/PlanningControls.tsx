"use client";

/**
 * PlanningControls — interactive chrome for the PM-in-chat surface.
 *
 * The Entity Tiles ({@link TileRenderer}) stay pure display components. All
 * mutation affordances live here and talk to {@link PlanningProvider} via
 * `dispatch`, so the live graph updates and every view re-renders from the
 * single source of truth.
 *
 * Everything reads from the active MUI brand theme (no hardcoded hex), so the
 * controls match whatever palette the app is configured with.
 */

import * as React from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { Entity, StatusTrait } from "@4eye/types";
import { getTrait } from "@4eye/types";

import { usePlanning } from "../store/PlanningProvider";
import { usePlanningColors } from "./slot-visuals";

type StatusValue = StatusTrait["value"];

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

function statusOf(e: Entity): StatusValue {
  return getTrait(e.traits, "status")?.value ?? "idea";
}

function weightOf(e: Entity): number {
  return getTrait(e.traits, "weight")?.value ?? 0;
}

/* --------------------------------------------------------------- Status */

/** Compact status picker that moves an item between sprint columns. */
export function StatusControl({ entity }: { entity: Entity }) {
  const { dispatch } = usePlanning();
  const colors = usePlanningColors();
  const value = statusOf(entity);
  const dot = colors.status(value);

  return (
    <Select
      size="small"
      value={value}
      onChange={(e) =>
        dispatch({ kind: "set-status", id: entity.id, value: e.target.value as StatusValue })
      }
      aria-label={`Status for ${entity.name}`}
      sx={{
        height: 26,
        fontSize: 12,
        fontWeight: 700,
        color: "text.primary",
        bgcolor: alpha(dot, 0.1),
        "& .MuiOutlinedInput-notchedOutline": { borderColor: alpha(dot, 0.4) },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: dot },
        "& .MuiSelect-select": { py: 0.25, pl: 1, display: "flex", alignItems: "center", gap: 0.75 },
      }}
      renderValue={(v) => (
        <>
          <Box
            sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: colors.status(v as StatusValue) }}
          />
          {STATUS_LABEL[v as StatusValue]}
        </>
      )}
    >
      {STATUS_OPTIONS.map((s) => (
        <MenuItem key={s} value={s} sx={{ fontSize: 12, fontWeight: 600, gap: 1 }}>
          <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: colors.status(s) }} />
          {STATUS_LABEL[s]}
        </MenuItem>
      ))}
    </Select>
  );
}

/* --------------------------------------------------------------- Weight */

/** Stepper that nudges an item's weight (priority) by ±5, clamped 0–100. */
export function WeightControl({ entity, step = 5 }: { entity: Entity; step?: number }) {
  const { dispatch } = usePlanning();
  const value = weightOf(entity);
  const set = (next: number) =>
    dispatch({ kind: "set-weight", id: entity.id, value: next });

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
        onClick={() => set(value - step)}
        aria-label="Decrease weight"
        sx={{ p: 0.25 }}
      >
        <RemoveIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <Typography
        variant="caption"
        sx={{ fontWeight: 800, color: "text.primary", minWidth: 24, textAlign: "center" }}
      >
        {value}
      </Typography>
      <IconButton
        size="small"
        color="primary"
        disabled={value >= 100}
        onClick={() => set(value + step)}
        aria-label="Increase weight"
        sx={{ p: 0.25 }}
      >
        <AddIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Stack>
  );
}

/* ------------------------------------------------------------- Reorder */

/**
 * Up/down reorder for a child within its parent's ordered children. Uses the
 * keyboard-accessible button pattern (no drag dependency) and dispatches
 * `move-child`, which swaps the target's order with its neighbour.
 */
export function ReorderControl({
  parentId,
  childId,
  relationType,
  isFirst,
  isLast,
}: {
  parentId: string;
  childId: string;
  relationType: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { dispatch } = usePlanning();
  return (
    <Stack
      sx={{ flexDirection: "column", gap: 0 }}
      role="group"
      aria-label="Reorder"
    >
      <IconButton
        size="small"
        color="primary"
        disabled={isFirst}
        onClick={() =>
          dispatch({ kind: "move-child", parentId, childId, relationType, direction: "up" })
        }
        aria-label="Move up"
        sx={{ p: 0 }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <IconButton
        size="small"
        color="primary"
        disabled={isLast}
        onClick={() =>
          dispatch({ kind: "move-child", parentId, childId, relationType, direction: "down" })
        }
        aria-label="Move down"
        sx={{ p: 0 }}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Stack>
  );
}

/* ------------------------------------------------------------- Add epic */

/**
 * Inline "add epic" affordance for a board root. Reveals a text field, then
 * dispatches `add-child` with a sensible default (idea status, weight 0).
 */
export function AddChildControl({
  parentId,
  relationType,
  childType,
  label = "Add epic",
}: {
  parentId: string;
  relationType: string;
  childType: string;
  label?: string;
}) {
  const { dispatch } = usePlanning();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const commit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setOpen(false);
      return;
    }
    dispatch({
      kind: "add-child",
      parentId,
      relationType,
      entity: { name: trimmed, type: childType },
    });
    setName("");
    setOpen(false);
  };

  if (!open) {
    return (
      <Tooltip title={label}>
        <IconButton
          size="small"
          color="primary"
          onClick={() => setOpen(true)}
          aria-label={label}
          sx={{ border: "1px dashed", borderColor: "divider", borderRadius: 1.5, p: 0.5 }}
        >
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <TextField
      size="small"
      autoFocus
      placeholder={`${label}…`}
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          setName("");
          setOpen(false);
        }
      }}
      sx={{
        "& .MuiInputBase-root": { fontSize: 12, fontWeight: 600 },
        "& .MuiInputBase-input": { py: 0.5 },
        minWidth: 160,
      }}
    />
  );
}
