# Character Body Map — Attachments, Chat, Inventory

> **Status:** Plan — ready to implement after review
> **Editor:** Aion
> **Surfaces:** Profile Character lens · AI Chat dock · Inventory · Pipelines (consumer)
> **Pipelines:** Architecture · UX · Vision · concise
> **Quality:** One body. Thin refs. No fifth store of the same entities.

The seated 4eye on the Pipelines page is already a body that holds meaning. This plan makes that figure the **shared loadout map** for spells, goals, plans, scripts, targets, audiences, chat context, and real-world belongings — without merging those domains into one blob.

---

## 0. What was asked, clarified

| Ask | Clarified meaning |
|---|---|
| Body section on the profile Character page | A hero panel on `CharacterLensBody` that shows the **same seated 4eye** as Pipelines, with symbols on named body sites |
| Attach via symbols to body parts | Click a site → pick a kind → bind an entity. Glyph sits on the site |
| Same character as Pipelines | Reuse `SeatedFourEye` + `SlotPosition` (`crown` `visor` `throat` `heart` `solar` `root` `leftHand` `rightHand` `feet`). Not the 2D `ProfileFrame` head |
| Equip spells, goals, plans, scripts, targets, audience, everything from AI chat | Body is an **index** over existing stores: Spellbook, Character work/goals, Plan scratch, `SelectedContext` (targets, audiences, locations, stories, animations, scenes, sequences, pipelines), HUD goals/projects/domain |
| Shared component in AI chat | One `BodyAttachMap` at two densities: `full` on Character, `compact` in `ChatProfilePanel` |
| Real-world inventory + meaning + spells | New `world` realm on Inventory. CRUD. Meaning text. Spell binds. Place on the same body |

**Not asked, and not this plan:** a new 3D character, merging Equipment RPG slots into pipeline sockets, a backend, or replacing the Pipelines page.

---

## 1. Current state (verified)

Four parallel “what is on me” systems already exist. None of them talk.

| System | Where | What it holds | Spatial? |
|---|---|---|---|
| **Pipeline body** | `SeatedFourEye` + `PipelineFill` | Pipelines in typed sockets, 3 layers | Yes — 9 sites |
| **Equipment** | `EquipmentItem.slot` (`@yen/content/character/equipment`) | RPG gear (head, weapons, tattoos…) | Named slots, **no body figure** |
| **Character loadout** | Equipped spells / work / goals / actions | Lists on Character lens | No |
| **Chat context** | `SelectedContext` + HUD goals/projects/domain + profile aspects + plan scratch | What rides on the next reply | No |

Character lens already has an **EquippedPipelines** list that reads the pipeline loadout and links out to `/technical/pipelines`. It does not show the body.

Chat Profile dock is identity + inject chips. It does not show what is attached to the person.

Inventory tile is **game loot** (currency, equipment, collectibles, supplies). No add/edit, no meaning, no spells, no body.

Equipment already has `tattoo` / `symbol` / `belief-system` slots — flavour, not a map.

---

## 2. Aion.Optimize() — perspectives

### Vision
The body is the one place you *see* the loadout. Lists stay as inspectors. Chat stops being a bag of IDs and becomes “what is on this person right now.”

### Architect
Do **not** merge `PipelineFill`, `SelectedContext`, Spellbook, Goals, and Inventory into one store. Those are source-of-truth. The body map is a **thin attachment index**: `{ kind, entityId, site, meaning?, spellIds?, ride? }`. Adapters resolve glyph/color/label from the owning store.

### UX
Nine sites cannot hold eight entity kinds exclusively. Same teaching as Pipelines: **one figure, layer as filter, stack on a site, click to inspect.** Compact density for the 340px chat dock; full density for Character.

### Chat
Attaching with `ride: true` **is** selecting for the next reply. Two-way with `selectedContext` (and goals/projects where those already inject). Persist vs session must stay distinct or every chat will overwrite the character.

### Inventory
Game loot and real-world belongings are different realms on one tile. World items are first-class attachments: name, meaning, optional photo, spells, body site.

### Pipelines
Remain the specialist. After the lift they *consume* the shared figure. Slot-type matching (`filter` on crown, `craft` on hands, …) stays pipeline-only. Other kinds do not inherit that constraint.

### Risk
A second seated figure, a second slot vocabulary, or copying entity payloads onto the body will drift in a week. Lift first. Index second. Surfaces third.

---

## 3. Aion.Create() — architecture

