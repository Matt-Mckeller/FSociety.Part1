# Alignment

**Purpose:** Ensure your actual work aligns with your stated goals.

This directory tracks whether you're working on the right things - the critical feedback loop between planning and reality.

## Files

### Weekly Alignment Checks
`week-[N]-[YEAR]-alignment.md`

**Created:** Every Friday or Monday  
**Purpose:** Compare this week's goals vs actual work

**Key sections:**
- This week's goals (from roadmap)
- What you actually worked on
- Alignment score (% aligned/partially/misaligned)
- Insights and actions

### Monthly Health Checks
`[MM]-[Month]-[YEAR]-health-check.md`

**Created:** First week of each month  
**Purpose:** Deep dive into strategic alignment, execution health, wellbeing

**Key sections:**
- Strategic alignment (annual/quarterly goals)
- Execution health (active projects status)
- Decision quality review
- Time & energy assessment
- Priority shifts
- Overall health score

### `priority-matrix.md`
**Eisenhower Matrix** for current priorities

**Updated:** Weekly  
**Quadrants:**
- Urgent & Important (do first)
- Important not Urgent (schedule)
- Urgent not Important (delegate/minimize)
- Not Urgent/Important (eliminate)

### `time-tracking.md`
Where your time actually goes vs where you planned to spend it

**Updated:** Weekly  
**Purpose:** Identify time wasters and misaligned work

---

## How to Use

### Weekly Workflow
```bash
# Friday: Create alignment check
cd /Users/mm/Projects/Planning/scripts
./create-alignment-check.sh

# Fill in:
# 1. What were your goals?
# 2. What did you actually do?
# 3. Calculate alignment %
# 4. Document insights
```

### Monthly Workflow
```bash
# First week of month: Health check
./create-health-check.sh

# Review:
# 1. Strategic alignment
# 2. Active projects health
# 3. Recent decisions
# 4. Time distribution
# 5. Energy/wellbeing
```

---

## Alignment Scoring

### 🟢 Aligned (>70%)
Work directly supports stated goals. You're on track!

### 🟡 Partially Aligned (40-70%)
Some misalignment. Review what's taking time and why.

### 🔴 Misaligned (<40%)
Significant gap between goals and reality. Time to adjust either goals or work.

---

## Common Misalignment Causes

1. **Firefighting** - Unplanned urgent work
2. **Scope creep** - Projects expanding beyond goals
3. **Wrong priorities** - Goals don't reflect reality
4. **External demands** - Others' priorities taking over
5. **Procrastination** - Avoiding important for easier tasks

---

## Integration with Other Directories

- **← Roadmap:** Goals come from roadmap files
- **← Execution:** Project work tracked here
- **→ Reflection:** Patterns inform retrospectives
- **← Strategy:** Validates strategic alignment

---

## AI Commands

- `Check alignment` - Run alignment check workflow
- `Health check` - Run monthly health check
- `Am I on track?` - Quick alignment status
- `Alignment report` - Generate full report

---

*Alignment is where you catch drift before it becomes a problem. Regular checks keep you honest and on track.*
