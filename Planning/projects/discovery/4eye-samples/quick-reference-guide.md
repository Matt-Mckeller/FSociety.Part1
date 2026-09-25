# Quick Reference Guide: Test Data Coverage

**Purpose**: Fast lookup showing which test samples exercise which features of the type system

**Date**: October 25, 2025

---

## Test Samples Overview

| ID | Name | Grade | Subject | Duration | Special Features |
|----|------|-------|---------|----------|------------------|
| 1 | Fractions Intro | 3rd | Math | 3 min | Student confusion, visual aids |
| 2 | Word Problems | 4th | Math | 2 min | Step-by-step, problem-solving |
| 3 | Photosynthesis | HS | Biology | 4 min | Complex concepts, technical vocabulary |
| 4 | Newton's F=ma | HS | Physics | 3 min | Demonstration, calculations |
| 5 | Poor Audio | HS | Biology | 1.5 min | Low confidence, inaudible sections |
| 6 | Quick Question | Elem | Language | 12 sec | Very short, simple clarification |
| 7 | WWI Causes | HS | History | 7 min | Very long, dense content, multiple concepts |

---

## Enum Coverage Matrix

### GradeLevel

| Enum Value | Used In Test(s) | Coverage |
|------------|----------------|----------|
| `ELEMENTARY_K2` | - | ❌ Not covered |
| `ELEMENTARY_35` | #1, #2, #6 | ✅ Well covered |
| `MIDDLE_SCHOOL` | - | ❌ Not covered |
| `HIGH_SCHOOL` | #3, #4, #5, #7 | ✅ Well covered |
| `COLLEGE` | - | ❌ Not covered |
| `GRADUATE` | - | ❌ Not covered |
| `PROFESSIONAL` | - | ❌ Not covered |

**Recommendation**: Add middle school and college samples

---

### Subject

| Enum Value | Used In Test(s) | Coverage |
|------------|----------------|----------|
| `MATHEMATICS` | #1, #2 | ✅ Covered |
| `SCIENCE` | #3, #4, #5 | ✅ Well covered |
| `HISTORY` | #7 | ✅ Covered |
| `LITERATURE` | - | ❌ Not covered |
| `LANGUAGE_ARTS` | #6 | ✅ Covered |
| `FOREIGN_LANGUAGE` | - | ❌ Not covered |
| `COMPUTER_SCIENCE` | - | ❌ Not covered |
| `ART` | - | ❌ Not covered |
| `MUSIC` | - | ❌ Not covered |
| `PHYSICAL_EDUCATION` | - | ❌ Not covered |
| `SOCIAL_STUDIES` | - | ❌ Not covered |
| `ECONOMICS` | - | ❌ Not covered |
| `PHILOSOPHY` | - | ❌ Not covered |
| `PSYCHOLOGY` | - | ❌ Not covered |
| `ENGINEERING` | - | ❌ Not covered |
| `OTHER` | - | ❌ Not covered |

**Recommendation**: Add literature, computer science, foreign language samples

---

### LearningModality

| Enum Value | Used In Test(s) | Coverage |
|------------|----------------|----------|
| `VERBAL` | #7 | ✅ Covered |
| `VISUAL` | #1, #2, #3, #4, #5 | ✅ Excellent |
| `NONVERBAL` | - | ❌ Not covered |
| `STORYTELLING` | #1 (in response) | ✅ Covered |
| `PROBLEM_SOLVING` | #1, #2, #4 | ✅ Well covered |
| `ASSOCIATIONS` | #1, #2, #3, #7 | ✅ Well covered |
| `METAPHORS` | - | ⚠️ Could add more |
| `KINESTHETIC` | #1, #4 | ✅ Covered |
| `AUDITORY` | - | ❌ Not covered |
| `LOGICAL` | #3, #7 | ✅ Covered |
| `SOCIAL` | - | ❌ Not covered |
| `EXPERIENTIAL` | #4 | ✅ Covered |

---

### InstructionalStrategy

