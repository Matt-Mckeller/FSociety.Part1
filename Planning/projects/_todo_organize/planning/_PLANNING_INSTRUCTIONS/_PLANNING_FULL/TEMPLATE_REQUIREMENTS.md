# Planning Document Requirements & Instructions

**Date Created:** 2025-10-18  
**Purpose:** Track requirements and instructions for creating planning documents  
**Status:** 🔄 In Progress

---

## 📋 User Requirements Captured

### Core Structure Requirements

#### 0. **Project Configuration Section** (Top Checklist)

- Must appear immediately after header, before Goals
- Technology stack definition
  - Primary languages/frameworks
  - Supporting tools/libraries
- Testing requirements
  - Unit tests needed?
  - Integration tests needed?
  - E2E tests needed?
- Documentation outputs
  - Technical architecture docs
  - API/component documentation
  - User-facing documentation
  - Inline code comments
- Visual assets needed
  - Diagrams required?
  - Mockups/screenshots needed?
  - Videos/animations needed?
- Design phase requirements
  - UI/UX experimentation needed before implementation?
  - Design system integration?
  - Accessibility considerations?
  - Responsive design needs?
- Architecture phase requirements
  - Technical design/prototyping needed?
  - Architecture diagrams required?
  - Data flow diagrams?
  - Performance considerations?

#### 1. **Goals Section**

- Must clearly state what the plan aims to accomplish
- Include measurable success criteria
- Define key metrics for success

#### 2. **High-Level Description**

- 2-3 paragraph overview of the plan
- Explain what it accomplishes
- Explain why it's needed
- Describe the overall approach

#### 3. **Epics & Features Overview**

- Epics should be grouped logical units of work
- Each epic should have:
  - Clear goal statement
  - List of features it contains
- Features should have brief descriptions in overview
- Must have dedicated section for detailed specifications later

#### 4. **Scope Section**

- **In Scope:** What IS included
- **Out of Scope:** What is NOT included
- **Assumptions:** Key assumptions being made
- **Constraints:** Technical/time/resource limitations

#### 5. **Relevant Context**

- Background information
- Current state analysis
- Related work/documentation
- Stakeholder identification

#### 6. **Implementation Roadmap**

- Split into phases
- Each phase should include:
  - Goal statement
  - Duration estimate
  - Dependencies
  - Task list with checkboxes
  - **Each task must reference its Epic and/or Feature** (e.g., → _Epic: [Name], Feature: [Name]_)
  - Note if task is infrastructure/cross-cutting (not tied to specific feature)
  - Specific deliverables

#### 7. **Detailed Epic & Feature Specifications**

- Each epic gets its own detailed section
- Each feature within epic should have:
  - Description
  - User story (if applicable)
  - Acceptance criteria (checkboxes)
  - Technical approach
  - Task breakdown
  - Risks & mitigations

#### 8. **Bugs Section**

- Known bugs/issues
- Severity rating
- Impact analysis
- Root cause
- Fix approach
- Task breakdown for fixes

#### 9. **Risk Assessment Section**

- Comprehensive risk table with likelihood, impact, severity
- Risk categories (technical, resource, dependency, quality)
- Mitigation strategies with owners
- Must be separate from general challenges

#### 10. **Acceptance Criteria Section**

- Overall project acceptance criteria
- Definition of done checklist
- Clear pass/fail conditions
- Must be testable and measurable

#### 11. **Questions & Answers Section**

- **Must include user's original request/input** at the top
- Track all questions asked during planning
- Document user responses (what they actually said)
- Document AI's answer/interpretation
- Note impact of each answer on plan
- Include dates
- Separate planning vs implementation questions
- Track clarifications and iterations with user feedback
- Track open questions

#### 12. **Decision Log**

- Table format with date, decision, rationale
- Alternatives considered
- Impact on project
- Who made the decision
- Key technical decisions highlighted

#### 13. **Important Notes Section**

- Critical information that must not be forgotten
- Architectural decisions
- Gotchas & warnings
- Performance considerations
- Security considerations

#### 14. **Testing Strategy & Test Cases**

- Separate from acceptance criteria
- Test requirements beyond feature specs
- Unit, integration, e2e test cases
- Test case table with IDs, steps, expected results
- Manual testing checklist
- Performance and security testing
- Regression testing

#### 15. **Other Required Aspects**

- Success metrics/KPIs
- Progress tracking
- Notes & learnings
- References/links

---

## 🎯 Document Organization Requirements

### Two-Level Detail Structure

1. **High-level overview** at the top:

   - Epics with brief feature lists
   - Quick reference for overall structure

2. **Detailed specifications** later in document:
   - Full breakdown of each epic
   - Comprehensive feature documentation
   - Technical details and tasks

### Information Hierarchy

