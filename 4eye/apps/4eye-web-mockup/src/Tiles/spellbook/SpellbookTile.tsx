"use client";

/**
 * SpellbookTile — the single Spellbook surface (V1 mockup).
 *
 * Header (title + last-cast confirmation) → preset selector → toolbar →
 * keypad grid of spell cards. Browse, learn, favorite, and cast (no-op).
 *
 * Self-wraps in {@link SpellbookProvider} when used standalone. Embeddable in
 * the Character screen (compact) or shown full-width.
 *
 * UI-first per `_current/plans/project-controller.md` §Spellbook — example data.
 */

import * as React from "react";
import { Box, Divider, Fade, Stack, Typography } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { LensIconModeProvider } from "@expanse/lens";

import { ActionBarsPanel, LoadoutProvider } from "@4eye/web/components/loadout";

import { SpellbookProvider, useSpellbook } from "./store/SpellbookProvider";
import type { SpellbookData } from "./model/types";
import { FOR_YOU_PRESET_ID } from "./model/lanes";
import { PresetSelector } from "./components/PresetSelector";
import { SpellbookToolbar } from "./components/SpellbookToolbar";
import { SpellGrid } from "./components/SpellGrid";

function Header() {
  const { lastCast, state } = useSpellbook();
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <AutoStoriesRoundedIcon sx={{ color: "text.primary", fontSize: 26 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
          Spellbook
        </Typography>
      </Stack>
      <Fade in={Boolean(lastCast)}>
        <Stack sx={{ alignItems: "flex-end", maxWidth: 280 }}>
          <Typography variant="caption" sx={{ color: "#5b21b6", fontWeight: 800 }}>
            {lastCast ? `Cast “${lastCast.name}” ✦` : ""}
          </Typography>
          {state.castHint && (
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, textAlign: "right" }}>
              {state.castHint}
            </Typography>
          )}
        </Stack>
      </Fade>
    </Stack>
  );
}

function SpellbookSurface({ compact, showBars }: { compact?: boolean; showBars?: boolean }) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        maxWidth: compact ? 560 : 980,
      }}
    >
      <Header />
      <PresetSelector />
      <SpellbookToolbar />
      <SpellGrid />
      {showBars && (
        <>
          <Divider />
          <ActionBarsPanel />
        </>
      )}
    </Box>
  );
}

export interface SpellbookTileProps {
  data?: SpellbookData;
  initialPresetId?: string | null;
  initialSplit?: boolean;
  /** Tighter max-width for embedding inside the Character screen. */
  compact?: boolean;
  /** Render the Planning/Implementation/Improvement action bars below the grid. */
  showBars?: boolean;
}

export function SpellbookTile({
  data,
  initialPresetId = FOR_YOU_PRESET_ID,
  initialSplit,
  compact,
  showBars,
}: SpellbookTileProps = {}) {
  return (
    <LensIconModeProvider>
      <LoadoutProvider>
        <SpellbookProvider data={data} initialPresetId={initialPresetId} initialSplit={initialSplit}>
          <SpellbookSurface compact={compact} showBars={showBars} />
        </SpellbookProvider>
      </LoadoutProvider>
    </LensIconModeProvider>
  );
}

export default SpellbookTile;
