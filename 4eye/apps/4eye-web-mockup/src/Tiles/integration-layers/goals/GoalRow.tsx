"use client";

/**
 * GoalRow — shared shell for a single goal: a coded label, its Target (always
 * visible), the bespoke animated art, and the full meaning revealed on click.
 */

import * as React from "react";
import { Box, Button, Collapse, Tooltip, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import type { VisionGoal } from "./goalsData";
import { TargetLine } from "./TargetLine";
import { MoneyMark } from "./MoneyMark";
import { SpinningGlobe } from "./SpinningGlobe";
import { useLayerSurface } from "../components/surfaceTokens";

/**
 * A small reticle-styled cursor (echoes `TargetIcon`'s ring) that swaps its
 * center glyph for a chevron matching the row's open/closed state, so the
 * cursor itself previews what a click will do.
 */
function expandCursor(accent: string, open: boolean) {
  const chevron = open ? "M7 15l5-5 5 5" : "M7 9l5 5 5-5";
  // width/height match viewBox 1:1 (no implicit scale) — keeps the hotspot exact
  // and stays inside the size browsers reliably rasterize custom cursors at.
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
    <circle cx='12' cy='12' r='9.5' fill='rgba(9,11,26,0.88)' stroke='${accent}' stroke-width='1.4' />
    <path d='${chevron}' fill='none' stroke='${accent}' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' />
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 12 12, pointer`;
}

/** A small bullseye — a cursor/reticle outer ring around a fixed center shape (per-goal identity), "Target" shown on hover. */
function TargetIcon({ accent, shape }: { accent: string; shape: VisionGoal["targetShape"] }) {
  const surface = useLayerSurface();
  const ink = surface.ink(accent);
  const centerMark =
    shape === "circle" ? (
      <circle cx={12} cy={12} r={4.2} fill={ink} />
    ) : shape === "square" ? (
      <rect x={8.3} y={8.3} width={7.4} height={7.4} rx={1} fill={ink} />
    ) : (
      <polygon points="12,7.2 16.8,16.4 7.2,16.4" fill={ink} />
    );

  return (
    <Tooltip title="Target" arrow placement="top">
      <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, flexShrink: 0, cursor: "default" }}>
        <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden focusable="false">
          {/* cursor/reticle ring — dashed circle + 4 cardinal tick marks, like a focus reticle */}
          <circle cx={12} cy={12} r={10} fill="none" stroke={ink} strokeWidth={1.3} strokeDasharray="3 2.4" strokeLinecap="round" opacity={0.85} />
          <line x1={12} y1={0.5} x2={12} y2={2.8} stroke={ink} strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
          <line x1={12} y1={21.2} x2={12} y2={23.5} stroke={ink} strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
          <line x1={0.5} y1={12} x2={2.8} y2={12} stroke={ink} strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
          <line x1={21.2} y1={12} x2={23.5} y2={12} stroke={ink} strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
          {centerMark}
        </svg>
      </Box>
    </Tooltip>
  );
}

/** Wraps header art in a tooltip that reveals the goal's coded form underneath, on hover. */
function CodeTooltip({ code, children }: { code: string; children: React.ReactElement }) {
  return (
    <Tooltip title={code} arrow placement="bottom">
      {children}
    </Tooltip>
  );
}

/** Goal 1's header — three globes joined by a quiet plus. */
function SaveHeaderArt() {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.55 }}>
      {(["🌍", "🌏", "🌎"] as const).map((emoji, i) => (
        <React.Fragment key={emoji}>
          {i > 0 && (
            <Typography
              component="span"
              aria-hidden
              sx={{
                fontSize: "0.85rem",
                fontWeight: 800,
                color: alpha("#6fd3ff", 0.75),
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              +
            </Typography>
          )}
          <Tooltip title={emoji} arrow placement="bottom">
            <Box sx={{ display: "inline-flex", cursor: "default" }}>
              <SpinningGlobe size={24} spin={7 + i} />
            </Box>
          </Tooltip>
        </React.Fragment>
      ))}
    </Box>
  );
}

/** Goal 2's header — a universal-money glyph row, images only. */
function ValueHeaderArt({ code, accent }: { code: string; accent: string }) {
  const surface = useLayerSurface();
  return (
    <CodeTooltip code={code}>
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, cursor: "default" }}>
        <Typography component="span" sx={{ fontSize: "1rem", fontWeight: 800, color: surface.ink("#3ddc84"), lineHeight: 1 }}>
          $
        </Typography>
        <Typography component="span" sx={{ fontSize: "1rem", fontWeight: 800, lineHeight: 1 }}>
          ¥
        </Typography>
        <Typography component="span" sx={{ fontSize: "1rem", lineHeight: 1 }}>
          💰
        </Typography>
        <MoneyMark size={18} color={accent} />
      </Box>
    </CodeTooltip>
  );
}

/** Goal 3's header — the crown glyph only, image only. */
function KingHeaderArt({ code }: { code: string }) {
  return (
    <CodeTooltip code={code}>
      <Typography component="span" sx={{ fontSize: "1.3rem", lineHeight: 1, cursor: "default" }}>
        👑
      </Typography>
    </CodeTooltip>
  );
}

export function GoalRow({
  goal,
  index,
  children,
  expandedContent,
  mirrored = false,
}: {
  goal: VisionGoal;
  index: number;
  /**
   * Flips the accent edge to the right. Used by the `alternating` goals layout
   * so consecutive rows don't read as a single left-aligned column.
   */
  mirrored?: boolean;
  /** Always-visible art. */
  children: React.ReactNode;
  /** Extra content revealed alongside the meaning on click (e.g. a pop-up icon grid). */
  expandedContent?: (open: boolean) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const purchaseKey = goal.purchaseDetails ? `4eye:goal-details-purchased:${goal.id}` : null;
  const [purchased, setPurchased] = React.useState(!goal.purchaseDetails);

  React.useEffect(() => {
    if (!purchaseKey) return;
    try {
      if (window.localStorage.getItem(purchaseKey) === "1") setPurchased(true);
    } catch {
      /* ignore */
    }
  }, [purchaseKey]);

  const { accent, accent2 } = goal;
  const surface = useLayerSurface();

  const toggleOpen = () => setOpen((v) => !v);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();
    }
  };

  const buyDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPurchased(true);
    if (purchaseKey) {
      try {
        window.localStorage.setItem(purchaseKey, "1");
      } catch {
        /* ignore */
      }
    }
  };

  const showDetails = purchased || !goal.purchaseDetails;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 + index * 0.1 }}
      onClick={toggleOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={`Goal ${index + 1}${goal.tagline ? `, ${goal.tagline}` : ""} — ${open ? "collapse" : "expand"} details`}
      sx={{
        position: "relative",
        borderRadius: 2.5,
        p: { zero: 2, tablet: 2.5 },
        overflow: "hidden",
        outline: "none",
        cursor: expandCursor(accent, open),
        border: `1px solid ${alpha(accent, 0.3)}`,
        ...(mirrored
          ? { borderRight: `3px solid ${accent}`, textAlign: "right" as const }
          : { borderLeft: `3px solid ${accent}` }),
        background: mirrored
          ? `linear-gradient(225deg, ${alpha(accent, 0.13)} 0%, ${surface.cardBg} 55%)`
          : `linear-gradient(135deg, ${alpha(accent, 0.13)} 0%, ${surface.cardBg} 55%)`,
        boxShadow: `inset 0 0 40px ${alpha(accent, 0.05)}`,
        transition: "border-color 200ms ease, box-shadow 200ms ease",
        "&:hover, &:focus-visible": {
          borderColor: alpha(accent, 0.6),
          boxShadow: `0 0 26px ${alpha(accent, 0.22)}, inset 0 0 40px ${alpha(accent, 0.08)}`,
        },
      }}
    >
      {goal.mark && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            right: mirrored ? "auto" : -4,
            left: mirrored ? -4 : "auto",
            bottom: -18,
            fontSize: goal.mark === "+" ? "7.5rem" : "5.5rem",
            fontWeight: 800,
            lineHeight: 1,
            color: alpha(accent, 0.09),
            pointerEvents: "none",
            userSelect: "none",
            fontFamily: goal.mark === "+" || goal.mark === "♥" ? "Georgia, 'Times New Roman', serif" : "inherit",
          }}
        >
          {goal.mark}
        </Box>
      )}

      {/* header: clear "GOAL N" label (primary) + coded form (secondary) + expand indicator */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, flexWrap: "wrap", ...(mirrored && { flexDirection: "row-reverse" as const }) }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.6,
            px: 1.1,
            py: 0.4,
            borderRadius: 999,
            flexShrink: 0,
            background: `linear-gradient(135deg, ${accent}, ${accent2})`,
            boxShadow: `0 0 14px ${alpha(accent, 0.55)}`,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.78rem",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#0a0c1a",
              whiteSpace: "nowrap",
            }}
          >
            Goal {index + 1}
          </Typography>
        </Box>
        {goal.badge && (
          <Tooltip title={goal.badge.hint ?? goal.badge.label} arrow placement="top">
            <Box
              component="span"
              onClick={(e) => e.stopPropagation()}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.45,
                px: 1,
                py: 0.35,
                borderRadius: 999,
                border: `1px solid ${alpha("#f59e0b", 0.55)}`,
                bgcolor: alpha("#f59e0b", 0.12),
                color: "#b45309",
                fontSize: "0.65rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <LockOpenRoundedIcon sx={{ fontSize: 13, opacity: 0.85 }} />
              {goal.badge.label}
            </Box>
          </Tooltip>
        )}
        {goal.points != null && (
          <Box
            component="span"
            onClick={(e) => e.stopPropagation()}
            title="Estimate"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 1,
              py: 0.35,
              borderRadius: 999,
              border: `1px solid ${alpha(accent, 0.45)}`,
              bgcolor: alpha(accent, 0.12),
              color: surface.ink(accent),
              fontSize: "0.65rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {goal.points}p
          </Box>
        )}
        {(goal.tags ?? []).map((tag) => (
          <Box
            key={tag}
            component="span"
            onClick={(e) => e.stopPropagation()}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 1,
              py: 0.35,
              borderRadius: 999,
              border: `1px solid ${alpha(accent, 0.28)}`,
              bgcolor: alpha(accent, 0.08),
              color: surface.ink(accent),
              fontSize: "0.62rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {tag}
          </Box>
        ))}
        {goal.id === "save" && <SaveHeaderArt />}
        {goal.id === "value" && <ValueHeaderArt code={goal.code} accent={accent} />}
        {goal.id === "king" && <KingHeaderArt code={goal.code} />}

        <Tooltip title={open ? "Click to collapse" : "Click to expand"} arrow placement="top">
          <Box
            aria-hidden
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              ml: "auto",
              flexShrink: 0,
              borderRadius: "50%",
              border: `1px solid ${alpha(accent, 0.4)}`,
              background: alpha(accent, 0.1),
              color: surface.ink(accent),
              transition: "background 200ms ease",
            }}
          >
            {open ? (
              <KeyboardArrowUpRoundedIcon sx={{ fontSize: 18 }} />
            ) : (
              <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
            )}
          </Box>
        </Tooltip>
      </Box>

      {/* art — centered */}
      <Box sx={{ mb: 1.5, display: "flex", justifyContent: "center" }}>{children}</Box>

      {/* target — always visible */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75, textAlign: "center", flexWrap: "wrap" }}>
        <TargetIcon accent={accent} shape={goal.targetShape} />
        <TargetLine segments={goal.target} accent={accent} active={open} />
      </Box>

      {/* expanded content (e.g. pop-up icon grid) + meaning — on click */}
      <Collapse in={open} timeout={260}>
        <Box sx={{ mt: 1.25, pt: 1.25, borderTop: `1px solid ${alpha(accent, 0.18)}` }}>
          {expandedContent && <Box sx={{ mb: 1.5 }}>{expandedContent(open)}</Box>}

          {goal.purchaseDetails && !showDetails && (
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                py: 1.5,
                px: 1,
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "0.78rem", color: surface.text.md, lineHeight: 1.5, maxWidth: "42ch" }}>
                {goal.purchaseDetails.note}
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={buyDetails}
                startIcon={<LockOpenRoundedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  textTransform: "none",
                  fontWeight: 800,
                  px: 2,
                  bgcolor: accent,
                  color: "#0a0c1a",
                  boxShadow: `0 0 18px ${alpha(accent, 0.45)}`,
                  "&:hover": { bgcolor: accent2 },
                }}
              >
                {goal.purchaseDetails.cta}
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    fontFamily: "monospace",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    opacity: 0.85,
                  }}
                >
                  {goal.purchaseDetails.priceLabel}
                </Box>
              </Button>
            </Box>
          )}

          {showDetails && (
            <>
              {goal.purchaseDetails && (
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: alpha(accent, 0.75),
                    textAlign: "center",
                  }}
                >
                  Details unlocked · was never locked
                </Typography>
              )}
              {goal.detailCodes && goal.detailCodes.length > 0 && (
                <Box
                  sx={{
                    mb: goal.tagline || goal.meaning ? 1.25 : 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))",
                    gap: 0.6,
                  }}
                >
                  {goal.detailCodes.map((line) => (
                    <Typography
                      key={line}
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: surface.ink(accent),
                        letterSpacing: "0.01em",
                        textAlign: "center",
                      }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Box>
              )}
              {goal.tagline ? (
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: surface.ink(accent),
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    mb: goal.meaning ? 1 : 0,
                  }}
                >
                  {goal.tagline}
                </Typography>
              ) : null}
              {goal.meaning && (
                <Box sx={{ display: "flex", gap: 0.75 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 15, color: alpha(accent, 0.8), flexShrink: 0, mt: 0.2 }} />
                  {typeof goal.meaning === "string" ? (
                    <Typography sx={{ fontSize: "0.82rem", color: surface.text.md, lineHeight: 1.6 }}>
                      {goal.meaning}
                    </Typography>
                  ) : (
                    <TargetLine
                      segments={goal.meaning}
                      accent={accent}
                      active={open}
                      fontSize="0.82rem"
                      fontWeight={400}
                      color={surface.text.md}
                      lineHeight={1.6}
                      hold={1800}
                    />
                  )}
                </Box>
              )}
              {goal.notes && goal.notes.length > 0 && (
                <Box
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    mt: 1.5,
                    borderRadius: 1.5,
                    border: `1px solid ${alpha(accent, 0.28)}`,
                    overflow: "hidden",
                    bgcolor: alpha(accent, 0.04),
                    textAlign: "left",
                  }}
                >
                  <Typography
                    sx={{
                      px: 1.25,
                      py: 0.85,
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: alpha(accent, 0.9),
                      borderBottom: `1px solid ${alpha(accent, 0.18)}`,
                    }}
                  >
                    Notes · {goal.notes.length}
                  </Typography>
                  {goal.notes.map((note, i) => (
                    <Box
                      key={note.id}
                      component="details"
                      sx={{
                        borderTop: i === 0 ? "none" : `1px solid ${alpha(accent, 0.14)}`,
                        px: 1.25,
                        "& > summary": {
                          listStyle: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          py: 1,
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: surface.text.hi,
                          userSelect: "none",
                          "&::-webkit-details-marker": { display: "none" },
                        },
                        "&[open] .goal-note-chevron": { transform: "rotate(90deg)" },
                      }}
                    >
                      <Box component="summary">
                        <Box
                          className="goal-note-chevron"
                          aria-hidden
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: 0.5,
                            border: `1px solid ${alpha(accent, 0.4)}`,
                            bgcolor: alpha(accent, 0.1),
                            color: surface.ink(accent),
                            fontSize: 11,
                            fontWeight: 800,
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                            transition: "transform 160ms ease",
                          }}
                        >
                          ›
                        </Box>
                        <Box component="span" sx={{ flex: 1, minWidth: 0 }}>
                          {note.title}
                        </Box>
                      </Box>
                      <Typography
                        component="pre"
                        sx={{
                          m: 0,
                          mb: 1.1,
                          ml: 3,
                          p: 1.1,
                          borderRadius: 1,
                          border: `1px solid ${alpha(accent, 0.18)}`,
                          bgcolor: surface.cardBg,
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                          fontSize: "0.72rem",
                          lineHeight: 1.55,
                          color: surface.text.md,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {note.body}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
