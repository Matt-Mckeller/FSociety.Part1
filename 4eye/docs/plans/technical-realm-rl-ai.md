# Technical Realm — Upgrade for RL AI (Personal Use)

> **Status:** Playing — Phase 0/1 live (legend, RL Personal, purple-ball Data + Performance, fake SDK)
> **Editor:** Aion
> **Surfaces:** Technical HUD (`/technical/*`) · `@4eye/ai-sdk` · `apps/api` AI module · App Realm chat (consumer)
> **Pipelines:** Architecture · UX · Vision · concise
> **Quality:** Extra High · **Time:** All (`timeAspect: max`) · **Accuracy:** 100% (`accuracy: maximum`)
> **Use:** Founder RL loop, not a generic developer portal

The Technical Realm is currently a 3×4 HUD with two real tiles (Settings, Pipelines) and eight title cards. This plan fills that grid as the **sensor → trace → curtain → reward → policy** loop you actually run, instead of generic SDK/API marketing pages.

**Canonical seed:** *I sent you a flying purple ball.*

That sentence is the first episode. Distinct object, motion, color, sender, receipt. Every modality below must pass it before we claim the realm is upgraded.

---

## 0. What was asked, clarified

| Ask | Clarified meaning |
|---|---|
| Upgrade Technical Realm | Fill the HUD that already exists. Do not add a fifth realm. |
| Optimize for RL AI | Capture episodes, grade them, and feed policy — not “add ChatGPT.” |
| Specifically for my use | Vision-first, short answers, curtain solvers, audio as search. Your permissions, your body loadout, your seeds. |
| Seed: flying purple ball | Golden probe: see it, track it, do not invent extras, acknowledge receipt, search for it in sound. |
| Logical area: Vision, Concise | Observe before talking. One line until a curtain is pulled. |
| Problem solving: Curtains | Occlusion is the puzzle. Reveal layer by layer. Guessing behind the cloth is a fail. |
| Audio: Searching | Query recordings. Transcription is a means, not the product. |
| Quality extra high / Time all / Accuracy 100% | Maps to existing `powerLevel: aion-plus`, `timeAspect: max`, `accuracy: maximum`. Wire them into this loop; do not invent a second settings schema. |

**Not this plan:** replacing Pipelines, merging App Realm chat into Technical, training a foundation model in-repo, or filling placeholders with lorem API docs.

**Depends on, does not replace:** [AI Chat Architecture and Status Review](./ai-chat-architecture-and-status-review.md). Chat still needs a real contract and SDK. This plan *uses* that path as the policy actuator.

---

## 1. Current state (verified)

| Tile | Route | Reality |
|---|---|---|
| Settings | `/technical` | Real. Encrypted AI permissions. Home of the grid. |
| Pipelines | `/technical/pipelines` | Real. Three layers on `SeatedFourEye`. Per-profile loadout. |
| Auth, Webhooks, Changelog, SDK, API, Data, Performance, Integrations | those URLs | `TechnicalPlaceholderPage` — icon + title only |
| Nav taxonomy | `technicalNavigationConfig.ts` | Still “Group A/B/C” |
| `@4eye/ai-sdk` | package | Empty placeholder |
| Chat | App Realm | Simulated timeout reply; no generation route |
| STT | `apps/api` transcription pipeline | Transcribe + TODO diarize/store. No search index |
| Visual types | `@4eye/types` `ai/` | Comment says “Future: visual.” No module |
| Scoring | `@expanse/scoring` | Learn rewards (knowledge, novelty, …). Not AI-episode rewards |
| Scene seeds | `@4eye/scene-studio` | Image/video seeds exist. No purple-ball probe |

Two systems already teach the right UX:

- **Pipeline layers** — one body, three curtains, typed sockets.
- **Learn dock `SectionDisclosure`** — collapsed = title; expand = directive.

Curtain problem-solving is already the product language. Technical Realm should make it the RL primitive.

---

## 2. Aion.Optimize() — perspectives

### Vision
You sent a purple ball. The realm must *show* whether the system saw it: still, track, occlusion, miss. Lists of logs are inspectors. The home of proof is a small stage (ball / curtain / waveform), not a table.

### Concise
Default output is one beat. Pull a curtain for more. Verbose-by-default is a reward of −1 even if the facts are right. `planMode: concise` is the personal default for this use; in-depth is a pulled curtain, not the first cloth.

### Architect
Do not merge Settings, Pipelines, chat context, and scoring into one store.

