/**
 * Prompt Builder Base
 * Abstract base class for building AI prompts
 */

/**
 * Base interface for prompt builders
 */
export interface PromptBuilder<TInput, TOutput = string> {
  /**
   * Build the complete prompt from input
   */
  build(input: TInput): TOutput
}

/**
 * Composable prompt section
 */
export interface PromptSection {
  /** Section identifier */
  id: string
  /** Section content */
  content: string
  /** Whether this section is required */
  required?: boolean
}

/**
 * Utility to compose multiple prompt sections
 */
export function composePromptSections(
  sections: PromptSection[],
  separator: string = "\n\n",
): string {
  return sections
    .filter((s) => s.content.trim().length > 0)
    .map((s) => s.content)
    .join(separator)
}

/**
 * Create a section divider for prompts
 */
export function createSectionDivider(title: string): string {
  const line = "═".repeat(67)
  return `${line}\n${title}\n${line}`
}

/**
 * Wrap content in a code block
 */
export function wrapInCodeBlock(
  content: string,
  language: string = "",
): string {
  return `\`\`\`${language}\n${content}\n\`\`\``
}

/**
 * Create a JSON section for prompts
 */
export function createJsonSection(data: any, title?: string): string {
  const json = JSON.stringify(data, null, 2)
  const codeBlock = wrapInCodeBlock(json, "json")
  return title ? `${title}:\n\n${codeBlock}` : codeBlock
}
