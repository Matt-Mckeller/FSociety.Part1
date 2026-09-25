import { useState } from 'react';
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
  Collapse,
  Avatar,
  Divider,
  alpha,
  Stack,
  Fade,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { platforms, type Platform } from '../../../mocks/4up/mockData';

export interface AIFeedbackV1 {
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
  platformOptimization: {
    platform: string;
    score: number;
    tips: string[];
  }[];
  overallScore: number;
  improvements: string[];
  strengths: string[];
}

export interface AIGuidedEditorV1Props {
  onBack?: () => void;
  onSubmit?: (content: string, selectedPlatforms: Platform[]) => void;
  initialContent?: string;
  initialPlatforms?: Platform[];
  feedback?: AIFeedbackV1;
  showFeedback?: boolean;
  isAnalyzing?: boolean;
  feedbackPosition?: 'side' | 'bottom' | 'overlay';
}

const defaultFeedback: AIFeedbackV1 = {
  goalAlignment: {
    score: 78,
    matchedGoals: ['Drive engagement', 'Build brand awareness'],
    suggestions: ['Add a clear call-to-action', 'Include relevant hashtags'],
  },
  audienceMatch: {
    score: 85,
    topPersonas: ['Tech Professionals', 'Early Adopters', 'Decision Makers'],
    insights: ['Content resonates with problem-aware audience', 'Professional tone matches target demographic'],
  },
  toneAnalysis: {
    detectedTone: 'Professional & Inspiring',
    matchScore: 92,
    brandVoiceAlignment: 88,
  },
  platformOptimization: [
    { platform: 'LinkedIn', score: 95, tips: ['Great length for LinkedIn', 'Consider adding industry insights'] },
    { platform: 'Twitter', score: 72, tips: ['Too long for Twitter - consider threading', 'Add more visual hooks'] },
  ],
  overallScore: 82,
  improvements: [
    'Add a compelling hook in the first line',
    'Include specific metrics or data points',
    'End with a question to boost engagement',
  ],
  strengths: [
    'Clear value proposition',
    'Strong professional tone',
    'Good use of storytelling',
  ],
};

