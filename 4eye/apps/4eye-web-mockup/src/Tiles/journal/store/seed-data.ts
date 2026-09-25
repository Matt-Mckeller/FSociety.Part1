"use client";

/**
 * Journal tile — seed data (V1 mockup).
 *
 * A small, realistic spread: a quick markdown note, a dated journal entry, and
 * a saved AI chat. Used as the default Provider data and seeded into
 * localStorage on first run.
 */

import type { JournalData } from "../model/types";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 5, 23, 14, 30); // stable for stories/screenshots

export const JOURNAL_SEED: JournalData = {
  entries: [
    {
      id: "j-note-spaced",
      kind: "note",
      title: "Spaced repetition — why it works",
      body: [
        "## Spaced repetition",
        "",
        "Reviewing material at **increasing intervals** beats cramming. Each",
        "successful recall strengthens the memory and stretches the next interval.",
        "",
        "- Recall *before* you peek — the effort is the point",
        "- Short, frequent sessions > one long session",
        "- [ ] Turn last week's reading into flashcards",
        "- [x] Schedule daily 10-min review",
      ].join("\n"),
      tags: ["learning", "memory"],
      pinned: true,
      createdAt: NOW - 2 * DAY,
      updatedAt: NOW - 6 * 60 * 60 * 1000,
    },
    {
      id: "j-journal-launch",
      kind: "journal",
      title: "Shipping the command center",
      body: [
        "Today the crew queue finally clicked into place. Watching the goal cards",
        "light up as work moved across lanes felt like the product *breathing*.",
        "",
        "What I learned: the inspector should follow the user, not the view. One",
        "persistent panel beats a modal per screen.",
        "",
        "> Tomorrow: wire the journal tile and put the spellbook in the rail.",
      ].join("\n"),
      tags: ["build-log", "reflection"],
      createdAt: NOW - DAY,
      updatedAt: NOW - DAY,
    },
    {
      id: "j-chat-transformers",
      kind: "ai-chat",
      title: "Understanding attention",
      body: "Saved chat: a walk-through of self-attention, distilled to the core idea.",
      tags: ["ai", "transformers"],
      chat: [
        {
          role: "user",
          text: "Explain self-attention like I'm new to ML.",
          at: NOW - 3 * 60 * 60 * 1000,
        },
        {
          role: "assistant",
          text: "Each token looks at every other token and decides how much to 'pay attention' to it. Those weighted looks get mixed together so every token ends up carrying context from the whole sequence.",
          at: NOW - 3 * 60 * 60 * 1000 + 4000,
        },
        {
          role: "user",
          text: "Why is that better than reading left to right?",
          at: NOW - 3 * 60 * 60 * 1000 + 60000,
        },
        {
          role: "assistant",
          text: "It sees the entire sequence at once, so long-range relationships are one hop away instead of many. It also parallelizes well, which is why it scales.",
          at: NOW - 3 * 60 * 60 * 1000 + 64000,
        },
      ],
      createdAt: NOW - 3 * 60 * 60 * 1000,
      updatedAt: NOW - 3 * 60 * 60 * 1000 + 64000,
    },
  ],
};

export const JOURNAL_EMPTY: JournalData = { entries: [] };
