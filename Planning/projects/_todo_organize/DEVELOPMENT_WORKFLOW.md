# Development Workflow Guide

**Standard git workflow for all projects**

---

## Workflow Process

### 1. Planning

```bash
# Create plan if needed
touch CLEANUP_PLAN.md  # or IMPLEMENTATION_PLAN.md
```

**Plan should include:**
- Current issues
- Proposed changes in phases
- Checklists
- Expected metrics
- Testing strategy

### 2. Branch

```bash
git checkout -b feature/<name>    # New feature
git checkout -b refactor/<name>   # Restructure
git checkout -b cleanup/<name>    # Remove unused
git checkout -b fix/<name>        # Bug fix
```

### 3. Commit

**After each logical change:**

```bash
git add -A
git commit -m "type: summary

- Detail 1
- Detail 2
- Impact"
```

**Types:** feat, refactor, cleanup, fix, docs, test, chore

**Example:**
```bash
git commit -m "refactor: Split auth into 3 modules

- Created authValidation.ts, authAPI.ts, authTypes.ts
- Updated 8 files with new imports
- All tests pass, no behavior change"
```

### 4. Checkpoint (After Each Phase)

```bash
git commit -m "Phase X Complete: Summary

✅ Done: item1, item2, item3
Metrics: Before X → After Y  
Next: Phase Y
Testing: Passed"
```

### 5. Test & Merge

```bash
# Test
npm run type-check && npm run lint && npm run build

# Merge when ready
git checkout main
git merge feature/name
git push origin main
```

---

## Best Practices

### DO ✅
- Create branch for every task
- Commit after each logical change
- Write descriptive messages
- Test before committing
- Update docs as you go
- Use checkpoints between phases

### DON'T ❌
- Commit to main directly
- Make giant commits (50+ files)
- Use vague messages ("fix stuff")
- Skip testing
- Save docs for "later"

---

## Commit Message Guide

### Good Format
```
type: Short summary (50 chars)

- Bullet point details
- What changed
- Why it changed
- Impact or breaking changes
```

### Good Examples
```bash
✅ feat: Add login rate limiting
- Added rate limiter middleware
- Configured 5 attempts per 15min
- Added tests for rate limit scenarios

✅ refactor: Extract user validation
- Created userValidation.ts (120 lines)
- Removed duplicate validation in 6 files
- All existing tests pass

✅ fix: Prevent memory leak in WebSocket
- Added cleanup in useEffect return
- Closes connections on unmount
- Fixes issue #234
```

### Bad Examples
```bash
❌ "update code"
❌ "fix"
❌ "WIP"
❌ "changes"
```

---

## Working with AI

**Initial prompt:**
```
Follow standard workflow:
- Branch: feature/<name>
- Small commits with good messages
- Create plan with phases/checklists
- Test after changes
- Checkpoint after each phase
- Update docs as you go

Breaking changes OK (no production). Ask questions first.
```

**Mid-task reminder:**
```
Reminder: Commit after each change, update plan checklist, test.
```

---

## Plan Template

```markdown
# [Feature] Plan

## Issues
1. Issue 1
2. Issue 2

## Phases

### Phase 1: Name
- [ ] Task 1
- [ ] Task 2
- [ ] Commit checkpoint
- [ ] Test

### Phase 2: Name
- [ ] Task 1
- [ ] Task 2
- [ ] Commit checkpoint
- [ ] Test

## Metrics
Before: X
After: Y

## Testing
- [ ] Type check
- [ ] Lint
- [ ] Build
- [ ] Manual tests
```

---

## Common Commands

```bash
# Branch
git checkout -b feature/name

# Status
git status
git log --oneline -10

# Commit
git add -A
git commit -m "message"

# Push
git push origin feature/name

# Merge
git checkout main
git merge feature/name

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See changes
git diff
```

---

## Tips

1. **Small commits** - Easy to understand and revert
2. **Good messages** - Your future self will thank you
3. **Test early** - Catch issues immediately
4. **Branch often** - Branches are free, use them
5. **Document now** - Don't wait

---

**More info:** See `AI_WORKFLOW_PROMPT.md` and `WORKFLOW_CHEATSHEET.md`
- `fix:` Bug fix
- `docs:` Documentation only
- `test:` Adding/updating tests
- `chore:` Build, dependencies, tooling

**Example Commits:**

