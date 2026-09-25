"use client";

/** Resolves a {@link JournalKind} to its MUI icon component + accent colour. */

import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import { JOURNAL_KIND_META, type JournalKind } from "../model/types";

const ICONS: Record<JournalKind, SvgIconComponent> = {
  note: StickyNote2RoundedIcon,
  journal: MenuBookRoundedIcon,
  "ai-chat": ForumRoundedIcon,
};

export function kindIcon(kind: JournalKind): SvgIconComponent {
  return ICONS[kind];
}

export function kindColor(kind: JournalKind): string {
  return JOURNAL_KIND_META[kind].color;
}
