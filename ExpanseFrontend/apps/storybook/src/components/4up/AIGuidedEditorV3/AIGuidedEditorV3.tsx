import { useState, type ReactNode } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  LinearProgress,
  Slider,
  Avatar,
  Divider,
  Stack,
  Tabs,
  Tab,
  Collapse,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import SchoolIcon from '@mui/icons-material/School';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import { platforms, type Platform } from '../../../mocks/4up/mockData';

// ============= TYPES =============

export type ContentIntent = 
  | 'educational'
  | 'lead-generation'
  | 'engagement'
  | 'brand-awareness'
  | 'thought-leadership'
  | 'community-building';

export interface ContentIntentConfig {
  id: ContentIntent;
  label: string;
  icon: ReactNode;
  color: string;
  description: string;
}

export interface IntentScores {
  intent: ContentIntent;
  score: number;
  strengths: string[];
  improvements: string[];
  tips: string[];
}

export interface PlatformRecommendation {
  platform: Platform;
  score: number;
  weight: number;
  reasoning: string;
  bestContentTypes: string[];
}

export interface ContentVariation {
  id: string;
  type: 'post' | 'video-script' | 'audio-script' | 'carousel' | 'thread';
  label: string;
  icon: ReactNode;
  content: string;
  wordCount?: number;
  estimatedDuration?: string;
  platforms?: string[];
}

export interface AIFeedback {
  goalAlignment: {
    score: number;
    matchedGoals: string[];
    suggestions: string[];
  };
  audienceMatch: {
    score: number;
    topPersonas: string[];
    insights: string[];
  };
  toneAnalysis: {
    detectedTone: string;
    matchScore: number;
    brandVoiceAlignment: number;
  };
  intentScores: IntentScores[];
  platformRecommendations: PlatformRecommendation[];
  contentVariations: ContentVariation[];
  overallScore: number;
  improvements: string[];
  strengths: string[];
}

export interface AIGuidedEditorV3Props {
  onBack?: () => void;
  onSubmit?: (content: string, selectedPlatforms: Platform[], variations: ContentVariation[], selectedIntent: ContentIntent | null) => void;
  initialPrompt?: string;
  initialContent?: string;
  initialIntent?: ContentIntent;
  feedback?: AIFeedback;
  showFeedback?: boolean;
  isAnalyzing?: boolean;
  startAtStep?: 'prompt' | 'content';
}

// ============= CONSTANTS =============

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
    description: 'Drive conversions and capture leads',
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
    color: '#9c27b0',
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

