import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  IconButton,
  Stack,
  Collapse,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SaveIcon from '@mui/icons-material/Save';

import {
  ContentTypeSelector,
  LayersPipeline,
  EstimatedCost,
  ConfigurationPanel,
  FeedbackPanel,
  VariationsPanel,
  ContentEditor,
} from './components';

import {
  lightColors,
  CONTENT_TYPES,
  DEFAULT_LAYERS,
  DEFAULT_GUIDELINES,
  calculateCost,
} from './constants';

import type {
  AIGuidedEditorV6Props,
  ContentTypeId,
  Layer,
  EditorConfiguration,
  FeedbackOptions,
  ContentVariation,
  AIFeedback,
} from './types';

// ============= SAMPLE DATA =============

const SAMPLE_FEEDBACK: AIFeedback = {
  overallScore: 82,
  strengths: [
    'Clear value proposition communicated effectively',
    'Engaging opening hook captures attention',
    'Strong call-to-action placement',
  ],
  improvements: [
    'Consider adding more specific metrics or data points',
    'Could include a customer testimonial or social proof',
    'Shorten the middle section for better readability',
  ],
  goalAlignment: {
    overallScore: 78,
    goalBreakdown: [
      { goalName: 'Lead Generation', score: 85, reasoning: 'Strong CTA drives conversions', suggestions: [] },
      { goalName: 'Brand Awareness', score: 72, reasoning: 'Good messaging but limited reach factors', suggestions: [] },
    ],
  },
  toneAnalysis: {
    detectedTone: 'Professional, Confident',
    matchScore: 86,
    brandVoiceAlignment: 80,
    toneBreakdown: [
      { aspect: 'Formality', detected: 'Professional', expected: 'Professional', match: true },
      { aspect: 'Energy', detected: 'Confident', expected: 'Energetic', match: false },
    ],
    vocabularyAnalysis: {
      onBrand: ['innovative', 'transform', 'solutions'],
      offBrand: ['basically', 'stuff'],
      suggested: ['leverage', 'optimize', 'accelerate'],
    },
    readabilityScore: 75,
  },
  themeAlignment: [
    { themeName: 'Innovation', themeType: 'core', weight: 0.9, alignmentScore: 88, description: '', keywords: [], usageInContent: [], suggestions: [] },
    { themeName: 'Trust', themeType: 'secondary', weight: 0.7, alignmentScore: 72, description: '', keywords: [], usageInContent: [], suggestions: [] },
  ],
  audienceReviews: [
    { audienceId: '1', audienceName: 'Tech Professionals', audienceType: 'persona', appealScore: 84, resonanceFactors: [], concerns: [], recommendations: [], sampleReaction: 'This speaks to my challenges with legacy systems.' },
    { audienceId: '2', audienceName: 'C-Suite Executives', audienceType: 'segment', appealScore: 76, resonanceFactors: [], concerns: [], recommendations: [], sampleReaction: 'I need more ROI data before considering.' },
  ],
  painPointAlignment: [
    { painPoint: 'Time-consuming manual processes', description: 'Addresses automation benefits', alignmentScore: 90, contentExcerpts: [], suggestions: [] },
    { painPoint: 'High operational costs', description: 'Could mention cost savings more explicitly', alignmentScore: 65, contentExcerpts: [], suggestions: [] },
  ],
};

