"use client";

/**
 * Dive-in knowledge chips for Privacy & security.
 * One grid: tap a cluster to go deeper; crumbs + Back to climb out.
 * Leaf chips open a short gloss below — no second “jump” list.
 */

import * as React from "react";
import { Box, Button, Chip, Stack, Typography, alpha } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  PRIVACY_CHIP_ROOT_ID,
  privacyChip,
  privacyChipKids,
  type PrivacyChip,
} from "@yen/content/privacy-security";

function weightSx(weight: PrivacyChip["weight"]) {
  const w = weight ?? 2;
  return {
    fontSize: 12 + w * 0.85,
    fontWeight: w >= 4 ? 700 : 600,
    px: 1.1 + w * 0.28,
    py: 0.65 + w * 0.06,
  } as const;
}

export function PrivacyKnowledgeBoard() {
  const [path, setPath] = React.useState<string[]>([PRIVACY_CHIP_ROOT_ID]);
  const [focusId, setFocusId] = React.useState<string | null>(null);

  const currentId = path[path.length - 1] ?? PRIVACY_CHIP_ROOT_ID;
  const current = privacyChip(currentId);
  const kids = privacyChipKids(currentId);
  const focused = focusId ? privacyChip(focusId) : null;
  const atRoot = currentId === PRIVACY_CHIP_ROOT_ID;

  const dive = (id: string) => {
    const node = privacyChip(id);
    if (node.kids && node.kids.length > 0) {
      setPath((p) => [...p, id]);
      setFocusId(null);
      return;
    }
    setFocusId(id);
  };

  const goCrumb = (index: number) => {
    setPath((p) => p.slice(0, index + 1));
    setFocusId(null);
  };

  const back = () => {
    setPath((p) => (p.length > 1 ? p.slice(0, -1) : p));
    setFocusId(null);
  };

  return (
    <Stack spacing={2.5}>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ flexWrap: "wrap", alignItems: "center" }}
        aria-label="Location in knowledge map"
      >
        {path.map((id, i) => (
          <React.Fragment key={`${id}-${i}`}>
            {i > 0 ? (
              <ChevronRightRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
            ) : null}
            <Chip
              size="small"
              label={i === 0 ? "All" : privacyChip(id).label}
              onClick={() => goCrumb(i)}
              color={i === path.length - 1 ? "primary" : "default"}
              variant={i === path.length - 1 ? "filled" : "outlined"}
              sx={{ fontWeight: 600, maxWidth: { zero: 180, tablet: 280 } }}
            />
          </React.Fragment>
        ))}
        {path.length > 1 ? (
          <Button
            size="small"
            onClick={back}
            sx={{ textTransform: "none", fontWeight: 600, ml: 0.5 }}
          >
            Back
          </Button>
        ) : null}
      </Stack>

      <Box
        sx={{
          p: { zero: 2, laptop: 2.75 },
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        {!atRoot ? (
          <>
            <Typography sx={{ fontSize: { zero: 17, laptop: 19 }, fontWeight: 700, letterSpacing: -0.2 }}>
              {current.label}
            </Typography>
            {current.gloss ? (
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "text.secondary",
                  mt: 0.75,
                  mb: 2,
                  maxWidth: 640,
                }}
              >
                {current.gloss}
              </Typography>
            ) : (
              <Box sx={{ mb: 1.5 }} />
            )}
          </>
        ) : (
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: "text.secondary",
              mb: 1.75,
              letterSpacing: 0.2,
            }}
          >
            Tap a topic · ones with an arrow open deeper
          </Typography>
        )}

        <Box
          role="list"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.15,
            alignItems: "center",
            minHeight: atRoot ? 120 : 72,
          }}
        >
          {kids.length === 0 ? (
            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
              Nothing further here — Back returns to the parent topic.
            </Typography>
          ) : (
            kids.map((c) => {
              const hasKids = Boolean(c.kids && c.kids.length > 0);
              const active = focusId === c.id;
              return (
                <Box
                  key={c.id}
                  component="button"
                  type="button"
                  role="listitem"
                  onClick={() => dive(c.id)}
                  aria-label={
                    hasKids
                      ? `${c.label}, open topic`
                      : `${c.label}${c.gloss ? `: ${c.gloss}` : ""}`
                  }
                  aria-pressed={!hasKids ? active : undefined}
                  sx={{
                    ...weightSx(c.weight),
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.35,
                    borderRadius: 999,
                    border: "1px solid",
                    borderColor: active ? "primary.main" : "divider",
                    bgcolor: active
                      ? (t) => alpha(t.palette.primary.main, 0.12)
                      : "background.default",
                    color: "text.primary",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    lineHeight: 1.25,
                    textAlign: "left",
                    transition: "border-color 120ms ease, background-color 120ms ease",
                    "&:hover": {
                      borderColor: "text.primary",
                      bgcolor: (t) => alpha(t.palette.text.primary, 0.04),
                    },
                    "&:focus-visible": {
                      outline: (t) => `2px solid ${t.palette.primary.main}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  {c.label}
                  {hasKids ? (
                    <ChevronRightRoundedIcon sx={{ fontSize: "1.05em", opacity: 0.55, mr: -0.25 }} />
                  ) : null}
                </Box>
              );
            })
          )}
        </Box>

        {focused && !(focused.kids && focused.kids.length) ? (
          <Box
            sx={{
              mt: 2.25,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: 700 }}>{focused.label}</Typography>
            {focused.gloss ? (
              <Typography
                sx={{ fontSize: 14, lineHeight: 1.55, color: "text.secondary", mt: 0.75, maxWidth: 640 }}
              >
                {focused.gloss}
              </Typography>
            ) : (
              <Typography sx={{ fontSize: 13, color: "text.disabled", mt: 0.5 }}>
                Part of this map — more detail later.
              </Typography>
            )}
          </Box>
        ) : null}
      </Box>
    </Stack>
  );
}
