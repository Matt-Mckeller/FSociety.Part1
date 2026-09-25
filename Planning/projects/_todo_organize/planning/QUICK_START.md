# Planning System Quick Start

**Updated:** 2025-10-18  
**For:** AI and humans creating project plans

---

## 🎯 30-Second Overview

The planning system has **two approaches**:

1. **Quick Planning** → Single file, 20-30 min, 1-2 epics
2. **Full Planning** → Folder structure, phased approach, 3+ epics

**Start here:** Load [`INDEX.md`](INDEX.md) (5KB)

---

## 🤖 For AI: Create a Plan in 3 Steps

### Step 1: Load the Index (5KB)

```
Load: docs/planning/INDEX.md
```

### Step 2: Choose Planning Type (10KB)

```
Load: docs/planning/_PLANNING_INSTRUCTIONS/CHOOSING_APPROACH.md

Ask yourself:
- 1-2 epics or 3+ epics?
- <1 week or 1+ weeks?
- Clear requirements or complex?

1-2 epics + <1 week + clear → QUICK
3+ epics OR >1 week OR complex → FULL
```

### Step 3: Load Workflow & Template

**For Quick Planning (Total: 28KB):**

```
Load: _PLANNING_INSTRUCTIONS/_PLANNING_QUICK/WORKFLOW.md (5KB)
Load: _PLANNING_INSTRUCTIONS/_PLANNING_QUICK/TEMPLATE.md (8KB)

Create: docs/planning/{project-name}.md
Target: 150-300 lines
Time: 20-30 minutes
```

**For Full Planning Phase 1 (Total: 35KB):**

```
Load: _PLANNING_INSTRUCTIONS/_PLANNING_FULL/WORKFLOW.md (10KB)
Load: _PLANNING_INSTRUCTIONS/_PLANNING_FULL/TEMPLATE_MAIN.md (10KB)

Create: docs/planning/{project-name}/README.md
Target: 150-200 lines
Time: 30-60 minutes for Phase 1
```

**For Full Planning Phase 2 - Per Epic (Total: 20KB):**

```
Load: _PLANNING_INSTRUCTIONS/_PLANNING_FULL/TEMPLATE_EPIC.md (5KB)

Create: docs/planning/{project-name}/epics/01-epic-name.md
Target: 100-200 lines per epic
Time: 45 min per epic
```

---

## 👤 For Humans: Choose Your Path

### Path 1: Quick Project

1. Read [INDEX.md](INDEX.md)
2. Copy [Quick Template](_PLANNING_INSTRUCTIONS/_PLANNING_QUICK/TEMPLATE.md)
3. Fill it out (single file)
4. Done in 30 minutes!

### Path 2: Complex Project

1. Read [INDEX.md](INDEX.md)
2. Review [Example](_EXAMPLE_LOTTIE_TOOL/README.md)
3. Create folder: `{project-name}/`
4. Use [Main Template](_PLANNING_INSTRUCTIONS/_PLANNING_FULL/TEMPLATE_MAIN.md) for README
5. Use [Epic Template](_PLANNING_INSTRUCTIONS/_PLANNING_FULL/TEMPLATE_EPIC.md) per epic
6. Optional: Use [Phased Workflow](_PLANNING_INSTRUCTIONS/PHASED_WORKFLOW.md) if large

---

## 📊 Context Budgets

### Quick Planning

```
Planning docs:    28KB ✅
Your codebase:    92KB
Total:           120KB (plenty of room!)
```

### Full Planning - Phase 1

```
Planning docs:    35KB ✅
Your codebase:    85KB
Total:           120KB (good balance)
```

### Full Planning - Phase 2 (per epic)

```
Planning docs:    20KB ✅
Your codebase:   100KB (maximum room!)
Total:           120KB (optimal!)
```

---

## 🗂️ What Goes Where?

### Quick Planning Output

```
docs/planning/
└── my-project.md                ← Single file (150-300 lines)
```

### Full Planning Output

```
docs/planning/
└── my-project/
    ├── README.md                ← Overview (150-200 lines)
    ├── epics/
    │   ├── 01-epic-name.md      ← Epic 1 details (100-200 lines)
    │   ├── 02-epic-name.md      ← Epic 2 details
    │   └── 03-epic-name.md      ← Epic 3 details
    └── decisions/
        └── decision-log.md      ← Key decisions (optional)
```

---

## 💡 Decision Tree

