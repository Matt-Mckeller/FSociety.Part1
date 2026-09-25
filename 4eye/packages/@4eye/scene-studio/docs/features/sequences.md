# Sequences

An **ordered, named list of asset IDs** that defines a playback / narrative
order. The canonical example: `scene-1-classroom` — the 12 frames that, in
order, tell the Scene 1 story.

## Anatomy

| Field         | Notes                                                            |
| ------------- | ---------------------------------------------------------------- |
| `id`          | UUID                                                             |
| `name`        | Human-readable (e.g. `Scene 1`)                                  |
| `slug`        | Unique kebab-case identifier (e.g. `scene-1-classroom`)          |
| `sceneCode`   | Default scene code for derived frame labels                      |
| `description` | Free-form                                                        |
| `frameIds`    | JSON array of asset IDs, in playback order                       |
| `autoStar`    | Boolean — see [§ Auto-star](#auto-star-on-insert) below          |

Frame display labels are computed as `${sceneCode}${position + 1}` —
`scene-1-classroom` with `sceneCode: 'S1-C'` produces `S1-C1`, `S1-C2`, etc.

## CLI

```bash
pnpm cli seq:list                                # all sequences
pnpm cli seq:show <slug>                         # frame-by-frame view
pnpm cli seq:insert <slug> <assetId> --at N      # insert (de-dupes if present)
pnpm cli seq:replace <slug> <oldId> <newId>      # swap one frame, preserve position
pnpm cli seq:rename <oldSlug> <newSlug>          # rename slug (+ optional --name)
pnpm cli seq:set-auto-star <slug> --on|--off     # toggle auto-star
pnpm cli scene:coverage <slug>                   # grouped-by-sceneCode + gap report
```

The HTTP equivalents live under `SequencesController`.

---

## The "star" concept

`Asset.catalog.starred` (boolean) marks the **canonical / keeper** version of a
given subject. Most filters and selectors prefer starred assets:

- The selector `tag:4eye-reference:starred` matches exactly one starred asset
  tagged `4eye-reference` — the locked character reference sheet.
- `sceneCode:S1-A` returns starred matches first; unstarred are alternates /
  iterations the user kept around but rejected as the primary.

In short: **starred = "this is the one"**, unstarred = "kept for reference."

A workflow analogy: think of `07_generated/` as your inbox, `01_scene_keyframes/`
as your filed canonical frames, and a star as the green "approved" sticker. A
seed can reference the green-sticker copy without knowing the file name.

### Auto-star on insert

By default, **adding an asset to a sequence does not star it.** This is
intentional — you might be drafting a sequence with experimental candidates.

If you turn on `autoStar` for a sequence, the runtime treats membership in that
sequence as an implicit star:

| Action on an auto-star sequence | Side-effect on the asset                           |
| ------------------------------- | -------------------------------------------------- |
| `seq:insert`                    | Asset gets starred                                 |
| `seq:replace` (incoming)        | New asset gets starred                             |
| `seq:replace` (outgoing)        | Old asset unstarred *unless* another auto-star sequence still references it |
| `seq:remove`                    | Same outgoing rule                                 |
| `seq:set-auto-star --on`        | All current members get starred (retro)            |
| `seq:set-auto-star --off`       | Existing stars are left as-is (manual cleanup)     |

The cross-sequence guard prevents flapping: if asset `X` is in
`scene-1-classroom` (auto-star ON) and `scene-1-highlights` (auto-star ON),
removing it from one does not unstar it until it is gone from both.

### Why this design

You wanted the question *"which asset is the keeper for this beat?"* to have one
unambiguous answer. Manually starring after every insert is friction; auto-star
makes the sequence itself the source of truth.

You also wanted **opt-in** per sequence — some sequences are scratch / planning
drafts where membership should not imply approval. Hence the flag.

---

## What sequences are not

- Not a playlist — there is no playback engine here; downstream tools (Veo,
  final cut) consume the ordered IDs.
- Not a folder — assets keep their physical folder location independently.
- Not a tag — tags are flat labels; sequences carry order.
