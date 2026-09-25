# Profile Knowledge + Trained Visualizations

> Unify the **expanse_eye profile knowledge base** (meaning, skills, life, learning, engagement) with a **trainable visualization layer**: saved views, social integrations, and ranked personal signals (bits · letters · numbers · combinations · color).

**Status:** Spec  
**Profile:** Matthew McKeller · `expanse_eye` · `PROFILE_MATTHEW`  
**Builds on:** [matthew-profile-knowledge-base.md](./matthew-profile-knowledge-base.md) · canvas [matthew-profile-kb](/Users/mm/.cursor/projects/Users-mm-Projects-4eye/canvases/matthew-profile-kb.canvas.tsx)  
**Related:** [F14 Learning Modes](../planning_Project_4eye/plans/app-features/learning-modes.md) · Highest Value Data · Symbol Grid · yen Track E (live / social chain) · Heart.Evolve social surface

---



## One sentence

The KB is *who you are and what you know*; **trained visualizations** are *how your system learns what lights you up* — then both share the same engagement ranking so Meaning / Skills / Web / Life stay honest to the person, not just the seed file.

---



## Why both


| Without trained viz                       | Without KB                                              |
| ----------------------------------------- | ------------------------------------------------------- |
| Engagement scores stay hand-tuned guesses | Social + letter/color signals have nowhere to attach    |
| Saved charts are orphan dashboards        | Profile lenses can’t explain *why* a word ranks         |
| Social ingest dumps noise                 | Signals never become “Learning” / “Love” / Design skill |


**Together:** signals train engagement → engagement ranks KB nodes → saved visualizations are *projections* of that ranked graph (plus optional social overlays).

---



## Two layers, one person

```
┌─────────────────────────────────────────────────────────────┐
│  ProfileKnowledgeBase (nodes + edges)                       │
│  meaning · skill · event · learn · want · attribute …       │
│  weight (mastery) · engagement · engagementLo/Hi · topics   │
└──────────────────────────▲──────────────────────────────────┘
                           │ ranks / updates engagement
┌──────────────────────────┴──────────────────────────────────┐
│  TrainedSignalStore                                         │
│  atoms: bit · letter · number · combo · color · media token │
│  sources: manual · social · learning session · walkthrough  │
│  → engagementEvidence[] rolled up onto KbNodes              │
└──────────────────────────▲──────────────────────────────────┘
                           │ rendered by
┌──────────────────────────┴──────────────────────────────────┐
│  SavedVisualization                                         │
│  lens + filters + metric + layout + pinned nodes            │
│  optional: social overlay, signal alphabet view             │
│  trainable: “this view was useful” → boost those signals    │
└─────────────────────────────────────────────────────────────┘
```

**Rule (unchanged):** UI never invents a second Matthew. Signals and saved views *feed* the KB; they do not fork identity.

---



## Part A — Profile KB (current work, keep shipping)

Already in flight (canvas P0):

1. Unified nodes with **mastery (weight)** + **engagement + band**
2. Topic sync across lenses
3. Nested Skills (professional / foundation / developing)
4. Web multi-mode (clusters default · links · compare · edge list)
5. Life bubbles (size = significance, stroke = engagement, SVG icons)
6. Score control: Mastery / Engagement / Both



### Still the KB roadmap


| Phase  | Deliverable                                                                       |
| ------ | --------------------------------------------------------------------------------- |
| **P0** | Canvas explorer (done / iterate)                                                  |
| **P1** | `@yen/content` `knowledge-base.ts` as source; profile HVD + skills derive from it |
| **P2** | Profile / Character **Knowledge** lens                                            |
| **P3** | Authoring + privacy                                                               |


See [matthew-profile-knowledge-base.md](./matthew-profile-knowledge-base.md) for schema v1 detail.

---



## Part B — Trained signals (new)



### What gets trained

Personal **atoms** that carry *relative value* for this person — not universal brand tokens, though they can map onto HVD themes.


| Atom kind       | Examples (Matthew-shaped)                       | Trains toward                       |
| --------------- | ----------------------------------------------- | ----------------------------------- |
| **Letter**      | L, E, M, W, 4                                   | Name / brand / Love / Expanse hooks |
| **Number**      | 4, 12 (level), streaks                          | Identity + progression              |
| **Bit**         | binary / on-off marks, HUD ticks                | Symbol Grid literacy                |
| **Combo**       | “4eye”, “Web 4”, “Love.Perfectly()”, heart+cats | Highest-value phrases               |
| **Color**       | green accent, pink bond, violet synthesis       | Profile accent + aura/theme pull    |
| **Media token** | post id, reel, LinkedIn skill endorsement       | Social engagement evidence          |


Each atom has:

