# Generate

Run a **seed file** (`*.seed.ts`) to produce a new image asset.

## What a seed is

A TypeScript module that default-exports `defineSeed({...})`. It declares:

- **`id`** — unique kebab-case identifier (also the CLI argument)
- **`sceneCode`** — the [scene code](scene-codes.md) to stamp on the output
- **`references`** — image + text inputs the model should attend to (resolved via
  the [ref-resolver](../architecture.md#seed-system))
- **`preconditions`** — sanity checks that must pass before the model is called
- **`prompt`** — the instruction text sent to the model
- **`params`** — model, size, variations, etc.

## Where it lives

| Folder        | What it generates                                  |
| ------------- | -------------------------------------------------- |
| `scenes/`     | New keyframes (uses multiple anchors)              |
| `edits/`      | Surgical single-image edits (see [edit.md](edit.md)) |
| `references/` | Reference sheets (character lock, pose grids)      |
| `smoke/`      | Disposable smoke-test seeds                        |

## Running a seed

```bash
pnpm cli seed:list                           # show every registered seed
pnpm cli seed:show <id>                      # print the resolved seed as JSON
pnpm cli seed:run  <id> --dry-run            # resolve refs, do not call model
pnpm cli seed:run  <id> --variations 2       # run for real, 2 outputs
pnpm cli seed:run  <id> --model <override>   # use a different image model
```

Every run is recorded in the `generation_log` table; replay any run with
`cli gen:replay <logId>`.

## Output handling

- Raw outputs land in `GALLERY_ROOT/07_generated/` with a deterministic filename
  containing the seed id, run timestamp, and variation index.
- An `AssetEntity` is inserted with `sceneCode` and `tags` from the seed.
- **The asset is NOT starred automatically** — promotion is a separate decision
  unless the destination sequence has [auto-star enabled](sequences.md#auto-star-on-insert).

## More

- Annotated examples per seed shape: [../seed-cookbook.md](../seed-cookbook.md)
- Architecture: [../architecture.md § Seed system](../architecture.md#seed-system)
