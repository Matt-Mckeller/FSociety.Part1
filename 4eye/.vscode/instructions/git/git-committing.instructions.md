---
# applyTo: "**/.git*"
---

# Git Commit Guidelines

## Commit Message Format
<!-- TODO: Define format - conventional commits recommended -->
```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types
| Type | Purpose |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no behavior change) |
| `improvement` | Enhancement to existing feature |
| `cleaning` | Tech debt, formatting, cleanup |
| `docs` | Documentation only |
| `test` | Adding/updating tests |
| `chore` | Build, CI, tooling |

## Rules
- Keep subject line under 72 characters
- Use imperative mood: "Add feature" not "Added feature"
- Reference issues in footer: `Closes #123`

## Before Committing
<!-- TODO: Define - lint, test, build checks? -->
