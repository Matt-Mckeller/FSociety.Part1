"use client";

import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import {
  AION_NOTES,
  aionLayer,
  stackForAionNotes,
} from "@yen/content/aion";

/**
 * Visual working notes for AION — not a home-grid tile.
 *
 * Disclaimer first. Then the stack, the Ion → Unlimited ladder, time, and the
 * current reading. Light surface; the 4eye Aion panel carries the dark compact.
 */
export function AionNotesBoard() {
  const c = AION_NOTES;
  const layer = aionLayer();
  const stack = stackForAionNotes();

  return (
    <Container maxWidth="laptop" sx={{ py: { zero: 1, laptop: 2 }, pb: 8 }}>
      <Box
        component={Link}
        href={c.stackHref}
        sx={{
          display: "inline-flex",
          mb: 2.5,
          fontSize: 13.5,
          fontWeight: 650,
          color: "text.secondary",
          textDecoration: "none",
          "&:hover": { color: c.accent },
        }}
      >
        ← Integration Layer
      </Box>

      <Disclaimer />

      <Typography sx={{ fontSize: 15, color: "text.secondary", maxWidth: "68ch", mb: 4, lineHeight: 1.55 }}>
        {c.lede}
      </Typography>

      <SectionLabel accent={c.accent}>The stack — AION is the root</SectionLabel>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.65, mb: 4.5 }}>
        {stack.map((row) => {
          const apex = row.id === "aion";
          return (
            <Box
              key={row.id}
              component={Link}
              href={`${c.stackHref}?mode=docs#${row.id}`}
              sx={{
                display: "grid",
                gridTemplateColumns: "36px 1fr auto",
                alignItems: "center",
                gap: 1.25,
                px: 1.25,
                py: apex ? 1.35 : 0.85,
                borderRadius: 1.25,
                textDecoration: "none",
                color: "inherit",
                border: "1px solid",
                borderColor: apex ? `${row.color}99` : "divider",
                bgcolor: apex ? `${row.accentColor}22` : "background.paper",
                boxShadow: apex ? `inset 4px 0 0 ${row.color}` : "none",
                "&:hover": { borderColor: row.color },
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.4,
                  color: apex ? row.color : "text.disabled",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                {row.row}
              </Typography>
              <Typography sx={{ fontSize: apex ? 15.5 : 13.5, fontWeight: apex ? 750 : 600, color: apex ? row.color : "text.primary" }}>
                {row.label}
              </Typography>
              <Typography sx={{ fontSize: 11, color: "text.secondary", display: { zero: "none", tablet: "block" } }}>
                {apex ? "root" : row.status}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <SectionLabel accent={c.accent}>Power — Ion is big AI, Aion is AI on</SectionLabel>
      <Box
        sx={{
          display: "grid",
          gap: 1.25,
          gridTemplateColumns: { zero: "1fr 1fr", tablet: "repeat(4, minmax(0, 1fr))" },
          mb: 4,
        }}
      >
        {c.power.map((p, i) => (
          <Box
            key={p.id}
            sx={{
              p: 1.75,
              borderRadius: 2,
              border: "1px solid",
              borderColor: i === 3 ? `${c.accent}99` : "divider",
              bgcolor: i === 3 ? `${c.accent}14` : "background.paper",
              minHeight: 132,
            }}
          >
            <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", color: c.accent, mb: 0.5 }}>
              {p.rung} · {p.flavor}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 780, letterSpacing: -0.3, mb: 0.5 }}>{p.label}</Typography>
            <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.45 }}>{p.body}</Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { zero: "auto 1fr", tablet: "auto 1fr" },
          gap: 1.25,
          alignItems: "center",
          p: 1.75,
          mb: 4,
          borderRadius: 2,
          border: "1px dashed",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box
          aria-label={c.notIon.markLabel}
          sx={{
            px: 1,
            height: 40,
            minWidth: 56,
            borderRadius: 1,
            border: "1px solid",
            borderColor: "text.disabled",
            display: "grid",
            placeItems: "center",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 0.2,
            color: "text.primary",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
            {c.notIon.mark}
        </Box>
        <Box>
          <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.1, textTransform: "uppercase", color: c.accent, mb: 0.4 }}>
            Outside Ion · {c.notIon.who}
          </Typography>
          <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.5 }}>
            {c.notIon.body}
          </Typography>
        </Box>
      </Box>

      <SectionLabel accent={c.accent}>{c.levers.title}</SectionLabel>
      <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.55, maxWidth: "68ch", mb: 1.5 }}>
        {c.levers.blurb}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 1.25,
          gridTemplateColumns: { zero: "1fr", tablet: "1fr 1fr" },
          mb: 4,
        }}
      >
        {c.levers.items.map((lever) => (
          <Box
            key={lever.id}
            sx={{
              p: 1.75,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 780, mb: 1 }}>{lever.label}</Typography>
            <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.1, textTransform: "uppercase", color: c.accent, mb: 0.35 }}>
              Ion
            </Typography>
            <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.45, mb: 1 }}>
              {lever.ion}
            </Typography>
            <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.1, textTransform: "uppercase", color: c.accent, mb: 0.35 }}>
              Aion
            </Typography>
            <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.45 }}>
              {lever.aion}
            </Typography>
          </Box>
        ))}
      </Box>

      <SectionLabel accent={c.accent}>Time — what knowledge is in play</SectionLabel>
      <Box
        sx={{
          display: "grid",
          gap: 1.25,
          gridTemplateColumns: { zero: "1fr 1fr", tablet: "repeat(4, minmax(0, 1fr))" },
          mb: 1.5,
        }}
      >
        {c.time.map((t) => (
          <Box
            key={t.id}
            sx={{
              p: 1.75,
              borderRadius: 2,
              border: "1px solid",
              borderColor: t.id === "max" ? `${c.accent}99` : "divider",
              bgcolor: t.id === "max" ? `${c.accent}14` : "background.paper",
            }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: 750, mb: 0.4 }}>{t.label}</Typography>
            <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.45 }}>{t.body}</Typography>
          </Box>
        ))}
      </Box>
      <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.55, maxWidth: "68ch", mb: 4 }}>
        {c.rewritePast} On Aion, this Time picker is a learning clock more than a hard need.
      </Typography>

      <SectionLabel accent={c.accent}>Name</SectionLabel>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { zero: "1fr", tablet: "repeat(3, minmax(0, 1fr))" },
          mb: 4,
        }}
      >
        {c.etymology.map((e) => (
          <Box key={e.title} sx={{ p: 1.75, borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
            <Typography sx={{ fontSize: 14.5, fontWeight: 700, mb: 0.5 }}>{e.title}</Typography>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.5 }}>{e.body}</Typography>
          </Box>
        ))}
      </Box>

      <SectionLabel accent={c.accent}>Nature</SectionLabel>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 4 }}>
        {c.nature.map((n) => (
          <Box key={n.title}>
            <Typography sx={{ fontSize: 14.5, fontWeight: 700 }}>{n.title}</Typography>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.55, maxWidth: "68ch" }}>
              {n.body}
            </Typography>
          </Box>
        ))}
      </Box>

      <SectionLabel accent={c.accent}>Current reading</SectionLabel>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { zero: "1fr", tablet: "1fr 1fr" },
          mb: 4,
        }}
      >
        {c.reading.map((r) => (
          <Box key={r.title} sx={{ p: 1.75, borderRadius: 2, border: "1px solid", borderColor: "divider", borderLeft: `3px solid ${c.accent}`, bgcolor: `${c.accent}0a` }}>
            <Typography sx={{ fontSize: 14.5, fontWeight: 700, mb: 0.5 }}>{r.title}</Typography>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.55 }}>{r.body}</Typography>
          </Box>
        ))}
      </Box>

      <SectionLabel accent={c.accent}>{c.quest.title}</SectionLabel>
      <Typography sx={{ fontSize: 14.5, color: "text.primary", lineHeight: 1.6, maxWidth: "70ch", mb: 1.5 }}>
        {c.quest.blurb}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { zero: "1fr", tablet: "repeat(3, minmax(0, 1fr))" },
          mb: 4,
        }}
      >
        {c.quest.items.map((item) => (
          <Box
            key={item.title}
            sx={{
              p: 1.75,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              borderLeft: `3px solid ${c.accent}`,
              bgcolor: `${c.accent}0a`,
            }}
          >
            <Typography sx={{ fontSize: 14.5, fontWeight: 700, mb: 0.5 }}>{item.title}</Typography>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.55 }}>{item.body}</Typography>
          </Box>
        ))}
      </Box>

      <SectionLabel accent={c.accent}>Layer 8 — as currently written</SectionLabel>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { zero: "1fr", tablet: "1fr 1fr" },
          mb: 4,
        }}
      >
        {layer.cards.map((card) => (
          <Box key={card.title} sx={{ p: 1.75, borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
            <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.1, textTransform: "uppercase", color: layer.color, mb: 0.6 }}>
              {card.title}
            </Typography>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.55 }}>{card.body}</Typography>
          </Box>
        ))}
      </Box>

      <SectionLabel accent={c.accent}>See also</SectionLabel>
      <Box component="ul" sx={{ m: 0, pl: 2.25, display: "flex", flexDirection: "column", gap: 0.75 }}>
        {c.seeAlso.map((link) => (
          <Typography key={link.href} component="li" sx={{ fontSize: 14 }}>
            <Box
              component={Link}
              href={link.href}
              sx={{
                color: c.accent,
                fontWeight: 650,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {link.label}
            </Box>
          </Typography>
        ))}
      </Box>
    </Container>
  );
}

function Disclaimer() {
  const { disclaimer, accent } = AION_NOTES;
  return (
    <Box
      sx={{
        p: 2,
        mb: 3.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: `${accent}66`,
        bgcolor: `${accent}12`,
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: accent,
          mb: 0.75,
        }}
      >
        {disclaimer.title}
      </Typography>
      <Typography sx={{ fontSize: 14.5, lineHeight: 1.6, color: "text.primary", maxWidth: "70ch" }}>
        {disclaimer.body}
      </Typography>
    </Box>
  );
}

function SectionLabel({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: accent,
        mb: 1.25,
      }}
    >
      {children}
    </Typography>
  );
}