```
Surfaces
  CharacterLensBody (full)     ChatProfilePanel (compact)
  Inventory item detail        PipelinesTile (existing consumer)
           │                         │
           └────────────┬────────────┘
                        ▼
              BodyAttachMap  (shared UI)
              SeatedFourEye · SlotDisc · SiteInspector · KindPicker
              density: full | compact
                        │
                        ▼
              BodyAttachmentStore  (per profile)
              attachments[] · projectToChat() · overlay session
                        │
     ┌─────────┬────────┼────────┬──────────┬──────────┐
     ▼         ▼        ▼        ▼          ▼          ▼
 PipelineFill Spellbook Goals  Selected  Inventory  Plan scratch
 Character    Loadout   Work   Context   (world)    HUD domain
 work/goals
```

**Rule:** the body store never copies an entity. It stores a ref. If the entity is deleted, the attachment resolves empty and can be pruned.

### 3.1 Body topology (reuse, do not rename)

Keep `SlotPosition` and `SLOT_POSITION_XY` from `pipelines/data.ts`. Lift them with the figure.

Suggested home sites (defaults, not locks):

| Site | Intent | Voice | Cast | Carry |
|---|---|---|---|---|
| Crown | vision / direction | — | — | glasses / belief |
| Visor | goals, plans | domain | — | — |
| Throat | — | audiences, scripts, stories | communicate spells | — |
| Heart | relationships / bond work | — | love/relate spells | meaningful object |
| Solar | daily work / tasks | — | act spells | — |
| Root | — | locations | — | bag / home items |
| Left hand | — | targets (actors) | off-hand spell | held item |
| Right hand | — | targets | main spell | tool |
| Feet | — | — | — | ground / hearth |

### 3.2 Attachment layers (filters, not extra sockets)

Pipelines already taught three layers on one body. Character/Chat add a **coarser ring** so the dock is not seven tabs:

| Layer | Contents | Default on |
|---|---|---|
| **System** | pipelines (existing 3 sub-layers still live on the Pipelines page) | Character, Pipelines |
| **Intent** | goals, plans, equipped work | Character |
| **Voice** | targets, audiences, locations, stories, scenes, sequences, animations | Chat |
| **Cast** | spells, loadout actions | Character, Chat |
| **Carry** | world inventory (+ optional equipment glyphs later) | Inventory, Character Gear |

Layer = filter over the same 9 sites. A site may hold several attachments of different kinds. Same-kind collision:

- **Pipeline:** existing rule (one pipeline per typed socket; unique across fill).
- **Spell / inventory:** one primary per site; extras stack behind `+N`.
- **Chat entities:** many allowed; compact view shows top glyph + count.

### 3.3 Model

Live in `@4eye/types` (refs) + a small store next to character/pipelines. Keep pipeline fill as-is; System layer *projects* it onto the map so Pipelines and Character cannot diverge.

```ts
type BodySite =
  | "crown" | "visor" | "throat" | "heart" | "solar"
  | "root" | "leftHand" | "rightHand" | "feet";

type BodyLayer = "system" | "intent" | "voice" | "cast" | "carry";

type AttachmentKind =
  | "pipeline" | "spell" | "goal" | "plan" | "work"
  | "target" | "audience" | "location"
  | "story" | "animation" | "scene" | "sequence"
  | "inventory";

type AttachmentScope = "character" | "session";

interface BodyAttachment {
  id: string;
  kind: AttachmentKind;
  entityId: string;
  site: BodySite;
  layer: BodyLayer;
  scope: AttachmentScope;
  meaning?: string;
  spellIds?: string[];
  ride?: boolean; // projects into chat injection
}
```

`kind: "pipeline"` attachments are **derived** from `PipelineFill`, not a second write path.

Chat projection:

```
character attachments (ride)  ∪  session attachments  →  SelectedContext + goals/plan
```

Unequipping on the body with `ride` clears the matching selected id. Selecting in the HUD/context bar creates or lights a **session** overlay on the suggested site (does not rewrite the character loadout unless the user pins it).

### 3.4 Shared UI

New folder (mockup, next to loadout):