```ts
interface TrainedSignal {
  id: string;
  kind: "bit" | "letter" | "number" | "combo" | "color" | "media";
  label: string;           // "L" | "4eye" | "bond-pink"
  /** Relative value for this person 0–100 — ranks against siblings */
  value: number;
  /** Live engagement contribution 0–100 */
  engagement: number;
  engagementLo: number;
  engagementHi: number;
  /** Soft links into the KB */
  kbNodeIds: string[];     // e.g. m-love, s-design
  themes?: ValueTheme[];   // evolve | innovate | win | heal | protect
  topics: KbTopic[];
  sources: SignalSource[]; // where evidence came from
  privacy: "public" | "friends" | "dark";
}

interface SignalSource {
  type: "manual" | "social" | "learning" | "walkthrough" | "viz-feedback";
  provider?: "linkedin" | "instagram" | "x" | "youtube" | "local";
  ref?: string;            // post / session id
  observedAt: number;
  weight: number;          // how much this observation moved the score
}
```



### Ranking engagement for a person

**Engagement on a KbNode is not only authored** — it becomes a rollup:

```
node.engagement ≈ clamp(
  authoredBaseline,
  blend(
    signalEvidence(node),      // letters/colors/combos linked to node
    socialEvidence(node),      // likes, dwell, saves, replies (normalized)
    vizFeedback(node),         // saved views marked “useful” that focused this node
    recencyDecay(...)
  )
)
```

Bands (`engagementLo` / `engagementHi`) come from variance over a window (e.g. 30d), so Life bubbles and Meaning charts stay honest: **high meaning + low engage** vs **hot pull**.

**Relative rank** (person-scoped):

1. ;lSort signals by `value` → “highest-value alphabet” (feeds HVD words)
2. Sort by `engagement` → “what’s loud now”
3. Gap sort `|value - engagement|` → “trained but ignored” / “hyped but shallow”

This is the same dual metric already on the canvas — signals are how those numbers *get trained* instead of only hand-set.

---



## Part C — Saved visualizations (new)

A **SavedVisualization** is a bookmark of projector state + optional training loop.

```ts
interface SavedVisualization {
  id: string;
  profileId: string;
  title: string;
  /** Which KB lens */
  lens: "meaning" | "skills" | "web" | "life" | "learn" | "signals" | "social";
  /** Frozen UI state */
  topics: KbTopic[];
  metric: "weight" | "engagement" | "both";
  webMode?: "links" | "clusters" | "compare" | "edges";
  selectedIds?: string[];
  /** Optional signal alphabet overlay */
  showSignals?: boolean;
  signalKinds?: TrainedSignal["kind"][];
  /** Social overlay */
  socialProviders?: Array<"linkedin" | "instagram" | "x" | "youtube">;
  /** Training */
  trainOnView: boolean;          // dwell / revisit counts as evidence
  usefulnessVotes: number;       // explicit “this view helps”
  lastOpenedAt?: number;
  createdAt: number;
}
```



### Examples worth saving (Matthew)


| Saved view                           | Why                                                        |
| ------------------------------------ | ---------------------------------------------------------- |
| **Love · Meaning+Engage**            | Bond / Heart.Evolve / cats pull — teach engagement ranking |
| **Design / UX / Software skills**    | LinkedIn-style nest; compare mastery vs ship engagement    |
| **Life formative bubbles**           | Cold-storage stories sized by significance                 |
| **Signal alphabet: L·4·green·combo** | Personal highest-value glyphs                              |
| **LinkedIn skills ↔ KB skills**      | Social integration overlay on Skills lens                  |
| **Web clusters · Learning**          | F14 Knowledge Web without edge spaghetti                   |




### Training loop (simple)

1. Open saved viz → record dwell + focused nodes
2. Optional: mark **Useful** / **Not me**
3. Useful → bump `TrainedSignal.engagement` and linked `KbNode.engagement`
4. Not me → widen privacy or lower value (don’t delete history)
5. Social sync job → append `SignalSource` rows → recompute rollups nightly (or on demand)

No ML required for v1 — weighted sums + decay. Later: Learning Modes / triads can consume the same signal graph.

---



## Part D — Social media integrations

Align with existing yen plans (Track E live/social chain, Heart.Evolve `/social`) — don’t invent a third social product.


| Provider                            | What we pull (soft-public)       | Maps to                                      |
| ----------------------------------- | -------------------------------- | -------------------------------------------- |
| **LinkedIn**                        | Skills, headlines, featured      | `skill` nodes + professional tier            |
| **Instagram / visual**              | Saves, color palettes from media | `color` + `media` signals · Design/UX topics |
| **X / posts**                       | High-engagement phrases          | `combo` signals · meaning words              |
| **YouTube / walkthroughs**          | Watch time on teach videos       | `teach` / Storytelling engagement            |
| **Local** `/social` **+ Life feed** | Evolve embeds, posts             | `event` + media tokens                       |


**Privacy default:** dark until remapped; soft-public only what Matthew already treats as teach/ship. Scout / entanglement stays out of training inputs (same communication stance as profile seed).

**Ingest shape:**

```ts
interface SocialEvidenceEvent {
  provider: string;
  externalId: string;
  kind: "like" | "save" | "reply" | "view" | "endorse" | "post";
  text?: string;
  colors?: string[];       // extracted accents
  matchedSignalIds: string[];
  matchedKbNodeIds: string[];
  strength: number;        // normalized 0–1
  observedAt: number;
}
```

