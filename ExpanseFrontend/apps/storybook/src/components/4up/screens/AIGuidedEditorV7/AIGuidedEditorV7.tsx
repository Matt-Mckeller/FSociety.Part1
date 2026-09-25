import { useMemo, useState, type ReactElement, type ReactNode } from 'react';
import {
  Box,
  Button,
  Chip,
  Collapse,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';

import {
  LayersPipeline,
  EstimatedCost,
  ConfigurationPanel,
  FeedbackPanel,
  VariationsPanel,
  ContentEditor,
} from '../AIGuidedEditorV6/components';
import {
  CONTENT_TYPES,
  DEFAULT_LAYERS,
  DEFAULT_GUIDELINES,
  calculateCost,
} from '../AIGuidedEditorV6/constants';
import type {
  ContentTypeId,
  Layer,
  EditorConfiguration,
  FeedbackOptions,
  ContentVariation,
  AIFeedback,
} from '../AIGuidedEditorV6/types';

import {
  ScoreOverviewScreen,
  SectionExplorerScreen,
  ActionFirstScreen,
  SAMPLE_FEEDBACK as FS_SAMPLE,
} from '../FeedbackScreens';

import { eyeColors, eyeRadii } from './theme';
import { v7FlatSx, v7FlatTheme } from './flatTheme';
import { ProfileChip } from './components/ProfileChip';
import { ContentTypeChips } from './components/ContentTypeChips';
import { EmojiCleanRoot } from './components/EmojiCleanRoot';
import { sanitizeContentType, sanitizeLayers, sanitizeVariations } from './sanitize';
import {
  IconActions,
  IconBack,
  IconChevronDown,
  IconChevronUp,
  IconExplore,
  IconGenerate,
  IconPanel,
  IconSave,
  IconScore,
  MonoLabel,
} from './icons';
import type { AIGuidedEditorV7Props, FeedbackMode, V7ShellId } from './types';

// ============= SAMPLE DATA (same shape as V6) =============

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
      { goalName: 'Lead Generation', score: 85, reasoning: 'Strong CTA drives conversions', suggestions: ['Add a low-friction secondary CTA'] },
      { goalName: 'Brand Awareness', score: 72, reasoning: 'Good messaging but limited reach factors', suggestions: ['Lead with a shareable insight'] },
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
    { themeName: 'Innovation', themeType: 'core', weight: 0.9, alignmentScore: 88, description: 'Focus on new solutions', keywords: ['AI'], usageInContent: ['AI-powered'], suggestions: [] },
    { themeName: 'Trust', themeType: 'secondary', weight: 0.7, alignmentScore: 72, description: 'Credibility', keywords: ['proven'], usageInContent: ['500+'], suggestions: [] },
  ],
  audienceReviews: [
    { audienceId: '1', audienceName: 'Tech Professionals', audienceType: 'persona', appealScore: 84, resonanceFactors: ['Technical benefits clear'], concerns: ['Needs specifics'], recommendations: ['Name two integrations'], sampleReaction: 'This speaks to my challenges with legacy systems.' },
    { audienceId: '2', audienceName: 'C-Suite Executives', audienceType: 'segment', appealScore: 76, resonanceFactors: ['ROI mentioned'], concerns: ['Need numbers'], recommendations: ['Lead with hours-saved'], sampleReaction: 'I need more ROI data before considering.' },
  ],
  painPointAlignment: [
    { painPoint: 'Time-consuming manual processes', description: 'Addresses automation benefits', alignmentScore: 90, contentExcerpts: ['Automate repetitive tasks'], suggestions: [] },
    { painPoint: 'High operational costs', description: 'Could mention cost savings more explicitly', alignmentScore: 65, contentExcerpts: ['Reduce costs by 40%'], suggestions: ['Add specific dollar amounts'] },
  ],
};

