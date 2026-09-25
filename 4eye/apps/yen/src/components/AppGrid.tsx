"use client";

import Link from "next/link";
import { Box, Chip, Container, Typography } from "@mui/material";
import { APP_GROUPS, appsInGroup, type AppBadge, type AppEntry, type AppStatus } from "@yen/content";
import { RARITY_COLOR } from "@yen/content/character/equipment";
import { DocumentedIcon } from "./AppIcons";
import { SystemsHighlights } from "./SystemsHighlights";
import { WorkshopHighlights } from "./WorkshopHighlights";

const STATUS_LABEL: Record<AppStatus, string> = {
  live: "Live",
  preview: "Preview",
  planned: "Planned",
};

const STATUS_COLOR: Record<AppStatus, string> = {
  live: "#16a34a",
  preview: "#f59e0b",
  planned: "#94a3b8",
};

/**
 * Badges read louder than statuses, because they are the ranking.
 *
 * Filled rather than tinted for the two that promote an entry, outlined for the
 * three that qualify one — so "this is the best" and "this does not run" are
 * distinguishable across the page without reading either.
 */
const BADGE_STYLE: Record<AppBadge, { label: string; color: string; solid?: boolean }> = {
  flagship: { label: "Flagship · Newest", color: "#7c3aed", solid: true },
  newest: { label: "Newest", color: "#7c3aed", solid: true },
  "alternate-view": { label: "Alternate view", color: "#0891b2" },
  "documented-only": { label: "Documented only", color: "#b45309" },
  superseded: { label: "Deprecated", color: "#94a3b8" },
};

function BadgeChip({ badge }: { badge: AppBadge }) {
  const s = BADGE_STYLE[badge];
  return (
    <Chip
      size="small"
      label={s.label}
      sx={{
        height: 22,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.2,
        color: s.solid ? "#fff" : s.color,
        bgcolor: s.solid ? s.color : `${s.color}18`,
        border: s.solid ? "none" : `1px solid ${s.color}55`,
      }}
    />
  );
}

function AppTile({ app, lead = false }: { app: AppEntry; lead?: boolean }) {
  /* Rarity outranks the accent on the edge — it is the rarer claim. */
  const edge = app.rarity ? RARITY_COLOR[app.rarity] : app.accent;
  const disabled = Boolean(app.disabled);

  const body = (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
        <DocumentedIcon id={app.id} accent={app.accent} size={lead ? 44 : 36} />
        <Typography
          sx={{
            fontSize: app.emphasis === "bold" ? 21 : 20,
            fontWeight: app.emphasis === "bold" ? 800 : 650,
            letterSpacing: app.emphasis === "bold" ? -0.3 : 0,
            color: "text.primary",
            flex: 1,
            minWidth: 0,
          }}
        >
          {app.title}
        </Typography>
        {disabled && (
          <Chip
            size="small"
            label={app.disabledLabel ?? "Disabled"}
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 700,
              color: "#78716c",
              bgcolor: "#78716c18",
              border: "1px solid #78716c55",
            }}
          />
        )}
        {!disabled && (app.chipLabel || app.status !== "live") && (
          <Chip
            size="small"
            label={app.chipLabel ?? STATUS_LABEL[app.status]}
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 600,
              color: app.chipLabel ? "#a16207" : STATUS_COLOR[app.status],
              bgcolor: app.chipLabel ? "#a1620718" : `${STATUS_COLOR[app.status]}18`,
              border: app.chipLabel ? "1px solid #a1620755" : undefined,
            }}
          />
        )}
      </Box>

      {(app.badges?.length || app.rarity) && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, alignItems: "center" }}>
          {app.badges?.map((badge) => (
            <BadgeChip key={badge} badge={badge} />
          ))}
          {app.rarity && (
            <Box
              title="Highest-value data (series)"
              aria-label="Highest-value data"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                height: 22,
                px: 0.75,
                borderRadius: 1,
                border: "1px solid",
                borderColor: `${RARITY_COLOR[app.rarity]}66`,
                bgcolor: `${RARITY_COLOR[app.rarity]}14`,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  transform: "rotate(45deg)",
                  bgcolor: RARITY_COLOR[app.rarity],
                }}
              />
            </Box>
          )}
        </Box>
      )}

      <Typography sx={{ fontSize: lead ? 16 : 15, lineHeight: 1.55, color: "text.secondary" }}>
        {lead ? app.lede : app.summary}
      </Typography>

      {app.statusNote && (
        <Typography
          sx={{
            fontSize: 13,
            lineHeight: 1.5,
            color: "text.secondary",
            pl: 1.25,
            borderLeft: "2px solid",
            borderColor: "divider",
            mt: "auto",
          }}
        >
          {app.statusNote}
        </Typography>
      )}
    </>
  );

  if (disabled) {
    return (
      <Box
        aria-disabled
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
          p: 3,
          minHeight: lead ? 220 : 180,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          borderLeft: `3px solid ${edge}`,
          bgcolor: "action.hover",
          opacity: 0.55,
          filter: "grayscale(0.55)",
          cursor: "not-allowed",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {body}
      </Box>
    );
  }

  return (
    <Box
      component={Link}
      href={app.href}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
        p: 3,
        minHeight: lead ? 220 : 180,
        textDecoration: "none",
        borderRadius: 2,
        border: "1px solid",
        borderColor: app.rarity ? `${edge}66` : "divider",
        borderLeft: `3px solid ${edge}`,
        bgcolor: "background.paper",
        transition: "transform 140ms ease, box-shadow 140ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
        "&:focus-visible": {
          outline: `2px solid ${edge}`,
          outlineOffset: 2,
        },
      }}
    >
      {body}
    </Box>
  );
}