```
Goals
  ↓
High-Level Description
  ↓
Epics & Features Overview (Brief)
  ↓
Scope & Risk Assessment & Acceptance Criteria
  ↓
Context & Q&A
  ↓
Implementation Roadmap (Phases)
  ↓
Detailed Epic & Feature Specs (Full detail)
  ↓
Testing Strategy & Test Cases
  ↓
Decision Log & Important Notes
  ↓
Bugs, Risks, Progress & Learnings
```

---

## 📝 Usage Instructions for AI

### When to Create Planning Documents

#### User-Triggered (Primary)

**User says:** "Let's plan", "Create a plan", "Make a plan"

- Immediately create planning document
- Begin collaborative Q&A process
- Update document as conversation progresses

#### AI-Suggested (Optional)

**When AI Should Suggest Planning:**

- Task affects 5+ files
- Major architectural changes
- New feature with multiple components
- High risk/impact changes
- User seems uncertain

**How to Suggest:**
"This seems complex. Would you like me to create a planning document
so we can think through the approach together?"

#### Automatic Triggers

1. **Significant Features**

   - New user-facing functionality
   - Architectural changes
   - Multi-file refactors

2. **Complex Tasks**
   - Multiple steps/phases
   - Cross-cutting concerns
   - High risk/impact changes

### Document Creation Process (Interactive)

1. **Acknowledge & Initialize**

   - Acknowledge planning request
   - Create plan doc from template immediately
   - Save to `/docs/planning/{feature-name}-{YYYY-MM-DD}.md`

2. **Ask Clarifying Questions (Interactive)**

   - Ask questions to understand scope
   - Document questions in "Q&A" section as asked
   - Update with answers as received
   - Mark ❓ for open, ✅ for answered

3. **Create Initial Plan Draft**

   - Fill in all known sections
   - Leave ❓ for unknowns
   - Add preliminary risk assessment
   - Propose phases and approach

4. **Present & Collaborate**

   - Show plan to user
   - Get feedback on approach
   - Update document with decisions
   - Log decisions in "Decision Log"
   - Update "Important Notes" with constraints

5. **Iterate Until Approved**

   - Refine based on feedback
   - Answer new questions
   - Update scope/risks/phases
   - Continue until explicit approval

6. **Execute & Update**

   - Implement according to plan
   - Update progress sections
   - Document deviations
   - Add new Q&A as issues arise

7. **Mark Complete**
   - Update status to 🟢 Complete
   - Add lessons learned
   - Create follow-up items if needed

---

## 📐 Naming Conventions

### File Names

- Format: `{feature-kebab-case}-{YYYY-MM-DD}.md`
- Examples:
  - `lottie-color-support-2025-10-18.md`
  - `export-refactor-2025-10-18.md`
  - `ai-response-integration-2025-10-18.md`

### Status Indicators

- 🔵 Planning - Document created, not started
- 🟡 In Progress - Work has begun
- 🟢 Complete - All work finished
- 🔴 Blocked - Waiting on dependency

### Priority Levels

- **High** - Critical, blocking other work
- **Medium** - Important but not blocking
- **Low** - Nice to have, can be deferred

---

## ✅ Quality Checklist

Before finalizing a planning document, verify:

### Structure & Completeness

- [ ] Goals are clear and measurable
- [ ] High-level description explains the "why"
- [ ] All epics have goals and feature lists
- [ ] Scope clearly defines in/out boundaries
- [ ] Context provides sufficient background
- [ ] Roadmap is broken into logical phases
- [ ] Each phase has tasks and deliverables
- [ ] Detailed specs exist for all features

### Risk & Quality

- [ ] Risk assessment completed with mitigations
- [ ] Acceptance criteria defined (overall + per feature)
- [ ] Testing strategy documented with test cases
- [ ] Performance/security requirements noted

### Collaboration & Decisions

- [ ] All questions documented with answers
- [ ] Key decisions logged with rationale
- [ ] Important notes captured
- [ ] Open questions marked clearly

### Execution Readiness

- [ ] Tasks are actionable and specific
- [ ] Dependencies identified
- [ ] Success metrics defined
- [ ] Definition of done clear

---

### Future Improvements

- Consider adding visual diagrams/flowcharts
- Add estimated time per task
- Include code examples in technical approach
- Add dependency graph visualization
- Add timeline/Gantt chart for complex projects

---

## 📚 Examples

### Good Plan Characteristics

- Clear, specific goals
- Actionable tasks
- Realistic scope
- Well-organized structure
- Sufficient detail without over-specification

### Bad Plan Characteristics

- Vague goals
- Missing acceptance criteria
- Unclear scope boundaries
- Flat task lists without grouping
- Too much or too little detail

---

**Last Updated:** 2025-10-18  
**Next Review:** [When requirements change]
