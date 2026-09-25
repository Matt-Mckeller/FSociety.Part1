# Plan — Yen Photos · Videos · Albums · Exports

**Date:** 2026-08-11  
**Surface:** `localhost:3400` — `/photos`, `/videos`, and Record siblings  
**Quality bar:** Perfect — keep current interface & style; deepen organization and browse modes  
**Supersedes (intent):** `_current/plans/yen-photos-media-hub.md` phases A–D (done). This plan covers the **library product** layer.

---

## 0. Intent

Yen’s Record strip already feels right: pill tabs, nest rail, amber/red accents, quiet typography. Do **not** redesign that.

Make the media library **complete**:

| Surface | Role |
|---|---|
| **Photos** | Curated stills, story packs, vision, design archive |
| **Albums** | First-class album browsing (not only scroll sections) |
| **Videos** | Segments + tags (already strong) — stay sibling, not merge into one dump |
| **Exports** | Publish-ready packs (IG carousel, ready 4×5, Heart.Evolve stills) |
| **Social / Posts / Live** | Record siblings; chrome must work on all of them |

Privacy rule unchanged: **allowlist only** from `~/Projects/Media` via `build-photo-manifest.mjs`. No camera-roll walk.

---

## 1. Current state (accurate)

| Piece | Status |
|---|---|
| Photo sync | Allowlist → `public/media/photos/` + `src/generated/photos.json` |
| Photo UI | Nest rail (Growth · Personal · Vision · Design) + album grids; thumb → new tab |
| Video UI | Hand catalog `media.ts`; segment folders; tag chips; BrandVideoPlayer |
| Record tabs | Photos · Videos · Social · Posts · Live via `MediaRecordNav` |
| Live chrome bug | `live.group === "about"` → tabs **hidden** on `/live` |
| Lightbox / search / select | Missing |
| Exports as library | Heart.Evolve IG pack + studio packages exist **off** `/photos` |
| Abandoned | `PhotoLibrary` / `PHOTOS = []` in `MediaLibrary.tsx` |

**Live inventory (2026-08-11):** ~21 albums · ~122 images · nests growth → personal → vision → design.

---

## 2. Principles (non-negotiable)

1. **Preserve chrome** — keep `photos.css` rail, pill tabs, PageShell lede pattern, accent map.
2. **Additive modes** — new browse modes are toggles/chips above the existing layout, not a second visual language.
3. **Albums are the unit** — nests organize; albums publish; exports are albums with `kind: "export"`.
4. **Photos ≠ Videos dump** — shared Record nav + optional cross-links; separate routes stay.
5. **Allowlist forever** — organization metadata lives in the manifest script, not ad-hoc folder walks.

---

## 3. Information architecture

```
Record
├── Photos          /photos          stills library (modes below)
├── Videos          /videos          segments + tags
├── Social          /social          stream (WIP)
├── Posts           /posts           writing
└── Live            /live            Twitch (+ fix nav group)

Photos modes (in-page, not new top tabs)
├── Nests     (default — current rail + sections)
├── Albums    (album index cards → jump or focus one album)
├── Exports   (export-kind albums only + download affordances)
└── All       (flat mosaic + filters)
```

**Why modes, not more top tabs:** user already likes the Record strip. Albums/Exports are *views of the photo library*, not separate apps.

---

## 4. Manifest model (organization backbone)

Extend album entries in `build-photo-manifest.mjs` / `photos.json`:

```ts
type AlbumKind = "story" | "stills" | "vision" | "design" | "export";

interface Album {
  id: string;
  title: string;
  blurb: string;
  nest: "growth" | "personal" | "vision" | "design";
  aspect: "portrait" | "landscape";
  kind: AlbumKind;
  tags: string[];          // e.g. android, ig-ready, capture, hq, island
  exportable?: boolean;    // show in Exports mode
  coverId?: string;        // photo id for album card
  photos: Photo[];
}

interface Photo {
  id: string;
  title: string;
  description: string;
  src: string;
  width?: number | null;
  height?: number | null;
  // optional later: takenAt, tags[]
}
```

### Kind mapping (initial)

