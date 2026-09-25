# AI Chat Page Improve

> **Status:** Plan — ready to implement after review
> **Editor:** Aion
> **Surface:** `/appRealm/ai-chat` → `AiChatDashboard`
> **Pipelines:** Polish · UX · UI · concise · Vision · Color
> **Quality:** Perfect. **Accuracy:** 100% against current code.

The chat is the primary 4eye workbench. This pass makes dock the live default, turns Learn into a glanceable session for Expanse Vision, replaces the profile stub with a real chat-context panel, and lets the empty transcript hold a plan document before you ask.

---

## Current state (verified)

| Area | What ships today | Gap |
|------|------------------|-----|
| Layout | `usePersistedChoice("4eye.aiChat.layout", "dock")` already *codes* dock first | Prior `split`/`stack` in localStorage wins, so many sessions do not open on dock |
| Learn Input | `InputTypePicker` is a 120px-min card grid: icon + name + **blurb always visible** | Too loud for a 340px dock; details belong on hover |
| Special modalities | Custom / Private / Saved / Money are dashed **"Soon"** placeholders | ExpanseEye should show these as **unlocked**, marked with a crown |
| Session | Seed title `"Understand compound interest"`; `learningDirective()` always printed under it | Reads as random generated prose; sample should be **Expanse Vision**, directive only when expanded |
| Checklist | Pedagogy steps (define / formula / worked example / curve / teach-back) | Wrong lesson. Session is a **pre-flight** for the chat: Targets, Audience, Pipelines, AI Settings, Prompt Text, Theme, Purpose/Goals |
| Empty transcript | Icon + "AI Chat" + "Pick a domain…" | No way to write a plan/prompt *in the center* before sending |
| Profile dock | `AiChatViewport` mounts full `ProfilesTile` (8 views, maxWidth 720) + dark-hardcoded `ProfileContextBar` stub | Unusable at dock width; description still says "Profile context (stub)" |

Locked decisions from the Create→Chat unification plan still hold: no resize library, panels live beside the transcript in dock, chat remains the runner.

---

## Vision

One column of conversation. One dock of context. The empty center is either a hint **or** a document. Learn is a named lesson with a pre-flight checklist. Profile injects a chosen slice of the live character, not a second Profiles page.

Color: workbench indigo (`SOFT_INDIGO`) for chat chrome; learn emerald (`SOFT_EMERALD`) for the session; crown gold/amber for ExpanseEye unlock. No hardcoded `rgba(25,25,30)` islands — `useSurface` + `useInk` only.

---

## Workstream 1 — Dock is the default

**Files:** `workbenchLayouts.ts`, `AiChatDashboard.tsx`

- Bump persistence key to `4eye.aiChat.layout.v2` with fallback `"dock"`. Existing stored `split`/`stack` no longer override the new default.
- Keep all three layouts. `WORKBENCH_LAYOUTS` already lists `dock` first; leave the CycleControl.
- On first paint of `v2`, dock width stays `"dock"` (340px). Do not force `wide`.

**Done when:** a clean load (or any user with the old key) opens the workbench in dock, transcript full-height, Learn in the side column.

---

## Workstream 2 — Learn: Input, session, checklist, ExpanseEye crown

**Files:** `InputTypePicker.tsx`, `LearnDockPanel.tsx`, `LearningTile.tsx`, `ModalityGrid.tsx`, `model/types.ts`, `store/seed-data.ts`

### 2.1 Input types → name + icon + tooltip

`InputTypePicker` becomes a compact wrapping row (not `minmax(120px)` cards). Each type is icon + label only. `meta.blurb` moves to a MUI `Tooltip`. Active type keeps its accent ring; inactive stays quiet.

Same component serves the dock panel and the stack Learn tab — one change, both surfaces.

### 2.2 Session identity: Expanse Vision

Seed session:

```
id:    LEARN_EXPANSE_VISION
title: Expanse Vision
```

The session card shows **SESSION** + title always. The `learningDirective()` paragraph (pace/depth/modalities/next-step prose) is **collapsed by default**. Expand the card (chevron, same persistence pattern as `SectionDisclosure`) to read it. Collapsed meta can show `step n/total` only.

### 2.3 Checklist = pre-flight

Replace the compound-interest steps with:

1. Check Targets
2. Check Audience
3. Check Pipelines
4. Check AI Settings
5. Check Prompt Text
6. Check Theme
7. Check Purpose / Goals

Hints stay one line and point at the real HUD/dock control (e.g. Targets → targeting chips; Theme → AI settings / surface). Sending a message still ticks the active step (`complete-active-step`). Composer placeholder becomes the current check ("Check Targets…").

### 2.4 Custom / Private / Saved — crown, unlocked for ExpanseEye

These are the special modality tiles in `LEARNING_MODALITY_META` (`custom`, `private`, `saved`), currently `placeholder: true` with a "Soon" caption and dashed lock treatment.

For ExpanseEye:

- Drop `placeholder` (or set `unlockedBy: "expanse-eye"`).
- Replace Lock/Soon with a **crown badge** — use `SovereignPresenceGlyph` from `SkillGlyphs` at ~12–14px, amber/gold, tooltip **"Unlocked for ExpanseEye"**. Do not drop `LiquidCrown` (hero object) into a 84px tile.
- Solid border, full opacity, selectable like any other modality.
- **Money** stays a gated/premium tile unless product says otherwise (it is labeled "Premium / unlockable", not Custom/Private/Saved). Decision: leave Money dashed until pricing lands.