export function AppGrid() {
  return (
    <Container maxWidth="laptopL" sx={{ py: { zero: 4, laptop: 6 } }}>
      {APP_GROUPS.map((group, groupIndex) => {
        const lead = groupIndex === 0;
        return (
        <Box key={group.id} id={`group-${group.id}`} component="section" sx={{ mb: { zero: 5, laptop: 7 } }}>
          <Typography
            sx={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "text.secondary" }}
          >
            {group.title}
          </Typography>
          {group.epigraph && group.epigraph.length > 0 && (
            <Typography
              component="p"
              sx={{
                mt: 1,
                mb: 0.5,
                fontSize: { zero: 18, tablet: 20 },
                fontWeight: 700,
                letterSpacing: 0.02,
                lineHeight: 1.35,
                color: "text.primary",
                maxWidth: "40ch",
              }}
            >
              {group.epigraph.map((line) => (
                <Box key={line} component="span" sx={{ display: "block" }}>
                  {line}
                </Box>
              ))}
            </Typography>
          )}
          <Typography sx={{ fontSize: 15, color: "text.secondary", mt: 0.5, mb: 2.5, maxWidth: "70ch" }}>
            {group.blurb}
          </Typography>

          {group.id === "systems" && <SystemsHighlights />}
          {group.id === "workshop" && <WorkshopHighlights />}

          {/* Systems uses Pure-text catalogue only (SystemsHighlights). App
              entries stay in apps.ts for routes / compass, but are not tiled
              again here — that was the double Symbol Grid + heavy chrome. */}
          {group.id !== "systems" && (
          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              /* Explicit spans rather than auto-fill: the lead ring reads as
                 the answer to "what is this", so it gets fewer, wider tiles. */
              gridTemplateColumns: lead
                ? { zero: "1fr", tablet: "repeat(2, minmax(0, 1fr))", laptopL: "repeat(3, minmax(0, 1fr))" }
                : {
                    zero: "1fr",
                    tablet: "repeat(2, minmax(0, 1fr))",
                    laptop: "repeat(3, minmax(0, 1fr))",
                    laptopL: "repeat(4, minmax(0, 1fr))",
                  },
            }}
          >
            {appsInGroup(group.id).map((app) => (
              <AppTile key={app.id} app={app} lead={lead} />
            ))}
          </Box>
          )}
        </Box>
        );
      })}
    </Container>
  );
}
