/**
 * LearningChat Component Stories
 *
 * Showcases the learning chat component in multiple variants:
 * - Floating (popup chat bubble)
 * - Sidebar (side panel)
 * - Fullscreen
 * - Embedded (inline in page)
 *
 * Features:
 * - Time travel (revert to previous messages)
 * - Edit and resend user messages
 * - Timeline with message history
 */

import React, { useState, useCallback } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Button, IconButton, Fab, Paper, Typography } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import {
  LearningChatContainer,
  LearningChatMessage,
  StreamToken,
} from "expanse.ui/chat"

const meta: Meta<typeof LearningChatContainer> = {
  title: "LearningChat/LearningChatContainer",
  component: LearningChatContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive learning chat UI component supporting streaming responses, markdown rendering, time travel, message editing, and multiple layout variants.",
      },
    },
  },
  argTypes: {
    config: {
      description: "Configuration for the chat container",
      control: "object",
    },
    showHeader: {
      description: "Whether to show the chat header",
      control: "boolean",
    },
    showInput: {
      description: "Whether to show the input area",
      control: "boolean",
    },
    enableTimeTravel: {
      description: "Enable time travel feature (revert to previous messages)",
      control: "boolean",
    },
    enableResend: {
      description: "Enable editing and resending user messages",
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof LearningChatContainer>

// Sample initial messages for demos
const sampleMessages: LearningChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm 4eye, your AI learning assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000),
    status: "complete",
  },
  {
    id: "2",
    role: "user",
    content: "Can you explain how markdown rendering works?",
    timestamp: new Date(Date.now() - 30000),
    status: "complete",
  },
  {
    id: "3",
    role: "assistant",
    content: `Sure! Here's a quick overview of **markdown features** I support:

## Headers
I can render headers at different levels.

## Lists
- Bullet points work great
- So do nested items

## Code
Inline \`code\` looks like this, and code blocks look like:

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

## Links
You can include [links](https://example.com) too!`,
    timestamp: new Date(),
    status: "complete",
  },
]

// Simulated streaming response generator
async function* simulateStreamingResponse(
  userMessage: string,
): AsyncGenerator<StreamToken> {
  const responses: Record<string, string> = {
    default: `I understand you're asking about "${userMessage}". 

Here's a **detailed response** with markdown:

1. First point with some explanation
2. Second point with more details
3. Third point wrapping up

\`\`\`javascript
// Here's some example code
function example() {
  return "This demonstrates code blocks";
}
\`\`\`

Is there anything else you'd like to know?`,
  }

  const response = responses.default

  // Simulate token-by-token streaming
  const words = response.split(" ")
  for (let i = 0; i < words.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 50))
    yield {
      content: words[i] + (i < words.length - 1 ? " " : ""),
      done: i === words.length - 1,
    }
  }
}

// Handler for demos
const createStreamingHandler = () => {
  return async (content: string): Promise<AsyncGenerator<StreamToken>> => {
    return simulateStreamingResponse(content)
  }
}

/**
 * Embedded Variant
 *
 * Chat embedded directly in a page section
 */
export const Embedded: Story = {
  render: () => (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LearningChatContainer
        config={{ variant: "embedded" }}
        initialMessages={sampleMessages}
        onSend={createStreamingHandler()}
        header={{
          title: "4eye Assistant",
          subtitle: "AI-powered help",
          avatar: <SmartToyIcon />,
        }}
        input={{
          placeholder: "Ask me anything...",
          suggestedPrompts: [
            "Tell me about your features",
            "How do I get started?",
            "Show me an example",
          ],
        }}
      />
    </Box>
  ),
}

/**
 * Floating Variant
 *
 * Popup chat that floats over content (like Intercom)
 */
