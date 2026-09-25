"use client";

/**
 * Two Storybooks, one route.
 *
 * They are genuinely separate books rather than two views of one: different
 * repositories, different MUI majors, different component sets. What they share
 * is the job — every component in isolation with its states — so putting them
 * behind one switch is the only arrangement that lets a reader compare them
 * without knowing which repository a component happens to live in.
 *
 * Only one is mounted at a time. Each is a full Storybook, and running both in
 * hidden iframes would download two entire applications to show one.
 *
 * The frames arrive as a map of ready-made elements rather than as a render
 * function. This is a client component and the page that uses it is a server
 * one, so a function child cannot cross the boundary — React refuses it — and
 * `MountedApp` is itself a server component that asks the filesystem whether
 * the app was built. Elements serialise; functions and `node:fs` do not.
 *
 * Passing both elements costs nothing: an element that is never rendered is an
 * object, not an iframe.
 */

import * as React from "react";
import { Box, Typography } from "@mui/material";

export interface StorybookBook {
  id: string;
  label: string;
  /** What is in it, and roughly how much. */
  note: string;
  accent: string;
}

export function StorybookSwitcher({
  books,
  frames,
}: {
  books: StorybookBook[];
  /** The framed app per book id. Only the selected one is put in the tree. */
  frames: Record<string, React.ReactNode>;
}) {
  const [selected, setSelected] = React.useState(books[0]?.id ?? "");
  const active = books.find((b) => b.id === selected) ?? books[0];

  return (
    <Box>
      <Box
        role="tablist"
        aria-label="Storybooks"
        sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1.5 }}
      >
        {books.map((book) => {
          const on = book.id === selected;
          return (
            <Box
              key={book.id}
              component="button"
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setSelected(book.id)}
              sx={{
                px: 2,
                py: 1,
                textAlign: "left",
                cursor: "pointer",
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: on ? book.accent : "divider",
                borderLeft: `3px solid ${on ? book.accent : "transparent"}`,
                bgcolor: on ? `${book.accent}10` : "background.paper",
                fontFamily: "inherit",
                "&:focus-visible": { outline: `2px solid ${book.accent}`, outlineOffset: 2 },
              }}
            >
              <Typography sx={{ fontSize: 14.5, fontWeight: 650, color: on ? book.accent : "text.primary" }}>
                {book.label}
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.25 }}>
                {book.note}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {active && frames[active.id]}

      {/*
        Said once, in small type. The package-level books are development tools
        for one library each rather than catalogues, and listing them as equals
        would imply there are eight places to look when there are two.
      */}
      <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 1.5, maxWidth: "80ch" }}>
        Six further Storybooks exist for individual packages — @expanse/ui, shell, character, lens,
        brand-core and hud. They are development tools for one library each rather than catalogues,
        so they are not published here.
      </Typography>
    </Box>
  );
}
