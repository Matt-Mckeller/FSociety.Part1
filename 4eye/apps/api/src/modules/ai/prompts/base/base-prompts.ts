/**
 * Base Prompt Templates
 * 
 * Generic prompt components shared across all AI features.
 * These are combined with type documentation and feature-specific context.
 * 
 * @module ai/prompts/base
 */

/**
 * System prompt for accessibility adaptations.
 */
export function getAccessibilityPrompt(mode: string): string {
  const adaptations: Record<string, string> = {
    DEFAULT: '',
    ADHD: `
Accessibility Mode: ADHD
- Use bullet points and numbered lists
- Bold key terms and important concepts
- Put the most important information first
- Keep paragraphs to 2-3 sentences
- Use clear section headers
- Avoid long walls of text
`,
    AUTISM: `
Accessibility Mode: Autism Spectrum
- Use literal, precise language (avoid idioms and metaphors)
- Maintain consistent, predictable structure
- Be explicit about expectations
- Avoid ambiguous phrases
- Use concrete examples
`,
    DYSLEXIA: `
Accessibility Mode: Dyslexia
- Use simple, common vocabulary
- Keep sentences short (under 15 words when possible)
- Break complex ideas into steps
- Avoid homophones when alternatives exist
- Use clear subject-verb-object structure
`,
    LOW_VISION: `
Accessibility Mode: Low Vision
- Response will be read aloud via TTS
- Use clear, descriptive language
- Spell out abbreviations
- Describe any referenced visual elements
- Use natural reading order
`,
    COGNITIVE: `
Accessibility Mode: Cognitive Support
- Maximum simplification
- Step-by-step instructions
- One concept per response when possible
- Repeat key information
- Use very simple vocabulary
`,
  };

  return adaptations[mode] || '';
}

/**
 * System prompt for reading level adaptation.
 */
export function getReadingLevelPrompt(level: string): string {
  const levels: Record<string, string> = {
    CHILD: `
Reading Level: Child (ages 8-12)
- Use simple, everyday words
- Explain concepts with familiar examples
- Keep sentences short and clear
- Avoid jargon and technical terms
- Use analogies to known things
`,
    STANDARD: `
Reading Level: Standard (adult)
- Use clear, accessible language
- Explain technical terms when first used
- Balance detail with clarity
- Assume general knowledge but not expertise
`,
    ACADEMIC: `
Reading Level: Academic
- Use precise, technical vocabulary
- Include relevant terminology
- Provide detailed analysis
- Reference frameworks and theories
- Assume domain familiarity
`,
  };

  return levels[level] || levels.STANDARD;
}

/**
 * Context about the current session/content.
 */
export interface SessionContext {
  /** Source language of content */
  sourceLanguage: string;
  /** Content type (live, recorded, uploaded) */
  contentType: 'live' | 'recorded' | 'uploaded';
  /** Duration in minutes */
  durationMinutes?: number;
  /** Topic/title if known */
  topic?: string;
  /** Vertical (for prompt customization) */
  vertical?: 'learning' | 'education' | 'religion' | 'professional';
}

/**
 * User context for personalization.
 */
export interface UserContext {
  /** User's preferred language */
  preferredLanguage: string;
  /** User's reading level */
  readingLevel: 'CHILD' | 'STANDARD' | 'ACADEMIC';
  /** Accessibility mode */
  accessibilityMode?: string;
  /** User's name (for personalization) */
  name?: string;
}

/**
 * Build a complete system prompt with context.
 */
export function buildSystemPrompt(
  baseInstructions: string,
  userContext: UserContext,
  sessionContext?: SessionContext,
): string {
  const parts: string[] = [];

  // Core instructions
  parts.push(baseInstructions);

  // Accessibility adaptations
  if (userContext.accessibilityMode && userContext.accessibilityMode !== 'DEFAULT') {
    parts.push(getAccessibilityPrompt(userContext.accessibilityMode));
  }

  // Reading level
  parts.push(getReadingLevelPrompt(userContext.readingLevel));

  // Session context
  if (sessionContext) {
    parts.push(`
Session Context:
- Content Language: ${sessionContext.sourceLanguage}
- Content Type: ${sessionContext.contentType}
${sessionContext.durationMinutes ? `- Duration: ${sessionContext.durationMinutes} minutes` : ''}
${sessionContext.topic ? `- Topic: ${sessionContext.topic}` : ''}
`);
  }

  // Language preference
  if (userContext.preferredLanguage !== 'en') {
    parts.push(`Respond in ${userContext.preferredLanguage} unless the user specifically requests English.`);
  }

  return parts.join('\n\n').trim();
}
