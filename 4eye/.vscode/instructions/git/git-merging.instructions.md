---
# applyTo: "**/.git*"
---

# Git Merge Guidelines

## Merge Strategies
| Strategy | When to Use |
|----------|-------------|
| Squash merge | Feature branches → develop/main (clean history) |
| Merge commit | Release branches, long-lived branches |
| Rebase | Updating feature branch with latest main |

## Before Merging
- [ ] All CI checks pass
- [ ] Code review approved (if required)
- [ ] Branch is up-to-date with target
- [ ] No unresolved conflicts

## Merge Commands
```bash
# Squash merge
git merge --squash feature/branch

# Standard merge
git merge feature/branch

# Rebase onto main
git rebase main
```

## Conflict Resolution
<!-- TODO: Define conflict resolution workflow -->

## After Merging
- Delete the merged branch
- Update local branches: `git fetch --prune`