const SAMPLE_VARIATIONS: ContentVariation[] = sanitizeVariations([
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
    content: `The average knowledge worker spends 2.5 hours/day on repetitive tasks.\n\nThat's 30% of your workday. Gone.\n\nWe help companies reclaim that time with intelligent automation.\n\nReady to give your team their time back?`,
    layersApplied: ['initial-generation', 'data-stacking'],
    focusArea: 'education',
    style: 'data-driven',
    score: 78,
    generatedAt: new Date(),
  },
]);

const DEFAULT_FEEDBACK_OPTIONS: FeedbackOptions = {
  enableThemeAlignment: true,
  enableAudienceReview: true,
  enablePainPointAnalysis: true,
  enableToneAnalysis: true,
  enableGoalAlignment: true,
  selectedAudiences: [],
};

const DEFAULT_PROFILE = {
  name: 'Matthew McKeller',
  subtitle: 'expanse_eye · 4up',
  initials: 'MM',
  accent: eyeColors.accent,
};

const FEEDBACK_MODES: { id: FeedbackMode; label: string; icon: ReactNode }[] = [
  { id: 'panel', label: 'Panel', icon: <IconPanel size={15} /> },
  { id: 'score', label: 'Score', icon: <IconScore size={15} /> },
  { id: 'explorer', label: 'Explorer', icon: <IconExplore size={15} /> },
  { id: 'actions', label: 'Actions', icon: <IconActions size={15} /> },
];

/**
 * AIGuidedEditor V7 — polished 4eye chrome around the full V6 component set.
 * Content type chips, layers, config, cost, editor, FeedbackPanel (section chips +
 * options + details), and variations all remain. FeedbackScreens A/B/C are
 * available as alternate feedback modes without removing the panel.
 */
