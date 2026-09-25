"use client";

/**
 * GoalGlyphs — the three signature goals reduced to their art alone.
 *
 * `GoalsShowcase` is the full read: coded label, Target line, hero art, meaning
 * on click. It costs real height, which is why it lives inside a disclosure
 * that is collapsed by default — and a collapsed disclosure reading "GOALS ·
 * 3 equipped" says how many there are without saying what they are.
 *
 * This is the other end of that scale: the same three pieces of art at badge
 * size, no text, tooltips carrying the coded form and the Target. It costs one
 * line of height, so it can sit where the full showcase cannot — in a
 * disclosure header while collapsed, or in the identity band on the lenses
 * where the Goals bracket isn't rendered at all.
 *
 * Art is keyed by goal id, matching `GoalsShowcase.artFor`. Any goal without
 * bespoke art (the parent set) falls back to its Target bullseye, so the row
 * still reads as three distinct goals rather than three blanks.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";

import { GOALS, type VisionGoal } from "./goalsData";
import { SpinningGlobe } from "./SpinningGlobe";
import { AnimatedCoinStack, CURATED_VALUE_PALETTES } from "./AnimatedCoinStack";
import { LiquidCrown } from "./LiquidCrown";
import { useLayerSurface } from "../components/surfaceTokens";

/**
 * The Target bullseye at glyph scale, matching `GoalRow`'s `TargetIcon`.
 *
 * This is the fallback for goals with no bespoke art — which is every goal in
 * `PROFILE_GOALS`. That is not a degraded state: those goals already carry an
 * identity in `targetShape` + `accent`, the same pair `GoalRow` draws inside
 * the open card, so the glyph and the row show the same mark.
 */
function MiniTarget({ shape, ink, size }: { shape: VisionGoal["targetShape"]; ink: string; size: number }) {
  const centerMark =
    shape === "circle" ? (
      <circle cx={12} cy={12} r={4.2} fill={ink} />
    ) : shape === "square" ? (
      <rect x={8.3} y={8.3} width={7.4} height={7.4} rx={1} fill={ink} />
    ) : (
      <polygon points="12,7.2 16.8,16.4 7.2,16.4" fill={ink} />
    );
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <circle cx={12} cy={12} r={9.4} fill="none" stroke={ink} strokeWidth={1.4} strokeDasharray="3 2.4" strokeLinecap="round" opacity={0.85} />
      <line x1={12} y1={0.8} x2={12} y2={2.6} stroke={ink} strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
      <line x1={12} y1={21.4} x2={12} y2={23.2} stroke={ink} strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
      <line x1={0.8} y1={12} x2={2.6} y2={12} stroke={ink} strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
      <line x1={21.4} y1={12} x2={23.2} y2={12} stroke={ink} strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
      {centerMark}
    </svg>
  );
}

/**
 * `active` (hover/focus) is what quickens the art. At rest the glyphs are
 * ambient chrome, not the subject of the page — a fast globe and a cycling coin
 * in a header would pull the eye away from whatever the lens is actually
 * showing. The globe drifts rather than stopping, because a frozen globe reads
 * as a broken one; SMIL also has no meaningful `dur="0s"`.
 */
function MiniArt({ goal, size, ink, active }: { goal: VisionGoal; size: number; ink: string; active: boolean }) {
  if (goal.id === "save") return <SpinningGlobe size={size} spin={active ? 8 : 26} />;
  if (goal.id === "value")
    return (
      <AnimatedCoinStack
        size={size}
        palettes={CURATED_VALUE_PALETTES}
        active={active}
        interval={900}
        chipCircuit
      />
    );
  if (goal.id === "king") return <LiquidCrown size={Math.round(size * 1.15)} />;
  return <MiniTarget shape={goal.targetShape} ink={ink} size={size} />;
}

export interface GoalGlyphsProps {
  /** Defaults to the character's three signature goals. */
  goals?: VisionGoal[];
  /** Art box edge in px. 22 reads at header scale; 28 in the identity band. */
  size?: number;
  /**
   * Called with the goal when a glyph is activated. Omit to render the glyphs
   * as inert decoration — which is what you want inside a clickable header,
   * where the click already means "open the section".
   */
  onSelect?: (goal: VisionGoal) => void;
  /** Accessible name for the group. */
  label?: string;
}

export function GoalGlyphs({ goals = GOALS, size = 22, onSelect, label = "Goals" }: GoalGlyphsProps) {
  const surface = useLayerSurface();
  const [hovered, setHovered] = React.useState<string | null>(null);
  const interactive = Boolean(onSelect);

  return (
    <Stack
      role="list"
      aria-label={label}
      sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, flexShrink: 0 }}
    >
      {goals.map((goal) => {
        const ink = surface.ink(goal.accent);
        return (
          <Tooltip
            key={goal.id}
            arrow
            placement="bottom"
            title={
              <Box sx={{ py: 0.25 }}>
                <Typography sx={{ fontFamily: "monospace", fontSize: 11, color: goal.accent2, lineHeight: 1.5 }}>
                  {goal.code}
                </Typography>
                <Typography sx={{ fontSize: 11.5, fontWeight: 700, lineHeight: 1.4, mt: 0.25 }}>
                  {goal.targetPlain}
                </Typography>
              </Box>
            }
          >
            <Box
              role="listitem"
              component={interactive ? "button" : "div"}
              type={interactive ? "button" : undefined}
              aria-label={interactive ? goal.targetPlain : undefined}
              onClick={interactive ? () => onSelect?.(goal) : undefined}
              onMouseEnter={() => setHovered(goal.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(goal.id)}
              onBlur={() => setHovered(null)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: size + 10,
                height: size + 10,
                p: 0,
                flexShrink: 0,
                borderRadius: "50%",
                border: "1px solid",
                borderColor: alpha(goal.accent, hovered === goal.id ? 0.75 : 0.3),
                bgcolor: alpha(goal.accent, hovered === goal.id ? 0.16 : 0.07),
                boxShadow: hovered === goal.id ? `0 0 10px ${alpha(goal.accent, 0.35)}` : "none",
                color: ink,
                cursor: interactive ? "pointer" : "default",
                transition: "background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease",
                "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
              }}
            >
              <MiniArt goal={goal} size={size} ink={ink} active={hovered === goal.id} />
            </Box>
          </Tooltip>
        );
      })}
    </Stack>
  );
}
