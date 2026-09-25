- Ask clarifying questions or any questions that may be of benefit to our project/plan
- Propose high-level approach
- Collaborate on refinement
- Suggest improvements
- Suggest alternative approaches if a better one exists
- Suggest easy extensions
- If good scope expansion exists reccommend it, if scope reduction is needed recommend this

## 📋 Collaborative Planning Workflow

### Phase 1: Discovery & Questions (Interactive)

#### Step 1: Understand the Request

- Read the initial request carefully
- Identify ambiguities or missing information
- Note complexity indicators

#### Step 2: Ask Clarifying Questions

**Always Ask About:**

- **Goals:** What problem are we solving? What's the success criteria?
- **Scope:** What's in/out of scope? Any constraints?
- **Context:** Why now? What exists today?
- **Priority:** What's most important? Any trade-offs?

**Question Format:**

```markdown
I have some questions to make sure I understand correctly:

1. **[Topic]:** [Specific question]?

   - Option A: [Approach]
   - Option B: [Approach]
   - Your preference?

2. **[Topic]:** [Open-ended question]?

3. **[Topic]:** Should we [X] or [Y]?
```

#### Step 3: Document Q&A in Real-Time

- Create planning doc immediately (from template)
- Add questions to "Questions & Answers" section
- Update as user responds
- Mark ❓ for open questions, ✅ for answered

#### Step 4: Research: Open Source & APIs

- **OPEN SOURCE** Are there open source projects that may be of interest? Has this already been done before? Can we utilize these projects?
- **API INTEGRATIONS** Are there api integrations which make it easy to develop the solution so I don't have to make it myself?

---

### Phase 2: Plan Creation & Refinement

#### Step 1: Create Initial Plan

- Use `_TEMPLATE.md` as base
- Fill in all known sections
- Leave ❓ markers for unknowns
- Save to `/docs/planning/{feature-name}-{YYYY-MM-DD}.md`

#### Step 2: Present Plan to User

**Format:**

```markdown
I've created a planning document at: /docs/planning/{filename}.md

Here's the high-level approach:

**Goals:**

- [Primary goal]
- [Secondary goal]

**Phases:**

1. Phase 1: [Name] - [Brief description]
2. Phase 2: [Name] - [Brief description]
3. Phase 3: [Name] - [Brief description]

**Key Questions Still Open:**

- ❓ [Question 1]
- ❓ [Question 2]

**Risks I've Identified:**

- [Risk 1]
- [Risk 2]

What do you think? Any changes to the approach?
```

#### Step 3: Iterate Based on Feedback

- Update planning doc with each response
- Document decisions in "Decision Log"
- Update Q&A section
- Refine scope, phases, tasks
- Continue until user approves

---

### Phase 3: Execution & Updates

#### During Implementation:

1. **Reference the Plan**

   - Follow the phases/tasks as documented
   - Deviate only when necessary

2. **Update Progress**

   - Check off completed tasks ✅
   - Mark in-progress items 🔄
   - Note blockers 🚫

3. **Document Changes**

   - Add deviations to "Deviations from Plan"
   - Update "Important Notes" with discoveries
   - Log new decisions in "Decision Log"

4. **Ask Questions**
   - Add new questions to Q&A section
   - Get clarification before proceeding
   - Update plan based on answers

#### After Completion:

1. Update status to 🟢 Complete
2. Fill in "Lessons Learned"
3. Add follow-up items
4. Update success metrics

---

## 📝 Conversation Tracking During Planning

### Track in Planning Document:

#### Questions & Answers Section

```markdown
**Q:** How should we handle error cases?
**A:** Show user-friendly message, log error, allow retry
**Impact:** Need error boundary component, logging service integration
**Date:** 2025-10-18
```

#### Decision Log

```markdown
| Date       | Decision                    | Rationale            | Alternatives     | Impact         | Decided By |
| ---------- | --------------------------- | -------------------- | ---------------- | -------------- | ---------- |
| 2025-10-18 | Use React hooks not classes | Modern, simpler code | Class components | Easier testing | User       |
```

#### Important Notes

```markdown
### Critical Information

- ⚠️ Must maintain backwards compatibility with v1 API
- ⚠️ Performance target: < 100ms response time
- ⚠️ Security requirement: All data must be encrypted
```

---

## 🤝 Collaboration Patterns

### Pattern 1: Ask → Answer → Document → Decide

```
AI: "Should we use approach A or B?"
User: "B, because of X"
AI: *Updates plan with decision*
AI: "Got it, documented. This means we'll need to..."
```

### Pattern 2: Propose → Refine → Confirm

```
AI: "I propose we do X, Y, Z"
User: "X and Z yes, but not Y"
AI: *Updates plan*
AI: "Updated plan. Instead of Y, should we do W?"
```

