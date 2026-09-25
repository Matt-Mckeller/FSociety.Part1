"use client";

/**
 * Roadmap perspective — Spine (single line).
 *
 * The committed trunk as a vertical milestone timeline, ending in a Fork node
 * that lists the four destiny branches as compact tinted chips. "The plan as
 * committed."
 */

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha, useTheme } from "@mui/material";

import { ROADMAP_PLAN } from "../../../store/strategy-data";
import { TimelineGlyph } from "../../planning-glyphs";
import { Panel } from "../shared";
import { branchHex, nodeColor, TbdReveal } from "./roadmap-shared";

export function RoadmapSpine() {
  const theme = useTheme();
  const { trunkName, trunk, branches } = ROADMAP_PLAN;
  const forkColor = alpha(theme.palette.text.primary, 0.55);
  const orderedBranches = [...branches].sort((a, b) => a.rank - b.rank);

  return (
    <Panel
      title="Roadmap · Spine"
      fill
      glyph={
        <Box sx={{ color: "primary.main", display: "flex" }}>
          <TimelineGlyph size={18} />
        </Box>
      }
      action={
        <Chip
          size="small"
          label={trunkName}
          sx={{ height: 20, fontWeight: 700, bgcolor: alpha(theme.palette.primary.main, 0.14), color: "primary.main" }}
        />
      }
    >
      <Box sx={{ position: "relative", pl: 1 }}>
        {/* Spine */}
        <Box
          sx={{
            position: "absolute",
            left: 15,
            top: 6,
            bottom: 6,
            width: 2,
            bgcolor: "divider",
            borderRadius: 1,
          }}
        />
        <Stack spacing={1.5}>
          {trunk.map((cp) => {
            const color = nodeColor(theme, cp.status);
            return (
              <Stack
                key={cp.id}
                sx={{ flexDirection: "row", gap: 1.5, position: "relative" }}
              >
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    mt: 0.4,
                    flexShrink: 0,
                    borderRadius: "50%",
                    bgcolor: color,
                    border: `2px solid ${theme.palette.background.paper}`,
                    boxShadow:
                      cp.status === "active" ? `0 0 0 4px ${alpha(color, 0.25)}` : "none",
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    p: 1.25,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: alpha(color, 0.28),
                    bgcolor: alpha(color, 0.05),
                  }}
                >
                  <Stack
                    sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, mb: 0.25 }}
                  >
                    {cp.status === "active" && (
                      <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                        ● In progress
                      </Typography>
                    )}
                    {cp.status === "reached" && (
                      <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
                        ✓ Reached
                      </Typography>
                    )}
                  </Stack>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {cp.title}
                  </Typography>
                  {cp.description && (
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {cp.description}
                    </Typography>
                  )}
                  {/*
                    The blank milestone is not blank. Hovering it surfaces a
                    satellite and one line — quiet enough that you have to be
                    looking at it to find it.
                  */}
                  {cp.title === "TBD" && <TbdReveal color={color} />}
                </Box>
              </Stack>
            );
          })}

          {/* Fork node */}
          <Stack sx={{ flexDirection: "row", gap: 1.5, position: "relative" }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                mt: 0.4,
                flexShrink: 0,
                borderRadius: "3px",
                transform: "rotate(45deg)",
                bgcolor: forkColor,
                border: `2px solid ${theme.palette.background.paper}`,
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                p: 1.25,
                borderRadius: 2,
                border: "1px dashed",
                borderColor: alpha(theme.palette.text.primary, 0.25),
                bgcolor: alpha(theme.palette.text.primary, 0.03),
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.75 }}>
                Fork — which path?
              </Typography>
              <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
                {orderedBranches.map((b) => {
                  const hex = branchHex(b);
                  return (
                    <Chip
                      key={b.id}
                      size="small"
                      label={`${b.emoji} ${b.id} · ${b.name}`}
                      sx={{
                        height: 24,
                        fontWeight: 700,
                        bgcolor: alpha(hex, 0.14),
                        color: hex,
                        border: `1px solid ${alpha(hex, 0.3)}`,
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Panel>
  );
}