---



## Part E — New lenses (product + canvas)

Add to the explorer / future Knowledge lens:


| Lens        | Question                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------- |
| **Signals** | My trained alphabet — bits, letters, numbers, combos, colors ranked by value and engagement |
| **Social**  | Evidence from providers → which KB nodes they light up                                      |
| **Saved**   | Library of trained visualizations; open / vote / duplicate                                  |


KB lenses stay as they are; Signals/Social are *inputs and overlays*, not replacements.

---



## Unified schema (v2 extensions)

Keep v1 `KbNode` / `KbEdge`. Add:

```ts
interface ProfileKnowledgeBaseV2 extends ProfileKnowledgeBase {
  signals: TrainedSignal[];
  savedVisualizations: SavedVisualization[];
  socialEvidence?: SocialEvidenceEvent[];  // or separate store
  engagementPolicy: {
    authoredWeight: number;   // e.g. 0.35
    signalWeight: number;     // e.g. 0.35
    socialWeight: number;     // e.g. 0.20
    vizFeedbackWeight: number;// e.g. 0.10
    windowDays: number;       // e.g. 30
  };
}
```

Canvas P0 can keep authored engagement; P1+ begins showing **derived vs authored** side-by-side until derived wins.

---



## Phased delivery (combined)



### Now — P0b (canvas iterate)

- [x] Document this plan (this file)
- [x] Canvas: **Signals** lens (hand-ranked letters/numbers/combos/colors for Matthew)
- [x] Canvas: **Social** lens (provider evidence stubs → KB links)
- [x] Canvas: **Saved** — named views restore lens + topics + metric + focus
- [x] Tooltips / callouts: authored engagement hardcoded — formulas deferred
- [x] Engagement values hardcoded for display (no rollup formula yet)



### P1 — Content + signals package

- [ ] `knowledge-base.ts` + `trained-signals.ts` in `@yen/content`
- [ ] Seed Matthew signal alphabet (L, 4, green, Love combos, bond pink, synthesis violet…)
- [ ] Engagement rollup helper (pure function, unit-tested)
- [ ] Dual-write: HVD words ← top combo/letter signals by value



### P2 — Product Knowledge lens + saved views

- [ ] Profile/Character Knowledge lens = canvas projectors
- [ ] Persist `SavedVisualization` per profile (local first)
- [ ] Useful / Not me feedback → signal engagement



### P3 — Social integrations

- [ ] Stub providers behind one `SocialEvidence` adapter
- [ ] LinkedIn skills ↔ KB skills mapping UI
- [ ] Soft-public `/social` evidence as optional overlay (Track E / Heart.Evolve)



### P4 — Learning Modes bridge

- [ ] F14 Knowledge Web reads `userKnowledgeWeb(profileId)` from KB+signals
- [ ] Triadic associations can propose new `combo` signals
- [ ] Train-on-learning-session as first-class `SignalSource`

---



## Sync contract (extended)

1. Topic + node selection still sync every KB lens
2. Metric mode (mastery / engagement / both) syncs charts
3. **Saved viz** restores topic + metric + lens + webMode + signal overlay
4. **Signal rank** updates can refresh engagement on linked nodes (single write path)
5. Social evidence never writes dark nodes without an explicit remap

---



## Acceptance (combined)

**KB (existing)**  

- [ ] One filtered node set drives Meaning / Skills / Web / Life / Learn  
- [ ] Mastery ≠ engagement; both visible  
- [ ] Life bubbles + nested skills + web multi-mode remain

**Trained viz (new)**  

- [ ] Person has a ranked signal alphabet (value + engagement)  
- [ ] At least one saved visualization can be reopened with identical projector state  
- [ ] “Useful” on a saved view moves engagement on focused nodes/signals  
- [ ] Social evidence (even stubbed) can attach to a skill or meaning node  
- [ ] Privacy: dark signals never appear on soft-public surfaces  

---



## Out of scope (still)

- Full OAuth social production hardening in P0–P1  
- End-to-end ML ranking models  
- Multi-profile training merge  
- Replacing Symbol Grid app — **integrate**, don’t fork

---



## Decision log

1. **Engagement is first-class on KB nodes** — signals train it; they don’t replace the node model.
2. **Saved visualizations are state + training hooks**, not a separate database of charts.
3. **Letters / numbers / color are personal value atoms** that can promote into HVD words and Symbol Grid usage.
4. **Social is evidence**, not identity — maps into nodes/signals with privacy gates.
5. **Clusters-first web** stays the default teaching surface; link graph remains advanced.

---



## Immediate next build (when you say go)

P0b display mockup is complete in the canvas (hardcoded engagement). Next when ready:

1. Land `@yen/content` stubs for `TrainedSignal` + `SavedVisualization` types next to KB.
2. Profile Knowledge lens port from canvas projectors.
3. Return later for engagement formulas / rollups.

