# Profiles & Inventory — Canonical Plan Home

> **This folder is the single source of truth** for all Profiles and Inventory planning.
> All previously scattered plan files across the four repos have been consolidated here.
> The originals were moved to [`_archive-pending-review/`](./_archive-pending-review/) — each carries a
> note at the top stating whether it's an obvious delete and a summary. Review, then delete. See the Source Map below.

**Implementation surface:** `4eye/apps/4eye-web-mockup` — Tiles architecture + Storybook (port 6311), app (port 3311).
**State pattern:** React Context + `useReducer` (mirror `QuestsProvider` / `seeding` tile). No Redux/zustand.

---

## Documents

| Doc | Scope |
|-----|-------|
| [inventory-plan.md](./inventory-plan.md) | Inventory Page — backpack/items/rewards, categories, item actions, Storybook variants |
| [profiles-plan.md](./profiles-plan.md) | Single **Profiles tile** containing all profile sub-views (Users/People, Healing, Psychology, Student, Teacher, Classroom/School, Professional/Business, Parent) |

---

## Goals (this initiative)

1. **Inventory Page** — build it out in the mockup with example data and Storybook variants.
2. **Profiles tile** — one tile that hosts every profile sub-view as switchable views:
   - Users / People (general identity profile)
   - Healing
   - Psychology
   - Student
   - Teacher
   - Classroom / School
   - Professional / Business
   - Parent

---

## Source Map (where these plans came from)
Moved to `_archive-pending-review/` (were exclusively Profiles/Inventory — review then delete)

| Original file | Archived as | Absorbed into | Obvious delete? |
|---------------|-------------|---------------|-----------------|
| `ExpanseFrontend/Expanse-Edu-Docs/.../ideation/inventory-system.md` | `inventory-system.md` | inventory-plan.md | ✅ Yes |
| `ExpanseFrontend/Expanse-Edu-Docs/.../profile-display-users.md` | `profile-display-users.md` | profiles-plan.md | ✅ Yes |
| `ExpanseFrontend/Expanse-Edu-Docs/.../profile-display-school-and-classroom.md` | `profile-display-school-and-classroom.md` | profiles-plan.md | ✅ Yes |
| `ExpanseFrontend/apps/4up/plans/personal_profile.md` | `4up--personal_profile.md` | profiles-plan.md | ⚠️ Review (4up local plan tree) |
| `4eye/docs/features/profile-page.md` | `4eye-docs--profile-page.md` | profiles-plan.md | ✅ Yes |
| `4eye/docs/planning/plans/website/user-profiles.md` | `4eye-website--user-profiles.md` | profiles-plan.md | ⚠️ Review (linked from Plan.md/MasterPlan.md) |
| `Planning/roadmap/2026/prompts/frontend-phase-1/5-userProfile.md` | `frontend-phase-1--5-userProfile.md` | profiles-plan.md | ⚠️ Review (active refactor prompt)
| `Planning/roadmap/2026/prompts/frontend-phase-1/5-userProfile.md` | profiles-plan.md |

### Left in place (multi-topic files — Profiles/Inventory is only one section; these remain HUD/personal-scoped and are *superseded* for profiles/inventory by this folder)

| File | Relevant section |
|------|------------------|
| `4eye/packages/@expanse/shell/docs/planning/hud-plan.md` | Part 6 (Inventory & Rewards), 6b (Party Profiles), 6c (Role System) |
| `4eye/packages/@expanse/shell/docs/planning/hud-tasks.md` | Task Set E (Inventory & Rewards) |
| `4eye/packages/@expanse/layout/docs/planning/hud-roadmap.md` | Phase 6 (Inventory), Phase 10 (Social/Party Profiles) |
| `4eye/tasks.md` | "Profile Integrations", "Mental Health Integration" (personal file — AI ignores) |
| `Planning/roadmap/2026/plans/hud-demo-concepts.md` | backpack/inventory note |

### Existing implementation already built (reuse, don't rebuild)

| Asset | Location |
|-------|----------|
| `ProfileCard`, `EditProfileForm`, `AccountSettings`, `ProfileCompleteness`, `UserAvatar`, `UserProfile` | `ExpanseFrontend/packages/ui/user/components/` (+ Storybook under `apps/storybook/src/stories/User/`) |
| `@4eye/types/src/profile` (ProfileAspect contract), `@4eye/features/src/profile/ProfileContextBar` | `4eye` repo |
| `ProfilePhoto` (4eye character variants, zoom/crop) | `4eye/packages/@expanse/brand-core/src/character/` |
| `ProfilePage` / `StoresPage` stubs | `4eye/apps/4eye-web-mockup/src/Tiles/appRealm/` |

---

## Status

- [x] Originals moved to `_archive-pending-review/` (with status notes)
- [ ] You review archive, then delete
- [x] Exclusively-relevant originals deleted
- [ ] Inventory Page implemented (mockup + Storybook variants)
- [ ] Profiles tile implemented (sub-views + Storybook variants)
