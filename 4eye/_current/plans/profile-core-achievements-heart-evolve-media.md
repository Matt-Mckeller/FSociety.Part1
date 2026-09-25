# Plan — Profile Core: achievement icons · Heart.Evolve portraits · photos/media

**Date:** 2026-08-10  
**Surfaces:** `/appRealm/profile` · Core lens · Body Photos affordance · `/vision#heart-evolve` · optional IG export  
**Assets:** `Media/Demo_Vid/MM_Profile_Grow_Sexy_Vision/` (style bar: `capture_2026-08-10_073542.png`)  
**Focus:** Marketing / sales — **growth through a human** (person is the product surface)

> ## ✅ SHIPPED — 2026-08-10
> Phase 1–3 done: `v3-grow-sexy` wired as current · Core **Media** band · destination-forward
> album · Body Photos → Core `#heart-evolve-media` · 7 personal achievement SVGs · IG export pack
> under `apps/yen/public/media/heart-evolve/exports/instagram/`.

---

## 0. Intent

Make the Core profile sell transformation: custom achievement marks that feel earned and branded, and Heart.Evolve that shows **Matthew becoming** (real → stylized → crowned destination), not pink placeholder hearts. Photos/media on the profile becomes a first-class album strip, not a button that escapes to Vision.

---

## 1. What’s already true (status check)

| Piece | Status | Where |
|---|---|---|
| Core lens layout | ✅ | `LensBody` → Summary · Vision goals · Ongoing · Achievements · Heart.Evolve media · Brand you carry |
| Heart.Evolve profile album | ✅ shell | `ProfileHeartEvolveMedia` — same series as Vision |
| Evolve stage player | ✅ | yen `/vision#heart-evolve` + `EvolveStagePlayer` |
| Stage art | ❌ placeholders | Coral/Ember SVG hearts under `apps/yen/public/media/heart-evolve/variants/` |
| Grow Sexy Vision stills | ✅ on disk, ❌ not wired | `Media/Demo_Vid/MM_Profile_Grow_Sexy_Vision/` |
| Style target | ✅ | `capture_2026-08-10_073542.png` — moodboard: photo → HUD grids → red-crown destination + current UI chrome |
| Achievements on Core | ✅ data, ❌ emoji icons | `ACHIEVEMENT_SEED` + `AchievementsSection` (emoji in 38px badges) |
| Photos / media section | 🟡 partial | Core has Heart.Evolve album only. Body “Photos” → `/vision#heart-evolve` (escape hatch). No general profile photo gallery. Yen `/photos` is separate. |
| Social / IG | 🟡 stub | Profile links “Social · under construction”; yen `/social` planned in heart-evolve wave 2 |

**Verdict on “we were supposed to add photos/media”:** Phase 2 of [`heart-evolve-vision-media.md`](./heart-evolve-vision-media.md) shipped the **Heart.Evolve album on Core**, not a full Photos section. Body got a Photos button that deep-links Vision. Gap: treat media as a **profile-owned album surface** (Heart.Evolve + optional stills), keep Body as vitals/presence with a link *into that album*, not off-product.

---

## 2. Creative spine — growth through a human

One story for marketing + sales:

1. **Now** — recognizable person (photo / soft video still). Trust.
2. **Becoming** — same person, systems on (HUD eye, crown drafts, cinematic cabin). Ambition.
3. **Destination** — red geometric crown, silk, open black shirt — the capture’s rightmost hero. Desire + identity productized.

Instagram (or any social) redistributes **frames from the same series**, not a second art pipeline. Yen/profile remain publisher of record; IG gets export crops + captions later.

Tone: sexy-vision is intentional and owned — dark satin, high contrast, crown as **status/halo of becoming**, not generic AI glow spam. Heart accent `#ff5c7a` / crown red stay in family with existing Heart.Evolve chrome.

---

## 3. Workstream A — Achievement icons (Core)

### Problem
Badges render `a.icon` as emoji (`💚`, `💡`, …). Fine for seed; weak for marketing polish and brand recall.

### Target
Custom SVG (or small React icon components) per **personal** achievement first; legacy demos (`first-steps`, etc.) can keep emoji or get generic marks later.

Personal set (priority):

| id | Title | Icon direction (sketch) |
|---|---|---|
| `cured-mental-health` | Cured Mental Health | Stabilized heart / pulse settling |
| `innovation` | Innovation | Geometric spark / frame-break |
| `learning-mastery` | Learning Mastery | Book → eye / 4eye mark |
| `unlocking-happiness` | Unlocking Happiness | Sun-key / open lock + light |
| `unlocking-potential` | Unlocking Potential | Unlock + ascending chevron |
| `perfect-real-goals` | Perfect & Real Goals | Target with check / true-north |
| `ai-trained-years` | AI-Trained Years | Node + human silhouette |

### Implementation
1. Extend `Achievement` type: `iconSrc?: string` **or** `Icon?: ComponentType` (prefer SVG React components in `components/achievements/icons/` matching `CoinIcon` pattern in brand-core).
2. Keep emoji as fallback when no custom icon.
3. Update `AchievementBadge` to render SVG at ~22px inside the 38px rarity shell (stroke inherits rarity color).
4. Optional: larger hover/detail sheet for sales demos (title + story + icon hero) — secondary.

### Non-goals (this pass)
- Full LibreOffice “things I learned” expansion (still TODO in seed).
- Live unlock wiring from progress.

---

## 4. Workstream B — Heart.Evolve → Grow Sexy Vision images

### Asset inventory (`MM_Profile_Grow_Sexy_Vision`)

