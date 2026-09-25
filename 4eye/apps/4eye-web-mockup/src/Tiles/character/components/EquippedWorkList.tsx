"use client";

import * as React from "react";
import { Box, Button, Chip, Stack, Typography, alpha } from "@mui/material";

import {
  WORK_KIND_LABEL,
  WORK_STATUS_COLOR,
  WORK_STATUS_LABEL,
  type EquippedWorkItem,
} from "../model/types";
import { useCharacter } from "../store/CharacterProvider";
import { useOptionalProfileStore } from "../store/CharacterProfileStore";
import { useFocusStack } from "../store/useFocusStack";
import { EquipSlot, Empty } from "./shared/EquipSlot";
import { ProgressDetailDialog } from "./shared/ProgressDetailDialog";
import { FocusEditDialog } from "./shared/FocusEditDialog";
import { WorkGlyph } from "./WorkGlyphs";

const PRIMARY_COUNT = 4;

function KindBadge({ item }: { item: EquippedWorkItem }) {
  const c = WORK_STATUS_COLOR[item.status];
  return (
    <Chip
      size="small"
      label={`${WORK_KIND_LABEL[item.kind]} · ${WORK_STATUS_LABEL[item.status]}`}
      sx={{
        height: 20,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.2,
        color: c,
        bgcolor: alpha(c, 0.12),
        border: `1px solid ${alpha(c, 0.38)}`,
      }}
    />
  );
}

export function AddPlanControl({ accent = "#1976d2" }: { accent?: string }) {
  const { dispatch, revisions } = useFocusStack();
  const [open, setOpen] = React.useState(false);
  if (!dispatch) return null;
  return (
    <>
      <Button
        size="small"
        onClick={() => setOpen(true)}
        sx={{ fontWeight: 800, textTransform: "none", color: accent, minWidth: 0, px: 0.5 }}
      >
        Add plan
      </Button>
      <FocusEditDialog
        open={open}
        onClose={() => setOpen(false)}
        slot="plan"
        title="Add plan"
        label=""
        detail=""
        revisions={revisions}
        saveLabel="Add plan"
        onSave={({ label, detail }) => dispatch({ type: "add-plan", label, detail })}
      />
    </>
  );
}

export function EquippedWorkList() {
  const { character } = useCharacter();
  const store = useOptionalProfileStore();
  const { plans, revisions, dispatch } = useFocusStack();
  const items = [...(dispatch ? plans : character.equippedWork)].sort((a, b) => b.weight - a.weight);
  const [expanded, setExpanded] = React.useState(false);
  const [detailId, setDetailId] = React.useState<string | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  if (items.length === 0) {
    return (
      <Stack spacing={1}>
        <Empty label="No active work equipped." />
        <AddPlanControl />
      </Stack>
    );
  }

  const visible = expanded ? items : items.slice(0, PRIMARY_COUNT);
  const overflow = items.length - PRIMARY_COUNT;

  const progressFor = (id: string, seed: number | undefined) =>
    store?.state.itemProgress[id] ?? seed ?? 0;
  const active = items.find((it) => it.id === detailId) ?? null;
  const editing = items.find((it) => it.id === editingId) ?? null;

  return (
    <Stack spacing={1}>
      {visible.map((item) => (
        <EquipSlot
          key={item.id}
          accent={WORK_STATUS_COLOR[item.status]}
          mark={<WorkGlyph id={item.id} size={17} title={item.label} />}
          title={item.label}
          badge={<KindBadge item={item} />}
          detail={item.detail}
          weight={item.weight}
          weightLabel="priority"
          progress={progressFor(item.id, item.progress)}
          onClick={
            store
              ? () => (dispatch ? setEditingId(item.id) : setDetailId(item.id))
              : undefined
          }
        />
      ))}
      <Stack direction="row" sx={{ alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        {overflow > 0 && (
          <>
            <Button
              size="small"
              variant="text"
              onClick={() => setExpanded((v) => !v)}
              sx={{ fontWeight: 700, textTransform: "none", px: 0.5, minWidth: 0 }}
            >
              {expanded ? "Show less" : `+${overflow} more`}
            </Button>
            {!expanded && (
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                item{overflow !== 1 ? "s" : ""}
              </Typography>
            )}
          </>
        )}
        <AddPlanControl />
      </Stack>

      {editing && dispatch && (
        <FocusEditDialog
          open
          onClose={() => setEditingId(null)}
          slot="plan"
          title={editing.label}
          label={editing.label}
          detail={editing.detail}
          revisions={revisions}
          itemId={editing.id}
          extra={
            <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
              <Button
                size="small"
                onClick={() => {
                  dispatch({ type: "pin-plan-as-today", id: editing.id });
                  setEditingId(null);
                }}
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Pin as today #1
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setEditingId(null);
                  setDetailId(editing.id);
                }}
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Progress
              </Button>
            </Stack>
          }
          onSave={({ label, detail }) =>
            dispatch({ type: "update-plan", id: editing.id, label, detail })
          }
          onRemove={() => dispatch({ type: "remove-plan", id: editing.id })}
        />
      )}

      {active && store && (
        <ProgressDetailDialog
          open
          onClose={() => setDetailId(null)}
          title={active.label}
          detail={active.detail}
          badge={<KindBadge item={active} />}
          accent={WORK_STATUS_COLOR[active.status]}
          weight={active.weight}
          weightLabel="priority"
          progress={progressFor(active.id, active.progress)}
          onCommit={(p) => {
            store.dispatch({
              type: "set-item-progress",
              itemId: active.id,
              progress: p,
              label: active.label,
              color: WORK_STATUS_COLOR[active.status],
            });
            setDetailId(null);
          }}
        />
      )}
    </Stack>
  );
}
