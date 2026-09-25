"use client";

/**
 * ProgressDetailDialog — a compact editor for an equipped goal / work item.
 *
 * Shows the item's title, optional detail + badge, and a slider to advance its
 * completion. Used by EquippedGoals and EquippedWorkList. Commits the new
 * progress (0–1) through `onCommit`, which routes to the store.
 */

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Slider,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export function ProgressDetailDialog({
  open,
  onClose,
  title,
  detail,
  badge,
  accent,
  weight,
  weightLabel = "weight",
  progress,
  onCommit,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  detail?: string;
  badge?: React.ReactNode;
  accent: string;
  weight?: number;
  weightLabel?: string;
  /** Current completion, 0–1. */
  progress: number;
  /** Commit a new completion, 0–1. */
  onCommit: (progress: number) => void;
}) {
  const [draft, setDraft] = React.useState(Math.round(progress * 100));

  // Re-seed the draft whenever a different item opens.
  React.useEffect(() => {
    if (open) setDraft(Math.round(progress * 100));
  }, [open, progress]);

  const commit = (pct: number) => {
    onCommit(Math.max(0, Math.min(100, pct)) / 100);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "flex-start", gap: 1, pb: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
            {title}
          </Typography>
          {badge && <Box sx={{ mt: 0.5 }}>{badge}</Box>}
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {detail && (
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            {detail}
          </Typography>
        )}

        {weight != null && (
          <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block", mb: 1.5 }}>
            {weightLabel.toUpperCase()} · {weight}
          </Typography>
        )}

        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: "1.5px solid",
            borderColor: alpha(accent, 0.3),
            bgcolor: alpha(accent, 0.04),
          }}
        >
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.75 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: accent }}>PROGRESS</Typography>
            <Typography variant="caption" sx={{ fontWeight: 900, color: accent }}>{draft}%</Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={draft}
            sx={{
              mb: 1,
              height: 6,
              borderRadius: 3,
              bgcolor: alpha(accent, 0.14),
              "& .MuiLinearProgress-bar": { borderRadius: 3, bgcolor: accent },
            }}
          />
          <Slider
            value={draft}
            min={0}
            max={100}
            step={5}
            onChange={(_, v) => setDraft(v as number)}
            sx={{
              color: accent,
              "& .MuiSlider-thumb": { width: 16, height: 16 },
              "& .MuiSlider-rail": { bgcolor: alpha(accent, 0.15) },
            }}
          />
          <Stack direction="row" sx={{ justifyContent: "space-between", gap: 1, mt: 0.5 }}>
            <Button
              size="small"
              startIcon={<CheckCircleRoundedIcon />}
              onClick={() => commit(100)}
              sx={{ textTransform: "none", fontWeight: 700, color: accent }}
            >
              Mark complete
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => commit(draft)}
              sx={{ textTransform: "none", fontWeight: 800, bgcolor: accent, "&:hover": { bgcolor: alpha(accent, 0.85) } }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
