# Plan Document — Text Briefing + Interactive Highlights

> **Status:** Plan — ready to implement after review
> **Editor:** Aion
> **Surface:** `/appRealm/ai-chat` empty center (`PlanScratchPad`) + markdown/JSON export
> **Follows:** [`ai-chat-plan-document.md`](./ai-chat-plan-document.md) (wiki of live HUD selection)
> **Pipelines:** Architecture · UX · Vision · concise
> **Quality:** Two surfaces, one payload. Highlights on the paper; full facts in the text.

The plan document already *shows* what is selected. It does not let you choose **what to import**, and it never shows **who you are right now**. Profile inject is a list of aspect names. Status is a chip in the dock that does nothing on the paper.

This pass adds User Status as an importable slice, then splits the document into two representations of the same briefing: a **text** version you can read, copy, and send, and an **interactive** wiki that paints highlights — not the whole character sheet.

---

## 0. What was asked, clarified

| Ask | Clarified meaning |
|---|---|
| Include user status in the options of context to import into the plan document | First-class import slice **User Status**, alongside Cast / Direction / World / Method / Profile. Not buried as one of 22 profile-aspect chips that only print their label. |
| Text-based version of the plan document | In-paper **Source** view + existing markdown/JSON download. Serializable facts a model (or a human) can read without the UI. |
| UI / web interactive version | The current wiki paper. Stays visual. Does **not** dump full records. |
| Would not import full details for everything | Interactive surface uses **highlight adapters**. Text surface may carry one extra line of fact per highlight, not the owning panel. |
| Character example: top 2 profile components | **Summary** (`CharacterSummaryCard`) + **Status** (`StatusStrip` on Surfaced / Today). The live strip is: Want **Em** · Mood **Angry / Spirited / Frustrated** · Buffs **8** · featured Perks (Perfect Speech, Perfect Content, Content Creation, Voice Optimized, Movement Optimized, Emotion Optimized, Acting Optimized, Aion.Amplify). |

**Not asked, and not this plan:** dumping `StatusRAMPanel` (all wants, memory, cold storage) into the paper; mounting the full Summary card with emotion-channel essay + attribute mini-bars + routine; a new profile store; a generation backend.

---

## 1. Current state (verified)

| Piece | What ships today | Gap |
|---|---|---|
| Interactive paper | `PlanScratchPad` wiki: Cast, Direction, World, Method, Attachments, Notes | Mirrors HUD selection automatically. No import picker. |
| Text | `serializePlanMarkdown` / `serializePlanJson` as downloads | No in-paper Source view. Profile is aspect **labels**. Status payload is absent. |
| Profile inject | `ChatProfilePanel` aspect chips; `status` exists in `PROFILE_ASPECT_META` (`heading` group) | `DEFAULT_INJECT` omits `status`. Toggling it only changes the Method line `Profile: …`. |
| Character highlights | `StatusStrip` (`DailyGrids.tsx`) + `CharacterSummaryCard` at the top of Profile | Neither is read by the plan. The paper cannot show Want / mood / buffs / featured perks. |
| Status model | `useCharacterStatus()`, `useCharacterSeedEffects()`, `useFeaturedPerkIds()` | Plan export context is `ChatInputContextPayload` only — no character slice. |

The HUD already selects entities. The plan already prints those entities as chips. What is missing is (1) a **slice list you can turn on**, and (2) a **status highlight** that is the same language as the profile dashboard, not a second character page.

---

## 2. Vision

One briefing, two densities.

```
                    ┌─ Import slices (toggles) ─────────────────┐
                    │ Cast  Direction  World  Method            │
                    │ Profile  ● User Status  Attachments       │
                    └──────────────────────┬────────────────────┘
                                           │
              ┌────────────────────────────┼────────────────────────────┐
              ▼                            ▼                            ▼
     Interactive paper              Text / Source                 Send + export
     (wiki, chips, glyphs)          (markdown in the paper)       (same payload)
     highlights only                serializable facts            notes + slices
```

