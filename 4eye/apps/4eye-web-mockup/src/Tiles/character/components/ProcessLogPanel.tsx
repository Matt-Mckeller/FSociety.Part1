"use client";

import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { MarkdownPreview } from "@4eye/web/Tiles/journal/components/MarkdownPreview";
import {
  PROCESS_LOG_KIND_META,
  formatLogTime,
  type ProcessLogEntry,
  type ProcessLogKind,
} from "../model/processes";

const LOG_KINDS: ProcessLogKind[] = [
  "result",
  "status",
  "response",
  "note",
  "pause-reason",
  "script",
];

function LogLine({
  entry,
  onDelete,
}: {
  entry: ProcessLogEntry;
  onDelete: () => void;
}) {
  const meta = PROCESS_LOG_KIND_META[entry.kind];
  const emoji = entry.emoji ?? meta.defaultEmoji;
  const prefix = entry.label ?? meta.label;

  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: alpha(meta.color, 0.35),
        bgcolor: (t) => alpha(meta.color, t.palette.mode === "dark" ? 0.08 : 0.04),
      }}
    >
      <Stack direction="row" sx={{ alignItems: "flex-start", gap: 0.75, mb: entry.body || entry.expression ? 0.5 : 0 }}>
        <Typography variant="caption" sx={{ fontWeight: 800, color: meta.color, flex: 1 }}>
          {emoji ? `${emoji} ` : ""}
          {prefix}
          {entry.kind === "status" && entry.label ? "" : entry.label ? ":" : ""}
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
          {formatLogTime(entry.createdAt)}
        </Typography>
        <IconButton size="small" onClick={onDelete} sx={{ mt: -0.5, mr: -0.5 }}>
          <DeleteOutlineRoundedIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Stack>

      {entry.expression && (
        <Typography
          variant="body2"
          sx={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "0.78rem",
            fontWeight: 600,
            mb: entry.body ? 0.5 : 0,
            wordBreak: "break-word",
          }}
        >
          {entry.expression}
        </Typography>
      )}

      {entry.body.trim() && (
        <Box sx={{ "& p": { my: 0.25 } }}>
          <MarkdownPreview source={entry.body} />
        </Box>
      )}
    </Box>
  );
}

export function ProcessLogPanel({
  logs,
  onAdd,
  onDelete,
}: {
  logs: ProcessLogEntry[];
  onAdd: (draft: Omit<ProcessLogEntry, "id" | "createdAt">) => void;
  onDelete: (logId: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [kind, setKind] = React.useState<ProcessLogKind>("result");
  const [label, setLabel] = React.useState("");
  const [body, setBody] = React.useState("");
  const [expression, setExpression] = React.useState("");
  const [emoji, setEmoji] = React.useState("");

  const sorted = React.useMemo(
    () => [...logs].sort((a, b) => a.createdAt - b.createdAt),
    [logs],
  );

  const resetForm = () => {
    setKind("result");
    setLabel("");
    setBody("");
    setExpression("");
    setEmoji("");
    setOpen(false);
  };

  const handleAdd = () => {
    if (!body.trim() && !expression.trim() && !label.trim()) return;
    onAdd({
      kind,
      label: label.trim() || undefined,
      body: body.trim(),
      expression: expression.trim() || undefined,
      emoji: emoji.trim() || PROCESS_LOG_KIND_META[kind].defaultEmoji,
    });
    resetForm();
  };

  const showExpression = kind === "status" || kind === "script";
  const showEmoji = kind === "response";

  return (
    <Stack sx={{ gap: 1 }}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
          Log & responses
        </Typography>
        {!open && (
          <Button size="small" startIcon={<AddRoundedIcon />} onClick={() => setOpen(true)}>
            Add entry
          </Button>
        )}
      </Stack>

      {sorted.length === 0 && !open && (
        <Typography variant="body2" color="text.secondary">
          No log entries yet — add results, status updates, or responses.
        </Typography>
      )}

      <Stack sx={{ gap: 0.75 }}>
        {sorted.map((entry) => (
          <LogLine key={entry.id} entry={entry} onDelete={() => onDelete(entry.id)} />
        ))}
      </Stack>

      {open && (
        <Box
          sx={{
            p: 1.25,
            borderRadius: 1.5,
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Stack sx={{ gap: 1 }}>
            <TextField
              select
              label="Kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as ProcessLogKind)}
              size="small"
              fullWidth
            >
              {LOG_KINDS.map((k) => (
                <MenuItem key={k} value={k}>
                  {PROCESS_LOG_KIND_META[k].label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              size="small"
              fullWidth
              placeholder={kind === "result" ? "Result1" : kind === "status" ? "Paused" : "Optional"}
            />

            {showEmoji && (
              <TextField
                label="Emoji"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                size="small"
                fullWidth
                placeholder="💛"
              />
            )}

            {showExpression && (
              <TextField
                label="Expression"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                size="small"
                fullWidth
                multiline
                minRows={2}
                InputProps={{
                  sx: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.85rem" },
                }}
              />
            )}

            <TextField
              label="Body (markdown)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              size="small"
              fullWidth
              multiline
              minRows={3}
              placeholder="Outcome, response quote, or note…"
            />

            <Stack direction="row" sx={{ gap: 1, justifyContent: "flex-end" }}>
              <Button size="small" onClick={resetForm}>
                Cancel
              </Button>
              <Button size="small" variant="contained" onClick={handleAdd}>
                Save entry
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
