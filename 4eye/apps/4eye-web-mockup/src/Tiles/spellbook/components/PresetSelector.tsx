"use client";

/**
 * PresetSelector — mode chips (For you · Primary · Learn · Love · Play · Power)
 * plus secondary Writing / Quick Study / Life under More.
 *
 * Primary / Learn / Love sync with Binding templates via SpellbookProvider.
 */

import * as React from "react";
import { Chip, Collapse, Stack, Tooltip, Typography, alpha } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { useSpellbook } from "../store/SpellbookProvider";
import {
  FOR_YOU_PRESET_ID,
  MODE_PRESET_IDS,
  SECONDARY_PRESET_IDS,
} from "../model/lanes";
import { ENGINE_INK } from "@4eye/web/components/loadout";

const MODE_LABELS: Record<string, string> = {
  [FOR_YOU_PRESET_ID]: "For you",
  PRESET_PRIMARY: "Primary",
  PRESET_LEARNING: "Learn",
  PRESET_LOVE: "Love",
  PRESET_PLAY: "Play",
  PRESET_CREATE: "Create",
  PRESET_ENGAGE: "Engage",
  PRESET_INFLUENCE: "Influence",
  PRESET_CONTENT: "Content",
};

const MODE_COLORS: Record<string, string> = {
  [FOR_YOU_PRESET_ID]: "#5b21b6",
  PRESET_PRIMARY: "#15803d",
  PRESET_LEARNING: "#2563eb",
  PRESET_LOVE: "#be123c",
  PRESET_PLAY: "#c2410c",
  PRESET_CREATE: ENGINE_INK.create,
  PRESET_ENGAGE: ENGINE_INK.engage,
  PRESET_INFLUENCE: ENGINE_INK.influence,
  PRESET_CONTENT: ENGINE_INK.content,
};

const ENGINE_PRESET_IDS = new Set([
  "PRESET_CREATE",
  "PRESET_ENGAGE",
  "PRESET_INFLUENCE",
  "PRESET_CONTENT",
]);

export function PresetSelector() {
  const { state, dispatch } = useSpellbook();
  const [moreOpen, setMoreOpen] = React.useState(false);
  const active = state.activePresetId;

  const presetById = React.useMemo(
    () => Object.fromEntries(state.presets.map((p) => [p.id, p])),
    [state.presets],
  );

  const modeChip = (id: string, label: string, description: string) => {
    const selected = active === id;
    const color = MODE_COLORS[id] ?? "#64748b";
    const engine = ENGINE_PRESET_IDS.has(id);
    return (
      <Tooltip key={id} title={description} arrow>
        <Chip
          label={label}
          size="small"
          onClick={() =>
            dispatch(
              selected && id !== FOR_YOU_PRESET_ID
                ? { type: "apply-preset", id: FOR_YOU_PRESET_ID }
                : { type: "apply-preset", id },
            )
          }
          sx={{
            fontWeight: 700,
            ...(engine
              ? {
                  bgcolor: selected ? alpha(color, 0.12) : alpha(color, 0.05),
                  borderColor: selected ? alpha(color, 0.4) : alpha(color, 0.22),
                  color,
                  "& .MuiChip-label": { color },
                  "&:hover": { bgcolor: alpha(color, 0.16), borderColor: alpha(color, 0.45) },
                }
              : selected
                ? {
                    bgcolor: color,
                    color: "#fff",
                    "& .MuiChip-label": { color: "#fff" },
                    "&:hover": { bgcolor: alpha(color, 0.88) },
                  }
                : {
                    bgcolor: alpha(color, 0.06),
                    borderColor: alpha(color, 0.35),
                    color,
                  }),
          }}
          variant={engine || !selected ? "outlined" : "filled"}
        />
      </Tooltip>
    );
  };

  return (
    <Stack spacing={0.75}>
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75, alignItems: "center" }}>
        <Chip
          icon={<AutoStoriesRoundedIcon sx={{ fontSize: 16 }} />}
          label="All spells"
          size="small"
          onClick={() => dispatch({ type: "clear-preset" })}
          variant={active === null ? "filled" : "outlined"}
          color={active === null ? "default" : "default"}
          sx={{
            fontWeight: 700,
            ...(active === null
              ? { bgcolor: "text.primary", color: "background.paper", "& .MuiChip-icon": { color: "background.paper" } }
              : {}),
          }}
        />
        {MODE_PRESET_IDS.map((id) => {
          if (id === FOR_YOU_PRESET_ID) {
            return modeChip(
              id,
              "For you",
              "Equipped · Primary commons · favorites — your everyday cast set",
            );
          }
          const p = presetById[id];
          if (!p) return null;
          return modeChip(id, MODE_LABELS[id] ?? p.label, p.description);
        })}
        <Chip
          label="More"
          size="small"
          variant="outlined"
          onClick={() => setMoreOpen((v) => !v)}
          onDelete={() => setMoreOpen((v) => !v)}
          deleteIcon={
            <ExpandMoreRoundedIcon
              sx={{
                fontSize: 18,
                transform: moreOpen ? "rotate(180deg)" : "none",
                transition: "transform 150ms ease",
              }}
            />
          }
          sx={{ fontWeight: 700 }}
        />
      </Stack>
      <Collapse in={moreOpen}>
        <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75, pt: 0.25 }}>
          <Typography
            variant="caption"
            sx={{ width: "100%", color: "text.disabled", fontWeight: 700, mb: 0.25 }}
          >
            Secondary modes
          </Typography>
          {SECONDARY_PRESET_IDS.map((id) => {
            const p = presetById[id];
            if (!p) return null;
            const selected = active === id;
            return (
              <Tooltip key={id} title={p.description} arrow>
                <Chip
                  label={p.label.replace(/ Mode$/, "")}
                  size="small"
                  onClick={() =>
                    dispatch(
                      selected
                        ? { type: "apply-preset", id: FOR_YOU_PRESET_ID }
                        : { type: "apply-preset", id },
                    )
                  }
                  color={selected ? "primary" : "default"}
                  variant={selected ? "filled" : "outlined"}
                  sx={{ fontWeight: 700 }}
                />
              </Tooltip>
            );
          })}
        </Stack>
      </Collapse>
    </Stack>
  );
}
