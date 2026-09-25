"use client";

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import { MarkdownPreview } from "@4eye/web/Tiles/journal/components/MarkdownPreview";
import {
  NAMESPACE_COLOR,
  latestProcessStatus,
  type ProcessEntry,
  type ProcessGroup,
  type ProcessLogEntry,
} from "../model/processes";
import { ProcessLogPanel } from "./ProcessLogPanel";

export function ProcessDetailDialog({
  open,
  entry,
  group,
  onClose,
  onEdit,
  onRun,
  onAddLog,
  onDeleteLog,
}: {
  open: boolean;
  entry: ProcessEntry | null;
  group?: ProcessGroup;
  onClose: () => void;
  onEdit: () => void;
  /** Stub / inject run against the selected runner power. */
  onRun?: () => void;
  onAddLog: (draft: Omit<ProcessLogEntry, "id" | "createdAt">) => void;
  onDeleteLog: (logId: string) => void;
}) {
  if (!entry) return null;
  const color = NAMESPACE_COLOR[entry.namespace] ?? "#64748b";
  const latestStatus = latestProcessStatus(entry.logs);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="desktop" fullWidth scroll="paper">
      <DialogTitle sx={{ display: "flex", alignItems: "flex-start", gap: 1, pb: 1 }}>
        <Stack sx={{ flex: 1, gap: 0.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color, letterSpacing: "0.06em" }}>
            {entry.namespace.toUpperCase()}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              lineHeight: 1.4,
              wordBreak: "break-word",
            }}
          >
            {entry.expression}
          </Typography>
        </Stack>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ gap: 1.5 }}>
          <Stack direction="row" sx={{ gap: 0.5, flexWrap: "wrap", alignItems: "center" }}>
            {entry.autoPlay && (
              <Chip
                size="small"
                icon={<PlayArrowRoundedIcon sx={{ fontSize: "14px !important" }} />}
                label="AutoPlay"
                sx={{ bgcolor: (t) => alpha(color, 0.12), color, fontWeight: 700 }}
              />
            )}
            {!entry.active && <Chip size="small" label="Paused" color="warning" />}
            {latestStatus && (
              <Chip
                size="small"
                label={latestStatus.label ?? "Status"}
                sx={{
                  bgcolor: (t) => alpha("#3b82f6", t.palette.mode === "dark" ? 0.15 : 0.1),
                  color: "#3b82f6",
                  fontWeight: 700,
                }}
              />
            )}
            {group && (
              <Chip
                size="small"
                variant="outlined"
                label={`${group.namespace}.${group.name}`}
              />
            )}
            {entry.tags.map((t) => (
              <Chip key={t} size="small" label={t} variant="outlined" />
            ))}
            {entry.logs.length > 0 && (
              <Chip size="small" variant="outlined" label={`${entry.logs.length} log${entry.logs.length === 1 ? "" : "s"}`} />
            )}
          </Stack>

          {entry.description.trim() ? (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <MarkdownPreview source={entry.description} />
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No description yet.
            </Typography>
          )}

          <Divider />

          <ProcessLogPanel
            logs={entry.logs}
            onAdd={onAddLog}
            onDelete={onDeleteLog}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {onRun && (
          <Button
            variant="contained"
            color="warning"
            startIcon={<PlayArrowRoundedIcon />}
            onClick={onRun}
            sx={{ mr: "auto" }}
          >
            Run
          </Button>
        )}
        <Button startIcon={<EditRoundedIcon />} onClick={onEdit}>
          Edit
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
