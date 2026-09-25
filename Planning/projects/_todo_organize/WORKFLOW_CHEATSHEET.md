# Workflow Cheat Sheet

**Keep open while working**

---

## Start Task

```bash
git checkout -b feature/name
touch CLEANUP_PLAN.md  # if needed
```

## Commit Changes

```bash
git add -A
git commit -m "type: summary

- Detail 1
- Detail 2"
```

**Types:** feat, refactor, cleanup, fix, docs, test, chore

## Checkpoint (After Phase)

```bash
git commit -m "Phase X Complete: Summary

✅ Done: item1, item2
Metrics: Before X → After Y
Next: Phase Y"
```

## Before Commit

```bash
npm run type-check && npm run lint && npm run build
```

## Good Commit Examples

```bash
✅ "refactor: Split auth into 3 modules
- Created authValidation.ts, authAPI.ts, authTypes.ts
- Updated 8 files, all tests pass"

❌ "update code" "fix stuff" "WIP"
```

## Common Commands

```bash
git status
git log --oneline -5
git push origin feature/name
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Merge to main
git checkout main && git merge feature/name
```

## Phase Checklist

```markdown
- [ ] Task 1
- [ ] Task 2
- [ ] Commit checkpoint
- [ ] Test
```

## Rules

**DON'T:**
- Commit to main directly
- Make giant commits
- Skip testing
- Use vague messages

**DO:**
- Commit frequently
- Write clear messages
- Update docs
- Test changes

---

**Full guides:** `docs/AI_WORKFLOW_PROMPT.md`, `docs/DEVELOPMENT_WORKFLOW.md`
