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
  Tabs,
  Tab,
  Paper,
  LinearProgress,
  Slider,
  Avatar,
  Divider,
  Stack,
  Collapse,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { lightColors, DEFAULT_GUIDELINES, DEFAULT_AUDIENCES } from './constants';
import { FeedbackPanel, ScoreIndicator, PromptConfigPanel } from './components';
import type { 
  AIGuidedEditorV5Props,
  ContentIntent,
  ContentVariation,
  PlatformRecommendation,
  PromptConfig,
} from './types';
import { type Platform } from '../../../mocks/4up/mockData';

// ============= DEFAULT CONFIG =============

const DEFAULT_CONFIG: PromptConfig = {
  guidelines: DEFAULT_GUIDELINES,
  variationStyles: ['ai-default'],
  emojiUsage: 'optimal',
  audienceSelections: DEFAULT_AUDIENCES,
  useGenericAudience: true,
  enableAudienceReviews: true,
  enableDataStacking: false,
};

// ============= PLATFORM PANEL =============

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

// ============= VARIATIONS PANEL =============

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

export function AIGuidedEditorV5({
  onBack,
  onSubmit,
  initialPrompt = '',
  initialContent = '',
  initialIntent,
  initialConfig,
  feedback,
  showFeedback = true,
  isAnalyzing = false,
}: AIGuidedEditorV5Props) {
  const [prompt] = useState(initialPrompt);
  const [content, setContent] = useState(initialContent);
  const [selectedIntent, setSelectedIntent] = useState<ContentIntent | null>(initialIntent || null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [platformWeights, setPlatformWeights] = useState<Record<string, number>>({});
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState(0);
  
  // Prompt configuration state
  const [promptConfig, setPromptConfig] = useState<PromptConfig>(() => ({
    ...DEFAULT_CONFIG,
    ...initialConfig,
  }));

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

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(content, selectedPlatforms, feedback?.contentVariations || [], selectedIntent, promptConfig);
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

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
              AI Content Editor
            </Typography>
            <Typography variant="body2" color={lightColors.text.secondary}>
              Configure, generate, and optimize your content
            </Typography>
          </Box>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<SendIcon />} 
          onClick={handleSubmit} 
          disabled={!content.trim()}
        >
          Generate / Analyze
        </Button>
      </Box>

      {isAnalyzing && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

      {/* Prompt Configuration Panel - Layout A: Collapsible Card at Top */}
      <PromptConfigPanel
        config={promptConfig}
        onConfigChange={setPromptConfig}
      />

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
            </Paper>
          )}

          {/* Main Editor */}
          <Card sx={{ bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 2, color: lightColors.text.primary, fontWeight: 600 }}>
                Content
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={14}
                placeholder="Enter your content or prompt here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    bgcolor: lightColors.paper,
                    color: lightColors.text.primary,
                  },
                  '& .MuiInputBase-input': {
                    color: lightColors.text.primary,
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: lightColors.text.secondary,
                    opacity: 1,
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
