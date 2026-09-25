import React, { useState, useRef, useEffect } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Fab,
  Drawer,
  Typography,
  IconButton,
  TextField,
  Paper,
  Card,
  CardContent,
  Chip,
  CircularProgress,
} from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import SmartToyIcon from "@mui/icons-material/SmartToy"

interface ChatMessage {
  role: "user" | "model"
  content: string
}

const suggestedQuestions = [
  "What are the Priority Actions?",
  "How do Pods work?",
  "What are the Culture Quick Wins?",
]

interface ChatAssistantProps {
  initialOpen?: boolean
  mockResponses?: boolean
}

function ChatAssistant({
  initialOpen = false,
  mockResponses = true,
}: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = { role: "user", content: inputValue }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Mock response for Storybook
    if (mockResponses) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const aiMessage: ChatMessage = {
        role: "model",
        content: `This is a mock response to: "${userMessage.content}"\n\nIn the actual application, this would be a response from the Gemini AI API with information from the Quick Wins Guide knowledge base.`,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <Fab
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          bgcolor: "#4285f4",
          color: "white",
          "&:hover": { bgcolor: "#1976D2" },
          zIndex: 9999,
          boxShadow: 4,
        }}
        aria-label="Open AI Assistant"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: "#4285f4",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SmartToyIcon />
            <Typography variant="h6">Training Assistant</Typography>
          </Box>
          <IconButton onClick={() => setIsOpen(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: "#f5f5f5" }}>
          <Card sx={{ mb: 2, bgcolor: "white" }}>
            <CardContent sx={{ pb: "16px !important" }}>
              {messages.length === 0 && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Hi! I&apos;m your training assistant. Ask me anything about
                  the Quick Wins Guide.
                </Typography>
              )}
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                {messages.length === 0 ? "Try asking:" : "Quick questions:"}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {suggestedQuestions.map((q) => (
                  <Chip
                    key={q}
                    label={q}
                    onClick={() => setInputValue(q)}
                    sx={{ cursor: "pointer" }}
                    size="small"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: "80%",
                  bgcolor: msg.role === "user" ? "#E3F2FD" : "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2">{msg.content}</Typography>
              </Paper>
            </Box>
          ))}

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
              <Paper sx={{ p: 2, bgcolor: "white", borderRadius: 2 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    Thinking...
                  </Typography>
                </Box>
              </Paper>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>

        <Box sx={{ p: 2, bgcolor: "white", borderTop: "1px solid #e0e0e0" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Ask about training, operations, culture..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              variant="outlined"
              size="small"
            />
            <IconButton
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              sx={{
                bgcolor: "#4285f4",
                color: "white",
                "&:hover": { bgcolor: "#1976D2" },
                "&:disabled": { bgcolor: "#e0e0e0" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

const meta: Meta<typeof ChatAssistant> = {
  title: "QuickWinsGuide/ChatAssistant",
  component: ChatAssistant,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An AI-powered chat assistant that helps users navigate the Quick Wins Guide. Features a floating action button, slide-out drawer, suggested questions, and message threading.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    initialOpen: {
      description: "Whether the chat drawer is initially open",
      control: "boolean",
    },
    mockResponses: {
      description: "Use mock responses instead of real API (for Storybook)",
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof ChatAssistant>

export const Default: Story = {
  args: {
    initialOpen: false,
    mockResponses: true,
  },
}

export const OpenByDefault: Story = {
  args: {
    initialOpen: true,
    mockResponses: true,
  },
}
