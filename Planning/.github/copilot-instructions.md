# GitHub Copilot Instructions for Planning Workspace

Spend time thinking and doing research, searching around, and feel free to use as many tokens as necessary to improve the results of every request. Ask for clarification when eneded, ask questions, recommend improvements or alternative ways to do things if better options exist. Let me know if I'm wrong. Let me know if I've done a good job.

Reference `/Users/mm/Projects/Planning/strategy/brand-and-design-system/readme.md` for company related data that can be used as appropriate

# Research / Generation Technology. When looking for open source packages or tools:
- Focus on and TypeScript > JavaScript > Other languages for scripts and packages.
- If an existing open source package or tool can be leveraged, prioritize its use over building from scratch.
- Do not ignore very high quality open source projects even if they are not in TypeScript/JavaScript; but prioritize TS/JS first.

# Project Planning
- Look for open source resources that accomplish tasks if they exist before suggesting building from scratch. Even if I suggest starting from scratch, always check if there is an open source package or tool that can help first.

### Quick Commands

- **"Start my day"** or **"Create daily journal"** → Run script and ask questions
- **"Update my journal"** → Ask what to add and update today's journal files appropriately
- **"Add to priorities"** → Ask what's priority and update priorities file
- **"End of day review"** → Ask review questions and update review file
- **"End my day"** → Ask questions for updating the journal files with end-of-day reflections
- **"Yesterday recap"** → Ask what happened yesterday and add to previous day's notes
- **"Format journal"** or **"Fix formatting"** → Fix markdown formatting without changing wording

## Daily Journal Management

### Creating Daily Journals

When the user asks to create or start a daily journal, follow this workflow:

1. **Run the journal creation script:**
   ```bash
   cd /Users/mm/Projects/Planning/user/journal && ./create-daily-journal.sh
   ```

2. **Ask these questions and fill in the appropriate files:**

   **For notes file (`XX-XX-XX-notes.md`):**
   - "What are you thinking about or observing today?" → Stream of Thoughts
   - "Any important questions on your mind?" → Important Questions
   - "What decisions have you made?" → Decisions Made
   - "Any new ideas or insights?" → Ideas & Insights
   - "Anything important to remember?" → Important Notes

   **For plan file (`XX-XX-XX-plan.md`):**
   - "What are your main goals for today?" → Today's Goals
   - "What tasks do you want to accomplish?" → Tasks
   - "Any meetings or events scheduled?" → Meetings & Events
   - "What's on your mind for later this week?" → Looking Ahead

   **For priorities file (`XX-XX-XX-priorities.md`):**
   - "What's most urgent?" → Urgent & Important
   - "What's important but not urgent?" → Important but Not Urgent
   - "What blockers are you facing?" → Blockers & Dependencies

   **For review file (`XX-XX-XX-review.md`):**
   - At end of day: "What did you accomplish?" → Accomplishments
   - "What challenged you?" → Challenges & Learnings
   - "What went well?" → What Went Well
   - "What could improve?" → What Could Be Better

3. **After gathering answers, update the appropriate markdown files** using the replace_string_in_file tool to add content to the relevant sections.

4. **Open the notes file** for the user to start working:
   ```bash
   code /Users/mm/Projects/Planning/user/journal/$(date +%m-%d-%y)/$(date +%m-%d-%y)-notes.md
   ```

### Adding Recaps from Previous Days

When user mentions work from yesterday or previous days:
1. Find the most recent journal entry
2. Add a "Recap (added MM-DD-YY)" section to the Important Notes
3. Summarize what was accomplished

### Quick Commands

- **"Start my day"** or **"Create daily journal"** → Run script and ask questions
- **"Update my journal"** → Ask what to add and update today's journal files appropriately
- **"Add to priorities"** → Ask what's priority and update priorities file
- **"End of day review"** → Ask review questions and update review file
- **"End my day"** → Ask questions for updating the journal files with end-of-day reflections
- **"Yesterday recap"** → Ask what happened yesterday and add to previous day's notes

