#!/bin/zsh

# Create daily and weekly journal entries organized by weeks
# Usage: ./create-journal.sh [daily|weekly] [MM-DD-YY]
# Examples:
#   ./create-journal.sh daily           # Create today's daily journal
#   ./create-journal.sh daily 01-05-26  # Create daily journal for specific date
#   ./create-journal.sh weekly          # Create this week's weekly journal
#   ./create-journal.sh                 # Defaults to daily for today

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROADMAP_ROOT="$SCRIPT_DIR"

# Parse arguments
COMMAND="${1:-daily}"
DATE_ARG="$2"

# Function to open file in VS Code (with fallback)
open_in_editor() {
    local file="$1"
    if command -v code &> /dev/null; then
        code "$file"
    elif [ -n "$EDITOR" ]; then
        $EDITOR "$file"
    else
        echo "${BLUE}📝 Open:${NC} $file"
    fi
}

# Function to calculate week number and other date components
calculate_date_info() {
    local input_date="$1"
    
    if [ -z "$input_date" ]; then
        # Use today
        DATE=$(date +"%m-%d-%y")
        FULL_DATE=$(date +"%Y-%m-%d")
    else
        # Parse the input date - handle both M-D-YY and MM-DD-YY formats
        # Split by dashes and normalize
        local month day year
        IFS='-' read -r month day year <<< "$input_date"
        
        # Pad with leading zeros if needed
        month=$(printf "%02d" "$((10#$month))")
        day=$(printf "%02d" "$((10#$day))")
        
        # Handle 2-digit or 4-digit year
        if [ ${#year} -eq 2 ]; then
            year="20$year"
        fi
        
        # Normalized date in MM-DD-YY format
        DATE="$month-$day-${year:2:2}"
        FULL_DATE="$year-$month-$day"
    fi
    
    # Extract components
    YEAR=$(date -j -f "%Y-%m-%d" "$FULL_DATE" "+%Y" 2>/dev/null)
    MONTH_NUM=$(date -j -f "%Y-%m-%d" "$FULL_DATE" "+%m" 2>/dev/null)
    MONTH_NAME=$(date -j -f "%Y-%m-%d" "$FULL_DATE" "+%B" 2>/dev/null)
    DAY_NAME=$(date -j -f "%Y-%m-%d" "$FULL_DATE" "+%A" 2>/dev/null)
    WEEK_NUM=$(date -j -f "%Y-%m-%d" "$FULL_DATE" "+%V" 2>/dev/null)
    
    # Calculate quarter
    QUARTER="Q$((($MONTH_NUM - 1) / 3 + 1))"
    
    # Calculate Monday and Sunday of the week (ISO week: Monday-Sunday)
    DAY_OF_WEEK=$(date -j -f "%Y-%m-%d" "$FULL_DATE" "+%u" 2>/dev/null)
    DAYS_TO_MONDAY=$((DAY_OF_WEEK - 1))
    DAYS_TO_SUNDAY=$((7 - DAY_OF_WEEK))
    
    MONDAY_DATE=$(date -j -v-${DAYS_TO_MONDAY}d -f "%Y-%m-%d" "$FULL_DATE" "+%m-%d-%y" 2>/dev/null)
    SUNDAY_DATE=$(date -j -v+${DAYS_TO_SUNDAY}d -f "%Y-%m-%d" "$FULL_DATE" "+%m-%d-%y" 2>/dev/null)
    MONDAY_PRETTY=$(date -j -v-${DAYS_TO_MONDAY}d -f "%Y-%m-%d" "$FULL_DATE" "+%b %d" 2>/dev/null)
    SUNDAY_PRETTY=$(date -j -v+${DAYS_TO_SUNDAY}d -f "%Y-%m-%d" "$FULL_DATE" "+%b %d" 2>/dev/null)
}

# Function to create directory structure
create_directory_structure() {
    # Structure: /roadmap/YEAR/QUARTER/journal/week-NN/
    JOURNAL_BASE="$ROADMAP_ROOT/$YEAR/$QUARTER/journal"
    WEEK_DIR="$JOURNAL_BASE/week-$WEEK_NUM"
    
    mkdir -p "$WEEK_DIR"
}

# Function to create daily journal
create_daily_journal() {
    calculate_date_info "$DATE_ARG"
    create_directory_structure
    
    DAILY_DIR="$WEEK_DIR/$DATE"
    
    # Check if directory already exists
    if [ -d "$DAILY_DIR" ]; then
        echo "${YELLOW}⚠️  Directory $DATE already exists!${NC}"
        read "response?Overwrite? (y/N): "
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            echo "Opening existing files..."
            open_in_editor "$DAILY_DIR"
            exit 0
        fi
    fi
    
    mkdir -p "$DAILY_DIR"
    echo "${GREEN}✓${NC} Created directory: $DATE"
    
    # Create notes file
    cat > "$DAILY_DIR/$DATE-notes.md" << EOF
# Notes - $DATE ($DAY_NAME)

## Stream of Thoughts
<!-- Raw thoughts, ideas, observations -->

## Important Questions
- 
- 

## Decisions Made
- 
- 

## Ideas & Insights
- 
- 

## Important Notes
<!-- Things to remember or consider -->

EOF
    echo "${GREEN}✓${NC} Created: $DATE-notes.md"
    
    # Create plan file
    cat > "$DAILY_DIR/$DATE-plan.md" << EOF
# Plan - $DATE ($DAY_NAME)

## Week $WEEK_NUM Focus
<!-- Reference: $WEEK_DIR/WEEK-$WEEK_NUM.md -->

## Priorities / Goals

## Today's Focus
<!-- What's the main goal/theme for today? -->

## Reflection On Yesterday
<!-- What did I accomplish yesterday, any thoughts on it -->

## High Priority Tasks
- [ ] 
- [ ] 
- [ ] 

## Optional/Lower Priority
- [ ] 
- [ ] 

## Questions to Answer
- 
- 

## Notes & Context
<!-- Any important context or considerations for today -->

## Alternative Paths
<!-- Other things you could work on if priorities shift -->

## End of Day Review
<!-- Fill this out at the end of the day -->
### What I Accomplished
- 

### What I Learned
- 

### Tomorrow's Focus
- 

EOF
    echo "${GREEN}✓${NC} Created: $DATE-plan.md"
    
    # Create priorities file
    cat > "$DAILY_DIR/$DATE-priorities.md" << EOF
# Priorities - $DATE ($DAY_NAME)

## 🔴 Urgent & Important
<!-- Do these first -->
- [ ] 
- [ ] 

## 🟡 Important but Not Urgent
<!-- Schedule time for these -->
- [ ] 
- [ ] 

## 🟢 Quick Wins
<!-- Can be done in 15 min or less -->
- [ ] 
- [ ] 

## ⚫ Blockers & Dependencies
<!-- What's preventing progress? -->
- 
- 

## 📝 Waiting On
<!-- Items waiting on others -->
- 
- 

EOF
    echo "${GREEN}✓${NC} Created: $DATE-priorities.md"
    
    # Ensure weekly journal exists
    ensure_weekly_journal
    
    echo ""
    echo "${GREEN}🎉 Daily journal for $DATE is ready!${NC}"
    echo "${BLUE}📂 Location:${NC} $DAILY_DIR"
    echo "${BLUE}📅 Week $WEEK_NUM:${NC} $MONDAY_PRETTY - $SUNDAY_PRETTY, $YEAR"
    
    # Open the plan file
    open_in_editor "$DAILY_DIR/$DATE-plan.md"
}

# Function to ensure weekly journal exists
ensure_weekly_journal() {
    WEEKLY_FILE="$WEEK_DIR/WEEK-$WEEK_NUM.md"
    
    if [ ! -f "$WEEKLY_FILE" ]; then
        create_weekly_journal_file
    fi
}

# Function to create weekly journal file
create_weekly_journal_file() {
    WEEKLY_FILE="$WEEK_DIR/WEEK-$WEEK_NUM.md"
    
    cat > "$WEEKLY_FILE" << EOF
# Week $WEEK_NUM Journal: $MONDAY_PRETTY - $SUNDAY_PRETTY, $YEAR

## Week Theme / Focus
<!-- One sentence: What's the main theme or focus this week? -->

## Week Goals
1. [ ] 
2. [ ] 
3. [ ] 

## Key Priorities
- [ ] 
- [ ] 
- [ ] 

## Daily Links
- [Monday ($MONDAY_DATE)](./$MONDAY_DATE/)
- [Tuesday](./)
- [Wednesday](./)
- [Thursday](./)
- [Friday](./)
- [Weekend](./)

## Important Meetings / Events
| Day | Time | Event | Notes |
|-----|------|-------|-------|
| | | | |

## Key Decisions This Week
- 

## Questions to Answer This Week
- 

## End of Week Reflection
*Completed: [Date]*

### ✅ Accomplished
- 

### 🚧 In Progress
- 

### ❌ Not Completed (Why)
- 

### 💡 Key Learnings
- 

### 🎯 Next Week Focus
- 

### 🔄 Process Improvements
- 

EOF
    echo "${GREEN}✓${NC} Created: WEEK-$WEEK_NUM.md"
}

# Function to create weekly journal (standalone command)
create_weekly_journal() {
    calculate_date_info "$DATE_ARG"
    create_directory_structure
    
    WEEKLY_FILE="$WEEK_DIR/WEEK-$WEEK_NUM.md"
    
    if [ -f "$WEEKLY_FILE" ]; then
        echo "${YELLOW}⚠️  Weekly journal for Week $WEEK_NUM already exists!${NC}"
        echo "Opening existing file..."
        open_in_editor "$WEEKLY_FILE"
        exit 0
    fi
    
    create_weekly_journal_file
    
    echo ""
    echo "${GREEN}🎉 Weekly journal for Week $WEEK_NUM is ready!${NC}"
    echo "${BLUE}📂 Location:${NC} $WEEK_DIR"
    echo "${BLUE}📅 Week $WEEK_NUM:${NC} $MONDAY_PRETTY - $SUNDAY_PRETTY, $YEAR"
    
    open_in_editor "$WEEKLY_FILE"
}

# Function to show help
show_help() {
    local script_name="./create-journal.sh"
    echo "Journal Creation Script"
    echo ""
    echo "Usage: $script_name [command] [date]"
    echo ""
    echo "Commands:"
    echo "  daily [MM-DD-YY]    Create daily journal (default if no command)"
    echo "  weekly [MM-DD-YY]   Create weekly journal for the week containing date"
    echo "  help                Show this help message"
    echo ""
    echo "Examples:"
    echo "  $script_name                  Create today's daily journal"
    echo "  $script_name daily            Create today's daily journal"
    echo "  $script_name daily 01-05-26   Create daily journal for Jan 5, 2026"
    echo "  $script_name weekly           Create weekly journal for current week"
    echo "  $script_name weekly 01-10-26  Create weekly journal for week containing Jan 10, 2026"
    echo ""
    echo "Directory Structure:"
    echo "  /roadmap/YEAR/QUARTER/journal/week-NN/"
    echo "    ├── WEEK-NN.md"
    echo "    ├── MM-DD-YY/"
    echo "    │   ├── MM-DD-YY-notes.md"
    echo "    │   ├── MM-DD-YY-plan.md"
    echo "    │   └── MM-DD-YY-priorities.md"
    echo "    └── ..."
}

# Main command dispatcher
case "$COMMAND" in
    daily|d)
        create_daily_journal
        ;;
    weekly|w)
        create_weekly_journal
        ;;
    help|h|-h|--help)
        show_help
        ;;
    *)
        # If first arg looks like a date, treat as daily with date
        if [[ "$COMMAND" =~ ^[0-9]{2}-[0-9]{2}-[0-9]{2}$ ]]; then
            DATE_ARG="$COMMAND"
            create_daily_journal
        else
            echo "${YELLOW}Unknown command: $COMMAND${NC}"
            show_help
            exit 1
        fi
        ;;
esac
