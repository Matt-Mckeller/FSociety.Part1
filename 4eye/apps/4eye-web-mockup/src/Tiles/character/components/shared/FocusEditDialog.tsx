"use client";

/**
 * FocusEditDialog — label + detail editor with the slot's revision history.
 *
 * Used for Today's #1, Current Goal, a single next action, and a new/edited plan.
 */

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { FOCUS_SLOT_LABEL, type FocusRevision, type FocusSlot } from "../../model/today";
import { FocusHistory } from "./FocusHistory";

export function FocusEditDialog({
  open,
  onClose,
  slot,
  title,
  label,
  detail,
  detailOptional = true,
  revisions,
  itemId,
  extra,
  onSave,
  onRemove,
  saveLabel = "Save",
}: {
  open: boolean;
  onClose: () => void;
  slot: FocusSlot;
  title?: string;
  label: string;
  detail?: string;
  detailOptional?: boolean;
  revisions: readonly FocusRevision[];
  itemId?: string;
  extra?: React.ReactNode;
  onSave: (next: { label: string; detail: string }) => void;
  onRemove?: () => void;
  saveLabel?: string;
}) {
  const [draftLabel, setDraftLabel] = React.useState(label);
  const [draftDetail, setDraftDetail] = React.useState(detail ?? "");

  React.useEffect(() => {
    if (open) {
      setDraftLabel(label);
      setDraftDetail(detail ?? "");
    }
  }, [open, label, detail]);

  const canSave = draftLabel.trim().length > 0 && (detailOptional || draftDetail.trim().length > 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "flex-start", gap: 1, pb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, flex: 1, lineHeight: 1.25 }}>
          {title ?? FOCUS_SLOT_LABEL[slot]}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ gap: 1.5, pt: 0.5 }}>
          <TextField
            label="Label"
            value={draftLabel}
            onChange={(e) => setDraftLabel(e.target.value)}
            size="small"
            fullWidth
            autoFocus
          />
          <TextField
            label="Detail"
            value={draftDetail}
            onChange={(e) => setDraftDetail(e.target.value)}
            size="small"
            fullWidth
            multiline
            minRows={2}
          />
          {extra}
          <Stack direction="row" sx={{ justifyContent: "space-between", gap: 1 }}>
            {onRemove ? (
              <Button
                size="small"
                color="inherit"
                onClick={() => {
                  onRemove();
                  onClose();
                }}
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Remove
              </Button>
            ) : (
              <Box />
            )}
            <Button
              size="small"
              variant="contained"
              disabled={!canSave}
              onClick={() => {
                onSave({ label: draftLabel.trim(), detail: draftDetail.trim() });
                onClose();
              }}
              sx={{ textTransform: "none", fontWeight: 800 }}
            >
              {saveLabel}
            </Button>
          </Stack>
          <FocusHistory revisions={revisions} slot={slot} itemId={itemId} />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