## File Locations

- Journal root: `/Users/mm/Projects/Planning/user/journal/`
- Script: `/Users/mm/Projects/Planning/user/journal/create-daily-journal.sh`
- Date format: `MM-DD-YY` (e.g., `10-19-25`)

## Tips for Copilot

- Always use absolute paths when editing journal files
- Date format is MM-DD-YY (2-digit month, day, year)
- Keep questions conversational and friendly
- If journal already exists, don't recreate it, just help update it
- Preserve existing content when adding new sections
- Use markdown formatting for all journal entries

---

## Roadmap Management

### Creating Roadmap Files

**Daily Roadmap:**
```bash
cd /Users/mm/Projects/Planning/roadmap/scripts && ./create-daily-roadmap.sh
```

**Weekly Roadmap:**
```bash
cd /Users/mm/Projects/Planning/roadmap/scripts && ./create-weekly-roadmap.sh
```

**Monthly Roadmap:**
```bash
cd /Users/mm/Projects/Planning/roadmap/scripts && ./create-monthly-roadmap.sh
```

### Quick Commands

- **"Start roadmap planning"** → Create today's daily roadmap
- **"Plan this week"** → Create/open this week's roadmap
- **"Plan this month"** → Create/open this month's roadmap
- **"Update roadmap"** → Ask what to update and modify appropriate roadmap file
- **"What's my focus?"** → Read current daily/weekly roadmap and summarize

### File Locations

- Roadmap root: `/Users/mm/Projects/Planning/roadmap/`
- Current structure: `2025/Q4/October/week-43/`
- Scripts: `/Users/mm/Projects/Planning/roadmap/scripts/`

---

## Alignment & Reflection

### Creating Alignment Checks

**Weekly Alignment Check:**
```bash
cd /Users/mm/Projects/Planning/scripts && ./create-alignment-check.sh
```

**Monthly Health Check:**
```bash
cd /Users/mm/Projects/Planning/scripts && ./create-health-check.sh
```

**Weekly Retrospective:**
```bash
cd /Users/mm/Projects/Planning/scripts && ./create-weekly-retro.sh
```

### Alignment Check Workflow

When user asks for alignment check or "Am I on track?":

1. **Read this week's roadmap goals** from `/roadmap/2025/Q[N]/[Month]/week-[N]/WEEK.md`
2. **Ask these questions:**
   - "What did you actually work on this week?"
   - "How many hours on each area?"
   - "Does this align with your weekly goals?"
3. **Calculate alignment percentage:**
   - 🟢 Aligned: Work that directly supports goals
   - 🟡 Partially: Work that indirectly supports goals
   - 🔴 Misaligned: Work unrelated to goals
4. **Create or update alignment check file**
5. **Suggest actions** if misalignment detected

### Retrospective Workflow

When user asks for "weekly retro" or "what did I learn?":

1. **Review the week's work** from daily roadmaps and journal
2. **Ask reflection questions:**
   - "What went well this week?"
   - "What didn't go well?"
   - "What did you learn?"
   - "What will you change next week?"
3. **Create or update retrospective file**
4. **Extract action items** for next week

### Quick Commands

- **"Check alignment"** or **"Am I on track?"** → Run weekly alignment check workflow
- **"Health check"** → Run monthly health check workflow
- **"Weekly retro"** → Run retrospective workflow
- **"End of week"** → Run both alignment check and retrospective

### File Locations

- Alignment: `/Users/mm/Projects/Planning/alignment/`
- Reflection: `/Users/mm/Projects/Planning/reflection/`
- Scripts: `/Users/mm/Projects/Planning/scripts/`

---

## Project Tracking

### Creating Project Files

**New Project:**
```bash
cd /Users/mm/Projects/Planning/scripts && ./create-project.sh "Project Name"
```

### Project Management Workflow

When user asks to "create project" or "track [project name]":

