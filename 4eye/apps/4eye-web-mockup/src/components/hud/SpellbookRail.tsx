"use client";

/**
 * SpellbookRail — puts the Spellbook directly on the HUD left rail, in every
 * realm. A square rail-family button (same chrome as Game and Pipeline) that
 * opens a popover containing the full {@link SpellbookTile}: browse, learn,
 * favorite, and cast lenses without leaving the page.
 *
 * `SpellbookRailRegistrar` registers the pill into the HUD's left-rail slot
 * via `useRegisterLeftRailItem` (pattern mirrors `AiChatPipelineRailRegistrar`)
 * and is mounted once at the shell level so it persists across realms.
 */

import * as React from "react";
import { useMemo, useRef, useState } from "react";
import {
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  Tooltip,
} from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import {
  RAIL_PILL_BACKGROUND,
  RAIL_PILL_RADIUS,
  RAIL_PILL_SHADOW,
  RAIL_PILL_SHADOW_ACTIVE,
  RAIL_PILL_SIZE,
  useRegisterLeftRailItem,
} from "@expanse/hud";
import { SpellbookTile } from "@4eye/web/Tiles/spellbook";

function SpellbookRailButton() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Tooltip title="Spellbook" placement="right">
        <ButtonBase
          ref={anchorRef}
          onClick={() => setOpen((v) => !v)}
          aria-label="Spellbook"
          aria-expanded={open}
          sx={{
            width: RAIL_PILL_SIZE,
            height: RAIL_PILL_SIZE,
            borderRadius: RAIL_PILL_RADIUS,
            color: "#fff",
            background: RAIL_PILL_BACKGROUND,
            boxShadow: open ? RAIL_PILL_SHADOW_ACTIVE : RAIL_PILL_SHADOW,
            transition: "box-shadow 150ms ease",
          }}
        >
          <AutoStoriesRoundedIcon fontSize="small" />
        </ButtonBase>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="right-start"
        modifiers={[{ name: "offset", options: { offset: [0, 12] } }]}
        style={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            elevation={12}
            sx={{ borderRadius: 3, maxHeight: "78vh", overflowY: "auto", overflowX: "hidden" }}
          >
            <SpellbookTile compact />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

/**
 * Registers the Spellbook pill into the HUD left rail for the lifetime of the
 * mounting component. `order: 10` sits just below the built-in game cluster
 * and above the AI Chat pipeline rail (`order: 12`). Renders nothing locally.
 */
export function SpellbookRailRegistrar() {
  const node = useMemo(() => <SpellbookRailButton />, []);
  useRegisterLeftRailItem({
    id: "spellbook-rail",
    order: 10,
    node,
    label: "Spellbook",
  });
  return null;
}
