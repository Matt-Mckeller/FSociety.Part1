# Intro Flow Revision 2 — Personalized AI + Push-During-HUD

Status: **Plan**
Owner: Home / Landing
Scope: `apps/4eye-web-mockup/src/components/landing/intro/**`
Related code:
- [IntroFlow.tsx](../../../apps/4eye-web-mockup/src/components/landing/intro/IntroFlow.tsx)
- [Slide1Logo.tsx](../../../apps/4eye-web-mockup/src/components/landing/intro/slides/Slide1Logo.tsx)
- [Slide2Progress.tsx](../../../apps/4eye-web-mockup/src/components/landing/intro/slides/Slide2Progress.tsx)
- [DataChipOverlay.tsx](../../../apps/4eye-web-mockup/src/components/landing/intro/DataChipOverlay.tsx)

---

## 1. Goals

1. **Reposition the brand promise.** Lead with *who 4Eye is* (a personalized AI for Learning, Work, and Life) instead of just "the human AI."
2. **Tighten the narrative.** The "Unlock your potential" line should *land while the character is pushing*, not after — payoff arrives mid-effort to set up a celebration on the back half.
3. **Show the product earlier.** Reveal the persistent HUD chrome *during* the push so the page transitions naturally from intro to product instead of cutting hard at the end.
4. **De-emphasize the bottom chip strip.** Its current execution (three different colors, floating at the bottom) competes with the headline. Move the +Learning / +Engagement / +Mood meaning into the slide-1 sub-line stack and unify them visually.

## 2. Non-Goals

- Re-doing GSAP timeline plumbing or `IntroFlow` state machine.
- Changing slide 3 (face hand-off to right-rail FAB).
- Replacing `PushingProgressCharacter` internals (we work with its `onComplete` only — no new `onProgress` API).
- Localizing copy (single English string for now).

## 3. Current State (baseline)

