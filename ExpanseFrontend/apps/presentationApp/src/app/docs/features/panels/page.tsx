import { Typography, Paper, Box, Chip, Stack, Card, CardContent, Grid } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import InsightsIcon from '@mui/icons-material/Insights';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LinkIcon from '@mui/icons-material/Link';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import DockIcon from '@mui/icons-material/Dock';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Link from 'next/link';

const panelTypes = [
  { icon: ChatIcon, title: 'Chat Panel', description: 'Embedded chat UI for real-time communication', color: '#3b82f6' },
  { icon: StickyNote2Icon, title: 'Notes Panel', description: 'User notes and annotations', color: '#f59e0b' },
  { icon: InsightsIcon, title: 'Analytics Panel', description: 'Learning metrics and progress tracking', color: '#8b5cf6' },
  { icon: FeedbackIcon, title: 'Feedback Panel', description: 'Content feedback form for improvements', color: '#ef4444' },
  { icon: LinkIcon, title: 'References Panel', description: 'Related materials and external links', color: '#06b6d4' },
  { icon: TrendingUpIcon, title: 'Progress Panel', description: 'Quest and XP progress visualization', color: '#10b981' },
];

const behaviors = [
  { icon: UnfoldLessIcon, title: 'Collapsible', description: 'Panels can be collapsed to minimize space and reduce visual clutter' },
  { icon: ToggleOnIcon, title: 'Toggleable', description: 'Panels can be shown or hidden via toolbar icons for quick access' },
  { icon: DockIcon, title: 'Fixed Positions', description: 'MVP uses fixed dock positions (left, right, bottom) for consistent layout' },
];

const relatedFeatures = [
  { href: '/docs/features/chat', label: 'Chat System' },
  { href: '/docs/features/quests', label: 'Quests & XP' },
  { href: '/docs/features/feedback', label: 'Feedback' },
];

export default function PanelsPage() {
  return (
    <>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          bgcolor: '#14b8a6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)',
        }}>
          <DashboardIcon sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Configurable Panel System
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Flexible, dockable panels for enhanced learning workflows
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture - Enhanced */}
      <Paper sx={{
        p: 2.5,
        mb: 4,
        background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
        borderLeft: '4px solid #14b8a6',
        borderRadius: 2,
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#0f766e' }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip
            label="Slide Engine"
            size="small"
            sx={{
              bgcolor: '#14b8a6',
              color: 'white',
              fontWeight: 600,
              mr: 0.5,
              mb: 0.5,
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, fontWeight: 500 }}>
          React Context Dependencies:
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip
            label="PanelContext"
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem', borderColor: '#14b8a6', color: '#0f766e' }}
          />
          <Chip
            label="PanelLayoutContext"
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem', borderColor: '#14b8a6', color: '#0f766e' }}
          />
        </Stack>
        <Typography variant="caption" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic', color: '#b45309' }}>
          Note: Context structure is assumed and may evolve during implementation.
        </Typography>
      </Paper>

      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary', mb: 4 }}>
        Hidden/expandable panels that can be toggled open/closed. Panels provide supplementary tools and information without cluttering the main content area.
      </Typography>

      {/* Panel Types Grid */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Panel Types
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {panelTypes.map((panel) => (
          <Grid item xs={12} sm={6} md={4} key={panel.title}>
            <Card sx={{
              height: '100%',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 24px ${panel.color}25`,
              },
            }}>
              <CardContent>
                <Box sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 1.5,
                  bgcolor: `${panel.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1.5,
                }}>
                  <panel.icon sx={{ fontSize: 24, color: panel.color }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {panel.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {panel.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Behavior Features Grid */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Behavior
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {behaviors.map((behavior) => (
          <Grid item xs={12} sm={4} key={behavior.title}>
            <Card variant="outlined" sx={{
              height: '100%',
              bgcolor: 'grey.50',
              borderColor: 'grey.200',
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <behavior.icon sx={{ fontSize: 36, color: '#14b8a6', mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {behavior.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {behavior.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Future Enhancements */}
      <Paper sx={{
        p: 2.5,
        mb: 4,
        bgcolor: '#fef3c7',
        borderRadius: 2,
        border: '1px solid #fbbf24',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <RocketLaunchIcon sx={{ color: '#d97706' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#92400e' }}>
            Future Enhancements
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#78350f' }}>
          <strong>Drag-and-Drop:</strong> Allow users to freely reposition panels anywhere on screen.
          <br />
          <strong>Custom Layouts:</strong> Save and restore personalized panel arrangements.
          <br />
          <strong>Panel Presets:</strong> Quick-switch between predefined layouts (e.g., "Study Mode", "Review Mode").
        </Typography>
      </Paper>

      {/* Related Features */}
      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
          Related Features
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {relatedFeatures.map((feature) => (
            <Link key={feature.href} href={feature.href} style={{ textDecoration: 'none' }}>
              <Chip
                label={feature.label}
                clickable
                sx={{
                  bgcolor: '#14b8a6',
                  color: 'white',
                  fontWeight: 500,
                  '&:hover': { bgcolor: '#0f766e' },
                }}
              />
            </Link>
          ))}
        </Stack>
      </Box>
    </>
  );
}
