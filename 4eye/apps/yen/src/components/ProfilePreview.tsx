"use client";

import * as React from "react";
import { Box, Container, IconButton, Menu, MenuItem, Stack, Typography, alpha } from "@mui/material";
import {
  PROFILE_PREVIEW,
  currentPairVersion,
  type ProfilePairVersion,
  type ProfilePreviewSubject,
} from "@yen/content/overview";
import { BranchGlyph } from "@/components/media/playerIcons";
import { ExhibitFrame, ExhibitPair, ShotCard } from "@/components/media/ExhibitFrame";

/*
  Sits between the header and the grid. Two captures of the running profile,
  on a soft field so the screenshots read as artefacts rather than as page
  furniture — the background is drawn here rather than shipped as an image so
  it costs nothing and follows the theme.

  Finished here in four ways:

  - **The pair sits in one frame** rather than as two loose images on a wash.
  - **Each capture wears window chrome.**
  - **A placeholder stands in when a capture is missing.**
  - **Version control selects the pair**, not each shot alone — the menu shows
    both thumbnails together, because Surfaced and Character are one exhibit cut.

  The frame, the pair and the captures live in `media/ExhibitFrame` — the backup
  page mounts the same exhibit, and a lookalike would drift.
*/

export function ProfilePreview() {
  const subject = PROFILE_PREVIEW.subjects.matthew as ProfilePreviewSubject;
  const versions = subject.versions;
  const [version, setVersion] = React.useState<ProfilePairVersion | null>(() => currentPairVersion(subject));

  return (
    <Box
      component="section"
      id="profile-preview"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        background: (t) =>
          t.palette.mode === "dark"
            ? `radial-gradient(120% 80% at 20% 0%, ${t.palette.action.hover} 0%, transparent 60%), ${t.palette.background.default}`
            : `radial-gradient(120% 80% at 20% 0%, #f1f5f9 0%, transparent 60%), ${t.palette.background.default}`,
      }}
    >
      <Container maxWidth="laptopL" sx={{ py: { zero: 5, laptop: 7 } }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.3,
              textTransform: "uppercase",
              color: "text.secondary",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            <Box
              component="span"
              title="Highest-value data (series)"
              aria-label="Highest-value data"
              sx={{
                width: 8,
                height: 8,
                transform: "rotate(45deg)",
                bgcolor: "#d97706",
                display: "inline-block",
                opacity: 0.9,
              }}
            />
            {subject.eyebrow}
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: { zero: 26, laptop: 34 },
            fontWeight: 700,
            letterSpacing: -0.8,
            lineHeight: 1.15,
            mb: 1.5,
          }}
        >
          {subject.title}
        </Typography>

        <Typography
          sx={{ fontSize: { zero: 15, laptop: 17 }, lineHeight: 1.6, color: "text.secondary", maxWidth: "68ch" }}
        >
          {subject.body}
        </Typography>

        <ExhibitFrame
          label="4eye · appRealm"
          highlight={`@${subject.username}`}
          accent={subject.accent}
          actions={
            versions.length > 1 ? (
              <PairVersionControl
                versions={versions}
                activeVersion={version}
                accent={subject.accent}
                onPickVersion={setVersion}
              />
            ) : null
          }
        >
          <ExhibitPair>
            {subject.shots.map((shot) => (
              <ShotCard
                key={shot.id}
                src={version?.shots[shot.id] ?? null}
                alt={shot.alt}
                caption={shot.caption}
                href={shot.href}
                meta={versions.length > 1 ? (version?.label ?? null) : null}
              />
            ))}
          </ExhibitPair>
        </ExhibitFrame>
      </Container>
    </Box>
  );
}

/**
 * The version control that docks to the frame's rail. One selector for both
 * captures, because switching a cut means switching the whole exhibit rather
 * than one pane.
 */
