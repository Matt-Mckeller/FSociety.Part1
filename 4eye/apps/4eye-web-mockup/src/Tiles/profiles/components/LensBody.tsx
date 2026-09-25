"use client";

/**
 * LensBody — renders whichever lens the rail has selected.
 *
 * The five character lenses mirror `CharacterTile`'s original tab bodies; the
 * nine profile lenses reuse the existing view components unchanged. Both are
 * rendered here rather than by delegating to the two tiles, because each tile
 * also owns its own header and its own navigation — exactly the duplication the
 * page rebuild removes.
 *
 * `CharacterTile` and `ProfilesTile` are untouched and still work standalone.
 */

import { route } from "@4eye/web/lib/routes";
import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import { Section } from "@4eye/web/Tiles/character/components/shared/EquipSlot";
import { SectionLabel } from "@4eye/web/components/surface";
import { CharacterLensBody } from "@4eye/web/Tiles/character/components/CharacterLensBody";
import { HabitGrid, StatusStrip, StatusTargetsSection } from "@4eye/web/Tiles/character/components/DailyGrids";
import { CharacterSummaryCard } from "@4eye/web/Tiles/character/components/CharacterSummaryCard";
import { StatusRAMPanel } from "@4eye/web/Tiles/character/components/StatusRAM";
import { PerspectivesPanel } from "@4eye/web/Tiles/character/components/Perspectives";
import { RelationshipsPanel } from "@4eye/web/Tiles/character/components/Relationships";
import { CharacterTimeline } from "@4eye/web/Tiles/character/components/CharacterTimeline";
import { CharacterEvents } from "@4eye/web/Tiles/character/components/CharacterEvents";
import { ProcessesPage } from "@4eye/web/Tiles/character/components/ProcessesPage";
import { HabitsPanel } from "@4eye/web/Tiles/character/components/Habits";
import { ConsumablesPanel } from "@4eye/web/Tiles/character/components/Consumables";
import { CharacterFeed } from "@4eye/web/Tiles/character/components/CharacterFeed";
import { HighestValueGrid } from "@4eye/web/Tiles/character/components/HighestValueGrid";
import { InterestsEngagementGrid } from "@4eye/web/Tiles/character/components/InterestsEngagementGrid";
import { AchievementsSection } from "@4eye/web/Tiles/character/components/AchievementsSection";
import { ProfileHeartEvolveMedia } from "./ProfileHeartEvolveMedia";
import { BodyDashboard, BodyEnvironmentSection } from "./BodyDashboard";
import { ProfileEquipment } from "./shared/ProfileEquipment";
import { TagRow } from "./shared/primitives";
import { useProfileStore } from "@4eye/web/Tiles/character/store/CharacterProfileStore";
import { buildTimelineEntries, recentlyLearnedEntries } from "@4eye/web/Tiles/character/model/timeline";


import { UsersView } from "./views/UsersView";
import { HealingView } from "./views/HealingView";
import { PsychologyView } from "./views/PsychologyView";
import { CommunicationView } from "./views/CommunicationView";
import { StudentView } from "./views/StudentView";
import { TeacherView } from "./views/TeacherView";
import { ClassroomView } from "./views/ClassroomView";
import { ProfessionalView } from "./views/ProfessionalView";
import { ParentView } from "./views/ParentView";

import { EngagementLens } from "./engagement/EngagementLens";
import { CompassHighlights } from "./CompassHighlights";
import { SurfacedBand } from "./SurfacedBand";
import { useProfiles } from "../store/ProfileProvider";
import type { ProfileView } from "../model/types";
import { isCoreLens, SURFACED_LENS, type CoreLens, type Lens } from "./lensGroups";

// Partial: `healing` folds into Body. Psychology is its own Core lens again
// (planner-shaped, first person) — not nested under Brain.
const PROFILE_VIEW_COMPONENT: Partial<Record<ProfileView, React.ComponentType>> = {
  users: UsersView,
  psychology: PsychologyView,
  communication: CommunicationView,
  student: StudentView,
  teacher: TeacherView,
  classroom: ClassroomView,
  professional: ProfessionalView,
  parent: ParentView,
};

/**
 * Single column on small screens, balanced across two on large ones — matching
 * `CharacterTile`'s original TabBody so the character lenses look unchanged.
 */
function TwoColumn({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        columnGap: 2,
        columnCount: { zero: 1, laptop: 2 },
        "& > *": { breakInside: "avoid", mb: 2 },
        "& > *:last-child": { mb: 0 },
      }}
    >
      {children}
    </Box>
  );
}

/**
 * Brain timeline: recently learned only. Full chronology lives on the Events
 * lens — here the question is what the mind picked up lately.
 */
function BrainLearnedTimeline() {
  const { state } = useProfileStore();
  const entries = React.useMemo(
    () => recentlyLearnedEntries(buildTimelineEntries(state.feedEvents)),
    [state.feedEvents],
  );
  return (
    <CharacterTimeline
      entries={entries}
      filterHint="Recently learned — formative chronology is on the Events lens"
    />
  );
}

