# Scene codes

A **scene code** is a short free-text label stamped onto an asset that says
"this asset depicts moment X of scene Y." Examples currently in the library:
`S1-A`, `S1-A.1`, `S1-B`, `S1-C-old1`, `S1-C-new1`, `S1-D`, `REF`.

## Where they live

- **Field:** `AssetEntity.display.sceneCode` (nullable string)
- **Set by:** the `sceneCode` field on each [seed](generate.md). Whatever the
  seed declares is stamped on every output asset.
- **Not validated:** there is no enum, registry, or referential check.
  It is convention only.

## Where to review them

```bash
# Per-sequence: groups frames by sceneCode, flags missing ones
pnpm cli scene:coverage scene-1-classroom

# Raw catalogue: every distinct code with totals + starred counts
sqlite3 "$GALLERY_ROOT/library.db" \
  "SELECT sceneCode, COUNT(*) n, SUM(starred) starred
   FROM assets WHERE sceneCode IS NOT NULL
   GROUP BY sceneCode ORDER BY sceneCode;"
```

## Current state (as of this writing)

26 distinct codes are in use. They follow several ad-hoc patterns:

| Pattern               | Example          | Meaning                              |
| --------------------- | ---------------- | ------------------------------------ |
| `S{n}-{LETTER}`       | `S1-A`, `S1-B`   | Scene + beat                         |
| `S{n}-{LETTER}.{n}`   | `S1-A.1`, `S1-A.5` | Sub-beat / intra-shot frame        |
| `S{n}-{LETTER}-{name}{n}` | `S1-C-old1`, `S1-C-new3` | Workshop branches            |
| `S{n}-{LETTER}-{tag}` | `S1-A-alt`, `S1-C-test` | Variants of a beat            |
| Bare                  | `REF`            | Reference sheets (not a scene beat)  |

This is a mess. See [naming-conventions.md](naming-conventions.md) for the
proposed cleanup.

## How they're consumed

- **Selectors in seeds:** `ref: 'sceneCode:S1-A'` resolves to the (starred) asset
  with that code at run time.
- **Coverage CLI:** groups & gap-reports.
- **Frame labels:** sequences combine their own `sceneCode` with position to
  derive display labels (`S1-C1`, `S1-C2`, …).
- **Filename hints:** seeds bake the code into output filenames for grepability.

Nothing in the codebase parses, splits, or interprets the code beyond exact-string
matching, so adopting a stricter convention is purely a human / discoverability
win.