| Album | nest | kind | exportable |
|---|---|---|---|
| capture-sequence | growth | story | yes |
| mirror, date-night, lfm, venture-freedom | growth | story | no* |
| presence, ready-4x5 | personal | stills | ready-4x5 yes |
| expanse-hq, tutorial-island, learning | vision | vision | no |
| design archives | design | design | no |
| Heart.Evolve IG pack (new nest or growth) | growth | export | yes |

\*Story packs can opt into export later (highlights).

### Nest blurb refresh (UI copy only)

| Nest | Blurb direction |
|---|---|
| Growth | Story packs — capture, mirror, date, LFM, venture |
| Personal | Presence + IG-ready stills |
| Vision | HQ · Tutorial Island · learning full-dive |
| Design | Product UI archive |

---

## 5. Photos — browsing / filtering modes

Keep the nest rail as the **Nests** mode. Add a compact mode strip under the count line (same typography as video tag chips / presentation toggle — quiet, not loud):

`Nests · Albums · Exports · All`

### 5.1 Nests (default — current)
- Sticky rail + nest sections + album grids
- Only polish: updated blurbs, cover-aware rail optional later

### 5.2 Albums
- Grid of album cards: cover thumb, title, count, nest pill, blurb one-liner
- Click → `#album-id` in Nests **or** focused album view (query `?album=` / hash)
- Sort: nest order, then title; optional “Recently synced”

### 5.3 Exports
- Filter `exportable === true` (and `kind === "export"`)
- Each card: Open album · **Download originals** (phase 2 zip) · copy path note for IG
- Seed set: Ready 4×5, Capture sequence, Heart.Evolve IG stills (`public/media/heart-evolve/exports/instagram/`)

### 5.4 All + filters
Shared filter bar (mirrors Videos’ chip language):

| Filter | Behavior |
|---|---|
| Search | Title / blurb / filename (client filter on manifest) |
| Nest | Chip multi-select (Growth…) |
| Kind | story · stills · vision · design · export |
| Aspect | portrait · landscape |
| Tag | from album.tags |
| Clear | one control |

Layout: denser mosaic; nest headers optional when filtered.

### 5.5 Lightbox (phase 2 — Perfect polish)
- In-page viewer: Esc, ←/→, caption, album context, “Open file”
- Do not replace deep-link to `/media/photos/...` — keep as secondary
- Preserve keyboard focus trap; match existing border/radius tokens

### 5.6 Selection (phase 3)
- Shift/click select thumbs → bar: Download · Copy links · Clear
- Exports mode uses same selection model

---

## 6. Videos — organization parity (light)

Videos already have segments + tags. Perfect-pass additions only:

| Item | Change |
|---|---|
| Cross-links | Related photo album chips where story packs exist (e.g. capture ↔ growth) |
| Record checklist | Keep; add “Exports” pointer to `/photos` Exports mode |
| Live tab | Fix group so `/live` keeps MediaRecordNav |
| Later | Optional `build-video-manifest` — **not** blocking Perfect Photos |

Do **not** force a nest rail onto Videos; segments are the right metaphor.

---

## 7. Exports — accounted for

Exports are a **first-class Photos mode**, plus one allowlisted source:

1. **Wire Heart.Evolve IG pack** into manifest as album `heart-evolve-export`  
   - Source: `apps/yen/public/media/heart-evolve/exports/instagram/` (or Media copy)  
   - `nest: growth`, `kind: export`, `exportable: true`
2. Mark `ready-4x5` + `capture-sequence` exportable
3. UI: Exports mode lists only those; each album page shows “For Instagram / Highlights” blurb
4. Phase 2: per-album zip via API or static prebuild (`scripts/build-photo-exports.mjs`)

Studio `library.export.json` / Classroom packages stay under Media Studio / docs — link from Exports as “Studio packages →” if useful, don’t dump into photo grid.

---

## 8. Record chrome fixes

| Bug / gap | Fix |
|---|---|
| Live hides tabs | Move `live` → `group: "record"` **or** show nav when `RECORD_NAV_IDS.has(id)` regardless of group (prefer explicit `group: "record"` + keep About home placement via rank/chip if needed) |
| Docs in record group | Leave Docs out of MediaRecordNav (already) |
| Dead `PhotoLibrary` | Remove or gate; avoid two photo UIs |

