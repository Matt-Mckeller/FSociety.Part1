"use client";

/**
 * JournalTile — the Journal surface.
 *
 * Notes, journal entries, and AI chats in one place. A list rail (filter +
 * search + entries) beside a markdown editor with inline Learning
 * Transformations from the Spellbook. Self-wraps in {@link JournalProvider};
 * pass `data` to inject entries for Storybook / tests.
 *
 * Layout follows the Command Center: a row on wide viewports, stacked on
 * narrow ones.
 */

import * as React from "react";
import { Stack } from "@mui/material";
import { JournalProvider, type JournalProviderProps } from "./store/JournalProvider";
import { JournalList } from "./components/JournalList";
import { JournalEditor } from "./components/JournalEditor";

/**
 * Layout is responsive via CSS breakpoints (not `useMediaQuery`) so server and
 * client render an identical class — avoiding the SSR media-query hydration
 * flash the HUD shell calls out. Stacked below `tablet`, side-by-side above.
 */
function JournalSurface() {
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", tablet: "row" },
        height: "100%",
        minHeight: 0,
        gap: 1.5,
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        p: 1.5,
      }}
    >
      <Stack
        sx={{
          width: { xs: "auto", tablet: 280 },
          flexShrink: 0,
          minHeight: { xs: 220, tablet: 0 },
          maxHeight: { xs: 280, tablet: "none" },
          borderRight: { xs: "none", tablet: "1px solid" },
          borderBottom: { xs: "1px solid", tablet: "none" },
          borderColor: "divider",
          pr: { xs: 0, tablet: 1.5 },
          pb: { xs: 1.5, tablet: 0 },
        }}
      >
        <JournalList />
      </Stack>
      <JournalEditor />
    </Stack>
  );
}

export interface JournalTileProps {
  data?: JournalProviderProps["data"];
  initialKind?: JournalProviderProps["initialKind"];
  /** localStorage key, or null to disable persistence (stories/tests). */
  persistKey?: JournalProviderProps["persistKey"];
}

export function JournalTile({ data, initialKind, persistKey }: JournalTileProps = {}) {
  return (
    <JournalProvider data={data} initialKind={initialKind} persistKey={persistKey}>
      <JournalSurface />
    </JournalProvider>
  );
}

export default JournalTile;
