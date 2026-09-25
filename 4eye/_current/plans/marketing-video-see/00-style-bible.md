# Style Bible — "See"

> Locked visual / motion / audio / prompt language. Copy relevant sections into every AI-gen prompt for consistency across tools (Veo 3, Sora 2, Kling 2.5, Runway Gen-4).

**Status:** v0.1 draft — needs one 5s style test to lock

---

## 1. North Star

| | |
|---|---|
| Single Promise | **Grow.** |
| Emotional arc | Tired → Empowered → Connected → Aspirational |
| Tone | Hopeful, modern, slightly playful, never preachy |
| Genre cue | "Apple keynote × Studio Ghibli × subtle future-tech" |
| Brand themes (must read in video) | Improve · Innovate · Win · Heal · Protect |

---

## 2. Visual Identity

### 2.1 Color Language

| State | Palette | Use |
|---|---|---|
| **Before / disengaged** | Desaturated cool gray-blue, low contrast | Scene openings, "before" beats |
| **Activation** | Cyan glow + warm amber spill | HUD reveal, lens transitions, empowerment moments |
| **Engaged / present** | Saturated brights, soft daylight | Engaged states, classroom mid-Scene 1 |
| **Connection** | Warm pastels, golden hour | Scene 2 — coffee shop, relationships |
| **Dream / future** | Deep teal + bioluminescent cyan + soft white | Scene 3 — neural / sea |
| **Hero accent** | Single recurring cyan-amber duotone | The "4eye signature" color across all scenes |

### 2.2 Geometric Language (per brand guidelines)

- **Circles** → infinity, future, water, completion (Lens 1, Lens 4)
- **Triangles** → speed, focus, sharpness, the senses (Lens 2)
- **Squares** → stability, safety, success, structure (Lens 3)
- **1:2:3 growth pattern** → any time something grows, scale in 1× → 2× → 3× rhythm
- **Connecting dots / chain links** → relationships, communication, neural connections

### 2.3 Symbol Vocabulary (per brand guidelines)
Reusable across scenes:

- Eyes / lens [core]
- Coins / currency [core for reward beats]
- Crown / trophy [for leveling, leaderboard]
- Stairs [for progression beats]
- Shield / borders [for protect/privacy beats]
- Plus sign (+) [for growth, addition]
- Connecting dots [for relationships]
- Controller / quest icon [accent — gamification]
- Portal / stargate [Scene 3 transitions]

### 2.4 Typography (if text overlays used)
- Decision pending (Q3). Default: minimal, geometric sans-serif. Single weight per cut. Never more than 4 words on screen.

---

## 3. Character System

### 3.1 4eye Character
- Small, friendly, stylized — *mascot-coded, not robot-coded*
- Floats / hovers more than walks
- Hand-off gesture is the recurring action (gives gifts, gives gear)

**Style-clash note (Decision D11):** The 4eye SVG mascot used in the web app ([`Character4eye.tsx`](/Users/mm/Projects/4eye/packages/@expanse/brand-core/src/character/poses/Character4eye.tsx)) is a clean flat geometric vector — single glowing eye, strap/visor, antenna, optional status LEDs. Dropping that SVG into an anime-photoreal video frame will read as a sticker pasted on a painting. For this video, **render an anime-transformed version of 4eye** that preserves identity cues but matches the video aesthetic.

**4eye identity cues (must be preserved in any visual variant):**
1. **Single glowing cyan eye** (the visor/strap with one prominent eye, not two)
2. **Horizontal strap / visor** across the face
3. **Small antenna** on top of the head
4. **Friendly mascot proportions** — head-heavy, small body, short limbs
5. **Soft cyan glow accent** — never red, never green
6. **Floating / hovering pose** — does not walk in marketing video

A viewer who knows the web SVG should still recognize the video character as the same entity.

### 3.2 4wing
- Smaller companion character / camera proxy
- Flies / hovers near subjects
- Suggests observability, attention, care (not surveillance)
- Lands briefly on desks, shoulders, surfaces

### 3.3 Human Characters
- **Visual diversity**: age, ethnicity, body type — natural and unforced
- **Student archetypes** (Scene 1): the sprawler, the tent-kid, the already-high-level, the awakening-leader, background fillers
- **Adult archetypes** (Scene 2): the connector, the dreamer, the partner, the friend
- **All characters**: subtle anime-influenced design — expressive eyes, simplified features, grounded proportions
- **Never**: hyperreal photoreal humans (uncanny in AI-gen at this length), never cyberpunk-styled humans

