"use client";

import Link from "next/link";
import { Box, Chip, Typography } from "@mui/material";
import type { AppEntry } from "@yen/content";
import { RARITY_COLOR } from "@yen/content/character/equipment";
import type { AppShowcase } from "@yen/content/showcases";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.1,
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 15, mt: 0.5, color: "text.primary" }}>{value}</Typography>
    </Box>
  );
}

/**
 * Rendered for apps that are real but still live in their original repo.
 *
 * It says plainly that the app is not running here. An app that looks live on
 * the grid and then shows an empty page is worse than one that is honest about
 * where it stands.
 */
export function AppShowcaseBody({ showcase, app }: { showcase: AppShowcase; app: AppEntry }) {
  const rarityColor = app.rarity ? RARITY_COLOR[app.rarity] : null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: "80ch" }}>
      <Chip
        label="Not running here yet — described from source"
        size="small"
        sx={{ alignSelf: "flex-start", height: 24, fontSize: 12, fontWeight: 600 }}
      />

      {/*
        The rarity claim and the argument for it, together. Separating them
        would leave a badge on the tile that nothing on the page supports.
      */}
      {rarityColor && showcase.valueNote && (
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: `${rarityColor}55`,
            borderLeft: `4px solid ${rarityColor}`,
            bgcolor: `${rarityColor}0d`,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: rarityColor,
              mb: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            <Box
              component="span"
              title="Highest-value data"
              aria-label="Highest-value data"
              sx={{
                width: 8,
                height: 8,
                transform: "rotate(45deg)",
                bgcolor: rarityColor,
                display: "inline-block",
              }}
            />
            Highest-value data
          </Typography>
          <Typography sx={{ fontSize: 16, lineHeight: 1.65, color: "text.primary" }}>
            {showcase.valueNote}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { zero: "1fr", tablet: "repeat(3, minmax(0, 1fr))" },
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Fact label="Source" value={showcase.source} />
        <Fact label="Stack" value={showcase.stack} />
        <Fact label="Scale" value={showcase.scale} />
      </Box>

      {showcase.concepts && showcase.concepts.length > 0 && (
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 650, mb: 1 }}>What makes it distinct</Typography>
          <Typography sx={{ fontSize: 14, lineHeight: 1.55, color: "text.secondary", mb: 2 }}>
            The ideas that separate this from a generic agency or portfolio site.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {showcase.concepts.map((concept) => (
              <Box
                key={concept.title}
                sx={{
                  p: 2,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  borderLeft: "3px solid",
                  borderLeftColor: app.accent,
                  bgcolor: "background.paper",
                }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 700, mb: 0.5 }}>{concept.title}</Typography>
                <Typography sx={{ fontSize: 14.5, lineHeight: 1.55, color: "text.secondary" }}>
                  {concept.blurb}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Box>
        <Typography sx={{ fontSize: 20, fontWeight: 650, mb: 1.5 }}>What is in it</Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5, display: "flex", flexDirection: "column", gap: 1 }}>
          {showcase.highlights.map((line) => (
            <Typography
              key={line}
              component="li"
              sx={{ fontSize: 16, lineHeight: 1.6, color: "text.secondary" }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontSize: 20, fontWeight: 650, mb: 1.5 }}>Bringing it here</Typography>
        <Typography sx={{ fontSize: 16, lineHeight: 1.6, color: "text.secondary" }}>
          {showcase.portNote}
        </Typography>
      </Box>

      {showcase.intents && showcase.intents.length > 0 && (
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 650, mb: 1 }}>
            Communication intents
          </Typography>
          <Typography sx={{ fontSize: 14, lineHeight: 1.55, color: "text.secondary", mb: 2 }}>
            Clarification of who and what is being pursued. Soft-public only — dark entries never
            appear on this site.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {showcase.intents.map((intent) => (
              <Box
                key={intent.id}
                sx={{
                  p: 2,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 0.75 }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{intent.name}</Typography>
                  <Chip
                    size="small"
                    label={intent.privacy}
                    sx={{ height: 20, fontSize: 10, fontWeight: 700 }}
                  />
                  <Chip
                    size="small"
                    label={intent.framing}
                    sx={{ height: 20, fontSize: 10, fontWeight: 600 }}
                  />
                </Box>
                <Typography sx={{ fontSize: 14.5, lineHeight: 1.55, color: "text.secondary" }}>
                  {intent.intent}
                </Typography>
                {intent.mediums && intent.mediums.length > 0 && (
                  <Typography sx={{ fontSize: 12.5, color: "text.disabled", mt: 0.75 }}>
                    Mediums: {intent.mediums.join(" · ")}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {showcase.docs && showcase.docs.length > 0 && (
        <Box component="section" aria-labelledby="showcase-docs-heading">
          <Typography id="showcase-docs-heading" sx={{ fontSize: 20, fontWeight: 650, mb: 1 }}>
            Documentation
          </Typography>
          <Typography sx={{ fontSize: 14, lineHeight: 1.55, color: "text.secondary", mb: 2 }}>
            Plans already published on yen — the app is not running here yet; the writing is.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
            {showcase.docs.map((doc) => (
              <Box
                key={doc.href}
                component={Link}
                href={doc.href}
                sx={{
                  display: "block",
                  p: 2,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color 0.15s ease, background-color 0.15s ease",
                  "&:hover": {
                    borderColor: app.accent,
                    bgcolor: `${app.accent}0d`,
                  },
                }}
              >
                <Typography sx={{ fontSize: 15.5, fontWeight: 700, color: app.accent }}>
                  {doc.title}
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: 1.5, color: "text.secondary", mt: 0.5 }}>
                  {doc.blurb}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