const lightColors = {
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

// ============= COMPONENTS =============

function ScoreIndicator({ 
  score, 
  label, 
  size = 'medium',
  showLabel = true,
}: { 
  score: number; 
  label?: string; 
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}) {
  const getColor = (s: number) => {
    if (s >= 80) return lightColors.success;
    if (s >= 60) return lightColors.warning;
    return lightColors.error;
  };

  const sizeMap = {
    small: { container: 44, font: 'body2' as const },
    medium: { container: 60, font: 'h6' as const },
    large: { container: 80, font: 'h5' as const },
  };

  const { container, font } = sizeMap[size];

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          width: container,
          height: container,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(${getColor(score)} ${score * 3.6}deg, ${lightColors.border} 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <Box
            sx={{
              width: '78%',
              height: '78%',
              borderRadius: '50%',
              bgcolor: lightColors.paper,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant={font} fontWeight={700} color={lightColors.text.primary}>
              {score}
            </Typography>
          </Box>
        </Box>
      </Box>
      {showLabel && label && (
        <Typography 
          variant="caption" 
          sx={{ mt: 0.5, display: 'block', color: lightColors.text.secondary, fontWeight: 500 }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}

function IntentSelector({
  selectedIntent,
  intentScores,
  onSelectIntent,
}: {
  selectedIntent: ContentIntent | null;
  intentScores: IntentScores[];
  onSelectIntent: (intent: ContentIntent) => void;
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5, color: lightColors.text.primary, fontWeight: 600 }}>
        Content Intent
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {CONTENT_INTENTS.map((intent) => {
          const isSelected = selectedIntent === intent.id;
          const scoreData = intentScores.find((s) => s.intent === intent.id);
          return (
            <Chip
              key={intent.id}
              icon={intent.icon as React.ReactElement}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {intent.label}
                  {scoreData && (
                    <Box
                      component="span"
                      sx={{
                        ml: 0.5,
                        px: 0.75,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        bgcolor: isSelected ? 'rgba(255,255,255,0.25)' : `${intent.color}22`,
                        color: isSelected ? 'inherit' : intent.color,
                      }}
                    >
                      {scoreData.score}
                    </Box>
                  )}
                </Box>
              }
              onClick={() => onSelectIntent(intent.id)}
              sx={{
                cursor: 'pointer',
                bgcolor: isSelected ? intent.color : lightColors.paper,
                color: isSelected ? '#fff' : lightColors.text.primary,
                border: `2px solid ${isSelected ? intent.color : lightColors.border}`,
                fontWeight: 500,
                '&:hover': {
                  bgcolor: isSelected ? intent.color : lightColors.paperHover,
                  borderColor: intent.color,
                },
                '& .MuiChip-icon': {
                  color: isSelected ? '#fff' : intent.color,
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

function FeedbackPanel({
  feedback,
  isAnalyzing,
  selectedIntent,
  onSelectIntent,
}: {
  feedback: AIFeedback;
  isAnalyzing: boolean;
  selectedIntent: ContentIntent | null;
  onSelectIntent: (intent: ContentIntent) => void;
}) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const selectedIntentData = feedback.intentScores.find((s) => s.intent === selectedIntent);

  const sections = [
    { id: 'overview', icon: <AutoAwesomeIcon fontSize="small" />, label: 'Overview' },
    { id: 'goals', icon: <TrendingUpIcon fontSize="small" />, label: 'Goals' },
    { id: 'audience', icon: <GroupIcon fontSize="small" />, label: 'Audience' },
    { id: 'tone', icon: <VolumeUpIcon fontSize="small" />, label: 'Tone' },
    { id: 'tips', icon: <LightbulbIcon fontSize="small" />, label: 'Tips' },
  ];

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: lightColors.paper,
        border: `1px solid ${lightColors.border}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon sx={{ color: lightColors.primary }} />
            <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>
              AI Feedback
            </Typography>
          </Box>
          {isAnalyzing && (
            <Chip label="Analyzing..." size="small" color="primary" variant="outlined" />
          )}
        </Box>

        {isAnalyzing && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

        {/* Intent Selector */}
        <IntentSelector
          selectedIntent={selectedIntent}
          intentScores={feedback.intentScores}
          onSelectIntent={onSelectIntent}
        />

        {/* Overall Score */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <ScoreIndicator score={feedback.overallScore} label="Overall Score" size="large" />
        </Box>

        {/* Quick Scores Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          <ScoreIndicator score={feedback.goalAlignment.score} label="Goals" size="small" />
          <ScoreIndicator score={feedback.audienceMatch.score} label="Audience" size="small" />
          <ScoreIndicator score={feedback.toneAnalysis.matchScore} label="Tone" size="small" />
        </Box>
      </CardContent>

      <Divider sx={{ borderColor: lightColors.border }} />
      
      <CardContent sx={{ pt: 2, flexGrow: 1, overflow: 'auto' }}>
        {/* Section Tabs as Chips (V1 style) */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {sections.map((section) => (
            <Chip
              key={section.id}
              icon={section.icon as React.ReactElement}
              label={section.label}
              size="small"
              onClick={() => setActiveSection(section.id)}
              sx={{
                cursor: 'pointer',
                bgcolor: activeSection === section.id ? lightColors.primary : lightColors.paper,
                color: activeSection === section.id ? '#fff' : lightColors.text.primary,
                border: `1px solid ${activeSection === section.id ? lightColors.primary : lightColors.border}`,
                fontWeight: 500,
                '&:hover': {
                  bgcolor: activeSection === section.id ? lightColors.primary : lightColors.paperHover,
                },
                '& .MuiChip-icon': {
                  color: activeSection === section.id ? '#fff' : lightColors.text.secondary,
                },
              }}
            />
          ))}
        </Box>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <Box>
            {/* Intent-specific feedback */}
            {selectedIntentData && (
              <Paper 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  bgcolor: `${CONTENT_INTENTS.find(i => i.id === selectedIntent)?.color}11`,
                  border: `1px solid ${CONTENT_INTENTS.find(i => i.id === selectedIntent)?.color}33`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <ScoreIndicator score={selectedIntentData.score} size="small" showLabel={false} />
                  <Typography variant="subtitle2" fontWeight={600} color={lightColors.text.primary}>
                    {CONTENT_INTENTS.find(i => i.id === selectedIntent)?.label} Score
                  </Typography>
                </Box>
                <Stack spacing={0.5}>
                  {selectedIntentData.tips.slice(0, 2).map((tip, i) => (
                    <Typography key={i} variant="body2" color={lightColors.text.secondary}>
                      💡 {tip}
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            )}

            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: lightColors.text.primary }}>
              <CheckCircleIcon sx={{ color: lightColors.success, fontSize: 18 }} />
              Strengths
            </Typography>
            <Stack spacing={0.5} sx={{ mb: 2 }}>
              {feedback.strengths.map((s, i) => (
                <Typography key={i} variant="body2" color={lightColors.text.secondary}>
                  ✓ {s}
                </Typography>
              ))}
            </Stack>

            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: lightColors.text.primary }}>
              <WarningIcon sx={{ color: lightColors.warning, fontSize: 18 }} />
              Improvements
            </Typography>
            <Stack spacing={1}>
              {feedback.improvements.map((s, i) => (
                <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.warning}11`, border: `1px solid ${lightColors.warning}33` }}>
                  <Typography variant="body2" color={lightColors.text.primary}>{s}</Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* Goals Section */}
        {activeSection === 'goals' && (
          <Box>
            <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
              Matched Goals
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
              {feedback.goalAlignment.matchedGoals.map((goal) => (
                <Chip
                  key={goal}
                  label={goal}
                  size="small"
                  icon={<CheckCircleIcon />}
                  sx={{
                    bgcolor: `${lightColors.success}11`,
                    color: lightColors.success,
                    border: `1px solid ${lightColors.success}44`,
                    '& .MuiChip-icon': { color: lightColors.success },
                  }}
                />
              ))}
            </Box>
            <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
              Suggestions
            </Typography>
            <Stack spacing={1}>
              {feedback.goalAlignment.suggestions.map((suggestion, i) => (
                <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.warning}11`, border: `1px solid ${lightColors.warning}33` }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <LightbulbIcon sx={{ color: lightColors.warning, fontSize: 18, mt: 0.25 }} />
                    <Typography variant="body2" color={lightColors.text.primary}>{suggestion}</Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* Audience Section */}
        {activeSection === 'audience' && (
          <Box>
            <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
              Top Matching Personas
            </Typography>
            <Stack spacing={1} sx={{ mb: 2 }}>
              {feedback.audienceMatch.topPersonas.map((persona) => (
                <Box key={persona} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: lightColors.primary, fontSize: 14 }}>
                    {persona[0]}
                  </Avatar>
                  <Typography variant="body2" color={lightColors.text.primary}>{persona}</Typography>
                </Box>
              ))}
            </Stack>
            <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
              Insights
            </Typography>
            <Stack spacing={1}>
              {feedback.audienceMatch.insights.map((insight, i) => (
                <Typography key={i} variant="body2" color={lightColors.text.secondary}>
                  • {insight}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}

        {/* Tone Section */}
        {activeSection === 'tone' && (
          <Box>
            <Paper sx={{ p: 2, mb: 2, bgcolor: `${lightColors.primary}08`, border: `1px solid ${lightColors.primary}22` }}>
              <Typography variant="subtitle2" gutterBottom color={lightColors.text.secondary}>
                Detected Tone
              </Typography>
              <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>
                {feedback.toneAnalysis.detectedTone}
              </Typography>
            </Paper>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color={lightColors.text.primary}>Brand Voice Alignment</Typography>
                <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                  {feedback.toneAnalysis.brandVoiceAlignment}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={feedback.toneAnalysis.brandVoiceAlignment}
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: lightColors.border,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: feedback.toneAnalysis.brandVoiceAlignment >= 80 ? lightColors.success : lightColors.warning,
                  },
                }}
              />
            </Box>
          </Box>
        )}

        {/* Tips Section */}
        {activeSection === 'tips' && selectedIntentData && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, color: lightColors.text.primary, fontWeight: 600 }}>
              Tips for {CONTENT_INTENTS.find(i => i.id === selectedIntent)?.label}
            </Typography>
            <Stack spacing={1}>
              {selectedIntentData.tips.map((tip, i) => (
                <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.info}08`, border: `1px solid ${lightColors.info}22` }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <LightbulbIcon sx={{ color: lightColors.info, fontSize: 18, mt: 0.25 }} />
                    <Typography variant="body2" color={lightColors.text.primary}>{tip}</Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>

            <Divider sx={{ my: 2, borderColor: lightColors.border }} />

            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: lightColors.text.primary }}>
              <CheckCircleIcon sx={{ color: lightColors.success, fontSize: 18 }} />
              Intent Strengths
            </Typography>
            <Stack spacing={0.5} sx={{ mb: 2 }}>
              {selectedIntentData.strengths.map((s, i) => (
                <Typography key={i} variant="body2" color={lightColors.text.secondary}>
                  ✓ {s}
                </Typography>
              ))}
            </Stack>

            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: lightColors.text.primary }}>
              <WarningIcon sx={{ color: lightColors.warning, fontSize: 18 }} />
              Intent Improvements
            </Typography>
            <Stack spacing={0.5}>
              {selectedIntentData.improvements.map((s, i) => (
                <Typography key={i} variant="body2" color={lightColors.text.secondary}>
                  • {s}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>

      <Box sx={{ p: 2, borderTop: `1px solid ${lightColors.border}`, mt: 'auto' }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<RefreshIcon />}
          size="small"
          sx={{ borderColor: lightColors.border, color: lightColors.text.primary }}
        >
          Refresh Analysis
        </Button>
      </Box>
    </Card>
  );
}

function PlatformRecommendationsPanel({
  recommendations,
  selectedPlatforms,
  onSelectPlatform,
  onWeightChange,
}: {
  recommendations: PlatformRecommendation[];
  selectedPlatforms: Platform[];
  onSelectPlatform: (platform: Platform) => void;
  onWeightChange: (platformId: string, weight: number) => void;
}) {
  return (
    <Card sx={{ bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TrendingUpIcon sx={{ color: lightColors.primary }} />
          <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>Platform Recommendations</Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 3, color: lightColors.text.secondary }}>
          AI-ranked platforms based on your content. Select and adjust priority weights.
        </Typography>

        <Stack spacing={2}>
          {recommendations
            .sort((a, b) => b.score - a.score)
            .map((rec) => {
              const isSelected = selectedPlatforms.some((p) => p.id === rec.platform.id);
              return (
                <Paper
                  key={rec.platform.id}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: `2px solid`,
                    borderColor: isSelected ? lightColors.primary : lightColors.border,
                    bgcolor: isSelected ? `${lightColors.primary}08` : lightColors.paper,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: isSelected ? lightColors.primary : `${lightColors.primary}66`,
                      bgcolor: isSelected ? `${lightColors.primary}08` : lightColors.paperHover,
                    },
                  }}
                  onClick={() => onSelectPlatform(rec.platform)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: rec.platform.color,
                        width: 40,
                        height: 40,
                        fontWeight: 600,
                      }}
                    >
                      {rec.platform.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="subtitle1" fontWeight={600} color={lightColors.text.primary}>
                          {rec.platform.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ScoreIndicator score={rec.score} size="small" showLabel={false} />
                          {isSelected && <CheckCircleIcon sx={{ color: lightColors.primary, fontSize: 20 }} />}
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 1, color: lightColors.text.secondary }}>
                        {rec.reasoning}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
                        {rec.bestContentTypes.map((type) => (
                          <Chip 
                            key={type} 
                            label={type} 
                            size="small" 
                            sx={{ 
                              bgcolor: lightColors.paperHover, 
                              color: lightColors.text.primary,
                              border: `1px solid ${lightColors.border}`,
                            }} 
                          />
                        ))}
                      </Box>
                      {isSelected && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color={lightColors.text.secondary}>
                            Priority Weight: {rec.weight}%
                          </Typography>
                          <Slider
                            value={rec.weight}
                            onChange={(_, value) => onWeightChange(rec.platform.id, value as number)}
                            onClick={(e) => e.stopPropagation()}
                            min={0}
                            max={100}
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Paper>
              );
            })}
        </Stack>
      </CardContent>
    </Card>
  );
}

function ContentVariationsPanel({
  variations,
  selectedVariation,
  onSelectVariation,
}: {
  variations: ContentVariation[];
  selectedVariation: string | null;
  onSelectVariation: (id: string) => void;
}) {
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  return (
    <Card sx={{ bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AutoAwesomeIcon sx={{ color: lightColors.primary }} />
          <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>Content Variations</Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 3, color: lightColors.text.secondary }}>
          Your content automatically adapted for different formats.
        </Typography>

        <Stack spacing={2}>
          {variations.map((variation) => {
            const isExpanded = expandedContent === variation.id;
            const isSelected = selectedVariation === variation.id;
            return (
              <Paper
                key={variation.id}
                sx={{
                  overflow: 'hidden',
                  border: `2px solid`,
                  borderColor: isSelected ? lightColors.primary : lightColors.border,
                  bgcolor: isSelected ? `${lightColors.primary}08` : lightColors.paper,
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: lightColors.paperHover },
                  }}
                  onClick={() => setExpandedContent(isExpanded ? null : variation.id)}
                >
                  <Avatar sx={{ bgcolor: lightColors.primary, width: 36, height: 36 }}>{variation.icon}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color={lightColors.text.primary}>{variation.label}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      {variation.wordCount && (
                        <Typography variant="caption" color={lightColors.text.secondary}>
                          {variation.wordCount} words
                        </Typography>
                      )}
                      {variation.estimatedDuration && (
                        <>
                          <Typography variant="caption" color={lightColors.text.secondary}>•</Typography>
                          <Typography variant="caption" color={lightColors.text.secondary}>
                            {variation.estimatedDuration}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                  <IconButton size="small">{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
                </Box>

                <Collapse in={isExpanded}>
                  <Divider sx={{ borderColor: lightColors.border }} />
                  <Box sx={{ p: 2, bgcolor: lightColors.paperHover }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      {variation.platforms?.map((p) => (
                        <Chip 
                          key={p} 
                          label={p} 
                          size="small" 
                          sx={{ bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}` }} 
                        />
                      ))}
                    </Box>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: lightColors.paper,
                        maxHeight: 300,
                        overflow: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.6,
                        color: lightColors.text.primary,
                        border: `1px solid ${lightColors.border}`,
                      }}
                    >
                      {variation.content}
                    </Paper>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
                      <Button startIcon={<ContentCopyIcon />} size="small" variant="outlined">
                        Copy
                      </Button>
                      <Button startIcon={<EditIcon />} size="small" variant="outlined" onClick={() => onSelectVariation(variation.id)}>
                        Edit
                      </Button>
                      {(variation.type === 'video-script' || variation.type === 'audio-script') && (
                        <Button startIcon={<PlayArrowIcon />} size="small" variant="contained">
                          Preview
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Collapse>
              </Paper>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

// ============= MAIN COMPONENT =============

export function AIGuidedEditorV3({
  onBack,
  onSubmit,
  initialPrompt = '',
  initialContent = '',
  initialIntent,
  feedback,
  showFeedback = true,
  isAnalyzing = false,
  startAtStep = 'prompt',
}: AIGuidedEditorV3Props) {
  const [currentStep, setCurrentStep] = useState<'prompt' | 'content'>(startAtStep);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [content, setContent] = useState(initialContent);
  const [selectedIntent, setSelectedIntent] = useState<ContentIntent | null>(initialIntent || null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [platformWeights, setPlatformWeights] = useState<Record<string, number>>({});
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState(0); // 0 = Feedback (default), 1 = Platforms, 2 = Variations

  const handleSelectPlatform = (platform: Platform) => {
    if (selectedPlatforms.some((p) => p.id === platform.id)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p.id !== platform.id));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
      if (!platformWeights[platform.id]) {
        const rec = feedback?.platformRecommendations.find((r) => r.platform.id === platform.id);
        setPlatformWeights({ ...platformWeights, [platform.id]: rec?.weight || 50 });
      }
    }
  };

  const handleWeightChange = (platformId: string, weight: number) => {
    setPlatformWeights({ ...platformWeights, [platformId]: weight });
  };

  const handleGenerate = () => {
    setCurrentStep('content');
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(content, selectedPlatforms, feedback?.contentVariations || [], selectedIntent);
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Prompt Step
  if (currentStep === 'prompt') {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: lightColors.background, p: 3 }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            {onBack && (
              <IconButton onClick={onBack} sx={{ mr: 2, color: lightColors.text.primary }}>
                <ArrowBackIcon />
              </IconButton>
            )}
            <Box>
              <Typography variant="h5" fontWeight={600} color={lightColors.text.primary}>
                AI Content Generator
              </Typography>
              <Typography variant="body2" color={lightColors.text.secondary}>
                Start with your idea, let AI craft the content
              </Typography>
            </Box>
          </Box>

          {/* Intent Selection */}
          <Card sx={{ mb: 3, bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: lightColors.text.primary }}>
                What's your content goal?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {CONTENT_INTENTS.map((intent) => {
                  const isSelected = selectedIntent === intent.id;
                  return (
                    <Chip
                      key={intent.id}
                      icon={intent.icon as React.ReactElement}
                      label={intent.label}
                      onClick={() => setSelectedIntent(intent.id)}
                      sx={{
                        cursor: 'pointer',
                        py: 2.5,
                        px: 1,
                        bgcolor: isSelected ? intent.color : lightColors.paper,
                        color: isSelected ? '#fff' : lightColors.text.primary,
                        border: `2px solid ${isSelected ? intent.color : lightColors.border}`,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        '&:hover': {
                          bgcolor: isSelected ? intent.color : lightColors.paperHover,
                          borderColor: intent.color,
                        },
                        '& .MuiChip-icon': {
                          color: isSelected ? '#fff' : intent.color,
                          fontSize: 20,
                        },
                      }}
                    />
                  );
                })}
              </Box>
              {selectedIntent && (
                <Typography variant="body2" sx={{ mt: 2, color: lightColors.text.secondary }}>
                  {CONTENT_INTENTS.find(i => i.id === selectedIntent)?.description}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Prompt Card */}
          <Card sx={{ mb: 3, bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <LightbulbIcon sx={{ color: lightColors.primary }} />
                <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>
                  What would you like to create?
                </Typography>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Describe your content idea, key message, or topic. Include any specific goals, target audience, or tone preferences.

Example: 'Share our new AI content tool that helps creators work 10x faster. Focus on how it provides real-time feedback and multi-platform optimization. Target tech-savvy professionals and marketing leaders.'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    bgcolor: lightColors.paper,
                  },
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color={lightColors.text.secondary}>
                  {prompt.length} characters
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AutoAwesomeIcon />}
                  disabled={!prompt.trim()}
                  onClick={handleGenerate}
                  sx={{ px: 4 }}
                >
                  Generate Content
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card sx={{ bgcolor: `${lightColors.primary}08`, border: `1px solid ${lightColors.primary}22` }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
                Tips for better results:
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color={lightColors.text.secondary}>
                    <strong>Be specific</strong> about your key message and unique value proposition
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color={lightColors.text.secondary}>
                    <strong>Mention your audience</strong> - who should this content resonate with?
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color={lightColors.text.secondary}>
                    <strong>Include context</strong> - is this for a launch, announcement, or thought leadership?
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }

  // Content Step
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: lightColors.background, p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {onBack && (
            <IconButton onClick={onBack} sx={{ mr: 2, color: lightColors.text.primary }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box>
            <Typography variant="h5" fontWeight={600} color={lightColors.text.primary}>
              Edit & Optimize Content
            </Typography>
            <Typography variant="body2" color={lightColors.text.secondary}>
              Refine your content and select platforms
            </Typography>
          </Box>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<SendIcon />} 
          onClick={handleSubmit} 
          disabled={!content.trim() || selectedPlatforms.length === 0}
        >
          Schedule / Publish
        </Button>
      </Box>

      {isAnalyzing && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

      <Grid container spacing={3}>
        {/* Left: Content Editor */}
        <Grid size={{ xs: 12, lg: showFeedback ? 6 : 12 }}>
          {/* Prompt Display */}
          {prompt && (
            <Paper sx={{ p: 2, mb: 2, bgcolor: `${lightColors.primary}08`, border: `1px solid ${lightColors.primary}22` }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: lightColors.text.secondary }}>
                Your prompt:
              </Typography>
              <Typography variant="body2" color={lightColors.text.primary}>{prompt}</Typography>
              <Button size="small" sx={{ mt: 1 }} onClick={() => setCurrentStep('prompt')}>
                Edit Prompt
              </Button>
            </Paper>
          )}

          {/* Platform Selection (V1 style chips) */}
          <Card sx={{ mb: 2, bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom sx={{ color: lightColors.text.primary, fontWeight: 600 }}>
                Target Platforms
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {platforms.map((platform) => {
                  const isSelected = selectedPlatforms.find((p) => p.id === platform.id);
                  return (
                    <Chip
                      key={platform.id}
                      label={`${platform.icon} ${platform.name}`}
                      onClick={() => handleSelectPlatform(platform)}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: isSelected ? platform.color : lightColors.paper,
                        color: isSelected ? 'white' : lightColors.text.primary,
                        border: `2px solid ${isSelected ? platform.color : lightColors.border}`,
                        fontWeight: 500,
                        '&:hover': {
                          bgcolor: isSelected ? platform.color : lightColors.paperHover,
                          borderColor: platform.color,
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </CardContent>
          </Card>

          {/* Main Editor */}
          <Card sx={{ bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
                Generated Content
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={14}
                placeholder="Your generated content will appear here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    bgcolor: lightColors.paper,
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="body2" color={lightColors.text.secondary}>
                  {wordCount} words • {content.length} characters
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Regenerate content">
                    <Button size="small" startIcon={<AutoAwesomeIcon />}>
                      Regenerate
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right: Feedback Panels */}
        {showFeedback && feedback && (
          <Grid size={{ xs: 12, lg: 6 }}>
            <Tabs 
              value={rightPanelTab} 
              onChange={(_, v) => setRightPanelTab(v)} 
              sx={{ 
                mb: 2,
                '& .MuiTab-root': {
                  fontWeight: 600,
                  color: lightColors.text.secondary,
                },
                '& .Mui-selected': {
                  color: lightColors.primary,
                },
              }}
            >
              <Tab label="Feedback" />
              <Tab label="Platforms" />
              <Tab label="Variations" />
            </Tabs>

            {rightPanelTab === 0 && (
              <FeedbackPanel
                feedback={feedback}
                isAnalyzing={isAnalyzing}
                selectedIntent={selectedIntent}
                onSelectIntent={setSelectedIntent}
              />
            )}

            {rightPanelTab === 1 && (
              <PlatformRecommendationsPanel
                recommendations={feedback.platformRecommendations.map((r) => ({
                  ...r,
                  weight: platformWeights[r.platform.id] ?? r.weight,
                }))}
                selectedPlatforms={selectedPlatforms}
                onSelectPlatform={handleSelectPlatform}
                onWeightChange={handleWeightChange}
              />
            )}

            {rightPanelTab === 2 && (
              <ContentVariationsPanel 
                variations={feedback.contentVariations} 
                selectedVariation={selectedVariation} 
                onSelectVariation={setSelectedVariation} 
              />
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