### Pattern 3: Question → Option → Decision

```
AI: "For the API design, we could:
     Option A: REST with JSON
     Option B: GraphQL
     What's your preference?"
User: "REST is fine"
AI: *Documents in decision log*
```

---

## 📊 What to Track in Planning Docs

### Always Document:

✅ User's initial request (verbatim if possible)  
✅ Every question asked and answer received  
✅ All decisions made with rationale  
✅ Scope changes during planning  
✅ Risks identified and mitigation plans  
✅ Important notes and gotchas  
✅ Open questions that need answering

### Update Throughout:

🔄 Task completion status  
🔄 Progress notes  
🔄 Deviations from plan  
🔄 New risks discovered  
🔄 Lessons learned

### Don't Include:

❌ Implementation details (those go in code comments)  
❌ Specific code snippets (unless architectural examples)  
❌ Temporary notes or thoughts  
❌ Duplicate information

---

## 🔄 Planning Document Lifecycle

```
┌─────────────────┐
│ User Request    │
│ or AI Suggests  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Create Plan Doc │
│ Status: 🔵 Planning │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Ask Questions   │◄──┐
│ Get Answers     │   │
│ Update Doc      │   │
└────────┬────────┘   │
         │            │
         ↓            │
┌─────────────────┐   │
│ Present Plan    │   │
│ Get Feedback    │───┘
└────────┬────────┘
         │
         ↓
    ┌────────┐
    │Approved?│─No─→ [Refine]
    └────┬───┘
         │ Yes
         ↓
┌─────────────────┐
│ Execute Plan    │
│ Status: 🟡 In Progress │
│ Update Progress │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Mark Complete   │
│ Status: 🟢 Complete │
│ Add Learnings   │
└─────────────────┘
```

---

## 💬 Communication Guidelines

### During Planning Phase:

- **Be Conversational:** "Let me ask a few questions to understand this better..."
- **Be Specific:** Don't ask vague questions
- **Be Structured:** Number questions, group related topics
- **Be Patient:** Don't assume, always clarify

### During Updates:

- **Be Transparent:** "I'm updating the plan with this decision..."
- **Be Brief:** "Documenting in decision log: [decision]"
- **Be Proactive:** "I noticed [risk], should we address it?"

### When Asking Questions:

- **Provide Context:** "For the API integration, ..."
- **Offer Options:** "We could do A, B, or C. I recommend B because..."
- **Explain Impact:** "This decision affects [X] and [Y]"

---

## 🎯 Success Criteria for Planning

A good planning session results in:

- ✅ Clear, documented goals
- ✅ Well-defined scope
- ✅ Phased implementation approach
- ✅ All questions answered or marked as open
- ✅ Risks identified with mitigations
- ✅ User confident in approach
- ✅ AI has clear execution path

---

## 📚 Examples

### Good Planning Question:

```
For the data persistence layer, we have a few options:

1. **Local Storage**: Simple, no backend needed
   - Pros: Fast, easy to implement
   - Cons: Data lost on browser clear, 5MB limit

2. **IndexedDB**: More robust browser storage
   - Pros: Larger capacity, better performance
   - Cons: More complex API, async

3. **Backend API**: Server-side storage
   - Pros: Persistent, accessible across devices
   - Cons: Requires backend work, network latency

What's your preference? Or should we support multiple options?
```

### Good Decision Documentation:

```markdown
| Date       | Decision      | Rationale                               | Alternatives               | Impact                              | Decided By |
| ---------- | ------------- | --------------------------------------- | -------------------------- | ----------------------------------- | ---------- |
| 2025-10-18 | Use IndexedDB | Need >5MB storage, want offline support | Local Storage, Backend API | Need async wrapper, longer dev time | User       |
```

### Good Progress Update:

```markdown
## 🔄 Progress Tracking

### Phase 1: Foundation ✅

- ✅ 2025-10-18 - Type definitions created
- ✅ 2025-10-18 - Core interfaces implemented
- ✅ 2025-10-18 - Unit tests passing

### Phase 2: Integration 🔄

- ✅ 2025-10-18 - API client implemented
- 🔄 Currently working on: Error handling
- ⏳ Next: State management integration
```

---

## 🔧 Tools & Templates

### File Locations:

- **Template:** `/docs/planning/_TEMPLATE.md`
- **Requirements:** `/docs/planning/_META_PLANNING_REQUIREMENTS.md`
- **This File:** `/docs/planning/_WORKFLOW_INSTRUCTIONS.md`
- **Plans:** `/docs/planning/{feature-name}-{date}.md`

### Quick Commands:

- Create plan: Copy `_TEMPLATE.md` → Fill in sections
- Update progress: Edit plan doc → Check off tasks
- Add decision: Update "Decision Log" section
- Add note: Update "Important Notes" section

---