```bash
# ✅ Good: Specific, testable
git commit -m "refactor: Split claudeClient.ts into 5 focused modules

- Created ai/claudeService.ts (300 lines) - Claude API calls
- Created ai/geminiService.ts (200 lines) - Gemini API calls  
- Created ai/responseParser.ts (350 lines) - JSON parsing
- Created ai/prompts.ts (180 lines) - System prompts
- Created ai/shared.ts (120 lines) - Utilities & constants
- Updated 8 files with new imports
- All type checks pass, no runtime changes"

# ✅ Good: Clear what changed
git commit -m "cleanup: Remove console.log statements

- Replaced 27 console.log/warn/error with logger
- Created utils/logger.ts with level-based logging
- Updated claudeService, geminiService, page.tsx
- Logs now filterable by level (DEBUG/INFO/WARN/ERROR)"

# ❌ Bad: Too vague
git commit -m "fix stuff"

# ❌ Bad: Too many unrelated changes
git commit -m "fix bugs and add features and refactor"
```

### Phase 3: Checkpoint Commits

**After Each Major Milestone:**

```bash
git add -A
git commit -m "Phase 1 Complete: Critical Cleanup

✅ Phase 1 Checklist:
- [x] Remove duplicate components
- [x] Split large files
- [x] Update imports
- [x] Update documentation
- [x] Test all changes

Metrics:
- Files: 15 -> 22 (better organized)
- Largest file: 1,156 -> 350 lines (70% reduction)
- Console logs: 27 -> 0 (replaced with logger)
- Duplicate code: 349 lines removed

Next: Phase 2 - Code Quality improvements

Testing: Manual testing required before merge"
```

### Phase 4: Documentation

**Always Update Documentation:**

1. **Update Plan Document**
   ```markdown
   ## 📋 Checklist
   
   ### Phase 1: Critical Cleanup
   - [x] Delete duplicate components
   - [x] Split large files  
   - [x] Update imports
   - [x] Commit changes
   ```

2. **Create Completion Summary (Optional for large projects)**
   ```bash
   touch PHASE_1_COMPLETE.md
   ```
   
   Include:
   - What was done
   - Metrics/measurements
   - Testing notes
   - Next steps

3. **Update README if needed**
   - New architecture
   - Changed file structure
   - Updated setup instructions

### Phase 5: Testing

**Test After Each Phase:**

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Run tests
npm test

# Manual testing checklist
# - [ ] Feature A works
# - [ ] Feature B works
# - [ ] No console errors
```

### Phase 6: Merge

**When Ready to Merge:**

```bash
# 1. Make sure you're up to date with main
git checkout main
git pull origin main

# 2. Merge main into your branch
git checkout feature/your-branch
git merge main
# Resolve any conflicts

# 3. Final test
npm run build
npm test

# 4. Push your branch
git push origin feature/your-branch

# 5. Create Pull Request (or merge directly if solo)
# If solo and confident:
git checkout main
git merge feature/your-branch
git push origin main

# If team project: Create PR via GitHub/GitLab
```

---

## 🤖 Working with AI Assistants

### Initial Instructions Template

**Copy/paste this when starting a new task with AI:**

```
I want to follow a structured development workflow for this project:

BRANCHING STRATEGY:
1. Create a feature branch: feature/<descriptive-name>
2. No direct commits to main
3. Merge only when phase is complete and tested

COMMIT STRATEGY:
1. Make small, atomic commits after each logical change
2. Use descriptive commit messages with format:
   <type>: <short summary>
   
   <detailed description>
   - bullet points
   - impact notes

3. Create checkpoint commits after each phase
4. Include metrics in phase completion commits

DOCUMENTATION:
1. Create/update plan documents (CLEANUP_PLAN.md, etc.)
2. Update checklists as work progresses
3. Create phase completion summaries for major milestones
4. Update README if architecture changes

TESTING:
1. Test after each significant change
2. Run type-check, lint, build before committing
3. Document testing requirements

BREAKING CHANGES:
- Breaking changes are acceptable if documented
- No production code yet, so refactor freely
- But document all breaking changes

Please follow this workflow throughout the project.
```

### Mid-Project Reminder

```
Remember to:
- Commit after each logical change
- Use descriptive commit messages
- Update the plan document checklist
- Test after each phase
- Create checkpoint commits at phase boundaries
```

### Example Interaction

**You:** "Let's clean up the lottie naming tool code"

**AI:** *Creates CLEANUP_PLAN.md with analysis*

**You:** "Go"

**AI:** 
1. Creates branch: `feature/lottie-tool-cleanup`
2. Removes duplicate component → Commits
3. Splits large file → Commits
4. Updates imports → Commits
5. Tests everything
6. Creates checkpoint commit: "Phase 1 Complete"
7. Updates CLEANUP_PLAN.md checklist

---

## 📁 Project Structure

### Where to Put Plans

```
/your-project-root/
  docs/
    DEVELOPMENT_WORKFLOW.md  (this file - copy to each project)
    
  /feature-or-module/
    CLEANUP_PLAN.md          (specific plans)
    REFACTOR_PLAN.md
    IMPLEMENTATION_PLAN.md
    PHASE_1_COMPLETE.md      (completion summaries)
    README.md                (feature docs)
