# X2 — Accessibility

> Comprehensive accessibility support including WCAG 2.1 AA compliance, cognitive accessibility modes (ADHD, Autism, Dyslexia), text-to-speech, and adaptive content delivery.

**Status:** Planned — *Core MVP Feature*
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | ExpanseFrontend accessibility docs

---

## Overview

Accessibility is a **core product value** of 4eye, not an afterthought. The platform serves users with diverse abilities, learning styles, and needs. This includes:
- Traditional WCAG compliance (visual, motor, cognitive)
- Cognitive accessibility modes (ADHD, Autism, Dyslexia)
- Content adaptation (reading levels, translation)
- Multi-modal content delivery (text, audio, visual)

---

## Accessibility Modes

### Mode Definitions

| Mode | Target Users | Key Characteristics |
|------|--------------|---------------------|
| **Default** | General population | Standard interface and content |
| **ADHD** | Users with attention challenges | Reduced cognitive load, focus features |
| **Autism** | Users on autism spectrum | Predictability, literal language |
| **Dyslexia** | Users with reading difficulties | Reading aids, TTS integration |
| **Low Vision** | Users with visual impairments | High contrast, screen reader optimized |
| **Cognitive** | Users with cognitive challenges | Maximum simplification |

### Mode Features Matrix

| Feature | ADHD | Autism | Dyslexia | Low Vision | Cognitive |
|---------|------|--------|----------|------------|-----------|
| Shorter paragraphs | ✅ | | ✅ | | ✅ |
| Bullet points | ✅ | ✅ | | | ✅ |
| Literal language | | ✅ | | | |
| No idioms/sarcasm | | ✅ | | | |
| Simple vocabulary | | | ✅ | | ✅ |
| Numbered steps | | ✅ | | | ✅ |
| Focus mode | ✅ | | | | |
| TTS auto-suggest | | | ✅ | ✅ | |
| High contrast | | | | ✅ | |
| Summary first | ✅ | | | | ✅ |
| Progress indicators | ✅ | | | | |
| Consistent layout | | ✅ | | | |
| Break reminders | ✅ | | | | |

---

## AI Prompt Modifications

Each accessibility mode injects specific instructions into AI prompts.

### ADHD Mode Instructions

```
ACCESSIBILITY: ADHD Mode

Format Guidelines:
- Keep paragraphs to 2-3 sentences MAXIMUM
- Use bullet points for lists (never inline)
- Bold the MOST IMPORTANT word in each paragraph
- Put the key takeaway FIRST, then supporting details
- Include clear visual breaks (---) between sections

Content Guidelines:
- Get to the point immediately (no preambles)
- One idea per paragraph
- End with a single, clear action item
- Avoid tangents or "by the way" additions

Engagement:
- Use direct, active voice
- Include a brief summary at the end
- Ask one follow-up question to maintain focus
```

### Autism Mode Instructions

```
ACCESSIBILITY: Autism-Friendly Mode

Language Guidelines:
- Use LITERAL language only
- NO idioms, metaphors, or figures of speech
- If you must use a common phrase, explain it: "raining cats and dogs (meaning raining heavily)"
- NO sarcasm or implied meanings
- Be explicit about what you mean

Structure Guidelines:
- Use the SAME structure for similar types of content
- Number ALL steps in sequences
- Use specific nouns, not pronouns (say "the function" not "it")
- State assumptions explicitly

Expectations:
- Tell the user exactly what will happen next
- If there are multiple interpretations, state which one you mean
- End with "Next, you can..." to set clear expectations
```

### Dyslexia Mode Instructions

```
ACCESSIBILITY: Dyslexia-Friendly Mode

Vocabulary:
- Use words with 8th grade reading level or below
- Avoid jargon; if technical terms needed, define them
- Spell out abbreviations on first use
- Use common, familiar words over precise technical ones

Sentence Structure:
- Maximum 15 words per sentence
- One idea per sentence
- Active voice only ("You click the button" not "The button is clicked")
- Subject-verb-object order

Visual Formatting:
- Extra line breaks between paragraphs
- Use numbered lists for any sequence
- Avoid walls of text
- Suggest:" 🔊 Tip: Use the Read Aloud button to hear this content"
```

