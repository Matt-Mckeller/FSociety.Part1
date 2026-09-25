# Profile · Engagement page

> Port the [KB + trained visualizations canvas](/Users/mm/.cursor/projects/Users-mm-Projects-4eye/canvases/matthew-profile-kb.canvas.tsx) into the real **Profile** surface as a new Core lens: **Engagement**. Frontend / design / teachability first; formulas stay hardcoded.

**Status:** Ready to build  
**Profile:** expanse_eye · Matthew McKeller  
**Depends on:** [profile-kb-trained-visualizations.md](./profile-kb-trained-visualizations.md) · canvas explorer (source of truth for UX)  
**Related:** Profile `lensGroups` · Brain / Life / Events · Learning styles · InterestsEngagementGrid · F14 Learning Modes

---

## Goal

Ship an **Engagement** page on Profile that feels like the canvas: one synced knowledge set, toggleable lenses, mastery vs engagement, life bubbles, signals alphabet, social stubs, saved views — polished to the profile design system so it is:

1. **Educational** — teaches *engage ≠ learn*, *mastery ≠ attention*, topic sync, saved viz  
2. **Useful later** — same data shape for F14 Knowledge Web, social evidence, training loops  
3. **Beautiful now** — matches Profile jade ink / SurfaceShell / disclosures; no dashboard sludge  

**Not in this build:** engagement formulas, OAuth social, `@yen/content` rollup engine.

---

## Auditory correction (done in seeds + canvas)

| Field | Before | After |
|-------|--------|--------|
| Learn fit (`weight` / learning `base`) | 52 | **28** — do not learn much from audio |
| Engagement | 28 | **92** (band 78–98) — engage very hard with audio / EDM / voice |

Blurb: *High engage with audio — low learn-from-audio fit.*  
Updated: canvas `l-auditory` · `@yen/content` `learning-styles.ts`.

---

## Where it lives in the app

- New **Core** lens: `engagement`

```
Core rail (proposed order):
  surfaced → character → today → core → brain → engagement → psychology → body → life → events
```

- After **Brain** (operating mind / recently learned) and before **Psychology**  
- Reads as: *what has my attention and how do I explore it*  
- Distinct from Character (loadout) and Life/Events (chronology)

**Nav (updated):** Engagement is **not** on the Core rail. It lives under **Other → Complex**, with **Facets** nested beside it in the same Other menu — keeps Core short.

### Route

No new top-level URL required for v1 — same Profile page, rail selects `engagement`.

Optional later: deep link `?lens=engagement` (ProfilePage already owns lens state; persist query if easy).

### Files (primary)

| Area | Path |
|------|------|
| Lens registry | `apps/4eye-web-mockup/src/Tiles/profiles/components/lensGroups.ts` |
| Rail labels | `LensRail.tsx` `lensLabel()` |
| Body switch | `LensBody.tsx` → render `<EngagementLens />` |
| New UI package | `.../profiles/components/engagement/` (or `character/components/engagement/`) |
| Content seed | `packages/@yen/content/src/character/knowledge-base.ts` (+ signals / saved) |
| Re-exports | `apps/4eye-web-mockup/src/Tiles/character/model/` thin re-exports |
| Story | `Engagement.stories.tsx` + Profiles story lens |

Yen host already mounts Profile via mockup; no separate yen page unless we add a product tile later.

---

## UX parity with canvas (keep what you like)

Port these **exactly** in spirit:

| Canvas lens | In-app section / mode |
|-------------|------------------------|
| Meaning | Themes + wants · dual bars |
| Skills | Nested professional / foundation / developing |
| Knowledge web | Multi-mode: clusters (default) · links · compare · edge list + tooltips |
| Life & events | Sized icon bubbles + chart + table |
| Learning fit | Fit vs engage dual bars (auditory = low fit / high engage) |
| Signals | Alphabet nested by kind · color bubbles |
| Social | Evidence → Focus KB/signal (dark row styled, not soft-public) |
| Saved | Cards that restore mode + topics + metric + focus |
| Schema | Compact provenance / field legend (collapsible) |

**Global chrome (sticky under identity or top of lens):**

1. Topic filter chips (sync all modes)  
2. Score mode: Mastery / Engagement / Both  
3. Mode pills (Meaning → … → Saved)  
4. Selection card: mastery, engage, band meter, blurb / learned  

Callouts: *Engagement values are authored for display — formulas later.*

---

## Design system rules (profile-native)