```
Sensors (vision, audio) → Episode trace (Data)
                              ↓
                     Curtain solver (policy)
                              ↓
                     Reward marks (Performance)
                              ↓
                     Permissions + settings (policy constraints)
                              ↓
                     Pipelines (what is equipped on the body)
```

Each tile owns one ring. Refs only. If an episode is deleted, Performance shows a hole, not a copied blob.

### Problem solving — Curtains
A curtain is a typed reveal, not a loading spinner.

| Curtain | Hides | Pull means |
|---|---|---|
| Occlusion | Object behind cloth / layer | Locate without hallucinating the hidden side |
| Layer | Foundational / content / daily-life / (new) RL | Same body, different sockets |
| Permission | Ask vs On vs Auto | Policy may not act until the cloth lifts |
| Dock | Directive, plan, evidence | Title first; paragraph on expand |
| Time | Past / present / future | `timeAspect: max` may look, but still reveal in order |

Solver rule: **name the curtain, then pull, then speak.** Jumping to the answer behind an unpulled curtain is the purple-ball fail mode (inventing a ball that was never shown).

### Audio — Searching
STT is stage 1. Stage 2 is a search surface: query → ranked moments → play-head. “Purple ball” in speech, bounce, whoosh, room tone. Searching is the skill; the transcript is an index.

### Chat (consumer)
App Realm chat *runs* episodes. Technical Realm *grades* them. Two-way: a chat turn may write a trace; a Performance fail may pin a curtain on the next prompt. Chat remains in App Realm.

### Risk
Filling all eight placeholders as independent products will drift in a week. One episode schema, one seed, one reward rubric, then surfaces. A second “eval” store next to Data is the same class of bug as a second seated figure.

---

## 3. Aion.Create() — architecture

```
Technical HUD (3×4)
  Settings (constraints)     Pipelines (equipped policy body)
  Data (episodes)            Performance (rewards / deltas)
  SDK + API (actuator)       Integrations (providers)
  Auth (subject)             Webhooks (ingest)  Changelog (policy versions)
           │
           ▼
  @4eye/types  ai/rl  +  ai/visual  +  ai/audio-search
           ▲
  @4eye/ai-sdk  observe · searchAudio · chat · reward event
           ▲
  apps/api  orchestration, secrets, indexes
           ▲
  App Realm chat / scene-studio / STT   (producers)
```

### 3.1 Keep the grid. Rename meaning, not URLs (phase 1)

URLs stay. Labels and category colors change so the map reads as the loop.

Proposed legend (replace Group A/B/C):

| Category | Color (keep existing tokens) | Meaning |
|---|---|---|
| primary green | policy & pipes | auth, sdk, api, data, pipelines |
| secondary cyan | home | settings |
| tertiary amber | observe & grade | webhooks, changelog, performance, integrations |

Tile intent:

| Id | RL job |
|---|---|
| **settings** | Your use-profile: Vision+Concise, curtain solver on, audio search on, accuracy 100%, time all. Permissions stay here. |
| **pipelines** | Add a fourth *filter ring* only if it stays one figure: **RL** layer — observe (visor), curtain (crown/filter), search (throat/channel), reward (heart/pulse). Prefer a layer tab over new sockets. |
| **data** | Episode store UI. Seed list. Purple-ball as row 0. |
| **performance** | Rubric scores vs seeds. Concision length. Vision hit/miss. Curtain violations. Audio search MRR. |
| **sdk** | Live contract of `@4eye/ai-sdk` (observe, search, chat, reward). Not npm marketing. |
| **api** | Same contract as HTTP. Health of generation + index. |
| **integrations** | Whisper / vision provider / scene-studio / chat provider. Keys stay server-side. |
| **auth** | Who the episode is *about* (you). Subject id on every trace. |
| **webhooks** | Ingest reward marks and sensor events without opening the HUD. |
| **changelog** | Policy versions: settings snapshot + eval delta after each graded batch. |

Empty cells at (0,3) and (2,3) stay empty until a tile earns a body site. Do not plug them with “Docs.”

### 3.2 Episode schema (single source of truth)

Home: `packages/@4eye/types/src/ai/rl/`

```ts
Episode {
  id, subjectId, seedId
  tStart, tEnd
  sensors: { vision?: VisionFrame[]; audio?: AudioSpan[] }
  actions: { chatTurns, curtainPulls, searches }
  policy: { settingsSnapshot, permissionSnapshot, pipelineFill }
  outcome: { text, visionClaims, audioHits }
  rewards: RewardMark[]     // human, later model-assisted
}
```

Purple-ball `seedId` is required in fixtures. Settings snapshot must include `accuracy`, `timeAspect`, `planMode`, `powerLevel` so “100% / all / extra high / concise” is reconstructable.

