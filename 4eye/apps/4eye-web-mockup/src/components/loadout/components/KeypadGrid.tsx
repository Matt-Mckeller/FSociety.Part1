"use client";

/**
 * KeypadGrid — renders one {@link LoadoutGroup} as a fixed-position keypad.
 *
 * The grid shape (tri / quad / keypad / row) drives the column count and slot
 * count, so positions stay consistent across pages for muscle memory. Cells
 * reuse {@link ActionGlyph} (filled) / {@link EmptySlot} (empty) and open the
 * shared {@link ActionPickerDialog} to assign or clear an action.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";

import { useLoadout } from "../store/LoadoutProvider";
import {
  LOADOUT_GRID_META,
  makeSlots,
  type LoadoutGroup,
} from "../model/types";
import { BINDING_TEMPLATES, isEngineTemplate } from "../model/binding-templates";
import { ActionGlyph, EmptySlot } from "./ActionGlyph";
import { ActionPickerDialog } from "./ActionPickerDialog";

export function KeypadGrid({
  pageId,
  group,
  pageColor,
}: {
  pageId: string;
  group: LoadoutGroup;
  /** Falls back here when the group has no color of its own. */
  pageColor?: string;
}) {
  const { dispatch, resolve } = useLoadout();
  const [openSlot, setOpenSlot] = React.useState<number | null>(null);

  const meta = LOADOUT_GRID_META[group.grid];
  const accent = group.color ?? pageColor ?? "#64748b";
  const pageTemplate = BINDING_TEMPLATES.find((t) => t.pageId === pageId);
  const engine = isEngineTemplate(pageTemplate?.id);
  // Engine pages used to wash every cell in the page accent (one red). Each
  // action now keeps its own colour; the well still tints from `accent`.
  // Normalize to the grid length so a freshly-resized group still renders.
  const slots = makeSlots(group.grid, group.slots);
  const current = openSlot != null ? slots[openSlot] ?? null : null;

  return (
    <Box>
      {group.label && (
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, mb: 0.6 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: accent, flexShrink: 0 }} />
          <Typography
            variant="overline"
            sx={{ fontWeight: 800, color: accent, letterSpacing: 0.5, lineHeight: 1.4 }}
          >
            {group.label}
          </Typography>
        </Stack>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${meta.cols}, 48px)`,
          gridAutoRows: 48,
          justifyItems: "center",
          alignItems: "center",
          gap: 0.75,
          justifyContent: "start",
          p: 0.75,
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(accent, 0.18),
          bgcolor: alpha(accent, 0.04),
          width: "fit-content",
        }}
      >
        {slots.map((ref, slot) => {
          const resolved = ref ? resolve(ref) : null;
          return resolved ? (
            <ActionGlyph
              key={slot}
              compact
              action={resolved}
              onClick={() => setOpenSlot(slot)}
              wash={engine}
              onRemove={() =>
                dispatch({ type: "assign-slot", pageId, groupId: group.id, slot, ref: null })
              }
            />
          ) : (
            <EmptySlot
              key={slot}
              compact
              label={`Assign slot ${slot + 1}`}
              onClick={() => setOpenSlot(slot)}
            />
          );
        })}
      </Box>

      <ActionPickerDialog
        open={openSlot != null}
        title={
          openSlot != null
            ? `${group.label ? `${group.label} · ` : ""}Slot ${openSlot + 1}`
            : ""
        }
        current={current}
        onClose={() => setOpenSlot(null)}
        onSelect={(ref) => {
          if (openSlot != null)
            dispatch({ type: "assign-slot", pageId, groupId: group.id, slot: openSlot, ref });
        }}
        onClear={() => {
          if (openSlot != null)
            dispatch({ type: "assign-slot", pageId, groupId: group.id, slot: openSlot, ref: null });
        }}
      />
    </Box>
  );
}
