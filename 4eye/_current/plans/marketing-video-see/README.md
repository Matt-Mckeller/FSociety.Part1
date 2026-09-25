# Marketing Video — "See" (Brand Intro)

> 4eye / Expanse brand intro video. Master cut ~75s, distributed as 6s hook / 15s / 30s / 75s hero.

## Single Promise
**Grow.** *(working — see Open Questions for validation plan)*

If a viewer remembers one thing, they should sense: *"this helps me grow into who I want to be."*

## Status
- **Stage:** Pre-production / planning
- **Production path:** AI-gen scrappy (Veo 3 / Sora 2 / Kling 2.5 / Runway Gen-4)
- **Master duration target:** ~75s
- **Last updated:** 2026-05-21

---

## Locked Decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | Master duration ~75s, cut to 30s / 15s / 6s | Vision density needs runtime; cuts serve platforms |
| D2 | Audio = music only for v1 | Cheapest, sound-off friendly, easy to re-version |
| D3 | Blend vision + product. Show the app *through use*, never via labels or callouts | Apple-style reveal. Tutorial mode kills brand video |
| D4 | Bionic / future-tech treated as **gear / armor / loadout** (game-like), never surgical | Game framing reads aspirational, surgery reads dystopian |
| D5 | Embedded / internal mods (neural, IV, eye replacement) **only in Scene 3** | Scene 3 is "dream / future" framing — clearly aspirational |
| D6 | School is the default master. Church / Personal / etc. are separate edits, not master variants | Avoids variant-count explosion |
| D7 | One-frame hero moment = teacher receives HUD from 4eye, it activates, light spills, students lift heads | Thumbnail, social poster, website still |
| D8 | Sensual / desire content is **tastefully** integrated (per brand guidelines), Scene 2 only, adult-coded never student-coded | Brand-safe + platform-safe |
| D9 | Lens shape progression: Circle → Triangle → Square → Circle-leveled | Maps to brand geometric language + 1:2:3 growth |
| D10 | **Primary style reference:** `/Users/mm/Projects/comic-strip/1-1.png` — anime-influenced, futuristic-grounded, HUD-overlay, embedded-data-in-environment | Already-proven look that matches every style bible target; reusable as image-ref in Sora 2 / Kling 2.5 |
| D11 | **4eye character in video = anime-transformed version**, not the SVG mascot from the web app | SVG mascot + anime scene = visual clash. Generate anime-style 4eye preserving identity cues (single glowing eye, strap/visor, antenna, mascot scale, glow color) |
| D12 | **Reference-asset library is a pre-production blocker** | Character/style consistency across 21 shots requires locked reference stills, not just text prompts. See "Seed Reference Assets To-Do" below. |

---

## Won't Include
Hard exclusions to keep production focused, brand-aligned, and platform-safe.

- ❌ No religious imagery, symbols, or "fighting over religion" beats
- ❌ No explicit sexual content (sensual is tasteful, never explicit; never on student-coded subjects)
- ❌ No surgical, medical, or body-horror imagery. Mods are *worn*, not *installed*
- ❌ No competitor references or comparison framing
- ❌ No spoken dialogue in v1 (music + sparing text overlays only)
- ❌ No product feature labels or callouts ("AI-powered…", "4 modalities tracked…")
- ❌ No present-day bionic implants in Scenes 1–2 (Scene 3 only)
- ❌ No clinical/scientific vocabulary (per brand guidelines)
- ❌ No dark / grimy / cyberpunk-dystopian environments
- ❌ No spoken brand name or domain in v1 (logo lockup only)

---

## Folder Structure

```
marketing-video-see/
├── README.md                          ← this file (master decisions, status, index)
├── 00-style-bible.md                  ← locked visual / motion / prompt fragments
├── 01-data-embedding-matrix.md        ← every concept, weighted, tracked
├── shot-list.md                       ← timeline-ordered shot tracker
├── scenes/
│   ├── lens-1-infinity.md             ← intro lens transition
│   ├── scene-1-classroom.md           ← engagement transformation (FULL TEMPLATE)
│   ├── lens-2-triangle.md             ← transition to scene 2
│   ├── scene-2-coffee-shop.md         ← connection / relationships / robots
│   ├── lens-3-square.md               ← transition to scene 3
│   ├── scene-3-neural-sea.md          ← future / dream / sharing
│   └── lens-4-halo-close.md           ← closing lens + logo lockup
├── prompts/
│   └── scene-1-shot-01-hud-reveal.md  ← real Veo 3 / Sora 2 prompt (HERO MOMENT)
├── references/                        ← drop inspiration stills here
│   ├── inspiration/
│   └── style-tests/
└── outputs/                           ← generated clips, organized by shot
```

### How to use the structure
- **Style bible** copied into every prompt for consistency across tools
- **Matrix** is the single source of truth for "which concepts are in / cut / pending"
- **Scene files** describe beat-by-beat what happens and which matrix concepts are embedded where
- **Prompt files** are the actual copy-pasteable text for Veo / Sora / Kling / Runway with seeds, takes, negative prompts logged
- **Shot list** is the timeline-ordered tracker — status of every shot from idea → locked

---

## Index

- 📐 [Style Bible](./00-style-bible.md)
- 🧬 [Data Embedding Matrix](./01-data-embedding-matrix.md)
- 🎬 [Shot List](./shot-list.md)