function CoreLensBody({ lens, accent, onNavigate }: { lens: CoreLens; accent: string; onNavigate: (l: CoreLens) => void }) {
  const { profile } = useProfiles();
  const hasHvd = (profile.highestValueData?.length ?? 0) > 0;
  const users = profile.data.users;
  const hasEnvironment = Boolean(profile.data.healing?.environment);

  switch (lens) {
    // Today absorbs the status readout: mood and effect counts on one strip
    // rather than the tabbed StatusRAMPanel, which was also rendering on Core
    // and Brain — the same information three times.
    case "today":
      return (
        <Stack sx={{ gap: 2.5 }}>
          <Box>
            <SectionLabel accent={accent}>Status</SectionLabel>
            <StatusStrip />
          </Box>
          {/* Mood · Auras · Gear · Buffs — one grid language, expand to HUD, pin to bars. */}
          <StatusTargetsSection />
          {/* What to do is a strategy question — the compass answers it here
              rather than a tile away. Rows link to the Plan tile, which owns
              the data. */}
          <CompassHighlights accent={accent} />
          <HabitGrid />
        </Stack>
      );

    /*
      Core is who the person is, not what they chase or equip. Vision / Ongoing
      goals already live in the page-top Goals bracket on this lens — re-showing
      the full showcase here was the same pyramid twice. Auras and Traits live
      on Character (loadout). Identity here is summary, bio, loves, earned marks,
      becoming-media, and brand.
    */
    case "core": {
      const interests = users?.interests ?? [];
      const personality = users?.personality ?? [];
      const topics = users?.favoriteTopics ?? [];
      const hasLoves = interests.length > 0 || personality.length > 0 || topics.length > 0;
      return (
        <TwoColumn>
          <CharacterSummaryCard onNavigate={(t) => onNavigate(t === "mind" ? "brain" : t === "gear" ? "character" : t)} />
          {users?.whoAmI && (
            <Section title="Who Am I">
              <Typography variant="body2" sx={{ color: "text.primary", lineHeight: 1.55 }}>
                {users.whoAmI}
              </Typography>
            </Section>
          )}
          {hasLoves && (
            <Section title="What you love">
              <Stack sx={{ gap: 1.25 }}>
                {interests.length > 0 && (
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 0.4, display: "block", mb: 0.5 }}
                    >
                      Interests
                    </Typography>
                    <TagRow tags={interests} />
                  </Box>
                )}
                {topics.length > 0 && (
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 0.4, display: "block", mb: 0.5 }}
                    >
                      Topics
                    </Typography>
                    <TagRow tags={topics} />
                  </Box>
                )}
                {personality.length > 0 && (
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 0.4, display: "block", mb: 0.5 }}
                    >
                      Personality
                    </Typography>
                    <TagRow tags={personality} />
                  </Box>
                )}
              </Stack>
            </Section>
          )}
          <AchievementsSection />
          <Section title="Media">
            <ProfileHeartEvolveMedia accent={accent} />
          </Section>
          {hasHvd && (
            <Section title="Brand you carry">
              <HighestValueGrid alignments={profile.highestValueData} />
            </Section>
          )}
        </TwoColumn>
      );
    }

    // Character — acting is the point of the page, so the action band is the
    // hero. Gear follows underneath: you equip and you act in the same place.
    case "character":
      return <CharacterLensBody accent={accent} />;

    // Brain is the operating mind *right now*. The stable mental-health
    // profile lives on the adjacent Psychology lens (planner shape, first person).
    case "brain":
      return (
        <TwoColumn>
          <Section title="Mood & Status"><StatusRAMPanel /></Section>
          <Section title="Perspectives"><PerspectivesPanel /></Section>
          <Section title="Relationships"><RelationshipsPanel /></Section>
          <Section title="Recently learned"><BrainLearnedTimeline /></Section>
        </TwoColumn>
      );

    case "engagement":
      return <EngagementLens accent={accent} />;

    case "psychology":
      return <PsychologyView />;

    // Body is the physical dashboard: vitals + appearance up top, then routine,
    // inventory, environment, consumables, and healing. Visiting unlocks the
    // BODY · PRESENCE corner HUD (see BodyDashboard).
    case "body":
      return (
        <Stack sx={{ gap: 2.5 }}>
          <BodyDashboard
            accent={accent}
            onOpenMedia={() => {
              onNavigate("core");
              window.setTimeout(() => {
                document.getElementById("heart-evolve-media")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 100);
            }}
          />
          <TwoColumn>
            <Section title="Routine"><HabitsPanel /></Section>
            <Section title="Inventory">
              <ProfileEquipment />
            </Section>
            {hasEnvironment && (
              <Section title="Environment"><BodyEnvironmentSection /></Section>
            )}
            <Section title="Consumables"><ConsumablesPanel /></Section>
            <Section title="Healing & Recovery"><HealingView /></Section>
          </TwoColumn>
        </Stack>
      );

    // Events is the one lens where the timeline is the page rather than a
    // section, so it gets the reading surface: eras, filters, and the
    // comfortable density. `CharacterTimeline` stays the sidebar treatment.
    case "events":
      return <CharacterEvents accent={accent} />;

    case "processes":
      return <ProcessesPage />;

    case "life":
      return (
        <TwoColumn>
          <Section title="Character Feed"><CharacterFeed accent={accent} /></Section>
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
        </TwoColumn>
      );
  }
}

export function LensBody({ lens, accent, onNavigate }: { lens: Lens; accent: string; onNavigate: (l: Lens) => void }) {
  if (lens === SURFACED_LENS) {
    return (
      <SurfacedBand
        accent={accent}
        lens={lens}
        onOpenProcesses={() => onNavigate("processes")}
      />
    );
  }
  if (isCoreLens(lens)) {
    return <CoreLensBody lens={lens} accent={accent} onNavigate={onNavigate} />;
  }
  const View = PROFILE_VIEW_COMPONENT[lens as ProfileView];
  if (lens === "users") {
    return <UsersView onOpenLife={() => onNavigate("life")} />;
  }
  return View ? <View /> : null;
}
