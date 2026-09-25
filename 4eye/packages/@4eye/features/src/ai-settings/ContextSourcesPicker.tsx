"use client";

/**
 * ContextSourcesPicker — grouped toggles for the chat context source catalog.
 *
 * Used in two places:
 *  1. Inline inside AISettingsPanel (full — see the Context section there).
 *  2. As a Popper popover opened from the composer Context button.
 *
 * Presentational: receives state via props so it works both inside the
 * AISettingsProvider tree and in the HUD input bar (which is registered
 * outside the provider tree).
 */

import {
  Box,
  ButtonBase,
  Tooltip,
  Typography,
} from "@mui/material";
import type { ChatContextSourceId } from "@4eye/types";
import {
  CHAT_CONTEXT_SOURCE_GROUPS,
  CHAT_CONTEXT_SOURCE_GROUP_LABEL,
  CHAT_CONTEXT_SOURCE_META,
  CHAT_CONTEXT_SOURCE_IDS,
} from "@4eye/types";

// Inline to avoid importing @expanse/theme from within @4eye/features.
const PICKER_BG = "#1a2542";

interface ContextSourcesPickerProps {
  sources: Record<ChatContextSourceId, boolean>;
  onToggle: (id: ChatContextSourceId) => void;
}

const ON_COLOR = "#22c55e";
const OFF_COLOR = "rgba(255,255,255,0.18)";

export function ContextSourcesPicker({ sources, onToggle }: ContextSourcesPickerProps) {
  return (
    <Box
      sx={{
        bgcolor: PICKER_BG,
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 2,
        p: 1.25,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        minWidth: 240,
      }}
    >
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        Context sources
      </Typography>

      {CHAT_CONTEXT_SOURCE_GROUPS.map((group) => {
        const ids = CHAT_CONTEXT_SOURCE_IDS.filter(
          (id) => CHAT_CONTEXT_SOURCE_META[id].group === group,
        );
        return (
          <Box key={group}>
            <Typography
              sx={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                mb: 0.5,
              }}
            >
              {CHAT_CONTEXT_SOURCE_GROUP_LABEL[group]}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {ids.map((id) => {
                const meta = CHAT_CONTEXT_SOURCE_META[id];
                const on = sources[id] ?? meta.defaultOn;
                return (
                  <Tooltip key={id} title={meta.gloss} arrow placement="top">
                    <ButtonBase
                      onClick={() => onToggle(id)}
                      sx={{
                        px: 1,
                        py: 0.4,
                        borderRadius: 99,
                        border: "1px solid",
                        borderColor: on ? ON_COLOR : OFF_COLOR,
                        bgcolor: on ? "rgba(34,197,94,0.12)" : "transparent",
                        color: on ? ON_COLOR : "rgba(255,255,255,0.55)",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                        transition: "all 140ms ease",
                        "&:hover": {
                          borderColor: on ? ON_COLOR : "rgba(255,255,255,0.35)",
                          bgcolor: on ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.06)",
                        },
                      }}
                    >
                      {meta.label}
                    </ButtonBase>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
