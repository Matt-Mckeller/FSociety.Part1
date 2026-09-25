"use client";

/**
 * CharacterTile — the single Character surface (game/action layer).
 *
 * Layout: character header (avatar + stats) → equipped Actions → equipped Spells
 * (with Spellbook launcher) → equipped Work (plans/tasks/quests) → equipped
 * Goals → profile tabs (Today / Core / Gear / Mind / Life). Gear includes
 * equipment and the equipped pipeline loadout.
 *
 * Separate from the identity Profiles tile. Self-wraps in {@link CharacterProvider}.
 * UI-first per the Character & Screens plan — example data only.
 */

import { route } from "@4eye/web/lib/routes";
import * as React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import NextLink from "next/link";

import { LensIconModeProvider } from "@expanse/lens";

import { ActionBarsPanel, LoadoutPages, LoadoutProvider, type LoadoutData } from "@4eye/web/components/loadout";
import { SpellbookTile } from "@4eye/web/Tiles/spellbook";
import { PROFILES_SEED } from "@4eye/web/Tiles/profiles/store/seed-data";
import { CharacterProvider, useCharacter } from "./store/CharacterProvider";
import { CharacterProfileStore, useProfileStore } from "./store/CharacterProfileStore";
import { CHARACTER_ACCENT } from "./theme/tokens";
import type { CharacterData } from "./model/types";
import { CharacterHeader } from "./components/CharacterHeader";
import { EquippedActionsBar } from "./components/EquippedActionsBar";
import { EquippedSpells } from "./components/EquippedSpells";
import { EquippedWorkList } from "./components/EquippedWorkList";
import { EquippedGoals } from "./components/EquippedGoals";
import { SwipeRose } from "./components/SwipeRose";
import { AurasGrid, AURA_PROGRESS_MAX, AURA_ACTIVE_DEFAULT } from "./components/Auras";
import { Section } from "./components/shared/EquipSlot";
import { EquipmentPanel } from "./components/Equipment";
import { EquippedPipelines } from "./components/EquippedPipelines";
import { AttributesTable } from "./components/AttributesTable";
import { LearningStylesTable } from "./components/LearningStylesTable";
import { PerksGrid } from "./components/Perks";
import { TraitsGrid } from "./components/Traits";
import { StatusRAMPanel } from "./components/StatusRAM";
import { PerspectivesPanel } from "./components/Perspectives";
import { HabitsPanel } from "./components/Habits";
import { ConsumablesPanel } from "./components/Consumables";
import { CharacterSummaryCard } from "./components/CharacterSummaryCard";
import { DailyFocus } from "./components/DailyFocus";
import { CharacterFeed } from "./components/CharacterFeed";
import { SkillsTree } from "./components/SkillsTree";
import { RelationshipsPanel } from "./components/Relationships";
import { CharacterTimeline } from "./components/CharacterTimeline";
import { AchievementsSection } from "./components/AchievementsSection";
import { HighestValueGrid } from "./components/HighestValueGrid";
import { InterestsEngagementGrid } from "./components/InterestsEngagementGrid";
import { buildTimelineEntries, recentlyLearnedEntries } from "./model/timeline";

function MindLearnedTimeline() {
  const { state } = useProfileStore();
  const entries = React.useMemo(
    () => recentlyLearnedEntries(buildTimelineEntries(state.feedEvents)),
    [state.feedEvents],
  );
  return (
    <CharacterTimeline
      entries={entries}
      filterHint="Recently learned — full chronology is on the Events lens"
    />
  );
}

type ProfileTab = "today" | "core" | "gear" | "mind" | "life";

const PROFILE_TABS: Array<{ value: ProfileTab; label: string; emoji: string }> = [
  { value: "today", label: "Today",    emoji: "🌅" },
  { value: "core",  label: "Core",     emoji: "✦"  },
  { value: "gear",  label: "Gear",     emoji: "⚔️" },
  { value: "mind",  label: "Mind",     emoji: "🧠" },
  { value: "life",  label: "Life",     emoji: "🌱" },
];

