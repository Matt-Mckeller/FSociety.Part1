# Edit

Modify one existing image with a targeted natural-language instruction.

## How it works

Edits use the same seed system as [Generate](generate.md), but with:

- `kind: 'edit'`
- A single image reference with `role: 'source'`
- A short prompt that describes the *delta* (what to add, remove, recolor)

This is **edit-via-generate**: the model receives the source image plus the
instruction and produces a new image. The output gets its own `assetId` and is
linked back to the source via `origin.parentIds`.

## Example

See [`apps/api/src/seeds/edits/s1-c-old1-v2.seed.ts`](../../apps/api/src/seeds/edits/s1-c-old1-v2.seed.ts):
> Take the v1 teacher-HUD frame and remove the gift box from 4eye's hand,
> leaving everything else pixel-identical.

## Running

```bash
pnpm cli seed:run <edit-seed-id>
```

Edit outputs land in `GALLERY_ROOT/06_edits/`.

## More

- Cookbook shape 3 — surgical edit: [../seed-cookbook.md](../seed-cookbook.md)
