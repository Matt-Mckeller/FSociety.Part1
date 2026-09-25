"use client";

/**
 * EvolveBranchPlayer — Style 2 · branching Evolve().
 *
 * From a shared Now, pick forks; walk the path with a breadcrumb.
 * More flexible than the linear Heart.Evolve scrubber.
 */

import * as React from "react";
import Link from "next/link";
import { Box, Stack, Typography, alpha } from "@mui/material";
import {
  EVOLVE_BRANCH_DEMO,
  branchPathTo,
  type EvolveBranchNode,
  type EvolveBranchTree,
} from "@yen/content/heart-evolve";

function Chip({
  active,
  accent,
  onClick,
  children,
}: {
  active?: boolean;
  accent: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      disabled={!onClick}
      sx={{
        px: 1.25,
        py: 0.5,
        borderRadius: 1.25,
        border: "1px solid",
        borderColor: active ? accent : alpha(accent, 0.28),
        bgcolor: active ? alpha(accent, 0.16) : alpha(accent, 0.04),
        color: active ? accent : "text.primary",
        fontSize: 12.5,
        fontWeight: 700,
        cursor: onClick ? "pointer" : "default",
        lineHeight: 1.2,
        opacity: onClick ? 1 : 0.85,
        "&:hover": onClick ? { borderColor: accent, bgcolor: alpha(accent, 0.12) } : undefined,
      }}
    >
      {children}
    </Box>
  );
}

export function EvolveBranchPlayer({
  tree = EVOLVE_BRANCH_DEMO,
  compact = false,
}: {
  tree?: EvolveBranchTree;
  compact?: boolean;
}) {
  const [nodeId, setNodeId] = React.useState(tree.root.id);
  const path = branchPathTo(tree.root, nodeId) ?? [tree.root];
  const current: EvolveBranchNode = path[path.length - 1] ?? tree.root;
  const accent = current.accent ?? tree.accent;
  const children = current.children ?? [];

  return (
    <Box
      id="style-2"
      sx={{
        scrollMarginTop: 28,
        borderRadius: compact ? 2 : 2.5,
        border: "1px solid",
        borderColor: alpha(tree.accent, 0.35),
        overflow: "hidden",
        bgcolor: "background.paper",
        maxWidth: compact ? 560 : 960,
      }}
    >
      <Stack
        direction={{ zero: "column", tablet: "row" }}
        spacing={1}
        sx={{
          px: compact ? 1.5 : 2,
          py: compact ? 1.25 : 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(tree.accent, 0.05),
          justifyContent: "space-between",
          alignItems: { tablet: "center" },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 13,
              fontWeight: 800,
              color: tree.accent,
            }}
          >
            {tree.code}
          </Typography>
          {!compact && (
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.35, maxWidth: "54ch" }}>
              {tree.lede}
            </Typography>
          )}
        </Box>
        <Chip accent={tree.accent}>Style 2 · branch</Chip>
      </Stack>

      {/* Breadcrumb path */}
      <Stack
        direction="row"
        spacing={0.75}
        useFlexGap
        sx={{ px: compact ? 1.5 : 2, py: 1, borderBottom: "1px solid", borderColor: "divider", flexWrap: "wrap", alignItems: "center" }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 750,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "text.secondary",
            mr: 0.25,
          }}
        >
          Path
        </Typography>
        {path.map((n, i) => (
          <React.Fragment key={n.id}>
            {i > 0 && (
              <Typography sx={{ color: "text.disabled", fontSize: 12 }} aria-hidden>
                →
              </Typography>
            )}
            <Chip
              accent={n.accent ?? tree.accent}
              active={n.id === nodeId}
              onClick={() => setNodeId(n.id)}
            >
              {n.label}
            </Chip>
          </React.Fragment>
        ))}
      </Stack>

      <Box sx={{ position: "relative", aspectRatio: "16 / 10", bgcolor: "#0c0a09" }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#0c0a09",
            backgroundImage: current.src ? `url(${current.src})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottom: `3px solid ${accent}`,
          }}
          role="img"
          aria-label={current.label}
        />
      </Box>

      <Box sx={{ px: compact ? 1.5 : 2, py: 1.5 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 750 }}>{current.label}</Typography>
        {current.blurb && (
          <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.4, lineHeight: 1.5 }}>
            {current.blurb}
          </Typography>
        )}

        {children.length > 0 && (
          <Box sx={{ mt: 1.5 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 750,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "text.secondary",
                mb: 0.75,
              }}
            >
              Fork
            </Typography>
            <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: "wrap" }}>
              {children.map((child) => (
                <Chip
                  key={child.id}
                  accent={child.accent ?? tree.accent}
                  onClick={() => setNodeId(child.id)}
                >
                  {child.label}
                </Chip>
              ))}
            </Stack>
          </Box>
        )}

        {children.length === 0 && (
          <Typography sx={{ mt: 1.25, fontSize: 12.5, color: "text.disabled" }}>
            End of this branch — jump back via Path, or open Style 1.
          </Typography>
        )}

        {!compact && (
          <Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
            <Box
              component={Link}
              href="/4eye/appRealm/profile?lens=core#heart-evolve-media"
              sx={{ fontSize: 13, fontWeight: 650, color: "#ff5c7a", textDecoration: "none" }}
            >
              Style 1 · Heart.Evolve →
            </Box>
            <Box
              component={Link}
              href="/social"
              sx={{ fontSize: 13, fontWeight: 650, color: "text.secondary", textDecoration: "none" }}
            >
              Social hub · under construction
            </Box>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