/**
 * TabBody — lays a tab's sections out in a single column on small screens and
 * balances them across two columns on large ones (the surface widens to match).
 * Small-screen behavior is unchanged from the original single Stack.
 */
function TabBody({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        columnGap: 2,
        columnCount: { xs: 1, lg: 2 },
        "& > *": { breakInside: "avoid", mb: 2 },
        "& > *:last-child": { mb: 0 },
      }}
    >
      {children}
    </Box>
  );
}

function CharacterProfileSections() {
  const { character } = useCharacter();
  const profile = PROFILES_SEED.profiles.find((p) => p.id === character.profileId);
  const [tab, setTab] = React.useState<ProfileTab>("today");

  const hasHvd = (profile?.highestValueData?.length ?? 0) > 0;
  const users = profile?.data.users;

  return (
    <Box>
      {/* ── Tab rail ─────────────────────────────────────────────── */}
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          mb: 2,
          position: "sticky",
          top: 0,
          bgcolor: "background.paper",
          zIndex: 10,
          pt: 0.5,
        }}
      >
        <Box sx={{ display: "flex", gap: 0 }}>
          {PROFILE_TABS.map((t) => {
            const isActive = tab === t.value;
            return (
              <Box
                key={t.value}
                onClick={() => setTab(t.value)}
                role="tab"
                aria-selected={isActive}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.2,
                  py: 0.75,
                  cursor: "pointer",
                  position: "relative",
                  borderBottom: "2.5px solid",
                  borderColor: isActive ? CHARACTER_ACCENT : "transparent",
                  bgcolor: isActive ? alpha(CHARACTER_ACCENT, 0.06) : "transparent",
                  transition: "border-color .2s ease, background-color .2s ease",
                  "&:hover": { bgcolor: isActive ? alpha(CHARACTER_ACCENT, 0.09) : "action.hover" },
                  borderRadius: "6px 6px 0 0",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1,
                    transition: "transform .2s ease",
                    transform: isActive ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {t.emoji}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.62rem",
                    fontWeight: isActive ? 900 : 600,
                    color: isActive ? CHARACTER_ACCENT : "text.secondary",
                    letterSpacing: 0.3,
                    lineHeight: 1,
                    transition: "color .2s ease",
                  }}
                >
                  {t.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── TODAY ────────────────────────────────────────────────── */}
      {tab === "today" && (
        <DailyFocus />
      )}

      {/* ── CORE ─────────────────────────────────────────────────── */}
      {tab === "core" && (
        <TabBody>
          <CharacterSummaryCard onNavigate={setTab} />
          <Section title="Attributes">
            <AttributesTable accent={CHARACTER_ACCENT} />
          </Section>
          <Section title="Learning styles & preferences">
            <LearningStylesTable accent={CHARACTER_ACCENT} />
          </Section>
          <Section title="Auras">
            <AurasGrid progress={AURA_PROGRESS_MAX} active={AURA_ACTIVE_DEFAULT} cap={6} plan="Elite" /> 
          </Section>
          <Section title="Traits">
            <TraitsGrid />
          </Section>
          <Section title="Current Status">
            <StatusRAMPanel />
          </Section>
        </TabBody>
      )}

      {/* ── GEAR ─────────────────────────────────────────────────── */}
      {tab === "gear" && (
        <TabBody>
          <Section title="Equipment">
            <EquipmentPanel />
          </Section>
          <Section title="Pipelines">
            <EquippedPipelines />
          </Section>
          <Section title="Attributes">
            <AttributesTable accent={CHARACTER_ACCENT} />
          </Section>
          <Section title="Learning styles & preferences">
            <LearningStylesTable accent={CHARACTER_ACCENT} />
          </Section>
          <Section title="Perks">
            <PerksGrid />
          </Section>
          <Section title="Skills & Mastery">
            <SkillsTree />
          </Section>
        </TabBody>
      )}

      {/* ── MIND ─────────────────────────────────────────────────── */}
      {tab === "mind" && (
        <TabBody>
          <Section title="Perspectives">
            <PerspectivesPanel />
          </Section>
          <Section title="Relationships">
            <RelationshipsPanel />
          </Section>
          <Section title="Recently learned">
            <MindLearnedTimeline />
          </Section>
        </TabBody>
      )}

      {/* ── LIFE ─────────────────────────────────────────────────── */}
      {tab === "life" && (
        <TabBody>
          <Section title="Routine">
            <HabitsPanel />
          </Section>
          <Section title="Consumables">
            <ConsumablesPanel />
          </Section>
          <Section title="Character Feed">
            <CharacterFeed />
          </Section>
          {/* ── AI Settings ── */}
          <Section title="AI Settings">
            <Box
              component={NextLink}
              href={route("/technical")}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 0.6,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                color: "text.primary",
                textDecoration: "none",
                fontSize: "0.8125rem",
                fontWeight: 600,
                "&:hover": { borderColor: "text.secondary", bgcolor: "action.hover" },
              }}
            >
              <TuneRoundedIcon sx={{ fontSize: 16 }} />
              Manage AI Permissions
            </Box>
          </Section>
          {/* ── Highest-Value Data ── */}
          {hasHvd && (
            <Section title="Highest-Value Data">
              <HighestValueGrid alignments={profile!.highestValueData} />
            </Section>
          )}
          {/* ── Interests & Engagement ── */}
          {users && (
            <Section title="Interests & Engagement">
              <InterestsEngagementGrid
                interests={users.interests}
                favoriteTopics={users.favoriteTopics}
                personality={users.personality}
                favoriteSongs={users.favoriteSongs}
                favoriteEntertainment={users.favoriteEntertainment}
                mediaHighlights={users.mediaHighlights}
              />
            </Section>
          )}
        </TabBody>
      )}
    </Box>
  );
}

