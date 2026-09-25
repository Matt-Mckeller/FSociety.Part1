# UI1 — `@expanse/character` Consolidation & 2D/3D Profile

> **Status:** In progress. The 2D character system was extracted from `@expanse/brand-core`
> into `@expanse/character` (commit `856e999`). This plan covers the *next* wave: pulling the
> remaining character-related components into the package, adding a unified 2D/3D profile, and
> moving all related Storybook stories + tests.
>
> **Owner package:** [`packages/@expanse/character`](../../../../packages/@expanse/character)
> **Source of truth for product intent:** [Plan.md](../../Plan.md)

---

## 1. Goal

One home for *everything* that draws or animates the 4eye character, organized so a human can
find any piece in seconds and extend it without touching consumers. Apps should import character
UI from `@expanse/character/*` and never reimplement figures, personas, or avatar framing.

Principles:
- **Platform firewall stays intact.** `/core` + `/state` + `/3d` are React-Native-safe (no MUI,
  no DOM). Only `/2d`, `/mui`, and the new `/profile` may import MUI / browser APIs.
- **Vocabulary is shared, renderers are swappable.** A character is described once (persona +
  variant + mood + shapes); 2D SVG and 3D R3F are two views of that same description.
- **App-specific composition stays in the app.** We migrate the *reusable* primitives; panels
  that hard-code app stats/CTAs stay in the app but consume package primitives.

---

## 2. Current package layout (after extraction)

```
packages/@expanse/character/src/
  core/      platform-neutral vocabulary, proportions, shapes        (RN-safe)
  state/     CharacterProvider + reducer (shared store)              (RN-safe)
  2d/        SVG figure, poses, animation, profile, theming, stories (web / MUI)
  3d/        R3F scene, model, canvas (.tsx + .native.tsx), profile  (web + native)
  mui/       MUI theme bridge                                        (web / MUI)
```

Subpath exports: `./core`, `./state`, `./2d`, `./3d`, `./mui` (+ proposed `./profile`).

---

## 3. Target layout after this wave

```
src/
  core/
    personas.ts        ← MOVED from mockup lib/character (type-only deps → RN-safe)
  2d/
    progress/          ← MOVED from brand-core PushingProgress
    mascot/            ← MOVED from mockup components/character/mascot   (candidate)
    profile/           (existing ProfilePhoto / ProfileFrame)
    figure/ poses/ animation/ geometry/ theming/ anatomy/ parts/ stories/
  3d/
    profile/           (existing ProfileAvatar3D)
  profile/             ← NEW unified, web-only: ProfileAvatar (2D⇄3D toggle)
  vision/              ← MOVED from mockup components/character/vision    (candidate)
  explorer/            ← reusable parts of the map-view profile           (candidate)
```

New subpath exports to add to `package.json`:
- `"./profile": "./src/profile/index.ts"` (web; imports both `/2d` and `/3d`)
- `"./vision": "./src/vision/index.ts"` (if vision is migrated)

---

## 4. Migration waves

Ordered so each wave compiles and ships independently. Validate with IDE diagnostics +
mockup `vitest`/`noEmit` (standalone `tsc` is broken by design — see repo memory).

### Wave A — Personas → `/core` (confirmed, low risk)
- Move `apps/4eye-web-mockup/src/lib/character/personas.ts` → `src/core/personas.ts`.
- Export `CHARACTER_PERSONAS` (+ persona types) from `/core`.
- It only imports *types* from `/2d`; re-point those to `/core` type sources so `/core` stays
  RN-safe. Update ~8 consumers (mascot, vision, intro slides, characterProfile, See slide).
- Leave a 1-line re-export shim at the old path during transition, then delete.

### Wave B — Pushing Progress → `/2d/progress` (confirmed)
- Move `packages/@expanse/brand-core/src/components/PushingProgress/*` (component, `ProgressBar`,
  `PushingProgress.stories.tsx`, `__tests__/`) → `src/2d/progress/`.
- It already consumes `@expanse/character/2d`; after the move it imports siblings directly.
- Re-export from `brand-core` (back-compat) **or** update the 3 consumers
  (`intro/Slide2Progress`, web `Slide2Progress`) to `@expanse/character/2d`. Prefer the latter.

### Wave C — Unified 2D/3D Profile → `/profile` (NEW, the toggle)
See §5. Net-new code; no consumer churn until adopted.

### Wave D — Mascot → `/2d/mascot` (candidate — confirm in §6)
- Move `components/character/mascot/{FourEyeMascot,MascotSlot,AmplifyAura}.tsx`.
- `PersistentMascot*` orchestration (portal lifecycle across slides) is **app-specific** → stays
  in the mockup, consumes the moved `FourEyeMascot`.

### Wave E — Vision control → `/vision` (candidate — confirm in §6)
- Largest subsystem (~18 files: `VisionControlCharacter`, `CharacterLayer`, `devices/*`,
  `animation/useControlAnimation`, `context/`, `styled/`, stories).
- `ControlSlide` (the slide that mounts it) stays in the mockup and imports `@expanse/character/vision`.

### Wave F — Map-view profile primitives → `/explorer` (candidate — confirm in §6)
- Reusable: `CharacterFigure` (idle float + tile-lean), `CharacterCompass`, `rings/*`,
  `useCharacterLean`, `useRingCycle`.
- App-specific: `GuestExplorerPanel` (player stats, role/level/XP copy, See-Demo CTA) → stays in
  mockup, composes the moved primitives.

