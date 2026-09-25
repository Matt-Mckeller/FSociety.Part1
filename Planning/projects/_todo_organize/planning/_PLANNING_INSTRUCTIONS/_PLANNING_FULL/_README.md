# Full Planning Overview

---

## 🎯 What is Planning?

Full Planning is a structured, folder-based approach for projects that need detailed specifications. It is meant to help humans and AI keep track of goals, tasks, decisions, and progress. It breaks the plan into multiple files, and folders that will be referenced throughout the course of a project to improve context and memory management and track status of ongoing projects.

**Key Characteristics:**

- Multiple markdown files in folder structure
- Epics, Features, Tasks, Bugs, and Research "Tickets" as markdown files
- Project Charters, Goals, Risks, Expected Outcomes, Roadmaps
- Scalable to very large projects
- Modular context loading through separation of files

---

## 📁 Folder Structure

```
0088-{project-name}/
├── 0088-{project-name}-table-of-contents.md ← A description of all current relevant files and what they are
│   ROADMAP.md
├── 0088-{project-name}-ROADMAP.md ← The implementation roadmap including status and progress
├── 0088-{project-name}-goals.md ← The implementation roadmap including
├── epics/
│   ├── 0088-01-epic-name/
│   ├──── 0088-01-epic-name.md  ← The details of the epic with
│   ├──── tasks/  ← tasks that are included in the epic
│   ├──── features/  ← features that are included in the epic
│   ├─────── 0088-01-01-feature.md  ← a specific feature in the epic
│   ├────────0088-01-02-feature.md  ← another feature in the epic
│   ├──── bugs/  ← bugs to be fixed
│   ├─────── 0088-01-01-bug.md  ← a bug to be fixed
│   ├────────0088-01-02-bug.md  ← another bug to be fixed
│   ├──── research/  ← relevant research to be done
│   ├────────0088-01-01-research-topic-1.md  ← research to be done for the epic
├── decisions/
│   └── decision-log.md         ← All architectural decisions
│
├── testing/
│   └── test-strategy.md        ← Comprehensive test plan
│
└── risks/
    └── risk-assessment.md      ← Detailed risk analysis
```

---

## 📋 What's Included

### Main PROJECT_CHARTER.md (Required, Template = ./TEMPLATE_PROJECT_CHARTER.md)

- Project configuration checklist
- Goals & success criteria
- Epics overview (high-level)
- Scope boundaries
- Key Q&A
- High-level roadmap
- Links to detailed epic files
- References

### Epic Files (One per epic)

- Epic goal & description
- Features within epic (detailed)
- Technical approach
- Code areas affected
- Acceptance criteria
- Task breakdown
- Epic-specific risks
- Dependencies

### Decision Log (if needed)

- Architectural decisions
- Technology choices
- Trade-offs made
- Rationale documented

**Lines: Variable** | **Context: ~3KB**

### Test Strategy (if complex testing)

- Test requirements
- Test cases
- Testing approach
- Coverage goals

**Lines: Variable** | **Context: ~5KB**

### Risk Assessment (if high risk)

- Comprehensive risk table
- Mitigation strategies
- Risk owners
- Monitoring approach

**Lines: Variable** | **Context: ~3KB**

---

## ⚡ Full Planning Process

### Phase 1: Create README Skeleton (30 minutes)

- Ask user core questions
- Identify 3+ epics
- Define scope and goals
- Create main README with epic list
- Get approval on structure

**Output:** `README.md` (150-200 lines)

### Phase 2: Detail Epics (45 min per epic)

- Focus on one epic at a time
- Load relevant code areas
- Define features and tasks
- Document technical approach
- Create epic file

**Output:** `epics/XX-epic-name.md` per epic

### Phase 3: Document Decisions & Risks (30 minutes)

- Review all epics for key decisions
- Document architectural choices
- Assess cross-epic risks
- Define mitigations

**Output:** `decisions/decision-log.md`, `risks/risk-assessment.md`

### Phase 4: Create Roadmap (30 minutes)

- Sequence epics based on dependencies
- Create phase timeline
- Assign epic owners
- Define milestones

**Output:** Updated README with roadmap section

**Total Time: 3-5 hours (can be spread across sessions)**

---

## 📊 Context Budget

### Phase 1: README Creation

```
INDEX.md:                    5KB
CHOOSING_APPROACH.md:       10KB
TEMPLATE_MAIN.md:           10KB
WORKFLOW.md:                10KB
Codebase overview:          65KB
----------------------------------
Total:                     100KB ✅
```

### Phase 2: Epic Planning (per epic)

```
INDEX.md:                    5KB
TEMPLATE_EPIC.md:            5KB
Specific epic code:         70KB
----------------------------------
Total:                      80KB ✅ (repeated per epic)
```

### Phase 3: Decisions & Risks

