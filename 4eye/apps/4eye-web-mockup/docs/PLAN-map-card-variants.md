# PLAN — Map Full-View Card Background Variants

Scope: `MinimapFullViewOverlay` right panel + `NextBestActionCard` surface treatments.

Goal: ship a token-driven card skin system + Storybook gallery so we can
iterate on background, text, and effect treatments without forking the
card component or the overlay shell.

> 5 variant **groups** × 5 **variants** each = 25 named skins, plus a
> single "ALL SKINS" comparison story so the frosted top-of-stack card
> sits side-by-side with the colored-text experiments on one screen.

---

## 1. What's wrong today

- [NextBestActionCard.tsx](../../../packages/@expanse/shell/src/hud-components/next-best-action/NextBestActionCard.tsx) bakes in dark-surface assumptions:
  - `bgcolor: rgba(255,255,255,0.10)` (only visible on dark panels)
  - `border: rgba(255,255,255,0.30)`
  - `boxShadow: inset 0 1px 0 rgba(255,255,255,0.25)` (white inner highlight)
  - `backdropFilter: blur(12px)` — pointless on a solid white panel
- [NextBestActionCardHeader.tsx](../../../packages/@expanse/shell/src/hud-components/next-best-action/NextBestActionCardHeader.tsx) hardcodes `color: "#fff"` for question text and page label.
- Chips in [MapContextPanel.tsx](../../src/components/hud/MapContextPanel.tsx) also hardcode `rgba(255,255,255,0.92)`.
- Result: when the overlay shipped its `rightPanelBg = #FFFFFF` default ([MinimapFullViewOverlay.tsx#L113](../../src/components/hud/MinimapFullViewOverlay.tsx#L113)), the NBA stack collapsed to a near-blank column. The four `CardVariant*` stories patch around it by darkening the *panel*, not the cards.

We want the opposite: cards adapt to the panel + intent, panel stays clean white.

---

## 2. Architecture — `CardSkin` token + provider

> **Naming reconciliation:** the codebase already has a `BarSkin` system
> at [packages/@expanse/shell/src/hud-components/skins/skins.ts](../../../packages/@expanse/shell/src/hud-components/skins/skins.ts)
> for spatial bars (ActionBar, Toolbar, SettingsBar, ActionDock).
> That system is *structural* — `shape × surface × border × elevation`
> tokens driving the chrome of control bars. Our `CardSkin` is the
> parallel *content-card* system — same naming pattern (`*Skin` +
> presets + resolver), different domain (NBA content cards, not bars),
> different fields (text colors + glow + ink — things bars don't need).
> Lives at `hud-components/next-best-action/cardSkin.ts` so it stays
> beside the only component that consumes it and doesn't pollute the
> bar-skin folder. We borrow the `resolveSkin(preset | config)` pattern
> verbatim so the two systems feel consistent to consumers.

A single typed token shape drives card + header + chips + the panel band the
cards live on. Defined once, consumed everywhere. No `if` branches inside
the components.

### 2.1 Type (new file in `@expanse/shell`)

`packages/@expanse/shell/src/hud-components/next-best-action/cardSkin.ts`

```ts
export interface CardSkin {
  id: string;             // stable key, e.g. "frost-on-dark"
  label: string;          // human label for Storybook + design QA
  group: CardSkinGroup;   // one of the five families below

  /** Background the card itself paints. Supports solid / rgba / gradient. */
  surface: string;
  /** Optional second surface for hover / selected states. */
  surfaceHover?: string;
  surfaceSelected?: string;

  /** Border treatment. `none` removes the border entirely. */
  border: string | "none";
  borderSelected?: string;

  /** Backdrop-filter string (e.g. "blur(12px) saturate(140%)") or `none`. */
  backdrop: string | "none";

  /** Drop-shadow chain applied via filter (works with the breathing loop). */
  shadow: { rest: string; breath: string };
  /** Optional inner highlight (top edge sheen). */
  innerHighlight?: string;

  /** Text + chip colors driven by the skin so a single change re-themes everything. */
  text: {
    question: string;       // big headline ("WHY?")
    questionGlow?: string;  // optional text-shadow accent
    pageLabel: string;      // right side destination
    chevron: string;        // chevron border + icon
  };
  chip: {
    bg: string;
    color: string;
    border: string;
    iconColor: string;
  };

  /**
   * Optional band painted *behind* the cards inside the right panel
   * (a strip the cards live on). Lets a skin add depth without forcing
   * the entire right panel to go dark.
   */
  panelBand?: {
    bg: string;             // solid / gradient
    radius?: number;        // px
    border?: string;
    shadow?: string;
  };
}

export type CardSkinGroup =
  | "frostedGlass"   // current style + its siblings
  | "paperInk"       // light cards, dark text — for white panels
  | "duotoneGradient"
  | "neonGlow"
  | "legacyDeep";    // revival of older steel-blue panel-blue look
```

### 2.2 Context

`packages/@expanse/shell/src/hud-components/next-best-action/CardSkinProvider.tsx`

```ts
const CardSkinContext = createContext<CardSkin>(SKINS.frostOnDark);
export function CardSkinProvider({ skin, children }) { ... }
export function useCardSkin() { return useContext(CardSkinContext); }
```

Cards become skin-driven:

```tsx
const skin = useCardSkin();
<Box sx={{
  bgcolor: selected ? skin.surfaceSelected ?? skin.surface : skin.surface,
  border: skin.border === "none" ? "none" : `1.5px solid ${skin.border}`,
  backdropFilter: skin.backdrop === "none" ? "none" : skin.backdrop,
  boxShadow: skin.innerHighlight,
  ...
}}>
```

Existing `topPickStyle` (glow/halo/shimmer) stays as a layered affordance
**on top of** the skin — completely orthogonal.

### 2.3 Registry

`packages/@expanse/shell/src/hud-components/next-best-action/skins.ts`
exports `SKINS: Record<string, CardSkin>` and `SKIN_GROUPS: Record<CardSkinGroup, CardSkin[]>` (5×5 = 25 entries, see §4).

### 2.4 Wiring into the overlay

- Add `cardSkin?: CardSkin | string` prop to `MinimapFullViewOverlay` (defaults to `"frostOnDark"` — the current production look).
- Wrap the right-panel column in `<CardSkinProvider skin={resolved}>`.
- `MapContextPanel` / `MapNextBestActions` consume `useCardSkin()` for the title strip, chips, and the optional `panelBand`.
- Chip overrides in [MapContextPanel.tsx#L240-L262](../../src/components/hud/MapContextPanel.tsx#L240-L262) are deleted — chips read from `skin.chip`.

Backwards compat: `rightPanelBg` is kept (it still controls the *panel*, not the card). New `cardSkin` controls the *cards*.

---

## 3. Color foundations — reuse + extend

Sources to mine for palette consistency before inventing new colors:

- [packages/@expanse/theme/src/configs/themes/primary/blue/blue-light-theme.ts](../../../packages/@expanse/theme/src/configs/themes/primary/blue/blue-light-theme.ts) — `#4285f4` primary, `#2C4F76` dark panel-blue, `#1A3C66` gradient start, `#1E88E5` highSaturation, `#F0F8FF` light tint.
- `red` + `purple` primary themes (sibling files) — pull accent reds (e.g. `#f91a4b` error) and any deep magentas already in-app.
- Brand guidelines (memory): healing teal/green, dopamine amber, growth gold, soft healing pink. New tokens proposed below stay inside those families.
- `GLOW_RGB` already defined in `NextBestActionCard.tsx`: green `46,204,113`, amber `255,200,87`, pink `236,72,153` — keep, reuse.

Proposed *new* tokens (added to a single `mapCardTokens.ts` so we don't pollute the global theme until a skin is promoted):

| Token | Value | Use |
|---|---|---|
| `panelInkDeep` | `#0B1626` | Deep navy band |
| `panelInkSoft` | `#1B2638` | Slate band |
| `panelMistBlue` | `#EAF2FB` | Light tinted band |
| `panelMistTeal` | `#E6F5F0` | Healing-tint band |
| `panelMistAmber` | `#FBF4E3` | Dopamine band |
| `cardSurfacePaper` | `#FFFFFF` | Clean white card |
| `cardSurfaceLinen` | `#F7F4EE` | Warm paper card |
| `cardSurfaceSlate` | `#1F2A3D` | Dark-on-white card |
| `cardSurfaceGradientCool` | `linear-gradient(135deg,#1E3A5F 0%,#2C4F76 100%)` | Duotone blue |
| `cardSurfaceGradientHeal` | `linear-gradient(135deg,#0F3D3A 0%,#1B5E55 100%)` | Duotone teal |
| `cardSurfaceGradientWin` | `linear-gradient(135deg,#3B2A0B 0%,#6E4A14 100%)` | Duotone gold |
| `cardSurfaceLumen` | `radial-gradient(120% 120% at 30% 0%, rgba(66,133,244,0.18), transparent 60%), #0B1626` | "Lit from above" |
| `inkPrimary` | `#0B1626` | Body text on light cards |
| `inkAccentBlue` | `#1A56D6` | Headline on light cards |
| `inkAccentTeal` | `#0F766E` | Healing accent text |
| `inkAccentGold` | `#A86B00` | Gamified accent text |
| `inkAccentRose` | `#B83A6A` | Emphasis accent text |

---

## 4. The 5 variant groups × 5 variants

Each group locks the *aesthetic family*; the five entries inside iterate
on text color + effect on top of that family. Names use a stable
`group/variant` slug so Storybook stays organised.

### Group A — `frostedGlass` (current style; keep + iterate)

Frosted dark glass cards. Variant A1 **is** the production card —
unchanged — and stays pinned at the top of every comparison story per the
brief.

| Slug | Surface | Border | Question text | Effect / extra |
|---|---|---|---|---|
| `frostedGlass/dark-base` (= today) | `rgba(255,255,255,0.10)` over `#1e293b` band | `rgba(255,255,255,0.30)` | `#fff` | `blur(12px) saturate(140%)`, inner top sheen |
| `frostedGlass/dark-blue-text` | same | `rgba(96,165,250,0.55)` | `#7CB7FF` headline, `#fff` page label | adds soft blue text-shadow |
| `frostedGlass/deep-navy-warm` | `rgba(255,255,255,0.12)` over `#0B1626` band | `rgba(255,210,140,0.35)` | `#FFE3B0` headline | warm amber inner highlight |
| `frostedGlass/heal-mint` | `rgba(180,255,225,0.10)` over `#0F3D3A` band | `rgba(180,255,225,0.40)` | `#A7F3D0` | teal halo + breath glow swap |
| `frostedGlass/rose-pulse` | `rgba(255,200,220,0.10)` over `#1B0F1F` band | `rgba(236,72,153,0.45)` | `#FFC1DA` | hot-pink text-shadow + pink-glow breathing |

### Group B — `paperInk` (light card / dark text — solves the white-panel readability bug)

Cards become a paper surface so the white right panel is finally
readable. The "frosted" sibling A1 still sits on its own small dark
band above this group in comparison stories.

| Slug | Surface | Border | Question text | Effect / extra |
|---|---|---|---|---|
| `paperInk/clean` | `#FFFFFF` | `rgba(15,23,42,0.08)` | `#0B1626` | flat 8px shadow, no blur |
| `paperInk/blue-ink` | `#FFFFFF` | `rgba(26,86,214,0.20)` | `#1A56D6` | 1px left bar in primary blue |
| `paperInk/linen-warm` | `#F7F4EE` | `rgba(120,90,40,0.18)` | `#5A3A12` page label `#A86B00` | warm parchment shadow |
| `paperInk/teal-heal` | `#FFFFFF` | `rgba(15,118,110,0.22)` | `#0F766E` | leading teal accent dot before the chevron square |
| `paperInk/elevated-edge` | `#FFFFFF` | `none` | `#0B1626` | top hairline `#3B82F6`, layered shadow stack for floating feel |

### Group C — `duotoneGradient` (background does the work, text stays neutral)

Cards become subtle gradients; text is high-contrast white or ink chosen
per gradient. Good when we want strong visual hierarchy without colored
text shouting.

| Slug | Surface | Question text | Notes |
|---|---|---|---|
| `duotoneGradient/cool-steel` | `linear(135deg,#1E3A5F→#2C4F76)` | `#FFFFFF` | echoes brand panel-blue |
| `duotoneGradient/heal-deep` | `linear(135deg,#0F3D3A→#1B5E55)` | `#E6FFF7` | green-tinted page label |
| `duotoneGradient/win-gold` | `linear(135deg,#3B2A0B→#6E4A14)` | `#FFF1C7` | gold chip border |
| `duotoneGradient/dawn` | `linear(135deg,#1B1448→#5B1E70)` | `#FFE6F5` | dopamine purple→pink |
| `duotoneGradient/horizon` | `linear(180deg,#0B1626→#1E3A5F 60%,#3B82F6)` | `#FFFFFF` | "sky" feel, blue glow at bottom |

### Group D — `neonGlow` (high-contrast accent system)

For the recommended pick and high-stakes affordances. Frosted base +
saturated outline + colored text-glow. Layered with `topPickStyle` they
become full hero cards.

| Slug | Surface | Border | Question text | Effect |
|---|---|---|---|---|
| `neonGlow/cyan` | `rgba(8,40,60,0.55)` | `#22D3EE` | `#A9F4FF` | cyan outer halo, breath color = cyan |
| `neonGlow/amber` | `rgba(40,28,8,0.55)` | `#FFC857` | `#FFE3B0` | amber halo (matches existing T1) |
| `neonGlow/lime` | `rgba(16,40,16,0.55)` | `#84E551` | `#D8FFB3` | growth/progress emphasis |
| `neonGlow/magenta` | `rgba(46,8,32,0.55)` | `#EC4899` | `#FFC1DA` | "hero" pick |
| `neonGlow/aurora` | `rgba(8,16,40,0.55)` | `linear(90deg,#22D3EE→#EC4899)` (via border-image) | `#FFFFFF` | shimmer sweep on hover, dual-color halo |

### Group E — `legacyDeep` (revives the old panel-blue + heavier surface)

Brings back the look from the original full-view overlay before the
white-paper redesign. This is the most likely candidate for the "effect
we had a while ago" the brief references — the steel-blue `#2C4F76`
panel-blue with heavier glass and a static inset glow, which is exactly
what the [playground variant gallery](../../../packages/@expanse/shell/src/playground/NextBestActionCardVariants.stories.tsx) still uses as its background.

If a different legacy look is meant, drop in a sixth entry and we can
A/B it; the registry is open.

| Slug | Surface | Notes |
|---|---|---|
| `legacyDeep/panel-blue` | `rgba(255,255,255,0.14)` over `#2C4F76` band | the original look |
| `legacyDeep/panel-blue-warm` | same + amber inner ring | the variant just before the white redesign |
| `legacyDeep/cloud-tint` | `rgba(255,255,255,0.18)` over `#1A3C66→#2C4F76` gradient band | the `cloud` map surface era |
| `legacyDeep/water` | adds `WaterBackground` mounted inside the panel band | the drifting-grain era |
| `legacyDeep/bracket-echo` | adds mini `CornerBracketFrame` per card | bracket-on-card iteration |

---

## 5. Storybook structure (browsable list + organisation)

All stories live in `apps/4eye-web-mockup/src/components/hud/cardSkins/`
(new folder — keeps the overlay file from ballooning).

```
cardSkins/
  CardSkinGallery.stories.tsx        ← top-level browser + "all-skins-on-one-screen"
  groups/
    FrostedGlass.stories.tsx         ← 5 entries (A1–A5)
    PaperInk.stories.tsx             ← 5 entries (B1–B5)
    DuotoneGradient.stories.tsx      ← 5 entries (C1–C5)
    NeonGlow.stories.tsx             ← 5 entries (D1–D5)
    LegacyDeep.stories.tsx           ← 5 entries (E1–E5)
  shared/
    SkinPreview.tsx                  ← mini card stack used in gallery cells
    OverlayWithSkin.tsx              ← thin wrapper: full overlay + chosen skin
```

Storybook tree:

```
HUD / Map / MinimapFullViewOverlay        ← unchanged real overlay stories
HUD / Map / Card Skins /
  Gallery — All 25 (side-by-side)
  Gallery — Compare on Real Overlay
  Group A — Frosted Glass / [5 stories]
  Group B — Paper Ink / [5 stories]
  Group C — Duotone Gradient / [5 stories]
  Group D — Neon Glow / [5 stories]
  Group E — Legacy Deep / [5 stories]
```

### 5.1 "Same screen" requirement

`Gallery — Compare on Real Overlay` renders the full `MinimapFullViewOverlay`
with **two** right-panel columns visible at once (left = locked
`frostedGlass/dark-base` per brief, right = current control's chosen skin).
Implemented via a one-off `<DualRightPanel />` decorator that mounts the
NBA + accordions twice with different `CardSkinProvider`s and a center
divider. The map, top strip, brackets, scan, character panel — all
unchanged.

### 5.2 "All 25 on one screen"

`Gallery — All 25` is a CSS grid (5 columns × 5 rows) of `<SkinPreview />`
mini NBA stacks (one direction card each) on a white background so the
contrast question is honestly tested. Each cell shows skin slug + group
label + difficulty meter + the breathing animation enabled.

### 5.3 Per-group stories

Each group story file exports five named stories sharing one decorator —
the real overlay wrapped in `CardSkinProvider`. Args panel exposes
`topPickStyle` so the user can layer the recommended affordance.

---

## 6. Information-design improvements (beyond skins)

These are independent of the skin work but the brief asks for "brilliant
informational design that guides the user to the best route". Listed
separately so we can land them in parallel or defer.

1. **Recommendation reason inline.** Today the "recommended" direction
   only gets the amber glow halo. Add a one-line "why this is your next
   step" caption inside the recommended card (`"You haven't seen the
   Pricing page yet"`, `"Picks up where you left off"`). Driven by a new
   `slot.recommendationReason?: string` field in the direction-slot
   content; renders only on the recommended card to avoid noise.

2. **Difficulty → time-to-value.** Replace the 5-heart difficulty meter
   with a `~2 min` / `~10 min` chip plus a single heart for "loved by
   peers". Hearts are pretty but ambiguous — minutes are unambiguous and
   pair better with chip taxonomy.

3. **Progress hint per direction.** If `tileProgress[direction.tileId]`
   exists, draw a thin progress bar across the bottom edge of the card
   (matches the destination-dot ring on the map). Cards already opened
   pulse softer, signalling "you've been here".

4. **Role + goal echoed in the NBA stack.** A small header above the
   four direction cards: `Strategist · Launch a product` (current role
   selection). Reinforces that the four cards are *filtered for me*. Lifts
   the "Next best actions" title's job from generic to personalised.

5. **Map ↔ card crosslink on hover.** Hovering a direction card outlines
   that destination tile on the map (existing `MapDirectionFocusProvider`
   already exposes `selected` — just add a `hovered` state). Hovering a
   tile on the map highlights the matching card. Closes the loop between
   the two halves of the overlay.

6. **"Open all" affordance on the accordion stack.** Goals/Features/
   Problems currently only allow one-at-a-time. Add a tiny "expand all"
   icon in the right-panel header so power users can scan quickly. Small
   but it removes a recurring annoyance noticed during demo.

7. **Skin-aware top strip.** When a colored-text skin is active, the
   `MapSwitcher` top strip currently still has its faint blue gradient
   wash. Have the strip read `useCardSkin()` and pick a complementary
   wash so the whole right column reads as one designed surface (still
   keeping the frosted glass version pinned per the brief — that one
   uses no wash).

8. **Reduced-motion fallback per skin.** Each skin already gets the
   global `prefers-reduced-motion` guard in the breathing keyframe, but
   the colored text-glow skins should also degrade their `text-shadow`
   to a static `1px` outline. Add `skin.reducedMotion?` overrides.

---

## 7. Implementation phases

### Phase 1 — token system & first migration (no visible behaviour change)
1. Add `cardSkin.ts`, `CardSkinProvider.tsx`, `skins.ts` in `@expanse/shell/hud-components/next-best-action/`.
2. Refactor `NextBestActionCard.tsx` + `NextBestActionCardHeader.tsx` to consume `useCardSkin()`; default skin = `frostedGlass/dark-base` (current values).
3. Refactor chips in `MapContextPanel.tsx` to read `skin.chip`.
4. Add `cardSkin?` prop on `MinimapFullViewOverlay`, wrap the right panel in `<CardSkinProvider>`.
5. Verify: production overlay looks **identical** to today (visual regression check via existing `Default` story).

### Phase 2 — register the 25 skins
1. Populate `SKINS` registry with all five groups.
2. Add `mapCardTokens.ts` for the new color constants.
3. Unit test: every `CardSkin` validates against the type (catches missing fields).

### Phase 3 — Storybook gallery
1. Create the `cardSkins/` folder + per-group story files.
2. Build `SkinPreview.tsx` + `OverlayWithSkin.tsx`.
3. Build `Gallery — All 25` (CSS grid).
4. Build `Gallery — Compare on Real Overlay` with the dual right-panel decorator.

### Phase 4 — information-design upgrades (separable)
Land items 1–8 from §6 individually behind feature checks, not gated on
which skin ships.

### Phase 5 — promote winners
Once a skin per context is chosen, set the production default on
`MinimapFullViewOverlay` and delete the four ad-hoc `CardVariant*Panel`
stories from [MinimapFullViewOverlay.stories.tsx](../../src/components/hud/MinimapFullViewOverlay.stories.tsx) — they're superseded by Phase 3.

---

## 8. Open questions for confirmation

1. **The "old effect I liked"** — best candidates I can identify in
   history are:
   - `legacyDeep/panel-blue` (the `#2C4F76` panel-blue surface still used in `playground/NextBestActionCardVariants.stories.tsx`)
   - `legacyDeep/water` (the `WaterBackground` era)
   - `legacyDeep/bracket-echo` (the per-card `CornerBracketFrame` iteration)
   If none match, point me at a commit / screenshot and I'll add it as `legacyDeep/<name>`.

2. **Hold-the-line on chip pattern?** Chips today are uniformly
   white-on-glass. Should colored-text skins also colorize chips, or
   keep chips neutral so the headline does the work? Default plan: tie
   chips to `skin.chip` so each skin is internally consistent.

3. **Should the right panel itself change color per skin** (e.g. dark
   panel + dark cards) or always stay white? Default plan: skin owns an
   optional `panelBand` band the cards sit on, but the surrounding
   panel stays white so the role/goal accordions read in light mode.

4. **Difficulty meter swap (item §6.2)** — go ahead, or keep hearts and
   only add minutes alongside?
