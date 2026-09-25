"use client";

import Link from "next/link";
import { Box, Chip, Typography } from "@mui/material";
import {
  INTEGRATION_LAYERS,
  STATUS_META,
  type IntegrationLayer,
} from "@yen/content/layers";
import { AION_NOTES } from "@yen/content/aion";
import { VIDEOS } from "@yen/content/media";

/*
  The model carries two colours per layer: `color` is a dark base and
  `accentColor` a bright display variant intended for dark surfaces. yen renders
  light, so the base colour does the work for text and rules, and the bright
  accent is only ever used as a low-alpha wash.
*/

/** The series recording that covers the layers, and whether it exists yet. */
const LAYER_SERIES =
  VIDEOS.find((v) => v.id === "series-all-in-neo") ?? VIDEOS.find((v) => v.id === "series-layers");
const SERIES_SHOT = Boolean(LAYER_SERIES?.src);

/**
 * The per-layer video control.
 *
 * Rendered whether or not the recording exists. The manifest carries the series
 * with `src: null` on purpose — an announced empty slot is a commitment, and
 * hiding the control until the file lands would leave the page silent about a
 * recording that is actually planned. The chapter is named either way, so a
 * reader knows which part of the recording will cover this layer.
 */
function LayerVideo({ layer }: { layer: IntegrationLayer }) {
  if (!layer.videoChapter) return null;

  const chapter = LAYER_SERIES?.chapters?.find((c) => c.id === layer.videoChapter);

  return (
    <Box
      component={Link}
      href={`/videos#series-all-in-neo`}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        mt: 1.5,
        px: 1.25,
        py: 0.55,
        borderRadius: 1,
        border: "1px solid",
        borderColor: SERIES_SHOT ? `${layer.color}66` : "divider",
        bgcolor: SERIES_SHOT ? `${layer.accentColor}12` : "transparent",
        color: SERIES_SHOT ? layer.color : "text.secondary",
        textDecoration: "none",
        fontSize: 12.5,
        fontWeight: 650,
        "&:hover": { borderColor: layer.color, color: layer.color },
      }}
    >
      <Box component="svg" width={12} height={12} viewBox="0 0 24 24" aria-hidden sx={{ flexShrink: 0 }}>
        <path d="M8 5.5v13l11-6.5Z" fill="currentColor" opacity={SERIES_SHOT ? 1 : 0.45} />
      </Box>
      {SERIES_SHOT ? "Watch" : "Recording to come"}
      {chapter && (
        <Box component="span" sx={{ color: "text.disabled", fontWeight: 500 }}>
          {chapter.label}
        </Box>
      )}
    </Box>
  );
}

function LayerRow({ layer, last }: { layer: IntegrationLayer; last: boolean }) {
  const status = STATUS_META[layer.status];

  return (
    /* `id` so the series stops on the home page can deep-link a single layer. */
    <Box id={layer.id} sx={{ display: "flex", gap: { zero: 2, tablet: 3 }, scrollMarginTop: 24 }}>
      {/* Spine */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: layer.color,
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {layer.row}
        </Box>
        {!last && (
          <Box sx={{ width: 2, flex: 1, minHeight: 24, bgcolor: "divider", mt: 1 }} />
        )}
      </Box>

      <Box sx={{ pb: last ? 0 : 5, minWidth: 0, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
          <Typography sx={{ fontSize: 21, fontWeight: 680, color: layer.color, lineHeight: 1.2 }}>
            {layer.label}
          </Typography>
          <Chip
            size="small"
            label={status.label}
            sx={{
              height: 21,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.3,
              color: "#fff",
              bgcolor: status.color,
            }}
          />
        </Box>

        <Typography sx={{ fontSize: 15, color: "text.secondary", mt: 0.75, mb: 2, maxWidth: "72ch" }}>
          {layer.tagline}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: { zero: "1fr", laptop: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          {layer.cards.map((card) => (
            <Box
              key={card.title}
              sx={{
                p: 2,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
                borderLeft: `3px solid ${layer.color}`,
                bgcolor: `${layer.accentColor}14`,
              }}
            >
              <Typography sx={{ fontSize: 14.5, fontWeight: 650, mb: 0.5 }}>
                {card.title}
              </Typography>
              <Typography sx={{ fontSize: 13.5, lineHeight: 1.55, color: "text.secondary" }}>
                {card.body}
              </Typography>
            </Box>
          ))}
        </Box>

        <LayerVideo layer={layer} />
        {layer.id === "aion" && <AionNotesPin layer={layer} />}
      </Box>
    </Box>
  );
}

function AionNotesPin({ layer }: { layer: IntegrationLayer }) {
  const notes = AION_NOTES;
  const href = layer.notesHref ?? notes.href;
  return (
    <Box
      sx={{
        mt: 2.5,
        p: 1.75,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: `${layer.color}44`,
        bgcolor: `${layer.accentColor}18`,
        maxWidth: "72ch",
      }}
    >
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: 1.1,
          textTransform: "uppercase",
          color: layer.color,
          mb: 0.65,
        }}
      >
        {notes.disclaimer.title}
      </Typography>
      <Typography sx={{ fontSize: 13.5, lineHeight: 1.55, color: "text.secondary", mb: 1.25 }}>
        {notes.disclaimer.body}
      </Typography>
      <Box
        component={Link}
        href={href}
        sx={{
          fontSize: 13.5,
          fontWeight: 700,
          color: layer.color,
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Visual working notes — Ion, time, current reading →
      </Box>
    </Box>
  );
}

export function IntegrationLadder() {
  const layers = [...INTEGRATION_LAYERS].sort((a, b) => a.row - b.row);
  const counts = (["live", "building", "future"] as const).map((s) => ({
    ...STATUS_META[s],
    count: layers.filter((l) => l.status === s).length,
  }));

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", mb: 4 }}>
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", mr: 0.5 }}>
          {layers.length} layers, ground level upward
        </Typography>
        {counts.map((s) => (
          <Chip
            key={s.label}
            size="small"
            label={`${s.count} ${s.label.toLowerCase()}`}
            sx={{
              height: 21,
              fontSize: 11,
              fontWeight: 600,
              color: "text.primary",
              bgcolor: `${s.color}2e`,
              border: "1px solid",
              borderColor: `${s.color}66`,
            }}
          />
        ))}
      </Box>

      {layers.map((layer, i) => (
        <LayerRow key={layer.id} layer={layer} last={i === layers.length - 1} />
      ))}
    </Box>
  );
}