### 3.4 Gear / HUD Treatment
- Worn, not installed — translucent overlay glasses, glowing tattoo-style markings on hands/forearms, light gauntlets, earpieces
- Activates with **light, not mechanical sound**
- Higher-level students show more gear pieces (visual leveling cue)
- Same gear language across all scenes for product continuity

---

## 4. Motion / Camera Language

| Element | Treatment |
|---|---|
| Default camera | Slow, smooth, intentional — never handheld-shaky |
| Establishing shots | Slow dolly-in, occasionally crane-down |
| Emotional beats | Brief slow-mo at the moment of change (HUD activation, eye lift) |
| Transitions | Lens shapes wipe across frame (see Section 6) |
| Character motion | Underplayed — small gestures carry weight |
| Background motion | Layered parallax — students in background blur but still react |
| Particles / VFX | Sparing — light spills, geometric pulses, coin/zap flashes for reward beats |
| Pace | Slower than typical social video. Hold beats slightly longer. Trust the viewer. |

---

## 5. Audio Direction (v1 = music only)

- **Genre:** Modern uplifting, hybrid orchestral + electronic. Think Ludwig Göransson "tech inspiration" rather than EDM
- **Arc:** Subdued start → swelling on HUD activation → driving through Scene 2 → ethereal Scene 3 → resolution at logo
- **Hits:** Musical beat-drops aligned to: HUD activation, each lens transition, the leaderboard climb, the closing logo
- **No vocals.** No spoken dialogue.
- **Sound design:** Sparing diegetic accents (subtle pop on HUD activation, soft zap on coin flash, low whoosh on lens transitions)
- **Export:** Master at -14 LUFS. Cuts re-mastered per platform.

---

## 6. Lens Transition Language

Each lens connects two scenes. Lenses are *literally* lens shapes that wipe / iris / morph across frame.

| Lens | Shape | Color | Symbols on lens | Connects | Feel |
|---|---|---|---|---|---|
| L1 | **Circle** (smooth) | Cyan + amber | Infinity (∞) | Cold open → Scene 1 | Opening, awakening |
| L2 | **Triangle** (sharp, fast) | Red-amber | Eye · Ear · Body | Scene 1 → Scene 2 | Acceleration, focus |
| L3 | **Square** (stable, growing) | Cyan + gold | Single merged symbol — love + robots + humans | Scene 2 → Scene 3 | Settling, structure |
| L4 | **Circle-leveled** (halo, evolved) | Soft white + cyan | Refined infinity | Scene 3 → Logo | Completion, transcendence |

**Lens motion rules:**
- Lens 1 opens, Lens 4 closes — bookends
- Lens shapes echo brand geometric progression (circle → triangle → square → evolved circle)
- Each lens is on-screen 0.6–1.2s max
- Symbols on the lens are *legible*, never decorative-only

---

## 7. Prompt Fragments (copy-paste blocks)

### 7.1 Universal style anchor (every prompt)

```
Style: cinematic 4K, subtle anime-influenced character design, modern minimal aesthetic, soft natural daylight, shallow depth of field, smooth slow motion at emotional beats, layered parallax, no text overlays, no watermarks.
```

### 7.2 Universal negative prompt

```
text, watermarks, logos, surgical imagery, medical procedure, IV bags, hospital, religious iconography, harsh sci-fi chrome, cyberpunk dystopian mood, dark grimy environment, photoreal uncanny faces, distorted hands, brand logos other than fictional, weapons, blood.
```

### 7.3 Scene-1 setting fragment

```
Modern classroom interior, large windows with soft daylight, modest futuristic touches (subtle glowing surfaces, light wood and white finishes), 6–8 students of varied age and ethnicity at desks, paper textbooks present but ignored, a tired teacher at the front.
```

### 7.4 Scene-2 setting fragment

```
Warm contemporary coffee shop, golden-hour light through tall windows, mix of humans and gentle stylized service robots, soft chatter atmosphere, plants and warm wood, intimate two-tops and casual gathering spaces.
```

### 7.5 Scene-3 setting fragment

```
Surreal aspirational dreamscape — vast bioluminescent ocean horizon, soft cyan-teal sky, characters wearing elegant gear that glows softly, weightless feel, subtle floating geometric particles, sense of expansion and possibility.
```

### 7.6 4eye character fragment

