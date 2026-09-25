# Features

User-facing capabilities of the Classroom Gallery app.

A **feature** is a cross-cutting workflow ("browse the gallery", "generate a
frame", "build a sequence"). It is **not** a NestJS module. Features compose
several modules; e.g. *Sequences* uses `SequencesModule` for storage,
`LibraryModule` for star bookkeeping, and `WsModule` for live updates.

If you're looking for the code-level building blocks (which module owns which
entity, which service injects which repo), see
[../architecture.md](../architecture.md).

## Index

| Feature                               | One-line description                                                |
| ------------------------------------- | ------------------------------------------------------------------- |
| [Browse](browse.md)                   | View, star, tag, search, and reorder the gallery                    |
| [Generate](generate.md)               | Run `*.seed.ts` files to produce new images via Gemini / OpenAI     |
| [Edit](edit.md)                       | Surgical single-image AI edits (edit-via-generate seed pattern)     |
| [Animate](animate.md)                 | Turn two stills into a video clip via Veo / Runway                  |
| [Sequences](sequences.md)             | Arrange frames into ordered named lists, optionally auto-starring   |
| [Scene codes](scene-codes.md)         | The free-text labels (`S1-A`, `S1-C-old1`) that group related assets |
| [Naming conventions](naming-conventions.md) | Proposed cleanup of slug / sceneCode / seed-file naming       |

## How features map to modules

```
Feature           Primary modules                                Secondary
─────────────     ───────────────────────────────────────────    ─────────
Browse            LibraryModule                                  FilesModule, WsModule
Generate          SeedsModule, GenerateModule, GenerationLogModule  LibraryModule
Edit              SeedsModule (kind: 'edit'), GenerateModule     LibraryModule
Animate           ActionsModule (animate handler)                LibraryModule
Sequences         SequencesModule                                LibraryModule (auto-star),
                                                                 WsModule
Star / auto-star  LibraryModule  (the field)
                  SequencesModule (the autoStar flag + hooks)
                  SeedsModule    (the `:starred` selector suffix)
```

There is no separate `StarModule` or `FeaturesModule`, and there shouldn't be
— each capability lives in the module that owns its data.
