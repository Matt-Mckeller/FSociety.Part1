"use client";

/**
 * NextActionsDialog — edit the ordered next-action list.
 *
 * The first row is the lead move. History for the slot sits underneath.
 */

import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import type { FocusRevision, TodayAction } from "../../model/today";
import { FocusHistory } from "./FocusHistory";

export function NextActionsDialog({
  open,
  onClose,
  actions,
  revisions,
  onAdd,
  onUpdate,
  onRemove,
  onLead,
}: {
  open: boolean;
  onClose: () => void;
  actions: readonly TodayAction[];
  revisions: readonly FocusRevision[];
  onAdd: (next: { label: string; detail: string }) => void;
  onUpdate: (id: string, next: { label: string; detail: string }) => void;
  onRemove: (id: string) => void;
  onLead: (id: string) => void;
}) {
  const [label, setLabel] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [editing, setEditing] = React.useState<string | null>(null);
  const [editLabel, setEditLabel] = React.useState("");
  const [editDetail, setEditDetail] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      setLabel("");
      setDetail("");
      setEditing(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "flex-start", gap: 1, pb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, flex: 1 }}>
          Next actions
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ gap: 1.25, pt: 0.5 }}>
          {actions.map((a, i) => {
            const isEdit = editing === a.id;
            return (
              <Stack
                key={a.id}
                sx={{
                  gap: 0.6,
                  p: 1,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: i === 0 ? alpha("#0ea5e9", 0.4) : "divider",
                  bgcolor: i === 0 ? alpha("#0ea5e9", 0.05) : "transparent",
                }}
              >
                {isEdit ? (
                  <>
                    <TextField
                      size="small"
                      label="Label"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      size="small"
                      label="Detail"
                      value={editDetail}
                      onChange={(e) => setEditDetail(e.target.value)}
                      fullWidth
                    />
                    <Stack direction="row" sx={{ gap: 0.75, justifyContent: "flex-end" }}>
                      <Button size="small" onClick={() => setEditing(null)} sx={{ textTransform: "none" }}>
                        Cancel
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        disabled={!editLabel.trim()}
                        onClick={() => {
                          onUpdate(a.id, { label: editLabel.trim(), detail: editDetail.trim() });
                          setEditing(null);
                        }}
                        sx={{ textTransform: "none", fontWeight: 800 }}
                      >
                        Save
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 800 }}>
                      {i + 1}. {a.label}
                    </Typography>
                    {a.detail && (
                      <Typography sx={{ fontSize: "0.62rem", color: "text.secondary", lineHeight: 1.4 }}>
                        {a.detail}
                      </Typography>
                    )}
                    <Stack direction="row" sx={{ gap: 0.5, flexWrap: "wrap" }}>
                      {i > 0 && (
                        <Button size="small" onClick={() => onLead(a.id)} sx={{ textTransform: "none", fontWeight: 700 }}>
                          Make lead
                        </Button>
                      )}
                      <Button
                        size="small"
                        onClick={() => {
                          setEditing(a.id);
                          setEditLabel(a.label);
                          setEditDetail(a.detail);
                        }}
                        sx={{ textTransform: "none", fontWeight: 700 }}
                      >
                        Edit
                      </Button>
                      {actions.length > 1 && (
                        <Button
                          size="small"
                          color="inherit"
                          onClick={() => onRemove(a.id)}
                          sx={{ textTransform: "none", fontWeight: 700 }}
                        >
                          Remove
                        </Button>
                      )}
                    </Stack>
                  </>
                )}
              </Stack>
            );
          })}

          <Stack sx={{ gap: 0.75, pt: 0.25 }}>
            <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em", color: "text.disabled" }}>
              ADD ACTION
            </Typography>
            <TextField
              size="small"
              label="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              fullWidth
            />
            <TextField
              size="small"
              label="Detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              fullWidth
            />
            <Button
              size="small"
              variant="contained"
              disabled={!label.trim()}
              onClick={() => {
                onAdd({ label: label.trim(), detail: detail.trim() });
                setLabel("");
                setDetail("");
              }}
              sx={{ textTransform: "none", fontWeight: 800, alignSelf: "flex-end" }}
            >
              Add
            </Button>
          </Stack>

          <FocusHistory revisions={revisions} slot="next-action" />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
