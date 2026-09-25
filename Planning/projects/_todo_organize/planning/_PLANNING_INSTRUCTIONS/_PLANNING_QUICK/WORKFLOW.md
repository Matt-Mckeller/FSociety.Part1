# Planning Workflow - Quick Reference

**Purpose:** Fast guide for AI to create plans  
**Use:** Load this instead of full workflow for routine planning

---

## 🎯 When to Plan

### User Triggers
- "Let's plan", "Create a plan", "Plan this out"
→ **Create plan immediately**

### AI Should Suggest If
- Affects 5+ files
- Major architecture change
- Multiple components/features
- High complexity/risk
- User seems uncertain

---

## ⚡ Quick Workflow

### 1. Choose Template
**Simple project** (1-2 epics, <1 week)  
→ Use `_TEMPLATES/ESSENTIAL_PLAN.md`

**Complex project** (3+ epics, >1 week)  
→ Use `_TEMPLATES/COMPREHENSIVE_PLAN.md` + folder structure

### 2. Ask Core Questions
**Must Ask:**
- Goals & success criteria?
- What's in/out of scope?
- Why needed? What exists today?
- Any constraints or risks?

### 3. Create Plan
- Save to `/docs/planning/{project-name}/README.md`
- Include user's original request in Q&A section
- Mark ❓ for unknowns

### 4. Get Approval
Present plan, get feedback, iterate

### 5. During Implementation
- Update progress as you go
- Document deviations
- Add learnings

---

## 📋 Essential Checklist

Before starting implementation, plan must have:

- [ ] Clear goals & success criteria
- [ ] Epics & features overview
- [ ] Scope boundaries (in/out)
- [ ] Key questions answered
- [ ] High-level roadmap
- [ ] Code areas identified
- [ ] Risks noted (if any)

---

## 🗂️ Folder Structure Decision

### Use Flat Structure (Single File) If:
- ✅ 1-2 epics
- ✅ Plan < 300 lines
- ✅ Solo developer
- ✅ < 1 week timeline

### Use Folder Structure If:
- ✅ 3+ epics
- ✅ Plan > 300 lines
- ✅ Multiple developers
- ✅ Multiple weeks
- ✅ Need detailed specs per epic

**Folder Template:**
```
{project-name}/
├── README.md (main plan)
├── epics/
│   ├── 01-epic-name.md
│   └── 02-epic-name.md
├── features/
│   └── feature-name.md
├── decisions/
│   └── decision-log.md
└── testing/
    └── test-strategy.md
```

---

## 💡 Key Reminders

- **User Input First:** Always capture original request in Q&A
- **Real-Time Updates:** Document Q&A as conversation happens
- **Traceability:** Link tasks to epics/features
- **Code References:** List affected files (note: may not be complete)
- **Iterative:** Plans evolve - update as you learn

---

## 🔗 Full Documentation

For detailed guidance, see:
- `_WORKFLOW_INSTRUCTIONS.md` - Complete workflow
- `_REQUIREMENTS_QUICK.md` - Must-have sections
- `_TEMPLATES/` - All templates

---

**Last Updated:** 2025-10-18