export function AIGuidedEditorV7({
  shell = 'calm-workbench',
  initialFeedbackMode = 'panel',
  profile = DEFAULT_PROFILE,
  onProfileClick,
  moodLabel = 'Focused',
  energyLabel = 'Steady',
  initialContent = SAMPLE_VARIATIONS[0].content,
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
  isAnalyzing = false,
}: AIGuidedEditorV7Props) {
  const [contentType, setContentType] = useState<ContentTypeId>(initialContentType);
  const [content, setContent] = useState(initialContent);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [showPromptInput, setShowPromptInput] = useState(Boolean(initialPrompt));
  const [showSetup, setShowSetup] = useState(shell !== 'focused-write');
  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode>(initialFeedbackMode);
  const [feedbackDrawerOpen, setFeedbackDrawerOpen] = useState(false);
  const [layers, setLayers] = useState<Layer[]>(
    sanitizeLayers(initialPipeline ?? DEFAULT_LAYERS.map((l) => ({ ...l }))),
  );
  const [config, setConfig] = useState<EditorConfiguration>({
    guidelines: DEFAULT_GUIDELINES,
    emojiUsage: 'optimal',
    ...initialConfig,
  });
  const [feedbackOptions, setFeedbackOptions] = useState<FeedbackOptions>({
    ...DEFAULT_FEEDBACK_OPTIONS,
    ...initialFeedbackOptions,
  });
  const [selectedVariationId, setSelectedVariationId] = useState(variations[0]?.id);

  const selectedContentType = sanitizeContentType(
    CONTENT_TYPES.find((t) => t.id === contentType) ?? CONTENT_TYPES[0],
  );
  const costBreakdown = useMemo(
    () => calculateCost(layers, contentType, feedbackOptions as unknown as { [key: string]: boolean }),
    [layers, contentType, feedbackOptions],
  );

  const accent = profile.accent ?? eyeColors.accent;
  const cleanVariations = useMemo(() => sanitizeVariations(variations), [variations]);

  const handleContentTypeChange = (type: ContentTypeId) => {
    setContentType(type);
    const ct = CONTENT_TYPES.find((t) => t.id === type);
    if (ct) {
      setLayers((prev) =>
        sanitizeLayers(
          prev.map((l) => ({ ...l, enabled: ct.recommendedLayers.includes(l.id) })),
        ),
      );
    }
  };

  const handleGenerate = () => {
    onGenerate?.({
      content,
      contentType,
      pipeline: layers,
      config,
      feedbackOptions,
    });
  };

  const handleSave = () => {
    onSave?.(content, {
      contentType,
      wordCount: content.split(/\s+/).filter(Boolean).length,
      layersApplied: layers.filter((l) => l.enabled).map((l) => l.id),
      estimatedCost: costBreakdown.totalCost,
      selectedPlatforms: [],
    });
  };

  const handleSelectVariation = (id: string) => {
    setSelectedVariationId(id);
    const variation = cleanVariations.find((v) => v.id === id);
    if (variation) setContent(variation.content);
  };

  const setupBlock = (
    <Stack spacing={1.75}>
      <ContentTypeChips
        selectedType={contentType}
        onSelectType={handleContentTypeChange}
        accent={accent}
      />

      <Paper
        elevation={0}
        sx={{
          p: 1.75,
          bgcolor: eyeColors.paper,
          border: `1px solid ${eyeColors.border}`,
          borderRadius: eyeRadii.md,
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => setShowPromptInput(!showPromptInput)}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: eyeColors.text.primary }}>
            Content brief / prompt
          </Typography>
          <IconButton size="small" sx={{ color: eyeColors.text.secondary }}>
            {showPromptInput ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
          </IconButton>
        </Box>
        <Collapse in={showPromptInput}>
          <Box sx={{ mt: 1.5 }}>
            <TextField
              multiline
              fullWidth
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create. Be specific about topic, audience, and goals…"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: eyeColors.paperHover,
                  '& fieldset': { borderColor: eyeColors.border },
                },
              }}
            />
          </Box>
        </Collapse>
      </Paper>

      <LayersPipeline
        layers={layers}
        contentType={contentType}
        onLayersChange={(next) => setLayers(sanitizeLayers(next))}
      />

      <ConfigurationPanel config={config} onConfigChange={setConfig} />

      <EstimatedCost contentType={contentType} layers={layers} feedbackOptions={feedbackOptions} />
    </Stack>
  );

  const feedbackSurface = (
    <FeedbackSurface
      mode={feedbackMode}
      onModeChange={setFeedbackMode}
      feedback={feedback}
      feedbackOptions={feedbackOptions}
      onFeedbackOptionsChange={setFeedbackOptions}
      isAnalyzing={isAnalyzing}
      accent={accent}
    />
  );

  const variationsSurface = (
    <VariationsPanel
      variations={cleanVariations}
      selectedVariationId={selectedVariationId}
      onSelectVariation={handleSelectVariation}
      onEditVariation={(id) => {
        handleSelectVariation(id);
        setShowPromptInput(false);
      }}
      onCopyVariation={(id) => {
        const v = cleanVariations.find((x) => x.id === id);
        if (v) navigator.clipboard.writeText(v.content);
      }}
      onRegenerateVariation={() => handleGenerate()}
      contentType={contentType}
      isGenerating={isGenerating}
    />
  );

  const header = (
    <EditorHeader
      shell={shell}
      accent={accent}
      profile={profile}
      onProfileClick={onProfileClick}
      moodLabel={moodLabel}
      energyLabel={energyLabel}
      onBack={onBack}
      onSave={handleSave}
      onGenerate={handleGenerate}
      canSave={Boolean(content.trim())}
      isGenerating={isGenerating}
      onOpenFeedback={shell === 'focused-write' ? () => setFeedbackDrawerOpen(true) : undefined}
    />
  );

  const pageSx = {
    minHeight: '100vh',
    bgcolor: eyeColors.background,
    backgroundImage: shell === 'character-studio' ? undefined : eyeColors.backgroundGlow,
    p: { xs: 1.5, md: 2 },
    maxWidth: 1200,
    mx: 'auto',
    ...v7FlatSx,
    ...(shell === 'character-studio'
      ? {
          backgroundImage: `linear-gradient(${eyeColors.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${eyeColors.gridLine} 1px, transparent 1px), ${eyeColors.backgroundGlow}`,
          backgroundSize: '28px 28px, 28px 28px, auto',
        }
      : {}),
  };

  const body =
    shell === 'focused-write' ? (
      <>
        {header}
        <Stack spacing={1.75} sx={{ maxWidth: 840, mx: 'auto' }}>
          <Paper
            elevation={0}
            sx={{
              border: `1px solid ${eyeColors.border}`,
              borderRadius: eyeRadii.md,
              overflow: 'hidden',
              bgcolor: eyeColors.paper,
            }}
          >
            <Box
              sx={{
                px: 1.75,
                py: 1.1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderBottom: showSetup ? `1px solid ${eyeColors.border}` : 'none',
              }}
              onClick={() => setShowSetup((v) => !v)}
            >
              <Box>
                <Typography fontWeight={700} color={eyeColors.text.primary} sx={{ fontSize: 14 }}>
                  Setup
                </Typography>
                <MonoLabel>content type · layers · config · cost</MonoLabel>
              </Box>
              <IconButton size="small" sx={{ color: eyeColors.text.secondary }}>
                {showSetup ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
              </IconButton>
            </Box>
            <Collapse in={showSetup}>
              <Box sx={{ p: 1.75 }}>{setupBlock}</Box>
            </Collapse>
          </Paper>

          <ContentEditor
            content={content}
            onContentChange={setContent}
            contentType={selectedContentType}
            onRegenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          {variationsSurface}
        </Stack>

        <Drawer
          anchor="right"
          open={feedbackDrawerOpen}
          onClose={() => setFeedbackDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: { xs: '100%', sm: 420 },
              p: 1.75,
              bgcolor: eyeColors.background,
              ...v7FlatSx,
            },
          }}
        >
          <Typography fontWeight={700} sx={{ mb: 1.25, fontSize: 15 }} color={eyeColors.text.primary}>
            Feedback
          </Typography>
          {feedbackSurface}
        </Drawer>
      </>
    ) : (
      <>
        {header}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={1.75}>
              {setupBlock}
              <ContentEditor
                content={content}
                onContentChange={setContent}
                contentType={selectedContentType}
                onRegenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={1.75}>
              {feedbackSurface}
              {variationsSurface}
            </Stack>
          </Grid>
        </Grid>
      </>
    );

  return (
    <ThemeProvider theme={v7FlatTheme}>
      <EmojiCleanRoot sx={pageSx}>{body}</EmojiCleanRoot>
    </ThemeProvider>
  );
}

