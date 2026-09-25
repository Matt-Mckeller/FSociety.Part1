"use client";

/**
 * JournalEditor — the main pane. Title, an action toolbar (Write/Preview
 * toggle, markdown formatting, Spellbook transformations, pin, delete), a tag
 * editor, and either the markdown editor/preview or — for AI-chat entries —
 * the chat transcript. The pending transformation preview renders below.
 */

import * as React from "react";
import {
  Box,
  Chip,
  IconButton,
  InputBase,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useJournal } from "../store/JournalProvider";
import { JOURNAL_KIND_META } from "../model/types";
import { kindColor, kindIcon } from "./kindIcon";
import { MarkdownPreview } from "./MarkdownPreview";
import { MarkdownToolbar } from "./MarkdownToolbar";
import { SpellbookPicker } from "./SpellbookPicker";
import { TransformationPreview } from "./TransformationPreview";
import { AiChatEntry } from "./AiChatEntry";

function TagEditor() {
  const { selected, updateEntry } = useJournal();
  const [draft, setDraft] = React.useState("");
  if (!selected) return null;

  const add = () => {
    const t = draft.trim().toLowerCase();
    if (t && !selected.tags.includes(t)) {
      updateEntry(selected.id, { tags: [...selected.tags, t] });
    }
    setDraft("");
  };

  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
      {selected.tags.map((t) => (
        <Chip
          key={t}
          label={t}
          size="small"
          onDelete={() => updateEntry(selected.id, { tags: selected.tags.filter((x) => x !== t) })}
        />
      ))}
      <InputBase
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
        placeholder="+ tag"
        sx={{ fontSize: 12, width: 80, "& input": { p: 0 } }}
      />
    </Stack>
  );
}

export function JournalEditor() {
  const { state, selected, updateEntry, deleteEntry, setMode, setTransformPreview } = useJournal();
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  if (!selected) {
    return (
      <Stack sx={{ flex: 1, alignItems: "center", justifyContent: "center", color: "text.disabled", gap: 1 }}>
        <Typography variant="body2">Select an entry, or create a new one.</Typography>
      </Stack>
    );
  }

  const Icon = kindIcon(selected.kind);
  const isChat = selected.kind === "ai-chat";

  return (
    <Stack sx={{ flex: 1, minWidth: 0, minHeight: 0, gap: 1 }}>
      {/* Title row */}
      <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
        <Icon sx={{ color: kindColor(selected.kind) }} />
        <InputBase
          value={selected.title}
          onChange={(e) => updateEntry(selected.id, { title: e.target.value })}
          placeholder="Title"
          sx={{ flex: 1, fontSize: 20, fontWeight: 800, "& input": { p: 0 } }}
        />
        <Tooltip title={selected.pinned ? "Unpin" : "Pin"}>
          <IconButton size="small" onClick={() => updateEntry(selected.id, { pinned: !selected.pinned })}>
            {selected.pinned ? (
              <PushPinRoundedIcon fontSize="small" color="primary" />
            ) : (
              <PushPinOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => deleteEntry(selected.id)} sx={{ color: "text.secondary" }}>
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {JOURNAL_KIND_META[selected.kind].label}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <TagEditor />
      </Stack>

      {/* Action toolbar */}
      {!isChat && (
        <Stack direction="row" sx={{ alignItems: "center", gap: 1, flexWrap: "wrap", borderTop: "1px solid", borderBottom: "1px solid", borderColor: "divider", py: 0.5 }}>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={state.mode}
            onChange={(_, v) => v && setMode(v)}
          >
            <ToggleButton value="write" sx={{ textTransform: "none", px: 1.25 }}>
              <EditRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> Write
            </ToggleButton>
            <ToggleButton value="preview" sx={{ textTransform: "none", px: 1.25 }}>
              <VisibilityRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> Preview
            </ToggleButton>
          </ToggleButtonGroup>

          {state.mode === "write" && (
            <MarkdownToolbar
              textareaRef={textareaRef}
              value={selected.body}
              onChange={(next) => updateEntry(selected.id, { body: next })}
            />
          )}

          <Box sx={{ flex: 1 }} />
          <SpellbookPicker
            text={selected.body}
            disabled={!selected.body.trim()}
            onResult={(r) => setTransformPreview(r)}
          />
        </Stack>
      )}

      {/* Body */}
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        {isChat ? (
          <AiChatEntry entry={selected} />
        ) : state.mode === "write" ? (
          <TextField
            inputRef={textareaRef}
            value={selected.body}
            onChange={(e) => updateEntry(selected.id, { body: e.target.value })}
            placeholder="Write in markdown…"
            multiline
            fullWidth
            minRows={10}
            variant="standard"
            slotProps={{ input: { disableUnderline: true, sx: { fontSize: 14, lineHeight: 1.7, fontFamily: "inherit" } } }}
          />
        ) : (
          <MarkdownPreview source={selected.body} />
        )}
      </Box>

      {!isChat && <TransformationPreview />}
    </Stack>
  );
}
