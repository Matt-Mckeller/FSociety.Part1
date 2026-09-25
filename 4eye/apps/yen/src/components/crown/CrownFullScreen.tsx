"use client";

/**
 * The crown at full size, with the applications chosen the way a television
 * chooses them.
 *
 * Two things are happening here and they are the same thing. The crown is the
 * single asset — nothing else on screen competes with it, it turns, it is lit.
 * And the picker beside it is the crown's own legend: each row is a band, each
 * tile is a point or a stone set into one, and moving the selection lights the
 * matching part of the object. Reading the crown and choosing where to go are
 * one gesture.
 *
 * Why a TV picker rather than the grid: on the page below, the grid is read
 * with a pointer and scanned all at once. Here the crown owns the eye, and what
 * is wanted is one obviously-selected thing that moves under the thumb. That is
 * a remote control, so it is built as one — arrow keys move, Enter opens,
 * Escape leaves, and the selection is never ambiguous.
 */

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { APP_GROUPS, appsInGroup, type AppEntry } from "@yen/content";

import { CROWN_COLORS } from "./crownModel";
import { DocumentedIcon } from "../AppIcons";

const CrownScene = dynamic(() => import("./CrownScene"), { ssr: false });

const FlatCrown = dynamic(
  () =>
    import("@4eye/web/Tiles/integration-layers/goals/LiquidCrown").then((m) => ({
      default: m.LiquidCrown,
    })),
  { ssr: false },
);

export interface CrownFullScreenProps {
  onClose: () => void;
  reducedMotion: boolean;
  hasWebGL: boolean;
}

/** The picker's rows, resolved once — the registry does not change at runtime. */
const ROWS: Array<{ id: string; title: string; blurb: string; apps: AppEntry[] }> = APP_GROUPS.map(
  (group) => ({ ...group, apps: appsInGroup(group.id) }),
).filter((row) => row.apps.length > 0);

