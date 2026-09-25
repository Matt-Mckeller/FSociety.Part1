# Yen Release — Polish v2 (Merged Plan)

**Source:** Claude plan `async-baking-knuth.md` + Cursor deltas (2026-08-08)  
**Site:** `4eye/apps/yen` · port 3400  
**Quality bar:** Perfect · represents Matthew McKeller · teachable via recordings  
**Audience:** smart people, gamers, executives, AI builders, Expanse learners  
**Outcome:** years of work → one polished surface → teach → sell/build → financial recovery  

---

## ★ TOP PRIORITIES (this wave — do first)

### A. Home intro — simplify the offer + cyphertext + animations + intro video

1. **Headline cyphertext:** keep the thesis *"… of learning, education, work and life"* but **swap Gamification → Future** via scramble/morph (hold on Future). Style the band like a product pitch, not a docs dump.
2. **Lede rewrite:** one short paragraph that says what is being offered (apps + profile + plans + EDU + recordings + docs), status, and goals of the site itself.
3. **Animations** on the intro (morph/scramble, subtle entrance) — reuse MorphingHeadline / MorphLabel patterns.
4. **Intro video placeholder (again):** dedicated mainline entry `site-intro-all` — *"Recording intro of everything on this site"* — `src: null`, chapters for Web4 / Profile / Plans / EDU / content. Pin it in SeriesHighlights + hero CTA. This has been requested repeatedly; it must stay visible until shot.
5. **Highlights explainer video:** `highlights-what-is-here` — walks the visitor through what exists on yen (inventory tour). Placeholder until recorded.

### B. Pathing & information hierarchy

| Priority | Surface | Role |
|---|---|---|
| Most important (structure) | **Web 4**, **Profile**, **Plans** (roadmap/extension), **EDU** | Orientation + product truth |
| Most engaging / pull | **Content-first** (videos, posts, live, field feeds) then web/app surfaces | Retention + teaching |
| Also required | Systems, Storybooks, Integration layers (full app), Equipment, Donate | Completeness |

Verify everything that should be on the website **is** on the website — description, status, goals for the site itself (not only app tiles).

### C. Matthew McKeller as 6th product

Add product tile **Matthew McKeller** → `/4eye/appRealm/profile`. Profile high on home is correct (*meet Matthew*). Real name = Matthew McKeller.

### D. Profile — multi-user + optimize for Matthew

1. Selectable profiles (dropdown). Default = Matthew.
2. Save current River / example settings as **another user** (not deleted).
3. Optimize profile content for Matthew's goals.
4. **Goals for myself** section + **Perfect Loves &lt;3**.
5. Surface integration-layer signature goals (`GOALS` / LiquidCrown set) on profile **and** yen home — stop hiding them behind Human panel only.

### E. Fix Integration Layers app view

`/integration-layer?mode=app` must load the full tile (same as `/4eye/integration-layers`). Root cause: `TileContainer mode="fit"` is absolute and collapses under PageShell. Fix with sized relative host (and/or deep-link to HUD-mounted route). Default preference: Application mode discoverable.

### F. Docs — organization, menu, vision images, dedupe

Improve left Find menu, classifications, visual appearance. Add vision/image slots where images belong. Review and cut duplications (Web4 pin vs highlights vs learning tips vs collections).

### G. Directional docs — align

Review and align further work against:
- `_current/plans/high-level-direction-review.md`
- `_current/plans/vision-variables-plan.md`
- `_current/plans/timeline-roadmap.md`
- `_current/plans/yen-unified-release.md`
- Web 4 essay

### H. Documentation ↔ projects verification

Spot-check docs collections against real apps/repos (status, links, out-of-date banners). Mark incomplete Storybooks honestly (done). Flag orphans.

---

## Suggested improvements (agent)

1. **Site status card** on home — Description / Status / Goals of *yen itself* (shipping this release, recording week, financial recovery).
2. **Primary path strip:** Web 4 · Profile · Plans · EDU · Videos — five chips, not twenty equal tiles.
3. **Default Integration Layers to Application** once layout fix lands; Docs as secondary tab.
4. **Content hub** (`/videos` + posts + live) as the engagement product; apps as depth.
5. **Dedupe Series vs Highlights vs Web4 pin** — one teaching spine, cross-links, not three restatements.
6. **Profile goals = GOALS + Perfect Loves + personal weekly** — one GoalsShowcase, not placeholder PROFILE_GOALS.
7. **Vision page** with image slots + AION end-state (still missing `/vision`).
8. **Record checklist** on `/videos` mainline: site-intro-all, highlights-what-is-here, guided tour, series trio, EDU.
9. **Services income track** from high-level-direction stays parallel — don't pretend yen alone is the money path.
10. **Quiet legendary + Processes** stay; add **Perfect Loves** as quiet heart mark on profile.

