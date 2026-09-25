# Plan 04 — Text Contrast Cleanup Across the 4eye App

**Target:** `4eye/apps/4eye-web-mockup` (and the `@expanse/theme` tokens it consumes)
**Goal:** Every piece of text in the app meets **WCAG AA — 4.5:1 for body, 3:1 for ≥18.66px bold /
≥24px regular** in both light and dark mode, enforced by a script rather than by eye.

---

## 1. The good news — the machinery already exists

This is not a from-scratch accessibility project. `@expanse/theme` already ships the pieces:

| Symbol | File | Does |
|--------|------|------|
| `contrastRatio(a, b)` | `styles/contrast.ts:56` | WCAG 2.1 ratio |
| `relativeLuminance(color)` | `styles/contrast.ts:43` | — |
| `compositeOverHex(fg, bg)` | `styles/contrast.ts:104` | **Flattens an alpha color over an opaque bg** — this is the one that makes auditing `alpha(x, 0.4)` text possible |
| `ensureContrast(fg, bg, target)` | `styles/contrast.ts:125` | Walks HSL lightness until the ratio is met, preserving hue/saturation |
| `calculateContrast`, `getWcagBadge` | `utils/wcag-contrast.ts` | Reporting helpers |

And `Tiles/integration-layers/components/surfaceTokens.ts` is a **working reference
implementation** of how to apply them — its file comment documents a real bug this approach already
caught (status pills passing against pure white but failing against the actual `#eceffa` page
background). That pattern is the one to generalize.

So the work is **coverage, not invention**: the integration-layers tile is compliant, and almost
nothing else is.

---

## 2. Measured scope

Counts across `apps/4eye-web-mockup/src`, `.tsx` only:

| Pattern | Occurrences | Risk |
|---|---:|---|
| `color: alpha(…, 0.0–0.49)` | **245** in 94 files | High — sub-0.5 alpha text almost never passes |
| `color: "text.disabled"` | **184** | High — MUI's `text.disabled` is 0.38 alpha by default (≈2.2:1) |
| `color: "rgba(…, 0.0–0.59)"` | **133** | High |
| `color: "#rrggbb"` hard-coded | **415** | Medium — bypasses the theme entirely; may be fine or may not, must be measured |

Worst files (low-alpha text + `text.disabled` combined):

```
Tiles/command-center/components/views/GoalsView.tsx          13 + 19
Tiles/command-center/components/views/PrioritiesView.tsx     11 +  7
Tiles/command-center/components/views/InstructionsView.tsx    8
Tiles/character/components/Perspectives.tsx                   6 +  8
Tiles/character/components/DailyFocus.tsx                     5 +  8
Tiles/character/components/Perks.tsx                              8
Tiles/character/components/CharacterSummaryCard.tsx           7
Tiles/character/components/SkillsTree.tsx                         7
Tiles/character/components/Relationships.tsx                      7
Tiles/command-center/components/GoalItemInspector.tsx         6 +  6
Tiles/character/components/Equipment.tsx                      6
Tiles/technical/pipelines/PipelineCard.tsx                    6
```

Two clusters dominate: **`Tiles/command-center/`** and **`Tiles/character/`**. Fixing those two
directories covers most of the failures.

> **Sequencing note:** `Tiles/character/` components are the same ones Plan 01 rebuilds the profile
> page around. Do Plan 01 first so this sweep audits the final markup once.

---

## 3. Approach

### Phase A — Build the audit before changing anything

**A1. Static sweep script** — `tools/contrast-audit/scan.ts`.

Walks `src/**/*.tsx` with the TypeScript AST (not regex — regex cannot resolve `alpha()` args or
follow a token import). For every JSX `sx` prop containing a `color` key, resolve:

- literal hex / `rgba()` → use directly
- `alpha(TOKEN, n)` → resolve `TOKEN` from `@expanse/theme` exports, composite at `n`
- `"text.secondary"` etc. → resolve from the active theme palette
- unresolvable (runtime-computed) → emit as `UNKNOWN`, list separately for manual review

Pair each against the **candidate backgrounds for that surface**. Do not assume one page
background — use the `SOFT_SURFACE` / `SOFT_SURFACE_LIGHT` set, and follow `surfaceTokens.ts`'s
rule of measuring against the *darkest* light-mode surface, since anything passing there passes
against every lighter one.

Output: CSV + a summary — `file:line, resolved fg, bg, ratio, required, PASS/FAIL, mode`.

**A2. Runtime sweep** — `tools/contrast-audit/runtime.ts`.

The static pass cannot see everything (dynamic accents, `ink()` results, nested alpha stacking).
Add a Playwright pass that visits every route in both modes, and for each text node reads computed
`color` + the effective composited background from its ancestor chain, then applies
`contrastRatio`. Slower, but it is ground truth and catches the cases the AST cannot.

