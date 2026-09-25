"use client";

/**
 * Character — Interests & Engagement grid.
 *
 * Groups the user's interests, favorite topics, personality, songs, and
 * entertainment into accent-tinted chip rows. Extracted from CharacterTile.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";

import { COLOR_MAP } from "@4eye/types";
import type { ProfileField } from "@4eye/web/Tiles/profiles/model/types";

const INTEREST_CATEGORIES = [
  { key: "interests" as const, label: "Interests", accent: "blue" as const },
  { key: "favoriteTopics" as const, label: "Topics", accent: "purple" as const },
  { key: "personality" as const, label: "Personality", accent: "green" as const },
  { key: "favoriteSongs" as const, label: "Favorite Songs", accent: "amber" as const },
  { key: "favoriteEntertainment" as const, label: "Favorite Entertainment", accent: "red" as const },
];

export function InterestsEngagementGrid({
  interests = [],
  favoriteTopics = [],
  personality = [],
  favoriteSongs = [],
  favoriteEntertainment = [],
  mediaHighlights = [],
}: {
  interests?: string[];
  favoriteTopics?: string[];
  personality?: string[];
  favoriteSongs?: string[];
  favoriteEntertainment?: string[];
  mediaHighlights?: ProfileField[];
}) {
  const data = { interests, favoriteTopics, personality, favoriteSongs, favoriteEntertainment };
  const hasAny =
    interests.length > 0 ||
    favoriteTopics.length > 0 ||
    personality.length > 0 ||
    favoriteSongs.length > 0 ||
    favoriteEntertainment.length > 0 ||
    mediaHighlights.length > 0;
  if (!hasAny) return null;

  return (
    <Stack spacing={1}>
      {mediaHighlights.length > 0 && (
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 0.4, display: "block", mb: 0.5 }}
          >
            Media Highlights
          </Typography>
          <Stack spacing={0.75}>
            {mediaHighlights.map((h) => {
              const accentHex = COLOR_MAP.amber;
              return (
                <Box
                  key={h.id}
                  sx={{
                    px: 0.75,
                    py: 0.55,
                    borderRadius: 1.5,
                    border: "1px solid",
                    borderColor: alpha(accentHex, 0.28),
                    borderLeft: `3px solid ${accentHex}`,
                    bgcolor: alpha(accentHex, 0.06),
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 800, color: accentHex, lineHeight: 1.2, display: "block" }}
                  >
                    {h.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.primary", lineHeight: 1.35, display: "block" }}>
                    {h.value}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
      {INTEREST_CATEGORIES.map(({ key, label, accent }) => {
        const items = data[key];
        if (items.length === 0) return null;
        const accentHex = COLOR_MAP[accent];
        return (
          <Box key={key}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 0.4, display: "block", mb: 0.5 }}
            >
              {label}
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0.75 }}>
              {items.map((item) => (
                <Box
                  key={item}
                  sx={{
                    px: 0.75,
                    py: 0.55,
                    borderRadius: 1.5,
                    border: "1px solid",
                    borderColor: alpha(accentHex, 0.28),
                    borderLeft: `3px solid ${accentHex}`,
                    bgcolor: alpha(accentHex, 0.06),
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, color: accentHex, lineHeight: 1.2, display: "block" }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
