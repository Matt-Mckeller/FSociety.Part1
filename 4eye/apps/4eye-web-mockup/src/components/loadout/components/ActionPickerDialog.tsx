"use client";

/**
 * ActionPickerDialog — assign an action (spell, custom, or status target) to a
 * slot. Used by the Character loadout bars and the swipe rose. Offers search
 * over status entities, spells, custom actions, and clearing the slot.
 */

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Lens } from "@expanse/lens";

import { SPELLBOOK_SEED } from "@4eye/web/Tiles/spellbook/store/seed-data";
import { SPELL_CATEGORY_META } from "@4eye/web/Tiles/spellbook/model/types";

import { useLoadout } from "../store/LoadoutProvider";
import { sameAction, type LoadoutActionRef } from "../model/types";
import { CustomActionDialog } from "./CustomActionDialog";
import { StatusTargetMark } from "@4eye/web/Tiles/character/components/StatusTargetMark";
import { MOOD_META } from "@4eye/web/Tiles/character/model/status";
import { AURAS } from "@4eye/web/Tiles/character/components/Auras";
import { EQUIPMENT_LIBRARY } from "@4eye/web/Tiles/character/model/equipment";
import { CHARACTER_STATUS_SEED } from "@4eye/web/Tiles/character/model/status";
import type { StatusTargetRef } from "@4eye/web/Tiles/character/model/statusTargets";
import { statusTargetKey } from "@4eye/web/Tiles/character/model/statusTargets";

function StatusPickRow({
  target,
  name,
  color,
  detail,
  selected,
  onPick,
}: {
  target: StatusTargetRef;
  name: string;
  color: string;
  detail?: string;
  selected: boolean;
  onPick: () => void;
}) {
  return (
    <Stack
      component="button"
      onClick={onPick}
      sx={{
        appearance: "none",
        border: "1px solid",
        borderColor: selected ? alpha(color, 0.55) : "transparent",
        bgcolor: selected ? alpha(color, 0.06) : "transparent",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        p: 0.75,
        borderRadius: 1.5,
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        "&:hover": { bgcolor: alpha(color, 0.08) },
      }}
    >
      <Box sx={{ color, display: "flex" }}>
        <StatusTargetMark
          target={target}
          size={28}
          gearItem={target.kind === "gear" ? EQUIPMENT_LIBRARY.find((i) => i.id === target.itemId) : null}
          effect={
            target.kind === "buff"
              ? CHARACTER_STATUS_SEED.effects.find((e) => e.id === target.effectId)
              : null
          }
        />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
          {name}
        </Typography>
        {detail && (
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {detail}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

function PickRow({
  name,
  lensId,
  color,
  detail,
  selected,
  onPick,
  secondary,
}: {
  name: string;
  lensId: string;
  color: string;
  detail?: string;
  selected: boolean;
  onPick: () => void;
  secondary?: React.ReactNode;
}) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        p: 0.75,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: selected ? alpha(color, 0.55) : "transparent",
        bgcolor: selected ? alpha(color, 0.06) : "transparent",
        "&:hover": { bgcolor: alpha(color, 0.08) },
      }}
    >
      <Box
        component="button"
        onClick={onPick}
        sx={{
          appearance: "none",
          border: "none",
          background: "none",
          p: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 1,
          flex: 1,
          minWidth: 0,
          textAlign: "left",
        }}
      >
        <Lens id={lensId} size={30} animated />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
            {name}
          </Typography>
          {detail && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "block",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {detail}
            </Typography>
          )}
        </Box>
      </Box>
      {secondary}
    </Stack>
  );
}

