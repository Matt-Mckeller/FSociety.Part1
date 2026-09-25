"use client";

import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import { OVERVIEW, SCALE } from "@yen/content/overview";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { CompassMount } from "./CompassMount";
import { CypherHeadline } from "./CypherHeadline";
import { SiteStatusBanner } from "./SiteStatusBanner";

/**
 * The overview band above the grid.
 *
 * Sized to leave the first row of tiles visible — the page should read as
 * scrollable at a glance rather than as a landing page to be got past.
 */
export function SiteHeader() {
  return (
    <Box
      component="header"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        background: (t) =>
          `linear-gradient(180deg, ${t.palette.background.paper} 0%, ${t.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="laptopL" sx={{ py: { zero: 5, laptop: 7 } }}>
        <Box
          sx={{
            display: "grid",
            gap: { zero: 3, laptop: 6 },
            gridTemplateColumns: { zero: "1fr", laptop: "minmax(0, 1fr) 320px" },
            alignItems: "center",
          }}
        >
          <Box>
            {/*
              The site's own name previously appeared only inside <title>. A
              visitor landing here saw an animated word — "Future" — and no
              indication of what they were looking at or who made it. The
              wordmark and the sentence under it are the five-second answer;
              the cypher keeps the beat after that.
            */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.25, mb: 1.5 }}>
              <Typography
                component="span"
                sx={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1 }}
              >
                {SITE_NAME}
              </Typography>
              <Typography
                component="span"
                sx={{ fontSize: 14.5, color: "text.secondary", lineHeight: 1.3 }}
              >
                {SITE_TAGLINE}
              </Typography>
            </Box>

            <CypherHeadline
              morph={OVERVIEW.headlineMorph}
              chips={OVERVIEW.headlineChips}
              allInMorph={OVERVIEW.allInMorph}
            />

            <Typography
              sx={{
                fontSize: { zero: 15.5, laptop: 17.5 },
                lineHeight: 1.55,
                color: "text.secondary",
                maxWidth: "52ch",
              }}
            >
              {OVERVIEW.lede}
            </Typography>

            <SiteStatusBanner />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 3, alignItems: "center" }}>
              <Action href={OVERVIEW.primary.href} label={OVERVIEW.primary.label} primary />
              <Action href={OVERVIEW.secondary.href} label={OVERVIEW.secondary.label} />
              <Action href={OVERVIEW.walkthrough.href} label={OVERVIEW.walkthrough.label} />
              <Box
                component={Link}
                href={OVERVIEW.tertiary.href}
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "text.secondary",
                  textDecoration: "none",
                  "&:hover": { color: "text.primary", textDecoration: "underline" },
                }}
              >
                {OVERVIEW.tertiary.label}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: { zero: "none", laptop: "block" } }}>
            <CompassMount />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { zero: 2, tablet: 3 },
            gridTemplateColumns: { zero: "repeat(2, minmax(0, 1fr))", tablet: "repeat(4, minmax(0, 1fr))" },
            mt: { zero: 4, laptop: 6 },
            pt: { zero: 3, laptop: 4 },
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {SCALE.map((figure) => (
            <Box
              key={figure.label}
              component={Link}
              href={figure.href}
              sx={{ textDecoration: "none", color: "inherit", "&:hover .v": { color: "primary.main" } }}
            >
              <Typography
                className="v"
                sx={{
                  fontSize: { zero: 26, laptop: 32 },
                  fontWeight: 700,
                  letterSpacing: -0.5,
                  lineHeight: 1.1,
                  transition: "color 120ms ease",
                }}
              >
                {figure.value}
              </Typography>
              <Typography sx={{ fontSize: { zero: 12.5, laptop: 13.5 }, color: "text.secondary", mt: 0.25 }}>
                {figure.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function Action({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        px: 2.25,
        py: 1.1,
        borderRadius: 1.5,
        fontSize: 14.5,
        fontWeight: 620,
        textDecoration: "none",
        border: "1px solid",
        borderColor: primary ? "transparent" : "divider",
        bgcolor: primary ? "text.primary" : "transparent",
        color: primary ? "background.paper" : "text.primary",
        "&:hover": { borderColor: primary ? "transparent" : "text.primary", opacity: primary ? 0.88 : 1 },
      }}
    >
      {label}
    </Box>
  );
}