---

## 9. Implementation plan

### Phase 0 — Chrome & copy (½ day)
- Fix Live record nav
- Refresh nest blurbs + photos app lede (mention Albums / Exports modes coming)
- Ignore `_backup` / `_human_backup` dirs if any future recursive walk
- Delete or clearly deprecate empty `PHOTOS` path

### Phase 1 — Manifest metadata (½–1 day)
- Add `kind`, `tags`, `exportable`, `coverId` to album allowlist
- Rebuild; extend TypeScript types beside generated JSON
- Add Heart.Evolve export album to allowlist

### Phase 2 — Browse modes UI (1–2 days) — **core Perfect**
- Client island wrapper around gallery body **or** progressive enhancement:
  - Mode strip + filter chips (client)
  - Server still renders full Nests HTML for no-JS / SEO anchors
- Albums index + Exports filter views
- Search box (client filter)
- Keep `photos.css`; extend with `.ph-modes`, `.ph-album-card`, `.ph-filters` in the same quiet style

### Phase 3 — Lightbox + keyboard (1 day)
- `PhotoLightbox` client component
- Hash sync `#photo-id` optional

### Phase 4 — Download / export actions (1 day)
- Multi-select + “Open originals”
- Optional zip script for exportable albums

### Phase 5 — Video cross-links & polish (½ day)
- Related albums on video sections
- Sitemap / status notes if Exports mentioned

---

## 10. File touch list (expected)

| File | Role |
|---|---|
| `scripts/build-photo-manifest.mjs` | kind/tags/exportable/cover; HE export album |
| `src/generated/photos.json` | regenerated |
| `src/components/media/PhotoGallery.tsx` | modes shell / composition |
| `src/components/media/photos.css` | additive styles only |
| `src/components/media/PhotoModes.tsx` (new, client) | mode + filter state |
| `src/components/media/PhotoLightbox.tsx` (new) | phase 3 |
| `src/components/media/MediaRecordNav.tsx` | unchanged labels |
| `src/components/PageShell.tsx` / `apps.ts` | Live group fix |
| `packages/@yen/content/src/apps.ts` | photos lede |
| `packages/@yen/content/src/media.ts` | optional relatedAlbum ids |

---

## 11. Success criteria (Perfect)

- [x] Record tabs visible on Photos, Videos, Social, Posts, **and Live**
- [x] Photos modes: **Nests** (default) · **Albums** · **Exports** · **All**
- [x] Filters: search + nest + kind + aspect (+ tags when present)
- [x] Exports mode shows Ready 4×5, Capture, Heart.Evolve IG pack
- [x] Visual style matches today’s rail/tabs (no new “dashboard” look)
- [x] Allowlist privacy intact; `_backup` never published
- [x] Lightbox with keyboard; deep-link to file still available
- [x] Videos unchanged in spirit; optional cross-links only
- [x] One photo UI path (no zombie `PhotoLibrary` — deprecated stub only)
- [x] Instagram story packs in Exports (14 exportable albums · tag `instagram`)

**Shipped:** Phases 0–5 (2026-08-11). Instagram working packs wired into Exports + select/open/copy.

---

## 12. Out of scope

- Instagram Graph API / auto-post
- Face recognition / People albums
- Uploading from the browser
- Merging profile Core Media into yen Photos
- Scraping private Media folders
- Full Media Studio Cut/Publish inside `/photos`

---

## 13. Decision log

| Decision | Choice | Why |
|---|---|---|
| Albums / Exports as top tabs? | **No — Photos modes** | Keeps Record strip clean; matches mental model |
| Unify photo+video one page? | **No** | Videos player chrome differs; shared nav is enough |
| Exports location | Photos mode + `exportable` flag | Reuses nest/album data; no parallel catalog |
| Style | Extend `photos.css` | User enjoys current interface |

---

## 14. Open questions (resolve at implement start)

1. Heart.Evolve export: nest **growth** or new nest **exports** under Vision? → Default **growth** + Exports mode filter.
2. Android Mirror/Date: tag `android` for filter — yes/no?
3. Zip downloads now or phase 4 only? → Default phase 4 after modes ship.
