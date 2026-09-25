"use client";

/**
 * Shared Pure-text catalogue chrome — title + blurb cards, optional chip /
 * quiet legendary, clipped scrollport with band jumps and a Show-all escape.
 *
 * Used by Systems and Workshop. Nested scroll is useful for a glanceable home
 * section and hostile for keyboard / mobile; Show all removes the clip so the
 * whole catalogue participates in page scroll when someone is actually reading.
 */

import * as React from "react";
import Link from "next/link";
import { Box, Chip, Typography, alpha } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import { RARITY_COLOR } from "@yen/content/character/equipment";

export interface PureTextCardModel {
  id: string;
  title: string;
  blurb: string;
  href: string;
  rarity?: "legendary";
  chip?: string;
  /** Quiet honesty line under the blurb (e.g. stub / same essay section). */
  note?: string;
  /** Tooltip for the quiet diamond when legendary. */
  legendaryTitle?: string;
}

export function QuietLegendaryMark({
  color,
  title = "Highest-value data",
}: {
  color: string;
  title?: string;
}) {
  return (
    <Box
      component="span"
      title={title}
      aria-label={title}
      sx={{
        display: "inline-flex",
        width: 10,
        height: 10,
        transform: "rotate(45deg)",
        bgcolor: color,
        border: "1px solid",
        borderColor: `${color}aa`,
        flexShrink: 0,
        opacity: 0.9,
      }}
    />
  );
}

export function PureTextCard({
  h,
  readable = false,
}: {
  h: PureTextCardModel;
  /** Slightly larger type + air — for catalogues meant to be read, not glanced. */
  readable?: boolean;
}) {
  const legendary = RARITY_COLOR.legendary;
  const edge = h.rarity ? legendary : undefined;

  return (
    <Box
      component={Link}
      href={h.href}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: readable ? 1 : 0.75,
        p: readable ? 2 : 1.75,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: edge ? `${edge}55` : "divider",
        borderLeft: edge ? `3px solid ${edge}` : "1px solid",
        borderLeftColor: edge ?? "divider",
        textDecoration: "none",
        color: "inherit",
        bgcolor: "background.paper",
        minWidth: 0,
        scrollSnapAlign: "start",
        "&:hover": { borderColor: edge ?? "text.primary" },
        "&:focus-visible": {
          outline: (t) => `2px solid ${edge ?? t.palette.primary.main}`,
          outlineOffset: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        {h.rarity && (
          <QuietLegendaryMark color={legendary} title={h.legendaryTitle ?? "Highest-value data"} />
        )}
        <Typography
          sx={{ fontSize: readable ? 15.5 : 14, fontWeight: 700, flex: 1, minWidth: 0, lineHeight: 1.3 }}
        >
          {h.title}
        </Typography>
        {h.chip && (
          <Chip size="small" label={h.chip} sx={{ height: 20, fontSize: 10, fontWeight: 700 }} />
        )}
      </Box>
      <Typography
        sx={{
          fontSize: readable ? 13.5 : 12.5,
          lineHeight: readable ? 1.55 : 1.45,
          color: "text.secondary",
        }}
      >
        {h.blurb}
      </Typography>
      {h.note && (
        <Typography
          sx={{
            fontSize: 11.5,
            lineHeight: 1.45,
            color: "text.disabled",
          }}
        >
          {h.note}
        </Typography>
      )}
    </Box>
  );
}

export function PureTextCardGrid({
  items,
  readable = false,
}: {
  items: readonly PureTextCardModel[];
  readable?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: readable ? 1.5 : 1.25,
        gridTemplateColumns: readable
          ? {
              zero: "1fr",
              tablet: "repeat(2, minmax(0, 1fr))",
              laptop: "repeat(2, minmax(0, 1fr))",
              laptopL: "repeat(3, minmax(0, 1fr))",
            }
          : {
              zero: "1fr",
              tablet: "repeat(2, minmax(0, 1fr))",
              laptop: "repeat(3, minmax(0, 1fr))",
              laptopL: "repeat(4, minmax(0, 1fr))",
            },
      }}
    >
      {items.map((h) => (
        <PureTextCard key={h.id} h={h} readable={readable} />
      ))}
    </Box>
  );
}

export interface PureTextBand {
  id: string;
  label: string;
  blurb: string;
  items: readonly PureTextCardModel[];
}

/**
 * Clipped catalogue: band jump chips + Pure-text grids.
 * Show all expands into the page so nested scroll is optional, not mandatory.
 */
