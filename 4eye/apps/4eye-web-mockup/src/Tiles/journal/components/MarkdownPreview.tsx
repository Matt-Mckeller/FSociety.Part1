"use client";

/**
 * MarkdownPreview — renders journal markdown with GFM (tables, task lists,
 * strikethrough, autolinks) using `react-markdown` + `remark-gfm`, mapped onto
 * MUI typography so it inherits the tile's theme. Read-only.
 */

import * as React from "react";
import { Box, Divider, Link, Typography } from "@mui/material";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const COMPONENTS: Components = {
  h1: ({ children }) => (
    <Typography variant="h5" sx={{ fontWeight: 800, mt: 2, mb: 1 }}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h6" sx={{ fontWeight: 800, mt: 2, mb: 0.75 }}>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1.5, mb: 0.5 }}>
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body2" sx={{ my: 0.75, lineHeight: 1.7, color: "text.primary" }}>
      {children}
    </Typography>
  ),
  a: ({ href, children }) => (
    <Link href={href} target="_blank" rel="noreferrer" sx={{ fontWeight: 600 }}>
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <Box component="ul" sx={{ pl: 3, my: 0.5, "& li": { mb: 0.25 } }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ pl: 3, my: 0.5, "& li": { mb: 0.25 } }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body2" sx={{ lineHeight: 1.6 }}>
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
    <Box
      sx={{
        borderLeft: "3px solid",
        borderColor: "primary.light",
        pl: 1.5,
        my: 1,
        color: "text.secondary",
        fontStyle: "italic",
      }}
    >
      {children}
    </Box>
  ),
  code: ({ children, className }) => {
    const inline = !className;
    return (
      <Box
        component={inline ? "code" : "pre"}
        sx={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 12.5,
          bgcolor: "action.hover",
          borderRadius: 1,
          px: inline ? 0.6 : 1.25,
          py: inline ? 0.15 : 1,
          display: inline ? "inline" : "block",
          overflowX: "auto",
          my: inline ? 0 : 1,
        }}
      >
        {children}
      </Box>
    );
  },
  hr: () => <Divider sx={{ my: 1.5 }} />,
  table: ({ children }) => (
    <Box
      component="table"
      sx={{
        borderCollapse: "collapse",
        my: 1,
        "& th, & td": { border: "1px solid", borderColor: "divider", px: 1, py: 0.5, fontSize: 13 },
        "& th": { bgcolor: "action.hover", fontWeight: 700, textAlign: "left" },
      }}
    >
      {children}
    </Box>
  ),
};

export function MarkdownPreview({ source }: { source: string }) {
  if (!source.trim()) {
    return (
      <Typography variant="body2" sx={{ color: "text.disabled", fontStyle: "italic" }}>
        Nothing to preview yet.
      </Typography>
    );
  }
  return (
    <Box sx={{ color: "text.primary" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
        {source}
      </ReactMarkdown>
    </Box>
  );
}
