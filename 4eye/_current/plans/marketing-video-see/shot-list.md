# Shot List — Master Timeline

> Timeline-ordered tracker for every shot. Update status as shots move through production.

**Master duration target:** ~75s
**Status legend:** 💡 idea · 📝 prompt drafted · 🎬 generated · 👀 reviewing takes · ✅ approved · 🎞 in edit · 🔒 locked

---

## Master Timeline (75s hero)

| # | Time | Scene | Shot name | Dur | Concepts | Tool | Status | Prompt |
|---|---|---|---|---|---|---|---|---|
| 01 | 0:00–0:03 | S1 | Classroom cold open (wide, desaturated) | 3s | C01, C16, C19 | TBD | 💡 | — |
| 02 | 0:03–0:05 | S1 | 4eye enters, light follows | 2s | C03, C05, C24 | TBD | 💡 | — |
| 03 | 0:05–0:08 | S1 | Hand-off — 4eye gives HUD to teacher | 3s | C03, C05 | TBD | 💡 | — |
| **04** | **0:08–0:10** | **S1** | **⭐ HUD activates on teacher (HERO FRAME)** | **2s** | **C01, C03, C05, C07** | **Veo 3** | **📝** | **[link](./prompts/scene-1-shot-01-hud-reveal.md)** |
| 04b | 0:10–0:11 | S1 | Skill Tree Expansion — single student, 7 badge nodes, progress rings | 1s | C01, C02, C03, C21 | Gemini Pro | 📝 | [seed](./gallery-app/apps/api/src/seeds/scenes/s1-c-new5-skill-tree.seed.ts) |
| 05 | 0:11–0:13 | S1 | Students lift heads, 4wing flies in | 2s | C01, C04, C05 | TBD | 💡 | — |
| 06 | 0:13–0:16 | S1 | Students gain gear, two higher-level already visible | 3s | C02, C21 | TBD | 💡 | — |
| 07 | 0:16–0:19 | S1 | Engagement montage — eyes widen, coins flash, leaderboard tick | 3s | C10, C18, C23 | TBD | 💡 | — |
| 08 | 0:19–0:22 | S1 | Bully-pause beat — two students engage HUD instead | 3s | C20 | TBD | 💡 | — |
| 09 | 0:22–0:24 | L2 | Triangle lens transition (Eye/Ear/Body) | 2s | C09 | TBD | 💡 | — |
| 10 | 0:24–0:28 | S2 | Coffee shop establishing — humans + gentle robots | 4s | C11, C14, C24 | TBD | 💡 | — |
| 11 | 0:28–0:32 | S2 | Connection beat — electric dots between two characters | 4s | C06, C07 | TBD | 💡 | — |
| 12 | 0:32–0:36 | S2 | Tasteful adult connection moment | 4s | C07, C26 | TBD | 💡 | — |
| 13 | 0:36–0:40 | S2 | Family / friend group sharing insight | 4s | C06, C11, C18 | TBD | 💡 | — |
| 14 | 0:40–0:42 | L3 | Square lens transition (love + robots + humans merged) | 2s | C09 | TBD | 💡 | — |
| 15 | 0:42–0:47 | S3 | Bioluminescent sea opening | 5s | C13, C15, C24 | TBD | 💡 | — |
| 16 | 0:47–0:52 | S3 | Character in elegant gear, HUD evolved | 5s | C02, C21, C15 | TBD | 💡 | — |
| 17 | 0:52–0:57 | S3 | Neural sharing beat — translation bursts | 5s | C15, C17, C25 | TBD | 💡 | — |
| 18 | 0:57–1:02 | S3 | 360° / guardian eye motif — pull back to globe | 5s | C12, C22 | TBD | 💡 | — |
| 19 | 1:02–1:07 | S3 | Aspirational figure ascending — leveled HUD final form | 5s | C02, C07 | TBD | 💡 | — |
| 20 | 1:07–1:10 | L4 | Halo lens closing | 3s | C09 | TBD | 💡 | — |
| 21 | 1:10–1:15 | Outro | Logo lockup + "Grow." card | 5s | C27 | TBD | 💡 | — |

**Total:** 75s

---

## Cut Versions

### 6s hook (paid social pre-roll)
Shots: **04** (hero, ~2s) + 05 (1s) + 21 (3s logo + promise)
Concepts: C01, C03, C05, C09, C24, C27

### 15s (Reels / TikTok / Shorts)
Shots: 01 (2s) → 03 (2s) → **04** (2s) → **04b** (1s) → 05 (2s) → 07 (2s) → 21 (3s)
Concepts: C01, C02, C03, C05, C07, C10, C21, C24, C27
Note: 04b (Skill Tree) is a strong 15s include — it visualizes the "hidden potential" concept clearly in 1s.

### 30s (IG feed, YouTube skippable pre-roll)
Shots: 01 → 03 → **04** → **04b** → 05 → 07 → 09 → 10 → 11 → 14 → 15 → 17 → 20 → 21
Drop tertiary detail beats: 06, 08, 12, 13, 16, 18, 19

### 75s hero (website, YouTube, LinkedIn, Google Business)
All shots above.

---

## Per-Shot Production Checklist

For every shot, before marking 🔒 locked:

- [ ] Prompt drafted in `/prompts/scene-X-shot-NN-name.md`
- [ ] Universal style anchor + negative prompt applied from style bible
- [ ] At least 4 takes generated (different seeds or tools)
- [ ] Best take selected and seed/tool/version logged
- [ ] Frame composition check — critical action within center 60% for 9:16 safety
- [ ] No banned content (text overlays, surgical, religious, etc.)
- [ ] Imported to DaVinci Resolve timeline
- [ ] Approved in context of adjacent shots

---

## Aspect Ratio Coverage

| Shot | 16:9 | 9:16 | 1:1 |
|---|:-:|:-:|:-:|
| All | Primary generation | Center-crop reframe | Center-crop reframe |

If a shot's hero composition doesn't survive 9:16 center-crop, regenerate with safer framing rather than awkward reframe.

---

## Open Production Questions

- Which AI-gen tool wins for character consistency across shots 01–08? (style test pending)
- Which tool wins for VFX-heavy lens transitions? (likely different from above)
- Can 4eye character maintain identity across 21 shots? May need seed-locked reference image strategy.
- Music sync — score after picture lock, or pick library track first and edit-to-beat?
