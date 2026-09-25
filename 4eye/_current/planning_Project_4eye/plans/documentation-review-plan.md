# Documentation Review Plan

## Goal

Systematically compare all technical documentation against current implementations to:
1. **Identify gaps** — Patterns in code that aren't documented
2. **Find drift** — Documentation that no longer matches reality
3. **Improve clarity** — Vague or incomplete sections
4. **Add examples** — Missing code references

---

## Scope

### Primary Documents (16 files)

| Priority | Document | Implementation Areas to Check |
|----------|----------|------------------------------|
| 🔴 High | AUTHENTICATION.md | `@expanse/auth/`, `apps/api/src/modules/auth/` |
| 🔴 High | MODULE_ARCHITECTURE.md | All modules in `apps/api/src/modules/`, package structures |
| 🔴 High | PACKAGE_ARCHITECTURE.md | `packages/@expanse/`, `packages/@4eye/` |
| 🔴 High | MUI_THEME_SYSTEM.md | `@expanse/theme/`, `@expanse/brand-core/` |
| 🟡 Med | TECHNICAL_STANDARDS.md | Codebase-wide patterns |
| 🟡 Med | TYPE_ORGANIZATION.md | `@4eye/types/`, type imports across packages |
| 🟡 Med | COMPONENT_VARIANT_SYSTEM.md | `@expanse/shell/src/`, theme variant implementations |
| 🟡 Med | MONOREPO_STRUCTURE.md | Actual directory structure |
| 🟡 Med | GRAPHQL_CODE_FIRST.md | `apps/api/src/` resolver/entity patterns |
| 🟢 Low | TECHNOLOGY_STACK.md | package.json dependencies |
| 🟢 Low | REPOSITORY_STRUCTURE.md | (May overlap with MONOREPO_STRUCTURE) |
| 🟢 Low | SYMBOL_GRID_SYSTEM.md | `@expanse/shell/` grid components |
| 🟢 Low | examples/*.md | Reference implementations |

### Out of Scope (for now)
- `docs/planning/` — Product plans (not technical accuracy)
- `docs/archive/` — Historical documents
- `docs/summaries/` — Implementation logs

---

## Review Process

### Phase 1: Structure Audit (30 min)

**Goal**: Verify organizational docs match reality

| Task | Document | Check |
|------|----------|-------|
| 1.1 | MONOREPO_STRUCTURE.md | Run `tree` and compare to documented structure |
| 1.2 | REPOSITORY_STRUCTURE.md | Check for overlap/redundancy with above |
| 1.3 | PACKAGE_ARCHITECTURE.md | Verify @expanse vs @4eye boundaries are accurate |

**Output**: List of structural inaccuracies

---

### Phase 2: Architecture Deep Dive (2-3 hrs)

**Goal**: Verify architectural patterns match implementations

| Task | Document | Validation Method |
|------|----------|-------------------|
| 2.1 | MODULE_ARCHITECTURE.md | Sample 3 backend modules, compare to documented pattern |
| 2.2 | AUTHENTICATION.md | Trace auth flow through actual code |
| 2.3 | MUI_THEME_SYSTEM.md | Compare theme configs to documented palette |
| 2.4 | COMPONENT_VARIANT_SYSTEM.md | Check variant implementations in @expanse/shell |
| 2.5 | GRAPHQL_CODE_FIRST.md | Compare resolver/entity patterns to docs |
| 2.6 | TYPE_ORGANIZATION.md | Audit type locations and imports |

**Output**: Per-document findings with specific code references

---

### Phase 3: Standards Validation (1 hr)

**Goal**: Check if documented standards are followed

| Task | Document | Validation Method |
|------|----------|-------------------|
| 3.1 | TECHNICAL_STANDARDS.md | Grep for violations (class components, hardcoded colors, etc.) |
| 3.2 | TECHNOLOGY_STACK.md | Cross-reference with package.json versions |

**Output**: Compliance report

---

### Phase 4: Examples Review (1 hr)

**Goal**: Ensure examples are current and accurate

| Task | Document | Validation Method |
|------|----------|-------------------|
| 4.1 | COMPONENT_PATTERNS.md | Compare examples to actual components |
| 4.2 | LAYOUT_PATTERNS.md | Check if referenced components exist |
| 4.3 | STATE_PATTERNS.md | Verify context patterns match codebase |

**Output**: Updated examples or flagged outdated ones

---

### Phase 5: Gap Analysis (1 hr)

**Goal**: Identify undocumented patterns

**Areas to check**:
- New packages since docs written
- Patterns that evolved without doc updates
- Cross-cutting concerns (error handling, logging, etc.)
- Testing patterns (currently undocumented?)
- CI/CD patterns

**Output**: List of documentation gaps to fill

---

## Validation Checklist

For each document, verify:

### Accuracy
- [ ] Code examples compile/match current APIs
- [ ] File paths exist
- [ ] Package names are correct
- [ ] Described patterns are actually used

### Completeness
- [ ] All major patterns documented
- [ ] Edge cases addressed
- [ ] Anti-patterns listed
- [ ] Migration guidance (if patterns changed)

### Clarity
- [ ] Purpose is clear in first paragraph
- [ ] Examples are concrete, not abstract
- [ ] Links to related docs work
- [ ] Terminology is consistent

---

## Output Format

For each document, produce a findings section:

```markdown
## [Document Name] Findings

### ✅ Accurate
- [Section/claim that matches implementation]

### ⚠️ Drift (needs update)
- [What changed] — [Where in code] vs [What doc says]

### ❌ Missing (gaps)
- [Pattern that exists in code but isn't documented]

### 💡 Improvements
- [Clarity suggestions]
- [Additional examples needed]
```

---

## Prioritized Execution Order

1. **MONOREPO_STRUCTURE.md** + **REPOSITORY_STRUCTURE.md** — Quick wins, foundational
2. **PACKAGE_ARCHITECTURE.md** — Affects understanding of everything else
3. **MUI_THEME_SYSTEM.md** — Recent work in @expanse/theme, likely drift
4. **AUTHENTICATION.md** — Critical system, must be accurate
5. **MODULE_ARCHITECTURE.md** — Core backend patterns
6. **COMPONENT_VARIANT_SYSTEM.md** — Recent implementation work
7. Remaining docs in priority order

---

## Time Estimate

| Phase | Time | Effort |
|-------|------|--------|
| Phase 1: Structure | 30 min | Low |
| Phase 2: Architecture | 2-3 hrs | High |
| Phase 3: Standards | 1 hr | Medium |
| Phase 4: Examples | 1 hr | Medium |
| Phase 5: Gaps | 1 hr | Medium |
| **Total** | **5-6 hrs** | |

---

## Tools & Commands

### Structure verification
```bash
# Generate current structure
tree -L 3 -I 'node_modules|.git|dist' > /tmp/current-structure.txt

# Compare packages to documented
ls packages/@expanse/ packages/@4eye/
```

### Pattern searches
```bash
# Find class components (anti-pattern)
grep -r "extends React.Component" apps/ packages/

# Find hardcoded colors
grep -rE "#[0-9a-fA-F]{6}" --include="*.tsx" apps/ packages/

# Find type imports
grep -r "from '@4eye/types'" apps/ packages/
```

### Theme verification
```bash
# List all theme configs
ls packages/@expanse/theme/src/configs/
```

---

## Success Criteria

- [ ] All structural docs match actual directory layout
- [ ] No stale package/file references
- [ ] Code examples in docs are copy-paste runnable
- [ ] Every major implementation pattern has documentation
- [ ] Cross-references between docs are valid
- [ ] Clear version/last-updated indicators

---

## Next Steps After Review

1. **Quick fixes** — Typos, dead links, wrong paths
2. **Update passes** — Rewrite drifted sections
3. **New docs** — Fill documented gaps
4. **Consolidation** — Merge redundant docs (e.g., MONOREPO + REPOSITORY?)
5. **CI integration** — Consider automated doc freshness checks
