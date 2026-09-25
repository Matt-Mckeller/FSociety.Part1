"use client";

/**
 * Character — Skills / Mastery Tree.
 *
 * Visualizes the skill DAG as a tiered grid: roots at top, legend at bottom.
 * Connecting lines drawn between prerequisite → unlocked skills. Nodes are
 * color-coded by status (locked/available/unlocked). Clicking a node shows
 * requirements and effects.
 */

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { SKILL_TREE, SKILL_TIERS, SKILL_MAP, parentsOf, type SkillNode } from "../model/skills";
import { useEffectiveAttributes, useProfileStore } from "../store/CharacterProfileStore";
import { effectiveValue } from "../model/attributes";
import { SkillGlyph } from "./SkillGlyphs";

/* ──────────────────────────────────────────────────── helpers */

function resolveStatus(
  node: SkillNode,
  effectiveAttrs: Record<string, { base: number; bonus: number }>,
  unlocked: Record<string, boolean>,
): SkillNode["status"] {
  if (node.status === "unlocked" || unlocked[node.id]) return "unlocked";
  const allMet = node.requires.every((req) => {
    if (req.type === "attribute") {
      const p = effectiveAttrs[req.id] ?? { base: 0, bonus: 0 };
      return Math.min(100, p.base + p.bonus) >= req.threshold;
    }
    return false;
  });
  return allMet ? "available" : "locked";
}

const STATUS_COLORS = {
  unlocked:  "#16a34a",
  available: "#d97706",
  locked:    "#64748b",
};

/* ──────────────────────────────────────────────────── node detail dialog */

