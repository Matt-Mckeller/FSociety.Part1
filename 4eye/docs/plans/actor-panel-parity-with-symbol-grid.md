# Plan: Actor Panel Parity in 4eye (from symbol-grid)

**Quality:** Perfect · **Testing:** Optimal · **Accuracy:** 100% · **Thinking:** Extra High  
**Status:** Ready for implementation  
**Source of truth (UX):** `ExpanseFrontend/apps/symbol-grid` actor HUD + Actors page  
**Destination:** `4eye` AI Chat targeting + docked Actors catalog

---

## 1. Goal

Recreate **symbol-grid’s actor-screen functionality inside 4eye**:

1. Same **HUD actor behavior** (assign / remove / clear / search / toggle from catalog).
2. A **Configure / Manage button** that opens the full Actors screen in 4eye.
3. A **scrollable** catalog view (HUD picker + docked Actors panel).
4. A **transparent matrix-style vibe** (glass, soft grid/scanlines, depth) while **keeping 4eye role colors** (Actors blue `#3b82f6`, Aim red `#ef4444`) — do **not** switch actor chrome to symbol-grid green.

---

## 2. Current state

### symbol-grid (reference)

| Surface | Path | Behavior |
|---------|------|----------|
| HUD Actor panel | `features/targeting/components/TargetingActorPanel.tsx` | Assigned chips, searchable scrollable popover of full catalog, Manage → Actors page, clear |
| Actors page | `features/targets/components/TargetsPage/TargetsPage.tsx` | CRUD, search, restore seeds, click card ↔ HUD sync |
| Seeds | `data/defaults/index.ts` | Everyone, TwitchUsers, Em, China, Russia, Vladimir Putin, Xi Jinping, Obama, … |

### 4eye (existing — extend, don’t rebuild)

| Surface | Path | Gap |
|---------|------|-----|
| Flanking Actor / Aim | `packages/@4eye/features/src/targeting/TargetingPanels.tsx` | Popper of chips only — no search, weak scroll, no Manage |
| Wiring | `apps/4eye-web-mockup/.../AiChatInputBar.tsx` | No `onManage` → dock |
| Catalog dock | `EntityListView` + `entity:targets` | Assign toggles only — no create/edit/delete/restore |
| Seeds | `context-data/defaults.ts` | Different set (Self, Mentor, America…); missing symbol-grid seeds |
| Glass tokens | `@expanse/theme` `glassEffect` | Good base; no matrix/grid overlay yet |

**4eye is already ahead** on Aim reticle, Who else / Included, simple↔full bar mode, and dock architecture. Work is **parity polish**, not a new system.

---

## 3. Design decisions (locked)

| Decision | Choice | Why |
|----------|--------|-----|
| Architecture | Extend `@4eye/features` targeting + context-data | Single package used by mockup; no duplicate UI |
| Color | Keep `TARGET_ROLE_META` blues/reds | User: “matrix vibe but keep the same color” |
| Matrix vibe | Transparent glass + subtle grid / vignette / scanline overlay using **role color alpha** | Atmosphere without rebranding |
| Configure entry | Gear / Manage on Actor (and Aim) panel → `entity:targets` dock | Matches symbol-grid Manage → Actors page |
| Seeds | **Merge** symbol-grid names into `DEFAULT_TARGETS` (stable ids) | Users see Everyone, TwitchUsers, Em, China, … without losing 4eye profiles |
| CRUD | Add manage mode on `EntityListView` (or sibling `ActorsManagerPanel`) | Dock is 4eye’s “Actors page” |
| Persistence | Existing targeting + context-data storage + merge-missing-defaults | Same pattern as symbol-grid hydration |

---

## 4. Visual spec — matrix glass (same colors)

Apply to **picker popper** and **docked Actors panel** (not global HUD chrome):

```
Background:  rgba(12, 18, 28, 0.72–0.85) + backdrop-filter: blur(12px)
Border:      1px solid alpha(roleColor, 0.35–0.45)
Overlay:     CSS repeating-linear-gradient grid at 3–4% opacity of role color
Optional:    faint vertical “rain” gradient mask (very low opacity)
Text/accents: role color (#3b82f6 actor / #ef4444 aim)
Scroll:      max-height ~360–420px; overflow-y auto; thin styled scrollbar
```

Reuse `@expanse/theme` `glassEffect` where possible; add a small `matrixGlass(roleColor)` helper next to targeting styles so both panels share one vibe.

---

## 5. Implementation plan (phased)

### Phase A — HUD picker parity (core UX)

**File:** `packages/@4eye/features/src/targeting/TargetingPanels.tsx`

1. Replace chip-only Popper content with:
   - Search field
   - Scrollable list of **full catalog** (assigned marked Active / selected)
   - Click = toggle add/remove (not add-only)
   - Empty + “no match” states
2. Add header actions:
   - Clear role assignments (when count > 0)
   - **Configure / Manage** (`Settings` icon) calling new `onManage?: () => void`
3. Apply matrix-glass styling with **existing role color**.
4. Keep compact column silhouette, Aim included lane, and `TargetingChip` API.

**File:** `apps/4eye-web-mockup/.../AiChatInputBar.tsx`