const SAMPLE_VARIATIONS: ContentVariation[] = [
  {
    id: 'var-1',
    type: 'post',
    label: 'Original',
    icon: '📝',
    content: `🚀 Transform your business with AI-powered automation!\n\nTired of manual processes eating up your team's valuable time? Our platform helps you:\n\n✅ Automate repetitive tasks\n✅ Reduce operational costs by 40%\n✅ Free your team for strategic work\n\nJoin 500+ companies already seeing results.\n\n👉 Start your free trial today!`,
    layersApplied: ['initial-generation', 'professional-revision'],
    focusArea: 'engagement',
    style: 'balanced',
    score: 82,
    generatedAt: new Date(),
  },
  {
    id: 'var-2',
    type: 'post',
    label: 'Alternative A',
    icon: '📝',
    content: `The average knowledge worker spends 2.5 hours/day on repetitive tasks.\n\nThat's 30% of your workday. Gone.\n\nWe help companies reclaim that time with intelligent automation that:\n\n→ Learns from your workflows\n→ Integrates with existing tools\n→ Scales with your growth\n\nReady to give your team their time back?\n\n🔗 Link in bio for your free assessment.`,
    layersApplied: ['initial-generation', 'data-stacking'],
    focusArea: 'education',
    style: 'data-driven',
    score: 78,
    generatedAt: new Date(),
  },
];

// ============= MAIN COMPONENT =============

