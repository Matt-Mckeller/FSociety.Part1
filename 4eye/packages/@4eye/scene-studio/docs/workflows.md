# Workflows

Step-by-step recipes for the most common tasks.

---

## 1. Add a new keyframe

**Goal:** generate a new scene frame, review it, and promote it into the canonical sequence.

### Step 1 — Write a seed

Create `apps/api/src/seeds/scenes/<sceneCode>-<description>.seed.ts`:

```ts
import { defineSeed, ImageModel } from '../seed.kit.js';

export default defineSeed({
  id: '<sceneCode>-<description>',        // kebab-case, unique
  description: 'GENERATE · ...',
  kind: 'generate',
  sceneCode: '<SCENE-CODE>',
  title: '<SCENE-CODE> — human title',
  tags: ['scene-1', '<beat-tag>'],
  references: [
    { kind: 'image', ref: 'tag:4eye-reference:starred', role: 'character-lock', required: true },
    { kind: 'image', ref: 'assetId:<before-anchor-id>', role: 'before-anchor', required: true },
    { kind: 'image', ref: 'assetId:<after-anchor-id>',  role: 'after-anchor',  required: true },
    { kind: 'text',  ref: 'file:scenes/scene-1-classroom.md', role: 'beat-spec', section: 'Beat X.X — ...', required: true },
  ],
  preconditions: [
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `...`,
  params: { model: ImageModel.GeminiProImagePreview, variations: 1 },
});
```

### Step 2 — Dry run (resolve refs only)

```bash
pnpm cli seed:run <id> --dry-run
```

### Step 3 — Generate

```bash
pnpm cli seed:run <id> --variations 1
# Pro model is slow (120–300 s/image) — always start with variations=1
```

Note the `assetIds` in the output, then open the web UI to review results.

### Step 4 — Promote the winner

```bash
pnpm cli asset:promote <id> \
  --to 01_scene_keyframes \
  --star \
  --scene-code <SCENE-CODE>
```

Losers go to alternates:

```bash
pnpm cli asset:demote <id> --to 03_alternates_and_iterations --unstar
```

### Step 5 — Add to sequence

```bash
pnpm cli seq:insert scene-1-4eye-entry <assetId> --at <position>
# or append (omit --at)
pnpm cli seq:insert scene-1-4eye-entry <assetId>
```

Verify:

```bash
pnpm cli seq:show scene-1-4eye-entry
```

### Step 6 — Health check

```bash
pnpm cli doctor
```

### Step 7 — Commit

```bash
cd <gallery-app>
git add -A
git commit -m "feat(scene-1): add <SCENE-CODE> keyframe"
```

---

## 2. Surgical edit of an existing keyframe

**Goal:** change one thing in a keyframe (remove an object, fix a character detail, swap an icon) without touching anything else.

### Step 1 — Write an edit seed

```ts
import { defineSeed, ImageModel } from '../seed.kit.js';

export default defineSeed({
  id: '<source-sceneCode>-v2',
  description: 'EDIT · <source-sceneCode> v2 — <what changes>',
  kind: 'generate',
  sceneCode: '<source-sceneCode>',
  references: [
    {
      kind: 'image',
      ref: 'assetId:<source-asset-id>',
      role: 'edit-source',
      description: '<source> — source frame. All composition, camera, lighting must remain pixel-identical. Only the edits below are permitted.',
      required: true,
    },
    // Add character-lock ref if fixing 4eye:
    { kind: 'image', ref: 'tag:4eye-reference:starred', role: 'character-lock', required: true },
  ],
  preconditions: [
    { ref: 'assetId:<source-asset-id>', exists: true },
  ],
  prompt: `EDIT INSTRUCTION — local edits only. Source: the provided image.

━━ EDIT 1 — <what to change> ━━
<specific instructions>

Everything else stays identical to the source.`,
  params: { model: ImageModel.GeminiProImagePreview, variations: 2 },
});
```

### Step 2 — Run and review

```bash
pnpm cli seed:run <id> --variations 2
# Review in web UI
```

### Step 3 — Promote winner, demote loser, replace in sequence

```bash
pnpm cli asset:promote <winnerId> --to 01_scene_keyframes --star --scene-code <code>
pnpm cli asset:demote  <loserId>  --to 03_alternates_and_iterations --unstar
pnpm cli seq:replace   <slug> <oldKeyframeId> <winnerId>
pnpm cli doctor
```

---

## 3. Replay a previous generation

```bash
# Find the log row
pnpm cli gen:log --seed <seedId> --limit 5

# Replay with same refs + prompt
pnpm cli gen:replay <logId> --variations 1
```

---

## 4. Check and fix sequence order

```bash
# View current sequence
pnpm cli seq:show scene-1-4eye-entry

# Insert at a specific position
pnpm cli seq:insert scene-1-4eye-entry <assetId> --at 0   # prepend
pnpm cli seq:insert scene-1-4eye-entry <assetId> --at 3   # position 3

# Replace one frame
pnpm cli seq:replace scene-1-4eye-entry <oldId> <newId>
```

> `seq:insert` is idempotent on position: if the asset is already in the sequence it is moved, not duplicated.

---

## 5. Triage 07_generated after a run

After any seed run, outputs land in `07_generated/`. Triage:

```bash
# See what's in 07_generated (compare assetIds in gen:log output)
pnpm cli gen:log --seed <seedId> --limit 1

# Promote winner
pnpm cli asset:promote <id> --to 01_scene_keyframes --star --scene-code <code>

# Demote rejected outputs
pnpm cli asset:demote <id> --to 03_alternates_and_iterations --unstar

# Verify nothing starred is still in 07_generated
pnpm cli doctor
```

---

## 6. Add a new reference sheet

Reference sheets (character refs, style sheets) live in `00_reference/` and are tagged `4eye-reference` (or similar). Only one should be starred per tag.

```bash
# After generating and promoting:
pnpm cli asset:promote <id> --to 00_reference --star
# Tag via web UI or direct DB: add tag '4eye-reference'
# Unstar the old one if replacing:
pnpm cli asset:demote <oldRefId> --to 00_reference --unstar
```

Then verify the tag resolves correctly:

```bash
pnpm cli seed:run <any-seed-using-that-tag> --dry-run
```
