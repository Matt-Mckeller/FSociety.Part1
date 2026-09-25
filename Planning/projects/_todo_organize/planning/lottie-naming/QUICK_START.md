# Quick Start Guide - Lottie Naming Tool

## 🎯 Goal

Generate semantic names for Lottie animation components to enable theme-based color mapping.

## ⚡ 5-Minute Quick Start

### Step 1: Setup (1 minute)

```bash
# Navigate to project
cd /Users/mm/Projects/ExpanseFrontend

# Add your Anthropic API key
echo "NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-..." > apps/playground/.env.local

# Start server (if not running)
npm run dev --workspace=playground
```

### Step 2: Open Tool (10 seconds)

Open browser: **http://localhost:3010/lottie-naming-tool**

### Step 3: Upload Animation (30 seconds)

1. Enter name: `AngelWingsHalo`
2. (Optional) Add description: `Angel wings with glowing golden halo`
3. Click "Select File"
4. Choose: `/Users/mm/Projects/ExpanseFrontend/angel-wings-layers.json`

### Step 4: Generate Names (2 minutes)

**Option A: Fast Mode (30 seconds)**

1. Click "Generate Names" button
2. Wait for streaming response
3. See names applied to tree

**Option B: Vision Mode (2 minutes)**

1. Toggle "Vision Mode" switch ON
2. Click "Capture Frames" button (captures 5 frames)
3. Click "Generate Names" button
4. Wait for streaming response with visual analysis
5. See names + descriptions + recommendations

### Step 5: Review & Edit (1 minute)

1. Expand tree nodes (click arrows)
2. Look for blue dots (themeable components)
3. Click edit icon (pencil) to change any name
4. Press Enter to save, Escape to cancel
5. Click green checkmark to approve

### Step 6: Validate (10 seconds)

1. Scroll to "Validation" section
2. Click "Run Validation"
3. See completion percentage
4. Review any issues

### Step 7: Export (10 seconds)

1. Scroll to "Export" section
2. Check desired options:
   - ✅ Updated Lottie JSON
   - ✅ Name Mappings
   - ✅ Theme Template
3. Click "Export All Files"
4. Files download automatically with timestamps

## 📦 What You Get

After export, you'll have 4 files:

```
AngelWingsHalo_2025-10-11T12-00-00.json           # Updated Lottie
AngelWingsHalo_2025-10-11T12-00-00_mappings.json  # Name changes
AngelWingsHalo_2025-10-11T12-00-00_theme.json     # Theme template
AngelWingsHalo_2025-10-11T12-00-00_validation.json # Validation report
```

## 🎨 Example Results

### Before (Generic Names):

```json
{
  "nm": "Shape 1",
  "ty": "fl",
  "c": { "k": [1, 0.84, 0, 1] }
}
```

### After (Semantic Names):

```json
{
  "nm": "WingLeftFeatherFill",
  "ty": "fl",
  "c": { "k": [1, 0.84, 0, 1] }
}
```

## 💡 Pro Tips

### Get Better AI Results:

- ✅ Add animation description (helps Claude understand context)
- ✅ Use vision mode for complex animations
- ✅ Capture frames at interesting moments
- ✅ Edit names that don't match your intent

### Workflow Efficiency:

- Focus on themeable components first (blue dots)
- Use expand/collapse to navigate large trees
- Approve names as you review (green checkmark)
- Run validation before export

### Naming Best Practices:

- Follow [Purpose][Location][Detail] pattern
- Use PascalCase (WingLeftFeather, not wing_left_feather)
- Be descriptive (WingFeatherFill not Fill1)
- Consider theming (group related elements)

## 🚨 Troubleshooting

### Server won't start

```bash
# Kill existing process
lsof -ti:3010 | xargs kill -9

# Restart
cd /Users/mm/Projects/ExpanseFrontend
npm run dev --workspace=playground
```

### API key issues

```bash
# Check .env.local exists
cat apps/playground/.env.local

# Should show:
# NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...

# If not, create it:
echo "NEXT_PUBLIC_ANTHROPIC_API_KEY=your-key" > apps/playground/.env.local

# Restart server
```

### Animation won't load

- Check JSON is valid Lottie format
- Look for error message in red alert
- Try another animation file

### Names not generating

- Check browser console for errors (F12)
- Verify API key is correct
- Check network tab for API calls
- Try text-only mode (vision mode off)

### Export not working

- Ensure at least one component has a name
- Check browser allows downloads
- Look for popup blocker
- Try one file at a time

## 📚 Next Steps

After mastering the basics:

1. **Explore Advanced Features:**

   - Custom follow-up questions
   - Manual name editing
   - Validation issue review
   - Theme template customization

2. **Integrate with Theme System:**

   - Use exported theme.json
   - Map to your color palette
   - Test theme switching
   - Document color usage

3. **Process More Animations:**
   - Test with different styles
   - Build naming patterns
   - Create templates
   - Share with team

## 🎓 Learn More

- **Full Documentation:** `docs/planning/lottie-naming/IMPLEMENTATION_COMPLETE.md`
- **Technical Details:** `docs/planning/lottie-naming/README.md`
- **Naming Conventions:** `docs/planning/lottie-naming/NAMING_CONVENTIONS.md`
- **Architecture:** `docs/planning/lottie-naming/WEB_TOOL_PLAN.md`

---

**Time to Complete:** 5-10 minutes per animation
**Difficulty:** Beginner-friendly
**Status:** ✅ Production Ready

**Happy naming! 🎨✨**
