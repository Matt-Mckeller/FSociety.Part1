"use client";

/** InventoryToolbar — search, sort, favorites toggle, capacity meter. */

import * as React from "react";
import {
  Box,
  InputAdornment,
  LinearProgress,
  MenuItem,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import { useInventory } from "../store/InventoryProvider";
import type { SortKey } from "../model/types";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "rarity", label: "Rarity" },
  { value: "date", label: "Newest" },
  { value: "name", label: "Name" },
];

export function InventoryToolbar() {
  const { state, dispatch } = useInventory();
  const pct = state.capacity.total
    ? Math.round((state.capacity.used / state.capacity.total) * 100)
    : 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
        <TextField
          size="small"
          placeholder="Search items"
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
          label="Sort"
          value={state.sort}
          onChange={(e) => dispatch({ type: "set-sort", sort: e.target.value as SortKey })}
          sx={{ width: 130 }}
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
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
          {state.capacity.used} / {state.capacity.total} slots
        </Typography>
      </Box>
    </Box>
  );
}
