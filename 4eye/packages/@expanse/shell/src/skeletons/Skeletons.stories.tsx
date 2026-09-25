import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LayoutSkeleton } from './LayoutSkeleton';
import { ChatSkeleton } from './ChatSkeleton';
import { FullbleedSkeleton } from './FullbleedSkeleton';
import { Box, Typography, Paper, Skeleton, alpha, useTheme, TextField, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import SettingsIcon from '@mui/icons-material/Settings';

const meta: Meta = {
  title: 'Layout Systems/Core/Skeletons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ContentFrame - Web Layout Building Blocks

Structural skeletons for **web layouts** where bars push content inward.

## Basic Web vs Spatial Layouts

| Basic Web Layouts | Spatial Layouts |
|-------------------|-----------------|
| Bars **push** content | HUD **floats** on content |
| URL-based navigation | Position-based (x,y) navigation |
| Use ContentFrame | Use ScreenOverlay (HUD) |

## Available Frames

\`\`\`
ContentFrame (most flexible)
├── FullbleedFrame (fullscreen content)
└── ChatFrame (chat-focused layouts)
\`\`\`

## Key Concepts

- **Bar Slots**: Top/bottom/left/right bars that push content inward
- **Overlay Zones**: Fixed position overlays at corners (optional)
- **Content Area**: Main scrollable content region

These are building blocks. For production, use the Layouts built on top of these.
        `,
      },
    },
  },
};

export default meta;

// =============================================================================
// Shared Sample Components
// =============================================================================

const SampleContent = ({ lines = 20 }: { lines?: number }) => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Content Area</Typography>
      <Typography
        sx={{
          color: "text.secondary",
          mb: 3
        }}>
        Scroll to see how bars and overlays behave.
      </Typography>
      {Array.from({ length: lines }).map((_, i) => (
        <Paper
          key={i}
          sx={{
            p: 2,
            mb: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(8px)',
          }}
          elevation={1}
        >
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="40%" />
        </Paper>
      ))}
    </Box>
  );
};

const SampleBar = ({ label, height = 56 }: { label: string; height?: number }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height,
        display: 'flex',
        alignItems: 'center',
        px: 3,
        bgcolor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: `0 1px 4px ${alpha(theme.palette.common.black, 0.05)}`,
      }}
    >
      <Typography variant="subtitle1" sx={{
        fontWeight: 600
      }}>{label}</Typography>
    </Box>
  );
};

const SampleOverlay = ({ label }: { label: string }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        px: 2,
        py: 1,
        bgcolor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(12px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
        boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.1)}`,
      }}
      elevation={0}
    >
      <Typography variant="caption" sx={{
        fontWeight: 500
      }}>{label}</Typography>
    </Paper>
  );
};

const SampleChatInput = () => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1.5,
        bgcolor: alpha(theme.palette.background.paper, 0.98),
        backdropFilter: 'blur(16px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        borderRadius: 3,
        boxShadow: `0 4px 24px ${alpha(theme.palette.common.black, 0.12)}`,
      }}
      elevation={0}
    >
      <IconButton size="small" color="primary">
        <MicIcon />
      </IconButton>
      <TextField
        fullWidth
        placeholder="Type a message..."
        variant="standard"
        slotProps={{ input: { disableUnderline: true } }}
        sx={{ px: 1 }}
      />
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

// =============================================================================
// LayoutSkeleton Stories
// =============================================================================

export const LayoutSkeletonDefault: StoryObj = {
  render: () => (
    <Box sx={{ height: '100vh' }}>
      <LayoutSkeleton
        bars={{
          top: <SampleBar label="Header" />,
          bottom: <SampleBar label="Footer" height={48} />,
        }}
        overlays={{
          'top-left': <SampleOverlay label="Logo" />,
          'top-right': <SampleOverlay label="User" />,
          'bottom-left': <SampleOverlay label="Minimap" />,
          'bottom-right': <SampleOverlay label="Controls" />,
        }}
      >
        <SampleContent />
      </LayoutSkeleton>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: `LayoutSkeleton is the most flexible skeleton layer.

**Features:**
- Top/bottom bars with configurable sizes
- Eight overlay positions (corners + edges)
- Scrollable content area
- Background customization

**Props:**
- \`bars\` - Configuration for top/bottom bars
- \`overlays\` - Configuration for overlay zones
- \`background\` - Background style or sx props`,
      },
    },
  },
};