export const Floating: Story = {
  render: function FloatingStory() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)

    return (
      <Box sx={{ height: "100vh", width: "100%", bgcolor: "grey.100", p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Page Content
        </Typography>
        <Typography paragraph>
          This demonstrates the floating chat variant. Click the chat button in
          the bottom right to open the chat.
        </Typography>
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography>
            The floating chat stays in a fixed position and can be minimized or
            closed.
          </Typography>
        </Paper>

        {!isOpen && !isMinimized && (
          <Fab
            color="primary"
            aria-label="chat"
            sx={{ position: "fixed", bottom: 24, right: 24 }}
            onClick={() => setIsOpen(true)}
          >
            <ChatIcon />
          </Fab>
        )}

        {(isOpen || isMinimized) && (
          <LearningChatContainer
            config={{ variant: "floating" }}
            isOpen={isOpen}
            isMinimized={isMinimized}
            onClose={() => {
              setIsOpen(false)
              setIsMinimized(false)
            }}
            onMinimize={() => {
              setIsMinimized(true)
              setIsOpen(false)
            }}
            onExpand={() => {
              setIsMinimized(false)
              setIsOpen(true)
            }}
            initialMessages={sampleMessages.slice(0, 1)}
            onSend={createStreamingHandler()}
            header={{
              title: "4eye Support",
              subtitle: "We typically reply in minutes",
              avatar: <SmartToyIcon />,
            }}
            input={{
              placeholder: "Type your message...",
            }}
          />
        )}
      </Box>
    )
  },
}

/**
 * Sidebar Variant
 *
 * Chat panel on the side of the page
 */
export const Sidebar: Story = {
  render: () => (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Box sx={{ flex: 1, p: 4, bgcolor: "grey.50" }}>
        <Typography variant="h4" gutterBottom>
          Main Content Area
        </Typography>
        <Typography paragraph>
          This demonstrates the sidebar chat variant. The chat panel is
          positioned alongside your main content, perfect for documentation or
          support interfaces.
        </Typography>
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6">Features</Typography>
          <Typography>
            • Full markdown support
            <br />
            • Token-by-token streaming
            <br />
            • Copy, feedback, and regenerate actions
            <br />• Customizable themes
          </Typography>
        </Paper>
      </Box>

      <LearningChatContainer
        config={{ variant: "sidebar" }}
        initialMessages={sampleMessages.slice(0, 1)}
        onSend={createStreamingHandler()}
        header={{
          title: "4eye Copilot",
          subtitle: "Ask about the docs",
          avatar: <SmartToyIcon />,
        }}
        input={{
          placeholder: "Ask about this page...",
          suggestedPrompts: ["Summarize this page", "How does this work?"],
        }}
      />
    </Box>
  ),
}

/**
 * Fullscreen Variant
 *
 * Chat takes over the entire viewport
 */
