"use client";

/**
 * Command Center — Roadmap shared primitives.
 *
 * Color/label helpers and small chips shared across the Roadmap perspectives
 * (Spine / Branches / Streams / Variable Map). Branch tint is keyed to
 * desirability; trunk nodes are tinted by their checkpoint status.
 */

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha } from "@mui/material";
import type { Theme } from "@mui/material/styles";

import type {
  CheckpointStatus,
  RoadmapBranch,
  RoadmapDesirability,
} from "../../../store/strategy-data";

/** Desirability → accent hex (theme-safe literals; ordered most→least desired). */
export const DESIRABILITY_HEX: Record<RoadmapDesirability, string> = {
  desired: "#14b8a6", // teal/green
  ok: "#f59e0b", // amber
  avoid: "#ef4444", // red
  "avoid-strongly": "#3f3f46", // near-black
};

/** Human-readable desirability label for chips/legends. */
export const DESIRABILITY_LABEL: Record<RoadmapDesirability, string> = {
  desired: "Desired",
  ok: "Can do",
  avoid: "Avoid",
  "avoid-strongly": "Avoid",
};

/**
 * Accent hex for a branch.
 *
 * Desirability is the default source, but a branch may override it: some
 * branches are identified by their own colour rather than ranked by how much
 * they are wanted, and forcing those through the desirability ramp mislabels
 * them as lukewarm.
 */
export function branchHex(branch: RoadmapBranch): string {
  return branch.color ?? DESIRABILITY_HEX[branch.desirability];
}

/** Ongoing branches keep running; outcomes are arrived at. */
export const BRANCH_KIND_LABEL = {
  ongoing: "Ongoing",
  outcome: "Outcome",
} as const;

/**
 * A satellite in orbit. Deliberately spare — a body, a ring, two panels.
 *
 * Only ever rendered by {@link TbdReveal}, and only on hover, so it reads as
 * something noticed rather than something announced.
 */
function SatelliteMark({ size = 15 }: { size?: number }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ width: size, height: size, display: "block" }}
      aria-hidden
    >
      {/* Orbit */}
      <ellipse
        cx="12"
        cy="12"
        rx="10.5"
        ry="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.28"
        transform="rotate(-24 12 12)"
      />
      {/* Body */}
      <rect x="10" y="10" width="4" height="4" rx="0.8" fill="currentColor" opacity="0.95" />
      {/* Panels */}
      <rect x="3.5" y="10.7" width="5.2" height="2.6" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="15.3" y="10.7" width="5.2" height="2.6" rx="0.5" fill="currentColor" opacity="0.6" />
      {/* Dish */}
      <path d="M12 10 L12 7.4" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="12" cy="6.6" r="1.3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    </Box>
  );
}

/**
 * The TBD reveal.
 *
 * An unnamed trunk milestone that stays unnamed — but hovering it turns the
 * placeholder into a satellite and a single line. It is not a label change and
 * not a tooltip full of roadmap; it is the smallest possible admission that
 * the blank is not actually blank.
 */
export function TbdReveal({ color }: { color: string }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Stack
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 0.75,
        minHeight: 20,
        cursor: "default",
        color,
      }}
    >
      <Box
        sx={{
          display: "flex",
          opacity: hovered ? 0.9 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-4px)",
          transition: "opacity 260ms ease, transform 260ms ease",
        }}
      >
        <SatelliteMark />
      </Box>
      <Typography
        variant="caption"
        sx={{
          fontStyle: "italic",
          opacity: hovered ? 0.75 : 0,
          transition: "opacity 260ms ease",
          transitionDelay: hovered ? "80ms" : "0ms",
          whiteSpace: "nowrap",
        }}
      >
        Taking over the satellites.
      </Typography>
    </Stack>
  );
}

/** Node fill color for a trunk milestone, keyed to its status. */
export function nodeColor(theme: Theme, status?: CheckpointStatus): string {
  switch (status) {
    case "reached":
      return theme.palette.success.main;
    case "active":
      return theme.palette.primary.main;
    default:
      return alpha(theme.palette.text.primary, 0.3);
  }
}

/** A small key + emoji + name + desirability chip for a branch. */
export function BranchHeader({
  branch,
  size = "md",
}: {
  branch: RoadmapBranch;
  size?: "sm" | "md";
}) {
  const hex = branchHex(branch);
  const titleVariant = size === "sm" ? "body2" : "subtitle2";
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, minWidth: 0 }}>
      <Box
        sx={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: 1,
          display: "grid",
          placeItems: "center",
          fontWeight: 900,
          fontSize: 12,
          color: hex,
          bgcolor: alpha(hex, 0.16),
        }}
      >
        {branch.id}
      </Box>
      <Typography component="span" sx={{ fontSize: 15, lineHeight: 1 }}>
        {branch.emoji}
      </Typography>
      <Typography
        variant={titleVariant}
        sx={{ fontWeight: 800, color: hex, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
      >
        {branch.name}
      </Typography>
      <Chip
        size="small"
        label={DESIRABILITY_LABEL[branch.desirability]}
        sx={{
          ml: 0.25,
          height: 18,
          fontWeight: 700,
          bgcolor: alpha(hex, 0.14),
          color: hex,
        }}
      />
      {/*
        Says out loud that a branch is a process rather than a destination.
        Outlined rather than filled so it reads as a property of the branch
        and does not compete with the desirability chip beside it.
      */}
      <Chip
        size="small"
        variant="outlined"
        label={BRANCH_KIND_LABEL[branch.kind ?? "ongoing"]}
        sx={{
          height: 18,
          fontWeight: 700,
          borderColor: alpha(hex, 0.35),
          color: alpha(hex, 0.9),
        }}
      />
    </Stack>
  );
}
