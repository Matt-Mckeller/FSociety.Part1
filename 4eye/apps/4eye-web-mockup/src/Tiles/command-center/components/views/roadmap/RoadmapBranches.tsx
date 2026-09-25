"use client";

/**
 * Roadmap perspective — Branches (tree).
 *
 * The committed trunk as a compact spine, then a fork that splits into the four
 * destiny branches (ordered most→least desired). Each branch is a tinted lane
 * with its header, reflective note, and sub-steps. The headline perspective.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";

import { ROADMAP_PLAN } from "../../../store/strategy-data";
import { TimelineGlyph } from "../../planning-glyphs";
import { Panel } from "../shared";
import { BranchHeader, branchHex, nodeColor } from "./roadmap-shared";

export function RoadmapBranches() {
  const theme = useTheme();
  const { trunkName, trunk, branches } = ROADMAP_PLAN;
  const orderedBranches = [...branches].sort((a, b) => a.rank - b.rank);

  return (
    <Panel
      title="Roadmap · Branches"
      fill
      glyph={
        <Box sx={{ color: "primary.main", display: "flex" }}>
          <TimelineGlyph size={18} />
        </Box>
      }
    >
      {/* Trunk — a horizontal chain of committed milestones. */}
      <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5 }}>
        Trunk · {trunkName}
      </Typography>
      <Stack
        sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "stretch", gap: 1, mt: 0.75, mb: 1.5 }}
      >
        {trunk.map((cp, i) => {
          const color = nodeColor(theme, cp.status);
          return (
            <React.Fragment key={cp.id}>
              <Box
                sx={{
                  flex: "1 1 180px",
                  minWidth: 160,
                  p: 1,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: alpha(color, 0.3),
                  bgcolor: alpha(color, 0.06),
                }}
              >
                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, mb: 0.25 }}>
                  <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: color, flexShrink: 0 }} />
                  {cp.status === "active" && (
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                      In progress
                    </Typography>
                  )}
                </Stack>
                <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
                  {cp.title}
                </Typography>
              </Box>
              {i < trunk.length - 1 && (
                <Box sx={{ alignSelf: "center", color: "text.disabled", fontWeight: 900 }}>→</Box>
              )}
            </React.Fragment>
          );
        })}
      </Stack>

      {/* Fork label */}
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, mb: 1 }}>
        <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
        <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Fork — destiny branches
        </Typography>
        <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
      </Stack>

      {/* Branch lanes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1.25,
        }}
      >
        {orderedBranches.map((b) => {
          const hex = branchHex(b);
          return (
            <Box
              key={b.id}
              sx={{
                p: 1.25,
                borderRadius: 2,
                borderLeft: `4px solid ${hex}`,
                border: "1px solid",
                borderLeftWidth: 4,
                borderColor: alpha(hex, 0.32),
                borderLeftColor: hex,
                bgcolor: alpha(hex, 0.05),
                display: "flex",
                flexDirection: "column",
                gap: 0.75,
              }}
            >
              <BranchHeader branch={b} />
              {b.description && (
                <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                  “{b.description}”
                </Typography>
              )}
              {b.nodes.length > 0 && (
                <Stack spacing={0.75} sx={{ mt: 0.25 }}>
                  {b.nodes.map((n, i) => (
                    <Stack key={n.id} sx={{ flexDirection: "row", gap: 0.75, alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          flexShrink: 0,
                          mt: "1px",
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 10,
                          fontWeight: 900,
                          color: hex,
                          bgcolor: alpha(hex, 0.16),
                        }}
                      >
                        {i + 1}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {n.title}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Box>
          );
        })}
      </Box>
    </Panel>
  );
}
