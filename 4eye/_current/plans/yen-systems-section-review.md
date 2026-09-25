# Yen — Systems Section Review Plan

**Surface:** home `#group-systems` · Pure-text catalogue  
**Status:** Web 4 leads · Symbol Grid = Example (not final OS) · Docs dump retired (2026-08-09)  
**Related:** `_current/plans/yen-release-polish-v2.md` Track B · workshop catalogue sibling

---

## Also shipped: Workshop product loops (2026-08-09)

Parallel Pure-text catalogue under **The workshop** (`workshop-concepts.ts` /
`WorkshopHighlights`): Currency · Equipment · Quests · Progression · Gamification ·
Learning — Surfaces only list *sibling* destinations (Learn suite, Money, Character
loadout). Shared chrome: `PureTextCatalogue.tsx`.

---

## 1. What shipped

| Change | Why |
|---|---|
| Single Pure-text catalogue (`systems-highlights.ts`) | Symbol Grid / Pipelines language; AppTiles duplicated Symbol Grid |
| Bands: **OS · Stack · Surfaces · Docs** | Scannable inside one scrollport |
| Systems AppTiles removed from `AppGrid` | Apps remain in `apps.ts` for routes / compass |
| Shared `PureTextCatalogue` | Systems + Workshop one chrome |
| Band jump chips + card counts | Navigate without fighting the clip |
| **Show all** (persisted) | Nested scroll optional; phones default expanded |
| Honesty `note` lines | Stub / shared-anchor / alias called out without AppTile chrome |
| AI → Web 4 `#profiles-identities-agents` | Split from ConsensusEngine (still Integration Layer app mode) |
| Color tip + Web 4 walkthrough video in Docs | Research backlog closed for those two |
| Workshop Surfaces deduped | No second card for `/equipment`, `/4eye/gamification`, EDU |
| Quests → Command Center docs | Written account first; Plan tile stays in Docs band |
| Teach path includes Workshop | Path strip matches the new shelf |
| Learning tip Color href fixed | Was wrongly pinned to Improved Navigation |

---

## 2. Review checklist

### Visual / UX
- [x] Nested scroll escape — Show all + phone default expand
- [x] Band jumps outside the scroll clip
- [ ] Focus rings / fade on keyboard tab (fade still lifts on `:focus-within` when clipped)
- [ ] Quiet legendary diamond still reads without the word
- [x] Chips stay consistent (OS / Preview / Stub / Doc / Learn / Video / Essay / Alternate / Planned / …)

### Content accuracy
- [x] **Data** stub — honest Stub chip + note (keep until real write-up)
- [x] **Processes** — Web 4 Improved Nav pin + note until dedicated page
- [x] **AI** vs **ConsensusEngine** — split destinations
- [ ] **Roadmap** — still aliases Extension Plan (note present)
- [ ] **Technical docs** → `/docs#docs-top` still coarse (note present)
- [x] Color / Spatial / Cyphertext / walkthrough video in Docs band

### Still optional
| Piece | Notes |
|---|---|
| Improved Navigation as its own Learn card | Covered by Processes + Color section; skip unless visitors miss it |
| Lottie docs collection | Product in Surfaces; add Docs entry when collection URL is stable |
| 4ear docs | Only if systems is the right shelf |
| Auth / API / SDK / Webhooks | Stack once pages are more than placeholders |
| Series `layers` | Avoid triple-stating Integration Layer |

### Architecture
- [ ] `apps.ts` `presentation: "pure-text-only"` metadata for compass
- [x] Integration Layer sized host for `?mode=app` (already in `LayerModes.tsx`)
- [ ] Horizontal snap rail inside bands on mobile — less needed now that phones expand by default

---

## 3. Do not regress

- Pure text = title + blurb (+ chip / quiet diamond / optional note). No DocumentedIcon, no Live/Preview AppTile chrome in this section.
- One Symbol Grid entry only.
- Legendary stays quiet (diamond), never the word on the card.
- Surfaces band (workshop) must not re-list loop hrefs.
- Apps/routes keep working from compass and direct URLs.

---

## 4. File index

```
packages/@yen/content/src/systems-highlights.ts
packages/@yen/content/src/workshop-concepts.ts
packages/@yen/content/src/learning-tips.ts   # Color href fix
packages/@yen/content/src/paths.ts           # Teach → Workshop
packages/@yen/content/src/apps.ts            # group blurbs
apps/yen/src/components/PureTextCatalogue.tsx
apps/yen/src/components/SystemsHighlights.tsx
apps/yen/src/components/WorkshopHighlights.tsx
apps/yen/src/components/AppGrid.tsx
```
