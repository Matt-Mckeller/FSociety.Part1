# Character & Screens Update — Plan

> Canonical plan for the next 4eye-web-mockup update: a new **Character screen** (game/action layer),
> **Profiles** enrichments (highest-value data, roles, equipment link, targeted Communication),
> a **V1 Spellbook** mockup, and a new **Learning screen** (input types / checklist / options).
>
> **Build surface:** `4eye/apps/4eye-web-mockup` — Tiles architecture + Storybook (port 6311), app (port 3311).
> **State pattern:** React Context + `useReducer` (mirror `seeding` / `ProfilesProvider` / `QuestsProvider`). No Redux/zustand.
> **Scope this round:** UI-first mockups + Storybook variants, stub/seed data only. **No backend, auth, or AI execution.**

**Status:** Ideation → ready to implement (UI only).

**Related canonical plans (do NOT duplicate — reference):**
- [`../profiles-and-inventory/profiles-plan.md`](../profiles-and-inventory/profiles-plan.md) — Profiles tile + sub-views
- [`../profiles-and-inventory/inventory-plan.md`](../profiles-and-inventory/inventory-plan.md) — Inventory / Equipment page
- [`../project-controller.md`](../project-controller.md) — Spellbook spec (V1/V2), action bars, context system
- Brand highest-value data: `Planning/strategy/brand-and-design-system/CORPORATE_PURPOSE_DATA.md` (+ `DESIGN_AND_EMBEDDED_DATA.md`)

---

## 0. Decisions (locked via Q&A)

| Question | Decision |
|----------|----------|
| Character vs Profile | **Character is a NEW, separate app-realm screen** (game/action layer). The Profiles tile stays the identity/data layer — they are distinct surfaces. |
| "Highest Value Words / data" | The **brand "highest value embedded data" themes** (Evolve / Innovate / Win / Heal / Protect + their term sets) surfaced **per individual** on the profile — i.e. which value themes this person ranks/aligns to. |
| Communication | **Stays a Profiles sub-view** (not a new screen). Reframe it as **targeted at a specific user** — "how to communicate with this person." Expand the existing `CommunicationView`. |
| Learning screen | **NEW separate app-realm screen** (interactive learning input — input types / checklist / options). Distinct from the marketing `Learn` website tile. |
| Spellbook | **Build the V1 keypad Spellbook mockup now** (data-driven, per `project-controller.md`), embedded/launchable from the Character screen. |
| Build scope | UI-first mockup in `4eye-web-mockup` + Storybook variants; stub data; no backend. |

---

## 1. Overview — what's changing

```
NEW app-realm screens (separate Tiles + routes)
 ├── Character  (/appRealm/character)   ← game/action layer: actions, spells, equipped work + goals, spellbook
 └── Learning   (/appRealm/learning)    ← interactive learning: input types, checklist, options

UPDATED existing surfaces
 ├── Profiles tile        ← + Highest-Value Data panel, + Roles, + Equipment link, Communication retargeted to a person
 ├── Spellbook (NEW Tile) ← V1 keypad mockup, embedded in Character + launchable from HUD game menu
 └── Inventory tile       ← surfaced from Profiles + Character as "Equipment"
```

The four user asks map as follows:

| User ask | Where it lands |
|----------|----------------|
| Highest Value Words per individual + Roles + Equipment Screens | **§2 Profiles enrichments** |
| Rename User/Profile → **Character** screen (Actions, Spells, equipped Plans/Tasks/Quests, equipped Goals); separate from Profiles; show Spell Book | **§3 Character screen** + **§4 Spellbook** |
| Communication Screen (targeted at a specific user) | **§2.4 Communication sub-view** (kept in Profiles) |
| Learning Screen — Input Types / Checklist / Options | **§5 Learning screen** |

---

## 2. Profiles enrichments (update existing `src/Tiles/profiles/`)

> Keep the existing 9 sub-views and Context+reducer. These are **additive** changes.

### 2.1 Highest-Value Data panel (brand value alignment per individual)
- New shared component `components/shared/HighestValueData.tsx`.
- Data source: a brand-derived registry `model/highest-value-data.ts` seeding the 5 core themes from `CORPORATE_PURPOSE_DATA.md`:
  - **Improve** (Learning, Progression, Continuous Improvement)
  - **Innovate** (Engagement, Gamification)
  - **Win** (Currency, Score, Rankings)
  - **Heal** (Positivity, Optimism, Healing, Teach)
  - **Protect** (Security, Safety, Protected, Stability)
