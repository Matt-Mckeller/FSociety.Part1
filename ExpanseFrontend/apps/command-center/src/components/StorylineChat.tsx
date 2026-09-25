/**
 * StorylineChat - Mock AI assistant component for storylines
 * Placeholder for future AI integration to help with planning, development, and operations tasks
 */
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  alpha,
  Divider,
} from "@mui/material"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import SendIcon from "@mui/icons-material/Send"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"

interface StorylineChatProps {
  storylineId: string
  storylineTitle: string
}

const exampleCapabilities = [
  {
    icon: "💻",
    text: "Generate React components based on storyline specs",
  },
  {
    icon: "📋",
    text: "Create user stories and acceptance criteria",
  },
  {
    icon: "🧪",
    text: "Generate test cases for components",
  },
  {
    icon: "📊",
    text: "Analyze progress and suggest next steps",
  },
  {
    icon: "🔗",
    text: "Find related quests and dependencies",
  },
  {
    icon: "📝",
    text: "Draft documentation and technical notes",
  },
]

const samplePrompts = [
  "What are the highest priority tasks for this storyline?",
  "Generate a React component for {componentName}",
  "Create test cases for the {featureName} feature",
  "What dependencies does this storyline have?",
  "Summarize the current progress on this storyline",
]

export function StorylineChat({
  storylineId: _storylineId,
  storylineTitle,
}: StorylineChatProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <AutoAwesomeIcon sx={{ color: "#6366F1" }} />
          <Typography variant="h6" fontWeight={700}>
            AI Assistant
          </Typography>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ ml: "auto" }}
          >
            Coming Soon
          </Typography>
        </Box>

        {/* Mock Chat Area */}
        <Box
          sx={{
            height: 240,
            border: "2px dashed",
            borderColor: alpha("#6366F1", 0.2),
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha("#6366F1", 0.02),
            mb: 2,
          }}
        >
          <ChatBubbleOutlineIcon
            sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
          />
          <Typography color="text.secondary" gutterBottom>
            AI Chat Integration
          </Typography>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ textAlign: "center", maxWidth: 280 }}
          >
            Ask questions about <strong>{storylineTitle}</strong>, generate
            code, get suggestions, and more.
          </Typography>
        </Box>

        {/* Mock Input */}
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask about this storyline..."
            disabled
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "action.disabledBackground",
              },
            }}
          />
          <IconButton
            disabled
            sx={{
              bgcolor: alpha("#6366F1", 0.1),
              color: "text.disabled",
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Capabilities */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1.5, textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          Example Capabilities
        </Typography>
        <List dense disablePadding>
          {exampleCapabilities.map((capability, index) => (
            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <span>{capability.icon}</span>
              </ListItemIcon>
              <ListItemText
                primary={capability.text}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Sample Prompts */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            mt: 2,
            mb: 1.5,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Sample Prompts
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {samplePrompts.slice(0, 3).map((prompt, index) => (
            <Typography
              key={index}
              variant="caption"
              sx={{
                bgcolor: alpha("#6366F1", 0.08),
                color: "text.secondary",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                cursor: "not-allowed",
                opacity: 0.7,
              }}
            >
              "{prompt.slice(0, 40)}
              {prompt.length > 40 ? "..." : ""}"
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
