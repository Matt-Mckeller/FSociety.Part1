"use client";

/**
 * CompassHighlights — the Strategic Compass surfaced on the Today lens.
 *
 * Today is the doing lens, and what to do is a strategy question, so the
 * top-weighted compass entries render here as compact rows rather than making
 * the person open the Plan tile to remember why the day is shaped the way it
 * is. Every row links to the Plan tile, which stays the owner of the data —
 * this section is a readout, not a second editor.
 *
 * The "Jump to" row hands off to the other tiles the profile feeds: Sequences,
 * Journal, Rooms, Stores. It is built from `APP_HUD_NAV_CONFIG` so labels,
 * colours and routes cannot drift from the HUD that also renders them.
 */

import * as React from "react";
import { Box, Collapse, Stack, Typography, alpha } from "@mui/material";
import NextLink from "next/link";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import { COLOR_MAP } from "@4eye/types";
import { route } from "@4eye/web/lib/routes";
import { SectionLabel } from "@4eye/web/components/surface";
import { APP_HUD_NAV_CONFIG } from "@4eye/web/lib/hud/appNavigationConfig";
import {
  STRATEGIC_FOCUSES,
  type StrategicFocus,
} from "@4eye/web/Tiles/command-center/store/strategy-data";

/** A highlight with optional children, shown collapsed behind a count. */
export interface CompassHighlightNode {
  focus: StrategicFocus;
  children?: CompassHighlightNode[];
}

const PLAN_HREF = route("/appRealm/command-center");

/** How many top-weighted entries the lens shows before "everything" starts. */
const MAX_ROWS = 4;

/* ------------------------------------------------------------------- rows */

function HighlightRow({ node, nested }: { node: CompassHighlightNode; nested: boolean }) {
  const f = node.focus;
  const c = COLOR_MAP[f.color];
  const delta = f.weight - f.previousWeight;
  const childCount = nested ? (node.children?.length ?? 0) : 0;
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 1,
          px: 1,
          py: 0.6,
          borderRadius: 1.5,
          border: "1px solid",
          borderColor: alpha(c, 0.25),
          bgcolor: alpha(c, 0.05),
          "&:hover": { borderColor: alpha(c, 0.45), bgcolor: alpha(c, 0.09) },
        }}
      >
        <Typography sx={{ fontSize: "0.95rem", lineHeight: 1, flexShrink: 0 }}>{f.glyph}</Typography>
        <Box
          component={NextLink}
          href={PLAN_HREF}
          sx={{ flex: 1, minWidth: 0, textDecoration: "none", color: "text.primary" }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, display: "block", lineHeight: 1.25 }}>
            {f.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              fontSize: "0.62rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {f.goal}
          </Typography>
        </Box>
        {childCount > 0 && (
          <Typography
            role="button"
            tabIndex={0}
            onClick={() => setOpen((o) => !o)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen((o) => !o);
              }
            }}
            sx={{
              fontSize: "0.6rem",
              fontWeight: 800,
              color: alpha(c, 0.9),
              cursor: "pointer",
              flexShrink: 0,
              px: 0.5,
            }}
          >
            {open ? "hide" : `+${childCount}`}
          </Typography>
        )}
        {/* Weight, with the trend it just moved through. */}
        <Stack direction="row" sx={{ alignItems: "center", flexShrink: 0 }}>
          {delta !== 0 &&
            (delta > 0 ? (
              <ArrowDropUpRoundedIcon sx={{ fontSize: 18, color: "#16a34a", mr: -0.4 }} />
            ) : (
              <ArrowDropDownRoundedIcon sx={{ fontSize: 18, color: "#dc2626", mr: -0.4 }} />
            ))}
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, color: c }}>{f.weight}</Typography>
        </Stack>
      </Stack>
      {childCount > 0 && (
        <Collapse in={open}>
          <Stack sx={{ gap: 0.5, mt: 0.5, ml: 2 }}>
            {node.children!.map((child) => (
              <HighlightRow key={child.focus.id} node={child} nested={nested} />
            ))}
          </Stack>
        </Collapse>
      )}
    </Box>
  );
}

/* ---------------------------------------------------------------- jump to */

/** The tiles Today hands off to. Plan is already the section's own link. */
const JUMP_TILE_IDS = ["sequences", "journal", "rooms", "stores"] as const;

function JumpToRow() {
  const tiles = JUMP_TILE_IDS.map((id) =>
    APP_HUD_NAV_CONFIG.tiles.find((t) => t.id === id),
  ).filter((t): t is NonNullable<typeof t> => t != null);

  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75 }}>
      {tiles.map((t) => {
        const c = t.display.colors.active;
        const Icon = t.display.icon;
        return (
          <Box
            key={t.id}
            component={NextLink}
            href={t.url}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.5,
              borderRadius: 999,
              border: "1px solid",
              borderColor: alpha(c, 0.35),
              bgcolor: alpha(c, 0.07),
              color: c,
              textDecoration: "none",
              "&:hover": { borderColor: alpha(c, 0.6), bgcolor: alpha(c, 0.12) },
            }}
          >
            {Icon && <Icon sx={{ fontSize: 14 }} />}
            <Typography sx={{ fontSize: "0.68rem", fontWeight: 800 }}>{t.display.label}</Typography>
          </Box>
        );
      })}
    </Stack>
  );
}

/* ------------------------------------------------------------------- main */

export function CompassHighlights({
  accent,
  items,
  nested = false,
}: {
  accent: string;
  /** Override the default flat top-weighted list, e.g. to nest highlights. */
  items?: CompassHighlightNode[];
  /** Render children under parents. Off by default — flat rows. */
  nested?: boolean;
}) {
  const nodes: CompassHighlightNode[] =
    items ??
    [...STRATEGIC_FOCUSES]
      .sort((a, b) => b.weight - a.weight)
      .slice(0, MAX_ROWS)
      .map((focus) => ({ focus }));

  return (
    <Stack sx={{ gap: 1.5 }}>
      <Box>
        <Stack direction="row" sx={{ alignItems: "baseline", justifyContent: "space-between", gap: 1 }}>
          <SectionLabel accent={accent}>Compass</SectionLabel>
          <Box
            component={NextLink}
            href={PLAN_HREF}
            sx={{ fontSize: "0.62rem", fontWeight: 800, color: "text.secondary", textDecoration: "none", "&:hover": { color: "text.primary" } }}
          >
            Open Plan →
          </Box>
        </Stack>
        <Stack sx={{ gap: 0.5 }}>
          {nodes.map((n) => (
            <HighlightRow key={n.focus.id} node={n} nested={nested} />
          ))}
        </Stack>
      </Box>
      <Box>
        <SectionLabel accent={accent}>Jump to</SectionLabel>
        <JumpToRow />
      </Box>
    </Stack>
  );
}
