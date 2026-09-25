# Inventory Plan

> Canonical plan for the Inventory Page. Consolidated from the Expanse-Edu inventory ideation
> doc and the HUD inventory/rewards tasks. **Build surface:** `4eye-web-mockup` Tile + Storybook.

**Status:** Ideation → ready to implement (UI only; no backend logic yet).

---

## 1. Purpose

The inventory manages all items, resources, and collectibles a user earns, purchases, or receives —
organization, display, and (eventually) usage/trading — while keeping educational alignment.
UI-first: the actual reward logic, crafting, and trade backend come in a later iteration.

---

## 2. Categories (item taxonomy)

### Currency & Resources
- Primary currency (earned)
- Premium currency (purchased)
- Special tokens (event/achievement)
- Crafting materials

### Equipment & Items
- Cosmetic (avatar clothing, accessories)
- Functional (boosts, buffs, tools)
- Consumables (single-use)
- Permanent (non-consumable equipment)

### Collectibles
- Trading cards (educational collectibles)
- Badges & medals (achievement displays)
- Trophies (competition wins)
- Rare items (limited edition)

### Supplies
- Quest items (required for specific content)
- Learning materials (educational resources)
- Gifts (for sharing/giving)
- Mystery items (unopened boxes/packs)

---

## 3. Inventory Interface

### Organization
- Category tabs
- Search + filter
- Sort (rarity, date, name)
- Favorites marking
- Quick-access slots

### Item detail panel
- Name + icon
- Rarity indicator
- Description / lore
- Stats / effects
- Acquisition source
- Trade/gift eligibility

### Storage
- Base capacity
- Expandable storage (earned/purchased)
- Stack sizes for similar items
- Archive for unused items

---

## 4. Item Actions

| Group | Actions |
|-------|---------|
| Use / Equip | one-click activate, preview before use, confirm consumables, quick-swap loadouts |
| Transfer | trade with classmates, gift to friends, sell to store (buyback), destroy (confirm) |
| Combine / Craft | recipe crafting, material combining, upgrades, set-completion bonuses |

---

## 5. Educational Integration

- **Earning:** achievement rewards, quest completion, challenge success, attendance/participation, academic milestones.
- **Curriculum tie-in:** items relate to subjects — historical artifacts (history), scientific equipment (science), literary references (ELA), mathematical tools (math).

---

## 6. Technical Considerations (later phases)

- Data: efficient storage, quick retrieval, cross-device sync, backup/recovery.
- Security: duplication prevention, trade verification, rollback, audit logging.
- Scalability: large inventories, fast search/filter, pagination, lazy loading.

---

## 7. HUD Touchpoints (from hud-plan Part 6 / hud-tasks Task Set E)

- Backpack icon button on the HUD → opens inventory page/modal.
- Rewards button with notification chip/badge (count of unclaimed rewards).
- Item display system; visual feedback for gains (reuse Expanse "pushing progress" + experience-gain motifs).

---

## 8. Implementation Plan (4eye-web-mockup)

Follow the **`seeding` tile pattern** (`src/Tiles/seeding/`): `model/` (types, resolver), `store/` (fixture data + StubStore + Provider), `components/`, entry `*Tile.tsx`, `*.stories.tsx`.

```
src/Tiles/inventory/
├── model/
│   └── types.ts          # InventoryItem, ItemCategory, Rarity, etc.
├── store/
│   ├── seed-data.ts      # example inventory fixtures (all categories)
│   ├── InventoryStore.ts # StubStore
│   └── InventoryProvider.tsx
├── components/
│   ├── CategoryTabs.tsx
│   ├── ItemGrid.tsx
│   ├── ItemCard.tsx      # icon, rarity, favorite, quick actions
│   ├── ItemDetailPanel.tsx
│   └── InventoryToolbar.tsx  # search / filter / sort
├── InventoryTile.tsx
└── Inventory.stories.tsx
```

Reuse `components/visuals.tsx` (WeightMeter, StatusBadge, color helpers) and `@expanse/brand-core` rarity/level motifs rather than ad-hoc chips.

### Storybook variants (acceptance)
- Empty inventory
- Sparse (a few items)
- Full / dense (all categories, scroll + pagination)
- Single category filtered
- Item detail open (common vs rare vs mystery/unopened)
- Rewards-pending state (notification chip)
- Mobile/compact width

### Phase checklist
- [ ] `model/types.ts` + example seed data across all categories
- [ ] `InventoryProvider` (Context + useReducer)
- [ ] ItemCard + ItemGrid + CategoryTabs + Toolbar + DetailPanel
- [ ] `InventoryTile` assembled
- [ ] Wire into `appRealm` (replace/extend the relevant stub page)
- [ ] Storybook stories for every variant above
- [ ] `pnpm typecheck` clean for new files

---

## 9. Out of scope (now)

Real reward issuance, crafting recipes resolution, trade verification, store buyback economy, persistence/backend. UI shells + example data only.