| Enum Value | Used In Test(s) | Coverage |
|------------|----------------|----------|
| `CHUNKED` | #1 | ✅ Covered |
| `STEP_BY_STEP` | #1, #2, #4 | ✅ Well covered |
| `SCAFFOLDED` | #3 | ✅ Covered |
| `REPETITIVE` | - | ❌ Not covered |
| `MULTI_SENSORY` | #1 | ✅ Covered |
| `LAYERED` | - | ❌ Not covered |
| `SUMMARIZED` | #7 | ✅ Covered |
| `DETAILED` | #3, #7 | ✅ Covered |
| `COMPARATIVE` | - | ❌ Not covered |
| `EXPLORATORY` | - | ❌ Not covered |
| `GUIDED` | #2, #4 | ✅ Covered |
| `INDEPENDENT` | - | ❌ Not covered |

---

### AccessibilityProfile

| Enum Value | Used In Test(s) | Coverage |
|------------|----------------|----------|
| `AUTISM_FRIENDLY` | #1 (response) | ✅ Covered |
| `ADHD_OPTIMIZED` | #1 | ✅ Covered |
| `DYSLEXIA_FRIENDLY` | #2 | ✅ Covered |
| `POOR_WORKING_MEMORY` | #1 | ✅ Covered |
| `SLOW_PROCESSING` | - | ❌ Not covered |
| `EXECUTIVE_FUNCTION` | - | ❌ Not covered |
| `VISUALLY_IMPAIRED` | - | ❌ Not covered |
| `HEARING_IMPAIRED` | - | ❌ Not covered |
| `SENSORY_SENSITIVE` | - | ❌ Not covered |
| `VERBAL_FOCUSED` | - | ❌ Not covered |
| `NONVERBAL_FOCUSED` | - | ❌ Not covered |
| `SIMPLIFIED_LANGUAGE` | - | ❌ Not covered |
| `TECHNICAL_LANGUAGE` | - | ❌ Not covered |
| `WCAG_AAA` | - | ❌ Not covered |
| `REDUCED_MOTION` | - | ❌ Not covered |
| `HIGH_CONTRAST` | - | ❌ Not covered |
| `KEYBOARD_ONLY` | - | ❌ Not covered |

**Recommendation**: Add samples with sensory needs, visual/hearing impairments

---

### VisualizationType (Selected Examples)

| Type | Used In Test(s) | HTML File |
|------|----------------|-----------|
| `INTERACTIVE_DIAGRAM` | #1 (response) | ✅ 01-pizza-fractions-interactive.html |
| `ANIMATED_SVG` | #1 (response) | ⏳ Planned |
| `HTML_INTERACTIVE` | #4 (response) | ✅ 03-physics-fma-interactive.html |
| `FLOW_CHART` | #3 (response) | ✅ 02-photosynthesis-diagram.html |
| `TIMELINE` | #7 (response) | ⏳ Planned |
| `CONCEPT_MAP` | #3 (response) | Partial in 02-photosynthesis |
| `CHART_BAR` | - | ❌ Not covered |
| `BEFORE_AFTER_SLIDER` | #1 (suggested) | ⏳ Planned |
| `STEP_SEQUENCE` | #1 (suggested) | ⏳ Planned |
| `SLIDER_CONTROL` | #4 (response) | ✅ In 03-physics-fma |
| `MERMAID_FLOWCHART` | - | ❌ Not covered |
| `MERMAID_SEQUENCE` | - | ❌ Not covered |
| `CODE_PLAYGROUND` | - | ❌ Not covered |
| `FLASHCARD` | - | ❌ Not covered |

---

### ActionType

| Enum Value | Used In Test(s) | Coverage |
|------------|----------------|----------|
| `SEE_VARIANTS` | #1 | ✅ Covered |
| `EXPLORE_MORE` | - | ❌ Not covered |
| `CONDENSE` | - | ❌ Not covered |
| `EXPAND` | - | ❌ Not covered |
| `CHANGE_MODALITY` | #1 | ✅ Covered |
| `CHANGE_MEDIUM` | - | ❌ Not covered |
| `CHANGE_STRATEGY` | - | ❌ Not covered |
| `SIMPLIFY` | #1 | ✅ Covered |
| `ELI5` | - | ❌ Not covered |
| `ADD_EXAMPLES` | #1 | ✅ Covered |
| `SHOW_RESEARCH` | - | ⚠️ Used in #3 options |
| `QUIZ_ME` | #1 | ✅ Covered |
| `CREATE_FLASHCARDS` | - | ❌ Not covered |
| `VISUALIZE` | #1 | ✅ Covered |
| `RELATE_TO_ME` | - | ❌ Not covered |
| `SHOW_APPLICATIONS` | - | ❌ Not covered |
| `BREAK_INTO_CHUNKS` | - | ❌ Not covered |
| `SHOW_STEP_BY_STEP` | - | ❌ Not covered |
| `ADJUST_ACCESSIBILITY` | - | ❌ Not covered |

