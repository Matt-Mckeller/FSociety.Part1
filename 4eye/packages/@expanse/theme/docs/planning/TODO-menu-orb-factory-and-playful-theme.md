# TODO — `playful` theme + `MenuOrb` factory + variants

> Captured 2026-04-29 from a HUD action-bar menu polish thread. No work started; this file is the plan of record. Pick up by reading top-to-bottom and answering the **Decisions needed** block at the bottom before implementing.

## Why this exists

The HUD action-bar menus (`MenuOrbList` in [packages/@expanse/shell/src/hud-components/action-bars/components/MenuOrbList.tsx](../../../layout/src/hud-components/action-bars/components/MenuOrbList.tsx)) currently render a hand-rolled HSL palette of desaturated tones (slate/soft-blue/teal/sage/sand/rose/violet) directly inside the component. The colors look great for a casual / younger-user surface, but:

1. They're not part of the theme system — apps can't swap them, override them, or pick them up automatically when a different `ExpanseTheme` is selected.
2. They duplicate work — `tertiary/gamified-desaturated` already ships nearly identical "Japan-soft" hues in `palette.ability`.
3. They live outside the established **factory pattern** ([04-factory-pattern.md](../04-factory-pattern.md)) every other layout component uses (`createActionBarConfig`, `createNavigationPadConfig`, etc.).
4. The default `glass` look on the rest of the HUD (dark translucent body, theme primary accent, white text — see `createActionBarConfig`) doesn't match the menu pills, so the HUD reads as two visual languages stitched together.

## What's already there (don't rebuild)

- **Theme variant pattern**: tier-organized palettes under `src/configs/themes/{primary,secondary,tertiary}/<name>/`, registered in `EXPANSE_THEMES` + `THEME_METADATA` ([src/types/theme-identifiers.ts](../../src/types/theme-identifiers.ts)) and re-exported in [src/configs/index.ts](../../src/configs/index.ts).
- **Ability color slot**: `gamified` and `gamified-desaturated` extend `Palette` with `ability: { cyan, mint, purple, gold, red, blue }` — exactly the kind of semantic color slots a `MenuOrb` factory should consume.
- **Component-theme factory pattern**: `@expanse/shell/src/theme/factories/*.factory.ts` — each layout component publishes a `create<Component>Config(palette)` returning variants, then apps wire it via `<ThemeProvider componentExtensions={{ light: { Expanse<Component>: createConfig(palette) } }}>`. Reference: [action-bar.factory.ts](../../../layout/src/theme/factories/action-bar.factory.ts) — the canonical "modern HUD glass" chrome.

## Plan (3 phases)

### Phase 1 — `MenuOrb` component-theme factory + variants

Add to `@expanse/shell`:

- New file `src/theme/factories/menu-orb.factory.ts` exporting `createMenuOrbConfig(palette: Palette): MenuOrbThemeProps`.
- New types in `src/theme/types.ts`: `MenuOrbVariant`, `MenuOrbVariantProps`, `MenuOrbThemeProps`.
- Augmentation entry so `theme.components.ExpanseMenuOrb` is typed.

Variants (modeled on `ActionBar`):

| Variant | Look | When |
|---|---|---|
| `glass` (default) | Dark translucent body (`rgba(0,0,0,0.85)` / `rgba(255,255,255,0.12)` dark mode), theme `primary` as inner stroke, white text — **matches existing HUD chrome** | Production HUD on serious themes (blue/mono/red) |
| `tinted` | Per-tone colored fills (current desaturated HSL), three-layer hue-matched halos | Playful surfaces, the look we built in commit `8a24172` |
| `solid` | Opaque surface, no triple-layer stroke | High contrast / accessibility |
| `outlined` | Transparent fill, only the three-layer stroke | Minimalist |
| `technical` | Sharp 0-radius capsules + primary stroke | Pro/dashboard themes |

Each `MenuOrbVariantProps`:
```ts
{
  pillBg: string
  pillRadius: number
  backdropBlur: number
  iconBg: string
  iconBorder: string
  textColor: string
  strokeOuter: string
  strokeCenter: string
  strokeInner: string
  /** Optional per-tone overrides layered on top of the variant. */
  toneOverrides?: Partial<Record<MenuOrbTone, Partial<MenuOrbVariantProps>>>
}
```

`MenuOrbList` changes:
- Accept new prop `variant?: MenuOrbVariant` (default `"glass"`).
- Read `theme.components.ExpanseMenuOrb?.variants[variant]` via `useTheme()`.
- Keep current hand-rolled HSL `TONE_STYLES` only as the `tinted` variant **fallback** when no theme config is present.
- Tone (`primary` / `info` / `success` / `warning` / `danger` / `accent` / `neutral`) still tints the inner stroke + icon disc, layered over whatever the variant defines. **Even on `glass` variant** — `tone: "danger"` should still recolor Sign-out's stroke red.

### Phase 2 — Promote the colorful palette to a theme variant

**Two options. Recommendation: do BOTH.**

