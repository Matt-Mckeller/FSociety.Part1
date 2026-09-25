"use client";

import { useState, useRef, useCallback } from "react";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDomainsSlideContext } from "../state/DomainsSlideContext";
import type { ReachIcon } from "../state/domains.constants";

// ─── Layout constants ────────────────────────────────────────────────────────

const BLUE = "#3B82F6";

/** Width of every card in px. */
const CARD_W = 272;
/** Height of every card in px. */
const CARD_H = 380;
/**
 * Distance between adjacent card centers when laid side-by-side.
 * Chosen so neighbours overlap 28 px behind the active card, giving
 * the "cluster" effect the user requested.
 *   neighbor half-width at scale 0.82 = 272 * 0.82 / 2 ≈ 111 px
 *   active half-width = 136 px
 *   STEP = 136 + 111 - 28 = 219 → round to 215 for a tighter look
 */
const STEP = 215;
/** Scale applied to the left/right neighbours. */
const SIDE_SCALE = 0.82;
/** Minimum pointer displacement (px) to commit a slide change. */
const DRAG_THRESHOLD = 55;
/**
 * Spring-like cubic-bezier used for the snap-back / advance animation.
 * Feels quick yet bouncy — matches the brand's energetic tone.
 */
const SPRING = "cubic-bezier(0.34, 1.42, 0.64, 1)";

// ─── Per-card content ────────────────────────────────────────────────────────