### Wave G — Stories & tests follow their components
- Every `.stories.tsx` and `__tests__/` file moves with its component into the package.
- Stories register under the character Storybook (port **3437**), white `#ffffff` background.
- **Blocker:** the package has no test runner wired yet (no `vitest` config / `test` script).
  Wave G requires standing up `vitest` in `@expanse/character` first, else moved tests can't run.

---

## 5. Unified 2D/3D Profile (`src/profile/ProfileAvatar.tsx`)

The 2D `ProfilePhoto` and 3D `ProfileAvatar3D` already expose **parallel APIs**
(`size`, `zoom`, `borderStyle`, `borderWidth`, `borderColor`, `background`) with matching zoom
presets (`full / head / face / shoulders / torso`; 2D adds `eye / tight`). The toggle unifies them.

```tsx
export type ProfileMode = "2d" | "3d"

export interface ProfileAvatarProps {
  /** Which renderer to show (controlled). */
  mode?: ProfileMode
  /** Initial renderer when uncontrolled (default: "2d"). */
  defaultMode?: ProfileMode
  /** Fired when the built-in toggle changes mode. */
  onModeChange?: (mode: ProfileMode) => void
  /** Render a built-in 2D/3D switch control (default: false). */
  showToggle?: boolean

  /** One character description, applied to whichever renderer is active. */
  persona?: PersonaKey
  variant?: Character4eyeVariant
  mood?: Character4eyeMood

  /** Shared framing (mapped to each renderer's preset). */
  size?: number
  zoom?: "full" | "head" | "face" | "shoulders" | "torso"
  borderStyle?: "circle" | "rounded" | "square" | "none"
  borderWidth?: number
  borderColor?: string
  background?: string
  "aria-label"?: string
}
```

Behaviour:
- **2D mode** → renders `<ProfilePhoto>` (SVG, instant, cheap). No GL.
- **3D mode** → renders `<ProfileAvatar3D>` wrapped in a `<CharacterProvider>` seeded from the same
  persona/variant/mood/shapes, so both modes show the *same* character.
- **Crossfade** on switch (opacity transition); 3D lazy-mounts so the WebGL context only spins up
  when first shown (`React.lazy` / mount-on-demand) to keep 2D-only pages light.
- **`showToggle`** renders a small segmented control (2D | 3D) using package theming.
- Lives in **`src/profile/`** (top-level, web-only) because it imports both `/2d` (MUI) and `/3d`
  (three) — keeping it out of `/2d` and `/3d` preserves their respective firewalls.
- Exported via new `"./profile"` subpath. `ProfilePhoto` / `ProfileAvatar3D` remain exported from
  `/2d` and `/3d` for callers that want one renderer only.

Adoption targets (after it lands): map-view `CharacterFigure`, See-slide `SeeProfileCharacter`,
`HudRightRail` profile lens — anywhere a single avatar currently picks one renderer.

---

## 6. Candidate components — **decide before migrating**

| Candidate | Current location | Reusable? | Proposed home | Recommendation |
|-----------|------------------|-----------|---------------|----------------|
| **personas.ts** | mockup `lib/character` | Yes (type-only) | `core/personas.ts` | **Move** (Wave A) |
| **PushingProgress** | brand-core | Yes | `2d/progress/` | **Move** (Wave B) |
| **FourEyeMascot + MascotSlot + AmplifyAura** | mockup `character/mascot` | Mostly | `2d/mascot/` | **Move**; leave `PersistentMascot*` in app |
| **Vision control (full subsystem)** | mockup `character/vision` | Yes, but heavy | `vision/` (new subpath) | **Discuss** — big surface; move whole vs. just `CharacterLayer` + devices |
| **CharacterFigure / CharacterCompass / rings** | mockup `hud/characterProfile` | Yes | `explorer/` | **Move primitives**; leave `GuestExplorerPanel` (app stats) in app |
| **Device SVGs** (`ControllerSvg`, `WatchSvg`, `HudControllerSvg`) | mockup `character/vision/devices` | Yes | `2d/devices/` or `vision/devices/` | **Discuss** — are devices "character" or "hardware"? |
| **Intro slide wrappers** (`MultiplyTrio`, `MorphFaceToCharacter`) | mockup `intro/slides` | No (slide-specific) | — | **Keep in app**; they consume package primitives |
| **HudRightRail profile lens** | `@expanse/shell` | No (layout-owned) | — | **Keep**; adopt unified `ProfileAvatar` |

Open questions for you:
1. **Vision** — migrate the entire subsystem, or only the character-facing layer (`CharacterLayer`
   + devices) and leave animation/context/styled in the app?
2. **Devices** — do controller/watch SVGs belong in `@expanse/character`, or a separate
   `@expanse/devices` / brand-assets package?
3. **Explorer rings** — package-level `rings/` registry, or keep the themed rings (StarWars, Saturn,
   Matrix, Pacman, Comet) app-side as "flavor"?
4. **Back-compat shims** — keep temporary re-export shims at old paths, or update all consumers in
   the same wave (cleaner history, larger diff)?

---

## 7. Validation & conventions

- **Type-check:** IDE diagnostics (`get_errors`) + `apps/4eye-web-mockup` vitest/`noEmit`.
  Ignore standalone `tsc` TS6059/MUI noise (see `/memories/repo/build-and-typecheck.md`).
- **Storybook:** character port **3437**, white `#ffffff` default background; every moved story
  re-registers and is verified visually.
- **State:** React Context + `useReducer` only (no Redux/zustand).
- **Exports:** keep public barrel names stable; add subpaths rather than renaming.
- **Brand voice:** 4ear guidelines (avoid religious/clinical terms in copy).