**Interactive:** look at the page and know the cast, the heading, and **how the user is right now** — the same Want / Mood / Buffs / Perks chips the profile already uses.

**Text:** the same facts as a briefing you could paste into another chat, save as `.md`, or attach on send. Status here is names and counts, not the Brain tab.

Color stays workbench indigo for paper chrome. Status chips keep their own hues (`MOOD_META`, want color, perk color) — same as `StatusStrip`. `useSurface` only for chrome.

---

## 3. Density contract

Every importable slice has two adapters. Interactive never inlines the owning tile.

| Slice | Interactive (paper) | Text (Source / `.md` / JSON) | Never import |
|---|---|---|---|
| **User Status** | `StatusStrip` (Want, moods, buff count, featured perk chips) + a **summary highlight row**: LVL · active emotion lens label · aura-count if equipped | Want label; moods with intensity; buff **count and names**; featured perk names; optional one-line `currentContext` | `StatusRAMPanel` (Wants/RAM/Memory/Cold); full perk catalog; all wants after the primary; effect descriptions; attribute modifiers |
| **Summary** (character) | Compact identity: name · role · LVL · emotion. Not the full `CharacterSummaryCard` (no channel essay, no 3-bar lens grid, no routine) | Same fields as one markdown list | Emotion picker, Inspect dossier, habit routine |
| Cast / Direction / World / Method | Existing chip rows | Existing `serializePlanMarkdown` lists | Entity dossiers, pipeline bodies, goal pyramids |
| Profile aspects | Enabled aspect **labels** (current Method line), plus Status when that slice is on | Aspect ids + labels | Full Characteristics / Skills / Equipment panels |
| Attachments / Notes | Current blocks | Current blocks | — |

The character example in the ask **is** the Status interactive adapter. If Matthew is the active profile, the paper shows exactly that strip. If Janna is active, the same component shows her want / moods / buffs / featured perks. No second implementation.

---

## 4. Workstream A — Import slices, including User Status

**Files:** new `workbench/planImport.ts` (or extend `planExport.ts`), `PlanScratchPad.tsx`, `ChatProfilePanel.tsx`, `planExport.ts`

### A.1 Slice model

```ts
type PlanImportSlice =
  | "cast"
  | "direction"
  | "world"
  | "method"
  | "profile"
  | "status"      // User Status — first class
  | "summary"     // Character summary highlights
  | "attachments"
  | "notes";
```

Persist with the draft (`PlanDraft.importSlices`). Defaults: all on except `world` stays omit-if-empty (current behavior). **`status` defaults on** — that is the point of this ask.

A compact chip row under the masthead: one chip per slice. Off = hidden on paper, omitted from Source / JSON / send. HUD selection is unchanged; this only controls what the **document** carries.

### A.2 User Status is not only a profile aspect

Keep `status` on `ChatProfilePanel` (it already exists). Also:

- Add `"status"` to `DEFAULT_INJECT` so turning inject on includes it.
- Plan import slice `status` can be on **even if** profile inject is off. Status is live condition; it should not require the whole profile bag.
- Method line continues to list enabled profile aspects. Status gets its **own section**, not a word in that list.

### A.3 Resolve highlights without a fifth store

A thin `usePlanCharacterHighlights()` in the mockup (not `@4eye/features`):

- `useCharacterStatus()`, `useCharacterSeedEffects()`, `useCharacterPerks()`, `useFeaturedPerkIds()`, `useProfileStore` — same hooks as `StatusStrip` / `CharacterSummaryCard`.
- Returns `{ want, moods, buffCount, buffLabels, featuredPerks, level, emotionLabel }`.
- `serializePlanMarkdown` / `serializePlanJson` take this object as optional `status` on `PlanExportContext`.

`@4eye/features` `ChatInputContextPayload` does not need the full character model. Status rides beside the payload the same way learning session title already does.

**Done when:** the plan paper has an Import row; User Status is a toggle; turning it on shows the Status strip; markdown/JSON include the same facts; profile inject default includes `status`.

---

## 5. Workstream B — Interactive paper uses highlights

