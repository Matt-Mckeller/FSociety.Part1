"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { RING_RENDERERS, useRingCycle } from "@expanse/character/explorer";
import { appsForCompass } from "@yen/content";
import { APP_ICONS, ExpanseMark } from "./AppIcons";

/**
 * The navigation compass.
 *
 * Reuses the cycling ring visuals from `@expanse/character/explorer`, but the
 * rings are the hub rather than the point: destinations sit on a bezel around
 * them and the whole thing is how you move between them.
 *
 * The bezel is drawn explicitly. An earlier version placed the points on an
 * implied circle far outside the rings, and with nothing connecting them it
 * read as five scattered dots rather than as a compass.
 */

const SIZE = 300;
const CENTRE = SIZE / 2;
/** Bezel sits clear of the rings (~64px across) without stranding the points. */
const RADIUS = 108;
const LABEL_H = 56;
/**
 * Visible chip that carries each destination's mark. Large enough for a stroked
 * icon to read; the hit box around it stays bigger for touch.
 */
const CHIP = 28;
const ICON = 18;
/** Transparent hit area around the chip — pointer guidelines want ≥44px. */
const HIT = 44;

export default function CompassInner() {
  const variant = useRingCycle();
  const Rings = RING_RENDERERS[variant];
  const [focused, setFocused] = useState<string | null>(null);
  /*
    A one-time introduction. The compass is interactive but looks like an
    illustration, so on arrival each point lights in turn — enough to read as
    "these are buttons" without becoming an animation that repeats forever.
  */
  const [introduced, setIntroduced] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setIntroduced(true);
      return;
    }
    const t = setTimeout(() => setIntroduced(true), 2200);
    return () => clearTimeout(t);
  }, []);

  /* Site navigation: products that run, Command Center, docs, and media. */
  const apps = appsForCompass();
  const active = apps.find((a) => a.id === focused);
  /* Cold path is videos, not a product — startHere on products is secondary. */

  const point = (i: number) => {
    const angle = (-90 + i * (360 / apps.length)) * (Math.PI / 180);
    return { x: CENTRE + RADIUS * Math.cos(angle), y: CENTRE + RADIUS * Math.sin(angle) };
  };

  return (
    <Box sx={{ width: SIZE, mx: "auto" }}>
      {/* Says what the ring is a ring of, which nothing else on the page does. */}
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.3,
          textTransform: "uppercase",
          color: "text.secondary",
          textAlign: "center",
          mb: 1,
        }}
      >
        Navigate
      </Typography>

      <Box sx={{ position: "relative", width: SIZE, height: SIZE }}>
        {/* Bezel + ticks. Drawn first so everything else sits above it. */}
        <Box
          component="svg"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-hidden
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <circle
            cx={CENTRE}
            cy={CENTRE}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.16}
            strokeWidth={1}
          />
          {apps.map((app, i) => {
            const angle = (-90 + i * (360 / apps.length)) * (Math.PI / 180);
            const outerR = RADIUS - CHIP / 2;
            const outer = {
              x: CENTRE + outerR * Math.cos(angle),
              y: CENTRE + outerR * Math.sin(angle),
            };
            const inner = {
              x: CENTRE + (outerR - 9) * Math.cos(angle),
              y: CENTRE + (outerR - 9) * Math.sin(angle),
            };
            return (
              <line
                key={app.id}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke={app.accent}
                strokeOpacity={focused === app.id ? 0.9 : 0.35}
                strokeWidth={2}
              />
            );
          })}
        </Box>

        {/* Hub: the cycling rings, with the mark at their centre. */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            opacity: 0.85,
            pointerEvents: "none",
          }}
        >
          <Box sx={{ gridArea: "1 / 1", opacity: active ? 0.5 : 1, transition: "opacity 200ms ease" }}>
            <Rings />
          </Box>
        </Box>

        {/*
          The mark sits at the compass centre, positioned rather than stacked.
          Sharing a grid cell with the rings inherited their box, which is
          taller than the container — the mark rendered 29px low.

          At rest it is the Expanse mark; while a point is focused it is that
          destination's own, so the centre answers "which am I pointing at"
          without the eye leaving the middle.
        */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: CENTRE,
            top: CENTRE,
            transform: "translate(-50%, -50%)",
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              gridArea: "1 / 1",
              display: "grid",
              placeItems: "center",
              color: "text.primary",
              opacity: active ? 0 : 0.75,
              transform: `scale(${active ? 0.8 : 1})`,
              transition: "opacity 160ms ease, transform 160ms ease",
            }}
          >
            <ExpanseMark size={58} />
          </Box>

          {apps.map((app) => {
            const Icon = APP_ICONS[app.id];
            if (!Icon) return null;
            const shown = focused === app.id;
            return (
              <Box
                key={app.id}
                sx={{
                  gridArea: "1 / 1",
                  display: "grid",
                  placeItems: "center",
                  color: app.accent,
                  opacity: shown ? 1 : 0,
                  transform: `scale(${shown ? 1 : 0.8})`,
                  transition: "opacity 160ms ease, transform 160ms ease",
                }}
              >
                <Icon size={58} />
              </Box>
            );
          })}
        </Box>

        {/* Points. The chip carries the mark; the box around it is the control. */}
        {apps.map((app, i) => {
          const { x, y } = point(i);
          const isFocused = focused === app.id;
          const isSuggested = Boolean(app.startHere);
          const Icon = APP_ICONS[app.id];
          return (
            <Box
              key={app.id}
              component={Link}
              href={app.href}
              onMouseEnter={() => setFocused(app.id)}
              onMouseLeave={() => setFocused(null)}
              onFocus={() => setFocused(app.id)}
              onBlur={() => setFocused(null)}
              aria-label={`${app.title} — ${app.summary}`}
              sx={{
                position: "absolute",
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                width: HIT,
                height: HIT,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                textDecoration: "none",
                color: isFocused ? "background.paper" : app.accent,
                "&:focus-visible": { outline: `2px solid ${app.accent}`, outlineOffset: 0 },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  width: CHIP,
                  height: CHIP,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: isFocused ? app.accent : "background.paper",
                  border: "2px solid",
                  borderColor: app.accent,
                  color: "inherit",
                  transform: `scale(${isFocused ? 1.12 : 1})`,
                  boxShadow: isFocused
                    ? `0 0 0 5px ${app.accent}26`
                    : isSuggested
                      ? `0 0 0 4px ${app.accent}1f`
                      : "none",
                  transition:
                    "transform 150ms ease, background-color 150ms ease, color 150ms ease, box-shadow 150ms ease",
                  /* The introduction: each point lights in turn, once. */
                  animation: introduced ? "none" : `compassIntro 600ms ease ${i * 160}ms 1`,
                  "@keyframes compassIntro": {
                    "0%, 100%": { boxShadow: `0 0 0 0 ${app.accent}00` },
                    "45%": { boxShadow: `0 0 0 9px ${app.accent}3d` },
                  },
                }}
              >
                {Icon ? (
                  <Icon size={ICON} />
                ) : (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "currentColor",
                    }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/*
        The focused destination is named below the bezel rather than inside it.
        Text in the hub collided with the rings and was unreadable.
      */}
      <Box sx={{ height: LABEL_H, textAlign: "center", mt: 0.75 }}>
        {active ? (
          <>
            <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: active.accent, lineHeight: 1.25 }}>
              {active.title}
              {active.startHere && (
                <Box component="span" sx={{ ml: 0.75, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5, color: "text.secondary" }}>
                  START HERE
                </Box>
              )}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.4, mt: 0.25 }}>
              {active.summary}
            </Typography>
          </>
        ) : (
          <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.5 }}>
            Hover to orient, click to open.
            <br />
            New here? Start with{" "}
            <Box
              component={Link}
              href="/videos"
              sx={{ color: "#ef4444", fontWeight: 650, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              videos
            </Box>
            {" "}
            rather than an app.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
