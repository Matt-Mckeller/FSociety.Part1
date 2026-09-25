"use client";

/**
 * TransformationPreview — shown when a Learning Transformation has been cast on
 * the active entry. Renders the (mocked) AI output and lets the user Replace
 * the body, Append it, or Discard.
 */

import * as React from "react";
import { Box, Button, Stack, Typography, alpha } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useJournal } from "../store/JournalProvider";
import { MarkdownPreview } from "./MarkdownPreview";

export function TransformationPreview() {
  const { state, selected, applyTransform, setTransformPreview } = useJournal();
  const preview = state.transformPreview;
  if (!preview || !selected) return null;

  return (
    <Box
      sx={{
        mt: 1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "secondary.main",
        bgcolor: (t) => alpha(t.palette.secondary.main, 0.05),
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", gap: 0.75, px: 1.25, py: 0.75, bgcolor: (t) => alpha(t.palette.secondary.main, 0.1) }}
      >
        <AutoAwesomeRoundedIcon fontSize="small" sx={{ color: "secondary.main" }} />
        <Typography variant="caption" sx={{ fontWeight: 800, color: "secondary.main", flex: 1 }}>
          {preview.label} — preview
        </Typography>
      </Stack>

      <Box sx={{ p: 1.25, maxHeight: 260, overflowY: "auto" }}>
        <MarkdownPreview source={preview.output} />
      </Box>

      <Stack direction="row" sx={{ gap: 1, px: 1.25, pb: 1.25, flexWrap: "wrap" }}>
        <Button size="small" variant="contained" color="secondary" onClick={() => applyTransform(selected.id, "replace")}>
          Replace body
        </Button>
        <Button size="small" variant="outlined" color="secondary" onClick={() => applyTransform(selected.id, "append")}>
          Append
        </Button>
        <Button size="small" color="inherit" onClick={() => setTransformPreview(null)}>
          Discard
        </Button>
      </Stack>
    </Box>
  );
}