---

## 0. North star (do not lose this)

This is a **release of everything that matters**, not another documentation pass.

| Must be true at ship | Means |
|---|---|
| Polished & clean | No broken Storybooks, no dead CTAs, no equal-weight noise |
| Represents me | Profile, vision, equipment photos, voice on video, communication intent |
| Teachable | Home → walkthrough video → folders of videos → docs left-rail → lenses |
| Highest value first | Legendary quietly marked; Processes legendary; Series as primary entries |
| Dual audience path | Cold visitor starts on **videos**; returning power user starts on **apps/systems** |
| Cats | Dual-wielding bonus attached to cat(s) on character |

---

## 1. What already landed (from prior Claude plan)

Do **not** re-plan these as greenfield. Verify, polish, wire deltas.

| Item | Status | Where |
|---|---|---|
| App badges / ranks / statusNotes | ✅ | `@yen/content/apps.ts` |
| 4eye flagship, CC alternate-view, services documented-only | ✅ | same |
| ThemedAnimationNFTs + legendary rarity | ✅ | `apps.ts` (`id: lottie`) |
| SeriesHighlights on home | ✅ | `page.tsx` + `SeriesHighlights` |
| Docs scores / age bands / topic filter / highlights | ✅ | `docs/page.tsx`, `highlights.ts` |
| Crown stage / fullscreen / TV picker | ✅ components | `components/crown/*` — polish motion + reduced-motion |
| Integration Layer doc ↔ app mode | ✅ fixed host + default app | `LayerModes.tsx` |
| Both Storybooks mounted | ✅ | `/apps/storybook` — incomplete + known-provider note |
| Profile multi-user + Matthew + Perfect Loves | ✅ | profiles seed + ProfilePage + Core lens |
| Future cypher intro + site offer card | ✅ | `CypherHeadline` + `overview.ts` |
| Intro / highlights video placeholders | ✅ | `media.ts` + SeriesHighlights |
| Matthew McKeller 6th product | ✅ | `apps.ts` |
| Vision destination `/vision` | ✅ | `app/vision` + about entry |
| Equipment Matt photos | ✅ | `public/media/matt` + `imageSrc` |
| Primary path strip | ✅ | home + docs |
| Live social chain stub | ✅ | `/live` |
| Cats dual-wield (Mochi & Ember) | ✅ | equipment companions + perk + glyph; Amelia stays dark |
| Life feed continue | ✅ | `CharacterFeed` Show More + seeded log |
| Profile Core lens love/brand | ✅ | Perfect Loves showcase + brand alignment |
| Expanse EDU SITE_URL | ✅ | `ExpanseFrontend/.../config/site.ts` → expanseservices.com; backend EDU API host still flagged |
| Storybook honesty | ✅ | incomplete banner + provider caveat |
| Cats names / live accounts / more Matt equipment shots | ❌ | needs Matthew |

Prior plan tracks 1–5 remain the base. **This file is the delta + sequencing override.**

---

## 2. Placement decisions (answered)

### 2.1 Attachment / chasing / competitive habits

**Primary home: Character Profile — Brain + Traits (who you are under pressure).**  
**Secondary: Vision (where that energy points).**  

Do **not** dump it only in Vision. Habits describe present character; Vision is the directional read. Cross-link both ways. If you want a dedicated “character profile page” in yen chrome, that is still `/4eye/appRealm/profile` (Character / Brain lenses) — not a new yen-only page.

### 2.2 `web-4-projects-story-whoami-whoarewe`

**Clean the hero.** Recommendation:

1. **Home top:** you on camera (homepage walkthrough) + “Watch walkthrough” that scrolls to the video / walkthrough band.  
2. **Docs top:** pin the Web4 essay as canonical (left-rail + top strip), not only a hero deep-link.  
3. **Hero overview** (`overview.ts` primary → Web4): demote to a quiet pin / icon after the video path exists.  

Recording the homepage and treating documentation as the site is the right teaching loop. Keep the essay discoverable without making the first viewport a wall of plan links.

### 2.3 Color / Spatial / Cyphertext / Improved Navigation

**Where the content is today**

| Idea | Canonical text | Old live surface |
|---|---|---|
| Improved Navigation & Human Guidance | Web4 doc § (≈L351) | Command Center ` /insights/strategic-focus` |
| Color is Powerful · #Learn #UX | same section | mostly doc-only |
| Spatial / Cyphertext is Powerful | same section | Storybook HUD resource bars linked from doc |

Partially pulled into docs **Technical highlights** (`highlights.ts`) but **not** as learning lenses or a tip chain.

