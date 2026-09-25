# Emotion.Inspect — HUD screen plan

**Status:** P0 landed (HUD `InspectorModal` overlay). P1/P2 open.

**Problem:** Inspect Emotion was a small MUI Dialog on Profile/Character. That is not the aspect asked for — a dedicated inspect surface — and Profile is already crowded (Core lenses + CharacterLensBody).

**Rule:** No new Profile lens. No more Character panels. Emotion.Inspect is a **HUD overlay screen**, same family as Map / Scene Studio.

---

## Verdict

| Do | Don't |
|---|---|
| Shell-mounted overlay via `InspectorModal` | Another Core / Brain lens |
| Reuse `InspectorModal` chrome (Inspect = action, Inspector = surface) | Grow a tile-local `sm` Dialog |
| Keep dossier body from `EmotionInspectBody` | Dump associations into Psychology / Brain |
| Open from Profile action bar + emotion **INSPECT** | Require navigating away from Profile |

---

## Architecture (P0)

```
HudShell
  FullScreenMapView
  SceneStudioOverlay
  EmotionInspectOverlay  ← InspectorModal + EmotionInspectBody
```

| Layer | Owns |
|---|---|
| `HudState` | `isEmotionInspectOpen`, `emotionInspectId` |
| Character store | `activeEmotionId` (lens) |
| `EmotionInspectBody` | Dossiers from `emotion-inspect.ts` |
| Triggers | `act-inspect-emotion`, summary INSPECT → `useOpenEmotionInspect()` |

---

## Phases

### P0 — Dedicated overlay ✅
- `EmotionInspectOverlay` in `HudShell`
- Open flag in `HudState`; closes map; Studio open closes Inspect
- Dossier UI in `InspectorModal`
- Equipped Inspect + summary INSPECT → shell open
- Tile Dialog mounts removed

### P1 — Screen system polish
- Center chrome: “Emotion · close” via `useRegisterCenterContent` (match Map)
- Multi-dossier tabs when emotion has >1 dossier
- Optional right rail: Brain / Psychology / Events jumps

### P2 — Profile de-crowd (optional)
- Spellbook same HUD pattern if still Dialog-only
- Psychology stories → deep-link into Emotion.Inspect

---

## Success check
1. From Profile, Inspect opens a **HUD Inspector**, not a nested Dialog.
2. Map and Emotion.Inspect never stack.
3. Profile density unchanged (no new lens/panel).
4. Anger still shows Healthcare + Education dossiers + doc link.
