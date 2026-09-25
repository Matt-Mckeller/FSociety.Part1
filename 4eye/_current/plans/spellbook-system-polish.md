# Spellbook System — Next Polish Plan

**Surface:** Spellbook tile · Character spell panel · Bindings / loadout  
**After:** Matthew-aligned spells + glyphs (kept learn set)  
**Goal:** Make ~57 spells feel organized and castable, not like a stuffed library  

**Decisions (2026-08-09):** For you home · two-way binding sync · display lanes (keep category ids) · Healing folded into Love · Writing/Life/Quick Study under More.

---

## Status — Waves A–C implemented

| Wave | Work | Done |
|---|---|---|
| **A** | Lanes + subgroups + recommended sort + For you default | ✓ `model/lanes.ts`, SpellGrid, provider |
| **B** | Preset ↔ binding sync + cast/equip feedback | ✓ PresetSelector, Character `toggle-equip-spell`, SpellCard Equip |
| **C** | Study↔life framing + header/card/toolbar polish | ✓ SPELL_PAIRS, Spellbook header, lane filter, quieter Cast |

Still open (P3): mock context suggestion strip; category id renames.

---

## Feedback (honest)

**What already works**
- Learning lane is the clearest part of the book — compress / depth / anchor / challenge subgroups teach the mental model.
- Custom glyphs + Matthew commons (Plan · Act · Improve · Quality · Communicate · Bond · Play · Amplify…) finally match the character.
- Presets + binding templates are the right *idea*: modes beat infinite scroll.

**What hurt (addressed in this wave)**
1. Flat wall outside Learn → lane sections + subgroups.
2. Open into overwhelm → For you default (equipped ∪ Primary ∪ favorites ∪ weight≥85).
3. Two mode systems → Primary/Learn/Love sync with Bindings rose.
4. Lenses/Spellbook header → Spellbook-first.
5. Cast toast only → Equip + Save hints; Equip on character.
6. Outline vs Plan muddy → `SPELL_PAIRS` one-liners on cards.

---

## North star

1. **What should I cast now?** → For you  
2. **What’s in this mode?** → Primary · Learn · Love · Play · Power  
3. **What’s everything?** → All spells, by lane  

---

## Success check

1. Open Spellbook → For you, not 57 tiles.  
2. Learn / Love / Play / Power have subgroups.  
3. Primary in Bindings and Spellbook means the same set.  
4. Cast offers Equip / Save.  
5. Outline and Plan both exist with a pair note.  
6. Chrome stays quiet; glyphs carry identity.
