"use client";

import { Box, Chip, Typography } from "@mui/material";
import { POSTS } from "@yen/content/posts";

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function PostList() {
  if (POSTS.length === 0) {
    return (
      <Box sx={{ p: 4, borderRadius: 2, border: "1px dashed", borderColor: "divider", maxWidth: "70ch" }}>
        <Typography sx={{ fontSize: 15, color: "text.secondary" }}>
          Nothing published yet. Add entries to <code>@yen/content/posts</code>.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "72ch" }}>
      {POSTS.map((post, i) => (
        <Box
          key={post.id}
          component="article"
          sx={{
            pb: 4,
            mb: 4,
            borderBottom: i === POSTS.length - 1 ? "none" : "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography sx={{ fontSize: 12.5, color: "text.secondary", fontWeight: 600, letterSpacing: 0.3 }}>
            {formatDate(post.date)}
          </Typography>

          <Typography sx={{ fontSize: 25, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.2, mt: 0.5, mb: 2 }}>
            {post.title}
          </Typography>

          {post.body.map((para) => (
            <Typography key={para} sx={{ fontSize: 16, lineHeight: 1.7, mb: 1.75 }}>
              {para}
            </Typography>
          ))}

          {post.tags && (
            <Box sx={{ display: "flex", gap: 0.75, mt: 2 }}>
              {post.tags.map((tag) => (
                <Chip key={tag} size="small" label={tag} sx={{ height: 21, fontSize: 11.5 }} />
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
