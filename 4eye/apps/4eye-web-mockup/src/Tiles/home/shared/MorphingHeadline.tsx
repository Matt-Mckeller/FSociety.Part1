"use client";

/**
 * MorphingHeadline — animated headline that morphs through a sequence of
 * phrases, plays once on mount (or when `key` changes), holds on the final
 * phrase, and replays when clicked.
 *
 * Each transition is a soft crossfade with a slight blur + y-shift. Designed
 * to match an existing `<Typography variant="h2">` in size/weight by
 * delegating styling to the parent (the inner span inherits font properties).
 */

import { Box, Typography, type TypographyProps } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReplayToken } from "@4eye/web/hooks/ui";

export interface MorphingHeadlineProps {
  /** Phrases to morph through in order. The last one is held. */
  phrases: string[];
  /** Time held on each phrase before morphing to the next (seconds). */
  holdSec?: number;
  /** Crossfade duration between phrases (seconds). */
  morphSec?: number;
  /** Typography variant for outer wrapper (defaults to h2). */
  variant?: TypographyProps["variant"];
  /** sx forwarded to the outer Typography. */
  sx?: TypographyProps["sx"];
}

export function MorphingHeadline({
  phrases,
  holdSec = 0.9,
  morphSec = 0.55,
  variant = "h2",
  sx,
}: MorphingHeadlineProps) {
  const [index, setIndex] = useState(0);
  const [playToken, replayToken] = useReplayToken();
  const innerRef = useRef<HTMLSpanElement | null>(null);

  const replay = useCallback(() => {
    setIndex(0);
    replayToken();
  }, [replayToken]);

  // Drive the morph timeline: fade-in current phrase, hold, fade-out, advance.
  useEffect(() => {
    if (!innerRef.current) return;
    const el = innerRef.current;
    const isLast = index >= phrases.length - 1;
    gsap.set(el, { opacity: 0, y: 8, filter: "blur(6px)" });
    const tl = gsap.timeline();
    tl.to(el, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: morphSec,
      ease: "power2.out",
    });
    if (!isLast) {
      tl.to(el, {
        opacity: 0,
        y: -8,
        filter: "blur(6px)",
        duration: morphSec,
        ease: "power2.in",
        delay: holdSec,
        onComplete: () => setIndex((i) => i + 1),
      });
    }
    return () => {
      tl.kill();
    };
  }, [index, phrases.length, morphSec, holdSec, playToken]);

  const isFinal = index >= phrases.length - 1;

  return (
    <Typography
      variant={variant}
      onClick={isFinal ? replay : undefined}
      role={isFinal ? "button" : undefined}
      tabIndex={isFinal ? 0 : undefined}
      aria-label={isFinal ? `${phrases[index]} (click to replay)` : undefined}
      onKeyDown={(e) => {
        if (!isFinal) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          replay();
        }
      }}
      sx={[
        {
          cursor: isFinal ? "pointer" : "default",
          userSelect: "none",
          // Lock height to prevent layout shift between short/long phrases.
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "1.2em",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component="span"
        ref={innerRef}
        sx={{ display: "inline-block", willChange: "opacity, transform, filter" }}
      >
        {phrases[index]}
      </Box>
    </Typography>
  );
}

export default MorphingHeadline;
