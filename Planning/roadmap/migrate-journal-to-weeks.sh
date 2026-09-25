#!/bin/zsh

# Migration script to reorganize existing journal entries into week-based structure
# Usage: ./migrate-journal-to-weeks.sh

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROADMAP_ROOT="$SCRIPT_DIR"

echo "${BLUE}🔄 Journal Migration Script${NC}"
echo "This will reorganize journal entries into week-based folders."
echo ""

# Find all journal directories
JOURNAL_BASE="$ROADMAP_ROOT/2026/Q1/journal"

if [ ! -d "$JOURNAL_BASE" ]; then
    echo "${RED}❌ No journal directory found at $JOURNAL_BASE${NC}"
    exit 1
fi

echo "Scanning: $JOURNAL_BASE"
echo ""

# Function to get week info for a date
get_week_info() {
    local date_str="$1"
    
    # Handle different date formats (MM-DD-YY or M-D-YY)
    # Normalize to MM-DD-YY format
    local month day year
    
    if [[ "$date_str" =~ ^([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})$ ]]; then
        month=$(printf "%02d" "${match[1]}")
        day=$(printf "%02d" "${match[2]}")
        year="${match[3]}"
    else
        echo "ERROR"
        return
    fi
    
    local full_date="20$year-$month-$day"
    local week_num=$(date -j -f "%Y-%m-%d" "$full_date" "+%V" 2>/dev/null)
    
    if [ -z "$week_num" ]; then
        echo "ERROR"
        return
    fi
    
    echo "$week_num:$month-$day-$year"
}

# Find entries that are directly in journal/ (not in week folders)
migrated=0
skipped=0

for entry in "$JOURNAL_BASE"/*/; do
    entry_name=$(basename "$entry")
    
    # Skip if it's already a week folder
    if [[ "$entry_name" == week-* ]]; then
        echo "${BLUE}ℹ️  Skipping week folder: $entry_name${NC}"
        continue
    fi
    
    # Check if it looks like a date folder
    if [[ "$entry_name" =~ ^[0-9]{1,2}-[0-9]{1,2}-[0-9]{2}$ ]]; then
        week_info=$(get_week_info "$entry_name")
        
        if [ "$week_info" = "ERROR" ]; then
            echo "${YELLOW}⚠️  Could not parse date: $entry_name${NC}"
            ((skipped++))
            continue
        fi
        
        week_num="${week_info%%:*}"
        normalized_date="${week_info#*:}"
        
        # Create week directory if needed
        week_dir="$JOURNAL_BASE/week-$week_num"
        mkdir -p "$week_dir"
        
        # Determine target directory name (use normalized date)
        target_dir="$week_dir/$normalized_date"
        
        # Check if target already exists
        if [ -d "$target_dir" ]; then
            echo "${YELLOW}⚠️  Target already exists, skipping: $entry_name → week-$week_num/$normalized_date${NC}"
            ((skipped++))
            continue
        fi
        
        # Move the directory
        echo "${GREEN}✓${NC} Moving: $entry_name → week-$week_num/$normalized_date"
        mv "$entry" "$target_dir"
        ((migrated++))
        
        # If the original name was different from normalized, rename files inside
        if [ "$entry_name" != "$normalized_date" ]; then
            for file in "$target_dir"/*; do
                if [ -f "$file" ]; then
                    filename=$(basename "$file")
                    newname=$(echo "$filename" | sed "s/$entry_name/$normalized_date/g")
                    if [ "$filename" != "$newname" ]; then
                        mv "$file" "$target_dir/$newname"
                        echo "  ${BLUE}↳${NC} Renamed: $filename → $newname"
                    fi
                fi
            done
        fi
    else
        echo "${YELLOW}⚠️  Unknown folder format: $entry_name${NC}"
        ((skipped++))
    fi
done

# Create weekly journal files for weeks that don't have them
echo ""
echo "${BLUE}📝 Creating missing weekly journals...${NC}"

for week_dir in "$JOURNAL_BASE"/week-*/; do
    if [ ! -d "$week_dir" ]; then
        continue
    fi
    
    week_name=$(basename "$week_dir")
    week_num="${week_name#week-}"
    weekly_file="$week_dir/WEEK-$week_num.md"
    
    if [ ! -f "$weekly_file" ]; then
        # Get a date from one of the daily entries to calculate week dates
        first_entry=$(ls -d "$week_dir"/*/  2>/dev/null | head -1)
        if [ -n "$first_entry" ]; then
            entry_date=$(basename "$first_entry")
            month="${entry_date:0:2}"
            day="${entry_date:3:2}"
            year="20${entry_date:6:2}"
            full_date="$year-$month-$day"
            
            MONDAY_PRETTY=$(date -j -f "%Y-%m-%d" "$full_date" -v-$(($(date -j -f "%Y-%m-%d" "$full_date" "+%u")-1))d "+%b %d" 2>/dev/null)
            SUNDAY_PRETTY=$(date -j -f "%Y-%m-%d" "$full_date" -v+$((7-$(date -j -f "%Y-%m-%d" "$full_date" "+%u")))d "+%b %d" 2>/dev/null)
            YEAR="$year"
        else
            MONDAY_PRETTY="[Monday]"
            SUNDAY_PRETTY="[Sunday]"
            YEAR="2026"
        fi
        
        cat > "$weekly_file" << EOF
# Week $week_num Journal: $MONDAY_PRETTY - $SUNDAY_PRETTY, $YEAR

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
$(for daily in "$week_dir"/*/; do
    if [ -d "$daily" ]; then
        daily_name=$(basename "$daily")
        echo "- [$daily_name](./$daily_name/)"
    fi
done)

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
        echo "${GREEN}✓${NC} Created: $week_name/WEEK-$week_num.md"
    fi
done

echo ""
echo "${GREEN}🎉 Migration complete!${NC}"
echo "   Migrated: $migrated entries"
echo "   Skipped: $skipped entries"
echo ""
echo "New structure:"
ls -la "$JOURNAL_BASE" 2>/dev/null | grep "^d" | tail -n +2 | awk '{print "  " $NF}'
