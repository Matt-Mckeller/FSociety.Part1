"use client";

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { JournalTile } from "./JournalTile";
import { JournalProvider, useJournal } from "./store/JournalProvider";
import { JournalList } from "./components/JournalList";
import { JournalEditor } from "./components/JournalEditor";
import { JOURNAL_SEED, JOURNAL_EMPTY } from "./store/seed-data";
import { runTransformation } from "./store/transformations";
import type { JournalData } from "./model/types";

const meta: Meta<typeof JournalTile> = {
  title: "Journal/Journal",
  component: JournalTile,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof JournalTile>;

/** Full-viewport white frame so the tile reads as it does in the HUD. */
const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ height: "100vh", p: 2, bgcolor: "#fff", boxSizing: "border-box" }}>{children}</Box>
);

/** Reorder seed so a given entry is first (Provider selects entries[0]). */
function seedFirst(id: string): JournalData {
  const target = JOURNAL_SEED.entries.find((e) => e.id === id);
  const rest = JOURNAL_SEED.entries.filter((e) => e.id !== id);
  return { entries: target ? [target, ...rest] : JOURNAL_SEED.entries };
}

/**
 * Composes the surface directly (not the self-wrapping tile) so a story can
 * reach into the Provider after mount — e.g. to flip to Preview mode or seed a
 * pending transformation. `persistKey={null}` keeps localStorage out of it.
 */
function Composed({
  data,
  seed,
}: {
  data: JournalData;
  seed?: (ctx: ReturnType<typeof useJournal>) => void;
}) {
  return (
    <Frame>
      <JournalProvider data={data} persistKey={null}>
        <Box sx={{ height: "100%" }}>
          {seed && <Seeder seed={seed} />}
          <Box sx={{ display: "flex", height: "100%", gap: 1.5, border: "1px solid", borderColor: "divider", borderRadius: 2, p: 1.5, boxSizing: "border-box" }}>
            <Box sx={{ width: 280, flexShrink: 0, borderRight: "1px solid", borderColor: "divider", pr: 1.5 }}>
              <JournalList />
            </Box>
            <JournalEditor />
          </Box>
        </Box>
      </JournalProvider>
    </Frame>
  );
}

function Seeder({ seed }: { seed: (ctx: ReturnType<typeof useJournal>) => void }) {
  const ctx = useJournal();
  const done = React.useRef(false);
  React.useEffect(() => {
    if (done.current) return;
    done.current = true;
    seed(ctx);
  }, [ctx, seed]);
  return null;
}

export const Default: Story = {
  render: () => (
    <Frame>
      <JournalTile persistKey={null} />
    </Frame>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Frame>
      <JournalTile data={JOURNAL_EMPTY} persistKey={null} />
    </Frame>
  ),
};

export const NoteEditing: Story = {
  render: () => <Composed data={seedFirst("j-note-spaced")} />,
};

export const JournalEntry: Story = {
  render: () => <Composed data={seedFirst("j-journal-launch")} />,
};

export const AiChatEntry: Story = {
  name: "AI Chat entry",
  render: () => <Composed data={seedFirst("j-chat-transformers")} />,
};

export const MarkdownShowcase: Story = {
  name: "Markdown preview (GFM)",
  render: () => (
    <Composed
      data={{
        entries: [
          {
            id: "md-demo",
            kind: "note",
            title: "Markdown showcase",
            body: [
              "# Heading",
              "",
              "Regular text with **bold**, _italic_, ~~strike~~ and `code`.",
              "",
              "- [x] Task lists",
              "- [ ] Render checkboxes",
              "",
              "| Feature | Supported |",
              "| --- | --- |",
              "| Tables | ✅ |",
              "| Autolinks | ✅ |",
              "",
              "> A blockquote, for emphasis.",
            ].join("\n"),
            tags: ["markdown"],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      }}
      seed={(ctx) => ctx.setMode("preview")}
    />
  ),
};

export const TransformationPreview: Story = {
  name: "Learning transformation preview",
  render: () => (
    <Composed
      data={seedFirst("j-note-spaced")}
      seed={(ctx) => {
        const entry = ctx.selected;
        if (!entry) return;
        const r = runTransformation("SPELL_QUIZ", "Quiz Me", entry.body);
        if (r) ctx.setTransformPreview(r);
      }}
    />
  ),
};
