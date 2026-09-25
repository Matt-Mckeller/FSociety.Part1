"use client";

/**
 * HumanPanel — the default (row 1) detail view.
 *
 * Reuses the real Character-tile components inside a scoped CharacterProvider:
 * the profile header + equipped actions + timeline of events + summary of the
 * most important user information.
 */

import * as React from "react";
import { Box, Divider, Grid, Stack, alpha } from "@mui/material";
import { ExpanseLogoV5 } from "@expanse/brand-core";
import type { IntegrationLayer } from "../model/layers";
import { PanelShell, SectionLabel } from "../components/shared";
import { CharacterProvider } from "@4eye/web/Tiles/character/store/CharacterProvider";
import { CharacterProfileStore } from "@4eye/web/Tiles/character/store/CharacterProfileStore";
import { CharacterHeader } from "@4eye/web/Tiles/character/components/CharacterHeader";
import { EquippedActionsBar } from "@4eye/web/Tiles/character/components/EquippedActionsBar";
import { CharacterSummaryCard } from "@4eye/web/Tiles/character/components/CharacterSummaryCard";
import { CharacterTimeline } from "@4eye/web/Tiles/character/components/CharacterTimeline";
import { DailyFocus } from "@4eye/web/Tiles/character/components/DailyFocus";
import { IdentityName } from "@4eye/web/components/surface";
import { GoalsShowcase } from "../goals";

export function HumanPanel({ layer }: { layer: IntegrationLayer }) {
  const accent = layer.accentColor;
  return (
    <PanelShell layer={layer}>
      <CharacterProvider>
        <CharacterProfileStore>
        <Box sx={{ mb: 3 }}>
          <SectionLabel accent={accent}>Character Profile</SectionLabel>
          <CharacterHeader
            nameSlot={
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <ExpanseLogoV5
                  variant="minimal"
                  height={36}
                  showOrbitalRings
                  showPrimaryRings
                  ringStyle="comet"
                  ringFill="#ffffff"
                  orbitalFill="#ffffff"
                  ringStrokeWidth={1.6}
                  orbitalOpacity={0.92}
                  pupilStrokeColor={accent}
                  pupilStrokeWidth={1.4}
                />
                <Divider orientation="vertical" flexItem sx={{ borderColor: alpha(accent, 0.35), my: 0.25 }} />
                <IdentityName accent={accent} />
              </Stack>
            }
            badgeSlot="3x9"
          />
        </Box>

        {/* Goals — moved up: the character's three signature goals */}
        <Box sx={{ mb: 3 }}>
          <SectionLabel accent={accent}>Goals</SectionLabel>
          <GoalsShowcase />
        </Box>

        <Box sx={{ mb: 3 }}>
          <SectionLabel accent={accent}>Actions</SectionLabel>
          <EquippedActionsBar />
        </Box>

        <Box sx={{ mb: 3 }}>
          <SectionLabel accent={accent}>Surfaced Information — What Matters Now</SectionLabel>
          <Grid container spacing={2.5}>
            <Grid size={{ zero: 12, tablet: 6 }}>
              <CharacterSummaryCard />
            </Grid>
            <Grid size={{ zero: 12, tablet: 6 }}>
              <DailyFocus />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <SectionLabel accent={accent}>Events</SectionLabel>
          <CharacterTimeline />
        </Box>
        </CharacterProfileStore>
      </CharacterProvider>
    </PanelShell>
  );
}
