"use client";

/**
 * Cypher headline: held state is the Expanse joystick (home Control step) + Future.
 *
 * Gamification still cyphers in on an interval (and on click) so the game roots
 * of the title stay audible without owning the first read. Below that:
 * `#All In One` cyphers to Won, then Plans · Products · Content chips.
 */

import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";

/*
  Joystick glyph lives here rather than being imported from @4eye/web.

  Home used to pull `Tiles/home/slideshow/step-icons`, which is a leaf in
  theory and a 4eye graph in practice — that module also loads brand-core
  and 4eye timeline types. One import was enough to put the mockup on the
  home compile, so a syntax error elsewhere in 4eye could 500 `/` after a
  visit to `/4eye/*`. The drawing is 15 lines; it is cheaper to copy than
  to compile the neighbouring app.
*/
function JoystickGlyph({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      style={{ display: "block" }}
    >
      <g fill={color}>
        <rect x="3" y="18" width="18" height="3.5" rx="1.75" />
        <rect x="11" y="9" width="2" height="10" rx="1" />
        <circle cx="12" cy="6.5" r="4" />
      </g>
      <circle cx="12" cy="6.5" r="1.4" fill="#ffffff" fillOpacity={0.92} />
    </svg>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
/** Replay the Gamification → Future scramble every ~28s once settled. */
const REPLAY_MS = 28_000;
/**
 * Beat before the first scramble.
 *
 * The morph used to fire the instant the component mounted, so the very first
 * thing a visitor's eye landed on was a word dissolving into noise — during the
 * one second where they are deciding what this site is. Holding the settled
 * headline first means the title is read, then it performs.
 */
const FIRST_RUN_DELAY_MS = 1_400;

function scrambleTo(target: string, onFrame: (s: string) => void, ms = 520): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const revealed = Math.floor(t * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (target[i] === " ") out += " ";
        else if (i < revealed) out += target[i];
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      onFrame(out);
      if (t < 1) requestAnimationFrame(tick);
      else {
        onFrame(target);
        resolve();
      }
    };
    requestAnimationFrame(tick);
  });
}

export function CypherHeadline({
  morph,
  chips,
  allInMorph,
}: {
  morph: readonly string[];
  chips: readonly string[];
  /** `#All In One` → Won cypher line. */
  allInMorph?: readonly string[];
}) {
  const theme = useTheme();
  const held = morph[morph.length - 1] ?? "Future";
  const [word, setWord] = React.useState(held);
  const [scrambling, setScrambling] = React.useState(false);
  const [showController, setShowController] = React.useState(true);
  const [allIn, setAllIn] = React.useState(allInMorph?.[0] ?? "All In One");
  const reduce = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const runMorph = React.useCallback(async () => {
    if (reduce || morph.length < 2) {
      setWord(held);
      setShowController(true);
      return;
    }
    setScrambling(true);
    setShowController(false);
    for (let i = 0; i < morph.length; i++) {
      await scrambleTo(morph[i], setWord, i === 0 ? 380 : 640);
      await new Promise((r) => setTimeout(r, i === morph.length - 1 ? 0 : 420));
    }
    setWord(held);
    setShowController(true);
    setScrambling(false);
  }, [held, morph, reduce]);

  const runAllIn = React.useCallback(async () => {
    if (!allInMorph || allInMorph.length < 2 || reduce) {
      setAllIn(allInMorph?.[allInMorph.length - 1] ?? "Won");
      return;
    }
    for (let i = 0; i < allInMorph.length; i++) {
      await scrambleTo(allInMorph[i], setAllIn, i === 0 ? 320 : 560);
      await new Promise((r) => setTimeout(r, i === allInMorph.length - 1 ? 0 : 380));
    }
  }, [allInMorph, reduce]);

  React.useEffect(() => {
    let cancelled = false;
    const id = window.setTimeout(() => {
      void (async () => {
        if (cancelled) return;
        await runMorph();
        if (cancelled) return;
        await runAllIn();
      })();
    }, FIRST_RUN_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [runMorph, runAllIn]);

  React.useEffect(() => {
    if (reduce || scrambling) return;
    const id = window.setInterval(() => {
      void runMorph();
    }, REPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, scrambling, runMorph]);

  const onTitleClick = () => {
    if (scrambling) return;
    void runMorph();
  };

  return (
    <Box sx={{ mb: 2.25 }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: { zero: 34, tablet: 44, laptop: 56 },
          fontWeight: 700,
          letterSpacing: -1.5,
          lineHeight: 1.05,
          mb: 1.1,
          display: "flex",
          alignItems: "center",
          gap: { zero: 1.25, tablet: 1.75 },
        }}
        aria-label={`${held} — ${chips.join(", ")}`}
      >
        {showController && !scrambling && (
          <Box
            sx={{
              display: "inline-flex",
              flexShrink: 0,
              lineHeight: 0,
              opacity: 0.95,
            }}
          >
            <JoystickGlyph size={44} color={theme.palette.primary.main} />
          </Box>
        )}
        {/*
          The replay was an onClick on the <h1> itself: no tab stop, no key
          handler, invisible to anyone not using a mouse. It is a real control,
          so it is a real button — unstyled, inheriting the headline type. When
          motion is reduced there is nothing to replay, so it renders as plain
          text rather than as a control that does nothing.
        */}
        <Box
          component={reduce ? "span" : "button"}
          {...(reduce
            ? {}
            : {
                type: "button" as const,
                onClick: onTitleClick,
                "aria-label": `Replay the ${held} headline animation`,
              })}
          sx={{
            color: "primary.main",
            display: "inline-block",
            minWidth: showController && !scrambling ? "7ch" : "12ch",
            fontVariantNumeric: "tabular-nums",
            font: "inherit",
            letterSpacing: "inherit",
            textAlign: "left",
            p: 0,
            border: "none",
            background: "none",
            userSelect: "none",
            cursor: reduce || scrambling ? "default" : "pointer",
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: 4,
              borderRadius: 1,
            },
          }}
        >
          {showController && !scrambling ? held : word}
        </Box>
      </Typography>

      {/* #All In One → Won */}
      {allInMorph && (
        <Typography
          sx={{
            fontSize: { zero: 15, tablet: 16.5 },
            fontWeight: 700,
            letterSpacing: 0.2,
            color: "text.primary",
            mb: 1.15,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
          aria-label={`All In One, cyphertext Won`}
        >
          <Box component="span" sx={{ color: "text.disabled", fontWeight: 650 }}>
            #
          </Box>
          {allIn}
        </Typography>
      )}

      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          gap: 0.75,
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        {chips.map((chip, i) => (
          <Box
            key={chip}
            component="li"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            {i > 0 && (
              <Box
                aria-hidden
                sx={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  bgcolor: "text.disabled",
                  display: { zero: "none", tablet: "block" },
                  mr: 0.25,
                }}
              />
            )}
            <Box
              sx={{
                px: 1.35,
                py: 0.55,
                borderRadius: 1.25,
                border: "1px solid",
                borderColor: (t) =>
                  t.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)",
                bgcolor: (t) =>
                  t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)",
                fontSize: { zero: 12.5, tablet: 13.5 },
                fontWeight: 650,
                letterSpacing: 0.2,
                color: "text.primary",
                lineHeight: 1.2,
              }}
            >
              {chip}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
