import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
  LinearProgress,
  Divider,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Collapse,
  Avatar,
  Tooltip,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { CONTENT_INTENTS, lightColors } from '../constants';
import type { AIFeedback, ContentIntent } from '../types';
import { ScoreIndicator } from './ScoreIndicator';
import { IntentSelector } from './IntentSelector';
import { PainPointsSection } from './PainPointsSection';

interface FeedbackPanelProps {
  feedback: AIFeedback;
  isAnalyzing: boolean;
  selectedIntent: ContentIntent | null;
  onSelectIntent: (intent: ContentIntent) => void;
}

type SectionId = 'overview' | 'goals' | 'audience' | 'tone' | 'pain-points' | 'tips';

export function FeedbackPanel({
  feedback,
  isAnalyzing,
  selectedIntent,
  onSelectIntent,
}: FeedbackPanelProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [viewMode, setViewMode] = useState<'simple' | 'advanced'>('simple');
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  const selectedIntentData = feedback.intentScores.find((s) => s.intent === selectedIntent);

  const sections: { id: SectionId; icon: React.ReactNode; label: string }[] = [
    { id: 'overview', icon: <AutoAwesomeIcon fontSize="small" />, label: 'Overview' },
    { id: 'goals', icon: <TrendingUpIcon fontSize="small" />, label: 'Goals' },
    { id: 'audience', icon: <GroupIcon fontSize="small" />, label: 'Audience' },
    { id: 'tone', icon: <VolumeUpIcon fontSize="small" />, label: 'Tone' },
    { id: 'pain-points', icon: <LightbulbIcon fontSize="small" />, label: 'Pain Points' },
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAnalyzing && (
              <Chip label="Analyzing..." size="small" color="primary" variant="outlined" />
            )}
            {/* Simple/Advanced Toggle */}
            <ToggleButtonGroup
              size="small"
              value={viewMode}
              exclusive
              onChange={(_, v) => v && setViewMode(v)}
              sx={{
                '& .MuiToggleButton-root': {
                  px: 1.5,
                  py: 0.5,
                  fontSize: '0.75rem',
                  textTransform: 'none',
                },
              }}
            >
              <ToggleButton value="simple">
                <Tooltip title="Simple view">
                  <ViewModuleIcon sx={{ fontSize: 16 }} />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="advanced">
                <Tooltip title="Advanced view">
                  <ViewListIcon sx={{ fontSize: 16 }} />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
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
      
      <CardContent sx={{ pt: 2, flexGrow: 1, overflow: 'auto', maxHeight: 500 }}>
        {/* Section Tabs */}
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

        {/* ===== OVERVIEW SECTION ===== */}
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
                  {selectedIntentData.tips.slice(0, viewMode === 'simple' ? 2 : 4).map((tip, i) => (
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
              {feedback.strengths.slice(0, viewMode === 'simple' ? 3 : 6).map((s, i) => (
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
              {feedback.improvements.slice(0, viewMode === 'simple' ? 2 : 5).map((s, i) => (
                <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.warning}11`, border: `1px solid ${lightColors.warning}33` }}>
                  <Typography variant="body2" color={lightColors.text.primary}>{s}</Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* ===== GOALS SECTION ===== */}
        {activeSection === 'goals' && (
          <Box>
            {viewMode === 'simple' ? (
              <>
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
              </>
            ) : (
              /* Advanced Goals View */
              <>
                <Paper sx={{ p: 2, mb: 2, bgcolor: lightColors.paperHover, border: `1px solid ${lightColors.border}` }}>
                  <Typography variant="caption" color={lightColors.text.secondary}>
                    Goal alignment measures how well your content supports your business objectives.
                  </Typography>
                </Paper>

                <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
                  Goal Breakdown
                </Typography>
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  {feedback.goalAlignment.goalBreakdown.map((goal) => (
                    <Paper 
                      key={goal.goal}
                      sx={{ 
                        overflow: 'hidden',
                        border: `1px solid ${lightColors.border}`,
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
                        onClick={() => setExpandedGoal(expandedGoal === goal.goal ? null : goal.goal)}
                      >
                        <ScoreIndicator score={goal.alignmentPercent} size="small" showLabel={false} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" color={lightColors.text.primary}>{goal.goal}</Typography>
                        </Box>
                        <ExpandMoreIcon 
                          sx={{ 
                            transform: expandedGoal === goal.goal ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s',
                          }} 
                        />
                      </Box>
                      <Collapse in={expandedGoal === goal.goal}>
                        <Divider />
                        <Box sx={{ p: 2, bgcolor: lightColors.paperHover }}>
                          <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 1 }}>
                            KEY PHRASES SUPPORTING THIS GOAL:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                            {goal.keyPhrases.map((phrase) => (
                              <Chip key={phrase} label={phrase} size="small" sx={{ bgcolor: `${lightColors.success}22` }} />
                            ))}
                          </Box>
                          <Typography variant="caption" fontWeight={600} color={lightColors.text.secondary} sx={{ display: 'block', mb: 0.5 }}>
                            RECOMMENDATION:
                          </Typography>
                          <Typography variant="body2" color={lightColors.text.primary}>{goal.recommendation}</Typography>
                        </Box>
                      </Collapse>
                    </Paper>
                  ))}
                </Stack>

                {feedback.goalAlignment.missingGoals.length > 0 && (
                  <>
                    <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
                      Missing Goals
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                      {feedback.goalAlignment.missingGoals.map((goal) => (
                        <Chip
                          key={goal}
                          label={goal}
                          size="small"
                          sx={{
                            bgcolor: `${lightColors.error}11`,
                            color: lightColors.error,
                            border: `1px solid ${lightColors.error}44`,
                          }}
                        />
                      ))}
                    </Box>
                  </>
                )}

                <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
                  Priority Actions
                </Typography>
                <Stack spacing={1}>
                  {feedback.goalAlignment.priorityActions.map((action, i) => (
                    <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.primary}11`, border: `1px solid ${lightColors.primary}33` }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 20, height: 20, fontSize: 12, bgcolor: lightColors.primary }}>{i + 1}</Avatar>
                        <Typography variant="body2" color={lightColors.text.primary}>{action}</Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </>
            )}
          </Box>
        )}

        {/* ===== AUDIENCE SECTION ===== */}
        {activeSection === 'audience' && (
          <Box>
            {viewMode === 'simple' ? (
              <>
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
              </>
            ) : (
              /* Advanced Audience View */
              <>
                <Paper sx={{ p: 2, mb: 2, bgcolor: lightColors.paperHover, border: `1px solid ${lightColors.border}` }}>
                  <Typography variant="caption" color={lightColors.text.secondary}>
                    Audience matching analyzes how well your content resonates with target personas.
                  </Typography>
                </Paper>

                <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
                  Persona Breakdown
                </Typography>
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  {feedback.audienceMatch.personaDetails.map((persona) => (
                    <Paper 
                      key={persona.name}
                      sx={{ 
                        overflow: 'hidden',
                        border: `1px solid ${lightColors.border}`,
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
                        onClick={() => setExpandedPersona(expandedPersona === persona.name ? null : persona.name)}
                      >
                        <Avatar sx={{ bgcolor: lightColors.primary }}>{persona.name[0]}</Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" color={lightColors.text.primary}>{persona.name}</Typography>
                          <Typography variant="caption" color={lightColors.text.secondary}>{persona.demographicFit}</Typography>
                        </Box>
                        <ScoreIndicator score={persona.matchScore} size="small" showLabel={false} />
                        <ExpandMoreIcon 
                          sx={{ 
                            transform: expandedPersona === persona.name ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s',
                          }} 
                        />
                      </Box>
                      <Collapse in={expandedPersona === persona.name}>
                        <Divider />
                        <Box sx={{ p: 2, bgcolor: lightColors.paperHover }}>
                          <Typography variant="caption" fontWeight={600} color={lightColors.success} sx={{ display: 'block', mb: 1 }}>
                            ✓ RESONATING ELEMENTS:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                            {persona.resonatingElements.map((el) => (
                              <Chip key={el} label={el} size="small" sx={{ bgcolor: `${lightColors.success}22` }} />
                            ))}
                          </Box>
                          <Typography variant="caption" fontWeight={600} color={lightColors.warning} sx={{ display: 'block', mb: 1 }}>
                            ⚠ MISSING ELEMENTS:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {persona.missingElements.map((el) => (
                              <Chip key={el} label={el} size="small" sx={{ bgcolor: `${lightColors.warning}22` }} />
                            ))}
                          </Box>
                        </Box>
                      </Collapse>
                    </Paper>
                  ))}
                </Stack>

                {feedback.audienceMatch.audienceGaps.length > 0 && (
                  <>
                    <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
                      Audience Gaps
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      {feedback.audienceMatch.audienceGaps.map((gap, i) => (
                        <Typography key={i} variant="body2" color={lightColors.text.secondary}>
                          ⚠ {gap}
                        </Typography>
                      ))}
                    </Stack>
                  </>
                )}

                <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
                  Tone Recommendations
                </Typography>
                <Stack spacing={1}>
                  {feedback.audienceMatch.toneRecommendations.map((rec, i) => (
                    <Paper key={i} sx={{ p: 1.5, bgcolor: `${lightColors.info}11`, border: `1px solid ${lightColors.info}33` }}>
                      <Typography variant="body2" color={lightColors.text.primary}>{rec}</Typography>
                    </Paper>
                  ))}
                </Stack>
              </>
            )}
          </Box>
        )}

        {/* ===== TONE SECTION ===== */}
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

            {viewMode === 'advanced' && (
              <>
                {/* Tone Breakdown */}
                <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
                  Tone Breakdown
                </Typography>
                <Stack spacing={1} sx={{ mb: 3 }}>
                  {feedback.toneAnalysis.toneBreakdown.map((item) => (
                    <Box 
                      key={item.aspect}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        p: 1.5,
                        bgcolor: item.match ? `${lightColors.success}11` : `${lightColors.warning}11`,
                        borderRadius: 1,
                        border: `1px solid ${item.match ? lightColors.success : lightColors.warning}33`,
                      }}
                    >
                      {item.match ? (
                        <CheckCircleIcon sx={{ color: lightColors.success, fontSize: 20 }} />
                      ) : (
                        <WarningIcon sx={{ color: lightColors.warning, fontSize: 20 }} />
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600} color={lightColors.text.primary}>
                          {item.aspect}
                        </Typography>
                        <Typography variant="caption" color={lightColors.text.secondary}>
                          Detected: {item.detected} | Expected: {item.expected}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>

                {/* Vocabulary Analysis */}
                <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
                  Vocabulary Analysis
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color={lightColors.success} fontWeight={600}>On-Brand Words:</Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                    {feedback.toneAnalysis.vocabularyAnalysis.onBrand.map((word) => (
                      <Chip key={word} label={word} size="small" sx={{ bgcolor: `${lightColors.success}22` }} />
                    ))}
                  </Box>
                  <Typography variant="caption" color={lightColors.warning} fontWeight={600}>Off-Brand Words:</Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                    {feedback.toneAnalysis.vocabularyAnalysis.offBrand.map((word) => (
                      <Chip key={word} label={word} size="small" sx={{ bgcolor: `${lightColors.warning}22` }} />
                    ))}
                  </Box>
                  <Typography variant="caption" color={lightColors.info} fontWeight={600}>Suggested Words:</Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {feedback.toneAnalysis.vocabularyAnalysis.suggested.map((word) => (
                      <Chip key={word} label={word} size="small" sx={{ bgcolor: `${lightColors.info}22` }} />
                    ))}
                  </Box>
                </Box>

                {/* Readability & Sentiment */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Paper sx={{ flex: 1, p: 2, textAlign: 'center', border: `1px solid ${lightColors.border}` }}>
                    <Typography variant="h4" fontWeight={700} color={lightColors.primary}>
                      {feedback.toneAnalysis.readabilityScore}
                    </Typography>
                    <Typography variant="caption" color={lightColors.text.secondary}>Readability Score</Typography>
                  </Paper>
                  <Paper sx={{ flex: 1, p: 2, textAlign: 'center', border: `1px solid ${lightColors.border}` }}>
                    <Typography variant="h6" fontWeight={600} color={lightColors.text.primary} sx={{ textTransform: 'capitalize' }}>
                      {feedback.toneAnalysis.sentimentAnalysis.overall}
                    </Typography>
                    <Typography variant="caption" color={lightColors.text.secondary}>Overall Sentiment</Typography>
                  </Paper>
                </Box>

                {/* Sentiment Breakdown */}
                <Typography variant="subtitle2" gutterBottom color={lightColors.text.primary} fontWeight={600}>
                  Sentiment Breakdown
                </Typography>
                <Stack spacing={0.5}>
                  {feedback.toneAnalysis.sentimentAnalysis.breakdown.map((item) => (
                    <Box key={item.emotion} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ width: 80, color: lightColors.text.primary }}>{item.emotion}</Typography>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.percentage}
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            bgcolor: lightColors.border,
                          }}
                        />
                      </Box>
                      <Typography variant="caption" color={lightColors.text.secondary} sx={{ width: 35 }}>
                        {item.percentage}%
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </>
            )}
          </Box>
        )}

        {/* ===== PAIN POINTS SECTION ===== */}
        {activeSection === 'pain-points' && (
          <PainPointsSection 
            painPoints={feedback.painPointAlignment} 
            viewMode={viewMode} 
          />
        )}

        {/* ===== TIPS SECTION ===== */}
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
