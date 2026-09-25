"use client";

/** ItemDetailPanel — full detail for the selected item + action group. */

import * as React from "react";
import { Box, Button, Divider, IconButton, Stack, Tooltip, Typography, alpha } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useInventory } from "../store/InventoryProvider";
import { ACTION_LABEL, formatQuantity } from "../model/types";
import type { ItemAction } from "../model/types";
import { ItemGlyph, RarityChip } from "./shared/visuals";

const DESTRUCTIVE: ItemAction[] = ["destroy"];

const ACTION_HINT: Record<ItemAction, string> = {
  use: "Use this item now",
  equip: "Equip to your loadout",
  trade: "Trade with a classmate",
  gift: "Gift to a friend",
  craft: "Combine into something new",
  open: "Open to reveal contents",
  destroy: "Permanently remove",
};

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 700, textAlign: "right" }}>
        {value}
      </Typography>
    </Box>
  );
}

export function ItemDetailPanel() {
  const { selected, dispatch } = useInventory();

  if (!selected) {
    return (
      <Box
        sx={{
          p: 2,
          height: "100%",
          display: "grid",
          placeItems: "center",
          color: "text.secondary",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">Select an item to see its details.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
        <ItemGlyph
          label={selected.name}
          kind={selected.kind}
          accent={selected.accent}
          rarity={selected.rarity}
          size={56}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>
            {selected.name}
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <RarityChip rarity={selected.rarity} />
          </Box>
        </Box>
        <IconButton
          size="small"
          aria-label="Close details"
          onClick={() => dispatch({ type: "select", id: null })}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      {selected.description && (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {selected.description}
        </Typography>
      )}

      {selected.effects && selected.effects.length > 0 && (
        <Box>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Effects
          </Typography>
          <Stack spacing={0.5} sx={{ mt: 0.5 }}>
            {selected.effects.map((eff) => (
              <Box
                key={eff.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {eff.label}
                </Typography>
                <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                  {eff.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      <Divider />

      <Stack spacing={0.5}>
        {selected.quantity != null && <Meta label="Quantity" value={`×${formatQuantity(selected.quantity)}`} />}
        {selected.source && <Meta label="Source" value={selected.source} />}
        {selected.subject && <Meta label="Subject" value={selected.subject} />}
        <Meta label="Acquired" value={new Date(selected.acquiredAt).toLocaleDateString()} />
      </Stack>

      <Box sx={{ flex: 1 }} />

      {selected.actions.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {selected.actions.map((a) => (
            <Tooltip key={a} title={ACTION_HINT[a]} arrow>
              <Button
                size="small"
                variant={DESTRUCTIVE.includes(a) ? "outlined" : "contained"}
                color={DESTRUCTIVE.includes(a) ? "error" : "primary"}
                sx={{ textTransform: "none" }}
              >
                {ACTION_LABEL[a]}
              </Button>
            </Tooltip>
          ))}
        </Box>
      )}
    </Box>
  );
}
