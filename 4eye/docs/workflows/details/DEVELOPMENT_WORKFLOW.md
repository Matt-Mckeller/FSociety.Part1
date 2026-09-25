# Development Workflow

Concise guide for development process, AI collaboration, and procedures.

---

## Core Workflow

```
Plan → Think → Build → Review → Test → Ship
```

---

## 1. Planning

### Starting a New Feature
1. Check if plan exists in `docs/planning/plans/`
2. Read plan thoroughly
3. Identify dependencies
4. Break into small tasks

### Creating a Plan
1. Use existing plan as template
2. Include: Overview, Requirements, Implementation, Testing
3. Keep it concise but complete
4. Review with team (if applicable)

### Plan Templates
- **Features**: `docs/planning/plans/app-features/[name].md`
- **Core**: `docs/planning/plans/core/[name].md`
- **Infrastructure**: `docs/planning/plans/infrastructure/[name].md`

---

## 2. Thinking

### Before You Code
- **Spend time thinking** — quality over speed
- Understand the problem deeply
- Consider edge cases
- Plan the approach mentally

### AI Collaboration
When working with AI assistants:
- **Give context**: Share relevant files and requirements
- **Ask to think**: Request analysis before implementation
- **Iterate**: AI should ask questions, not assume
- **Review carefully**: AI makes mistakes, verify outputs

### Decision Points
- **Architecture**: Will this scale? Is it maintainable?
- **Security**: Any vulnerabilities? PII handling correct?
- **Performance**: Will this be fast enough?
- **UX**: Is this intuitive? Accessible?

---

## 3. Building

### Setup
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# In another terminal, start API
cd apps/api && npm run start:dev
```

### Code Standards
- Follow `docs/technical/TECHNICAL_STANDARDS.md`
- Keep logic separate from views
- Write modular, reusable code
- Use TypeScript strict mode

### Commit Often
```bash
# Stage changes
git add .

# Commit with clear message
git commit -m "feat: add room creation flow"

# Push to branch
git push origin feature/room-creation
```

### Commit Message Format
```
type: brief description

[optional body with details]

[optional footer with issue references]
```

**Types**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`

---

## 4. Review

### Self Review
- [ ] Read your own code
- [ ] Check for console.logs
- [ ] Verify error handling
- [ ] Test happy path + edge cases
- [ ] Run type check: `npm run type-check`
- [ ] Check for unused imports

### Code Review (if team)
- **Keep PRs small**: < 400 lines
- **Write good descriptions**: What, why, how
- **Respond to feedback**: Be open to suggestions
- **Approve when ready**: Don't rubber-stamp

### Quick Review Checklist
```bash
# See what changed
git diff main

# Check types
npm run type-check

# Lint
npm run lint

# Manual test
npm run dev
```

---

## 5. Testing

See [TESTING_PROCEDURES.md](TESTING_PROCEDURES.md) for full details.

### Quick Tests
- [ ] Feature works as expected
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Responsive on mobile (if UI)

### Before Merge
- [ ] All checks pass
- [ ] Tested in clean environment
- [ ] Documentation updated
- [ ] No breaking changes (or noted)

---

## 6. Shipping

### Merge to Main
```bash
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Merge feature branch
git merge feature/your-feature

# Push
git push origin main
```

### Deploy
- **Development**: Auto-deploys from main
- **Staging**: Manual or auto from main
- **Production**: Manual after staging verification

### Post-Deploy
- [ ] Verify feature works in deployed environment
- [ ] Monitor logs for errors
- [ ] Check analytics for usage
- [ ] Document any issues

---

## AI Implementation Summaries

### When to Generate
- Completed a plan implementation
- Major refactoring work
- Significant architecture changes

### How to Enable
Add to plan file or create config:
```yaml
# In plan frontmatter
generateSummary: true
summaryPath: docs/summaries/C2-authentication-summary.md
```

Or in `ai-config.json`:
```json
{
  "generateSummaries": true,
  "summaryPath": "docs/summaries/"
}
```

### Summary Contents
Keep concise, include:
- **What**: Feature/plan implemented
- **Files Changed**: List of modified files
- **Key Decisions**: Important choices made
- **Testing**: How it was verified
- **Next Steps**: Follow-up work needed

### Summary Template
```markdown
# [Feature Name] Implementation Summary

**Plan**: [Plan Code - e.g., C2]
**Date**: 2026-03-26
**Status**: ✅ Complete

## Overview
Brief description of what was built.

## Files Changed
- apps/4eye-web/components/...
- packages/@4eye/core/src/...

## Key Decisions
1. Decision and rationale
2. Another decision

## Testing
How it was verified.

## Next Steps
- [ ] Follow-up task 1
- [ ] Follow-up task 2
```

---

## Quick Actions Reference

### Start Working
```bash
git checkout -b feature/name
npm install
npm run dev
```

### Check Quality
```bash
npm run type-check
npm run lint
git diff
```

### Review Changes
```bash
git status
git diff
git log --oneline -10
```

### Test Build
```bash
npm run build
npm start
```

### Clean Up
```bash
rm -rf .next
rm -rf node_modules
npm install
```

### Commit & Push
```bash
git add .
git commit -m "type: description"
git push origin branch-name
```

---

## Common Issues

### TypeScript Errors
1. Run `npm run type-check`
2. Check import paths
3. Verify tsconfig.json paths are correct
4. Clear cache: `rm -rf .next`

### Dev Server Won't Start
1. Check port 3000 is free: `lsof -i :3000`
2. Kill process: `kill -9 [PID]`
3. Delete `.next`: `rm -rf .next`
4. Reinstall: `rm -rf node_modules && npm install`

### Git Issues
1. Stash changes: `git stash`
2. Pull latest: `git pull origin main`
3. Pop stash: `git stash pop`
4. Resolve conflicts manually

### Build Failures
1. Check Node version: `node --version` (should be 18+)
2. Clear cache: `rm -rf .next`
3. Check for missing env vars
4. Review build logs carefully

---

## Best Practices

### Do
- ✅ Think before coding
- ✅ Write clear commit messages
- ✅ Test your changes
- ✅ Read documentation
- ✅ Ask questions when stuck
- ✅ Keep PRs small
- ✅ Write comments for complex logic

### Don't
- ❌ Commit directly to main (use branches)
- ❌ Push without testing
- ❌ Leave console.logs in code
- ❌ Ignore TypeScript errors
- ❌ Skip code review
- ❌ Assume without verifying
- ❌ Copy-paste without understanding

---

## Resources

- **Planning**: [docs/planning/](../planning/)
- **Technical Standards**: [docs/technical/TECHNICAL_STANDARDS.md](../technical/TECHNICAL_STANDARDS.md)
- **Testing**: [TESTING_PROCEDURES.md](TESTING_PROCEDURES.md)
- **File Organization**: [FILE_ORGANIZATION.md](FILE_ORGANIZATION.md)
- **Shared Libs Reference**: [docs/technical/shared-libs-quick-reference.md](../technical/shared-libs-quick-reference.md)

---

## Getting Help

1. Check documentation first
2. Search codebase for similar patterns
3. Review existing implementations
4. Ask AI assistant (give good context)
5. Consult with team
6. Document solution for next time
