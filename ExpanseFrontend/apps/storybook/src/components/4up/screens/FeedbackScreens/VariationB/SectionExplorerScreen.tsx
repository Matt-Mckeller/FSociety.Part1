import { useState, type ReactElement, type ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import DevicesIcon from '@mui/icons-material/Devices';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PaletteIcon from '@mui/icons-material/Palette';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { feedbackColors, getScoreColor } from '../constants';
import type { FeedbackScreenProps } from '../types';
import {
  ScoreRing,
  FeedbackHeader,
  StrengthsList,
  TipsList,
  EmptyAnalyzing,
} from '../shared';

type SectionId =
  | 'overview'
  | 'goals'
  | 'audience'
  | 'platforms'
  | 'tone'
  | 'tips'
  | 'themes'
  | 'pain-points';

const SECTIONS: { id: SectionId; label: string; icon: ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <AutoAwesomeIcon fontSize="small" /> },
  { id: 'goals', label: 'Goals', icon: <TrendingUpIcon fontSize="small" /> },
  { id: 'audience', label: 'Audience', icon: <GroupIcon fontSize="small" /> },
  { id: 'platforms', label: 'Platforms', icon: <DevicesIcon fontSize="small" /> },
  { id: 'tone', label: 'Tone', icon: <RecordVoiceOverIcon fontSize="small" /> },
  { id: 'tips', label: 'Tips', icon: <LightbulbIcon fontSize="small" /> },
  { id: 'themes', label: 'Themes', icon: <PaletteIcon fontSize="small" /> },
  { id: 'pain-points', label: 'Pain Points', icon: <ReportProblemOutlinedIcon fontSize="small" /> },
];

interface SectionExplorerScreenProps extends FeedbackScreenProps {
  initialSection?: SectionId;
  initialViewMode?: 'simple' | 'advanced';
}

/**
 * Variation B — Section explorer.
 * Deep dive across every feedback type with Simple / Advanced depth.
 */
