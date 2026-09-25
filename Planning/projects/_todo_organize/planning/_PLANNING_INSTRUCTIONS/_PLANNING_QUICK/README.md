# Quick Planning Overview

**Purpose:** Fast, lightweight planning for simple projects  
**Best For:** 1-2 epics, <1 week, clear requirements

---

## 🎯 What is Quick Planning?

A quick plan that is meant to help AI and humans keep track of goals, tasks, progress, and outcomes.

---

## 📋 What's Included

### Required Sections

1. **Project Configuration** - Technology, testing, documentation checklist
2. **Goals** - What we're achieving and success criteria
3. **Epics & Features Overview** - High-level list
4. **Scope** - In/out boundaries
5. **Key Q&A** - Important questions and answers
6. **High-Level Roadmap** - Phases, not detailed tasks
7. **References** - Code areas, related docs

### Optional Sections (add if needed)

- Risk Assessment (if any notable risks)
- Decision Log (if key decisions made)
- Test Strategy (if testing is complex)

---

## ⚡ Quick Planning Process

### Step 1: Discovery (5-10 minutes)

- Ask user core questions
- Identify 1-2 epics
- Define scope boundaries

### Step 2: Create Plan (10-15 minutes)

- Use `TEMPLATE.md`
- Fill in all required sections
- Keep it concise

### Step 3: Review & Refine (5 minutes)

- Present to user
- Get feedback
- Make adjustments

**Total Time: 20-30 minutes**

---

## 📊 Context Budget

```
Quick Planning Files:
  WORKFLOW.md:              5KB
  TEMPLATE.md:              8KB
  REQUIREMENTS.md:          5KB

Your Plan:                 10KB (single file)
Codebase Context:          72KB

Total:                    100KB ✅
```

---

## 📁 Output Structure

Quick Planning produces a single file:

```
docs/planning/{project-name}.md

Contains:
- Project configuration checklist
- Goals & success criteria
- 1-2 epics with features
- Scope (in/out)
- Key questions & answers
- High-level roadmap (2-3 phases)
- Code references
- (Optional) Risks, decisions, tests

Lines: 150-300
Time to Read: 5-10 minutes
```

---

## 🎯 Example: Quick Plan Structure

```markdown
# Bug Fix: User Profile Loading

## ✅ Project Configuration

- [x] Technology: React, TypeScript, Redux
- [x] Testing: Unit tests required
- [ ] Documentation: Code comments only
- [ ] Visual Assets: None needed
- [ ] Design Phase: No
- [ ] Architecture Phase: No

## 📋 Goals

- Fix slow user profile loading
- Reduce load time from 3s to <500ms

## 📦 Epics Overview

**Epic 1: Optimize Data Fetching**

- Feature 1.1: Implement data caching
- Feature 1.2: Add loading states

## 🔍 Scope

In: Profile page performance
Out: Other pages, settings page

## ❓ Key Q&A

Q: Cache invalidation strategy?
A: 5-minute TTL with manual refresh option

## 🗺️ Roadmap

Phase 1: Implement caching (2 days)
Phase 2: Add loading UI (1 day)
Phase 3: Test & deploy (1 day)

## 📚 References

Primary: `src/components/UserProfile.tsx`
Related: `src/store/userSlice.ts`
Tests: `src/components/UserProfile.test.tsx`
```

**Total: ~150 lines**

---

## 💡 Tips for Quick Planning

### Do:

- ✅ Keep it concise and scannable
- ✅ Focus on essentials only
- ✅ Use bullet points liberally
- ✅ Link to code areas
- ✅ Define clear scope boundaries

### Don't:

- ❌ Over-document simple things
- ❌ Create separate epic files
- ❌ Write novel-length explanations
- ❌ Include unnecessary sections
- ❌ Spend more than 30 minutes planning

### Remember:

**Quick Planning is about speed and clarity, not completeness.**

If you find yourself needing more detail, consider upgrading to Full Planning!

---

## 🔄 Upgrading to Full Planning

If your Quick Plan starts to exceed 300 lines or gets complex:

1. **Create folder:** `{project-name}/`
2. **Move plan:** Rename to `README.md`
3. **Split epics:** Create `epics/` folder
4. **Add details:** Use Full Planning epic template
5. **Update links:** Reference epic files from README

See: `../_PLANNING_FULL/README.md` for Full Planning guidance

---

## 📚 Available Files

In this folder (`_PLANNING_QUICK/`):

- **README.md** (this file) - Overview of Quick Planning
- **TEMPLATE.md** - Quick planning template to copy
- **WORKFLOW.md** - Step-by-step workflow
- **REQUIREMENTS.md** - What every quick plan needs

**Total Context: ~20KB**

---

## 🎯 Quick Start

**For AI:**

1. Load `WORKFLOW.md` (5KB)
2. Use `TEMPLATE.md` (8KB)
3. Validate with `REQUIREMENTS.md` (5KB)
4. Create single-file plan
5. Keep under 300 lines

**For Humans:**

1. Read this README
2. Review template
3. Create your plan
4. Keep it simple!

---

**Quick Planning = Fast, Focused, Effective**

When you don't need complexity, don't add it. Quick Planning gets you from idea to implementation in under 30 minutes.

---

**Last Updated:** 2025-10-18  
**See Also:** ../CHOOSING_APPROACH.md, ../\_PLANNING_FULL/README.md
