# New Project Setup - Workflow Template

**Copy these files to any new project repository**

---

## 📋 Quick Setup Steps

### 1. Copy Core Documentation

Copy these files to your new project's `/docs` directory:

```bash
# In your new project
mkdir -p docs
cp /path/to/ExpanseFrontend/docs/DEVELOPMENT_WORKFLOW.md docs/
cp /path/to/ExpanseFrontend/docs/AI_WORKFLOW_PROMPT.md docs/
```

### 2. Create Project-Specific README

Create `docs/README.md` with:

```markdown
# [Project Name] Documentation

## 🚀 Quick Start

**New to the project or working with AI assistants?**

1. **[AI Workflow Prompt](./AI_WORKFLOW_PROMPT.md)** - Copy-paste templates
2. **[Development Workflow Guide](./DEVELOPMENT_WORKFLOW.md)** - Complete workflow

---

## 📂 Project Documentation

### Your Modules/Features
- Feature documentation here
- Implementation guides
- Architecture decisions

## 🔍 Finding Documentation

- **Development Process:** See workflow guides above
- **Feature Docs:** [Module/Feature folders]
- **API Reference:** [If applicable]
```

### 3. Add to .gitignore (Optional)

If you want to exclude work-in-progress plans:

```gitignore
# Work in progress
**/WIP_*.md
**/DRAFT_*.md
```

---

## 🤖 First AI Prompt for New Project

**Use this when starting development with AI:**

```
I'm starting a new project and want to follow a structured workflow.

Please read and follow the guidelines in:
- docs/AI_WORKFLOW_PROMPT.md
- docs/DEVELOPMENT_WORKFLOW.md

For this project:
- Project: [Name]
- Tech Stack: [Languages/frameworks]
- Purpose: [Brief description]

Standard practices:
- Feature branches for all work
- Small, atomic commits
- Phase-based development with checkpoints
- Documentation as we go
- Testing after each phase

Breaking changes OK (mark as [no production yet])

Ready to start. First task: [Your first task]
```

---

## 📝 Common Plan Templates

### Cleanup Plan Template

```markdown
# [Feature] Cleanup Plan

**Date:** YYYY-MM-DD  
**Status:** Planning

## Current State
- Issue 1
- Issue 2

## Proposed Changes
1. Phase 1: [Name]
2. Phase 2: [Name]

## Checklist

### Phase 1: [Name]
- [ ] Task 1
- [ ] Task 2
- [ ] Commit checkpoint
- [ ] Test

### Phase 2: [Name]
- [ ] Task 1
- [ ] Task 2
- [ ] Commit checkpoint
- [ ] Test

## Metrics
- Before: [numbers]
- After: [numbers]

## Testing
- [ ] Type check
- [ ] Lint
- [ ] Build
- [ ] Manual testing
```

### Implementation Plan Template

```markdown
# [Feature] Implementation Plan

**Date:** YYYY-MM-DD  
**Status:** Planning

## Requirements
1. Requirement 1
2. Requirement 2

## Technical Approach
- Architecture decisions
- Technologies used
- File structure

## Phases

### Phase 1: Setup
- [ ] Create structure
- [ ] Install dependencies
- [ ] Configure tooling

### Phase 2: Core Implementation
- [ ] Feature A
- [ ] Feature B
- [ ] Tests

### Phase 3: Integration
- [ ] Connect to existing code
- [ ] Update documentation
- [ ] Final testing

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
```

---

## 🔄 Maintaining Workflow Across Projects

### Update Frequency

**Review workflow guides:**
- After each major project
- When you discover better practices
- Every 6 months minimum

**Signs you need to update:**
- Workflow feels clunky
- Team members confused
- Commits are messy
- Documentation lagging

### Keeping Guides in Sync

**Option 1: Master Copy (Recommended)**
- Keep master copies in one "canonical" repo (like ExpanseFrontend)
- Copy to new projects
- Periodically sync updates

**Option 2: Shared Submodule**
- Create a `dev-workflow` repo
- Add as git submodule to projects
- Update once, available everywhere

```bash
# Add workflow as submodule
git submodule add <workflow-repo-url> docs/workflow
git submodule update --init --recursive
```

**Option 3: Dotfiles Approach**
- Keep in personal dotfiles repo
- Symlink into project docs
- Always up to date

---

## ✅ Project Setup Checklist

```markdown
## New Project Setup

- [ ] Copy DEVELOPMENT_WORKFLOW.md to docs/
- [ ] Copy AI_WORKFLOW_PROMPT.md to docs/
- [ ] Create docs/README.md with links
- [ ] Set up .gitignore if needed
- [ ] Create initial branch structure in README
- [ ] Add workflow reminder to main README
- [ ] Brief team on workflow (if team project)
- [ ] Create first feature branch
- [ ] Test workflow with first feature
```

---

## 📚 Additional Resources

### Templates Available
- Cleanup plan
- Implementation plan  
- Refactor plan
- Bug fix checklist
- Phase completion summary

### Where to Find
All templates available in:
- `docs/DEVELOPMENT_WORKFLOW.md` - Full guide with examples
- `docs/AI_WORKFLOW_PROMPT.md` - Quick copy-paste templates

---

## 💡 Tips for Success

1. **Start Clean** - Set up workflow before first feature
2. **Be Consistent** - Use same structure across all projects
3. **Teach AI Early** - Share workflow guide in first prompt
4. **Document Deviations** - Note when/why you diverge from workflow
5. **Iterate** - Update guides based on real experience
6. **Share Learnings** - Sync improvements across projects

---

**Last Updated:** October 17, 2025  
**Source:** ExpanseFrontend project workflow
**Tested:** Lottie naming tool cleanup (successful)