// ============= HEADER =============

function EditorHeader({
  shell,
  accent,
  profile,
  onProfileClick,
  moodLabel,
  energyLabel,
  onBack,
  onSave,
  onGenerate,
  canSave,
  isGenerating,
  onOpenFeedback,
}: {
  shell: V7ShellId;
  accent: string;
  profile: NonNullable<AIGuidedEditorV7Props['profile']>;
  onProfileClick?: () => void;
  moodLabel: string;
  energyLabel: string;
  onBack?: () => void;
  onSave: () => void;
  onGenerate: () => void;
  canSave: boolean;
  isGenerating: boolean;
  onOpenFeedback?: () => void;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        px: 1.75,
        py: 1.5,
        mb: 2,
        bgcolor: eyeColors.paper,
        border: `1px solid ${eyeColors.border}`,
        borderRadius: eyeRadii.md,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
          {onBack && (
            <IconButton onClick={onBack} size="small" sx={{ color: eyeColors.text.secondary }}>
              <IconBack />
            </IconButton>
          )}
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 750, color: eyeColors.text.primary, lineHeight: 1.2 }}>
              AI Content Editor
            </Typography>
            <MonoLabel>v7 · {shell.replace(/-/g, ' ')}</MonoLabel>
          </Box>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <ProfileChip
            profile={{ ...profile, accent }}
            onClick={onProfileClick}
            compact={shell === 'focused-write'}
          />
          {onOpenFeedback && (
            <Button
              variant="outlined"
              onClick={onOpenFeedback}
              sx={{
                textTransform: 'none',
                borderColor: eyeColors.border,
                color: eyeColors.text.primary,
              }}
            >
              Feedback
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<IconSave size={16} />}
            onClick={onSave}
            disabled={!canSave}
            sx={{
              textTransform: 'none',
              borderColor: eyeColors.border,
              color: eyeColors.text.primary,
            }}
          >
            Save draft
          </Button>
          <Button
            variant="contained"
            startIcon={<IconGenerate size={16} />}
            onClick={onGenerate}
            disabled={isGenerating}
            sx={{
              textTransform: 'none',
              bgcolor: accent,
              boxShadow: 'none',
              '&:hover': { bgcolor: eyeColors.accentHover, boxShadow: 'none' },
            }}
          >
            {isGenerating ? 'Generating…' : 'Generate'}
          </Button>
        </Stack>
      </Box>

      {shell === 'character-studio' && (
        <Box
          sx={{
            mt: 1.75,
            pt: 1.5,
            borderTop: `1px solid ${eyeColors.border}`,
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Chip
            size="small"
            label={`Mood · ${moodLabel}`}
            sx={{ bgcolor: eyeColors.accentSoft, color: accent, fontWeight: 600 }}
          />
          <Chip
            size="small"
            label={`Energy · ${energyLabel}`}
            sx={{ bgcolor: eyeColors.secondarySoft, color: eyeColors.secondary, fontWeight: 600 }}
          />
          <MonoLabel>static story props — not a live mood system</MonoLabel>
        </Box>
      )}
    </Paper>
  );
}

// ============= FEEDBACK SURFACE =============

function FeedbackSurface({
  mode,
  onModeChange,
  feedback,
  feedbackOptions,
  onFeedbackOptionsChange,
  isAnalyzing,
  accent,
}: {
  mode: FeedbackMode;
  onModeChange: (m: FeedbackMode) => void;
  feedback: AIFeedback;
  feedbackOptions: FeedbackOptions;
  onFeedbackOptionsChange: (o: FeedbackOptions) => void;
  isAnalyzing?: boolean;
  accent: string;
}) {
  return (
    <Stack spacing={1.25}>
      <Box>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: eyeColors.text.muted,
            mb: 0.6,
            textTransform: 'uppercase',
          }}
        >
          Feedback view
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
          {FEEDBACK_MODES.map((m) => {
            const active = mode === m.id;
            return (
              <Chip
                key={m.id}
                icon={m.icon as ReactElement}
                label={m.label}
                size="small"
                onClick={() => onModeChange(m.id)}
                sx={{
                  cursor: 'pointer',
                  height: 28,
                  fontWeight: 600,
                  bgcolor: active ? accent : eyeColors.paper,
                  color: active ? '#fff' : eyeColors.text.primary,
                  border: `1px solid ${active ? accent : eyeColors.border}`,
                  '& .MuiChip-icon': { color: active ? '#fff' : eyeColors.text.secondary },
                  '&:hover': {
                    bgcolor: active ? eyeColors.accentHover : eyeColors.paperHover,
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      {mode === 'panel' && (
        <FeedbackPanel
          feedback={feedback}
          feedbackOptions={feedbackOptions}
          onFeedbackOptionsChange={onFeedbackOptionsChange}
          isAnalyzing={isAnalyzing}
        />
      )}
      {mode === 'score' && (
        <ScoreOverviewScreen
          feedback={FS_SAMPLE}
          status={isAnalyzing ? 'analyzing' : 'ready'}
        />
      )}
      {mode === 'explorer' && (
        <SectionExplorerScreen
          feedback={FS_SAMPLE}
          status={isAnalyzing ? 'analyzing' : 'ready'}
        />
      )}
      {mode === 'actions' && (
        <ActionFirstScreen
          feedback={FS_SAMPLE}
          status={isAnalyzing ? 'analyzing' : 'ready'}
        />
      )}
    </Stack>
  );
}

export default AIGuidedEditorV7;