### Low Vision Mode Instructions

```
ACCESSIBILITY: Low Vision Mode

Content:
- Describe any visual elements in detail
- Don't rely on visual formatting to convey meaning
- Use words like "first, second, third" instead of "above, below, left"
- Suggest: "🔊 Read Aloud is available for this content"

Structure:
- Use clear heading hierarchy (conveyed in text)
- Announce section changes: "Moving to the next topic..."
- Describe colors, shapes, or layouts when referenced
```

### Cognitive Mode Instructions

```
ACCESSIBILITY: Cognitive Support Mode

Language:
- Use the SIMPLEST words possible
- Define any term that might be unclear
- Repeat important information in different ways

Structure:
- Break everything into numbered micro-steps
- After 2-3 points, summarize what was covered
- Ask: "Does this make sense so far? [Yes/Explain more]"

Support:
- Provide a concrete example for every concept
- Offer to repeat or rephrase
- Use analogies to everyday objects
- End with: "Main point: [one sentence summary]"
```

---

## User Preferences

### AccessibilityPreferences Type

```typescript
interface AccessibilityPreferences {
  // Primary mode
  accessibilityMode: AccessibilityMode;
  
  // Visual
  theme: 'light' | 'dark' | 'high-contrast' | 'system';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  lineSpacing: 'normal' | 'relaxed' | 'spacious';
  fontFamily: 'system' | 'sans-serif' | 'dyslexia-friendly';
  
  // Audio
  ttsEnabled: boolean;
  ttsAutoRead: boolean;
  ttsVoice: string;
  ttsRate: number; // 0.5 - 2.0
  
  // Motion
  reduceMotion: boolean;
  reduceTransparency: boolean;
  
  // Focus
  focusModeEnabled: boolean;
  breakRemindersEnabled: boolean;
  breakReminderInterval: number; // minutes
  
  // Content
  preferredReadingLevel: ReadingLevel;
  showDefinitionsInline: boolean;
}

type AccessibilityMode = 
  | 'default'
  | 'adhd'
  | 'autism'
  | 'dyslexia'
  | 'low-vision'
  | 'cognitive';

type ReadingLevel = 
  | 'child'       // ~8 years
  | 'teen'        // ~14 years
  | 'standard'    // General adult
  | 'academic';   // Technical/scholarly
```

---

## Text-to-Speech (TTS)

### Features

| Feature | Description |
|---------|-------------|
| **Read Aloud Button** | On every content block and AI response |
| **Auto-Read** | Automatically read new content (opt-in) |
| **Voice Selection** | Choose from system voices |
| **Speed Control** | 0.5x to 2x playback speed |
| **Pause/Resume** | Control playback |
| **Highlight Sync** | Highlight words as they're read |
| **Skip Controls** | Skip sentences or paragraphs |

### Implementation

```typescript
// useTextToSpeech hook
export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1.0);
  
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = rate;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  }, [selectedVoice, rate]);
  
  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);
  
  // ... pause, resume, etc.
  
  return { speak, stop, isSpeaking, voices, setVoice: setSelectedVoice, rate, setRate };
}
```

### TTS Button Component

```typescript
// TTSButton component
interface TTSButtonProps {
  content: string;
  size?: 'small' | 'medium';
}

export function TTSButton({ content, size = 'small' }: TTSButtonProps) {
  const { speak, stop, isSpeaking } = useTextToSpeech();
  
  return (
    <IconButton
      onClick={() => isSpeaking ? stop() : speak(content)}
      aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
      size={size}
    >
      {isSpeaking ? <StopIcon /> : <VolumeUpIcon />}
    </IconButton>
  );
}
```

---

## WCAG 2.1 AA Compliance

### Color Contrast

| Element | Minimum Ratio |
|---------|---------------|
| Normal text | 4.5:1 |
| Large text (18px+) | 3:1 |
| UI components | 3:1 |
| Focus indicators | 3:1 |

### Keyboard Navigation

- All interactive elements focusable
- Logical tab order
- Skip links to main content
- Focus traps for modals
- Keyboard shortcuts documented