### Scenes
1. [Lens 1 — Infinity / Circle (intro)](./scenes/lens-1-infinity.md)
2. [Scene 1 — Classroom: Engagement Transformation](./scenes/scene-1-classroom.md) ⭐ full template
3. [Lens 2 — Triangle (Eyes / Ears / Body)](./scenes/lens-2-triangle.md)
4. [Scene 2 — Coffee Shop: Connection](./scenes/scene-2-coffee-shop.md)
5. [Lens 3 — Square (Stability / Success)](./scenes/lens-3-square.md)
6. [Scene 3 — Neural / Sea: Dream](./scenes/scene-3-neural-sea.md)
7. [Lens 4 — Halo Close + Logo Lockup](./scenes/lens-4-halo-close.md)

### Prompts
- [Shot 01 — HUD Reveal (one-frame hero moment)](./prompts/scene-1-shot-01-hud-reveal.md)

---

## Open Questions

| # | Question | Status | Owner | Notes |
|---|---|---|---|---|
| Q1 | Is "Grow." differentiated enough as the Single Promise? | Open | — | Test with 5 outsiders before locking |
| Q2 | Style lock — anime, stylized 3D, hyperreal cinematic, or AI-gen native look? | Open | — | Build one 5s style test before scaling |
| Q3 | Text overlays — yes/no/how much/which font? | Open | — | Tie to brand guidelines if yes |
| Q4 | CTA / end card — same across all cuts or per-placement? | Open | — | Website prob no CTA; social = strong CTA |
| Q5 | Success metrics — completion %, CTR, recall? | Open | — | Set before launch so v2 is data-driven |
| Q6 | Timeline / deadline | Open | — | Drives every other decision |
| Q7 | Does 4eye character have a face? Mascot, silhouette, or abstracted entity? | Open | — | Affects every shot 4eye appears in |
| Q8 | Number of visible students in classroom shots | Open | — | Recommend 6–8 for readability |

---

## Seed Reference Assets — To-Do

Lock before scaling generation. Each asset = one still saved into `references/inspiration/` or `references/style-tests/` with a 1-line note.

### Style references (mood / environment)
- [x] **"After" activated classroom mood** — covered by [`/Users/mm/Projects/comic-strip/1-1.png`](/Users/mm/Projects/comic-strip/1-1.png) (copy into `references/inspiration/style-bible/` and crop off the LOOP/SHOT labels)
- [ ] **"Before" desaturated classroom** — generate or source one still showing tired/disengaged classroom mood
- [ ] **Scene 2 — warm coffee shop with gentle robots** — generate one still
- [ ] **Scene 3 — bioluminescent sea / aspirational dreamscape** — generate one still
- [ ] **HUD design lock** — one hero still of the HUD activation look (partially covered by `1-1.png`'s horizontal HUD)

### Character references (identity locks)
- [ ] **Teacher** — 1 hero still, neutral expression, 3/4 view, for cross-shot consistency in S1
- [ ] **4eye character — video-style (anime-transformed)** — see D11. Must preserve identity cues from the SVG: single glowing eye, strap/visor, antenna, friendly mascot proportions, cyan glow. Web app character lives at [`Character4eye.tsx`](/Users/mm/Projects/4eye/packages/@expanse/brand-core/src/character/poses/Character4eye.tsx) — export an SVG-to-PNG render of the `friendly` variant as the *identity reference*, then generate anime-style variants from it.
- [ ] **4wing** — small companion character, 1 still in flight pose
- [ ] **Student archetypes (3 stills)** — the sprawler, the tent-kid, the already-higher-level
- [ ] **Adult connection-pair (Scene 2)** — 1 still
- [ ] **Dream-state ascending figure (Scene 3)** — 1 still

### Graphic / VFX references
- [ ] **Lens 1 — Infinity / Circle** — 1 still of the lens design
- [ ] **Lens 2 — Triangle (Eye/Ear/Body)** — 1 still
- [ ] **Lens 3 — Square (merged human + robot + heart symbol)** — depends on symbol design (open Q in [lens-3 file](./scenes/lens-3-square.md))
- [ ] **Lens 4 — Halo / evolved circle** — 1 still
- [ ] **HUD activation VFX** — 1 still of the glow/spill moment
- [ ] **Gear / tattoo-glow language** — 1 still of a student's glowing forearm tattoo + earpiece

### Tooling
- [ ] **CLI pipeline** — small TS script that reads a `prompts/*.md` file, attaches linked reference stills, calls the chosen AI-gen API (Veo 3 / Kling / Runway), saves to `outputs/`. Build after style test locks the primary tool.
- [ ] **Reference index file** (`references/INDEX.md`) — maps every still to which prompt(s) it should be attached to

---

## Migration Note
The original brain-dump lives at [../marketing-video-see.md](../marketing-video-see.md) and is preserved as historical reference. Going forward:
- **Concepts** → maintained in `01-data-embedding-matrix.md`
- **Story / beats** → maintained in `scenes/*.md`
- **Decisions** → maintained in this README's "Locked Decisions" table
- **Style** → maintained in `00-style-bible.md`

Pull anything still useful from the original doc into the appropriate new home; archive when done.
