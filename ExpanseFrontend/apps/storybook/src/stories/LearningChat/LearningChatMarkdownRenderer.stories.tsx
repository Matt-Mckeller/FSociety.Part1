/**
 * LearningChatMarkdownRenderer Stories
 *
 * Markdown rendering capabilities
 */

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Paper } from "@mui/material"
import { LearningChatMarkdownRenderer } from "expanse.ui/chat"

const meta: Meta<typeof LearningChatMarkdownRenderer> = {
  title: "LearningChat/LearningChatMarkdownRenderer",
  component: LearningChatMarkdownRenderer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Renders markdown content with support for headers, lists, code blocks, and more.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Paper sx={{ maxWidth: 600, p: 2 }}>
        <Story />
      </Paper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LearningChatMarkdownRenderer>

export const BasicFormatting: Story = {
  args: {
    content: `This text has **bold**, *italic*, and \`inline code\`.

You can also combine them: ***bold and italic***.`,
  },
}

export const Headers: Story = {
  args: {
    content: `# Heading 1
## Heading 2
### Heading 3

Regular paragraph text follows the headers.`,
  },
}

export const Lists: Story = {
  args: {
    content: `## Unordered Lists
- First item
- Second item
- Third item with more text to show wrapping behavior

## Nested Lists
- Parent item
  - Nested item 1
  - Nested item 2
- Another parent`,
  },
}

export const CodeBlocks: Story = {
  args: {
    content: `## Code Examples

Inline \`code\` looks like this.

JavaScript code block:

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
\`\`\`

TypeScript with types:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};
\`\`\`

Python example:

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))
\`\`\``,
  },
}

export const Links: Story = {
  args: {
    content: `## Links

Check out [this link](https://example.com) for more info.

Or visit [another page](https://github.com) to see more.`,
  },
}

export const CompleteExample: Story = {
  args: {
    content: `# Complete Markdown Demo

This demonstrates all supported markdown features.

## Text Formatting

Regular text with **bold**, *italic*, and \`inline code\`.

## Lists

- First bullet point
- Second bullet point
- Third bullet point

## Code

Here's a code example:

\`\`\`typescript
const greeting = (name: string): string => {
  return \`Hello, \${name}!\`;
};
\`\`\`

## Links

Visit [our documentation](https://docs.example.com) for more.

---

That's all the markdown features!`,
  },
}