function SkillDetail({ node, onClose }: { node: SkillNode; onClose: () => void }) {
  const effective = useEffectiveAttributes();
  const { state, dispatch } = useProfileStore();
  const status = resolveStatus(node, effective, state.skillsUnlocked);
  const c = STATUS_COLORS[status];

  return (
    <Dialog open onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pb: 0 }}>
        <Box sx={{ color: c, display: "flex", flexShrink: 0 }}>
          <SkillGlyph id={node.id} size={28} title={node.label} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{node.label}</Typography>
          <Typography variant="caption" sx={{ color: c, fontWeight: 700, textTransform: "capitalize" }}>
            {status}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}><CloseRoundedIcon fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1.25} sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
            {node.description}
          </Typography>

          <Box
            sx={{
              px: 1.25,
              py: 1,
              borderRadius: 1.5,
              bgcolor: alpha(c, 0.07),
              border: "1px solid",
              borderColor: alpha(c, 0.2),
            }}
          >
            <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block", mb: 0.25 }}>
              EFFECT
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary" }}>
              {node.effect}
            </Typography>
          </Box>

          {node.requires.length > 0 && (
            <>
              <Divider />
              <Box>
                <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block", mb: 0.75 }}>
                  REQUIREMENTS
                </Typography>
                <Stack spacing={0.5}>
                  {node.requires.map((req) => {
                    const p = effective[req.id] ?? { base: 0, bonus: 0 };
                    const current = Math.min(100, p.base + p.bonus);
                    const met = current >= req.threshold;
                    return (
                      <Stack key={req.id} direction="row" sx={{ alignItems: "center", gap: 1 }}>
                        {met ? (
                          <CheckCircleRoundedIcon sx={{ fontSize: 14, color: "#16a34a" }} />
                        ) : (
                          <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 14, color: "#64748b" }} />
                        )}
                        <Typography variant="caption" sx={{ fontWeight: 700, color: met ? "#16a34a" : "text.secondary", flex: 1 }}>
                          {req.label}
                        </Typography>
                        {!met && (
                          <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.6rem" }}>
                            {current}/{req.threshold}
                          </Typography>
                        )}
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </>
          )}

          {node.unlocks.length > 0 && (
            <>
              <Divider />
              <Box>
                <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, display: "block", mb: 0.75 }}>
                  UNLOCKS
                </Typography>
                <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
                  {node.unlocks.map((id) => {
                    const n = SKILL_MAP[id];
                    if (!n) return null;
                    return (
                      <Box
                        key={id}
                        sx={{
                          px: 0.75,
                          py: 0.3,
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: alpha(n.color, 0.3),
                          bgcolor: alpha(n.color, 0.06),
                        }}
                      >
                        <Stack direction="row" sx={{ alignItems: "center", gap: 0.4 }}>
                          <Box sx={{ color: n.color, display: "flex", flexShrink: 0 }}>
                            <SkillGlyph id={n.id} size={12} />
                          </Box>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: n.color, fontSize: "0.65rem" }}>
                            {n.label}
                          </Typography>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            </>
          )}

          {status === "available" && (
            <Button
              variant="contained"
              fullWidth
              size="small"
              startIcon={<AutoAwesomeRoundedIcon />}
              onClick={() => {
                dispatch({ type: "unlock-skill", skillId: node.id, label: node.label, color: node.color });
                onClose();
              }}
              sx={{
                mt: 0.5,
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 2,
                bgcolor: c,
                "&:hover": { bgcolor: alpha(c, 0.85) },
              }}
            >
              Unlock {node.label}
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────────────────────────────────────────── skill node */

function SkillCard({ node, onClick }: { node: SkillNode; onClick: () => void }) {
  const effective = useEffectiveAttributes();
  const { state } = useProfileStore();
  const status = resolveStatus(node, effective, state.skillsUnlocked);
  const c = STATUS_COLORS[status];

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 1,
        borderRadius: 2,
        border: "1.5px solid",
        borderColor: status === "unlocked" ? alpha(c, 0.5) : status === "available" ? alpha(c, 0.4) : alpha(c, 0.15),
        bgcolor: status === "unlocked"
          ? alpha(c, 0.07)
          : status === "available"
            ? alpha(c, 0.04)
            : alpha(c, 0.02),
        cursor: "pointer",
        opacity: status === "locked" ? 0.6 : 1,
        transition: "all .15s",
        "&:hover": { borderColor: alpha(c, 0.6), transform: "translateY(-1px)" },
        position: "relative",
        overflow: "hidden",
        minHeight: 72,
        display: "flex",
        flexDirection: "column",
        gap: 0.3,
      }}
    >
      {/* Status indicator */}
      <Box sx={{ position: "absolute", top: 6, right: 6 }}>
        {status === "unlocked" ? (
          <CheckCircleRoundedIcon sx={{ fontSize: 12, color: c }} />
        ) : status === "locked" ? (
          <LockRoundedIcon sx={{ fontSize: 10, color: "#64748b" }} />
        ) : null}
      </Box>

      {/*
        The glyph takes the node's status colour, so a locked skill reads as
        grey without a second styling path — the thing emoji could never do.
      */}
      <Box sx={{ color: c, display: "flex", opacity: status === "locked" ? 0.7 : 1 }}>
        <SkillGlyph id={node.id} size={19} title={node.label} />
      </Box>
      <Typography variant="caption" sx={{ fontWeight: 800, color: c, lineHeight: 1.2, pr: 1.5 }}>
        {node.label}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.58rem", lineHeight: 1.3, display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>
        {node.description}
      </Typography>
    </Box>
  );
}

/* ──────────────────────────────────────────────────── tree layout */

const TIER_LABELS: Record<number, string> = {
  0: "Foundation",
  1: "Developing",
  2: "Mastery",
  3: "Legend",
};

export function SkillsTree() {
  const { state } = useProfileStore();
  const [detail, setDetail] = React.useState<string | null>(null);
  const detailNode = detail ? SKILL_MAP[detail] : null;

  const isUnlocked = (n: SkillNode) => n.status === "unlocked" || !!state.skillsUnlocked[n.id];

  const tiers = SKILL_TIERS;
  const byTier = SKILL_TREE.reduce<Record<number, SkillNode[]>>((acc, n) => {
    (acc[n.tier] ??= []).push(n);
    return acc;
  }, {});

  return (
    <>
      <Stack spacing={2}>
        {tiers.map((tier) => {
          const nodes = byTier[tier] ?? [];
          return (
            <Box key={tier}>
              <Stack direction="row" sx={{ alignItems: "center", gap: 1, mb: 0.75 }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "text.disabled", letterSpacing: 0.5, fontSize: "0.65rem" }}
                >
                  TIER {tier} — {TIER_LABELS[tier]?.toUpperCase()}
                </Typography>
                <Box sx={{ flex: 1, height: 1, bgcolor: "divider" }} />
                <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.6rem" }}>
                  {nodes.filter(isUnlocked).length}/{nodes.length}
                </Typography>
              </Stack>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 0.75 }}>
                {nodes.map((node) => (
                  <SkillCard key={node.id} node={node} onClick={() => setDetail(node.id)} />
                ))}
              </Box>
            </Box>
          );
        })}
      </Stack>

      {detailNode && (
        <SkillDetail node={detailNode} onClose={() => setDetail(null)} />
      )}
    </>
  );
}
