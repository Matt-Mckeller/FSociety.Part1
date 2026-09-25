# Heart.Evolve — Vision media + Profile albums plan

**Date:** 2026-08-09  
**Surfaces:** `/vision` (Heart.Evolve chapter) · Profile (external-facing media) · yen media primitives  
**Assets:** Desktop `heart.evolve` folder *(not readable from agent sandbox — copy into repo to unlock)*  
**Quality bar:** Perfect · teachable · profile-connected · reusable players  

---

## 0. Intent (one sentence)

**Heart.Evolve is a visual transformation** — where Matthew is now → becoming → where he is going — played as an interactive evolution (slides + variants), mounted on Vision, and attached to the public profile as albums / videos / stills so the person and the goal share the same media.

---

## 1. What already exists (reuse, do not reinvent)

| Piece | Where | Reuse as |
|---|---|---|
| Vision chapters + image slots | `@yen/content/vision.ts` · `apps/yen/src/app/vision/page.tsx` | Host chapter becomes a **stage player**, not a static grid |
| Goal 4 `Heart.Evolve();` | `goalsData.ts` · `VisionGoalsBand` · profile Ongoing | Link target + watermark ♥ stay; media deep-links here |
| `BrandVideoPlayer` | `apps/yen/src/components/media/BrandVideoPlayer.tsx` | Already has **versions**, chapters, languages, commentary — extract shareable shell |
| Photo albums | `PhotoGallery` + `generated/photos.json` | Pattern for Heart.Evolve album + profile albums |
| Media versions model | `@yen/content/media.ts` `VideoVersion` | Mirror for **image variants** (color / generation / cut) |
| Matt stills | `public/media/matt/` | “Now” anchor photos if heart.evolve set lacks self-portraits |

---

## 2. Creative spine — “Evolution Stage Player”

Not a flat gallery. One composition:

### Metaphor
- **Now** — current state (pressure, unfinished dump, combining years of work)  
- **Becoming** — intermediate frames / color variants / morph  
- **Destination** — Heart.Evolve end-state (bond + growth made visible)

### Interaction (hybrid — recommended default)
1. **Stage scrubber** — Now · Becoming · Destination (3+ beats; desktop folder frames map onto beats).  
2. **Variant / color selector** — versions of the same beat (palette, generation pass, “v1 / v2 / neon”).  
3. **Play** — auto-advance or crossfade morph between stages (reduced-motion = hard cuts).  
4. **Compare** — optional split: Now | Destination (toggle).  
5. **Open on profile** — CTA into Profile → Heart.Evolve album / Core goals.

### Modes (same data, different chrome)
| Mode | Who | Behaviour |
|---|---|---|
| `slides` | Cold visitors | Click / arrow through stages; captions |
| `evolve` | Default | Scrubber + morph + variant chips |
| `gallery` | Power / archive | Grid of all frames + version filter |

Persist mode + selected variant in `localStorage` (same pattern as profile rail).

### Visual direction (yen-native, not purple-AI default)
- Heart.Evolve accent `#ff5c7a` as ink, not full-bleed purple wash.  
- Watermark ♥ already on goal cards — reuse as stage chrome (quiet).  
- Variant chips = quiet bordered pills (match home thesis chips), not rainbow pills.  
- Full-bleed **stage plane** on `/vision#heart-evolve` — one composition, one headline, one CTA group.

---

## 3. Content model

New module: `@yen/content/heart-evolve.ts` (or `vision/heart-evolve.ts`).

```ts
type EvolveStageId = "now" | "becoming" | "destination" | string;

interface EvolveFrame {
  id: string;
  stage: EvolveStageId;
  /** Public path under /media/heart-evolve/... */
  src: string;
  title: string;
  caption?: string;       // short — what this beat means
  sort: number;
}

interface EvolveVariant {
  id: string;             // e.g. "v1-coral", "v2-ember", "gen-a"
  label: string;          // shown in selector
  note?: string;          // "warmer", "generated", "hand-tuned"
  accent?: string;        // optional per-variant wash
  frames: EvolveFrame[];  // same stages, different art
  current?: boolean;
}

interface EvolveSeries {
  id: "heart-evolve";
  title: "Heart.Evolve";
  lede: string;
  stages: { id: EvolveStageId; label: string; blurb: string }[];
  variants: EvolveVariant[];
  /** Optional companion videos (reuse VideoEntry ids from media.ts) */
  videos?: string[];
  /** Profile album id when mirrored */
  profileAlbumId: "album-heart-evolve";
}
```

