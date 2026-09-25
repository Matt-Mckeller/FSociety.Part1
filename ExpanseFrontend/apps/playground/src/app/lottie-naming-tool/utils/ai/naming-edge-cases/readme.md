# Lottie Naming & Theming Edge Cases

This directory contains documentation for edge cases that can break or complicate Lottie animation theming.

## 📁 What's Inside

### Start Here

- **`DECISION_GUIDE.md`** - Quick summary and recommendations
- **`00-INDEX.md`** - Complete index with priority matrix

### Edge Case Documentation

Each file explains:

- What the problem is
- How it affects our JavaScript theming code
- Concrete examples with before/after
- Detection strategies
- Solutions for AI prompts and/or code changes

| File                            | Priority    | Status        |
| ------------------------------- | ----------- | ------------- |
| `01-PRECOMP_EMBEDDED_LAYERS.md` | 🔴 Critical | ✅ Fixed      |
| `02-LAYER_EFFECTS.md`           | 🟠 High     | ⚠️ Documented |
| `03-SHAPE_REPEATERS.md`         | 🟡 Medium   | ⚠️ Documented |
| `04-MERGE_PATHS.md`             | 🟡 Medium   | ⚠️ Documented |
| `05-MULTIPLE_FILLS.md`          | 🟢 Low      | ⚠️ Documented |

---

## 🎯 Purpose

These edge cases document scenarios where:

1. **Theming breaks completely** (wrong paths)
2. **Theming is wasteful** (mapping hidden elements)
3. **AI generates incorrect paths** (needs better detection)

Understanding these helps us:

- Write better AI prompts
- Generate correct LayerConfig files
- Debug theming issues faster
- Avoid future problems

---

## 🔍 When to Consult This

### Scenario 1: Animation Won't Theme

**Symptom:** Colors don't change when theme is applied

**Check:**

1. Is it a precomp with embedded layers? → `01-PRECOMP_EMBEDDED_LAYERS.md`
2. Does the layer have effects (`ef`)? → `02-LAYER_EFFECTS.md`

### Scenario 2: AI Generates Wrong Paths

**Symptom:** Paths exist but don't control visible colors

**Check:**

1. Is it using `assets[X]` instead of `layers[X].layers[Y]`? → `01-PRECOMP`
2. Are effects overriding shape colors? → `02-LAYER_EFFECTS.md`

### Scenario 3: Theme File Too Large

**Symptom:** 100+ color entries, many don't seem to do anything

**Check:**

1. Are multiple fills being mapped when only one is visible? → `05-MULTIPLE_FILLS.md`
2. Are hidden fills in merged shapes being mapped? → `04-MERGE_PATHS.md`

### Scenario 4: Paths Break After Animation Update

**Symptom:** Worked before, broke after designer updated Lottie file

**Check:**

1. Were repeaters added/removed? → `03-SHAPE_REPEATERS.md`
2. Were shapes reordered? → Multiple edge cases possible

---

## 🛠️ How to Implement Fixes

### Option 1: Prompt-Only (Recommended)

✅ Update `../prompts.ts` with detection rules  
✅ AI generates correct paths from start  
✅ No code changes needed  
✅ Quick to implement (30 mins)

**Good for:**

- Layer Effects
- Precomp detection
- Multiple fills optimization

### Option 2: Prompt + Code (Robust)

✅ Update prompts (as above)  
✅ Add helper functions to `lottieColorMapping.ts`  
✅ Add validation and auto-fix  
⚠️ More testing required (2-3 hours)

**Good for:**

- Production systems
- Complex animations
- Auto-recovery from errors

### Option 3: Document Only (Education)

✅ Keep documentation for reference  
❌ Don't update prompts or code  
✅ Consult when issues arise

**Good for:**

- Low-priority edge cases
- Rare scenarios
- Future reference

---

## 📊 What Each File Contains

### Structure of Each Edge Case Doc:

```markdown
# [Edge Case Name]

## Severity: [Color] [Level]

## The Problem

[Explanation of what breaks]

## Lottie Structure Example

[Before/After JSON]

## Impact on Our JavaScript Theming

[Code examples showing broken behavior]

## Solution Strategy

[Options 1-3 with code]

## Code Changes Needed

[TypeScript changes if any]

## AI Prompt Addition

[Text to add to prompts.ts]

## Summary

[Quick reference table]
```

---

## 🎓 Learning Value

Each edge case teaches us about:

- **Lottie's rendering pipeline** (what shows vs what's stored)
- **Path resolution** (how Lottie finds colors)
- **After Effects export behavior** (how designers work)
- **Optimization strategies** (map only what matters)

Even if we don't implement fixes for all cases, the documentation helps us:

- Debug faster when issues arise
- Understand Lottie internals better
- Make informed decisions about complexity vs. benefit

---

## 🚀 Recommended Next Steps

1. **Read `DECISION_GUIDE.md`** - See my recommendations
2. **Decide which to implement** - Based on your priorities
3. **Update `prompts.ts`** - Add selected edge cases
4. **Test with new animation** - Verify AI generates correct paths
5. **Optional: Add code helpers** - If edge cases are frequent

---

## 📝 Notes

- All edge cases have **working code examples**
- All show **before/after theming behavior**
- All include **detection strategies**
- All suggest **prompt text to add**

The documentation is complete and ready to use!
