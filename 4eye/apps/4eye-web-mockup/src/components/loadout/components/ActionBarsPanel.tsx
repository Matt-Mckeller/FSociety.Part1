"use client";

/**
 * ActionBarsPanel — the three configurable save-target bars (Planning /
 * Implementation / Improvement). Actions are saved here from the Spellbook
 * (SpellCard "Save" menu) and removed via the hover "×".
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";

import { useLoadout } from "../store/LoadoutProvider";
import { ACTION_BAR_KINDS, ACTION_BAR_META, type ActionBarKind } from "../model/types";
import { ActionGlyph } from "./ActionGlyph";

function Bar({ kind }: { kind: ActionBarKind }) {
  const { state, dispatch, resolve } = useLoadout();
  const meta = ACTION_BAR_META[kind];
  const actions = state.bars[kind]
    .map((ref, index) => ({ index, resolved: resolve(ref) }))
    .filter((a) => a.resolved != null);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        alignItems: "center",
        gap: 1.5,
        p: 1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(meta.color, 0.2),
        borderLeft: `3px solid ${meta.color}`,
        bgcolor: alpha(meta.color, 0.04),
      }}
    >
      <Tooltip title={meta.hint} arrow placement="top-start">
        <Stack sx={{ gap: 0.25, cursor: "default" }}>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.6 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: meta.color, flexShrink: 0 }} />
            <Typography
              variant="overline"
              sx={{ fontWeight: 800, color: meta.color, letterSpacing: 0.5, lineHeight: 1.4 }}
            >
              {meta.label}
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, lineHeight: 1 }}>
            {actions.length} saved
          </Typography>
        </Stack>
      </Tooltip>
      {actions.length === 0 ? (
        <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic" }}>
          Nothing saved yet — use Save on a spell.
        </Typography>
      ) : (
        <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
          {actions.map(({ index, resolved }) => (
            <ActionGlyph
              key={resolved!.key}
              compact
              action={resolved!}
              onRemove={() => dispatch({ type: "remove-from-bar", bar: kind, index })}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export function ActionBarsPanel() {
  return (
    <Stack sx={{ gap: 1 }}>
      {ACTION_BAR_KINDS.map((kind) => (
        <Bar key={kind} kind={kind} />
      ))}
    </Stack>
  );
}
