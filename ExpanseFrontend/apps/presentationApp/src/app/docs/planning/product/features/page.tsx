import { Typography, Grid, Card, CardContent, CardActionArea, Box, Chip, Alert } from '@mui/material';
import Link from 'next/link';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import SchoolIcon from '@mui/icons-material/School';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PaletteIcon from '@mui/icons-material/Palette';
import ExploreIcon from '@mui/icons-material/Explore';

const features = [
  { title: 'Presentation System', href: '/docs/features/presentation', icon: SlideshowIcon, color: '#1565c0', description: 'Fixed screen layout, slide navigation, presenter/learner modes' },
  { title: 'Game UI Integration', href: '/docs/features/game-ui', icon: SportsEsportsIcon, color: '#7c4dff', description: 'Currency, XP, profile display, rewards, gamification layer' },
  { title: 'Chat System', href: '/docs/features/chat', icon: ChatIcon, color: '#00897b', description: 'Embedded chat with presenter, AI, and team variants' },
  { title: 'Collaboration', href: '/docs/features/collaboration', icon: GroupsIcon, color: '#f57c00', description: 'Real-time screen sharing, cursor sync, audience reactions' },
  { title: 'Quest System', href: '/docs/features/quests', icon: EmojiEventsIcon, color: '#ffc107', description: 'Trackable objectives with XP and coin rewards' },
  { title: 'Action Bars', href: '/docs/features/action-bars', icon: TouchAppIcon, color: '#c62828', description: '23 action bar types with AI-powered learning actions' },
  { title: 'AI Actions', href: '/docs/features/ai-actions', icon: AutoAwesomeIcon, color: '#6a1b9a', description: '140+ AI interaction actions organized by category', badge: '140+' },
  { title: 'Feedback System', href: '/docs/features/feedback', icon: ThumbsUpDownIcon, color: '#0277bd', description: 'Bidirectional feedback: User → System and System → User' },
  { title: 'Panel System', href: '/docs/features/panels', icon: ViewSidebarIcon, color: '#388e3c', description: 'Configurable collapsible panels for chat, notes, analytics' },
  { title: 'Learning Features', href: '/docs/features/learning', icon: SchoolIcon, color: '#5c6bc0', description: 'AI strategies, content pipelines, accessibility modes' },
  { title: 'Context Menu', href: '/docs/features/context-menu', icon: MoreHorizIcon, color: '#78909c', description: 'Custom right-click context menu with contextual actions' },
  { title: 'Unlockable Content', href: '/docs/features/unlockable', icon: LockOpenIcon, color: '#8d6e63', description: 'Level-gated sections and features' },
  { title: 'Decorative Elements', href: '/docs/features/decorative', icon: AutoFixHighIcon, color: '#ec407a', description: 'Characters, branding, transition animations' },
  { title: 'Customization & Theming', href: '/docs/features/theming', icon: PaletteIcon, color: '#ff7043', description: 'User-customizable colors and MUI themes' },
  { title: 'Exploratory / TBD', href: '/docs/features/exploratory', icon: ExploreIcon, color: '#9e9e9e', description: 'Features needing further exploration' },
];

export default function FeaturesIndexPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Features & Core Features
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          All 15 core feature modules documented from PresentationApp.md.
        </Typography>
      </Box>

      <Alert severity="success" sx={{ mb: 3 }} icon={false}>
        <strong>Complete Documentation:</strong> All feature pages contain 100% of the content from the source document.
      </Alert>

      <Grid container spacing={2}>
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Grid item xs={12} sm={6} key={feature.href}>
              <Card 
                variant="outlined"
                sx={{ 
                  height: '100%',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: feature.color,
                    boxShadow: `0 4px 12px ${feature.color}18`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardActionArea 
                  component={Link} 
                  href={feature.href}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Box 
                        sx={{ 
                          p: 0.75, 
                          borderRadius: 1.5, 
                          bgcolor: `${feature.color}12`,
                          height: 'fit-content',
                        }}
                      >
                        <Icon sx={{ color: feature.color, fontSize: 20 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                            {feature.title}
                          </Typography>
                          {feature.badge && (
                            <Chip 
                              label={feature.badge} 
                              size="small" 
                              sx={{ 
                                height: 18, 
                                fontSize: '0.65rem', 
                                fontWeight: 600,
                                bgcolor: feature.color,
                                color: 'white',
                              }} 
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
