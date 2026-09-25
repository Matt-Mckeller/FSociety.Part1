"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  FEEDBACK_SCREENS,
  currentFeedbackVersion,
  type FeedbackScreenVersion,
} from "@yen/content/feedback-screens";

/** Compact 4up AI feedback preview — full interactive cut lives in Storybook. */
export function FeedbackScreensExhibit() {
  const versions = FEEDBACK_SCREENS.versions as FeedbackScreenVersion[];
  const [version, setVersion] = React.useState<FeedbackScreenVersion>(() =>
    currentFeedbackVersion(),
  );
  const [menuEl, setMenuEl] = React.useState<HTMLElement | null>(null);
  const accent = FEEDBACK_SCREENS.accent;
  const previewShots = version.shots.slice(0, 2);

  return (
    <Box
      sx={{
        mb: 2,
        maxWidth: 420,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          px: 1.25,
          py: 0.7,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: (t) => alpha(t.palette.text.primary, 0.025),
        }}
      >
        <Typography
          sx={{
            fontSize: 10.5,
            fontFamily: "monospace",
            color: "text.secondary",
            letterSpacing: 0.2,
          }}
        >
          {FEEDBACK_SCREENS.eyebrow}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Typography
          component={Link}
          href="/apps/storybook"
          sx={{
            fontSize: 10.5,
            fontFamily: "monospace",
            color: accent,
            textDecoration: "none",
            mr: 0.5,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Storybook →
        </Typography>
        <Typography
          sx={{
            display: { xs: "none", sm: "block" },
            fontSize: 10,
            fontFamily: "monospace",
            color: "text.disabled",
            mr: 0.15,
          }}
        >
          {version.label}
        </Typography>
        <IconButton
          size="small"
          aria-label="Feedback screen versions"
          title="Versions"
          onClick={(e) => setMenuEl(e.currentTarget)}
          sx={{
            width: 24,
            height: 22,
            borderRadius: 1,
            color: menuEl ? accent : "text.secondary",
            bgcolor: menuEl ? alpha(accent, 0.12) : "transparent",
            "&:hover": { bgcolor: alpha(accent, 0.1) },
          }}
        >
          <BranchGlyph size={13} />
        </IconButton>
        <VersionMenu
          versions={versions}
          activeId={version.id}
          anchor={menuEl}
          accent={accent}
          onPick={setVersion}
          onClose={() => setMenuEl(null)}
        />
      </Box>

      <Box sx={{ p: 1.25 }}>
        <Typography sx={{ fontSize: 13.5, fontWeight: 700, mb: 0.25, color: "text.primary" }}>
          {FEEDBACK_SCREENS.title}
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: "text.secondary", lineHeight: 1.45, mb: 1, maxWidth: "52ch" }}>
          Compact preview — open{" "}
          <Box
            component={Link}
            href="/apps/storybook"
            sx={{ color: accent, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
          >
            Storybook
          </Box>{" "}
          for Screens/FeedbackScreens.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 0.85,
            gridTemplateColumns: previewShots.length > 1 ? "repeat(2, minmax(0, 1fr))" : "1fr",
          }}
        >
          {previewShots.map((shot) => (
            <Box key={shot.id} component="figure" sx={{ m: 0 }}>
              <Box
                component={Link}
                href="/apps/storybook"
                sx={{
                  display: "block",
                  borderRadius: 1,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: (t) => alpha(t.palette.text.primary, 0.02),
                  "&:hover": { borderColor: accent },
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Box
                  component="img"
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    maxHeight: 148,
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </Box>
              <Typography
                component="figcaption"
                sx={{ mt: 0.4, fontSize: 11, fontWeight: 600, color: "text.secondary" }}
              >
                {shot.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function VersionMenu({
  versions,
  activeId,
  anchor,
  accent,
  onPick,
  onClose,
}: {
  versions: FeedbackScreenVersion[];
  activeId: string;
  anchor: HTMLElement | null;
  accent: string;
  onPick: (v: FeedbackScreenVersion) => void;
  onClose: () => void;
}) {
  return (
    <Menu
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{ paper: { sx: { width: 340, maxWidth: "calc(100vw - 24px)" } } }}
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
              <Stack direction="row" sx={{ alignItems: "baseline", gap: 0.75, flexWrap: "wrap", mb: 0.35 }}>
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
              <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.45 }}>
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

function BranchGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="4" cy="3" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="4" cy="13" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="8" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 4.7V11.3M4 8h6.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
