'use client';

import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  Avatar,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { ConfigurablePanel } from './ConfigurablePanel';
import { useUIStore, useUserStore } from '../../store';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'presenter';
  content: string;
  timestamp: Date;
}

export function ChatPanel() {
  const panels = useUIStore((s) => s.panels);
  const togglePanel = useUIStore((s) => s.togglePanel);
  const user = useUserStore((s) => s.user);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Welcome to Expanse EDU! 👋 I\'m here to help you learn. Ask me anything about the content!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const isOpen = panels.chat?.isOpen ?? false;

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <ConfigurablePanel
      id="chat"
      title="💬 Chat"
      position="right"
      isOpen={isOpen}
      onClose={() => togglePanel('chat')}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Messages */}
        <List sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                py: 0.5,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  maxWidth: '85%',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: 12,
                    bgcolor: msg.sender === 'ai' ? 'primary.main' : 'secondary.main',
                  }}
                >
                  {msg.sender === 'ai' ? '🤖' : user?.displayName.charAt(0) || 'U'}
                </Avatar>
                <Paper
                  sx={{
                    p: 1.5,
                    bgcolor: msg.sender === 'user' ? 'primary.dark' : 'background.default',
                    borderRadius: 2,
                  }}
                  elevation={0}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                </Paper>
              </Box>
            </ListItem>
          ))}
        </List>

        {/* Input */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <IconButton
            onClick={handleSend}
            color="primary"
            disabled={!input.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </ConfigurablePanel>
  );
}

// Simple mock AI responses
function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  
  if (lower.includes('help') || lower.includes('how')) {
    return 'You can use the action bars at the bottom to transform content! Try clicking "Expand" to get more details, or "Quiz Me" to test your knowledge.';
  }
  if (lower.includes('xp') || lower.includes('level')) {
    return 'You earn XP by viewing slides, completing quizzes, and using learning actions. Level up to unlock more content!';
  }
  if (lower.includes('coin')) {
    return 'Coins are spent when you use learning actions. Complete quests to earn more coins!';
  }
  if (lower.includes('quest')) {
    return 'Check the Quest panel on the right to see your current objectives. Complete them to earn XP and coins!';
  }
  
  return 'Great question! Try using the learning actions to explore this topic further. The "Research" action can find more information for you.';
}
