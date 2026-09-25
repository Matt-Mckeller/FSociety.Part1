"use client";

/**
 * Command Center — Compass section shell.
 *
 * The Compass nav group (Strategic Focus, Goals, Lenses, SWOT) renders as a
 * single tabbed surface under a persistent "Compass" title. The active tab is
 * driven by `state.activeView`, so the tab bar and the (indented) nav rail stay
 * in sync — selecting either updates the shared view state. Mounted for any of
 * the four compass child views.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha, useTheme } from "@mui/material";

import { useCommandCenter } from "../../store/CommandCenterProvider";
import {
  COMMAND_GROUPS,
  commandViewMeta,
  groupChildren,
  type CommandView,
} from "../planning-glyphs";
import { StrategicFocusView } from "./StrategicFocusView";
import { SwotView } from "./SwotView";
import { GoalsView } from "./GoalsView";
import { LensesView } from "./LensesView";

const CHILD_VIEW: Partial<Record<CommandView, React.ComponentType>> = {
  strategicFocus: StrategicFocusView,
  swot: SwotView,
  goals: GoalsView,
  lenses: LensesView,
};

const COMPASS = COMMAND_GROUPS.find((g) => g.id === "compass");

export function CompassSection() {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const { state, setView } = useCommandCenter();

  const clusters = COMPASS?.clusters ?? [];
  const children = COMPASS ? groupChildren(COMPASS) : [];
  // Default to the first child if the active view isn't a compass child.
  const active = children.includes(state.activeView) ? state.activeView : children[0];
  const ActiveView = CHILD_VIEW[active] ?? StrategicFocusView;

  const renderTab = (id: CommandView) => {
    const meta = commandViewMeta(id);
    if (!meta) return null;
    const { Glyph } = meta;
    const selected = id === active;
    return (
      <Tooltip key={id} title={meta.description} arrow>
        <Box
          role="tab"
          aria-selected={selected}
          tabIndex={0}
          onClick={() => setView(id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setView(id);
            }
          }}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.75,
            px: 1.25,
            py: 0.6,
            borderRadius: 1.5,
            cursor: "pointer",
            userSelect: "none",
            color: selected ? accent : alpha(theme.palette.text.primary, 0.62),
            bgcolor: selected ? alpha(accent, 0.12) : "transparent",
            border: "1px solid",
            borderColor: selected ? alpha(accent, 0.32) : "transparent",
            transition: "all 140ms ease",
            "&:hover": {
              bgcolor: selected ? alpha(accent, 0.16) : alpha(accent, 0.06),
              color: selected ? accent : theme.palette.text.primary,
            },
            "&:focus-visible": {
              outline: `2px solid ${alpha(accent, 0.6)}`,
              outlineOffset: 1,
            },
          }}
        >
          <Glyph size={16} />
          <Typography
            variant="caption"
            sx={{ fontWeight: selected ? 800 : 600, fontSize: 12, lineHeight: 1.1, whiteSpace: "nowrap" }}
          >
            {meta.label}
          </Typography>
        </Box>
      </Tooltip>
    );
  };

  const CompassIcon = COMPASS?.Glyph;

  return (
    <Stack sx={{ height: "100%", minHeight: 0 }} spacing={1.25}>
      {/* Persistent section title — the Compass symbol stays visible across all tabs. */}
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, flexShrink: 0 }}>
        {CompassIcon && (
          <Box sx={{ color: accent, display: "flex" }}>
            <CompassIcon size={22} />
          </Box>
        )}
        <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1 }}>
          Compass
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", flex: 1, minWidth: 0 }}>
          {COMPASS?.description}
        </Typography>
      </Stack>

      {/* Tab bar — clustered, synced with the nav via shared activeView. */}
      <Stack
        role="tablist"
        aria-label="Compass sections"
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.5,
          flexWrap: "wrap",
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 1,
          flexShrink: 0,
        }}
      >
        {clusters.map((cluster, ci) => (
          <React.Fragment key={cluster.id}>
            {ci > 0 && (
              <Box
                aria-hidden
                sx={{ alignSelf: "stretch", my: 0.25, width: "1px", bgcolor: "divider", mx: 0.5 }}
              />
            )}
            {cluster.children.map((id) => renderTab(id))}
          </React.Fragment>
        ))}
      </Stack>

      {/* Active child fills the remaining space and scrolls. */}
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 0.5 }}>
        <ActiveView />
      </Box>
    </Stack>
  );
}
