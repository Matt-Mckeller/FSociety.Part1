"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { BACKUP_PREVIEW } from "@yen/content/backup";
import { ExhibitFrame, ExhibitPair, ShotCard } from "@/components/media/ExhibitFrame";

/*
  Same exhibit as the home profile band — one frame, two captures — pointed
  at tools you run. PageShell already owns the title; this is the pair.

  Captures do not link: the panel only binds to localhost.
*/

const RATIO = "2400 / 1166";

export function BackupPreview() {
  const { shots, accent, host, handle, dataNote, privacyHref } = BACKUP_PREVIEW;

  return (
    <Box component="section" id="backup-preview">
      <ExhibitFrame label={host} highlight={handle} accent={accent}>
        <ExhibitPair>
          {shots.map((shot) => (
            <ShotCard
              key={shot.id}
              src={shot.src}
              alt={shot.alt}
              caption={shot.caption}
              ratio={RATIO}
            />
          ))}
        </ExhibitPair>
      </ExhibitFrame>

      <Typography
        sx={{
          mt: 1.5,
          fontSize: 13,
          lineHeight: 1.55,
          color: "text.secondary",
          maxWidth: "68ch",
        }}
      >
        {dataNote} How we think about keeping data close is on{" "}
        <Box
          component={Link}
          href={privacyHref}
          sx={{ color: accent, fontWeight: 700, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          Privacy & security
        </Box>
        .
      </Typography>
    </Box>
  );
}
