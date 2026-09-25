"use client";

/**
 * Roadmap perspective — Variable Map (lens).
 *
 * A non-time node graph: the trunk core on the left fans out to the branch
 * variables on the right, connected by measured SVG edges. Nodes recolor by a
 * chosen lens (desirability | status). Demonstrates modular, independent points
 * related to one another and viewable through multiple lenses.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";

import { ROADMAP_PLAN, type CheckpointStatus } from "../../../store/strategy-data";
import { TimelineGlyph } from "../../planning-glyphs";
import { Panel } from "../shared";
import { branchHex, nodeColor } from "./roadmap-shared";

type Lens = "desirability" | "status";

interface Edge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}

export function RoadmapVariableMap() {
  const theme = useTheme();
  const { trunk, branches } = ROADMAP_PLAN;
  const orderedBranches = React.useMemo(
    () => [...branches].sort((a, b) => a.rank - b.rank),
    [branches],
  );
  const [lens, setLens] = React.useState<Lens>("desirability");

  const containerRef = React.useRef<HTMLDivElement>(null);
  const forkRef = React.useRef<HTMLDivElement>(null);
  const branchRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const [edges, setEdges] = React.useState<Edge[]>([]);

  const measure = React.useCallback(() => {
    const container = containerRef.current;
    const fork = forkRef.current;
    if (!container || !fork) return;
    const c = container.getBoundingClientRect();
    const f = fork.getBoundingClientRect();
    const next: Edge[] = [];
    for (const b of orderedBranches) {
      const el = branchRefs.current[b.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next.push({
        x1: f.right - c.left,
        y1: f.top - c.top + f.height / 2,
        x2: r.left - c.left,
        y2: r.top - c.top + r.height / 2,
        color: branchHex(b),
      });
    }
    setEdges(next);
  }, [orderedBranches]);

  React.useLayoutEffect(() => {
    measure();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const trunkNodeColor = (status?: CheckpointStatus) =>
    lens === "status" ? nodeColor(theme, status) : theme.palette.primary.main;

  return (
    <Panel
      title="Roadmap · Variable Map"
      fill
      glyph={
        <Box sx={{ color: "primary.main", display: "flex" }}>
          <TimelineGlyph size={18} />
        </Box>
      }
      action={
        <Stack sx={{ flexDirection: "row", gap: 0.5 }}>
          {(["desirability", "status"] as Lens[]).map((l) => {
            const active = l === lens;
            return (
              <Box
                key={l}
                role="button"
                tabIndex={0}
                onClick={() => setLens(l)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLens(l);
                  }
                }}
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  color: active ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.55),
                  bgcolor: active ? alpha(theme.palette.primary.main, 0.14) : "transparent",
                  border: "1px solid",
                  borderColor: active ? alpha(theme.palette.primary.main, 0.32) : "transparent",
                }}
              >
                {l}
              </Box>
            );
          })}
        </Stack>
      }
    >
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        Lens:&nbsp;
        <strong>{lens === "desirability" ? "branch desirability" : "trunk status"}</strong>
        &nbsp;— independent points, related and re-colorable.
      </Typography>

      <Box ref={containerRef} sx={{ position: "relative", mt: 1.5 }}>
        {/* Edge overlay */}
        <Box
          component="svg"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        >
          {edges.map((e, i) => {
            const midX = (e.x1 + e.x2) / 2;
            return (
              <path
                key={i}
                d={`M ${e.x1} ${e.y1} C ${midX} ${e.y1}, ${midX} ${e.y2}, ${e.x2} ${e.y2}`}
                fill="none"
                stroke={alpha(e.color, lens === "desirability" ? 0.6 : 0.25)}
                strokeWidth={2}
              />
            );
          })}
        </Box>

        <Stack sx={{ flexDirection: "row", gap: { xs: 2, sm: 4 }, position: "relative", zIndex: 1 }}>
          {/* Trunk core column */}
          <Stack spacing={1.25} sx={{ flex: "0 0 auto", width: { xs: 150, sm: 200 } }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Core
            </Typography>
            {trunk.map((n, i) => {
              const color = trunkNodeColor(n.status);
              const isFork = i === trunk.length - 1;
              return (
                <Box
                  key={n.id}
                  ref={isFork ? forkRef : undefined}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    border: `1px solid ${alpha(color, 0.4)}`,
                    bgcolor: alpha(color, 0.08),
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                    {n.title}
                  </Typography>
                  {lens === "status" && n.status && (
                    <Typography variant="caption" sx={{ color, fontWeight: 700, textTransform: "capitalize" }}>
                      {n.status}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Stack>

          {/* Branch variables column */}
          <Stack spacing={1.25} sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Variables
            </Typography>
            {orderedBranches.map((b) => {
              const hex = branchHex(b);
              const dim = lens === "status";
              const tint = dim ? alpha(theme.palette.text.primary, 0.3) : hex;
              return (
                <Box
                  key={b.id}
                  ref={(el: HTMLDivElement | null) => {
                    branchRefs.current[b.id] = el;
                  }}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    border: `1px solid ${alpha(tint, 0.4)}`,
                    bgcolor: alpha(tint, 0.07),
                  }}
                >
                  <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
                    <Typography component="span" sx={{ fontSize: 14 }}>
                      {b.emoji}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: tint }}>
                      {b.id} · {b.name}
                    </Typography>
                  </Stack>
                  {b.description && (
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.25 }}>
                      {b.description}
                    </Typography>
                  )}
                  {b.nodes.length > 0 && (
                    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                      {b.nodes.map((n) => (
                        <Box
                          key={n.id}
                          sx={{
                            px: 0.75,
                            py: 0.25,
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600,
                            bgcolor: alpha(tint, 0.12),
                            color: "text.primary",
                          }}
                        >
                          {n.title}
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </Panel>
  );
}