export function SectionExplorerScreen({
  feedback,
  status = 'ready',
  title = 'AI Feedback',
  initialSection = 'overview',
  initialViewMode = 'simple',
}: SectionExplorerScreenProps) {
  const [section, setSection] = useState<SectionId>(initialSection);
  const [viewMode, setViewMode] = useState<'simple' | 'advanced'>(initialViewMode);

  const audienceAvg =
    feedback.audience.length > 0
      ? Math.round(
          feedback.audience.reduce((sum, a) => sum + a.appealScore, 0) / feedback.audience.length
        )
      : 0;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: feedbackColors.paper,
        border: `1px solid ${feedbackColors.border}`,
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
      }}
    >
      <CardContent sx={{ pb: 1.5 }}>
        <FeedbackHeader
          title={title}
          subtitle="Section explorer · every feedback type"
          status={status}
          endAdornment={
            <ToggleButtonGroup
              size="small"
              exclusive
              value={viewMode}
              onChange={(_, v) => v && setViewMode(v)}
              sx={{
                '& .MuiToggleButton-root': {
                  px: 1.25,
                  py: 0.4,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                },
              }}
            >
              <ToggleButton value="simple" aria-label="Simple view">
                <ViewModuleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Simple
              </ToggleButton>
              <ToggleButton value="advanced" aria-label="Advanced view">
                <ViewListIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Advanced
              </ToggleButton>
            </ToggleButtonGroup>
          }
        />

        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1 }}>
          {SECTIONS.map((s) => {
            const active = section === s.id;
            return (
              <Chip
                key={s.id}
                icon={s.icon as ReactElement}
                label={s.label}
                size="small"
                onClick={() => setSection(s.id)}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  bgcolor: active ? feedbackColors.primary : feedbackColors.paper,
                  color: active ? '#fff' : feedbackColors.text.primary,
                  border: `1px solid ${active ? feedbackColors.primary : feedbackColors.border}`,
                  '& .MuiChip-icon': {
                    color: active ? '#fff' : feedbackColors.text.secondary,
                  },
                  '&:hover': {
                    bgcolor: active ? feedbackColors.primaryHover : feedbackColors.paperHover,
                  },
                }}
              />
            );
          })}
        </Box>
      </CardContent>

      <Divider sx={{ borderColor: feedbackColors.border }} />

      <CardContent sx={{ flex: 1, overflow: 'auto', maxHeight: 560 }}>
        {status === 'analyzing' && <EmptyAnalyzing mode="analyzing" />}
        {status === 'empty' && <EmptyAnalyzing mode="empty" />}

        {status === 'ready' && section === 'overview' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
              <ScoreRing score={feedback.overallScore} label="Overall" size="large" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, mb: 3, flexWrap: 'wrap' }}>
              <ScoreRing score={feedback.goals.overallScore} label="Goals" size="small" />
              <ScoreRing score={audienceAvg} label="Audience" size="small" />
              <ScoreRing score={feedback.tone.matchScore} label="Tone" size="small" />
            </Box>
            <Stack spacing={2}>
              <StrengthsList strengths={feedback.strengths} />
              <TipsList tips={feedback.tips} maxItems={viewMode === 'simple' ? 2 : 4} />
            </Stack>
          </Box>
        )}

        {status === 'ready' && section === 'goals' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <ScoreRing score={feedback.goals.overallScore} label="Goal alignment" size="medium" />
            </Box>
            <Stack spacing={1.25}>
              {feedback.goals.breakdown.map((goal) => (
                <Paper
                  key={goal.name}
                  elevation={0}
                  sx={{
                    p: 1.75,
                    border: `1px solid ${getScoreColor(goal.score)}44`,
                    bgcolor: feedbackColors.paper,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Typography variant="subtitle2" fontWeight={700} color={feedbackColors.text.primary}>
                      {goal.name}
                    </Typography>
                    <ScoreRing score={goal.score} size="small" showLabel={false} />
                  </Box>
                  {viewMode === 'advanced' && (
                    <>
                      <Typography variant="body2" color={feedbackColors.text.secondary} sx={{ mt: 1 }}>
                        {goal.reasoning}
                      </Typography>
                      {goal.suggestions.length > 0 && (
                        <Stack spacing={0.5} sx={{ mt: 1 }}>
                          {goal.suggestions.map((s) => (
                            <Typography key={s} variant="caption" color={feedbackColors.text.secondary}>
                              → {s}
                            </Typography>
                          ))}
                        </Stack>
                      )}
                    </>
                  )}
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {status === 'ready' && section === 'audience' && (
          <Box>
            {feedback.audience.length === 0 ? (
              <EmptyAnalyzing
                mode="empty"
                message="No audience reviews for this run. Enable audience analysis to populate this section."
              />
            ) : (
              <Stack spacing={1.25}>
                {[...feedback.audience]
                  .sort((a, b) => b.appealScore - a.appealScore)
                  .map((aud) => (
                    <Paper
                      key={aud.id}
                      elevation={0}
                      sx={{
                        p: 1.75,
                        border: `1px solid ${feedbackColors.border}`,
                        bgcolor: `${getScoreColor(aud.appealScore)}08`,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={700} color={feedbackColors.text.primary}>
                            {aud.name}
                          </Typography>
                          <Chip
                            label={aud.type}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: '0.65rem',
                              textTransform: 'capitalize',
                              mt: 0.5,
                              bgcolor: feedbackColors.secondaryLight,
                              color: feedbackColors.secondary,
                            }}
                          />
                        </Box>
                        <ScoreRing score={aud.appealScore} size="small" showLabel={false} />
                      </Box>
                      {viewMode === 'advanced' && (
                        <Box sx={{ mt: 1 }}>
                          {aud.sampleReaction && (
                            <Typography variant="body2" fontStyle="italic" color={feedbackColors.text.secondary} sx={{ mb: 1 }}>
                              “{aud.sampleReaction}”
                            </Typography>
                          )}
                          {aud.resonanceFactors.length > 0 && (
                            <Typography variant="caption" color={feedbackColors.success} sx={{ display: 'block' }}>
                              Resonates: {aud.resonanceFactors.join(' · ')}
                            </Typography>
                          )}
                          {aud.concerns.length > 0 && (
                            <Typography variant="caption" color={feedbackColors.warning} sx={{ display: 'block', mt: 0.5 }}>
                              Concerns: {aud.concerns.join(' · ')}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Paper>
                  ))}
              </Stack>
            )}
          </Box>
        )}

        {status === 'ready' && section === 'platforms' && (
          <Stack spacing={1.25}>
            {feedback.platforms.map((p) => (
              <Paper
                key={p.id}
                elevation={0}
                sx={{ p: 1.75, border: `1px solid ${getScoreColor(p.score)}44` }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" fontWeight={700} color={feedbackColors.text.primary}>
                    {p.name}
                  </Typography>
                  <ScoreRing score={p.score} size="small" showLabel={false} />
                </Box>
                <Typography variant="body2" color={feedbackColors.text.secondary} sx={{ mt: 0.75 }}>
                  {p.reasoning}
                </Typography>
                {viewMode === 'advanced' && (
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 0.75 }}>
                      {p.bestContentTypes.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          sx={{ height: 20, fontSize: '0.65rem', bgcolor: feedbackColors.infoLight, color: feedbackColors.info }}
                        />
                      ))}
                    </Box>
                    {p.suggestions.map((s) => (
                      <Typography key={s} variant="caption" color={feedbackColors.text.secondary} sx={{ display: 'block' }}>
                        → {s}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Paper>
            ))}
          </Stack>
        )}

        {status === 'ready' && section === 'tone' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
              <ScoreRing score={feedback.tone.matchScore} label="Match" size="medium" />
              <ScoreRing score={feedback.tone.brandVoiceAlignment} label="Brand voice" size="medium" />
            </Box>
            <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: feedbackColors.paperHover, border: `1px solid ${feedbackColors.border}` }}>
              <Typography variant="body2" color={feedbackColors.text.secondary}>
                Detected tone:{' '}
                <strong style={{ color: feedbackColors.text.primary }}>{feedback.tone.detectedTone}</strong>
              </Typography>
            </Paper>
            {viewMode === 'advanced' && (
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" fontWeight={700} color={feedbackColors.text.secondary} sx={{ display: 'block', mb: 0.75 }}>
                    ON-BRAND
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {feedback.tone.onBrandWords.map((w) => (
                      <Chip key={w} label={w} size="small" sx={{ bgcolor: feedbackColors.successLight, color: feedbackColors.success }} />
                    ))}
                  </Box>
                </Box>
                {feedback.tone.offBrandWords.length > 0 && (
                  <Box>
                    <Typography variant="caption" fontWeight={700} color={feedbackColors.text.secondary} sx={{ display: 'block', mb: 0.75 }}>
                      OFF-BRAND
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {feedback.tone.offBrandWords.map((w) => (
                        <Chip key={w} label={w} size="small" sx={{ bgcolor: feedbackColors.warningLight, color: feedbackColors.warning }} />
                      ))}
                    </Box>
                  </Box>
                )}
                <Typography variant="body2" color={feedbackColors.text.secondary}>
                  Readability: {feedback.tone.readabilityScore}/100
                </Typography>
              </Stack>
            )}
          </Box>
        )}

        {status === 'ready' && section === 'tips' && (
          <TipsList tips={feedback.tips} maxItems={viewMode === 'simple' ? 4 : 8} />
        )}

        {status === 'ready' && section === 'themes' && (
          <Box>
            {!feedback.themes?.length ? (
              <EmptyAnalyzing mode="empty" message="No theme alignment data for this run." />
            ) : (
              <Stack spacing={1.25}>
                {feedback.themes.map((theme) => (
                  <Paper
                    key={theme.name}
                    elevation={0}
                    sx={{ p: 1.75, border: `1px solid ${feedbackColors.border}` }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Chip
                          label={theme.type}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: '0.65rem',
                            mb: 0.5,
                            bgcolor: theme.type === 'core' ? feedbackColors.primaryLight : feedbackColors.secondaryLight,
                            color: theme.type === 'core' ? feedbackColors.primary : feedbackColors.secondary,
                          }}
                        />
                        <Typography variant="subtitle2" fontWeight={700} color={feedbackColors.text.primary}>
                          {theme.name}
                        </Typography>
                      </Box>
                      <ScoreRing score={theme.alignmentScore} size="small" showLabel={false} />
                    </Box>
                    {viewMode === 'advanced' && (
                      <Typography variant="caption" color={feedbackColors.text.secondary} sx={{ display: 'block', mt: 0.75 }}>
                        {theme.description}
                        {theme.suggestions[0] ? ` · ${theme.suggestions[0]}` : ''}
                      </Typography>
                    )}
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>
        )}

        {status === 'ready' && section === 'pain-points' && (
          <Box>
            {!feedback.painPoints?.length ? (
              <EmptyAnalyzing mode="empty" message="No pain-point analysis for this run." />
            ) : (
              <Stack spacing={1.25}>
                {[...feedback.painPoints]
                  .sort((a, b) => b.alignmentScore - a.alignmentScore)
                  .map((pp) => (
                    <Paper
                      key={pp.painPoint}
                      elevation={0}
                      sx={{ p: 1.75, border: `1px solid ${getScoreColor(pp.alignmentScore)}44` }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" fontWeight={700} color={feedbackColors.text.primary}>
                          {pp.painPoint}
                        </Typography>
                        <ScoreRing score={pp.alignmentScore} size="small" showLabel={false} />
                      </Box>
                      {viewMode === 'advanced' && (
                        <>
                          <Typography variant="body2" color={feedbackColors.text.secondary} sx={{ mt: 0.75 }}>
                            {pp.description}
                          </Typography>
                          {pp.suggestions.map((s) => (
                            <Typography key={s} variant="caption" color={feedbackColors.text.secondary} sx={{ display: 'block', mt: 0.5 }}>
                              → {s}
                            </Typography>
                          ))}
                        </>
                      )}
                    </Paper>
                  ))}
              </Stack>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
