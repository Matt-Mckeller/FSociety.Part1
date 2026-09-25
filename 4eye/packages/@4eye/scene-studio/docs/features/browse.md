# Browse

View, organise, and curate the asset library.

## What you can do

- **List** every asset (images + videos) with thumbnails.
- **Filter** by `sceneCode`, tag, kind (image/video), source folder, or starred state.
- **Star / unstar** an asset (see [sequences.md § Star concept](sequences.md#the-star-concept)).
- **Tag** assets with free-form labels (`scene-1`, `4eye-reference`, `gap-fill`).
- **Reorder** via drag-and-drop (writes to the `order` REAL column).
- **Promote** an asset out of `07_generated/` into a permanent folder using
  `cli asset:promote <id> <folder>`.
- **Demote** with `cli asset:demote` (unstar + move back to alternates).

## Where it lives

- **HTTP**: `GET /api/library`, `PATCH /api/assets/:id`, `DELETE /api/assets/:id`
- **CLI**: `asset:promote`, `asset:demote`, `asset:test`
- **Code**: `apps/api/src/library/` (`LibraryModule`)
- **UI**: web client gallery grid

## Common recipes

See [../workflows.md § Browse + curate](../workflows.md).