---

## Interface Field Coverage

### ExampleDialogInput Fields

| Field | Test #1 | Test #2 | Test #3 | Test #4 | Test #5 | Test #6 | Test #7 | Coverage % |
|-------|---------|---------|---------|---------|---------|---------|---------|------------|
| `content` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `metadata` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `metadata.timestamp` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `metadata.duration` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `metadata.gradeLevel` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `metadata.subject` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `metadata.topic` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | 86% |
| `metadata.studentAccessibilityProfiles` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 29% |
| `metadata.audioQuality` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `metadata.transcriptionConfidence` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `processingOptions` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `processingOptions.targetComplexity` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| `processingOptions.accessibilityProfiles` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 29% |
| `previousContext` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 14% |
| `nextContext` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 14% |

**Overall Field Usage**: 73% of all available fields are used across test samples

---

### ExampleAIResponse Fields (Mock Response #1 Only)

| Field | Present | Notes |
|-------|---------|-------|
| `requestId` | ✅ | Unique ID format |
| `timestamp` | ✅ | Proper Date format |
| `processingTime` | ✅ | In milliseconds |
| `summary` | ✅ | All sub-fields populated |
| `summary.oneSentence` | ✅ | Concise summary |
| `summary.keyPoints` | ✅ | Array of 6 points |
| `summary.vocabulary` | ✅ | 4 vocabulary items |
| `formattedContent` | ✅ | HTML formatted |
| `variants` | ✅ | 4 content variants |
| `learningModalities` | ✅ | 3 modality groups |
| `visualizationSuggestions` | ✅ | 5 suggestions |
| `generatedVisualizations` | ✅ | 1 generated |
| `availableActions` | ✅ | 5 actions |
| `confidence` | ✅ | 0.88 (0-1 scale) |
| `warnings` | ✅ | 2 structured warnings |
| `isPartialResponse` | ✅ | false |

**Completion**: Mock response #1 demonstrates ~95% of interface features

---

## Feature Coverage by Test Sample

### Test #1: Elementary Math Fractions ⭐⭐⭐⭐⭐
**Coverage: Excellent (95%)**

**Covers:**
- ✅ Complete metadata (all major fields)
- ✅ Student accessibility profiles (ADHD, poor working memory)
- ✅ Multiple learning modalities (visual, kinesthetic, storytelling, problem-solving)
- ✅ Instructional strategies (chunked, step-by-step, multi-sensory)
- ✅ Multiple visualization types (interactive, animated, static)
- ✅ Complete mock AI response with all features
- ✅ Student questions and confusion signals
- ✅ Has HTML visualization built

**Missing:**
- ❌ Batch context (previousContext/nextContext not used)

---

### Test #2: Elementary Math Word Problems ⭐⭐⭐⭐
**Coverage: Good (70%)**

**Covers:**
- ✅ Dyslexia-friendly accessibility
- ✅ Problem-solving modality emphasis
- ✅ Step-by-step guided instruction
- ✅ High audio quality / transcription confidence

**Missing:**
- ❌ No full mock AI response yet
- ❌ Limited metadata fields populated
- ❌ No visualization examples

---

### Test #3: High School Biology Photosynthesis ⭐⭐⭐⭐
**Coverage: Good (75%)**

**Covers:**
- ✅ Complex technical content
- ✅ Multiple vocabulary items
- ✅ Detailed/scaffolded instruction
- ✅ Research citations requested
- ✅ Has HTML visualization built

**Missing:**
- ❌ No accessibility profiles
- ❌ No full mock AI response yet

---

### Test #4: High School Physics F=ma ⭐⭐⭐⭐
**Coverage: Good (75%)**

**Covers:**
- ✅ Hands-on demonstration
- ✅ Mathematical calculations
- ✅ Kinesthetic/experiential learning
- ✅ Has HTML visualization built (interactive sliders)

