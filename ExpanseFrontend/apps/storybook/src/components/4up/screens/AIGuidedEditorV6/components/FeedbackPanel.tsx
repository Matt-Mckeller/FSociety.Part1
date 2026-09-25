import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { lightColors, getScoreColor } from '../constants';
import { ScoreIndicator } from './ScoreIndicator';
import type { AIFeedback, FeedbackOptions } from '../types';

interface FeedbackPanelProps {
  feedback: AIFeedback;
  feedbackOptions: FeedbackOptions;
  onFeedbackOptionsChange: (options: FeedbackOptions) => void;
  isAnalyzing?: boolean;
}

type FeedbackSection = 'overview' | 'themes' | 'audience' | 'pain-points' | 'goals' | 'tone';

const SECTIONS: { id: FeedbackSection; label: string; emoji: string; optionKey?: keyof FeedbackOptions }[] = [
  { id: 'overview', label: 'Overview', emoji: '📊' },
  { id: 'themes', label: 'Themes', emoji: '🎨', optionKey: 'enableThemeAlignment' },
  { id: 'audience', label: 'Audience', emoji: '👥', optionKey: 'enableAudienceReview' },
  { id: 'pain-points', label: 'Pain Points', emoji: '💡', optionKey: 'enablePainPointAnalysis' },
  { id: 'goals', label: 'Goals', emoji: '🏆', optionKey: 'enableGoalAlignment' },
  { id: 'tone', label: 'Tone', emoji: '🎭', optionKey: 'enableToneAnalysis' },
];

