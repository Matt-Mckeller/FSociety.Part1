# Planning System Index

**Last Updated:** 2025-10-18  
**Purpose:** Master index for the entire planning system  
**Start Here:** Read this first to navigate the planning system

---

## 🗂️ Directory Structure

```
docs/planning/
├── INDEX.md (this file)
│
├── _PLANNING_INSTRUCTIONS/          ← Planning system docs
│   ├── CHOOSING_APPROACH.md         ← START HERE: Choose Quick vs Full
│   ├── PHASED_WORKFLOW.md           ← Phased planning strategy
│   ├── _PLANNING_QUICK/             ← Quick planning (1-2 epics, <1 week)
│   │   ├── README.md
│   │   ├── TEMPLATE.md
│   │   ├── WORKFLOW.md
│   │   └── REQUIREMENTS.md
│   └── _PLANNING_FULL/              ← Full planning (3+ epics, complex)
│       ├── README.md
│       ├── TEMPLATE_MAIN.md
│       ├── TEMPLATE_EPIC.md
│       ├── TEMPLATE_DECISION_LOG.md
│       ├── WORKFLOW.md
│       └── REQUIREMENTS.md
│
├── _EXAMPLE_LOTTIE_TOOL/            ← Example: Full planning structure
│   ├── README.md
│   ├── epics/
│   │   ├── 01-type-system.md
│   │   ├── 02-export-system.md
│   │   └── 03-ui-enhancements.md
│   └── decisions/
│       └── decision-log.md
│
└── {your-project}/                  ← Your actual project plans
    ├── README.md
    ├── epics/ (if using full planning)
    └── decisions/ (if using full planning)
```

---

## 🚀 Quick Start

### For AI: Starting a Planning Session

**Step 1: Load This File**

```
Load: docs/planning/INDEX.md
Context: ~5KB
```

**Step 2: Choose Planning Type**

```
Load: docs/planning/_PLANNING_INSTRUCTIONS/CHOOSING_APPROACH.md
Context: ~10KB
Decision: Quick or Full?
```

**Step 3: Load Appropriate Workflow**

```
Quick Planning:
  Load: _PLANNING_INSTRUCTIONS/_PLANNING_QUICK/WORKFLOW.md (~5KB)

Full Planning:
  Load: _PLANNING_INSTRUCTIONS/_PLANNING_FULL/WORKFLOW.md (~10KB)
```

**Total Context for Planning Start: 15-25KB** ✅

---

## 📋 File Descriptions

### Planning Instructions

| File                                          | Size  | Purpose                  | When to Use                        |
| --------------------------------------------- | ----- | ------------------------ | ---------------------------------- |
| `_PLANNING_INSTRUCTIONS/CHOOSING_APPROACH.md` | ~10KB | Decision guide           | Every planning session start       |
| `_PLANNING_INSTRUCTIONS/PHASED_WORKFLOW.md`   | ~10KB | Phased planning strategy | Complex projects or context limits |

### Quick Planning Files

| File                              | Size | Purpose                             | When to Use                     |
| --------------------------------- | ---- | ----------------------------------- | ------------------------------- |
| `_PLANNING_QUICK/README.md`       | ~2KB | Overview of quick planning          | First time using quick planning |
| `_PLANNING_QUICK/TEMPLATE.md`     | ~8KB | Quick plan template (150-200 lines) | Creating simple project plans   |
| `_PLANNING_QUICK/WORKFLOW.md`     | ~5KB | Quick planning workflow             | During quick planning           |
| `_PLANNING_QUICK/REQUIREMENTS.md` | ~5KB | Quick plan requirements             | Validating quick plans          |

**Total Quick Planning Context: ~20KB**

### Full Planning Files

| File                                      | Size  | Purpose                   | When to Use                    |
| ----------------------------------------- | ----- | ------------------------- | ------------------------------ |
| `_PLANNING_FULL/README.md`                | ~3KB  | Overview of full planning | First time using full planning |
| `_PLANNING_FULL/TEMPLATE_MAIN.md`         | ~10KB | Main README template      | Creating complex project plans |
| `_PLANNING_FULL/TEMPLATE_EPIC.md`         | ~5KB  | Individual epic template  | Creating epic documentation    |
| `_PLANNING_FULL/TEMPLATE_DECISION_LOG.md` | ~3KB  | Decision log template     | Tracking decisions             |
| `_PLANNING_FULL/WORKFLOW.md`              | ~10KB | Full planning workflow    | During full planning           |
| `_PLANNING_FULL/REQUIREMENTS.md`          | ~8KB  | Full plan requirements    | Validating full plans          |

**Total Full Planning Context: ~35KB for main, ~5KB per epic**

