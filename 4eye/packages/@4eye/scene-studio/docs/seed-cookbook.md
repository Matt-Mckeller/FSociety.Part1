# Seed Cookbook

Annotated examples of each seed shape used in this project.

---

## Shape 1: New keyframe (two-anchor gap-fill)

Generate a frame that bridges two existing locked keyframes.

```ts
import { defineSeed, ImageModel } from '../seed.kit.js';

export default defineSeed({
  id: 's1-c1.5-4eye-doorway',
  description: 'GENERATE · Scene 1 gap-fill · 4eye at the open classroom doorway',
  kind: 'generate',
  sceneCode: 'S1-A.5',
  title: 'S1-A.5 — 4eye at the doorway',
  tags: ['scene-1', 'beat-1.2', 'gap-fill', '4eye', 'between:S1-A:S1-B'],
  references: [
    // 1. Character-lock — always the starred 4eye reference sheet
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description: 'Starred 4eye reference sheet — locked identity',
      required: true,
    },
    // 2. BEFORE anchor — source of: room layout, palette, camera
    {
      kind: 'image',
      ref: 'assetId:e86cc2d195824fc0',           // <── hard-pin to the exact asset
      role: 'before-anchor',
      description: 'S1-A empty cool classroom — room layout + cold palette baseline',
      required: true,
    },
    // 3. AFTER anchor — direction of travel for mood/warmth
    {
      kind: 'image',
      ref: 'assetId:161020d1c66b3272',
      role: 'after-anchor',
      description: 'S1-C-old1 warm spill mood — direction of travel only, not yet reached',
      required: true,
    },
    // 4. Markdown beat spec (text ref)
    {
      kind: 'text',
      ref: 'file:scenes/scene-1-classroom.md',  // <── path relative to PLANS_ROOT
      role: 'beat-spec',
      section: 'Beat 1.2 — 4eye Arrives (0:03–0:05)',
      description: 'Action, camera, color, sound rules for Beat 1.2',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'tag:4eye-reference:starred', exists: true },
    { ref: 'assetId:e86cc2d195824fc0', exists: true },
  ],
  prompt: `Generate a single cinematic classroom image for Beat 1.2 ...`,
  params: {
    model: ImageModel.GeminiProImagePreview,    // Pro quality for scene work
    variations: 1,                              // Pro is slow — keep at 1
  },
});
```

**Key points:**
- Use `assetId:` hard-pins for the two anchors so they never drift even if another asset is later promoted to the same sceneCode.
- `tag:4eye-reference:starred` must resolve to exactly one starred asset.
- `section:` slices a markdown file to one heading's content — keeps the prompt focused.

---

## Shape 2: Surgical edit (edit-via-generate)

Modify one or more specific things in an existing image without changing anything else. This is the **only** edit pattern — there is no separate `kind: 'edit'`; use `kind: 'generate'` with a single source image and a constrained prompt.

```ts
import { defineSeed, ImageModel } from '../seed.kit.js';

export default defineSeed({
  id: 's1-c-old1-v2',
  description: 'EDIT · S1-C-old1 v2 — remove gift, fix 4eye (no arms), HUD btn3 → present icon',
  kind: 'generate',
  sceneCode: 'S1-C-old1',
  title: 'S1-C-old1 v2 — teacher HUD pre-tap (4eye locked, btn3 = present)',
  tags: ['scene-1', 'beat-1.3', 'edit', '4eye', 'gift-removal', 'hud'],
  references: [
    // 1. Edit source — the image to modify (hard-pinned)
    {
      kind: 'image',
      ref: 'assetId:161020d1c66b3272',
      role: 'edit-source',
      description: 'S1-C-old1 original — source frame. All composition must remain identical except the three edits below.',
      required: true,
    },
    // 2. Character-lock — only used to fix 4eye's design
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description: 'Use ONLY to correct 4eye character design. Spherical, no arms, no hands.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'assetId:161020d1c66b3272', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `EDIT INSTRUCTION — three local edits only. Source: the provided S1-C-old1 image.

━━ EDIT 1 — Remove gift box ━━
The gift box 4eye is holding must be removed. 4eye is simply hovering, empty.

━━ EDIT 2 — Fix 4eye character design ━━
Replace 4eye with the locked character reference: smooth sphere, no arms, no hands,
one large glowing cyan eye, thin horizontal visor/strap, small dorsal antenna.
Same position, same hover height, facing the same direction as the source.

━━ EDIT 3 — HUD button 3 → Present icon ━━
Change the third HUD button icon from lightning-bolt to a gift-box with ribbon.
Only the icon changes; button shape, size, glow, position stay identical.

Everything else stays pixel-identical to the source.`,
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 2,    // 2 variations is the safe max for Pro; pick the better one
  },
});
```

**Key points:**
- The prompt starts with `EDIT INSTRUCTION` and explicitly says "all other pixels stay identical". This is what makes the model do a surgical edit rather than a full regeneration.
- List each edit as a numbered, headed block for reliable parsing.
- `variations: 2` with Pro model is acceptable but risky on slow networks — fall back to 1 if you see timeouts.

---

## Shape 3: Reference sheet generation

Generate a character reference sheet and register it so seeds can resolve it via `tag:`.

```ts
import { defineSeed, ImageModel } from '../seed.kit.js';

export default defineSeed({
  id: '4eye-ref-sheet',
  description: 'GENERATE · 4eye character reference sheet — multi-angle orthographic',
  kind: 'generate',
  sceneCode: undefined,        // reference sheets don't belong to a specific scene
  title: '4eye — character reference sheet',
  tags: ['4eye-reference'],   // <── this tag is what seeds reference via tag:4eye-reference:starred
  references: [
    {
      kind: 'text',
      ref: 'file:00-style-bible.md',
      role: '4eye-spec',
      section: '7.6 4eye character fragment',
      required: true,
    },
  ],
  prompt: `Generate a four-view orthographic character reference sheet for 4eye ...`,
  params: { model: ImageModel.GeminiProImagePreview, variations: 1 },
});
```

**After running:** promote the best output and tag it `4eye-reference`, then star it:

```bash
pnpm cli asset:promote <id> --to 00_reference --star
# Tag via web UI
```

---

## Naming conventions

| Pattern                           | Example                          |
| --------------------------------- | -------------------------------- |
| Scene frame seed id               | `s1-c1.5-4eye-doorway`           |
| Edit seed id                      | `s1-c-old1-v2`                   |
| Reference sheet seed id           | `4eye-ref-sheet`                 |
| sceneCode on keyframes            | `S1-A`, `S1-C-old1`, `S1-A.5`   |
| Sequence slugs                    | `scene-1-4eye-entry`             |

Seed file path must match the id: `seeds/scenes/s1-c1.5-4eye-doorway.seed.ts`.

---

## Model quick reference

| Constant                              | Model id                               | Notes                   |
| ------------------------------------- | -------------------------------------- | ----------------------- |
| `ImageModel.GeminiProImagePreview`    | `gemini-3.1-pro-image-preview`         | Best quality, slow      |
| `ImageModel.GeminiFlashImagePreview`  | `gemini-3.1-flash-image-preview`       | Faster, good for drafts |

Default (if `params.model` omitted): reads `GEMINI_IMAGE_MODEL` env var.

Pro model constraint: **always use `variations: 1`** unless you are prepared to wait 5+ minutes and have confirmed the network can hold the connection. `variations: 2` is the absolute maximum tested.
