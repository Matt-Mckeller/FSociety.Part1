"use client";

import * as React from "react";
import { Box, Chip, Link, Stack, Typography, alpha } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

import { GuideGlyph } from "../planning-glyphs";
import { Panel } from "./shared";

/* ------------------------------------------------------------------ data */

const SYSTEM_GUIDELINES = [
  {
    id: "g-map",
    label: "Use the Map System when possible",
    detail:
      "Prefer spatial/map representations for entities, campaigns, and relationships. The map is the primary navigation and context surface — anchor planning artifacts to it whenever there is a meaningful location or zone.",
    tag: "map-first",
  },
  {
    id: "g-hierarchy",
    label: "Respect the quest hierarchy",
    detail:
      "Legend → Campaign → Storyline → Quest → Objective → Action. Never skip levels — depth communicates complexity and prevents over-nesting.",
    tag: undefined,
  },
  {
    id: "g-entities",
    label: "Entities over documents",
    detail:
      "Model everything through the ECS entity graph (PlanningStore). Avoid free-form notes when an entity + traits + links express the same thing structurally.",
    tag: undefined,
  },
  {
    id: "g-ai",
    label: "Let the AI assist with planning",
    detail:
      "Claude is the planning copilot. Feed it TileSpecs, ask for prioritization help, and have it generate new entities in toTileJSON form for validation before rendering.",
    tag: undefined,
  },
];

const BRAND_LINKS = [
  {
    id: "bl-brand-profile",
    label: "Brand Profile",
    description: "Core identity — name, tagline, colors, voice, and logo system.",
    href: undefined as string | undefined,
  },
  {
    id: "bl-style-guide",
    label: "Style Guide",
    description: "Typography, spacing, component patterns, and Expanse theme tokens.",
    href: undefined as string | undefined,
  },
  {
    id: "bl-character",
    label: "Character Profile",
    description: "The founder's narrative persona, strengths, and positioning voice.",
    href: undefined as string | undefined,
  },
  {
    id: "bl-audience",
    label: "Audience Profiles",
    description: "Target segments, pain points, and messaging angles per persona.",
    href: undefined as string | undefined,
  },
];

const TECH_CHOICES = [
  {
    id: "tc-frontend",
    layer: "Frontend",
    name: "Next.js 15 + MUI v6 + TypeScript",
    note: "App router, RSC where possible; MUI for the Expanse design system.",
    status: "confirmed" as const,
  },
  {
    id: "tc-ai",
    layer: "AI / LLM",
    name: "Claude (Anthropic)",
    note: "Planning copilot, entity generation, chat interface. Model via Anthropic SDK.",
    status: "confirmed" as const,
  },
  {
    id: "tc-state",
    layer: "Data / State",
    name: "ECS PlanningStore",
    note: "In-memory entity graph for the planning surface; persistence layer TBD.",
    status: "confirmed" as const,
  },
  {
    id: "tc-map",
    layer: "Map System",
    name: "TBD (Mapbox / Leaflet)",
    note: "Spatial context layer for entity anchoring and zone-based navigation.",
    status: "tbd" as const,
  },
  {
    id: "tc-db",
    layer: "Database",
    name: "TBD",
    note: "Entity persistence, auth, and real-time sync not yet decided.",
    status: "tbd" as const,
  },
  {
    id: "tc-auth",
    layer: "Auth",
    name: "TBD",
    note: "Will align with the DB choice; leaning toward Clerk or Auth.js.",
    status: "tbd" as const,
  },
];

/* ---------------------------------------------------------------- colors */

const LAYOUT_ZONES = [
  {
    id: "lz-hud-chrome",
    zone: "HUD Chrome",
    description: "Persistent left + right rails and top/bottom bars that frame the content area. Z-index 1400. Always visible above page content.",
    tag: "always on",
  },
  {
    id: "lz-content",
    zone: "Content Area",
    description: "The main tile surface between the HUD rails. Each realm page fills this area via TileContainer. Insets tracked by HudInsetsProvider.",
    tag: "per-tile",
  },
  {
    id: "lz-map-overlay",
    zone: "Full-screen Map",
    description: "Fixed overlay at Z-index 1150 (below HUD chrome). Opens over the content area when the minimap is activated. Closes on tile navigation.",
    tag: "overlay",
  },
  {
    id: "lz-map-grid",
    zone: "Map Grid",
    description: "2D spatial tile grid rendered inside the full-screen map. Three columns: GuestExplorerPanel (~22%), MinimapFullGrid (flex fill), MapContextPanel (~30%).",
    tag: "spatial",
  },
  {
    id: "lz-realm-switcher",
    zone: "Realm Switcher",
    description: "Center-bar tab control for switching between Website, App, and Technical realms. Each realm loads its own NavigationProvider + nav config.",
    tag: "navigation",
  },
];

const TONES = {
  system: "#0ea5e9",
  brand:  "#a855f7",
  tech:   "#10b981",
  layout: "#f97316",
  note:   "#64748b",
};

/* --------------------------------------------------------------- helpers */

function SubPanel({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(tone, 0.28),
        bgcolor: alpha(tone, 0.05),
      }}
    >
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------------ view */

