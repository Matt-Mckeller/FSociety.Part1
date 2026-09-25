# Video Generation Test Log

Date: 2026-05-24  
Session goal: First end-to-end animation test — S1-A.1 → S1-A (4eye cold open turn)

---

## Assets Used

| Role | sceneCode | Asset ID | File |
|------|-----------|----------|------|
| Start | S1-A.1 | `e0b4cad5355f48af` | `01_scene_keyframes/S1-A.1_4eye_facing_classroom.png` |
| End | S1-A | `86ab991fa8e60f37` | `01_scene_keyframes/S1-A_4eye_hallway_facing_classroom.png` |

**Motion intent:** 4eye pivots 180° from facing the camera to facing the classroom doorway. Background (hallway walls, floor, ceiling, lighting) stays pixel-identical. No camera movement.

---

## Prompt Used (all runs)

```
4eye pivots smoothly from facing the camera toward the viewer to facing the classroom
doorway ahead. The hallway walls, floor, ceiling, and lighting remain completely static
throughout. Only 4eye rotates — a steady 180-degree turn. No camera movement.
```

---

## Run Results

### Run 1 — Veo dual-frame (start + end)
| | |
|-|-|
| Command | `vid:run --start e0b4cad5355f48af --end 86ab991fa8e60f37 --provider veo --duration 5` |
| Result | ❌ FAILED |
| Error | `400 Your use case is currently not supported` |
| Root cause | Veo 3.1 preview does **not** support the `lastFrame` (end-frame interpolation) feature. |

---

### Run 2 — Veo single-frame (start only)
| | |
|-|-|
| Command | `vid:run --start e0b4cad5355f48af --provider veo --duration 5` |
| Result | ✅ SUCCEEDED |
| Output file | `05_videos/s1a1_s1-a-1-4eye-facing-the-camera-frame-1-of-opener_20260524-170745_20b1017d.mp4` |
| Asset ID | `248fcb422e4638f3` |
| Notes | Veo hallucinated the turn from a single frame. No end-frame anchor — result is unpredictable. |

---

### Run 3 — "Runway" dual-frame (actually routed to Veo — buggy)
| | |
|-|-|
| Command | `vid:run --start e0b4cad5355f48af --end 86ab991fa8e60f37 --provider runway --duration 5` |
| Result | ❌ FAILED — same Veo 400 error |
| Root cause | **Bug:** `loadConfig()` is memoized. The `--provider` flag was setting `process.env.ANIMATE_PROVIDER` before app boot, but with `auto` and a Google API key present, `pickProvider()` still fell through to Veo. The CLI output showed `Provider: runway` but the job used Veo. |
| Fix applied | Removed env-var hack. Added `provider?` field to `Animate.RequestDto`; `pickProvider(override?)` now accepts a direct override from the DTO, bypassing config/env entirely. |

---

### Run 4 — Runway dual-frame (dry-run only, with fix applied)
| | |
|-|-|
| Command | `vid:run --seed s1-a-cold-open --provider runway --dry-run` |
| Result | ✅ Dry-run passed — both assets resolved correctly |
| Notes | Provider routing fix confirmed working. **Real run not yet sent.** |

---

## What Still Needs Testing

- [ ] **Runway dual-frame (real run)** — `vid:run --seed s1-a-cold-open --provider runway`
  - This is the first time the Runway start+end interpolation will actually fire
  - Unknown: whether gen4_turbo handles the 180° character pivot cleanly with these two frames

---

## Infrastructure Built This Session

| Item | Description |
|------|-------------|
| `cli vid:run` | New CLI command — runs animate jobs headlessly without the dev server |
| `AnimateSeedDefinition` | New type in `seed.kit.ts`. `defineAnimateSeed()` helper. `kind: 'animate'` seeds are auto-discovered by the registry. |
| `seeds/videos/s1-a-cold-open.seed.ts` | First animate seed. Captures both frames, prompt, and duration. |
| `Animate.RequestDto.provider` | Optional `provider` field on the shared DTO — overrides ANIMATE_PROVIDER config without env hacks. |
| Seed runner guard | `seed:run` now throws a descriptive error if you accidentally try to run an animate seed as an image gen. |

---

## Seed: `s1-a-cold-open`

```
pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-a-cold-open --provider runway --dry-run
pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-a-cold-open --provider runway
pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-a-cold-open --provider veo   # single-frame only
```

Seed file: `apps/api/src/seeds/videos/s1-a-cold-open.seed.ts`
