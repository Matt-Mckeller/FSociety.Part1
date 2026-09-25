"use client";

import Link from "next/link";
import { Box, Container, Stack, Typography } from "@mui/material";
import { CURRENCY_CONCEPT } from "@yen/content/concepts/currency";

/**
 * Currency & coins — the migrated concept page.
 *
 * Replaces deep-links into the Web 4 essay for the economy story. Shots and
 * Command Center docs stay linked; the essay is archive, not the front door.
 */
export function CurrencyBoard() {
  const c = CURRENCY_CONCEPT;

  return (
    <Container maxWidth="laptop" sx={{ py: { zero: 2, laptop: 3 }, pb: 8 }}>
      <Typography sx={{ fontSize: 15, color: "text.secondary", maxWidth: "68ch", mb: 3, lineHeight: 1.55 }}>
        {c.lede}
      </Typography>

      <Box
        sx={{
          p: 2,
          mb: 3.5,
          borderRadius: 2,
          border: "1px solid",
          borderColor: `${c.accent}44`,
          bgcolor: `${c.accent}0c`,
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.1,
            textTransform: "uppercase",
            color: c.accent,
            mb: 0.75,
          }}
        >
          Name
        </Typography>
        <Typography sx={{ fontSize: 14, color: "text.primary", lineHeight: 1.55, maxWidth: "68ch" }}>
          {c.nameNote}
        </Typography>
      </Box>

      <Stack sx={{ gap: 1.25, mb: 4 }}>
        {c.summary.map((line) => (
          <Typography key={line} sx={{ fontSize: 14.5, color: "text.primary", lineHeight: 1.6, maxWidth: "70ch" }}>
            {line}
          </Typography>
        ))}
      </Stack>

      <SectionLabel accent={c.accent}>Core flow</SectionLabel>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { zero: "1fr", tablet: "1fr 1fr" },
          mb: 4,
        }}
      >
        {c.flow.map((step) => (
          <Box
            key={step.step}
            sx={{
              p: 1.75,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: c.accent,
                mb: 0.5,
              }}
            >
              Step {step.step}
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 700, mb: 0.5 }}>{step.title}</Typography>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.5 }}>{step.blurb}</Typography>
          </Box>
        ))}
      </Box>

      <SectionLabel accent={c.accent}>Principles</SectionLabel>
      <Stack sx={{ gap: 1.5, mb: 4 }}>
        {c.principles.map((p) => (
          <Box key={p.title}>
            <Typography sx={{ fontSize: 14.5, fontWeight: 700 }}>{p.title}</Typography>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.55, maxWidth: "68ch" }}>
              {p.blurb}
            </Typography>
          </Box>
        ))}
      </Stack>

      <SectionLabel accent={c.accent}>From the deck</SectionLabel>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { zero: "1fr", tablet: "1fr 1fr" },
          mb: 4,
        }}
      >
        {c.shots.map((shot) => (
          <Box
            key={shot.src}
            component="figure"
            sx={{
              m: 0,
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "#0b1020",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.alt} style={{ display: "block", width: "100%", height: "auto" }} />
            <Typography
              component="figcaption"
              sx={{ px: 1.25, py: 1, fontSize: 12, color: "text.secondary", bgcolor: "background.paper" }}
            >
              {shot.alt}
            </Typography>
          </Box>
        ))}
      </Box>

      <SectionLabel accent={c.accent}>See also</SectionLabel>
      <Stack component="ul" sx={{ m: 0, pl: 2.25, gap: 0.75 }}>
        {c.seeAlso.map((link) => (
          <Typography key={link.href} component="li" sx={{ fontSize: 14 }}>
            <Box
              component={Link}
              href={link.href}
              sx={{ color: c.accent, fontWeight: 650, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              {link.label}
            </Box>
          </Typography>
        ))}
      </Stack>
    </Container>
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
