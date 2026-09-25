# S1-G Refresh — 3-Stage Chained Edit Chain

This folder contains three sequential surgical edit seeds that transform `S1-G3` (current locked keyframe) into `S1-G.3-final` — the redesigned engagement-analytics frame used as the start frame for the `s1-g-engagement-animation` video clip.

## Chain overview

```
S1-G3 (existing keyframe, sceneCode=S1-G3)
  │
  ▼  seed: 01-bottom-left-vakl
  └─→ S1-G.1  (VAKL progress bars added to bottom-left)
        │
        ▼  seed: 02-bottom-right-coins-rewards
        └─→ S1-G.2  (Coins 817 + Rewards 12 added to bottom-right)
              │
              ▼  seed: 03-bottom-area-rpg-loadout
              └─→ S1-G.3-final  (RPG silhouette + VAKL gear icons in bottom-center)
                    │
                    ▼  seed: s1-g-engagement-animation (in seeds/videos/)
                    └─→ final animated clip
```

**Rule:** run each step, review in gallery, promote the winner, THEN run the next step. Do not attempt to run all three in parallel — each seed references the prior step's output via `sceneCode:`.

---

## Step-by-step promotion commands

### Step 1 — VAKL Bars (source: existing S1-G3)

```bash
# Source asset already has sceneCode=S1-G3 — no pre-tagging needed
pnpm -F @4eye/scene-studio-api cli seed:run 01-bottom-left-vakl --variations 2

# Review in gallery UI, then promote the best variation:
pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
  --to 03_alternates_and_iterations \
  --scene-code S1-G.1 \
  --star

# Demote loser(s):
pnpm -F @4eye/scene-studio-api cli asset:demote <loser-id> --to 03_alternates_and_iterations --unstar
```

### Step 2 — Coins + Rewards (source: S1-G.1)

```bash
pnpm -F @4eye/scene-studio-api cli seed:run 02-bottom-right-coins-rewards --variations 2

pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
  --to 03_alternates_and_iterations \
  --scene-code S1-G.2 \
  --star

pnpm -F @4eye/scene-studio-api cli asset:demote <loser-id> --to 03_alternates_and_iterations --unstar
```

### Step 3 — RPG Loadout → Final Keyframe (source: S1-G.2)

```bash
pnpm -F @4eye/scene-studio-api cli seed:run 03-bottom-area-rpg-loadout --variations 2

# Promote winner to 01_scene_keyframes (not alternates) — this is the final keyframe
pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
  --to 01_scene_keyframes \
  --scene-code S1-G.3-final \
  --star

pnpm -F @4eye/scene-studio-api cli asset:demote <loser-id> --to 03_alternates_and_iterations --unstar
```

### Sequence swap

```bash
# Replace the original S1-G3 in the canonical sequence with the new final keyframe
# (get S1-G.3-final asset ID from the gallery or from the promote output above)
pnpm -F @4eye/scene-studio-api cli seq:replace scene-1-master e5cc0072b97a1191 <S1-G.3-final-id>

# Verify
pnpm -F @4eye/scene-studio-api cli seq:show scene-1-master

# Health check
pnpm -F @4eye/scene-studio-api cli doctor
```

---

## Rollback

If any step produces unusable output, re-run that seed from the prior step's output:

```bash
# Example: rollback step 3 and retry
pnpm -F @4eye/scene-studio-api cli seed:run 03-bottom-area-rpg-loadout --variations 2
# Then promote the new winner with sceneCode S1-G.3-final --star (replaces old S1-G.3-final)
```

If you need to revert the sequence swap:
```bash
pnpm -F @4eye/scene-studio-api cli seq:replace scene-1-master <S1-G.3-final-id> e5cc0072b97a1191
```

---

## Pre-requisites (reference assets)

Before running any seed in this chain, ensure the following reference assets are imported and promoted with the correct scene codes:

| Asset | Source | Scene code to assign |
|---|---|---|
| VAKL composite reference sheet (all 4 VAKL glyphs) | Create manually as a 2×2 grid PNG | `MUI-GLYPHS-VAKL` |
| Brand coin SVG | `@expanse/brand-core/CoinIcon.tsx` → extract as `coin.svg` | `COIN-BRAND` |
| MUI Redeem outlined SVG | fonts.google.com/icons → Redeem, Outlined | `MUI-REDEEM-OUTLINED` |

```bash
# Promote composite VAKL sheet
pnpm -F @4eye/scene-studio-api cli asset:promote <vakl-sheet-id> --to 00_reference --star --scene-code MUI-GLYPHS-VAKL

# Promote coin SVG
pnpm -F @4eye/scene-studio-api cli asset:promote <coin-svg-id> --to 00_reference --star --scene-code COIN-BRAND

# Promote Redeem SVG
pnpm -F @4eye/scene-studio-api cli asset:promote <redeem-svg-id> --to 00_reference --star --scene-code MUI-REDEEM-OUTLINED
```