/** Descriptions for the two "Wherever" (when) items — not stored in whens.ts. */
const WHEREVER_COPY: Record<string, { description: string; example: string }> = {
  live: {
    description: "Connect and grow alongside real humans — in classrooms, workshops, sports, and live events.",
    example: "Run a live team learning session or compete face-to-face.",
  },
  online: {
    description: "Full 4eye access from any device, anywhere you have a connection — zero compromises.",
    example: "Follow a module between meetings or during your commute.",
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface CarouselCard {
  key: string;
  label: string;
  Icon: ReachIcon;
  section: "Wherever" | "Whenever";
  description: string;
  example: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * DomainsExpandedCarousel — spotlight carousel shown when the user presses
 * the Expand orb-bar action on the Reach (Domains) slide.
 *
 * One card is centred and at full scale; its neighbours are 18% smaller
 * and peek from behind it, creating the cluster-overlap feel. Supports:
 *   • Drag / swipe (pointer events with capture)
 *   • Click on a peeking neighbour to jump directly to it
 *   • Chevron arrow buttons (left / right)
 *   • Animated pill dot indicator
 */
export function DomainsExpandedCarousel() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { whens, places } = useDomainsSlideContext();

  const cards: CarouselCard[] = [
    ...whens.map((w) => ({
      key: `w-${w.key}`,
      label: w.label,
      Icon: w.Icon,
      section: "Wherever" as const,
      ...(WHEREVER_COPY[w.key] ?? { description: "", example: "" }),
    })),
    ...places.map((p) => ({
      key: `p-${p.key}`,
      label: p.label,
      Icon: p.Icon,
      section: "Whenever" as const,
      description: p.description,
      example: p.example,
    })),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  /** Live drag offset in px (positive = dragging right = going to prev). */
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef<number | null>(null);
  /** Raw (unclamped) delta — used for commit decision in onPointerUp. */
  const rawDelta = useRef(0);

  const clampIdx = (i: number) => Math.max(0, Math.min(cards.length - 1, i));
  const go = useCallback((dir: 1 | -1) => setActiveIndex((i) => clampIdx(i + dir)), [cards.length]);

  // ── Pointer handlers ──────────────────────────────────────────────────────

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only react to primary pointer (left-click / first touch)
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStartX.current = e.clientX;
    rawDelta.current = 0;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    rawDelta.current = delta;
    // Clamp drag so you cannot pull past the first or last card
    const maxRight = activeIndex * STEP * 1.15;
    const maxLeft = (cards.length - 1 - activeIndex) * STEP * 1.15;
    setDragDelta(Math.max(-maxLeft, Math.min(maxRight, delta)));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const delta = rawDelta.current;

    if (Math.abs(delta) < 6) {
      // Treat as a click — check if it hit a peeking neighbour
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2; // offset from center
      if (relX < -(CARD_W / 2) && activeIndex > 0) go(-1);
      else if (relX > CARD_W / 2 && activeIndex < cards.length - 1) go(1);
    } else if (delta < -DRAG_THRESHOLD) {
      go(1); // swiped left → next
    } else if (delta > DRAG_THRESHOLD) {
      go(-1); // swiped right → prev
    }

    dragStartX.current = null;
    rawDelta.current = 0;
    setDragDelta(0);
    setIsDragging(false);
  };

  // ── Per-card visual state ─────────────────────────────────────────────────

  /**
   * Returns the CSS transform data for card[idx].
   *
   * visualOffset = how many "steps" this card is from the visual center.
   * 0 = active, ±1 = neighbours, ±2 = barely visible or hidden.
   *
   * Drag maps to a fractional offset so cards slide smoothly:
   *   dragging right (dragDelta > 0) → cards shift right → prev card arrives.
   */
  function visual(idx: number) {
    const rawOffset = idx - activeIndex;
    // positive dragDelta → drag right → show previous → offset increases
    const dragFraction = dragDelta / STEP;
    const vo = rawOffset + dragFraction; // visual offset
    const abs = Math.abs(vo);

    // Hide cards beyond ±1.7 visual steps (nothing useful to show)
    if (abs > 1.75) return null;

    // Scale: 1 at center, SIDE_SCALE at ±1, linear blend in between
    const scale = 1 - Math.min(abs, 1) * (1 - SIDE_SCALE);

    // Translate: each step is STEP px
    const tx = vo * STEP;

    // Opacity: full at center, 82% at ±1, fades quickly beyond that
    const opacity = abs > 1 ? Math.max(0, 1 - (abs - 1) * 1.8) : 1 - abs * 0.18;

    // zIndex: active is on top
    const zIndex = Math.round(20 - abs * 8);

    // "Visually active" = genuinely centred (not just being dragged through)
    const isActive = abs < 0.35;

    return { scale, tx, opacity, zIndex, isActive };
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        userSelect: "none",
      }}
    >
      {/* ── Viewport ─────────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: CARD_W + STEP * 2, // shows ~140 px of each neighbour
          height: CARD_H + 40,
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        // Prevent browser image-drag hijacking the gesture
        onDragStart={(e) => e.preventDefault()}
      >
        {cards.map((card, idx) => {
          const v = visual(idx);
          if (!v) return null;
          const { scale, tx, opacity, zIndex, isActive } = v;

          return (
            <Box
              key={card.key}
              sx={{
                position: "absolute",
                top: 20,
                left: "50%",
                ml: `${-CARD_W / 2}px`,
                width: CARD_W,
                height: CARD_H,
                transformOrigin: "center center",
                transform: `translateX(${tx}px) scale(${scale})`,
                opacity,
                zIndex,
                transition: isDragging
                  ? "none"
                  : `transform 420ms ${SPRING}, opacity 320ms ease`,
                pointerEvents: "none", // parent captures all pointer events
              }}
            >
              {/* ── Card face ──────────────────────────────────────────── */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  border: `1.5px solid ${BLUE}${isActive ? "40" : "1a"}`,
                  bgcolor: isDark
                    ? `rgba(59,130,246,${isActive ? 0.11 : 0.04})`
                    : isActive
                    ? "#EFF6FF"
                    : "#F6F8FF",
                  boxShadow: isActive
                    ? `0 28px 56px -14px ${BLUE}44, 0 0 0 1px ${BLUE}1a`
                    : `0 6px 18px -8px ${BLUE}28`,
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  gap: 2,
                  overflow: "hidden",
                  transition: isDragging ? "none" : `box-shadow 420ms ease, border-color 320ms ease, background-color 320ms ease`,
                }}
              >
                {/* Section badge */}
                <Typography
                  variant="overline"
                  sx={{
                    color: BLUE,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    fontSize: "0.65rem",
                    lineHeight: 1,
                  }}
                >
                  {card.section}
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: `${BLUE}18`,
                    color: BLUE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: isActive ? `0 4px 16px -4px ${BLUE}44` : "none",
                    transition: "box-shadow 320ms ease",
                  }}
                >
                  {/* @ts-expect-error MUI icon compat */}
                  <card.Icon style={{ fontSize: 28 }} />
                </Box>

                {/* Label */}
                <Typography
                  component="h3"
                  sx={{
                    fontSize: "1.55rem",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    color: isDark ? "common.white" : "text.primary",
                  }}
                >
                  {card.label}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                  }}
                >
                  {card.description}
                </Typography>

                {/* Example quote — pinned to bottom */}
                <Typography
                  sx={{
                    mt: "auto",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                    color: `${BLUE}BB`,
                  }}
                >
                  "{card.example}"
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      {/* ── Controls: ‹ [dots] › ──────────────────────────────────────────── */}
      <Stack direction="row" spacing={2} sx={{
        alignItems: "center"
      }}>
        <IconButton
          onClick={() => go(-1)}
          disabled={activeIndex === 0}
          size="small"
          sx={{
            bgcolor: `${BLUE}14`,
            color: BLUE,
            transition: "background-color 200ms ease, opacity 200ms ease",
            "&:hover": { bgcolor: `${BLUE}28` },
            "&.Mui-disabled": { opacity: 0.25, color: BLUE },
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        {/* Animated pill dots */}
        <Stack direction="row" spacing={0.75} sx={{
          alignItems: "center"
        }}>
          {cards.map((_, i) => (
            <Box
              key={i}
              onClick={() => setActiveIndex(i)}
              sx={{
                width: i === activeIndex ? 22 : 7,
                height: 7,
                borderRadius: "4px",
                bgcolor: i === activeIndex ? BLUE : `${BLUE}30`,
                cursor: "pointer",
                transition: `width 360ms ${SPRING}, background-color 240ms ease`,
              }}
            />
          ))}
        </Stack>

        <IconButton
          onClick={() => go(1)}
          disabled={activeIndex === cards.length - 1}
          size="small"
          sx={{
            bgcolor: `${BLUE}14`,
            color: BLUE,
            transition: "background-color 200ms ease, opacity 200ms ease",
            "&:hover": { bgcolor: `${BLUE}28` },
            "&.Mui-disabled": { opacity: 0.25, color: BLUE },
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default DomainsExpandedCarousel;
