# AI Integration Layers — Redesign Plan

Redesign the "AI Integration Layers" screen (currently `src/Tiles/sample/`, route `/sample`)
into a product-story split view that better represents what 4eye is and what's being built/offered.

## Decisions (confirmed)

- **Layout:** Split view — left = Product Layers list, right = detail of the selected layer.
  Keep the existing blade/hardware imagery for the layer rows. Build as a **new screen**
  (new tile + route) so the current `/sample` stays intact.
- **"Current column":** a **build-status / availability** gutter (Live / Building / Future),
  aligned vertically on the far left, alongside aligned row numbers.
- **Rows:** 8 layers, Human = 1 (top) → AION = 8 (bottom). Fill rows 6 & 7 with
  AI Glasses / AR and brainwave ink.
- **Fidelity:** Reuse the real 4eye components where embeddable; compose the real HUD
  *building blocks* for the "Show the HUD" panel (page-level `FullHud` is not embeddable);
  port the self-contained 4wing companion SVG.
- **Contrast:** Global pass raising low-opacity text to accessible levels.

## New screen

- **Tile:** `src/Tiles/integration-layers/` (new). Route: `src/app/(hud)/integration-layers/page.tsx`.
- `/sample` left untouched. (Optionally repoint `/sample` to the new tile later.)

## The 8 layers (data model)

New model `src/Tiles/integration-layers/model/layers.ts` (extends the old `SampleLayer`
with `row`, `status`, and per-layer detail content keys). Ordered top→bottom:

| Row | Layer | Status | One-liner |
|----|----------------------------|----------|-----------|
| 1 | Human Layer | Live | Real-world integrations — your character, actions & events (default selected) |
| 2 | Computer Layer | Live | AI Chat & Web Apps, Web OS, observability (video/audio/glasses) |
| 3 | Robot Layer | Building | Support companions, tools, and teachers |
| 4 | Store Layer | Building | Real-world gamification: equipment, devices, OSes, Amazon |
| 5 | Neural Controller Layer | Future | Real-life learning — the 4eye HUD & character |
| 6 | AI Glasses / AR Layer | Future | Augmented-reality overlay for ambient intelligence |
| 7 | brainwave lvl Layer | Future | Direct neural interface bridging cognition & compute |
| 8 | AION — Full Dive | Future | Full-dive systems — the epitome of learning & engagement |

`status: "live" | "building" | "future"` → gutter chip colors (green / amber / slate-blue).
Status values are easy to tweak in data.

## Left pane — Product Layers

1. **Chips row** (top): `Perfect Your Learning` · `Transform Your Life` · `Enjoy This Game`.
   The third chip uses **three independent scramble timers** via the existing
   `MorphLabel` (`motion="scramble"`, `maxPasses={null}`, different `hold` per word):
   - word 1: `Enjoy ⇄ Play`
   - word 2: `This ⇄ For The`
   - word 3: `Game ⇄ Fame`
   First two chips static (spec only calls out the third).
2. **Layer column:** a vertical, non-staircased list. Far-left **gutter** holds the aligned
   **status chip + row number** (1–8) as a real column. Each row keeps the blade aesthetic
   (accent stripe, LED/hardware motif, layer icon, `LayerSvgGraphic` on hover) but compacted
   to fit a narrower column. Selected row highlighted; hover retains connection-line motif.
   Human Layer selected by default.

## Right pane — per-layer detail panels

A `LayerDetailRouter` renders a bespoke panel per layer id. Shared chrome: title, status
badge, tagline, accent wash. Panels:

- **1 · Human (default):** Reuse character-tile pieces inside `CharacterProvider` —
  `CharacterHeader` (ProfileFrame avatar + level/roles), `EquippedActionsBar` (actions),
  a compact summary + `CharacterTimeline`/events. "Most important user info surfaced."
