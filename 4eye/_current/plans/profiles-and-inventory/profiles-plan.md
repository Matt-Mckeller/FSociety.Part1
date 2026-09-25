# Profiles Plan

> Canonical plan for the single **Profiles tile**. Consolidated from the Expanse-Edu profile-display
> docs, 4up personal_profile, 4eye profile-page / user-profiles / userProfile prompt, and the
> tasks.md Profile + Mental-Health integration notes. **Build surface:** `4eye-web-mockup` Tile + Storybook.

**Status:** Ideation → ready to implement (UI only; profile data is mostly stubbed/optional).

---

## 1. Concept

One **Profiles tile** that hosts every profile sub-view as switchable views (segmented control / view
switcher inside the tile). Profiles are **modular and optional** — the depth shown depends on user level,
membership, and preferences. The same profile carries across contexts (personal → professional).

A profile is a rich entity used app-wide for: content creation, social, learning, tracking healing,
tracking goals, suggesting content, and tracking what's being learned. We never expose everything at once;
logic decides which slices surface for which purpose. (This is a large, modular system — start UI-first.)

---

## 2. Sub-views (all inside the one tile)

| Sub-view | Purpose | Key content |
|----------|---------|-------------|
| **Users / People** | General identity profile | Who Am I, avatar, attributes, themes, pics, long-term memory, opinions, favorite topics, personality, interests |
| **Healing** | Wellness & recovery tracking | Health tracking, nutrition, motivation, healing tactics, mood/feelings over time |
| **Psychology** | Mental-health learning lens | Organizing thoughts, perspectives, trauma awareness, stories, coping/heal tactics |
| **Student** | Learner profile | Enrolled classes, assignments, XP/level, rewards, progress, reading level, language |
| **Teacher** | Educator profile | Classes taught, lesson planning context, rewards issued, class progress, differentiation needs |
| **Classroom / School** | Institutional profile | School advertising info, rewards/stores, highlighted/top students, attendance & growth stats, parent involvement (display avatars + usernames, not real names) |
| **Professional / Business** | Work identity (carries over from personal) | Role, skills, current goal, summary; mirrors personal profile aspects in a work frame |
| **Parent** | Guardian profile | Linked students, involvement, approvals/consent, progress visibility |

### Aspect contract (already defined in `@4eye/types/src/profile`)
`characteristics · preferences · skills · history · relationships · currentRole · currentGoal`
Each profile slice can opt aspects in/out of AI prompt context (see `ProfileContextBar`).

---

## 3. Profile entity content (superset)

**Identity (Users/People):** Who Am I, attributes, themes, pics, long-term memory, opinions, favorite, topics, personality, interests.

**Per-view extras:** goals, targets, memories, stories, important reminders, health tracking — multiple
"versions" of a person (what they each want / feel / have learned), per the profile-page note.

**Customization / display (from profile-display-users):**
- Public-display level is user-controlled (privacy of each field).
- Default aspects: avatars, artwork/NFTs, achievements, titles.
- Game/competition aspects: equipment & items, consumables/buffs/status, skills, specializations, perks.
- Ideas: AI-generated art profile images; toggle to display real names.

**School/classroom (from profile-display-school-and-classroom):**
- Schools advertise info, run specific rewards/stores.
- Highlight students / recent winners / top performers / recent recognition.
- Stats: attendance, XP earned over time, rewards purchased/redeemed, parent involvement.
- Students shown by avatar + username (not real names).

---

## 4. Existing assets to reuse (do NOT rebuild)

| Asset | Location |
|-------|----------|
| `ProfileCard` (compact/standard/expanded), `EditProfileForm`, `AccountSettings`, `ProfileCompleteness`, `UserAvatar`, `UserProfile` | `ExpanseFrontend/packages/ui/user/components/` (+ Storybook `apps/storybook/src/stories/User/`) |
| `ProfilePhoto` — 4eye character variants, zoom/crop, level badge | `4eye/packages/@expanse/brand-core/src/character/` |
| `ProfileContextBar` + `ProfileAspect` contract | `4eye/packages/@4eye/{features,types}/src/profile/` |
| Role selector (General/Student/Teacher/Investor/Parent/Developer) | hud-roadmap Phase 10 / `4eye-web-mockup/src/components/hud/mapContent/roles.ts` |
| Game status bars (Experience, Currency, ProfileIconStatusBar) | `ExpanseFrontend/packages/ui/game/components/` |

**Known improvement requests (from frontend-phase-1/5-userProfile prompt):**
- UserAvatar "Expanding" variant: center it; experiment with the top-left line (variations — line all the
  way around, 3 increasing-size lines like the logo, an "elevated/popping button" look **without shadows**).
- Move the level badge to **bottom-left** (currently bottom-right).
- Eventually move user components into the `@expanse/user` package and integrate with `@expanse/auth`
  (assume no backend for now; clean up if one exists). Later phase.

---

## 5. Implementation Plan (4eye-web-mockup)

Replace the `appRealm/ProfilePage.tsx` stub with a real Profiles tile following the **`seeding` tile pattern**.

```
src/Tiles/profiles/
├── model/
│   └── types.ts            # Profile, ProfileView, aspect slices, per-view data shapes
├── store/
│   ├── seed-data.ts        # example profiles for every sub-view
│   ├── ProfileStore.ts     # StubStore
│   └── ProfileProvider.tsx # Context + useReducer (active view, active profile)
├── components/
│   ├── ProfileViewSwitcher.tsx   # segmented control across the 8 sub-views
│   ├── ProfileHeader.tsx         # ProfilePhoto/avatar + name + level + titles
│   ├── views/
│   │   ├── UsersView.tsx
│   │   ├── HealingView.tsx
│   │   ├── PsychologyView.tsx
│   │   ├── StudentView.tsx
│   │   ├── TeacherView.tsx
│   │   ├── ClassroomView.tsx
│   │   ├── ProfessionalView.tsx
│   │   └── ParentView.tsx
│   └── shared/ (AspectList, StatTile, PrivacyToggleRow, ...)
├── ProfilesTile.tsx
└── Profiles.stories.tsx
```

Wrap existing `packages/ui/user` components where possible inside the views rather than duplicating.

### Storybook variants (acceptance)
- One story per sub-view (Users, Healing, Psychology, Student, Teacher, Classroom, Professional, Parent)
- Empty / new profile vs fully populated profile
- Privacy: public-display level low vs high
- Compact vs expanded density
- Mobile width
- View-switcher interaction (all 8 reachable)

### Phase checklist
- [ ] `model/types.ts` + seed data for all 8 sub-views
- [ ] `ProfileProvider` (Context + useReducer: activeView, activeProfile)
- [ ] `ProfileViewSwitcher` + `ProfileHeader`
- [ ] Each `views/*View.tsx` (reuse `ui/user`, `ui/game`, `brand-core` assets)
- [ ] `ProfilesTile` assembled; replace `appRealm/ProfilePage` stub
- [ ] Storybook stories for every variant above
- [ ] `pnpm typecheck` clean for new files

---

## 6. Out of scope (now)

Backend/auth wiring, real long-term-memory storage, AI prompt-injection logic, moving components into
`@expanse/user`, real healing/psychology data models. UI shells + example data only; the deep modular
profile system is a separate later initiative.
