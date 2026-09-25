"use client";

/** SpellbookToolbar — search, lane filter, sort, favorites. Split is advanced. */

import * as React from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  ToggleButton,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CallSplitRoundedIcon from "@mui/icons-material/CallSplitRounded";

import { useSpellbook } from "../store/SpellbookProvider";
import {
  SPELL_LANE_META,
  SPELL_LANE_ORDER,
  type SpellLane,
} from "../model/lanes";
import type { SpellSort } from "../model/types";

const SORTS: { value: SpellSort; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "lane", label: "Lane" },
  { value: "name", label: "Name" },
];

export function SpellbookToolbar() {
  const { state, dispatch } = useSpellbook();

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
      <TextField
        size="small"
        placeholder="Search spells"
        value={state.search}
        onChange={(e) => dispatch({ type: "set-search", search: e.target.value })}
        sx={{ flex: "1 1 180px", minWidth: 140 }}
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
      <TextField
        size="small"
        select
        label="Lane"
        value={state.lane}
        onChange={(e) =>
          dispatch({ type: "set-lane", lane: e.target.value as SpellLane | "all" })
        }
        sx={{ width: 140 }}
      >
        <MenuItem value="all">All lanes</MenuItem>
        {SPELL_LANE_ORDER.map((l) => (
          <MenuItem key={l} value={l}>
            {SPELL_LANE_META[l].label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size="small"
        select
        label="Sort"
        value={state.sort === "category" ? "lane" : state.sort}
        onChange={(e) => dispatch({ type: "set-sort", sort: e.target.value as SpellSort })}
        sx={{ width: 150 }}
      >
        {SORTS.map((s) => (
          <MenuItem key={s.value} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </TextField>
      <ToggleButton
        value="favorites"
        size="small"
        color="primary"
        selected={state.favoritesOnly}
        onChange={() => dispatch({ type: "toggle-favorites-only" })}
        aria-label="Favorites only"
        sx={{ textTransform: "none", gap: 0.5, px: 1.25 }}
      >
        <StarRoundedIcon fontSize="small" />
        Favorites
      </ToggleButton>
      <ToggleButton
        value="split"
        size="small"
        selected={state.splitMode}
        onChange={() => dispatch({ type: "toggle-split" })}
        aria-label="Split always vs contextual"
        sx={{ textTransform: "none", gap: 0.5, px: 1.25, color: "text.secondary" }}
      >
        <CallSplitRoundedIcon fontSize="small" />
        Advanced
      </ToggleButton>
    </Box>
  );
}