- **2 · Computer:** Icon **grid** of sub-capabilities (AI Chat & Web Apps · Web OS · Real-World
  Layer · Observability: Video/Audio/Glasses) with MUI icons. Plus a **contained mini-HUD stage**
  composing the *real* `GameActionBar`, `ResourceCornerHud`, and rail motifs, with **Tron-styled
  MUI tooltips** (custom `slotProps`, neon border/glow) surfacing **Transformation Actions**.
- **3 · Robot:** **Companion catalog** grid — port `Character.tsx` (the 4wing owl companion SVG)
  into `src/Tiles/integration-layers/companions/FourWingCompanion.tsx`; include **4eye** as a
  companion via real `Character4eye`; add "real robot" cards (support companions / tools /
  teachers framing).
- **4 · Store:** Gamification-store grid: Equipment · Devices · Operating Systems · Amazon(?),
  as product cards.
- **5 · Neural Controller:** Wrap in `CharacterProfileProvider`; center = real `CharacterFigure`
  with `CharacterCompass` orbital **rings = "actions on his body"**; surround with real action bars
  (`OrbBar` / `GameActionBar`) as the "action bar spaces."
- **6 · AI Glasses / AR:** AR-overlay infographic (scene recognition, AR render, ambient context,
  gesture) — styled cards + `LayerSvgGraphic`.
- **7 · Brainwave Layer:** Neural-interface infographic (signal processing, cognitive mapping, latency,
  privacy sandboxing).
- **8 · AION Full Dive:** Apex "full-dive" hero panel (core intelligence, neural memory,
  orchestration, protocol) with the strongest glow treatment.

## Font-contrast pass

Raise low-opacity white text across the screen:
body `0.55–0.62 → 0.78–0.86`, taglines `0.60 → 0.74`, overlines `0.32 → 0.50`,
titles → `0.97–1.0`; verify status/number legibility. Applies to reused blade + card styles.

## Files

**New**
- `src/Tiles/integration-layers/IntegrationLayersTile.tsx`
- `src/Tiles/integration-layers/model/layers.ts`
- `src/Tiles/integration-layers/components/LayerColumn.tsx` (+ `LayerRow`, status gutter)
- `src/Tiles/integration-layers/components/ChipsRow.tsx` (scramble chips)
- `src/Tiles/integration-layers/components/LayerDetailRouter.tsx`
- `src/Tiles/integration-layers/panels/*` (one file per layer panel)
- `src/Tiles/integration-layers/companions/FourWingCompanion.tsx` (ported 4wing SVG)
- `src/Tiles/integration-layers/hud/MiniHudStage.tsx` (composed real HUD blocks + Tron tooltip)
- `src/app/(hud)/integration-layers/page.tsx`
- `src/Tiles/integration-layers/index.ts`

**Reused (imported)**
- `MorphLabel` (`src/components/hud/resourceBars/widgets.tsx`)
- `LayerSvgGraphic` + blade styling (refactored from `src/Tiles/sample/`)
- `@expanse/character`: `Character4eye`, `CharacterFigure`, `CharacterCompass`,
  `CharacterProfileProvider`
- `@expanse/hud`: `GameActionBar`, `OrbBar`, action-bar components
- character tile: `CharacterProvider`, `CharacterHeader`, `EquippedActionsBar`, `CharacterTimeline`

## Risks / notes

- **HUD embedding:** `FullHud` needs router + the full provider graph and is 100vw/100vh, so it is
  not mounted; the mini-HUD composes its real sub-widgets instead. Same visual language, no page-shell
  coupling.
- **Provider wrappers:** Human & Neural-Controller panels need `CharacterProvider` /
  `CharacterProfileProvider` respectively — scoped to those panels so the rest of the screen stays light.
- **Companion port:** 4wing `Character.tsx` is self-contained SVG + two keyframes (`float`, `pulse`,
  `wingFlap`) — ported with keyframes inlined; no cross-repo dependency.
- **Verification:** build + drive the screen (default Human view, switch each layer, confirm scramble
  chips + status gutter + contrast) before finishing.