export function CrownFullScreen({ onClose, reducedMotion, hasWebGL }: CrownFullScreenProps) {
  const [cursor, setCursor] = React.useState<[number, number]>([0, 0]);
  const shell = React.useRef<HTMLDivElement>(null);
  const tiles = React.useRef<Array<Array<HTMLAnchorElement | null>>>([]);

  const [row, col] = cursor;
  const selected = ROWS[row]?.apps[col];

  /*
    Body scroll is locked for as long as the overlay is open. Without this the
    page behind keeps scrolling under the crown on a trackpad, which is
    disorienting in a view that has no visible scroll position of its own.
  */
  React.useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  /* Opening moves focus onto the selection, so the first arrow press works. */
  React.useEffect(() => {
    tiles.current[0]?.[0]?.focus();
  }, []);

  const move = React.useCallback((dRow: number, dCol: number) => {
    setCursor(([r, c]) => {
      if (dRow !== 0) {
        const nextRow = Math.min(ROWS.length - 1, Math.max(0, r + dRow));
        /* Keep the column when moving between rows, clamped to the shorter row. */
        const nextCol = Math.min(c, ROWS[nextRow].apps.length - 1);
        tiles.current[nextRow]?.[nextCol]?.focus();
        return [nextRow, nextCol];
      }
      const nextCol = Math.min(ROWS[r].apps.length - 1, Math.max(0, c + dCol));
      tiles.current[r]?.[nextCol]?.focus();
      return [r, nextCol];
    });
  }, []);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          return;
        case "ArrowRight":
          e.preventDefault();
          move(0, 1);
          return;
        case "ArrowLeft":
          e.preventDefault();
          move(0, -1);
          return;
        case "ArrowDown":
          e.preventDefault();
          move(1, 0);
          return;
        case "ArrowUp":
          e.preventDefault();
          move(-1, 0);
          return;
        case "Tab": {
          /*
            A focus trap built from the tiles themselves rather than from a
            sentinel pair. Every focusable thing in here is either a tile or the
            close button, so Tab can simply be redirected onto the grid — which
            also means Tab and the arrow keys agree about where you are.
          */
          e.preventDefault();
          move(0, e.shiftKey ? -1 : 1);
          return;
        }
        default:
      }
    },
    [move, onClose],
  );

  return (
    <Box
      ref={shell}
      role="dialog"
      aria-modal="true"
      aria-label="The crown, and every application"
      onKeyDown={onKeyDown}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1400,
        display: "grid",
        gridTemplateColumns: { zero: "1fr", laptop: "minmax(0, 5fr) minmax(0, 7fr)" },
        gridTemplateRows: { zero: "minmax(240px, 40vh) 1fr", laptop: "1fr" },
        /* Dark, and its own ground — the crown is unreadable on the site's paper. */
        background: `radial-gradient(120% 90% at 30% 20%, #1a0a2e 0%, #0a0a0f 55%, #050508 100%)`,
        color: "#f5f3ff",
      }}
    >
      {/* ── the asset ── */}
      <Box sx={{ position: "relative", minWidth: 0 }}>
        {hasWebGL && !reducedMotion ? (
          <CrownScene
            focusedAppId={selected?.id ?? null}
            focusedBandId={ROWS[row]?.id ?? null}
            spin
            /* A little more air than the header panel, since it turns here. */
            fit={1.6}
          />
        ) : (
          <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>
            <FlatCrown variant="amethyst" size={300} hero />
          </Box>
        )}

        <Typography
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 16,
            textAlign: "center",
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: "rgba(245,243,255,0.5)",
          }}
        >
          {ROWS[row]?.title ?? "The crown"}
        </Typography>
      </Box>

      {/* ── the picker ── */}
      <Box
        sx={{
          minWidth: 0,
          overflowY: "auto",
          px: { zero: 2.5, laptop: 5 },
          py: { zero: 3, laptop: 5 },
          borderLeft: { laptop: "1px solid rgba(176,108,255,0.18)" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: { zero: 22, laptop: 30 }, fontWeight: 700, letterSpacing: -0.6 }}>
              {selected?.title ?? "Choose"}
            </Typography>
            <Typography
              sx={{
                fontSize: { zero: 13.5, laptop: 15 },
                lineHeight: 1.55,
                color: "rgba(245,243,255,0.66)",
                mt: 0.5,
                maxWidth: "62ch",
                minHeight: "3em",
              }}
            >
              {selected?.lede ?? "Arrow keys to move, Enter to open, Escape to leave."}
            </Typography>
          </Box>

          <Box
            component="button"
            type="button"
            onClick={onClose}
            aria-label="Close"
            sx={{
              flexShrink: 0,
              px: 1.5,
              py: 0.5,
              borderRadius: 999,
              border: "1px solid rgba(176,108,255,0.4)",
              bgcolor: "transparent",
              color: "inherit",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              "&:hover": { borderColor: CROWN_COLORS.flameEdge, background: "rgba(176,108,255,0.12)" },
              "&:focus-visible": { outline: `2px solid ${CROWN_COLORS.flameEdge}`, outlineOffset: 2 },
            }}
          >
            Esc
          </Box>
        </Box>

        {ROWS.map((group, r) => (
          <Box key={group.id} sx={{ mb: 3.5 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.3,
                textTransform: "uppercase",
                color: r === row ? CROWN_COLORS.flameEdge : "rgba(245,243,255,0.4)",
                mb: 1.25,
                transition: "color 140ms ease",
              }}
            >
              {group.title}
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5, overflowX: "auto", pb: 1 }}>
              {group.apps.map((app, c) => {
                const on = r === row && c === col;
                return (
                  <Box
                    key={app.id}
                    component={Link}
                    href={app.href}
                    ref={(el: HTMLAnchorElement | null) => {
                      if (!tiles.current[r]) tiles.current[r] = [];
                      tiles.current[r][c] = el;
                    }}
                    tabIndex={on ? 0 : -1}
                    onFocus={() => setCursor([r, c])}
                    onMouseEnter={() => setCursor([r, c])}
                    sx={{
                      flexShrink: 0,
                      width: { zero: 150, laptop: 176 },
                      p: 1.75,
                      borderRadius: 2,
                      textDecoration: "none",
                      color: "inherit",
                      border: "1px solid",
                      borderColor: on ? app.accent : "rgba(245,243,255,0.14)",
                      background: on
                        ? `linear-gradient(160deg, ${app.accent}33 0%, rgba(10,10,15,0.6) 70%)`
                        : "rgba(245,243,255,0.04)",
                      /* The selection ring is the whole point — make it unmissable. */
                      boxShadow: on ? `0 0 0 3px ${app.accent}44, 0 12px 32px rgba(0,0,0,0.5)` : "none",
                      transform: on ? "translateY(-4px)" : "none",
                      transition: reducedMotion
                        ? "border-color 120ms ease"
                        : "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease",
                      outline: "none",
                    }}
                  >
                    <Box sx={{ color: app.accent, mb: 1 }}>
                      <DocumentedIcon id={app.id} accent={app.accent} size={30} />
                    </Box>
                    <Typography sx={{ fontSize: 14.5, fontWeight: 680, lineHeight: 1.25 }}>
                      {app.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 11.5,
                        lineHeight: 1.45,
                        color: "rgba(245,243,255,0.55)",
                        mt: 0.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {app.summary}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
