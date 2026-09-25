"use client";

/**
 * Roadmap perspective — Streams (swimlanes).
 *
 * Parallel horizontal lanes, time flowing left→right: a shared trunk lane on
 * top, then one independent lane per destiny branch. Demonstrates streams that
 * can move independently of one another.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";

import { ROADMAP_PLAN, type RoadmapNode } from "../../../store/strategy-data";
import { TimelineGlyph } from "../../planning-glyphs";
import { Panel } from "../shared";
import { BranchHeader, branchHex, nodeColor } from "./roadmap-shared";

/** A horizontal row of node pills connected by arrows. */
function NodeTrack({ nodes, hex }: { nodes: RoadmapNode[]; hex: string }) {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
      {nodes.map((n, i) => (
        <React.Fragment key={n.id}>
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 5,
              border: `1px solid ${alpha(hex, 0.35)}`,
              bgcolor: alpha(hex, 0.1),
              fontSize: 12,
              fontWeight: 700,
              color: "text.primary",
              maxWidth: 260,
            }}
          >
            {n.title}
          </Box>
          {i < nodes.length - 1 && (
            <Box sx={{ color: alpha(hex, 0.6), fontWeight: 900 }}>→</Box>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
}

export function RoadmapStreams() {
  const theme = useTheme();
  const { trunkName, trunk, branches } = ROADMAP_PLAN;
  const orderedBranches = [...branches].sort((a, b) => a.rank - b.rank);
  const trunkHex = theme.palette.primary.main;

  const Lane = ({
    header,
    hex,
    children,
  }: {
    header: React.ReactNode;
    hex: string;
    children: React.ReactNode;
  }) => (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        gap: 1,
        p: 1,
        borderRadius: 2,
        bgcolor: alpha(hex, 0.04),
        borderLeft: `4px solid ${hex}`,
      }}
    >
      <Box sx={{ width: { xs: "auto", md: 200 }, flexShrink: 0 }}>{header}</Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>
    </Stack>
  );

  return (
    <Panel
      title="Roadmap · Streams"
      fill
      glyph={
        <Box sx={{ color: "primary.main", display: "flex" }}>
          <TimelineGlyph size={18} />
        </Box>
      }
    >
      <Stack spacing={1}>
        {/* Trunk lane */}
        <Lane
          hex={trunkHex}
          header={
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: trunkHex }}>
              ▶ {trunkName}
            </Typography>
          }
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
            {trunk.map((n, i) => {
              const color = nodeColor(theme, n.status);
              return (
                <React.Fragment key={n.id}>
                  <Box
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 5,
                      border: `1px solid ${alpha(color, 0.4)}`,
                      bgcolor: alpha(color, 0.12),
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {n.title}
                  </Box>
                  {i < trunk.length - 1 && (
                    <Box sx={{ color: "text.disabled", fontWeight: 900 }}>→</Box>
                  )}
                </React.Fragment>
              );
            })}
          </Stack>
        </Lane>

        <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5, pt: 0.5 }}>
          Branch streams
        </Typography>

        {/* Branch lanes */}
        {orderedBranches.map((b) => {
          const hex = branchHex(b);
          return (
            <Lane key={b.id} hex={hex} header={<BranchHeader branch={b} size="sm" />}>
              {b.nodes.length > 0 ? (
                <NodeTrack nodes={b.nodes} hex={hex} />
              ) : (
                <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                  {b.description ? `“${b.description}”` : "—"}
                </Typography>
              )}
            </Lane>
          );
        })}
      </Stack>
    </Panel>
  );
}
