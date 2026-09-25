# Brain page — optimize & simplify

**Problem:** Brain is the right *operating mind* destination (Mood/Status, Perspectives, Relationships, Recently learned), but the page still reads as four dense, differently-spoken panels. Colour invents extras outside `brainTokens`, Wants dump everything at once, Perspectives cards are large for a glance grid, Relationships lead with a loud under-construction banner, and the educational Mappings legend is always fully open.

**Goal:** Make Brain easier to scan, easier to *learn*, and more consistent — denser where it should glance, expandable where it should teach — without changing what the lens owns vs Psychology / Events.

---

## Verdict

| Do | Don't |
|---|---|
| One colour vocabulary via `brainTokens` (+ domain hues only for Perspectives identity) | New hexes in Wants links, valence mid-tones, or panel chrome |
| Collapsed Want cards → expand for formula / links / blocked / fed-by | Always-open Want dossiers |
| Compact Perspective tiles (glyph + label + bar + weight); detail stays in dialog | Sparkline + trend + target on every card |
| Tiny under-construction chip / one-line note | Full amber callout box at top of Relationships |
| Mappings legend collapsed by default (`ShowMore`-style / accordion) | Always-visible type + seats + edge legend |
| Short section intros that teach the model | Duplicate status (Today strip already covers mood glance) |

Keep lens ownership: **Brain** = present-tense OS; **Psychology** = stable MH profile; **Events** = full chronology.

---

## Current surface (what we are polishing)

```
Brain (LensBody)
├── Mood & Status     → StatusRAMPanel (tabs: Wants · RAM · Memory · Cold)
├── Perspectives      → PerspectivesPanel (grid + detail dialog)
├── Relationships     → RelationshipsPanel (UC banner · charts · graph · SystemLegend)
└── Recently learned  → CharacterTimeline (filtered)
```

Pain points today:

1. **Colour drift** — `WantCard` uses `LINK_KIND_COLOR` pinks/roses/browns; `valenceLabel` invents sky/orange mid-steps; Queen remote violet is fine but competes with warn chrome if both shout.
2. **Wants are all-open** — intensity, links, formula, description, blocked, fed-by always shown → hard to compare wants; educational depth never “opens.”
3. **Perspectives too large** — `minmax(200px)`, icon 30px, sparkline + trend + target line = dashboard tiles, not stance chips.
4. **UC banner dominates** — full bordered amber box + Friends bug strip + Queen callout = three status stories before the graph.
5. **Mappings always on** — `SystemLegend` (types · seats · edge values) is the best educational block but costs vertical attention after every graph view.

---

## Design principles

1. **Glance → expand → dialog.** List/grid for comparison; inline expand for “teach me this row”; dialog for edit / full history.
2. **Colour means one thing.** Valence = good/hard/mixed; rank = significance; page chrome = `BRAIN_ACCENT`; domain colour = Perspectives only; relationship *type* colour = graph edges/nodes only.
3. **Construction is a footnote, not a hero.** Ship the live Love chart; mark unfinished charts quietly.
4. **Teach with progressive disclosure.** Mappings and Want formulas are curricula — default collapsed, one click to study.

---

## Colour plan

### Keep / extend `brainTokens.ts`

| Token | Role |
|---|---|
| `BRAIN_ACCENT` | Filters, section hints, expand controls, King hub |
| `VALENCE` | Good / hard / mixed — memory, timeline, relationship tone |
| `significanceBand` | Memory / RAM rank chips |
| `BRAIN_WASH.warn` | Under-construction / bugs — **low intensity only** |
| `BRAIN_WASH.remote` | Queen / remote presence |

### Fixes

- **Want link chips:** map `goal` / `priority` / `redirect` onto accent + valence (or Character Core goal ink if already shared) — drop `LINK_KIND_COLOR` one-offs.
- **Relationship tone:** collapse mid-tones into `VALENCE` (+ optional “tense” as warn wash, not a fifth family).
- **Want card accent:** keep per-want colour as *identity for that drive*, but chrome (expand chevron, labels FORMULA / FED BY) uses `BRAIN_ACCENT` / muted text so the page does not rainbow.
- **Section hints:** one caption style (already used on Perspectives) — reuse on Wants and Relationships short intros.

Out of scope: rewriting Character `characterPalette` channel system; Brain stays on `brainTokens`.

---

## Wants — expandable cards

**Collapsed (default):** glyph · label · intensity bar · optional 1-line description (clamp 1–2 lines) · expand affordance if meta exists.

**Expanded:** full description · GOAL / PRIORITY / redirect chips · FORMULA marks · Blocked by · Fed by · short “how to read this” line when useful (e.g. money → Relationships redirect).

Patterns:

- Reuse Character’s expand gesture language (`ShowMore` / chevron) or a per-card `aria-expanded` row — prefer **per-card expand** (not one global ShowMore) so users can open one want and compare to a collapsed neighbour.
- Optional: expand highest-intensity want by default once per session for education; otherwise all collapsed.
- Money / redirect wants: collapsed chip “→ Relationships”; expand explains the seat mapping.

Files: `StatusRAM.tsx` (`WantCard`, `WantsPanel`); seed copy in `model/status` only if new teach lines are needed.