5. Pass `onManage={() => onOpenKind?.("targets")}` (or equivalent `handleOpenKind("targets")` from dashboard props) into both Actor and Aim `TargetingPanelView`s.
6. Ensure `onOpenKind` is plumbed from `AiChatDashboard` → input bar (reuse ContextBar path).

**Acceptance**

- [ ] `+` opens searchable, scrollable catalog of all actors
- [ ] Assigned items show Active; click toggles
- [ ] Manage opens docked Actors (`entity:targets`)
- [ ] Colors remain blue/red; glass looks transparent-matrix

---

### Phase B — Configure screen (Actors catalog CRUD)

**Files:**

- `packages/@4eye/features/src/context-data/EntityListView.tsx` (extend) **or** new `ActorsManagerPanel.tsx` used when `kind === "targets"`
- `packages/@4eye/features/src/context-data/ContextDataContext.tsx` (or equivalent) — ensure `add/update/remove` + `ensureDefaultTargets`

1. Scrollable list with search (already partial).
2. Create / Edit dialog: name, description, identifiers/labels, icon, avatar color, type.
3. Delete with confirmation; prune targeting assignments (existing prune or add).
4. **Restore seed actors** (merge by id, don’t overwrite edits).
5. Card/row click: toggle Actor (and optionally Aim) assignment — sync HUD.
6. Matrix-glass panel chrome in dock viewport for this kind only.
7. Title: **Actors**; subtitle: shared with chat HUD.

**Acceptance**

- [ ] From HUD Manage, dock shows full Actors screen
- [ ] Add / edit / delete / restore works and persists
- [ ] Assignments reflect immediately in flanking Actor panel
- [ ] Scroll + search work with long catalogs

---

### Phase C — Seed catalog merge

**File:** `packages/@4eye/features/src/context-data/defaults.ts`

Merge (stable ids, e.g. `target-everyone`, `target-twitch-users`, …):

- Everyone, Someone, Anyone  
- TwitchUsers, Em  
- China, Russia  
- Vladimir Putin, Xi Jinping, Obama  

Keep existing 4eye entries (Self, Mentor, Matthew, …). On load, **merge missing by id** (symbol-grid pattern) so old localStorage users get new seeds.

**Acceptance**

- [ ] Fresh + upgraded storage both show merged list
- [ ] Restore button re-adds only missing seeds

---

### Phase D — Polish & parity checklist

1. Clear actors control on HUD matches symbol-grid.
2. Keyboard: Esc closes picker; Enter on search focuses first result (nice-to-have).
3. Mobile: picker max-height / full-width safe.
4. Aim panel gets same picker UX (red matrix glass).
5. Docs comment: shared catalog = HUD + dock.

---

## 6. Testing plan (optimal)

### Unit / component

| Test | Covers |
|------|--------|
| Catalog filter by name/identifier/label | Search |
| Toggle assign/unassign updates targeting state | Picker |
| `onManage` fires once | Configure button |
| `ensureDefaultTargets` merges by id, no overwrite | Seeds |
| Delete target removes orphan assignments | CRUD + prune |

### Integration (mockup)

| Flow | Steps |
|------|-------|
| Happy path | Open chat → full bar → Actor `+` → search “Em” → assign → chip appears → Manage → dock lists Em In HUD |
| Restore | Delete China → Restore → China returns; edited Em name preserved |
| Persistence | Assign Everyone → reload → still assigned; catalog still merged |
| Aim parity | Same picker UX with red chrome |
| Regression | Who else, Included, simple mode, Tune/settings dock still work |

### Visual QA

- [ ] Glass blur readable over chat background  
- [ ] Grid overlay subtle (not noisy)  
- [ ] Scrollbar usable; list > 12 items scrolls  
- [ ] Blue/red unchanged vs current 4eye brand  

### Commands

```bash
# From 4eye repo
pnpm --filter @4eye/features test   # if present
pnpm --filter 4eye-web-mockup typecheck
# Manual: AiChat full mode flanking panels + entity:targets dock
```

---

## 7. Out of scope

- Porting symbol-grid’s multi-role model (subject/destination/environmental) wholesale  
- Home marketing `ConfigurePanel` / rail SettingsActionBar for actors  
- Replacing 4eye blue with symbol-grid green  
- Global Matrix theme for entire app  

---

## 8. Delivery order & risk

```
A (HUD picker + Manage) → C (seeds) → B (CRUD dock) → D (polish)
```

| Risk | Mitigation |
|------|------------|
| Dock API mismatch for `onOpenKind` | Trace `AiChatDashboard` props before coding; reuse ContextBar path |
| Storage shape drift | Merge-by-id only; never wipe user targets |
| Visual noise from matrix overlay | Cap opacity ≤ 4%; prefer CSS over canvas |

**Est. effort:** A+C ~0.5–1 day · B ~1 day · D + tests ~0.5 day  

---

## 9. Success criteria (done when)

1. User can select Everyone / TwitchUsers / Em / China / … from the HUD actor picker (scroll + search).  
2. Configure/Manage opens the 4eye Actors screen with the **same catalog**.  
3. User can create, edit, save, delete, and restore actors.  
4. UI has transparent matrix glass vibe **without** changing role colors.  
5. Automated + manual tests above pass.