---

## 🎯 Planning Type Selection

### Use Quick Planning When:

- ✅ 1-2 epics
- ✅ Clear requirements
- ✅ Solo developer or small team
- ✅ Timeline: < 1 week
- ✅ Low to medium complexity
- ✅ Minimal dependencies

**Load:** `_PLANNING_QUICK/` files (~20KB total)

### Use Full Planning When:

- ✅ 3+ epics
- ✅ Complex requirements
- ✅ Multiple developers
- ✅ Timeline: 1+ weeks
- ✅ High complexity or risk
- ✅ Many dependencies
- ✅ Needs detailed specifications

**Load:** `_PLANNING_FULL/` files (~35KB main + 5KB per epic)

---

## 📊 Context Budget Strategy

### Quick Planning Session

```
INDEX.md:                    5KB
CHOOSING_APPROACH.md:       10KB
_PLANNING_QUICK/WORKFLOW:    5KB
_PLANNING_QUICK/TEMPLATE:    8KB
_PLANNING_QUICK/REQS:        5KB
Current codebase context:   67KB
----------------------------------
Total:                     100KB ✅
```

### Full Planning Session - Phase 1 (Overview)

```
INDEX.md:                    5KB
CHOOSING_APPROACH.md:       10KB
_PLANNING_FULL/WORKFLOW:    10KB
_PLANNING_FULL/TEMPLATE:    10KB
Current codebase context:   65KB
----------------------------------
Total:                     100KB ✅
```

### Full Planning Session - Phase 2 (Epic Detail)

```
INDEX.md:                    5KB
_PLANNING_FULL/EPIC_TMPL:    5KB
Current epic codebase:      70KB
----------------------------------
Total:                      80KB ✅
```

---

## 🔄 Phased Planning Workflow

For projects hitting context limits, use the **Phased Workflow**:

**Phase 1: Discovery & Overview** (~50KB context)

- Load: Quick planning files
- Create: Skeleton plan with goals, scope, epic list
- Output: README.md (100-150 lines)

**Phase 2: Epic Planning** (~60KB context per epic)

- Load: Epic template + relevant code
- Create: Detailed epic specs one at a time
- Output: `epics/01-epic-name.md`

**Phase 3: Implementation Planning** (~70KB context)

- Load: Relevant epic + codebase
- Create: Task breakdowns, test strategies
- Output: Updates to epic files

See: `_PLANNING_INSTRUCTIONS/PHASED_WORKFLOW.md` for details

---

## 📁 Example Projects

### Full Planning Example: Lottie Tool Enhancement

**Location:** `_EXAMPLE_LOTTIE_TOOL/`

**Structure:**

```
_EXAMPLE_LOTTIE_TOOL/
├── README.md                    ← Main plan overview
├── epics/
│   ├── 01-type-system.md       ← Epic 1 details
│   ├── 02-export-system.md     ← Epic 2 details
│   └── 03-ui-enhancements.md   ← Epic 3 details
└── decisions/
    └── decision-log.md         ← All decisions
```

**Purpose:** Reference implementation showing full planning structure

**When to Review:**

- First time using full planning
- Need example of epic documentation
- Want to see folder structure in practice

---

## 🎓 Learning Path

### First Time Planning?

1. Read `INDEX.md` (this file)
2. Read `_PLANNING_INSTRUCTIONS/CHOOSING_APPROACH.md`
3. Review `_EXAMPLE_LOTTIE_TOOL/README.md`
4. Choose Quick or Full based on project

### Creating Your First Quick Plan?

1. Load `_PLANNING_QUICK/WORKFLOW.md`
2. Use `_PLANNING_QUICK/TEMPLATE.md`
3. Validate with `_PLANNING_QUICK/REQUIREMENTS.md`

### Creating Your First Full Plan?

1. Load `_PLANNING_FULL/WORKFLOW.md`
2. Use `_PLANNING_FULL/TEMPLATE_MAIN.md` for README
3. Use phased approach if context is tight
4. Create epic files as needed using `TEMPLATE_EPIC.md`

---

## 🗺️ Migration Guide

### From Old System to New

**Old Files → New Location:**

- `_TEMPLATE.md` → `_PLANNING_FULL/TEMPLATE_MAIN.md`
- `_WORKFLOW_QUICK.md` → `_PLANNING_QUICK/WORKFLOW.md`
- `_WORKFLOW_INSTRUCTIONS.md` → `_PLANNING_FULL/WORKFLOW.md`
- `_REQUIREMENTS_QUICK.md` → `_PLANNING_QUICK/REQUIREMENTS.md`
- `_META_PLANNING_REQUIREMENTS.md` → `_PLANNING_FULL/REQUIREMENTS.md`
- `_CHOOSING_YOUR_APPROACH.md` → `_PLANNING_INSTRUCTIONS/CHOOSING_APPROACH.md`

