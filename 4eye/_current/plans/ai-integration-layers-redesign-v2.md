# AI Integration Layers — Redesign v2 (Layout, Contrast & Product Story)

Builds on the shipped `src/Tiles/integration-layers/` screen. Goal: sharper product story,
fix contrast, make layers obviously interactive, and flesh out the thin panels.

Root cause found: the app's active theme is **blue + light** (`app/providers.tsx` forces it).
The screen hardcodes a dark background, so reused character components inherit *light* theme
`text.primary`/`text.disabled` → **black text on dark bg**. The contrast bug and the light-mode
ask are the same issue. Fix = scope a dark theme around the screen + register soft tokens.

---

## Confirmed decisions

- **Chip:** two-state morph — **"Enjoy The Game ⇄ Master The Craft"** (Enjoy⇄Master · *The* static · Game⇄Craft), each word width-locked so it never reflows.
- **Theme:** scope a guaranteed-dark MUI theme around the screen (fixes all black text) **and** register the soft accent/text colors as reusable tokens in `@expanse/theme`.
- **Media:** one reusable `MediaStage` (slideshow + single + video). AR → 3-frame slideshow, brainwave → single hero + mini diagram, AION → single cinematic hero / ambient loop.

---

## 1 · Theme package — soft color tokens (`@expanse/theme`)

New `src/styles/softColors.ts`, re-exported via `styles/index.ts` + package barrel (mono-theme
precedent for named hex exports). Captures the palette this screen already likes, with a
light-context variant:

```ts
// Soft accents (per layer family)
export const SOFT_EMERALD = "#4fe0b0";  export const SOFT_CYAN   = "#4dd0e1";
export const SOFT_BLUE    = "#64b5f6";  export const SOFT_AMBER  = "#ffb74d";
export const SOFT_VIOLET  = "#b39ddb";  export const SOFT_INDIGO = "#8b9cf4";
// Soft text ramp — dark surfaces
export const SOFT_TEXT = { hi:"rgba(255,255,255,0.92)", md:"rgba(255,255,255,0.80)",
                           lo:"rgba(255,255,255,0.62)", faint:"rgba(255,255,255,0.50)" };
// Soft text ramp — light surfaces (the "light mode color")
export const SOFT_TEXT_LIGHT = { hi:"rgba(20,26,48,0.92)", md:"rgba(20,26,48,0.72)",
                                 lo:"rgba(20,26,48,0.55)", faint:"rgba(20,26,48,0.42)" };
export const SOFT_STATUS = { live:"#34d399", building:"#fbbf24", future:"#818cf8" };
```

Screen swaps ad-hoc `rgba(255,255,255,0.xx)` literals for these tokens. (Optional follow-up:
promote to a typed `palette.soft` group via `types/mui-augmentations.ts` — noted, not required now.)

## 2 · Contrast fix — scoped dark theme

New `components/PanelThemeScope.tsx`: wraps children in `<ThemeProvider theme={createExpanseTheme("blue","dark")}>`
(or a minimal dark MUI theme). Applied inside `PanelShell` so **every** reused component
(`CharacterHeader`, `CharacterSummaryCard`, `CharacterTimeline`, `StatusRAM`, action bars…)
resolves light-on-dark text. Then a sweep replacing remaining hardcoded low-opacity text with
`SOFT_TEXT.*`. Kills the black-on-dark problem globally rather than per-component.

## 3 · Chips row (`ChipsRow.tsx`)

- Third chip → single 3-word morph: `Enjoy⇄Master` · `The` (static) · `Game⇄Craft`.
- Wrap each `MorphLabel` in a fixed-width `inline-block` sized to the longer word (measured or
  hardcoded `ch`) so scrambling never reflows the pill. Same fix hardens chips 1 & 2 spacing.

## 4 · Layer column — obvious selection + interactivity (`LayerColumn.tsx`)

- **Selected:** add a right-edge **caret/notch pointing into the detail pane**, brighter fill +
  persistent glow, and an animated left accent bar (`layoutId` slide between rows).
- **Interactive affordance:** hover reveals a `›` chevron + faint "Inspect" label; whole column
  gets a one-time header hint "Select a layer →"; cursor + lift already present, strengthen hover.
- Non-selected rows slightly dimmed so the active one clearly wins.

## 5 · Computer panel — orbs, domains, de-dup (`ComputerPanel.tsx`, `MiniHudStage.tsx`)

- **Orbs = learning transformations.** Replace `OrbBar context="game"` (Play/Inventory/Quests/
  Achievements/Ability) with `items` override: **Learn · Plan · Visualize · Associate · Transform**
  (MUI icons: School, Timeline/Map, Visibility/Insights, Hub, AutoAwesome). Removes the duplication
  the game preset created with the pills below.
- **Reconcile the pill row:** keep it distinct — rename to **"Web OS Actions"** (Morph Layout ·
  Shift Realm · Summon Map) so orbs=learning, pills=OS navigation, no overlap.
