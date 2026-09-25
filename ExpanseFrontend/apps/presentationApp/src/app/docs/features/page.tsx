import { Typography, Grid, Card, CardContent, CardActionArea, Box, Chip } from '@mui/material';
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
import ExploreIcon from '@mui/icons-material/Explore';

const features = [
  {
    title: 'Presentation System',
    href: '/docs/features/presentation',
    description: 'Fixed screen layout with slide navigation, presenter/learner modes, and audience targeting',
    icon: SlideshowIcon,
    color: '#1565c0',
  },
  {
    title: 'Game UI Integration',
    href: '/docs/features/game-ui',
    description: 'Currency, XP, profile display, rewards, and gamification layer',
    icon: SportsEsportsIcon,
    color: '#7c4dff',
  },
  {
    title: 'Chat System',
    href: '/docs/features/chat',
    description: 'Embedded chat with presenter, AI, and team chat variants',
    icon: ChatIcon,
    color: '#00897b',
  },
  {
    title: 'Collaboration',
    href: '/docs/features/collaboration',
    description: 'Real-time screen sharing, cursor sync, and audience reactions',
    icon: GroupsIcon,
    color: '#f57c00',
  },
  {
    title: 'Quest System',
    href: '/docs/features/quests',
    description: 'Trackable objectives with XP and coin rewards',
    icon: EmojiEventsIcon,
    color: '#ffc107',
  },
  {
    title: 'Action Bars',
    href: '/docs/features/action-bars',
    description: '23 action bar types with 140+ AI-powered learning actions',
    icon: TouchAppIcon,
    color: '#c62828',
  },
  {
    title: 'AI Actions',
    href: '/docs/features/ai-actions',
    description: 'All 140+ AI interaction actions organized by category with descriptions',
    icon: AutoAwesomeIcon,
    color: '#6a1b9a',
    badge: '140+',
  },
  {
    title: 'Feedback System',
    href: '/docs/features/feedback',
    description: 'Bidirectional feedback: User → System and System → User',
    icon: ThumbsUpDownIcon,
    color: '#0277bd',
  },
  {
    title: 'Panel System',
    href: '/docs/features/panels',
    description: 'Configurable collapsible panels for chat, notes, analytics',
    icon: ViewSidebarIcon,
    color: '#388e3c',
  },
  {
    title: 'Learning Features',
    href: '/docs/features/learning',
    description: 'AI strategies, content pipelines, accessibility modes',
    icon: SchoolIcon,
    color: '#5c6bc0',
  },
  {
    title: 'Context Menu',
    href: '/docs/features/context-menu',
    description: 'Custom right-click context menu with contextual actions',
    icon: MoreHorizIcon,
    color: '#78909c',
  },
  {
    title: 'Unlockable Content',
    href: '/docs/features/unlockable',
    description: 'Level-gated sections and features that unlock with progression',
    icon: LockOpenIcon,
    color: '#8d6e63',
  },
  {
    title: 'Exploratory / TBD',
    href: '/docs/features/exploratory',
    description: 'Features needing further exploration before implementation',
    icon: ExploreIcon,
    color: '#9e9e9e',
  },
];

export default function FeaturesIndexPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Core Features
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          A presentation UI with Game UI elements and gamification — giving users a better understanding 
          of the process and potential while maintaining focus on learning content.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
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
                  sx={{ height: '100%', alignItems: 'flex-start' }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box 
                        sx={{ 
                          p: 1, 
                          borderRadius: 2, 
                          bgcolor: `${feature.color}12`,
                          display: 'flex',
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ color: feature.color, fontSize: 22 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1rem' }}>
                            {feature.title}
                          </Typography>
                          {feature.badge && (
                            <Chip 
                              label={feature.badge} 
                              size="small" 
                              sx={{ 
                                height: 20, 
                                fontSize: '0.7rem', 
                                fontWeight: 600,
                                bgcolor: feature.color,
                                color: 'white',
                              }} 
                            />
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
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
