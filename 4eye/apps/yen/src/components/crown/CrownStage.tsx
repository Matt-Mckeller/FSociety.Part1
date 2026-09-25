"use client";

/**
 * The header's top-right slot: compass or crown.
 *
 * The compass answers "where can I go". The crown answers "what is all this",
 * and it is the same answer in a different form — same five products at the
 * same five angles, same five groups as the bands. Pressing the button does not
 * swap one illustration for another; it stands the dial up.
 *
 * Three renderers, in order of preference:
 *   · the 3D crown, when the browser has WebGL and motion is welcome
 *   · the flat crown (`LiquidCrown`, `amethyst`), otherwise — same object
 *   · the compass, which is still the default and still what most people want
 *
 * The 3D subtree and the flat crown are both loaded on demand. Nothing about
 * the crown lands in the home route's first-load bundle, which is watched by
 * `scripts/check-bundle-size.mjs` and would not survive `three` arriving in it.
 */

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

import { APP_ICONS } from "../AppIcons";
import { CROWN_COLORS, CROWN_PRODUCTS } from "./crownModel";
import { CrownFullScreen } from "./CrownFullScreen";

const CrownScene = dynamic(() => import("./CrownScene"), {
  ssr: false,
  loading: () => <Box sx={{ height: 300 }} />,
});

const FlatCrown = dynamic(
  () =>
    import("@4eye/web/Tiles/integration-layers/goals/LiquidCrown").then((m) => ({
      default: m.LiquidCrown,
    })),
  { ssr: false, loading: () => <Box sx={{ height: 300 }} /> },
);

const CompassInner = dynamic(() => import("../CompassInner"), {
  ssr: false,
  loading: () => <Box sx={{ minHeight: 352 }} />,
});

/** Matches the compass's own footprint so switching does not jolt the header. */
const STAGE_H = 352;
const STORAGE_KEY = "yen.headerMode";

export type HeaderMode = "compass" | "crown";

/* ------------------------------------------------------------------- hooks */

/**
 * Whether the visitor has asked for less motion.
 *
 * Read once and then watched: the setting can change while the page is open,
 * and a crown that keeps flickering after the preference flips is exactly the
 * failure the preference exists to prevent.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Whether this browser can render the 3D crown at all.
 *
 * Asked rather than assumed. A machine with WebGL disabled would otherwise get
 * a blank box where the ornament should be, and the flat crown is a perfectly
 * good answer — it is the same crown.
 */
export function useHasWebGL(): boolean {
  const [ok, setOk] = React.useState(false);

  React.useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setOk(Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl")));
    } catch {
      setOk(false);
    }
  }, []);

  return ok;
}

/* ------------------------------------------------------------------ pieces */

function ModeSwitch({ mode, onChange }: { mode: HeaderMode; onChange: (m: HeaderMode) => void }) {
  return (
    <Box
      role="group"
      aria-label="Header display"
      sx={{
        display: "flex",
        gap: 0.5,
        p: 0.375,
        borderRadius: 999,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {(["compass", "crown"] as const).map((m) => {
        const on = mode === m;
        return (
          <Box
            key={m}
            component="button"
            type="button"
            onClick={() => onChange(m)}
            aria-pressed={on}
            sx={{
              px: 1.5,
              py: 0.4,
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              fontFamily: "inherit",
              color: on ? "background.paper" : "text.secondary",
              bgcolor: on ? "text.primary" : "transparent",
              transition: "background-color 140ms ease, color 140ms ease",
              "&:hover": { color: on ? "background.paper" : "text.primary" },
              "&:focus-visible": { outline: `2px solid ${CROWN_COLORS.flameEdge}`, outlineOffset: 2 },
            }}
          >
            {m}
          </Box>
        );
      })}
    </Box>
  );
}

/**
 * The product rail under the crown.
 *
 * The compass makes its points hoverable because they are laid out in the plane
 * and can be hit. The crown's spires cannot be — they turn, they overlap, and
 * raycasting five thin spikes at 300px is a poor target. So the same five
 * products get a rail beneath, and hovering a name lights its spire. The
 * ornament stays an ornament; the navigation stays reachable.
 */
function ProductRail({
  focused,
  onFocus,
}: {
  focused: string | null;
  onFocus: (id: string | null) => void;
}) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 0.5, mt: 1 }}>
      {CROWN_PRODUCTS.map((app) => {
        const on = focused === app.id;
        const Icon = APP_ICONS[app.id];
        return (
          <Box
            key={app.id}
            component={Link}
            href={app.href}
            onMouseEnter={() => onFocus(app.id)}
            onMouseLeave={() => onFocus(null)}
            onFocus={() => onFocus(app.id)}
            onBlur={() => onFocus(null)}
            aria-label={`${app.title} — ${app.summary}`}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.3,
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 650,
              textDecoration: "none",
              border: "1px solid",
              borderColor: on ? app.accent : "divider",
              color: on ? app.accent : "text.secondary",
              bgcolor: on ? `${app.accent}14` : "transparent",
              transition: "color 140ms ease, border-color 140ms ease, background-color 140ms ease",
              "&:focus-visible": { outline: `2px solid ${app.accent}`, outlineOffset: 1 },
            }}
          >
            {Icon && (
              <Box sx={{ display: "grid", placeItems: "center", color: "inherit", lineHeight: 0 }}>
                <Icon size={12} />
              </Box>
            )}
            {app.title}
          </Box>
        );
      })}
    </Box>
  );
}

