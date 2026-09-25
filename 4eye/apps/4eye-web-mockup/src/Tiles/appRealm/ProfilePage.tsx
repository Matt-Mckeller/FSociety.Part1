"use client";

/**
 * ProfilePage — the app-realm profile surface.
 *
 * Built around the surfacing layout proven in the integration-layers Human
 * panel (plan 01), refined so depth is reached by disclosure rather than scroll
 * (plan 06), then reorganised around information architecture (plan 07):
 *
 *  - **Three concentric rings.** Lenses are grouped by distance from the person:
 *    Core (what I am) → Facets (how I show up) → Domains (where I act, defined
 *    but off). See `lensGroups.ts`. The grouped rail peeks extra Core pages on
 *    hover/focus so the landing menu stays short.
 *  - **Nav shape is a live choice.** Three rail layouts ship behind a toggle,
 *    because which one works is a judgement about 360px width that is far
 *    easier to make by looking than by arguing.
 *  - **Vision · Goals is the only bracket.** One collapsed row (glyphs for
 *    Vision 1–3) sits at the top on Surfaced / Character / Core. Ongoing,
 *    other-people, and children sets nest inside so they stay reachable
 *    without being the landing view. Actions are the Character lens hero;
 *    Events is its own lens.
 *  - **Every collapse remembers itself separately** — each disclosure, the
 *    daily-focus toggle, density, the rail layout and the attribute treatment
 *    all persist independently.
 *
 * Providers are hoisted here so identity, the surfaced band and the lens body
 * read the same stores. `CharacterTile` and `ProfilesTile` are untouched and
 * still work standalone.
 */

import * as React from "react";
import { Box, Stack, alpha } from "@mui/material";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TileContainer } from "@expanse/hud";

import { SurfaceShell, useInk, useSurface } from "@4eye/web/components/surface";
import { ResourceBarsProvider, ResourceCornerHud } from "@4eye/web/components/hud/resourceBars";
import { LoadoutProvider } from "@4eye/web/components/loadout";
import { CharacterProvider, useCharacter } from "@4eye/web/Tiles/character/store/CharacterProvider";
import { CharacterProfileStore, useProfileStore } from "@4eye/web/Tiles/character/store/CharacterProfileStore";
import { lensIdForMood } from "@4eye/web/Tiles/character/model/emotions";
import { CHARACTER_STATUS_SEED } from "@4eye/web/Tiles/character/model/status";
import { JANNA_STATUS_SEED } from "@4eye/web/Tiles/character/model/janna-status";
import { JANNA_PROFILE_ID } from "@4eye/web/Tiles/character/store/useCharacterPresentation";
import { useHudStateOptional } from "@4eye/web/components/hud/state";
import { GOALS_LAYOUTS, type GoalsLayout } from "@4eye/web/Tiles/integration-layers/goals";