- **Domains → here.** New compact **Domains / Realms** sub-section (this answers "where do domains
  go — kind of in the computer layer"): the surfaces the Web OS spans — **Website · App · Technical
  · Real-World** — as small realm chips/cards, tied to the existing "Shift Realm" concept.

## 6 · Human panel — richer Surfaced Information (`HumanPanel.tsx`)

Current "Surfaced Information" = only `CharacterSummaryCard`. Expand into a curated "what matters
now" cluster using components that already exist:
- **`DailyFocus`** — next best action / today's focus (top surface).
- **Status strip** — active mood + context line (compact pull from `StatusRAM` / `CharacterSummaryCard`).
- **`EquippedGoals`** — what you're driving toward.
- Keep `CharacterSummaryCard` (level, top attributes, buffs, auras) + `CharacterTimeline` (events).
(Options menu, all available: DailyFocus, StatusRAM, EquippedGoals, Perspectives, Habits,
Relationships, Attributes, Auras, CharacterFeed — I'll wire the first three; rest are easy adds.)

## 7 · Store panel — new bespoke (`panels/StorePanel.tsx` + router case)

Currently falls through to the generic card grid. Replace with:
- **Profile status / resource bar** — currency row: **Coins · Gems · XP** + level pill + streak
  (mock data; no economy model exists yet, so ships as seed constants).
- **Chests** — 3 loot cards (Common / Rare / Epic) with rarity glow + "open" affordance.
- **Product cards** — Equipment · Devices · Operating Systems · Marketplace (reuse layer.cards).

## 8 · Neural panel — bigger, better character (`NeuralPanel.tsx`)

- Enlarge `Character4eye`: drop `compact`, raise container from 44% → ~58–62%, fix aspect so the
  figure reads as the centerpiece.
- Re-tune orbit `RADIUS` and ring sizes so the 6 body-action nodes clear the larger figure
  (no overlap), keeping the "actions on his body" orbital story.

## 9 · Media panels — AR / Brainwave / AION

New `components/MediaStage.tsx` — one component, three modes:
- `mode="slideshow"` — N frames, auto-advance (respects reduced-motion), dots + arrows, captions.
- `mode="single"` — one framed hero + caption + accent glow.
- `mode="video"` — muted autoplay loop, poster fallback.
Styled placeholder frames now (labelled drop-zones) so your real assets slot in later.

New bespoke panels, registered in `LayerDetailRouter`:
- **`GlassesPanel`** — `MediaStage` slideshow (3 frames: scene → overlay → action) above the
  existing capability cards.
- **`BrainWavePanel`** — `MediaStage` single hero + a small schematic diagram, above cards.
- **`AionPanel`** — `MediaStage` single cinematic hero (or ambient video), strongest glow, above cards.

---

## Media recommendation (your question)

- **AR Glasses → 3-frame slideshow.** AR is inherently *sequential* (world → recognized → overlaid
  → acted on); one frame can't show the transformation, and video is overkill for a static concept
  board. 3 stills read instantly and are cheap to produce/swap.
- **brainwave lvl → single hero + tiny diagram.** It's an abstract, invisible tech — one strong
  conceptual hero plus a small signal→intent schematic communicates more than a carousel of
  near-identical renders.
- **AION → single cinematic hero, OR a short (≤8s) muted ambient loop if you have motion content.**
  Full-dive is a *feeling/mood* — one arresting image sells it; a slow ambient loop sells it better
  if you already have the footage. Avoid a slideshow here (dilutes the "apex" impact).
- **General:** video only where you already have polished footage (muted, ≤8s, looping, poster
  fallback for load/reduced-motion). Otherwise stills win on effort-to-impact. `MediaStage` supports
  all three so you can start with placeholders and upgrade per layer without code changes.

---

## Files

**Theme (`packages/@expanse/theme`)**
- new `src/styles/softColors.ts`; export via `src/styles/index.ts` + `src/index.ts`.

**Screen (`apps/4eye-web-mockup/src/Tiles/integration-layers`)**
- new `components/PanelThemeScope.tsx`, `components/MediaStage.tsx`
- new `panels/StorePanel.tsx`, `panels/GlassesPanel.tsx`, `panels/BrainWavePanelPanel.tsx`, `panels/AionPanel.tsx`
- edit `components/ChipsRow.tsx`, `components/LayerColumn.tsx`, `components/shared.tsx` (PanelShell wraps ThemeScope; soft tokens), `components/LayerDetailRouter.tsx` (register store/glasses/brainwave/aion)
- edit `panels/ComputerPanel.tsx`, `hud/MiniHudStage.tsx` (orbs + domains + pill rename)
- edit `panels/HumanPanel.tsx` (surfaced info), `panels/NeuralPanel.tsx` (character size)

## Verification
- `pnpm build` / typecheck the app + theme package.
- Drive the screen: default Human view, switch every layer; confirm no black-on-dark text,
  chip never reflows, selected layer obvious, computer orbs = learning transformations + domains
  present, store shows currency/chests, neural character larger, media placeholders render.