- Per individual, each theme carries a **weight (0–100)** + a small set of the individual's **highest-value words** (the terms that rank highest for them). Render with the existing `WeightMeter` visual vocabulary (gray→amber→blue→green) so it matches the rest of the app.
- Add `highestValueData?: ValueThemeAlignment[]` to the `Profile` type (`model/types.ts`). Optional — only shows when present.
- Surface on the **Users** view (top of identity) and as a compact strip in `ProfileHeader`.

### 2.2 Roles
- Reuse the canonical `ROLES` from `src/components/hud/mapContent/roles.ts` (Students / Teachers / Professionals / Organizations / Parents + default).
- Add a **role chip row** to `ProfileHeader` showing the profile's current role(s) and active role-goal. Reuse `RoleGoalSelector` if practical (read-only display here; selection lives in the HUD map context already).
- Add `roles?: RoleKey[]` + `activeRoleGoal?: string` to `Profile`.

### 2.3 Equipment link (reuse Inventory, do NOT rebuild)
- Add an **"Equipment"** affordance on the profile (and on Character — see §3) that opens the existing **Inventory tile** filtered to the *Equipment & Items* category.
- No new item model — reuse `src/Tiles/inventory/` model/store. Just a labelled entry point + (optional) a compact "equipped items" summary row reading from inventory seed data.

### 2.4 Communication sub-view — retarget to a specific person
- Keep `components/views/CommunicationView.tsx` inside Profiles.
- Reframe copy/headers so it reads as **"How to communicate with {username}"** (a recipient-targeted lens), mirroring the Communication Planner app's recipient profile (mental state, cognitive style, preferences, defenses, observations, strategy) — the `CommunicationViewData` shape already supports this.
- No structural model change required; this is a **framing + labels** pass + ensuring the active profile's name threads into the headings.

**Files touched (Profiles):**
```
src/Tiles/profiles/
├── model/
│   ├── types.ts                      # + highestValueData, roles, activeRoleGoal on Profile; ValueThemeAlignment
│   └── highest-value-data.ts         # NEW brand theme registry + helpers
├── store/seed-data.ts                # + example value alignments + roles per profile
└── components/
    ├── ProfileHeader.tsx             # + role chips + compact value strip
    ├── shared/HighestValueData.tsx   # NEW
    └── views/
        ├── UsersView.tsx             # + HighestValueData panel + Equipment entry
        └── CommunicationView.tsx     # retarget copy to "communicate with {username}"
```

---

## 3. Character screen (NEW — `src/Tiles/character/`)

> The **game/action layer** for the active character. Separate from Profiles. Also referred to as the
> "Vision / Character screen." UI-first; equipped slots read from seed data.

### 3.1 What it shows
- **Character header** — avatar (reuse `ProfilePhoto` / `UserAvatar`), level, titles, currency/XP bars (reuse `packages/ui/game` status bars). Links across to the matching Profile.
- **Actions** — the character's available **actions** (action bar) for the current context. Reuse the HUD `GameActionBar` / action-dock concepts where practical.
- **Spells** — equipped spells + a launcher into the **Spellbook** (§4).
- **Equipped Plans / Tasks / Quests (active work)** — the currently-equipped work items (read from the existing `quests`/projects seed data). "Equipped" = a small set the user has slotted as active.
- **Equipped Goals** — the goals the character has slotted (reuse goal/`GoalLinkCard` visual from the seeding tile vocabulary).
- **Spell Book** — embedded panel or dialog opened from here (§4).

### 3.2 Data model (`model/types.ts`)
```ts
interface CharacterLoadout {
  characterId: string;        // links to a Profile id
  equippedActions: EquippedAction[];
  equippedSpells: EquippedSpell[];   // ids into the Spellbook registry
  equippedWork: EquippedWorkItem[];  // plan | task | quest, with type + status + weight
  equippedGoals: EquippedGoal[];     // id, label, weight, progress 0..1
}
```
Each "equipped" entry is a thin reference (id + label + status/weight) — the source entities live in their
own tiles (quests/projects/goals). No duplication; resolve display fields read-time.