| File | Likely role |
|---|---|
| `FYI_LEARN_ORIGINAL.mp4` + play-overlay still in capture | **Now** / media entry |
| `MC_FYI_mage…png` | Now / early still |
| `…_chatgpt_01` … `06` | Becoming grid → Destination variants |
| `Phenomenal_Crown_3_Desire_…png` | Crown desire beat |
| `capture_2026-08-10_073542.png` | **Style reference only** (moodboard — do not use as a stage frame) |

### Proposed stage map (discuss / confirm)

| Stage | Frames (working) |
|---|---|
| **Now** | Original / MC still (person first) |
| **Becoming** | chatgpt 01–03 (HUD eye → purple crown drafts) |
| **Destination** | chatgpt 04–06 + Phenomenal Crown (red crown hero = default primary) |

Add as new variant **`v3-grow-sexy`** (label e.g. “Grow · Sexy Vision”), set `current: true` for marketing demos; keep Coral/Ember as art-pass chips or demote.

### Repo placement
```
apps/yen/public/media/heart-evolve/variants/v3-grow-sexy/
  now-01.jpg
  becoming-01.jpg … becoming-03.jpg
  destination-01.jpg … (hero = red crown)
```
Copy (not Desktop sandbox): from `Media/Demo_Vid/MM_Profile_Grow_Sexy_Vision/` via import script or one-shot copy. Update `packages/@yen/content/src/heart-evolve.ts` frames + captions that sell the arc in one line each.

### Profile UI upgrades
- `ProfileHeartEvolveMedia`: show **primaryFrame** as real photos (already wired) — once content points at JPGs, Core updates automatically.
- Prefer **destination hero** larger on Core (sales punch): optional 1+2 layout (hero destination + Now/Becoming thumbs) instead of equal 3-up — matches capture’s hierarchy.
- Body “Photos” button → profile Core `#heart-evolve-media` (or `?lens=core` + hash), not Vision escape. Vision keeps full player.

### Vision
Same variant on `/vision#heart-evolve` EvolveStagePlayer — one series, two mounts.

---

## 5. Workstream C — Photos / media section (handle the gap)

### Decision
**Promote media on Core** (already the home of Heart.Evolve) into an explicit **Media** band:

```
Core
  … goals …
  Achievements
  Media                    ← rename/expand “Heart.Evolve · media”
    ├── Heart.Evolve album (compact player / stage strip)
    └── optional “Stills” strip (matt / other public albums later)
  Brand you carry
```

- Body keeps Socials + Photos as **affordances** → scroll/deep-link to Core Media (presence → proof).
- Do **not** build a second competing gallery on Body this pass.
- Yen `/photos` stays design-archive; profile Media is **person-facing sales narrative**.

### Later
- `ProfileMedia` seed shape from heart-evolve plan (`albums[]`, `videos[]`, `evolveSeries`).
- `/social` + IG export pack (square crops of destination + 3-slide carousel captions).

---

## 6. Instagram / social (discuss)

| Option | When | What |
|---|---|---|
| **A. Export pack** | With this ship | Folder of IG-ready 1:1 / 4:5 crops + caption stubs from stage blurbs |
| **B. `/social` embed** | Wave 2 | Public feed attaches Evolve series id |
| **C. Live IG API** | Out of scope | No |

**Recommend A now** (marketing focus, zero platform risk), B when Social page leaves “under construction.”

---

## 7. Phased delivery

### Phase 1 — Wire the vision (highest sales impact)
1. Copy curated stills → `v3-grow-sexy/`.
2. Remap `heart-evolve.ts`; set Grow Sexy as `current`.
3. Core album + Vision player show real portraits.
4. Optional Core hero layout (destination dominant).
5. Retarget Body Photos → Core Media.

### Phase 2 — Achievement SVG set
1. Icon components for 7 personal achievements.
2. Type + badge render path.
3. Visual pass on Core next to new media (same session for coherence).

### Phase 3 — Media band naming + IG pack
1. Section title “Media” + Heart.Evolve as primary album.
2. Export crops from destination/becoming for IG.
3. Caption sheet: Now / Becoming / Destination one-liners (growth through a human).

### Phase 4 — Polish
1. Reduced motion, lightbox on profile thumbs.
2. Walkthrough record (`heart-evolve-walk` placeholder → real).
3. Drop capture moodboard from any public album (reference only).

---

## 8. Clarifications (need your call)

1. **Stage map** — confirm Now / Becoming / Destination assignment above, or send a preferred order of the 6 chatgpt files + crown.
2. **Default public variant** — Grow Sexy as `current` for demos, or Vision-only first / Core curated subset?
3. **Achievement icons** — ship all 7 personal SVGs this pass, or start with 3 hero marks (Mental Health · Innovation · Perfect Goals)?
4. **Sexy-vision tone on profile** — full Destination hero on Core (sales), or softer Now-first for cold traffic?
5. **IG** — export pack now (A) or wait for `/social` (B)?

**Defaults if unanswered:** map as §4 · Grow Sexy `current` · all 7 icons · Destination-forward on Core · IG export pack with Phase 3.

---

## 9. Success criteria

- Core Heart.Evolve shows human portraits through the arc; zero pink placeholder hearts on the default variant.
- Achievements read as branded marks, not emoji decoys.
- Photos/media is discoverable on the profile (Core Media + Body link-in), not only on Vision.
- Capture style (red-crown destination) is the **north star** for Destination frames and IG exports.
- Story is unambiguous: **growth through a human** — sell the person and the system in one surface.

---

## 10. Out of scope

- Training image models in-app  
- Private / Amelia media  
- Instagram Graph API posting  
- Expanding full “things I learned” achievement list from LibreOffice  

---

## Next action

Confirm §8 (or accept defaults) → Phase 1 asset copy + content remap → Phase 2 icons.