**Files:** `PlanScratchPad.tsx`, `DailyGrids.tsx` (`StatusStrip` already exported), optionally a tiny `PlanStatusBlock.tsx` so the pad does not import the whole DailyGrids module graph.

### B.1 Status section

When `status` is imported and not compact-banner:

```
STATUS
[ Want  Em ] [ Mood  Angry ] [ Mood  Spirited ] [ Mood  Frustrated ] [ Buffs  8 ]
[ Perk  Perfect Speech ] … [ Perk  Aion.Amplify ]
```

Reuse `StatusStrip` (or extract `StatusChipRow` if the pad should not pull habit/buff grids). Same chips, same colors. Click-through: “Open profile” already exists on `ChatProfilePanel`; a quiet link under the strip is enough. Do not make the chips editable on the plan — the profile owns mood and perks.

### B.2 Summary highlight (not the card)

When `summary` is imported: one identity row — name, equipped title, LVL, emotion label. That is the Summary *highlight*. Do **not** mount `CharacterSummaryCard` (emotion channels, lens picker, attribute bars, routine). Those are the “full details” the ask excludes.

Compact banner (messages already flowing): one line `Em · Angry · 8 buffs · 8 perks` rather than the strip.

**Done when:** with Matthew selected and Status on, the empty-center paper shows the same Want / Mood / Buffs / Perks language as the profile dashboard, and the full Summary card is not on the page.

---

## 6. Workstream C — Text / Source is a first-class view

**Files:** `PlanScratchPad.tsx`, `planExport.ts`

Today text is a download. Make it a view.

- Masthead control: **Paper** | **Source** (persist `4eye.aiChat.plan.view`).
- **Paper** = current wiki (Workstream B).
- **Source** = read-only markdown of `serializePlanMarkdown` (live, same import slices), with Notes still editable underneath *or* the notes block already inlined in the markdown and edited via the HUD composer (current notes behavior). Do not invent a second markdown editor.
- Downloads stay. JSON remains the machine snapshot; markdown is the human briefing.

Status in text, matching the example:

```markdown
## Status

- Want: Em
- Mood: Angry, Spirited, Frustrated
- Buffs (8): Power.Max(), Aion.Amplify, …
- Perks: Perfect Speech, Perfect Content, Content Creation, Voice Optimized, Movement Optimized, Emotion Optimized, Acting Optimized, Aion.Amplify
```

JSON gets a `status` object with ids + labels so a later backend can inject without scraping chips.

**Done when:** you can switch Paper / Source without leaving the center, Source updates when a slice toggles, and download matches Source.

---

## 7. Out of scope

- Wiring a generation backend (transcript still mocks the assistant reply).
- Importing Brain (`StatusRAMPanel`) or the full Character lens into the paper.
- Making plan chips edit mood / perks / wants.
- Restyling `AISettingsPanel`.
- Dockview / resizable panels.
- PDF / print stylesheet (still deferred from the previous plan).

---

## 8. Implementation order

1. Slice model + Import chip row + persist on `PlanDraft` — paper hides/shows existing sections. No new data yet.
2. `usePlanCharacterHighlights` + Status section via `StatusStrip` + `status` on export context. Add `status` to `DEFAULT_INJECT`.
3. Summary highlight row (identity only).
4. Paper | Source toggle; Source is live `serializePlanMarkdown`.

---

## 9. Acceptance

- [ ] Plan masthead has import chips; **User Status** is one of them and defaults on.
- [ ] Interactive paper, Matthew profile: Want **Em**, moods **Angry / Spirited / Frustrated**, Buffs **8**, featured perks including Perfect Speech → Aion.Amplify — same language as the profile Status strip.
- [ ] Interactive paper does **not** mount `CharacterSummaryCard` or `StatusRAMPanel`.
- [ ] Source view shows a markdown briefing of the **imported** slices only; toggling Status off removes that section from Source and from `.md` / `.json` download.
- [ ] Send still attaches notes + selected HUD context; status highlights ride when the Status slice is on.
- [ ] Chat Profile default inject includes Status; the plan Status slice does not require inject to be on.
