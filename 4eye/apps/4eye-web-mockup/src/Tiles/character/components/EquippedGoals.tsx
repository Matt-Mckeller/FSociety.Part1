"use client";

import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { COLOR_MAP } from "@4eye/types";

import { useCharacter } from "../store/CharacterProvider";
import { useOptionalProfileStore } from "../store/CharacterProfileStore";
import { EquipSlot, Empty } from "./shared/EquipSlot";
import { ProgressDetailDialog } from "./shared/ProgressDetailDialog";

const PRIMARY_COUNT = 3;

export function EquippedGoals() {
  const { character } = useCharacter();
  const store = useOptionalProfileStore();
  const goals = [...character.equippedGoals].sort((a, b) => b.weight - a.weight);
  const [expanded, setExpanded] = React.useState(false);
  const [detailId, setDetailId] = React.useState<string | null>(null);

  if (goals.length === 0) return <Empty label="No goals equipped." />;

  const visible = expanded ? goals : goals.slice(0, PRIMARY_COUNT);
  const overflow = goals.length - PRIMARY_COUNT;

  const progressFor = (id: string, seed: number | undefined) =>
    store?.state.itemProgress[id] ?? seed ?? 0;
  const active = goals.find((g) => g.id === detailId) ?? null;
  const activeAccent = active
    ? active.accent
      ? COLOR_MAP[active.accent]
      : COLOR_MAP[character.accent]
    : "#000";

  return (
    <Stack spacing={1}>
      {visible.map((g) => {
        const accent = g.accent ? COLOR_MAP[g.accent] : COLOR_MAP[character.accent];
        return (
          <EquipSlot
            key={g.id}
            accent={accent}
            title={g.label}
            weight={g.weight}
            weightLabel="importance"
            progress={progressFor(g.id, g.progress)}
            onClick={store ? () => setDetailId(g.id) : undefined}
          />
        );
      })}
      {overflow > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
              goal{overflow !== 1 ? "s" : ""}
            </Typography>
          )}
        </Box>
      )}

      {active && store && (
        <ProgressDetailDialog
          open
          onClose={() => setDetailId(null)}
          title={active.label}
          accent={activeAccent}
          weight={active.weight}
          weightLabel="importance"
          progress={progressFor(active.id, active.progress)}
          onCommit={(p) => {
            store.dispatch({
              type: "set-item-progress",
              itemId: active.id,
              progress: p,
              label: active.label,
              color: activeAccent,
            });
            setDetailId(null);
          }}
        />
      )}
    </Stack>
  );
}