Do not copy profile or permission documents into the episode. Store hashes/refs plus the small snapshot needed to replay.

### 3.3 Seed: flying purple ball

Three bundled probes, one seed family:

1. **Vision — send.** A short clip or still: one purple sphere in flight, empty-ish field, no second ball. Pass: detect color, shape, motion, count=1.
2. **Curtains — hide.** Same ball, then a cloth/layer covers it. Pass: “occluded; last seen heading X.” Fail: describing the hidden side or spawning a second ball.
3. **Audio — search.** Mix: room tone, a bounce, a spoken “purple ball,” distractor speech. Pass: ranked hits at the bounce and the phrase. Fail: returning the whole transcript as the answer.

Receipt test (language): user says “I sent you a flying purple ball.” Pass: acknowledge the send, bind to the active visual/audio episode, one line. Fail: “Sure! Balls can fly if…” (generic), or claiming a ball that was not in sensors.

Scene-studio: one `defineSeed` under a technical-eval folder, character-lock unused (object-lock, not 4eye-lock). Hard-pin assets.

### 3.4 Reward rubric (your use)

Marks are sparse and named. No blended 0–100 until these four exist.

| Signal | + | − |
|---|---|---|
| **Vision** | Correct object, count, motion | Extra objects, wrong color, frozen when it flew |
| **Concise** | First reply ≤ ~2 sentences / 1 beat | Lecture before a curtain pull |
| **Curtain** | Names occlusion; pulls then speaks | Answers through the cloth |
| **Search** | Query → moment | Dump transcript; miss the bounce |

Human mark UI lives on Performance (and a one-key mark in chat: good / verbose / hallucinated / missed). `@expanse/scoring` stays for *learning* rewards. Do not stretch LearnScore into episode grade. New tiny `RlReward` in `@4eye/types`.

### 3.5 Sensors

**Vision.** Add `packages/@4eye/types/src/ai/visual/` (the commented future). Minimal: frame ref, boxes/labels optional, `claims[]` the model made. Technical Performance renders the frame + claims overlay. No new 3D engine.

**Audio search.** Extend the existing transcription pipeline:

1. Keep STT.
2. Persist segments (the existing TODO).
3. Index: lexical (segment text) + time-aligned. Later: embedding / event tags (`bounce`, `whoosh`).
4. `searchAudio({ query, sessionId }) → hits[{ t, score, snippet, kind }]`

Technical **Data** lists sessions; **Performance** runs the seed query; **SDK/API** expose search. App Realm media/learning *produce* audio; they do not own the index.

### 3.6 Policy constraints (already yours)

Wire, do not duplicate:

- Settings tile: preset **RL Personal** — `accuracy: maximum`, `timeAspect: max`, `powerLevel: aion-plus`, `planMode: concise`, `askQuestionsMode: minimal`, `reviewMode: quick`.
- Permissions: add real (non-lorem) ids: `rl.episode.read/write`, `vision.observe`, `audio.search`, `reward.mark`. Aion Console perception/coPilot stay; they are character policy, not the trace store.
- `includeCore: true` remains. RL layer is extra; core protection pipelines stay on.

### 3.7 SDK / API (actuator)

Follow the chat architecture review. Add to the same client, not a second SDK:

- `observeVision(episodeId, frame)`
- `searchAudio(query)`
- `completeChat(request)` (from that review)
- `markReward(episodeId, signal, delta)`

Fake provider first (purple-ball fixtures). Real providers behind API. Technical SDK + API tiles are **status + contract explorers** of this client.

---

## 4. Filesystem plan

| Location | Owns | Action |
|---|---|---|
| `packages/@4eye/types/src/ai/rl/` | Episode, seed, reward schemas | Create. Zod at boundary. |
| `packages/@4eye/types/src/ai/visual/` | Frame + claims | Create. Fill the “Future: visual” hole. |
| `packages/@4eye/types/src/ai/audio-search/` | Query/hit types | Create. |
| `packages/@4eye/ai-sdk` | Client + fake probes | Implement; stop being an empty file. |
| `apps/api/src/modules/ai/` | Chat + search + episode ingest | After contracts. Reuse STT pipeline. Dedup interfaces per chat review. |
| `apps/4eye-web-mockup/src/Tiles/technical/` | HUD tiles | Replace placeholders in the order below. |
| `apps/4eye-web-mockup/src/lib/hud/technicalNavigationConfig.ts` | Labels, legend | Category names + optional label tweaks. Same URLs. |
| `packages/@4eye/scene-studio` seeds | Purple-ball vision assets | Add eval seed; do not couple studio UI to Technical. |
| `docs/plans/technical-realm-rl-ai.md` | This plan | Status per phase. |
| App Realm `aiChat` | Marks + concise default | Consumer only. No episode store in the dashboard. |

