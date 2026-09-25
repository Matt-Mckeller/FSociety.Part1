# Quick Actions System Plan

## Philosophy

Quick actions are **workflow modifiers** that tell the AI how to approach a task, not what domain knowledge to use. They're orthogonal to the instruction files (frontend-patterns, design-system, etc).

**Key insight**: The same task (e.g., "add a button component") can be done:
- **Fast**: Just make it work, minimal polish
- **Balanced**: Standard quality, reasonable coverage
- **Deep**: High quality, edge cases, documentation

---

## Tier System

Instead of 4 separate axes (Accuracy, Time, Planning, Quality), use 3 tiers that bundle these together:

| Tier | Accuracy | Time | Planning | Quality | Use When |
|------|----------|------|----------|---------|----------|
| **Fast** | Good enough | Minimal | Skip | 80% | Prototyping, exploration, quick fixes |
| **Balanced** | Good | Moderate | Standard | Production-ready | Most work |
| **Deep** | High | Extended | Comprehensive | Polished | Critical paths, architecture, releases |

---

## Quick Actions Matrix

| Action | Fast | Balanced | Deep |
|--------|------|----------|------|
| **Plan** | Bullet outline | Structured plan | Full analysis |
| **Prioritize** | Quick rank | Weighted criteria | Impact analysis |
| **Improve** | Quick fixes | Refactor pass | Comprehensive upgrade |
| **Review** | Spot check | Standard review | Deep audit |
| **Test** | Happy path | Coverage targets | Edge cases + stress |
| **Design** | Sketch/wireframe | Detailed design | Full spec |
| **Implement** | Make it work | Clean code | Production-grade |

---

## File Structure

```
.vscode/prompts/
├── quick-actions/
│   ├── plan/
│   │   ├── fast.prompt.md
│   │   ├── balanced.prompt.md
│   │   └── deep.prompt.md
│   ├── prioritize/
│   │   ├── fast.prompt.md
│   │   └── deep.prompt.md
│   ├── improve/
│   │   ├── fast.prompt.md
│   │   └── deep.prompt.md
│   ├── review/
│   │   ├── fast.prompt.md
│   │   └── deep.prompt.md
│   ├── test/
│   │   ├── fast.prompt.md
│   │   └── deep.prompt.md
│   ├── design/
│   │   ├── fast.prompt.md
│   │   └── deep.prompt.md
│   └── implement/
│       ├── fast.prompt.md
│       └── deep.prompt.md
└── workflows/
    └── plan-documentation.prompt.md
```

**Why this structure?**
- Each action type gets a folder
- Tiers are files within the folder
- Clear naming: `@plan/fast`, `@plan/deep`
- Easy to add new tiers or actions

**Alternative (flat):**
```
plan-fast.prompt.md
plan-deep.prompt.md
```
Simpler but less organized as count grows.

---

## Usage Pattern

User calls: `@plan/fast add auth to mobile app`

AI receives prompt that:
1. Sets the mode (fast = minimal overhead)
2. Guides approach (bullet outline, skip edge cases)
3. User provides the actual task

---

## Plan Documentation Action

Separate from quick actions — this is about **where/how to document plans**.

**References existing patterns:**
- Plan location: `docs/planning/plans/`
- Template: Status, Source, Related headers
- Status values: Planned, In Progress, Complete
- Links to MasterPlan

---

## Action Content Guidelines

Each prompt file should be:
- **Under 20 lines** (concise)
- **No domain knowledge** (that's in instructions)
- **Clear mode setting** (what tier means)
- **Actionable guidance** (what to do/skip)

---

## Implementation Order

1. Create folder structure
2. Create `plan/` variants (most used)
3. Create `plan-documentation.prompt.md` (workflow)
4. Create remaining quick actions
5. Test and refine

---

## Open Questions

1. **Balanced tier**: Include or skip? (Could default to balanced behavior without explicit prompt)
   - Recommendation: Skip balanced, just have fast/deep as explicit modifiers

2. **Naming**: `fast.prompt.md` vs `quick.prompt.md` vs `light.prompt.md`?
   - Recommendation: `fast` and `deep` (clear, short)

3. **Flat vs nested**: `plan-fast.prompt.md` vs `plan/fast.prompt.md`?
   - Recommendation: Nested (scales better)