export const LayoutSkeletonTopBarOnly: StoryObj = {
  render: () => (
    <Box sx={{ height: '100vh' }}>
      <LayoutSkeleton
        bars={{
          top: { content: <SampleBar label="App Header" height={64} />, size: 64 },
        }}
      >
        <SampleContent />
      </LayoutSkeleton>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal layout with only a top bar and content area.',
      },
    },
  },
};

export const LayoutSkeletonWithOverlays: StoryObj = {
  render: () => (
    <Box sx={{ height: '100vh' }}>
      <LayoutSkeleton
        overlays={{
          'top-left': <SampleOverlay label="TL" />,
          'top-right': <SampleOverlay label="TR" />,
          'bottom-left': <SampleOverlay label="BL" />,
          'bottom-right': <SampleOverlay label="BR" />,
        }}
        background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper sx={{ p: 4, textAlign: 'center' }} elevation={8}>
            <Typography variant="h4" gutterBottom>
              Overlay-Only Layout
            </Typography>
            <Typography sx={{
              color: "text.secondary"
            }}>
              No bars, just corner overlays on a gradient background.
            </Typography>
          </Paper>
        </Box>
      </LayoutSkeleton>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Layout using only overlay zones without bars.',
      },
    },
  },
};

// =============================================================================
// FullbleedSkeleton Stories
// =============================================================================

export const FullbleedDefault: StoryObj = {
  render: () => {
    const theme = useTheme();
    return (
      <Box sx={{ height: '100vh' }}>
        <FullbleedSkeleton
          overlays={{
            'bottom-left': <SampleOverlay label="Zoom Controls" />,
            'bottom-right': <SampleOverlay label="Settings" />,
          }}
          background={
            theme.palette.mode === 'light'
              ? 'radial-gradient(circle at 30% 40%, #e0f7fa 0%, #f5f5f5 70%)'
              : 'radial-gradient(circle at 30% 40%, #1a237e 0%, #121212 70%)'
          }
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paper sx={{ p: 6, textAlign: 'center', maxWidth: 500 }} elevation={8}>
              <Typography variant="h3" gutterBottom>
                Fullbleed Layout
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 3
                }}>
                Content fills the entire viewport. Overlays float above.
              </Typography>
              <Typography variant="body2" sx={{
                color: "text.secondary"
              }}>
                Perfect for canvas-based UIs, maps, or immersive experiences.
              </Typography>
            </Paper>
          </Box>
        </FullbleedSkeleton>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `FullbleedSkeleton fills the entire viewport with content.

**Use cases:**
- Canvas/drawing applications
- Map interfaces
- Presentation modes
- Immersive experiences

**Props:**
- \`overlays\` - Corner/edge overlay zones
- \`background\` - Background style
- \`contentSx\` - Custom content area styles`,
      },
    },
  },
};

export const FullbleedWithAllOverlays: StoryObj = {
  render: () => (
    <Box sx={{ height: '100vh' }}>
      <FullbleedSkeleton
        overlays={{
          'top-left': <SampleOverlay label="Menu" />,
          'top-center': <SampleOverlay label="Title" />,
          'top-right': <SampleOverlay label="Actions" />,
          'bottom-left': <SampleOverlay label="Status" />,
          'bottom-center': <SampleOverlay label="Navigation" />,
          'bottom-right': <SampleOverlay label="Zoom" />,
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)',
          }}
        >
          <Paper sx={{ p: 4, textAlign: 'center' }} elevation={4}>
            <Typography variant="h5">All Overlay Positions</Typography>
            <Typography sx={{
              color: "text.secondary"
            }}>Six overlay zones active.</Typography>
          </Paper>
        </Box>
      </FullbleedSkeleton>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fullbleed skeleton showing all available overlay positions.',
      },
    },
  },
};

// =============================================================================
// ChatSkeleton Stories
// =============================================================================

export const ChatSkeletonDefault: StoryObj = {
  render: () => (
    <Box sx={{ height: '100vh' }}>
      <ChatSkeleton
        chatInput={<SampleChatInput />}
        chatInputWidth={450}
        chatZoneGap={32}
      >
        <SampleContent lines={10} />
      </ChatSkeleton>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: `ChatSkeleton provides a chat-focused layout.

**Features:**
- Centered chat input at bottom
- Optional left/right targeting panels
- Scrollable message area
- Configurable gaps and widths

**Props:**
- \`chatInput\` - The chat input component (centered)
- \`chatInputWidth\` - Width of chat input (default: 350px)
- \`chatZoneGap\` - Bottom gap (default: 24px)
- \`targetingLeft/Right\` - Side panels`,
      },
    },
  },
};