```

### Documentation Hierarchy

1. **Root README.md** - Project overview
2. **DEVELOPMENT_WORKFLOW.md** - This guide
3. **Feature Plans** - Specific to feature/module
4. **Phase Summaries** - What was accomplished
5. **Feature READMEs** - How to use the feature

---

## ✅ Checklist Template

**Copy this for any cleanup/refactor task:**

```markdown
# [Feature Name] - [Task Type] Plan

**Date:** YYYY-MM-DD  
**Status:** [Planning / In Progress / Complete]

## Current State
- Issue 1
- Issue 2
- Issue 3

## Proposed Changes
1. Change 1
2. Change 2
3. Change 3

## Phases

### Phase 1: [Name]
- [ ] Task 1
- [ ] Task 2
- [ ] Commit: "Phase 1: [description]"
- [ ] Test everything still works

### Phase 2: [Name]  
- [ ] Task 1
- [ ] Task 2
- [ ] Commit: "Phase 2: [description]"
- [ ] Test everything still works

## Testing Strategy
- [ ] Manual test checklist
- [ ] Type check passes
- [ ] Lint passes
- [ ] Build succeeds
- [ ] Unit tests pass

## Metrics
- Before: X lines, Y files
- After: A lines, B files
- Improvement: % reduction

## Rollback Plan
Branch: feature/[name]
Last known good commit: [sha]
```

---

## 🎓 Best Practices

### DO ✅

- **Create a branch** for every non-trivial change
- **Commit frequently** - after each logical unit of work
- **Write descriptive commits** - future you will thank you
- **Update documentation** as you go
- **Test after each phase** - don't accumulate untested changes
- **Use checklists** - satisfying to check things off!
- **Include metrics** in completion commits
- **Keep commits focused** - one concern per commit

### DON'T ❌

- **Don't commit to main** directly (unless hotfix)
- **Don't make giant commits** with unrelated changes
- **Don't skip documentation** updates
- **Don't merge untested code** 
- **Don't use vague messages** like "fix stuff"
- **Don't let branches live too long** (>1 week usually)
- **Don't forget to push** your branch (backup!)

---

## 🚀 Quick Reference

### Common Commands

```bash
# Start new task
git checkout -b feature/my-feature
touch IMPLEMENTATION_PLAN.md

# After each logical change
git add -A
git commit -m "descriptive message"

# After phase completion
git add -A  
git commit -m "Phase X Complete: Summary

✅ Checklist items
Metrics: ...
Next: ..."

# Check status
git status
git log --oneline

# Push branch (backup + share)
git push origin feature/my-feature

# Merge to main (when done)
git checkout main
git merge feature/my-feature
git push origin main
```

### Workflow Diagram

```
Planning → Branch → Change → Test → Commit
   ↓                             ↑
   ↓                             |
   └─────── Repeat ──────────────┘
            ↓
       Phase Complete
            ↓
       Checkpoint Commit
            ↓
       Update Docs
            ↓
       Test Everything
            ↓
       Merge to Main
```

---

## 📚 Additional Resources

### Git Best Practices
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Branch Naming](https://deepsource.io/blog/git-branch-naming-conventions/)

### Documentation
- [Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/)
- [Markdown Guide](https://www.markdownguide.org/)

---

## 🔄 Updating This Guide

This is a living document. Update it when you:
- Discover better practices
- Add new project types
- Learn from mistakes
- Find useful patterns

**Last reviewed:** October 17, 2025  
**Next review:** When starting next major project

---

## 💡 Pro Tips

1. **Commit Messages are Documentation** - Write them as if explaining to your future self or team
2. **Branch Names Tell Stories** - Use descriptive names that explain the purpose
3. **Small Commits = Easy Rollbacks** - If something breaks, you can revert just that change
4. **Documentation is Code** - Treat plans and READMEs with same care as code
5. **Test Before Commit** - Save yourself from "oops" moments
6. **Checkpoints Save Time** - Phase completion commits are natural pause points
7. **Branches are Cheap** - Don't be afraid to create them
8. **Git is Your Time Machine** - Every commit is a snapshot you can return to

---

**Remember:** The goal is sustainable, maintainable progress. These practices might seem like overhead at first, but they save massive amounts of time when debugging, reviewing, or onboarding others.

Happy coding! 🚀
