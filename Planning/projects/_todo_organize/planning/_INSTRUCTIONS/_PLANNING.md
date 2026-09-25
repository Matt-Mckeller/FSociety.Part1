# AI Planning Workflow & Conversation Tracking

**Date Created:** 2025-10-18  
**Purpose:** Instructions for AI-human collaborative planning workflow  
**Status:** 🟢 Active

---

# Intent / Purpose

This is instructions on when to utilize the planning functionality when implementing a feature, and links on where to find more information about this and what to do when it i time.

# Description

For large plans we will document and track details on the local file system according to pre-defined templates. You will develop a plan for creating the plan itself before we dive into each section of the plan.

## When to Create Planning Documents

### User-Triggered Planning

**Trigger Phrases:**

- "Lets make a plan"
- "Create a plan"
- "Plan"
- "Plan this out"

**Process:**

1. Acknowledge planning request, clarify with the user if they want a full documented plan
2. If yes: Reference the template example for instructions on how to handle planning at `{projectRoot}/docs/_PLANNING_INSTRUCTIONS/_PLANNING_FULL/_README.md`

### AI-Initiated Planning (Optional)

**When AI Should Suggest Planning:**

- When you feel it may be beneficial to have a full plan documented, i.e. if its a large and complicated implementation or we are running out of context options
- Major architectural changes

**How to Suggest:**

```
"This seems like a significant change. Would you like me to create
a planning document so we can think through the approach together?"
```

**If User Says Yes:** Proceed with planning workflow at `{projectRoot}/docs/_PLANNING_INSTRUCTIONS/_PLANNING_FULL/_README.md`
**If User Says No:** Execute directly but document as we go

---

**Last Updated:** 2025-10-18  
**Review Frequency:** Update as workflow improves  
**Maintained By:** AI + User collaboration
