import { useState, type ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { feedbackColors, getScoreLabel } from '../constants';
import type { FeedbackScreenProps } from '../types';
import {
  ScoreRing,
  FeedbackHeader,
  StrengthsList,
  TipsList,
  EmptyAnalyzing,
} from '../shared';

interface DetailBlockProps {
  id: string;
  title: string;
  score: number;
  expanded: string | null;
  onToggle: (id: string | null) => void;
  children: ReactNode;
}

function DetailBlock({ id, title, score, expanded, onToggle, children }: DetailBlockProps) {
  const isOpen = expanded === id;
  return (
    <Box
      sx={{
        border: `1px solid ${feedbackColors.border}`,
        borderRadius: 1.5,
        overflow: 'hidden',
        bgcolor: feedbackColors.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 1.5,
          cursor: 'pointer',
          '&:hover': { bgcolor: feedbackColors.paperHover },
        }}
        onClick={() => onToggle(isOpen ? null : id)}
      >
        <ScoreRing score={score} size="small" showLabel={false} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" fontWeight={700} color={feedbackColors.text.primary}>
            {title}
          </Typography>
          <Typography variant="caption" color={feedbackColors.text.secondary}>
            {getScoreLabel(score)} · {score}/100
          </Typography>
        </Box>
        <IconButton size="small" aria-label={isOpen ? 'Collapse' : 'Expand'}>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={isOpen}>
        <Divider sx={{ borderColor: feedbackColors.border }} />
        <Box sx={{ p: 1.75, bgcolor: feedbackColors.paperHover }}>{children}</Box>
      </Collapse>
    </Box>
  );
}

/**
 * Variation A — Score-first overview.
 * Answers “how is this content doing?” in one viewport.
 */
export function ScoreOverviewScreen({
  feedback,
  status = 'ready',
  title = 'AI Feedback',
}: FeedbackScreenProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

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
          subtitle="Score overview · glanceable health check"
          status={status}
        />

        {status === 'analyzing' && <EmptyAnalyzing mode="analyzing" />}
        {status === 'empty' && <EmptyAnalyzing mode="empty" />}

        {status === 'ready' && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
              <ScoreRing
                score={feedback.overallScore}
                label={`${getScoreLabel(feedback.overallScore)} overall`}
                size="large"
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: 2,
                mb: 3,
              }}
            >
              <ScoreRing score={feedback.goals.overallScore} label="Goals" size="small" />
              <ScoreRing score={audienceAvg || 0} label="Audience" size="small" />
              <ScoreRing score={feedback.tone.matchScore} label="Tone" size="small" />
              <ScoreRing score={platformAvg || 0} label="Platforms" size="small" />
            </Box>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <StrengthsList strengths={feedback.strengths} maxItems={3} />
              <TipsList tips={feedback.tips} maxItems={3} title="Top improvement tips" />
            </Stack>

            <Typography
              variant="caption"
              fontWeight={700}
              color={feedbackColors.text.secondary}
              sx={{ display: 'block', mb: 1, letterSpacing: 0.4 }}
            >
              SEE DETAILS
            </Typography>
            <Stack spacing={1}>
              <DetailBlock
                id="goals"
                title="Goal alignment"
                score={feedback.goals.overallScore}
                expanded={expanded}
                onToggle={setExpanded}
              >
                <Stack spacing={1}>
                  {feedback.goals.breakdown.map((goal) => (
                    <Box key={goal.name}>
                      <Typography variant="body2" fontWeight={600} color={feedbackColors.text.primary}>
                        {goal.name} · {goal.score}
                      </Typography>
                      <Typography variant="caption" color={feedbackColors.text.secondary}>
                        {goal.reasoning}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </DetailBlock>

              <DetailBlock
                id="audience"
                title="Audience match"
                score={audienceAvg}
                expanded={expanded}
                onToggle={setExpanded}
              >
                <Stack spacing={1}>
                  {feedback.audience.map((aud) => (
                    <Box key={aud.id}>
                      <Typography variant="body2" fontWeight={600} color={feedbackColors.text.primary}>
                        {aud.name} · {aud.appealScore}
                      </Typography>
                      {aud.sampleReaction && (
                        <Typography variant="caption" color={feedbackColors.text.secondary} fontStyle="italic">
                          “{aud.sampleReaction}”
                        </Typography>
                      )}
                    </Box>
                  ))}
                  {feedback.audience.length === 0 && (
                    <Typography variant="body2" color={feedbackColors.text.secondary}>
                      No audience reviews in this run.
                    </Typography>
                  )}
                </Stack>
              </DetailBlock>

              <DetailBlock
                id="platforms"
                title="Platform optimization"
                score={platformAvg}
                expanded={expanded}
                onToggle={setExpanded}
              >
                <Stack spacing={1}>
                  {feedback.platforms.map((p) => (
                    <Box key={p.id}>
                      <Typography variant="body2" fontWeight={600} color={feedbackColors.text.primary}>
                        {p.name} · {p.score}
                      </Typography>
                      <Typography variant="caption" color={feedbackColors.text.secondary}>
                        {p.reasoning}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </DetailBlock>

              <DetailBlock
                id="tone"
                title="Tone analysis"
                score={feedback.tone.matchScore}
                expanded={expanded}
                onToggle={setExpanded}
              >
                <Typography variant="body2" color={feedbackColors.text.secondary}>
                  Detected: <strong style={{ color: feedbackColors.text.primary }}>{feedback.tone.detectedTone}</strong>
                  {' · '}Brand voice {feedback.tone.brandVoiceAlignment}/100
                  {' · '}Readability {feedback.tone.readabilityScore}/100
                </Typography>
              </DetailBlock>
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}