```
How many epics?
├─ 1-2 epics
│  └─ Timeline <1 week?
│     ├─ YES → Quick Planning ✅
│     └─ NO → Consider Full Planning
│
└─ 3+ epics
   └─ Use Full Planning ✅
      └─ Context tight?
         ├─ YES → Use Phased Workflow
         └─ NO → Standard Full Planning
```

---

## 🚀 Common Scenarios

### Scenario: Bug Fix (3 files, 2 days)

**Use:** Quick Planning  
**Load:** 28KB  
**Time:** 20 min  
**Output:** Single file

### Scenario: New Feature (2 epics, 5 days)

**Use:** Quick Planning  
**Load:** 28KB  
**Time:** 30 min  
**Output:** Single file (might upgrade to Full if grows)

### Scenario: Major Refactor (5 epics, 3 weeks)

**Use:** Full Planning + Phased Workflow  
**Load:** 35KB Phase 1, 20KB per epic Phase 2  
**Time:** 3-5 hours total (across sessions)  
**Output:** Folder with 5+ files

### Scenario: Hitting Context Limits

**Use:** Phased Workflow  
**Load:** [Phased Workflow Guide](_PLANNING_INSTRUCTIONS/PHASED_WORKFLOW.md)  
**Strategy:** Break into phases (Discovery → Epic → Decisions → Roadmap)

---

## ✅ Checklist Before Starting

**AI Should:**

- [ ] Load INDEX.md first
- [ ] Determine project complexity
- [ ] Choose Quick or Full approach
- [ ] Load only necessary files
- [ ] Monitor context usage
- [ ] Use phased approach if context tight

**Human Should:**

- [ ] Read INDEX.md
- [ ] Check example if using Full Planning
- [ ] Decide on Quick vs Full
- [ ] Have requirements ready
- [ ] Set aside appropriate time

---

## 🔗 Essential Links

| Link                                                                             | Size | When to Use                  |
| -------------------------------------------------------------------------------- | ---- | ---------------------------- |
| [INDEX.md](INDEX.md)                                                             | 5KB  | Always start here            |
| [CHOOSING_APPROACH.md](_PLANNING_INSTRUCTIONS/CHOOSING_APPROACH.md)              | 10KB | Every planning session       |
| [Quick: TEMPLATE.md](_PLANNING_INSTRUCTIONS/_PLANNING_QUICK/TEMPLATE.md)         | 8KB  | Simple projects              |
| [Full: TEMPLATE_MAIN.md](_PLANNING_INSTRUCTIONS/_PLANNING_FULL/TEMPLATE_MAIN.md) | 10KB | Complex projects             |
| [Full: TEMPLATE_EPIC.md](_PLANNING_INSTRUCTIONS/_PLANNING_FULL/TEMPLATE_EPIC.md) | 5KB  | Per epic detail              |
| [PHASED_WORKFLOW.md](_PLANNING_INSTRUCTIONS/PHASED_WORKFLOW.md)                  | 15KB | Large/context-tight projects |
| [EXAMPLE](_EXAMPLE_LOTTIE_TOOL/README.md)                                        | 10KB | See Full Planning in action  |

---

## 🎯 Success Metrics

**Planning is successful if:**

- ✅ Context stays under 80KB for planning docs
- ✅ Plan created in appropriate timeframe
- ✅ All questions answered or marked open
- ✅ Scope clearly defined
- ✅ Tasks are actionable
- ✅ User approves before implementation

---

## 💬 Quick Examples

### Quick Planning Conversation

```
User: "Fix bug in user profile loading, 3 files affected"
AI: "This looks like Quick Planning - 1 epic, quick fix."
    [Loads 28KB: INDEX + Quick workflow + template]
AI: "Created plan in 20 minutes. Review?"
User: "Looks good!"
AI: "Starting implementation..."
```

### Full Planning Conversation

```
User: "Redesign entire theming system, 5 major areas"
AI: "This needs Full Planning - 5 epics, complex."
    [Loads 35KB: INDEX + Full workflow + main template]
AI: "Phase 1: Created skeleton with 5 epics. Review?"
User: "Good, let's detail Epic 1"
AI: [Context cleared, loads Epic template + relevant code]
AI: "Epic 1 detailed. Next epic or approve and move on?"
```

---

**Remember:** Choose the simplest approach that works. You can always upgrade from Quick to Full if the project grows!

---

**Last Updated:** 2025-10-18  
**See:** [Full Reorganization Details](REORGANIZATION_COMPLETE.md)
