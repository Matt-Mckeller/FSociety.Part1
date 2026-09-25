# Animate

Turn two stills into a short video clip.

## How it works

1. Pick a **start frame** and **end frame** (both must be existing image assets).
2. Run the animate action with a chosen video model (`veo-3.1-generate-preview`
   or `gen4_turbo`).
3. The provider produces an MP4. An `AssetEntity` is inserted with
   `kind: 'video'`, parent IDs pointing at both source frames, and the file lands
   in `GALLERY_ROOT/05_videos/`.

## Where it lives

- **HTTP**: `POST /api/actions/animate`
- **Code**: `apps/api/src/actions/` (animate handler in `ActionsModule`)
- **Models**: `VEO_MODEL`, `RUNWAY_VIDEO_MODEL` (see `.env.example`)

## Status

Currently triggered from the web UI. A `cli vid:run` command has been discussed
but is not yet implemented.

## More

- Architecture: [../architecture.md § ActionsModule](../architecture.md)