- **Slide 1** — `FourUpLogo` + `<strong>4Eye</strong>, The Human AI` headline + three sublines: `+Learn More`, `+Earn  More`, `+Enjoy More` (color: `primary.main`, fade in at 0.45/0.85/1.25s).
- **Slide 2** — `PushingProgressCharacter preset="dramatic"` runs 0→100. On `onComplete`, the celebration line `Unlock your potential. Multiply yourself.` reveals.
- **DataChipOverlay** — fixed bottom-center, three pill `Chip`s: `+Learning` (#5b9cff), `+Engagement` (#ff8a3d), `+Mood` (#5fd39a). Visible across all three slides.
- **HUD chrome** — `useRegisterHudChromeHide(["topRow", "leftRail", "rightRail", "bottomChrome"])` hides the entire HUD for the full duration of the intro. Right-rail is opted back in at slide-3 hand-off.

## 4. Target Behavior

### 4.1 Slide 1 — "Meet 4Eye"
| At | Element |
|---|---|
| 0.00s | `FourUpLogo` fades in (existing behavior) |
| 0.25s | New headline reveals: **"Meet 4Eye, your personalized AI for Learning, Work, and Life."** (`4Eye` styled with `primary.main`) |
| 0.45s | Subline `+Learn More` |
| 0.85s | Subline `+Earn  More` |
| 1.25s | Subline `+Enjoy More` |
| settle 0.8s | exit |

The three sublines stay (per user). The color of the **sublines** matches the new chip color (see §4.4) so they read as one group, not two.

### 4.2 Slide 2 — Push + mid-push reveal + HUD reveal
The push runs `dramatic` preset (~3s based on `speedFactor: 0.04` × 100 + walk 1.2s + transitions). We don't have an `onProgress` callback, so we time the two reveals against `gsap` timers driven from the slide's `onEnter`.

| At (relative to slide-2 enter) | Action |
|---|---|
| 0.00s | Stage fades in. `PushingProgressCharacter` mounts and starts pushing. |
| 0.40s | **Headline part A** reveals: **"Unlock your potential."** (fade + 8px rise) |
| 0.40s | **HUD reveal begins**: drop the intro's chrome-hide registration. Top row, left rail, right rail, bottom chrome all fade back in over ~0.6s while the character keeps pushing. The push thus appears to "build" the product around itself. |
| ~50–60% of push duration | **Headline part B** reveals: **"Multiply yourself."** styled `primary.main`, in-place under part A (or appended on the same line at wide breakpoints) |
| `onComplete` (push done + character celebrates) | Slide settle (1.4s) then exit. We do **not** wait until `onComplete` to reveal text; by that point both halves are already on screen. |

The two reveals are scheduled deterministically with `gsap.delayedCall(t, …)` from `onEnter`. We do not need to know exact push duration — empirically the dramatic preset is ~3s and we pick the second beat at ~1.6–1.8s in. Tweakable constants at the top of the file.

### 4.3 HUD-during-push
- Today: `IntroFlow` calls `useRegisterHudChromeHide({ hide: ["topRow", "leftRail", "rightRail", "bottomChrome"] })` for the full lifetime of the component.
- Target: `IntroFlow` exposes a *phase-aware* hide list. We add a piece of state `hudRevealed` (default `false`) that flips to `true` when slide 2 fires its mid-push beat. While `hudRevealed === true` we register an empty hide list (or just the `bottomChrome` if the AI bar still fights the celebration text — TBD during implementation).
- Mechanism: `IntroFlowProvider` already exposes context. We add a `revealHud()` action and a `hudRevealed: boolean` state on it. `IntroFlow` consumes `hudRevealed` to compute the `hide` array. `Slide2Progress` calls `revealHud()` at the 0.40s beat.
- Slide 3 already wants the right rail visible for the FAB hand-off. With the HUD already revealed in slide 2, slide 3 simplifies — no special-case for right rail.

### 4.4 Chip redesign
- **Remove** `DataChipOverlay` from `IntroFlow` (delete the floating bottom strip).
- **Inline** the three values into slide 1 *as the existing sublines* by giving them small chip affordances:
  - Same MUI `Chip` component (or custom pill), all using `color="primary"`, `variant="outlined"` for a single, calm color.
  - Stacked vertically (matches today's layout) and animated with the same staggered delays as today's text sublines.
  - Labels: `+Learn More`, `+Earn More`, `+Enjoy More` (drop the double-space typo in `+Earn  More`).
- Net effect: one visual group, one color, near the headline. The page feels less busy and the bottom of the screen frees up so the HUD reveal in slide 2 has room to land.

## 5. Files to Touch

| File | Change |
|---|---|
| [IntroFlowContext.tsx](../../../apps/4eye-web-mockup/src/components/landing/intro/IntroFlowContext.tsx) | Add `hudRevealed: boolean` state and `revealHud()` action to context |
| [IntroFlow.tsx](../../../apps/4eye-web-mockup/src/components/landing/intro/IntroFlow.tsx) | Read `hudRevealed` from context; compute `hide` list dynamically (full hide → empty when revealed). Remove `<DataChipOverlay />`. |
| [Slide1Logo.tsx](../../../apps/4eye-web-mockup/src/components/landing/intro/slides/Slide1Logo.tsx) | Update headline copy. Replace `<Typography>` sublines with chips (or wrap typography in chip styling). Keep timeline. |
| [Slide2Progress.tsx](../../../apps/4eye-web-mockup/src/components/landing/intro/slides/Slide2Progress.tsx) | Split celebration text into two refs (Part A / Part B). Schedule reveals via `gsap.delayedCall(0.40, …)` and `gsap.delayedCall(~1.7, …)`. Call `revealHud()` from context at the 0.40s beat. Remove the `onComplete`-driven text reveal. |
| [DataChipOverlay.tsx](../../../apps/4eye-web-mockup/src/components/landing/intro/DataChipOverlay.tsx) | Delete file (and remove its export from `index.ts`) once consumers are clean. |

## 6. Task List

1. **Plan checkpoint** *(this doc)*. ✅
2. **Context plumbing** — add `hudRevealed` + `revealHud()` to `IntroFlowContext`.
3. **Dynamic chrome hide** — make `IntroFlow` derive its `useRegisterHudChromeHide` arg from context; verify HUD smoothly fades in when toggled (no layout jank — `HudChromeVisibilityProvider` already handles fade transitions).
4. **Slide 1 copy + chip merge**:
   - 4a. Change headline to `Meet <strong>4Eye</strong>, your personalized AI for Learning, Work, and Life.`
   - 4b. Replace subline `<Typography>`s with `<Chip>`s using `color="primary"`, `variant="outlined"`. Keep their refs + timeline targets so existing GSAP fades still work.
   - 4c. Fix `+Earn  More` → `+Earn More` (single space).
5. **Slide 2 dual reveal**:
   - 5a. Split text into `partARef` (`Unlock your potential.`) and `partBRef` (`Multiply yourself.`).
   - 5b. Refactor `onEnter` to schedule both reveals via `gsap.delayedCall` with named constants `PART_A_AT = 0.4`, `PART_B_AT = 1.7`. Call `revealHud()` inside the part-A callback.
   - 5c. `enterComplete` fires when the push's `onComplete` resolves *and* both reveals have fired (defensive: track with a ref count).
   - 5d. Remove the old `progressDone` state path that revealed text only post-completion.
6. **Delete `DataChipOverlay`** and unmount from `IntroFlow`. Remove from `intro/index.ts` if exported.
7. **Browser smoke test**:
   - Hard reload with `localStorage.clear()`.
   - Confirm slide 1 headline reads correctly and chips appear in one color.
   - Confirm slide 2 shows "Unlock your potential." while character is mid-push, HUD chrome fades in around then, "Multiply yourself." lands later, and slide 3 still hands off cleanly.
8. **Reduced-motion path** — verify `prefersReducedMotion` short-circuits still work (no `delayedCall` traps; either skip the timers or fire them immediately).
9. **Commit** as `feat(4eye-web-mockup): intro flow rev 2 — meet 4eye copy, mid-push HUD reveal, unified chip styling`.

## 7. Risks & Open Questions

- **Push duration drift.** We're hard-coding the part-B delay. If the dramatic preset's timing is tuned later, the celebration may land too early or too late. Mitigation: pick a value that reads OK ±300ms; revisit if the preset is changed.
- **HUD reveal mid-animation.** `HudChromeVisibilityProvider` should already animate visibility via opacity. If chrome pops in instantly we may need to add a transition there (out of scope unless visible in QA).
- **Long headline width on small screens.** The new headline is longer than the old one. The existing `clamp()` font-size handles scaling; `text-wrap: balance` (CSS) is a cheap safety net.
- **Chip vertical rhythm.** Slide 1 currently has `Stack spacing={3}` between the logo, headline, and subline group. Switching to chips may want a slightly tighter `spacing={0.75}` *within* the chip stack while keeping `spacing={3}` outside. Tune in QA.

## 8. Acceptance Criteria

- [ ] Slide 1 headline reads `Meet 4Eye, your personalized AI for Learning, Work, and Life.` with `4Eye` colored.
- [ ] Three pills (`+Learn More`, `+Earn More`, `+Enjoy More`) appear in one color (primary, outlined), stacked, near the headline. No floating bottom strip.
- [ ] Slide 2: "Unlock your potential." appears while the character is still pushing.
- [ ] HUD chrome (top row, left rail, right rail, bottom chrome) fades back in *during* the push, not after.
- [ ] "Multiply yourself." appears later in the push (still before `onComplete`).
- [ ] Slide 3 hand-off to the right-rail FAB still works (face lands on existing visible FAB).
- [ ] Returning visitors (`localStorage["4eye:intro-seen:v1"] === "1"`) still skip the intro.
- [ ] `prefers-reduced-motion: reduce` still short-circuits the timeline.