### 3.3 Files
```
src/Tiles/character/
├── model/types.ts
├── store/
│   ├── seed-data.ts
│   └── CharacterProvider.tsx          # Context + useReducer (active character, active loadout slot)
├── components/
│   ├── CharacterHeader.tsx
│   ├── EquippedActionsBar.tsx
│   ├── EquippedSpells.tsx             # + "Open Spellbook" launcher
│   ├── EquippedWorkList.tsx           # plans/tasks/quests (active work)
│   ├── EquippedGoals.tsx
│   └── shared/EquipSlot.tsx           # reusable equipped-slot card (weight strip, status badge)
├── CharacterTile.tsx
└── Character.stories.tsx
```

### 3.4 Route wiring (app-realm)
- `src/Tiles/appRealm/CharacterPage.tsx` → renders `CharacterTile` inside `TileContainer` (mirror `ProfilePage.tsx`).
- `src/app/(hud)/appRealm/character/page.tsx` → re-export `CharacterPage` + `metadata`.
- Register a per-page action bar if needed (app-realm hides the default orb bar — see `useAppRealmHudChrome`).

---

## 4. Spellbook V1 (NEW — `src/Tiles/spellbook/`)

> Implements the **V1 frontend mockup** from `project-controller.md` §Spellbook. Data-driven via JSON/seed,
> no real execution. Embedded/launchable from the Character screen and reachable from the HUD game menu
> (`HudLeftRail` already lists "Spellbook").

### 4.1 V1 behaviors (mockup only)
- **Browse** — keypad-style grid of spell cards (name, icon, short description, **Cast** button — no-op/toast).
- **Learn** — each card expandable to its description / when-to-use.
- **Favorites** — toggle (local state).
- **Preset page configurations** — example curated sets (e.g. "Learning Mode", "Writing Mode", "Healing Mode").
- Out of scope for V1: live context filtering, real execution, drag-to-action-bar (those are V2 in the controller plan).

### 4.2 Data model
```ts
interface Spell {
  id: string;
  name: string;
  icon: string;            // MUI icon key
  shortDescription: string;
  details: string;         // "Learn" body
  category: string;        // transform | assess | navigate | learn | heal | ...
  alwaysAvailable: boolean;// for the left/right "always vs contextual" split variant
}
interface SpellPreset { id: string; label: string; spellIds: string[]; }
```

### 4.3 Files
```
src/Tiles/spellbook/
├── model/types.ts
├── store/
│   ├── seed-data.ts                  # JSON-style spell registry + presets (data-driven)
│   └── SpellbookProvider.tsx
├── components/
│   ├── SpellGrid.tsx                 # primary keypad layout
│   ├── SpellCard.tsx                 # name/icon/desc/cast + favorite + expand-to-learn
│   ├── PresetSelector.tsx
│   └── SpellbookToolbar.tsx          # search/filter/sort
├── SpellbookTile.tsx
└── Spellbook.stories.tsx
```
- Embed in Character via a dialog/panel; optionally also add an `/appRealm/spellbook` route if a standalone surface is wanted (decide during build — Character-embedded is the priority).

> ⚠️ **Storybook dep-cache caveat (from repo memory):** adding NEW `@mui/icons-material/*Rounded` barrel imports invalidates Vite optimizeDeps → 504. If it hits, kill storybook, `rm -rf node_modules/.cache/storybook`, restart with `pnpm -C apps/4eye-web-mockup storybook`.

---

## 5. Learning screen (NEW — `src/Tiles/learning/`)

> NEW **app-realm** interactive learning screen — **Input Types / Checklist / Options**. Distinct from the
> marketing website `Learn` tile (`src/Tiles/learn/`, which stays as-is).

### 5.1 What it shows
- **Input Types** — choose how learning content is entered/consumed for a session (e.g. text, voice, image/attachment, link/source, prompt-from-template). Selectable cards/segmented control.
- **Checklist** — a session checklist of steps/requirements (reuse `WeightMeter`/`StatusBadge` for progress) — what to complete in this learning flow.
- **Options** — configurable option sets for the session (modality, difficulty, depth, learning mode preset). Mirrors the "preset selections" idea from the controller's chat-input context.

