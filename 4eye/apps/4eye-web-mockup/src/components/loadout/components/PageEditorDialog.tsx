"use client";

/**
 * PageEditorDialog — create or edit a loadout page: its name, icon, and color,
 * plus the groups it contains (label, color, grid shape) and a delete action.
 *
 * Pages are free-form (any name/emoji/color); groups choose their own keypad
 * grid so one page can mix rows-of-3, a 3×3 keypad, and quads.
 */

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { useLoadout } from "../store/LoadoutProvider";
import {
  LOADOUT_GRIDS,
  LOADOUT_GRID_META,
  makeSlots,
  type LoadoutGrid,
  type LoadoutPage,
} from "../model/types";

/** Page/group accent palette. */
const SWATCHES = [
  "#3b82f6",
  "#8b5cf6",
  "#14b8a6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#64748b",
] as const;

let nextId = 0;
const uid = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}_${(nextId++).toString(36)}`;

/** Build a fresh, empty page (used by the "+ New page" entry point). */
export function makeEmptyPage(): LoadoutPage {
  return {
    id: uid("PAGE"),
    name: "New page",
    icon: "⭐",
    color: SWATCHES[0],
    groups: [{ id: uid("G"), label: "Primary", color: SWATCHES[0], grid: "tri", slots: makeSlots("tri") }],
  };
}

function ColorPickerRow({
  value,
  onChange,
}: {
  value?: string;
  onChange: (color: string) => void;
}) {
  return (
    <Stack sx={{ flexDirection: "row", gap: 0.5, flexWrap: "wrap" }}>
      {SWATCHES.map((c) => (
        <Box
          key={c}
          component="button"
          onClick={() => onChange(c)}
          sx={{
            appearance: "none",
            cursor: "pointer",
            width: 24,
            height: 24,
            borderRadius: "50%",
            bgcolor: c,
            border: "2px solid",
            borderColor: value === c ? "text.primary" : alpha(c, 0.4),
            transition: "transform 100ms ease",
            "&:hover": { transform: "scale(1.12)" },
          }}
        />
      ))}
    </Stack>
  );
}

export function PageEditorDialog({
  open,
  page,
  onClose,
}: {
  open: boolean;
  /** The page being edited; null while closed. */
  page: LoadoutPage | null;
  onClose: () => void;
}) {
  const { state, dispatch } = useLoadout();
  if (!page) return null;
  const canDelete = state.pages.length > 1;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>Edit page</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5}>
          {/* Page identity */}
          <Stack spacing={1.25}>
            <Stack sx={{ flexDirection: "row", gap: 1 }}>
              <TextField
                label="Icon"
                value={page.icon ?? ""}
                onChange={(e) =>
                  dispatch({ type: "update-page", pageId: page.id, patch: { icon: e.target.value } })
                }
                sx={{ width: 72 }}
                slotProps={{ htmlInput: { maxLength: 2, style: { textAlign: "center", fontSize: "1.2rem" } } }}
              />
              <TextField
                label="Name"
                fullWidth
                value={page.name}
                onChange={(e) =>
                  dispatch({ type: "update-page", pageId: page.id, patch: { name: e.target.value } })
                }
              />
            </Stack>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block", mb: 0.5 }}>
                Page color
              </Typography>
              <ColorPickerRow
                value={page.color}
                onChange={(color) => dispatch({ type: "update-page", pageId: page.id, patch: { color } })}
              />
            </Box>
          </Stack>

          {/* Groups */}
          <Box>
            <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                Groups
              </Typography>
              <Button
                size="small"
                startIcon={<AddRoundedIcon />}
                onClick={() =>
                  dispatch({
                    type: "add-group",
                    pageId: page.id,
                    group: { id: uid("G"), label: "Group", color: page.color, grid: "tri", slots: makeSlots("tri") },
                  })
                }
              >
                Add group
              </Button>
            </Stack>
            <Stack spacing={1}>
              {page.groups.map((g) => (
                <Stack
                  key={g.id}
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                    p: 1,
                    borderRadius: 1.5,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="Label"
                    value={g.label ?? ""}
                    onChange={(e) =>
                      dispatch({ type: "update-group", pageId: page.id, groupId: g.id, patch: { label: e.target.value } })
                    }
                    sx={{ flex: 1, minWidth: 80 }}
                  />
                  <Select
                    size="small"
                    value={g.grid}
                    onChange={(e) =>
                      dispatch({
                        type: "update-group",
                        pageId: page.id,
                        groupId: g.id,
                        patch: { grid: e.target.value as LoadoutGrid },
                      })
                    }
                    sx={{ width: 130 }}
                  >
                    {LOADOUT_GRIDS.map((grid) => (
                      <MenuItem key={grid} value={grid}>
                        {LOADOUT_GRID_META[grid].label}
                      </MenuItem>
                    ))}
                  </Select>
                  <Tooltip title={page.groups.length > 1 ? "Remove group" : "Keep at least one group"}>
                    <span>
                      <IconButton
                        size="small"
                        disabled={page.groups.length <= 1}
                        onClick={() => dispatch({ type: "remove-group", pageId: page.id, groupId: g.id })}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 2 }}>
        <Button
          color="error"
          startIcon={<DeleteOutlineRoundedIcon />}
          disabled={!canDelete}
          onClick={() => {
            dispatch({ type: "delete-page", pageId: page.id });
            onClose();
          }}
        >
          Delete page
        </Button>
        <Button variant="contained" onClick={onClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
