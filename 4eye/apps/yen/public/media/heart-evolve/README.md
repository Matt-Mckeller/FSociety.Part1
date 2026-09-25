# Heart.Evolve assets

Interactive evolution art for the personal profile album (`#heart-evolve-media`). Not shown on yen `/vision`.

## Layout

```
variants/
  v3-grow-sexy/       # Marketing default — human portraits (Grow · Sexy Vision)
  v1/                 # Coral — stage SVGs + Matt portrait wired in content
  v2-ember/           # Ember color pass
  <your-id>/          # Drop frames here, then add a variant in
                      # packages/@yen/content/src/heart-evolve.ts

exports/
  instagram/          # IG carousel pack + CAPTIONS.md
```

## v3-grow-sexy — progression sort order

Filename prefix = capture L→R progression so the directory sorts correctly:

| # | File | Stage |
|---|---|---|
| 01 | `01-now-hero.png` · `01-now-video.mp4` | Now (single hero; not contact sheet) |
| 02 | `02-becoming.png` | Becoming |
| 03 | `03-becoming.png` | Becoming |
| 04 | `04-becoming.png` | Becoming |
| 05 | `05-destination.png` | Destination (red-crown hero) |
| 06 | `06-destination.png` | Destination |
| 07 | `07-destination.png` | Destination |
| 08 | `08-destination.png` | Destination |

Style reference (not a stage frame): `Media/Demo_Vid/MM_Profile_Grow_Sexy_Vision/capture_2026-08-10_073542.png`

## Naming (recommended)

- `01-now-hero.png` / `02-becoming.png` / `05-destination.png` — zero-padded progression prefix
- Or keep original names and map stages in `heart-evolve.ts`

## After drop

1. Put files under `variants/<id>/` with progression prefixes
2. Add an `EvolveVariant` row with `frames: [...]`
3. Reload profile Core → Media (after unlock) — selector picks up the new chip