---

## Perspectives — smaller cards

**Collapsed tile target:** ~`minmax(140–160px)`, tighter padding (`p: 0.85`), glyph ~22–24px, no sparkline/trend on the card.

Show on card:

- Glyph + label
- Weight bar
- Current weight (compact); importance only if space (or tooltip)

Move to existing detail dialog (already strong): sparkline/history, target, engagement, related topics, edit stance.

Grid: `minmax(148px, 1fr)` or similar so 3–4 columns fit more often.

Files: `Perspectives.tsx` (`PerspectiveCard` layout only; dialog largely unchanged).

---

## Relationships — quieter construction + expandable mappings

### Under construction

Replace the large amber box with a **single-line status**:

`Under construction · Love chart live · Friends pending`

- Icon ≤14px; no padded callout; optionally sit beside “RELATIONSHIP CHARTS” label.
- Keep Friends disabled + tooltip; drop the redundant second “Friends · disabled…” warn paragraph if the chip/tabs already say it.
- Queen remote banner: keep (it teaches presence) but tighten copy; do not stack another construction story on top.

### Mappings (`SystemLegend`)

- Default **collapsed**: header `Mappings · types, seats, edge values` + chevron / `ShowMore`-style control (`BRAIN_ACCENT`).
- Expanded: current types grid · seats · values-on-edge (content stays; density can tighten slightly).
- Optional one-line collapsed preview: three colour dots for Partner / Family / Friend so colour remains learnable without opening.

Files: `Relationships.tsx` (`SystemLegend` wrap, UC banner, maybe `ChartViewTabs` warn strip).

---

## Consistency pass (cross-panel)

| Element | Standard |
|---|---|
| Section intro caption | Accent-tinted, 1 sentence, same weight as Perspectives hint |
| Card chrome | `borderRadius: 2`, left accent *or* soft wash — pick one pattern per panel and stick to it |
| Expand control | Same chevron + uppercase micro-label language as Character `ShowMore` |
| Detail dialogs | Keep; do not add a third expand layer for Perspectives |
| Empty / WIP states | Caption + optional icon — never a second full banner |

Optional small win: one-line Brain page blurb above the two-column stack (“Present-tense mind — expand a want or mapping to learn the model”) if the rail hint is easy to miss — only if it does not clutter.

---

## Information architecture (educational value)

What each section should teach after this pass:

| Section | Glance | Expand / open |
|---|---|---|
| Wants | What is pulling, how hard | Why, formula, links into goals/relationships |
| RAM / Memory / Cold | Load and ranked traces | (existing cards; align colour only) |
| Perspectives | Stance by domain at a glance | History, target, edit |
| Relationships | Who is on the board (Love) | Person detail; **Mappings** = how to read the graph |
| Recently learned | What the mind picked up | Full Events lens |

No new Core lens. No nesting Psychology back under Brain.

---

## Phases

### P0 — Polish (ship this)

1. Shrink Perspective cards; demote sparkline/trend to dialog.
2. Want cards: collapsed + per-card expand for meta.
3. Relationships: tiny UC line; collapse `SystemLegend` by default.
4. Colour: remove `LINK_KIND_COLOR` / mid valence one-offs; route through `brainTokens`.
5. Align expand chrome with `ShowMore` visual language (`BRAIN_ACCENT`).

### P1 — Teach harder (optional)

- Collapsed Mappings colour-dot preview.
- Short “how to read” captions on Wants / Relationships intros.
- Cap long Wants list with `useCapped` if seed grows past ~5–6.
- Soft-link chip from Brain Mood tab → Psychology (“Stable profile”).

### P2 — Out of this plan

- Fix Friends chart evolution bug (separate).
- Full relationship graph rebuild.
- Emotion.Inspect HUD (own plan).
- Psychology content depth.

---

## Files (expected)

| Path | Change |
|---|---|
| `theme/brainTokens.ts` | Optional link-kind / tone helpers; comments |
| `components/StatusRAM.tsx` | Expandable `WantCard`; colour cleanup |
| `components/Perspectives.tsx` | Compact cards + denser grid |
| `components/Relationships.tsx` | Small UC; expandable `SystemLegend` |
| `components/shared/ShowMore.tsx` | Reuse or extract a thin `ExpandRow` if Want/Mappings need the same control without list capping |
| `profiles/components/LensBody.tsx` | Only if section titles / one page blurb change |

---

## Acceptance checklist

- [ ] Brain still owns only Mood/Status, Perspectives, Relationships, Recently learned
- [ ] Perspective grid shows more tiles per row; detail dialog still has history/edit
- [ ] Want list comparable at a glance; expand reveals formula/links/blocked/fed-by
- [ ] Relationships opens on graph/queen without a large amber construction card
- [ ] Mappings hidden until opened; content unchanged when expanded
- [ ] No new colour families outside `brainTokens` + intentional domain/type identity hues
- [ ] Expand controls feel like Character `ShowMore` (chevron + micro label)

---

## Open choices (confirm before implement)

1. **Want default:** all collapsed vs auto-expand top want once?
2. **Mappings control:** accordion under graph vs Character-style `ShowMore` button?
3. **Perspective importance on card:** keep tiny “imp N” or tooltip-only?