**Versioning rules**
- A **variant** = alternate color / generation / art pass of the *same* evolution story.  
- A **stage** = position on the Now → Destination arc.  
- Generating more colors = add a `EvolveVariant`, not a new series.  
- Mark `current: true` on the public default (like `VideoVersion.current`).

**Asset layout (repo)**
```
apps/yen/public/media/heart-evolve/
  README.md                 # naming + stage map
  variants/
    v1/                     # drop Desktop folder contents here
      now-01.jpg
      becoming-01.jpg
      destination-01.jpg
    v2-ember/               # later color pass
  generated/                # optional AI / alternate hues (labelled)
```

Copy script: `scripts/import-heart-evolve.mjs` — ingest Desktop folder → rename → write manifest stub.

---

## 4. UI components (reusable)

### A. `EvolveStagePlayer` (new — yen)
Client component. Props: `series: EvolveSeries`, `mode?`, `compact?`.

Owns:
- Stage scrubber + play/pause  
- Variant selector (chips or branch menu — mirror BrandVideoPlayer version picker)  
- Crossfade / reduced-motion swap  
- Caption for active frame  
- Deep-link `#heart-evolve&stage=destination&variant=v1`

### B. Extract shared media chrome from `BrandVideoPlayer`
Without a big rewrite — pull into `media/`:
- `VersionPicker` (branch list) → reuse for Evolve variants **and** videos  
- `MediaChrome` control button styles (already internal)  
- Keep video-specific chapters/commentary on video only  

Profile + Vision import the same pickers so external-facing media feels one system.

### C. `ProfileMediaAlbum` (new — mockup profiles)
External-facing album strip on Profile:
- Album cover + title + count  
- Opens lightbox / yen photo pattern or inline expand  
- Can attach: stills, Evolve series (embed compact player), video entries by id  

Mount on:
- **Core lens** (beside Heart.Evolve goals) — “the media of the goal”  
- Optional **Life** lens — feed-adjacent content  
- Collapsed disclosure on Profile header goals bracket: “Media · Heart.Evolve”

### D. Vision page chapter upgrade
Replace Heart.Evolve static `ImageSlot` grid with:
```
<section id="heart-evolve">
  <EvolveStagePlayer series={HEART_EVOLVE} />
  <link to Profile album + Goal 4>
</section>
```
Other chapters (AION / Web4 / Products) stay slot-based until their assets land.

---

## 5. Profile connection (external-facing)

| Need | Design |
|---|---|
| Attach albums | `ProfileMedia` on seed: `{ albums: AlbumRef[], videos: VideoEntryId[], evolveSeries?: "heart-evolve" }` |
| Attach videos | Reuse `@yen/content/media` ids; render with shared `BrandVideoPlayer` (or compact) |
| Privacy | Default **public** for Heart.Evolve album; Amelia / dark intents stay out |
| Auth later | Same model can gate private albums later — don’t block public ship |
| Discoverability | Profile → Core shows Heart.Evolve goals **and** album thumb; Vision ↔ Profile bidirectional links |

Seed Matthew profile with:
- Album `heart-evolve` (from imported frames)  
- Optional walkthrough video placeholder id `heart-evolve-walk` in `media.ts`  
- Favorite topic already includes Heart.Evolve  

---

## 6. Implementation phases

### Phase 0 — Assets in repo (blocker)
1. You copy Desktop `heart.evolve` → `apps/yen/public/media/heart-evolve/variants/v1/`  
   *(agent cannot read `~/Desktop` — sandbox “Operation not permitted”)*  
2. Quick inventory: count files, extensions, natural order (filename sort vs your intended stage map).  
3. You label stages if filenames are unclear (reply with mapping or a simple CSV).

### Phase 1 — Content + Vision player
1. `heart-evolve.ts` content model + v1 variant from files.  
2. `EvolveStagePlayer` on `/vision#heart-evolve`.  
3. Wire Goal 4 / VisionGoalsBand CTA → `#heart-evolve`.  
4. Variant selector ready for empty v2 slots (honest “generate / drop next color pass”).

### Phase 2 — Profile albums
1. `ProfileMediaAlbum` + seed for Matthew.  
2. Core lens: Heart.Evolve goals + album.  
3. Compact `EvolveStagePlayer` embed (or cover → expand).

