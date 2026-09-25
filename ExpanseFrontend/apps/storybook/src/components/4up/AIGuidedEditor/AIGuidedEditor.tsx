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
  alpha,
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { type Platform } from '../../../mocks/4up/mockData';

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
  platformRecommendations: PlatformRecommendation[];
  contentVariations: ContentVariation[];
  overallScore: number;
  improvements: string[];
  strengths: string[];
}

export interface AIGuidedEditorProps {
  onBack?: () => void;
  onSubmit?: (content: string, selectedPlatforms: Platform[], variations: ContentVariation[]) => void;
  initialPrompt?: string;
  initialContent?: string;
  feedback?: AIFeedback;
  showFeedback?: boolean;
  isAnalyzing?: boolean;
  startAtStep?: 'prompt' | 'content';
}

function ScoreIndicator({ score, size = 'medium' }: { score: number; size?: 'small' | 'medium' | 'large' }) {
  const getColor = (s: number) => {
    if (s >= 80) return '#66bb6a';
    if (s >= 60) return '#ffa726';
    return '#f44336';
  };

  const sizeMap = {
    small: 40,
    medium: 56,
    large: 72,
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        width: sizeMap[size],
        height: sizeMap[size],
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
          <Typography variant={size === 'small' ? 'caption' : size === 'medium' ? 'body1' : 'h6'} fontWeight={600}>
            {score}
          </Typography>
        </Box>
      </Box>
    </Box>
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
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TrendingUpIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6">Platform Recommendations</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          AI-ranked platforms based on your content. Adjust weights to prioritize.
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
                    border: '2px solid',
                    borderColor: isSelected ? 'primary.main' : 'transparent',
                    bgcolor: isSelected ? alpha('#90caf9', 0.08) : 'background.paper',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: isSelected ? 'primary.main' : alpha('#90caf9', 0.3),
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
                      }}
                    >
                      {rec.platform.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {rec.platform.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ScoreIndicator score={rec.score} size="small" />
                          {isSelected && <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 20 }} />}
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {rec.reasoning}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
                        {rec.bestContentTypes.map((type) => (
                          <Chip key={type} label={type} size="small" variant="outlined" />
                        ))}
                      </Box>
                      {isSelected && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
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
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AutoAwesomeIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6">Content Variations</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
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
                  border: '2px solid',
                  borderColor: isSelected ? 'primary.main' : 'transparent',
                  bgcolor: isSelected ? alpha('#90caf9', 0.08) : 'background.paper',
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: alpha('#fff', 0.03) },
                  }}
                  onClick={() => setExpandedContent(isExpanded ? null : variation.id)}
                >
                  <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>{variation.icon}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{variation.label}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      {variation.wordCount && (
                        <Typography variant="caption" color="text.secondary">
                          {variation.wordCount} words
                        </Typography>
                      )}
                      {variation.estimatedDuration && (
                        <>
                          <Typography variant="caption" color="text.secondary">
                            •
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {variation.estimatedDuration}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                  <IconButton size="small">{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
                </Box>

                <Collapse in={isExpanded}>
                  <Divider />
                  <Box sx={{ p: 2, bgcolor: alpha('#000', 0.2) }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      {variation.platforms?.map((p) => (
                        <Chip key={p} label={p} size="small" />
                      ))}
                    </Box>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        maxHeight: 300,
                        overflow: 'auto',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.6,
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

function FeedbackSummary({ feedback }: { feedback: AIFeedback }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LightbulbIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6">AI Analysis</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <ScoreIndicator score={feedback.overallScore} size="large" />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Overall
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <ScoreIndicator score={feedback.goalAlignment.score} size="medium" />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Goals
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <ScoreIndicator score={feedback.audienceMatch.score} size="medium" />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Audience
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <ScoreIndicator score={feedback.toneAnalysis.matchScore} size="medium" />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Tone
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18 }} />
          Strengths
        </Typography>
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          {feedback.strengths.map((s, i) => (
            <Typography key={i} variant="body2" color="text.secondary">
              • {s}
            </Typography>
          ))}
        </Stack>

        <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon sx={{ color: 'warning.main', fontSize: 18 }} />
          Improvements
        </Typography>
        <Stack spacing={0.5}>
          {feedback.improvements.map((s, i) => (
            <Typography key={i} variant="body2" color="text.secondary">
              • {s}
            </Typography>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupIcon sx={{ color: 'info.main', fontSize: 18 }} />
          Top Audience Match
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {feedback.audienceMatch.topPersonas.map((p) => (
            <Chip key={p} label={p} size="small" variant="outlined" />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export function AIGuidedEditor({
  onBack,
  onSubmit,
  initialPrompt = '',
  initialContent = '',
  feedback,
  showFeedback = true,
  isAnalyzing = false,
  startAtStep = 'prompt',
}: AIGuidedEditorProps) {
  const [currentStep, setCurrentStep] = useState<'prompt' | 'content'>(startAtStep);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [content, setContent] = useState(initialContent);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [platformWeights, setPlatformWeights] = useState<Record<string, number>>({});
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState(0);

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
      onSubmit(content, selectedPlatforms, feedback?.contentVariations || []);
    }
  };

  // Prompt Step
  if (currentStep === 'prompt') {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            {onBack && (
              <IconButton onClick={onBack} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
            )}
            <Box>
              <Typography variant="h5" fontWeight={600}>
                AI Content Generator
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start with your idea, let AI craft the content
              </Typography>
            </Box>
          </Box>

          {/* Prompt Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <LightbulbIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6">What would you like to create?</Typography>
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
                  },
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
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
          <Card sx={{ bgcolor: alpha('#90caf9', 0.05) }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Tips for better results:
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Be specific</strong> about your key message and unique value proposition
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Mention your audience</strong> - who should this content resonate with?
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {onBack && (
            <IconButton onClick={onBack} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Edit & Optimize Content
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Refine your content and select platforms
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<SendIcon />} onClick={handleSubmit} disabled={!content.trim() || selectedPlatforms.length === 0}>
          Schedule / Publish
        </Button>
      </Box>

      {isAnalyzing && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

      <Grid container spacing={3}>
        {/* Left: Content Editor */}
        <Grid size={{ xs: 12, lg: showFeedback ? 6 : 12 }}>
          {/* Prompt Display */}
          {prompt && (
            <Paper sx={{ p: 2, mb: 2, bgcolor: alpha('#90caf9', 0.05) }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Your prompt:
              </Typography>
              <Typography variant="body2">{prompt}</Typography>
              <Button size="small" sx={{ mt: 1 }} onClick={() => setCurrentStep('prompt')}>
                Edit Prompt
              </Button>
            </Paper>
          )}

          {/* Main Editor */}
          <Card>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Generated Content
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={16}
                placeholder="Your generated content will appear here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {content.split(/\s+/).filter(Boolean).length} words • {content.length} characters
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
            <Tabs value={rightPanelTab} onChange={(_, v) => setRightPanelTab(v)} sx={{ mb: 2 }}>
              <Tab label="Platforms" />
              <Tab label="Variations" />
              <Tab label="Analysis" />
            </Tabs>

            {rightPanelTab === 0 && (
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

            {rightPanelTab === 1 && (
              <ContentVariationsPanel variations={feedback.contentVariations} selectedVariation={selectedVariation} onSelectVariation={setSelectedVariation} />
            )}

            {rightPanelTab === 2 && <FeedbackSummary feedback={feedback} />}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