**2A. New `playful` tertiary theme** (`src/configs/themes/tertiary/playful/`)
- Files: `playful-light-theme.ts`, `playful-dark-theme.ts`, `index.ts`.
- Light palette mirrors today's MenuOrbList HSL set, lifted to a full MUI Palette:
  - `primary.main` = soft blue `hsl(210, 55%, 55%)`
  - `secondary.main` = muted violet `hsl(265, 30%, 60%)`
  - `error.main` = dusty rose `hsl(5, 50%, 50%)`
  - `warning.main` = sand `hsl(38, 50%, 45%)`
  - `success.main` = sage `hsl(155, 32%, 38%)`
  - `info.main` = dusty teal `hsl(195, 42%, 42%)`
  - `background.default` = warm off-white `#FAFAF7` / paper `#FFFFFF`
  - `text.primary` = `#1B2230`
  - Add `ability: { cyan, mint, purple, gold, red, blue }` matching the same hues so the `MenuOrb` factory's universal mapping (see 2B) picks it up.
- Register in `EXPANSE_THEMES` + `THEME_METADATA`:
  ```ts
  playful: {
    id: "playful",
    displayName: "Playful",
    description: "Friendly, color-coded pastels for younger / casual surfaces",
    tier: "tertiary",
    targetAudience: "Younger users, education K-12, casual gamification",
  }
  ```
- Re-export from `configs/index.ts`.

**2B. Universal `palette.ability` mapping in the `MenuOrb` factory**
- When the active palette has `ability` keys, `createMenuOrbConfig` derives `tinted` variant tone colors from it instead of hardcoded HSL. Maps:
  - `tone: "primary"` → `palette.primary.main`
  - `tone: "danger"`  → `palette.ability.red`     (fallback `palette.error.main`)
  - `tone: "warning"` → `palette.ability.gold`    (fallback `palette.warning.main`)
  - `tone: "success"` → `palette.ability.mint`    (fallback `palette.success.main`)
  - `tone: "info"`    → `palette.ability.cyan`    (fallback `palette.info.main`)
  - `tone: "accent"`  → `palette.ability.purple`  (fallback `palette.secondary.main`)
  - `tone: "neutral"` → `palette.text.secondary`  (always)
- Net effect: switching theme (`blue` → `playful` → `gamified-desaturated`) automatically retones the menu without any consumer code change.

### Phase 3 — Wire defaults at the app boundary

In [apps/4eye-web-mockup/src/app/providers.tsx](../../../../apps/4eye-web-mockup/src/app/providers.tsx):

```tsx
componentExtensions={{
  light: {
    ...createBrandCoreExtensions(palette),
    ExpanseMenuOrb: createMenuOrbConfig(palette),
  },
}}
```

The Profile / Game / Settings panels keep their existing per-item `tone` props. Default look becomes whichever variant is set as default in the factory (recommendation: `glass` to match the rest of the HUD). Pages that want the rainbow look opt in: `<MenuOrbList variant="tinted" />`.

## Decisions needed before implementing

1. **Default variant on the blue theme today** — `glass` (matches existing HUD chrome, monochrome, calm) or stay on `tinted` (today's rainbow)?
2. **2A vs 2B vs both** — new `playful` theme, just leverage `gamified-desaturated`, or both? *Lean: both.*
3. **Theme name** if 2A — `playful` / `vibrant` / `arcade` / `youth` / `coursework` / something else?
4. **Dark counterpart for `playful`** — build it with the light theme or defer?
5. **Tone overrides on `glass` variant** — `tone: "danger"` still tints Sign-out red, or `glass` is intentionally fully monochrome?
6. **Scope** — ship Phases 1 + 2 in one go, or smaller first slice (factory + glass variant only, defer the new theme)?

Recommended answers if a single answer is wanted:
> glass for blue, do both 2A + 2B, name `playful`, ship light only first, tones DO recolor inner stroke even on glass, ship Phase 1 + Phase 2A together.

## File touch list (when work starts)

- **Add**
  - `packages/@expanse/shell/src/theme/factories/menu-orb.factory.ts`
  - `packages/@expanse/theme/src/configs/themes/tertiary/playful/playful-light-theme.ts`
  - (later) `packages/@expanse/theme/src/configs/themes/tertiary/playful/playful-dark-theme.ts`
  - `packages/@expanse/theme/src/configs/themes/tertiary/playful/index.ts`
- **Modify**
  - `packages/@expanse/shell/src/theme/types.ts` — add `MenuOrbThemeProps` + variants.
  - `packages/@expanse/shell/src/theme/augmentation.ts` — register `ExpanseMenuOrb`.
  - `packages/@expanse/shell/src/theme/factories/index.ts` — re-export.
  - `packages/@expanse/shell/src/hud-components/action-bars/components/MenuOrbList.tsx` — add `variant` prop, read theme config, demote hand-rolled HSL to fallback.
  - `packages/@expanse/theme/src/configs/index.ts` — re-export the new theme.
  - `packages/@expanse/theme/src/types/theme-identifiers.ts` — add `playful` to `ExpanseTheme`, `THEME_METADATA`, `EXPANSE_THEMES`.
  - `packages/@expanse/theme/src/context/ThemeContext.tsx` — add to the `themes` registry map.
  - `apps/4eye-web-mockup/src/app/providers.tsx` — add `ExpanseMenuOrb` extension.

## Reference commits

- `8a24172` — current desaturated HSL palette in `MenuOrbList` (the look to lift into Phase 2A).
- `4d165bd` — earlier saturated-tinted version for reference.
- `973970d` — initial `TripleLayerPill` adoption (the structural refactor; do not undo).

## Out of scope

- Touching `ActionOrb` itself (the rail FAB triggers).
- Migrating other HUD components to a `tinted` variant.
- Any new brand-core primitives — `TripleLayerPill` is sufficient.
