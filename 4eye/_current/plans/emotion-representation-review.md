# Emotion representation review

**Date:** 2026-08-10  
**Surface:** Emotion.Inspect field + `@yen/content` emotion model

## What was wrong

1. **Pie chart** — share-of-total is the wrong metaphor. Emotions coexist; they are not slices of one pie. Classic D3 bubble packs are also dated when position means nothing.
2. **Calm / Happy / Anger / Sad as equals** — clinical quartet. Does not match the lived lead set: **Excited · Motivated · Angry**.
3. **Missing catalogue entries** — Excited and Motivated were not first-class emotions.
4. **Grouping by valence alone** teaches the map but does not organise *who you are* or *what the feeling is for*.

## Better model (hybrid)

| Layer | Job |
|-------|-----|
| **Valence × arousal** | Teach the emotion model (circumplex) — where a feeling sits |
| **Channel family** | Organise identity & perspectives — Drive / Create / Relate / See / Regulate |
| **Lens** | What this emotion is *for* when Inspect / Summary switches |
| **Experience + delta** | State of mind over time — size now, ghost = previous, ↑↓ change |

### Families

- **Drive** — excited, motivated, angry, frustrated (agency fuel)
- **Create** — calm, flow, inspired
- **Relate** — happy, grateful, hopeful
- **See** — sad, anxious, despairing
- **Regulate** — content, serene

## Visual: Emotion field (not pie / not static bubble)

Animated SVG field:

- Position blends circumplex target with family cluster gravity
- Radius ∝ √experience (area reads weight)
- Dashed ghost ring = previous level (change)
- Soft pulse on high / moving nodes
- Click selects emotion for Inspect
- Family chips + readout teach the grouping

## Goals covered

| Goal | How |
|------|-----|
| Represent state of mind | Topography + deltas, Drive leads |
| Teach emotion | Axes labeled; family blurbs |
| Understand own emotion | Premise + channels + dossier |
| Organise perspectives | Families map to perspective domains |
| Teach who I am | Seeded experience is profile-specific |
