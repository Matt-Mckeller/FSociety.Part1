"use client";

/**
 * ProfileTitleChips — equipped role titles, as game chips.
 *
 * Titles were rendering as plain secondary-coloured chips that threw away the
 * `hint` already sitting in {@link ROLE_TITLE_OPTIONS} — so "Explorer" appeared
 * with no way to learn what it meant or how it was earned.
 *
 * They deliberately read as siblings of {@link ProfileRoleChips}, not clones.
 * The two are different kinds of thing and the profile is worse if you cannot
 * tell them apart at a glance:
 *
 *   roles   what you *are* — student, teacher, parent. Structural, assigned,
 *           and they change what the product shows you.
 *   titles  what you have *earned* — progression. They change nothing
 *           functional; they are recognition.
 *
 * Neo, Storyteller, Game Master, Legendary Leader (grand master → GrandMaster.*), and Won scramble on hover.
 * Idle chips show the resting title label. Titles with an `href` open their
 * dossier in a new tab.
 *
 * Same height, weight and tooltip behaviour so they sit on one line together;
 * a badge glyph and the surface accent rather than the role blue, so which is
 * which is legible without reading either.
 */

import * as React from "react";
import { Chip, Stack, Tooltip, alpha } from "@mui/material";
import { BadgeIcon } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";
import { MorphLabel } from "@4eye/web/components/hud/resourceBars/widgets";
import { route } from "@4eye/web/lib/routes";
import {
  TITLE_CYPHER_WORDS,
  roleOptionForLabel,
} from "@4eye/web/Tiles/character/model/titles";

export function ProfileTitleChips({
  titles,
  accent,
}: {
  titles?: string[];
  /** The surface accent. Titles borrow it so they never introduce a new hue. */
  accent: string;
}) {
  const surface = useSurface();
  const ink = surface.ink(accent);
  const [hovered, setHovered] = React.useState<string | null>(null);
  if (!titles || titles.length === 0) return null;

  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
      {titles.map((label) => {
        const opt = roleOptionForLabel(label);
        const hint = opt?.hint;
        const href = opt?.href ? route(opt.href) : undefined;
        const cypher = TITLE_CYPHER_WORDS[label];
        const hovering = hovered === label;
        const tip = href ? `${hint ?? label} — open dossier` : hint;
        const chip = (
          <Chip
            component={href ? "a" : "div"}
            href={href}
            target={href ? "_blank" : undefined}
            rel={href ? "noopener noreferrer" : undefined}
            clickable={Boolean(href)}
            icon={<BadgeIcon size={13} />}
            label={
              cypher ? (
                <MorphLabel
                  motion="scramble"
                  words={cypher}
                  color="inherit"
                  active={hovering}
                  maxPasses={null}
                  hold={900}
                  fontSize="0.75rem"
                  weight={700}
                  letterSpacing={0.5}
                />
              ) : (
                label
              )
            }
            size="small"
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered((prev) => (prev === label ? null : prev))}
            sx={{
              height: 22,
              fontWeight: 700,
              color: ink,
              bgcolor: alpha(accent, 0.1),
              border: `1px solid ${alpha(accent, 0.3)}`,
              textDecoration: "none",
              cursor: href ? "pointer" : "default",
              "& .MuiChip-icon": { color: ink, ml: 0.6 },
            }}
          />
        );
        return tip ? (
          <Tooltip key={label} title={tip} arrow>
            {chip}
          </Tooltip>
        ) : (
          <React.Fragment key={label}>{chip}</React.Fragment>
        );
      })}
    </Stack>
  );
}
