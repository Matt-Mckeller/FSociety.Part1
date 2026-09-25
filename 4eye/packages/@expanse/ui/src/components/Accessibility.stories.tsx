import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SkipLinks } from './SkipLinks';
import { LiveAnnouncer } from './LiveAnnouncer';
import { Box, Typography, Paper, Button, Stack, TextField, Divider, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const meta: Meta = {
  title: 'Layout Systems/Core/Accessibility',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Accessibility Components

WCAG 2.1 AA compliant components for accessible navigation and announcements.

## Components

| Component | WCAG Criterion | Purpose |
|-----------|----------------|---------|
| **SkipLinks** | 2.4.1 Bypass Blocks | Skip navigation for keyboard users |
| **LiveAnnouncer** | 4.1.3 Status Messages | Screen reader announcements |

## Testing

- Use **Tab** key to navigate to skip links
- Use a screen reader to test announcements
        `,
      },
    },
  },
};

export default meta;

// =============================================================================
// SkipLinks
// =============================================================================

export const SkipLinksDemo: StoryObj = {
  render: () => {
    const theme = useTheme();
    
    return (
      <Box sx={{ minHeight: 600 }}>
        <SkipLinks
          links={[
            { href: '#main-content', label: 'Skip to main content' },
            { href: '#navigation', label: 'Skip to navigation' },
            { href: '#search', label: 'Skip to search' },
          ]}
        />
        {/* Simulated page structure */}
        <Box sx={{ p: 4, bgcolor: 'background.paper' }}>
          <Paper sx={{ p: 3, mb: 3, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
            <Typography variant="h6" gutterBottom sx={{
              color: "info.main"
            }}>
              How to Test Skip Links
            </Typography>
            <Typography variant="body2">
              1. Click anywhere in this story<br />
              2. Press <strong>Tab</strong> key<br />
              3. Skip links appear at top-left<br />
              4. Press <strong>Enter</strong> to activate a link
            </Typography>
          </Paper>
          
          <Box id="navigation" sx={{ p: 2, mb: 3, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom sx={{
              color: "text.secondary"
            }}>
              #navigation
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="text">Home</Button>
              <Button variant="text">Products</Button>
              <Button variant="text">About</Button>
              <Button variant="text">Contact</Button>
            </Stack>
          </Box>
          
          <Box id="search" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom sx={{
              color: "text.secondary"
            }}>
              #search
            </Typography>
            <TextField size="small" placeholder="Search..." sx={{ width: 300 }} />
          </Box>
          
          <Box id="main-content">
            <Typography variant="subtitle2" gutterBottom sx={{
              color: "text.secondary"
            }}>
              #main-content
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Main Content Area</Typography>
              <Typography sx={{
                marginBottom: "16px"
              }}>
                Skip links allow keyboard users to bypass repetitive navigation
                and jump directly to important sections. This meets WCAG 2.1 AA
                success criterion 2.4.1 (Bypass Blocks).
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `Skip links appear on keyboard focus and allow users to bypass navigation.

**Default links:**
- Skip to main content (#main-content)
- Skip to navigation (#navigation)

**Custom links:**
\`\`\`tsx
<SkipLinks
  links={[
    { href: '#main', label: 'Skip to main' },
    { href: '#sidebar', label: 'Skip to sidebar' },
  ]}
/>
\`\`\``,
      },
    },
  },
};

// =============================================================================
// LiveAnnouncer
// =============================================================================

export const LiveAnnouncerDemo: StoryObj = {
  render: () => {
    const [message, setMessage] = useState('');
    const [log, setLog] = useState<string[]>([]);
    const theme = useTheme();
    
    const announce = (text: string) => {
      setMessage(text);
      setLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${text}`]);
    };
    
    return (
      <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <LiveAnnouncer
          message={message}
          priority="polite"
          clearAfter={2000}
          onClear={() => setMessage('')}
        />
        <Typography variant="h5" gutterBottom>
          Live Announcer Demo
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            marginBottom: "16px"
          }}>
          Click buttons to trigger screen reader announcements.
          Use a screen reader (VoiceOver, NVDA, JAWS) to hear them.
        </Typography>
        <Paper sx={{ p: 3, mb: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
          <Typography variant="subtitle2" gutterBottom>
            Navigation Announcements
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{
            flexWrap: "wrap"
          }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => announce('Navigated to Home tile')}
            >
              Go Home
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => announce('Moved to position 2, 3')}
            >
              Move Right
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => announce('Reached grid boundary')}
            >
              Hit Edge
            </Button>
          </Stack>
        </Paper>
        <Paper sx={{ p: 3, mb: 3, bgcolor: alpha(theme.palette.success.main, 0.05) }}>
          <Typography variant="subtitle2" gutterBottom>
            Status Announcements
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{
            flexWrap: "wrap"
          }}>
            <Button 
              variant="outlined" 
              size="small"
              color="success"
              onClick={() => announce('Changes saved successfully')}
            >
              Save
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              color="error"
              onClick={() => announce('Error: Failed to load data')}
            >
              Error
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => announce('Loading complete, 42 items found')}
            >
              Load Complete
            </Button>
          </Stack>
        </Paper>
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle2" gutterBottom sx={{
          color: "text.secondary"
        }}>
          Announcement Log (visual only)
        </Typography>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            bgcolor: 'grey.50', 
            fontFamily: 'monospace', 
            fontSize: 12,
            minHeight: 100,
          }}
        >
          {log.length === 0 ? (
            <Typography variant="body2" sx={{
              color: "text.disabled"
            }}>
              No announcements yet...
            </Typography>
          ) : (
            log.map((entry, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                {entry}
              </Typography>
            ))
          )}
        </Paper>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `LiveAnnouncer provides ARIA live region for dynamic announcements.

**Props:**
- \`message\` - Text to announce
- \`priority\` - "polite" (default) or "assertive"
- \`clearAfter\` - Auto-clear delay in ms (default: 1000)
- \`onClear\` - Callback when cleared

**Priority levels:**
- **polite**: Wait for user to finish current task
- **assertive**: Interrupt immediately (urgent messages)

Meets WCAG 2.1 criterion 4.1.3 (Status Messages).`,
      },
    },
  },
};

export const LiveAnnouncerPriority: StoryObj = {
  render: () => {
    const [politeMsg, setPoliteMsg] = useState('');
    const [assertiveMsg, setAssertiveMsg] = useState('');
    
    return (
      <Box sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        <LiveAnnouncer
          message={politeMsg}
          priority="polite"
          clearAfter={3000}
          onClear={() => setPoliteMsg('')}
        />
        <LiveAnnouncer
          message={assertiveMsg}
          priority="assertive"
          clearAfter={3000}
          onClear={() => setAssertiveMsg('')}
        />
        <Typography variant="h6" gutterBottom>
          Priority Comparison
        </Typography>
        <Stack spacing={2}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              aria-live="polite"
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 1
              }}>
              Waits for user to finish current activity before announcing.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => setPoliteMsg('Status update: 3 new notifications')}
            >
              Polite Announcement
            </Button>
          </Paper>
          
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              aria-live="assertive"
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 1
              }}>
              Interrupts immediately. Use sparingly for urgent messages.
            </Typography>
            <Button 
              variant="contained" 
              color="error"
              onClick={() => setAssertiveMsg('Error: Connection lost!')}
            >
              Assertive Announcement
            </Button>
          </Paper>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the difference between polite and assertive announcements.',
      },
    },
  },
};
