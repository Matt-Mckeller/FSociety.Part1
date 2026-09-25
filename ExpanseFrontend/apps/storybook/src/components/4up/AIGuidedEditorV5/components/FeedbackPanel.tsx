import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Divider,
  LinearProgress,
  Collapse,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { lightColors, getScoreColor } from '../constants';
import { ScoreIndicator } from './ScoreIndicator';
import { IntentSelector } from './IntentSelector';
import { PainPointsSection } from './PainPointsSection';
import { ThemeAlignmentSection } from './ThemeAlignmentSection';
import { AudienceReviewSection } from './AudienceReviewSection';
import type { AIFeedback, ContentIntent } from '../types';

// ============= SECTION TYPES =============

type FeedbackSection = 
  | 'overview'
  | 'intent'
  | 'themes'
  | 'audience-reviews'
  | 'pain-points'
  | 'goals'
  | 'audience'
  | 'tone';

const FEEDBACK_SECTIONS: { id: FeedbackSection; label: string; emoji: string }[] = [
  { id: 'overview', label: 'Overview', emoji: '📊' },
  { id: 'intent', label: 'Intent', emoji: '🎯' },
  { id: 'themes', label: 'Themes', emoji: '🎨' },
  { id: 'audience-reviews', label: 'Audience', emoji: '👥' },
  { id: 'pain-points', label: 'Pain Points', emoji: '💡' },
  { id: 'goals', label: 'Goals', emoji: '🏆' },
  { id: 'tone', label: 'Tone', emoji: '🎭' },
];

// ============= FEEDBACK PANEL =============

interface FeedbackPanelProps {
  feedback: AIFeedback;
  isAnalyzing?: boolean;
  selectedIntent: ContentIntent | null;
  onSelectIntent: (intent: ContentIntent) => void;
}