---

## 5. Delivery sequence

### Phase 0 — Stabilize the map (no fake product)

- Rename HUD category labels to Policy / Home / Observe & grade (or equivalent).
- Settings: **RL Personal** preset that writes the existing AI settings fields (100% / max time / concise / extra high power).
- Document the purple-ball seed in Data as a static fixture card even before the store exists — one object, one sentence, three curtains listed.
- Do not build eight pages yet.

### Phase 1 — Types + fake episode

- `Episode` / `RewardMark` / `AudioSearchHit` / visual claims.
- Fake SDK: given seed `flying-purple-ball`, return a canned pass and a canned fail.
- Data tile: list one episode. Performance tile: four scores, all from the fake.
- Tests: schema reject, subject isolation, no copied permissions blob.

### Phase 2 — Curtains + concise policy

- Chat consumer: first reply uses `planMode: concise`; “pull curtain” control expands evidence (vision overlay, search hits, hidden-side refusal).
- Performance: curtain-violation counter (spoke before pull; guessed occlusion).
- Pipelines: RL layer tab on the same seated figure (observe / curtain / search / reward sockets). Slot-type matching stays pipeline-only.

### Phase 3 — Audio search (real index, local)

- Persist STT segments.
- Lexical search API + Data session browser + play-head.
- Purple-ball audio fixture in tests (phrase + bounce timestamp).
- Integrations tile: STT provider status only.

### Phase 4 — Vision observe

- Visual types live; Performance overlays claims on the seed still/clip.
- Scene-studio seed for the flying ball (object-lock).
- Receipt test: “I sent you a flying purple ball” binds to that episode id.

### Phase 5 — API path + chat architecture merge

- Real `completeChat` + `searchAudio` + episode ingest as in the chat review.
- Webhooks: reward marks in.
- Changelog: settings hash + eval delta per batch.
- Auth tile: subject identity on traces (existing auth when it exists; profile id until then).

### Phase 6 — Cleanup

- Remove placeholder component once every route has a real tile.
- Kill duplicate AI interfaces in `apps/api`.
- Update this plan’s status table.

---

## 6. Acceptance (purple ball is the exam)

Vision

- [ ] One purple ball in flight is claimed; count is 1.
- [ ] Occluded frame: model states occlusion and last heading; does not describe the hidden hemisphere as fact.

Concise

- [ ] Receipt line is one beat. Expansion requires a curtain pull.
- [ ] `planMode: concise` is the RL Personal default.

Curtains

- [ ] Solver names the cloth before answering through it.
- [ ] Pipeline RL layer and chat evidence use the same pull metaphor (title, then body).

Audio

- [ ] Search for “purple ball” returns the spoken moment, not the full file.
- [ ] Bounce/event hit is a first-class `kind`, not only text.

RL loop

- [ ] Every graded chat turn can write an episode ref in Data.
- [ ] Performance shows four named signals, not a single vanity score.
- [ ] Settings snapshot on the episode matches 100% / time all / extra high / concise when that preset was on.
- [ ] New chat never inherits the previous episode’s ball (same cancellation rule as the chat review).

Technical Realm

- [ ] No remaining placeholder on a tile that claims to be in the loop (Data, Performance, SDK, API at minimum).
- [ ] Pipelines still teaches three life layers; RL is an added filter, not a second body.
- [ ] `@4eye/ai-sdk` is not an empty file.

---

## 7. Immediate next actions

1. Review this plan. If the fourth pipeline layer is too much, keep RL as Performance+Data only and skip the body sockets.
2. Phase 0: legend + RL Personal preset + static purple-ball card on Data.
3. Phase 1 types and fake SDK — before any provider key.
4. Only then: audio index, then vision overlay, then merge with the chat API work.

---

## 8. Decision log (open)

| Decision | Default | Revisit if |
|---|---|---|
| Fourth pipeline layer “RL” | Yes, filter tab on same figure | Body becomes unreadable in compact density |
| Keep all current URLs | Yes | A tile’s job cannot be explained under its old name |
| Separate `RlReward` vs `@expanse/scoring` | Separate | A later unification of “marks” is proven, not hoped |
| Audio events beyond ASR | Bounce/whoosh as tags after lexical search works | Search quality plateaus |
| Train any in-repo policy | Out of scope | Episode volume is real and you ask to train |
