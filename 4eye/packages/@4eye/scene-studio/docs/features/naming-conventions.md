# Naming conventions (proposal)

The codebase grew organically and several naming schemes coexist. This document
proposes a single convention. Nothing here has been adopted yet — it is a
design proposal awaiting a "go".

## Today

| Thing                | Current example                              | Issue                                                       |
| -------------------- | -------------------------------------------- | ----------------------------------------------------------- |
| Sequence slug        | `scene-1-classroom`                          | Consistent.                                                 |
| Scene MD             | `scene-1-classroom.md` (in `scenes/`)        | Consistent.                                                 |
| `sceneCode` on asset | `S1-A`, `S1-A.1`, `S1-C-old1`, `S1-C-new3`, `S1-D2`, `REF`, `S1-A-alt` | Five different shapes (see [scene-codes.md](scene-codes.md)). |
| Seed file            | `s1-c1.4-4eye-facing-camera.seed.ts`, `s1-c-old1-v2.seed.ts` | Digits, dashes, dots, and `old/new/v2` all in play. |
| Output filename      | `s1-a-1-4eye-facing-the-camera_gen_<ts>.png` | Hyphen-separated from a slugified title — OK.               |

## Design principle: keep beats and gallery codes independent

The scene MD `Beat 1.x` numbering is **the script's** ordering. The gallery's
`sceneCode` is **the visual library's** addressing. They will not always line up
1:1 — some beats need multiple gallery frames, some library frames cover
multiple beats, and exploratory variants ("what if 4eye enters from the left?")
have no beat at all.

So: do not collapse them. Keep both, and link them explicitly when useful.

## Proposed gallery convention

**Single grammar:** `s{scene}.{n}[-{variant}][-v{n}]` — a flat scene-scoped
counter, *not* a beat reference.

```
s1.1            Scene 1, library frame 1
s1.2            Scene 1, library frame 2
s1.4-alt        Accepted alternate for s1.4
s1.4-alt-v2     Second iteration of that alternate
ref.4eye        Reference sheet (no scene)
ref.poses       Reference pose grid
```

Rules:
- `{n}` is a gallery-local counter, assigned in capture order. It is **not** a
  beat number.
- A *variant* is a kept alternative (think: A/B test).
- A *v{n}* is a literal iteration on the same variant (re-runs of a seed).
- Anything ad-hoc (`old1`, `new3`, `test`, `orig`) is forbidden — promote to a
  variant name with meaning or delete.

### Linking gallery → beat

When a frame *does* map to a beat, record it in the seed:

```ts
defineSeed({
  id: 's1.4-alt',
  sceneCode: 's1.4-alt',
  beat: 's1.b4',          // ← optional pointer to scene MD
  ...
});
```

The beat field is informational only — used by `scene:coverage` to print a
side-by-side beat-vs-gallery report, never used for ordering or selection.

### Applied to today's library

(Counter values are illustrative — final ordering would come from a one-shot
renumber pass.)

| Today              | Proposed     | Beat link (informational) |
| ------------------ | ------------ | ------------------------- |
| `S1-A.1`           | `s1.1`       | `s1.b2`                   |
| `S1-A`             | `s1.2`       | `s1.b2`                   |
| `S1-A.5`           | `s1.3`       | `s1.b2`                   |
| `S1-B`             | `s1.4`       | `s1.b3`                   |
| `S1-C-old1`        | `s1.5-old`   | `s1.b4`                   |
| `S1-C-new1..4`     | `s1.5-new`, `s1.5-new-v2`, etc. | `s1.b4`  |
| `S1-D`             | `s1.6`       | `s1.b5`                   |
| `S1-F`             | `s1.7`       | `s1.b6`                   |
| `S1-G`, `S1-H`, `S1-I` | `s1.8`, `s1.9`, `s1.10` | `s1.b7..9`   |
| `REF`              | `ref.4eye`   | —                         |

### Seed files

`apps/api/src/seeds/{kind}/{sceneCode}-{slug}.seed.ts`

```
seeds/scenes/s1.2.1-4eye-facing-camera.seed.ts
seeds/scenes/s1.2.3-4eye-doorway.seed.ts
seeds/scenes/s1.2.5-4eye-entering-classroom.seed.ts
seeds/edits/s1.4-old-v2-remove-gift.seed.ts
seeds/references/ref.4eye-sheet.seed.ts
seeds/references/ref.4eye-poses.seed.ts
```

### Output filenames (implemented)

Generated image and video filenames now follow:

```
{sceneCode}_{slug}_{YYYYMMDD-HHmmss}[_vN]_{contentHash8}.png
{sceneCode}_{slug}_{YYYYMMDD-HHmmss}_{contentHash8}.mp4
```

Examples:
```
s1c1_4eye-entering-classroom_20260524-013851_v1_ab12cd34.png
s1b_4eye-hud-handoff_20260524-014109_c3de5f12.mp4
s1b_4eye-hud-handoff_20260524-014109_c3de5f12.poster.jpg
```

- `{sceneCode}` — asset's sceneCode with non-alphanumeric chars stripped (e.g. `S1-C1` → `s1c1`); omitted if no code set
- `{slug}` — slugified title, max 50 chars
- `{YYYYMMDD-HHmmss}` — local time at run start; all variants from one run share the same timestamp
- `_vN` — only present when `--variations N > 1`
- `{contentHash8}` — first 8 chars of SHA1 of the file content; provides uniqueness

`{kind}` matches the seed's `kind` (`generate` for `scenes/`, `edit`, …) —
already consistent.

### Sequence slugs

Stay as-is (`scene-1-classroom`). Optionally allow a short alias matching the
scene id (`s1`) for CLI brevity.

## Why bother

- **Coverage report becomes trivial:** parsing `s{n}.{beat}` is one regex; today
  the coverage CLI can't map `Beat 1.5` ↔ `S1-D` without a separate dictionary.
- **Sorting is correct out of the box** (`s1.10` sorts after `s1.2` if we use
  zero-padding: `s1.02`, `s1.10`).
- **No more "what does `old1` mean?"** — every name encodes scene, beat, variant,
  iteration.

## Migration cost

- 26 distinct scene codes → mostly UPDATE SQL + matching renames of seed files.
- Existing sequence (`scene-1-classroom`) re-points by asset ID, so frame order
  is preserved across renames.
- One `pnpm cli scene:retag <old> <new>` command would automate the SQL +
  generation_log rewrite.

## Open questions

- **Zero-padding?** `s1.02` vs `s1.2`. Zero-padding sorts correctly but reads
  worse. Probably worth it for 10+ beats per scene.
- **Variant taxonomy?** Free-text (`-alt`, `-new`, `-cold`) vs. a closed set
  (`-a`, `-b`, `-c`). Closed set is cleaner but loses semantics.
- **REF as its own namespace?** Probably yes (`ref.*`) — references aren't
  scenes and shouldn't sort with them.

If you say "adopt this," I'll write the retag command and execute it under a
git branch.