function SpellbookOverlay() {
  const { state, dispatch } = useCharacter();
  return (
    <Dialog
      open={state.spellbookOpen}
      onClose={() => dispatch({ type: "close-spellbook" })}
      maxWidth="tablet"
      fullWidth
      scroll="paper"
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          aria-label="Close Spellbook"
          onClick={() => dispatch({ type: "close-spellbook" })}
          sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <DialogContent sx={{ p: 2 }}>
          <SpellbookTile initialPresetId="PRESET_LEARNING" />
        </DialogContent>
      </Box>
    </Dialog>
  );
}

function CharacterSurface() {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        color: "text.primary",
        width: "100%",
        maxWidth: { xs: 720, lg: 1040 },
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CharacterHeader />
      <Divider />
      <Section title="Actions">
        <EquippedActionsBar />
      </Section>
      <Section title="Loadout">
        <LoadoutPages />
      </Section>
      <Section title="Swipe Casts">
        <SwipeRose />
      </Section>
      <Section title="Action Bars">
        <ActionBarsPanel />
      </Section>
      <EquippedSpells />
      <Section title="Active Work">
        <EquippedWorkList />
      </Section>
      <Section title="Goals">
        <EquippedGoals />
      </Section>
      <CharacterProfileSections />
      <AchievementsSection />
      <SpellbookOverlay />
    </Box>
  );
}

export interface CharacterTileProps {
  data?: CharacterData;
  /** Initial loadout (bars/slots/swipe/quality); defaults to the seed. */
  loadout?: LoadoutData;
}

export function CharacterTile({ data, loadout }: CharacterTileProps = {}) {
  return (
    <LensIconModeProvider>
      <LoadoutProvider data={loadout}>
        <CharacterProvider data={data}>
          <CharacterProfileStore>
            <CharacterSurface />
          </CharacterProfileStore>
        </CharacterProvider>
      </LoadoutProvider>
    </LensIconModeProvider>
  );
}

export default CharacterTile;