**What's New:**

- Clearer separation of Quick vs Full
- Dedicated templates for epics and decisions
- Phased workflow documentation
- Example with folder structure
- This index file!

---

## 💡 Pro Tips

### For AI

1. **Always start with INDEX.md** - Minimal context to orient
2. **Load only what you need** - Don't load both Quick and Full
3. **Use phased approach** - For complex projects or tight context
4. **Load epics individually** - During implementation, not all at once
5. **Reference example** - When uncertain about structure

### For Humans

1. **Start simple** - Use Quick planning unless clearly complex
2. **Upgrade as needed** - Can move from Quick to Full mid-project
3. **Keep README concise** - Always have high-level overview
4. **One epic at a time** - Focus during implementation
5. **Use examples** - Learn from `_EXAMPLE_LOTTIE_TOOL/`

---

## 📚 Reference Documentation

### System Documentation (Historical)

These files document the planning system development:

- `_SYSTEM_REVIEW_2025-10-18.md` - System analysis
- `_PLANNING_SYSTEM_SUMMARY.md` - Optimization summary
- `_PLANNING_CONVERSATION_LOG.md` - Development history
- `_UPDATES_2025-10-18.md` - Recent changes
- `_FILE_INDEX.md` - Old file index

**Note:** These are for reference only. Use `INDEX.md` (this file) going forward.

---

## 🎯 Common Scenarios

### Scenario 1: Quick Bug Fix Affecting Multiple Files

**Use:** Quick Planning  
**Load:** `_PLANNING_QUICK/` (~20KB)  
**Time:** 15-30 minutes

### Scenario 2: New Feature with 2 Epics

**Use:** Quick Planning (can upgrade to Full if needed)  
**Load:** `_PLANNING_QUICK/` (~20KB)  
**Time:** 30-60 minutes

### Scenario 3: Major Refactor with 5 Epics

**Use:** Full Planning + Phased Workflow  
**Load:** Phase 1 (~35KB), then Phase 2 per epic (~60KB each)  
**Time:** 2-4 hours total (spread across phases)

### Scenario 4: Hitting Context Limits

**Use:** Phased Workflow  
**Load:** See `_PLANNING_INSTRUCTIONS/PHASED_WORKFLOW.md`  
**Strategy:** Break into discovery → architecture → implementation phases

---

## ✅ Quick Checklist

Before any planning session, AI should:

- [ ] Load `INDEX.md` (this file)
- [ ] Load `CHOOSING_APPROACH.md`
- [ ] Decide: Quick or Full?
- [ ] Load appropriate workflow
- [ ] Load appropriate template
- [ ] Validate with requirements doc
- [ ] Monitor context usage

**Total context for start: 15-35KB depending on choice**

---

## 🔗 Key Links

**Start Here:**

- [Choose Your Approach](docs/planning/_PLANNING_INSTRUCTIONS/CHOOSING_APPROACH.md)
- [Phased Workflow Guide](docs/planning/_PLANNING_INSTRUCTIONS/PHASED_WORKFLOW.md)

**Quick Planning:**

- [Quick Planning Overview](docs/planning/_PLANNING_INSTRUCTIONS/_PLANNING_QUICK/README.md)
- [Quick Template](docs/planning/_PLANNING_INSTRUCTIONS/_PLANNING_QUICK/TEMPLATE.md)
- [Quick Workflow](docs/planning/_PLANNING_INSTRUCTIONS/_PLANNING_QUICK/WORKFLOW.md)

**Full Planning:**

- [Full Planning Overview](docs/planning/_PLANNING_INSTRUCTIONS/_PLANNING_FULL/README.md)
- [Main Template](docs/planning/_PLANNING_INSTRUCTIONS/_PLANNING_FULL/TEMPLATE_MAIN.md)
- [Epic Template](docs/planning/_PLANNING_INSTRUCTIONS/_PLANNING_FULL/TEMPLATE_EPIC.md)
- [Full Workflow](docs/planning/_PLANNING_INSTRUCTIONS/_PLANNING_FULL/WORKFLOW.md)

**Examples:**

- [Lottie Tool Example](docs/planning/_EXAMPLE_LOTTIE_TOOL/README.md)

---

**Remember:** The goal is efficient planning that scales with project complexity while staying within context limits. Start with this INDEX, choose your approach, and load only what you need!

---

**Last Updated:** 2025-10-18  
**Maintained By:** AI + User collaboration  
**Version:** 2.0 (Reorganized structure)