function ScoreIndicator({ score, label, size = 'medium' }: { score: number; label: string; size?: 'small' | 'medium' }) {
  const getColor = (s: number) => {
    if (s >= 80) return '#66bb6a';
    if (s >= 60) return '#ffa726';
    return '#f44336';
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          width: size === 'small' ? 48 : 64,
          height: size === 'small' ? 48 : 64,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(${getColor(score)} ${score * 3.6}deg, ${alpha(getColor(score), 0.2)} 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '75%',
              height: '75%',
              borderRadius: '50%',
              bgcolor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant={size === 'small' ? 'body2' : 'h6'} fontWeight={600}>
              {score}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
        {label}
      </Typography>
    </Box>
  );
}

function FeedbackPanel({ feedback, isAnalyzing, expanded, onToggleExpand }: { 
  feedback: AIFeedbackV1; 
  isAnalyzing: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  const [activeSection, setActiveSection] = useState<string | null>('goals');

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6">AI Feedback</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAnalyzing && (
              <Chip label="Analyzing..." size="small" color="primary" variant="outlined" />
            )}
            <IconButton size="small" onClick={onToggleExpand}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>

        {isAnalyzing && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

        {/* Overall Score */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <ScoreIndicator score={feedback.overallScore} label="Overall Score" />
        </Box>

        {/* Quick Scores */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          <ScoreIndicator score={feedback.goalAlignment.score} label="Goals" size="small" />
          <ScoreIndicator score={feedback.audienceMatch.score} label="Audience" size="small" />
          <ScoreIndicator score={feedback.toneAnalysis.matchScore} label="Tone" size="small" />
        </Box>
      </CardContent>

      <Collapse in={expanded}>
        <Divider />
        <CardContent sx={{ pt: 2, flexGrow: 1, overflow: 'auto' }}>
          {/* Section Tabs */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {[
              { id: 'goals', icon: <TrendingUpIcon fontSize="small" />, label: 'Goals' },
              { id: 'audience', icon: <GroupIcon fontSize="small" />, label: 'Audience' },
              { id: 'tone', icon: <VolumeUpIcon fontSize="small" />, label: 'Tone' },
              { id: 'tips', icon: <LightbulbIcon fontSize="small" />, label: 'Tips' },
            ].map((section) => (
              <Chip
                key={section.id}
                icon={section.icon}
                label={section.label}
                size="small"
                variant={activeSection === section.id ? 'filled' : 'outlined'}
                onClick={() => setActiveSection(section.id)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>

          {/* Goals Section */}
          {activeSection === 'goals' && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Matched Goals
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                {feedback.goalAlignment.matchedGoals.map((goal) => (
                  <Chip
                    key={goal}
                    label={goal}
                    size="small"
                    icon={<CheckCircleIcon />}
                    color="success"
                    variant="outlined"
                  />
                ))}
              </Box>
              <Typography variant="subtitle2" gutterBottom>
                Suggestions
              </Typography>
              <Stack spacing={1}>
                {feedback.goalAlignment.suggestions.map((suggestion, i) => (
                  <Paper key={i} sx={{ p: 1.5, bgcolor: alpha('#ffa726', 0.1) }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <LightbulbIcon sx={{ color: 'warning.main', fontSize: 18, mt: 0.25 }} />
                      <Typography variant="body2">{suggestion}</Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}

          {/* Audience Section */}
          {activeSection === 'audience' && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Top Matching Personas
              </Typography>
              <Stack spacing={1} sx={{ mb: 2 }}>
                {feedback.audienceMatch.topPersonas.map((persona) => (
                  <Box key={persona} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 14 }}>
                      {persona[0]}
                    </Avatar>
                    <Typography variant="body2">{persona}</Typography>
                  </Box>
                ))}
              </Stack>
              <Typography variant="subtitle2" gutterBottom>
                Insights
              </Typography>
              <Stack spacing={1}>
                {feedback.audienceMatch.insights.map((insight, i) => (
                  <Typography key={i} variant="body2" color="text.secondary">
                    • {insight}
                  </Typography>
                ))}
              </Stack>
            </Box>
          )}

          {/* Tone Section */}
          {activeSection === 'tone' && (
            <Box>
              <Paper sx={{ p: 2, mb: 2, bgcolor: alpha('#90caf9', 0.1) }}>
                <Typography variant="subtitle2" gutterBottom>
                  Detected Tone
                </Typography>
                <Typography variant="h6">{feedback.toneAnalysis.detectedTone}</Typography>
              </Paper>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Brand Voice Alignment</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {feedback.toneAnalysis.brandVoiceAlignment}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={feedback.toneAnalysis.brandVoiceAlignment}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Box>
          )}

          {/* Tips Section */}
          {activeSection === 'tips' && (
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18 }} />
                Strengths
              </Typography>
              <Stack spacing={0.5} sx={{ mb: 2 }}>
                {feedback.strengths.map((strength, i) => (
                  <Typography key={i} variant="body2" color="text.secondary">
                    ✓ {strength}
                  </Typography>
                ))}
              </Stack>

              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningIcon sx={{ color: 'warning.main', fontSize: 18 }} />
                Improvements
              </Typography>
              <Stack spacing={1}>
                {feedback.improvements.map((improvement, i) => (
                  <Paper key={i} sx={{ p: 1.5, bgcolor: alpha('#ffa726', 0.08) }}>
                    <Typography variant="body2">{improvement}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </CardContent>
      </Collapse>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', mt: 'auto' }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<RefreshIcon />}
          size="small"
        >
          Refresh Analysis
        </Button>
      </Box>
    </Card>
  );
}

export function AIGuidedEditorV1({
  onBack,
  onSubmit,
  initialContent = '',
  initialPlatforms = [],
  feedback = defaultFeedback,
  showFeedback = true,
  isAnalyzing = false,
  feedbackPosition = 'side',
}: AIGuidedEditorV1Props) {
  const [content, setContent] = useState(initialContent);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(initialPlatforms);
  const [feedbackVisible, setFeedbackVisible] = useState(showFeedback);
  const [feedbackExpanded, setFeedbackExpanded] = useState(true);

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.find((p) => p.id === platform.id)
        ? prev.filter((p) => p.id !== platform.id)
        : [...prev, platform]
    );
  };

  const characterCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {onBack && (
          <IconButton onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">AI Guided Editor</Typography>
          <Typography variant="body2" color="text.secondary">
            Write your content and get real-time AI feedback
          </Typography>
        </Box>
        <Tooltip title={feedbackVisible ? 'Hide AI Feedback' : 'Show AI Feedback'}>
          <IconButton onClick={() => setFeedbackVisible(!feedbackVisible)}>
            {feedbackVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {/* Editor Panel */}
        <Grid size={{ xs: 12, md: feedbackVisible && feedbackPosition === 'side' ? 7 : 12 }}>
          <Card>
            <CardContent>
              {/* Platform Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Target Platforms
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {platforms.map((platform) => {
                    const isSelected = selectedPlatforms.find((p) => p.id === platform.id);
                    return (
                      <Chip
                        key={platform.id}
                        label={`${platform.icon} ${platform.name}`}
                        onClick={() => handlePlatformToggle(platform)}
                        variant={isSelected ? 'filled' : 'outlined'}
                        sx={{
                          bgcolor: isSelected ? platform.color : 'transparent',
                          color: isSelected ? 'white' : 'text.primary',
                          borderColor: platform.color,
                          '&:hover': {
                            bgcolor: isSelected ? platform.color : alpha(platform.color, 0.1),
                          },
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>

              {/* Content Editor */}
              <TextField
                fullWidth
                multiline
                rows={12}
                placeholder="Start writing your content here...

The AI will analyze your text in real-time and provide feedback on:
• Goal alignment
• Audience fit
• Tone and brand voice
• Platform optimization
• Improvement suggestions"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  },
                }}
              />

              {/* Character/Word Count */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {wordCount} words • {characterCount} characters
                </Typography>
                {selectedPlatforms.length > 0 && (
                  <Typography variant="caption" color="text.secondary">
                    Optimizing for: {selectedPlatforms.map((p) => p.name).join(', ')}
                  </Typography>
                )}
              </Box>
            </CardContent>

            {/* Action Bar */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={onBack}>
                Cancel
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => onSubmit?.(content, selectedPlatforms)}
                disabled={!content.trim() || selectedPlatforms.length === 0}
              >
                Submit for Review
              </Button>
            </Box>
          </Card>

          {/* Bottom Feedback Position */}
          {feedbackVisible && feedbackPosition === 'bottom' && (
            <Fade in>
              <Box sx={{ mt: 3 }}>
                <FeedbackPanel
                  feedback={feedback}
                  isAnalyzing={isAnalyzing}
                  expanded={feedbackExpanded}
                  onToggleExpand={() => setFeedbackExpanded(!feedbackExpanded)}
                />
              </Box>
            </Fade>
          )}
        </Grid>

        {/* Side Feedback Panel */}
        {feedbackVisible && feedbackPosition === 'side' && (
          <Grid size={{ xs: 12, md: 5 }}>
            <Fade in>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <FeedbackPanel
                  feedback={feedback}
                  isAnalyzing={isAnalyzing}
                  expanded={feedbackExpanded}
                  onToggleExpand={() => setFeedbackExpanded(!feedbackExpanded)}
                />
              </Box>
            </Fade>
          </Grid>
        )}
      </Grid>

      {/* Overlay Feedback Position */}
      {feedbackVisible && feedbackPosition === 'overlay' && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 360,
            maxHeight: 'calc(100vh - 100px)',
            zIndex: 1000,
          }}
        >
          <Fade in>
            <Box>
              <FeedbackPanel
                feedback={feedback}
                isAnalyzing={isAnalyzing}
                expanded={feedbackExpanded}
                onToggleExpand={() => setFeedbackExpanded(!feedbackExpanded)}
              />
            </Box>
          </Fade>
        </Box>
      )}
    </Box>
  );
}