export const Fullscreen: Story = {
  render: function FullscreenStory() {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Box sx={{ height: "100vh", width: "100%", bgcolor: "grey.100", p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Fullscreen Chat Demo
        </Typography>
        <Typography paragraph>
          Click the button below to open the fullscreen chat experience.
        </Typography>

        <Button
          variant="contained"
          startIcon={<ChatIcon />}
          onClick={() => setIsOpen(true)}
        >
          Open Fullscreen Chat
        </Button>

        {isOpen && (
          <LearningChatContainer
            config={{ variant: "fullscreen" }}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            initialMessages={sampleMessages}
            onSend={createStreamingHandler()}
            header={{
              title: "4eye AI",
              subtitle: "Your intelligent assistant",
              avatar: <SmartToyIcon />,
            }}
            input={{
              placeholder: "What would you like to know?",
              suggestedPrompts: [
                "Help me get started",
                "What can you do?",
                "Show me examples",
              ],
            }}
          />
        )}
      </Box>
    )
  },
}

/**
 * Dark Mode
 *
 * Chat with dark theme
 */
export const DarkMode: Story = {
  render: () => (
    <Box
      sx={{
        height: 600,
        width: "100%",
        p: 2,
        bgcolor: "grey.900",
      }}
    >
      <Box
        sx={{
          colorScheme: "dark",
          "& .MuiPaper-root": {
            bgcolor: "grey.800",
            color: "grey.100",
          },
        }}
      >
        <LearningChatContainer
          config={{ variant: "embedded" }}
          initialMessages={sampleMessages}
          onSend={createStreamingHandler()}
          header={{
            title: "4eye Night Mode",
            subtitle: "Easy on the eyes",
            avatar: <SmartToyIcon />,
          }}
          input={{
            placeholder: "Type in the dark...",
          }}
          sx={{
            bgcolor: "grey.900",
            "& .MuiInputBase-root": {
              bgcolor: "grey.800",
            },
          }}
        />
      </Box>
    </Box>
  ),
}

/**
 * With Custom Actions
 *
 * Chat with custom event handling
 */
export const WithEventHandling: Story = {
  render: function EventHandlingStory() {
    const [events, setEvents] = useState<string[]>([])

    const handleEvent = useCallback(
      (event: { type: string; messageId: string }) => {
        setEvents((prev) => [
          ...prev,
          `${event.type} on message ${event.messageId}`,
        ])
      },
      [],
    )

    return (
      <Box sx={{ display: "flex", height: 600, gap: 2, p: 2 }}>
        <Box sx={{ flex: 1 }}>
          <LearningChatContainer
            config={{ variant: "embedded" }}
            initialMessages={sampleMessages}
            onSend={createStreamingHandler()}
            onEvent={handleEvent}
            header={{
              title: "4eye with Events",
              subtitle: "Try the message actions",
              avatar: <SmartToyIcon />,
            }}
            input={{
              placeholder: "Send a message then try the actions...",
            }}
          />
        </Box>
        <Paper sx={{ width: 300, p: 2, overflow: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Event Log
          </Typography>
          {events.length === 0 ? (
            <Typography color="text.secondary" variant="body2">
              Hover over messages and click the action buttons to see events
            </Typography>
          ) : (
            events.map((event, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                • {event}
              </Typography>
            ))
          )}
        </Paper>
      </Box>
    )
  },
}

/**
 * Empty State
 *
 * Chat with no initial messages
 */
export const EmptyState: Story = {
  render: () => (
    <Box sx={{ height: "100vh", width: "100%", display: "flex" }}>
      <LearningChatContainer
        config={{ variant: "embedded" }}
        onSend={createStreamingHandler()}
        header={{
          title: "Start a Conversation",
          subtitle: "Ask me anything",
          avatar: <SmartToyIcon />,
        }}
        input={{
          placeholder: "Type your first message...",
          suggestedPrompts: [
            "What can you help me with?",
            "Tell me about yourself",
            "How do I use this?",
          ],
        }}
      />
    </Box>
  ),
}

/**
 * Minimal Configuration
 *
 * Chat with minimal setup
 */
export const Minimal: Story = {
  render: () => (
    <Box sx={{ height: 400, width: 400, p: 2 }}>
      <LearningChatContainer
        config={{ variant: "embedded" }}
        showHeader={false}
        input={{
          placeholder: "Quick message...",
        }}
      />
    </Box>
  ),
}

// Extended sample messages for timeline demo
const timelineMessages: ChatMessage[] = [
  {
    id: "t1",
    role: "assistant",
    content: "Welcome! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 3600000),
    status: "complete",
  },
  {
    id: "t2",
    role: "user",
    content: "What programming languages do you support?",
    timestamp: new Date(Date.now() - 3500000),
    status: "complete",
  },
  {
    id: "t3",
    role: "assistant",
    content:
      "I support many languages including JavaScript, TypeScript, Python, Java, C++, Go, Rust, and more!",
    timestamp: new Date(Date.now() - 3400000),
    status: "complete",
  },
  {
    id: "t4",
    role: "user",
    content: "Can you show me a React component example?",
    timestamp: new Date(Date.now() - 3000000),
    status: "complete",
  },
  {
    id: "t5",
    role: "assistant",
    content: `Here's a simple React component:\n\n\`\`\`tsx\nconst Button = ({ label, onClick }) => {\n  return (\n    <button onClick={onClick}>\n      {label}\n    </button>\n  );\n};\n\`\`\``,
    timestamp: new Date(Date.now() - 2900000),
    status: "complete",
  },
  {
    id: "t6",
    role: "user",
    content: "How do I add TypeScript types?",
    timestamp: new Date(Date.now() - 2000000),
    status: "complete",
  },
  {
    id: "t7",
    role: "assistant",
    content: `Add TypeScript types like this:\n\n- Define an interface for props\n- Use React.FC<Props> for the component\n- Add type annotations to parameters`,
    timestamp: new Date(Date.now() - 1900000),
    status: "complete",
  },
  {
    id: "t8",
    role: "user",
    content: "What about testing?",
    timestamp: new Date(Date.now() - 1000000),
    status: "complete",
  },
  {
    id: "t9",
    role: "assistant",
    content:
      "For testing React components, I recommend Jest with React Testing Library. They work great together!",
    timestamp: new Date(Date.now() - 900000),
    status: "complete",
  },
]

/**
 * With Timeline
 *
 * Chat with toggleable history timeline on the left
 */
export const WithTimeline: Story = {
  render: () => (
    <Box sx={{ height: "100vh", width: "100%", display: "flex" }}>
      <LearningChatContainer
        config={{ variant: "embedded" }}
        initialMessages={timelineMessages}
        showTimeline={true}
        onSend={createStreamingHandler()}
        header={{
          title: "4eye Learning Assistant",
          subtitle: "Click the history icon to toggle timeline",
          avatar: <SmartToyIcon />,
        }}
        input={{
          placeholder: "Ask me anything...",
        }}
      />
    </Box>
  ),
}

/**
 * With Time Travel
 *
 * Chat with time travel features enabled.
 * - Right-click on timeline items to revert to that point
 * - Hover over user messages to see the edit button
 * - Edit a message to resend and get a new response
 */
export const WithTimeTravel: Story = {
  render: () => (
    <Box sx={{ height: "100vh", width: "100%", display: "flex" }}>
      <LearningChatContainer
        config={{ variant: "embedded" }}
        initialMessages={timelineMessages}
        showTimeline={true}
        enableTimeTravel={true}
        enableResend={true}
        onSend={createStreamingHandler()}
        header={{
          title: "4eye Learning Assistant",
          subtitle: "Right-click timeline to revert • Hover messages to edit",
          avatar: <SmartToyIcon />,
        }}
        input={{
          placeholder: "Ask me anything...",
        }}
      />
    </Box>
  ),
}

/**
 * With Reactions
 *
 * Chat with emoji reactions enabled on messages.
 * - Hover over any message to see the reaction button
 * - Click to open the emoji picker
 * - Click an existing reaction to toggle it
 */
export const WithReactions: Story = {
  render: () => {
    const messagesWithReactions: LearningChatMessage[] = [
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm 4eye, your AI learning assistant. How can I help you today?",
        timestamp: new Date(Date.now() - 120000),
        status: "complete",
        reactions: [
          { emoji: "👍", count: 2, userReacted: true },
          { emoji: "❤️", count: 1, userReacted: false },
        ],
      },
      {
        id: "2",
        role: "user",
        content: "Can you explain how photosynthesis works?",
        timestamp: new Date(Date.now() - 60000),
        status: "complete",
      },
      {
        id: "3",
        role: "assistant",
        content: `Great question! **Photosynthesis** is the process by which plants convert light energy into chemical energy.

## The Basic Equation
\`\`\`
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂
\`\`\`

## Key Steps
1. **Light Absorption** - Chlorophyll captures sunlight
2. **Water Splitting** - H₂O is split, releasing oxygen
3. **Carbon Fixation** - CO₂ is converted to glucose

This is how plants make their own food! 🌱`,
        timestamp: new Date(Date.now() - 30000),
        status: "complete",
        reactions: [
          { emoji: "🎉", count: 3, userReacted: false },
          { emoji: "👏", count: 2, userReacted: true },
          { emoji: "🤔", count: 1, userReacted: false },
        ],
      },
    ]

    return (
      <Box sx={{ height: "100vh", width: "100%", display: "flex" }}>
        <LearningChatContainer
          config={{ variant: "embedded" }}
          initialMessages={messagesWithReactions}
          enableReactions={true}
          onSend={createStreamingHandler()}
          header={{
            title: "4eye Learning Assistant",
            subtitle: "Hover messages to react • Click emojis to toggle",
            avatar: <SmartToyIcon />,
          }}
          input={{
            placeholder: "Ask me anything...",
          }}
        />
      </Box>
    )
  },
}

/**
 * With Search
 *
 * Instant search across all chat messages.
 * - Press Ctrl/Cmd+F or click the search icon to open search
 * - Type to search instantly - matches are highlighted in real-time
 * - Use Enter or arrow buttons to navigate between matches
 * - Press Escape to close search
 */
export const WithSearch: Story = {
  render: () => {
    const searchableMessages: LearningChatMessage[] = [
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm 4eye, your AI learning assistant. I can help you with JavaScript, Python, TypeScript, and many other programming topics.",
        timestamp: new Date(Date.now() - 300000),
        status: "complete",
      },
      {
        id: "2",
        role: "user",
        content: "Can you explain how JavaScript closures work?",
        timestamp: new Date(Date.now() - 240000),
        status: "complete",
      },
      {
        id: "3",
        role: "assistant",
        content: `Great question! A **closure** in JavaScript is a function that has access to variables from its outer (enclosing) scope, even after that outer function has returned.

## Example

\`\`\`javascript
function createCounter() {
  let count = 0; // This variable is "closed over"
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

The inner function "remembers" the \`count\` variable even though \`createCounter\` has finished executing. This is the essence of closures!`,
        timestamp: new Date(Date.now() - 180000),
        status: "complete",
      },
      {
        id: "4",
        role: "user",
        content: "What about Python decorators? Are they related to closures?",
        timestamp: new Date(Date.now() - 120000),
        status: "complete",
      },
      {
        id: "5",
        role: "assistant",
        content: `Yes! Python decorators actually use closures under the hood. A decorator is essentially a function that takes a function and returns a new function.

\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before the function call")
        result = func(*args, **kwargs)
        print("After the function call")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")
\`\`\`

The \`wrapper\` function is a closure because it "closes over" the \`func\` parameter from the outer scope.`,
        timestamp: new Date(Date.now() - 60000),
        status: "complete",
      },
      {
        id: "6",
        role: "user",
        content: "That makes sense! How do TypeScript generics compare?",
        timestamp: new Date(Date.now() - 30000),
        status: "complete",
      },
      {
        id: "7",
        role: "assistant",
        content: `TypeScript generics are a different concept but equally powerful! They allow you to create reusable components that work with multiple types.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// Works with any type
const num = identity<number>(42);
const str = identity<string>("hello");
\`\`\`

While closures are about **variable scope**, generics are about **type flexibility**. Both are fundamental patterns for writing clean, reusable code!`,
        timestamp: new Date(),
        status: "complete",
      },
    ]

    return (
      <Box sx={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 2, bgcolor: "info.light", color: "info.contrastText" }}>
          <Typography variant="body2">
            <strong>Try searching:</strong> Type "JavaScript", "Python", "closure", "function", or "TypeScript" to see instant highlighting. Press <kbd>Ctrl/Cmd+F</kbd> or click the 🔍 icon.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: "flex" }}>
          <LearningChatContainer
            config={{ variant: "embedded" }}
            initialMessages={searchableMessages}
            enableSearch={true}
            onSend={createStreamingHandler()}
            header={{
              title: "4eye Learning Assistant",
              subtitle: "Press Ctrl+F to search • Matches highlight instantly",
              avatar: <SmartToyIcon />,
            }}
            input={{
              placeholder: "Ask me anything about programming...",
            }}
          />
        </Box>
      </Box>
    )
  },
}