export function FeedbackPanel({
  feedback,
  isAnalyzing = false,
  selectedIntent,
  onSelectIntent,
}: FeedbackPanelProps) {
  const [activeSection, setActiveSection] = useState<FeedbackSection>('overview');
  const [viewMode, setViewMode] = useState<'simple' | 'advanced'>('simple');
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);

  return (
    <Card sx={{ bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <CardContent>
        {/* Header with View Toggle */}
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

        {isAnalyzing && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

        {/* Section Chips */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 3 }}>
          {FEEDBACK_SECTIONS.map((section) => (
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
                fontWeight: 500,
                '&:hover': {
                  bgcolor: activeSection === section.id ? lightColors.primaryHover : lightColors.paperHover,
                },
              }}
            />
          ))}
        </Box>

        <Divider sx={{ mb: 2, borderColor: lightColors.border }} />

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <Box>
            {/* Overall Score */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <ScoreIndicator score={feedback.overallScore} label="Overall Score" size="large" />
            </Box>

            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
              <ScoreIndicator score={feedback.goalAlignment.overallScore} label="Goals" size="small" />
              <ScoreIndicator score={feedback.audienceMatch.overallScore} label="Audience" size="small" />
              <ScoreIndicator score={feedback.toneAnalysis.matchScore} label="Tone" size="small" />
            </Box>

            {/* Strengths & Improvements */}
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
          </Box>
        )}

        {/* Intent Section */}
        {activeSection === 'intent' && (
          <IntentSelector
            selectedIntent={selectedIntent}
            onSelectIntent={onSelectIntent}
          />
        )}

        {/* Themes Section */}
        {activeSection === 'themes' && feedback.themeAlignment && (
          <ThemeAlignmentSection
            themes={feedback.themeAlignment}
            viewMode={viewMode}
          />
        )}

        {/* Audience Reviews Section */}
        {activeSection === 'audience-reviews' && feedback.audienceReviews && (
          <AudienceReviewSection
            reviews={feedback.audienceReviews}
            viewMode={viewMode}
          />
        )}

        {/* Pain Points Section */}
        {activeSection === 'pain-points' && (
          <PainPointsSection
            painPoints={feedback.painPointAlignment}
            viewMode={viewMode}
          />
        )}

        {/* Goals Section */}
        {activeSection === 'goals' && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
              🏆 Goal Alignment
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <ScoreIndicator score={feedback.goalAlignment.overallScore} label="Overall" size="medium" />
            </Box>

            {viewMode === 'advanced' && (
              <Stack spacing={1.5}>
                {feedback.goalAlignment.goalBreakdown.map((goal) => {
                  const isExpanded = expandedGoal === goal.goalName;
                  return (
                    <Paper 
                      key={goal.goalName}
                      sx={{ 
                        overflow: 'hidden',
                        border: `1px solid ${getScoreColor(goal.score)}44`,
                        bgcolor: lightColors.paper,
                      }}
                    >
                      <Box 
                        sx={{ 
                          p: 2, 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1.5,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: lightColors.paperHover },
                        }}
                        onClick={() => setExpandedGoal(isExpanded ? null : goal.goalName)}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600} color={lightColors.text.primary}>
                            {goal.goalName}
                          </Typography>
                          <Typography variant="body2" color={lightColors.text.secondary}>
                            {goal.reasoning}
                          </Typography>
                        </Box>
                        <ScoreIndicator score={goal.score} size="small" showLabel={false} />
                        <IconButton size="small">
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Box>

                      <Collapse in={isExpanded}>
                        <Divider sx={{ borderColor: lightColors.border }} />
                        <Box sx={{ p: 2, bgcolor: lightColors.paperHover }}>
                          <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                            SUGGESTIONS:
                          </Typography>
                          <Stack spacing={0.75}>
                            {goal.suggestions.map((suggestion, i) => (
                              <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <WarningIcon sx={{ color: lightColors.warning, fontSize: 14, mt: 0.25 }} />
                                <Typography variant="body2" color={lightColors.text.primary}>{suggestion}</Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      </Collapse>
                    </Paper>
                  );
                })}
              </Stack>
            )}
          </Box>
        )}

        {/* Tone Section */}
        {activeSection === 'tone' && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
              🎭 Tone Analysis
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
              <ScoreIndicator score={feedback.toneAnalysis.matchScore} label="Match" size="medium" />
              <ScoreIndicator score={feedback.toneAnalysis.brandVoiceAlignment} label="Brand Voice" size="medium" />
            </Box>

            <Paper sx={{ p: 2, mb: 2, bgcolor: lightColors.paperHover, border: `1px solid ${lightColors.border}` }}>
              <Typography variant="body2" color={lightColors.text.secondary}>
                Detected tone: <strong style={{ color: lightColors.text.primary }}>{feedback.toneAnalysis.detectedTone}</strong>
              </Typography>
            </Paper>

            {viewMode === 'advanced' && (
              <>
                {/* Vocabulary Analysis */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                    ON-BRAND WORDS:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {feedback.toneAnalysis.vocabularyAnalysis.onBrand.map((word) => (
                      <Chip 
                        key={word} 
                        label={word} 
                        size="small" 
                        sx={{ bgcolor: `${lightColors.success}22`, color: lightColors.success }}
                      />
                    ))}
                  </Box>
                </Box>

                {feedback.toneAnalysis.vocabularyAnalysis.offBrand.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                      OFF-BRAND WORDS:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {feedback.toneAnalysis.vocabularyAnalysis.offBrand.map((word) => (
                        <Chip 
                          key={word} 
                          label={word} 
                          size="small" 
                          sx={{ bgcolor: `${lightColors.warning}22`, color: lightColors.warning }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Readability */}
                <Paper sx={{ p: 2, bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={lightColors.text.secondary}>
                      Readability Score
                    </Typography>
                    <Chip 
                      label={`${feedback.toneAnalysis.readabilityScore}/100`}
                      size="small"
                      sx={{ 
                        bgcolor: `${getScoreColor(feedback.toneAnalysis.readabilityScore)}22`,
                        color: getScoreColor(feedback.toneAnalysis.readabilityScore),
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Paper>
              </>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
