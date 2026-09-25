# AI Workflow Prompt

**Copy-paste templates for AI assistants**

---

## Standard Prompt

```
Follow this workflow:

BRANCHING:
- Create feature branch: feature/<name>
- Never commit to main
- Merge when complete and tested

COMMITS:
- Small, atomic commits after each change
- Format: "type: summary\n\ndetails"
- Types: feat, refactor, cleanup, fix, docs, test
- Checkpoint after each phase with metrics

DOCS:
- Create/update plan (CLEANUP_PLAN.md, etc)
- Check items as done
- Update README if needed

TESTING:
- Test after changes
- Run type-check, lint, build before commits

Breaking changes OK (no production code). Ask questions before starting.
```

---

## Task Templates

### Cleanup/Refactor

```
Clean up [feature]. Please:
1. Branch: feature/[name]-cleanup
2. Analyze and create CLEANUP_PLAN.md:
   - Issues found
   - Phases with checklists
   - Metrics/outcomes
3. Ask approval
4. Execute with commits per change
5. Checkpoint after each phase
6. Update checklist
```

### New Feature

```
Implement [feature]. Please:
1. Branch: feature/[name]
2. Create IMPLEMENTATION_PLAN.md
3. Ask questions
4. Implement with frequent commits
5. Test each component
6. Document in README
```

### Bug Fix

```
Fix [bug]. Please:
1. Branch: fix/[name]
2. Explain root cause
3. Propose solution
4. Implement with test
5. Commit: "fix: [description]"
6. Verify fix
```

---

## Reminders

**If forgetting workflow:**
```
Reminder: Commit after each change, use good messages, 
update plan, test after phases.
```

**If commits too large:**
```
Break into smaller commits. Each should change one thing,
be testable, and revertable.
```

---

## Good Commit Examples

```bash
refactor: Split auth into 3 modules
- Created authValidation.ts, authAPI.ts, authTypes.ts
- Updated 8 files, all tests pass

cleanup: Remove 27 console.log statements
- Created utils/logger.ts with levels
- Updated claudeService, page.tsx
- Logs now filterable

fix: Prevent double-submit on login
- Added isSubmitting state
- Disabled button while loading
- Fixes #123
```

**Bad:** "update code", "fix stuff", "WIP"

---

**Full guide:** `docs/DEVELOPMENT_WORKFLOW.md`