/* ------------------------------------------------------------------- stage */

export function CrownStage() {
  const [mode, setMode] = React.useState<HeaderMode>("compass");
  const [expanded, setExpanded] = React.useState(false);
  const [focused, setFocused] = React.useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const webgl = useHasWebGL();

  /*
    Restored after mount rather than in the initial state. This component is
    loaded with `ssr: false`, but React still renders it once before effects
    run, and reading storage during that render is the kind of thing that
    silently breaks the day someone makes this server-rendered.
  */
  React.useEffect(() => {
    const saved = window.sessionStorage?.getItem(STORAGE_KEY);
    if (saved === "crown" || saved === "compass") setMode(saved);
  }, []);

  const choose = React.useCallback((next: HeaderMode) => {
    setMode(next);
    try {
      window.sessionStorage?.setItem(STORAGE_KEY, next);
    } catch {
      /* Private-mode browsers throw on write. The choice just does not persist. */
    }
  }, []);

  const active = CROWN_PRODUCTS.find((a) => a.id === focused);

  return (
    <Box sx={{ width: 300, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <ModeSwitch mode={mode} onChange={choose} />
      </Box>

      {mode === "compass" ? (
        <CompassInner />
      ) : (
        <Box sx={{ minHeight: STAGE_H }}>
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
            The crown
          </Typography>

          {/*
            The crown gets its own dark ground. Amethyst and black flame are a
            palette for night; on the site's paper background the body vanished
            and the bands read as bright plastic hoops. A panel is also honest
            about what this is — a display case for an object, not a diagram
            drawn on the page.
          */}
          <Box
            sx={{
              position: "relative",
              height: 300,
              borderRadius: 2.5,
              overflow: "hidden",
              border: "1px solid",
              borderColor: `${CROWN_COLORS.flameEdge}33`,
              background:
                "radial-gradient(120% 100% at 50% 15%, #1e0b33 0%, #0d0716 55%, #050308 100%)",
            }}
          >
            {webgl && !reduced ? (
              <CrownScene focusedAppId={focused} />
            ) : (
              <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>
                <FlatCrown variant="amethyst" size={210} hero />
              </Box>
            )}
          </Box>

          <ProductRail focused={focused} onFocus={setFocused} />

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.5 }}>
              {active ? (
                active.summary
              ) : (
                <>
                  Five points, five products. Five bands, five groups.
                  <br />
                </>
              )}
            </Typography>
            <Box
              component="button"
              type="button"
              onClick={() => setExpanded(true)}
              sx={{
                mt: 0.75,
                px: 1.5,
                py: 0.45,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 999,
                bgcolor: "transparent",
                color: "text.primary",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                "&:hover": { borderColor: CROWN_COLORS.flameEdge, color: CROWN_COLORS.flameCore },
                "&:focus-visible": { outline: `2px solid ${CROWN_COLORS.flameEdge}`, outlineOffset: 2 },
              }}
            >
              Open full screen
            </Box>
          </Box>
        </Box>
      )}

      {expanded && (
        <CrownFullScreen
          onClose={() => setExpanded(false)}
          reducedMotion={reduced}
          hasWebGL={webgl}
        />
      )}
    </Box>
  );
}
