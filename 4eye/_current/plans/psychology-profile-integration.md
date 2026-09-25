# Psychology Profile → 4eye Profile Integration

> Fit the Communication Planner–style mental profile into the live 4eye profile under **Brain / Psychology**, without drowning the Core rail or duplicating Communication.

**Status:** Phase 1 landed (plan + Core Psychology lens + planner-shaped first-person view)  
**Surface:** `apps/4eye-web-mockup` ProfilePage (`LensRail` / `LensBody`) + `Tiles/profiles`  
**Related:** [profiles-plan.md](./profiles-and-inventory/profiles-plan.md) · [character-screens-update-plan.md](./character-and-screens/character-screens-update-plan.md) §2.4 · communication intents in `@yen/content`

---

## 1. Problem

Today three things sit on top of each other:

| Surface | Role today | Gap |
|---------|------------|-----|
| **Brain** (Core) | Mood, Perspectives, Relationships, Recently learned, **+ Psychology nested** | Dump site — psychology is a footer, not a destination |
| **Psychology** (data + `PsychologyView`) | Thin: perspectives / coping / stories | Not the planner-shaped page people expect |
| **Communication** (Facet) | Full planner mirror: mental state, cognitive style, prefs, defenses, strategy | Second-person (“how to reach X”) — correct as a facet, wrong as the only rich MH page |

The Communication Planner recipient profile already exists in-product as `CommunicationView` (see `PROFILE_REDRING` / `PROFILE_SCOUT`). The ask is to give **Psychology / Mental Health** that same depth as a **first-person** Core page, and keep navigation honest about Brain vs Psychology vs Communication.

---

## 2. Organising rule (distance + audience)

Same concentric model as `lensGroups.ts`, with one clarifying split inside the mind:

```
CORE — what I am
  Brain          → operating mind *right now* (state, social map, recently learned)
  Psychology     → mental-health *profile* (stable self-knowledge, planner shape, first person)
  Body           → physical heal / routine (healing stays here)

FACETS — how I show up / how others meet me
  Communication  → second-person projection: how to reach this person
                   (goals · observations · strategy + shared mental/cognitive read)
```

**Naming:** keep the lens label **Psychology** (matches existing `ProfileView`, icon, Stories). Subcopy / hints may say “Mental health & mind profile” so it reads as Brain-adjacent without inventing a third synonym lens (“Mental Health”, “Mind”) that would fight Brain.

**Mood** stays on Brain (and Today’s status strip). Mood is hourly state; Psychology is a place you return to.

---

## 3. Ownership of fields (single source)

| Field cluster | Owns | Projects to |
|---------------|------|-------------|
| Mental-state factors, cognitive strengths, processing / memory style, responds-well / struggles / format, defense patterns | **Psychology** | Communication (fallback if facet omits them) |
| Coping tactics, MH perspectives, formative stories | **Psychology** | Surfaced / Emotion inspect later |
| Communication goals, observations, reach strategy, “how to communicate with X” summary | **Communication** | Planner / intents |
| Character Perspectives & Relationships panels | **Brain** (character store) | Not duplicated as psychology “Perspectives” dump — psych perspectives are MH/self-talk oriented |
| Learning styles table | Character / Surfaced | Optional cross-link from Psychology cognitive section |

Import rule: when lifting planner data, **copy shared clusters into `data.psychology` first**; leave Communication with strategy/goals and only override mental fields when the facet needs a different public cut.

---

## 4. Navigation plan

### Phase 1 (now)
1. Restore **`psychology` as a Core lens** between `brain` and `body`.
2. Slim **Brain**: remove nested `<PsychologyView />`; keep Mood, Perspectives, Relationships, Recently learned.
3. Expand **`PsychologyView`** to the Communication Planner layout, **first person** (“Your mental landscape”, “How you process”, “What helps you”, stories & coping).
4. Expand **`PsychologyViewData`** with optional planner fields (back-compat with thin seeds).
5. **`CommunicationView`**: keep second-person framing; resolve mental/cognitive from communication → else psychology.
6. Enrich **Matthew** (+ RedRing / Scout where thin) psychology seeds from existing communication clusters.

### Phase 2 (import / content)
1. Treat yen **communication-planner showcase** + `COMMUNICATION_INTENTS` as the import index (`profileId` → seed).
2. For each linked profile: ensure `psychology` is the canonical mental cluster; communication holds reach strategy + privacy-gated observations.
3. Optional: pull public cognitive / format tags into Learning Styles / Surfaced “learning-styles” card (no second model — project only).
4. Emotion Inspect stays on ProfilePage chrome; link relevant dossiers from Psychology stories later.

### Phase 3 (optional polish)
1. Brain sub-section deep-link chip → Psychology (“Open psychology profile”).
2. Icon aliases: `brain` → `MindIcon`, `body` → `HealingIcon` in `@4eye/icons` (rail already has `psychology`).
3. Standalone `ProfilesTile` Stories already has Psychology — keep parity with ProfilePage Core lens.
4. Domains group stays off; neural/brainwave remain integration-layers, not MH profile.

---

## 5. UX copy contract

| Lens | Voice | Example header |
|------|-------|----------------|
| Brain | Present-tense operating system | “Mood & Status”, “Perspectives”, “Recently learned” |
| Psychology | First person / self | “Your mental landscape”, “How you take things in”, “What helps you” |
| Communication | Second person / supporter | “How to communicate with {who}”, “How to respond to {who}” |

Same underlying factors; different audience and verbs.

---

## 6. Files

```
_current/plans/psychology-profile-integration.md     # this plan
apps/4eye-web-mockup/src/Tiles/profiles/
  model/types.ts                                     # expand PsychologyViewData
  store/seed-data.ts                                 # lift mental clusters into psychology
  components/lensGroups.ts                           # Core: … brain, psychology, body …
  components/LensBody.tsx                            # slim Brain; wire psychology
  components/views/PsychologyView.tsx                # planner-shaped, first person
  components/views/CommunicationView.tsx             # fall back to psychology clusters
```

---

## 7. Acceptance

- [x] Profile Core rail shows **Psychology** between Brain and Body
- [x] Psychology page shows planner sections (mental state, cognitive, preferences, defenses, coping, stories) when seed is rich
- [x] Brain no longer nests the full Psychology block
- [x] Communication still reads as “how to reach X” and still works if psychology is empty
- [x] Thin psychology seeds (perspectives/coping/stories only) still render without empty planner chrome noise
- [x] Matthew seed has a non-thin psychology profile derived from his communication cluster

---

## 8. Non-goals

- No new backend / privacy engine
- No Domains / brainwave layer merge into Psychology
- No renaming Communication facet
- No second Mood lens
