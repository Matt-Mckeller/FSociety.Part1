# Planning Requirements - Quick Checklist

**Purpose:** Fast reference for what every plan needs  
**Use:** Load this for quick validation, detailed doc for deep-dive

---

## ✅ Must-Have Sections

Every planning document MUST include:

### 1. Project Configuration

- [ ] Technology stack listed
- [ ] Testing requirements specified (yes/no for unit/integration/E2E)
- [ ] Documentation outputs defined
- [ ] Visual assets needs noted
- [ ] Design phase requirement (yes/no)
- [ ] Architecture phase requirement (yes/no)

### 2. Goals

- [ ] Primary goal stated clearly
- [ ] Success criteria (measurable)
- [ ] Key metrics defined

### 3. Epics & Features Overview

- [ ] Each epic has goal statement
- [ ] Features listed under each epic
- [ ] Brief descriptions provided

### 4. Scope

- [ ] In scope items listed
- [ ] Out of scope items listed
- [ ] Assumptions documented
- [ ] Constraints noted

### 5. Questions & Answers

- [ ] User's original request included
- [ ] Key questions asked and answered
- [ ] Impact of answers documented
- [ ] Open questions marked clearly

### 6. Implementation Roadmap

- [ ] Broken into phases
- [ ] Each phase has goal
- [ ] Tasks listed with checkboxes
- [ ] **Each task references Epic/Feature** (→ _Epic: X, Feature: Y_)
- [ ] Deliverables specified

### 7. References & Code Areas

- [ ] Key files identified
- [ ] Note added: "May not be comprehensive"
- [ ] Integration points listed
- [ ] Test locations noted

---

## ⚠️ Risk-Based Additions

### Add Risk Assessment If:

- High complexity
- External dependencies
- New technology
- Performance critical
- Security sensitive

**Format:** Table with Risk, Likelihood, Impact, Mitigation

---

### Add Decision Log If:

- Multiple approaches considered
- Architectural choices made
- Trade-offs evaluated
- Technical debates resolved

**Format:** Table with Date, Decision, Rationale, Alternatives

---

### Add Test Strategy If:

- Testing requirements complex
- Multiple test types needed
- Test coverage critical
- Integration testing required

**Include:** Test case tables with ID, steps, expected results

---

### Add Acceptance Criteria If:

- Clear pass/fail needed
- Multiple stakeholders
- Formal approval required
- Quality gates defined

**Include:** Overall criteria + definition of done checklist

---

## 📏 Size Guidelines

### Essential Plan (Single File)

- **Target:** 150-300 lines
- **Use for:** Simple projects, 1-2 epics, <1 week

### Comprehensive Plan (Folder Structure)

- **Main README:** 150-200 lines (overview only)
- **Epic Files:** 100-200 lines each (detailed specs)
- **Use for:** Complex projects, 3+ epics, multiple weeks

---

## 🎯 Quality Checklist

Before presenting plan to user:

### Completeness

- [ ] All questions answered (or marked as open)
- [ ] No ❓ markers without explanation
- [ ] User's original input captured
- [ ] All epics have features defined

### Clarity

- [ ] Goals are specific and measurable
- [ ] Scope boundaries are clear
- [ ] Tasks are actionable
- [ ] Technical terms explained if needed

### Traceability

- [ ] Tasks link to epics/features
- [ ] Decisions have rationale
- [ ] Risks have mitigations
- [ ] Code areas identified

### Practicality

- [ ] Timeline is realistic
- [ ] Dependencies identified
- [ ] Resources considered
- [ ] Success measurable

---

## 🔗 Detailed Documentation

For comprehensive requirements, see:

- `_META_PLANNING_REQUIREMENTS.md` - Full requirements
- `_TEMPLATES/` - Template files
- `_WORKFLOW_QUICK.md` - Workflow guide

---

**Last Updated:** 2025-10-18
