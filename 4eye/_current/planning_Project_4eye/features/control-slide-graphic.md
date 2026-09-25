# Control Slide Graphic — Improvement Plan

> Update the hero graphic on the **Control** slide (home deck) to better
> teach the product, connect to gamification, and offer both **watch** and
> **controller** device variants behind a prop.

**Status:** Approved — ready to implement
**Last updated:** 2026-05-25 (user feedback locked in §10)
**Owner:** TBD
**Scope:** `apps/4eye-web-mockup` — `ControlSlide` + `VisionWatchCharacter`
**Related:**
- [ControlSlide.tsx](../../../apps/4eye-web-mockup/src/Tiles/home/slides/control/ControlSlide.tsx)
- [VisionWatchCharacter.tsx](../../../apps/4eye-web-mockup/src/components/character/vision/VisionWatchCharacter.tsx)
- [BrainWiringStrip.tsx](../../../apps/4eye-web-mockup/src/components/character/vision/BrainWiringStrip.tsx)
- [intro-flow-revision-3.md](./intro-flow-revision-3.md)

---

## 1. Why change it

The current graphic — a 4eye character glancing at a wristwatch with a
shock reaction — has three weaknesses against the **"Control Attention.
Control Your Mind."** headline:

| Weakness | Why it matters |
|---|---|
| A watch is **passive** (you check it; it doesn't give control) | Undercuts the "control" headline |
| The ⚡ shock reaction reads as **anxiety**, not mastery | Off-tone for a healing / empowerment brand |
| No visible link to the **brain-wiring strip** below | The strip becomes decoration instead of payoff |
| No **gamification** cue (coins / XP / level) | Misses a chance to teach the product loop |

The improvement plan addresses all four while preserving the watch
variant behind a prop so existing usage and the "AVAILABLE SOON"
notification tie-in are not lost.

---

## 2. Design direction — the **Mind Controller**

A handheld gamepad that the character holds in front of them. Pressing a
button sends a pulse down a wire to the BrainWiringStrip, lighting one
strip node. **You press → your mind responds.** This is the headline,
rendered.

### 2.1 Why a controller fits the 4eye brand specifically

| Brand element | Controller mapping |
|---|---|
| Triangle / Circle / Square primitives | Face buttons △ ○ ✕ ▢ |
| Symbol-Grid (4-direction nav) | D-pad cross |
| "Gamification (coins, progression, leveling)" theme | Native to the object |
| "Connecting dots, chain linking" | Pulse wire from controller → brain strip |
| Darkness → light progression | Button press lights up brain node |

### 2.2 Anatomy

```
        ┌──────────────────────────────┐
        │  ┌─[XP / coin mini-display]─┐│   ← gamification surface
        │  │  ⊙ 1,240    Lv 7  ▰▰▰▱  ││
        │  └──────────────────────────┘│
        │  ┌─┐                    △   │
        │  ┃ ┃   D-pad        ▢       │
        │  └─┘   (Symbol     ✕    ○   │
        │                    Grid)    │
        │  ╲                       ╱  │   ← grips
        └───╲─────────────────────╱───┘
             ╲___                ___
                 ╲     wire     ╱
                  ╲───●─●─●───╱       ← pulse travels here
                  BrainWiringStrip
```

### 2.3 Animation beats

**Mount (≈ 3.4s, replaces the 3-glance watch sequence):**

| t | Beat |
|---|---|
| 0.0 | Idle, controller hidden |
| 0.4 | Arms lift, controller fades in |
| 0.8 | Press △ → triangle button depresses → ⚡ pulse fires → first BrainWiringStrip node lights |
| 1.3 | Press ○ → ⚡ pulse → second node lights |
| 1.8 | Press ▢ → ⚡ pulse → third node lights |
| 2.3 | Press ✕ → ⚡ pulse → fourth node lights |
| 2.8 | Mini-display rolls up: `+40 XP`; one coin pops out and lands in the display |
| 3.4 | Settle, gentle "press me" pulse on △ |

**Reaction (hover / click, replaces the old ⚡ shock):**

| t | Beat |
|---|---|
| 0.0 | Combo mash: △○✕▢ in 0.4s |
| 0.4 | Coin burst from device (3–5 coins float up, fade) |
| 0.5 | `LEVEL UP!` `TripleLayerPill` pops above head (replaces `ShockSvg`) |
| 0.7 | All strip nodes light briefly, connected by a single sweeping ⚡ bolt across them |
| 1.0 | Hold |
| 1.6 | Settle |

### 2.4 Lightning style (modernized)

The old `ShockSvg` is a chunky cartoon zigzag. Replace with a sleeker
bolt used in **two places**:

1. **Per-press pulse** between controller and strip node (small, fast, white-core / brand-glow halo).
2. **Sweep bolt** during the LEVEL UP reaction across all strip nodes.

Visual spec for the bolt:
- Stroked path (not filled cartoon), 2px core with a 6px brand-glow blur underneath.
- 2–3 segments max — single sharp angle, not the multi-zig classic.
- Animated via `stroke-dashoffset` for a drawn-on feel (~120ms per pulse).
- Color follows the pressed button (△ improve / ○ heal / ✕ protect / ▢ win).
- Lives in `devices/LightningBolt.tsx` so it can be reused outside this slide.

---

## 3. Component API

### 3.1 New prop on the existing component

Rename or wrap `VisionWatchCharacter` → `VisionControlCharacter` with:

```ts
type ControlDevice = "watch" | "controller" | "both";

interface VisionControlCharacterProps {
  /** Which device the character is holding. Defaults to "controller". */
  device?: ControlDevice;
  /** Show gamification overlays (coin display, XP gain). Default true. */
  gamification?: boolean;
  /**
   * Whether the device emits a ⚡ pulse that lights a node on the
   * BrainWiringStrip below. Requires the strip to be rendered as a
   * sibling and registered with the shared pulse context.
   * Default true.
   */
  wireToBrainStrip?: boolean;
  /**
   * Optional gamification chip rail rendered under the character
   * (HUD / Rewards / Coins / Streak / Level). Set to false to hide,
   * or pass a custom list. Default `"default"`.
   */
  chipRail?: "default" | false | GamificationChip[];
}
```

**Variants:**
- `"watch"` — preserves current behavior, including the "AVAILABLE SOON"
  notification dot. Gamification overlays still apply if enabled (coin
  burst on reaction, XP toast).
- `"controller"` — new default. Mind-Controller per §2.
- `"both"` — character holds controller in dominant hand, wears watch on
  the other wrist. Useful as a transition state or a marketing variant.

### 3.2 ControlSlide usage

```tsx
// default — controller
<VisionControlCharacter />

// preserve old behavior on a marketing page
<VisionControlCharacter device="watch" />

// stage demo with both
<VisionControlCharacter device="both" />
```

### 3.3 File layout

```
apps/4eye-web-mockup/src/components/character/vision/
  VisionControlCharacter.tsx        ← shell + prop dispatch (renamed)
  devices/
    WatchSvg.tsx                    ← extracted from current file
    ControllerSvg.tsx               ← new
    XpDisplay.tsx                   ← shared mini-display
    CoinBurst.tsx                   ← shared overlay
    LightningBolt.tsx               ← modernized ⚡ (per §2.4)
    LevelUpBadge.tsx                ← TripleLayerPill wrapper
  chips/
    GamificationChipRail.tsx        ← HUD / Rewards / Coins / Streak / Level pills
  pulse/
    BrainStripPulseContext.tsx      ← controller → strip handshake
  VisionWatchCharacter.tsx          ← thin re-export for back-compat
```

Re-exporting `VisionWatchCharacter` from the new module avoids breakage
during the transition (it's currently imported by `ControlSlide` and
likely Storybook stories).

---

## 4. Brand-shape buttons (visual spec)

Each face button is a brand primitive rendered in the brand palette,
with a depressed-state animation on press.

| Button | Shape | Resting color | Pressed color | Maps to |
|---|---|---|---|---|
| Top | Triangle (filled, brand outline) | `brand.improve` | `brand.improve.bright` | Improve / learn |
| Right | Circle | `brand.heal` | `brand.heal.bright` | Heal / positivity |
| Bottom | X (two crossed bars) | `brand.protect` | `brand.protect.bright` | Protect / safety |
| Left | Square | `brand.win` | `brand.win.bright` | Win / score |

Mapping intentionally mirrors the **Improve / Innovate / Win / Heal /
Protect** brand themes — pressing a button is "choosing what to grow."

D-pad: 4 small squares in a cross — explicitly references the
Symbol-Grid navigation system.

---

## 4b. Gamification chip rail (new)

A small horizontal rail of chips/pills rendered **below** the character
(or to one side at desktop widths), teaching the gamification surface in
one glance. Each chip uses the brand's `TripleLayerPill` for visual
consistency with the LEVEL UP badge.

```
[ ◉ HUD ] [ ⌂ Rewards ] [ ⊙ 1,240 Coins ] [ ▴ 7-day Streak ] [ Lv 7 ]
```

Default chip set:

| Chip | Icon | Why it's here |
|---|---|---|
| HUD | `ViewSidebar` (existing) | Teaches that the product has a HUD/overlay surface |
| Rewards | `EmojiEvents` (existing) | Connects to Expanse EDU store / rewards |
| Coins | `CoinIcon` from `@expanse/brand-core` | The primary currency |
| Streak | `Bolt` (existing) | Daily-return loop |
| Level | `AutoAwesome` or numeric | Progression |

**Behavior:**
- Chips animate in **after** the device mount sequence finishes (~3.5s),
  staggered 80ms each, so they feel like a payoff for watching the demo.
- On the LEVEL UP reaction, the **Level** chip flashes and ticks up
  (`Lv 7 → Lv 8`).
- On coin burst, the **Coins** chip increments with a quick odometer roll.
- Controlled by the `chipRail` prop (see §3.1) — `false` hides the rail
  for embeds where space is tight.

---

## 5. Connection to the BrainWiringStrip

Two implementation tiers — **shipping Tier A now, Tier B later if it
tests well** (per user 2026-05-25).

**Tier A (shipping, ~½ day) — implied wire:**
- A new React context `BrainStripPulseContext` exposes `pulse(nodeIndex: number)`.
- `ControllerSvg` calls `pulse(i)` on each button press.
- `BrainWiringStrip` subscribes and runs a glow + small ⚡ flash on the
  matching node.
- **No visible wire is drawn** between the controller and the strip —
  the connection is implied by timing (press → instant node glow).
- No layout changes; works because the two components are already
  siblings inside `ControlSlide`.
- Risk: low. Reversible.

**Tier B (future, ~1 day) — visible wire:**
- Adds an actual SVG `<path>` from the bottom edge of the controller
  down to the matching strip node, with a `stroke-dashoffset` glow
  traveling along it on each press (reusing `LightningBolt`).
- Requires an absolutely-positioned overlay `<svg>` spanning both
  components, recalculated on resize.
- More cinematic; more breakpoint surface area to test.
- Upgrade path: keep Tier A wiring (context + pulse), only add the
  overlay layer when promoted.

---

## 6. Implementation steps

1. **Extract** `WatchSvg` and reaction overlays into `devices/`. Keep current watch behavior including the notification dot.
2. **Build** `LightningBolt` per §2.4 (modernized ⚡, reusable).
3. **Build** `ControllerSvg` with brand-shape face buttons, D-pad, screen surface.
4. **Build** shared `XpDisplay`, `CoinBurst`, `LevelUpBadge` (using `TripleLayerPill`).
5. **Build** `GamificationChipRail` per §4b.
6. **Rename** `VisionWatchCharacter` → `VisionControlCharacter`, add props from §3.1. Keep old name as re-export for back-compat.
7. **Write** the controller mount + reaction timelines (§2.3).
8. **Add** `BrainStripPulseContext` (Tier A) and wire button presses → strip node glow + small ⚡ flash.
9. **Update** `ControlSlide` to render `<VisionControlCharacter />` (default = controller) and the chip rail. Wrap slide content in the pulse context provider.
10. **Implement `device="both"`** — controller in dominant hand, watch on the other wrist. Watch shows time / notification; controller drives the brain pulses.
11. **Stories** in Storybook for `device="watch" | "controller" | "both"` and `chipRail=false` — white background per project convention.
12. **A11y pass** — aria labels per device, reduced-motion fallback that swaps the timeline for a single static LEVEL UP flash with no traveling pulses.
13. **Visual QA** at 360px / 768px / 1440px / short-landscape (`min(28vw,36vh)` clamp).

---

## 7. Decisions (locked 2026-05-25)

| # | Question | Decision |
|---|---|---|
| 1 | Default device | **`controller`** |
| 2 | Watch notification dot | **Keep as-is** (current behavior preserved on watch variant) |
| 3 | LEVEL UP glyph | **`TripleLayerPill`** wrapper (`LevelUpBadge`) |
| 4 | Pulse-to-strip integration | **Tier A now**, Tier B as a future upgrade |
| 5 | `"both"` variant | **Ship it** |
| 6 | Gamification framing | **Keep ⚡ "electrocute the brain" concept**, modernize the bolt per §2.4. Add HUD / Rewards / Coins / Streak / Level chips per §4b. |

### Still open

- **Persona swap** — currently uses `CHARACTER_PERSONAS.vision`. Should
  the controller variant use a different persona (e.g. a "player" /
  "winner" persona) if one exists? Default to `vision` until a better
  persona is requested.

---

## 8. Alternatives considered

| Alternative | Why not (primary) |
|---|---|
| Keep watch, just add coin/XP overlays | Doesn't solve the "passive object" problem; gamification feels bolted on |
| Replace watch with a **phone** | Strong "device" signal but no gamification semantics; also visually generic |
| Replace watch with a **book / brain** | Too on-the-nose for "learning"; loses the active-control metaphor |
| Replace watch with the **Symbol-Grid** itself (no device) | Loses the personification / "you in control" framing; better suited to a later slide |
| Animated **brain only** (no held object) | Removes the user's surrogate from the frame — weakens "**you** control your mind" |

---

## 9. Stretch / future ideas

- **Streak / combo counter** in the mini-display after rapid clicks.
- **Persona-aware button mapping** — a learner persona highlights △ (Improve); a host persona highlights ▢ (Win).
- **Sound** — soft button click + level-up chime (gated behind a global audio toggle).
- **Profile tie-in** — once profiles ship, the XP/coin numbers read from the actual logged-in profile instead of cosmetic constants.
- **Lottie variant** of the LEVEL UP reaction (ties into the planned Lottie integration in `tasks.md`).
