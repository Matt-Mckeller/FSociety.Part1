# Intro Flow & Landing Polish — Revision 3

Follow-up to `intro-flow-revision-2.md`. This pass focuses on:

1. Scoping the Cast/orb action buttons to **Future Of** only and refreshing them
2. Tightening the **desktop layout widths** (don't let content sprawl edge-to-edge)
3. Standardizing the **+Learn / +Earn / +Enjoy** chip styling across the deck
4. Improving the **profile FAB ("4eye button") menu**
5. Auditing **font sizes & visibility** across all intro/post-intro slides
6. Adding a clear **"not implemented yet"** marker on the Control-Your-Mind slide

---

## Goals

- The Cast action buttons are unmistakably *the* call-to-action on **Future Of** and don't visually compete with anything else on the deck. They should look like uniform "orb" pills (round, glassy, equal-size).
- Centered/comfortable reading widths on desktop (≤ ~960px content column) — the deck currently uses `maxWidth="lg"` which is ~1200px and feels too wide.
- A single shared component for the `+Learn More / +Earn More / +Enjoy More` chips so we render them identically on `Slide1Logo` and `BrandPromiseSlide` (and any other place that needs them).
- Profile FAB menu reads as a real account/settings dropdown (icons, dividers, profile name/email header), not just four bare strings.
- Everything in the intro is comfortably readable on a 1440×900 laptop and a 1920×1080 desktop without squinting.
- The Control-Your-Mind slide doesn't make demo viewers think the feature is shipping today.

## Non-goals

- Implementing actual mind-pairing / I.exercise() functionality
- Changing the post-intro 7-slide flow order or adding new slides
- Touching mobile layout — desktop only this pass (mobile gets a follow-up if needed)
- Replacing the timeline navigator

---

## Clarifications (confirmed)

**A1 (resolved):** Replace the existing `ButtonBase` cast pills with real `ActionOrb` components from `@expanse/shell`. The `ActionOrb` component already exists with `icon`, `label`, `shape`, `color`, `variant`, `onClick` props — use `variant="glow"` or `"glass"` with per-key `color` for each orb. These only render on the Future Of slide (not elsewhere in the deck).

**A2 (resolved):** 4th cast = **Reflect** (Visualize=see / Story=feel / Expand=grow / Reflect=internalize).

**A3 (resolved):** Profile panel should look like the existing game-bar action bar popout — i.e., use `ActionOrb` buttons inside the existing `ActionBar variant="glass" shape="pill" orientation="vertical"` wrapper that's already there. Each item becomes an `ActionOrb` with an appropriate icon and label instead of bare text buttons.

> **A4.** Control-Your-Mind "not implemented" marker — proposed: a small **Chip** in the top-right of the slide reading **"Concept Preview"** with an `InfoOutlined` icon, plus a one-line subtitle under the headline: *"Concept demo — full mind-pairing isn't shipping yet."*

---

## Tasks

### T1 — Future Of: replace cast buttons with `ActionOrb` + add Reflect

**Files:**
- [components/home/FutureOfSlide.tsx](apps/4eye-web-mockup/src/components/home/FutureOfSlide.tsx)
- [components/home/CastModal.tsx](apps/4eye-web-mockup/src/components/home/CastModal.tsx)

**Changes:**

1. **CastModal.tsx** — add `reflect` to `CastKey` union, `CAST_META`, and `TRANSFORMS`:
   ```ts
   // CastKey
   export type CastKey = "visualize" | "story" | "expand" | "reflect"

   // CAST_META entry
   reflect: { label: "Reflect", Icon: PsychologyAltIcon, color: "#a855f7" }

   // TRANSFORMS entry
   reflect: (t) => `Reflect on ${t.toLowerCase()}:\n  → What did I already know?\n  → What surprised me?\n  → How do I apply this?`
   ```

2. **FutureOfSlide.tsx** — replace the `ButtonBase` pill row with `ActionOrb` components:
   ```tsx
   import { ActionOrb } from "@expanse/shell"

   // Replace CAST_BUTTONS array:
   const CAST_ORBS: { key: CastKey; label: string; icon: ReactNode; color: string }[] = [
     { key: "visualize", label: "Visualize", icon: <VisibilityIcon />,    color: "#3b82f6" },
     { key: "story",     label: "Story",     icon: <AutoStoriesIcon />,   color: "#22c55e" },
     { key: "expand",    label: "Expand",    icon: <OpenInFullIcon />,    color: "#f97316" },
     { key: "reflect",   label: "Reflect",   icon: <PsychologyAltIcon />, color: "#a855f7" },
   ]

   // Render:
   <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
     {CAST_ORBS.map((o) => (
       <ActionOrb
         key={o.key}
         icon={o.icon}
         label={o.label}
         showInlineLabel
         labelPosition="below"
         variant="glow"
         shape="circle"
         size="lg"
         color={o.color}
         onClick={() => handleCast(o.key)}
       />
     ))}
   </Stack>
   ```
   Drop the `ButtonBase` import and the old `CAST_BUTTONS` constant.

3. Move the orb row **below** the GoalToggle future-panel (instead of above) so it reads as "you picked a future, now cast a transform" flow.

**Acceptance:** Future Of shows four `ActionOrb` circles (lg, glow variant, each with its accent color) with labels below, centered under the selected-future panel. Clicking any opens CastModal with the correct transform text.

---

### T2 — Desktop content widths (centering)

**Files:**
- [components/deck/Slide.tsx](apps/4eye-web-mockup/src/components/deck/Slide.tsx) — find current `maxWidth` mapping
- All `<Slide maxWidth="lg" …>` callers (HeroSlide, BrandPromiseSlide, OfferingsSlide, FutureOfSlide, ControlYourMindSlide, RewardSlide)

**Changes:**
1. Audit `Slide`'s `maxWidth` prop; introduce a `"narrow"` (≈720px) and a default of `"medium"` (≈900px). Leave `"lg"` as escape hatch.
2. Switch most slides to the new default. Specifically:
   - `Slide1Logo` (intro): wrap content in a `Stack` with `maxWidth: 720` and `mx: "auto"` so the headline doesn't run wider than ~22ch
   - `Slide2Progress`: `maxWidth: 720`
   - `BrandPromiseSlide`: `maxWidth: 880`
   - `FutureOfSlide`: `maxWidth: 960` (it has the 6-future grid)
   - `ControlYourMindSlide`: `maxWidth: 880`
   - `RewardSlide`: `maxWidth: 880`
3. Confirm `mx: "auto"` and horizontal `px` padding are present on each slide root.

**Acceptance:** On a 1920×1080 viewport, no slide content stretches past ~960px wide; everything is centered with breathable side margins.

---

### T3 — Shared `LearnEarnEnjoyChips` component

**New file:** `components/landing/shared/LearnEarnEnjoyChips.tsx`

```tsx
"use client"
import { Chip, Stack, type StackProps } from "@mui/material"

export interface LearnEarnEnjoyChipsProps extends Omit<StackProps, "children"> {
  /** "row" on desktop / "column" on mobile by default. */
  layout?: "row" | "column"
  /** Render each chip's outer wrapper for animation refs. */
  itemRef?: (el: HTMLDivElement | null, index: number) => void
}

const LABELS = ["+Learn More", "+Earn More", "+Enjoy More"] as const
```

**Callers updated:**
- `Slide1Logo.tsx` — replace inline `Chip` mapping with `<LearnEarnEnjoyChips itemRef={(el,i)=>{ sublineRefs.current[i] = el }} />`
- `BrandPromiseSlide.tsx` — replace its current Learn/Earn/Enjoy renderers with the shared component (keeps progress-bar variant if it has one — check before swapping)

**Acceptance:** The three chips look pixel-identical between the intro slide and the BrandPromise slide.

---

### T4 — Profile FAB menu: upgrade DefaultProfilePanel to ActionOrb buttons

**File:** [packages/@expanse/shell/src/hud-components/rails/HudRightRail.tsx](packages/@expanse/shell/src/hud-components/rails/HudRightRail.tsx)

The panel already wraps in `ActionBar variant="glass" shape="pill" orientation="vertical"`. The upgrade is to replace the bare `<button>` rows with `ActionOrb` components (matching the game-bar orb style), so the panel looks like a proper HUD action popout:

```tsx
const PROFILE_ITEMS = [
  { key: "profile",  label: "Profile",  icon: <PersonIcon />,       color: "primary" },
  { key: "settings", label: "Settings", icon: <SettingsIcon />,     color: "default" },
  { key: "theme",    label: "Theme",    icon: <Brightness4Icon />,  color: "default" },
  { key: "help",     label: "Help",     icon: <HelpOutlineIcon />,  color: "default" },
  { key: "signout",  label: "Sign out", icon: <LogoutIcon />,       color: "danger"  },
]

function DefaultProfilePanel() {
  return (
    <ActionBar variant="glass" shape="pill" orientation="vertical" gap={0.5}>
      {/* Header row */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 2, pt: 1.5, pb: 1 }}>
        <ProfileFrame tier={1} size={36} shape="circle" variant="friendly" zoom="face" showBadge={false} />
        <Stack spacing={0}>
          <Typography variant="body2" fontWeight={700}>Demo User</Typography>
          <Typography variant="caption" color="text.secondary">you@4eye.app</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mx: 1, my: 0.5 }} />
      {/* Orb action buttons */}
      {PROFILE_ITEMS.map((item) => (
        <ActionOrb
          key={item.key}
          icon={item.icon}
          label={item.label}
          showInlineLabel
          labelPosition="right"
          variant="glass"
          shape="circle"
          size="sm"
          color={item.color}
        />
      ))}
    </ActionBar>
  )
}
```

**Notes:**
- Import `ActionOrb` from the same `@expanse/shell` barrel (it's in the same package).
- No behavior on clicks for now — these are mockup placeholders.
- The existing `panelContent` override prop on `HudRightRail` is untouched so app consumers can still replace the panel.

**Acceptance:** Clicking the profile FAB shows a popout with a mini avatar header and 5 orb-style action buttons in the same glass pill container as the game bar.

---

### T5 — Font/visibility audit across intro slides

**Files:** the three intro slides + each post-intro slide.

**Changes:**
1. **Slide1Logo headline** — currently `clamp(1.75rem, 4vw, 3.25rem)` (~28–52px). Bump min to `2rem`. Verify weight 700 on headline, 600 on chips.
2. **Slide2Progress celebration** — currently `clamp(1.5rem, 3.2vw, 2.5rem)`. Bump min to `1.75rem`. Add `letter-spacing: -0.01em` (already there) and make `<strong>` color `primary.main` is high contrast against the soft radial bg — verify.
3. **Slide3Face tagline** — currently `clamp(1rem, 2vw, 1.5rem)`. Bump min to `1.25rem` (was getting lost on desktop).
4. Post-intro slide eyebrows (`variant="overline"`): bump letter-spacing to `0.12em` and weight to 700 for visibility.
5. **Soft radial background** check: in `IntroFlow.tsx` the bg is `${primary.main}14` (8% alpha) over `background.default`. On dark themes this can wash text out — verify against the theme.
6. Add `text-shadow: 0 1px 2px rgba(0,0,0,0.04)` to all intro headlines to lift them off the radial gradient on light theme.

**Acceptance:** Read each slide at 1440×900 and 1920×1080. All headlines feel ≥ 32px, no copy looks tentative.

---

### T6 — Control-Your-Mind "concept preview" marker

**File:** [components/home/ControlYourMindSlide.tsx](apps/4eye-web-mockup/src/components/home/ControlYourMindSlide.tsx)

**Changes:**
1. Add a `Chip` in the top-right corner of the slide:
   ```tsx
   <Chip
     icon={<InfoOutlinedIcon />}
     label="Concept Preview"
     size="small"
     color="warning"
     variant="outlined"
     sx={{ position: "absolute", top: 16, right: 16 }}
   />
   ```
   (Slide root needs `position: "relative"` if it isn't already.)
2. Add a one-line subtitle under the headline, muted:
   > "Concept demo — full mind-pairing isn't live yet. The pairs below illustrate the target experience."
3. Optional: dim the second strategy line slightly (`opacity: 0.7`) since it's the most aspirational.

**Acceptance:** A first-time viewer immediately sees the chip and reads the subtitle and understands this is a forward-looking demo.

---

## Risks / things to watch

- **Shared chip component** — if `BrandPromiseSlide` currently animates its chips with progress bars or value counters, the shared component needs a `variant` prop or we leave BrandPromise alone and just reuse copy. Check before refactoring.
- **`Slide` `maxWidth` change** — narrowing slides could clip content in `OfferingsSlide` (it has a horizontal goal-toggle row). Test specifically.
- **Profile FAB** — `HudRightRail` lives in the shared `@expanse/shell` package. Other apps consume it. The header (avatar/name/email) should accept props with sensible defaults so we don't break other consumers; if consumers don't pass anything, fall back to current minimal menu.
- **Cast color tokens** — the per-button accent colors (#3b82f6 / #22c55e / #f97316 / new violet) are hard-coded literals. Consider lifting them to a shared `castTheme` map but not required this pass.

---

## Sequence

1. T2 (widths) — least risky, sets the canvas
2. T3 (shared chips) — small, isolated
3. T1 (orb buttons + Reflect cast) — visible win on Future Of
4. T6 (concept-preview marker) — tiny, very visible
5. T4 (FAB menu) — cross-package change, bigger blast radius
6. T5 (font/visibility audit) — final polish across all slides

Each step gets its own commit.

---

## Acceptance (rev 3 done when…)

- [ ] Future Of has 4 orb-pill buttons (Visualize / Story / Expand / Reflect), no "Transform:Learn:" prefix, equal sized, accent-glow on hover
- [ ] No slide content exceeds ~960px on a 1920px-wide viewport; all centered
- [ ] +Learn/+Earn/+Enjoy chips are visually identical wherever they appear
- [ ] Profile FAB panel shows avatar+name+email header, icon-prefixed menu, destructive sign-out
- [ ] All intro headlines read at ≥ 2rem on all viewports; no tentative-looking copy
- [ ] Control-Your-Mind has a "Concept Preview" chip and explanatory subtitle
- [ ] No new TS errors; existing tests pass
