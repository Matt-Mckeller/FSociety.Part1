"use client";

/**
 * SceneMap — a lightweight, self-contained spatial navigation panel.
 *
 * Each scene is a node on a grid (row = sequence, column = scene index),
 * coloured by status. Click a node to select it; the directional chevrons
 * step through scenes in reading order. Stays in two-way sync with the
 * CreateProvider selection.
 *
 * Intentionally self-contained (MUI + brand primitives only) — it does NOT
 * pull the heavy `@expanse/hud`/`@expanse/map` graph, so the Create screen
 * renders reliably and stays compact (plan AI feedback: defer heavy panel
 * systems).
 */

import * as React from "react";
import { Box, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { useCreate } from "../store/CreateProvider";
import { STATUS_COLOR } from "./visuals";
import { STATUS_LABEL, type SeedStatus } from "../model/types";
import { BrandIcon } from "./BrandIcon";
import type { GlyphName } from "./brand-glyphs";

const BRAND_FONT = "Xpens, Roboto, sans-serif";

interface SceneNode {
  id: string;
  title: string;
  status: SeedStatus;
  glyph: GlyphName;
  x: number;
  y: number;
}

/** A single directional chevron button. */
function Chevron({
  dir,
  onClick,
  disabled,
}: {
  dir: "up" | "down" | "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  const rotate = { up: 0, right: 90, down: 180, left: 270 }[dir];
  return (
    <IconButton
      size="small"
      disabled={disabled}
      onClick={onClick}
      aria-label={`Navigate ${dir}`}
      sx={{
        width: 22,
        height: 22,
        color: "#2c4f76",
        bgcolor: "#eef2f8",
        border: "1px solid #dfe7f1",
        borderRadius: 1.5,
        "&:hover": { bgcolor: "#e0e8f3" },
        "&.Mui-disabled": { opacity: 0.35 },
      }}
    >
      <Box sx={{ display: "inline-flex", transform: `rotate(${rotate}deg)` }}>
        <BrandIcon name="promote" size={13} />
      </Box>
    </IconButton>
  );
}

export interface SceneMapProps {
  /** Panel height in px. @default 200 */
  height?: number;
}

export function SceneMap({ height = 200 }: SceneMapProps) {
  const { state, selectedScene, dispatch } = useCreate();

  const { nodes, width } = React.useMemo(() => {
    const out: SceneNode[] = [];
    let w = 1;
    state.sequences.forEach((seq, y) => {
      w = Math.max(w, seq.sceneIds.length);
      seq.sceneIds.forEach((sceneId, x) => {
        const scene = state.scenes.find((s) => s.id === sceneId);
        if (!scene) return;
        out.push({
          id: scene.id,
          title: scene.title,
          status: scene.status,
          glyph: scene.glyph ?? "scene",
          x,
          y,
        });
      });
    });
    return { nodes: out, width: w };
  }, [state.sequences, state.scenes]);

  const current = selectedScene
    ? nodes.find((n) => n.id === selectedScene.id)
    : undefined;

  const select = React.useCallback(
    (node: SceneNode) => {
      const owner = state.sequences.find((s) => s.sceneIds.includes(node.id));
      if (owner && owner.id !== state.selectedSequenceId) {
        dispatch({ kind: "select-sequence", id: owner.id });
      }
      dispatch({ kind: "select-scene", id: node.id });
    },
    [state.sequences, state.selectedSequenceId, dispatch],
  );

  const step = React.useCallback(
    (dx: number, dy: number) => {
      if (!current) {
        if (nodes[0]) select(nodes[0]);
        return;
      }
      const target = nodes.find(
        (n) => n.x === current.x + dx && n.y === current.y + dy,
      );
      if (target) select(target);
    },
    [current, nodes, select],
  );

  const canMove = (dx: number, dy: number) =>
    Boolean(
      current &&
        nodes.some((n) => n.x === current.x + dx && n.y === current.y + dy),
    );

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #eef1f5",
        borderRadius: 2,
        bgcolor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <Stack
        spacing={0.75}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          px: 1.25,
          py: 0.75,
          borderBottom: "1px solid #f0f2f5",
        }}
      >
        <Box sx={{ color: "#2c4f76", display: "inline-flex" }}>
          <BrandIcon name="vision" size={15} />
        </Box>
        <Typography
          variant="overline"
          sx={{
            fontFamily: BRAND_FONT,
            letterSpacing: 1,
            lineHeight: 1.2,
            color: "text.secondary",
            flex: 1,
          }}
        >
          Scene Map
        </Typography>
        {/* Directional chevrons */}
        <Stack spacing={0.25} sx={{ flexDirection: "row", alignItems: "center" }}>
          <Chevron dir="left" disabled={!canMove(-1, 0)} onClick={() => step(-1, 0)} />
          <Stack spacing={0.25}>
            <Chevron dir="up" disabled={!canMove(0, -1)} onClick={() => step(0, -1)} />
            <Chevron dir="down" disabled={!canMove(0, 1)} onClick={() => step(0, 1)} />
          </Stack>
          <Chevron dir="right" disabled={!canMove(1, 0)} onClick={() => step(1, 0)} />
        </Stack>
      </Stack>

      <Box
        sx={{
          position: "relative",
          height,
          p: 1.25,
          display: "grid",
          gridTemplateColumns: `repeat(${width}, 1fr)`,
          gridAutoRows: "minmax(0, 1fr)",
          gap: 1,
          bgcolor: "#fafbfc",
        }}
      >
        {nodes.map((node) => {
          const color = STATUS_COLOR[node.status];
          const active = node.id === current?.id;
          return (
            <Tooltip
              key={node.id}
              title={`${node.title} · ${STATUS_LABEL[node.status]}`}
              arrow
            >
              <Box
                role="button"
                tabIndex={0}
                aria-label={`${node.title}, ${STATUS_LABEL[node.status]}`}
                aria-pressed={active}
                onClick={() => select(node)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(node);
                  }
                }}
                sx={{
                  gridColumn: node.x + 1,
                  gridRow: node.y + 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  minHeight: 0,
                  cursor: "pointer",
                  borderRadius: 2,
                  border: "2px solid",
                  borderColor: active ? color : alpha(color, 0.35),
                  bgcolor: active ? alpha(color, 0.14) : alpha(color, 0.05),
                  color,
                  transition: "all 150ms ease",
                  outline: "none",
                  "&:hover": { borderColor: color, bgcolor: alpha(color, 0.1) },
                  "&:focus-visible": { boxShadow: `0 0 0 3px ${alpha(color, 0.3)}` },
                }}
              >
                <BrandIcon name={node.glyph} size={20} />
                <Typography
                  sx={{
                    fontSize: 9,
                    fontWeight: 700,
                    color,
                    px: 0.5,
                    textAlign: "center",
                    lineHeight: 1.1,
                  }}
                >
                  {node.x + 1}
                </Typography>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Paper>
  );
}