import { ProfileProvider, useProfiles } from "@4eye/web/Tiles/profiles/store/ProfileProvider";
import { ProfileIdentity } from "@4eye/web/Tiles/profiles/components/ProfileIdentity";
import { VisionGoalsBracket } from "@4eye/web/Tiles/profiles/components/VisionGoalsBracket";
import { LensRail, RAIL_LAYOUTS, type RailLayout } from "@4eye/web/Tiles/profiles/components/LensRail";
import { LensBody } from "@4eye/web/Tiles/profiles/components/LensBody";
import { CycleControl, usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";
import { GAME_STATE_LENSES, SURFACED_LENS, type Lens } from "@4eye/web/Tiles/profiles/components/lensGroups";
import { SectionDisclosure } from "@4eye/web/components/surface";
import { PROCESS_HASH } from "@4eye/web/Tiles/profiles/lib/profileDeepLink";
import { GearIcon } from "@4eye/icons";

/**
 * The profile's accent pair. `useInk` flips which anchor is text and which is
 * fill per mode.
 *
 * Jade rather than the Human layer's mint (`#4fe0b0` / `#0f5a45`). Both pass
 * comfortably, but the mint measured 11.5:1 in dark against 7.1:1 in light —
 * it blazed in one theme and receded in the other. Jade is 9.1 / 8.9: near
 * symmetric, so the accent carries the same weight whichever mode you are in,
 * and it reads as a colour rather than as a glow.
 */
const PROFILE_ANCHORS = { color: "#0c4a39", accentColor: "#35c99b" } as const;

/**
 * Hud Emotion.Inspect lives above the page; CharacterProvider lives on it.
 * This bridge keeps the profile emotion lens aligned with the inspect switcher.
 */
function EmotionInspectCharacterBridge() {
  const hud = useHudStateOptional();
  const { state, dispatch } = useCharacter();
  const { profile } = useProfiles();
  const { dispatch: profileDispatch } = useProfileStore();

  React.useEffect(() => {
    const id = hud?.emotionInspectId;
    if (!hud?.isEmotionInspectOpen || !id) return;
    if (id === state.activeEmotionId) return;
    dispatch({ type: "set-emotion", id });
  }, [hud?.isEmotionInspectOpen, hud?.emotionInspectId, state.activeEmotionId, dispatch]);

  React.useEffect(() => {
    const isJanna = profile.id === JANNA_PROFILE_ID;
    dispatch({
      type: "set-emotion",
      id: isJanna ? "happy" : lensIdForMood(CHARACTER_STATUS_SEED.mood),
    });
    profileDispatch({
      type: "set-active-effects",
      effects: isJanna ? JANNA_STATUS_SEED.effects : CHARACTER_STATUS_SEED.effects,
    });
  }, [profile.id, dispatch, profileDispatch]);

  return null;
}

function ProfileSurface() {
  const [lens, setLens] = React.useState<Lens>(SURFACED_LENS);
  const [railLayout, setRailLayout] = usePersistedChoice(
    "4eye.profile.railLayout",
    "grouped" as RailLayout,
    RAIL_LAYOUTS,
  );
  const [goalsLayout, setGoalsLayout] = usePersistedChoice(
    "4eye.profile.goalsLayout",
    "row" as GoalsLayout,
    GOALS_LAYOUTS,
  );
  const { ink, tint } = useInk(PROFILE_ANCHORS);
  const surface = useSurface();
  const accent = PROFILE_ANCHORS.accentColor;
  const showGameState = GAME_STATE_LENSES.has(lens);
  const reduceMotion = useReducedMotion();

  /*
    Entrance: a short rise-and-fade, staggered so the identity band settles
    before the rail and the goals bracket follow it in.

    Under reduced motion the movement is dropped entirely rather than shortened
    — the translate is the part that causes trouble, and a faster slide is still
    a slide.
  */
  const rise = React.useCallback(
    (delay: number) =>
      reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.34, delay, ease: [0.22, 1, 0.36, 1] as const },
          },
    [reduceMotion],
  );

  // Deep-link support, mirroring the docs app's ?section= pattern.
  // Re-read on search/hash changes so Body → Photos (same page) switches lens.
  React.useEffect(() => {
    const apply = () => {
      const param = new URLSearchParams(window.location.search).get("lens");
      if (param) setLens(param as Lens);
      const hash = window.location.hash?.slice(1);
      if (!hash) return;
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    };
    apply();
    window.addEventListener("popstate", apply);
    return () => window.removeEventListener("popstate", apply);
  }, []);

  const handleLens = React.useCallback((next: Lens, hash?: string) => {
    setLens(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lens", next);
    if (hash) {
      url.hash = hash;
    } else {
      url.hash = "";
    }
    window.history.replaceState(null, "", url);
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, []);

  return (
    <SurfaceShell
      accent={accent}
      // A near-flat surface rather than an accent wash: the cards and
      // disclosures do the separating now, so the background staying quiet
      // lets them. `cardBg` is near-white in light mode and a deep neutral in
      // dark — a literal white there would glare.
      tint={surface.cardBg}
      watermarkSvgId="visual"
      header={
        <>
          {/*
            The goal trio follows the bracket rather than duplicating it: on
            the three game-state lenses the glyphs ride the Goals disclosure
            header below, so the identity band leaves them out. On the other
            twelve there is no Goals bracket at all, and the glyphs are the only
            place the three goals appear — clicking one returns to Surfaced,
            where the full showcase lives.
          */}
          <Box component={motion.div} {...rise(0)}>
            <ProfileIdentity
              accent={ink}
              showGoalGlyphs={!showGameState}
              onGoalsClick={() => handleLens(SURFACED_LENS)}
            />
          </Box>
          <Stack
            component={motion.div}
            {...rise(0.07)}
            sx={{ flexDirection: "row", alignItems: "center", gap: 1, mt: 1 }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <LensRail active={lens} accent={accent} layout={railLayout} onChange={handleLens} />
            </Box>
          </Stack>
          <Box component={motion.div} {...rise(0.1)} sx={{ mt: 1 }}>
            <SectionDisclosure
              id="profile-display-prefs"
              label="Display"
              accent={accent}
              Icon={GearIcon}
              meta={`${railLayout} · ${goalsLayout}`}
              hint="Nav rail shape and Vision goals layout — parked here so the header stays quiet."
            >
              <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1, pt: 0.5 }}>
                <CycleControl
                  label="Nav layout"
                  value={railLayout}
                  options={RAIL_LAYOUTS}
                  accent={accent}
                  onChange={setRailLayout}
                />
                <CycleControl
                  label="Goals layout"
                  value={goalsLayout}
                  options={GOALS_LAYOUTS}
                  accent={accent}
                  onChange={setGoalsLayout}
                />
              </Stack>
            </SectionDisclosure>
          </Box>
        </>
      }
    >
      {/*
        Goals at the top, minimised — visible as a heading with its count, not
        as a block you scroll past. It is the only bracket left: Actions became
        the hero of the Character lens, and Events became a lens of its own,
        because a timeline is something you go and read, not something that
        trails every other page.
      */}
      {showGameState && (
        <Box
          component={motion.div}
          {...rise(0.14)}
          sx={{ mb: 2, pb: 1, borderBottom: "1px solid", borderColor: alpha(accent, 0.25) }}
        >
          <VisionGoalsBracket
            accent={accent}
            layout={goalsLayout}
            onOpenProcesses={() => handleLens("processes", PROCESS_HASH.selfOngoing)}
          />
        </Box>
      )}

      {/*
        Keyed on the lens so switching cross-fades rather than snapping. This is
        the transition that earns its keep — the rail changes fifteen ways and
        the body underneath it is the only thing that moved.
      */}
      <AnimatePresence mode="wait">
        <Box
          key={lens}
          component={motion.div}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <LensBody
            lens={lens}
            accent={accent}
            onNavigate={(l) =>
              handleLens(
                l,
                l === "processes" ? PROCESS_HASH.selfOngoing : undefined,
              )
            }
          />
        </Box>
      </AnimatePresence>

    </SurfaceShell>
  );
}

export default function ProfilePage() {
  return (
    <TileContainer mode="fit">
      {/*
        ResourceBarsProvider wraps both the page body and the corner HUD so the
        Body lens can unlock BODY · PRESENCE on visit (same session store).
      */}
      <ResourceBarsProvider>
        <CharacterProvider>
          <CharacterProfileStore>
            <LoadoutProvider>
              <ProfileProvider>
                <EmotionInspectCharacterBridge />
                <ProfileSurface />
              </ProfileProvider>
            </LoadoutProvider>
          </CharacterProfileStore>
        </CharacterProvider>
        {/* Mind/Body resource HUD docked to the bottom corners. */}
        <ResourceCornerHud />
      </ResourceBarsProvider>
    </TileContainer>
  );
}
