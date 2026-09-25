"use client";

import { Box, Typography } from "@mui/material";
import { useDomainsSlideContext } from "../state/DomainsSlideContext";
import { DOMAINS_SELECTORS } from "../state/domains.constants";
import { useDomainsTimeline } from "../hooks/useDomainsTimeline";
import { DomainsExpandedCarousel } from "./DomainsExpandedCarousel";
import { DomainsStarCluster } from "./DomainsStarCluster";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      className={DOMAINS_SELECTORS.headline.slice(1)}
      component="h2"
      sx={{
        fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        color: "text.primary",
        textAlign: "center",
      }}
    >
      {children}
    </Typography>
  );
}

const sectionSx = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: { zero: 2, tablet: 2.5 },
} as const;

export function DomainsSlideContent() {
  const ref = useDomainsTimeline();
  const { eyebrow, isExpanded } = useDomainsSlideContext();

  return (
    <Box ref={ref} sx={{ width: "100%", maxWidth: 1080, mx: "auto" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: { zero: 4, tablet: 5 },
        }}
      >
        <Typography
          className={DOMAINS_SELECTORS.eyebrow.slice(1)}
          sx={{
            color: "text.disabled",
            letterSpacing: "0.36em",
            fontWeight: 700,
            fontSize: "0.78rem",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </Typography>

        {isExpanded ? (
          <DomainsExpandedCarousel />
        ) : (
          <Box sx={sectionSx}>
            <SectionTitle>For Humans.</SectionTitle>
            <DomainsStarCluster />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DomainsSlideContent;