export const ChatSkeletonWithTargeting: StoryObj = {
  render: () => {
    const theme = useTheme();
    const TargetingPanel = ({ side }: { side: 'left' | 'right' }) => (
      <Paper
        sx={{
          width: 200,
          p: 2,
          bgcolor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(12px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
        }}
        elevation={0}
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            mb: 1,
            display: 'block'
          }}>
          {side === 'left' ? 'Context' : 'Actions'}
        </Typography>
        <Stack spacing={1}>
          {[1, 2, 3].map((i) => (
            <Paper key={i} sx={{ p: 1.5, bgcolor: 'action.hover' }} elevation={0}>
              <Skeleton variant="text" width="80%" />
            </Paper>
          ))}
        </Stack>
      </Paper>
    );

    return (
      <Box sx={{ height: '100vh' }}>
        <ChatSkeleton
          chatInput={<SampleChatInput />}
          chatInputWidth={400}
          targetingLeft={<TargetingPanel side="left" />}
          targetingRight={<TargetingPanel side="right" />}
        >
          <SampleContent lines={8} />
        </ChatSkeleton>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Chat layout with side targeting panels for context and actions.',
      },
    },
  },
};

export const ChatSkeletonWithOverlays: StoryObj = {
  render: () => (
    <Box sx={{ height: '100vh' }}>
      <ChatSkeleton
        chatInput={<SampleChatInput />}
        chatInputWidth={500}
        overlays={{
          'top-right': (
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Stack>
          ),
        }}
      >
        <SampleContent lines={12} />
      </ChatSkeleton>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chat skeleton with overlay controls in the corner.',
      },
    },
  },
};

// =============================================================================
// Comparison
// =============================================================================

export const SkeletonComparison: StoryObj = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Skeleton Types Comparison
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {/* LayoutSkeleton */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center', color: 'primary.main' }}>
            LayoutSkeleton
          </Typography>
          <Paper sx={{ height: 400, overflow: 'hidden' }} elevation={2}>
            <LayoutSkeleton
              bars={{
                top: <Box sx={{ height: 40, bgcolor: 'primary.main', opacity: 0.3 }} />,
                bottom: <Box sx={{ height: 32, bgcolor: 'primary.main', opacity: 0.2 }} />,
              }}
              overlays={{
                'top-left': <SampleOverlay label="TL" />,
              }}
            >
              <Box sx={{ p: 2 }}>
                <Skeleton variant="rectangular" height={100} sx={{ mb: 1 }} />
                <Skeleton width="60%" />
              </Box>
            </LayoutSkeleton>
          </Paper>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
            Bars + Overlays + Content
          </Typography>
        </Box>

        {/* FullbleedSkeleton */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center', color: 'secondary.main' }}>
            FullbleedSkeleton
          </Typography>
          <Paper sx={{ height: 400, overflow: 'hidden' }} elevation={2}>
            <FullbleedSkeleton
              overlays={{
                'bottom-left': <SampleOverlay label="Zoom" />,
              }}
              background="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6">Fullscreen</Typography>
                </Paper>
              </Box>
            </FullbleedSkeleton>
          </Paper>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
            Overlays Only (Canvas UI)
          </Typography>
        </Box>

        {/* ChatSkeleton */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center', color: 'success.main' }}>
            ChatSkeleton
          </Typography>
          <Paper sx={{ height: 400, overflow: 'hidden' }} elevation={2}>
            <ChatSkeleton
              chatInput={
                <Paper sx={{ p: 1, display: 'flex', gap: 1 }}>
                  <TextField size="small" fullWidth placeholder="Chat..." />
                </Paper>
              }
              chatInputWidth={200}
              chatZoneGap={16}
            >
              <Box sx={{ p: 2 }}>
                {[1, 2, 3].map((i) => (
                  <Paper key={i} sx={{ p: 1.5, mb: 1 }}>
                    <Skeleton width="80%" />
                  </Paper>
                ))}
              </Box>
            </ChatSkeleton>
          </Paper>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
            Centered Input + Content
          </Typography>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Side-by-side comparison of all skeleton types.',
      },
    },
  },
};