export function PureTextCatalogue({
  eyebrow,
  intro,
  footer,
  bands,
  maxHeight,
  storageKey,
  defaultExpanded = false,
  readable = false,
}: {
  eyebrow: string;
  /** One orientation sentence under the eyebrow — what this catalogue is. */
  intro?: string;
  footer?: string;
  bands: readonly PureTextBand[];
  maxHeight?: { zero?: number; tablet?: number; laptop?: number };
  /** Persist Show-all preference per catalogue. */
  storageKey?: string;
  /** Start fully expanded (reading-first catalogues). */
  defaultExpanded?: boolean;
  /** Wider cards + larger type for comprehension. */
  readable?: boolean;
}) {
  const heights = maxHeight ?? { zero: 380, tablet: 420, laptop: 480 };
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    try {
      const stored = storageKey ? window.localStorage.getItem(storageKey) : null;
      if (stored === "1") {
        setExpanded(true);
        return;
      }
      if (stored === "0") {
        setExpanded(false);
        return;
      }
      if (defaultExpanded) {
        setExpanded(true);
        return;
      }
      /* Phones fight nested scroll — expand by default until the visitor chooses. */
      if (window.matchMedia("(max-width: 720px)").matches) setExpanded(true);
    } catch {
      /* ignore */
    }
  }, [storageKey, defaultExpanded]);

  const toggleExpanded = () => {
    setExpanded((v) => {
      const next = !v;
      if (storageKey) {
        try {
          window.localStorage.setItem(storageKey, next ? "1" : "0");
        } catch {
          /* ignore */
        }
      }
      return next;
    });
  };

  const jumpTo = (bandId: string) => {
    const root = scrollerRef.current;
    const el = root?.querySelector<HTMLElement>(`[data-band="${bandId}"]`);
    if (!el) return;
    if (expanded) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      root?.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
    }
  };

  const total = bands.reduce((n, b) => n + b.items.length, 0);

  return (
    <Box component="section" sx={{ mb: 2.5 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 1,
          mb: 1.5,
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.1,
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            {eyebrow}
          </Typography>
          {intro && (
            <Typography
              sx={{
                mt: 0.75,
                fontSize: readable ? 14.5 : 13.5,
                lineHeight: 1.5,
                color: "text.primary",
                maxWidth: "62ch",
              }}
            >
              {intro}
            </Typography>
          )}
        </Box>
        <Box
          component="button"
          type="button"
          onClick={toggleExpanded}
          aria-pressed={expanded}
          sx={{
            appearance: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            px: 1.1,
            py: 0.4,
            borderRadius: 999,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            color: "text.secondary",
            font: "inherit",
            fontSize: 11.5,
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
            "&:hover": { color: "text.primary", borderColor: "text.disabled" },
          }}
        >
          {expanded ? <UnfoldLessRoundedIcon sx={{ fontSize: 16 }} /> : <UnfoldMoreRoundedIcon sx={{ fontSize: 16 }} />}
          {expanded ? "Clip catalogue" : "Show all"}
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: (t) => alpha(t.palette.text.primary, 0.015),
          overflow: "hidden",
        }}
      >
        {/* Band jumps — sit outside the scroll clip so they stay usable. */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.6,
            px: { zero: 1.5, tablet: 2 },
            pt: 1.35,
            pb: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          {bands.map((band) => (
            <Box
              key={band.id}
              component="button"
              type="button"
              onClick={() => jumpTo(band.id)}
              sx={{
                appearance: "none",
                font: "inherit",
                cursor: "pointer",
                px: 1.05,
                py: 0.35,
                borderRadius: 999,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "transparent",
                color: "text.secondary",
                fontSize: 11,
                fontWeight: 750,
                letterSpacing: 0.04,
                textTransform: "uppercase",
                "&:hover": { color: "text.primary", borderColor: "text.disabled" },
              }}
            >
              {band.label}
              <Box component="span" sx={{ ml: 0.55, opacity: 0.55, fontWeight: 650 }}>
                {band.items.length}
              </Box>
            </Box>
          ))}
          <Typography sx={{ ml: "auto", fontSize: 11, color: "text.disabled", alignSelf: "center" }}>
            {total} cards
          </Typography>
        </Box>

        <Box
          ref={scrollerRef}
          sx={{
            maxHeight: expanded ? "none" : heights,
            overflowY: expanded ? "visible" : "auto",
            overflowX: "hidden",
            scrollSnapType: expanded ? "none" : "y proximity",
            p: { zero: 1.5, tablet: 2 },
            ...(!expanded && {
              maskImage: "linear-gradient(180deg, #000 0%, #000 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 90%, transparent 100%)",
              "&:focus-within": {
                maskImage: "none",
                WebkitMaskImage: "none",
              },
            }),
          }}
        >
          {bands.map((band) => {
            if (band.items.length === 0) return null;
            return (
              <Box
                key={band.id}
                data-band={band.id}
                id={`catalogue-band-${band.id}`}
                sx={{ mb: 2.25, "&:last-child": { mb: 1 }, scrollMarginTop: 12 }}
              >
                <Box sx={{ mb: readable ? 1.35 : 1 }}>
                  <Typography
                    sx={{
                      fontSize: readable ? 12 : 11,
                      fontWeight: 800,
                      letterSpacing: 1.05,
                      textTransform: "uppercase",
                      color: "text.secondary",
                      mb: 0.35,
                    }}
                  >
                    {band.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: readable ? 13.5 : 12.5,
                      lineHeight: 1.45,
                      color: "text.secondary",
                      maxWidth: "68ch",
                    }}
                  >
                    {band.blurb}
                  </Typography>
                </Box>
                <PureTextCardGrid items={band.items} readable={readable} />
              </Box>
            );
          })}
        </Box>

        {!expanded && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 0.75,
              borderTop: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              color: "text.disabled",
            }}
          >
            <ExpandMoreRoundedIcon sx={{ fontSize: 18, opacity: 0.7 }} />
          </Box>
        )}

        {footer && (
          <Typography
            sx={{
              px: 2,
              py: 0.85,
              fontSize: 11,
              color: "text.disabled",
              borderTop: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            {footer}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
