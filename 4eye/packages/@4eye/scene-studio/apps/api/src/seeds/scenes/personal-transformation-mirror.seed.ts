import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * personal-transformation-mirror — standalone personal brand piece.
 *
 * NOT a Classroom-of-Tomorrow scene frame. This is a single-image, 3-panel anime
 * comic strip that represents Matthew's current character state: someone who was
 * weak, trained hard in isolation, became strong — and now sees in the mirror an
 * insanely more powerful future self he is transforming into. The mood is excited,
 * fully-prepared, ready for a drastically different next level.
 *
 * Brand alignment (Expanse / 4ear design system) is baked directly into the prompt
 * (no file: refs — the brand spec lives outside PLANS_ROOT):
 *   - darkness → light arc across the three panels
 *   - 1:2:3 growth, up-and-to-the-right progression
 *   - gamified HUD: XP bar, coins (+), streak, trophy, LEVEL UP, LV markers
 *   - symbols: stairs, portal/stargate, crown, geometric shapes, dopamine accents
 *   - HIGHEST energy level = pure light / white with a subtle blue tint
 *   - TIME is the character's signature power (clock / hourglass / time glyphs)
 *   - color story: deep indigo → luminous gold → white-with-blue-tint → royal purple
 *
 * Standalone: no anchor or character-lock references — generates a brand-new hero.
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run personal-transformation-mirror --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run personal-transformation-mirror --variations 1
 *
 * After generation, promote the chosen output:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> --to 04_gallery --star
 */
export default defineSeed({
  id: 'personal-transformation-mirror',
  description:
    'GENERATE · Personal brand · 3-panel anime comic strip — weak→trained→mirror reveal of vastly more powerful future self, time as a power, light/white-blue peak energy',
  kind: 'generate',
  sceneCode: undefined,
  title: 'Transformation — Mirror of the Next Level',
  tags: ['personal', 'brand', 'transformation', 'comic-strip', 'anime', 'hud', 'time-power'],
  references: [
    // HUD style anchor — informs ONLY the gamified HUD look (bar/coins/glyphs),
    // NOT the character. The hero is a brand-new humanoid, not 4eye.
    {
      kind: 'image',
      ref: 'sceneCode:HUD-CANONICAL',
      role: 'hud-style',
      description:
        'Canonical brand HUD bar. Use ONLY as a style guide for the gamified HUD overlay (XP bar, glyphs, glow treatment). Do NOT copy any character from it.',
      required: false,
    },
    // Brand coin/reward style anchor — informs the coin (+) token look only.
    {
      kind: 'image',
      ref: 'sceneCode:COIN-STACK-REFERENCE',
      role: 'coin-style',
      description:
        'Brand coin reference. Use ONLY to style the floating coin (+) reward tokens. Do NOT copy character or composition.',
      required: false,
    },
  ],
  preconditions: [],
  prompt: `
A SINGLE image: a 3-panel anime comic strip read left-to-right, cinematic key-art quality.
Clean detailed anime lineart blended with flat-vector shading, glowing video-game HUD overlay.
Three equal vertical panels separated by thin clean gutters. One continuous character arc.
Theme: a hero who was weak, trained in isolation, became strong — and now sees the vastly more
powerful future self he is transforming into. Mood across the strip: rising hope, discipline,
then excited, calm, fully-prepared readiness for a drastically different next level.

REFERENCE IMAGE USAGE: Any provided reference images are STYLE ONLY — use them solely to
match the gamified HUD treatment and the coin (+) reward token look. Do NOT copy any character,
pose, or composition from them. The hero is a brand-new original humanoid anime character.

GLOBAL STYLE:
  - Modern anime, premium poster finish, high contrast, clean composition.
  - Geometric accents woven throughout: circles, triangles, squares; expanding shapes.
  - Chain-linking energy lines; subtle dopamine / neuro-spark particle accents.
  - Up-and-to-the-right motion language; a 1 → 2 → 3 growth progression feel.
  - TIME is the character's signature power: clock faces, hourglasses, rotating clock-hands,
    and glowing circular time-glyphs orbit him and thread through the HUD in every panel,
    growing stronger panel to panel.
  - Diegetic gamified HUD overlay (holographic, in-world): XP bar, coin (+) tokens,
    streak counter, trophy, LV indicator. NO paragraphs of text — only short HUD glyphs/icons.

PANEL 1 — DARKNESS (the weak beginning):
  A thin, hunched young hero training alone in a dim, isolated stone chamber. Sweat, strain,
  quiet determination. Small dim aura. A single small hourglass rests nearby, barely glowing —
  the first hint of his time power. HUD: LV.1, nearly-empty XP bar, dimmed stats.
  Palette: deep indigo and desaturated cold blue. "From darkness" mood, low light.

PANEL 2 — THE GRIND (becoming strong):
  Same hero, now mid-training and visibly stronger: posture rising, defined frame, brighter aura.
  Energy particles spiral up-and-to-the-right. Faint ascending stairs motif behind him.
  Clock-hands and time-glyphs now orbit his fists, bending motion around him — his time power awakening.
  HUD: XP bar filling with warm gold, a streak counter, floating coin (+) tokens.
  Palette: transitional gradient from cold blue into luminous warm gold.

PANEL 3 — THE REVELATION (the next level):
  The hero stands confident before a tall mirror, smiling with genuine excitement, eyes glowing,
  posture open and ready — clearly fully prepared, not afraid. He is the smaller "current" self.
  The MIRROR REFLECTION shows an INSANELY more powerful awakened version of himself: towering,
  radiant, armored in light, immense layered aura, a crown / halo of energy, vastly more detailed.
  Behind the reflection a glowing portal / stargate hints at the drastically different next tier.
  TIME POWER at full mastery: a great clock-face and orbiting hourglasses frame the reflection,
  clock-hands frozen mid-spin, time-glyphs streaming between the hero and his future self —
  visually showing the transformation in progress.
  The reflection's energy is the HIGHEST energy level in the whole strip: pure light / brilliant
  WHITE with a subtle cool blue tint, blinding-bright at the core. This white-blue glow is clearly
  the apex above the gold of Panel 2.
  HUD: a bright "LEVEL UP" badge, "NEXT TIER" portal glyph, maxed gold-into-white XP bar,
  trophy icon, and a 1 → 2 → 3 progression meter with stage 3 lit.

COLOR STORY (strict, left to right):
  deep indigo / cold blue (P1)  →  luminous warm gold (P2)  →  pure white with a subtle blue tint
  as the peak energy (P3 reflection), accented with royal purple highlights for premium/royalty.
  Darkness clearly resolves into light from panel 1 to panel 3.

CONSTRAINTS:
  - Output ONE cohesive comic-strip image containing all three panels.
  - Same character identity, face, and outfit across all three panels (only power/strength grows).
  - HUD elements are glyph/icon based — avoid blocks of readable sentences.
  - Wide cinematic format suitable for a 3-panel strip.

Aspect ratio: 16:9 widescreen.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    size: '1536x1024',
    variations: 1,
  },
});
