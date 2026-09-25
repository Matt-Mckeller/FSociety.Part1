---
# applyTo: "**/.git*"
---

# Git Push Guidelines

## Before Pushing
<!-- TODO: Define checklist -->
- [ ] Tests pass locally
- [ ] Lint/format checks pass
- [ ] Build succeeds
- [ ] Commits are clean (squash if needed)

## Push Commands
```bash
# Push current branch
git push origin HEAD

# Push and set upstream
git push -u origin HEAD

# Force push (with lease for safety)
git push --force-with-lease
```

## When to Force Push
- After rebasing a feature branch
- After amending commits on unpushed branches
- NEVER on `main` or `develop`

## After Pushing
<!-- TODO: Define - open PR, notify team? -->
