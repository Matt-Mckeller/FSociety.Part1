# Matthew McKeller · Profile Knowledge Base

> Unified knowledge store for **expanse_eye** (`PROFILE_MATTHEW`) — meaningful words, skills, life events, and learning — with synced multi-view exploration.

**Status:** Spec + exploratory canvas  
**Profile:** Matthew McKeller · `expanse_eye` · `PROFILE_MATTHEW`  
**Superseding combined plan:** [profile-kb-trained-visualizations.md](./profile-kb-trained-visualizations.md) (KB + trained signals + saved viz + social) · **App build:** [profile-engagement-page.md](./profile-engagement-page.md)  
**Related:** [F14 — Learning Modes](../planning_Project_4eye/plans/app-features/learning-modes.md) (Knowledge Web, Triadic Associations, Mind Map, Timeline) · character seeds in `@yen/content` · profile seed in `profiles/store/seed-data.ts`

---

## Goal

One database of *who Matthew is* that can answer:

1. **Meaning** — words / themes that carry weight (Highest Value, wants, titles)
2. **Skills** — LinkedIn-style competencies (Design, UX, Software, Systems, Leadership…) plus game skills
3. **Life** — formative + mid-term + recent events with `learned` / `result`
4. **Learning** — how he takes things in (modalities, formats, stance)
5. **Process** — standing command inputs (`Life.Process.Inspect`, `CursorOn`, Ambitions) — not dated events; project onto Character Process / Events / Perspectives
6. **Story** — WhoAmI narrative hooks (Story1–4 and peers) as cold / story nodes; Web4 essay keeps the frame and links here

Any filter or selection updates **all** views of the same graph.

**Split rule (from Web4 WhoAmI block):** essay = vision frame + links; Character profile = live data. Same pattern as Emotion.Inspect.

---

## Source of truth (today → target)

| Layer | Today (scattered) | Target |
|-------|-------------------|--------|
| Identity + HVD words | `profiles/store/seed-data.ts` → `MATTHEW` | `KbNode` kind `meaning` |
| Professional skills | `MATTHEW.data.professional.skills` | `KbNode` kind `skill` |
| Character skills DAG | `@yen/content` `skills.ts` | edges + mastery |
| Attributes / traits | `attributes.ts`, `traits.ts` | facets on nodes |
| Events / memory | `status.ts` RAM · memory · cold | `KbNode` kind `event` |
| Learning styles | `learning-styles.ts` | `KbNode` kind `learn` |
| Wants / direction | `status.ts` wants | `KbNode` kind `want` |

**Rule:** UI never invents a second copy of Matthew. Seeds feed a single `ProfileKnowledgeBase` document; lenses only project it.

---

## Schema (v1)

```ts
type KbKind = "meaning" | "skill" | "event" | "learn" | "want" | "attribute" | "trait";
type KbTopic =
  | "design" | "ux" | "software" | "systems" | "ai"
  | "learning" | "love" | "leadership" | "health"
  | "identity" | "money" | "teach";

interface KbNode {
  id: string;
  label: string;
  kind: KbKind;
  /** Weight of meaning / mastery / significance — 0–100 */
  weight: number;
  /** How much attention / energy this gets right now — 0–100 */
  engagement: number;
  /** Usual engagement band */
  engagementLo: number;
  engagementHi: number;
  topics: KbTopic[];
  blurb?: string;
  /** Event-only */
  learned?: string;
  result?: string;
  occurredAt?: number;
  valence?: "positive" | "negative" | "neutral";
  /** Skill-only */
  tier?: "foundation" | "developing" | "mastery" | "legend" | "professional";
  status?: "locked" | "available" | "unlocked";
  /** Provenance — which seed file / field */
  source: string;
}

interface KbEdge {
  from: string;
  to: string;
  rel: "requires" | "unlocks" | "feeds" | "associates" | "taught-by";
}

interface ProfileKnowledgeBase {
  profileId: "PROFILE_MATTHEW";
  username: "expanse_eye";
  nodes: KbNode[];
  edges: KbEdge[];
}
```

---

## Sync contract

1. **Topic filter** — `topics ⊆ selectedTopics` (or all if empty). Same filtered set for every viz.
2. **Node selection** — selecting a node in any view sets `selectedId`; other views highlight neighbors via edges.
3. **View mode** — only the projector changes; data does not.
4. **No orphan edits** — write path later goes through KB, then projects back into profile / character seeds (or replaces them).

---

## Visualization lenses (toggleable)

| Lens | Question | Viz |
|------|----------|-----|
| **Meaning** | What words matter most? | Nested themes + wants; mastery vs engagement bars |
| **Skills** | How good am I? | Nested by tier (professional / foundation / developing) |
| **Web** | How do ideas relate? | **Multi-mode:** link graph · topic clusters · meaning-vs-engage · edge list (tooltips) |
| **Life** | What shaped me? | Sized icon bubbles (sig = radius, engage = stroke) + chart |
| **Learn** | How do I take things in? | Fit + engagement dual bars |
| **Schema** | What is the plan? | Entity counts + field map |

**Score control (global):** Mastery / Engagement / Both — nests both series on charts without separate page toggles.

Canvas explorer: open [`matthew-profile-kb.canvas.tsx`](/Users/mm/.cursor/projects/Users-mm-Projects-4eye/canvases/matthew-profile-kb.canvas.tsx) beside chat.

---

## Phases

### P0 — Explorer (now)
- Inline KB snapshot for expanse_eye in a Cursor canvas
- Topic + node sync across lenses
- Toggle Meaning / Skills / Web / Life / Learn / Schema

### P1 — Content package
- Move KB into `@yen/content` (e.g. `character/knowledge-base.ts`)
- Derive profile HVD + professional skills + status timeline from KB (or dual-write with tests)

### P2 — Product surface
- Profile / Character lens: “Knowledge” with same toggles
- Wire Learning Modes Knowledge Web to `userKnowledgeWeb(profileId)` (see F14)

### P3 — Authoring
- Soft-public vs friends privacy on nodes
- Add / edit from walkthroughs and learning sessions

---

## Out of scope (for now)

- Live network fetch / sync to a remote DB
- Full triadic association editor (F14 MVP modes)
- Multi-profile KB merge (River / RedRing stay separate seeds)

---

## Acceptance

- [ ] One filtered node set drives every lens
- [ ] Meaning lens surfaces Learning, Love, Systems, Web 4, etc. with weights
- [ ] Skills lens includes Design / UX / Software / Systems / AI / Leadership at least
- [ ] Life lens shows formative + recent with `learned` when present
- [ ] Learning doc (F14) remains the product home for Knowledge Web mechanics