export function ActionPickerDialog({
  open,
  title,
  current,
  onClose,
  onSelect,
  onClear,
}: {
  open: boolean;
  /** Dialog title, e.g. "Primary · Slot 2" or "Swipe Up". */
  title: string;
  /** Currently assigned action, highlighted in the list. */
  current?: LoadoutActionRef | null;
  onClose: () => void;
  onSelect: (ref: LoadoutActionRef) => void;
  /** When provided (and a current action exists), shows a Clear button. */
  onClear?: () => void;
}) {
  const { state, dispatch } = useLoadout();
  const [search, setSearch] = React.useState("");
  const [creating, setCreating] = React.useState(false);

  const q = search.trim().toLowerCase();
  const spells = SPELLBOOK_SEED.spells.filter(
    (s) => !q || `${s.name} ${s.shortDescription}`.toLowerCase().includes(q),
  );
  const customs = state.customActions.filter((c) => !q || c.name.toLowerCase().includes(q));

  const pick = (ref: LoadoutActionRef) => {
    onSelect(ref);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="mobileL" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>{title}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            autoFocus
            size="small"
            placeholder="Search actions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mt: 0.5 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box>
            <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary" }}>
                Custom actions
              </Typography>
              <Button
                size="small"
                startIcon={<AddRoundedIcon />}
                onClick={() => setCreating(true)}
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                New
              </Button>
            </Stack>
            {customs.length === 0 ? (
              <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                None yet — create one.
              </Typography>
            ) : (
              <Stack sx={{ gap: 0.25 }}>
                {customs.map((c) => {
                  const ref: LoadoutActionRef = { kind: "custom", customId: c.id };
                  return (
                    <PickRow
                      key={c.id}
                      name={c.name}
                      lensId={c.lensId}
                      color="#8b5cf6"
                      detail={c.hint}
                      selected={current != null && sameAction(current, ref)}
                      onPick={() => pick(ref)}
                      secondary={
                        <IconButton
                          size="small"
                          aria-label={`Delete ${c.name}`}
                          onClick={() => dispatch({ type: "remove-custom-action", id: c.id })}
                        >
                          <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      }
                    />
                  );
                })}
              </Stack>
            )}
          </Box>

          <Box>
            <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary" }}>
              Status · Mood / Auras / Gear / Buffs
            </Typography>
            <Stack sx={{ gap: 0.25, maxHeight: 200, overflowY: "auto", mb: 1 }}>
              {Object.entries(MOOD_META)
                .filter(([id]) => !q || MOOD_META[id as keyof typeof MOOD_META].label.toLowerCase().includes(q))
                .slice(0, 8)
                .map(([id, meta]) => {
                  const target: StatusTargetRef = { kind: "mood", moodId: id as keyof typeof MOOD_META };
                  const ref: LoadoutActionRef = { kind: "status", target };
                  return (
                    <StatusPickRow
                      key={statusTargetKey(target)}
                      target={target}
                      name={meta.label}
                      color={meta.color}
                      detail="Mood"
                      selected={current != null && sameAction(current, ref)}
                      onPick={() => pick(ref)}
                    />
                  );
                })}
              {AURAS.filter((a) => !q || a.label.toLowerCase().includes(q)).map((a) => {
                const target: StatusTargetRef = { kind: "aura", auraId: a.id };
                const ref: LoadoutActionRef = { kind: "status", target };
                return (
                  <StatusPickRow
                    key={statusTargetKey(target)}
                    target={target}
                    name={a.label}
                    color={a.color}
                    detail="Aura"
                    selected={current != null && sameAction(current, ref)}
                    onPick={() => pick(ref)}
                  />
                );
              })}
              {EQUIPMENT_LIBRARY.filter((i) => i.equipped && (!q || i.name.toLowerCase().includes(q)))
                .slice(0, 8)
                .map((item) => {
                  const target: StatusTargetRef = { kind: "gear", itemId: item.id };
                  const ref: LoadoutActionRef = { kind: "status", target };
                  return (
                    <StatusPickRow
                      key={statusTargetKey(target)}
                      target={target}
                      name={item.name}
                      color={item.color}
                      detail="Gear"
                      selected={current != null && sameAction(current, ref)}
                      onPick={() => pick(ref)}
                    />
                  );
                })}
              {CHARACTER_STATUS_SEED.effects
                .filter((e) => e.kind === "buff" && (!q || e.label.toLowerCase().includes(q)))
                .slice(0, 8)
                .map((e) => {
                  const target: StatusTargetRef = { kind: "buff", effectId: e.id };
                  const ref: LoadoutActionRef = { kind: "status", target };
                  return (
                    <StatusPickRow
                      key={statusTargetKey(target)}
                      target={target}
                      name={e.label}
                      color={e.color}
                      detail="Buff"
                      selected={current != null && sameAction(current, ref)}
                      onPick={() => pick(ref)}
                    />
                  );
                })}
            </Stack>
          </Box>

          <Box>
            <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary" }}>
              Spells
            </Typography>
            <Stack sx={{ gap: 0.25, maxHeight: 280, overflowY: "auto" }}>
              {spells.map((s) => {
                const ref: LoadoutActionRef = { kind: "spell", spellId: s.id };
                return (
                  <PickRow
                    key={s.id}
                    name={s.name}
                    lensId={s.lensId}
                    color={SPELL_CATEGORY_META[s.category].color}
                    detail={s.shortDescription}
                    selected={current != null && sameAction(current, ref)}
                    onPick={() => pick(ref)}
                  />
                );
              })}
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          {onClear && current && (
            <Button
              color="inherit"
              onClick={() => {
                onClear();
                onClose();
              }}
              sx={{ textTransform: "none", fontWeight: 700, mr: "auto" }}
            >
              Clear slot
            </Button>
          )}
          <Button onClick={onClose} sx={{ textTransform: "none", fontWeight: 700 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <CustomActionDialog
        open={creating}
        onClose={() => setCreating(false)}
        onCreated={(action) => pick({ kind: "custom", customId: action.id })}
      />
    </>
  );
}