```
apps/4eye-web-mockup/src/components/body-map/
├── model/
│   ├── types.ts          # BodySite, BodyAttachment, layers, kinds
│   ├── sites.ts          # SLOT_POSITION_XY lifted
│   └── kind-meta.ts      # color, default site, layer, resolver key
├── store/
│   └── BodyAttachmentStore.ts   # per-profile index + session overlay
├── SeatedFourEye.tsx     # lifted from pipelines (nodes stay generic)
├── SlotDisc.tsx
├── BodyAttachMap.tsx     # figure + layer filter + density
├── SiteInspector.tsx     # list at a site: meaning, spells, ride, remove
├── KindPicker.tsx        # pick kind → search existing entity
└── index.ts
```

`BodyAttachMap` props (contract):

- `density: "full" | "compact"`
- `layers?: BodyLayer[]` — which filters to show
- `interactive?: boolean`
- `onSiteClick?(site)`
- Reads store + adapters; does not fetch

PipelinesTile keeps `LayerTabs` / `EquipSlots` / `PipelinePickerMenu`. It imports `SeatedFourEye` from `body-map` and continues to pass pipeline `BodyNode`s.

### 3.5 Adapters

One resolver per kind: `{ id } → { label, color, Icon, href? }`.

| Kind | Source |
|---|---|
| pipeline | `PIPELINES` / `usePipelineLoadout` |
| spell | Spellbook registry / loadout |
| goal | `useGoals` / character equipped goals |
| plan / work | Plan scratch + equipped work + projects |
| target / audience / … | `useContextData()` collections |
| inventory | Inventory store (`realm: "world"`) |

---

## 4. Surfaces

### 4.1 Character lens (`CharacterLensBody`)

Body map becomes the **hero under ActionBand**, full width, not a buried list.

- Default layer: all (stacked, muted) with a layer cycle like existing `CycleControl`.
- Click site → `SiteInspector` beside (desktop) or sheet (narrow).
- Kind picker offers Intent / Cast / Voice / Carry. System sites stay editable via existing pipeline picker (or “Open Pipelines”).
- `EquippedPipelines` list remains the System readout (capped), same as Equipment chips vs library. Do not delete it in v1.
- Pairing update: `["body"]` then `["work", "direction"]` … pipelines panel can collapse by default once the body is live.

### 4.2 AI Chat (`ChatProfilePanel`)

Compact figure (~160–180px) under the identity strip.

- Default layer: **Voice** + anything with `ride`.
- Lit glyphs = riding on the next reply. Dim = on the character but not injected.
- Click site → short picker (reuse entity lists, do not mount ProfilesTile).
- Inject toggle already on the panel: off → body is display-only; on → `ride` attachments join `buildChatInputContext`.
- Link “Open Character” already planned; keep it.

Dock width is 340px. No inspector column. Inspector is a popover.

### 4.3 Pipelines page

Behavior unchanged after the lift. Same sockets, same fill, same picker.

### 4.4 Inventory

See §5.

---

## 5. World inventory (concise)

Extend, do not replace, the existing Inventory tile.

```ts
type InventoryRealm = "game" | "world";

// additive on InventoryItem
realm?: InventoryRealm;        // default "game" for current seed
meaning?: string;              // why it matters
spellIds?: string[];           // bound spells
bodySite?: BodySite;           // if placed
locationNote?: string;         // "desk", "bag", "kitchen"
photoSrc?: string | null;
```

Store actions (mockup reducer, no backend):

- `add-world-item` / `update-world-item` / `remove-world-item`
- `set-meaning` / `bind-spell` / `place-on-body`

UI:

- Realm toggle: Game | World (World is the new default entry from Character Gear).
- World: “Add item” form (name, meaning, location, optional photo).
- Detail: meaning editor, spell chips (picker from Spellbook), **Place on body** → compact `BodyAttachMap` filtered to Carry.
- Character Equipment panel: a Belongings strip of world items that are placed, linking into this.

Seed 4–6 of Matthew’s real objects (notebook, camera, keys, …) so the map is not empty.

Out of scope: trade, craft, economy, sync.

---

## 6. Chat injection contract

`buildChatInputContext` already folds `SelectedContext`. Add a projection step:

1. Collect `BodyAttachment` where `ride === true` and `scope` is character or this session.
2. Group by kind → ids.
3. Union into `selectedContext` (and goals/plan fields the composer already summarises).
4. Dedup. Session wins on conflict for the turn; character loadout is unchanged.

Composer summary already prints counts (`profile (3)`). Extend with `body (n)` only if it is not double-counting selected context. Prefer: body is the *visual* of the same bag, not a second bag.

Presets: later. V1 does not serialize body attachments into preset recipes; pinning from chat is enough.

---

## 7. Phases

### Phase 0 — Lift (no visible product change)