- Use **SurfaceShell**, `useInk` / profile jade anchors, `SectionDisclosure` for nests  
- Prefer existing meters / WeightMeter patterns from HighestValue where helpful  
- **No** purple-glow AI aesthetic; no emoji decoration; flat surfaces  
- Motion: 2–3 intentional (lens enter, bubble focus, mode crossfade) — respect `useReducedMotion`  
- Mobile: topic row wraps; bubble field scrolls horizontally; tables can disclosure-collapse  
- Educational microcopy: one short sentence per mode (canvas tooltips → `title` + caption)

**Composition:** one job per mode. First viewport of Engagement = identity context already on page + filter/score/mode chrome + primary viz — not a second dashboard of stats.

---

## Data (hardcoded, correct)

Move canvas snapshot into `@yen/content`:

```ts
// character/knowledge-base.ts
export type KbNode, KbEdge, TrainedSignal, SocialEvidence, SavedVisualization
export const PROFILE_KB_MATTHEW: ProfileKnowledgeBaseV2
```

- Authored `weight` + `engagement` + bands (no rollup)  
- Auditory learn 28 / engage 92  
- Signals, social stubs, saved views included  
- Mockup re-exports; Engagement lens reads store or static seed via Character/Profile provider  

**Future:** same module feeds F14 `userKnowledgeWeb` and social adapters without UI rewrite.

---

## Implementation phases

### E0 — Seed + types (½ day)
- [x] `knowledge-base.ts` (+ signals/saved/social) in `@yen/content`
- [x] Auditory already corrected in learning-styles
- [x] Export types for UI

### E1 — Lens shell (½ day)
- [x] Add `engagement` to `CoreLens` + `LENS_GROUPS` + `lensLabel` / icon
- [x] `EngagementLens` with chrome (topics / metric / mode)
- [x] Wire `LensBody`

### E2 — Port visual modes (2–3 days)
- [x] Meaning, Skills (nested), Learn
- [x] Web multi-mode (clusters first)
- [x] Life bubbles (SVG icons, size/stroke encoding)
- [x] Selection card + engagement band meter

### E3 — Signals · Social · Saved (1–2 days)
- [x] Signals alphabet + color bubbles
- [x] Social evidence table + Focus
- [x] Saved views restore state (persisted in `localStorage`)
- [x] Mark useful (local counter)

### E4 — Teach + polish (1 day)
- [ ] Mode captions / tooltips (engage ≠ learn callout on Learning — done in Learn mode; expand)
- [ ] Reduced motion · narrow layout pass
- [ ] Optional: Surfaced band chip “Engagement” deep-link
- [ ] Recording-friendly defaults
- [ ] Storybook story for Engagement lens  

### E5 — Out of scope defer
- Engagement formulas / rollups  
- Live LinkedIn/IG OAuth  
- Domains rail / separate `/engagement` product tile (unless requested)

---

## Acceptance

- [ ] Profile Core rail shows **Engagement**; body matches canvas capability  
- [ ] Topic filter syncs across modes  
- [ ] Mastery / Engagement / Both works on charts  
- [ ] Auditory: learn fit low (~28), engagement very high (~92) — visible on Learn + callout  
- [ ] Life bubbles: size = significance, stroke/opacity = engagement  
- [ ] Web defaults to topic clusters with mode tooltips  
- [ ] Signals + Social + Saved work; Saved restores full chrome state  
- [ ] Soft-public dark social row does not look “ranked in”  
- [ ] Feels native to Profile (jade / surface / disclosures), not a pasted dashboard  
- [ ] Teachable in a walkthrough without explaining formulas  

---

## Teaching beats (for recordings)

1. Open Engagement → “This is attention and meaning, not a second Character sheet.”  
2. Toggle **Both** → show Love high on both; Privacy high meaning / lower engage.  
3. Learning mode → **Auditory**: music is loud in life, quiet as a learn channel.  
4. Saved → Signal alphabet → Social LinkedIn → skills.  
5. Life bubbles → big quiet burnout vs hot bond.

---

## Decision log

1. **New Core lens `engagement`**, not a Facet — it’s about the person, not a role.  
2. **Canvas remains the UX reference**; app ports design system, not MUI-default charts only.  
3. **Hardcoded engagement forever until a later formula pass** — label it in UI.  
4. **Auditory is the poster child** for engage ≠ learn.  
5. **Saved visualizations** persist locally first; server later.

---

## Immediate next step when building

Start **E0 + E1**: content module + empty Engagement lens on Profile rail, then port Meaning/Skills from canvas before Web/Life.
