# 4eye Plan Document

> **Status:** Implemented — review in the workbench
> **Surface:** `/appRealm/ai-chat` empty center → wiki of live selection
> **Supersedes:** `ai-chat-page-improve.md` Workstream 4 (scratch-pad textarea)
> **Follow-on:** [`plan-document-dual-surface.md`](./plan-document-dual-surface.md) — User Status import, Paper vs Source, highlight-only interactive page

The chat already *has* a plan control. It opens a blank markdown file. The thing you actually need to see before you ask is everything already selected — actors, audiences, targets, goals, domain, pipelines, settings — laid out as a page, with a notes block you can format.

---

## Problem

| Today | Gap |
|-------|-----|
| `PlanScratchPad` is title + textarea + preview | Selected context is a one-line HUD summary, never a document |
| Empty center is an icon and a sentence | No way to *see* the prompt you are about to send |
| Bottom orbs default `lg` + labels-below, *and* the global HUD orb bar still mounts | Two fat orb rows eat the transcript |
| Full targeting bar is `[Audiences][Actors][Composer][Targets]` | Audiences belong on the right (who watches), all three columns are identical stadium pills |

---

## Vision

The empty transcript **is** the Plan Document: a wiki page of the live payload, not a PDF, not a second editor. Notes sit at the bottom of that page with the existing journal markdown toolbar. Send still runs from the HUD composer; the document is the briefing.

Cast on the page matches the bar: **Actors → Targets → Audiences**.

Color: workbench indigo for the paper chrome; role colors from `TARGET_ROLE_META` and `ENTITY_KIND_BY_KEY`. `useSurface` only — no dusk islands inside the paper.

---

## Workstream A — Plan Document (center)

**Files:** `workbench/PlanScratchPad.tsx`, `AiChatDashboard.tsx`, `AiChatTranscript.tsx`

The pad becomes a scrollable **paper** (max ~720px, wiki article rhythm):

1. **Masthead** — editable title (`Untitled plan`), overline `Plan document`, close.
2. **Cast** — three columns, same order as the HUD: Actors · Targets · Audiences. Glyph + name. Empty column shows a quiet em dash, so missing cast is visible.
3. **Direction** — domain chip, selected goals, selected projects.
4. **World** — locations, stories, scenes, sequences, animations (omit empty groups).
5. **Method** — pipelines (order = flow), enabled context actions, learning session title + step, profile aspects if inject is on, AI settings in one line (`accuracy · thinking · plan`).
6. **Notes** — `MarkdownToolbar` + textarea. Preview of notes renders *in the paper* under the heading, wiki-style. Not a mode that hides the rest of the page.

Live: every section reads `useChatInputContext().payload` (+ `useLearning()` for the session). Changing a HUD chip rewrites the page.

**Empty state:** `planOpen` defaults **true**. Close returns the short hint + “Plan document” control. After send, notes collapse to `PlanBanner` above the transcript.

**Send:** notes still attach as `Plan: {title}` on the user bubble. Selected entities already ride in `contextSummary`.

Reuse journal primitives. Do not mount Journal tile / store.

**Done when:** with zero messages you see a readable page of whatever is selected, you can format notes on that page, and sending still works.

---

## Workstream B — Orbs + AI Settings dock

**Files:** `AiChatActionBar.tsx`, `AiChatDashboard.tsx`, `AiChatViewport.tsx`, `workbench/ChatSettingsPanel.tsx`

- Hide the global HUD orb bar on this screen (`useRegisterHudChromeHide({ hide: ["bottomOrbBar"] })`).
- Chat orbs: `orbSize="xs"`, `showOrbLabels={false}`, `spacing={4}`, `padding={4}`, `orbVariant="glass"`. Icon-only; label on hover via existing `labelMode="hover"`.
- New dock panel **AI Settings** (dock layout). Body: compact quick actions (New Chat, Clear context) + `AISettingsPanel` in a scroll column. Settings orb opens this panel instead of the overlay that sits on the transcript.
- Split / stack keep the existing overlay (no settings dock there).

**Done when:** dock chat has one thin orb row and settings live in the sidebar.

---

## Workstream C — Audiences / Actors / Targets (full bar + lists)

**Files:** `AiChatInputBar.tsx`, `TargetingPanels.tsx`, `TargetingChip.tsx`, `EntityListView.tsx`

Full bar order:

```
[Actors]  [Composer]  [Targets]  [Audiences]
```

Shape language (stop using `borderRadius: 99` for all three):

| Role | Silhouette | Color |
|------|------------|-------|
| Actor | left-heavy (`20px 6px 6px 20px`) — who speaks | `TARGET_ROLE_META.actor` blue |
| Target | right-heavy (`6px 20px 20px 6px`) — who receives | `TARGET_ROLE_META.target` red |
| Audience | rounded rect (`8px`) — who watches, **right edge** | `ENTITY_KIND_BY_KEY.audiences` green |

Chips show **glyph + name**, not initial-only avatars. Add popper and overflow (`+N`) stay. Stretch columns to the composer height so the bar reads as one instrument.

`EntityListView` for `targets` / `audiences`: card rows; Actor/Target become shaped role toggles (not a pair of raw checkboxes); audience rows show member count.

**Done when:** Full mode reads left-to-right as speaker → ask → recipient → watchers, and the dock lists match that language.

---

## Out of scope

- Real PDF export / print stylesheet.
- Wiring a generation backend.
- Restyling `AISettingsPanel` tokens (still dusk; contained in the dock).
- Dockview / resizable panels.
- User Status highlights, import-slice picker, and Paper vs Source — see [`plan-document-dual-surface.md`](./plan-document-dual-surface.md).

---

## Acceptance

- [ ] Empty dock transcript opens on a wiki page of live selection, not a blank textarea.
- [ ] Notes format with bold / heading / list / task; they stay on the same page as the cast.
- [ ] Default HUD orbs are hidden on AI chat; remaining orbs are xs and unlabeled.
- [ ] AI Settings is a dock panel in dock layout.
- [ ] Full bar is Actors · Composer · Targets · Audiences, each with a distinct silhouette.