- Move `SeatedFourEye`, `SlotDisc`, `SlotPosition`, `SLOT_POSITION_XY` into `components/body-map/`.
- Pipelines re-import. Typecheck clean. Storybook still renders Pipelines.

### Phase 1 — Character body (Intent + Cast + System projection)

- Types + `BodyAttachmentStore` (per profile, seed Matthew/Janna).
- `BodyAttachMap` full density on Character lens.
- Attach spells, goals, plans, work. System layer reads pipeline fill (read-only on Character except unequip/add that already exist).
- `SiteInspector` + `KindPicker`.
- Storybook: empty, sparse, dense, site open.

**Done when:** Character lens shows the seated 4eye with mixed glyphs; clicking a hand equips a spell; heart can hold a goal; pipelines still match the Pipelines page.

### Phase 2 — Shared chat compact

- Compact `BodyAttachMap` in `ChatProfilePanel`.
- `ride` ↔ `selectedContext` two-way for Voice kinds.
- Session overlay vs character persist (pin control on inspector).
- Targets, audiences, scripts (stories/scenes/sequences).

**Done when:** attaching an audience to the throat in chat lights the glyph and the next reply summary includes that audience; selecting an audience in the HUD lights the throat for this session.

### Phase 3 — World inventory

- `realm: "world"` + CRUD + meaning + spell bind + place on body.
- Character Gear belongings strip.
- Same `BodyAttachMap` Carry filter.

**Done when:** you can add a real object, write why it matters, bind a spell, put it on a hand, and see it on Character and (if `ride`) as chat context.

### Phase 4 — Polish

- Suggested-site defaults, stack overflow `+N`, layer cycle persistence (`4eye.body.layer`).
- Glyphs: SpellGlyphs / entity Icons / SlotDisc shapes already in use — no new hue language. Layer filter uses existing channel inks (`characterPalette`).
- `pnpm typecheck` clean.

---

## 8. Decisions

| Question | Decision |
|---|---|
| Which figure? | SeatedFourEye (Pipelines), not ProfileFrame |
| Merge stores? | No. Index of refs |
| Pipeline sockets vs other kinds | Pipelines keep typed sockets. Others free-place with suggested sites |
| One attachment per site? | No. Stack by kind; pipeline uniqueness unchanged |
| Chat attach vs character attach | Session overlay by default in chat; pin to persist |
| RPG equipment on this body? | Not v1. Equipment panel stays. Optional later as Carry glyphs |
| Game inventory? | Unchanged. World is additive |
| Shared package vs mockup folder | Mockup `components/body-map` for v1 (same as loadout). Types that chat features need go in `@4eye/types` |
| Backend | None. Reducer + seed, like character/pipelines |

### Open (defaults if unreviewed)

- Pin-from-chat copy: “Keep on character” vs “This chat only”.
- Whether domain (HUD) gets a visor session glyph. Default: yes, session-only.
- Photo on world items: optional URL/seed image, no uploader in v1.

---

## 9. Files (expected)

```
packages/@4eye/types/src/body/          # BodySite, BodyAttachment (if shared with features)
apps/4eye-web-mockup/src/components/body-map/   # NEW shared UI + store
apps/4eye-web-mockup/src/Tiles/technical/pipelines/  # re-export lift
apps/4eye-web-mockup/src/Tiles/character/components/CharacterLensBody.tsx
apps/4eye-web-mockup/src/Tiles/appRealm/aiChat/workbench/ChatProfilePanel.tsx
apps/4eye-web-mockup/src/Tiles/inventory/model/types.ts
apps/4eye-web-mockup/src/Tiles/inventory/store/InventoryProvider.tsx
packages/@4eye/features/src/chat-input-context/  # projection only, Phase 2
```

Related plans (do not duplicate):  
[`character-and-screens/character-screens-update-plan.md`](./character-and-screens/character-screens-update-plan.md) · [`profiles-and-inventory/inventory-plan.md`](./profiles-and-inventory/inventory-plan.md) · [`ai-chat-page-improve.md`](./ai-chat-page-improve.md)

---

## 10. Success check

1. One seated 4eye implementation, three consumers (Pipelines, Character, Chat).
2. Equipping a spell on a hand on Character is the same attachment the compact chat body can show.
3. Chat injection is the existing context bag, visualized — not a parallel prompt channel.
4. A world item can carry meaning + a spell + a body site.
5. Pipeline slot rules still hold on the Pipelines page.