### Screen Reader Support

- Semantic HTML elements
- ARIA labels on interactive elements
- Live regions for dynamic content
- Meaningful alt text
- Form field labels

### Focus Management

- Visible focus indicators (3px outline)
- Focus restoration after dialogs close
- Focus moves logically through content
- No focus traps (except intentional modals)

---

## Component Guidelines

### MUI Accessibility Configuration

```typescript
// theme.ts
const accessibilityTheme = createTheme({
  palette: {
    // High contrast mode
    contrastThreshold: 4.5,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true, // For reduced motion
      },
    },
    MuiFocusRipple: {
      styleOverrides: {
        root: {
          outline: '3px solid currentColor',
          outlineOffset: '2px',
        },
      },
    },
  },
});
```

### Accessible Content Block

```typescript
interface AccessibleContentProps {
  children: React.ReactNode;
  ariaLabel?: string;
  enableTTS?: boolean;
  textContent?: string; // For TTS
}

export function AccessibleContent({
  children,
  ariaLabel,
  enableTTS = true,
  textContent,
}: AccessibleContentProps) {
  const { accessibilityMode } = useAccessibility();
  
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={cn(
        'accessible-content',
        accessibilityMode === 'dyslexia' && 'dyslexia-friendly',
        accessibilityMode === 'adhd' && 'adhd-friendly',
      )}
    >
      {enableTTS && textContent && (
        <TTSButton content={textContent} />
      )}
      {children}
    </div>
  );
}
```

---

## Testing

### Automated Testing

| Tool | Purpose |
|------|---------|
| **axe-core** | WCAG violation detection |
| **Lighthouse** | Accessibility score |
| **jest-axe** | Unit test accessibility |
| **Playwright** | E2E accessibility testing |

### Manual Testing Checklist

- [ ] Keyboard-only navigation works
- [ ] Screen reader announces correctly (VoiceOver, NVDA, JAWS)
- [ ] Color contrast passes in all themes
- [ ] Focus indicators visible
- [ ] Form errors announced
- [ ] Modal focus traps work
- [ ] Skip links functional
- [ ] Video captions available
- [ ] Audio transcripts available

### Testing npm Scripts

```json
{
  "test:a11y": "jest --config jest.a11y.config.js",
  "lighthouse:a11y": "lighthouse http://localhost:3000 --only-categories=accessibility --output=html --output-path=./reports/a11y.html"
}
```

---

## Data Model

### AccessibilitySettings Entity

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID | FK → User |
| mode | enum | default, adhd, autism, dyslexia, low-vision, cognitive |
| theme | enum | light, dark, high-contrast, system |
| fontSize | enum | small, medium, large, xlarge |
| lineSpacing | enum | normal, relaxed, spacious |
| fontFamily | enum | system, sans-serif, dyslexia-friendly |
| ttsEnabled | boolean | |
| ttsAutoRead | boolean | |
| ttsVoice | string | |
| ttsRate | float | 0.5 - 2.0 |
| reduceMotion | boolean | |
| focusModeEnabled | boolean | |
| breakReminderMinutes | int | |
| updatedAt | datetime | |

---

## Dependencies

- **F4** (Chat) — Accessibility modes applied to AI responses
- **F14** (Learning Modes) — Multi-modal content delivery
- **C7** (CMS) — Accessible content structure
- **X4** (Analytics) — Track accessibility mode usage

---

## Acceptance Criteria

### MVP
- [ ] Accessibility mode selector in settings
- [ ] ADHD, Autism, Dyslexia modes modify AI responses
- [ ] TTS available on all content blocks
- [ ] TTS auto-read option for selected modes
- [ ] High contrast theme option
- [ ] Font size control (4 sizes)
- [ ] WCAG 2.1 AA color contrast throughout

### Phase 2
- [ ] Dyslexia-friendly font option
- [ ] Focus mode with dimmed surroundings
- [ ] Break reminders (ADHD mode)
- [ ] Word-by-word highlight sync with TTS
- [ ] Voice input for users with motor impairments
- [ ] Automated accessibility testing in CI
