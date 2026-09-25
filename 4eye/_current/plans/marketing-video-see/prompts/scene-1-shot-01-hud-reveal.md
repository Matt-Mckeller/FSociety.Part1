# Shot 04 — HUD Reveal (One-Frame Hero Moment)

**Scene:** 1 — Classroom
**Beat:** 1.4
**Timeline position:** 0:08–0:10 in 75s master
**Generation target duration:** 5s (will be trimmed to ~2s in edit — generate longer for selection room)
**Aspect ratios needed:** 16:9 master, 9:16 social, 1:1 fallback
**Status:** 📝 prompt drafted — not yet generated

---

## Purpose

Hero frame of the entire video. This single moment must carry:
- **Gift / empowerment** — teacher receives the device
- **Transformation** — her expression shifts from tired to alert
- **Classroom context** — readable as a school/learning environment
- **Product visibility** — HUD is clearly the product without being labeled
- **Emotional pull** — a viewer should feel the swell

If a viewer sees only ONE frame from this video, it is the frame produced by this shot.

## Concepts Embedded (from matrix)
- **C01** Engagement transformation (her expression shift, students lifting heads in BG)
- **C03** HUD / Product visibility (the device activating)
- **C05** Empowerment hand-off (mid-cascade — already passed from 4eye, about to cascade to students)
- **C07** Aspiration / desire (she becomes a more capable version of herself in real-time)
- **C24** Healing / positivity tone (warm color spill)

---

## Primary Prompt — Veo 3 / Sora 2

```
Medium close-up of a teacher in her early 40s standing at the front of a modern classroom. She has just received a small, glowing translucent device from a friendly stylized character off-frame. As she lifts it toward her face, the device activates — a thin, elegant heads-up display materializes across her field of view, glowing soft cyan with warm amber accents, subtle geometric grid pattern. Eyes remain fully visible through the HUD. Light spills warmly across her eyes and cheeks. Her expression shifts from tired to alert in a held micro-moment of awakening. Behind her, slightly out of focus through shallow depth of field, 6 students of varied age and ethnicity at desks begin to lift their heads in unison.

Style: cinematic 4K, subtle anime-influenced character design, modern minimal aesthetic, soft natural daylight from large windows, shallow depth of field, smooth slow motion at the moment of activation, layered parallax between teacher and students, no text overlays, no watermarks.

Color palette: desaturated cool blue-gray atmosphere warming into a cyan-and-amber duotone spill at the moment of activation.

Camera: slow push-in. Brief slow-motion hold (~0.5s real time, ~2s film time) at the activation instant, then resume normal speed as students lift their heads.

Mood: hopeful, modern, slightly magical, emotionally swelling.
```

### Negative prompt
```
text, watermarks, logos, captions, subtitles, surgical imagery, medical procedure, IV bags, hospital, religious iconography, harsh sci-fi chrome, cyberpunk dystopian mood, dark grimy environment, photoreal uncanny faces, distorted hands, extra fingers, weapons, blood, exposed brand logos, motion blur on the eyes, HUD obscuring the eyes, students looking at phones.
```

### Seed strategy
- Generate 6 takes at different seeds
- Lock seed of best take for use in adjacent shots 03 and 05 (same teacher must be consistent across the hand-off → reveal → cascade sequence)

---

## Alternate Tool Prompts

### Sora 2 (if Veo 3 character consistency is weak)
Same prompt body. Sora 2 tends to need stronger camera direction — emphasize:
```
…Shot on a 50mm lens equivalent, gentle dolly-in, brief slow-motion at activation, return to normal speed for the student reveal in background.
```

### Kling 2.5 (likely best for the activation VFX itself)
Same prompt body. Kling tends to handle glow / particle effects more cleanly. Use for the HUD-materialization moment if Veo's HUD look is too generic.

### Runway Gen-4 (backup)
Same prompt body. Reduce description density by ~30% — Runway responds better to fewer concurrent details.

---

## Frame Composition Notes

- Teacher offset slightly **left of center** (rule of thirds, eyes on upper-third line)
- HUD glow must **never obscure her eyes** — eyes are the emotional anchor
- Students visible in background bokeh, blurred but readable as "lifting heads"
- Leave **clean top third** for potential text overlay in social cuts
- Critical action fits within **center 60%** of frame for safe 9:16 reframe
- Hero still: any frame from the 0.5–1.0s of slow-motion activation should be poster-worthy

---

## Reference Stills To Add

Before generating, drop 2–3 reference images into `../references/inspiration/scene-1-hud-reveal/`:
- [ ] A reference of the lighting feel (e.g., a held cinematic golden-hour close-up)
- [ ] A reference of HUD treatment (sparing, elegant, glasses-style — not bulky)
- [ ] A reference of the emotional expression (awakening, not surprise)

---

## Iteration Log

| Date | Tool | Seed / Version | Result | Notes |
|---|---|---|---|---|
| — | — | — | — | — |

---

## Approval Criteria

Mark ✅ approved only when:
- [ ] Hero frame is poster-worthy (would print as a still)
- [ ] HUD reads as product, not as VFX gimmick
- [ ] Teacher's eyes are fully visible and emotionally legible
- [ ] Students in BG visibly begin to lift heads within the clip
- [ ] Color shift from desaturated → cyan-amber is felt, not just seen
- [ ] No banned content present
- [ ] Survives center-crop to 9:16 without losing the moment
