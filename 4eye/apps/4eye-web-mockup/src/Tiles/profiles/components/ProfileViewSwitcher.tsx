"use client";

/**
 * ProfileViewSwitcher — segmented control across the eight profile sub-views.
 *
 * Horizontally scrollable on narrow widths so all views stay reachable. Driven
 * by the {@link ProfileProvider}; brand-themed via `color="primary"`.
 */

import * as React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { PROFILE_VIEWS, PROFILE_VIEW_META, type ProfileView } from "../model/types";
import { useProfiles } from "../store/ProfileProvider";

export function ProfileViewSwitcher() {
  const { state, dispatch } = useProfiles();
  return (
    <Box sx={{ overflowX: "auto", pb: 0.5 }}>
      <ToggleButtonGroup
        size="small"
        exclusive
        color="primary"
        value={state.activeView}
        onChange={(_, v: ProfileView | null) => v && dispatch({ kind: "set-view", view: v })}
        sx={{
          flexWrap: "nowrap",
          "& .MuiToggleButton-root": {
            textTransform: "none",
            fontWeight: 700,
            px: 1.25,
            whiteSpace: "nowrap",
            borderColor: "divider",
          },
        }}
      >
        {PROFILE_VIEWS.map((v) => (
          <ToggleButton key={v} value={v}>
            {PROFILE_VIEW_META[v].label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