```
INDEX.md:                    5KB
Epic summaries:             15KB
Decision template:           3KB
Risk template:               3KB
Cross-cutting code:         54KB
----------------------------------
Total:                      80KB ✅
```

---

## 💡 Benefits of Full Planning

### Organization

- ✅ Clear separation of concerns
- ✅ Easy to find specific information
- ✅ Modular structure scales well
- ✅ Can work on epics in parallel

### Context Efficiency

- ✅ Load only what you need
- ✅ Main README stays concise
- ✅ Epic details isolated
- ✅ AI can focus on one epic at a time

### Collaboration

- ✅ Multiple people can work on different epics
- ✅ Clear ownership boundaries
- ✅ Better git diffs (smaller files)
- ✅ Easier code reviews

### Maintainability

- ✅ Updates are isolated
- ✅ Adding new epics doesn't clutter main file
- ✅ Decisions tracked separately
- ✅ Easier to archive completed epics

---

## 🔍 Example: Full Plan Structure

```
lottie-tool-enhancement/
├── README.md (185 lines)
│   ├── Project Configuration
│   ├── Goals
│   ├── Epics Overview
│   │   ├── Epic 1: Type System (link to file)
│   │   ├── Epic 2: Export System (link to file)
│   │   └── Epic 3: UI Enhancements (link to file)
│   ├── Scope
│   ├── Key Q&A
│   ├── Roadmap (3 phases)
│   └── References
│
├── epics/
│   ├── 01-type-system.md (180 lines)
│   │   ├── Epic Goal
│   │   ├── Features (3 features detailed)
│   │   ├── Technical Approach
│   │   ├── Code Areas
│   │   ├── Tasks
│   │   └── Risks
│   │
│   ├── 02-export-system.md (200 lines)
│   └── 03-ui-enhancements.md (190 lines)
│
└── decisions/
    └── decision-log.md (15 decisions)
```

**Total: ~950 lines across 7 files**  
**Context to load at once: 10-15KB (main + 1 epic)**

---

## 💡 Tips for Full Planning

### Do:

- ✅ Keep README as overview/hub
- ✅ Link to epic files from README
- ✅ One epic = one file
- ✅ Use consistent naming (01-, 02-, etc.)
- ✅ Update README when adding epics
- ✅ Load one epic at a time during work

### Don't:

- ❌ Duplicate info between README and epics
- ❌ Make epic files too long (>300 lines)
- ❌ Mix multiple epics in one file
- ❌ Forget to link epic files from README
- ❌ Load all epics at once (context!)

### Remember:

**Full Planning is about structured depth, not complexity for its own sake.**

If 3 epics turn into 10, that's fine! The structure scales.

---

## 🔄 Downgrading to Quick Planning

If your Full Plan is simpler than expected (only 2 epics, <300 total lines):

1. **Consolidate:** Merge epic files into main README
2. **Simplify:** Remove separate decision/risk files
3. **Rename:** Move to single file in root
4. **Clean:** Delete empty folders

Sometimes you don't know complexity until you start planning!

---

## 📚 Available Files

In this folder (`_PLANNING_FULL/`):

- **README.md** (this file) - Overview of Full Planning
- **TEMPLATE_MAIN.md** - Main README template
- **TEMPLATE_EPIC.md** - Individual epic template
- **TEMPLATE_DECISION_LOG.md** - Decision tracking template
- **TEMPLATE_TEST_STRATEGY.md** - Test planning template (optional)
- **TEMPLATE_RISK_ASSESSMENT.md** - Risk analysis template (optional)
- **WORKFLOW.md** - Step-by-step workflow
- **REQUIREMENTS.md** - What every full plan needs

**Total Context: ~40KB**

---

## 🎯 Quick Start

**For AI:**

1. Load `WORKFLOW.md` (10KB)
2. Use `TEMPLATE_MAIN.md` for README (10KB)
3. Use `TEMPLATE_EPIC.md` per epic (5KB each)
4. Use phased approach if needed
5. Validate with `REQUIREMENTS.md` (8KB)

**For Humans:**

1. Read this README
2. Review example (see `../../_EXAMPLE_LOTTIE_TOOL/`)
3. Create folder structure
4. Start with README
5. Add epic files as you go

---

## 🚀 Advanced: Phased Full Planning

For very large or context-tight projects, combine Full Planning with Phased Workflow:

**Phase 1:** Create README skeleton  
**Phase 2:** Detail epics one at a time (multiple sessions)  
**Phase 3:** Document decisions and risks  
**Phase 4:** Create roadmap

See: `../PHASED_WORKFLOW.md` for detailed guide

---

**Full Planning = Structured Depth at Scale**

When your project demands comprehensive planning, Full Planning provides the structure to manage complexity without overwhelming context or losing clarity.

---

**Last Updated:** 2025-10-18  
**See Also:** ../CHOOSING_APPROACH.md, ../\_PLANNING_QUICK/README.md, ../PHASED_WORKFLOW.md