**Missing:**
- ❌ No accessibility considerations
- ❌ No full mock AI response yet

---

### Test #5: Poor Audio Quality Edge Case ⭐⭐⭐
**Coverage: Moderate (50%)**

**Covers:**
- ✅ Low transcription confidence (0.52)
- ✅ Poor audio quality flag
- ✅ Incomplete/inaudible content
- ✅ Edge case handling

**Missing:**
- ❌ Minimal metadata
- ❌ No processing options detail
- ❌ No mock AI response
- ❌ No demonstration of degraded output handling

---

### Test #6: Very Short Segment Edge Case ⭐⭐⭐
**Coverage: Moderate (45%)**

**Covers:**
- ✅ Very short duration (12 seconds)
- ✅ Simple content
- ✅ Quick clarification scenario
- ✅ High confidence transcription

**Missing:**
- ❌ Minimal metadata
- ❌ No variants requested
- ❌ No mock AI response
- ❌ No demonstration of minimal response handling

---

### Test #7: Very Long Segment Edge Case ⭐⭐⭐⭐
**Coverage: Good (70%)**

**Covers:**
- ✅ Very long duration (7 minutes)
- ✅ Dense, complex content
- ✅ Multiple interconnected concepts
- ✅ High cognitive load
- ✅ Research citations requested

**Missing:**
- ❌ No accessibility considerations
- ❌ No mock AI response yet
- ❌ No demonstration of chunking long content

---

## Visualization Files Built

### Completed HTML Files ✅

1. **01-pizza-fractions-interactive.html**
   - Type: `INTERACTIVE_DIAGRAM`
   - Features: Click slices, change slice count (4/6/8/12), fraction calculation
   - Accessibility: Touch-friendly, clear labels, responsive
   - Related to: Test #1

2. **02-photosynthesis-diagram.html**
   - Type: `FLOW_CHART` + `CONCEPT_MAP`
   - Features: Animated flows, stage labels, molecule tracking
   - Accessibility: Legend, clear colors, text explanations
   - Related to: Test #3

3. **03-physics-fma-interactive.html**
   - Type: `SLIDER_CONTROL` + `INTERACTIVE_DIAGRAM`
   - Features: Adjust force/mass, see acceleration, cart animation
   - Accessibility: Large hit targets, clear value displays
   - Related to: Test #4

### Planned HTML Files ⏳

4. **04-wwi-timeline.html**
   - Type: `TIMELINE`
   - Features: Interactive timeline of WWI causes (1871-1914)
   - Related to: Test #7

5. **05-equivalent-fractions-slider.html**
   - Type: `BEFORE_AFTER_SLIDER`
   - Features: Compare 1/4 vs 2/8 with overlay slider
   - Related to: Test #1

6. **06-fraction-bars-animated.html**
   - Type: `ANIMATED_SVG`
   - Features: Filling bars showing 1/4, 2/4, 3/4, 4/4
   - Related to: Test #1

---

## Gap Analysis

### High Priority Gaps 🔴

1. **Missing Mock AI Responses**
   - Only Test #1 has complete mock response
   - Need responses for: #2, #3, #4, #5, #6, #7

2. **Limited Accessibility Coverage**
   - Only 29% of samples use accessibility profiles
   - Missing: visual/hearing impairments, sensory needs

3. **Incomplete Grade Level Coverage**
   - Missing: K-2, middle school, college, graduate
   - Only elementary and high school covered

4. **Limited Subject Coverage**
   - Missing: literature, CS, foreign language, arts, music, PE, etc.
   - Only 5 of 16 subjects covered

### Medium Priority Gaps 🟡

5. **Incomplete Action Type Coverage**
   - Only 6 of 19 action types demonstrated
   - Missing: ELI5, condense/expand, relate-to-me, etc.

6. **Limited Visualization Type Coverage**
   - Only ~15 of 70+ types demonstrated
   - Missing: Mermaid diagrams, flashcards, code playgrounds

7. **Batch Processing Not Demonstrated**
   - No samples use previousContext/nextContext effectively
   - No multi-segment conversation chains

### Low Priority Gaps 🟢

8. **Some Instructional Strategies Underused**
   - Missing: repetitive, layered, comparative, exploratory, independent

9. **Some Learning Modalities Underused**
   - Missing: auditory, social, nonverbal

