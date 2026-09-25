"use client";

/** Users / People — general identity profile. Full interests live on Life. */

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useProfiles } from "../../store/ProfileProvider";
import { AspectList, Empty, Section, TagRow } from "../shared/primitives";

export function UsersView({ onOpenLife }: { onOpenLife?: () => void } = {}) {
  const { profile } = useProfiles();
  const d = profile.data.users;
  if (!d) return <Empty label="No identity profile yet." />;

  const mediaHighlights = d.mediaHighlights ?? [];
  const favoriteSongs = d.favoriteSongs ?? [];
  const favoriteEntertainment = d.favoriteEntertainment ?? [];
  const interestPreview = d.interests.slice(0, 6);

  return (
    <Stack spacing={1}>
      <Section title="Who Am I">
        {d.whoAmI ? (
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {d.whoAmI}
          </Typography>
        ) : (
          <Empty label="No bio yet." />
        )}
      </Section>
      <Section title="Interests">
        <TagRow tags={interestPreview} />
        {onOpenLife && (
          <Box sx={{ mt: 0.75 }}>
            <Typography
              component="button"
              type="button"
              onClick={onOpenLife}
              sx={{
                p: 0,
                border: "none",
                bgcolor: "transparent",
                color: "primary.main",
                fontWeight: 700,
                fontSize: "0.75rem",
                cursor: "pointer",
                font: "inherit",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Full interests & engagement → Life
            </Typography>
          </Box>
        )}
      </Section>
      <Section title="Personality">
        <TagRow tags={d.personality} />
      </Section>
      {(mediaHighlights.length > 0 || favoriteSongs.length > 0 || favoriteEntertainment.length > 0) && (
        <>
          <Section title="Media Highlights">
            {mediaHighlights.length > 0 ? (
              <AspectList fields={mediaHighlights} />
            ) : (
              <Empty label="No media highlights yet." />
            )}
          </Section>
          <Section title="Favorite Songs">
            <TagRow tags={favoriteSongs} />
          </Section>
          <Section title="Favorite Entertainment">
            <TagRow tags={favoriteEntertainment} />
          </Section>
        </>
      )}
    </Stack>
  );
}
