# Plan — Yen Photos hub · sync · nest · record nav

**Date:** 2026-08-11  
**Surface:** `localhost:3400` — `/photos`, `/videos`, `/social`  
**Focus:** Sync personal/growth photos, clean organization, Media hub chrome

---

## 0. Intent

`/videos` already feels synced. `/photos` is still a design-archive dump with no sibling nav and no personal/growth story packs. Make Photos a real media hub: **synced albums**, **nested groups**, **record tabs** (Photos · Videos · Social · …).

---

## 1. Current state

| Piece | Status |
|---|---|
| Video library | Hand catalog `media.ts` + `public/media/videos/` |
| Photo sync | `build-photo-manifest.mjs` allowlist from `~/Projects/Media` → `public/media/photos/` + `photos.json` |
| `/photos` UI | Flat album sections, design screenshots only |
| Cross-nav | Home tiles + content path strip — **no** in-page Photos↔Videos tabs |
| IG / capture packs | Live under `Media/Instagram/` — **not** in photo manifest |

---

## 2. Workstreams

### A. Sync personal + growth albums (this pass)
Allowlist curated folders only (same privacy rule as design albums):

| Nest | Album id | Source dir |
|---|---|---|
| growth | `capture-sequence` | `Instagram/feed/carousel_capture` |
| growth | `mirror` | `Instagram/_stories/09_mirror_lulu_janna` |
| personal | `presence` | `Instagram/_stories/03_real_presence` |
| personal | `ready-4x5` | `Instagram/_ready/4x5` |
| growth | `date-night` | `Instagram/_stories/10_date_night` |
| growth | `lfm` | `Instagram/_stories/07_lfm_fruit_of_the_future` |
| vision | `learning` | `Instagram/_stories/06_learning_environments` |
| ~~vision~~ | ~~`future-world`~~ | Removed for now — needs improved imagery |

Design albums stay; tagged `nest: "design"`.

### B. Record chrome (this pass)
Top tab strip on record pages: **Photos · Videos · Social · Posts · Live**. Active tab matches route. Hook: `PageShell` when `app.group === "record"`.

### C. Nesting UI (this pass · v1)
Photo page layout:

```
[ Nest rail ]   [ Album sections ]
  Growth          Capture sequence
  Personal        …
  Vision
  Design
```

- Nest rail sticky; click filters/scrolls to nest.
- Albums keep `#album-id` anchors (mirror videos `#entry.id`).
- Portrait-friendly `aspect-ratio` for growth/personal (4/5), design stays ~16/10.

### D. Cleanup (this pass · light)
- Prefer growth/personal nests **above** design in default order.
- Drop empty / dead albums if any fail convert.
- Update photos app `lede` to mention personal + design.

### E. Later (not this pass)
- Nested folders UI (album → subgroup → frame) like Media Studio
- Lightbox / keyboard
- Wire Heart.Evolve exports as a nest without duplicating profile Media
- Auto-promote video shorts script (parity with photo manifest)

---

## 3. Success criteria

- `/photos` shows capture carousel + personal stills after `dev`/manifest rebuild
- Tabs switch Photos ↔ Videos ↔ Social without going home
- Albums grouped under Growth / Personal / Vision / Design
- Design archive still intact, not deleted

---

## 4. Out of scope

- Scraping People/Emi private folders
- Instagram Graph API
- Replacing profile Core Media album