1. **Run project creation script** with project name
2. **Ask key questions:**
   - "What's the objective of this project?"
   - "What roadmap goal does this support?" (help them find the link)
   - "What are the key deliverables?"
   - "How long do you think this will take?"
   - "What's the target completion date?"
3. **Fill in the project overview** with their answers
4. **Link to appropriate roadmap milestone/goal**

### Project Status Update

When user asks to "update project status" or "project update":

1. **Ask which project** or list active projects
2. **Ask update questions:**
   - "What's the current progress percentage?"
   - "What got done this week?"
   - "What's planned for next week?"
   - "Any blockers or risks?"
3. **Update the project file's** status section and weekly log
4. **Check alignment** with roadmap goals

### Quick Commands

- **"New project [name]"** → Create new project tracking file
- **"Update project [name]"** → Update project status
- **"List projects"** → Show all active projects with status
- **"Project status"** → Generate status report for all active projects
- **"Block project [name]"** → Move to blocked list and document blocker

### File Locations

- Active projects: `/Users/mm/Projects/Planning/execution/active-projects/`
- Backlog: `/Users/mm/Projects/Planning/execution/backlog.md`
- Blocked: `/Users/mm/Projects/Planning/execution/blocked.md`

---

## AI-Powered Commands

### Dashboard Generation

**"Show my dashboard"** or **"Current status":**
1. Read current week/month roadmaps
2. Read active projects
3. Read recent alignment checks
4. Generate summary dashboard showing:
   - Top priorities this week
   - Active projects and status
   - Alignment score
   - Open blockers/decisions
   - Quick wins available

**"Alignment report":**
1. Compare roadmap goals vs actual work
2. Calculate alignment percentages
3. Identify misalignments
4. Suggest adjustments

**"What should I work on?":**
1. Read today's roadmap focus
2. Check weekly priorities
3. Review project statuses
4. Suggest next best action based on:
   - Urgency (deadlines)
   - Importance (goal alignment)
   - Blockers (what's stuck)
   - Energy (time of day, complexity)

### Strategic Analysis

**"Review my decisions":**
1. Read decision log files from `/reflection/decision-log/`
2. Summarize recent decisions
3. Check if follow-up needed
4. Identify patterns

**"Track priority shifts":**
1. Review `/reflection/priority-shifts/` directory
2. Summarize recent changes
3. Identify patterns in pivots
4. Suggest if current shift needed

**"Goals vs reality":**
1. Read annual/quarterly goals
2. Review actual progress from roadmaps
3. Calculate goal completion percentages
4. Flag at-risk goals
5. Suggest adjustments

### Learning & Insights

**"What am I learning?":**
1. Review retrospectives and reviews
2. Extract key learnings
3. Identify patterns
4. Suggest knowledge to document

**"What's working/not working?":**
1. Analyze retros and reviews
2. Categorize wins vs challenges
3. Identify recurring issues
4. Suggest process improvements

---

## Integration Points

### Cross-System References

When working with any file, AI should:
- **Auto-link to related roadmap goals** when creating projects/tasks
- **Reference decision logs** when relevant decisions exist
- **Surface priority shifts** when context suggests priority changed
- **Link journal entries** to roadmap items when discussing work
- **Connect learnings** from retros to planning improvements

### Proactive Suggestions

AI should proactively suggest:
- **"Time for alignment check"** on Fridays
- **"Create weekly retro"** at end of week
- **"Monthly health check due"** at start of month
- **"Update project status"** if project not updated in 7 days
- **"Review this decision"** if decision is 30+ days old from `/reflection/decision-log/`
- **"Document priority shift"** if work patterns change significantly in `/reflection/priority-shifts/`

---

## General Guidelines

- Always use **absolute paths** when referencing files
- Keep interactions **conversational and helpful**
- **Preserve existing content** when updating files
- Use **proper markdown formatting**
- **Link related documents** to maintain connections
- **Suggest scripts** instead of manual file creation
- **Generate insights** from patterns in the data
- Help user **stay aligned** with their stated goals
