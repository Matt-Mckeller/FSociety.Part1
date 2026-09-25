import SchoolIcon from '@mui/icons-material/School';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ForumIcon from '@mui/icons-material/Forum';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupsIcon from '@mui/icons-material/Groups';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import WorkIcon from '@mui/icons-material/Work';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BoltIcon from '@mui/icons-material/Bolt';
import PaletteIcon from '@mui/icons-material/Palette';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChatIcon from '@mui/icons-material/Chat';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import type { ContentIntent, VariationStyle, PromptGuideline, AudienceSelection } from './types';

// ============= CONTENT INTENTS =============

export const CONTENT_INTENTS: { id: ContentIntent; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'educational', label: 'Educational', icon: <SchoolIcon fontSize="small" />, description: 'Teach and inform your audience' },
  { id: 'lead-generation', label: 'Lead Gen', icon: <LeaderboardIcon fontSize="small" />, description: 'Capture potential customers' },
  { id: 'engagement', label: 'Engagement', icon: <ForumIcon fontSize="small" />, description: 'Spark conversations and interactions' },
  { id: 'brand-awareness', label: 'Brand Awareness', icon: <CampaignIcon fontSize="small" />, description: 'Increase visibility and recognition' },
  { id: 'thought-leadership', label: 'Thought Leadership', icon: <EmojiObjectsIcon fontSize="small" />, description: 'Establish industry authority' },
  { id: 'community-building', label: 'Community', icon: <GroupsIcon fontSize="small" />, description: 'Foster belonging and connection' },
  { id: 'sales', label: 'Sales', icon: <ShoppingCartIcon fontSize="small" />, description: 'Drive direct purchases' },
  { id: 'conversion', label: 'Conversion', icon: <TrendingUpIcon fontSize="small" />, description: 'Move audience to action' },
  { id: 'retention', label: 'Retention', icon: <LoyaltyIcon fontSize="small" />, description: 'Keep existing customers engaged' },
  { id: 'recruitment', label: 'Recruitment', icon: <WorkIcon fontSize="small" />, description: 'Attract talent and team members' },
  { id: 'customer-success', label: 'Customer Success', icon: <SupportAgentIcon fontSize="small" />, description: 'Help customers achieve goals' },
  { id: 'advocacy', label: 'Advocacy', icon: <ThumbUpIcon fontSize="small" />, description: 'Turn customers into promoters' },
];

// ============= VARIATION STYLES =============

export const VARIATION_STYLES: { id: VariationStyle; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'ai-default', label: 'AI Default', icon: <AutoAwesomeIcon fontSize="small" />, description: 'Let AI choose the best approach' },
  { id: 'short-powerful', label: 'Short & Powerful', icon: <BoltIcon fontSize="small" />, description: 'Punchy, direct messaging' },
  { id: 'vivid-imagery', label: 'Vivid Imagery', icon: <PaletteIcon fontSize="small" />, description: 'Descriptive, sensory language' },
  { id: 'storytelling', label: 'Storytelling', icon: <AutoStoriesIcon fontSize="small" />, description: 'Narrative-driven approach' },
  { id: 'conversational', label: 'Conversational', icon: <ChatIcon fontSize="small" />, description: 'Casual, friendly tone' },
  { id: 'professional', label: 'Professional', icon: <BusinessCenterIcon fontSize="small" />, description: 'Formal, authoritative voice' },
  { id: 'provocative', label: 'Provocative', icon: <LocalFireDepartmentIcon fontSize="small" />, description: 'Bold, attention-grabbing' },
];

// ============= DEFAULT GUIDELINES =============

export const DEFAULT_GUIDELINES: PromptGuideline[] = [
  { id: 'engaging', label: 'Make it engaging', description: 'Add hooks, questions, relatable language', enabled: true },
  { id: 'cta', label: 'Include CTA', description: 'Add a call-to-action appropriate for the platform', enabled: false },
  { id: 'educational', label: 'Educational focus', description: 'Focus on teaching and informing the reader', enabled: false },
  { id: 'statistics', label: 'Include statistics & evidence', description: 'Add facts, data points, and research findings', enabled: false },
  { id: 'problem-solution', label: 'Problem-solution framing', description: 'Structure around problem identification and resolution', enabled: false },
  { id: 'social-proof', label: 'Social proof', description: 'Include testimonials, case studies, or success stories', enabled: false },
];

// ============= DEFAULT AUDIENCES =============

export const DEFAULT_AUDIENCES: AudienceSelection[] = [
  { id: 'busy-professional', name: 'Busy Professional', type: 'persona', description: 'Time-strapped decision makers', selected: false },
  { id: 'curious-learner', name: 'Curious Learner', type: 'persona', description: 'Always seeking new knowledge', selected: false },
  { id: 'skeptical-buyer', name: 'Skeptical Buyer', type: 'persona', description: 'Needs proof before commitment', selected: false },
  { id: 'early-adopter', name: 'Early Adopter', type: 'segment', description: 'Loves trying new things first', selected: false },
  { id: 'budget-conscious', name: 'Budget Conscious', type: 'segment', description: 'Value-focused decision making', selected: false },
  { id: 'tech-savvy', name: 'Tech Savvy', type: 'demographic', description: 'Comfortable with technology', selected: false },
  { id: 'traditional', name: 'Traditional', type: 'demographic', description: 'Prefers proven approaches', selected: false },
];

// ============= EMOJI OPTIONS =============

export const EMOJI_OPTIONS = [
  { value: 'none', label: 'None', icon: '🚫', description: 'No emojis' },
  { value: 'minimal', label: 'Minimal', icon: '✨', description: '1-2 strategic emojis' },
  { value: 'optimal', label: 'Optimal', icon: '🎯', description: 'Context-appropriate usage' },
  { value: 'expressive', label: 'Expressive', icon: '🔥', description: 'Liberal emoji use' },
] as const;

// ============= LIGHT THEME COLORS =============

export const lightColors = {
  background: '#f8fafc',
  paper: '#ffffff',
  paperHover: '#f1f5f9',
  border: '#e2e8f0',
  primary: '#6366f1',
  primaryHover: '#4f46e5',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    muted: '#94a3b8',
  },
};

// ============= SCORE COLOR HELPER =============

export function getScoreColor(score: number): string {
  if (score >= 80) return lightColors.success;
  if (score >= 60) return lightColors.info;
  if (score >= 40) return lightColors.warning;
  return lightColors.error;
}