export function InstructionsView() {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 1.5,
        gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
        alignItems: "start",
      }}
    >

      {/* System Guidelines — spans both columns on large screens */}
      <Box sx={{ gridColumn: { xs: "1", lg: "1 / -1" } }}>
        <Panel
          title="System Guidelines"
          glyph={
            <Box sx={{ color: TONES.system, display: "flex" }}>
              <GuideGlyph size={18} />
            </Box>
          }
        >
          <Stack spacing={1}>
            {SYSTEM_GUIDELINES.map((g) => (
              <SubPanel key={g.id} tone={TONES.system}>
                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, mb: 0.4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, flex: 1, minWidth: 0 }}>
                    {g.label}
                  </Typography>
                  {g.tag && (
                    <Chip
                      label={g.tag}
                      size="small"
                      sx={{
                        height: 17,
                        fontSize: 9.5,
                        fontWeight: 700,
                        bgcolor: alpha(TONES.system, 0.14),
                        color: TONES.system,
                      }}
                    />
                  )}
                </Stack>
                <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                  {g.detail}
                </Typography>
              </SubPanel>
            ))}
          </Stack>
        </Panel>
      </Box>

      {/* Brand & Identity */}
      <Panel
        title="Brand & Identity"
        glyph={
          <Box sx={{ color: TONES.brand, display: "flex" }}>
            <GuideGlyph size={18} />
          </Box>
        }
      >
        <Stack spacing={1}>
          {BRAND_LINKS.map((bl) => (
            <SubPanel key={bl.id} tone={TONES.brand}>
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, mb: 0.35 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, flex: 1 }}>
                  {bl.label}
                </Typography>
                {bl.href ? (
                  <Link
                    href={bl.href}
                    target="_blank"
                    rel="noopener"
                    sx={{ display: "flex", color: TONES.brand }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <OpenInNewRoundedIcon sx={{ fontSize: 13 }} />
                  </Link>
                ) : (
                  <Chip
                    label="placeholder"
                    size="small"
                    sx={{
                      height: 16,
                      fontSize: 9,
                      fontWeight: 700,
                      bgcolor: alpha(TONES.note, 0.12),
                      color: TONES.note,
                    }}
                  />
                )}
              </Stack>
              <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.45 }}>
                {bl.description}
              </Typography>
            </SubPanel>
          ))}
        </Stack>
      </Panel>

      {/* Layout Zones — spans both columns */}
      <Box sx={{ gridColumn: { xs: "1", lg: "1 / -1" } }}>
        <Panel
          title="Layout"
          glyph={
            <Box sx={{ color: TONES.layout, display: "flex" }}>
              <ViewQuiltRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
          }
        >
          <Stack spacing={0.75}>
            {LAYOUT_ZONES.map((lz) => (
              <Stack
                key={lz.id}
                sx={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 1,
                  py: 0.75,
                  px: 1.25,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: alpha(TONES.layout, 0.22),
                  bgcolor: alpha(TONES.layout, 0.04),
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: TONES.layout,
                    minWidth: 110,
                    flexShrink: 0,
                    pt: 0.2,
                  }}
                >
                  {lz.zone}
                </Typography>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.4 }}>
                    {lz.description}
                  </Typography>
                </Box>
                {lz.tag && (
                  <Chip
                    label={lz.tag}
                    size="small"
                    sx={{
                      height: 16,
                      fontSize: 9,
                      fontWeight: 700,
                      flexShrink: 0,
                      bgcolor: alpha(TONES.layout, 0.12),
                      color: TONES.layout,
                    }}
                  />
                )}
              </Stack>
            ))}
          </Stack>
        </Panel>
      </Box>

      {/* Technology Choices */}
      <Panel
        title="Technology Choices"
        glyph={
          <Box sx={{ color: TONES.tech, display: "flex" }}>
            <GuideGlyph size={18} />
          </Box>
        }
        action={
          <Chip
            label={`${TECH_CHOICES.filter((t) => t.status === "tbd").length} TBD`}
            size="small"
            sx={{
              height: 18,
              fontSize: 10,
              fontWeight: 700,
              bgcolor: alpha(TONES.note, 0.12),
              color: TONES.note,
            }}
          />
        }
      >
        <Stack spacing={0.75}>
          {TECH_CHOICES.map((tc) => {
            const tone = tc.status === "confirmed" ? TONES.tech : TONES.note;
            return (
              <Stack
                key={tc.id}
                sx={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 1,
                  py: 0.75,
                  px: 1.25,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: alpha(tone, 0.22),
                  bgcolor: alpha(tone, 0.04),
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: tone,
                    minWidth: 72,
                    flexShrink: 0,
                    pt: 0.2,
                  }}
                >
                  {tc.layer}
                </Typography>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {tc.name}
                    </Typography>
                    {tc.status === "tbd" && (
                      <Chip
                        label="TBD"
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: 9,
                          fontWeight: 700,
                          bgcolor: alpha(TONES.note, 0.14),
                          color: TONES.note,
                        }}
                      />
                    )}
                  </Stack>
                  <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.4 }}>
                    {tc.note}
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Panel>

    </Box>
  );
}
