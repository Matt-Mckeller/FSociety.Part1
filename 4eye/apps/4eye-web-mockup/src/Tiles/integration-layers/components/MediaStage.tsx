"use client";

/**
 * MediaStage — a framed, neon-bordered media surface for the future-layer
 * panels (AR Glasses / Brainwave / AION). One component, three modes:
 *
 *   · mode="slideshow" — N frames, auto-advancing (respects reduced-motion),
 *                        dots + arrows, per-frame caption.
 *   · mode="single"    — one hero frame + caption.
 *   · mode="video"     — muted autoplay loop with a poster fallback.
 *
 * Frames without a `src` render a labelled placeholder drop-zone, so the
 * layout ships now and real assets slot in later with no code changes.
 */

import * as React from "react";
import { Box, IconButton, Typography, alpha } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { useLayerSurface } from "./surfaceTokens";

export interface MediaFrame {
  /** Image URL. When absent, a labelled placeholder renders. */
  src?: string;
  /** Short caption shown under the frame. */
  caption?: string;
  /** Placeholder label (what asset goes here). */
  label?: string;
}

interface MediaStageProps {
  accent: string;
  mode?: "slideshow" | "single" | "video";
  frames?: MediaFrame[];
  /** For mode="video". */
  videoSrc?: string;
  poster?: string;
  aspectRatio?: string;
  /** Slideshow auto-advance interval (ms). */
  interval?: number;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Corner({ pos, accent }: { pos: "tl" | "tr" | "bl" | "br"; accent: string }) {
  const v = pos[0] === "t" ? { top: 6 } : { bottom: 6 };
  const h = pos[1] === "l" ? { left: 6 } : { right: 6 };
  const b =
    pos === "tl"
      ? { borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }
      : pos === "tr"
      ? { borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }
      : pos === "bl"
      ? { borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }
      : { borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` };
  return <Box aria-hidden sx={{ position: "absolute", width: 18, height: 18, opacity: 0.75, zIndex: 2, ...v, ...h, ...b }} />;
}

function FrameContent({ frame, accent }: { frame: MediaFrame; accent: string }) {
  const surface = useLayerSurface();
  if (frame.src) {
    return (
      <Box
        component="img"
        src={frame.src}
        alt={frame.caption ?? frame.label ?? ""}
        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  // Placeholder drop-zone
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        background: `radial-gradient(ellipse 90% 70% at 50% 40%, ${alpha(accent, 0.14)} 0%, ${surface.chromeBg} 72%)`,
        backgroundImage: `linear-gradient(${alpha(accent, 0.05)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(accent, 0.05)} 1px, transparent 1px)`,
        backgroundSize: "26px 26px",
      }}
    >
      <ImageRoundedIcon sx={{ fontSize: 34, color: alpha(accent, 0.7) }} />
      <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: surface.text.md, textAlign: "center", px: 2 }}>
        {frame.label ?? "Media placeholder"}
      </Typography>
      <Typography sx={{ fontSize: "0.62rem", color: surface.text.faint }}>Drop image / video here</Typography>
    </Box>
  );
}

export function MediaStage({
  accent,
  mode = "single",
  frames = [],
  videoSrc,
  poster,
  aspectRatio = "16 / 9",
  interval = 4200,
}: MediaStageProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = React.useState(0);
  const count = frames.length;
  const surface = useLayerSurface();

  const go = React.useCallback(
    (dir: number) => setIndex((i) => (count ? (i + dir + count) % count : 0)),
    [count]
  );

  React.useEffect(() => {
    if (mode !== "slideshow" || reduced || count <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [mode, reduced, count, interval]);

  const current = frames[index] ?? frames[0] ?? { label: "Media placeholder" };
  const isSlideshow = mode === "slideshow" && count > 1;

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio,
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${alpha(accent, 0.4)}`,
          boxShadow: `0 0 26px ${alpha(accent, 0.18)}, inset 0 0 30px ${alpha(accent, 0.06)}`,
        }}
      >
        <Corner pos="tl" accent={accent} />
        <Corner pos="tr" accent={accent} />
        <Corner pos="bl" accent={accent} />
        <Corner pos="br" accent={accent} />

        {mode === "video" ? (
          <Box
            component="video"
            src={videoSrc}
            poster={poster}
            muted
            loop
            autoPlay
            playsInline
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ position: "absolute", inset: 0 }}
            >
              <FrameContent frame={current} accent={accent} />
            </motion.div>
          </AnimatePresence>
        )}

        {/* slideshow arrows */}
        {isSlideshow && (
          <>
            <IconButton
              aria-label="Previous frame"
              onClick={() => go(-1)}
              sx={arrowSx("left", accent)}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <IconButton
              aria-label="Next frame"
              onClick={() => go(1)}
              sx={arrowSx("right", accent)}
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* dots */}
      {isSlideshow && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75, mt: 1 }}>
          {frames.map((_, i) => (
            <Box
              key={i}
              role="button"
              aria-label={`Go to frame ${i + 1}`}
              onClick={() => setIndex(i)}
              sx={{
                width: i === index ? 20 : 7,
                height: 7,
                borderRadius: 999,
                cursor: "pointer",
                bgcolor: i === index ? accent : alpha(accent, 0.3),
                boxShadow: i === index ? `0 0 8px ${accent}` : "none",
                transition: "width 200ms ease, background 200ms ease",
              }}
            />
          ))}
        </Box>
      )}

      {/* caption */}
      {current.caption && (
        <Typography sx={{ mt: 1, fontSize: "0.76rem", color: surface.text.md, textAlign: "center", lineHeight: 1.5 }}>
          {current.caption}
        </Typography>
      )}
    </Box>
  );
}

function arrowSx(side: "left" | "right", accent: string) {
  return {
    position: "absolute" as const,
    top: "50%",
    [side]: 8,
    transform: "translateY(-50%)",
    zIndex: 3,
    width: 34,
    height: 34,
    color: "#fff",
    bgcolor: alpha(accent, 0.25),
    border: `1px solid ${alpha(accent, 0.5)}`,
    backdropFilter: "blur(4px)",
    "&:hover": { bgcolor: alpha(accent, 0.4) },
  };
}