### Phase 3 — Shared player primitives
1. Extract `VersionPicker` / control chrome for reuse.  
2. Heart.Evolve companion video entry in `media.ts` (placeholder OK).  
3. Optional generate pipeline note: “add variant folder + one manifest row”.

### Phase 4 — Polish
1. Reduced motion, keyboard arrows, deep-links.  
2. Record checklist item: Heart.Evolve walkthrough.  
3. Budget / typecheck; no full-bleed noise on first viewport of `/vision`.

---

## 7. Clarifications (need your call)

1. **Asset handoff** — copy folder into `apps/yen/public/media/heart-evolve/variants/v1/` when ready (or paste absolute path if elsewhere / iCloud).  
2. **Stage map** — should frames be ordered strictly Now → Becoming → Destination, or is the folder already a sequence we treat as N slides along one arc?  
3. **Public default** — all Heart.Evolve stills public on profile, or Vision-only first and profile gets a curated subset?  
4. **Generation** — do you want an in-UI “request more colors” stub, or just folder-drop variants for this release?  
5. **Name on chrome** — show `Heart.Evolve();` monospace code on the player header (yes/no)?

**Defaults if you don’t answer:** hybrid evolve mode · all public · folder-drop variants only · show `Heart.Evolve();` · treat sorted filenames as slide sequence tagged into 3 stages by thirds until you remap.

---

## 8. Success criteria

- `/vision#heart-evolve` feels like a **transformation**, not a photo dump.  
- Variant / color selector works with ≥1 real variant; empty slots labelled honestly.  
- Profile Core exposes the same series as an album; Goal 4 and Vision deep-link both ways.  
- Video albums reuse `BrandVideoPlayer` patterns; stills reuse album pattern.  
- New color pass = add folder + one content row — no new feature work.  
- Perfect enough to record a walkthrough over.

---

## 9. Out of scope (this plan)

- Training / fine-tune image models in-app  
- Private Amelia media  
- Replacing all Vision chapters with stage players  
- Shipping generated variants without your art drop  

---

## Next action

**Shipped (2026-08-10):** Grow Sexy Vision variant `v3-grow-sexy` as current · Core Media destination-forward album · achievement SVGs · IG export pack · Body Photos → Core Media.

**You:** remap stage order in `heart-evolve.ts` if any frame feels wrong; record `heart-evolve-walk` over the new stills.

---

## 10. Style 2 — branching · `Evolve()` flexibility (wave 2)

Style 1 (shipped) is a **linear arc**: Now → Becoming → Destination with color variants.

Style 2 is a **branch tree**: from a shared Now, the visitor chooses forks (Love / Build / Teach / …). Each path has its own Becoming → Destination. More branching = more honesty about real life (wide variety + ranked attention).

| | Style 1 · Linear | Style 2 · Branch |
|---|---|---|
| Metaphor | One transformation | Many possible evolutions |
| Chrome | Stage scrubber + variant chips | Node graph + choice chips + path breadcrumb |
| Flexibility | Variants = art/color of same story | Branches = different stories from same Now |
| Code label | `Heart.Evolve();` | `Evolve()` family — Heart is one branch |

### Examples surface (not only Storybook)
Storybook remains incomplete — so the **canonical examples page** is yen:

- **`/evolve`** — shared component lab: Style 1 + Style 2 side by side, compact + full, with notes  
- Storybook story (optional later) mirrors the same series for designers  

### Public social surface
- **`/social`** — public-facing hub: posts · live tracking · Evolve embeds (both styles)  
- Yen is publisher of record; platforms redistribute (same rule as `/live`)  
- Profile Core links here + Vision; social posts can attach an Evolve series id  

### Content additions
```ts
type EvolveStyle = "linear" | "branch";

interface EvolveBranchNode {
  id: string;
  label: string;
  blurb?: string;
  frame?: EvolveFrame;       // optional art on the node
  children?: EvolveBranchNode[];
}

interface EvolveBranchTree {
  id: string;
  title: string;
  root: EvolveBranchNode;    // usually "Now"
  accent: string;
}
```

### Profile integration
- Core: Style 1 album (done) + link to Style 2 on `/evolve#style-2`  
- Optional Life / social strip: recent Evolve path taken (local) + link to `/social`  

### Success (wave 2)
- `/evolve` shows both styles as reusable examples  
- `/social` feels like a public feed page, not a docs dump  
- Style 2 lets you fork without losing Style 1  
- Profile still the person; Social the public stream; Vision the destination framing  

