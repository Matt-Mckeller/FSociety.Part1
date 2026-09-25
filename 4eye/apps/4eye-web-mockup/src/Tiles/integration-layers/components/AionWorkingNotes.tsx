"use client";

import { Box, Typography } from "@mui/material";
import { AION_NOTES } from "@yen/content/aion";
import type { IntegrationLayer } from "../model/layers";

/**
 * Compact working notes on the Layer 8 panel — disclaimer, Ion/Aion power,
 * time aspect, and a link to the full yen notes. Dark HUD surface.
 */
export function AionWorkingNotes({ layer }: { layer: IntegrationLayer }) {
  const accent = layer.accentColor;
  const notes = AION_NOTES;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, maxWidth: 720 }}>
      <Box
        sx={{
          p: 1.75,
          borderRadius: 2,
          border: `1px solid ${accent}66`,
          bgcolor: `${accent}18`,
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accent,
            mb: 0.6,
          }}
        >
          {notes.disclaimer.title}
        </Typography>
        <Typography sx={{ fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,0.82)" }}>
          {notes.disclaimer.body}
        </Typography>
      </Box>

      <RungRow
        accent={accent}
        label="Power"
        items={notes.power.map((p) => ({
          kicker: `${p.rung} · ${p.flavor}`,
          title: p.label,
          body: p.body,
          peak: p.rung === 4,
        }))}
      />
      <Box
        sx={{
          display: "flex",
          gap: 1.15,
          alignItems: "center",
          p: 1.25,
          borderRadius: 1.5,
          border: "1px dashed rgba(255,255,255,0.22)",
          bgcolor: "rgba(255,255,255,0.03)",
        }}
      >
        <Box
          aria-label={notes.notIon.markLabel}
          sx={{
            px: 0.85,
            height: 32,
            flexShrink: 0,
            borderRadius: 1,
            border: "1px solid rgba(255,255,255,0.35)",
            display: "grid",
            placeItems: "center",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.2,
            color: "rgba(255,255,255,0.88)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {notes.notIon.mark}
        </Box>
        <Box>
          <Typography sx={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, mb: 0.25 }}>
            Outside Ion · {notes.notIon.who}
          </Typography>
          <Typography sx={{ fontSize: 11.5, lineHeight: 1.4, color: "rgba(255,255,255,0.68)" }}>
            {notes.notIon.body}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accent,
            mb: 0.85,
          }}
        >
          {notes.levers.title}
        </Typography>
        <Typography sx={{ fontSize: 12, lineHeight: 1.45, color: "rgba(255,255,255,0.72)", mb: 1 }}>
          {notes.levers.blurb}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { zero: "1fr", tablet: "1fr 1fr" },
            gap: 0.75,
          }}
        >
          {notes.levers.items.map((lever) => (
            <Box
              key={lever.id}
              sx={{
                p: 1.1,
                borderRadius: 1.5,
                border: "1px solid rgba(255,255,255,0.12)",
                bgcolor: "rgba(255,255,255,0.04)",
              }}
            >
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.92)", mb: 0.45 }}>
                {lever.label}
              </Typography>
              <Typography sx={{ fontSize: 11, lineHeight: 1.4, color: "rgba(255,255,255,0.62)", mb: 0.45 }}>
                Ion — {lever.ion}
              </Typography>
              <Typography sx={{ fontSize: 11, lineHeight: 1.4, color: "rgba(255,255,255,0.62)" }}>
                Aion — {lever.aion}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <RungRow
        accent={accent}
        label="Time"
        items={notes.time.map((t) => ({
          kicker: t.id === "max" ? "Default" : undefined,
          title: t.label,
          body: t.body,
          peak: t.id === "max",
        }))}
      />

      <Box
        sx={{
          p: 1.25,
          borderRadius: 1.5,
          border: `1px solid ${accent}55`,
          bgcolor: `${accent}14`,
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accent,
            mb: 0.55,
          }}
        >
          {notes.quest.title}
        </Typography>
        <Typography sx={{ fontSize: 12, lineHeight: 1.45, color: "rgba(255,255,255,0.82)", mb: 0.75 }}>
          {notes.quest.blurb}
        </Typography>
        {notes.quest.items.map((item) => (
          <Typography key={item.title} sx={{ fontSize: 11.5, lineHeight: 1.45, color: "rgba(255,255,255,0.68)", mb: 0.45 }}>
            {item.title} — {item.body}
          </Typography>
        ))}
      </Box>

      {layer.notesHref && (
        <Box
          component="a"
          href={layer.notesHref}
          sx={{
            alignSelf: "flex-start",
            px: 1.35,
            py: 0.65,
            borderRadius: 1,
            border: `1px solid ${accent}77`,
            color: accent,
            fontSize: 12.5,
            fontWeight: 700,
            textDecoration: "none",
            "&:hover": { bgcolor: `${accent}22` },
          }}
        >
          Full working notes →
        </Box>
      )}
    </Box>
  );
}

function RungRow({
  accent,
  label,
  items,
}: {
  accent: string;
  label: string;
  items: Array<{ kicker?: string; title: string; body: string; peak?: boolean }>;
}) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent,
          mb: 0.85,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { zero: "1fr 1fr", tablet: "repeat(4, minmax(0, 1fr))" },
          gap: 0.75,
        }}
      >
        {items.map((item) => (
          <Box
            key={item.title}
            sx={{
              p: 1.1,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: item.peak ? `${accent}99` : "rgba(255,255,255,0.12)",
              bgcolor: item.peak ? `${accent}24` : "rgba(255,255,255,0.04)",
              minHeight: 92,
            }}
          >
            {item.kicker && (
              <Typography sx={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, mb: 0.35 }}>
                {item.kicker}
              </Typography>
            )}
            <Typography sx={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.92)", mb: 0.35 }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: 11, lineHeight: 1.4, color: "rgba(255,255,255,0.62)" }}>
              {item.body}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
