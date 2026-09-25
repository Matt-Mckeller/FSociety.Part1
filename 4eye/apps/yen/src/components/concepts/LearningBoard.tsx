"use client";

import Link from "next/link";
import { Box, Container, Stack, Typography } from "@mui/material";
import { LEARNING_CONCEPT } from "@yen/content/concepts/learning";

/**
 * Learning — readable workshop concept page for the classroom loop.
 *
 * Parallel to CurrencyBoard: explain first, then link out to EDU / suite / docs.
 */
export function LearningBoard() {
  const c = LEARNING_CONCEPT;

  return (
    <Container maxWidth="laptop" sx={{ py: { zero: 2, laptop: 3 }, pb: 8 }}>
      <Typography sx={{ fontSize: 15, color: "text.secondary", maxWidth: "68ch", mb: 3, lineHeight: 1.55 }}>
        {c.lede}
      </Typography>

      <Stack sx={{ gap: 1.25, mb: 4 }}>
        {c.summary.map((line) => (
          <Typography key={line} sx={{ fontSize: 14.5, color: "text.primary", lineHeight: 1.6, maxWidth: "70ch" }}>
            {line}
          </Typography>
        ))}
      </Stack>

      <SectionLabel accent={c.accent}>How the loop works</SectionLabel>
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

      <SectionLabel accent={c.accent}>Design tips that teach</SectionLabel>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { zero: "1fr", tablet: "repeat(3, minmax(0, 1fr))" },
          mb: 4,
        }}
      >
        {c.tips.map((tip) => (
          <Box
            key={tip.title}
            sx={{
              p: 1.75,
              borderRadius: 2,
              border: "1px solid",
              borderColor: `${c.accent}33`,
              bgcolor: `${c.accent}0a`,
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700, mb: 0.5 }}>{tip.title}</Typography>
            <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.5 }}>{tip.blurb}</Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.25,
          mb: 4,
        }}
      >
        <Box
          component={Link}
          href="/apps/expanse-edu"
          sx={{
            px: 1.75,
            py: 1,
            borderRadius: 1.5,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            color: "#fff",
            bgcolor: c.accent,
            "&:hover": { filter: "brightness(1.06)" },
          }}
        >
          Open Expanse EDU
        </Box>
        <Box
          component={Link}
          href="/4eye/learn"
          sx={{
            px: 1.75,
            py: 1,
            borderRadius: 1.5,
            fontSize: 14,
            fontWeight: 650,
            textDecoration: "none",
            color: c.accent,
            border: "1px solid",
            borderColor: `${c.accent}66`,
            bgcolor: "background.paper",
            "&:hover": { borderColor: c.accent },
          }}
        >
          Learn your way
        </Box>
        <Box
          component={Link}
          href="/docs#learning-tips"
          sx={{
            px: 1.75,
            py: 1,
            borderRadius: 1.5,
            fontSize: 14,
            fontWeight: 650,
            textDecoration: "none",
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            "&:hover": { color: "text.primary", borderColor: "text.disabled" },
          }}
        >
          Top learning tips
        </Box>
      </Box>

      <SectionLabel accent={c.accent}>See also</SectionLabel>
      <Stack component="ul" sx={{ m: 0, pl: 2.25, gap: 0.75 }}>
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
