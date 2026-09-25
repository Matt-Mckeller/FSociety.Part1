/**
 * Mock data for 4up content generation mockups
 */

export interface ContentType {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Campaign {
  id: string;
  name: string;
  color: string;
}

export interface ContentPillar {
  id: string;
  name: string;
  color: string;
}

export interface Business {
  id: string;
  name: string;
  avatar?: string;
}

export const contentTypes: ContentType[] = [
  { id: 'post', label: 'Post', icon: '📝', description: 'Social media post with text and optional media' },
  { id: 'image', label: 'Image', icon: '🖼️', description: 'Generated or edited image content' },
  { id: 'video', label: 'Video', icon: '🎬', description: 'Video content for social platforms' },
  { id: 'story', label: 'Story', icon: '📖', description: 'Ephemeral story content' },
  { id: 'reel', label: 'Reel/Short', icon: '🎞️', description: 'Short-form vertical video' },
  { id: 'article', label: 'Article', icon: '📰', description: 'Long-form written content' },
  { id: 'thread', label: 'Thread', icon: '🧵', description: 'Multi-part connected posts' },
  { id: 'carousel', label: 'Carousel', icon: '🎠', description: 'Multi-slide image/video post' },
];

export const platforms: Platform[] = [
  { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E4405F' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2' },
  { id: 'twitter', name: 'X/Twitter', icon: '🐦', color: '#1DA1F2' },
  { id: 'facebook', name: 'Facebook', icon: '👥', color: '#1877F2' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', color: '#FF0000' },
  { id: 'threads', name: 'Threads', icon: '@', color: '#000000' },
  { id: 'bluesky', name: 'Bluesky', icon: '🦋', color: '#1185FE' },
];

export const campaigns: Campaign[] = [
  { id: 'q1-launch', name: 'Q1 Product Launch', color: '#4caf50' },
  { id: 'brand-awareness', name: 'Brand Awareness', color: '#2196f3' },
  { id: 'holiday-promo', name: 'Holiday Promotion', color: '#f44336' },
  { id: 'thought-leadership', name: 'Thought Leadership', color: '#9c27b0' },
];

export const contentPillars: ContentPillar[] = [
  { id: 'educational', name: 'Educational', color: '#03a9f4' },
  { id: 'entertaining', name: 'Entertaining', color: '#ff9800' },
  { id: 'inspirational', name: 'Inspirational', color: '#e91e63' },
  { id: 'promotional', name: 'Promotional', color: '#4caf50' },
  { id: 'behind-scenes', name: 'Behind the Scenes', color: '#9c27b0' },
  { id: 'user-generated', name: 'User Generated', color: '#00bcd4' },
];

export const businesses: Business[] = [
  { id: 'acme', name: 'Acme Corp' },
  { id: 'techstart', name: 'TechStart Inc' },
  { id: 'personal', name: 'Personal Brand' },
];

export const toneOptions = [
  'Professional',
  'Casual',
  'Friendly',
  'Authoritative',
  'Playful',
  'Inspirational',
  'Educational',
  'Conversational',
];

export const goalOptions = [
  'Drive engagement',
  'Increase followers',
  'Generate leads',
  'Build brand awareness',
  'Drive website traffic',
  'Educate audience',
  'Entertain audience',
  'Promote product/service',
];
