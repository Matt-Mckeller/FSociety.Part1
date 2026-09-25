---
description: Break down a plan into tracked files with status tracking
---

# Plan Documentation

Break down the specified plan into modular documentation files with progress tracking.

## Process

1. **Analyze** — Identify distinct components (features, modules, tasks)
2. **Split** — Create a file per component in `docs/planning/plans/[plan-name]/`
3. **Track** — Add status frontmatter to each file

## File Structure

```
docs/planning/plans/[plan-name]/
├── README.md           # Overview + component status table
├── [component-1].md    # Individual component detail
├── [component-2].md
└── ...
```

## Status Frontmatter

Each component file includes:

```yaml
---
status: not-started | in-progress | blocked | completed
priority: high | medium | low
dependencies: [list of dependent components]
---
```

## README.md Template

```markdown
# [Plan Name]

## Status Overview

| Component | Status | Priority | Notes |
|-----------|--------|----------|-------|
| [name]    | 🔴     | high     |       |

## Legend
- 🔴 Not started
- 🟡 In progress  
- 🟠 Blocked
- 🟢 Completed
```

## Component File Template

```markdown
---
status: not-started
priority: medium
dependencies: []
---

# [Component Name]

## Goal
[One-line objective]

## Tasks
- [ ] Task 1
- [ ] Task 2

## Notes
[Implementation details, decisions, blockers]
```

## Rules
- Keep each file under 100 lines
- Update README status table when component status changes
- Link dependencies between files
