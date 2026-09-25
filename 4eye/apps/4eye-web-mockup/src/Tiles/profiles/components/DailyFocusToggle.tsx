"use client";

/**
 * DailyFocusToggle — Daily Focus collapsed to a single icon button.
 *
 * Even compact, the card was the tallest thing in the surfaced band: a vertical
 * stack of mood, habit checklist and buffs beside four one-line cards. Here it
 * starts as one glyph and expands **into a horizontal row**, so opening it
 * spends width rather than height and the band keeps its shape.
 *
 * Its state is its own — deliberately not shared with the Goals/Actions/Events
 * disclosures, which are a different kind of thing at a different level of the
 * page.
 */

import * as React from "react";
import { Box, Collapse, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { FocusIcon } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";
import { DailyFocus } from "@4eye/web/Tiles/character/components/DailyFocus";
import { usePersistedChoice } from "./ProfileControls";

const OPEN = "open";
const SHUT = "shut";
const STATES = [OPEN, SHUT] as const;

export function DailyFocusToggle({ accent }: { accent: string }) {
  const [state, setState] = usePersistedChoice("4eye.profile.dailyFocus", SHUT, STATES);
  const open = state === OPEN;
  const surface = useSurface();
  const ink = surface.ink(accent);

  return (
    <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: 1.25, minWidth: 0 }}>
      <Tooltip title={open ? "Hide daily focus" : "Show daily focus — mood, routine and active buffs"} arrow>
        <Stack
          role="button"
          tabIndex={0}
          aria-expanded={open}
          aria-label="Daily focus"
          onClick={() => setState(open ? SHUT : OPEN)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setState(open ? SHUT : OPEN);
            }
          }}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: 38,
            height: 38,
            flexShrink: 0,
            borderRadius: "50%",
            cursor: "pointer",
            border: "1px solid",
            borderColor: open ? alpha(accent, 0.55) : alpha(accent, 0.28),
            bgcolor: open ? alpha(accent, 0.14) : "transparent",
            transition: "background-color .18s ease, border-color .18s ease",
            "&:hover": { bgcolor: alpha(accent, 0.18), borderColor: alpha(accent, 0.6) },
            "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
          }}
        >
          <Box component={FocusIcon} size={18} sx={{ color: ink }} />
        </Stack>
      </Tooltip>

      {/* Expands sideways: the row grows into available width, not down. */}
      <Collapse in={open} orientation="horizontal" unmountOnExit sx={{ minWidth: 0 }}>
        <Box sx={{ minWidth: 200, pt: 0.25 }}>
          <DailyFocus compact />
        </Box>
      </Collapse>

      {!open && (
        <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", alignSelf: "center" }}>
          Daily focus
        </Typography>
      )}
    </Stack>
  );
}
