"use client";

/**
 * JournalList — the left rail: a "New" menu, kind-filter chips, a search box,
 * and the filtered, sorted entry cards.
 */

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { JOURNAL_KIND_META, JOURNAL_KINDS, type JournalKind } from "../model/types";
import { useJournal, type KindFilter } from "../store/JournalProvider";
import { JournalEntryCard } from "./JournalEntryCard";
import { kindIcon } from "./kindIcon";

const FILTERS: { id: KindFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...JOURNAL_KINDS.map((k) => ({ id: k as KindFilter, label: JOURNAL_KIND_META[k].plural })),
];

export function JournalList() {
  const { state, visibleEntries, createEntry, selectEntry, setKindFilter, setSearch } = useJournal();
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const onNew = (kind: JournalKind) => {
    createEntry(kind);
    setAnchor(null);
  };

  return (
    <Stack sx={{ height: "100%", minHeight: 0, gap: 1 }}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
          Journal
        </Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          New
        </Button>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          {JOURNAL_KINDS.map((k) => {
            const Icon = kindIcon(k);
            return (
              <MenuItem key={k} onClick={() => onNew(k)}>
                <ListItemIcon>
                  <Icon fontSize="small" sx={{ color: JOURNAL_KIND_META[k].color }} />
                </ListItemIcon>
                <ListItemText>{JOURNAL_KIND_META[k].label}</ListItemText>
              </MenuItem>
            );
          })}
        </Menu>
      </Stack>

      <TextField
        size="small"
        placeholder="Search notes…"
        value={state.search}
        onChange={(e) => setSearch(e.target.value)}
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

      <Stack direction="row" sx={{ gap: 0.5, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <Chip
            key={f.id}
            label={f.label}
            size="small"
            color={state.kindFilter === f.id ? "primary" : "default"}
            variant={state.kindFilter === f.id ? "filled" : "outlined"}
            onClick={() => setKindFilter(f.id)}
          />
        ))}
      </Stack>

      <Stack sx={{ flex: 1, minHeight: 0, overflowY: "auto", gap: 0.75, pr: 0.5 }}>
        {visibleEntries.length === 0 ? (
          <Box sx={{ p: 2, textAlign: "center", color: "text.disabled" }}>
            <Typography variant="caption">No entries. Hit “New” to start.</Typography>
          </Box>
        ) : (
          visibleEntries.map((e) => (
            <JournalEntryCard
              key={e.id}
              entry={e}
              active={e.id === state.selectedId}
              onClick={() => selectEntry(e.id)}
            />
          ))
        )}
      </Stack>
    </Stack>
  );
}
