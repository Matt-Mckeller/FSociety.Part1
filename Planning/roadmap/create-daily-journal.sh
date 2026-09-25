#!/bin/zsh

# Create daily journal entry
# Usage: ./create-daily-journal.sh [MM-DD-YY]
# If no date provided, uses today's date

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROADMAP_ROOT="$SCRIPT_DIR"

DATE_ARG="$1"

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
    JOURNAL_BASE="$ROADMAP_ROOT/$YEAR/$QUARTER/journal"
    WEEK_DIR="$JOURNAL_BASE/week-$WEEK_NUM"
    mkdir -p "$WEEK_DIR"
}

# Main function
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

## Today's Goals
- [ ] 

## Tasks
### High Priority
- [ ] 

### Medium Priority
- [ ] 

### Low Priority
- [ ] 

## Meetings & Events
<!-- Scheduled meetings, calls, events -->

## Looking Ahead
<!-- What's coming up later this week -->

EOF
    echo "${GREEN}✓${NC} Created: $DATE-plan.md"
    
    # Create priorities file
    cat > "$DAILY_DIR/$DATE-priorities.md" << EOF
# Priorities - $DATE ($DAY_NAME)

## Urgent & Important
<!-- Do these first -->
- [ ] 

## Important but Not Urgent
<!-- Schedule these -->
- [ ] 

## Urgent but Not Important
<!-- Delegate if possible -->
- [ ] 

## Blockers & Dependencies
<!-- What's preventing progress -->
- 

EOF
    echo "${GREEN}✓${NC} Created: $DATE-priorities.md"
    
    # Create review file
    cat > "$DAILY_DIR/$DATE-review.md" << EOF
# Review - $DATE ($DAY_NAME)

## Accomplishments
<!-- What got done today -->
- 

## Challenges & Learnings
<!-- What was difficult, what you learned -->
- 

## What Went Well
- 

## What Could Be Better
- 

## Tomorrow's Focus
<!-- Top priorities for tomorrow -->
- 

EOF
    echo "${GREEN}✓${NC} Created: $DATE-review.md"
    
    echo ""
    echo "${GREEN}🎉 Daily journal for $DATE is ready!${NC}"
    echo "${BLUE}📂 Location:${NC} $DAILY_DIR"
    echo "${BLUE}📅 Week $WEEK_NUM:${NC} $MONDAY_PRETTY - $SUNDAY_PRETTY, $YEAR"
    
    open_in_editor "$DAILY_DIR/$DATE-plan.md"
}

# Show help
if [[ "$1" == "-h" || "$1" == "--help" || "$1" == "help" ]]; then
    echo "Create Daily Journal Entry"
    echo ""
    echo "Usage: ./create-daily-journal.sh [date]"
    echo ""
    echo "Arguments:"
    echo "  date    Optional. Date in M-D-YY or MM-DD-YY format."
    echo "          If omitted, uses today's date."
    echo ""
    echo "Examples:"
    echo "  ./create-daily-journal.sh              # Today"
    echo "  ./create-daily-journal.sh 1-5-26       # Jan 5, 2026"
    echo "  ./create-daily-journal.sh 01-05-26     # Same as above"
    echo ""
    echo "Creates:"
    echo "  - MM-DD-YY-notes.md"
    echo "  - MM-DD-YY-plan.md"
    echo "  - MM-DD-YY-priorities.md"
    echo "  - MM-DD-YY-review.md"
    exit 0
fi

create_daily_journal