**Plan:** add **Docs Lenses** (UX-component pattern, optimized for reading) + a **Top learning tips** strip / video chain:

1. Color is Powerful  
2. Spatial is Powerful  
3. Cyphertext is Powerful  
4. Improved Navigation & Human Guidance (link CC strategic-focus when mounted + Web4 anchors)

### 2.4 Communication Planner + women of interest

Extend Communication Planner as **clarification of relationship / communication intent**, not gossip.

Include **Emiru**, **Bonnie**, **Amelia** as named entries with fields you control (role, medium, what “success” looks like, privacy level).

**Amelia framing — your call before publish.** Options to encode as selectable `framing` on the entry (public copy uses the chosen one only):

- game player / peer  
- information gatherer  
- coincidence / “accidentally ordered” narrative  
- intentional lesson on love/marriage across mediums  

Default ship: **private or soft-public** until framing is locked. Do not publish spy accusations.

### 2.5 Legendary data value

Section cards + profile chrome are already Series / HVD-tagged. **Hide the word “legendary” in the open**; keep a quiet rarity icon (reuse equipment `RARITY_COLOR`) on the card corner / profile header.

---

## 3. New / expanded tracks (merge into release)

### Track A — First-run, feed, videos (do next with teaching in mind)

1. **Continue feed** (profile Life / social feed + field feeds on media).  
2. **Videos page folders / minimization / organization** — group by teaching purpose (Walkthroughs, Field, Plan read-throughs, On camera, Placeholders), collapsible folders, not a flat dump.  
3. **“Watch walkthrough”** CTA → smooth-scroll to video / walkthrough section on home (and `/videos` anchor).  
4. **“New here?”** → **start with videos**, not app recommendation. Update `CompassInner` / `startHere` so cold path prefers `/videos` (or home video band); keep power-user app suggestions secondary.  
5. Home recording slot: you at the top teaching the site.

### Track B — Systems underneath (OS + tech highlights)

Group blurb already: “How the products are planned, connected and run.” Expand the **systems** surface:

| Highlight | Treatment |
|---|---|
| **Symbol Grid** | Label as **OS** (subtitle / chip on tile + systems section) |
| Pipelines | tech highlight card → `/4eye/technical/pipelines` |
| **Processes** | **LEGENDARY** (quiet icon + rank) — huge component of the technical story |
| Context | highlight |
| Data | → `/4eye/technical/data` |
| AI | highlight + ConsensusEngine |
| UI | highlight |
| Other tech | short strip |

**ConsensusEngine:** concept card — pool multiple AIs, collect all opinions, surface disagreement / consensus. Place under systems (Integration Layer / AI) and document in docs technical highlights. Stub UI OK if labelled preview.

### Track C — Workshop honesty + graphics

Add (or surface) workshop entries, **grayed + disabled**:

- Sample v1 Privacy  
- **Shield4**  
- **Swords.List()**  

Continue improving SVGs / section-card graphics for these and existing workshop tiles. Disabled means visible in inventory, not launchable — future work signal.

### Track D — Docs IA + Storybooks + learning lenses

1. **Left-hand find list** on `/docs` — sticky nav: collections, Top ranked, Web4 pin, Learning tips, Components.  
2. **Better component documentation** — storybook cross-links + short “how to read this component” blurbs on docs/workshop.  
3. **Storybooks:** fix yen-view errors (keep only intentional error stories). Label page + tile: *potentially incomplete · missing coverage · needs organization · possibly out of date*. Output / keep the public Storybook link(s) obvious.  
4. **Docs Lenses** for Color / Spatial / Cyphertext (+ Improved Navigation).  
5. Iterate **feedback systems** UI → screenshots in docs/media → Storybook stories → link to Storybook from the write-up.

### Track E — Live presence + social chain

1. **“See Matt Live”** button (header / about / home).  
2. **`/live` stream page** — player + schedule placeholder + VOD fallback to `/videos`.  
3. **Combined social search → live feed of the chain** across platforms / accounts.  
4. **Publish from the site** (yen is the publisher of record; platforms redistribute). Architecture note: ingest → normalize → site feed; do not make Twitter/etc the source of truth.

### Track F — Profile / equipment / character (continue + deltas)

Continue Claude Track 4, plus:

| Delta | Where |
|---|---|
| Matt photos on equipment even if unequipped | `/equipment` + character equipment panel |
| Dual-wielding cats bonus | character perks / buffs / companion slot |
| Attachment / chase / competitive | Brain + Traits; Vision link |
| Wants / Emiru-first mood (prior plan) | Status strip |
| Communication Planner intent entries | `/apps/communication-planner` showcase + private notes model |
| Vision page | `/vision` in about group |