export function AIGuidedEditorV6({
  initialContent = '',
  initialPrompt = '',
  initialContentType = 'post',
  initialPipeline,
  initialConfig,
  initialFeedbackOptions,
  onBack,
  onGenerate,
  onSave,
  feedback = SAMPLE_FEEDBACK,
  variations = SAMPLE_VARIATIONS,
  isGenerating = false,
  // isAnalyzing can be used for loading states
}: AIGuidedEditorV6Props) {
  // ============= STATE =============
  
  const [content, setContent] = useState(initialContent);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [contentType, setContentType] = useState<ContentTypeId>(initialContentType);
  const [layers, setLayers] = useState<Layer[]>(initialPipeline || DEFAULT_LAYERS);
  const [selectedVariationId, setSelectedVariationId] = useState<string>(variations[0]?.id || '');
  const [showPromptInput, setShowPromptInput] = useState(!initialContent);
  
  const [config, setConfig] = useState<EditorConfiguration>({
    guidelines: initialConfig?.guidelines || DEFAULT_GUIDELINES,
    emojiUsage: initialConfig?.emojiUsage || 'optimal',
  });
  
  const [feedbackOptions, setFeedbackOptions] = useState<FeedbackOptions>({
    enableThemeAlignment: initialFeedbackOptions?.enableThemeAlignment ?? true,
    enableAudienceReview: initialFeedbackOptions?.enableAudienceReview ?? true,
    enablePainPointAnalysis: initialFeedbackOptions?.enablePainPointAnalysis ?? true,
    enableToneAnalysis: initialFeedbackOptions?.enableToneAnalysis ?? true,
    enableGoalAlignment: initialFeedbackOptions?.enableGoalAlignment ?? true,
    selectedAudiences: initialFeedbackOptions?.selectedAudiences || [],
  });

  // ============= COMPUTED =============
  
  const selectedContentType = useMemo(
    () => CONTENT_TYPES.find((ct) => ct.id === contentType) || CONTENT_TYPES[0],
    [contentType]
  );

  const costBreakdown = useMemo(
    () => calculateCost(layers, contentType, feedbackOptions as unknown as { [key: string]: boolean }),
    [contentType, layers, feedbackOptions]
  );

  // ============= HANDLERS =============
  
  const handleContentTypeChange = (newType: ContentTypeId) => {
    setContentType(newType);
    // Update recommended layers when content type changes
    const newContentType = CONTENT_TYPES.find((ct) => ct.id === newType);
    if (newContentType) {
      setLayers((prev) =>
        prev.map((layer) => ({
          ...layer,
          enabled: newContentType.recommendedLayers.includes(layer.id) || layer.required === true,
        }))
      );
    }
  };

  const handleLayerToggle = (layerId: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === layerId && !layer.required
          ? { ...layer, enabled: !layer.enabled }
          : layer
      )
    );
  };

  const handleLayerReorder = (newLayers: Layer[]) => {
    setLayers(newLayers);
  };

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate({
        content,
        contentType,
        pipeline: layers,
        config,
        feedbackOptions,
      });
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content, {
        contentType,
        wordCount: content.split(/\s+/).length,
        layersApplied: layers.filter((l) => l.enabled).map((l) => l.id),
        estimatedCost: costBreakdown.totalCost,
        selectedPlatforms: [],
      });
    }
  };

  const handleSelectVariation = (id: string) => {
    setSelectedVariationId(id);
    const variation = variations.find((v) => v.id === id);
    if (variation) {
      setContent(variation.content);
    }
  };

  const handleCopyVariation = (id: string) => {
    const variation = variations.find((v) => v.id === id);
    if (variation) {
      navigator.clipboard.writeText(variation.content);
    }
  };

  const handleEditVariation = (id: string) => {
    handleSelectVariation(id);
    setShowPromptInput(false);
  };

  // ============= RENDER =============

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: lightColors.background,
        p: 3,
      }}
    >
      {/* Header */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          bgcolor: lightColors.paper,
          border: `1px solid ${lightColors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {onBack && (
            <IconButton onClick={onBack} size="small">
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box>
            <Typography variant="h5" fontWeight={700} color={lightColors.text.primary}>
              AI Content Editor
            </Typography>
            <Typography variant="body2" color={lightColors.text.secondary}>
              Create, enhance, and optimize your content with AI guidance
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!content.trim()}
            sx={{
              borderColor: lightColors.border,
              color: lightColors.text.primary,
              textTransform: 'none',
            }}
          >
            Save Draft
          </Button>
          <Button
            variant="contained"
            startIcon={<AutoFixHighIcon />}
            onClick={handleGenerate}
            disabled={isGenerating}
            sx={{
              bgcolor: lightColors.primary,
              textTransform: 'none',
              '&:hover': { bgcolor: lightColors.primaryHover },
            }}
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </Stack>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Editor & Configuration */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Stack spacing={3}>
            {/* Content Type Selector */}
            <ContentTypeSelector
              selectedType={contentType}
              onSelectType={handleContentTypeChange}
            />

            {/* Prompt Input (Collapsible) */}
            <Paper sx={{ p: 2, bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}` }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={() => setShowPromptInput(!showPromptInput)}
              >
                <Typography variant="subtitle1" fontWeight={600} color={lightColors.text.primary}>
                  📝 Content Brief / Prompt
                </Typography>
                <IconButton size="small">
                  {showPromptInput ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={showPromptInput}>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    multiline
                    fullWidth
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to create. Be specific about your topic, audience, and goals..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: lightColors.paperHover,
                        '& fieldset': { borderColor: lightColors.border },
                      },
                    }}
                  />
                </Box>
              </Collapse>
            </Paper>

            {/* Content Editor */}
            <ContentEditor
              content={content}
              onContentChange={setContent}
              contentType={selectedContentType}
              onRegenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {/* Layers Pipeline */}
            <LayersPipeline
              layers={layers}
              contentType={contentType}
              onLayerToggle={handleLayerToggle}
              onLayerReorder={handleLayerReorder}
            />

            {/* Configuration Panel */}
            <ConfigurationPanel
              config={config}
              onConfigChange={setConfig}
            />

            {/* Estimated Cost */}
            <EstimatedCost
              contentType={contentType}
              layers={layers}
              feedbackOptions={feedbackOptions}
            />
          </Stack>
        </Grid>

        {/* Right Column - Feedback & Variations */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Stack spacing={3}>
            {/* Feedback Panel */}
            <FeedbackPanel
              feedback={feedback}
              feedbackOptions={feedbackOptions}
              onFeedbackOptionsChange={setFeedbackOptions}
            />

            {/* Variations Panel */}
            <VariationsPanel
              variations={variations}
              selectedVariationId={selectedVariationId}
              onSelectVariation={handleSelectVariation}
              onEditVariation={handleEditVariation}
              onCopyVariation={handleCopyVariation}
              onRegenerateVariation={() => handleGenerate()}
              contentType={contentType}
              isGenerating={isGenerating}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
