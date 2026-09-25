"use client";

/**
 * CustomActionDialog — create a user-defined action: name it, pick a lens
 * glyph, choose an accent. Created actions live in the loadout store and can
 * be slotted anywhere a spell can.
 */

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Lens, queryLenses } from "@expanse/lens";
import { COLORS, COLOR_MAP, type SymbolColor } from "@4eye/types";

import { useLoadout } from "../store/LoadoutProvider";
import type { CustomAction } from "../model/types";

const LENS_LIMIT = 24;

export function CustomActionDialog({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  /** Called with the created action (already added to the store). */
  onCreated?: (action: CustomAction) => void;
}) {
  const { dispatch } = useLoadout();
  const [name, setName] = React.useState("");
  const [lensSearch, setLensSearch] = React.useState("");
  const [lensId, setLensId] = React.useState<string | null>(null);
  const [accent, setAccent] = React.useState<SymbolColor>("purple");

  const lenses = React.useMemo(
    () => queryLenses({ text: lensSearch }).slice(0, LENS_LIMIT),
    [lensSearch],
  );

  const reset = () => {
    setName("");
    setLensSearch("");
    setLensId(null);
    setAccent("purple");
  };

  const create = () => {
    if (!name.trim() || !lensId) return;
    const action: CustomAction = {
      id: `CUSTOM_${Date.now().toString(36).toUpperCase()}`,
      name: name.trim(),
      lensId,
      accent,
    };
    dispatch({ type: "add-custom-action", action });
    onCreated?.(action);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>New custom action</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <TextField
          autoFocus
          size="small"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 0.5 }}
        />

        <Box>
          <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary" }}>
            Glyph
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder="Search lenses"
            value={lensSearch}
            onChange={(e) => setLensSearch(e.target.value)}
            sx={{ mb: 1 }}
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
              gap: 0.5,
              maxHeight: 180,
              overflowY: "auto",
            }}
          >
            {lenses.map((def) => (
              <Tooltip key={def.id} title={def.word} arrow>
                <Box
                  component="button"
                  onClick={() => setLensId(def.id)}
                  sx={{
                    appearance: "none",
                    cursor: "pointer",
                    p: 0.5,
                    borderRadius: 1.5,
                    border: "1.5px solid",
                    borderColor: lensId === def.id ? COLOR_MAP[accent] : "transparent",
                    bgcolor: lensId === def.id ? alpha(COLOR_MAP[accent], 0.08) : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Lens def={def} size={34} animated />
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary" }}>
            Accent
          </Typography>
          <Stack sx={{ flexDirection: "row", gap: 0.75, mt: 0.25 }}>
            {COLORS.map((c) => (
              <Box
                key={c}
                component="button"
                onClick={() => setAccent(c)}
                aria-label={c}
                sx={{
                  appearance: "none",
                  cursor: "pointer",
                  width: 22,
                  height: 22,
                  p: 0,
                  borderRadius: "50%",
                  bgcolor: COLOR_MAP[c],
                  border: "2px solid",
                  borderColor: accent === c ? "text.primary" : "transparent",
                }}
              />
            ))}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none", fontWeight: 700 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          disabled={!name.trim() || !lensId}
          onClick={create}
          sx={{ textTransform: "none", fontWeight: 800 }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