```
Small friendly stylized mascot character — abstracted humanoid silhouette with soft glowing cyan accents, floats gently, expressive without detailed facial features, never threatening, gift-bringing energy.
```

### 7.7 HUD activation fragment

```
Thin elegant translucent heads-up display materializes across the wearer's field of view, glowing soft cyan with warm amber accents, subtle geometric grid pattern, eyes remain visible through the HUD, light spills warmly across the face, brief slow-motion hold at the moment of activation.
```

---

### 7.8 Canonical HUD Icon Set (LOCKED)

The Teacher / Student HUD is a horizontal row of exactly **THREE** floating pill buttons.

**Order, left → right:**

| Position | Icon | MUI Symbol (Outlined) | Description |
|---|---|---|---|
| 1 (left) | Visibility | `Visibility` | Open-eye glyph |
| 2 (center) | Shield | `Shield` | Shield outline glyph |
| 3 (right) | Redeem | `Redeem` | Wrapped gift box with ribbon/bow on top |

**Rules (all apply to every shot that contains the HUD):**
- **ALWAYS exactly three buttons.** Never more, never fewer.
- **ALWAYS in the order above.** Left = Visibility, Center = Shield, Right = Redeem. Never reorder.
- **NEVER text labels** next to buttons. Glyphs only.
- **Color:** cyan-amber duotone glow consistent with the shot palette. Glyph stroke = bright cyan, fill = transparent.
- **Button shape:** pill / capsule with a translucent dark-teal fill and a soft amber outer halo.
- **Reference asset:** `sceneCode:HUD-CANONICAL` (starred) — use as `hud-lock` image reference in every HUD edit seed.

**VAKL badge icons** (used in S1-G redesign and Skill Tree shots, NOT in the main HUD bar):

| Letter | Modality | MUI Icon | Bar Fill |
|---|---|---|---|
| V | Vision (Visual) | `Visibility` | 75 % |
| A | Auditory | `Hearing` | 60 % |
| K | Kinesthetic | `PanTool` | 50 % |
| L | Logic | `Psychology` | 85 % |

VAKL fills are **hard-coded** — do not change across seeds or generations.

---

## 8. "Shoot Like" / "Don't Shoot Like" References

### Shoot like (described — replace with actual reference URLs/stills in /references/inspiration/)
- **PRIMARY REFERENCE:** [`/Users/mm/Projects/comic-strip/1-1.png`](/Users/mm/Projects/comic-strip/1-1.png) — already encodes ~80% of the target look: anime-influenced character with expressive eyes, translucent cyan HUD overlay, modern-grounded interior with futuristic city + water beyond, embedded environmental data (book titles, posters), cinematic lighting. **Crop off the LOOP/SHOT labels before using as image-ref.**
- Studio Ghibli pacing — held beats, environmental detail
- Apple "Shot on iPhone" emotional product reveals — function shown not told
- Marques Brownlee product reveal lighting — clean cyan-amber accents
- Pixar character expressivity — eyes carry the emotion
- Spider-Verse panel-style flourish for lens transitions (subtle, not heavy)

### Don't shoot like
- Generic SaaS explainer (talking head + UI screenshots)
- Cyberpunk 2077 / Blade Runner aesthetic (too dystopian)
- Stock corporate "diverse people pointing at laptops"
- Crypto / tech-bro flashy edits
- Med-tech / pharma ads (clinical, sterile)
- Religious / inspirational church-media style (production cue too close to avoid)

---

## 9. Aspect Ratio Strategy

| Ratio | Cuts | Headroom Notes |
|---|---|---|
| 16:9 | 75s hero, 30s, website | Master generation ratio |
| 9:16 | 15s, 6s hook, social | Reframe in edit; keep critical action in center 60% |
| 1:1 | Fallback for feed posts | Generate from 16:9 master center-crop |

**Production rule:** Always generate at 16:9 then reframe. Critical action / faces must sit within center 60% of frame for 9:16 safety.

---

## 10. Style Test Plan (do this BEFORE scaling)

1. Pick the one-frame hero moment (HUD reveal)
2. Generate 5s test in Veo 3, Sora 2, Kling 2.5 — same prompt
3. Compare: which tool best handles character consistency, HUD glow, eye preservation
4. Lock primary tool for character shots
5. Generate one transition test (Lens 1) — likely a different tool wins for VFX-heavy work
6. Lock secondary tool for transitions
7. Document choices back into this bible, Section 7