### 5.2 Data model (`model/types.ts`)
```ts
type LearningInputType = "text" | "voice" | "image" | "link" | "template";
interface LearningChecklistItem { id: string; label: string; done: boolean; }
interface LearningOption { id: string; label: string; group: string; selected: boolean; }
interface LearningSession {
  inputTypes: LearningInputType[];
  checklist: LearningChecklistItem[];
  options: LearningOption[];
}
```

### 5.3 Files
```
src/Tiles/learning/
├── model/types.ts
├── store/
│   ├── seed-data.ts
│   └── LearningProvider.tsx
├── components/
│   ├── InputTypePicker.tsx
│   ├── LearningChecklist.tsx
│   └── LearningOptions.tsx
├── LearningTile.tsx
└── Learning.stories.tsx
```

### 5.4 Route wiring
- `src/Tiles/appRealm/LearningPage.tsx` → `LearningTile` in `TileContainer`.
- `src/app/(hud)/appRealm/learning/page.tsx` → re-export + `metadata`.

---

## 6. Reuse table (do NOT rebuild)

| Need | Reuse |
|------|-------|
| Avatar / level badge | `ProfilePhoto` (`packages/@expanse/brand-core/src/character/`), `UserAvatar` (`ExpanseFrontend/packages/ui/user`) |
| XP / currency / status bars | `packages/ui/game/components/` (Experience, Currency, ProfileIconStatusBar) |
| Weight / status / depth visuals | `src/components/visuals.tsx` (`WeightMeter`, `StatusBadge`, `DepthDots`, `weightColor`) + `GoalLinkCard` |
| Roles + goals | `src/components/hud/mapContent/roles.ts`, `RoleGoalSelector` |
| Equipment/items | `src/Tiles/inventory/` (Equipment & Items category) |
| Action bars / docks | `@expanse/hud` `GameActionBar`, action docks, `HudLeftRail` game menu |
| Tile container/layout | `@expanse/hud` `TileContainer` (`mode="fit"` / `"scroll"`) |
| Profile aspect contract | `@4eye/types/src/profile`, `@4eye/features ProfileContextBar` |

---

## 7. Storybook acceptance (per screen)

- **Character:** empty loadout vs fully equipped; actions-only / spells-only / work-only / goals-only focus; mobile width; "Open Spellbook" launches.
- **Spellbook:** keypad grid (default); preset applied; favorites toggled; expanded "Learn" card; always-vs-contextual split variant; mobile width.
- **Profiles (updated):** Highest-Value Data — low vs high weights; Users view with value panel + equipment entry; Communication view retargeted to a named person; role chips present vs absent.
- **Learning:** each input type selected; checklist empty vs partially done vs complete; options groups toggled; mobile width.
- All stories: **white background default** (`backgrounds: { default: "white" }`), clean minimal containers (per workspace Storybook preference).

---

## 8. Build sequence (suggested)

1. **Profiles enrichments** (§2) — smallest, additive, validates the brand value-data model. Includes Communication retarget.
2. **Spellbook V1 Tile** (§4) — standalone, data-driven; needed before Character can embed it.
3. **Character screen** (§3) — consumes Spellbook + equipped slots; new route.
4. **Learning screen** (§5) — independent; new route.
5. Wire app-realm routes + per-page action bars; verify `pnpm -C apps/4eye-web-mockup typecheck` (filter `| grep -i <yourfile>` — there are pre-existing errors in other tiles).

> MUI v9 typing reminders (repo memory): put `direction`/`alignItems`/`justifyContent` for `<Stack>` and `display` for `<Typography>` in `sx`, not as props.

---

## 9. Open questions (confirm during build)

1. **Equipped work source** — should "Equipped Plans/Tasks/Quests" pull from the existing `quests` tile seed data, or get its own small seed for the mockup? (Default: small Character seed referencing quest ids.)
2. **Spellbook surface** — Character-embedded dialog only, or also a standalone `/appRealm/spellbook` route? (Default: embedded first; route optional.)
3. **Highest-value words granularity** — fixed to the 5 brand core themes, or also allow free per-person "value words" beyond the theme term sets? (Default: 5 themes + a few highlighted words each.)
4. **Roles on profile** — read-only display here, with selection staying in the HUD map context? (Default: yes, read-only on profile.)
5. **Learning ↔ Controller** — should the Learning screen's "options/presets" eventually feed the controller's chat-input context, or stay self-contained for now? (Default: self-contained mockup.)
```