---

## Workstream 3 — Chat Profile panel (replace the stub)

**Files:** `AiChatViewport.tsx`, `AiChatDashboard.tsx`, `packages/@4eye/features/src/profile/*`, optionally a new `aiChat/workbench/ChatProfilePanel.tsx`

**Do not** mount `ProfilesTile` inside the dock. A 340px column cannot host eight profile views.

New `ChatProfilePanel`:

1. **Identity strip** — name, current role, level/emotion from `CharacterProfileStore` / `useProfiles` (same sources the Profile page uses). Compact, one row.
2. **Inject toggle** — existing `useProfileContext().settings.enabled`, restyled with `useSurface` (delete the dark `rgba(25,25,30)` Paper).
3. **Aspect chips** — `PROFILE_ASPECTS` as icon+label with tooltip descriptions. Enabled chips use the profile accent; disabled stay outlined.
4. **Acting as / active goal** — the two fields the stub already stores (`actingAsRole`, `activeGoalId`) but never renders. Small selects, not a second Profiles page.
5. **Injection preview** — one faint line: what the next prompt will carry (`profile (3)` already appears in `summarizeChatInputContext` when enabled).
6. **Open full profile** — link to the Profile route. The dock is a lens, not a clone.

Update the dock descriptor from `"Profile context (stub)"` to `"What of you rides on the next reply"`.

Theme: follow the workbench surface. No light-on-dark literals.

**Done when:** Profile in the dock is readable at 340px, toggles actually change the chat context summary, and opening the full Profiles page is one click away.

---

## Workstream 4 — Plan document in the empty center (dock layout)

**Files:** `AiChatTranscript.tsx`, `AiChatDashboard.tsx`, journal editor reuse (`JournalEditor` / a slim scratch wrapper)

> **Superseded by** [`ai-chat-plan-document.md`](./ai-chat-plan-document.md) — the empty center is a wiki of live selection, not a blank markdown file.

The empty state copy stays the contract: *Pick a domain, attach goals/projects, select context entities — then ask away.* Under it, dock layout gets a **Plan document** (alt: Journal scratch) control.

Behavior:

- Click loads a markdown document editor **into the transcript center** (not the dock, not a drop panel). Dock stays Learn/context.
- Title default: `Untitled plan`. Body is a free-form plan / prompt file.
- Reuse Journal markdown primitives (`MarkdownToolbar` + textarea + preview toggle). Do not invent a third editor. Kind: `note` tagged `plan` (or a thin `PlanScratchPad` that wraps those pieces without mounting the full Journal tile).
- While the scratch pad is open, the HUD composer still sends. On send, the document body is prepended to the user message context (visible on the bubble as `Plan: {title}` alongside the existing context summary).
- Close / collapse returns the empty hint if there are no messages; if there are messages, the pad becomes a collapsible banner above the transcript so the plan stays attached.
- Split/stack: same control, same center surface. Dock is the layout this is designed for.

**Done when:** in dock, with zero messages, you can open a plan, write it, pick domain/goals/entities, and send — the plan rides with the first message.

---

## Workstream 5 — Polish pass (concise, color, understanding)

After 1–4 land, one visual pass only:

- Input chips, modality tiles, checklist, profile chips, and empty-state CTAs share height (~22–26px chips, 11–13px labels).
- Crown gold is one token, used only on ExpanseEye unlock.
- Session card emerald wash stays; profile strip uses the workbench indigo so Learn and Profile do not look like the same panel.
- Empty state: one icon, one title, one sentence, two actions (Ask / Plan document). No extra paragraphs.
- `ProfileContextBar` hardcoded colors removed even if the new panel supersedes it (dead stub must not linger in stories).

---

## Out of scope

- Wiring a real AI backend (transcript still mocks the assistant reply).
- Voice/image/link/template composers beyond current mocks.
- Money modality unlock / pricing.
- Dockview / resizable panels (still deferred).
- Dumping CharacterTile or ProfilesTile into the dock.

---

## Implementation order

1. Layout key bump (dock default) — 15 min, no visual risk.
2. Seed + Input picker + session collapse + checklist copy — Learn reads correctly.
3. Crown unlock on Custom / Private / Saved.
4. ChatProfilePanel (largest UX win after Learn).
5. Plan scratch pad in the empty center.
6. Color/density polish.

---

## Acceptance

- [ ] Fresh load opens **dock** beside a full-height transcript.
- [ ] Learn Input types are icon + name; hover shows the blurb.
- [ ] Session title is **Expanse Vision**; directive text is hidden until expanded.
- [ ] Checklist is Targets, Audience, Pipelines, AI Settings, Prompt Text, Theme, Purpose/Goals.
- [ ] Custom, Private, Saved show a crown and are selectable (ExpanseEye unlocked).
- [ ] Profile dock is a compact inject panel, not ProfilesTile; theme-correct; summary updates when aspects change.
- [ ] Empty dock transcript has a Plan document control that loads an editor in the **center**; send attaches the plan to context.