export function FeedbackPanel({ 
  feedback, 
  feedbackOptions,
  onFeedbackOptionsChange,
  // isAnalyzing can be used for loading states
}: FeedbackPanelProps) {
  const [activeSection, setActiveSection] = useState<FeedbackSection>('overview');
  const [viewMode, setViewMode] = useState<'simple' | 'advanced'>('simple');

  const handleOptionToggle = (key: keyof FeedbackOptions) => {
    if (typeof feedbackOptions[key] === 'boolean') {
      onFeedbackOptionsChange({
        ...feedbackOptions,
        [key]: !feedbackOptions[key],
      });
    }
  };

  return (
    <Card sx={{ bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}` }}>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>
            AI Feedback
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={viewMode === 'advanced'}
                onChange={() => setViewMode(viewMode === 'simple' ? 'advanced' : 'simple')}
                size="small"
              />
            }
            label={<Typography variant="caption" color={lightColors.text.secondary}>Advanced</Typography>}
          />
        </Box>

        {/* Section Chips */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 3 }}>
          {SECTIONS.map((section) => {
            const isEnabled = !section.optionKey || feedbackOptions[section.optionKey];
            return (
              <Chip
                key={section.id}
                label={`${section.emoji} ${section.label}`}
                onClick={() => setActiveSection(section.id)}
                size="small"
                sx={{
                  cursor: 'pointer',
                  bgcolor: activeSection === section.id ? lightColors.primary : lightColors.paper,
                  color: activeSection === section.id ? 'white' : lightColors.text.primary,
                  border: `1px solid ${activeSection === section.id ? lightColors.primary : lightColors.border}`,
                  opacity: isEnabled ? 1 : 0.5,
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: activeSection === section.id ? lightColors.primaryHover : lightColors.paperHover,
                  },
                }}
              />
            );
          })}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <ScoreIndicator score={feedback.overallScore} label="Overall Score" size="large" />
            </Box>

            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3, flexWrap: 'wrap' }}>
              {feedback.goalAlignment && (
                <ScoreIndicator score={feedback.goalAlignment.overallScore} label="Goals" size="small" />
              )}
              {feedback.toneAnalysis && (
                <ScoreIndicator score={feedback.toneAnalysis.matchScore} label="Tone" size="small" />
              )}
            </Box>

            {/* Strengths */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: lightColors.text.primary, fontWeight: 600 }}>
                ✨ Strengths
              </Typography>
              <Stack spacing={0.75}>
                {feedback.strengths.slice(0, 3).map((strength, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: lightColors.success, fontSize: 16, mt: 0.25 }} />
                    <Typography variant="body2" color={lightColors.text.primary}>{strength}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Improvements */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: lightColors.text.primary, fontWeight: 600 }}>
                💡 Improvements
              </Typography>
              <Stack spacing={0.75}>
                {feedback.improvements.slice(0, 3).map((improvement, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <WarningIcon sx={{ color: lightColors.warning, fontSize: 16, mt: 0.25 }} />
                    <Typography variant="body2" color={lightColors.text.primary}>{improvement}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Feedback Options Toggle */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
              FEEDBACK OPTIONS (affects cost)
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              {SECTIONS.filter(s => s.optionKey).map((section) => {
                const isEnabled = feedbackOptions[section.optionKey as keyof FeedbackOptions];
                return (
                  <Chip
                    key={section.id}
                    label={`${section.emoji} ${section.label}`}
                    onClick={() => handleOptionToggle(section.optionKey as keyof FeedbackOptions)}
                    size="small"
                    sx={{
                      cursor: 'pointer',
                      bgcolor: isEnabled ? lightColors.successLight : lightColors.paper,
                      color: isEnabled ? lightColors.success : lightColors.text.secondary,
                      border: `1px solid ${isEnabled ? lightColors.success : lightColors.border}`,
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {/* Theme Alignment Section */}
        {activeSection === 'themes' && feedbackOptions.enableThemeAlignment && feedback.themeAlignment && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
              🎨 Theme Alignment
            </Typography>
            <Stack spacing={1}>
              {feedback.themeAlignment.slice(0, 5).map((theme) => (
                <Paper key={theme.themeName} sx={{ p: 1.5, border: `1px solid ${lightColors.border}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Chip 
                        label={theme.themeType} 
                        size="small" 
                        sx={{ 
                          height: 18, 
                          fontSize: '0.65rem',
                          bgcolor: theme.themeType === 'core' ? lightColors.primaryLight : lightColors.secondaryLight,
                          color: theme.themeType === 'core' ? lightColors.primary : lightColors.secondary,
                          mb: 0.5,
                        }} 
                      />
                      <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                        {theme.themeName}
                      </Typography>
                    </Box>
                    <ScoreIndicator score={theme.alignmentScore} size="small" showLabel={false} />
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* Audience Reviews Section */}
        {activeSection === 'audience' && feedbackOptions.enableAudienceReview && feedback.audienceReviews && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
              👥 Audience Appeal
            </Typography>
            <Stack spacing={1}>
              {feedback.audienceReviews.map((review) => (
                <Paper key={review.audienceId} sx={{ p: 1.5, border: `1px solid ${lightColors.border}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                      {review.audienceName}
                    </Typography>
                    <ScoreIndicator score={review.appealScore} size="small" showLabel={false} />
                  </Box>
                  {review.sampleReaction && viewMode === 'advanced' && (
                    <Typography variant="caption" color={lightColors.text.secondary} sx={{ fontStyle: 'italic' }}>
                      "{review.sampleReaction}"
                    </Typography>
                  )}
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* Pain Points Section */}
        {activeSection === 'pain-points' && feedbackOptions.enablePainPointAnalysis && feedback.painPointAlignment && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
              💡 Pain Point Alignment
            </Typography>
            <Stack spacing={1}>
              {feedback.painPointAlignment.slice(0, 3).map((pp) => (
                <Paper key={pp.painPoint} sx={{ p: 1.5, border: `1px solid ${getScoreColor(pp.alignmentScore)}44` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                      {pp.painPoint}
                    </Typography>
                    <ScoreIndicator score={pp.alignmentScore} size="small" showLabel={false} />
                  </Box>
                  {viewMode === 'advanced' && (
                    <Typography variant="caption" color={lightColors.text.secondary} sx={{ mt: 0.5, display: 'block' }}>
                      {pp.description}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* Goals Section */}
        {activeSection === 'goals' && feedbackOptions.enableGoalAlignment && feedback.goalAlignment && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
              🏆 Goal Alignment
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <ScoreIndicator score={feedback.goalAlignment.overallScore} label="Overall" size="medium" />
            </Box>
            <Stack spacing={1}>
              {feedback.goalAlignment.goalBreakdown.map((goal) => (
                <Paper key={goal.goalName} sx={{ p: 1.5, border: `1px solid ${getScoreColor(goal.score)}44` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                      {goal.goalName}
                    </Typography>
                    <ScoreIndicator score={goal.score} size="small" showLabel={false} />
                  </Box>
                  {viewMode === 'advanced' && (
                    <Typography variant="caption" color={lightColors.text.secondary} sx={{ mt: 0.5, display: 'block' }}>
                      {goal.reasoning}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* Tone Section */}
        {activeSection === 'tone' && feedbackOptions.enableToneAnalysis && feedback.toneAnalysis && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
              🎭 Tone Analysis
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
              <ScoreIndicator score={feedback.toneAnalysis.matchScore} label="Match" size="medium" />
              <ScoreIndicator score={feedback.toneAnalysis.brandVoiceAlignment} label="Brand Voice" size="medium" />
            </Box>
            <Paper sx={{ p: 2, bgcolor: lightColors.paperHover }}>
              <Typography variant="body2" color={lightColors.text.secondary}>
                Detected tone: <strong style={{ color: lightColors.text.primary }}>{feedback.toneAnalysis.detectedTone}</strong>
              </Typography>
            </Paper>
            {viewMode === 'advanced' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                  ON-BRAND WORDS:
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {feedback.toneAnalysis.vocabularyAnalysis.onBrand.map((word) => (
                    <Chip key={word} label={word} size="small" sx={{ bgcolor: lightColors.successLight, color: lightColors.success }} />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