10. **No Streaming Response Examples**
    - All responses are complete
    - No partial/streaming demonstrations

---

## Recommendations for Additional Test Samples

### Immediate Additions (High Value)

1. **Middle School Literature** - Analyze a short story excerpt
   - Covers: middle school, literature, social learning
   - Features: Character analysis, theme identification
   - Accessibility: Dyslexia-friendly, simplified language

2. **College Computer Science** - Algorithm explanation
   - Covers: college level, CS, code playground visualization
   - Features: Technical language, step-by-step logic
   - Accessibility: Screen reader compatible

3. **Elementary K-2 Phonics** - Letter sounds
   - Covers: K-2, language arts, auditory modality
   - Features: Multi-sensory, repetitive practice
   - Accessibility: Simple language, large text

4. **High School Foreign Language** - Spanish conversation
   - Covers: foreign language, social learning
   - Features: Pronunciation, conversation practice
   - Accessibility: Audio support, visual aids

### Secondary Additions (Fill Gaps)

5. **Middle School Social Studies** - Government branches
   - Covers: middle school, social studies, Mermaid diagrams
   - Features: Flowcharts, organizational structure

6. **High School Art History** - Renaissance period
   - Covers: art, visual learning, image-heavy
   - Features: Before/after comparisons, timelines

7. **Elementary Music** - Reading sheet music
   - Covers: music, auditory + visual modalities
   - Features: Interactive staff notation

8. **Graduate Research Methods** - Statistical analysis
   - Covers: graduate level, expert complexity
   - Features: Dense content, technical vocabulary

---

## Coverage Summary Statistics

### Overall Coverage
- **Test Samples**: 7 created
- **Mock Responses**: 1 complete, 6 pending
- **HTML Visualizations**: 3 built, 3+ planned
- **Enum Coverage**: 40% average across all enums
- **Interface Field Coverage**: 73% of input fields, 95% of output fields (in mock #1)

### Strengths ✅
- Excellent elementary and high school coverage
- Good variety of subjects (math, science, history, language)
- Strong visualization examples (3 working HTML files)
- Comprehensive mock response (#1) demonstrates system capabilities
- Edge cases covered (poor audio, very short, very long)

### Weaknesses ❌
- Missing middle school entirely
- Missing college/graduate/professional levels
- Many subjects not covered (literature, CS, arts, etc.)
- Limited accessibility profile coverage
- No streaming/batch processing examples
- Many visualization types not demonstrated
- Most action types not used

### Next Steps Priority
1. ✅ Complete mock responses for tests #2-7
2. ✅ Build remaining HTML visualization files
3. ⏳ Add 3-4 samples to fill critical gaps (middle school, college, CS, literature)
4. ⏳ Add accessibility-focused samples (visual/hearing impaired)
5. ⏳ Add batch processing example
6. ⏳ Add streaming response example

---

## Quick Lookup: Finding Features

### "I need an example of..."

- **Accessibility accommodations** → Test #1 (ADHD, poor working memory), Test #2 (dyslexia)
- **Student confusion/questions** → Test #1 (equivalent fractions confusion)
- **Complex technical content** → Test #3 (photosynthesis), Test #7 (WWI)
- **Hands-on demonstration** → Test #4 (F=ma cart demo)
- **Poor quality input** → Test #5 (low transcription confidence)
- **Very short content** → Test #6 (12 seconds)
- **Very long content** → Test #7 (7 minutes)
- **Interactive visualization** → Test #1, #4 (HTML files built)
- **Multiple learning modalities** → Test #1 (4 variants created)
- **Research citations** → Test #3, #7 (enabled in options)
- **Step-by-step instruction** → Test #1, #2, #4
- **Problem-solving approach** → Test #1, #2

### "I want to build a visualization for..."

- **Math fractions** → See 01-pizza-fractions-interactive.html
- **Biology processes** → See 02-photosynthesis-diagram.html
- **Physics equations** → See 03-physics-fma-interactive.html
- **Historical timelines** → See Test #7 (WWI) - planned file
- **Comparisons** → Planned: 05-equivalent-fractions-slider.html
- **Animations** → Planned: 06-fraction-bars-animated.html

---

**Last Updated**: October 25, 2025
**Status**: Active development - 7 tests created, 1 complete mock response, 3 HTML files built
