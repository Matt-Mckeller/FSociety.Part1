"use client";

/**
 * TimelineArtView — remake of MM_ImageTimelineExample.
 *
 * Vertical EVENT TIMELINE with a darkness → light field (top heavy, bottom
 * lit). Hex index nodes, chamfered neon cards (pink / cyan / gold), and a
 * process dial that morphs Previous Process → Ongoing Processes (Plan.Chase(#1)
 * opening onto many currencies). Life / Lessons / Ascension stay as colour
 * rails; the spine copy is DARKNESS → LIGHT because light was never only at
 * the end.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";

import {
  ART_CHANNEL_META,
  ART_PHASE_META,
  ONGOING_PROCESS,
  TIMELINE_ARC,
  artOrderedEntries,
  type ArtChannel,
  type TimelineEntry,
} from "../model/timeline";
import { processesHref, PROCESS_HASH } from "@4eye/web/Tiles/profiles/lib/profileDeepLink";
import { significanceBand, VALENCE_CHIP_BLURB } from "../theme/brainTokens";

const FONT_MONO = '"IBM Plex Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace';
const FONT_SANS = '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif';

type ProcessMode = "previous" | "ongoing";
type GlyphKind = (typeof ONGOING_PROCESS.nodes)[number]["glyph"] | (typeof ONGOING_PROCESS.currencies)[number]["glyph"];

function channelOf(entry: TimelineEntry): ArtChannel {
  if (entry.artChannel) return entry.artChannel;
  if (entry.artMilestone || entry.significance >= 97) return "ascension";
  if (entry.valence === "positive") return "lessons";
  return "life";
}

function processGlyph(g: GlyphKind): string {
  switch (g) {
    case "heart":
      return "♥";
    case "money":
      return "$";
    case "target":
      return "◎";
    case "time":
      return "◷";
    case "eye":
      return "◉";
    case "bolt":
      return "⚡";
    case "grow":
      return "♣";
    case "crown":
      return "♔";
    default:
      return "·";
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function HexBadge({
  n,
  color,
  milestone,
  danger,
  active,
}: {
  n: number;
  color: string;
  milestone?: boolean;
  danger?: boolean;
  active?: boolean;
}) {
  return (
    <Box sx={{ position: "relative", width: 36, height: 40, flexShrink: 0 }}>
      <Box
        sx={{
          width: 36,
          height: 40,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: `linear-gradient(160deg, ${alpha(color, 0.95)}, ${alpha(color, 0.55)})`,
          boxShadow: active
            ? `0 0 20px ${alpha(color, 0.9)}, 0 0 8px ${alpha("#fff", 0.35)}, inset 0 0 8px ${alpha("#fff", 0.2)}`
            : `0 0 14px ${alpha(color, 0.65)}, inset 0 0 8px ${alpha("#fff", 0.15)}`,
          display: "grid",
          placeItems: "center",
          transform: active ? "scale(1.08)" : "scale(1)",
          transition: "transform .2s ease, box-shadow .2s ease",
        }}
      >
        <Typography
          sx={{
            fontFamily: FONT_MONO,
            fontSize: "0.78rem",
            fontWeight: 800,
            color: "#0b1020",
            lineHeight: 1,
          }}
        >
          {n}
        </Typography>
      </Box>
      {milestone && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: -6,
            right: -8,
            fontSize: 14,
            filter: `drop-shadow(0 0 6px ${alpha("#fbbf24", 0.9)})`,
          }}
        >
          ★
        </Box>
      )}
      {danger && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: -4,
            right: -10,
            fontSize: 13,
            filter: `drop-shadow(0 0 6px ${alpha("#f43f5e", 0.9)})`,
          }}
        >
          ☠
        </Box>
      )}
    </Box>
  );
}

function ChamferCard({
  entry,
  index,
  selected,
  dimmed,
  onSelect,
}: {
  entry: TimelineEntry;
  index: number;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  const channel = channelOf(entry);
  const meta = ART_CHANNEL_META[channel];
  const color = meta.color;
  const band = significanceBand(entry.significance);
  const large = Boolean(entry.artMilestone) || entry.significance >= 99;
  const lit = entry.artPhase === "light";
  const hasDepth = Boolean(entry.learned || entry.result);

  return (
    <Box
      component="button"
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      sx={{
        display: "block",
        width: "100%",
        p: 0,
        m: 0,
        border: 0,
        bgcolor: "transparent",
        font: "inherit",
        textAlign: "left",
        cursor: "pointer",
        opacity: dimmed ? 0.38 : 1,
        filter: dimmed ? "saturate(0.55)" : "none",
        transition: "opacity .25s ease, filter .25s ease, transform .2s ease",
        transform: selected ? "translateX(4px)" : "none",
        "&:hover": { opacity: dimmed ? 0.72 : 1 },
        "&:focus-visible": {
          outline: `2px solid ${alpha(color, 0.7)}`,
          outlineOffset: 3,
          borderRadius: 1,
        },
      }}
    >
      <Stack direction="row" sx={{ alignItems: "stretch", gap: 1.25 }}>
        <HexBadge
          n={entry.artOrder ?? index + 1}
          color={color}
          milestone={entry.artMilestone}
          danger={entry.artDanger}
          active={selected}
        />
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: large ? 1.75 : 1.4,
            py: large ? 1.35 : 1.05,
            clipPath:
              "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
            border: `1.5px solid ${alpha(color, selected || lit ? 0.98 : 0.85)}`,
            bgcolor: alpha(color, selected || large || lit ? 0.18 : 0.08),
            boxShadow: selected
              ? `0 0 28px ${alpha(color, 0.45)}, 0 0 14px ${alpha("#fde68a", 0.2)}, inset 0 0 22px ${alpha(color, 0.1)}`
              : lit
                ? `0 0 ${large ? 28 : 18}px ${alpha("#fde68a", 0.28)}, 0 0 ${large ? 22 : 12}px ${alpha(color, 0.35)}, inset 0 0 20px ${alpha("#fde68a", 0.08)}`
                : `0 0 ${large ? 22 : 12}px ${alpha(color, 0.28)}, inset 0 0 18px ${alpha(color, 0.06)}`,
            backgroundImage:
              selected || large || lit
                ? `linear-gradient(135deg, ${alpha(lit || selected ? "#fde68a" : color, 0.22)}, transparent 55%)`
                : undefined,
            transition: "box-shadow .2s ease, background-color .2s ease, border-color .2s ease",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "baseline", gap: 0.75, flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontFamily: FONT_MONO,
                fontSize: large ? "0.78rem" : "0.7rem",
                fontWeight: 700,
                color: alpha("#f8fafc", 0.96),
                lineHeight: 1.3,
                letterSpacing: 0.2,
                wordBreak: "break-word",
                flex: 1,
                minWidth: 0,
              }}
            >
              {entry.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: FONT_MONO,
                fontSize: "0.55rem",
                fontWeight: 800,
                color: alpha(band.color, 0.95),
                letterSpacing: 0.4,
                flexShrink: 0,
              }}
            >
              {band.rank10}/10
            </Typography>
          </Stack>

          {entry.summary && (
            <Typography
              sx={{
                mt: 0.45,
                fontFamily: FONT_SANS,
                fontSize: "0.68rem",
                color: alpha("#cbd5e1", 0.88),
                lineHeight: 1.4,
              }}
            >
              {entry.summary}
            </Typography>
          )}

          <Stack
            direction="row"
            sx={{
              mt: 0.65,
              gap: 0.7,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: FONT_MONO,
                fontSize: "0.52rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: alpha(color, 0.9),
              }}
            >
              {meta.label.toUpperCase()}
            </Typography>
            {entry.artPhase && (
              <Typography
                sx={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.52rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: alpha(ART_PHASE_META[entry.artPhase].color, 0.85),
                }}
              >
                · {ART_PHASE_META[entry.artPhase].label.toUpperCase()}
              </Typography>
            )}
            {hasDepth && (
              <Typography
                sx={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.52rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: alpha("#94a3b8", selected ? 0.95 : 0.65),
                  ml: "auto",
                }}
              >
                {selected ? "HIDE DETAIL" : "OPEN DETAIL"}
              </Typography>
            )}
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateRows: selected ? "1fr" : "0fr",
              transition: "grid-template-rows .28s ease",
            }}
          >
            <Box sx={{ overflow: "hidden", minHeight: 0 }}>
              <Stack sx={{ gap: 0.65, pt: 1, mt: 0.35, borderTop: `1px solid ${alpha(color, 0.28)}` }}>
                <Typography sx={{ fontSize: "0.62rem", color: alpha("#e2e8f0", 0.78), lineHeight: 1.4 }}>
                  {band.blurb} · {VALENCE_CHIP_BLURB[entry.valence]}
                </Typography>
                {entry.artPhase && (
                  <Typography sx={{ fontSize: "0.62rem", color: alpha("#cbd5e1", 0.75), lineHeight: 1.4 }}>
                    {ART_PHASE_META[entry.artPhase].blurb}
                  </Typography>
                )}
                {entry.learned && (
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.52rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        color: alpha("#fde68a", 0.9),
                        mb: 0.25,
                      }}
                    >
                      LEARNED
                    </Typography>
                    <Typography sx={{ fontSize: "0.66rem", color: alpha("#f8fafc", 0.88), lineHeight: 1.45 }}>
                      {entry.learned}
                    </Typography>
                  </Box>
                )}
                {entry.result && (
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: FONT_MONO,
                        fontSize: "0.52rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        color: alpha("#67e8f9", 0.9),
                        mb: 0.25,
                      }}
                    >
                      RESULT
                    </Typography>
                    <Typography sx={{ fontSize: "0.66rem", color: alpha("#f8fafc", 0.88), lineHeight: 1.45 }}>
                      {entry.result}
                    </Typography>
                  </Box>
                )}
                {(entry.tags?.length ?? 0) > 0 && (
                  <Stack direction="row" sx={{ gap: 0.5, flexWrap: "wrap", pt: 0.25 }}>
                    {entry.tags!.slice(0, 6).map((t) => (
                      <Typography
                        key={t}
                        sx={{
                          fontFamily: FONT_MONO,
                          fontSize: "0.5rem",
                          fontWeight: 700,
                          px: 0.55,
                          py: 0.15,
                          borderRadius: 0.5,
                          border: `1px solid ${alpha(color, 0.35)}`,
                          color: alpha("#cbd5e1", 0.8),
                        }}
                      >
                        {t}
                      </Typography>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

function PreviousLoop({ accent, active }: { accent: string; active: boolean }) {
  const nodes = ONGOING_PROCESS.nodes;
  const positions = [
    { top: 40, left: "50%", transform: "translateX(-50%)" },
    { bottom: 30, right: 16 },
    { bottom: 30, left: 12 },
  ] as const;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
        transition: "opacity .45s ease",
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 200 200"
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          "@keyframes artSpinDash": {
            to: { strokeDashoffset: -120 },
          },
          "& path": {
            animation: active ? "artSpinDash 8s linear infinite" : "none",
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          },
        }}
      >
        <defs>
          <marker id="art-arrow-prev" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={alpha(accent, 0.85)} />
          </marker>
        </defs>
        <path
          d="M100 58 A52 52 0 0 1 148 130"
          fill="none"
          stroke={alpha(accent, 0.55)}
          strokeWidth="1.5"
          strokeDasharray="6 8"
          markerEnd="url(#art-arrow-prev)"
        />
        <path
          d="M140 145 A52 52 0 0 1 60 145"
          fill="none"
          stroke={alpha(accent, 0.55)}
          strokeWidth="1.5"
          strokeDasharray="6 8"
          markerEnd="url(#art-arrow-prev)"
        />
        <path
          d="M52 130 A52 52 0 0 1 100 58"
          fill="none"
          stroke={alpha(accent, 0.55)}
          strokeWidth="1.5"
          strokeDasharray="6 8"
          markerEnd="url(#art-arrow-prev)"
        />
      </Box>

      {nodes.map((node, i) => (
        <Stack
          key={node.id}
          sx={{
            position: "absolute",
            ...positions[i],
            alignItems: "center",
            gap: 0.25,
            maxWidth: 88,
          }}
        >
          <Typography sx={{ fontSize: i === 0 ? 18 : 16, color: accent, lineHeight: 1 }}>
            {processGlyph(node.glyph)}
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT_MONO,
              fontSize: "0.55rem",
              fontWeight: 700,
              color: alpha("#fde68a", 0.95),
              textAlign: "center",
              lineHeight: 1.25,
            }}
          >
            {node.label}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}

function OngoingHub({
  accent,
  active,
  focused,
  onFocus,
}: {
  accent: string;
  active: boolean;
  focused: string | null;
  onFocus: (id: string | null) => void;
}) {
  const currencies = ONGOING_PROCESS.currencies;
  const r = 68;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
        transition: "opacity .45s ease",
      }}
    >
      {/* Orbit ring */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: "50%",
          top: "52%",
          width: r * 2,
          height: r * 2,
          ml: `-${r}px`,
          mt: `-${r}px`,
          borderRadius: "50%",
          border: `1px dashed ${alpha(accent, 0.4)}`,
          boxShadow: `0 0 24px ${alpha(accent, 0.15)}`,
          "@keyframes artOrbitPulse": {
            "0%, 100%": { opacity: 0.55 },
            "50%": { opacity: 1 },
          },
          animation: active ? "artOrbitPulse 3.2s ease-in-out infinite" : "none",
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      />

      {/* Spokes */}
      <Box
        component="svg"
        viewBox="0 0 200 200"
        aria-hidden
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        {currencies.map((_, i) => {
          const angle = (i / currencies.length) * Math.PI * 2 - Math.PI / 2;
          const x = 100 + Math.cos(angle) * r;
          const y = 104 + Math.sin(angle) * r;
          return (
            <line
              key={i}
              x1={100}
              y1={104}
              x2={x}
              y2={y}
              stroke={alpha(accent, 0.28)}
              strokeWidth="1"
            />
          );
        })}
      </Box>

      {/* Center — Plan.Chase(#1) → Processes lens */}
      <Tooltip title={`${ONGOING_PROCESS.planChase.blurb} · Open Processes`} arrow>
        <Stack
          component="a"
          href={processesHref(PROCESS_HASH.selfOperational)}
          sx={{
            position: "absolute",
            left: "50%",
            top: "52%",
            transform: "translate(-50%, -50%)",
            alignItems: "center",
            gap: 0.35,
            px: 1,
            py: 0.7,
            borderRadius: 1.5,
            border: `1.5px solid ${alpha(accent, 0.85)}`,
            bgcolor: alpha("#0b1020", 0.85),
            boxShadow: `0 0 22px ${alpha(accent, 0.45)}`,
            zIndex: 2,
            maxWidth: 104,
            textDecoration: "none",
            cursor: "pointer",
            color: "inherit",
            "&:hover": {
              borderColor: accent,
              boxShadow: `0 0 28px ${alpha(accent, 0.6)}`,
            },
          }}
        >
          <Typography sx={{ fontSize: 16, color: accent, lineHeight: 1 }}>◎</Typography>
          <Typography
            sx={{
              fontFamily: FONT_MONO,
              fontSize: "0.55rem",
              fontWeight: 800,
              color: alpha("#fde68a", 0.98),
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {ONGOING_PROCESS.planChase.label}
          </Typography>
        </Stack>
      </Tooltip>

      {/* Currency coins on the orbit */}
      {currencies.map((c, i) => {
        const angle = (i / currencies.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * (r / 2);
        const y = 52 + Math.sin(angle) * (r / 2);
        const isFocused = focused === c.id;
        return (
          <Tooltip key={c.id} title={`${c.label} — ${c.blurb}`} arrow>
            <Box
              component="button"
              type="button"
              aria-pressed={isFocused}
              onClick={(e) => {
                e.stopPropagation();
                onFocus(isFocused ? null : c.id);
              }}
              sx={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) scale(${isFocused ? 1.18 : 1})`,
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: `1.5px solid ${alpha(c.color, isFocused ? 1 : 0.75)}`,
                bgcolor: alpha("#0b1020", 0.9),
                boxShadow: `0 0 ${isFocused ? 16 : 10}px ${alpha(c.color, isFocused ? 0.75 : 0.4)}`,
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                p: 0,
                zIndex: isFocused ? 3 : 1,
                transition: "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
                "&:hover": {
                  transform: "translate(-50%, -50%) scale(1.14)",
                  boxShadow: `0 0 16px ${alpha(c.color, 0.7)}`,
                },
                "&:focus-visible": {
                  outline: `2px solid ${alpha(c.color, 0.8)}`,
                  outlineOffset: 2,
                },
              }}
            >
              <Typography sx={{ fontSize: 13, color: c.color, lineHeight: 1, fontWeight: 700 }}>
                {processGlyph(c.glyph)}
              </Typography>
            </Box>
          </Tooltip>
        );
      })}

      {focused && (
        <Typography
          sx={{
            position: "absolute",
            bottom: 8,
            left: 10,
            right: 10,
            textAlign: "center",
            fontFamily: FONT_MONO,
            fontSize: "0.52rem",
            fontWeight: 700,
            color: alpha("#fde68a", 0.95),
            letterSpacing: 0.3,
          }}
        >
          {currencies.find((c) => c.id === focused)?.label} coin
        </Typography>
      )}
    </Box>
  );
}

function OngoingProcess() {
  const accent = "#f59e0b";
  const [mode, setMode] = React.useState<ProcessMode>("previous");
  const [pinned, setPinned] = React.useState(false);
  const [focusedCurrency, setFocusedCurrency] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (pinned || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setMode((m) => (m === "previous" ? "ongoing" : "previous"));
      setFocusedCurrency(null);
    }, 5200);
    return () => window.clearInterval(id);
  }, [pinned]);

  const title = mode === "previous" ? ONGOING_PROCESS.previousTitle : ONGOING_PROCESS.ongoingTitle;

  return (
    <Box sx={{ width: "100%", maxWidth: 240, mx: "auto" }}>
      <Stack direction="row" sx={{ justifyContent: "center", gap: 0.6, mb: 1 }}>
        {(["previous", "ongoing"] as const).map((m) => (
          <Box
            key={m}
            component="button"
            type="button"
            aria-pressed={mode === m}
            onClick={() => {
              setMode(m);
              setPinned(true);
              setFocusedCurrency(null);
            }}
            sx={{
              border: `1px solid ${alpha(accent, mode === m ? 0.7 : 0.25)}`,
              bgcolor: mode === m ? alpha(accent, 0.16) : "transparent",
              color: mode === m ? alpha("#fde68a", 0.98) : alpha("#94a3b8", 0.85),
              borderRadius: 999,
              px: 0.9,
              py: 0.3,
              fontFamily: FONT_MONO,
              fontSize: "0.52rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background-color .15s, border-color .15s, color .15s",
              "&:hover": { borderColor: alpha(accent, 0.55), bgcolor: alpha(accent, 0.1) },
              "&:focus-visible": { outline: `2px solid ${alpha(accent, 0.6)}`, outlineOffset: 2 },
            }}
          >
            {m === "previous" ? "Previous" : "Ongoing"}
          </Box>
        ))}
      </Stack>

      <Box
        role="group"
        aria-label={title}
        onClick={() => {
          setMode((m) => (m === "previous" ? "ongoing" : "previous"));
          setPinned(true);
          setFocusedCurrency(null);
        }}
        sx={{
          position: "relative",
          width: 200,
          height: 210,
          mx: "auto",
          borderRadius: "50%",
          border: `1.5px dashed ${alpha(accent, 0.55)}`,
          boxShadow: `0 0 40px ${alpha(accent, 0.25)}, inset 0 0 30px ${alpha(accent, 0.08)}`,
          bgcolor: alpha("#0b1020", 0.55),
          cursor: "pointer",
          transition: "box-shadow .3s ease, border-color .3s ease",
          "&:hover": {
            boxShadow: `0 0 48px ${alpha(accent, 0.35)}, inset 0 0 34px ${alpha(accent, 0.12)}`,
            borderColor: alpha(accent, 0.75),
          },
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: 10,
            left: 8,
            right: 8,
            textAlign: "center",
            fontFamily: FONT_MONO,
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: alpha(accent, 0.95),
            zIndex: 4,
            transition: "opacity .3s ease",
          }}
        >
          ♔ {title}
        </Typography>

        <PreviousLoop accent={accent} active={mode === "previous"} />
        <OngoingHub
          accent={accent}
          active={mode === "ongoing"}
          focused={focusedCurrency}
          onFocus={setFocusedCurrency}
        />
      </Box>

      <Typography
        sx={{
          mt: 1,
          textAlign: "center",
          fontFamily: FONT_SANS,
          fontSize: "0.58rem",
          color: alpha("#94a3b8", 0.85),
          lineHeight: 1.4,
          maxWidth: "28ch",
          mx: "auto",
        }}
      >
        {mode === "previous"
          ? "The old chase loop — sex, money, then a plan."
          : "Plan.Chase(#1) opens onto many currencies. Tap a coin."}
      </Typography>
    </Box>
  );
}

export function TimelineArtView({ entries }: { entries: TimelineEntry[] }) {
  const ordered = React.useMemo(() => artOrderedEntries(entries), [entries]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSelectedId(null);
  }, [ordered]);

  if (ordered.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography sx={{ color: alpha("#e2e8f0", 0.7), fontSize: "0.85rem" }}>
          Nothing in the record matches that.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: alpha("#a855f7", 0.25),
        background: `
          radial-gradient(ellipse 90% 55% at 50% 0%, ${alpha("#020617", 0.95)} 0%, transparent 55%),
          radial-gradient(ellipse 80% 50% at 20% 15%, ${alpha("#7c3aed", 0.28)} 0%, transparent 55%),
          radial-gradient(ellipse 70% 55% at 80% 85%, ${alpha("#fbbf24", 0.22)} 0%, transparent 55%),
          radial-gradient(ellipse 60% 40% at 40% 100%, ${alpha("#fde68a", 0.16)} 0%, transparent 50%),
          linear-gradient(180deg, #03050c 0%, #0a0f1c 42%, #12100a 78%, #1a1408 100%)
        `,
        boxShadow: `inset 0 0 80px ${alpha("#020617", 0.7)}`,
        px: { zero: 1.5, laptop: 2.5 },
        py: 2.5,
      }}
    >
      {/* Constellation / circuit field */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.45,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(1px 1px at 12% 18%, ${alpha("#c4b5fd", 0.7)} 0, transparent 2px),
            radial-gradient(1px 1px at 28% 42%, ${alpha("#67e8f9", 0.55)} 0, transparent 2px),
            radial-gradient(1.5px 1.5px at 55% 22%, ${alpha("#f9a8d4", 0.5)} 0, transparent 3px),
            radial-gradient(1px 1px at 72% 58%, ${alpha("#a5f3fc", 0.45)} 0, transparent 2px),
            radial-gradient(1px 1px at 88% 30%, ${alpha("#e9d5ff", 0.5)} 0, transparent 2px),
            radial-gradient(1px 1px at 40% 78%, ${alpha("#67e8f9", 0.4)} 0, transparent 2px),
            linear-gradient(90deg, transparent 0%, ${alpha("#22d3ee", 0.08)} 40%, transparent 70%),
            linear-gradient(0deg, transparent 0%, ${alpha("#a855f7", 0.06)} 50%, transparent 100%)
          `,
        }}
      />
      {/* Corner circuit strokes */}
      <Box
        aria-hidden
        component="svg"
        viewBox="0 0 120 80"
        sx={{ position: "absolute", top: 8, left: 8, width: 110, height: 70, opacity: 0.45, pointerEvents: "none" }}
      >
        <path
          d="M4 40 H28 M28 40 V18 H52 M28 40 V62 H52 M52 18 H70 M52 62 H70"
          stroke="#22d3ee"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="70" cy="18" r="2.5" fill="#22d3ee" />
        <circle cx="70" cy="62" r="2.5" fill="#a855f7" />
      </Box>

      {/* Header — spine is darkness → light; rails stay as secondary */}
      <Box sx={{ position: "relative", mb: 2.5, textAlign: "center" }}>
        <Typography
          sx={{
            fontFamily: FONT_SANS,
            fontSize: { zero: "1.15rem", laptop: "1.35rem" },
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "#f8fafc",
            textShadow: `0 0 24px ${alpha("#a855f7", 0.45)}`,
          }}
        >
          {TIMELINE_ARC.title}
        </Typography>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mt: 0.75,
            flexWrap: "wrap",
          }}
        >
          <Tooltip title={TIMELINE_ARC.lede} arrow>
            <Typography
              sx={{
                fontFamily: FONT_MONO,
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                color: alpha("#94a3b8", 0.95),
                textShadow: `0 0 12px ${alpha("#64748b", 0.55)}`,
              }}
            >
              {TIMELINE_ARC.arrow[0]}
            </Typography>
          </Tooltip>
          <Typography sx={{ color: alpha("#fde68a", 0.75), fontSize: "0.75rem", fontWeight: 700 }}>→</Typography>
          <Tooltip title={ART_PHASE_META.light.blurb} arrow>
            <Typography
              sx={{
                fontFamily: FONT_MONO,
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                color: "#fde68a",
                textShadow: `0 0 14px ${alpha("#fbbf24", 0.65)}`,
              }}
            >
              {TIMELINE_ARC.arrow[1]}
            </Typography>
          </Tooltip>
        </Stack>
        <Typography
          sx={{
            mt: 0.85,
            mx: "auto",
            maxWidth: "52ch",
            fontSize: "0.68rem",
            lineHeight: 1.45,
            color: alpha("#cbd5e1", 0.72),
          }}
        >
          {TIMELINE_ARC.lede}
        </Typography>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: 0.85,
            mt: 1.1,
            flexWrap: "wrap",
          }}
        >
          {(["life", "lessons", "ascension"] as const).map((ch, i) => (
            <React.Fragment key={ch}>
              {i > 0 && (
                <Typography sx={{ color: alpha("#64748b", 0.6), fontSize: "0.65rem", fontWeight: 700 }}>
                  ·
                </Typography>
              )}
              <Tooltip title={ART_CHANNEL_META[ch].blurb} arrow>
                <Typography
                  sx={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: alpha(ART_CHANNEL_META[ch].color, 0.9),
                  }}
                >
                  {ART_CHANNEL_META[ch].arrow}
                </Typography>
              </Tooltip>
            </React.Fragment>
          ))}
        </Stack>
        <Typography
          sx={{
            mt: 1,
            fontFamily: FONT_MONO,
            fontSize: "0.52rem",
            letterSpacing: "0.1em",
            color: alpha("#64748b", 0.9),
          }}
        >
          TAP A NODE TO OPEN LEARNED / RESULT
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { zero: "1fr", laptop: "minmax(0, 1fr) 240px" },
          alignItems: "start",
        }}
      >
        {/* Vertical rail + cards */}
        <Box sx={{ position: "relative", pl: 0.5 }}>
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: 17,
              top: 8,
              bottom: 8,
              width: 2,
              background: `linear-gradient(180deg, ${alpha("#ec4899", 0.7)}, ${alpha("#22d3ee", 0.7)}, ${alpha("#fbbf24", 0.8)})`,
              boxShadow: `0 0 12px ${alpha("#22d3ee", 0.35)}`,
              borderRadius: 999,
            }}
          />
          <Stack sx={{ gap: 1.35, position: "relative" }}>
            {ordered.map((entry, i) => (
              <ChamferCard
                key={entry.id}
                entry={entry}
                index={i}
                selected={selectedId === entry.id}
                dimmed={selectedId != null && selectedId !== entry.id}
                onSelect={() => setSelectedId((prev) => (prev === entry.id ? null : entry.id))}
              />
            ))}
          </Stack>
        </Box>

        {/* Process dial — sticky mid-right like the source art */}
        <Box
          sx={{
            position: { laptop: "sticky" },
            top: { laptop: 12 },
            pt: { zero: 1, laptop: 4 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <OngoingProcess />
        </Box>
      </Box>

      {/* Channel legend */}
      <Stack
        direction="row"
        sx={{
          mt: 2.5,
          gap: 1.5,
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {(["life", "lessons", "ascension"] as const).map((ch) => (
          <Tooltip key={ch} title={ART_CHANNEL_META[ch].blurb} arrow>
            <Stack direction="row" sx={{ alignItems: "center", gap: 0.6 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  bgcolor: ART_CHANNEL_META[ch].color,
                  boxShadow: `0 0 8px ${alpha(ART_CHANNEL_META[ch].color, 0.7)}`,
                }}
              />
              <Typography
                sx={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  color: alpha("#e2e8f0", 0.75),
                  letterSpacing: 0.4,
                }}
              >
                {ART_CHANNEL_META[ch].label}
              </Typography>
            </Stack>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
}