function PairVersionControl({
  versions,
  activeVersion,
  accent,
  onPickVersion,
}: {
  versions: ProfilePairVersion[];
  activeVersion: ProfilePairVersion | null;
  accent: string;
  onPickVersion: (v: ProfilePairVersion) => void;
}) {
  const [menuEl, setMenuEl] = React.useState<HTMLElement | null>(null);

  return (
    <>
      {activeVersion && (
        <Typography
          sx={{
            display: { zero: "none", tablet: "block" },
            fontSize: 11,
            fontFamily: "monospace",
            color: "text.disabled",
            mr: 0.25,
          }}
        >
          {activeVersion.label}
        </Typography>
      )}
      <IconButton
        size="small"
        aria-label="Versions"
        title="Versions — profile + character pair"
        onClick={(e) => setMenuEl(e.currentTarget)}
        sx={{
          width: 28,
          height: 24,
          borderRadius: 1,
          color: menuEl ? accent : "text.secondary",
          bgcolor: menuEl ? alpha(accent, 0.12) : "transparent",
          "&:hover": { bgcolor: alpha(accent, 0.1) },
        }}
      >
        <BranchGlyph size={15} />
      </IconButton>
      <PairVersionMenu
        versions={versions}
        activeId={activeVersion?.id ?? null}
        anchor={menuEl}
        accent={accent}
        onPick={onPickVersion}
        onClose={() => setMenuEl(null)}
      />
    </>
  );
}

/**
 * Pair history as a branch. Each row shows both thumbnails so you can see the
 * combination you are selecting — profile left, character right.
 */
function PairVersionMenu({
  versions,
  activeId,
  anchor,
  accent,
  onPick,
  onClose,
}: {
  versions: ProfilePairVersion[];
  activeId: string | null;
  anchor: HTMLElement | null;
  accent: string;
  onPick: (v: ProfilePairVersion) => void;
  onClose: () => void;
}) {
  return (
    <Menu
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{ paper: { sx: { width: 360, maxWidth: "calc(100vw - 24px)" } } }}
    >
      {versions.map((v) => {
        const active = v.id === activeId;
        return (
          <MenuItem
            key={v.id}
            selected={active}
            onClick={() => {
              onPick(v);
              onClose();
            }}
            sx={{
              alignItems: "flex-start",
              gap: 1.25,
              py: 1.1,
              px: 1.5,
              pl: v.parent ? 2.5 : 1.5,
              whiteSpace: "normal",
            }}
          >
            <Box
              aria-hidden
              sx={{
                mt: 0.65,
                width: 9,
                height: 9,
                flexShrink: 0,
                borderRadius: "50%",
                border: `2px solid ${accent}`,
                bgcolor: active ? accent : "transparent",
              }}
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Stack direction="row" sx={{ alignItems: "baseline", gap: 0.75, flexWrap: "wrap", mb: 0.75 }}>
                <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>{v.label}</Typography>
                {v.current && (
                  <Typography sx={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", color: accent }}>
                    current
                  </Typography>
                )}
                {v.date && (
                  <Typography sx={{ fontSize: 11, color: "text.disabled", fontFamily: "monospace" }}>
                    {v.date}
                  </Typography>
                )}
              </Stack>

              <PairThumbnails
                shots={v.shots}
                accent={accent}
                active={active}
                versionLabel={v.label}
              />

              <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.45, mt: 0.85 }}>
                {v.note}
              </Typography>
              {v.parent && (
                <Typography sx={{ fontSize: 11, color: "text.disabled", mt: 0.25, fontFamily: "monospace" }}>
                  branched from {v.parent}
                </Typography>
              )}
            </Box>
          </MenuItem>
        );
      })}
    </Menu>
  );
}

function PairThumbnails({
  shots,
  accent,
  active,
  versionLabel,
}: {
  shots: ProfilePairVersion["shots"];
  accent: string;
  active: boolean;
  /** Names the capture in alt text, so the two thumbnails are distinguishable. */
  versionLabel: string;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0.75,
        p: 0.6,
        borderRadius: 1.25,
        border: "1px solid",
        borderColor: active ? alpha(accent, 0.45) : "divider",
        bgcolor: (t) => alpha(t.palette.text.primary, 0.02),
      }}
    >
      {(
        [
          ["profile", shots.profile],
          ["character", shots.character],
        ] as const
      ).map(([id, src]) => (
        <Box key={id} sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: "text.disabled",
              mb: 0.35,
            }}
          >
            {id}
          </Typography>
          {src ? (
            <Box
              component="img"
              src={src}
              alt={`${id === "profile" ? "Profile" : "Character"} capture, ${versionLabel}`}
              sx={{
                display: "block",
                width: "100%",
                aspectRatio: "1500 / 781",
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: 0.75,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            />
          ) : (
            <Box
              sx={{
                aspectRatio: "1500 / 781",
                borderRadius: 0.75,
                border: "1px dashed",
                borderColor: "divider",
                display: "grid",
                placeItems: "center",
                bgcolor: (t) => alpha(t.palette.text.primary, 0.03),
              }}
            >
              <Typography sx={{ fontSize: 10, color: "text.disabled" }}>missing</Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
