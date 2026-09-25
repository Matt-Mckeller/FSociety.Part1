"use client";

/**
 * MarkdownToolbar — lightweight formatting buttons that wrap / prefix the
 * current textarea selection with markdown syntax. No editor dependency: it
 * mutates the value through the supplied `onChange` and restores the caret.
 */

import * as React from "react";
import { Divider, IconButton, Stack, Tooltip } from "@mui/material";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";

type WrapAction = { kind: "wrap"; before: string; after: string };
type LineAction = { kind: "line"; prefix: string };
type Action = WrapAction | LineAction;

const BUTTONS: { id: string; label: string; Icon: typeof FormatBoldRoundedIcon; action: Action }[] = [
  { id: "bold", label: "Bold", Icon: FormatBoldRoundedIcon, action: { kind: "wrap", before: "**", after: "**" } },
  { id: "italic", label: "Italic", Icon: FormatItalicRoundedIcon, action: { kind: "wrap", before: "_", after: "_" } },
  { id: "code", label: "Inline code", Icon: CodeRoundedIcon, action: { kind: "wrap", before: "`", after: "`" } },
  { id: "h2", label: "Heading", Icon: TitleRoundedIcon, action: { kind: "line", prefix: "## " } },
  { id: "ul", label: "Bullet list", Icon: FormatListBulletedRoundedIcon, action: { kind: "line", prefix: "- " } },
  { id: "task", label: "Task", Icon: CheckBoxRoundedIcon, action: { kind: "line", prefix: "- [ ] " } },
  { id: "quote", label: "Quote", Icon: FormatQuoteRoundedIcon, action: { kind: "line", prefix: "> " } },
];

export function MarkdownToolbar({
  textareaRef,
  value,
  onChange,
}: {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (next: string) => void;
}) {
  const apply = (action: Action) => {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const selected = value.slice(start, end);

    let next: string;
    let caret: number;
    if (action.kind === "wrap") {
      next = value.slice(0, start) + action.before + selected + action.after + value.slice(end);
      caret = start + action.before.length + selected.length + action.after.length;
    } else {
      // Prefix the start of the line containing the selection start.
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      next = value.slice(0, lineStart) + action.prefix + value.slice(lineStart);
      caret = end + action.prefix.length;
    }

    onChange(next);
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      el.setSelectionRange(caret, caret);
    });
  };

  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: 0.25, flexWrap: "wrap" }}>
      {BUTTONS.map((b, i) => (
        <React.Fragment key={b.id}>
          {(b.id === "h2" || b.id === "quote") && (
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />
          )}
          <Tooltip title={b.label}>
            <IconButton size="small" onClick={() => apply(b.action)} sx={{ color: "text.secondary" }}>
              <b.Icon fontSize="small" />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ))}
    </Stack>
  );
}