Privacy: chapters / journals stay hand-authored publishable prose; `_private-redaction` never indexed.

### Track G — Release polish checklist

- Profile represents Matthew (photo, voice, wants, love/core, cats).  
- Learning concepts (Color / Spatial / Cyphertext / Processes / Web4) highlighted.  
- Work / life / edu concepts ranked, not alphabetized noise.  
- Recording-ready: placeholders chaptered, walkthrough CTAs work, folders make lesson order obvious.  
- Bundle budgets still hold on content routes; three.js stays dynamic on home.

---

## 4. Sequencing (override)

Prior plan said Track 1 → 5. **For this release wave:**

```
A (first-run / videos / feed)     ← teaching path; unblocks recording week
D (docs left-rail + storybook fix + learning lenses)
B (systems OS + Processes legendary + ConsensusEngine)
C (workshop disabled inventory + SVG)
E (See Matt Live + social chain)   ← can stub page early, wire ingest later
F (profile / equipment photos / cats / vision / comms)
G (pass: polish, screenshots, storybook links, budgets)
```

Crown / Series / EDU polish ride along when touching those surfaces — no separate week unless broken.

---

## 5. Concrete file / route targets

| Work | Primary targets |
|---|---|
| New here → videos | `apps.ts` `startHere`, `CompassInner.tsx`, home CTA band |
| Watch walkthrough scroll | `page.tsx` / `SeriesHighlights` / media band ids |
| Videos folders | `media.ts` segments + `MediaLibrary` / `VideoLibrary` |
| Systems highlights | new `@yen/content` systems strip + `AppGrid` systems header |
| Symbol Grid as OS | `apps.ts` symbol-grid title/summary/badge |
| Processes legendary | systems highlight entry + quiet rarity icon |
| ConsensusEngine | content model + systems / integration card |
| Disabled workshop apps | `apps.ts` + `AppGrid` disabled style; Shield4 / Swords / Sample Privacy |
| Docs left rail | `docs/page.tsx` + `docs.css` |
| Docs lenses | `highlights.ts` or `learning-lenses.ts` + docs UI |
| Storybook incomplete banner | `apps/storybook/page.tsx` + `apps.ts` statusNote |
| Live | `app/live/page.tsx`, header CTA, `apps.ts` about entry |
| Social chain feed | content feed model + Life lens / `/live` or `/feed` |
| Equipment photos | equipment content + `EquipmentBoard` |
| Cats dual-wield | `character/status` or equipment companion perk |
| Vision | `app/vision/page.tsx` |
| Communication planner | showcase content + intent entries |

Storybook links (publish in docs + workshop page):

- Yen mount: `/apps/storybook` (4eye + Expanse switcher)  
- Note package-level books as footnote only if still unmounted  

---

## 6. Open items (need your lock)

1. ~~**Amelia public framing**~~ — **held dark** (in `communication-intents.ts`, filtered by `publicIntents()`; never on public yen). Raise privacy only after framing lock.
2. ~~Which cat(s) dual-wield~~ — **Mochi & Ember** (rename anytime). Perk + companion slots shipped.
3. Live ingest: which platforms/accounts first; publish-from-site auth. *(/live stub shipped)*
4. Ice-cream edit / recent recordings chaptering (prior 1.8 assumption).
5. Pluto worldbuilding out of `_private-redaction` — yes/no.
6. Chapter prose — your words before ship.

---

## 7. Verification (release gate)

From `4eye/apps/yen`:

- `npm run dev` · cold path: New here → videos · Watch walkthrough scrolls · folders work  
- `/docs` left rail finds Web4 + learning tips · lenses render  
- `/apps/storybook` loads without unintentional errors · incomplete banner visible  
- Systems: Symbol Grid reads as OS · Processes legendary quiet icon · ConsensusEngine visible  
- Workshop: Shield4 / Swords.List / Sample Privacy grayed disabled  
- `/live` + See Matt Live present (stub OK)  
- `/equipment` shows Matt photos · character shows cat dual-wield bonus  
- `npm run budget` · `npm run typecheck` (strict) · profile lenses smoke  

---

## 8. Launch order (attention / work ratio)

1. Home video + New here → videos + folders (you can teach immediately).  
2. Docs left rail + learning tips (Color / Spatial / Cyphertext).  
3. Systems Processes + Symbol Grid OS + ConsensusEngine card.  
4. Storybook fix + incomplete honesty.  
5. See Matt Live stub + equipment photos + cats.  
6. Social chain feed + Communication Planner clarifications (careful publish).  
7. Vision + remaining profile Track 4.  
8. EDU polish + backend migration note (product launch track).
