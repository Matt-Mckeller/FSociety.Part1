import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { feedbackColors } from '../constants';
import type { FeedbackScreenProps, ImprovementTip } from '../types';
import {
  ScoreRing,
  FeedbackHeader,
  TipsList,
  EmptyAnalyzing,
} from '../shared';

interface ActionFirstScreenProps extends FeedbackScreenProps {
  /** When true, score strip starts visible (ratings still opt-in by default). */
  initialShowRatings?: boolean;
}

/**
 * Variation C — Action-first.
 * Tips drive edits; scores stay hidden until the user opts in.
 */
export function ActionFirstScreen({
  feedback,
  status = 'ready',
  title = 'AI Feedback',
  initialShowRatings = false,
}: ActionFirstScreenProps) {
  const [showRatings, setShowRatings] = useState(initialShowRatings);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const sortedTips = useMemo(() => {
    const order = { high: 0, medium: 1, low: 2 };
    return [...feedback.tips].sort((a, b) => order[a.priority] - order[b.priority]);
  }, [feedback.tips]);

  const followUpTips: ImprovementTip[] = useMemo(() => {
    const extras: ImprovementTip[] = [];
    feedback.goals.breakdown.forEach((g, i) => {
      g.suggestions.forEach((text, j) => {
        extras.push({
          id: `goal-${i}-${j}`,
          text,
          source: 'goals',
          priority: g.score < 70 ? 'high' : 'medium',
        });
      });
    });
    feedback.platforms.forEach((p, i) => {
      p.suggestions.forEach((text, j) => {
        extras.push({
          id: `plat-${i}-${j}`,
          text: `${p.name}: ${text}`,
          source: 'platforms',
          priority: p.score < 65 ? 'high' : 'low',
        });
      });
    });
    feedback.audience.forEach((a, i) => {
      a.recommendations.forEach((text, j) => {
        extras.push({
          id: `aud-${i}-${j}`,
          text: `${a.name}: ${text}`,
          source: 'audience',
          priority: a.appealScore < 75 ? 'medium' : 'low',
        });
      });
    });
    return extras;
  }, [feedback]);

  const audienceAvg =
    feedback.audience.length > 0
      ? Math.round(
          feedback.audience.reduce((sum, a) => sum + a.appealScore, 0) / feedback.audience.length
        )
      : 0;
  const platformAvg =
    feedback.platforms.length > 0
      ? Math.round(
          feedback.platforms.reduce((sum, p) => sum + p.score, 0) / feedback.platforms.length
        )
      : 0;

  const handleApply = (tip: ImprovementTip) => {
    setAppliedIds((ids) => [...ids, tip.id]);
    setDismissedIds((ids) => [...ids, tip.id]);
  };

  const handleDismiss = (tip: ImprovementTip) => {
    setDismissedIds((ids) => [...ids, tip.id]);
  };

  return (
    <Card
      sx={{
        height: '100%',
        bgcolor: feedbackColors.paper,
        border: `1px solid ${feedbackColors.border}`,
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <FeedbackHeader
          title={title}
          subtitle="Action-first · tips drive the edit"
          status={status}
          endAdornment={
            <Button
              size="small"
              startIcon={
                showRatings ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
              }
              onClick={() => setShowRatings((v) => !v)}
              sx={{
                textTransform: 'none',
                color: feedbackColors.text.secondary,
                fontWeight: 600,
              }}
            >
              {showRatings ? 'Hide ratings' : 'Show ratings'}
            </Button>
          }
        />

        {status === 'analyzing' && <EmptyAnalyzing mode="analyzing" />}
        {status === 'empty' && <EmptyAnalyzing mode="empty" />}

        {status === 'ready' && (
          <>
            <Collapse in={showRatings}>
              <Box
                sx={{
                  mb: 2.5,
                  p: 2,
                  borderRadius: 1.5,
                  border: `1px solid ${feedbackColors.border}`,
                  bgcolor: feedbackColors.paperHover,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
                  <ScoreRing score={feedback.overallScore} label="Overall" size="small" />
                  <ScoreRing score={feedback.goals.overallScore} label="Goals" size="small" />
                  <ScoreRing score={audienceAvg} label="Audience" size="small" />
                  <ScoreRing score={feedback.tone.matchScore} label="Tone" size="small" />
                  <ScoreRing score={platformAvg} label="Platforms" size="small" />
                </Box>
              </Box>
            </Collapse>

            {!showRatings && (
              <Typography
                variant="body2"
                color={feedbackColors.text.secondary}
                sx={{ mb: 2.5 }}
              >
                Ratings are hidden so you can focus on edits. Reveal them anytime.
              </Typography>
            )}

            <TipsList
              tips={sortedTips}
              maxItems={8}
              title="Suggested edits"
              actionable
              dismissedIds={dismissedIds}
              onApply={handleApply}
              onDismiss={handleDismiss}
            />

            {followUpTips.length > 0 && (
              <>
                <Divider sx={{ my: 2.5, borderColor: feedbackColors.border }} />
                <TipsList
                  tips={followUpTips}
                  maxItems={6}
                  title="From goals, audience & platforms"
                  actionable
                  dismissedIds={dismissedIds}
                  onApply={handleApply}
                  onDismiss={handleDismiss}
                />
              </>
            )}

            {appliedIds.length > 0 && (
              <Box sx={{ mt: 2.5 }}>
                <Typography variant="caption" color={feedbackColors.success} fontWeight={600}>
                  Applied {appliedIds.length} suggestion{appliedIds.length === 1 ? '' : 's'} this session
                </Typography>
              </Box>
            )}

            {feedback.strengths.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color={feedbackColors.text.secondary}
                  sx={{ display: 'block', mb: 0.75, letterSpacing: 0.4 }}
                >
                  KEEP DOING
                </Typography>
                <Stack spacing={0.5}>
                  {feedback.strengths.slice(0, 2).map((s) => (
                    <Typography key={s} variant="body2" color={feedbackColors.text.secondary}>
                      · {s}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
