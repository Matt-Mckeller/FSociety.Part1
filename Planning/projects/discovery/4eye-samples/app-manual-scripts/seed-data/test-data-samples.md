# Test Data Samples

**Purpose**: Realistic test inputs and mock outputs to validate the 4eye type system

**Date**: October 25, 2025

---

## Table of Contents
1. [Elementary Math Examples](#elementary-math-examples)
2. [High School Science Examples](#high-school-science-examples)
3. [Edge Case Examples](#edge-case-examples)
4. [Mock AI Responses](#mock-ai-responses)
5. [Type System Validation](#type-system-validation)

---

## Elementary Math Examples

### Example 1: Third Grade Fractions Lesson

#### Input Object (TypeScript/JSON)
```typescript
const elementaryMathInput1: ExampleDialogInput = {
  content: `Teacher: Alright class, today we're going to learn about fractions! Who can tell me what a fraction is?

Student 1: It's like when you cut something into pieces?

Teacher: Yes! Exactly. A fraction shows us parts of a whole. Let me show you with this pizza. If I have one whole pizza and I cut it into 4 equal slices, and I eat 1 slice, what do I have left?

Student 2: Three slices!

Teacher: Right! So I ate 1 out of 4 slices. We write that as 1/4. The bottom number - we call it the denominator - tells us how many equal parts the whole is divided into. The top number - the numerator - tells us how many parts we're talking about. So if I eat 1 slice out of 4, I ate 1/4 of the pizza.

Student 3: So the 3 slices left would be 3/4?

Teacher: Perfect! You've got it. Now, what if I cut the pizza into 8 slices instead and ate 2 slices? 

Student 1: That would be 2/8!

Teacher: Yes! And here's something cool - 2/8 is the same amount as 1/4. They're equivalent fractions. Can anyone see why?

Student 2: Because 2 is half of 4... and 8 is... wait, I'm confused.

Teacher: Good question! Let's draw this out. If I have 4 slices and shade 1, that's 1/4. If I have 8 slices and shade 2, that's 2/8. But look - the shaded area is the same size! We'll practice more with these equivalent fractions today.`,

  metadata: {
    timestamp: new Date('2025-10-25T10:30:00Z'),
    duration: 180, // 3 minutes
    sessionId: 'session_elem_math_001',
    lessonId: 'lesson_fractions_intro',
    
    gradeLevel: GradeLevel.ELEMENTARY_35,
    subject: Subject.MATHEMATICS,
    topic: 'Introduction to Fractions',
    lessonObjective: 'Students will understand what fractions represent and identify equivalent fractions',
    
    classSize: 24,
    teacherName: 'Mrs. Johnson',
    schoolName: 'Lincoln Elementary School',
    isLive: true,
    
    studentId: 'student_8473',
    studentGradeLevel: GradeLevel.ELEMENTARY_35,
    studentLearningPreferences: [
      LearningModality.VISUAL,
      LearningModality.KINESTHETIC,
      LearningModality.STORYTELLING
    ],
    studentAccessibilityProfiles: [
      AccessibilityProfile.ADHD_OPTIMIZED,
      AccessibilityProfile.POOR_WORKING_MEMORY
    ],
    preferredInstructionalStrategies: [
      InstructionalStrategy.CHUNKED,
      InstructionalStrategy.STEP_BY_STEP,
      InstructionalStrategy.MULTI_SENSORY
    ],
    preferredCognitiveLoad: CognitiveLoadLevel.LOW,
    preferredContentDensity: ContentDensity.LIGHT,
    
    hasVisualAids: true,
    hasQuestions: true,
    hasDemonstration: true,
    isReview: false,
    isNewMaterial: true,
    
    audioQuality: 'good',
    transcriptionConfidence: 0.92
  },

  processingOptions: {
    includeSummary: true,
    includeVariants: true,
    includeLearningModalities: [
      LearningModality.VISUAL,
      LearningModality.KINESTHETIC,
      LearningModality.STORYTELLING,
      LearningModality.PROBLEM_SOLVING
    ],
    includeInstructionalStrategies: [
      InstructionalStrategy.CHUNKED,
      InstructionalStrategy.STEP_BY_STEP
    ],
    includeVisualizations: true,
    includeVocabularyEnhancement: true,
    includeRelatedResearch: false,
    
    targetComplexity: ContentComplexity.SIMPLE,
    targetCognitiveLoad: CognitiveLoadLevel.LOW,
    targetContentDensity: ContentDensity.LIGHT,
    instructionalStrategy: InstructionalStrategy.STEP_BY_STEP,
    accessibilityProfiles: [
      AccessibilityProfile.ADHD_OPTIMIZED,
      AccessibilityProfile.POOR_WORKING_MEMORY
    ],
    maxVariants: 4,
    maxVisualizationSuggestions: 5,
    prioritizeRealtime: true,
    
    maxResponseLength: 1000,
    allowExternalLinks: false,
    requireCitations: false,
    chunkSize: 50
  },

  previousContext: [],
  nextContext: []
};
```

#### Realistic Classroom Transcript (Plain Text Version)
```
TRANSCRIPT: Third Grade Math - Fractions Introduction
Date: October 25, 2025, 10:30 AM
Duration: 3 minutes
Teacher: Mrs. Johnson
Grade: 3rd
Topic: Introduction to Fractions

[0:00]
Teacher: Alright class, today we're going to learn about fractions! Who can tell me what a fraction is?

[0:08]
Student 1: It's like when you cut something into pieces?

[0:12]
Teacher: Yes! Exactly. A fraction shows us parts of a whole. Let me show you with this pizza. If I have one whole pizza and I cut it into 4 equal slices, and I eat 1 slice, what do I have left?

[0:28]
Student 2: Three slices!

[0:30]
Teacher: Right! So I ate 1 out of 4 slices. We write that as 1/4. The bottom number - we call it the denominator - tells us how many equal parts the whole is divided into. The top number - the numerator - tells us how many parts we're talking about. So if I eat 1 slice out of 4, I ate 1/4 of the pizza.

[1:02]
Student 3: So the 3 slices left would be 3/4?

[1:05]
Teacher: Perfect! You've got it. Now, what if I cut the pizza into 8 slices instead and ate 2 slices?

[1:15]
Student 1: That would be 2/8!

[1:18]
Teacher: Yes! And here's something cool - 2/8 is the same amount as 1/4. They're equivalent fractions. Can anyone see why?

[1:30]
Student 2: Because 2 is half of 4... and 8 is... wait, I'm confused.

[1:37]
Teacher: Good question! Let's draw this out. If I have 4 slices and shade 1, that's 1/4. If I have 8 slices and shade 2, that's 2/8. But look - the shaded area is the same size! We'll practice more with these equivalent fractions today.

[END - 3:00]
```

---

### Example 2: Fourth Grade Word Problems

#### Input Object
```typescript
const elementaryMathInput2: ExampleDialogInput = {
  content: `Teacher: Let's try a word problem together. "Sarah has 12 cookies. She wants to share them equally with her 3 friends. How many cookies does each person get?"

Teacher: First, let's figure out what we know. Sarah has 12 cookies, right? And she's sharing with 3 friends. But wait - does Sarah get cookies too?

Student 1: Yeah! So it's 4 people total.

Teacher: Excellent thinking! So we have 12 cookies and 4 people. This is a division problem. We're dividing 12 by 4. Who remembers how to write that?

Student 2: 12 divided by 4?

Teacher: Yes! We can write it as 12 ÷ 4. Now, one way to solve this is to use what we know about multiplication. What times 4 equals 12?

Student 3: 3 times 4!

Teacher: Perfect! So 12 ÷ 4 = 3. Each person gets 3 cookies.

Student 1: Can we draw it out?

Teacher: Great idea! Let's draw 12 circles for cookies, then draw 4 boxes for people, and put cookies in each box one at a time until they're all gone. See? Each box has 3 cookies.

Student 2: So division is like dealing cards?

Teacher: Yes! That's a perfect way to think about it. You're dealing out the items equally.`,

  metadata: {
    timestamp: new Date('2025-10-25T11:15:00Z'),
    duration: 120,
    sessionId: 'session_elem_math_002',
    lessonId: 'lesson_word_problems_division',
    
    gradeLevel: GradeLevel.ELEMENTARY_35,
    subject: Subject.MATHEMATICS,
    topic: 'Division Word Problems',
    lessonObjective: 'Students will solve division word problems by identifying equal groups',
    
    classSize: 22,
    teacherName: 'Mr. Rodriguez',
    schoolName: 'Lincoln Elementary School',
    isLive: true,
    
    studentId: 'student_9214',
    studentGradeLevel: GradeLevel.ELEMENTARY_35,
    studentLearningPreferences: [
      LearningModality.VISUAL,
      LearningModality.PROBLEM_SOLVING,
      LearningModality.ASSOCIATIONS
    ],
    studentAccessibilityProfiles: [
      AccessibilityProfile.DYSLEXIA_FRIENDLY,
      AccessibilityProfile.VISUAL
    ],
    preferredInstructionalStrategies: [
      InstructionalStrategy.STEP_BY_STEP,
      InstructionalStrategy.GUIDED
    ],
    preferredCognitiveLoad: CognitiveLoadLevel.LOW,
    preferredContentDensity: ContentDensity.SPARSE,
    
    hasVisualAids: true,
    hasQuestions: true,
    hasDemonstration: true,
    isReview: false,
    isNewMaterial: true,
    
    audioQuality: 'excellent',
    transcriptionConfidence: 0.95
  },

  processingOptions: {
    includeSummary: true,
    includeVariants: true,
    includeLearningModalities: [
      LearningModality.VISUAL,
      LearningModality.PROBLEM_SOLVING,
      LearningModality.KINESTHETIC
    ],
    includeVisualizations: true,
    includeVocabularyEnhancement: true,
    
    targetComplexity: ContentComplexity.SIMPLE,
    targetCognitiveLoad: CognitiveLoadLevel.LOW,
    targetContentDensity: ContentDensity.SPARSE,
    instructionalStrategy: InstructionalStrategy.STEP_BY_STEP,
    accessibilityProfiles: [AccessibilityProfile.DYSLEXIA_FRIENDLY],
    maxVariants: 3,
    maxVisualizationSuggestions: 4,
    prioritizeRealtime: true,
    
    maxResponseLength: 800,
    chunkSize: 40
  }
};
```

---

## High School Science Examples

### Example 3: Biology - Photosynthesis

#### Input Object
```typescript
const highSchoolBiologyInput: ExampleDialogInput = {
  content: `Teacher: Today we're diving into photosynthesis - the process plants use to make their own food. Let's start with the basic equation: 6CO2 plus 6H2O plus light energy produces C6H12O6 plus 6O2. But what does this actually mean?

Teacher: Carbon dioxide from the air enters through tiny holes in leaves called stomata. Water is absorbed by the roots. And what's the third ingredient?

Student 1: Sunlight!

Teacher: Exactly. Light energy, captured by chlorophyll - that's the green pigment in chloroplasts. These chloroplasts are like tiny solar panels in plant cells. Now, here's where it gets interesting. Photosynthesis actually happens in two stages: the light-dependent reactions and the light-independent reactions, also called the Calvin cycle.

Student 2: Why do they need two stages?

Teacher: Great question. The light-dependent reactions happen first, in the thylakoid membranes. This is where the plant captures light energy and converts it into chemical energy - specifically ATP and NADPH. Think of these as energy currency for the cell. It also splits water molecules, releasing oxygen as a waste product.

Student 3: So that's where our oxygen comes from?

Teacher: Yes! The oxygen we breathe is literally plant waste. Now, the second stage - the Calvin cycle - happens in the stroma. This is where the plant uses that ATP and NADPH energy to convert CO2 into glucose. No light needed for this part, which is why we call it light-independent.

Student 1: So the plant is basically converting solar energy into sugar?

Teacher: Perfect summary! And that sugar becomes the foundation of the entire food chain. When we eat plants, or eat animals that ate plants, we're essentially eating captured sunlight. That's why photosynthesis is arguably the most important chemical reaction on Earth.

Student 2: What happens at night? Can plants do photosynthesis in the dark?

Teacher: No, they can't. Without light, the light-dependent reactions can't occur, so they can't generate the ATP and NADPH needed for the Calvin cycle. But here's the thing - plants also do cellular respiration, just like us, to break down the glucose they made during the day to release energy for nighttime activities.`,

  metadata: {
    timestamp: new Date('2025-10-25T13:45:00Z'),
    duration: 240,
    sessionId: 'session_hs_bio_001',
    lessonId: 'lesson_photosynthesis',
    
    gradeLevel: GradeLevel.HIGH_SCHOOL,
    subject: Subject.SCIENCE,
    topic: 'Photosynthesis - Light-Dependent and Light-Independent Reactions',
    lessonObjective: 'Students will explain the process of photosynthesis and identify the roles of light-dependent and light-independent reactions',
    
    classSize: 28,
    teacherName: 'Dr. Chen',
    schoolName: 'Roosevelt High School',
    isLive: true,
    
    studentId: 'student_hs_5837',
    studentGradeLevel: GradeLevel.HIGH_SCHOOL,
    studentLearningPreferences: [
      LearningModality.LOGICAL,
      LearningModality.VISUAL,
      LearningModality.ASSOCIATIONS
    ],
    studentAccessibilityProfiles: [],
    preferredInstructionalStrategies: [
      InstructionalStrategy.DETAILED,
      InstructionalStrategy.SCAFFOLDED
    ],
    preferredCognitiveLoad: CognitiveLoadLevel.MODERATE,
    preferredContentDensity: ContentDensity.MODERATE,
    
    hasVisualAids: true,
    hasQuestions: true,
    hasDemonstration: false,
    isReview: false,
    isNewMaterial: true,
    
    audioQuality: 'good',
    transcriptionConfidence: 0.89
  },

  processingOptions: {
    includeSummary: true,
    includeVariants: true,
    includeLearningModalities: [
      LearningModality.VISUAL,
      LearningModality.LOGICAL,
      LearningModality.VERBAL,
      LearningModality.STORYTELLING
    ],
    includeVisualizations: true,
    includeVocabularyEnhancement: true,
    includeRelatedResearch: true,
    
    targetComplexity: ContentComplexity.MODERATE,
    targetCognitiveLoad: CognitiveLoadLevel.MODERATE,
    targetContentDensity: ContentDensity.MODERATE,
    instructionalStrategy: InstructionalStrategy.SCAFFOLDED,
    maxVariants: 4,
    maxVisualizationSuggestions: 6,
    prioritizeRealtime: false,
    
    maxResponseLength: 2000,
    allowExternalLinks: true,
    requireCitations: true
  }
};
```

---

### Example 4: Physics - Newton's Second Law

#### Input Object
```typescript
const highSchoolPhysicsInput: ExampleDialogInput = {
  content: `Teacher: Newton's second law states that F equals ma - force equals mass times acceleration. But let's make this concrete. I have two identical shopping carts here. I'm going to push both with the same force. Watch what happens.

[Sound of carts rolling]

Teacher: The empty cart zoomed across the room. The full cart barely moved. Why?

Student 1: The full one is heavier?

Teacher: Yes! More mass. Same force, but different masses, so different accelerations. Let's quantify this. If I push with 10 Newtons of force - that's the unit for force - and the empty cart has a mass of 5 kilograms, what's its acceleration?

Student 2: Um... 2?

Teacher: Close! Let's work through it. F = ma, so a = F divided by m. That's 10 Newtons divided by 5 kilograms, which gives us 2 meters per second squared. That's the acceleration.

Student 3: And the full cart?

Teacher: Let's say the full cart is 20 kilograms. Same 10 Newton push. So a = 10 divided by 20 = 0.5 meters per second squared. Four times the mass means one quarter the acceleration when you apply the same force.

Student 1: So if you want something heavy to accelerate fast, you need more force?

Teacher: Exactly! That's why a car needs a more powerful engine to accelerate quickly when it's loaded with passengers and cargo. More mass requires more force to achieve the same acceleration. This is why trucks have such powerful engines.

Student 2: Is this why it's harder to stop a moving truck than a car?

Teacher: Great connection! Yes, but that's actually related to Newton's first law - inertia. A truck in motion has more momentum because it has more mass. But the principle is connected. To slow down - that's negative acceleration, or deceleration - you need force. More mass means you need more braking force to achieve the same deceleration.`,

  metadata: {
    timestamp: new Date('2025-10-25T14:30:00Z'),
    duration: 180,
    sessionId: 'session_hs_phys_001',
    lessonId: 'lesson_newtons_second_law',
    
    gradeLevel: GradeLevel.HIGH_SCHOOL,
    subject: Subject.SCIENCE,
    topic: "Newton's Second Law of Motion",
    lessonObjective: 'Students will apply F=ma to calculate force, mass, or acceleration in real-world scenarios',
    
    classSize: 25,
    teacherName: 'Mr. Peterson',
    schoolName: 'Roosevelt High School',
    isLive: true,
    
    studentId: 'student_hs_6291',
    studentGradeLevel: GradeLevel.HIGH_SCHOOL,
    studentLearningPreferences: [
      LearningModality.KINESTHETIC,
      LearningModality.EXPERIENTIAL,
      LearningModality.PROBLEM_SOLVING
    ],
    studentAccessibilityProfiles: [],
    preferredInstructionalStrategies: [
      InstructionalStrategy.STEP_BY_STEP,
      InstructionalStrategy.GUIDED
    ],
    preferredCognitiveLoad: CognitiveLoadLevel.MODERATE,
    preferredContentDensity: ContentDensity.MODERATE,
    
    hasVisualAids: false,
    hasQuestions: true,
    hasDemonstration: true,
    isReview: false,
    isNewMaterial: true,
    
    audioQuality: 'fair',
    transcriptionConfidence: 0.87
  },

  processingOptions: {
    includeSummary: true,
    includeVariants: true,
    includeLearningModalities: [
      LearningModality.VISUAL,
      LearningModality.PROBLEM_SOLVING,
      LearningModality.KINESTHETIC,
      LearningModality.ASSOCIATIONS
    ],
    includeVisualizations: true,
    includeVocabularyEnhancement: true,
    
    targetComplexity: ContentComplexity.MODERATE,
    targetCognitiveLoad: CognitiveLoadLevel.MODERATE,
    targetContentDensity: ContentDensity.MODERATE,
    instructionalStrategy: InstructionalStrategy.GUIDED,
    maxVariants: 4,
    maxVisualizationSuggestions: 5,
    prioritizeRealtime: true,
    
    maxResponseLength: 1500,
    allowExternalLinks: false
  }
};
```

---

## Edge Case Examples

### Example 5: Poor Audio Quality - Muffled Teacher

#### Input Object
```typescript
const edgeCasePoorAudioInput: ExampleDialogInput = {
  content: `Teacher: [inaudible] ...mitochondria is the... [inaudible] ...powerhouse of the cell. It produces... [background noise] ...ATP through a process called... [muffled] ...cellular respiration.

Student 1: [unclear]

Teacher: What was that? Can you speak up?

Student 1: I said, where is it located?

Teacher: Oh! The mitochondria is... [inaudible] ...in the cytoplasm... [noise] ...it has a double membrane... [inaudible] ...the inner membrane is where... [long pause] ...sorry, let me adjust this mic... okay, can you hear me now?

Student 2: Yes!

Teacher: Good. So the inner membrane is folded into structures called cristae, and that's where the electron transport chain... [fading] ...happens...`,

  metadata: {
    timestamp: new Date('2025-10-25T09:00:00Z'),
    duration: 90,
    sessionId: 'session_edge_001',
    lessonId: 'lesson_cell_organelles',
    
    gradeLevel: GradeLevel.HIGH_SCHOOL,
    subject: Subject.SCIENCE,
    topic: 'Cell Organelles - Mitochondria',
    lessonObjective: 'Students will describe the structure and function of mitochondria',
    
    classSize: 30,
    isLive: true,
    
    studentId: 'student_edge_001',
    studentGradeLevel: GradeLevel.HIGH_SCHOOL,
    studentLearningPreferences: [LearningModality.VISUAL, LearningModality.VERBAL],
    
    hasVisualAids: false,
    hasQuestions: true,
    hasDemonstration: false,
    isReview: false,
    isNewMaterial: true,
    
    audioQuality: 'poor',
    transcriptionConfidence: 0.52
  },

  processingOptions: {
    includeSummary: true,
    includeVariants: true,
    includeVisualizations: true,
    includeVocabularyEnhancement: true,
    
    targetComplexity: ContentComplexity.MODERATE,
    maxVariants: 3,
    maxVisualizationSuggestions: 4,
    prioritizeRealtime: true,
    
    maxResponseLength: 1000
  }
};
```

---

### Example 6: Very Short Segment - Quick Clarification

#### Input Object
```typescript
const edgeCaseVeryShortInput: ExampleDialogInput = {
  content: `Student: Wait, so is it i before e except after c?

Teacher: Mostly, yes. "Believe" has i before e. But "receive" has e before i because it comes after c.

Student: Got it, thanks!`,

  metadata: {
    timestamp: new Date('2025-10-25T10:05:00Z'),
    duration: 12,
    sessionId: 'session_edge_002',
    lessonId: 'lesson_spelling_rules',
    
    gradeLevel: GradeLevel.ELEMENTARY_35,
    subject: Subject.LANGUAGE_ARTS,
    topic: 'Spelling Rules and Patterns',
    
    classSize: 20,
    isLive: true,
    
    studentId: 'student_edge_002',
    studentGradeLevel: GradeLevel.ELEMENTARY_35,
    
    hasQuestions: true,
    isReview: true,
    isNewMaterial: false,
    
    audioQuality: 'excellent',
    transcriptionConfidence: 0.98
  },

  processingOptions: {
    includeSummary: true,
    includeVariants: false,
    includeVisualizations: false,
    
    targetComplexity: ContentComplexity.SIMPLE,
    prioritizeRealtime: true,
    
    maxResponseLength: 200
  }
};
```

---

### Example 7: Very Long Segment - Detailed Lecture

#### Input Object
```typescript
const edgeCaseVeryLongInput: ExampleDialogInput = {
  content: `Teacher: Let's talk about the causes of World War I. Many history books will tell you it started with the assassination of Archduke Franz Ferdinand in Sarajevo on June 28, 1914. And yes, that was the immediate trigger. But the real causes go much deeper, and we need to understand the complex web of factors that made Europe a powder keg waiting to explode.

First, let's talk about nationalism. In the early 20th century, nationalist movements were sweeping across Europe. People strongly identified with their ethnic groups and wanted political autonomy. This was particularly intense in the Balkans, where Slavic peoples under Austro-Hungarian rule wanted independence. Serbia, as an independent Slavic nation, supported these movements, which created enormous tension with Austria-Hungary.

Second, imperialism. The major European powers were competing for colonies and resources around the world. Britain and France had established vast empires. Germany, unified only in 1871, felt it deserved its "place in the sun" and wanted colonies too. This competition bred rivalry and mistrust between nations.

Third, militarism. European nations were engaged in an arms race, building up their militaries and developing new weapons. Military leaders had enormous political influence. War plans were drawn up years in advance. There was a belief that war was inevitable and that being prepared was essential. The culture glorified military strength.

Fourth, and this is crucial, the alliance system. Europe was divided into two major alliance blocs. On one side, the Triple Alliance of Germany, Austria-Hungary, and Italy. On the other, the Triple Entente of France, Russia, and Britain. These alliances were supposed to maintain peace through a balance of power. If you attack my ally, I attack you. The theory was this would deter aggression.

But here's what actually happened. When Austria-Hungary blamed Serbia for the assassination and declared war on July 28, 1914, the alliance system turned a regional conflict into a continental war. Russia mobilized to defend Serbia, its Slavic ally. Germany, bound to Austria-Hungary, declared war on Russia. France, allied with Russia, was drawn in. Germany's war plan - the Schlieffen Plan - required attacking France through neutral Belgium. When Germany invaded Belgium, Britain, which had guaranteed Belgian neutrality, declared war on Germany.

Within weeks, all the major powers were at war. What started as a dispute between Austria-Hungary and Serbia became a world war because of these interlocking alliances. It's like a domino effect - once one fell, they all fell.

Now, there's debate among historians about which factor was most important. Some emphasize the role of militarism and the war plans that were so rigid they couldn't be stopped once mobilization began. Others focus on nationalism and imperial rivalry. The Marxist interpretation emphasizes economic competition between capitalist powers.

Student 1: So was the assassination just an excuse?

Teacher: Not quite an excuse, but yes, it was more of a spark than a cause. Without all these underlying tensions - the nationalism, imperialism, militarism, and alliances - the assassination might have led to a limited war between Austria-Hungary and Serbia, or perhaps even a diplomatic resolution. But given the context, it triggered a catastrophic chain reaction.

Student 2: Why didn't the leaders stop it?

Teacher: Great question. Some tried. There were last-minute diplomatic efforts. But once mobilization began, military timetables took over. The generals said if we delay, we'll lose the war. There was also a tragic miscalculation - many leaders thought the war would be short, over by Christmas 1914. They didn't anticipate four years of devastating trench warfare.

Student 3: And this led to World War II too, right?

Teacher: Absolutely. The Treaty of Versailles, which ended World War I, imposed harsh terms on Germany - huge reparations, loss of territory, limits on military. This created resentment that Hitler exploited. So in a sense, the unresolved issues from World War I set the stage for World War II. But that's a topic for next week.

Let me summarize the four main causes: nationalism, imperialism, militarism, and the alliance system. Remember the acronym MAIN - Militarism, Alliances, Imperialism, Nationalism. And remember that the assassination was the trigger, not the cause. The conditions for war already existed.`,

  metadata: {
    timestamp: new Date('2025-10-25T11:00:00Z'),
    duration: 420, // 7 minutes
    sessionId: 'session_edge_003',
    lessonId: 'lesson_wwi_causes',
    
    gradeLevel: GradeLevel.HIGH_SCHOOL,
    subject: Subject.HISTORY,
    topic: 'Causes of World War I',
    lessonObjective: 'Students will analyze the multiple causes of World War I and explain how they interacted',
    
    classSize: 27,
    teacherName: 'Ms. Washington',
    schoolName: 'Roosevelt High School',
    isLive: true,
    
    studentId: 'student_edge_003',
    studentGradeLevel: GradeLevel.HIGH_SCHOOL,
    studentLearningPreferences: [
      LearningModality.VERBAL,
      LearningModality.LOGICAL,
      LearningModality.ASSOCIATIONS
    ],
    preferredInstructionalStrategies: [
      InstructionalStrategy.DETAILED,
      InstructionalStrategy.SUMMARIZED
    ],
    preferredCognitiveLoad: CognitiveLoadLevel.HIGH,
    preferredContentDensity: ContentDensity.DENSE,
    
    hasVisualAids: false,
    hasQuestions: true,
    hasDemonstration: false,
    isReview: false,
    isNewMaterial: true,
    
    audioQuality: 'good',
    transcriptionConfidence: 0.91
  },

  processingOptions: {
    includeSummary: true,
    includeVariants: true,
    includeLearningModalities: [
      LearningModality.VISUAL,
      LearningModality.VERBAL,
      LearningModality.LOGICAL,
      LearningModality.STORYTELLING
    ],
    includeVisualizations: true,
    includeVocabularyEnhancement: true,
    includeRelatedResearch: true,
    
    targetComplexity: ContentComplexity.COMPLEX,
    targetCognitiveLoad: CognitiveLoadLevel.HIGH,
    targetContentDensity: ContentDensity.DENSE,
    instructionalStrategy: InstructionalStrategy.SUMMARIZED,
    maxVariants: 5,
    maxVisualizationSuggestions: 8,
    prioritizeRealtime: false,
    
    maxResponseLength: 3000,
    allowExternalLinks: true,
    requireCitations: true
  }
};
```

---

## Mock AI Responses

### Mock Response 1: Elementary Math Fractions

```typescript
const mockResponse1: ExampleAIResponse = {
  requestId: 'req_001_elem_math_fractions',
  timestamp: new Date('2025-10-25T10:30:03Z'),
  processingTime: 2847, // milliseconds
  
  summary: {
    oneSentence: "Fractions show parts of a whole, like eating 1 out of 4 pizza slices (1/4), and equivalent fractions like 2/8 and 1/4 represent the same amount.",
    
    shortSummary: "The lesson introduces fractions using pizza slices as a visual example. Students learn that the denominator shows how many equal parts make up the whole, while the numerator shows how many parts we're talking about. The concept of equivalent fractions (2/8 = 1/4) is introduced.",
    
    detailedSummary: "Mrs. Johnson teaches third graders about fractions using a pizza demonstration. She explains that fractions represent parts of a whole, introducing key vocabulary: numerator (top number - how many parts) and denominator (bottom number - total equal parts). Using a pizza cut into 4 slices, she shows that eating 1 slice means eating 1/4 of the pizza, leaving 3/4. The lesson progresses to equivalent fractions, demonstrating that 2/8 equals 1/4 because they represent the same amount of pizza, even though they're written differently. One student shows initial confusion about why these are equivalent, which the teacher addresses by offering to draw out the comparison. The lesson emphasizes visual understanding and real-world applications.",
    
    keyPoints: [
      "Fractions show parts of a whole",
      "The denominator (bottom) = total equal parts",
      "The numerator (top) = parts we're talking about",
      "1/4 means 1 out of 4 equal parts",
      "Equivalent fractions (2/8 = 1/4) represent the same amount",
      "Visual representations help understand fractions"
    ],
    
    mainConcepts: [
      "Fraction definition and representation",
      "Numerator and denominator",
      "Equal parts of a whole",
      "Equivalent fractions"
    ],
    
    vocabulary: [
      {
        term: "Fraction",
        definition: "A number that represents part of a whole, written as one number over another (like 1/4)",
        simplifiedDefinition: "A way to show pieces of something",
        exampleUsage: "If I eat 1 slice out of 4, I ate 1/4 of the pizza",
        relatedTerms: ["numerator", "denominator", "part", "whole"],
        ageAppropriateLevel: GradeLevel.ELEMENTARY_35
      },
      {
        term: "Numerator",
        definition: "The top number in a fraction that shows how many parts you have",
        simplifiedDefinition: "The number on top that counts the pieces",
        exampleUsage: "In 3/4, the 3 is the numerator - we have 3 pieces",
        relatedTerms: ["fraction", "denominator"],
        ageAppropriateLevel: GradeLevel.ELEMENTARY_35
      },
      {
        term: "Denominator",
        definition: "The bottom number in a fraction that shows how many equal parts make up the whole",
        simplifiedDefinition: "The number on bottom that shows total pieces",
        exampleUsage: "In 3/4, the 4 is the denominator - the whole is cut into 4 pieces",
        relatedTerms: ["fraction", "numerator"],
        ageAppropriateLevel: GradeLevel.ELEMENTARY_35
      },
      {
        term: "Equivalent Fractions",
        definition: "Different fractions that represent the same amount",
        simplifiedDefinition: "Fractions that are equal even though they look different",
        exampleUsage: "2/8 and 1/4 are equivalent fractions - they're the same amount of pizza",
        relatedTerms: ["fraction", "equal"],
        ageAppropriateLevel: GradeLevel.ELEMENTARY_35
      }
    ],
    
    questions: [
      {
        question: "What is a fraction?",
        askedBy: "teacher",
        answer: "It's like when you cut something into pieces",
        timestamp: 8
      },
      {
        question: "If I cut pizza into 4 slices and eat 1, what do I have left?",
        askedBy: "teacher",
        answer: "Three slices",
        timestamp: 28
      },
      {
        question: "So the 3 slices left would be 3/4?",
        askedBy: "student",
        answer: "Perfect! You've got it.",
        timestamp: 62
      },
      {
        question: "What if I cut the pizza into 8 slices and ate 2?",
        askedBy: "teacher",
        answer: "That would be 2/8",
        timestamp: 75
      },
      {
        question: "Can anyone see why 2/8 equals 1/4?",
        askedBy: "teacher",
        answer: "Because 2 is half of 4... and 8 is... wait, I'm confused",
        timestamp: 90
      }
    ],
    
    complexity: ContentComplexity.SIMPLE,
    estimatedComprehension: 0.75, // Students seem to understand basic concept but confused about equivalence
    suggestedFollowUp: [
      "Practice identifying fractions with visual models",
      "More examples of equivalent fractions",
      "Hands-on activity: cutting shapes into fractions",
      "Worksheet: matching fractions to pictures"
    ]
  },
  
  formattedContent: {
    rawContent: "See input content",
    formattedHtml: `
      <div class="lesson-content fraction-lesson">
        <h2>🍕 Understanding Fractions</h2>
        
        <section class="concept">
          <h3>What is a Fraction?</h3>
          <p><strong>A fraction shows parts of a whole.</strong></p>
          <p>Think of a pizza cut into equal slices!</p>
        </section>
        
        <section class="key-terms">
          <h3>Important Words</h3>
          <div class="term-card">
            <div class="term-name">Numerator</div>
            <div class="term-def">Top number → How many parts you have</div>
            <div class="example">In <span class="fraction"><sup>1</sup>/<sub>4</sub></span>, 1 is the numerator</div>
          </div>
          <div class="term-card">
            <div class="term-name">Denominator</div>
            <div class="term-def">Bottom number → Total equal parts</div>
            <div class="example">In <span class="fraction"><sup>1</sup>/<sub>4</sub></span>, 4 is the denominator</div>
          </div>
        </section>
        
        <section class="example">
          <h3>Pizza Example</h3>
          <ul>
            <li>🍕 1 whole pizza = 4 equal slices</li>
            <li>🍕 Eat 1 slice = <span class="fraction"><sup>1</sup>/<sub>4</sub></span> eaten</li>
            <li>🍕🍕🍕 3 slices left = <span class="fraction"><sup>3</sup>/<sub>4</sub></span> remaining</li>
          </ul>
        </section>
        
        <section class="advanced-concept">
          <h3>Equivalent Fractions</h3>
          <p><strong>Different fractions can show the same amount!</strong></p>
          <div class="equivalence">
            <span class="fraction"><sup>1</sup>/<sub>4</sub></span> = <span class="fraction"><sup>2</sup>/<sub>8</sub></span>
          </div>
          <p class="explanation">One slice out of 4 = Two slices out of 8</p>
        </section>
      </div>
    `,
    hasHighlights: true,
    hasAnnotations: false,
    hasInteractiveElements: false,
    sections: [
      {
        id: "section_concept",
        type: "paragraph",
        content: "A fraction shows parts of a whole. Think of a pizza!",
        importance: "high",
        relatedConcepts: ["parts", "whole", "division"]
      },
      {
        id: "section_terms",
        type: "list",
        content: "Numerator = top number, Denominator = bottom number",
        importance: "high",
        relatedConcepts: ["fraction notation"]
      },
      {
        id: "section_example",
        type: "paragraph",
        content: "1/4 of a pizza means 1 slice out of 4 total slices",
        importance: "high",
        relatedConcepts: ["visual representation"]
      }
    ]
  },
  
  variants: [
    {
      id: "variant_visual_simple",
      modality: LearningModality.VISUAL,
      strategy: InstructionalStrategy.STEP_BY_STEP,
      complexity: ContentComplexity.SIMPLE,
      cognitiveLoad: CognitiveLoadLevel.LOW,
      contentDensity: ContentDensity.LIGHT,
      title: "Fractions with Pictures",
      content: `**Step 1: What's a Fraction?**

A fraction is a piece of something.

🍕 ➔ Cut into pieces ➔ 🍕🍕🍕🍕

**Step 2: The Numbers**

<big><sup>1</sup>/<sub>4</sub></big>

• Top number (1) = pieces you have
• Bottom number (4) = total pieces

**Step 3: Try It!**

Pizza cut into 4 slices:
- Eat 1 slice = 1/4 eaten ✓
- 3 slices left = 3/4 left ✓

**Step 4: Same Amount, Different Look**

Sometimes fractions look different but mean the same thing!

1/4 = 2/8 (Same amount of pizza!)`,
      estimatedReadingTime: 60,
      targetAudience: [GradeLevel.ELEMENTARY_K2, GradeLevel.ELEMENTARY_35],
      accessibilityProfiles: [
        AccessibilityProfile.ADHD_OPTIMIZED,
        AccessibilityProfile.POOR_WORKING_MEMORY,
        AccessibilityProfile.DYSLEXIA_FRIENDLY
      ],
      strengths: [
        "Very short chunks",
        "Lots of emojis and visual breaks",
        "Clear step-by-step structure",
        "Simple language"
      ],
      bestFor: "Visual learners who need short, clear steps with minimal text",
      isChunked: true,
      chunkCount: 4
    },
    {
      id: "variant_storytelling",
      modality: LearningModality.STORYTELLING,
      strategy: InstructionalStrategy.SCAFFOLDED,
      complexity: ContentComplexity.SIMPLE,
      cognitiveLoad: CognitiveLoadLevel.LOW,
      contentDensity: ContentDensity.LIGHT,
      title: "The Pizza Party Story",
      content: `**The Pizza Party**

You and your 3 friends ordered a pizza for your party. That's 4 people total!

The pizza arrives. It's already cut into 4 big slices - perfect! One slice for each person.

You take your slice. Now you have 1 out of the 4 slices. 

We write that as **1/4** (say "one fourth").

Your friend asks, "How much pizza is left?"

You count: 1, 2, 3 slices still in the box. That's **3/4** of the pizza!

**Later...**

The next pizza arrives, but this one is cut into 8 smaller slices.

You're hungry, so you take 2 slices.

That's **2/8** of the pizza.

But wait - your mom says 2/8 is the same as 1/4!

How can that be? You took TWO slices this time!

She shows you: 2 small slices from the 8-slice pizza take up the same space as 1 big slice from the 4-slice pizza.

Different numbers, same amount of pizza! These are called **equivalent fractions**.`,
      estimatedReadingTime: 90,
      targetAudience: [GradeLevel.ELEMENTARY_35],
      accessibilityProfiles: [
        AccessibilityProfile.ADHD_OPTIMIZED,
        AccessibilityProfile.AUTISM_FRIENDLY
      ],
      strengths: [
        "Narrative format",
        "Relatable context",
        "Builds understanding gradually",
        "Clear, literal language"
      ],
      bestFor: "Students who learn best through stories and real-world scenarios",
      isChunked: false
    },
    {
      id: "variant_kinesthetic",
      modality: LearningModality.KINESTHETIC,
      strategy: InstructionalStrategy.MULTI_SENSORY,
      complexity: ContentComplexity.SIMPLE,
      cognitiveLoad: CognitiveLoadLevel.LOW,
      contentDensity: ContentDensity.SPARSE,
      title: "Hands-On Fraction Activity",
      content: `**Let's Make Fractions!**

**You'll need:** Paper, scissors, crayons

**Activity 1: Make Your Own Pizza**

1. Draw a big circle (your pizza)
2. Draw 2 lines through the middle to make 4 equal slices
3. Color 1 slice red (that's the eaten slice)
4. Count: 1 colored out of 4 total = **1/4**

**Activity 2: Fold to Learn**

1. Take a piece of paper
2. Fold it in half
3. Fold it in half again
4. Open it up - how many sections? **4!**
5. Shade 1 section = **1/4**
6. Shade 3 sections = **3/4**

**Activity 3: Equivalent Fractions**

1. Get another paper
2. Fold in half, then in half, then in half again
3. Open it - how many sections? **8!**
4. Shade 2 sections = **2/8**
5. Compare to your first paper with 1/4 shaded
6. Same size! **1/4 = 2/8**

**Try it yourself!** The more you fold, touch, and see fractions, the better you'll understand them!`,
      estimatedReadingTime: 120,
      targetAudience: [GradeLevel.ELEMENTARY_35],
      accessibilityProfiles: [
        AccessibilityProfile.ADHD_OPTIMIZED,
        AccessibilityProfile.POOR_WORKING_MEMORY
      ],
      strengths: [
        "Physical, hands-on learning",
        "Multi-sensory engagement",
        "Clear instructions",
        "Self-paced discovery"
      ],
      bestFor: "Kinesthetic learners who need to physically manipulate objects to understand concepts",
      isChunked: true,
      chunkCount: 3
    },
    {
      id: "variant_problem_solving",
      modality: LearningModality.PROBLEM_SOLVING,
      strategy: InstructionalStrategy.GUIDED,
      complexity: ContentComplexity.SIMPLE,
      cognitiveLoad: CognitiveLoadLevel.LOW,
      contentDensity: ContentDensity.MODERATE,
      title: "Practice Problems with Fractions",
      content: `**Fraction Practice Problems**

**Problem 1: Pizza Slices**
A pizza has 4 slices. You eat 1 slice.
- What fraction did you eat? **1/4** ✓
- What fraction is left? **3/4** ✓

**Problem 2: Chocolate Bar**
A chocolate bar has 8 pieces. You eat 2 pieces.
- What fraction did you eat? **2/8** ✓
- What fraction is left? **6/8** ✓

**Problem 3: Think About It!**
Look at problems 1 and 2.
- In problem 1, you ate 1/4
- In problem 2, you ate 2/8
- Are these the same amount? **Yes!** They're equivalent.

**Problem 4: Your Turn**
A cake is cut into 6 slices. You eat 1 slice.
- What fraction did you eat? **_____**
- What fraction is left? **_____**

**Challenge Problem!**
A pie is cut into 12 slices. You want to eat the same amount as 1/4 of a pizza (cut into 4 slices). How many pie slices should you eat?

*Hint: 1/4 of 4 is 1 slice. What's 1/4 of 12?*

**Answer: 3 slices! That's 3/12, which equals 1/4**`,
      estimatedReadingTime: 120,
      targetAudience: [GradeLevel.ELEMENTARY_35],
      accessibilityProfiles: [],
      strengths: [
        "Active problem-solving",
        "Scaffolded difficulty",
        "Immediate feedback",
        "Builds confidence through practice"
      ],
      bestFor: "Students who learn by doing and solving problems",
      isChunked: true,
      chunkCount: 4
    }
  ],
  
  learningModalities: [
    {
      modality: LearningModality.VISUAL,
      variants: [
        /* Reference to variant_visual_simple from variants array */
      ],
      visualizationSuggestions: [
        /* Will be populated below */
      ],
      relatedActions: [
        {
          id: "action_see_visual_variants",
          type: ActionType.SEE_VARIANTS,
          label: "See Picture Version",
          description: "Show the same lesson with more diagrams and visual examples",
          icon: "👁️",
          contextualRelevance: 0.9,
          suggestedTiming: "immediate"
        }
      ]
    },
    {
      modality: LearningModality.KINESTHETIC,
      variants: [
        /* Reference to variant_kinesthetic */
      ],
      visualizationSuggestions: [],
      relatedActions: [
        {
          id: "action_hands_on",
          type: ActionType.CHANGE_MODALITY,
          label: "Try Hands-On Activity",
          description: "Get instructions for a paper-folding activity to make fractions",
          icon: "✂️",
          contextualRelevance: 0.85,
          suggestedTiming: "after_reading"
        }
      ]
    },
    {
      modality: LearningModality.STORYTELLING,
      variants: [
        /* Reference to variant_storytelling */
      ],
      visualizationSuggestions: [],
      relatedActions: [
        {
          id: "action_story_version",
          type: ActionType.CHANGE_MODALITY,
          label: "Hear the Story",
          description: "Learn about fractions through a pizza party story",
          icon: "📖",
          contextualRelevance: 0.75,
          suggestedTiming: "if_confused"
        }
      ]
    }
  ],
  
  visualizationSuggestions: [
    {
      id: "viz_pizza_fractions",
      type: VisualizationType.INTERACTIVE_DIAGRAM,
      title: "Interactive Pizza Fractions",
      description: "Click to slice the pizza and see fractions change in real-time",
      priority: "critical",
      conceptToVisualize: "What fractions look like with pizza slices",
      suggestedContent: "SVG pizza that can be divided into 4 or 8 slices, with clickable slices that show the fraction when selected",
      suggestedAnimations: [AnimationStyle.FADE, AnimationStyle.SCALE],
      suggestedInteractions: [InteractionType.CLICK, InteractionType.TOUCH],
      autoPlay: false,
      loopAnimation: false,
      estimatedComplexity: "moderate",
      estimatedGenerationTime: 5,
      requiresInteractivity: true,
      bestForModalities: [
        LearningModality.VISUAL,
        LearningModality.KINESTHETIC
      ],
      cognitiveLoad: "low",
      exampleStructure: "SVG circle with path elements for slices, click handlers to toggle 'eaten' class, fraction display updates dynamically"
    },
    {
      id: "viz_fraction_bars",
      type: VisualizationType.ANIMATED_SVG,
      title: "Fraction Bars Animation",
      description: "Watch bars fill up to show different fractions visually",
      priority: "high",
      conceptToVisualize: "Visual comparison of fractions like 1/4, 2/4, 3/4",
      suggestedContent: "Horizontal bars that fill from left to right, with labeled sections showing 1/4, 2/4, 3/4, 4/4",
      suggestedAnimations: [AnimationStyle.SLIDE, AnimationStyle.FADE],
      suggestedInteractions: [InteractionType.AUTO_PLAY],
      autoPlay: true,
      loopAnimation: true,
      estimatedComplexity: "simple",
      estimatedGenerationTime: 3,
      requiresInteractivity: false,
      bestForModalities: [LearningModality.VISUAL],
      cognitiveLoad: "low",
      exampleStructure: "SVG rectangles with width animations, CSS transitions"
    },
    {
      id: "viz_equivalent_comparison",
      type: VisualizationType.BEFORE_AFTER_SLIDER,
      title: "Equivalent Fractions Slider",
      description: "Slide to compare 1/4 and 2/8 side-by-side to see they're the same",
      priority: "high",
      conceptToVisualize: "Why 1/4 equals 2/8 (equivalent fractions)",
      suggestedContent: "Two circles side by side - one divided into 4 parts with 1 shaded, another into 8 parts with 2 shaded. Slider overlays them to show equality",
      suggestedAnimations: [AnimationStyle.SLIDE],
      suggestedInteractions: [InteractionType.DRAG, InteractionType.TOUCH],
      autoPlay: false,
      loopAnimation: false,
      estimatedComplexity: "moderate",
      estimatedGenerationTime: 6,
      requiresInteractivity: true,
      bestForModalities: [
        LearningModality.VISUAL,
        LearningModality.KINESTHETIC
      ],
      cognitiveLoad: "medium",
      exampleStructure: "Two SVG circles with overlapping capability, draggable slider control"
    },
    {
      id: "viz_fraction_number_line",
      type: VisualizationType.HTML_INTERACTIVE,
      title: "Fraction Number Line",
      description: "Place fractions on a number line from 0 to 1",
      priority: "medium",
      conceptToVisualize: "Where fractions fit between 0 and 1",
      suggestedContent: "Number line with markers at 0, 1/4, 2/4, 3/4, and 1. Interactive markers can be dragged to practice",
      suggestedAnimations: [AnimationStyle.BOUNCE],
      suggestedInteractions: [InteractionType.DRAG, InteractionType.CLICK],
      autoPlay: false,
      loopAnimation: false,
      estimatedComplexity: "moderate",
      estimatedGenerationTime: 5,
      requiresInteractivity: true,
      bestForModalities: [
        LearningModality.LOGICAL,
        LearningModality.VISUAL
      ],
      cognitiveLoad: "medium",
      exampleStructure: "HTML5 canvas or SVG with draggable elements, snap-to-grid functionality"
    },
    {
      id: "viz_paper_folding",
      type: VisualizationType.STEP_SEQUENCE,
      title: "Paper Folding Guide",
      description: "Step-by-step visual guide for the hands-on paper folding activity",
      priority: "medium",
      conceptToVisualize: "How to fold paper to make fraction models",
      suggestedContent: "Illustrated steps: 1) Start with square 2) Fold in half 3) Fold again 4) Open to reveal fourths",
      suggestedAnimations: [AnimationStyle.FADE, AnimationStyle.SLIDE],
      suggestedInteractions: [InteractionType.CLICK, InteractionType.KEYBOARD],
      autoPlay: false,
      loopAnimation: false,
      estimatedComplexity: "simple",
      estimatedGenerationTime: 4,
      requiresInteractivity: true,
      bestForModalities: [
        LearningModality.KINESTHETIC,
        LearningModality.VISUAL
      ],
      cognitiveLoad: "low",
      exampleStructure: "Sequence of SVG images with next/previous buttons",
      templateId: "step_sequence_template"
    }
  ],
  
  generatedVisualizations: [
    {
      id: "gen_viz_pizza_simple",
      suggestionId: "viz_pizza_fractions",
      type: VisualizationType.INTERACTIVE_DIAGRAM,
      title: "Click the Pizza Slices",
      htmlContent: `<!-- Full HTML would be generated here -->
        <div class="pizza-fraction-interactive">
          <svg viewBox="0 0 200 200" class="pizza">
            <!-- SVG pizza with clickable slices -->
          </svg>
          <div class="fraction-display">
            <span class="numerator">0</span>
            /
            <span class="denominator">4</span>
          </div>
        </div>`,
      animations: [
        {
          style: AnimationStyle.SCALE,
          duration: 300,
          easing: "ease-out",
          trigger: InteractionType.CLICK
        }
      ],
      interactions: [
        {
          type: InteractionType.CLICK,
          target: ".pizza-slice",
          action: "Toggle eaten state and update fraction display",
          feedback: "Slice scales up slightly and changes color"
        }
      ],
      isInteractive: true,
      isAnimated: true,
      accessibilityDescription: "Interactive pizza diagram with 4 clickable slices. Click slices to mark them as eaten and see the fraction update.",
      reducedMotionAlternative: "Static pizza diagram with fraction selector buttons below",
      styles: "/* CSS would be here */",
      scripts: "/* JavaScript would be here */",
      estimatedRenderTime: 50,
      isResponsive: true,
      mobileOptimized: true
    }
  ],
  
  availableActions: [
    {
      id: "action_visualize",
      type: ActionType.VISUALIZE,
      label: "See Pizza Diagram",
      description: "Show an interactive pizza that you can click to understand fractions visually",
      icon: "🍕",
      contextualRelevance: 0.95,
      suggestedTiming: "immediate"
    },
    {
      id: "action_practice",
      type: ActionType.QUIZ_ME,
      label: "Practice Problems",
      description: "Try some fraction problems to test what you learned",
      icon: "📝",
      contextualRelevance: 0.85,
      suggestedTiming: "after_reading"
    },
    {
      id: "action_simplify",
      type: ActionType.SIMPLIFY,
      label: "Make It Simpler",
      description: "Show an even easier explanation with just the basics",
      icon: "⬇️",
      contextualRelevance: 0.7,
      suggestedTiming: "if_confused"
    },
    {
      id: "action_hands_on",
      type: ActionType.CHANGE_MODALITY,
      label: "Try Activity",
      description: "Get instructions for a hands-on paper folding activity",
      icon: "✂️",
      parameters: { targetModality: LearningModality.KINESTHETIC },
      contextualRelevance: 0.8,
      suggestedTiming: "after_reading"
    },
    {
      id: "action_examples",
      type: ActionType.ADD_EXAMPLES,
      label: "More Examples",
      description: "See more fraction examples with different foods and objects",
      icon: "➕",
      contextualRelevance: 0.75,
      suggestedTiming: "after_reading"
    }
  ],
  
  vocabularyEnhancements: [
    /* Already included in summary.vocabulary */
  ],
  
  relatedResearch: undefined, // Not requested for elementary level
  
  confidence: 0.88,
  appropriatenessScore: 0.95,
  warnings: [
    {
      code: "STUDENT_CONFUSION_DETECTED",
      severity: "medium",
      message: "Student showed confusion about equivalent fractions (2/8 = 1/4)",
      suggestedAction: "Provide additional visual explanation or hands-on activity",
      affectedFields: ["summary.estimatedComprehension"]
    },
    {
      code: "CONCEPT_INTRODUCED_NOT_FULLY_EXPLAINED",
      severity: "low",
      message: "Teacher mentioned equivalent fractions but will explain more later",
      suggestedAction: "Mark this topic for follow-up in next lesson",
      affectedFields: ["summary.suggestedFollowUp"]
    }
  ],
  
  isPartialResponse: false,
  expectedCompletionTime: undefined
};
```

---

*Continuing with more mock responses in next section...*

