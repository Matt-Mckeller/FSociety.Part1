import SchoolIcon from '@mui/icons-material/School';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import type { ContentIntentConfig } from './types';

// ============= CONTENT INTENTS (expanded with Sales, Conversion, Retention) =============

export const CONTENT_INTENTS: ContentIntentConfig[] = [
  {
    id: 'educational',
    label: 'Educational',
    icon: <SchoolIcon />,
    color: '#2196f3',
    description: 'Teach, inform, and share knowledge',
  },
  {
    id: 'lead-generation',
    label: 'Lead Generation',
    icon: <LeaderboardIcon />,
    color: '#4caf50',
    description: 'Drive interest and capture leads',
  },
  {
    id: 'sales',
    label: 'Sales',
    icon: <ShoppingCartIcon />,
    color: '#8bc34a',
    description: 'Direct selling and product promotion',
  },
  {
    id: 'conversion',
    label: 'Conversion',
    icon: <SwapHorizIcon />,
    color: '#ff5722',
    description: 'Turn prospects into customers',
  },
  {
    id: 'retention',
    label: 'Retention',
    icon: <LoyaltyIcon />,
    color: '#9c27b0',
    description: 'Keep existing customers engaged',
  },
  {
    id: 'engagement',
    label: 'Engagement',
    icon: <FavoriteIcon />,
    color: '#e91e63',
    description: 'Spark conversations and interactions',
  },
  {
    id: 'brand-awareness',
    label: 'Brand Awareness',
    icon: <CampaignIcon />,
    color: '#ff9800',
    description: 'Increase visibility and recognition',
  },
  {
    id: 'thought-leadership',
    label: 'Thought Leadership',
    icon: <EmojiEventsIcon />,
    color: '#673ab7',
    description: 'Establish authority and expertise',
  },
  {
    id: 'community-building',
    label: 'Community',
    icon: <PeopleIcon />,
    color: '#00bcd4',
    description: 'Build relationships and loyalty',
  },
];

// ============= LIGHT MODE COLORS =============

export const lightColors = {
  background: '#f8fafc',
  paper: '#ffffff',
  paperHover: '#f1f5f9',
  border: '#e2e8f0',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
  },
  primary: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#0ea5e9',
};

// ============= SCORE COLORS =============

export const getScoreColor = (score: number): string => {
  if (score >= 80) return lightColors.success;
  if (score >= 60) return lightColors.warning;
  return lightColors.error;
};