Routes to cover — all of `(hud)/appRealm/*`, `(hud)/technical/*`, `(hud)/(websiteRealm)/*`,
`(hud)/integration-layers`, `(hud)/sample`.

**A3. Baseline.** Commit the audit output as `tools/contrast-audit/baseline.json`. Every later
phase is measured as a reduction against it.

### Phase B — Fix at the token layer first

Most of the 184 `text.disabled` uses and many of the 245 alpha cases are one decision repeated.
Fix the source before touching call sites.

**B1. Raise `text.disabled`.** MUI's default (0.38 alpha) cannot pass. Override it per theme in
`@expanse/theme/src/configs/themes/*` to the lowest alpha that clears **4.5:1** against that
theme's darkest surface — compute it, do not guess. Expect ~0.62–0.70. This one change likely
clears 100+ failures with zero call-site edits.

**B2. Publish a text-ramp token set.** `SOFT_TEXT` / `SOFT_TEXT_LIGHT` already exist with
`hi`/`md`/… levels. Verify every level passes, adjust the ones that do not, and document the
intended use of each in `packages/@expanse/theme/docs/`.

**B3. Promote `useSurface` / `ink()` app-wide.** Plan 01 Step 1 moves `surfaceTokens.ts` to
`src/components/surface/`. Once there, it is the sanctioned way to render any accent-colored text
anywhere in the app — not just integration-layers.

**B4. Re-run the audit.** Measure what B1–B3 alone bought. Re-baseline.

### Phase C — Fix the remaining call sites, by cluster

Work directory by directory, re-running the audit after each so progress is visible and no cluster
regresses another:

1. `Tiles/command-center/` — the single largest cluster
2. `Tiles/character/` — after Plan 01 lands
3. `Tiles/technical/`
4. `Tiles/profiles/`, `Tiles/inventory/`, `Tiles/learn/`, `Tiles/money/` …
5. `components/hud/`
6. Everything else

**Fix hierarchy — prefer the earliest that works:**

1. Swap the hard-coded color for a theme token (`text.primary` / `text.secondary` / `SOFT_TEXT.*`).
2. Wrap the accent in `ink()`.
3. Raise the alpha to the computed minimum.
4. Only if 1–3 all fail the design: change the *background* rather than the text, or promote the
   text to a size/weight that qualifies for the 3:1 large-text threshold — and record why in a
   comment.

**Never** silently drop the color to black or white. `ensureContrast` preserves hue and saturation
specifically so a corrected accent still reads as that accent.

**Decorative text is not exempt by default.** WCAG exempts *incidental* text only. Watermarks
(`opacity: 0.06` in `PanelShell`), the scramble-animation digits, and similar are legitimately
decorative — mark each with an explicit `/* contrast-exempt: decorative */` comment so the audit
can allowlist it deliberately instead of it being missed.

### Phase D — Lock it in

**D1. CI gate.** Wire the static sweep into `.github/` — fail the build on any **new** failure
versus `baseline.json`. Ratchet the baseline down as phases complete; never up.

**D2. ESLint rule.** Custom rule banning `color: alpha(x, <0.5)` and raw hex in `sx.color`, with an
autofix suggesting the token equivalent. Warning-level during Phase C, error after.

**D3. Storybook addon.** Add `@storybook/addon-a11y` so new components are checked at authoring
time, in the surface where they are built.

**D4. Document.** `packages/@expanse/theme/docs/09-contrast-guidelines.md` — the ramp, when to use
`ink()`, the exemption comment format, and how to run the audit locally.

---

## 4. Verification

1. Static sweep: **0 FAIL**, both modes, excluding the explicit decorative allowlist.
2. Runtime sweep across all routes: **0 FAIL**, both modes.
3. The `UNKNOWN` bucket from A1 is empty or individually justified — an unresolvable color is not
   a passing color.
4. Manual pass on the three surfaces with the most accent-on-accent text — integration-layers
   panels, the rebuilt profile page, command-center — at 100% and 200% browser zoom.
5. Screenshot diff before/after per tile: the fixes must change legibility, not the design. Any
   tile that looks materially different gets a design review before merge.
6. Storybook a11y addon reports clean on the component set touched.

---

## 5. Scope boundary

This plan covers **`apps/4eye-web-mockup`** and the `@expanse/theme` tokens it consumes. The same
problem almost certainly exists in `ExpanseFrontend/apps/*` (15 apps) and `apps/labs/*`. Once the
audit script exists it is portable — run it against those and open a separate plan sized by what it
finds. Do not widen this one mid-flight.
