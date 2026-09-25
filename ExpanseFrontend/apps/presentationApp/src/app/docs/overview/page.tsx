import { Typography, Box, Paper, List, ListItem, ListItemText, ListItemIcon, Chip, Stack, Divider, Grid, Card, CardContent } from '@mui/material';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const coreFeatures = [
  {
    title: 'Presentation System',
    description: 'Fixed-shell layout with slide navigation, presenter/learner modes, and audience targeting',
    icon: SlideshowIcon,
    color: '#1565c0',
  },
  {
    title: 'Gamification Layer',
    description: 'XP, coins, quests, inventory, achievements, and level-based unlocks',
    icon: EmojiEventsIcon,
    color: '#ffc107',
  },
  {
    title: 'AI-Powered Learning',
    description: '140+ AI actions for content transformation, visualization, and personalized learning',
    icon: AutoAwesomeIcon,
    color: '#7c4dff',
  },
  {
    title: 'Real-Time Collaboration',
    description: 'WebSocket-powered presenter sync, live reactions, and screen sharing',
    icon: GroupsIcon,
    color: '#00897b',
  },
  {
    title: 'Accessibility',
    description: 'Content variants for ADHD, autism, dyslexia, and other learning needs',
    icon: AccessibilityNewIcon,
    color: '#f57c00',
  },
];

const designPrinciples = [
  { label: 'Collaboration', text: 'Real-time screen sharing options' },
  { label: 'Visualization', text: 'Start with the best method for understanding concepts' },
  { label: 'Fixed UI Shell', text: 'Static UI screen; only primary content scrolls' },
];

export default function OverviewPage() {
  return (
    <>
      {/* Hero */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Overview
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem', maxWidth: 650 }}>
          A gamified presentation application for Expanse EDU that combines learning, engagement, and AI-powered personalization.
        </Typography>
      </Box>

      {/* Core Features Grid */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
        Core Capabilities
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {coreFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <Grid item xs={12} sm={6} key={feature.title}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2.5, 
                  height: '100%',
                  borderLeft: `4px solid ${feature.color}`,
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 2 },
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Icon sx={{ color: feature.color, fontSize: 28, mt: 0.25 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Build Order */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Build Order
      </Typography>
      <Paper variant="outlined" sx={{ p: 2.5, mb: 4 }}>
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
            <Typography variant="body1">
              <strong>Phase 1:</strong> Presentation app shell and infrastructure
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CheckCircleIcon sx={{ color: 'grey.400', fontSize: 20 }} />
            <Typography variant="body1">
              <strong>Phase 2:</strong> Presentations and content (starting with Introduction)
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Design Principles */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Design Principles
      </Typography>
      <Stack spacing={1.5}>
        {designPrinciples.map((principle) => (
          <Paper 
            key={principle.label}
            variant="outlined" 
            sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <Chip 
              label={principle.label} 
              size="small" 
              sx={{ 
                fontWeight: 600, 
                bgcolor: 'primary.main', 
                color: 'white',
                minWidth: 110,
              }} 
            />
            <Typography variant="body2" color="text.secondary">
              {principle.text}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </>
  );
}
